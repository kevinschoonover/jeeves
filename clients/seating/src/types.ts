export type Maybe<T> = T | null;

export interface RestaurantEntity {
  id: string;
  name: string;
  email: Maybe<string>;
  address: string;
  location: Location;
  imgPath: string;
  phoneNum: Maybe<string>;
  review: number;
  cuisineType: string;
  hours: WeeklyHours;
  dateCreated: string;
  isActive: boolean;
  hasWifi: boolean;
  hasTV: boolean;
  hasParking: boolean;
  sections: SectionsEntity[];
}

export interface Location {
  lat: number;
  lon: number;
}

export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

type WeeklyHours = {
  [key in DayOfWeek]: Hours;
};

export interface Hours {
  startTime: string;
  endTime: string;
}

export interface SectionsEntity {
  id: number;
  name: string;
  tables: TablesEntity[];
}

export interface TablesEntity {
  id: number;
  seatingCapacity: number;
  x: number;
  y: number;
  rotation: number;
  shape: TableShape;
  status: TableStatus;
  kidFriendly: boolean;
  reservations: ReservationsEntity[];
}

export interface ITable extends TablesEntity {
  sectionId: SectionsEntity['id'];
}

export interface ReservationsEntity {
  id: string;
  dateCreated: string;
  startTime: string;
  numGuests: number;
}

export enum TableStatus {
  OPEN = 'open',
  ORDERING = 'ordering',
  EATING = 'eating',
  CLEANING = 'cleaning',
}

export type TableShape = 'circle' | 'rectangle' | 'square';
