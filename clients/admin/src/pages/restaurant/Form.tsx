import * as React from 'react';
import { withRouter } from 'react-router';
import { Theme, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Send from "@material-ui/icons/Send";

interface IFormProps {
  items: any[];
  classes: any;
  history: any;
  createItem: (context: any) => any;
}

interface IForm {
  name: string;
  email: string;
  address: string;
  imgPath: string;
  phoneNum: string;
}

class Form extends React.Component<IFormProps, IForm> {
  public state : IForm = {
    name: "Test",
    email: "test@test.com",
    address: "123 Test Drive",
    imgPath: "https://www.meatpoultry.com/ext/resources/MPImages/11-2018/11082018/wendys-exterior.jpg?1541774773",
    phoneNum: "123-456-7890"
  };

  public handleChange = (name : keyof IForm) => (event : any) => {
    this.setState({
      name: event.target.value,
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
                id="name"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
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
              <TextField
                id="address"
                label="Address"
                className={classes.textField}
                value={this.state.address}
                onChange={this.handleChange('address')}
                margin="normal"
              />
            </Grid>
            <Grid item={true}>
              <TextField
                id="phoneNum"
                label="Phone Number"
                className={classes.textField}
                value={this.state.phoneNum}
                onChange={this.handleChange('phoneNum')}
                margin="normal"
              />
              <TextField
                id="imgPath"
                label="Image Path"
                className={classes.textField}
                value={this.state.imgPath}
                onChange={this.handleChange('imgPath')}
                margin="normal"
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
