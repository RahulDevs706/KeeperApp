import React, { useRef, useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Forms from "./Forms/SignupForm";

import AuthServices from './services/AuthServices';
import { AuthContext } from '../context/AuthContext';
import Message from "./Message";
import {useHistory} from "react-router-dom";





function TabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: ".5rem"

        

    },
}));

const initialState = {
    fullName:"",
    username:"",
    password:""
}

 function UserLogin() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [user, setUser] = useState(initialState);
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    let timerID = useRef(null);

    useEffect(() => {
        return()=>{
            clearTimeout(timerID);
        }
        
    }, [])


    const [isFormSignup, setIsFormSignup] = useState("login");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);

        if(index===0){
             setIsFormSignup("login")
        }else if(index===1){
            setIsFormSignup("signup");
        }
      

    };

    function handleChange_form(event){
        

        const {name, value} = event.target;

        setUser({...user, [name]:value});

       
    }

     const history = useHistory();

     const resetForm = ()=>{
         setUser({initialState})
     }
     
    function HandleSignup(event) {
    
        AuthServices.register(user).then(data => {
            const {message} =data
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timerID = setTimeout(()=>{
                    setValue(0);
                    setIsFormSignup("login")
                }, 2000);
            }
        });

        
       
        event.preventDefault();
            
    }

     function HandleLogin(event) {
        event.preventDefault();

        AuthServices.login(user).then(data=>{
            const {isAuthenticated, user, message}= data;
            
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                history.push('/notes');
            }else if (!isAuthenticated) {

                setMessage({ msgBody: "Invalid credentials", msgError: true })
                

            }
        });
     }

    const isSignup = ()=>setIsFormSignup("signup");
    const isLogin = ()=>setIsFormSignup("login")

    


    return (<div className="form_container">
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab onClick={isLogin} label="Login" />
                    <Tab onClick={isSignup} label="Signup" />

                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Forms
                    user={user}
                    handleChange_form={handleChange_form}
                    HandleSubmit={HandleLogin}
                    isSignup={isFormSignup}
                     />
                    {message? <Message message={message} />: null}

                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Forms
                        user={user}
                        handleChange_form={handleChange_form}
                        HandleSubmit={HandleSignup}
                        // HandleLogin={HandleLogin}

                        isSignup={isFormSignup}
                    />
                    {message ? <Message message={message} /> : null}

                </TabPanel>

            </SwipeableViews>
        </div>
    </div>
    );
}


export default UserLogin;