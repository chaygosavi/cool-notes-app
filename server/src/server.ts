import express from "express";

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("HELLO WORLD FROM TYPESCRIPT");
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
