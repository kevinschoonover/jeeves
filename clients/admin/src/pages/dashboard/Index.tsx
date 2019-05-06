import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StatisticsCard from '../../components/dashboard/StatisticsCard';
import TransactionChart from '../../components/dashboard/TransactionChart';
import RadarChart from '../../components/dashboard/RadarChart';
// import { Route, Switch } from 'react-router';

interface IIndexProps {
  match?: any;
  location?: any;
  classes?: any;
}

export class Index extends React.Component<IIndexProps, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Typography style={{ fontSize: 35 }} gutterBottom={true}>
          Dashboard
        </Typography>
        <Grid container={true} spacing={24}>
          <Grid item={true} xs={3}>
            <StatisticsCard title="Transactions (today)" content="300" />
          </Grid>
          <Grid item={true} xs={3}>
            <StatisticsCard title="Gross Profit (today)" content="$4682.67" />
          </Grid>
          <Grid item={true} xs={3}>
            <StatisticsCard title="Visits (today)" content="134" />
          </Grid>
          <Grid item={true} xs={3}>
            <StatisticsCard title="Current Visits" content="10" />
          </Grid>
        </Grid>
        <Grid container={true} spacing={24} style={{ minHeight: '50vh' }}>
          <Grid item={true} xs={6}>
            <TransactionChart />
          </Grid>
          <Grid item={true} xs={6}>
            <RadarChart title="Orders by Category" />
          </Grid>
        </Grid>
      </div>
    );
  }
}
