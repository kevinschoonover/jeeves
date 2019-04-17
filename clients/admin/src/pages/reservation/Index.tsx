import * as React from 'react';
import { Route, Switch } from 'react-router';
import Page from './Page';
import Form from './Form';

interface IIndexProps {
  match?: any;
  location?: any;
  classes?: any;
  items: any[];
  createItem: (context: any) => any;
  deleteItem: (context: any) => any;
  tables: any[];
  restaurants: any[];
}

export class Index extends React.Component<IIndexProps, {}> {
  public render(): JSX.Element {
    const Catalog = () => {
      return (
        <Page items={this.props.items} deleteItem={this.props.deleteItem} />
      );
    };

    const CreationForm = () => {
      return (
        <Form
          createItem={this.props.createItem}
          tables={this.props.tables}
          restaurants={this.props.restaurants}
        />
      );
    };

    return (
      <Switch>
        // HERE: change
        <Route path="/reservations" exact={true} component={Catalog} />
        <Route path="/reservations/create" component={CreationForm} />
      </Switch>
    );
  }
}
