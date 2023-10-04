// Function to parse URL parameters
function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// {
//   ip: '101.0.63.4',
//   city: 'Bengaluru',
//   region: 'Karnataka',
//   country: 'IN',
//   latitude: 12.9634,
//   longitude: 77.5855,
//   org: 'TATA PLAY BROADBAND PRIVATE LIMITED',
//   postal: '560066',
//   timezone: 'Asia/Kolkata'
// }

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve data from URL parameters
  var ipAddress = getURLParameter("ip");
  var city = getURLParameter("city");
  var region = getURLParameter("region");
  var country = getURLParameter("country");
  var latitude = parseFloat(getURLParameter("latitude"));
  var longitude =parseFloat(getURLParameter("longitude"));
  var org = getURLParameter("org");
  var postal = getURLParameter("postal");
  var timezone = getURLParameter("timezone");

  console.log("IP Address:", ipAddress);
  console.log("City:", city);
  console.log("Region:", region);
  console.log("Country:", country);
  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);
  console.log("Organization:", org);
  console.log("Postal Code:", postal);
  console.log("Timezone:", timezone);
  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);

  // Display the IP address on the page
  $("#addr").html(ipAddress);
  $("#lat").html(latitude);
  $("#long").html(longitude);
  $("#city").html(city);
  $("#Orgnisation").html(org);
  $("#Region").html(region);
  $("#Hostname").html(postal);
 
  
  var userTimezone = timezone; // timezone is in the format 'Asia/Kolkata'
  var currentTime = new Date().toLocaleTimeString([], { timeZone: userTimezone, hour12: true, hour: '2-digit', minute: '2-digit' });
  var userDateTime = new Date().toLocaleString("en-US", { timeZone: userTimezone });
  
  // Display the current time and date in the user's timezone
  console.log('Time:', currentTime);
  console.log('Date and Time:', userDateTime);
  
  // Update the HTML elements with the current time and date
  $("#currentTime").html("Time: " + currentTime);
  $("#currentDateTime").html("Date and Time: " + userDateTime);

  //pincode
  $("#pincode").html("Pincode: "+postal);



  // initMap(latitude, longitude);

  //map

    var latitude = parseFloat(getURLParameter("latitude"));
    var longitude = parseFloat(getURLParameter("longitude"));
  
    console.log("ow",longitude,latitude);
    // Construct the Google Maps URL with latitude and longitude values
    var mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  
    // Get the <iframe> element and set the src attribute
    var mapIframe = document.getElementById("mapIframe");
    mapIframe.src = mapUrl;
 
  






  // Send a GET request to the API using the postal code
  fetch(`https://api.postalpincode.in/pincode/${postal}`)
    .then(response => response.json())
    .then(data => {
      // Handle the response from the API
      if (data && data[0].Status === "Success") {
        // Extract relevant data from the API response
        var postOfficeData = data[0].PostOffice[0];
        var postOfficeName = postOfficeData.Name;
        var branchType = postOfficeData.BranchType;
        var deliveryStatus = postOfficeData.DeliveryStatus;
        var district = postOfficeData.District;
        var division = postOfficeData.Division;


        var pinCodes = data[0].PostOffice;
        // Display the number of pin codes found
        var numberOfPinCodes = pinCodes.length;
        var message = `Number of pincode(s) found: ${numberOfPinCodes}`;
        $("#pincodeMessage").html("Number of pincode(s) found:"+message); // Update the HTML element with the message

        pinCodes.forEach(postOffice => {
          var template = `
              <div class="info-box">
                  <h2><span style="color: #B8BCCC;font-size:20px">Name:</span> ${postOffice.Name}</h2>
                  <p><span style="color: #B8BCCC;font-size:20px">Branch Type: </span> ${postOffice.BranchType}</p>
                  <p><span style="color: #B8BCCC;font-size:20px">Delivery Status: </span> ${postOffice.DeliveryStatus}</p>
                  <p><span style="color: #B8BCCC;font-size:20px">District: </span> ${postOffice.District}</p>
                  <p><span style="color: #B8BCCC;font-size:20px">Division: </span> ${postOffice.Division}</p>
              </div>
          `;

          // Append the template to the postOfficeContainer
          $("#postOfficeContainer").append(template);
      });



      //search logic

      // Event listener for search input changes
$("#searchInput").on("input", function() {
  var searchTerm = $(this).val();
  filterPostOffices(searchTerm);
});

// Function to filter post offices based on search input
function filterPostOffices(searchTerm) {
  // Convert search term to lowercase for case-insensitive search
  var lowerCaseSearch = searchTerm.toLowerCase();
  // Filter post offices based on name or branch office matching the search term
  var filteredPostOffices = pinCodes.filter(postOffice => 
      postOffice.Name.toLowerCase().includes(lowerCaseSearch) || 
      postOffice.BranchType.toLowerCase().includes(lowerCaseSearch)
  );
  // Clear the current content
  $("#postOfficeContainer").empty();
  // Display filtered post offices
  filteredPostOffices.forEach(postOffice => {
      var template = `
          <div class="info-box">
              <h2><span style="color: #B8BCCC;font-size:20px">Name:</span> ${postOffice.Name}</h2>
              <p><span style="color: #B8BCCC;font-size:20px">Branch Type: </span> ${postOffice.BranchType}</p>
              <p><span style="color: #B8BCCC;font-size:20px">Delivery Status: </span> ${postOffice.DeliveryStatus}</p>
              <p><span style="color: #B8BCCC;font-size:20px">District: </span> ${postOffice.District}</p>
              <p><span style="color: #B8BCCC;font-size:20px">Division: </span> ${postOffice.Division}</p>
          </div>
      `;
      $("#postOfficeContainer").append(template);
  });
}




      } else {
        // Handle API error or invalid response
        console.error("Error fetching post office data.");
      }
    })
    .catch(error => {
      // Handle fetch error
      console.error("Error fetching post office data:", error);
    });

});


// Initialize Google Map
// Google map asking to generate key using billing
// function initMap(latitude, longitude) {
//   // Your initMap code here
//   var mapOptions = {
//       center: { lat: latitude, lng: longitude },
//       zoom: 14,
//   };
//   var map = new google.maps.Map(document.getElementById("showmap"), mapOptions);

//   // Add a marker for the user's location
//   var marker = new google.maps.Marker({
//       position: { lat: latitude, lng: longitude },
//       map: map,
//       title: "User Location",
//   });
// }

 