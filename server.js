const express = require("express");
const app = express();
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/dealers_choice_full_stack"
);

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use(express.json());
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

//routes
app.get("/api/cities", async (req, res, next) => {
  try {
    res.send(await Cities.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/cities", async (req, res, next) => {
  try {
    console.log("post route", req.body);
    const created = req.body.name;
    const newCity = await Cities.create({ name: created });
    res.status(201).send(newCity);
  } catch (ex) {
    next(ex);
  }
});

//model creation
const Cities = sequelize.define("cities", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  country: {
    type: Sequelize.STRING,
  },
  population: {
    type: Sequelize.INTEGER,
  },
});

const init = async () => {
  await sequelize.sync({ force: true });
  console.log("syncd");
  //seeding
  await Promise.all([
    Cities.create({
      name: "NYC",
      country: "United State",
      population: 8400000,
    }),
    Cities.create({
      name: "Paris",
      country: "France",
      population: 2100000,
    }),
    Cities.create({
      name: "Madrid",
      country: "Spain",
      population: 3200000,
    }),
    Cities.create({
      name: "Toronto",
      country: "Canada",
      population: 2900000,
    }),
    Cities.create({
      name: "Tokyo",
      country: "Japan",
      population: 13900000,
    }),
    Cities.create({
      name: "Sydney",
      country: "Australia",
      population: 5300000,
    }),
  ]);
  //port
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
