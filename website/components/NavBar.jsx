import React from 'react';
import PropTypes from 'prop-types';

export const NavBar = props => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg">
            <a className="navbar-brand" href="#">
                <img src="duxtree.png" height={30} className="d-inline-block align-top mr-2"/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
                <span className="navbar-toggle-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbar">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={e => {e.preventDefault(); props.topicClicked('intro')}}>Welcome</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={e => {e.preventDefault(); props.topicClicked('gettingstarted')}}>Getting Started</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={e => {e.preventDefault(); props.topicClicked('basics')}}>DuxTree Basics</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup={true} aria-expanded={false}>Learn More</a>
                        <div className="dropdown-menu">
                            <a href="#" className="dropdown-item" onClick={e => {e.preventDefault(); props.topicClicked('treedata')}}>Populating a Tree</a>
                            <a href="#" className="dropdown-item" onClick={e => {e.preventDefault(); props.topicClicked('checkboxes')}}>Checkboxes</a>
                            <a href="#" className="dropdown-item" onClick={e => {e.preventDefault(); props.topicClicked('custom')}}>Customizing Appearance</a>
                            <a href="#" className="dropdown-item" onClick={e => {e.preventDefault(); props.topicClicked('lazyloading')}}>Loading on Demand</a>
                            <a href="#" className="dropdown-item" onClick={e => {e.preventDefault(); props.topicClicked('callbacks')}}>Callbacks</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    topicClicked: PropTypes.func.isRequired
};
