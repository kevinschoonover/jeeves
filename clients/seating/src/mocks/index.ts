import { TableShape } from '../components/Table';

export enum TableStatus {
  OPEN = 'open',
  ORDERING = 'ordering',
  EATING = 'eating',
  CLEANING = 'cleaning',
}

export interface Section {
  sectionId: number;
  tables: Table[];
}

export interface Table {
  id: number;
  seatingCapacity: number;
  status: TableStatus;
  x: number;
  y: number;
  rotation?: number;
  shape?: TableShape;
}

const fakeSeatingLayout: Section[] = [
  {
    sectionId: 2,
    tables: [
      {
        id: 1,
        seatingCapacity: 2,
        status: TableStatus.ORDERING,
        x: 100,
        y: 150,
        shape: 'square',
      },
      {
        id: 2,
        seatingCapacity: 2,
        status: TableStatus.OPEN,
        x: 100,
        y: 300,
        shape: 'square',
      },
      {
        id: 3,
        seatingCapacity: 2,
        status: TableStatus.OPEN,
        x: 100,
        y: 450,
        shape: 'square',
      },
      {
        id: 4,
        seatingCapacity: 2,
        status: TableStatus.OPEN,
        x: 100,
        y: 600,
        shape: 'square',
      },
    ],
  },
  {
    sectionId: 1,
    tables: [
      {
        id: 5,
        seatingCapacity: 4,
        status: TableStatus.OPEN,
        x: 350,
        y: 50,
        shape: 'square',
        rotation: 90,
      },
      {
        id: 6,
        seatingCapacity: 8,
        status: TableStatus.CLEANING,
        x: 600,
        y: 50,
        shape: 'square',
        rotation: 90,
      },
      {
        id: 7,
        seatingCapacity: 8,
        status: TableStatus.EATING,
        x: 800,
        y: 50,
        shape: 'rectangle',
        rotation: 90,
      },
      {
        id: 8,
        seatingCapacity: 8,
        status: TableStatus.EATING,
        x: 1000,
        y: 50,
        shape: 'rectangle',
        rotation: 90,
      },
    ],
  },
  {
    sectionId: 3,
    tables: [
      {
        id: 9,
        seatingCapacity: 8,
        status: TableStatus.OPEN,
        x: 400,
        y: 300,
      },
      {
        id: 10,
        seatingCapacity: 8,
        status: TableStatus.CLEANING,
        x: 600,
        y: 300,
      },
      {
        id: 11,
        seatingCapacity: 8,
        status: TableStatus.EATING,
        x: 800,
        y: 300,
      },
    ],
  },
  {
    sectionId: 5,
    tables: [
      {
        id: 13,
        seatingCapacity: 8,
        status: TableStatus.OPEN,
        x: 500,
        y: 600,
        shape: 'square',
        rotation: 90,
      },
      {
        id: 14,
        seatingCapacity: 8,
        status: TableStatus.OPEN,
        x: 750,
        y: 600,
        shape: 'rectangle',
        rotation: 90,
      },
      {
        id: 15,
        seatingCapacity: 8,
        status: TableStatus.OPEN,
        x: 1000,
        y: 600,
        shape: 'rectangle',
        rotation: 90,
      },
    ],
  },
];

const wait = (delay: number = 1000) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export async function fetchSeatingLayout(): Promise<Section[]> {
  await wait(1000);
  return fakeSeatingLayout;
}
