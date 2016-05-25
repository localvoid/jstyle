import {Module, select} from "jstyle";

export default new Module()
  .rules((c, p) => [
    select("html, body", [
      p.margin(0),
      p.padding(0),
    ]),
  ]);
