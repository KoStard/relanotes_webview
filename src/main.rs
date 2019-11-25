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
            let mut req_id: i32 = 0;
            let mut msg = None;

            if let Ok(cmd) = serde_json::from_str::<Cmd>(arg) {
                match cmd {
                    Cmd::Init { request_id } => {
                        req_id = request_id;
                        state.groups.load().expect("Got error while loading groups");
                    }
                    Cmd::GetGroups { request_id } => {
                        req_id = request_id;
                        let elements = state
                            .groups
                            .groups_map
                            .iter()
                            .map(|(_, e)| e.group.name.as_str())
                            .collect::<Vec<&str>>();
                        msg = Some(serde_json::to_string(&elements).unwrap());
                    }
                    Cmd::CreateGroup {
                        request_id,
                        group_name,
                    } => {
                        req_id = request_id;
                        let group_abstraction = state.groups.create(group_name).unwrap();
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
            send_response(webview, req_id, msg)
        })
        .build()
        .unwrap();

    // webview.set_color((156, 39, 176));

    webview.run().unwrap();
}

fn send_response(webview: &mut WebView<State>, req_id: i32, msg: Option<String>) -> WVResult {
    let command = {
        if req_id != 0 {
            format!(
                "ipc.req_reg.put_response({}, {})",
                req_id,
                if let Some(e) = msg {
                    e
                } else {
                    String::from("")
                }
            )
        } else {
            String::new()
        }
    };
    webview.eval(&command)
}

#[derive(Deserialize)]
#[serde(tag = "cmd")]
pub enum Cmd {
    Init {
        request_id: i32,
    },
    GetGroups {
        request_id: i32,
    },
    CreateGroup {
        request_id: i32,
        group_name: String,
    },
    DeleteGroup {
        request_id: i32,
        group_id: i32,
    },
    UpdateGroup {
        request_id: i32,
        group_id: i32,
        name: String,
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
