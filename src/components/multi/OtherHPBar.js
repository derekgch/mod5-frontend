import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 4,
  },
};

class LinearBuffer extends React.Component {

  constructor(props) {
      super(props);
      let n = props.completed;
      if(!props.completed){
        n =100
      }
      this.state = {
        completed: n,
        buffer: n,
      };
  }
  
    componentDidUpdate(prevProps, prevState,){
        if(prevProps.completed !== this.props.completed){
            this.progress(this.props.completed, prevProps.completed)            
        }
    }
    shouldComponentUpdate(nextProps, nextState){
      if(nextProps.completed !== this.props.completed
        || nextState.completed !== this.state.completed
        || nextState.buffer !== this.state.buffer)
          return true;
      return false;
    }


  progress = (completed, prevCompleted) => {
    if(completed > 100) completed =100;

    if(completed >  prevCompleted){
      this.incHP(completed);
    } else {
      this.decHP(completed, prevCompleted);
    }

  };

  decHP=(completed, prevCompleted)=>{
    this.setState({ completed, buffer: prevCompleted });
    setTimeout(() => {
      this.setState({buffer: completed})
    }, 1000);
  }

  incHP=(completed) =>{
    this.setState({buffer: completed})
    setTimeout(() => {
      this.setState({completed})
    }, 1000);

  }

  render() {
    const { classes } = this.props;
    const { completed, buffer } = this.state;
    return (
      <div className={`${classes.root} otherHPbar `}>
        <LinearProgress color="secondary"  variant="buffer" value={completed} valueBuffer={buffer} style={{height: "12px"}}/>
      </div>
    );
  }
}

LinearBuffer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearBuffer);