import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapDuxTreeProps, mapDuxTreeDispatch } from './DuxTree.map';
import DuxTreeNode from './DuxTreeNode';

class DuxTreeUi extends React.Component {
    componentDidMount() {
        this.props.updateTree(this.props.name, this.props.data);
    }

    componentDidUpdate(prevProps) {
        this.props.updateTree(this.props.name, this.props.data);
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

            const defaultExpanded = child.hasOwnProperty('defaultExpanded') ? child.defaultExpanded : false;

            return (
                <DuxTreeNode
                    key={child.id}
                    id={child.id}
                    label={child.label}
                    treeName={this.props.name}
                    defaultExpanded={defaultExpanded}
                    loadingMsg={loadingMsg}
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
}

DuxTreeUi.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,

    updateTree: PropTypes.func.isRequired,
};

export default connect(mapDuxTreeProps, mapDuxTreeDispatch)(DuxTreeUi);
