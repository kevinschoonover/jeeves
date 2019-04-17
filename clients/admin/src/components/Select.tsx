import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

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
  grid: {
    marginBottom: 50,
  },
});

interface ISelectProps {
  classes: any;
  name: string;
  value: any;
  items: any;
  handleSelectChange: any;
}

class Selection extends React.Component<ISelectProps, {}> {
  public render(): JSX.Element {
    const { classes } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel shrink={true} htmlFor="age-label-placeholder">
          {this.props.name}
        </InputLabel>
        <Select
          value={this.props.value}
          onChange={this.props.handleSelectChange}
          input={<Input name="select" id="select-label-placeholder" />}
          displayEmpty={true}
          name="select"
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.props.items.map((item: any) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default withStyles(styles)(Selection);
