import * as React from "react";
import { Card, Elevation } from "@blueprintjs/core";

function Cards() {
  const elevation = Elevation.ZERO;

  return (
    <div className="info-number-status">
      <div className="flex-card">
        <Card elevation={elevation}>
          <h1>501.317</h1>
          <p>Юридик шахслар</p>
        </Card>

        <Card elevation={elevation}>
          <h1>893</h1>
          <p>Федерация ташкилотлари</p>
        </Card>

        <Card elevation={elevation}>
          <h1>3</h1>
          <p>БКУҚ</p>
        </Card>

        <Card elevation={elevation}>
          <h1>21.249</h1>
          <p>БКУТ</p>
        </Card>
      </div>
      <div className="flex-card">
        <Card elevation={elevation}>
          <h1>15.374</h1>
          <p>КИАТга аъзо ташкилотлар</p>
        </Card>

        <Card elevation={elevation}>
          <h1>2.158.174</h1>
          <p>Касаба уюшмаси аъзолари</p>
        </Card>

        <Card elevation={elevation}>
          <h1>1.723</h1>
          <p>Жамоа шартномалари</p>
        </Card>

        <Card elevation={elevation}>
          <h1>19</h1>
          <p>Санаториялар</p>
        </Card>
      </div>
    </div>
  );
}

export default Cards;
