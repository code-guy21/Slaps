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
