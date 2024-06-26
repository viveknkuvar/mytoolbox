var i, tabcontent, tablinks;
tabcontent = document.getElementsByClassName("tabcontent");

function openTab(evt, tabName) {
    $(".tabcontent").css("display", "none");
    $(".tablinks").removeClass("active");
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function buildDate() {
    var d = new Date().toString();
    var index = d.lastIndexOf(':') + 3;

    var now = new Date();
    var UTC = new Date(now.toUTCString().slice(0, -4)).toString();
    $('#timetableUTC').text(UTC.substring(0, index));

    var IST = new Date(UTC); // Clone date
    IST.setHours(IST.getHours() + 5); // set IST to be 5 hours later
    IST.setMinutes(IST.getMinutes() + 30); // set IST to be 30 minutes later
    IST = IST.toString();
    $('#timetableIST').text(IST.substring(0, index));

    var EST = new Date(UTC); // Clone date
    EST.setHours(EST.getHours() - 5); // set EST to be 5 hour earlier
    EST = EST.toString();
    $('#timetableEST').text(EST.substring(0, index));

    var EDT = new Date(UTC); // Clone date
    EDT.setHours(EDT.getHours() - 4); // set EDT to be 4 hour earlier
    EDT = EDT.toString();
    $('#timetableEDT').text(EDT.substring(0, index));
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

$(document).ready(function () {
    buildDate();
    setInterval("buildDate()", 1000);
    document.body.style.zoom = "80%";
});


window.onload = function () {
    var test = document.querySelector('#navbar a.tracktabslabel:first-child');
    // console.log(test)
    changeTrack(0);
};


function changeTrack(index) {
    var tabs = document.querySelectorAll('.tracktabs .trackcontent');
    var labels = document.querySelectorAll('#navbar a.tracktabslabel');

    tabs.forEach(tab => tab.style.display = 'none');
    labels.forEach(label => label.classList.remove('active'));
    tabs[index].style.display = 'flex';
    labels[index].classList.add('active');

    // Get the first tab button in the current track
    var firstTabButton = tabs[index].querySelector('.tab button');

    // Extract the tab name from the onclick attribute
    var firstTabName = firstTabButton.getAttribute('onclick').split("'")[1];

    // Trigger a click event on the first tab button
    firstTabButton.click();

    // Highlight the first tab button in the left nav
    labels.forEach(label => {
        if (label.getAttribute('href') === '#' + firstTabName) {
            label.classList.add('active');
        }
    });
}

//toggle function
document.addEventListener("DOMContentLoaded", function () {
    var toggler = document.getElementsByClassName("caret");
    var i;

    for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function () {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
    }
});

// // Function to display alert message
// function showAlert(event) {
//     var serverName = event.target.innerText;
//     // Remove the part after hyphen
//     serverName = serverName.split('-')[0].trim();
//     alert("Connecting to "+ serverName);
// }

// // Function to attach event listeners to server links
// document.addEventListener('DOMContentLoaded', function () {
//     var serverLinks = document.querySelectorAll('#myUL a');
//     serverLinks.forEach(function (link) {
//         link.addEventListener('click', showAlert);
//     });
// });

// function startRdpSession(event, serverName) {
//     event.preventDefault();
  
//     // Show the loading indicator
//     const loadingIndicator = document.getElementById('loading-indicator');
//     loadingIndicator.style.display = 'flex';
  
//     fetch('/start-rdp', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ serverName })
//     })
//     .then(response => response.text())
//     .then(data => {
//       console.log(data); // Log the server response to the console
//       // Hide the loading indicator
//       loadingIndicator.style.display = 'none';
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       // Hide the loading indicator
//       loadingIndicator.style.display = 'none';
//     });
//   }

function startRdpSession(event, serverName) {
    event.preventDefault();
  
    // Show the loading indicator
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'flex';
  
    // Construct the RDP URL using the ms-rdp protocol
    const rdpUrl = `ms-rdp://${serverName}`;
  
    // Open the RDP URL in a new window or tab
    window.open(rdpUrl, '_blank');
  
    // Hide the loading indicator
    loadingIndicator.style.display = 'none';
	//hello
  }