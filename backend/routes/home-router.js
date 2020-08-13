const router = require("express").Router();
const Home = require("../models/home.model");

router.route("/").get((req, res) =>
  Home.find()
    .then((homes) =>
      res.json(homes.map((home) => ({ _id: home._id, title: home.title })))
    )
    .catch((err) => res.status(400).json("Error: " + err))
);

router.route("/:homeId").get((req, res) =>
  Home.findById(req.params.homeId)
    .then((home) =>
      res.json({
        controlObjects: home.controlObjects,
        controlElements: home.controlElements,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err))
);

router.route("/add").post((req, res) => {
  const { title, controlObjects, controlElements } = req.body;

  const newControlObject = new Home({ title, controlObjects, controlElements });
  newControlObject
    .save()
    .then(() => res.json("Home added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put((req, res) =>
  Home.findByIdAndUpdate(req.params.id, { controlObjects: req.body }, (err) => {
    if (err) return res.status(400).json("Error: " + err);
    return res.status(200).send();
  })
);

module.exports = router;
