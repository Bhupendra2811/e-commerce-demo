import { login, logout } from "components/store/slices";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.AuthData);
    const checkUserInfo = () => {
        const userToken = localStorage.getItem('userInfo');
        if (!userToken || userToken === 'undefined') {
            dispatch(logout());
            return navigate('/signin');
        }
        dispatch(login());
    }
    useEffect(() => {
        checkUserInfo();
    }, [isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;