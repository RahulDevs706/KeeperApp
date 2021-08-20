import React from 'react'
import { Switch, Route } from 'react-router-dom';

// App components.......
import NotePage from "./components/NotesPage";

import Home from "./components/Home";


import PrivateRoutes from './components/hocs/PrivateRoutes';




function Main (){
    return(<div>

        <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoutes path='/notes' component={NotePage} />

        </Switch>

    </div>)
}

export default Main;


