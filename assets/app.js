$(document).ready(function () {
  let dirtySearch = window.location.search;
  const urlParams = new URLSearchParams(dirtySearch);
  console.log(urlParams.get("artistName"));
  let artist = urlParams.get("artistName");
  let song = urlParams.get("songName");

  getSong();
  function getSong() {
    $.ajax({
      type: "GET",
      url: "https://api.spotify.com/v1/search",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      data: {
        q: song,
        type: "track",
        limit: 1,
      },
    }).then(function (resp) {
      console.log(resp);
      let player = $("<iframe>");
      player.attr({
        src: "https://open.spotify.com/embed?uri=" + resp.tracks.items[0].uri,
        width: "100%",
        height: "100%",
        frameborder: "0",
        allowtransparency: true,
        allow: "encrypted-media",
      });

      $(".a").append(player);
    });
  }
  //Youtube API
  /*$.ajax({
    type: "GET",
    url: "https://www.googleapis.com/youtube/v3/search",
    data: {
      key: "AIzaSyCFonS58Mi9FXxIvqe0p4YY1Rf8HVhcAIg",
      q: artist + song,
      part: "snippet",
      maxResults: 10,
      type: "video",
      videoEmbeddable: true,
    },
  }).then((response) => {
    console.log(response);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    onYouTubeIframeAPIReady();
    function onYouTubeIframeAPIReady() {
      console.log("in the youtube ready callback");
      player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: response.items[0].id.videoId,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
      }
    }
    function stopVideo() {
      player.stopVideo();
    }

    //write a function to show 10 video results from youtube API on

    //write a function to show video results from youtube API
    // function displayvideo() {
    //   let searchResulsts = localStorage.getItem('songName')

    // }
  });*/

  //MusixMatch API
  $.ajax({
    url:
      "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search",
    method: "GET",
    dataType: "json",
    data: {
      apikey: "288eca28787dff862dc30619eec1d852",
      q_artist: "",
    },
  }).then((response) => {
    console.log(response);
  });

  function concertDetails() {
    let searchResults = localStorage.getItem("songName");

    // Ticket Master

    $.ajax({
      url: "https://app.ticketmaster.com/discovery/v2/events.json?",
      method: "GET",
      dataType: "json",
      data: {
        apikey: "AMlA6dh5sfwIqUjSn26jTvgrF6xaX92f",
        keyword: searchResults,
      },
    }).then((response) => {
      console.log(response);
    });
  }

  concertDetails();

  //Fetch Lyrics

  function fetchLyrics(song, artist) {
    base_url = "https://accounts.spotify.com/authorize?";
    client_id = "client_id=7c62586e78b4439e82cba40ac1d1fc4f&";
    redirect_uri =
      "redirect_uri=" +
      "file:///Users/alexis/Software/Bootcamp/Slaps/login.html" +
      "&";
    response_type = "response_type=token";
    window.location = base_url + client_id + redirect_uri + response_type;
  }

  const processLyrics = (lyrics) => {
    console.log(lyrics);
  };
});
