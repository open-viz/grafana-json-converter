import { OmitMethod } from "../../omit-method";
import { Dashboard } from "../../classes/dashboard";
import { NonRowPanel } from "../../classes/panel";
import testRowPanel from "../panels/test-row-panel";
import testStatPanel from "../panels/test-stat-panel";
import testTablePanel from "../panels/test-table-panel";
import testTimeseriesPanel from "../panels/test-timeseries-panel";

const testDashboard: OmitMethod<Dashboard> = {
  __inputs: [],
  __requires: [],
  annotations: { list: [] },
  title: "Test Dashboard",
  description: "Test dashboard for grafana json converter",
  editable: true,
  gnetId: 9628,
  graphTooltip: 0,
  id: 35,
  iteration: 1632720758840,
  version: 40,
  links: [],
  panels: [
    testRowPanel,
    NonRowPanel.addTargetExprs(testStatPanel, [
      'kubedb_postgres_status_phase{namespace="$namespace", postgres="$database"} == 1\n',
    ]),
    testTimeseriesPanel,
    testTablePanel,
  ],
  refresh: "1m",
  schemaVersion: 30,
  style: "dark",
  tags: [],
  templating: {
    list: [],
  },
  time: { from: "now-3h", to: "now" },
  timepicker: { refresh_intervals: [], time_options: [] },
  timezone: "browser",
  uid: "VnOgk2Hnk",
};

export default testDashboard;
