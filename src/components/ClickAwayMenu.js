import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import red from '@material-ui/core/colors/red';


const primary = "white"; // #F44336


const styles = theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
  },
  fake: {
    backgroundColor: grey[200],
    height: theme.spacing.unit,
    margin: theme.spacing.unit * 2,
    // Selects every two elements among any group of siblings.
    '&:nth-child(2n)': {
      marginRight: theme.spacing.unit * 3,
    },
  },
});

class ClickAway extends React.Component {
  state = {
    open: false,
  };

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.open !== this.state.open) return true;
    return false;
    
  }

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  handleClickAway = () => {
    this.setState({
      open: false,
    });
  };

  handleClickMenu =(event) => {
    // console.log(event.target.id)
    this.props.clickMenu(event.target.id);
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <div>
            <Button onClick={this.handleClick}>
                <MenuIcon style={{color: primary}}/>
                Menu
            </Button>
            {open ? (
              <Paper className={classes.paper}>

              <MenuItem onClick={this.handleClickMenu} id="math">Math</MenuItem>
              <MenuItem onClick={this.handleClickMenu} id="word" >Word</MenuItem>
              <MenuItem onClick={this.handleClickMenu} id="multi" >Multi</MenuItem>

              {this.props.userId? 
              <MenuItem onClick={this.handleClickMenu} id="list" >Word List</MenuItem>
              : null}


              </Paper>
            ) : null}
          </div>
        </ClickAwayListener>
      </div>
    );
  }
}

ClickAway.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClickAway);