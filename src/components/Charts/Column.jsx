import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card, Elevation } from "@blueprintjs/core";

const options = {
  chart: {
    type: "column",
  },

  title: {
    text: "Талабалар Ўқувчилар",
  },

  yAxis: [
    {
      className: "highcharts-color-0",
      title: {
        text: "",
      },
    },
    {
      className: "highcharts-color-1",
      opposite: true,
      title: {
        text: "",
      },
    },
  ],

  plotOptions: {
    column: {
      borderRadius: 5,
    },
  },

  series: [
    {
      data: [1, 3, 2, 4],
    },
    {
      data: [324, 124, 547, 221],
      yAxis: 1,
    },
  ],
};
class Column extends Component {
  render() {
    return (
      <Card elevation={Elevation.ZERO} className="column-chart">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Card>
    );
  }
}
export default Column;
