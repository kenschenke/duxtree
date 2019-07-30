import React from 'react';
import PropTypes from 'prop-types';

export default class DuxTreeNode extends React.Component {
    expandClicked = id => {
        this.props.expandClicked(id);
        if (this.props.isExpanded) {
            if (this.props.onExpand) {
                this.props.onExpand(id);
            }
        } else {
            if (this.props.onCollapse) {
                this.props.onCollapse(id);
            }
        }
    };

    render() {
        const hasChildren = this.props.children !== undefined;
        let checkedComponent = '';

        if (this.props.checkedState === 'full') {
            if (this.props.checkboxChecked) {
                checkedComponent = this.props.checkboxChecked;
            } else {
                checkedComponent = <input type="checkbox" readOnly={true} checked={true} ref={el => el && (el.indeterminate = false)}/>;
            }
        } else if (this.props.checkedState === 'partial') {
            if (this.props.checkboxIndeterminate) {
                checkedComponent = this.props.checkboxIndeterminate;
            } else {
                checkedComponent = <input type="checkbox" readOnly={true} checked={true} ref={el => el && (el.indeterminate = true)}/>;
            }
        } else if (this.props.checkedState === 'none') {
            if (this.props.checkboxUnchecked) {
                checkedComponent = this.props.checkboxUnchecked;
            } else {
                checkedComponent = <input type="checkbox" readOnly={true} checked={false} ref={el => el && (el.indeterminate = false)}/>;
            }
        }

        let disclosure;
        if (hasChildren) {
            if (this.props.isExpanded) {
                if (this.props.disclosureCollapse) {
                    disclosure = this.props.disclosureCollapse;
                } else {
                    disclosure = <span>-</span>;
                }
            } else {
                if (this.props.disclosureExpand) {
                    disclosure = this.props.disclosureExpand;
                } else {
                    disclosure = <span>+</span>;
                }
            }
        }

        return (
            <div className="duxtree-node">
                { hasChildren &&
                <div onClick={() => this.expandClicked(this.props.id)} className="duxtree-disclosure">{disclosure}</div>
                }
                <div onClick={() => this.props.checkClicked(this.props.id)} className="duxtree-checkbox">
                    {checkedComponent}
                </div>
                &nbsp;
                {this.props.isLoading ? this.props.loadingMsg : this.props.label}
                <div className="duxtree-node-children">
                    {this.props.isExpanded && this.props.children}
                </div>
            </div>
        );
    }
}

DuxTreeNode.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.string.isRequired,
    checkedState: PropTypes.string.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    defaultExpanded: PropTypes.bool,
    loadingMsg: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,

    checkboxUnchecked: PropTypes.node,
    checkboxChecked: PropTypes.node,
    checkboxIndeterminate: PropTypes.node,

    disclosureExpand: PropTypes.node,
    disclosureCollapse: PropTypes.node,

    checkClicked: PropTypes.func.isRequired,
    expandClicked: PropTypes.func.isRequired,

    // callbacks
    onExpand: PropTypes.func,
    onCollapse: PropTypes.func,
};
