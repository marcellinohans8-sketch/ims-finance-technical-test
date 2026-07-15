const app = require("./app");

app.get("/", (req, res) => {
  res.send("SERVER BERJALAN");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
