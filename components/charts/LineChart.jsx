"use client";

import React from "react";
import dynamic from "next/dynamic";
import { CurrencyFormatter } from "@/lib/calculateFn";

// Dynamically import react-apexcharts with SSR disabled
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = ({
  grid = true,
  height = 330,
  colors,
  isLegend = true,
  legendPosition = "top",
  legendHorizontalPosition = "center",
  gridColor = "hsl(var(--border-hover))",
  strokeWidth = 2,
  chartSeries,
  chartCategories,
}) => {
  const chartOptions = {
    chart: {
      stacked: true,
      toolbar: { show: false },
      background: "transparent",
    },

    states: {
      active: { filter: { type: "none" } },
      hover: { filter: { type: "none" } },
    },

    grid: {
      show: grid,
      strokeDashArray: 3,
      borderColor: gridColor,
      padding: {
        top: 12,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },

    legend: {
      show: isLegend,
      position: legendPosition,
      fontSize: "14px",
      horizontalAlign: legendHorizontalPosition,
      itemMargin: { horizontal: 12 },
      onItemClick: { toggleDataSeries: false },
      onItemHover: { highlightDataSeries: false },
      markers: { radius: 30, width: 8, height: 8 },
      labels: {
        colors: colors,
      },
    },

    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: strokeWidth,
      curve: "smooth",
    },

    yaxis: {
      min: 0,
      show: true,
      tickAmount: 5,
      labels: {
        style: { colors: "hsl(var(--secondary-foreground))" },
      },
    },

    xaxis: {
      crosshairs: { show: false },
      categories: chartCategories,
      labels: {
        show: true,
        style: { colors: "hsl(var(--secondary-foreground))" },
      },
      axisTicks: { show: false },
      axisBorder: { show: false },
      crosshairs: {
        show: false,
        opacity: 1,
        fill: { color: "hsl(var(--primary))" },
        stroke: { color: "hsl(var(--primary))" },
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
        borderRadius: 4,
        columnWidth: "43%",
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
  };

  return (
    <Chart
      type="line"
      width="100%"
      height={height}
      series={chartSeries}
      options={chartOptions}
    />
  );
};

export default LineChart;
