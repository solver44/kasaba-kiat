import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card, Elevation } from "@blueprintjs/core";

class Piechart extends Component {
  render() {
    return (
      <Card elevation={Elevation.ZERO} className="pie-chart">
        <HighchartsReact highcharts={Highcharts} options={this.props.options} />
      </Card>
    );
  }
}
export default Piechart;
