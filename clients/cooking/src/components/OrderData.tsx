export interface OrderCard {
    id: number;
    orderNo: number;
    timeReceived: Date;
    tableNo: number;
    items: Items[];
    chefAssigned: string;
    Status: string;
}

export interface Items{
    itemName: string,
    itemNumber: number;
    quantity: number;
}

const order: OrderCard[] = [
    {
        id: 1,
        orderNo: 123456,
        timeReceived: new Date(),
        tableNo: 1,
        items: [{
                    itemName: "Crab Rangoon",
                    itemNumber: 1,
                    quantity: 1, 
                },
                {
                    itemName: "Sweet and Sour Chicken",
                    itemNumber: 4,
                    quantity: 2, 
                },
            ],
        chefAssigned: "Gordon",
        Status: "Received" 
    },
    {
        id: 2,
        orderNo: 123457,
        timeReceived: new Date(),
        tableNo: 2,
        items: [{
                    itemName:"Eggrolls",
                    itemNumber: 2,
                    quantity: 3, 
                },
            ],
        chefAssigned: "Fabio",
        Status: "Received" 
    },
    {
        id: 3,
        orderNo: 123458,
        timeReceived: new Date(),
        tableNo: 5,
        items: [{
                    itemName:"Eggrolls",
                    itemNumber: 2,
                    quantity: 1, 
                },
                {
                    itemName:"Orange Chicken",
                    itemNumber: 3,
                    quantity: 1, 
                },
                {
                    itemName:"Mongolian Beef",
                    itemNumber: 6,
                    quantity: 1, 
                },
            ],
        chefAssigned: "Cedric",
        Status: "Received" 
    },
    {
        id: 4,
        orderNo: 123459,
        timeReceived: new Date(),
        tableNo: 7,
        items: [{
                    itemName:"Black Pepper Chicken",
                    itemNumber: 12,
                    quantity: 1, 
                },
                {
                    itemName:"Orange Chicken",
                    itemNumber: 3,
                    quantity: 2, 
                },
            ],
        chefAssigned: "Martha",
        Status: "Received" 
    }
]

const wait = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export async function fetchIncomingOrders(): Promise<OrderCard[]> {
  await wait(1000);
  return order;
}