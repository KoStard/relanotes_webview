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