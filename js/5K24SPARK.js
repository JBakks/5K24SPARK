// Developed by Josh Bakelaar

// Import JQuery
var script = document.createElement('script');
script.src = '//query-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

// Count, to be used for switching between pages without reloading the site
var count = 0;
// qrcode, to be used to hold our QRCode object from qrcode.js
var qrcode = new QRCode("qrcode");

// These are different tables which are to be attached to certain pages
var autoTable = document.getElementById("autotable");
var autoTableTwo = document.getElementById("autotable2");
var teleTable = document.getElementById("teletable");

// All minus buttons in the grid scoring section
const minusButtons = document.querySelectorAll('.minus');
// All plus buttons in the grid scoring section
const plusButtons = document.querySelectorAll('.plus');
// All number inputs in the grid scoring section
const numberInputs = document.querySelectorAll('input[class="scoreSpot"]');

// Add event listeners to the buttons
minusButtons.forEach((button, index) => {
    // When the user presses the - button beside a number input, subtract 1
    button.addEventListener('click', () => {
        // Users cant subtract past 0
        if (numberInputs[index].value > 0) {
        numberInputs[index].value--;
        }
    });
});

plusButtons.forEach((button, index) => {
    // When the user presses the + button beside a number input, add 1
    button.addEventListener('click', () => {
        numberInputs[index].value++;
    });
});

// Function used to go to the next section of the game
// This function is attached to the next button
function goNext() {
    // If on the last page and the next button didn't hide, return so they cant go to another page
    if(count == 4){
        return;
    }
    
    // This next chunk is to make sure required fields have been filled out, if they havent it shows an alert and doesn't go to the next page
    // Pre-Match page checks
    if(count == 0){
        // Get all data inputs on pre-match page
        var data = document.querySelectorAll("[id='pg0']");
        // Get the name input
        var name = document.getElementById("nameSelect");
        
        // Iterate through each data input and ensure they are filled out
        for(e of data){
            // If the data is blank or the name has not been changed
            if(e.value == "" || name.options[name.selectedIndex].text == "Select"){
                // Send alert
                alert("Please fill out required fields");
                // Return out of function.
                return;
            }
        }
    // Auto page checks
    }else if(count == 1){
        // Get the checkboxes
        var yesCheck = document.querySelector("[value='Yes']");
        var noCheck = document.querySelector("[value='No']");
        
        // Get each radio button
        var chargingDNE = document.querySelector("[value='DNE']");
        var chargingDE = document.querySelector("[value='DE']");
        var chargingNA = document.querySelector("[value='NA']");
        
        // If both checkboxes are NOT checked
        if(yesCheck.checked == false && noCheck.checked == false){
            // Send alert
            alert("Please fill out required fields");
            // Return out of function
            return;
        }
        // If all radio buttons are NOT checked
        if(chargingDNE.checked == false && chargingDE.checked == false && chargingNA.checked == false){
            // Send alert
            alert("Please fill out required fields");
            // Return out of function
            return;
        }
    // Tele page checks
    }else if(count == 2){
        // Get each radio button
        var pickupG = document.querySelector("[value='G']");
        var pickupSS = document.querySelector("[value='SS']");
        var pickupDS = document.querySelector("[value='DS']");
        
        // If all radio buttons are NOT checked
        if(pickupG.checked == false && pickupSS.checked == false && pickupDS.checked == false){
            // Send alert
            alert("Please fill out required fields");
            // Return out of function
            return;
        }
    // End-game page checks
    }else if(count == 3){
        // Get each radio button
        var chargingP = document.querySelector("[value='eP']");
        var chargingDNE = document.querySelector("[value='eDNE']");
        var chargingB = document.querySelector("[value='eDE']");
        var chargingNA = document.querySelector("[value='eNA']");

        // Get each checkbox
        var yesCheck = document.querySelector("[value='eYes']");
        var noCheck = document.querySelector("[value='eNo']");

        // If both checkboxes are not checked
        if(yesCheck.checked == false && noCheck.checked == false){
            // Send alert
            alert("Please fill out required fields");
            // Return out of function
            return;
        }

        // If all radio buttons are NOT checked
        if(chargingP.checked == false && chargingDNE.checked == false && chargingB.checked == false && chargingNA.checked == false){
            // Send alert
            alert("Please fill out required fields");
            // Return out of function
            return;
        }        
    }
    
    // This next section is to change the "page"
    // I use quotation marks because were not actually changing any page, just hiding tables so the user doesnt need to refresh

    // Get current page # that we are on
    var current = document.getElementById(count.toString());
    // Set current page to be invisible
    current.style.display = "none";
    // Increment the count, to go to the next page
    count += 1;
    // Get the next page by getting the element with id of value of count
    var next = document.getElementById(count.toString());
    // Display that page as table view so it displays in the middle
    next.style.display = "table";

    // Pre-Match
    if(count == 0){
        // Change Sub-header to be "Pre-Match"
        document.getElementById("Name").innerHTML = "Pre-Match";
    // Auto
    }else if(count == 1){
        // Display additional auto tables
        autoTable.style.display = "table";
        autoTableTwo.style.display = "table";

        // Change sub-header to be "Auto"
        document.getElementById("Name").innerHTML = "Auto";
        // Display Previous button so you can go back a page
        document.getElementById("Previous").style.display = "inline";
    // Tele
    }else if(count == 2){
        // Hide auto tables used
        autoTable.style.display = "none";
        autoTableTwo.style.display = "none";

        // Display additional tele table
        teleTable.style.display = "table";
        // Display main tele table
        document.getElementById("Name").innerHTML = "Tele-Op";
    // End Game
    }else if(count == 3){
        // Hide tele tables
        teleTable.style.display = "none";

        // Change sub-header to be "End Game"
        document.getElementById("Name").innerHTML = "End Game";
    // QR Code
    }else if(count == 4){
        // Change sub-header to be "QR Code"
        document.getElementById("Name").innerHTML = "QR Code";
        // Hide the Next button because were on the last page
        document.getElementById("Next").style.display = "none";
        // Display QR Code in the middle using table
        document.getElementById("qrcode").style.display = "table";
        // Call generateCode() which makes the QR Code
        generateCode();
        // Display the New Match button
        document.getElementById("newMatch").style.display = "block";
    }
}

// Function which handles going to the previous page
// This function is called by clicking the previous button
function goPrevious() {

    // If the previous button didn't get hidden for some reason, dont allow the user to go previous again
    if(count == 0){
        return;
    }
    
    // Get the current page # we are on
    var current = document.getElementById(count.toString());
    // Set the table with the id # to be invisible
    current.style.display = "none";
    // Decrement count to get the page before
    count -= 1;
    // Get the previous page by using count
    var previous = document.getElementById(count.toString());
    // Display the page at cound
    previous.style.display = "table";
    
    // Prematch page
    if(count == 0){
        // Set the sub-header to be "Pre-Match"
        document.getElementById("Name").innerHTML = "Pre-Match";
        // Hide the previous button
        document.getElementById("Previous").style.display = "none";

        // Hide the additional tables needed for auto
        autoTable.style.display = "none";
        autoTableTwo.style.display = "none";
    // Auto Page
    }else if(count == 1){
        // Set the sub-header to be "Auto"
        document.getElementById("Name").innerHTML = "Auto";

        // Show the additional tables used for auto
        autoTable.style.display = "table";
        autoTableTwo.style.display = "table";

        // Hide the additional table for tele
        teleTable.style.display = "none";
    // Tele page
    }else if(count == 2){
        // Set the sub-header to be "Tele-Op"
        document.getElementById("Name").innerHTML = "Tele-Op";
        
        // Show the additional tables used for tele
        teleTable.style.display = "table";
    // End Game page
    }else if(count == 3){
        // Set the sub-header to be "End Game"
        document.getElementById("Name").innerHTML = "End Game";
        // Display the next button
        document.getElementById("Next").style.display = "inline";
        // Hide the QR Code
        document.getElementById("qrcode").style.display = "none";
        // Hide the New Match button
        document.getElementById("newMatch").style.display = "none";
    // QR Code Page
    }else if(count == 4){
        // Set the sub-header to be "QR Code"
        document.getElementById("Name").innerHTML = "QR Code";
    }
}

// This function handles the creation of a new match
function newMatch(){
    
    // Get the users name from the name field
    var e = document.getElementById("nameSelect");
    var name = e.options[e.selectedIndex].text;

    // Reset all fields
    document.getElementById("myForm").reset();

    // Set the name as the name used previously for convenience
    $('#nameSelect').val(name);
    $('#nameSelect').trigger('change');

    $('#teamSelect').val('Select'); // Select the option with a value of '1'
    $('#teamSelect').trigger('change'); // Notify any JS components that the value changed

    // Change back to pre-match screen
    document.getElementById("Name").innerHTML = "Pre-Match";
    document.getElementById(0).style.display = "table";
    
    // Hide QR code screen
    document.getElementById(4).style.display = "none";
    
    // Hide Clear, Previous, and QRCODE
    document.getElementById("newMatch").style.display = "none";
    document.getElementById("Previous").style.display = "none";
    document.getElementById("qrcode").style.display = "none";
    
    // Display Next Button
    document.getElementById("Next").style.display = "inline";
    
    // Reset count to 0 to ensure goNext() still works
    count = 0;
}

// This function is used to generate the QR Code once the user has completed the form
function generateCode(){
    // Get the data on all pages
    var data = document.querySelectorAll("[id^='pg']");
    // Get the users name
    var e = document.getElementById("nameSelect");
    // Create a string and start it with the users name eg "Josh,"
    var str = e.options[e.selectedIndex].text + ",";
    var e = document.getElementById("teamSelect");
    // Create a string and start it with the users name eg "Josh,"
    var str = e.options[e.selectedIndex].text + ",";
    
    // Iterate through all of the data
    for(e of data){        
        // This section handles what the value will be if the data is a radio button
        if(e.type == "radio"){
            // Only look at checked radio buttons
            if(e.checked){
                // If the radio button has the value yes, add yes to the string
                if(e.value == "Yes"){
                    str = str + "Yes,";
                // If the radio button has the value no, add no to the string
                }else if(e.value == "No"){
                    str = str + "No,";
                // If the radio button for Docked(Not Level), Single Substation, or endgame Parked is checked add 1 to the string
                }else if(e.value == "DNE" || e.value == "SS" || e.value == "eP"){
                    str = str + "1,";
                // If the radio button for Docked(Level), Double Substation, or endgame Docked(Not Level) is checked add 2 to the string
                }else if(e.value == "DE" || e.value == "DS" || e.value == "eDNE"){
                    str = str + "2,";
                // If the radio button for Not Attempted, Ground, or endgame Not Attempted is checked add 0 to the string
                }else if(e.value == "NA" || e.value == "G" || e.value == "eNA"){
                    str = str + "0,";
                // If the radio button for endgame Docked Engaged is checked add 3 to the string
                }else if(e.value == "eDE"){
                    str = str+ "3,";
                }
            }
            // If not checked continue to next iteration
            continue;
        }
        // If the data type is a checkbox
        if(e.type == "checkbox"){
            // If the checkbox is checked
            if(e.checked){
                // If Yes or eYes(for endgame check) is checked add yes to the string
                if(e.value == "Yes" || e.value == "eYes"){
                    str = str + "Yes,";
                // If No or eNo(for endgame check) is checked add no to the string
                }else if(e.value == "No" || e.value == "eNo"){
                    str = str + "No,";
                }
            }
            // If not checked then continue to next iteration
            continue;
        }
        
        // Append the data at the field to the string
        str = str + e.value + ",";
    }
    
    qrcode.makeCode(str);
}

// Used to populate the select 2 list for name selection
$(document).ready(function() {
    // Path to where your name file is located
    $.get("2023/names.txt", function(data) {
        // Populates options by each line
        var options = data.split("\n");
        // For each line, iterate and append the needed tags
        for (var i = 0; i < options.length; i++) {
            $("#nameSelect").append("<option value='" + options[i] + "'>" + options[i] + "</option>");
        }
        // Update nameSelect
        $("#nameSelect").select2();
    });
});

// Used to populate the select 2 list for team selection
$(document).ready(function() {
    $.get("2023/windsorTeams.txt", function(data) {
        var options = data.split("\n");
        for (var i = 0; i < options.length; i++) {
            $("#teamSelect").append("<option value='" + options[i] + "'>" + options[i] + "</option>");
        }
        $("#teamSelect").select2();
    });
});
  

// On document launch (JQuery)
$(document).ready(function(){
    // Make it so only 1 check box can be checked at a time
    // This handles the first set of check boxes in auto
    $('.checkoption').click(function() {
     $('.checkoption').not(this).prop('checked', false);
    });
    // This handles the second set of check boxes in endgame
    $('.checkoption2').click(function() {
        $('.checkoption2').not(this).prop('checked', false);
    });
    // This is to set the select as a select2.js
    $('.nameSelect').select2(); 
    $('.teamSelect').select2(); 

});


