import express from "express";

var router = express.Router();

router.get("/", function (req, res) {
  res.send("Specify the chart you wannt to see in the dashboard");
});

router.get("/featured/:subject", (req, res, next) => {

      const featuredSubject = req.params.subject;
      const fileName = "chartFeaturedTemplate";
      res.render(fileName, {tag: featuredSubject});

})

router.get("/ratio/:subject", (req, res, next) => {
  const ratioSubject = req.params.subject;

  const fileName = "chartRatioTemplate";
  res.render(fileName, {tag: ratioSubject});

})

router.get("/bonds/:subject", (req, res, next) => {
  const bondsSubject = req.params.subject;

  const fileName = "chartBondsTemplate";
  res.render(fileName, {tag: bondsSubject});

})

router.get("/:source/:tag", (req, res, next) => {
  const source = req.params.source;
  const tag = req.params.tag;
  
  const fileName = "chart" + source + "Template";
  
    res.render(fileName, {tag: tag});
  
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

router.get("/:tag", function (req, res) {
  const tag = req.params.tag;
  try {
    res.render("chartTemplate", { tag: tag });
  } catch (err) {
    res.status(404).render("404", { error: "Page not found" });
  }
});



//   // 404 error page route
// router.use(function (req, res) {
//   res.render("404");
// });

export default router;
