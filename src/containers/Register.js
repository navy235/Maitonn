import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Route, Link,IndexLink} from 'react-router';
import { Spin } from 'antd';
import * as actionCreators from '../actions/auth'
import { RegisterForm } from '../components';
import { Container } from '../components/mobile';
import connectStatic from '../utils/connectStatic'


const Register = React.createClass({

    onSubmit(data){
        this.props.actions.register(data);
    },

    render() {
        let {auth:{registering, registerError}} =this.props;
        return (
            <Container id="register" fill>
                <h1>Register Pager</h1>
                <IndexLink to='/' query={{transition:'show-from-left'}}>home</IndexLink>
                <Link to='/login' query={{transition:'show-from-left'}}>Login page</Link>
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
    animate: 'right',
    componentName: 'register',
    getNavigation(){
        return {
            title: 'Register'
        }
    }
};

export default connectStatic(statics)(connect(mapStateToProps, mapDispatchToProps)(Register))

