import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
  alignment:{
		display: 'grid',
		gridTemplateColumns: 'auto auto'
	}
});

const remove = function(id, handleSetRemove){
	window.confirm("Do you want to delete?");
	axios.delete(`/users/${id}`).then(res => {
		console.log('User deleted');
		handleSetRemove(id,true)
		
	}).catch(err => {
		console.error(err, 'Something went wrong');
	})
}
export default function Actions({id, handleSetRemove}){
	const classes = useStyles();
	return (
		<Grid className={classes.alignment}>
			<Link to={`/users/${id}`}><span title='Edit'><EditIcon/></span></Link>
			<span title='Delete' onClick={() => remove(id, handleSetRemove)}><DeleteIcon/></span>
		</Grid>
	)
}