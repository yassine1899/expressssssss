const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "js");
app.set("views", "./views");

app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  const isOnService = day >= 1 && day <= 5 && hour >= 9 && hour < 17;

  if (isOnService) {
    next();
  } else {
    res.status(500).render("outOfService");
  }
});

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/services", (req, res) => {
  res.render("services");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.use((req, res) => {
  res.status(404).render("notFound");
});

app.listen(3001, (err) => {
  err
    ? console.log(err)
    : console.log("the server is running well on the port 3001");
});
