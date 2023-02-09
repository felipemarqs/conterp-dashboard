import React from 'react';

import {Box, useTheme, Button} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import {contractData} from '../../data/index.js'
import Header from '../../components/Header';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Contract = () => {

    const theme = useTheme()

    const columns = [
        {
          field: "_id",
          headerName: "ID",
          flex: 0.5,
        },
        
        {
          field: "name",
          headerName: "Name",
          flex: 0.5,
        },
        {
          field: "isActive",
          headerName: "Ativo",
          renderCell: (params) => {
            return params.getValue(params.id, "isActive")? "Sim" : "Não"
          }
        },
       {
        align: "center",
        flex: 0.5,
         renderCell: (params) => {
          const onClick = (e) => {
            e.stopPropagation(); // don't select this row after clicking
            const api = params.api;
            const thisRow = {};
    
            api
              .getAllColumns()
              .filter((c) => c.field !== "__check__" && !!c)
              .forEach(
                (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
              );
    
            return alert(JSON.stringify(thisRow, null, 4));
          };
    
          return (
                <Box display="flex" justifyContent="space-around" alignItems="center" width="70%">
                   <Button onClick={onClick}
                    sx={{
                      backgroundColor: theme.palette.secondary.light,
                      color: theme.palette.background.alt,
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "5px 10px",
                    }}
                    ><EditOutlinedIcon/>
                    </Button>

                    <Button onClick={onClick}
                    sx={{
                      backgroundColor: theme.palette.secondary.light,
                      color: theme.palette.background.alt,
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "5px 10px",
                    }}
                    ><DeleteOutlineOutlinedIcon/>
                    </Button>

                </Box>
         )
        }
      }
      
      ];

      


      const isLoading = false;




    console.log(contractData)
    return (
        
            <Box m="1.5rem 2rem">
             <Header title="LISTA DE CONTRATOS" subtitle="Listagem de todos os contratos cadastrados."/>
             <Box mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
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
                loading={isLoading || !contractData}
                getRowId={(row) => row._id }
                rows={contractData || []}
                columns={columns}
                />
             </Box>
            </Box>
            
    

    )
}


export default Contract;