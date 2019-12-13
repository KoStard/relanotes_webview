Commands:
- Init - just to check the connection

- GetGroups
- CreateGroup(group_mame)
- DeleteGroup(group_id)
- UpdateGroup(group_id, name)

- GetSubGroups(group_id, subgroup_name)
- CreateSubGroup(subgroup_id)
- DeleteSubGroup(subgroup_id)
- LoadSubGroup(subgroup_id)

- GetRootNodes(subgroup_id)
- GetChildNodes(parent_id)

- UpdateNode(node_id, name, description)
- CreateNode(parent_id, name, description)
- DeleteNode(node_id)
- RecursiveDeleteNode(node_id)


*Maybe
- MoveNode(subgroup_id)


What will happen if user tries to add a group with duplicate name?
What will happen if user tries to access nodes from removed group/subgroup?
    - Maybe add message type to inform the front-end that the group/subgroup was removed

How will I track node path?
    - currently will track in the front-end and clicks to go back in the history
        - otherwise I would need to calculate path for each node from scratch in the back-end, which is not necessary (currently)
    - can use paths from back-end for searching

How will we handle node types in the front-end?
    - maybe add colors for them
    - but we have to show some metadata in the detailed view for currently opened node
        - regular
        - sticky_note
            - maybe show whole interface in another color (yellowish)
        - inherited
            - maybe show relative path in another color in the breadcrumb
        - symlink
            - without description input field - maybe we can show the target node description, but inactive
            - what about path? It can be located only in the root, so maybe show the original node instead?
            - maybe show whole interface in another color (bluish)
    - how will the user select node type when creating a node

Maybe allow adding multiple chained nodes at once - node 1 ~ node 2 -- ... - the description will be blank - the path can be relative to regular nodes
    - anyway we have questions here, because how will we select node types? Maybe with two ~~ indication just relation
What about adding just `collection nodes` without description - can be included in inherited nodes

Maybe hover the first group/subgroup when opened.
Maybe use detailed view delete button in the root to delete the group?