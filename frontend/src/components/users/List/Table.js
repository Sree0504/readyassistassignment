import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Actions from './Actions';
import PropTypes from 'prop-types';

const columns = [
  { id: 'userName', label: 'USER NAME', minWidth: 200 },
  { id: 'firstName', label: 'FIRST NAME', minWidth: 200 },
  { id: 'lastName', label: 'LAST NAME', minWidth: 200 },
  { id: 'isActive', label: 'STATUS', minWidth: 150 },
	{ id: 'action', label: 'ACTIONS', minWidth: 150}
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
  },
	inactive:{
		color: '#f00'
	},
	space:{
		display: 'flex',
  	flexDirection: 'row',
		padding: '15px'
	}
});

export default function UsersTable(props) {
  const classes = useStyles();
	
	const {data, handleSetRemove, usersCount, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage} = props;
  
	return (		
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
						{Boolean(data?.length) ? 
            data?.map((row,i) => {
              return (
                <TableRow key={i} className={classes.red} hover>
                  {columns.map((column) => {
										var value = row[column.id] || '';
                    return (
                      <TableCell key={column.id} className={row.isActive !== true ? classes.inactive : ''}>
                        {(column.id === "isActive" && value === true) ? "Active" 
												:(column.id === "isActive" && row[column.id] === false) ? "InActive" 
												: column.id === "action" ? <Actions id={row._id} handleSetRemove={handleSetRemove}/> 
												: Boolean(row[column.id]) ? row[column.id].capitalizeFirstLetter() : '-' }
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
						: <TableRow>
							 <TableCell>
									No users list!
							 </TableCell>
						</TableRow>
}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={usersCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

UsersTable.propTypes = {
	classes: PropTypes.object,
	data: PropTypes.array,
	usersCount: PropTypes.number,
	handleSetRemove: PropTypes.bool
}