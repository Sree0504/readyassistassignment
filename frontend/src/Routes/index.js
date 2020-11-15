import React from "react";
import Routes from './routes';
import UsersList from '../components/users/List'; 

import {
  Switch,
  Route,
} from "react-router-dom";

export default function RouteConfig(){
	return (
		<Switch>
				<Route exact path='/' component={UsersList}/>
					{Routes.map((route, i) => (
            <RouteComponent key={i} {...route} />
          ))}
    </Switch>
	);
}

function RouteComponent(route) {
  return (
  	<Route path={route.path} render={props => (
        <route.component {...props}/>
		)}/>
	)
}