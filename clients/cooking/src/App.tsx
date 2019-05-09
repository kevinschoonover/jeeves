import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core';
import Navbar from './components/navbar';
import PaperSheet from './components/PaperSheet';
import { OrderCard, fetchIncomingOrders } from './components/OrderData';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      flexGrow: 1, 
      fontFamily: [
        'Raleway',
      ].join(','),
    },

    apple: {
      margin: theme.spacing.unit * 3,
    },
    p: {
      textAlign: "left",
      marginLeft: theme.spacing.unit * 9,
    }
  });

type Props = WithStyles<typeof styles>;

const App: React.FC<Props> = ({ classes }) => {
  const [incomingOrders, setIncomingOrders] = React.useState<OrderCard []>([]);
  const navbarRef = React.useRef<HTMLDivElement | null>(null);

  const addOrder = (newOrder: OrderCard) => {
    const newOrders = [...incomingOrders,  newOrder];
    setIncomingOrders(newOrders);
  };

  const removeOrder = (index: number) => {
    const newOrders = [...incomingOrders];
    newOrders.splice(index, 1);
    setIncomingOrders(newOrders);
  };

  React.useEffect(() => {
    fetchIncomingOrders().then((data) => {
      setIncomingOrders(data);
    });
  }, []);

  const paperComponents = incomingOrders.map((card, index) => 
                                              <PaperSheet 
                                                key={card.id} 
                                                index={index}
                                                order={card} 
                                                addOrder={addOrder} 
                                                finishOrder={removeOrder}/>);

  return (
    <div className={classes.root}>
      <Navbar innerRef={navbarRef} />
      <h2>Incoming Orders:</h2>
      <h3 className={classes.p}>Orders in progress: {incomingOrders.length}</h3>
      {(paperComponents === undefined || paperComponents.length === 0)? <p>No incoming orders.</p>: paperComponents}
    </div>
  );
};

export default withStyles(styles)(App);
