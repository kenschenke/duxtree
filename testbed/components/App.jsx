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
                    icon: <i className="material-icons-outlined">folder</i>,
                    children: [
                        {
                            id: 'item1',
                            label: 'Item 1',
                            icon: <i className="material-icons-outlined">folder</i>,
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
                            icon: <i className="material-icons-outlined">folder</i>,
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
                    icon: <i className="material-icons-outlined">folder</i>,
                    defaultExpanded: true,
                    children: [
                        {
                            id: 'item3',
                            label: () => { return 'Item 3 by function'; }
                        },
                        {
                            id: 'item4',
                            label: <a href="/downloads/item4">Item 4</a>
                        }
                    ]
                },
                {
                    id: 'item5',
                    label: 'Item 5',
                    checkable: false
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
        const check = <span>Q</span>;
        return (
            <div>
                <h1>Hello World</h1>
                <DuxTree
                    data={this.state.treeData}
                    checkable={true}
                    checkboxUnchecked={<i className="material-icons">check_box_outline_blank</i>}
                    checkboxChecked={<i className="material-icons-outlined">check_box</i>}
                    checkboxIndeterminate={<i className="material-icons-outlined">indeterminate_check_box</i>}
                    disclosureExpand={<i className="material-icons-outlined">arrow_right</i>}
                    disclosureCollapse={<i className="material-icons-outlined">arrow_drop_down</i>}
                />
                <button className="btn btn-secondary" onClick={this.buttonClicked}>Click Me</button>
            </div>
        );
    }
}
