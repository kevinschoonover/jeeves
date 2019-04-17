import * as React from 'react';
import { withRouter } from 'react-router';
import { Theme, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import SectionSelect from '../../components/SectionSelect';

import Send from '@material-ui/icons/Send';

interface IFormProps {
  items: any[];
  classes: any;
  history: any;
  createItem: (context: any) => any;
  sections: any[];
}

interface IForm {
  seatingCapacity: number;
  x: number;
  y: number;
  rotation: number;
  shape: string;
  status: string;
  kidFriendly: boolean;
  section: string;
  displayName: string;
}

class Form extends React.Component<IFormProps, IForm> {
  public state: IForm = {
    seatingCapacity: 1,
    x: 0,
    y: 0,
    rotation: 0,
    shape: 'square',
    status: 'open',
    kidFriendly: true,
    section: '',
    displayName: '',
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
          Add Table
        </Typography>
        <form
          className={classes.container}
          noValidate={true}
          autoComplete="off"
        >
          <Grid container={true} spacing={16} direction="column">
            <Grid item={true}>
              <TextField
                id="displayName"
                label="Display Name"
                className={classes.textField}
                value={this.state.displayName}
                onChange={this.handleChange('displayName')}
              />
              <TextField
                id="seatingCapacity"
                label="Seating Capacity"
                className={classes.textField}
                value={this.state.seatingCapacity}
                onChange={this.handleChange('seatingCapacity')}
              />
              <TextField
                id="x"
                label="X"
                className={classes.textField}
                value={this.state.x}
                onChange={this.handleChange('x')}
              />
              <TextField
                id="y"
                label="Y"
                className={classes.textField}
                value={this.state.y}
                onChange={this.handleChange('y')}
              />
              <TextField
                id="rotation"
                label="Rotation"
                className={classes.textField}
                value={this.state.rotation}
                onChange={this.handleChange('rotation')}
              />
            </Grid>
            <Grid item={true}>
              <TextField
                id="shape"
                label="Shape"
                className={classes.textField}
                value={this.state.shape}
                onChange={this.handleChange('shape')}
              />
              <TextField
                id="tableStatus"
                label="Table Status"
                className={classes.textField}
                value={this.state.status}
                onChange={this.handleChange('status')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.kidFriendly}
                    onChange={this.handleChecked('kidFriendly')}
                    value="kidFriendly"
                    color="primary"
                  />
                }
                label="Is Kid Friendly?"
              />
              <SectionSelect
                value={this.state.section}
                sections={this.props.sections}
                handleSelectChange={this.handleSelectChange('section')}
              />
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
