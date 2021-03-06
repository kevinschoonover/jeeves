import React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface ICardProps {
  classes?: any;
  title: string;
  content: string;
}

const styles = (theme: Theme) =>
  createStyles({
    card: {
      minHeight: 100,
      minWidth: 180,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

function SimpleCard(props: ICardProps) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom={true}
        >
          {props.title}
        </Typography>
        <Typography variant="h4" component="h1">
          {props.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(SimpleCard);
