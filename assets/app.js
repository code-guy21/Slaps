$(document).ready(function () {
  let dirtySearch = window.location.search;
  const urlParams = new URLSearchParams(dirtySearch);
  let artist = urlParams.get("artistName");
  let song = urlParams.get("songName");


  // light/darkmode
  document.getElementById("switch").addEventListener("click", themeToggle);
  function themeToggle() {
    $(".box").each(function (box) {
      $(this).css("background-color", "#45505a");
    });
    document.body.classList.toggle("dark-mode");
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

  



  // Ticket Master

  // Ticket Master
  function concertDetails() {
    $.ajax({
      url: "https://app.ticketmaster.com/discovery/v2/events.json?",
      method: "GET",
      dataType: "json",
      data: {
        apikey: "AMlA6dh5sfwIqUjSn26jTvgrF6xaX92f",
        keyword: artist,
      },
    }).then((response) => {
      let concerts = response._embedded.events;

      for (let i = 0; i < 5; i++) {
        let imgDiv = $('<div class="col-2 m-4">');

        let eventTitle = $('<p id="eventTitle">').text(concerts[i].name);
        let eventDate = $('<p id="eventDate">').text(
          concerts[i].dates.start.localDate
        );
        let concertsImage = $("<img id='eventImage'>");

        concertsImage.attr({"src": concerts[i].images[5].url, id: "imgSize"});

        imgDiv.append(eventTitle);
        imgDiv.append(eventDate);
        imgDiv.append(concertsImage);

        console.log(imgDiv);

        $("#eventDisplay").append(imgDiv);
      }
    });
  }

  concertDetails();

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

  fetchLyrics(song, artist);


