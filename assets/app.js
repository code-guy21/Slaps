$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  let artist = urlParams.get("artistName");
  let song = urlParams.get("songName");
  let uri = urlParams.get("uri");

  // light/darkmode
  document.getElementById("switch").addEventListener("click", themeToggle);
  function themeToggle() {
    $(".box").each(function (box) {
      $(this).css("background-color", "#45505a");
    });
    document.body.classList.toggle("dark-mode");
    }

  // Spotify
  function renderSong(song) {
    let player = $("<iframe>").attr({
      src: "https://open.spotify.com/embed?uri=" + uri,
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
      data: {
        size: 5,
        apikey: "AMlA6dh5sfwIqUjSn26jTvgrF6xaX92f",
        keyword: artist,
        sort: "name,desc",
      },
    }).then((response) => {
      renderConcerts(response._embedded.events);
      console.log(response)
    });
  }

  function renderConcerts(concerts) {
    concerts.forEach((concert) => {
      let imgDiv = $("<div class='col-2 m-4'>");

      let eventTitle = $('<p id="eventTitle">').text(concert._embedded.venues[0].name);
      let eventDate = $('<p id="eventDate">').text(
        concert.dates.start.localDate
      );
      let eventLocation = $('<p id="eventLocation">').text(concert._embedded.venues[0].city.name + ", " + concert._embedded.venues[0].state.stateCode)
      let concertsImage = $("<img id='eventImage'>");

      concertsImage.attr({
        src: concert.images[5].url,
        id: "concertImg",
        class: "imgSize",
        "data-url": concert.url,
      });
      imgDiv.append(eventTitle);
      imgDiv.append(eventDate);
      imgDiv.append(eventLocation);
      imgDiv.append(concertsImage);

      $("#eventDisplay").append(imgDiv);
    });
  }

  //MusixMatch API
  // alexis key: "288eca28787dff862dc30619eec1d852"
  // pete key  : "b0f551e56682404247337bb3ace03a29"

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

  renderSong();
  fetchLyrics();
  fetchConcerts();
});
