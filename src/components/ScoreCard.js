import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


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

function generate(data) {

  return data.map(e =>{
      let user = e.user
    if(e.user.length < 1) user ='guest'
    
   return <ListItem key={data[e]+e.point}>
        <ListItemText
            primary= {`User: ${user} Points: ${e.point} `}                    
        />
    </ListItem>
  }
    
    )
  
}

class InteractiveList extends React.Component {


  render() {
    const { classes } = this.props;

    return (

        <Grid item xs={'auto'} md={'auto'} alignItems={'center'}>
            <Typography variant="title" className={classes.title}>
                {this.props.title}
            </Typography>
            <div className={classes.demo}>
                <List>
                {this.props.data? generate(this.props.data):null}
                </List>
            </div>
        </Grid>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveList);