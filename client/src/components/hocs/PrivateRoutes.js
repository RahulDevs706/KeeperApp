import React, {useContext} from 'react';
// import { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';

const PrivateRoutes = ({component: Component, ...rest}) =>{
    const {isAuthenticated} = useContext(AuthContext);
    return(
        <Route {...rest} render={props=>{
            if(!isAuthenticated){
                return <Redirect to={{pathname:'/' }} />
                } 

            return <Component {...props} />
        }} />
    );
}

export default PrivateRoutes;