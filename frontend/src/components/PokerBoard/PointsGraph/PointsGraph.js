import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { DonutChartData } from "../../../models/DonutChartData";
function PointsGraph(props) {
  const [donutChartData, setdonutChartData] = useState(new DonutChartData());

  useEffect(() => {
    console.log("props=>", props);
  }, [props]);
  return (
    <div>
      <div className="card">
        <Chart
          type="donut"
          width={370}
          height={550}
          series={[2, 2, 4, 1, 1]}
          options={{
            title: { text: "student pie chart" },
            labels: ["1 - Pointer", "English", "Physics", "Maths"],
            noData: { text: "Empty dtaa" },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val / 10;
              },
            },
          }}
        ></Chart>
      </div>
    </div>
  );
}

export default PointsGraph;
