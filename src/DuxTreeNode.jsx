import React from 'react';
import PropTypes from 'prop-types';

export default class DuxTreeNode extends React.Component {
    expandClicked = () => {
        this.props.expandClicked(this.props.id);
        if (this.props.isExpanded) {
            if (this.props.onCollapse) {
                this.props.onCollapse(this.props.id);
            }
        } else {
            if (this.props.onExpand) {
                this.props.onExpand(this.props.id);
            }
            if (this.props.onLoadChildren) {
                this.props.onLoadChildren(this.props.id);
            }
        }
    };

    onClick = () => {
        if (this.props.children) {
            this.expandClicked();
        } else if (this.props.checkable) {
            this.props.checkClicked(this.props.id);
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
        if (hasChildren || this.props.onLoadChildren) {
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

        const label = typeof this.props.label === 'function'
            ? this.props.label(this.props.id)
            : this.props.label;

        return (
            <div className="duxtree-node">
                { !hasChildren && this.props.onLoadChildren === undefined &&
                <div className="duxtree-disclosure">&nbsp;</div>
                }
                { (hasChildren || this.props.onLoadChildren) &&
                <div onClick={this.expandClicked} className="duxtree-disclosure">{disclosure}</div>
                }
                { this.props.checkable &&
                <div onClick={() => this.props.checkClicked(this.props.id)} className="duxtree-checkbox">
                    {checkedComponent}
                </div>
                }
                { this.props.icon &&
                <div className="duxtree-icon" onClick={this.onClick}>{this.props.icon}</div>
                }
                <div className="duxtree-label" onClick={this.onClick}>
                    {label}
                </div>
                { this.props.isLoading &&
                <div className="duxtree-node-children">
                    <div className="duxtree-loadingmsg">{this.props.loadingMsg}</div>
                </div>
                }
                { !this.props.isLoading &&
                <div className="duxtree-node-children">
                    {this.props.isExpanded && this.props.children}
                </div>
                }
            </div>
        );
    }
}

DuxTreeNode.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]).isRequired,
    checkedState: PropTypes.string.isRequired,
    checkable: PropTypes.bool.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    defaultExpanded: PropTypes.bool,
    loadingMsg: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,

    checkboxUnchecked: PropTypes.node,
    checkboxChecked: PropTypes.node,
    checkboxIndeterminate: PropTypes.node,

    icon: PropTypes.node,

    disclosureExpand: PropTypes.node,
    disclosureCollapse: PropTypes.node,

    checkClicked: PropTypes.func.isRequired,
    expandClicked: PropTypes.func.isRequired,

    // callbacks
    onExpand: PropTypes.func,
    onCollapse: PropTypes.func,
    onLoadChildren: PropTypes.func,
};
