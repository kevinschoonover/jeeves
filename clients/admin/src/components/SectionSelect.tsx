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

interface ISectionSelectProps {
  classes: any;
  value: any;
  sections: any;
  handleSelectChange: any;
}

class SectionSelect extends React.Component<ISectionSelectProps, {}> {
  public render(): JSX.Element {
    return (
      <Select
        name="Section"
        value={this.props.value}
        items={this.props.sections}
        handleSelectChange={this.props.handleSelectChange}
      />
    );
  }
}

export default withStyles(styles)(SectionSelect);
