import C from './constants';
import { getNodeCheckedState, getTreeStateData, setDefaultCheckStateForChildren, setDefaultExpandedForChildren, setNodeCheckState, setNodeFamiliesForChildren } from './util';
import _ from 'lodash';

/**
 *
 * DuxTree state:
 *
 * expandedNodes
 *
 *    An associative array of boolean values, indexed by the node id.  True if the node
 *    is expanded.  The default is false.
 *
 * family[]
 *
 *    An associative array of objects, indexed by the node id.  The objects are defined as:
 *
 *    {
 *        parentId: the id of the parent node
 *        children[]: array of the child ids
 *    }
 *
 * checked[]
 *
 *    An associative array of boolean values, indexed by the node id.  True if the node
 *    is checked.  The default is false.  For nodes with children, this value will be true
 *    if any of the node's descendants (at any level) are checked.
 *
 */

export const initializeTreeData = (treeName, data) => (dispatch, getState) => {
    const state = getState();

    const checked = _.cloneDeep(getTreeStateData(state, treeName, 'checked', {}));
    setDefaultCheckStateForChildren(checked, data);

    const expandedNodes = _.cloneDeep(getTreeStateData(state, treeName, 'expandedNodes', {}));
    setDefaultExpandedForChildren(expandedNodes, data);

    const family = _.cloneDeep(getTreeStateData(state, treeName, 'family', {}));
    setNodeFamiliesForChildren(family, data, '__duxtree_root');

    dispatch({
        type: C.DUXTREE_SET_DATA,
        tree: treeName,
        data: { checked, expandedNodes, family }
    });
};

export const setNodeCheckedValue = (treeName, id, value) => (dispatch, getState) => {
    const state = getState();

    const checked = _.cloneDeep(getTreeStateData(state, treeName, 'checked', {}));
    checked[id] = value;
    dispatch({
        type: C.DUXTREE_SET_DATA,
        tree: treeName,
        data: { checked }
    });
};

export const setNodeExpandedValue = (treeName, id, value) => (dispatch, getState) => {
    const state = getState();

    const expandedNodes = _.cloneDeep(getTreeStateData(state, treeName, 'expandedNodes', {}));
    expandedNodes[id] = value;
    dispatch({
        type: C.DUXTREE_SET_DATA,
        tree: treeName,
        data: { expandedNodes }
    });
};

export const toggleNodeChecked = (treeName, id) => (dispatch, getState) => {
    const state = getState();

    const checked = getTreeStateData(state, treeName, 'checked', {});
    const family = getTreeStateData(state, treeName, 'family', {});

    if (!family.hasOwnProperty(id) || !family.hasOwnProperty(family[id].parentId)) {
        return;  // nothing to do
    }

    if (!checked.hasOwnProperty(id)) {
        checked[id] = true;
    } else if (family[id].children.length) {
        // The node has children.  Get the node's check state (full, partial, or none)
        const checkedState = getNodeCheckedState(state, treeName, id);
        if (checkedState === 'full') {
            // Uncheck this node and all descendants
            setNodeCheckState(checked, family, id, false);
        } else {
            // Check this node and all descendants
            setNodeCheckState(checked, family, id, true);
        }
    } else {
        checked[id] = !checked[id];
    }

    dispatch({
        type: C.DUXTREE_SET_DATA,
        tree: treeName,
        data: { checked }
    });
};

export const toggleNodeExpanded = (treeName, id) => (dispatch, getState) => {
    const state = getState();

    const expandedNodes = getTreeStateData(state, treeName, 'expandedNodes', {});
    const value = expandedNodes.hasOwnProperty(id) && expandedNodes[id];
    expandedNodes[id] = !value;
    dispatch({
        type: C.DUXTREE_SET_DATA,
        tree: treeName,
        data: { expandedNodes }
    });
};
