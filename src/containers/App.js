import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux';
import classSet from 'classnames';
import blacklist from 'blacklist';
import { connect } from 'react-redux';
import { History,Link } from 'react-router'
import { IndexLink } from 'react-router';
import DocumentMeta from 'react-document-meta';
import MobileApp from '../mixins/MobileApp';
import { Container, NavigationBar } from '../components/mobile';
import configs from '../configs';

var App = React.createClass({

    mixins: [History],

    render() {
        var transitionName = 'view-transition-instant';
        var transitionDurationEnter = 10;
        var transitionDurationLeave = 60;
        var transitionEnabled = false;

        const { location } = this.props;
        const className = classSet('ViewManager');
        if (location && location.query && location.query.transition) {
            transitionName = 'view-transition-' + location.query.transition;
            if (location.query.transition === 'fade') {
                transitionDurationEnter = 10;
                transitionDurationLeave = 340;
            } else {
                transitionDurationEnter = 500;
                transitionDurationLeave = 500;
            }
        }
        const child = React.cloneElement(this.props.children);
        const viewKey = child.type.componentName;
        if (this.__currentView && this.__currentView != viewKey) {
            transitionEnabled = true;
        }
        this.__currentView = viewKey;

        var navOptions = child.type.getNavigation(this.props);
        navOptions = Object.assign(navOptions, {transition: transitionEnabled});
        if (this.refs.appNavBar) {
            setTimeout(() => {
                this.refs.appNavBar.updateWithTransition(navOptions, location.query.transition);
            }, 0)
        }
        return (
            <Container id="app" direction='column' fill>
                <DocumentMeta {...configs.app}/>
                <NavigationBar ref='appNavBar' name='app' {...navOptions} />
                <ReactCSSTransitionGroup transitionName={transitionName}
                                         transitionEnter={transitionEnabled}
                                         transitionLeave={transitionEnabled}
                                         transitionEnterTimeout={transitionDurationEnter}
                                         transitionLeaveTimeout={transitionDurationLeave}
                                         className={className}
                                         component="div">
                    <ViewContainer className='View' key={viewKey}>
                        {child}
                    </ViewContainer>
                </ReactCSSTransitionGroup>
            </Container>
        );
    }
});
var ViewContainer = React.createClass({
    statics: {
        shouldFillVerticalSpace: true
    },
    propTypes: {
        children: React.PropTypes.node
    },
    render () {
        var props = blacklist(this.props, 'children');
        return <div {...props}>{this.props.children}</div>;
    }
});

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
