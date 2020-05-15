//Youtube API
$.ajax({
  type: "GET",
  url: "https://www.googleapis.com/youtube/v3/search",
  data: {
    key: "AIzaSyCFonS58Mi9FXxIvqe0p4YY1Rf8HVhcAIg",
    q: searchResults,
    part: "snippet",
    maxResults: 10,
    type: "video",
    videoEmbeddable: true,
  },
}).then((response) => {
  console.log(response);
});

//write a function to show 10 video results from youtube API on 

//write a function to show video results from youtube API
function displayvideo() {
  let searchResulsts = localStorage.getItem('songName')


}

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
  url:
    "https://app.ticketmaster.com/discovery/v2/events.json?",
  method: "GET",
  dataType: "json",
  data: {
    apikey: "AMlA6dh5sfwIqUjSn26jTvgrF6xaX92f",
    keyword: "metallica",

  },
}).then((response) => {
  console.log(response);
});
