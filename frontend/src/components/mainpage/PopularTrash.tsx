import {Typography, Box} from "@mui/material";
import TrashCardView from "./TrashCardView";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';


function PopularTrash(){
    return(
        <Box textAlign={"center"} >
            <Box sx={{mt:15,mb : 7}}>
                <AutoGraphIcon fontSize="large" />
                <Typography  
                    fontWeight="bold"
                    variant="h5" >
                인기 쓰레기
                </Typography>
            </Box>

                    <TrashCardView /> 
     
        </Box>
    );
};

export default PopularTrash;