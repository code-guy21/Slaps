$(document).ready(function () {
  function fetchResults(search) {
    $.ajax({
      type: "GET",
      url: "https://api.spotify.com/v1/search",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      data: {
        type: "track",
        limit: 10,
        ...search,
      },
    }).then((response) => {
      displayResults(response.tracks.items);
    });
  }

  function displayResults(tracks) {
    tracks.forEach((element) => {
      let song = $("<div id='trackListing'>");
      song.attr({
        songName: element.name,
        artistName: element.artists[0].name,
        uri: element.uri,
        class: "track",
      });

      song.css("color", "white");
      song.text(element.name + " - " + element.artists[0].name);
      $("#choices").append(song);
      $("#searched").val("");
    });
  }

  function validate(term) {
    if (term.length === 0) {
      $("#feedback").css("visibility", "visible");
      $("#searched").addClass("is-invalid");
      return false;
    } else {
      $("#feedback").css("visibility", "hidden");
      $("#searched").removeClass("is-invalid");
      $("#searched").addClass("is-valid");
      return true;
    }
  }

  $("#songBtn").on("click", function () {
    let songSearched = $("#searched").val().trim();
    if (validate(songSearched)) {
      fetchResults({ q: songSearched });
      $("#choices").html("");
    }
  });
  $("#artistBtn").on("click", function () {
    let artistSearched = $("#searched").val().trim();
    if (validate(artistSearched)) {
      fetchResults({ q: "artist:" + artistSearched });
      $("#choices").html("");
    }
  });

  $("form").submit(function (e) {
    e.preventDefault();
    $("#feedback").css("visibility", "visible");
    $("#searched").addClass("is-invalid");
  });

  $(document).on("click", ".track", function () {
    let song = $(this);
    let name = song.attr("songName");
    let artist = song.attr("artistName");
    let uri = song.attr("uri");
    location.assign(
      "./main.html?artistName=" + artist + "&songName=" + name + "&uri=" + uri
    );
  });
});
