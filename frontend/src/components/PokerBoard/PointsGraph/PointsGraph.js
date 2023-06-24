import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { DonutChartData } from "../../../models/DonutChartData";
import "./PointsGraph.css";
function PointsGraph(props) {
  const [donutChartData, setdonutChartData] = useState(new DonutChartData());

  useEffect(() => {
    console.log("props=>", props);
  }, [props]);
  return (
    <div>
      <div className="card">
        <Chart
          className="chart"
          type="donut"
          width={"100%"}
          height={"100%"}
          series={[2, 2, 4, 1, 1]}
          options={{
            title: { text: undefined },
            labels: ["1 - Pointer", "English", "Physics", "Maths"],
            noData: { text: "Empty data" },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val;
              },
            },
          }}
        ></Chart>
      </div>
    </div>
  );
}

export default PointsGraph;
