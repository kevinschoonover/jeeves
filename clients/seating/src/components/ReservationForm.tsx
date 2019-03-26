import React from 'react';
import {
  Theme,
  Button,
  withStyles,
  createStyles,
  WithStyles,
} from '@material-ui/core';
import { Schedule, Person, CalendarToday } from '@material-ui/icons';
import DayPickerInput from 'react-day-picker/DayPickerInput';

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
  onSubmit(): void;
}

const formatPartySizeDisplay = (value: number) =>
  value > 1 ? `${value} People` : '1 Person';

const FormInputWithCalendar = (props: any) => (
  <FormInput adornment={<CalendarToday />} {...props} />
);

const ReservationForm: React.FC<ReservationFormProps> = ({
  classes,
  onSubmit,
}) => {
  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState('');
  const [partySize, setPartySize] = React.useState(1);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const handleDateChange = (day: Date) => setDate(day);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTime(e.target.value);

  const handlePartySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1 Person, 2 People, 3 People, etc.
    const newPartySize = e.target.value.split(' ')[0];
    setPartySize(parseInt(newPartySize, 10));
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <DayPickerInput
        format="LL"
        value={date}
        onDayChange={handleDateChange}
        placeholder="Date"
        component={FormInputWithCalendar}
      />
      <FormInput
        placeholder="Time"
        type="select"
        value={time}
        onChange={handleTimeChange}
        adornment={<Schedule />}
      />
      <FormInput
        placeholder="Party Size"
        type="select"
        value={formatPartySizeDisplay(partySize)}
        onChange={handlePartySizeChange}
        adornment={<Person />}
      />
      <Button type="submit" variant="contained" className={classes.button}>
        Reserve
      </Button>
    </form>
  );
};

export default withStyles(styles)(ReservationForm);
