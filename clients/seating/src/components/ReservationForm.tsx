import React from 'react';
import {
  Theme,
  Button,
  withStyles,
  createStyles,
  WithStyles,
  MenuItem,
  Select,
  CircularProgress,
} from '@material-ui/core';

import {
  Schedule,
  Person,
  CalendarToday,
  Check as CheckIcon,
} from '@material-ui/icons';
import DayPickerInput from 'react-day-picker/DayPickerInput';
// @ts-ignore
import { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment';

import 'react-day-picker/lib/style.css';
import FormInput from './FormInput';
import useReservation from '../hooks/useReservation';
import { ITable, DayOfWeek, Hours } from '../types';
import { green } from '@material-ui/core/colors';
import { useSeatingData } from './SeatingProvider';

const styles = (theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    button: {
      background: '#995C00',
      margin: theme.spacing.unit * 3,
      color: 'white',
      borderRadius: 10,
      width: 154,
      '&:hover': {
        backgroundColor: '#995C00',
      },
    },
    buttonSuccess: {
      background: green[800],
      margin: theme.spacing.unit * 3,
      color: 'white',
      borderRadius: 10,
      width: 154,
      '&:hover': {
        backgroundColor: '#995C00',
      },
    },
    buttonWrapper: {
      margin: theme.spacing.unit,
      position: 'relative',
    },
    buttonLoading: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  });

interface ReservationFormProps extends WithStyles<typeof styles> {
  table: ITable | null;
}

const formatPartySizeDisplay = (value: any) => (
  <span>{(value as number) > 1 ? `${value} People` : '1 Person'}</span>
);

const FormInputWithCalendar = (props: any) => (
  <FormInput adornment={<CalendarToday />} {...props} />
);

const dayOfWeek = (date: Date): DayOfWeek =>
  moment(date).format('dddd') as DayOfWeek;

const getAvailableReservationSlots = (
  existingReservations: Date[],
  restaurantHours: Hours
) => {
  const start = moment(restaurantHours.startTime, ['k:dd']).toDate();
  const end = moment(restaurantHours.endTime, ['k:dd']).toDate();
  const blockedSlots = existingReservations.map((reservation) => ({
    startTime: reservation.getTime(),
    // Assume every reservation lasts one hour
    endTime: new Date(reservation).setHours(reservation.getHours() + 1),
  }));

  const available: string[] = [];
  const now = new Date();
  if (now.getMinutes() >= 30) {
    now.setHours(now.getHours() + 1);
  }
  now.setMinutes(0);
  let nowMs = now.getTime();
  while (nowMs <= end.getTime()) {
    // If the time is not in a booked slot
    if (
      blockedSlots.every(
        ({ startTime, endTime }) => nowMs < startTime || nowMs > endTime
      ) &&
      nowMs < end.getTime() &&
      nowMs > start.getTime()
    ) {
      available.push(moment(now).format('h:mm a'));
    }
    now.setMinutes(now.getMinutes() + 30);
    nowMs = now.getTime();
  }
  return available;
};

const ReservationForm: React.FC<ReservationFormProps> = ({
  classes,
  table,
}) => {
  const [date, setDate] = React.useState(new Date());
  const [partySize, setPartySize] = React.useState(1);
  const { createReservation, error, isLoading } = useReservation();
  const [success, setSuccess] = React.useState(false);
  const { restaurant } = useSeatingData();

  const availableReservationSlots = table
    ? getAvailableReservationSlots(
        table.reservations.map(({ startTime }) => new Date(startTime)),
        restaurant.hours[dayOfWeek(date)]
      )
    : [];

  const [time, setTime] = React.useState(
    availableReservationSlots.length > 0 ? availableReservationSlots[0] : ''
  );

  const disabled = table === null || isLoading;

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const d = moment(date).format('LL');

    if (table) {
      await createReservation({
        startTime: moment(`${d} ${time}`, ['LL h:m a']).toDate(),
        numGuests: partySize,
        table: table.id,
      });
      setSuccess(!error);
    }
  };

  const handleDateChange = (day: Date) => setDate(day);

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setTime(e.target.value);

  const handlePartySizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPartySize(parseInt(e.target.value, 10));
  };

  const renderPartySizeList = () => {
    const partySizeList: JSX.Element[] = [];
    for (let size = 1; size <= table!.seatingCapacity; size++) {
      partySizeList.push(
        <MenuItem key={size} value={size}>
          <span>{formatPartySizeDisplay(size)}</span>
        </MenuItem>
      );
    }
    return partySizeList;
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <DayPickerInput
        format="dddd, LL"
        value={date}
        formatDate={formatDate}
        parseDate={parseDate}
        onDayChange={handleDateChange}
        placeholder="Date"
        component={FormInputWithCalendar}
        inputProps={{ disabled }}
        keepFocus={false}
        dayPickerProps={{
          disabledDays: {
            before: new Date(),
          },
        }}
      />
      <Select
        onChange={handleTimeChange}
        renderValue={(value) => value}
        value={time}
        input={<FormInput adornment={<Schedule />} />}
        disabled={disabled}
      >
        {availableReservationSlots.map((reservationTime) => (
          <MenuItem key={reservationTime} value={reservationTime}>
            <span>{reservationTime}</span>
          </MenuItem>
        ))}
      </Select>
      <Select
        onChange={handlePartySizeChange}
        renderValue={formatPartySizeDisplay}
        value={partySize}
        input={<FormInput adornment={<Person />} />}
        disabled={disabled}
      >
        {table && renderPartySizeList()}
      </Select>
      {table === null && <div>Please select an open table to proceed</div>}
      <div className={classes.buttonWrapper}>
        <Button
          type="submit"
          variant="contained"
          className={success ? classes.buttonSuccess : classes.button}
          disabled={disabled}
        >
          {success ? <CheckIcon /> : 'Reserve'}
        </Button>
        {isLoading && (
          <CircularProgress size={24} className={classes.buttonLoading} />
        )}
      </div>
    </form>
  );
};

export default withStyles(styles)(ReservationForm);
