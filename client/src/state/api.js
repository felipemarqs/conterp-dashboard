import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import  'dotenv';


//Configurando o Redux Tool Kit Query
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL}),
  reducerPath: "conterpApi",
  tagTypes: ["Contract"],
  endpoints: (build) => ({
    getContracts: build.query({
        query: () => "contract/list",
        providesTags: ["Contract"]
    })
  })
});


export const {
    useGetContractsQuery
} = api;