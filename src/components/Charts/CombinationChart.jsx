import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card, Elevation } from "@blueprintjs/core";

const options = {
  title: {
    text: "Ишчи ҳодимлар",
  },
  xAxis: {
    categories: [],
  },
  labels: {
    items: [
      {
        html: "Барчаси",
        style: {
          left: "50px",
          top: "18px",
          color:
            // theme
            (Highcharts?.defaultOptions?.title?.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "black",
        },
      },
    ],
  },
  series: [
    {
      type: "column",
      name: "Ишчилар",
      data: [8, 5, 5, 10, 8],
    },
    {
      type: "column",
      name: "Аёллар",
      data: [3, 3, 4, 5, 4],
    },
    {
      type: "column",
      name: "Ёшлар (30 ёшагача)",
      data: [2, 2, 1, 2, 1],
    },
    {
      type: "pie",
      name: "Total consumption",
      data: [
        {
          name: "Ёшлар (30 ёшагача)",
          y: 13,
          color: "red", // Jane's color
        },
        {
          name: "Аёллар",
          y: 15,
          color: "blue", // John's color
        },
        {
          name: "Ишчилар",
          y: 23,
          color: "black", // Joe's color
        },
      ],
      center: [100, 80],
      size: 100,
      showInLegend: false,
      dataLabels: {
        enabled: false,
      },
    },
  ],
};
class Combination extends Component {
  render() {
    return (
      <Card elevation={Elevation.ZERO} className="combination-chart">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Card>
    );
  }
}
export default Combination;
