import React, { Component } from 'react';
import { Route, Link, State, History,IndexLink} from 'react-router';
import connectStatic from '../utils/connectStatic'
import { Container } from '../components/mobile';


const Home = React.createClass({
    render() {
        return (
            <Container id="home" fill >
                <Link to='/login' query={{transition:'show-from-right'}}>Login page</Link>
                <Link to='/Register' query={{transition:'show-from-right'}}>Register page</Link>
                <Link to='/list' query={{transition:'show-from-right'}}>list page</Link>
            </Container>
        );
    }
});

var statics = {
    componentName: 'home',
    animate: 'instant',
    getNavigation(){
        return {
            title: 'Home'
        }
    }
};

export default connectStatic(statics)(Home);


