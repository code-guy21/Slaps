//Youtube API

$.ajax({
  type: "GET",
  url: "https://www.googleapis.com/youtube/v3/search",
  data: {
    key: "AIzaSyCFonS58Mi9FXxIvqe0p4YY1Rf8HVhcAIg",
    q: "Metallica",
    part: "snippet",
    maxResults: 10,
    type: "video",
    videoEmbeddable: true,
  },
}).then((response) => {
  console.log(response);
});

//to play video go to youtube.com/watch?v=<videoid>

//MusixMatch API
$.ajax({
  url:
    "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search",
  method: "GET",
  dataType: "json",
  data: {
    apikey: "288eca28787dff862dc30619eec1d852",
    q_artist: "metallica",
  },
}).then((response) => {
  console.log(response);
});

// Ticket Master

$.ajax({
  url: "https://app.ticketmaster.com/discovery/v2/events.json?",
  method: "GET",
  dataType: "json",
  data: {
    apikey: "AMlA6dh5sfwIqUjSn26jTvgrF6xaX92f",
    keyword: "metallica",
  },
}).then((response) => {
  console.log(response);
});

//Fetch Lyrics

function fetchLyrics(song, artist) {
  $.ajax({
    url:
      "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
    method: "GET",
    dataType: "json",
    data: {
      apikey: "288eca28787dff862dc30619eec1d852",
      q_track: song,
      q_artist: artist,
    },
  }).then(function (response) {
    processLyrics(response.message.body.lyrics.lyrics_body);
  });
}

const processLyrics = (lyrics) => {
  console.log(lyrics);
};
