import React, { useContext } from "react";
import * as IoIcons from "react-icons/io";
import {IconContext} from "react-icons";
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import { Avatar, IconButton} from "@material-ui/core";






function Header(){
    

    const {isAuthenticated, user} = useContext(AuthContext)
    const history = useHistory();




    return (<div>
    
            <header className="col-12">
                
            <IconContext.Provider value={{ size: "1.5rem", color: "#fff" }}>
                <h1 ><Link to="/notes"><IoIcons.IoMdFlashlight /></Link>Keeper</h1>
            </IconContext.Provider>
            <IconContext.Provider value={{ size: "2rem", color: "#fff" }}>
                <div>
                    {isAuthenticated ?
                        <div style={{}}><IconButton><Avatar onClick={() => { history.push("/") }}>{user?.fullName?.charAt(0)}</Avatar></IconButton></div>
                        :null}
                </div></IconContext.Provider>
            </header></div>)
};

export default Header;
