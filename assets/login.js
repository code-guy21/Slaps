$(document).ready(function () {
  function fetchResults(search) {
    $.ajax({
      url:
        "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search",
      method: "GET",
      dataType: "json",
      data: {
        apikey: "288eca28787dff862dc30619eec1d852",
        q_artist_rating: "Desc",
        s_track_rating: "Desc",
        s_track_release_date: "Desc",
        country: +1,
        ...search,
      },
    }).then((response) => {
      displayResults(response.message.body.track_list);
      console.log(response);
      console.log(response.message.body);
    });
  }
  $("#songBtn").on("click", function () {
    let songSearched = $("#searched").val().trim();
    fetchResults({ q_track: songSearched });
  });
  $("#artistBtn").on("click", function () {
    let artistSearched = $("#searched").val().trim();
    fetchResults({ q_artist: artistSearched });
  });

  function displayResults(tracks) {
    tracks.forEach((element) => {
      let song = $("<div>");
      song.attr({
        songName: element.track.track_name,
        artistName: element.track.artist_name,
        class: "track",
      });

      song.css("color", "white");
      song.text(element.track.track_name);
      $("#choices").append(song);
      console.log(element);
    });
    //for (let i = 1; i < 10; i++){
    //("<div> pete </div>")
    //}
  }
  $(document).on("click", ".track", function () {
    let song = $(this);
    let name = song.attr("songName");
    let artist = song.attr("artistName");
    console.log(name);
    console.log(artist);
    location.assign("./main.html?artistName=" + artist + "&songName=" + name);
  });
});
