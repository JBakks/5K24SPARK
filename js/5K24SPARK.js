var script = document.createElement('script');
script.src = '//query-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var count = 0;
var qrcode = new QRCode("qrcode");
var allowNext = true;
var requiredCount = 0;

var autoTable = document.getElementById("autotable");
var autoTableTwo = document.getElementById("autotable2");
var teleTable = document.getElementById("teletable");

const minusButtons = document.querySelectorAll('.minus');
const plusButtons = document.querySelectorAll('.plus');
const numberInputs = document.querySelectorAll('input[type="number"]');

// Add event listeners to the buttons
minusButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (numberInputs[index].value > 0) {
      numberInputs[index].value--;
    }
  });
});

plusButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    numberInputs[index].value++;
  });
});

//Function used to go to the next section of the game
function goNext() {
    if(count == 4){
        return;
    }
    
    // if(count == 0){
    //     var data = document.querySelectorAll("[id='pg0']");
    //     for(e of data){
    //         if(e.value == "" || e.value == "default"){
    //             alert("Please fill out required fields");
    //             return;
    //         }
    //     }
    // }else if(count == 1){
    //     var yesCheck = document.querySelector("[value='Yes']");
    //     var noCheck = document.querySelector("[value='No']");
    //     var chargingDNE = document.querySelector("[value='DNE']");
    //     var chargingDE = document.querySelector("[value='DE']");
    //     var chargingNA = document.querySelector("[value='NA']");
        
        
    //     if(yesCheck.checked == false && noCheck.checked == false){
    //         alert("Please fill out required fields");
    //         return;
    //     }
    //     if(chargingDNE.checked == false && chargingDE.checked == false && chargingNA.checked == false){
    //         alert("Please fill out required fields");
    //         return;
    //     }
    // }else if(count == 2){
    //     var pickupG = document.querySelector("[value='G']");
    //     var pickupSS = document.querySelector("[value='SS']");
    //     var pickupDS = document.querySelector("[value='DS']");
        
        
    //     if(pickupG.checked == false && pickupSS.checked == false && pickupDS.checked == false){
    //         alert("Please fill out required fields");
    //         return;
    //     }
    // }else if(count == 3){
    //     var chargingP = document.querySelector("[value='eP']");
    //     var chargingDNE = document.querySelector("[value='eDNE']");
    //     var chargingB = document.querySelector("[value='eDE']");
    //     var chargingNA = document.querySelector("[value='eNA']");
    
    //     if(chargingP.checked == false && chargingDNE.checked == false && chargingB.checked == false && chargingNA.checked == false){
    //         alert("Please fill out required fields");
    //         return;
    //     }
        
    // }
    
    if(allowNext == true){
        var current = document.getElementById(count.toString());
        current.style.display = "none";
        count += 1;
        var next = document.getElementById(count.toString());
        next.style.display = "table";

        if(count == 0){
            document.getElementById("Name").innerHTML = "Pre-Match";
        }else if(count == 1){
            autoTable.style.display = "table";
            autoTableTwo.style.display = "table";
            document.getElementById("Name").innerHTML = "Auto";
            document.getElementById("Previous").style.display = "inline";
        }else if(count == 2){
            autoTable.style.display = "none";
            autoTableTwo.style.display = "none";
            teleTable.style.display = "block";
            document.getElementById("Name").innerHTML = "Tele-Op";
        }else if(count == 3){
            teleTable.style.display = "none";
            document.getElementById("Name").innerHTML = "End Game";
        }else if(count == 4){
            document.getElementById("Name").innerHTML = "QR Code";
            document.getElementById("Next").style.display = "none";
            document.getElementById("qrcode").style.display = "inline";
            generateCode();
            document.getElementById("newMatch").style.display = "block";
        }
    }
}

function goPrevious() {
    if(count == 0){
        return;
    }
    var current = document.getElementById(count.toString());
    current.style.display = "none";
    count -= 1;
    var previous = document.getElementById(count.toString());
    previous.style.display = "";
    
    if(count == 0){
        document.getElementById("Name").innerHTML = "Pre-Match";
        document.getElementById("Previous").style.display = "none";
        autoTable.style.display = "none";
        autoTableTwo.style.display = "none";
    }else if(count == 1){
        document.getElementById("Name").innerHTML = "Auto";
        autoTable.style.display = "block";
        autoTableTwo.style.display = "block";
        teleTable.style.display = "none";
    }else if(count == 2){
        document.getElementById("Name").innerHTML = "Tele-Op";
        teleTable.style.display = "block";
    }else if(count == 3){
        document.getElementById("Name").innerHTML = "End Game";
        document.getElementById("Next").style.display = "inline";
        document.getElementById("qrcode").style.display = "none";
        document.getElementById("newMatch").style.display = "none";
    }else if(count == 4){
        document.getElementById("Name").innerHTML = "QR Code";
    }
}

function newMatch(){
    // Reset all inputs
    document.getElementById("myForm").reset();
    
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

function generateCode(){
    var data = document.querySelectorAll("[id^='pg']");
    var str = "";
 
    for(e of data){        
        if(e.type == "radio"){
            if(e.checked){
                if(e.value == "Yes"){
                    str = str + "Yes,";
                }else if(e.value == "No"){
                    str = str + "No,";
                }else if(e.value == "DNE" || e.value == "SS" || e.value == "eP"){
                    str = str + "1,";
                }else if(e.value == "DE" || e.value == "DS" || e.value == "eDNE"){
                    str = str + "2,";
                }else if(e.value == "NA" || e.value == "G" || e.value == "eNA"){
                    str = str + "0,";
                }else if(e.value == "eDE"){
                    str = str+ "3,";
                }
            }
            continue;
        }
        if(e.type == "checkbox"){
            if(e.checked){
                if(e.value == "Yes"){
                    str = str + "Yes,";
                }else if(e.value == "No"){
                    str = str + "No,";
                }
            }else if(e.id == "pg3"){
                    str = str + "No,";
                }
            continue;
        }
        
        str = str + e.value + ",";
    }
    
    qrcode.makeCode(str);
}

$(document).ready(function(){
    $('.checkoption').click(function() {
     $('.checkoption').not(this).prop('checked', false);
    });
});

