import * as React from 'react';
import { Route, Switch } from 'react-router';
import RestaurantPage from './Restaurant';

interface IRestaurantProps {
  match?: any;
  location?: any;
  classes?: any;
  restaurants: any[];
  deleteRestaurant: (context: any) => any;
}

export class RestaurantIndex extends React.Component<IRestaurantProps, {}> {
  private renderRestaurant = () => {
    return (
      <RestaurantPage
        items={this.props.restaurants}
        deleteRestaurant={this.props.deleteRestaurant}
      />
    );
  };

  public render(): JSX.Element {
    return (
      <Switch>
        <Route path="/" exact={true} render={this.renderRestaurant} />
        <Route path="/restaurants/" render={this.renderRestaurant} />
      </Switch>
    );
  }
}
