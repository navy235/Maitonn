import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route, Link,IndexLink} from 'react-router';
import { connect } from 'react-redux'
import { Spin } from 'antd';
import * as actionCreators from '../actions/auth'
import { LoginForm } from '../components';
import { Container } from '../components/mobile';
import connectStatic from '../utils/connectStatic'

var scrollable = Container.initScrollable();

const Login = React.createClass({

    onSubmit(data){
        data.grant_type = 'password';
        this.props.actions.login(data);
    },

    render() {
        let {auth:{loggingIn, loginError}} =this.props;
        return (
            <Container id="login" fill scrollable={scrollable}>
                <h1>Login Page</h1>
                <IndexLink to='/' query={{transition:'show-from-left'}}>home</IndexLink>
                <Link to='/login' query={{transition:'show-from-right'}}>login page</Link>
                <Link to='/Register' query={{transition:'show-from-right'}}>Register page</Link>
                <div className='scrollView'>
                    <LoginForm onSubmit={this.onSubmit} submitting={loggingIn} ref='loginForm'/>
                </div>
            </Container>
        );
    }
});

function mapStateToProps(state) {
    return {
        auth: state.auth,
        form: state.form
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)}
}

var statics = {
    componentName: 'login',
    animate: 'left',
    getNavigation(props){
        const {history,dispatch,state}=props;
        return {
            leftArrow: true,
            leftAction: () => {
                history.pushState(null, '/', {transition: 'reveal-from-right'})
            },
            title: 'Login'
        }
    }
};

export default connectStatic(statics)(connect(mapStateToProps, mapDispatchToProps)(Login))

