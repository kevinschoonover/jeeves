import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => ({
  card: {
    display: 'flex',
    maxWidth: 400,
  },
  details: {
    display: 'flex',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

interface ICardProps {
  classes: any;
  name: string;
  quantity: number;
  category: string;
}

class InventoryItemCard extends React.Component<ICardProps, {}> {
  public render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image="http://lorempixel.com/151/99/"
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {this.props.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {this.props.category}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {this.props.quantity}
            </Typography>
          </CardContent>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(InventoryItemCard);
