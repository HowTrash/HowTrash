import { Typography, Box } from "@mui/material";
import TrashCardView from "./TrashCardView";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';


function PopularTrash() {
    return (
        <Box textAlign={"center"} >
            <Box sx={{ mt: 15, mb: 7 }}>
                <Typography
                    sx={{ fontSize: 50, mt: 10, fontFamily: "Itim", color: "#737458" }}
                >This Week's Ranking
                </Typography>
            </Box>

            <TrashCardView />

        </Box>
    );
};

export default PopularTrash;