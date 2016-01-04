import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { History,Link } from 'react-router'
import { Spin } from 'antd';
import { Container, NavigationBar } from '../components/mobile';
import connectStatic from '../utils/connectStatic'
import * as orderActions from '../actions/order'
import * as authActions from '../actions/auth'

var List = React.createClass({

    displayName: 'List',

    mixins: [History],

    render() {
        return (
            <Container id="list" fill>
                <Link to='/login' query={{transition:'show-from-right'}}>Login page</Link>
                <Link to='/Register' query={{transition:'show-from-right'}}>Register page</Link>
            </Container>
        );
    }
});

function mapStateToProps(state) {
    return {
        auth: state.auth,
        order: state.order
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(orderActions, dispatch)}
}

function fetchData(dispatch, getState, params, query) {
    dispatch(authActions.loadAuthToken(getState().auth.token));
    return dispatch(orderActions.load()).then(()=> {
        let orderId = getState().order.list[0].orderID;
        dispatch(orderActions.loadOrderById(orderId))
    });
}


export default connectStatic({fetchData: fetchData})(connect(mapStateToProps, mapDispatchToProps)(List))

