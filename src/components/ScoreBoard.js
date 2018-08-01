import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ScoreCard from './ScoreCard';
import Adapter from '../Adapter';


const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});



class InteractiveList extends React.Component {
    state={
        math: [],
        word: [],
        multi:[],
    }
    componentDidMount(){
        Adapter.getTop5().then(r => r.json()).then(data => this.setState({
            math: data.math,
            word: data.word,
            
        }) )
    }

  render() {
    const { classes } = this.props;


    return (
        <div className="scoreContainer">
      <div className={classes.root}>

        <Grid container={true} spacing={16} direction={'row'}>
         <ScoreCard title={"Math Score Board"} data={this.state.math}/>
         <ScoreCard title={"Word Score Board"} data={this.state.word}/>          
         <ScoreCard title={"Multi Score Board"} data={this.state.multi}/>          
        </Grid>
        
         </div>
      </div>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveList);