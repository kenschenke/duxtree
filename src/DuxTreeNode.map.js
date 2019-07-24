import { toggleNodeChecked, toggleNodeExpanded } from './actions';
import { getNodeCheckedState, isNodeExpanded } from './util';

export const mapDuxTreeNodeProps = (state, props) => {
    return {
        checkedState: getNodeCheckedState(state, props.treeName, props.id),
        isExpanded: isNodeExpanded(state, props.treeName, props.id, props.defaultExpanded)
    };
};

export const mapDuxTreeNodeDispatch = dispatch => {
    return {
        checkClicked(treeName, id) {
            dispatch(toggleNodeChecked(treeName, id));
        },

        expandClicked(treeName, id) {
            dispatch(toggleNodeExpanded(treeName, id));
        }
    };
};
