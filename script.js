
// Get the user's IP address using ipify
$.getJSON("https://api.ipify.org?format=json", function (data) {
  var ipAddress = data.ip;
  $("#gfg").html(ipAddress);


  $("#btn").on("click", function () {
    getAdditionalInfo(ipAddress);
  });
});

function getAdditionalInfo(ipAddress) {
  fetch(`https://ipapi.co/${ipAddress}/json/`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Create the query string using data directly
      var queryString = `ip=${data.ip}&city=${data.city}&region=${data.region}&country=${data.country}&latitude=${data.latitude}&longitude=${data.longitude}&org=${data.org}&postal=${data.postal}&timezone=${data.timezone}`;
      // Redirect to post.html with the query string
      window.location.href = `post.html?${queryString}`;
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error);
    });
}
