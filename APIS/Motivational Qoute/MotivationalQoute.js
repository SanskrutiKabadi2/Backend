const express = require("express");
const app = express();
const cors = require("cors");

const mQuotes = require("./qoutesData");

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// ✅ Random quote
app.get("/motivationalQuote/random", (req, res) => {
  const rd = Math.floor(Math.random() * mQuotes.length);
  res.status(200).json(mQuotes[rd]);
});

// ✅ Quote by id
app.get("/motivationalQuote/:id", (req, res) => {
  const id = Number(req.params.id);

  const quote = mQuotes.find(q => q.id === id);

  if (!quote) {
    return res.status(404).json({ message: "No Motivational Quote Id Found" });
  }

  res.status(200).json(quote);
});

// ✅ All quotes
app.get("/motivationalQuotes", (req, res) => {
  res.status(200).json(mQuotes);
});

// ✅ Quotes by author
app.get("/motivationalQuote", (req, res) => {
  const { author } = req.query;

  if (!author) {
    return res.status(400).json({ message: "Author query is required" });
  }

  const filtered = mQuotes.filter(q => q.author === author);
  res.status(200).json(filtered);
});

app.listen(5000, () => {
  console.log("server started!");
});
