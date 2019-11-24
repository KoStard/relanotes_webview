//#![windows_subsystem = "windows"]

#[macro_use]
extern crate serde_derive;
extern crate relanotes_rs;
extern crate serde_json;
extern crate web_view;

use diesel::SqliteConnection;
use relanotes_rs::abstracts::Loadable;
use relanotes_rs::groups_mod::Groups;
use web_view::*;

struct State<'a> {
    pub groups: Groups<'a>,
}

impl<'a> State<'a> {
    pub fn new(connection: &'a SqliteConnection) -> Self {
        let groups = Groups::new(connection);
        State { groups }
    }
}

fn main() {
    let connection = relanotes_rs::establish_connection();
    relanotes_rs::database_setup::setup_database(&connection).unwrap();

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
        .user_data(State::new(&connection))
        .invoke_handler(|webview, arg| {
            let state = webview.user_data_mut();
            let mut msg = None;

            if let Ok(cmd) = serde_json::from_str::<Cmd>(arg) {
                match cmd {
                    Cmd::Init => {
                        state.groups.load().expect("Got error while loading groups");
                    }
                    Cmd::GetGroups => {
                        let elements = state
                            .groups
                            .groups_map
                            .iter()
                            .map(|(_, e)| e.group.name.as_str())
                            .collect::<Vec<&str>>();
                        msg = Some(serde_json::to_string(&elements).unwrap());
                    }
                    Cmd::CreateGroup {group_name} => {
                        let group_abstraction  = state.groups.create(group_name).unwrap();
                    }
                    // Cmd::DeleteGroup => {}
                    // Cmd::GetSubGroups => {}
                    // Cmd::CreateSubGroup => {}
                    // Cmd::DeleteSubGroup => {}
                    // Cmd::LoadSubGroup => {}
                    // Cmd::GetRootNodes => {}
                    // Cmd::GetChildNodes => {}
                    // Cmd::UpdateNode => {}
                    // Cmd::CreateNode => {}
                    // Cmd::DeleteNode => {}
                    // Cmd::RecursiveDeleteNode => {}
                    _ => {
                        unimplemented!("Is not implemented");
                    }
                }
            }

            // webview.set_title(&format!("Rust Todo App ({} Tasks)", tasks_len))?;
            render(webview, msg)
        })
        .build()
        .unwrap();

    // webview.set_color((156, 39, 176));

    webview.run().unwrap();
}

fn render(webview: &mut WebView<State>, msg: Option<String>) -> WVResult {
    let render_state = {
        match msg {
            Some(e) => format!("ipc.render({})", e),
            None => String::new(),
        }
    };
    webview.eval(&render_state)
}

#[derive(Deserialize)]
#[serde(tag = "cmd")]
pub enum Cmd {
    Init,
    GetGroups,
    CreateGroup {
        group_name: String,
    },
    DeleteGroup {
        group_id: i32,
    },
    UpdateGroup {
        group_id: i32,
        name: String
    },
    // GetSubGroups {
    //     group_id: i32,
    // },
    // CreateSubGroup {
    //     group_id: i32,
    //     subgroup_name: String,
    // },
    // DeleteSubGroup {
    //     subgroup_id: i32,
    // },
    // LoadSubGroup {
    //     subgroup_id: i32,
    // },
    // GetRootNodes {
    //     subgroup_id: i32,
    // },
    // GetChildNodes {
    //     parent_id: i32,
    // },
    // UpdateNode {
    //     node_id: i32,
    //     name: String,
    //     description: String,
    // },
    // CreateNode {
    //     parent_id: i32,
    //     name: String,
    //     description: String,
    // },
    // DeleteNode {
    //     node_id: i32,
    // },
    // RecursiveDeleteNode {
    //     node_id: i32,
    // },
}

fn inline_style(s: &str) -> String {
    format!(r#"<style type="text/css">{}</style>"#, s)
}

fn inline_script(s: &str) -> String {
    format!(r#"<script type="text/javascript">{}</script>"#, s)
}
