"use client";

import React from "react";
import Chart from "react-apexcharts";
import { CurrencyFormatter } from "@/lib/currencyFormatter";
// import { ActionlessBarChartOptions } from "./chartOptions";

const BarChart = ({
  height = 275,
  colors,
  columnRadius = 4,
  columnWidth = "43%",
  chartSeries,
  chartCategories,
}) => {
  const chartOptions = {
    chart: {
      stacked: false,
      toolbar: { show: false },
      background: "transparent",
    },

    states: {
      active: { filter: { type: "none" } },
      hover: { filter: { type: "none" } },
    },

    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: "hsl(var(--border))",
    },

    legend: {
      show: true,
      position: "top",
      fontSize: "14px",
      itemMargin: { horizontal: 12 },
      onItemClick: { toggleDataSeries: false },
      onItemHover: { highlightDataSeries: false },
      markers: { radius: 30, width: 8, height: 8 },
    },

    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 3,
      colors: ["transparent"],
    },

    xaxis: {
      crosshairs: { show: false },
      categories: chartCategories,
      labels: {
        show: true,
        style: { colors: "hsl(var(--secondary-foreground))" },
      },
    },

    yaxis: {
      min: 0,
      show: true,
      max: 50000,
      tickAmount: 5,
      labels: {
        formatter: (value) => value / 1000 + "K",
        style: { colors: "hsl(var(--secondary-foreground))" },
      },
    },

    tooltip: {
      shared: false,
      x: { show: false },
      marker: { show: false },
      style: {
        fontSize: "14px",
      },
      y: {
        title: { formatter: () => "" },
        formatter: function (val, { dataPointIndex, w }) {
          return `${
            w.globals.categoryLabels[dataPointIndex]
          } :  ${CurrencyFormatter(val, "NGN")}`;
        },
      },
    },

    markers: {
      strokeWidth: 5,
      strokeOpacity: 0.2,
      strokeColors: "hsl(var(--primary))",
    },

    plotOptions: {
      bar: {
        borderRadius: columnRadius,
        columnWidth,
        borderRadiusApplication: "end",
      },
    },

    responsive: [
      {
        breakpoint: 550,
        options: {
          chart: { height: 450 },
          plotOptions: { bar: { horizontal: true } },
          xaxis: {
            min: 0,
            show: true,
            max: 50000,
            tickAmount: 5,
            labels: {
              formatter: (value) => value / 1000 + "K",
              style: { colors: "hsl(var(--secondary-foreground))" },
            },
          },
          yaxis: {
            show: true,
            labels: {
              style: {
                fontWeight: 500,
                colors: "hsl(var(--secondary-foreground))",
              },
            },
          },
        },
      },
    ],
    colors: colors,
  };

  return (
    <Chart
      type="bar"
      width="100%"
      height={height}
      options={chartOptions}
      series={chartSeries}
    />
  );
};

export default BarChart;
