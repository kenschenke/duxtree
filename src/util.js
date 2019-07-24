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
    const checked = getTreeStateData(state, treeName, 'checked', {});
    const family = getTreeStateData(state, treeName, 'family', {});
    if (!checked.hasOwnProperty(id)) {
        return 'none';
    }
    if (!family.hasOwnProperty(id) || !family[id].children.length) {
        return checked[id] ? 'full' : 'none';
    }

    // The node has children.  Check the state of each of the children.
    let allFull = true;
    let allNone = true;
    for (let i = 0; i < family[id].children.length; i++) {
        const childState = getNodeCheckedState(state, treeName, family[id].children[i]);
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

export const isNodeChecked = (state, treeName, id) => {
    const checked = getTreeStateData(state, treeName, 'checked', {});
    if (checked.hasOwnProperty(id)) {
        return checked[id];
    }

    return false;
};

export const isNodeExpanded = (state, treeName, id, defaultValue) => {
    const expandedNodes = getTreeStateData(state, treeName, 'expandedNodes', {});
    if (expandedNodes.hasOwnProperty(id)) {
        return expandedNodes[id];
    }

    return defaultValue;
};

export const setDefaultCheckStateForChildren = (checked, children) => {
    for (let i = 0; i < children.length; i++) {
        let isChecked = false;
        if (children[i].hasOwnProperty('defaultChecked') && children[i].defaultChecked) {
            isChecked = true;
        }

        checked[children[i].id] = isChecked;

        if (children[i].hasOwnProperty('children')) {
            setDefaultCheckStateForChildren(checked, children[i].children);
        }
    }
};

export const setDefaultExpandedForChildren = (expandedNodes, children) => {
    for (let i = 0; i < children.length; i++) {
        let defaultExpanded = false;
        if (children[i].hasOwnProperty('defaultExpanded') && children[i].defaultExpanded) {
            defaultExpanded = true;
        }

        expandedNodes[children[i].id] = defaultExpanded;

        if (children[i].hasOwnProperty('children')) {
            setDefaultExpandedForChildren(expandedNodes, children[i].children);
        }
    }
};

export const setNodeCheckState = (checked, family, id, value) => {
    checked[id] = value;
    if (!family.hasOwnProperty(id)) {
        return;
    }

    for (let i = 0; i < family[id].children.length; i++) {
        setNodeCheckState(checked, family, family[id].children[i], value);
    }
};

export const setNodeFamiliesForChildren = (family, children, parentId) => {
    for (let i = 0; i < children.length; i++) {
        const id = children[i].id;
        if (!family.hasOwnProperty(id)) {
            family[id] = {
                parentId,
                children: []
            }
        } else {
            family[id].parentId = parentId;
        }

        if (!family.hasOwnProperty(parentId)) {
            family[parentId] = {
                children: []
            }
        }
        family[parentId].children.push(id);

        if (children[i].hasOwnProperty('children')) {
            setNodeFamiliesForChildren(family, children[i].children, id);
        }
    }
};
