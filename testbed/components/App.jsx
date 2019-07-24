import React from 'react';
import DuxTree from '../../src/DuxTree';
import DevTools from './DevTools';

const treeData = [
    {
        id: 'folder1',
        label: 'Folder 1',
        children: [
            {
                id: 'item1',
                label: 'Item 1',
                children: [
                    {
                        id: 'item12',
                        label: 'Item 12'
                    },
                    {
                        id: 'item13',
                        label: 'Item 13'
                    }
                ]
            },
            {
                id: 'item2',
                label: 'Item 2',
                children: [
                    {
                        id: 'item21',
                        label: 'Item 21',
                        defaultChecked: true
                    },
                    {
                        id: 'item22',
                        label: 'Item 22'
                    }
                ]
            }
        ]
    },
    {
        id: 'folder2',
        label: 'Folder 2',
        defaultExpanded: true,
        children: [
            {
                id: 'item3',
                label: 'Item 3'
            },
            {
                id: 'item4',
                label: 'Item 4'
            }
        ]
    },
    {
        id: 'item5',
        label: 'Item 5'
    }
];

export const App = () => (
    <div>
        <h1>Hello World</h1>
        <DuxTree name="myTree" data={treeData}/>
        <DevTools/>
    </div>
);
