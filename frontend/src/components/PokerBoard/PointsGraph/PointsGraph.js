import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { DonutChartData } from "../../../models/DonutChartData";
import "./PointsGraph.css";
import Hidden from "../../Hidden/Hidden";

function PointsGraph(props) {
  const [donutChartData, setdonutChartData] = useState(new DonutChartData());
  const [showPoints, setshowPoints] = useState(false);
  useEffect(() => {
    //console.log("props.board=>", props.board);
    //console.log("props.users =>", props.users);
    prepareDonutChartData();
    setshowPoints(false);
    setshowPoints(props.board.showPoints);
  }, [props.board, props.users]);

  function prepareDonutChartData() {
    let series = [];
    let points = [];
    let pointsCount = [];
    props?.users?.map((user) => {
      series.push(user.boardPoint);
      return user;
    });
    if (series.length > 0) {
      series.sort(function (a, b) {
        return a - b;
      });
      // //console.log("series after sort =>", series);
      let seriesCount = series.length;
      let current_point = series[0];
      let current_point_count = 1;
      if (seriesCount === 1) {
        points.push(current_point);
        pointsCount.push(current_point_count);
      } else {
        for (let i = 1; i < seriesCount; i++) {
          // //console.log(
          //   "current_point =>",
          //   current_point,
          //   " || ",
          //   "current_point_count =>",
          //   current_point_count,
          //   " || ",
          //   "series[" + i + "]=",
          //   series[i]
          // );

          if (current_point === series[i]) {
            current_point_count++;
          } else {
            points.push(current_point);
            pointsCount.push(current_point_count);
            current_point = series[i];
            current_point_count = 1;
          }
          if (i === seriesCount - 1) {
            points.push(current_point);
            pointsCount.push(current_point_count);
          }
        }
      }

      setdonutChartData({
        labels: points,
        series: getSeriesPercentages(pointsCount),
        pointsCount: pointsCount,
      });
      // //console.log("points =>", points);
    }
  }

  function getSeriesPercentages(pointsCount) {
    let sum =
      pointsCount.length > 0
        ? pointsCount.reduce(function (a, b) {
            return a + b;
          })
        : 0;
    return sum > 0
      ? pointsCount.map((s) => {
          return (s / sum) * 100;
        })
      : [1];
  }
  return (
    <div>
      <div className="card">
        {showPoints && donutChartData ? (
          <Chart
            className="chart"
            type="donut"
            width={"100%"}
            height={"100%"}
            series={donutChartData.series}
            options={{
              title: { text: undefined },
              labels: donutChartData.labels,
              noData: { text: "Empty data" },
              dataLabels: {
                enabled: true,
                formatter: function (val, opts) {
                  //console.log("opts =>", opts);
                  return donutChartData?.labels[opts.seriesIndex];
                },
              },
            }}
          ></Chart>
        ) : (
          <div className="history-container-hidden">
            <Hidden />
          </div>
        )}
      </div>
    </div>
  );
}

export default PointsGraph;
