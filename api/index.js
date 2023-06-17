import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import fetch from "node-fetch";

const PORT = process.env.PORT || 7000;
const apiKey = process.env.RAPID_API_KEY;
const getWordURL = `https://wordsapiv1.p.rapidapi.com/words/?random=true`;

// const getDefinitionURL = `https://wordsapiv1.p.rapidapi.com/words`;

app.use(express.json());

// ROUTES
app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-RapidAPI-Key, X-RapidAPI-Host"
  );
  next();
});

app.get("/api", (req, res) => {
  res
    .status(200)
    .send(
      "Hi! This is a demo api, so please use the /api routes detailed on the project Github -- https://github.com/charlesmartinreed/word-guesser-api -- to see what's going on around here. ✌🏿"
    );
});
let fetchedWord;

app.get("/api/word/", async (req, res) => {
  let result;
  result = await executeFetch(getWordURL, apiKey);

  if (!result.results || !result.results[0].definition) {
    result = await executeFetch(getWordURL, apiKey);
  }

  let word = result.word;
  let definition = result.results[0].definition;

  fetchedWord = { word: word, definitions: definition };

  res.status(200).send(fetchedWord);
});

app.get("/", (req, res) => res.redirect("/api"));
app.get("*", (req, res) => res.redirect("/api"));

async function executeFetch(URL, apiKey) {
  console.log("fetching from url", URL);
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

app.listen(PORT, () => {
  console.log("up and running on PORT", PORT);
});
