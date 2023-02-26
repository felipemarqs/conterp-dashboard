import React, { useState } from "react";

import {
  Box,
  useTheme,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
//import {vehicleData} from '../../data/index.js'
import Header from "../../components/Header";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import plateBackgroundImage from "../../assets/placa.png";
import { useGetVehiclesQuery } from "state/api";

const Vehicle = () => {
  const [contract, setContract] = useState("");
  const theme = useTheme();
  const { data, isLoading } = useGetVehiclesQuery();

  if (data) {
    const filteredData = data.filter((element) => {
      if (element.contractId.name === contract) {
        return element;
      }
    });

    const columns = [
      {
        field: "plate",
        headerName: "Placa",
        flex: 0.5,
        renderCell: ({ row: { plate } }) => {
          return (
            <Box
              m="0 auto"
              p="1.5rem"
              justifyContent="center"
              borderRadius="4px"
              style={{
                backgroundImage: `url(${plateBackgroundImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <Typography variant="h5" color="black" sx={{ mr: "5px" }}>
                {plate}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "contractId",
        headerName: "Contrato",
        flex: 0.5,
        renderCell: ({ row: { contractId } }) => {
          return contractId.name;
        },
      },
      {
        field: "model",
        headerName: "Modelo",
        flex: 0.5,
      },
      {
        field: "manufacturer",
        headerName: "Fabricante",
        align: "center",
        flex: 0.5,
      },
      {
        field: "color",
        headerName: "Color",
        align: "center",
      },
      {
        field: "tankCapacity",
        headerName: "Capacidade",
        align: "center",
      },
      {
        field: "isActive",
        headerName: "Ativo",
        renderCell: (params) => {
          return params.getValue(params.id, "isActive") ? "Sim" : "Não";
        },
      },
    ];
    return (
      <Box m="1.5rem 2rem">
        <Header
          title="LISTA DE VEÍCULOS"
          subtitle="Listagem de todos os veículos cadastrados."
        />
        <Box
          mt="40px"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              borderColor: "white",
            },
            "& .MuiDataGrid-cell": {
              borderColor: "white",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary[300],
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <Box
            backgroundColor={theme.palette.primary[500]}
            padding="10px"
            width="25%"
            mb="10px"
            borderRadius="1rem"
          >
            <InputLabel sx={{ borderColor: "black" }}>Contrato</InputLabel>
            <Select
              label="Selecione o contrato:"
              name="contractName"
              value={contract}
              onChange={(e) => setContract(e.target.value)}
              sx={{
                color: "white",
                borderColor: theme.palette.primary[500],
              }}
            >
              <MenuItem value="ADM Geral">ADM Geral</MenuItem>
              <MenuItem value="ATPN Geral">ATPN Geral</MenuItem>
              <MenuItem value="Braskem">Braskem</MenuItem>
              <MenuItem value="Caldeiraria">Caldeiraria</MenuItem>
              <MenuItem value="Cavalo Marinho">Cavalo Marinho</MenuItem>
              <MenuItem value="CIPO UMIP">CIPO UMIP</MenuItem>
              <MenuItem value="Comp Manut Int">Comp Manut Int</MenuItem>
              <MenuItem value="DOW Quimica">DOW Quimica</MenuItem>
              <MenuItem value="Estacao Fluido">Estacao Fluido</MenuItem>
              <MenuItem value="Integridade">Integridade</MenuItem>
              <MenuItem value="Logistica BA">Logistica BA</MenuItem>
              <MenuItem value="Logistica SE">Logistica SE</MenuItem>
              <MenuItem value="Oficina Catu">Oficina Catu</MenuItem>
              <MenuItem value="Origem">Origem</MenuItem>
              <MenuItem value="Pintura Macae">Pintura Macae</MenuItem>
              <MenuItem value="SE Terra Mar">SE Terra Mar</MenuItem>
              <MenuItem value="SESMT">SESMT</MenuItem>
              <MenuItem value="Sonolog">Sonolog</MenuItem>
              <MenuItem value="SPT 115">SPT 115</MenuItem>
              <MenuItem value="SPT 151">SPT 151</MenuItem>
              <MenuItem value="SPT 60">SPT 60</MenuItem>
              <MenuItem value="SPT 76">SPT 76</MenuItem>
              <MenuItem value="SPT 88">SPT 88</MenuItem>
              <MenuItem value="SPT 54">SPT 54</MenuItem>
              <MenuItem value="Usinagem">Usinagem</MenuItem>
              <MenuItem value="Comp Sondas">Comp Sondas</MenuItem>
            </Select>
          </Box>

          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={ filteredData || []}
            columns={columns}
          />
        </Box>
      </Box>
    );
  }
};

export default Vehicle;
