import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import fetch from "node-fetch";

const PORT = process.env.PORT || 7000;
const apiKey = process.env.RAPID_API_KEY;
const getWordURL = `https://wordsapiv1.p.rapidapi.com/words/?random=true`;
const getDefinitionURL = `https://wordsapiv1.p.rapidapi.com/words/`;

app.use(express.json());
app.set("trust proxy", 1);

// ROUTES
app.all("*", (req, res, next) => {
  res.setHeader("Cache-Control", "s-max-age=1", "stale-while-revalidate");
  next();
});

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "Hi! This is a demo api, so please use the /api routes detailed on the project Github -- https://github.com/charlesmartinreed/word-guesser-api -- to see what's going on around here. ✌🏿"
    );
});

app.get("/api/words/:count", async (req, res) => {
  let fetchedWords = [];

  for (let i = 0; i < req.params.count; i++) {
    let { word } = await executeFetch(getWordURL, apiKey);
    let definitions = await executeFetch(
      `${getDefinitionURL}/${word}/definitions`,
      apiKey
    );
    fetchedWords = [...fetchedWords, { word: word, definitions: definitions }];
  }

  res.status(200).json(fetchedWords);
});

async function executeFetch(URL, apiKey) {
  try {
    let res = await fetch(URL, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      },
    });
    return await res.json();
  } catch (e) {
    throw new Error(`Could not fetch word from API: ${e}`);
  }
}

app.listen(PORT, () => console.log("server now running"));
