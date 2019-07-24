import { initializeTreeData } from './actions';

export const mapDuxTreeProps = (state, props) => {
    return {

    };
};

export const mapDuxTreeDispatch = dispatch => {
    return {
        init(treeName, data) {
            dispatch(initializeTreeData(treeName, data));
        }
    };
};
