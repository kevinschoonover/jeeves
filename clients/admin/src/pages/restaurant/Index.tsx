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
}

export class Index extends React.Component<IIndexProps, {}> {
  public render(): JSX.Element {
    const Catalog = () => {
      return (
        <Page items={this.props.items} deleteItem={this.props.deleteItem} />
      );
    };

    const CreationForm = () => {
      return <Form createItem={this.props.createItem} />;
    };

    return (
      <Switch>
        <Route path="/restaurants" exact={true} component={Catalog} />
        <Route path="/restaurants/create" component={CreationForm} />
      </Switch>
    );
  }
}
