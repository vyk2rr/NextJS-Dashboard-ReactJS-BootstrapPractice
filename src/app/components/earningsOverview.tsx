"use client"

import { useCallback, useEffect, useRef } from "react";
import { Chart } from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';

const data: ChartConfiguration = {
  type: 'line',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Earnings",
        fill: true,
        data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000],
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)"
      }
    ]
  }
};


export default function EarningsOverview(): JSX.Element {
  const chartRef = useRef<null | HTMLCanvasElement>(null);

  const renderChart = useCallback((): void => {
    if (chartRef.current) {
      new Chart(chartRef.current, data);
    }
  }, []);

  useEffect(() => {
    renderChart();

    return () => {
      if (chartRef.current) {
        chartRef.current = null;
      }
    };
  }, [renderChart]);

  return (
    <div className="col-lg-7 col-xl-8">
      <div className="card shadow mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h6 className="text-primary fw-bold m-0">Earnings Overview</h6>
          <div className="dropdown no-arrow"><button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button"><i className="fas fa-ellipsis-v text-gray-400"></i></button>
            <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
              <p className="text-center dropdown-header">dropdown header:</p><a className="dropdown-item" href="#">&nbsp;Action</a><a className="dropdown-item" href="#">&nbsp;Another action</a>
              <div className="dropdown-divider"></div><a className="dropdown-item" href="#">&nbsp;Something else here</a>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="chart-area">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}