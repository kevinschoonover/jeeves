import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';


const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  grid: {
    marginBottom: 50
  },
  active: {
    backgroundColor: green[500],
  },
  inactive: {
    backgroundColor: red[500],
  },
  card: {
    maxWidth: 400,
  },
});

interface IListProps {
  classes: any;
  items?: any[];
  deleteItem?: (context: any) => any;
}

class MenuList extends React.Component<IListProps, {}> {
  public render(): JSX.Element {
    const { classes } = this.props;
    const subheaderProps = {noWrap: true}

    return (
      <Grid container={true} className={classes.grid} spacing={16}>
        {this.props.items.map((item: any) => {
          return (
            <Grid key={item.id} item={true} xs={3}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={item.isActive ? classes.active : classes.inactive}>
                      {item.isActive ? "A" : "I"}
                    </Avatar>
                  }
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
                  subheaderTypographyProps={subheaderProps}
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default withStyles(styles)(MenuList);
