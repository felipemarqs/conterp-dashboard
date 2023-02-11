import React, { useState } from "react";
import { Box, FormControl, MenuItem, Select, InputLabel , useTheme} from "@mui/material";
import OverviewChart from "../../components/OverviewChart";
import Header from "../../components/Header";

const Overview = () => {
  const [view, setView] = useState("all");


  const theme = useTheme();

  return (
    <Box m="1.5rem 2rem">
      <Header title="OVERVIEW" subtitle="A overview for the sales in 2021" />
      <Box height="75vh">
        <FormControl
          sx={{
            mt: "1rem",
          }}
        >
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="view"
            onChange={(e) => setView(e.target.value)}
            sx={{
                color: theme.palette.primary[500],
                borderColor: theme.palette.primary[500]
            
            }}
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      
      </Box>
    </Box>

  );
};

export default Overview;