import { TablePanel } from "../../classes/panel";

const testTablePanel: OmitMethod<TablePanel> = {
  datasource: null,
  description: "Test table panel",
  fieldConfig: {
    defaults: {
      color: {
        mode: "thresholds",
      },
      custom: {
        align: null,
        displayMode: "auto",
      },
      decimals: 2,
      displayName: "",
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
      unit: "short",
    },
    overrides: [
      {
        matcher: {
          id: "byName",
          options: "Time",
        },
        properties: [
          {
            id: "displayName",
            value: "Time",
          },
          {
            id: "custom.align",
            value: null,
          },
        ],
      },
      {
        matcher: {
          id: "byName",
          options: "Value #A",
        },
        properties: [
          {
            id: "displayName",
            value: "CPU Usage",
          },
          {
            id: "unit",
            value: "short",
          },
          {
            id: "decimals",
            value: 2,
          },
          {
            id: "custom.align",
            value: null,
          },
        ],
      },
      {
        matcher: {
          id: "byName",
          options: "Value #B",
        },
        properties: [
          {
            id: "displayName",
            value: "CPU Requests",
          },
          {
            id: "unit",
            value: "short",
          },
          {
            id: "decimals",
            value: 2,
          },
          {
            id: "custom.align",
            value: null,
          },
        ],
      },
      {
        matcher: {
          id: "byName",
          options: "Value #C",
        },
        properties: [
          {
            id: "displayName",
            value: "CPU Requests %",
          },
          {
            id: "unit",
            value: "percentunit",
          },
          {
            id: "decimals",
            value: 2,
          },
          {
            id: "custom.align",
            value: null,
          },
        ],
      },
      {
        matcher: {
          id: "byName",
          options: "Value #D",
        },
        properties: [
          {
            id: "displayName",
            value: "CPU Limits",
          },
          {
            id: "unit",
            value: "short",
          },
          {
            id: "decimals",
            value: 2,
          },
          {
            id: "custom.align",
            value: null,
          },
        ],
      },
      {
        matcher: {
          id: "byName",
          options: "Value #E",
        },
        properties: [
          {
            id: "displayName",
            value: "CPU Limits %",
          },
          {
            id: "unit",
            value: "percentunit",
          },
          {
            id: "decimals",
            value: 2,
          },
          {
            id: "custom.align",
            value: null,
          },
        ],
      },
      {
        matcher: {
          id: "byName",
          options: "pod",
        },
        properties: [
          {
            id: "displayName",
            value: "Pod",
          },
          {
            id: "unit",
            value: "short",
          },
          {
            id: "decimals",
            value: 2,
          },
          {
            id: "links",
            value: [
              {
                targetBlank: false,
                title: "Drill down",
                url: "./d/6581e46e4e5c7ba40a07646395ef7b23/k8s-resources-pod?var-datasource=$datasource&var-cluster=$cluster&var-namespace=$namespace&var-pod=$__cell",
              },
            ],
          },
          {
            id: "custom.align",
            value: null,
          },
        ],
      },
    ],
  },
  gridPos: {
    h: 7,
    w: 24,
    x: 0,
    y: 30,
  },
  id: 122,
  links: [],
  options: {
    showHeader: true,
  },
  pluginVersion: "8.1.2",
  targets: [
    {
      exemplar: false,
      expr: 'sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate{namespace="$namespace", pod=~"$database.*"}) by (pod)',
      format: "table",
      instant: true,
      interval: "",
      intervalFactor: 2,
      legendFormat: "",
    },
    {
      exemplar: false,
      expr: 'sum(cluster:namespace:pod_cpu:active:kube_pod_container_resource_requests{namespace="$namespace", pod=~"$database.*"}) by (pod)',
      format: "table",
      instant: true,
      interval: "",
      intervalFactor: 2,
      legendFormat: "",
    },
    {
      exemplar: false,
      expr: 'sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate{namespace="$namespace", pod=~"$database.*"}) by (pod) / sum(cluster:namespace:pod_cpu:active:kube_pod_container_resource_requests{namespace="$namespace", pod=~"$database.*"}) by (pod)',
      format: "table",
      instant: true,
      interval: "",
      intervalFactor: 2,
      legendFormat: "",
    },
    {
      exemplar: false,
      expr: 'sum(cluster:namespace:pod_cpu:active:kube_pod_container_resource_limits{namespace="$namespace", pod=~"$database.*"}) by (pod)',
      format: "table",
      instant: true,
      interval: "",
      intervalFactor: 2,
      legendFormat: "",
    },
    {
      exemplar: false,
      expr: 'sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate{namespace="$namespace", pod=~"$database.*"}) by (pod) / sum(cluster:namespace:pod_cpu:active:kube_pod_container_resource_limits{namespace="$namespace", pod=~"$database.*"}) by (pod)',
      format: "table",
      instant: true,
      interval: "",
      intervalFactor: 2,
      legendFormat: "",
    },
  ],
  timeFrom: null,
  timeShift: null,
  title: "Test Table Panel",
  transformations: [
    {
      id: "merge",
      options: {
        reducers: [],
      },
    },
  ],
  type: "table",
};

export default testTablePanel;
