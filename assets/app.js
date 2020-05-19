$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  let artist = urlParams.get("artistName");
  let song = urlParams.get("songName");

  // Spotify
  function fetchSong() {
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
      renderSong(resp.tracks.items[0]);
    });
  }

  function renderSong(song) {
    let player = $("<iframe>").attr({
      src: "https://open.spotify.com/embed?uri=" + song.uri,
      width: "100%",
      height: "100%",
      frameborder: "0",
      allowtransparency: true,
      allow: "encrypted-media",
    });

    $(".a").append(player);
  }

  // Ticket Master
  function fetchConcerts() {
    $.ajax({
      url: "https://app.ticketmaster.com/discovery/v2/events.json?",
      method: "GET",
      dataType: "json",
      size: 5,
      data: {
        apikey: "AMlA6dh5sfwIqUjSn26jTvgrF6xaX92f",
        keyword: artist,
      },
    }).then((response) => {
      renderConcerts(response._embedded.events);
    });
  }

  function renderConcerts(concerts) {
    concerts.forEach((concert) => {
      let imgDiv = $("<div class='col-2 m-4'>");

      let eventTitle = $('<p id="eventTitle">').text(concert.name);
      let eventDate = $('<p id="eventDate">').text(
        concert.dates.start.localDate
      );
      let concertsImage = $("<img id='eventImage'>");

      concertsImage.attr({
        src: concert.images[5].url,
        class: "imgSize",
        "data-url": concert.url,
      });
      imgDiv.append(eventTitle);
      imgDiv.append(eventDate);
      imgDiv.append(concertsImage);

      $("#eventDisplay").append(imgDiv);
    });
  }

  //MusixMatch API
  function fetchLyrics() {
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
      renderLyrics(response.message.body.lyrics.lyrics_body);
    });
  }

  const renderLyrics = (lyrics) => {
    $("#lyrics").css("height", $(".a").css("height"));
    $("#lyrics").text(lyrics.split("...")[0]);
  };

  //Concert Links
  $(document.body).on("click", ".imgSize", function () {
    let eventUrl = $(this).attr("data-url");

    window.open(eventUrl, "_blank");
  });

  fetchSong();
  fetchLyrics();
  fetchConcerts();
});
