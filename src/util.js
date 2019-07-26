/**
 * This function returns the checked state of the node as a string:
 *
 *    'full' - this node and all of the node's children are checked
 *    'partial' - some of the nodes children (but not all) are checked
 *    'none' - this node is not checked and none of its children are checked
 *
 * @param state
 * @param treeName
 * @param id
 */


export const getNodeCheckedState = (state, treeName, id) => {
    const nodes = getTreeStateData(state, treeName, 'nodes', {});
    if (!nodes.hasOwnProperty(id)) {
        return 'none';
    }
    if (!nodes[id].children.length) {
        return nodes[id].isChecked ? 'full' : 'none';
    }

    // The node has children.  Check the state of each of the children.
    let allFull = true;
    let allNone = true;
    for (let i = 0; i < nodes[id].children.length; i++) {
        const childState = getNodeCheckedState(state, treeName, nodes[id].children[i]);
        if (childState !== 'full') {
            allFull = false;
        }
        if (childState !== 'none') {
            allNone = false;
        }
    }

    if (allFull) {
        return 'full';
    } else if (allNone) {
        return 'none';
    } else {
        return 'partial';
    }
};

export const getTreeStateData = (state, treeName, field, defaultValue) => {
    if (!state.hasOwnProperty('duxtree')) {
        return defaultValue;
    }

    if (!state.duxtree.hasOwnProperty(treeName)) {
        return defaultValue;
    }

    if (!state.duxtree[treeName].hasOwnProperty(field)) {
        return defaultValue;
    }

    return state.duxtree[treeName][field];
};

export const isNodeExpanded = (state, treeName, id, defaultValue) => {
    const nodes = getTreeStateData(state, treeName, 'nodes', {});
    if (nodes.hasOwnProperty(id)) {
        return nodes[id].isExpanded;
    }

    return defaultValue;
};

export const isNodeLoading = (state, treeName, id) => {
    const nodes = getTreeStateData(state, treeName, 'nodes', {});
    if (nodes.hasOwnProperty(id)) {
        return nodes[id].isLoading;
    }

    return false;
};

export const setNodeCheckState = (nodes, id, value) => {
    nodes[id].isChecked = value;

    for (let i = 0; i < nodes[id].children.length; i++) {
        setNodeCheckState(nodes, nodes[id].children[i], value);
    }
};

export const updateTreeDataForChildren = (nodes, children, parentId) => {
    for (let i = 0; i < children.length; i++) {
        if (!children[i].hasOwnProperty('id')) {
            console.error('DuxTree: all nodes must have an id');
            continue;
        }

        const id = children[i].id;

        if (!nodes.hasOwnProperty(id)) {
            let isChecked = false;
            if (children[i].hasOwnProperty('defaultChecked') && children[i].defaultChecked) {
                isChecked = true;
            }

            let isExpanded = false;
            if (children[i].hasOwnProperty('defaultExpanded') && children[i].defaultExpanded) {
                isExpanded = true;
            }

            nodes[id] = {
                parentId,
                children: [],
                isChecked,
                isExpanded,
                isLoading: false
            };

            if (!nodes.hasOwnProperty(parentId)) {
                nodes[parentId] = { children: [] };
            }
            nodes[parentId].children.push(id);
        } else {
            if (nodes[id].parentId !== parentId) {
                // The node was re-parented.  Remove it from the children of the old parent
                // and add it to the children of the new parent.
                const oldParentId = nodes[id].parentId;
                const index = nodes[oldParentId].children.indexOf(id);
                if (index !== -1) {
                    nodes[oldParentId].children.splice(index, 1);
                }
                nodes[parentId].children.push(id);
                nodes[id].parentId = parentId;
            }
        }

        nodes[id].onExpand = children[i].onExpand;
        nodes[id].onCollapse = children[i].onCollapse;

        if (children[i].hasOwnProperty('children')) {
            updateTreeDataForChildren(nodes, children[i].children, id);
        }
    }
};

