$(document).ready(function () {
  let placeholderPuns = [
    "For Whom The Mouse Clicks...",
    "Click Me Like a Hurricane...",
    "Kiki, Are You Clicking...?",
    "Oooh I'm Blinded By The Click!",
    "Click Me Baby One More Time...",
    "Can I Click It?",
    "Rock Your Browser!",
    "We Will We Will Click You!",
    "You Clicked Me All Night Long!",
    "(Don't Fear) The Browser...",
    "Clicking On A Prayer...",
  ];

  let randomPun =
    placeholderPuns[Math.floor(Math.random() * placeholderPuns.length)];
  $("#searched").attr("placeholder", randomPun);

  function fetchResults(params) {
    $.ajax({
      type: "GET",
      url: "https://api.spotify.com/v1/search",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      data: {
        type: "track",
        limit: 10,
        ...params,
      },
    })
      .then((response) => {
        if (response.tracks.items.length === 0) {
          rickRoll();
        } else {
          displayResults(response.tracks.items);
        }
      })
      .catch(function () {
        rickRoll();
      });
  }

  function rickRoll() {
    //create element
    let rick = $("<img>");

    //add attributes
    rick.attr({
      src: "../assets/images/rickroll.gif",
    });

    //append to page
    $("#choices")
      .append(rick)
      .append($("<div>...no results, try again</div>").css("color", "white"));
  }

  function displayResults(tracks) {
    tracks.forEach((element) => {
      //create track element
      let song = $("<div id='trackListing'>");

      //add attributes
      song.attr({
        songName: element.name,
        artistName: element.artists[0].name,
        uri: element.uri,
        class: "track",
      });

      //add css
      song.css("color", "white");
      song.text(element.name + " - " + element.artists[0].name);

      //append to page
      $("#choices").append(song);

      //clear input field
      $("#searched").val("");
      $("#searched").attr("placeholder", randomPun);
    });
  }

  function validate(term) {
    //check if search term is not an empty string
    if (term.length === 0) {
      //display invalid feeback
      $("#feedback").css("visibility", "visible");
      $("#searched").addClass("is-invalid");
      return false;
    } else {
      //display valid feedback
      $("#feedback").css("visibility", "hidden");
      $("#searched").removeClass("is-invalid");
      $("#searched").addClass("is-valid");
      return true;
    }
  }

  //song button listener
  $("#songBtn").on("click", function () {
    //store song search term
    let songSearched = $("#searched").val().trim();

    //validate search
    if (validate(songSearched)) {
      //fetch track results
      fetchResults({ q: songSearched });

      //clear previous search results
      $("#choices").html("");
    }
  });

  //artist button listener
  $("#artistBtn").on("click", function () {
    //store artist search term
    let artistSearched = $("#searched").val().trim();

    //validate search
    if (validate(artistSearched)) {
      //fetch track results
      fetchResults({ q: "artist:" + artistSearched });

      //clear previous search results
      $("#choices").html("");
    }
  });

  //prevent default form behavior
  $("form").submit(function (e) {
    e.preventDefault();
    $("#feedback").css("visibility", "visible");
    $("#searched").addClass("is-invalid");
  });

  //listener for individual tracks
  $(document).on("click", ".track", function () {
    let song = $(this);
    let name = song.attr("songName");
    let artist = song.attr("artistName");
    let uri = song.attr("uri");

    //redirect to main page
    location.assign(
      "./main.html?artistName=" + artist + "&songName=" + name + "&uri=" + uri
    );
  });
});
