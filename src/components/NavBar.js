import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from './ClickAwayMenu'



const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  const loginOrOut = props.currentUserId === null ? 
  <Button color="inherit" onClick={props.onClick}>Login</Button>
  : <Button color="inherit" onClick={props.logOut}>LogOut</Button>
  return (
    <div className={classes.root} >
      <AppBar position="static" style={{ backgroundColor: '#2196F3' }}>
        <Toolbar >
            <Menu clickMenu={props.clickMenu} userId={props.userId}/>
          <Typography variant="title" color="inherit" className={classes.flex}>
            <Button color="inherit" 
            onClick={() => props.clickMenu("score")}
            style={{fontSize: "20px"}}>Score: {props.score} </Button>
            
          </Typography>
          {/* {loginOrOut} */}

        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);