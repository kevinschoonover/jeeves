import * as React from 'react';
import { Route, Switch } from 'react-router';
import RestaurantPage from './Restaurant';
import RestaurantForm from './Form';

interface IRestaurantProps {
  match?: any;
  location?: any;
  classes?: any;
  restaurants: any[];
  createRestaurant: (context: any) => any;
  deleteRestaurant: (context: any) => any;
}

export class RestaurantIndex extends React.Component<IRestaurantProps, {}> {
  
  public render(): JSX.Element {
    const Restaurant = () => {
      return (
        <RestaurantPage
          items={this.props.restaurants}
          deleteItem={this.props.deleteRestaurant}
        />
      );
    };

    const Form = () => {
      return ( 
        <RestaurantForm
          createItem={this.props.createRestaurant}
        />
      );
    };

    return (
      <Switch>
        <Route path="/restaurants" exact={true} component={Restaurant} />
        <Route path="/restaurants/create" component={Form} />
      </Switch>
    );
  }
}
