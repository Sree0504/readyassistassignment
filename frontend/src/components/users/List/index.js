import React,{useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import PageTitle from '../../../common/components/PageTitle';
import UsersList from './Table';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

export default function List(props){
	const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
	const [data, setData] = useState([]);
	const [usersCount, setUsersCount] = useState(0);
	const [remove, setRemove] = useState({});
	
	const handleSetRemove = function(id,val){
		setRemove({id:val});
	}

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

	useEffect(() => {
		 axios.get(`/users?p=${page}&r=${rowsPerPage}`).then(res => {
			setUsersCount(res.data.totalCount)
			setData(res.data.users);
		}).catch(err => {
			console.error(err.response);
		})
	},[page, remove, rowsPerPage]);

	return (
		<Grid container spacing={2}>
		<Paper>
			<Grid item xs={12}>
				<PageTitle title="users list" addUrl='/users/add' addUrlTitle='Add user'/>
			</Grid>
			<Grid item xs={12}>
				<UsersList handleSetRemove={handleSetRemove} usersCount={usersCount} data={data} page={page} rowsPerPage={rowsPerPage}  handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>
			</Grid>
		</Paper>
		</Grid>
	)
}

List.propTypes = {
	handleSetRemove: PropTypes.bool,
	handleChangeRowsPerPage: PropTypes.func,
	handleChangePage: PropTypes.func,
}


