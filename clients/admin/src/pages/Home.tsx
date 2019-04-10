import * as React from 'react';
import {
    Theme, withStyles, Paper, Table, TableHead, TableRow,
    TableCell, TableBody, TablePagination, Grid, Typography
} from '@material-ui/core';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, Legend, PieChart, Pie, ResponsiveContainer } from 'recharts';
const classNames = require('classnames');
import GroupIcon from '@material-ui/icons/Group';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import BusinessIcon from '@material-ui/icons/BusinessCenter';

interface IDashboardProps {
    fetchAccounts: (context?: any) => void;
    accounts: any;
    materialChartData: any[];
    classes?: any;
    theme?: any;
    children?: any;
}

interface IPageState {
    accountsTablePage?: number;
    accountsTableRowsPerPage: number;
}

class HomePage extends React.Component<IDashboardProps, IPageState> {

    public state: IPageState = {
        accountsTablePage: 0,
        accountsTableRowsPerPage: 5
    };

    private handleChangeAccountsPage = (event: any, page: number) => {
        console.log(event);
        this.setState({ accountsTablePage: page });
    };

    private handleChangeTableRowsPerPage = (event: any) => {
        this.setState({ accountsTableRowsPerPage: event.target.value });
    };

    private renderAccounts(): JSX.Element {
        const { accounts, classes } = this.props;
        if (!accounts) {
            return null;
        }

        return (
            <Paper className={classNames(classes.paper, classes.accounts)}>
                <h3 className={classes.sectionTitle}>Customers</h3>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.items.slice(this.state.accountsTablePage * this.state.accountsTableRowsPerPage,
                            this.state.accountsTablePage * this.state.accountsTableRowsPerPage + this.state.accountsTableRowsPerPage).map((n: any) => {
                                return (
                                    <TableRow key={n.id}>
                                        <TableCell component="th" scope="row">
                                            {n.id}
                                        </TableCell>
                                        <TableCell>{n.name}</TableCell>
                                        <TableCell>{n.email}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={accounts.items.length}
                    rowsPerPage={this.state.accountsTableRowsPerPage}
                    page={this.state.accountsTablePage}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangeAccountsPage}
                    onChangeRowsPerPage={this.handleChangeTableRowsPerPage}
                />
            </Paper>
        );

    }

    private renderRadialBarChart(): JSX.Element {
        return (
            <Paper className={this.props.classes.paper}>
                <h3 className={this.props.classes.sectionTitle}>Material Inventory</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={this.props.materialChartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            label={true}
                            fill="#8884d8" />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Paper>
        );
    }

    private renderBarChart(): JSX.Element {
        return (
            <Paper className={this.props.classes.paper}>
                <h3 className={this.props.classes.sectionTitle}>Material Sales</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={this.props.materialChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        );
    }

    public render(): JSX.Element {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container={true} spacing={24}>
                    <Grid item={true} lg={3} xs={12} sm={6}>
                        <Paper className={classNames(classes.paper, classes.headerTiles)}>
                            <GroupIcon className={classes.headerTileIcon} />
                            <Typography className={classes.tileText}> {this.props.accounts.items.length} Customers</Typography>
                        </Paper>
                    </Grid>
                    <Grid item={true} lg={3} xs={12} sm={6}>
                        <Paper className={classNames(classes.paper, classes.headerTiles)}>
                            <MailIcon className={classes.headerTileIcon} />
                            <Typography className={classes.tileText}>Inbox</Typography>
                        </Paper>
                    </Grid>
                    <Grid item={true} lg={3} xs={12} sm={6}>
                        <Paper className={classNames(classes.paper, classes.headerTiles)}>
                            <BusinessIcon className={classes.headerTileIcon} />
                            <Typography className={classes.tileText}>Purchases</Typography>
                        </Paper>
                    </Grid>
                    <Grid item={true} lg={3} xs={12} sm={6}>
                        <Paper className={classNames(classes.paper, classes.headerTiles)}>
                            <SettingsIcon className={classes.headerTileIcon} />
                            <Typography className={classes.tileText}>Settings</Typography>
                        </Paper>
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        {this.renderBarChart()}
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        {this.renderRadialBarChart()}
                    </Grid>
                    <Grid item={true} xs={12}>
                        {this.renderAccounts()}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 24,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    headerTiles: {
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: `5px solid ${theme.palette.secondary.main}`,
    },
    headerTileIcon: {
        fontSize: 40,
        color: theme.palette.primary.main,
        paddingRight: 5
    },
    tileText: {
        fontSize: 20,
        color: theme.palette.grey["400"],
    },
    sectionTitle: {
        paddingLeft: theme.spacing.unit * 2,
    },
    accounts: {
        marginBottom: 24,
        overflowX: 'scroll'
    },
    chart: {
        width: '100%'
    },
});

export default withStyles(styles as any)(HomePage as any) as any;
