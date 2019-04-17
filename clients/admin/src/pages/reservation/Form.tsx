import * as React from 'react';
import { withRouter } from 'react-router';
import { Theme, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

import Send from '@material-ui/icons/Send';

interface IFormProps {
  items: any[];
  classes: any;
  history: any;
  createItem: (context: any) => any;
  tables: any;
  restaurants: any;
}

interface IForm {
  startTime: string;
  numGuests: number;
  table: string;
  restaurant: string;
}

class Form extends React.Component<IFormProps, IForm> {
  public state: IForm = {
    startTime: '',
    numGuests: 1,
    table: '',
    restaurant: '',
  };

  public handleChange = (name: keyof IForm) => (event: any) => {
    this.setState({
      [name]: event.target.value,
    } as Pick<IForm, keyof IForm>);
  };

  public handleChecked = (name: keyof IForm) => (event: any) => {
    this.setState({
      [name]: event.target.checked,
    } as Pick<IForm, keyof IForm>);
  };

  public handleSelectChange = (name: keyof IForm) => (event: any) => {
    this.setState({
      [name]: event.target.value,
    } as Pick<IForm, keyof IForm>);
  };

  public render(): JSX.Element {
    const { classes } = this.props;

    // HERE: Change
    return (
      <div>
        <div className={classes.appBarSpacer} />
        <Typography gutterBottom={true} component="h2">
          Add Reservation
        </Typography>
        <form
          className={classes.container}
          noValidate={true}
          autoComplete="off"
        >
          <Grid container={true} spacing={16} direction="column">
            <Grid item={true}>
              <TextField
                id="startTime"
                label="Start Time"
                type="datetime-local"
                className={classes.textField}
                value={this.state.startTime}
                onChange={this.handleChange('startTime')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="numGuests"
                label="Number of Guests"
                className={classes.textField}
                value={this.state.numGuests}
                onChange={this.handleChange('numGuests')}
              />
              <FormControl className={classes.formControl}>
                <InputLabel shrink={true} htmlFor="age-label-placeholder">
                  Table
                </InputLabel>
                <Select
                  value={this.state.table}
                  onChange={this.handleSelectChange('table')}
                  input={<Input name="table" id="table-label-placeholder" />}
                  displayEmpty={true}
                  name="table"
                  className={classes.selectEmpty}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.props.tables.map((item: any) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel shrink={true} htmlFor="age-label-placeholder">
                  Restaurant
                </InputLabel>
                <Select
                  value={this.state.restaurant}
                  onChange={this.handleSelectChange('restaurant')}
                  input={
                    <Input
                      name="restaurant"
                      id="restaurant-label-placeholder"
                    />
                  }
                  displayEmpty={true}
                  name="restaurant"
                  className={classes.selectEmpty}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.props.restaurants.map((item: any) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item={true}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  this.props.createItem(this.state);
                  this.props.history.goBack();
                }}
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
    width: '225px',
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
  },
});

export default withRouter(withStyles(styles as any)(Form as any) as any) as any;
