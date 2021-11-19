import { TimeseriesPanel } from "../../classes/panel";

const testTimeseriesPanel: OmitMethod<TimeseriesPanel> = {
  datasource: null,
  description: "Test timeseries panel",
  fieldConfig: {
    defaults: {
      color: {
        mode: "palette-classic",
      },
      custom: {
        axisLabel: "",
        axisPlacement: "auto",
        barAlignment: 0,
        drawStyle: "line",
        fillOpacity: 0,
        gradientMode: "none",
        hideFrom: {
          legend: false,
          tooltip: false,
          viz: false,
          graph: false,
        },
        lineInterpolation: "linear",
        lineWidth: 1,
        pointSize: 5,
        scaleDistribution: {
          type: "linear",
        },
        showPoints: "auto",
        spanNulls: false,
        stacking: {
          group: "A",
          mode: "none",
        },
        thresholdsStyle: {
          mode: "off",
        },
      },
      mappings: [],
      thresholds: {
        mode: "absolute",
        steps: [
          {
            color: "green",
            value: null,
          },
          {
            color: "red",
            value: 80,
          },
        ],
      },
    },
    overrides: [],
  },
  gridPos: {
    h: 10,
    w: 24,
    x: 0,
    y: 20,
  },
  id: 98,
  options: {
    legend: {
      calcs: [],
      displayMode: "table",
      placement: "right",
    },
    tooltip: {
      mode: "single",
    },
  },
  pluginVersion: "8.1.2",
  targets: [
    {
      exemplar: false,
      expr: 'sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate{namespace="$namespace", pod=~"$database-.*"}) by (pod)',
      interval: "",
      legendFormat: "{{pod}}",
    },
  ],
  title: "Test Timeseries Panel",
  type: "timeseries",
};

export default testTimeseriesPanel;
