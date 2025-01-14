"use client";

import React from "react";
import dynamic from "next/dynamic";
import { CurrencyFormatter } from "@/lib/calculateFn";

// Dynamically import react-apexcharts with SSR disabled
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ActionlessBarChart = ({
  height = 120,
  colors,
  chartSeries,
  chartCategories,
}) => {
  // Get the base options
  //   const baseOptions = baseChartOptions();
  const baseOptions = {
    chart: {
      stacked: true,
      toolbar: { show: false },
      background: "transparent",
    },
    states: {
      active: { filter: { type: "none" } },
      hover: { filter: { type: "none" } },
    },
    grid: { show: false },
    legend: { show: false },
    dataSeriesLabels: { enabled: false },
    stroke: { width: 3, curve: "smooth" },
    yaxis: { show: false },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: chartCategories,
      crosshairs: {
        show: false,
        opacity: 1,
        fill: { color: "hsl(var(--primary))" },
        stroke: { color: "hsl(var(--primary))" },
      },
    },
    colors,
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
          } : ${CurrencyFormatter(val, "NGN")}`;
        },
      },
    },
    markers: {
      strokeWidth: 5,
      strokeOpacity: 0.2,
      strokeColors: "hsl(var(--primary))",
    },
  };

  //   const barChartOptions = {
  //     ...baseOptions,
  //     chart: {
  //       ...baseOptions.chart,
  //       offsetY: 30,
  //     },
  //     stroke: {
  //       ...baseOptions.stroke,
  //       show: false,
  //     },
  //     xaxis: {
  //       ...baseOptions.xaxis,
  //       categories: chartCategories,
  //     },
  //     colors,
  //     grid: {
  //       ...baseOptions.grid,
  //       padding: {
  //         top: -40,
  //         right: 10,
  //         bottom: 20,
  //         left: 10,
  //       },
  //     },
  //     plotOptions: {
  //       ...baseOptions.plotOptions,
  //       bar: {
  //         borderRadius: 7,
  //         columnWidth: "45%",
  //         distributed: true,
  //         borderRadiusApplication: "end",
  //       },
  //     },
  //     tooltip: {
  //       ...baseOptions.tooltip,
  //       y: {
  //         ...baseOptions.tooltip.y,
  //         formatter: function (val, { dataPointIndex, w }) {
  //           return `${w.globals.labels[dataPointIndex]} : ${val}`;
  //         },
  //       },
  //     },
  //   };

  return (
    <Chart
      type="bar"
      height={height}
      series={chartSeries}
      options={baseOptions}
      //   options={barChartOptions}
    />
  );
};

export default ActionlessBarChart;
