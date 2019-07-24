import C from '../src/constants';
import reducer from '../src/reducer';

describe('DuxTreeReducer tests', () => {
    test('tree does not exist', () => {
        const startingState = {
            tree1: { value1: 'value1' }
        };
        const expectedState = {
            tree1: { value1: 'value1' },
            tree2: { value2: 'value2' }
        };

        const before = JSON.stringify(startingState);
        const actualState = reducer(startingState, {
            type: C.DUXTREE_SET_DATA,
            tree: 'tree2',
            data: { value2: 'value2' }
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('add scalar value', () => {
        const startingState = {
            tree1: { value1: 'value1' },
            tree2: { value2: 'value2' }
        };
        const expectedState = {
            tree1: { value1: 'value1' },
            tree2: { value2: 'value2', value3: 'value3' }
        };

        const before = JSON.stringify(startingState);
        const actualState = reducer(startingState, {
            type: C.DUXTREE_SET_DATA,
            tree: 'tree2',
            data: { value3: 'value3' }
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('update scalar value', () => {
        const startingState = {
            tree1: { value1: 'value1' },
            tree2: { value2: 'value2', value3: 'value3' }
        };
        const expectedState = {
            tree1: { value1: 'value1' },
            tree2: { value2: 2, value3: 'value3' }
        };

        const before = JSON.stringify(startingState);
        const actualState = reducer(startingState, {
            type: C.DUXTREE_SET_DATA,
            tree: 'tree2',
            data: { value2: 2 }
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('add array value', () => {
        const startingState = {
            tree1: { value1: 'value1' },
            tree2: { value2: 'value2' }
        };
        const expectedState = {
            tree1: { value1: 'value1' },
            tree2: { value2: 'value2', array3: [1, 2, 3] }
        };

        const before = JSON.stringify(startingState);
        const actualState = reducer(startingState, {
            type: C.DUXTREE_SET_DATA,
            tree: 'tree2',
            data: { array3: [1, 2, 3] }
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('update array value adding elements', () => {
        const startingState = {
            tree1: { value1: 'value1' },
            tree2: { array2: [1, 2], array3: [1, 2, 3] }
        };
        const expectedState = {
            tree1: { value1: 'value1' },
            tree2: { array2: [1, 2, 3, 4], array3: [1, 2, 3] }
        };

        const before = JSON.stringify(startingState);
        const actualState = reducer(startingState, {
            type: C.DUXTREE_SET_DATA,
            tree: 'tree2',
            data: { array2: [1, 2, 3, 4] }
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('update array value removing elements', () => {
        const startingState = {
            tree1: { value1: 'value1' },
            tree2: { array2: [1, 2, 3, 4], array3: [1, 2, 3] }
        };
        const expectedState = {
            tree1: { value1: 'value1' },
            tree2: { array2: [1, 2], array3: [1, 2, 3] }
        };

        const before = JSON.stringify(startingState);
        const actualState = reducer(startingState, {
            type: C.DUXTREE_SET_DATA,
            tree: 'tree2',
            data: { array2: [1, 2] }
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });
});
