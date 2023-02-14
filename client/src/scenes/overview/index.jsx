import React, { useState } from "react";
import { Box, FormControl, MenuItem, Select, InputLabel , useTheme} from "@mui/material";
import OverviewChart from "../../components/OverviewChart";
import Header from "../../components/Header";

const Overview = () => {
  const [view, setView] = useState("2022");


  const theme = useTheme();

  return (
    <Box m="1.5rem 2rem"  >
      <Header title="CONSUMO GERAL" subtitle="Uma visão do consumo total de combustível." />
      <Box height="75vh">
        <FormControl
          sx={{
            mt: "1rem",

          }}
        >
          <InputLabel 
            sx={{borderColor:"black"}}
          >View</InputLabel>
          <Select
            value={view}
            label="view"
            onChange={(e) => setView(e.target.value)}
            sx={{
                color: theme.palette.primary[500],
                borderColor: theme.palette.primary[500]
            
            }}
          >
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      
      </Box>
    </Box>

  );
};

export default Overview;