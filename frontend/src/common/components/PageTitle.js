import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
		backgroundColor: '#ccc',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({listUrl, listUrlTitle, title, addUrl, addUrlTitle}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color='transparent'>
        <Toolbar>
          {listUrl && <Button edge="start" className={classes.menuButton} component={Link} to={listUrl} color="inherit" aria-label="menu">
            {listUrlTitle.toProperCase()}
          </Button>}
          {title && <Typography variant="h5" align='center' className={classes.title}>
            {title.toProperCase()}
          </Typography>
					}
				{addUrl && <Button color="inherit" component={Link} to={addUrl}>{addUrlTitle || "ADD USER"}</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
