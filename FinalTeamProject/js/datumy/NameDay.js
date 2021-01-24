const template = document.createElement("template");
template.innerHTML = `
<div>
    <div class="displayFlex">
        <div >
            <span id="schevron" class="chevron bottom"></span>
        </div>
        <div class="margin-left">
            <div id="nameDay">Actual NameDay</div>
        </div>
    </div>

    <div id="table" class="border-table">
        <div class="form-group margin-left" >
            <label for="dateInput"></label>
            <input type="text" id="dateInput" class="form-control col-8"  name="customDate" placeholder="Date">
            <small id="invalidDate">Wrong date DD.MM</small>
        </div>

        <div class="form-group" >
            <label for="nameInput"></label>
            <input type="text" id="nameInput" class="form-control col-8" name="customName" placeholder="Name">
            <small id="invalidName">Wrong name</small>
        </div>
        <div class="output-margins">
            <p id ='nameOutput' class="col-12">output Name</p>
            <p id="dateOutput" class="col-12">output Day</p>
        </div>
    </div>

    <style>

        @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css');
        *{
            margin: 0;
            padding: 0;
        }
        
        #nameOutput{
            max-width: 175px;
        }
        #dateOutput{
            max-width: 175px;
        }
        
        #table{
            visibility: hidden;
        }
        .chevron::before {
            border-style: solid;
            border-width: 0.25em 0.25em 0 0;
            content: '';
            display: inline-block;
            height: 0.9em;
            left: 0.15em;
            position: relative;
            top: 0.15em;
            transform: rotate(-45deg);
            vertical-align: top;
            width: 0.9em;
        }

        .chevron.bottom:before {
            top: 0;
            transform: rotate(135deg);
        }
        
        .displayFlex{
            display: inline-flex;
        }
        .output-margins{
            margin-right:20px;
            margin-top: 10px
        }

        .border-table{
            display: flex;
            border: black 1px solid;
            width: max-content;
            border-radius: 5px
        }

        .margin-left{
            margin-left:20px
        }

        #invalidDate,#invalidName{
            color: #c11c1c;
            visibility: hidden;
          

        }
    </style>

</div>`;




class NameDay extends HTMLElement{
    constructor() {
        super(); // we need call constructor of extended classes
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true))

    }

    connectedCallback() {
        let actualName  = this.shadowRoot.getElementById('nameDay');
        let dateOutput  = this.shadowRoot.getElementById('dateOutput');
        let nameOutput  = this.shadowRoot.getElementById('nameOutput');
        let dateInput   = this.shadowRoot.getElementById('dateInput');
        let nameInput   = this.shadowRoot.getElementById('nameInput');
        let invalidDate = this.shadowRoot.getElementById('invalidDate');
        let invalidName = this.shadowRoot.getElementById('invalidName');
        let schevron    = this.shadowRoot.getElementById('schevron');
        let table       = this.shadowRoot.getElementById('table');
        let table_lock = false;

        fetch("resources/meniny.xml").then(function (response) {
            return response.text();
        }).then(function (data) {
            let xml = new DOMParser().parseFromString(data, "text/xml");
            let actualDate = new Date()
            let actualDay = actualDate.getDate();
            let actualMouth = actualDate.getMonth() + 1;
            let actualYear = actualDate.getFullYear();

            actualDay = addZeroToDate(actualDay)
            actualMouth = addZeroToDate(actualMouth)
            let array = toArray(xml)

            array.forEach(function (item,index){
                if(item.firstChild.nextElementSibling.innerHTML === actualMouth + actualDay){
                    actualName.innerHTML = actualDay + "."
                        + actualMouth + "."
                        + actualYear + " "
                        + item.firstChild.nextElementSibling.nextElementSibling.innerHTML;
                }
            });

            schevron.addEventListener('click',function (){
                if(table_lock === false) {
                    invalidDate.style.visibility = "hidden"
                    invalidName.style.visibility="hidden"
                    table.style.visibility = "visible";
                    table_lock = true;
                }else{
                    invalidDate.style.visibility = "hidden"
                    invalidName.style.visibility="hidden"
                    table.style.visibility = "hidden";
                    table_lock = false;
                }
            });

            dateInput.addEventListener('change',function (){
                nameInput.value = "";
                let regex = /\d{1,2}[.]\d{1,2}[.]/;  //napicu regex
               if(regexContorl(this, regex)){
                   invalidDate.style.visibility="hidden";

                   let nameInXmlFile = null;
                   let dateFromInput = this.value.split(".");
                   let dateForOutput = dateFromInput
                   dateFromInput = parseDate(dateFromInput);

                   array.forEach(function (item,index){
                       if(item.firstChild.nextElementSibling.innerHTML === dateFromInput){
                           nameInXmlFile = item.firstChild.nextElementSibling.nextElementSibling.innerHTML;

                           nameOutput.innerHTML =
                                item.firstChild.nextElementSibling.nextElementSibling.innerHTML;

                           dateOutput.innerHTML = dateForOutput[0] + "."
                             + dateForOutput[1] + "."
                             + actualYear
                       }
                   });

                   if(nameInXmlFile === null){
                       invalidDate.style.visibility="visible";
                       dateOutput.innerHTML = "output Dat";
                       nameOutput.innerHTML = "output Name"
                   }
               }else{
                   invalidDate.style.visibility="visible";
                   dateOutput.innerHTML = "output Day";
                   nameOutput.innerHTML = "output Name"
               }

            });

            nameInput.addEventListener("change",function (){
                dateInput.value = "";
               let regex;  //sem treba nejaky regex
               if(/*regexContorl(this,regex )*/ true){
                   let nameFromInput = this.value;
                   let alternativeRegex = null;
                   nameFromInput = this.value[0].toUpperCase() + this.value.slice(1);
                   array.forEach(function (item,index){

                       let oneNameDay = String(removeAccents(item.firstChild.nextElementSibling.nextElementSibling.innerHTML));
                       let moreThenOneName = String(removeAccents(item.firstChild.nextElementSibling.nextElementSibling.innerHTML)).split(",")
                       console.log(oneNameDay)

                       if( oneNameDay === removeAccents(nameFromInput) ){
                           let str = String(item.firstChild.nextElementSibling.innerHTML);
                           dateOutput.innerHTML = str[2] + str[3] + "." + str[0] + str[1] + "." + "2021"
                           nameOutput.innerHTML = item.firstChild.nextElementSibling.nextElementSibling.innerHTML;
                           alternativeRegex = item.firstChild.nextElementSibling.nextElementSibling.innerHTML;
                           return
                       }
                        if(moreThenOneName[0] === removeAccents(nameFromInput)){
                            let str = String(item.firstChild.nextElementSibling.innerHTML);
                            dateOutput.innerHTML = str[2] + str[3] + "." + str[0] + str[1] + "." + "2021"
                            nameOutput.innerHTML = item.firstChild.nextElementSibling.nextElementSibling.innerHTML;
                            alternativeRegex = item.firstChild.nextElementSibling.nextElementSibling.innerHTML;
                            return
                        }
                        if(moreThenOneName[1] === " "+removeAccents(nameFromInput)){
                            let str = String(item.firstChild.nextElementSibling.innerHTML);
                            dateOutput.innerHTML = str[2] + str[3] + "." + str[0] + str[1] + "." + "2021"
                            nameOutput.innerHTML = item.firstChild.nextElementSibling.nextElementSibling.innerHTML;
                            alternativeRegex = item.firstChild.nextElementSibling.nextElementSibling.innerHTML;
                            return
                        }

                        if(alternativeRegex === null){
                            invalidName.style.visibility="visible";
                        }else{
                            invalidName.style.visibility="hidden"
                        }

                   });

               }else {
                   invalidName.style.visibility="visible";
               }

            })
        });

    }
}
window.customElements.define("name-day", NameDay);

function toArray(xml){
    let array = []

    for(let i = 0; i < xml.getElementsByTagName("zaznam").length; i++){
        array[i] = xml.getElementsByTagName("zaznam")[i]
    }

    return array;
}

function addZeroToDate(date){
    if(date< 10){
        date = "0"+date;
    }
    return date;
}

function regexContorl(input ,regex){
    return regex.test(input.value);
}


function parseDate(value){
    let tmp = [];
    if(value[0].length <2){
        tmp[0] = "0" + value[0];
    }else{
        tmp[0] = value[0];
    }
    if(value[1].length < 2){
        tmp[1] = "0" + value[1];
    }else{
        tmp[1] = value[1];
    }
    return tmp[1] + tmp[0];
}

//https://gist.github.com/alisterlf/3490957
function removeAccents(strAccents) {
    strAccents = strAccents.split('');
    let strAccentsOut = new Array();
    let strAccentsLen = strAccents.length;
    let accents = 'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøĎďDŽdžÈÉÊËèéêëðÇçČčÐÌÍÎÏìíîïÙÚÛÜùúûüĽĹľĺÑŇňñŔŕŠšŤťŸÝÿýŽž';
    let accentsOut = "AAAAAAaaaaaasOOOOOOOooooooDdDZdzEEEEeeeeeCcCcDIIIIiiiiUUUUuuuuLLllNNnnRrSsTtYYyyZz";
    for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
        } else
            strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
}




