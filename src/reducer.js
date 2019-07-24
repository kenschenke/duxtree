import C from './constants';
import _ from 'lodash';

export default (state={}, action) => {
    let newState;

    const startingState = JSON.stringify(state);

    switch (action.type) {
        case C.DUXTREE_SET_DATA:
            newState = _.cloneDeep(state);
            if (!newState.hasOwnProperty(action.tree)) {
                newState[action.tree] = action.data;
            } else {
                newState[action.tree] = _.assign(newState[action.tree], action.data);
            }
            const endingState = JSON.stringify(state);
            if (startingState !== endingState) {
                console.error('state corrupted!!!');
            }
            return newState;

        default:
            return state;
    }
};
