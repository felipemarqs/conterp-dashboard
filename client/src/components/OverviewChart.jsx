import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";

import { useGetRefuelQuery } from "../state/api.js";

const OverviewChart = ({ isDashboard = false, view }) => {
  const { data, isLoading } = useGetRefuelQuery();
  //console.log("data", data);
  //const { data, isLoading } = useGetRefuelQuery();

  const theme = useTheme();

  const treatData = (data) => {

    if (!data) {
      return []
    }

    console.log("view", view)

    const groupedData = data.reduce((acc, refuel) => {
      

      const date = new Date(refuel.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      if ( view === year.toString()) {
        //console.log("year", year);
      const key = `${year}-${month}-${refuel.fuelType}`;

      const stringFuelType = refuel.fuelType;
      const [stringFueltypeFormatted] = stringFuelType.split(" ");

      if (!acc[key]) {
        acc[key] = {
          date: refuel.date,
          fuelType: stringFueltypeFormatted,
          quantity: refuel.quantity,
        };
      } else {
        acc[key].quantity += refuel.quantity;
      }

      return acc;
      }
      
      return acc
      
    }, {});

    const array = Object.values(groupedData);

    const result = {};

    array.forEach((refuel) => {
      const date = new Date(refuel.date);
      //const month = date.getMonth() + 1
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" });

      if (!result[refuel.fuelType]) {
        result[refuel.fuelType] = [];
      }

      const existingDataPoint = result[refuel.fuelType].find((dataPoint) => {
        return dataPoint.x === `${month}-${year}`;
      });

      if (existingDataPoint) {
        existingDataPoint.y += refuel.quantity;
      } else {
        result[refuel.fuelType].push({
          x: `${month}-${year}`,
          y: refuel.quantity,
        });
      }
    });

    const fuelColors = {
      Gasolina: theme.palette.primary[400],
      Diesel: theme.palette.primary[600],
      Etanol: theme.palette.secondary[600],
      Arla: theme.palette.primary[400],
      // add more fuel types and colors as needed
    };

    const chartData = [];

    Object.keys(result).forEach((fuelType) => {
      if (fuelType === "Gasolina" || fuelType === "Diesel") {
        chartData.push({
          id: fuelType,
          data: result[fuelType],
          color: fuelColors[fuelType],
        });
      }
    });

    //console.log("result", chartData)

    return chartData;
  };
  const lineChartData = treatData(data)

  console.log("lineChartData", lineChartData)

  return (
    <ResponsiveLine
      data={data ? lineChartData : []}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.primary[900],
            },
          },
          legend: {
            text: {
              fill: theme.palette.primary[900],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.primary[900],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.primary[900],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.primary[900],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 60, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Meses",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Litros",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={!isDashboard ? 15 : 10}
      pointColor="#ffffff"
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      enablePointLabel={true}
      pointLabel={ (t) => {       
          return  `${t.y.toFixed()}`       
      }  }
      pointLabelYOffset={-20}
      useMesh={true}
      lineWidth={!isDashboard ? 5 : 2}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 106,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 27,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
      colors={(d) => d.color}
    />
  );
};

export default OverviewChart;

/* // Creating a date object
var today = new Date();

// Getting full month name (e.g. "June")
var month = today.toLocaleString('default', { month: 'long' });
console.log(month); */
