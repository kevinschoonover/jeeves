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
  Error,
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
    buttonError: {
      background: theme.palette.error.main,
      margin: theme.spacing.unit * 3,
      color: theme.palette.error.contrastText,
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
    errorMessage: {
      textAlign: 'center',
      fontWeight: 'bold',
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

const isSameDay = (a: Date, b: Date) =>
  a.getDate() === b.getDate() &&
  a.getMonth() === b.getMonth() &&
  a.getFullYear() === b.getFullYear();

const getAvailableReservationSlots = (
  reservations: Date[],
  restaurantHours: Hours,
  date: Date
) => {
  const [startHour, startMinute] = restaurantHours.startTime
    .split(':')
    .map(Number);
  const [endHour, endMinute] = restaurantHours.endTime.split(':').map(Number);

  const start = moment(date)
    .hour(startHour)
    .minute(startMinute)
    .toDate();
  const end = moment(date)
    .hour(endHour)
    .minute(endMinute)
    .toDate();
  const blockedSlots = reservations
    .filter((d) => isSameDay(d, date))
    .map((reservation) => ({
      startTime: reservation.getTime(),
      // Assume every reservation lasts one hour
      endTime: reservation.setHours(reservation.getHours() + 1),
    }));

  const available: string[] = [];

  // If the day we're checking is the current date, then check all times after the current time.
  // Otherwise, we want to check all times for the given date.
  const now = isSameDay(new Date(), date) ? new Date() : start;

  if (now.getMinutes() >= 30) {
    now.setHours(now.getHours() + 1);
  }
  now.setMinutes(0, 0, 0);

  let nowMs = now.getTime();
  while (nowMs <= end.getTime()) {
    // If the time is not in a booked slot
    const inBookedSlot = blockedSlots.some(
      ({ startTime, endTime }) => nowMs >= startTime && nowMs < endTime
    );
    if (!inBookedSlot && nowMs < end.getTime() && nowMs >= start.getTime()) {
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
  const {
    createReservation,
    error: reservationError,
    isLoading,
  } = useReservation();
  const [success, setSuccess] = React.useState(false);
  const [timeError, setTimeError] = React.useState(false);
  const { restaurant } = useSeatingData();

  let initialDate = new Date();
  const todayHours = restaurant.hours[dayOfWeek(initialDate)];
  const [endHour, endMinute] = todayHours.endTime.split(':').map(Number);

  const end = moment(initialDate)
    .hour(endHour)
    .minute(endMinute)
    .toDate();

  // If the current time is past closing time, consider the hours for tomorrow
  if (initialDate.getTime() >= end.getTime()) {
    initialDate = new Date(initialDate.setDate(initialDate.getDate() + 1));
  }

  const availableReservationSlotsForToday = table
    ? getAvailableReservationSlots(
        table.reservations.map(({ startTime }) => new Date(startTime)),
        restaurant.hours[dayOfWeek(initialDate)],
        initialDate
      )
    : [];

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'DAY':
          let newTime = prevState.time;

          // Get the first available time for the new date
          if (!isSameDay(action.date, prevState.date)) {
            const slots = table
              ? getAvailableReservationSlots(
                  table.reservations.map(
                    ({ startTime }) => new Date(startTime)
                  ),
                  restaurant.hours[dayOfWeek(action.date)],
                  action.date
                )
              : [];

            newTime = slots[0] || '';
          }
          return {
            ...prevState,
            date: action.date,
            time: newTime,
          };
        case 'TIME':
          return {
            ...prevState,
            time: action.time,
          };
        case 'PARTY_SIZE':
          return {
            ...prevState,
            partySize: action.partySize,
          };
        case 'RESET':
          return {
            date: initialDate,
            partySize: 1,
            time: availableReservationSlotsForToday[0] || '',
          };
      }
    },
    {
      date: initialDate,
      partySize: 1,
      time: availableReservationSlotsForToday[0] || '',
    }
  );

  const { date, time, partySize } = state;

  const availableReservationSlots = table
    ? getAvailableReservationSlots(
        table.reservations.map(({ startTime }) => new Date(startTime)),
        restaurant.hours[dayOfWeek(date)],
        date
      )
    : [];

  React.useEffect(() => {
    // If the form was just successfully submitted, trigger the timeout
    // to reset the button's state after a delay
    let successTimeout: NodeJS.Timeout | null = null;
    if (success) {
      successTimeout = setTimeout(() => {
        setSuccess(false);
        dispatch({ type: 'RESET' });
      }, 2000);
    }
    return () => {
      // Only cleanup the timeout if it was created
      if (successTimeout !== null) {
        clearTimeout(successTimeout);
      }
    };
  }, [success]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = moment(date).format('LL');

    setTimeError(false);
    setSuccess(false);

    if (time === '') {
      setTimeError(true);
    } else if (table) {
      await createReservation({
        startTime: moment(`${d} ${time}`, ['LL h:m a']).toDate(),
        numGuests: partySize,
        table: table.id,
      });

      setSuccess(true);
    }
  };

  const handleDateChange = (day: Date) => {
    dispatch({ type: 'DAY', date: day });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'TIME', time: e.target.value });
  };

  const handlePartySizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'PARTY_SIZE', partySize: parseInt(e.target.value, 10) });
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

  const disabled = table === null || isLoading;

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
      {reservationError ? (
        <div className={classes.errorMessage}>
          An error occurred and your reservation could not be made!
        </div>
      ) : timeError ? (
        <div className={classes.errorMessage}>Reservation time required</div>
      ) : null}
      <div className={classes.buttonWrapper}>
        <Button
          type="submit"
          variant="contained"
          className={
            reservationError
              ? classes.buttonError
              : success
              ? classes.buttonSuccess
              : classes.button
          }
          disabled={disabled || time === ''}
        >
          {reservationError ? <Error /> : success ? <CheckIcon /> : 'Reserve'}
        </Button>
        {isLoading && (
          <CircularProgress size={24} className={classes.buttonLoading} />
        )}
      </div>
    </form>
  );
};

export default withStyles(styles)(ReservationForm);
