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
      this.state = {
        completed: props.completed,
        buffer: props.diff,
      };
  }
  
 


    componentDidUpdate(prevProps, prevState,){
        if(prevProps.completed !== this.props.completed){
            this.progress(this.props.completed, prevProps.completed)
            
        }
    }
    shouldComponentUpdate(){
        return true;
    }


  progress = (completed, prevCompleted) => {
    if (completed > 100) {
      this.setState({ completed: 100, buffer: 10 });
    } else {
      this.setState({ completed: completed, buffer: prevCompleted });
    }

    setTimeout(() => {
        this.setState({buffer: completed})
    }, 1000);

  };

  render() {
    const { classes } = this.props;
    const { completed, buffer } = this.state;
    return (
      <div className={`${classes.root} hpbar `}>
        <LinearProgress color="secondary" variant="buffer" value={completed} valueBuffer={buffer} style={{height: "12px"}}/>
      </div>
    );
  }
}

LinearBuffer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearBuffer);