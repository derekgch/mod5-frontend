import React, { Component } from 'react';
import Word from './Word';
import Adapter from '../Adapter';
import UUID from 'uuid'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: 10,
    },
  });


class WordList extends Component {
    state={
        words:[]
    }
    
    componentDidMount(){
        this.getWords();
    }

    getWords=() => {
        const token = localStorage.getItem("token");
        Adapter.getUserWords(this.props.id, token).then(r => r.json())
        .then(data => this.setState({
            words: data["words"]
        }, console.log))
    }

    toDisplay=() => {
        return this.state.words.map(e => 
         <Grid key={UUID()} ><Word word={e.word} def={e.def} /> </Grid>
        )
    }

    render() {
        const  spacing = 8;
        const { classes } = this.props
        return (

            <div className="wordListContianer">
            <Grid container className={classes.root} spacing={8} style={{height:"80%"}}>
            <Grid item xs={12}>
              <Grid container className={classes.root} justify="center" spacing={Number(spacing)}>
                {this.toDisplay()}
              </Grid>
            </Grid>
            </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(WordList);