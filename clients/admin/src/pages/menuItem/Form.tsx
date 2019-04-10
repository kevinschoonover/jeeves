import * as React from 'react';
import { withRouter } from 'react-router';
import { Theme, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Send from "@material-ui/icons/Send";

interface IFormProps {
  items: any[];
  classes: any;
  history: any;
  createItem: (context: any) => any;
}

interface IForm {
  name: string;
  price: number;
  nutrition: object;
  servingSize: number;
  prepETA: number;
  spicyLevel: number;
  imgPath: string;
  category: string;
  servingSizeUnits: string;
  isActive: boolean;
}

class Form extends React.Component<IFormProps, IForm> {
  public state : IForm = {
    name: "",
    price: 0.00,
    nutrition: {},
    servingSize: 1,
    prepETA: 15,
    spicyLevel: 0,
    imgPath: "",
    category: "Unknown",
    servingSizeUnits: "cup",
    isActive: true,
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

    // HERE: Change
    return (
      <div>
        <div className={classes.appBarSpacer} />
        <Typography gutterBottom={true} component="h2">
          Add Menu Item
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
              />
              <TextField
                id="price"
                label="Price"
                className={classes.textField}
                value={this.state.price}
                onChange={this.handleChange('price')}
              />
              <TextField
                id="servingSize"
                label="Serving Size"
                className={classes.textField}
                value={this.state.servingSize}
                onChange={this.handleChange('servingSize')}
              />
            </Grid>
            <Grid item={true}>
              <TextField
                id="prepETA"
                label="Prep ETA"
                className={classes.textField}
                value={this.state.prepETA}
                onChange={this.handleChange('prepETA')}
              />
              <TextField
                id="spicyLevel"
                label="Spicy Level"
                className={classes.textField}
                value={this.state.spicyLevel}
                onChange={this.handleChange('spicyLevel')}
              />
              <TextField
                id="imgPath"
                label="Image Path"
                className={classes.textField}
                value={this.state.imgPath}
                onChange={this.handleChange('imgPath')}
              />
            </Grid>
            <Grid item={true}>
              <TextField
                id="category"
                label="Category"
                className={classes.textField}
                value={this.state.category}
                onChange={this.handleChange('category')}
              />
              <TextField
                id="servingSizeUnits"
                label="Serving Size Units"
                className={classes.textField}
                value={this.state.servingSizeUnits}
                onChange={this.handleChange('servingSizeUnits')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.isActive}
                    onChange={this.handleChecked('isActive')}
                    value="isActive"
                    color="primary"
                  />
                }
                label="Is Active?"
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
    width: "225px",
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
