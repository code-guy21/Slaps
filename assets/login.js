$(document).ready(function () {
  const token = location.hash.substring(1).split("&")[0].split("=")[1];

  const base_url = "https://accounts.spotify.com/authorize?";
  const params = {
    client_id: "7c62586e78b4439e82cba40ac1d1fc4f",
    redirect_uri: "http://127.0.0.1:5500/login.html",
    response_type: "token",
  };

  spotifyCallback = (payload) => {
    sessionStorage.setItem("access_token", payload);
    window.location = "http://127.0.0.1:5500/search.html";
  };

  if (token) {
    spotifyCallback(token);
  }

  $("#login").click(function () {
    window.open(base_url + $.param(params), "_self");
  });
});
