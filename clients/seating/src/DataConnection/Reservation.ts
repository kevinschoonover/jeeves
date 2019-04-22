import { AxiosInstance } from 'axios';

export class Seating {
  private restaurantId: string;
  private axios: AxiosInstance;
  private tableIds: any[];
  private tables: { [key: string]: any };

  constructor(axiosInstance: AxiosInstance, restaurantId: string) {
    this.axios = axiosInstance;
    this.restaurantId = restaurantId;
    this.tableIds = [];
    this.tables = {};
  }

  async getTables() {
    try {
      const response = await this.axios.get(
        `/Restaurants/${this.restaurantId}`
      );
      this.tableIds = [];
      this.tables = {};
      if (response.data.sections && response.data.sections.length) {
        response.data.sections.forEach((section: any) => {
          section.tables.forEach((table: any) => {
            this.tableIds.push(table.id);
            this.tables[table.id] = table;
          });
        });
        console.log(response.data);
        console.log(this.tables);
        console.log(this.tableIds);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createReservation({
    startTime,
    numGuests,
    table,
  }: {
    startTime: Date;
    numGuests: number;
    table: string;
  }) {
    try {
      const response = await this.axios.post(`/Reservations`, {
        startTime,
        numGuests,
        table,
        restaurant: this.restaurantId,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}
