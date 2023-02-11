import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";

import { useGetRefuelQuery } from "../state/api.js";

const OverviewChart = ({ isDashboard = false, view }) => {
  const { data, isLoading } = useGetRefuelQuery();
  console.log("data", data);

  const theme = useTheme();

  const map = data.map((element) => {
    console.log("element", element.date);
    let monthData = new Date(element.date)


    let month = monthData.toLocaleString("default" , { month: 'long'})
    console.log("month",month)
  })

  
  return <div>Overview Chart</div>;
};

export default OverviewChart;

/* // Creating a date object
var today = new Date();

// Getting full month name (e.g. "June")
var month = today.toLocaleString('default', { month: 'long' });
console.log(month); */
