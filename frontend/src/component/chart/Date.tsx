import * as React from 'react';
import { Typography, Button, Grid, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';


interface Content {
  trash_kind: string;
  created_at: Date;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#759F98",
    },
  },
});

function Dates({ onClickRetrieve }: { onClickRetrieve: any }) { // 함수의 반환 : onClickRetrieve

  const [StartDate, setStartDate] = React.useState<Date | string | null>(null);
  const [EndDate, setEndDate] = React.useState<Date | string | null>(null);

  const HandleStartChange = (date: Date) => {
    setStartDate(date);
    console.log(date);
  };

  const HandleEndChange = (date: Date) => {
    console.log(date);
    const clone = new Date(date);
    clone.setHours(23);
    clone.setMinutes(59);
    setEndDate(clone); // 날짜 명확한 표시 하루를 보기 위함.
    console.log(clone);
  };

  const HandleSubmit = (event: any) => {
    event.preventDefault();
    console.log(StartDate);
    console.log(EndDate);
    fetchUserData();
  };

  const fetchUserData = () => {
    axios
      .get(`http://localhost:8080/trash/`,{headers : {Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImMzNTQyMzA1LTdiZjUtNDE2OC04ODk2LWExYzU3YmFjMGJhMiIsImFsaWFzIjoidGVzdCIsImV4cCI6MTY1ODk4MzQzOCwidHlwZSI6ImFjY2Vzc190b2tlbiJ9.iaReUeH6lgosbPfnX24SJnWuY_naXukLG9rDlo3r7s4`}})
      .then((response) => {
        // Handle success.
        console.log("data saved!");
        console.log(new Date(response.data.message[1].created_at));
        const tempList: Content[] = [];
        response.data.message?.forEach((item: any) => {
          if(StartDate !== null && EndDate !== null){
            if(new Date(item.created_at) >= StartDate && new Date(item.created_at) <= EndDate){
              tempList.push(item);
            }
          }
          else{
            tempList.push(item);
          }
        }
      )
      onClickRetrieve(tempList);
        }
    )
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
        console.log("에러",error.response.data);
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
        sx={{ paddingTop: 2 }}
        onSubmit={HandleSubmit}
        noValidate
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Box margin="4px">
              <DatePicker
                label="시작 날짜"
                inputFormat="yyyy/MM/dd"
                value={StartDate}
                onChange={HandleStartChange as any}
                renderInput={(params) => <TextField size="small" {...params} sx={{ width: '100%' }} />}
              />
            </Box>
            <Box margin="4px"
            justifyContent="center"
            alignItems="center">
              <Typography color="black" fontWeight="bold" sx={{ fontSize: "medium", mx: 2 }}>to</Typography>
              </Box>
              <Box margin="4px">
              <DatePicker
                label="종료 날짜"
                inputFormat="yyyy/MM/dd"
                value={EndDate}
                onChange={HandleEndChange as any}
                minDate={StartDate}
                renderInput={(params) => <TextField size="small" {...params} sx={{ width: '100%' }} />}
              />
            </Box>
            <Box margin="4px">
            <Button
              type="submit"
              variant="contained"
              sx={{ height: 40, color: 'white', fontWeight: 'bold', fontSize: 18, marginLeft: 3, backgroundColor: "#759F98" }}
            >
              조회</Button>
              </Box>
          </Grid>
        </LocalizationProvider>
      </Grid>
    </ThemeProvider>
  );
}

export default Dates;