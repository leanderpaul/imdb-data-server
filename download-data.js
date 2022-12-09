const unirest = require('unirest');
const path = require('path');
const fs = require('fs');

const dataDirPath = path.join(__dirname, 'data');
const movieList = require('./unique-title-ids.json');
const downloadedMovieList = fs.readdirSync(dataDirPath).map(name => name.split('.')[0]);

const apiKey = 'k_4jubxqw3';

async function downloadMovie(mid) {
  if (downloadedMovieList.includes(mid)) {
    console.log(`Movie Title '${mid}' already downloaded, hence skipping`);
    return;
  }
  const response = await unirest.get(`https://imdb-api.com/en/API/Title/${apiKey}/${mid}`);
  const data = response.body;
  if (data.errorMessage) {
    console.error(`Error while downloading title '${mid}'`);
    process.exit(1);
  }
  fs.writeFileSync(dataDirPath + `/${mid}.json`, JSON.stringify(data));
  console.log(`Downloaded Movie Title '${mid}'`);
}

async function downloadMovies() {
  for (let index = 0; index < movieList.length; index++) await downloadMovie(movieList[index]);
}

downloadMovies();
