import React from 'react';
import {
  Theme,
  Button,
  withStyles,
  createStyles,
  WithStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Schedule, Person, CalendarToday } from '@material-ui/icons';
import DayPickerInput from 'react-day-picker/DayPickerInput';
// @ts-ignore
import { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment';

import 'react-day-picker/lib/style.css';
import FormInput from './FormInput';

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
  });

interface ReservationFormProps extends WithStyles<typeof styles> {
  table: number | null;
  onSubmit({
    startTime,
    numGuests,
  }: {
    startTime: Date;
    numGuests: number;
  }): Promise<void>;
}

const formatPartySizeDisplay = (value: any) => (
  <span>{(value as number) > 1 ? `${value} People` : '1 Person'}</span>
);

const FormInputWithCalendar = (props: any) => (
  <FormInput adornment={<CalendarToday />} {...props} />
);

const partySizeList = Array.from({ length: 10 }, (_, i) => i + 1);

const ReservationForm: React.FC<ReservationFormProps> = ({
  classes,
  onSubmit,
  table,
}) => {
  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState('6:30 PM');
  const [partySize, setPartySize] = React.useState(1);

  const disabled = table === null;

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const d = moment(date).format('LL');

    onSubmit({
      startTime: moment(`${d} ${time}`, ['LL h:m a']).toDate(),
      numGuests: partySize,
    });
  };

  const handleDateChange = (day: Date) => setDate(day);

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setTime(e.target.value);

  const handlePartySizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPartySize(parseInt(e.target.value, 10));
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
        {Array.from({ length: 5 }, (_, i) => `6:3${i} PM`).map(
          (reservationTime, i) => (
            <MenuItem key={i} value={reservationTime}>
              <span>{reservationTime}</span>
            </MenuItem>
          )
        )}
      </Select>
      <Select
        onChange={handlePartySizeChange}
        renderValue={formatPartySizeDisplay}
        value={partySize}
        input={<FormInput adornment={<Person />} />}
        disabled={disabled}
      >
        {partySizeList.map((size) => (
          <MenuItem key={size} value={size}>
            <span>{formatPartySizeDisplay(size)}</span>
          </MenuItem>
        ))}
      </Select>
      {disabled && <div>Please select an open table to proceed</div>}
      <Button
        type="submit"
        variant="contained"
        className={classes.button}
        disabled={disabled}
      >
        Reserve
      </Button>
    </form>
  );
};

export default withStyles(styles)(ReservationForm);
