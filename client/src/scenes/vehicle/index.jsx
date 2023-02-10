import React from 'react';

import {Box, useTheme, Button, Typography} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import {vehicleData} from '../../data/index.js'
import Header from '../../components/Header';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import plateBackgroundImage from '../../assets/placa.png'

const Vehicle = () => {

    const theme = useTheme()

    const columns = [
        {
          field: "plate",
          headerName: "Placa",
          flex: 0.5,
          renderCell: ({ row: { plate } }) => {
            return (
              <Box
              width="45%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              borderRadius="4px"
              style={{
                backgroundImage: `url(${plateBackgroundImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }} 
              >
                <Typography variant='h5' color="black" sx={{ mr: "5px" }}>
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
            return contractId.name
          } 
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
          return params.getValue(params.id, "isActive")? "Sim" : "Não"
        }
      }
     
     
      ];

      const isLoading = false;
    console.log(vehicleData)
    return (
        
            <Box m="1.5rem 2rem">
             <Header title="LISTA DE VEÍCULOS" subtitle="Listagem de todos os veículos cadastrados."/>
             <Box mt="40px"
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
        }}>
                <DataGrid
                loading={isLoading || !vehicleData}
                getRowId={(row) => row._id }
                rows={vehicleData || []}
                columns={columns}
                />
             </Box>
            </Box>
            
    

    )
}


export default Vehicle;