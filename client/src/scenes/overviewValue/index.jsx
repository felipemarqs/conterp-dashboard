import React, { useState } from "react";
import Header from "components/Header";
import OverviewValueChart from "components/OverviewValueChart";
import {  Box, FormControl, MenuItem, Select, InputLabel , useTheme } from "@mui/material";

const OverviewValue = () => {
  const [view, setView] = useState("2022");
  const theme = useTheme();

  return (
    <Box m="1.5rem 2rem">
      <Header title="VISÃO DE GASTO" subtitle="Visão de gasto total" />
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
        <OverviewValueChart selectedYear={view} />
      
      </Box>
    </Box>
  );
};

export default OverviewValue;
