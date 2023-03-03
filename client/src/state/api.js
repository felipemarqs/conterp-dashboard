import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import  'dotenv';

//Configurando o Redux Tool Kit Query
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "conterpApi",
  tagTypes: ["Contract", "Vehicle", "Refuel", "Manufacturer"],
  endpoints: (build) => ({
    getContracts: build.query({
      query: () => "contract/list",
      providesTags: ["Contract"],
    }),
    getVehicles: build.query({
      query: () => "vehicle/list",
      providesTags: ["Vehicle"],
    }),
    createVehicle: build.mutation({
      query: (data) => ({
        headers: {
          "Content-Type": "application/json",
        },
        url: 'vehicle/create',
        method: 'POST',
        body: data
      }),
    }),
    deleteVehicle: build.mutation({
      query: (id)=> ({
        url: `vehicle/delete/${id}`,
        method: 'DELETE',
      }),
      prepare: (id) => ({params: { id: id}}),
    }),
    getRefuel: build.query({
      query: () => "refuel/list",
      providesTags: ["Refuel"],
    }),
    getManufacturers: build.query({
      query:() => "manufacturer/list",
      providesTags: ["Manufacturer"],
    })
  }),
});

export const { 
    useGetContractsQuery,
    useGetVehiclesQuery,
    useGetRefuelQuery ,
    useCreateVehicleMutation,
    useGetManufacturersQuery,
    useDeleteVehicleMutation
  } 
    = api;
