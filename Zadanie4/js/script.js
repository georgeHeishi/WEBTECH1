

document.getElementById("x").addEventListener("input", function () {validateNumber("x")});
document.getElementById("y").addEventListener("input", function () {validateNumber("y")});
//Zobraz alert pri zlom vstupe premennej
function showAlert(id) {
    document.getElementById(id).style.borderColor = "red";
    document.getElementById(id + "Alert").style.display = 'block';
}
//Skry alert pri zlom vstupe premennej
function hideAlert(id) {
    document.getElementById(id).style.borderColor = "green";
    document.getElementById(id + "Alert").style.display = 'none';
}

//Skontroluje vstup premenných X a Y
function validateNumber(id){
    var number = document.getElementById(id).value;
    if(number == null || number.trim() === ""){
        showAlert(id );
        return false;
    } else if(number < 1 || number > 9){
        showAlert(id );
        return false;
    }else{
        hideAlert(id );
        return true;
    }
}
document.getElementById("submit").addEventListener("click",function() { validateInputNumbers() });
//validacia pri kliknuti na "Zobraziť tabuľku"
function validateInputNumbers() {
    var x = validateNumber("x");
    var y = validateNumber("y");

    if (x && y) {
        var xValue = document.getElementById("x").value;
        var yValue = document.getElementById("y").value;
        var resultTable = document.getElementById("table-section");
        if(resultTable != null){
            resultTable.remove();
        }
        createTable(xValue, yValue);
        openModal();
    }
}

function createTable( x, y){
    var divTab = document.createElement("div");
    divTab.setAttribute("id", "table-section");

    var table = document.createElement("table");
    table.setAttribute("class", "table table-bordered");

    var i;
    for (i = 0; i <= y; i++) {
        var row = document.createElement("tr");
        var j;
        for (j = 0; j <= x; j++) {
            var column;
            if((i === 0) && (j === 0)){
                column = document.createElement("th");
                column.appendChild((document.createTextNode('\xa0')))
            }
            else if(i === 0){
                column = document.createElement("th");
                column.setAttribute("scope", "col");
                column.appendChild(document.createTextNode('X = ' + j ));
            }
            else if(j === 0){
                column = document.createElement("th");
                column.setAttribute("scope", "row");
                column.appendChild(document.createTextNode('Y = ' + i ));
            }
            else{
                column = document.createElement("td");
                var result = i * j;
                column.appendChild(document.createTextNode(String(result)));
            }
            row.appendChild(column);
        }
       table.appendChild(row);
    }
    divTab.appendChild(table);
    var existingModal = document.getElementById("modal-body-id");
    existingModal.appendChild(divTab);
}

document.getElementById("closeButton1").addEventListener("click", function() { closeModal() });
document.getElementById("closeButton2").addEventListener("click", function() { closeModal() });
//Otvorenie okna pred strankou
function openModal() {
    document.getElementById("backdrop").style.display = "block"
    document.getElementById("resultsModal").style.display = "block"
    document.getElementById("resultsModal").className += "show"
}
//Zatvorenie okna pred strankou
function closeModal() {
    document.getElementById("backdrop").style.display = "none"
    document.getElementById("resultsModal").style.display = "none"
    document.getElementById("resultsModal").className += document.getElementById("resultsModal").className.replace("show", "")
}
//Listener pre

var modal = document.getElementById('resultsModal');
//Ak uzivatel klikne vonku z okna zavrie sa
window.addEventListener("click", function (event) {
    if (event.target == modal) {
        closeModal()
    }
});
