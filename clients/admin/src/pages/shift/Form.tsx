import * as React from 'react';
import { withRouter } from 'react-router';
import { Theme, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AccountSelection from '../../components/AccountSelect';
import SectionMultiSelect from '../../components/SectionMultiSelect';

import Send from '@material-ui/icons/Send';

interface IFormProps {
  items: any[];
  classes: any;
  history: any;
  createItem: (context: any) => any;
  accounts: any[];
  sections: any[];
}

interface IForm {
  startTime: string;
  endTime: string;
  server: string;
  sections: Array<{ id: string }>;
}

class Form extends React.Component<IFormProps, IForm> {
  public state: IForm = {
    startTime: '',
    endTime: '',
    server: '',
    sections: [],
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

  public handleMultiSelectChange = (name: keyof IForm) => (event: any) => {
    this.setState({
      [name]: event.target.value.map((value: string) => {
        return {
          id: value,
        };
      }),
    } as Pick<IForm, keyof IForm>);
  };

  public render(): JSX.Element {
    const { classes } = this.props;

    // HERE: Change
    return (
      <div>
        <div className={classes.appBarSpacer} />
        <Typography gutterBottom={true} component="h2">
          Add Shift
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
                id="endTime"
                label="End Time"
                type="datetime-local"
                className={classes.textField}
                value={this.state.endTime}
                onChange={this.handleChange('endTime')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <AccountSelection
                value={this.state.server}
                accounts={this.props.accounts}
                handleSelectChange={this.handleSelectChange('server')}
              />
              <SectionMultiSelect
                value={this.state.sections}
                sections={this.props.sections}
                handleSelectChange={this.handleMultiSelectChange('sections')}
              />
            </Grid>
            <Grid item={true}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  console.log(this.state);
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
