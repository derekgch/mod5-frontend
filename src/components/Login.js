import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

import Adapter from '../Adapter'
import SingUp from './SignUp'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
});



class InputAdornments extends React.Component {
  state = {
    user_name: '',
    password: '',
    showPassword: false,
    showSignUP: false,
  };

  componentWillUnmount(){
    this.resetState();
  }

  handleChange = prop => event => {  
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  resetState=()=>{
    this.setState({
      user_name: '',
      password: '',

      })
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickLogin =({user_name, password}) => {
    console.log(user_name, password);
    
    Adapter.postLogin(user_name, password )
    .then(this.handleFetchError)
    .then(data => {
        localStorage.setItem("token", data.token);
        this.props.loggedIn(data);
    })
    .catch(() => {
      alert("wrong username or password")
      this.resetState();
    })
  }

  handleClickSignup=()=>{
    this.setState({showSignUP: !this.state.showSignUP})
  }

  handleGuestLogin = () =>{
    this.setState({
      password:"guest",
      user_name: "guest"
    }, ()=>{
      this.handleClickLogin(this.state)
    })
  }

  handleFetchError = (response) => {
    if(response.ok){
        return response.json()
    }else{
      console.log(response.message)
        throw Error
    }
  }


  render() {
    const { classes } = this.props;
    console.log(this.state);
    
    return (
        <div className = "loginContainer">
            <div className={classes.root}>

                  
                <TextField
                label="User name"
                value={this.state.user_name}
                className={classNames(classes.margin, classes.textField)}
                onChange={this.handleChange('user_name')}
                />

                <FormControl className={classNames(classes.margin, classes.textField)}>
                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                <Input
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                        >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                </FormControl>
                <Button variant="contained"  
                className={classes.button}
                onClick = {() => this.handleClickLogin(this.state)}
                >LOGIN</Button>
                
                <Button variant="contained"  
                className={classes.button}
                onClick = {this.handleGuestLogin}
                >Login As Guest</Button>

                <Button variant="contained"  
                className={classes.button}
                onClick = {this.handleClickSignup}
                >New User</Button>


            </div>
            

            {this.state.showSignUP? <SingUp handleClickLogin={this.handleClickLogin}/> : null}

           
      </div>
    );
  }
}

InputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputAdornments);