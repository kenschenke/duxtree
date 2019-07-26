import React from 'react';
import DuxTree from '../../src/DuxTree';
import _ from 'lodash';

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: [
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
            ]
        };
    }

    buttonClicked = () => {
        const treeData = _.cloneDeep(this.state.treeData);

        treeData.push({
            id: 'item7',
            label: 'Item 7',
            defaultChecked: true
        });

        this.setState({ treeData });
    };

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <DuxTree data={this.state.treeData}/>
                <button className="btn btn-secondary" onClick={this.buttonClicked}>Click Me</button>
            </div>
        );
    }
}
