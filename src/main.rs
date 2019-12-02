//#![windows_subsystem = "windows"]

#[macro_use]
extern crate serde_derive;
extern crate relanotes_rs;
extern crate serde_json;
extern crate web_view;

use diesel::SqliteConnection;
use relanotes_rs::abstracts::Loadable;
use relanotes_rs::groups_mod::subgroups_mod::nodes_mod::Node;
use relanotes_rs::groups_mod::Groups;
use relanotes_rs::models::{GroupElement, SubGroupElement};
use web_view::*;

struct State<'a> {
    pub groups: Groups<'a>,
}

impl<'a> State<'a> {
    pub fn new(connection: &'a SqliteConnection) -> Self {
        State {
            groups: Groups::new(connection),
        }
    }
}

fn main() {
    let connection = relanotes_rs::establish_connection();
    relanotes_rs::database_setup::setup_database(&connection).unwrap();

    let html = format!(
        include_str!("front-end/index.html"),
        styles = inline_style(include_str!("front-end/bootstrap.min.css"))
            + &inline_style(include_str!("front-end/styles.css")),
        scripts = inline_script(include_str!("front-end/jquery-3.3.1.slim.min.js"))
            + &inline_script(include_str!("front-end/bootstrap.min.js"))
            + &inline_script(include_str!("front-end/require.js"))
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
            let mut req_id: i64 = 0;
            let mut msg = None;

            if let Ok(cmd) = serde_json::from_str::<Cmd>(arg) {
                match cmd {
                    Cmd::Init { request_id } => {
                        req_id = request_id;
                        state.groups.load().expect("Got error while loading groups");
                    }
                    Cmd::GetGroups { request_id } => {
                        req_id = request_id;
                        let mut elements = state
                            .groups
                            .groups_map
                            .values()
                            .by_ref()
                            .map(|e| &e.group)
                            .collect::<Vec<&GroupElement>>();
                        elements.sort_by(|a, b| a.id.partial_cmp(&b.id).unwrap());
                        msg = serde_json::to_string(&elements).ok();
                    }
                    Cmd::CreateGroup {
                        request_id,
                        group_name,
                    } => {
                        req_id = request_id;
                        let group_abstraction = state.groups.create(group_name).unwrap();
                    }
                    // Cmd::DeleteGroup => {}
                    Cmd::GetSubGroups {
                        request_id,
                        group_id,
                    } => {
                        req_id = request_id;
                        msg = state.groups.groups_map.get_mut(&group_id).and_then(
                            |group_abstraction| {
                                if !group_abstraction.subgroups.loaded {
                                    group_abstraction.subgroups.load().ok()?;
                                }
                                let mut elements = group_abstraction
                                    .subgroups
                                    .subgroups_map
                                    .values()
                                    .by_ref()
                                    .map(|e| &e.subgroup)
                                    .collect::<Vec<&SubGroupElement>>();
                                elements.sort_by(|a, b| a.id.partial_cmp(&b.id).unwrap());
                                serde_json::to_string(&elements).ok()
                            },
                        );
                    }
                    // Cmd::CreateSubGroup => {}
                    // Cmd::DeleteSubGroup => {}
                    // Cmd::LoadSubGroup => {}
                    Cmd::GetRootNodes {
                        request_id,
                        subgroup_id,
                    } => {
                        req_id = request_id;
                        msg = state
                            .groups
                            .get_subgroup_mut(subgroup_id)
                            .and_then(|subgroup| {
                                if !subgroup.nodes.loaded {
                                    subgroup.nodes.load().ok()?;
                                }
                                let elements = subgroup
                                    .nodes
                                    .get_roots()
                                    .into_iter()
                                    .map(|id| &subgroup.nodes.nodes_map.get(&id).unwrap().node)
                                    .collect::<Vec<&Node>>();
                                // sort nodes
                                serde_json::to_string(&elements).ok()
                            });
                    }
                    Cmd::GetChildNodes {
                        request_id,
                        subgroup_id,
                        parent_id,
                    } => {
                        req_id = request_id;
                        msg = state
                            .groups
                            .get_subgroup(subgroup_id)
                            .and_then(|subgroup| {
                                subgroup.nodes.get_node_loaded_children(&parent_id).map(
                                    |children_ids| {
                                        children_ids
                                            .into_iter()
                                            .map(|id| {
                                                &subgroup.nodes.nodes_map.get(&id).unwrap().node
                                            })
                                            .collect::<Vec<&Node>>()
                                    },
                                )
                            })
                            .and_then(|nodes| {
                                // sort nodes
                                serde_json::to_string(&nodes).ok()
                            });
                    }
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

fn send_response(webview: &mut WebView<State>, req_id: i64, msg: Option<String>) -> WVResult {
    let command = {
        if req_id != 0 {
            format!(
                "window.ipc.rr.put_response({}, {})",
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
        request_id: i64,
    },
    GetGroups {
        request_id: i64,
    },
    CreateGroup {
        request_id: i64,
        group_name: String,
    },
    DeleteGroup {
        request_id: i64,
        group_id: i32,
    },
    UpdateGroup {
        request_id: i64,
        group_id: i32,
        name: String,
    },
    GetSubGroups {
        request_id: i64,
        group_id: i32,
    },
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
    GetRootNodes {
        request_id: i64,
        subgroup_id: i32,
    },
    GetChildNodes {
        request_id: i64,
        subgroup_id: i32,
        parent_id: i32,
    },
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
