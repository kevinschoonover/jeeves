import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Theme,
  TextField,
  InputAdornment,
  Button,
  withStyles,
  createStyles,
  WithStyles,
} from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';

const styles = (theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    sidebar: {
      background: 'linear-gradient(180deg, #FFD600 18.23%, #006452 99.99%)',
    },
    input: {
      borderRadius: 10,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 261,
      height: 40,
      flex: 1,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
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

const ReservationForm: React.FC<ReservationFormProps> = ({
  classes,
  onSubmit,
}) => {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel htmlFor="reservation-date">Date</InputLabel>
        <TextField
          select={true}
          className={classes.input}
          label="Date"
          value=""
          onChange={() => {
            return;
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarToday />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value={new Date().toDateString()}>
            <span>Today, {new Date().toDateString()}</span>
          </MenuItem>
        </TextField>
      </FormControl>
      <Button type="submit" variant="contained" className={classes.button}>
        Reserve
      </Button>
    </form>
  );
};

export default withStyles(styles)(ReservationForm);
