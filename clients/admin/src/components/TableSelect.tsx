import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';

import Select from './Select';

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

interface ITableSelectProps {
  classes: any;
  value: any;
  tables: any;
  handleSelectChange: any;
}

class TableSelect extends React.Component<ITableSelectProps, {}> {
  public render(): JSX.Element {
    const converter = (item: any) => item.displayName;
    return (
      <Select
        name="Table"
        value={this.props.value}
        items={this.props.tables}
        handleSelectChange={this.props.handleSelectChange}
        nameConverter={converter}
      />
    );
  }
}

export default withStyles(styles)(TableSelect);
