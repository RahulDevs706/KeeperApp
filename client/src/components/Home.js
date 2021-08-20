import React, {useContext} from 'react';
import UserProfile from './UserProfile';
import UserLogin from './UserLogin';
import { AuthContext } from '../context/AuthContext';


const  Home = ()=>{

    const {isAuthenticated} = useContext(AuthContext);

    return(
        <div>

            {isAuthenticated? <UserProfile />: <UserLogin />}


                
            </div>
    );
}

export default Home;
