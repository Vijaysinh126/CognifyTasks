import express from "express";
const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("form");
});

app.post("/submit", (req, res) => {
  const userName = req.body.userName;
  res.render("result", { name: userName });
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
