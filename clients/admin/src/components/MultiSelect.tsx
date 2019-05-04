import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
  nameConverter?: (item: any) => string;
}

class MultiSelect extends React.Component<ISelectProps, {}> {
  public render(): JSX.Element {
    const { classes } = this.props;

    const nameConverter = this.props.nameConverter
      ? this.props.nameConverter
      : (item: any) => {
          return item.name;
        };

    const idToName = (id: string) => {
      for (const value of this.props.items) {
        if (value.id === id) {
          return nameConverter(value);
        }
      }
    };

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-checkbox">
          {this.props.name}
        </InputLabel>
        <Select
          multiple={true}
          value={this.props.value.map((value: { id: string }) => value.id)}
          onChange={this.props.handleSelectChange}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={(selected: any) => {
            const selectedNames = selected.map((id: any) => idToName(id));
            return selectedNames.join(', ');
          }}
          MenuProps={MenuProps}
        >
          {this.props.items.map((item: any) => (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox
                checked={this.props.value.some((el: any) => el.id === item.id)}
              />
              <ListItemText primary={nameConverter(item)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default withStyles(styles)(MultiSelect);
