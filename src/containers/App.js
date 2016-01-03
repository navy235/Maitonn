import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { History,Link } from 'react-router'
import { IndexLink } from 'react-router';
import DocumentMeta from 'react-document-meta';
import MobileApp from '../mixins/MobileApp';
import { Container, NavigationBar } from '../components/mobile';
import configs from '../configs';
import * as authActions from '../actions/auth'



var App = React.createClass({

    mixins: [History,MobileApp],

    componentWillReceiveProps(nextProps) {
        if (!this.props.auth.token && nextProps.auth.token) {
            // login
            this.history.pushState(null, '/list');
        } else if (this.props.auth.token && !nextProps.auth.token) {
            // logout
            this.history.pushState(null, '/login');
        }
    },

    handleLogout(){
        this.props.actions.logout();
    },

    render() {
        const {auth:{token}} = this.props;

        const child = React.cloneElement(this.props.children, {key: new Date().getTime()});

        const animate = child.type.animate;

        const disabledAnimate = !this.prevAnimate || animate == this.prevAnimate;

        this.prevAnimate = animate;

        return (
            <Container id="app" direction='column' fill>
                <DocumentMeta {...configs.app}/>
                <NavigationBar name='main'/>
                <ReactCSSTransitionGroup transitionName={animate}
                                         transitionEnter={!disabledAnimate}
                                         transitionLeave={!disabledAnimate}
                                         transitionEnterTimeout={1500}
                                         transitionLeaveTimeout={1500}
                                         component='div'>
                    {child}
                </ReactCSSTransitionGroup>
            </Container>
        );
    }
});

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)