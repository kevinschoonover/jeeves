import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import classnames from 'classnames';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import red from '@material-ui/core/colors/red';

const styles = (theme: Theme) => ({
  card: {
		maxWidth: 400,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	actions: {
		display: 'flex',
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
						duration: theme.transitions.duration.shortest,
					}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
  grid: {
    marginBottom: 50
  },
});

interface IListProps {
  classes: any;
  items?: any[];
  deleteItem?: (context: any) => any;
}

interface IListState {
	expanded: boolean;
}

class MenuList extends React.Component<IListProps, IListState> {
  public state : IListState = { expanded: false };
  
  public handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  
  public render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid container={true} className={classes.grid} spacing={16}>
        {this.props.items.map((item: any) => {
          return (
            <Grid key={item.id} item={true} xs={3}>
              <Card className={classes.card}>
                <CardHeader
                  action={
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => this.props.deleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  }
                  title={item.name}
                  subheader={"$" + item.price}
                />
                <CardMedia
                  className={classes.media}
                  image={item.imgPath}
                  title={item.name + " image"}
                />
                <CardContent>
                  <Typography component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing={true}>
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit={true}>
                  <CardContent>
                    <Typography paragraph={true}>Method:</Typography>
                    <Typography paragraph={true}>
                      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                      minutes.
                    </Typography>
                    <Typography paragraph={true}>
                      Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                      heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                      browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                      chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                      salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                      minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph={true}>
                      Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                      without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
                      to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
                      cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
                      minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                      Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default withStyles(styles)(MenuList);
