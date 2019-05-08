import React from 'react';
import { Line } from 'react-chartjs-2';

const initialState: any = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Restaurant 1',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: 'Restaurant 2',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(255,99,132,0.4)',
      borderColor: 'rgba(255,99,132,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(255,99,132,0.4)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(255,99,132,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};

const options = {
  maintainAspectRatio: false,
};

class Graph extends React.Component<{}, { datasets: any[]; labels: any[] }> {
  public componentWillMount() {
    this.setState(initialState);
  }

  public componentDidMount() {
    setInterval(() => {
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
          ...initialState,
          datasets,
        };

        this.setState(newState);
      }
    }, 5000);
  }

  public render() {
    return <Line data={this.state} options={options} />;
  }
}

export default Graph;
