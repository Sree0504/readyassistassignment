import React from 'react';
import './App.css';
import MainApp from './Main';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
// import('../common/utils/prototypes/string');
axios.defaults.baseURL = 'http://localhost:5002/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default function App() {
	return (
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Header/>
				</Grid>
				<Grid item xs={12} className='content'>
			 	  <MainApp/>
				</Grid>
			</Grid>
	)
}
