import {Module, select} from "../../dist/js/lib/jstyle";

export default new Module()
  .rules((c, p) => [
    select("html, body", [
      p.margin("0"),
      p.padding("0"),
    ]),
  ]);
