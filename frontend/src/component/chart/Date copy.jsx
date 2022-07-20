import * as React from 'react';
import useState from 'react';
import {Typography,Button, Grid,Box} from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#759F98",
    },
  },
});

function Dates() {
const [StartDate, setStartDate] = React.useState(null);
const [EndDate, setEndDate] = React.useState(null);

const handleStartChange = (Start) => {
  setStartDate(Start.toDateString());
  console.log(Start.toDateString());
  console.log(StartDate);
};

const handleEndChange = (End) => {
 setEndDate(End);
  console.log(End.toDateString());
};

const handleSubmit = (e,Start,End) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  console.log({
    StartDate: data.get(Start),
    EndDate: data.get(End),
});
};


  return (
    <ThemeProvider theme={theme}>
    <Grid container
    component="form"
    direction="row"
    justifyContent="center"
    alignItems="center"
    sx={{paddingTop:3}}
    onSubmit={handleSubmit}
    noValidate
    >
    <LocalizationProvider dateAdapter={AdapterDateFns}> 
        <DatePicker
          label="시작 날짜"
          id="startDate"
          name="startDate"
          inputFormat="yyyy/MM/dd"
          value={StartDate}
          onChange={handleStartChange}
          useWeekdaysShort={true}
          renderInput={(params) => <TextField size="small" {...params} sx={{width: '35%'}} />}
        />
         <Typography color="black" fontWeight="bold" sx={{fontSize: "medium", mx: 2}}>to</Typography>
        <DatePicker
          label="종료 날짜"
          id="endDate"
          name="endDate"
          inputFormat="yyyy/MM/dd"
          value={EndDate}
          onChange={handleEndChange}
          minDate={StartDate}
          renderInput={(params) => <TextField size="small" {...params}  sx={{width: '35%'}} />}
        />
      <Button type="submit" width="10px" variant="contained"
      sx={{ height : 40, color : 'white',fontWeight: 'bold',fontSize:18, marginLeft:3, backgroundColor:"#759F98"}}>조회</Button>
    </LocalizationProvider>
    </Grid>
    </ThemeProvider>
  );
}

export default Dates;