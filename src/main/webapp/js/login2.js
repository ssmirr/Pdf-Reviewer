$( "#login" ).on( "click", function( event ) {
  event.preventDefault();

  var clientId = "c806c99f0bddb0fdd605";
  var githubAuthURL = "https://github.com/login/oauth/authorize?";
  githubAuthURL = githubAuthURL + "client_id=" + clientId + "&scope=repo&state=totallyrandomstring";
  githubAuthURL = githubAuthURL + "&redirect_uri=" + encodeURIComponent("http://localhost:9090/login2");

  window.location = githubAuthURL;
});