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
    console.log(tracks);

    tracks.forEach((element) => {
      console.log(element);
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
  $("#songBtn").on("click", function () {
    let songSearched = $("#searched").val().trim();
    fetchResults({ q: songSearched, type: "track" });
    $("#choices").html("");
  });
  $("#artistBtn").on("click", function () {
    let artistSearched = $("#searched").val().trim();
    fetchResults({ q: "artist:" + artistSearched, type: "track" });
    $("#choices").html("");
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
