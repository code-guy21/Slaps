$(document).ready(function () {
  //parse access token from URL
  const token = location.hash.substring(1).split("&")[0].split("=")[1];

  //check if token is present
  if (token) {
    //store token in session storage
    sessionStorage.setItem("access_token", token);
    //redirect to search page
    window.location = "./search.html";
  }

  //Spotify authorization URL
  const base_url = "https://accounts.spotify.com/authorize?";

  //Spotify credentials
  const params = {
    client_id: "7c62586e78b4439e82cba40ac1d1fc4f",
    redirect_uri: "https://code-guy21.github.io/Slaps/",
    response_type: "token",
  };

  //login button listener
  $("#login").click(function () {
    event.preventDefault();

    //redirect to spotify authorization URL
    window.open(base_url + $.param(params), "_self");
  });
});
