import { updateTreeData } from './actions';

export const mapDuxTreeProps = (state, props) => {
    return {

    };
};

export const mapDuxTreeDispatch = dispatch => {
    return {
        updateTree(treeName, data) {
            dispatch(updateTreeData(treeName, data));
        }
    };
};
