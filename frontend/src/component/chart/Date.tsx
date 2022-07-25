import * as React from 'react';
import { Typography, Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: "#759F98",
    },
  },
});

function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0')
    ].join('-')
  );
} // 날짜 상태

function Dates({ onClickRetrieve }: { onClickRetrieve: any }) { // 함수의 반환 : onClickRetrieve

  const [StartDate, setStartDate] = React.useState<string | null>(null);
  const [StartLock,setStartLock] = React.useState<Date | null> (null);
  const [EndDate, setEndDate] = React.useState<string | null>(null);

  const HandleStartChange = (date: Date) => {
    const dateresult = formatDate(date);
    const datepad = date;
    setStartDate(dateresult);
    setStartLock(datepad);
  };

  const HandleEndChange = (date: Date) => {
    const dateresult = formatDate(date);
    setEndDate(dateresult);
  };

  const HandleSubmit = (event: any) => {
    event.preventDefault();
    console.log(StartDate);
    console.log(EndDate);
    fetchUserData();
  };

  const fetchUserData = () => {
    const periodStr = StartDate !== null || EndDate !== null ? '/period' : '';
    const startDateStr = StartDate !== null ? `/${StartDate}` : '';
    const endDateStr = EndDate !== null ? `/${EndDate}` : '';

    axios
      .get(`http://localhost:8080/trash/mypage/users/7dc8601a-c554-42c2-9d7b-feb6500e24ff/statistics${periodStr}${startDateStr}${endDateStr}`)
      .then((response) => {
        // Handle success.
        const responseUserData = response.data;
        console.log("data saved!");
        console.log(response.data);
        onClickRetrieve(responseUserData);
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  }

  React.useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container
        component="form"
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: 3 }}
        onSubmit={HandleSubmit}
        noValidate
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="시작 날짜"
            inputFormat="yyyy/MM/dd"
            value={StartDate}
            onChange={HandleStartChange as any}
            renderInput={(params) => <TextField size="small" {...params} sx={{ width: '35%' }} />}
          />
          <Typography color="black" fontWeight="bold" sx={{ fontSize: "medium", mx: 2 }}>to</Typography>
          <DatePicker
            label="종료 날짜"
            inputFormat="yyyy/MM/dd"
            value={EndDate}
            onChange={HandleEndChange as any}
            minDate={StartLock}
            renderInput={(params) => <TextField size="small" {...params} sx={{ width: '35%' }} />}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ height: 40, color: 'white', fontWeight: 'bold', fontSize: 18, marginLeft: 3, backgroundColor: "#759F98" }}
          >
            조회</Button>
        </LocalizationProvider>
      </Grid>
    </ThemeProvider>
  );
}

export default Dates;