import express from "express";
import dataList, { fredDataList } from "../data/dataList.js";
import featuredList from "../data/featuredList.js";
import ratioList from "../data/ratioList.js";
import bondsList from "../data/bondsList.js";
import macroList from "../data/macroList.js";

var router = express.Router();

const categoryList = [
  "featured",
  "bonds",
  "macro",
  "ratio",
  "CFTC",
  "EIA",
  "NG",
  "Petroleum",
  "",
];

router.get("/", function (req, res) {
  res.send("Specify the chart you wannt to see in the dashboard");
});

router.get("/:category", (req, res, next) => {
  const category = req.params.category;

  if (categoryList.includes(category) || Object.values(dataList.fredDataList).includes(category)) {
    next();
  } else {
    res.status(404).render("404", { error: "Page not found" });
  }
});

router.get("/:tag", function (req, res) {
  const tag = req.params.tag;
  if (Object.values(dataList.fredDataList).includes(tag)) {
    try {
      res.render("chartTemplate", { tag: tag });
    } catch (err) {
      res.status(404).render("404", { error: "Page not found" });
    }
  } else {
    res.status(404).render("404", { error: "Page not found" });
  }
});

router.get("/featured/:subject", (req, res, next) => {
  const featuredSubject = req.params.subject;
  const fileName = "chartFeaturedTemplate";
  const list = featuredList.map((item) => item.urlendpoint);
  if (list.includes(featuredSubject)) {
    res.render(fileName, { tag: featuredSubject });
  } else {
    res.status(404).render("404", { error: "Page not found" });
  }
});

router.get("/ratio/:subject", (req, res, next) => {
  const ratioSubject = req.params.subject;

  const fileName = "chartRatioTemplate";
  const list = ratioList.map((item) => item.urlendpoint);
  if (list.includes(ratioSubject)) {
    res.render(fileName, { tag: ratioSubject });
  } else {
    res.status(404).render("404", { error: "Page not found" });
  }
});

router.get("/bonds/:subject", (req, res, next) => {
  const bondsSubject = req.params.subject;

  const fileName = "chartBondsTemplate";
  const list = bondsList.map((item) => item.urlendpoint);

  if (list.includes(bondsSubject)) {
    res.render(fileName, { tag: bondsSubject });
  } else {
    res.status(404).render("404", { error: "Page not found" });
  }
});


router.get("/macro/:subject", (req, res, next) => {
  
  const macroSubject = req.params.subject;
  const fileName = "chartMacroTemplate";
  const list = macroList.map((item) => item.urlendpoint);

  console.log(fileName);
  
  if (list.includes(macroSubject)) {
    res.render(fileName, { tag: macroSubject });
  } else {
    res.status(404).render("404", { error: "Page not found" });
  }
});

router.get("/CFTC", (req, res, next) => {
  const source = req.params.source;
  // const tag = req.params.tag;

  const fileName = "chart" + CFTC + "Template";

  res.render(fileName);
});


router.get("/:source/:tag", (req, res, next) => {
  const source = req.params.source;
  const tag = req.params.tag;

  const fileName = "chart" + source + "Template";

  res.render(fileName, { tag: tag });
});

// router.get("/eia/:tag", (req, res, next) => {
//   const tag = req.params.tag;
//   const fileName = "chart" + tag + "Template";

//   if (tag === "oil" || tag === "petroleum" || tag === "NG") {
//     res.render(fileName, { tag: tag });
//   } else {
//     next();
//   }
// });

//   // 404 error page route
// router.use(function (req, res) {
//   res.render("404");
// });

export default router;
