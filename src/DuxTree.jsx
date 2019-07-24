import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapDuxTreeProps, mapDuxTreeDispatch } from './DuxTree.map';
import uniqid from 'uniqid';
import DuxTreeNode from './DuxTreeNode';

/**
 * Data structure:
 *
 * [
 *     {
 *         label: 'Item label' | () | <element>,
 *         key: string | number,
 *         checkable: true | false,
 *         defaultChecked: true | false,
 *         defaultExpanded: true | false,
 *         icon: 'predefined' | () | <element>,
 *         children: [] | undefined,   // empty array means lazy loading, undefined means leaf node
 *         onExpanded: (),
 *         onChecked: (),
 *         onRender: (),
 *         loadingMsg: 'Loading...',
 *     },
 *     ...
 * ]
 *
 * State data structure
 *
 *
 */

/**
 *
 * The issue:
 *
 * DuxTree is not getting re-rendered when expandedNodes is updated.  This is because
 * Redux does a shallow comparison of the object properties and changes to the expandedNodes
 * object are not enough to trigger a re-render.
 *
 * How to fix this:
 *
 * DuxTree needs to create DuxTreeNode objects and let the Redux map pass in isExpanded into
 * each component.  That should be enough to trigger re-renders.
 *
 */

class DuxTreeUi extends React.Component {
    componentDidMount() {
        this.props.init(this.props.name, this.props.data);
    }

    renderChildren = children => {
        return children.map(child => {
            const id = child.hasOwnProperty('id') ? child.id : uniqid();

            const hasChildren = child.hasOwnProperty('children');
            let childNodes;
            if (hasChildren) {
                childNodes = this.renderChildren(child.children);
            }

            return (
                <DuxTreeNode
                    key={id}
                    id={id}
                    label={child.label}
                    treeName={this.props.name}
                >
                    {childNodes}
                </DuxTreeNode>
            );
        });
    };

    render() {
        return (
            <div className="duxtree">
                {this.renderChildren(this.props.data, '__duxtree_root')}
            </div>
        );
    }
}

DuxTreeUi.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,

    init: PropTypes.func.isRequired
};

export default connect(mapDuxTreeProps, mapDuxTreeDispatch)(DuxTreeUi);
