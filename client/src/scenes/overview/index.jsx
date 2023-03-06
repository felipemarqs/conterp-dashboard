import React, { useState } from "react";
import { Box, FormControl, MenuItem, Select, InputLabel , useTheme} from "@mui/material";
import OverviewChart from "../../components/OverviewChart";
import Header from "../../components/Header";
import { useGetContractsQuery } from "state/api";

const Overview = () => {
  const [view, setView] = useState("2022");
  const [contract, setContract] = useState("all");
  const { data } = useGetContractsQuery()

  const theme = useTheme();

  return (
    <Box m="1.5rem 2rem"  >
      <Header title="CONSUMO GERAL" subtitle="Uma visão do consumo total de combustível." />
      <Box height="75vh">
        
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
          <InputLabel sx={{ borderColor: "black" }}>Contrato</InputLabel>
                <Select
                  label="Contrato"
                  name="contractName"
                  value={contract}
                  onChange={(e) => setContract(e.target.value)}
                  sx={{
                    color: "white",
                    borderColor: theme.palette.primary[500],
                    width: "100%"
                  }}
                >
                  {data ? data.map((element) => (
                    <MenuItem key={element.name} value={element.name}>{element.name}</MenuItem>
                  )) :
                    <MenuItem disabled>Carregando...</MenuItem>
                  }

                </Select>

        <OverviewChart selectedYear={view} selectedContract={contract} />
      
      </Box>
    </Box>

  );
};

export default Overview;