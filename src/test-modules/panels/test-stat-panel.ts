import { OmitMethod } from "../../omit-method";
import { StatPanel } from "../../classes/panel";

const testStatPanel: OmitMethod<StatPanel> = {
  datasource: null,
  description: "Test stat panel",
  fieldConfig: {
    defaults: {
      color: {
        fixedColor: "text",
        mode: "fixed",
      },
      mappings: [
        {
          options: {
            Critical: {
              color: "dark-yellow",
            },
            DataRestoring: {
              color: "dark-red",
            },
            Halted: {
              color: "dark-red",
            },
            NotReady: {
              color: "dark-red",
            },
            Provisioning: {
              color: "text",
            },
            Ready: {
              color: "semi-dark-green",
            },
          },
          type: "value",
        },
      ],
      thresholds: {
        mode: "absolute",
        steps: [
          {
            color: "text",
            value: null,
          },
        ],
      },
    },
    overrides: [],
  },
  gridPos: {
    h: 3,
    w: 4,
    x: 12,
    y: 1,
  },
  id: 78,
  options: {
    colorMode: "value",
    graphMode: "none",
    justifyMode: "auto",
    orientation: "auto",
    reduceOptions: {
      calcs: ["lastNotNull"],
      fields: "/^phase$/",
      values: false,
    },
    text: {},
    textMode: "auto",
  },
  pluginVersion: "8.1.2",
  targets: [
    {
      exemplar: false,
      expr: "",
      format: "table",
      instant: true,
      interval: "",
      legendFormat: "{{phase}}",
    },
  ],
  title: "Test Stat Panel",
  type: "stat",
};

export default testStatPanel;
