import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => ({
  card: {
    maxWidth: 345,
  },
  root: {
    width: '100%',
  },
  avatar: {
    marginRight: 5,
  },
  summary: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    height: '100%',
    verticalAlign: 'middle',
    flexBasis: '33.33%',
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
  },
});

interface IRestaurantListProps {
  items: any[];
  classes: any;
  deleteRestaurant: (context: any) => any;
}

class RestaurantList extends React.Component<IRestaurantListProps, {}> {
  public render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid container={true} spacing={16}>
        {this.props.items.map((item: any) => {
          return (
            <Grid key={item.id} item={true} xs={3}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    className={classes.media}
                    image={item.imgPath}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom={true} component="h2">
                      {item.name}
                    </Typography>
                    <Typography component="p">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => this.props.deleteRestaurant(item.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default withStyles(styles)(RestaurantList);
