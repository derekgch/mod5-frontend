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
    first_name: '',
    last_name: '',
    email: '',
    showPassword: false,
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
      password_confirmation: '',
      first_name: '',
      last_name: '',
      email: ''})
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };


  handleFetchError = (response) => {
    if(response.ok){
        return response.json()
    }else{
      console.log(response.message)
        throw Error
    }
  }

  handleClickSignup = () => {
        console.log(this.state)
      let newUser = {user_name: this.state.user_name, 
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email
     }
    Adapter.postSignUp(newUser)
    .then(this.handleFetchError)
    .then(() =>{
        this.props.handleClickLogin(this.state)
    })
    .catch(() => alert("Error"))
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
    // console.log(this.state);
    
    return (
        <div className = "signUpContainer">
            
            <div className={classes.root}>
            
                <TextField
                label="User Name"
                className={classNames(classes.margin, classes.textField)}
                onChange={this.handleChange('user_name')}
                />
                <TextField
                label="First Name"
                className={classNames(classes.margin, classes.textField)}
                onChange={this.handleChange('first_name')}
                />
                <TextField
                label="Last Name"
                className={classNames(classes.margin, classes.textField)}
                onChange={this.handleChange('last_name')}
                />

                <TextField
                label="Email Address"
                className={classNames(classes.margin, classes.textField)}
                onChange={this.handleChange('email')}
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
                onClick = {this.handleClickSignup}
                >SingUp</Button>
        </div>
      </div>
    );
  }
}

InputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputAdornments);