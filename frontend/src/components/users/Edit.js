import React,{useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { Input, Button } from '@settlin/formik-mui';
import axios from 'axios';
import PageTitle from '../../common/components/PageTitle';

const useStyles = makeStyles({
  spacing:{
		padding: '15px',
		backgroundColor: '#fff'
	}
});

function onSubmit(data, {setSubmitting, setFieldError, resetForm}){
	console.log(data, "sreenivas reddy");
	if(!data){
		setSubmitting(false);
		return "there is no data";
	}
	const {history} = data;
	delete data.history;
	axios.post('/users', data).then(function (response) {
		console.log("User updated successfully");
		history.push('/users');
		return response;
  }).catch(function (error) {
    console.log(error);
  });
}

export default function Register({history, match}){
	const classes = useStyles();
	const {id} = match?.params;
	const [user, setUser] = useState({});
		useEffect(() => {
			 axios.get(`/users/${id}`).then(function(res) {
				setUser(res.data);
			}).catch((err) =>{
				console.error(err);
			})
		},[id]);

	const initialValues = {
		userName: user.userName || '',
		firstName: user.firstName || '',
		lastName: user.lastName || '',
		isActive: user.isActive
	}

	const space = {margin:'15px 0px'}

	return (
		<Paper className={classes.spacing}>
			<Grid container>
				<Grid item xs={12}>
					<PageTitle title='EDIT USER' addUrl='/users/add' addUrlTitle='ADD USER' listUrl='/users' listUrlTitle='USERS LIST'/>
				</Grid>
				<Grid item xs={12}>
					<Formik enableReinitialize={true} initialValues={{...initialValues,id, history}} onSubmit={onSubmit}>
        	{({ isValid, dirty, isSubmitting }) => (
          <Form autoComplete="off">
							<Input type='switch' name='isActive' align='right' offLabel='InActive' label='Active' container item={{xs: 12}}/>
							<Input type='text' name="firstName" label="Firstname" required container style={space} item={{xs: 12}} />
							<Input type='text' name="lastName" label="Lastname" container style={space} item={{xs: 12}} />
							<Input type='text' name="userName" label="Username" container style={space} item={{xs: 12}}/>
							<Button type='submit' disabled={!isValid || !dirty || isSubmitting} processing={isSubmitting}>SUBMIT</Button>
          </Form>
        )}
      	</Formik>
				</Grid>
				</Grid>
				</Paper>
	);
}