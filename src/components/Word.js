// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

// const styles = theme => ({
//   root: {
//     ...theme.mixins.gutters(),
//     paddingTop: theme.spacing.unit * 2,
//     paddingBottom: theme.spacing.unit * 2,
//   },
// });

// function PaperSheet(props) {
//   const { classes } = props;

//   return (
//     <div>
//       <Paper className={classes.root} elevation={1}>
//         <Typography variant="headline" component="h3">
//           {props.word}
//         </Typography>
//         <Typography component="p">
//           {props.def}
//         </Typography>
//       </Paper>
//     </div>
//   );
// }

// PaperSheet.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(PaperSheet);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 250,
  },
  bullet: {
    display: 'inline-block',
    margin: '3px 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.card} style={{margin: "10px"}}>
        <CardContent>

          <Typography variant="headline" component="h2">
          {props.word}
          </Typography>

          <Typography component="p">
            {props.def}
          </Typography>
        </CardContent>

      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);