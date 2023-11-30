"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto"
import { ChartConfiguration } from "chart.js"

const data: ChartConfiguration = {
  "type": "doughnut",
  "data": {
    "labels": ["Direct", "Social", "Referral"],
    "datasets": [{
      "label": "",
      "backgroundColor": ["#4e73df", "#1cc88a", "#36b9cc"],
      "borderColor": ["#ffffff", "#ffffff", "#ffffff"],
      "data": [50, 30, 15]
    }]
  }
};

export default function RevenueSources(): JSX.Element {
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

  const [showMenu, setShowMenu] = useState(false);

  const toggleShowMenu = () => setShowMenu(!showMenu);

  return (
    <div className="col-lg-5 col-xl-4">
      <div className="card shadow mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h6 className="text-primary fw-bold m-0">Revenue Sources</h6>
          <div className="dropdown no-arrow">
            <button onClick={() => toggleShowMenu() }
              className="btn btn-link btn-sm">
              <i className="fas fa-ellipsis-v text-gray-400">
              </i>
            </button>
            <div className={`dropdown-menu shadow dropdown-menu-end animated--fade-in ${showMenu ? 'show' : ''}`}>
              <p className="text-center dropdown-header">
                dropdown header:
              </p>
              <a
                className="dropdown-item"
                href="#">
                &nbsp;Action
              </a>
              <a className="dropdown-item" href="#">
                &nbsp;Another action
              </a>
              <div className="dropdown-divider">
              </div>
              <a className="dropdown-item" href="#">
                &nbsp;Something else here
              </a>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="chart-area">
            <canvas ref={chartRef}></canvas>
          </div>
          <div className="text-center small mt-4"><span className="me-2"><i className="fas fa-circle text-primary"></i>&nbsp;Direct</span><span className="me-2"><i className="fas fa-circle text-success"></i>&nbsp;Social</span><span className="me-2"><i className="fas fa-circle text-info"></i>&nbsp;Refferal</span></div>
        </div>
      </div>
    </div>
  );
}
