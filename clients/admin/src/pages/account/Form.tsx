import * as React from 'react';
import { withRouter } from 'react-router';
import { Theme, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Send from "@material-ui/icons/Send";

interface IFormProps {
  items: any[];
  classes: any;
  history: any;
  createItem: (context: any) => any;
}

interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  isSuperAdmin: boolean;
  imgPath: string;
}

class Form extends React.Component<IFormProps, IForm> {
  public state : IForm = {
    firstName: "Kevin",
    lastName: "Schoonover",
    email: "test@mst.edu",
    isSuperAdmin: false,
    imgPath: "http://lorempixel.com/640/480/people",
  };

  public handleChange = (name : keyof IForm) => (event : any) => {
    this.setState({
      [name]: event.target.value,
    } as Pick<IForm, keyof IForm>);
  };

  public handleChecked = (name : keyof IForm) => (event : any) => {
    this.setState({
      [name]: event.target.checked,
    } as Pick<IForm, keyof IForm>);
  };


  public render() : JSX.Element {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.appBarSpacer} />
        <Typography gutterBottom={true} component="h2">
          Add Restaurant
        </Typography>
        <form className={classes.container} noValidate={true} autoComplete="off">
          <Grid container={true} spacing={16} direction="column">
            <Grid item={true}>
              <TextField
                id="firstName"
                label="First Name"
                className={classes.textField}
                value={this.state.firstName}
                onChange={this.handleChange('firstName')}
                margin="normal"
              />
              <TextField
                id="lastName"
                label="Last Name"
                className={classes.textField}
                value={this.state.lastName}
                onChange={this.handleChange('lastName')}
                margin="normal"
              />
              <TextField
                id="email"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />
            </Grid>
            <Grid item={true}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.isSuperAdmin}
                    onChange={this.handleChecked('isSuperAdmin')}
                    value="isSuperAdmin"
                    color="primary"
                  />
                }
                label="Is Super Admin?"
              />
            </Grid>
            <Grid item={true}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={
                  () => {
                    this.props.createItem(this.state);
                    this.props.history.goBack();
                  }
                }
              >
                Send
                <Send className={classes.rightIcon} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
  },
  boxHeader: {
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  boxHeaderTitle: {
    padding: '5px 10px',
    fontSize: 35,
  },
  fillRemainingSpace: {
    flex: '1 1 auto',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
    appBarSpacer: theme.mixins.toolbar,
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "150px",
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  }
});

export default withRouter(withStyles(styles as any)(Form as any) as any) as any;
