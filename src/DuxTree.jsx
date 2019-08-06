import React from 'react';
import PropTypes from 'prop-types';
import DuxTreeNode from './DuxTreeNode';
import { getNodeCheckedState, isNodeExpanded, setNodeCheckState, updateTreeDataForChildren } from './util';
import _ from 'lodash';

export default class DuxTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = { nodes: {} };
    }

    componentDidMount() {
        this.updateTreeData();
    }

    componentDidUpdate(prevProps) {
        this.updateTreeData();
    }

    renderChildren = children => {
        return children.map(child => {
            if (!child.hasOwnProperty('id')) {
                console.error('DuxTree: all tree nodes must have an id');
            }
            if (!child.hasOwnProperty('label')) {
                console.error('DuxTree: all tree nodes must have a label');
            }

            let childNodes;
            if (child.hasOwnProperty('children')) {
                childNodes = this.renderChildren(child.children);
            }

            let loadingMsg = 'Loading...';
            if (child.hasOwnProperty('loadingMsg')) {
                loadingMsg = child.loadingMsg;
            }

            let isLoading = false;
            if (child.hasOwnProperty('isLoading')) {
                isLoading = child.isLoading;
            }

            let onExpand = this.props.onExpand;
            if (child.hasOwnProperty('onExpand')) {
                onExpand = child.onExpand;
            }

            let onCollapse = this.props.onCollapse;
            if (child.hasOwnProperty('onCollapse')) {
                onCollapse = child.onCollapse;
            }

            let onLoadChildren;
            if (child.hasOwnProperty('onLoadChildren')) {
                onLoadChildren = child.onLoadChildren;
            }

            let checkable = this.props.checkable;
            if (child.hasOwnProperty('checkable')) {
                checkable = child.checkable;
            }

            const defaultExpanded = child.hasOwnProperty('defaultExpanded') ? child.defaultExpanded : false;

            return (
                <DuxTreeNode
                    key={child.id}
                    id={child.id}
                    label={child.label}
                    checkedState={getNodeCheckedState(this.state.nodes, child.id)}
                    isExpanded={isNodeExpanded(this.state.nodes, child.id, defaultExpanded)}
                    isLoading={isLoading}
                    defaultExpanded={defaultExpanded}
                    loadingMsg={loadingMsg}
                    checkable={checkable}
                    icon={child.icon}
                    checkClicked={() => this.toggleNodeChecked(child.id)}
                    expandClicked={() => this.toggleNodeExpanded(child.id)}
                    checkboxUnchecked={this.props.checkboxUnchecked}
                    checkboxIndeterminate={this.props.checkboxIndeterminate}
                    checkboxChecked={this.props.checkboxChecked}
                    disclosureExpand={this.props.disclosureExpand}
                    disclosureCollapse={this.props.disclosureCollapse}
                    onExpand={onExpand}
                    onCollapse={onCollapse}
                    onLoadChildren={onLoadChildren}
                >
                    {childNodes}
                </DuxTreeNode>
            );
        });
    };

    render() {
        return (
            <div className="duxtree">
                {this.renderChildren(this.props.data)}
            </div>
        );
    }

    toggleNodeChecked = id => {
        const nodes = _.cloneDeep(this.state.nodes);

        if (!nodes.hasOwnProperty(id) || !nodes.hasOwnProperty(nodes[id].parentId)) {
            console.error(`DuxTree: ${id} not found in node data`);
            return;  // nothing to do
        }

        if (nodes[id].children.length) {
            // The node has children.  Get the node's check state (full, partial, or none)
            const checkedState = getNodeCheckedState(nodes, id);
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

        this.setState({ nodes });
        if (this.props.onSelectionChanged) {
            const selected = [];
            for (let id in nodes) {
                if (nodes.hasOwnProperty(id) &&
                    (!nodes[id].hasOwnProperty('children') || nodes[id].children.length === 0) &&
                    nodes[id].isChecked) {
                    selected.push(id);
                }
            }
            this.props.onSelectionChanged(selected);
        }
    };

    toggleNodeExpanded = id => {
        const nodes = _.cloneDeep(this.state.nodes);

        nodes[id].isExpanded = !nodes[id].isExpanded;

        this.setState({ nodes });
    };

    updateTreeData = () => {
        const nodes = _.cloneDeep(this.state.nodes);

        const didUpdate = updateTreeDataForChildren(nodes, this.props.data, '__duxtree_root');
        if (didUpdate) {
            this.setState({ nodes });
        }
    };
}

DuxTree.propTypes = {
    data: PropTypes.array.isRequired,
    checkable: PropTypes.bool.isRequired,

    // customize checkboxes
    checkboxUnchecked: PropTypes.node,
    checkboxChecked: PropTypes.node,
    checkboxIndeterminate: PropTypes.node,

    // customize disclosures
    disclosureExpand: PropTypes.node,
    disclosureCollapse: PropTypes.node,

    // callbacks
    onExpand: PropTypes.func,
    onCollapse: PropTypes.func,
    onSelectionChanged: PropTypes.func,

};

DuxTree.defaultProps = {
    checkable: false
};
