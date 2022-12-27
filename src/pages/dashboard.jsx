import React from "react";
import Cards from "../components/Charts/Cards";
import Column from "../components/Charts/Column";
import Combination from "../components/Charts/CombinationChart";
import Piechart from "../components/Charts/PieChart";

const optionsPie1 = {
  chart: {
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45,
      beta: 0,
    },
  },
  title: {
    text: "Касаба уюшмалари тармоқлари кесимида",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      depth: 35,
      dataLabels: {
        enabled: true,
        format: "{point.name}",
      },
    },
  },
  series: [
    {
      type: "pie",
      name: "Browser share",
      data: [
        ["А2", 35.0],
        ["М2", 2.7],
        ["Т1", 40.8],
        {
          name: "H1",
          y: 4.8,
          sliced: true,
          selected: true,
        },
        {
          name: "C1",
          y: 6.8,
          sliced: true,
          selected: true,
        },
        ["И1", 8.5],
        ["Д1", 6.2],
      ],
    },
  ],
};

const optionsPie2 = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
  },
  title: {
    text: "Касаба уюшмалари ҳудудлари кесимида",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>",
      },
    },
  },
  series: [
    {
      name: "Brands",
      colorByPoint: true,
      data: [
        {
          name: "Тошкент шахри",
          y: 6.84,
        },
        {
          name: "Фарғона вилояти",
          y: 6.84,
        },
        {
          name: "Андижон вилояти",
          y: 9.84,
        },
        {
          name: "Қорақалпоғистон Республикаси",
          y: 15.85,
          sliced: true,
          selected: true,
        },
        {
          name: "Тошкент вилояти",
          y: 4.84,
        },
        {
          name: "Жиззах вилояти",
          y: 4.84,
        },
        {
          name: "Самарқанд вилояти",
          y: 4.84,
        },
        {
          name: "Навоий вилояти",
          y: 4.84,
        },
        {
          name: "Наманган вилояти",
          y: 4.84,
        },
        {
          name: "Қашқадарё вилояти",
          y: 7.84,
        },
        {
          name: "Сурхондарё вилояти",
          y: 4.84,
        },
        {
          name: "Сирдарё вилояти",
          y: 4.84,
        },
        {
          name: "Бухоро вилояти",
          y: 4.84,
        },
      ],
    },
  ],
};

function Dashboard() {
  return (
    <div className="dashboard-screen">
      <Cards />
      <div className="flex-chart">
        <Piechart options={optionsPie1} />
        <Piechart options={optionsPie2} />
      </div>
      <div className="flex-chart">
        <Combination />
        <Column />
      </div>
    </div>
  );
}

export default Dashboard;
