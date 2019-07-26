import C from './constants';
import { getNodeCheckedState, getTreeStateData, setNodeCheckState, updateTreeDataForChildren } from './util';
import _ from 'lodash';

/**
 *
 * DuxTree state:
 *
 * nodes
 *
 *    An associative array of objects, indexed by the node id.
 *
 *    {
 *        parentId: the id of the parent node
 *        children[]: array of the child ids
 *        isExpanded: True if the node is expanded.  The default is false.
 *        isChecked: True of the node is checked.  The default is false.
 *        isLoading: True if the node is lazy-loading children.  The default is false.
 *        onLazyLoad: Callback (if preset) is called to lazy-load children.
 *    }
 *
 */

export const setNodeIsLoading = (treeName, id, isLoading) => (dispatch, getState) => {
    const state = getState();

    const nodes = getTreeStateData(state, treeName, 'nodes', {});

    if (!nodes.hasOwnProperty(id)) {
        console.error(`DuxTree: id ${id} not found in tree`);
        return;
    }

    nodes[id].isLoading = isLoading;

    dispatch({
        type: C.DUXTREE_SET_DATA,
        tree: treeName,
        data: { nodes }
    });
};

export const toggleNodeChecked = (treeName, id) => (dispatch, getState) => {
    const state = getState();

    const nodes = getTreeStateData(state, treeName, 'nodes', {});

    if (!nodes.hasOwnProperty(id) || !nodes.hasOwnProperty(nodes[id].parentId)) {
        console.error(`DuxTree: ${id} not found in node data`);
        return;  // nothing to do
    }

    if (nodes[id].children.length) {
        // The node has children.  Get the node's check state (full, partial, or none)
        const checkedState = getNodeCheckedState(state, treeName, id);
        if (checkedState === 'full') {
            // Uncheck this node and all descendants
            setNodeCheckState(nodes, id, false);
        } else {
            // Check this node and all descendants
            setNodeCheckState(nodes, id, true);
        }
    } else {
        nodes[id].isChecked = !nodes[id].isChecked;
    }

    dispatch({
        type: C.DUXTREE_SET_DATA,
        tree: treeName,
        data: { nodes }
    });
};

export const toggleNodeExpanded = (treeName, id) => (dispatch, getState) => {
    const state = getState();

    const nodes = getTreeStateData(state, treeName, 'nodes', {});
    nodes[id].isExpanded = !nodes[id].isExpanded;
    dispatch({
        type: C.DUXTREE_SET_DATA,
        tree: treeName,
        data: { nodes }
    });
};

export const updateTreeData = (treeName, data) => (dispatch, getState) => {
    const state = getState();

    const nodes = _.cloneDeep(getTreeStateData(state, treeName, 'nodes', {}));
    updateTreeDataForChildren(nodes, data, '__duxtree_root');

    dispatch({
        type: C.DUXTREE_SET_DATA,
        tree: treeName,
        data: { nodes }
    });
};

