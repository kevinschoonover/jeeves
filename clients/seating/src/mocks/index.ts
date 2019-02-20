export enum TableStatus {
  OPEN = 'open',
  ORDERING = 'ordering',
  EATING = 'eating',
  CLEANING = 'cleaning',
}

export interface Section {
  sectionId: number;
  className: string; // TODO: This will probably change
  tables: Table[];
}

export interface Table {
  id: number;
  seatingCapacity: number;
  status: TableStatus;
}

const fakeSeatingLayout = [
  {
    sectionId: 2,
    className: 'two',
    tables: [
      {
        id: 1,
        seatingCapacity: 2,
        status: TableStatus.ORDERING,
      },
      {
        id: 2,
        seatingCapacity: 2,
        status: TableStatus.OPEN,
      },
      {
        id: 3,
        seatingCapacity: 2,
        status: TableStatus.OPEN,
      },
      {
        id: 4,
        seatingCapacity: 2,
        status: TableStatus.OPEN,
      },
    ],
  },
  {
    sectionId: 1,
    className: 'one',
    tables: [
      {
        id: 5,
        seatingCapacity: 4,
        status: TableStatus.OPEN,
      },
      {
        id: 6,
        seatingCapacity: 8,
        status: TableStatus.CLEANING,
      },
      {
        id: 7,
        seatingCapacity: 8,
        status: TableStatus.EATING,
      },
      {
        id: 8,
        seatingCapacity: 8,
        status: TableStatus.EATING,
      },
    ],
  },
  {
    sectionId: 3,
    className: 'three',
    tables: [
      {
        id: 9,
        seatingCapacity: 8,
        status: TableStatus.OPEN,
      },
      {
        id: 10,
        seatingCapacity: 8,
        status: TableStatus.CLEANING,
      },
      {
        id: 11,
        seatingCapacity: 8,
        status: TableStatus.EATING,
      },
    ],
  },
  {
    sectionId: 4,
    className: 'four',
    tables: [
      {
        id: 12,
        seatingCapacity: 2,
        status: TableStatus.OPEN,
      },
      {
        id: 13,
        seatingCapacity: 2,
        status: TableStatus.OPEN,
      },
      {
        id: 14,
        seatingCapacity: 2,
        status: TableStatus.OPEN,
      },
      {
        id: 15,
        seatingCapacity: 2,
        status: TableStatus.OPEN,
      },
      {
        id: 16,
        seatingCapacity: 2,
        status: TableStatus.OPEN,
      },
      {
        id: 17,
        seatingCapacity: 2,
        status: TableStatus.OPEN,
      },
    ],
  },
];

const wait = (delay: number = 1000) => new Promise(resolve => setTimeout(resolve, delay));

export async function fetchSeatingLayout(): Promise<Section[]> {
  await wait(1000);
  return fakeSeatingLayout;
}
