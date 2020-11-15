import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { Input, Button } from '@settlin/formik-mui';
import PageTitle from '../../common/components/PageTitle';
import axios from 'axios';

const useStyles = makeStyles({
  spacing:{
		padding: '15px',
	}
});

function onSubmit(data, {setSubmitting, setFieldError, resetForm}){
	if(!data){
		setSubmitting(false);
		return "there is no data";
	}
	const {history} = data;
	delete data.history;
	try{
	axios.post('/users', data).then(function(res) {
    setSubmitting(false);
		resetForm({values: {}});
		history.push('/users');
		window.Log.success("User added successfully");
  }).catch(function (error) {
		// const {status=500, data:r} = error.response;
		setSubmitting(false);
		if( error?.response?.status === 400 && Boolean(error?.response?.data?.error)) setFieldError('userName', error?.response?.data.error);
		console.log(error.response);
  });
	}catch(error){
		console.error(error);
	}
}

export default function Register(props){
	const classes = useStyles();
	const {history} = props;
	const initialValues = {
		userName: '',
		firstName: '',
		lastName: '',
	}
	const space = {margin:'15px 0px'}
	return (
		<Paper className={classes.spacing}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<PageTitle title='ADD USER' listUrl='/users' listUrlTitle='USERS LIST'/>
				</Grid>
				<Grid item xs={12}>
					<Formik enableReinitialize={true} initialValues={{...initialValues, history}} onSubmit={onSubmit}>
        	{({ isValid, dirty, isSubmitting }) => (
          	<Form autoComplete="off">
							<Input type='text' name='firstName' label='First name' fullWidth style={space} required container item={{xs: 12}}/>
							<Input type='text' name='lastName' label='Last name' style={space} container item={{xs: 12}} />
							<Input name='userName' label='User name' required container style={space} item={{xs: 12}} onChange={() => {

							}}/>
							<Button type='submit' disabled={!isValid || !dirty || isSubmitting} processing={isSubmitting}>SUBMIT</Button>
          	</Form>
        	)}
      		</Formik>
				</Grid>
			</Grid>
		</Paper>
	);
}