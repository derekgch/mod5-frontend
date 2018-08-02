import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ScoreCard from './ScoreCard';
import ScoreCardMulti from './ScoreCardMulti';

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
            multi: data.multi,

        }) )
    }



  render() {
    const { classes } = this.props;

    console.log(this.state.multi);
    
    return (
        <div className="scoreContainer">
      <div className={classes.root}>
      <h1>TOP 5 Score Board</h1>

        <Grid container={true} spacing={16} direction={'row'} alignItems={'flex-start'}>
         <ScoreCard title={"Math Score Board"} data={this.state.math}/>
         <ScoreCard title={"Word Score Board"} data={this.state.word}/>     
         <ScoreCardMulti title={"Multi Score Board"} data={this.state.multi}/>     
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