import React, { useState } from 'react';
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles,
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddBoxIcon from '@material-ui/icons/AddBox';

const styles = (theme: Theme) =>
  createStyles({
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
  });

type CardsProps = WithStyles<typeof styles>;

export interface MenuProps extends WithStyles<typeof styles> {
  avatar: string;
  title: string;
  subheader: string;
  image: string;
  description: string;
}

const MenuCard: React.FC<MenuProps> = ({
  avatar,
  title,
  subheader,
  image,
  description,
  classes,
}) => {
  const [expanded] = useState(false);

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Item" className={classes.avatar}>
            {avatar}
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />
      <CardMedia className={classes.media} image={image} title={title} />
      <CardContent>
        <Typography component="p">{description}</Typography>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing={true}>
        <IconButton aria-label="Add to Cart">
          <AddBoxIcon />
        </IconButton>
        <IconButton aria-label="Add to Favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="Show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(MenuCard);
