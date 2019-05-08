import React from 'react';
import { Radar } from 'react-chartjs-2';

const data = {
  labels: [
    'Starter',
    'Soup',
    'Burger',
    'Sandwich',
    'Snack',
    'Dessert',
    'Beverage',
    'Side',
    'Alcohol',
    'Appetizer',
    'Entree',
    'Seafood',
    'Vegetarian',
    'Kids',
    'Unknown',
  ],
  datasets: [
    {
      label: 'Restaurant 1',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [96, 49, 9, 37, 62, 18, 72, 55, 65, 42, 53, 27, 8, 73, 2],
    },
    {
      label: 'Restaurant 2',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [25, 6, 1, 11, 41, 20, 91, 47, 98, 48, 51, 57, 26, 69, 38],
    },
  ],
};

const options = {
  maintainAspectRatio: false,
};

class Graph extends React.Component<{ title: string }, typeof data> {
  public state: typeof data = {
    datasets: data.datasets,
    labels: data.labels,
  };

  public interval: NodeJS.Timeout;

  public componentDidMount() {
    this.interval = setInterval(() => {
      for (let i = 0; i < this.state.datasets.length; i++) {
        const oldDataSet = this.state.datasets[i];
        const newData = [];
        const datasets = this.state.datasets;

        for (const _ of this.state.labels) {
          newData.push(Math.floor(Math.random() * 100));
        }

        const newDataSet = {
          ...oldDataSet,
        };

        newDataSet.data = newData;
        datasets[i] = newDataSet;

        const newState = {
          ...data,
          datasets,
        };

        this.setState(newState);
      }
    }, 5000);
  }

  public componentWillUpdate() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  public render() {
    return <Radar data={this.state} options={options} />;
  }
}

export default Graph;
