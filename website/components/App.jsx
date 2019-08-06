import React from 'react';
import { NavBar } from './NavBar';
import { Topic } from './Topic';

import IntroHtml from '../html/Intro.html';

import GettingStartedHtml from '../html/GettingStarted.html';

import BasicsHtml from '../html/Basics.html';
import { Basics } from './Basics';
import BasicsSource from '../source/Basics.txt';

import TreeDataHtml from '../html/TreeData.html';

import CheckboxesHtml from '../html/Checkboxes.html';
import { Checkboxes } from './Checkboxes';
import CheckboxesSource from '../source/Checkboxes.txt';

import CustomizingHtml from '../html/Customizing.html';

import LazyLoadingHtml from '../html/LazyLoading.html';
import { LazyLoading } from './LazyLoading';
import LazyLoadingSource from '../source/LazyLoading.txt';

import CallbacksHtml from '../html/Callbacks.html';

const topics = [
    {
        topic: 'intro',
        html: IntroHtml
    },
    {
        topic: 'gettingstarted',
        html: GettingStartedHtml
    },
    {
        topic: 'basics',
        html: BasicsHtml,
        component: Basics,
        source: BasicsSource
    },
    {
        topic: 'treedata',
        html: TreeDataHtml,
    },
    {
        topic: 'checkboxes',
        html: CheckboxesHtml,
        component: Checkboxes,
        source: CheckboxesSource
    },
    {
        topic: 'custom',
        html: CustomizingHtml
    },
    {
        topic: 'lazyloading',
        html: LazyLoadingHtml,
        component: LazyLoading,
        source: LazyLoadingSource
    },
    {
        topic: 'callbacks',
        html: CallbacksHtml
    }
];

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { currentTopic: 'intro'};
    }

    topicClicked = topic => {
        this.setState({ currentTopic: topic });
    };

    render() {
        const topicComponents = topics.map(topic => {
            return (
                <Topic
                    show={topic.topic === this.state.currentTopic}
                    key={topic.topic}
                    topic={topic.topic}
                    component={topic.component}
                    source={topic.source}
                    html={topic.html}
                />
            );
        });

        return (
            <div className="container">
                <NavBar topicClicked={this.topicClicked}/>
                {topicComponents}
            </div>
        );
    }
}


