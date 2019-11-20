//#![windows_subsystem = "windows"]

#[macro_use]
extern crate serde_derive;
extern crate serde_json;
extern crate web_view;
extern crate relanotes_rs;

use web_view::*;
use diesel::SqliteConnection;

struct State {
    count: i32,
    connection: SqliteConnection
}

impl State {
    pub fn new(connection: SqliteConnection) -> Self {
        State {
            count: 0,
            connection: connection
        }
    }
}

fn main() {
    let connection = relanotes_rs::establish_connection();
    relanotes_rs::setup_database(&connection).unwrap();

    let html = format!(
        include_str!("front-end/index.html"),
        styles = inline_style(include_str!("front-end/styles.css")),
        scripts = inline_script(include_str!("front-end/require.js"))
            + &inline_script(include_str!("front-end/scripts.js")),
    );

    let mut webview = web_view::builder()
        .title("Relanotes")
        .content(Content::Html(html))
        .size(800, 600)
        .debug(true)
        .user_data(State::new(connection))
        .invoke_handler(|webview, arg| {
            use Cmd::*;
            
            let state = webview.user_data_mut();

            if let Ok(cmd) = serde_json::from_str(arg) {
                match cmd {
                    Init => {
                    },
                    Increment => {
                        state.count += 1;
                    },
                    Decrement => {
                        state.count -= 1;
                    },
                }
            }

            // webview.set_title(&format!("Rust Todo App ({} Tasks)", tasks_len))?;
            render(webview)
        })
        .build()
        .unwrap();

    // webview.set_color((156, 39, 176));

    webview.run().unwrap();
}

fn render(webview: &mut WebView<State>) -> WVResult {
    let render_state = {
        let state = webview.user_data();
        // println!("{:#?}", state);
        format!("ipc.render({})", state.count)
    };
    webview.eval(&render_state)
}

#[derive(Deserialize)]
#[serde(tag = "cmd")]
pub enum Cmd {
    Init,
    Increment,
    Decrement
}

fn inline_style(s: &str) -> String {
    format!(r#"<style type="text/css">{}</style>"#, s)
}

fn inline_script(s: &str) -> String {
    format!(r#"<script type="text/javascript">{}</script>"#, s)
}
