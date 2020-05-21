$(document).ready(function () {
  const token = location.hash.substring(1).split("&")[0].split("=")[1];

  if (token) {
    sessionStorage.setItem("access_token", token);
    // window.location = "http://127.0.0.1:5500/search.html";
    window.location = "/search.html";
  }

  const base_url = "https://accounts.spotify.com/authorize?";
  const params = {
    client_id: "7c62586e78b4439e82cba40ac1d1fc4f",
    // redirect_uri: "http://127.0.0.1:5500/index.html",
    redirect_uri: "/index.html",
    response_type: "token",
  };

  $("#login").click(function () {
    event.preventDefault();
    window.open(base_url + $.param(params), "_self");
  });
});
