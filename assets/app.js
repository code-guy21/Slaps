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
