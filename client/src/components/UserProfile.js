import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import AuthServices from "./services/AuthServices";
import {  Avatar, makeStyles, List, ListItem, ListItemText, Divider} from "@material-ui/core";
import {  useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    large: {
        fontSize: '2.5rem',
        width: theme.spacing(12),
        height: theme.spacing(12)
    },

    dropdownClass: {
        display: "inline"
    }
     
}))




const UserProfile = ()=>{

    const classes = useStyles();
    const history = useHistory();

    const { user, setUser, setIsAuthenticated}= useContext(AuthContext);
    const Name = user?.fullName;
    const UserName = user?.username
    const NameAvatar = Name?.charAt(0);

    const handleLogout = () => {
        AuthServices.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
                history.push("/")
            }
        })
    }

    

    return(

        <div style={{ }} className="form_container">
            <div style={{ width: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>

            <List component="nav">

                    <ListItem ><ListItemText primary={<div style={{ display: "flex", padding: "10px", alignItems: "center",  justifyContent: "center" }}>{<Avatar className={classes.large}>{NameAvatar}</Avatar>}</div>} /></ListItem>
                    <ListItem><ListItemText primary={<div style={{ color: "grey", fontSize: "1.5rem", textAlign: "center", wordWrap: "break-word"}}>{Name}</div>} /></ListItem>
                    <ListItem><ListItemText primary={<div style={{ color: "grey", fontSize: "1rem", textAlign: "center", wordWrap: "break-word"}}> {UserName}</div> } /></ListItem>
                    <Divider />
                    <ListItem> <ListItemText primary={<div style={{ padding: "5px", textAlign: "center" }}><button className=" w-25 btn btn-block btn-warning " onClick={() => { history.push("/notes") }}> Notes</button></div>} /></ListItem>
                    <Divider />
                    <ListItem><ListItemText primary={<div style={{ padding: "5px", textAlign: "center" }}><button onClick={handleLogout} className="btn btn-outline-danger w-75">Logout</button></div>} /></ListItem>
            </List>
            </div>
        </div>
    );

}

export default UserProfile;