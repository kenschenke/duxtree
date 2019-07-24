import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapDuxTreeNodeProps, mapDuxTreeNodeDispatch } from './DuxTreeNode.map';

class DuxTreeNodeUi extends React.Component {
    render() {
        const hasChildren = this.props.children !== undefined;
        const expanderLabel = this.props.isExpanded ? '-' : '+';
        let checkedIndicator = '';

        if (this.props.checkedState === 'full') {
            checkedIndicator = 'X';
        } else if (this.props.checkedState === 'partial') {
            checkedIndicator = '/';
        } else if (this.props.checkedState === 'none') {
            checkedIndicator = 'O';
        }

        return (
            <div className="duxtree-node">
                { hasChildren &&
                <span onClick={() => this.props.expandClicked(this.props.treeName, this.props.id)} className="duxtree-disclosure">{expanderLabel}</span>
                }
                <span onClick={() => this.props.checkClicked(this.props.treeName, this.props.id)}>{checkedIndicator}</span>
                &nbsp;
                {this.props.label}
                <div className="duxtree-node-children">
                    {this.props.isExpanded && this.props.children}
                </div>
            </div>
        );
    }
}

DuxTreeNodeUi.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.string.isRequired,
    treeName: PropTypes.string.isRequired,
    checkedState: PropTypes.string.isRequired,
    isExpanded: PropTypes.bool.isRequired,

    checkClicked: PropTypes.func.isRequired,
    expandClicked: PropTypes.func.isRequired
};

export default connect(mapDuxTreeNodeProps, mapDuxTreeNodeDispatch)(DuxTreeNodeUi);
