import axios from 'axios';

// export async function GetReservationsById(ReservationId?: string) {
//   const url = `http://localhost/api/v1/Reservations/${
//     ReservationId ? ReservationId : ''
//   }`;
//   try {
//     const response = await axios.get(url);
//     console.log(response.data);
//     // console.log(response.data.startTime);
//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// }

export const GetReservationsById = async (ReservationId?: string) => {
  try {
    const url = `http://localhost/api/v1/Reservations/${
      ReservationId ? ReservationId : ''
    }`;
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const GetTables = async () => {
  try {
    const url = `http://localhost/api/v1/tables/`;
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const PushTables = async () => {
  try {
    const url = `http://localhost/api/v1/tables/`;
    const response = await axios.post(url, {
      seatingCapacity: 2,
      kidFriendly: true,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export async function ReservationTimes() {
  try {
    const response = GetReservationsById();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

// .then(function(response) {
//   console.log(response);
// })
// .catch(function(error) {
//   console.log(error);
// });

// getReservationNote() {
//   return this.reservationNote;
// }

// getReservationTable() {
//   return this.reservationTable;
// }

// getReservationName() {
//   return this.reservationName;
// }

// getReservationId() {
//   // db call to get reservation id
// }

// setReservationTime(reserveTime: Date) {
//   this.reservationTime = reserveTime;
// }

// setReservationNote(reserveNote?: string) {
//   this.reservationNote = reserveNote;
// }

// setReservationTable(reserveTable: number) {
//   this.reservationTable = reserveTable;
// }

// setReservationName(reserveName: string) {
//   this.reservationName = reserveName;
// }

// setReservation() {
//   // Make call to db to set reservation
// }

// setReservationArrivalTime(arriveTime: Date) {
//   // db call to update arrival time
// }

// setReservationDepartureTime(departureTime: Date) {
//   // db call to update departure time
// }

// let props1: Props;
// props1 = {
//   reservationTime: new Date('March 5, 2019 04:15:30'),
//   reservationName: 'Jake Young',
//   reservationNote: 'Booth preferred',
//   reservationTable: 5,
// };

// const reservation = new Reservation(props1);
