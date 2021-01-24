
const notebook = document.getElementById('notebookRadio');
const pc = document.getElementById('pcRadio');
notebook.onchange = function () {
    document.getElementById("preferenceBattery").style.display = 'block';
    document.getElementById("notebookSelect").style.display = 'block';
    document.getElementById("componentsArea").style.display = 'none';
    document.getElementById("battery").checked = false;
};
pc.onchange = function () {
    document.getElementById("preferenceBattery").style.display = 'none';
    document.getElementById("notebookSelect").style.display = 'none';
    document.getElementById("componentsArea").style.display = 'block';
    document.getElementById("battery").checked = false;
};

const otherItem = document.getElementById('other');
otherItem.onchange = function () {
    if (otherItem.checked) {
        document.getElementById("preferenceOther").style.display = 'block';
        document.getElementById('otherText').value = ''
    } else {
        document.getElementById("preferenceOther").style.display = 'none';
        document.getElementById('otherText').value = ''
    }
}

//validacie mien
document.getElementById("name").onchange = function () {
    validateName("name")
};
document.getElementById("surname").onchange = function () {
    validateName("surname")
};

function showAlert(id) {
    document.getElementById(id).style.borderColor = "red";
    document.getElementById(id + "Alert").style.display = 'block';
}

function hideAlert(id) {
    document.getElementById(id).style.borderColor = "green";
    document.getElementById(id + "Alert").style.display = 'none';
}

function validateName(id) {
    const value = document.getElementById(id).value.trim();
    if (value == null || value.length < 3) {
        showAlert(id);
        return false;
    } else {
        hideAlert(id);
        return true;
    }
}

//validacia emailu
document.getElementById("email").onchange = function () {
    validateEmail("email")
};

function validateEmail(id) {
    const value = document.getElementById(id).value.trim();
    const atIndex = value.indexOf("@");
    const dotIndex = value.lastIndexOf(".");
    if (atIndex < 3 || dotIndex + 2 >= value.length || dotIndex <= atIndex + 1 || value.length - dotIndex > 5) {
        showAlert(id);
        return false;
    } else {
        hideAlert(id);
        return true;
    }
}

//validacia datumu narodenia
document.getElementById("age").onchange = function () {
    validateBirthdateAge("age")
}

function getAge(birthdate) {
    var timeDiff = Date.now() - birthdate.getTime();
    var diffDate = new Date(timeDiff);

    return Math.abs(diffDate.getFullYear() - 1970);
}

function validateBirthdateAge(id) {
    var age = document.getElementById(id).value;
    if(age.trim() === ""){
        document.getElementById("birthdate").style.borderColor = "#ced4da";
        document.getElementById("age").style.borderColor = "#ced4da";
        document.getElementById( "ageAlert").style.display = 'none';
        return true;
    }
    var birthdate = new Date(document.getElementById("birthdate").value);
    var ageDif = Math.abs(age - getAge(birthdate));
    if (ageDif > 0) {
        document.getElementById("birthdate").style.borderColor = "red";
        showAlert(id);
        return false;
    } else {
        document.getElementById("birthdate").style.borderColor = "green";
        hideAlert(id);
        return true;
    }
}
document.getElementById("birthdate").onchange = function () {
    validateBirthday("birthdate")
}
function validateBirthday(id) {
    var birthdate = document.getElementById(id).value;
    if (birthdate == null || birthdate.trim() === "") {
        showAlert(id);
        return false;
    }
    var date = new Date(birthdate);
    if(date.getFullYear() < 1800){
        document.getElementById("birthdate").style.borderColor = "red";
        document.getElementById("birthdateAlertYear").style.display = "block";
        return false;
    }
    hideAlert(id);
    document.getElementById("birthdateAlertYear").style.display = "none";
    return true;
}
//validacia onsubmit
function validateForm() {
    var email = validateEmail("email");
    var name = validateName("name");
    var surname = validateName("surname");
    var birthdate = validateBirthday("birthdate");
    if (email && name && surname && birthdate) {
        return true;
    } else {
        const form = document.getElementById("myForm");

        function handleForm(event) {
            event.preventDefault();
        }

        return false;
    }
}

//3 comboboxy
var selectNotebookNames = document.getElementById('notebookName');
var selectNotebookTypes = document.getElementById("notebookType");
var selectNotebookModels =document.getElementById("notebookModel");

var typesArr = new Array()
typesArr["Acer"]=["Aspire", "Nitro",  "Predator"]
typesArr["Asus"]=["ROG", "VivoBook", "Zenbook"]
typesArr["HP"]=["Omen", "Pavilion", "ProBook"]
typesArr["Lenovo"] = ["Chromebook", "Ideapad", "Legion" ,"ThinkPad", "Yoga"]
typesArr["Acer"].forEach(function(item){ selectNotebookTypes.options[selectNotebookTypes.options.length]= new Option(item); });

var modelsArr = new Array()
modelsArr["Aspire"] = ["1", "3", "5", "7"]
modelsArr["Nitro"] = ["5", "7"]
modelsArr["Predator"] = ["Helios", "Triton"]
modelsArr["ROG"] = ["Strix", "Zephyrus"]
modelsArr["VivoBook"] = ["13", "14", "15", "17", "S", "Flip"]
modelsArr["Zenbook"] = ["13", "14", "15", "Pro", "S", "Flip", "Duo"]
modelsArr["Omen"] = ["15", "17"]
modelsArr["Pavilion"] = ["13", "14", "15", "Gaming", "Power"]
modelsArr["ProBook"] = ["440","445", "450", "455", "x360"]
modelsArr["Chromebook"] = ["14e", "C340", "S340"]
modelsArr["Ideapad"] = ["Rad 100", "Rad 300", "Rad 500", "Rad 700", "Rad C", "Rad L", "Rad S"]
modelsArr["Legion"] = ["Y540" , "Y545", "Y740"]
modelsArr["ThinkPad"] = ["ThinkBook", "Rad P", "Rad T", "Rad X", "Rad X1"]
modelsArr["Aspire"].forEach(function(item){ selectNotebookModels.options[selectNotebookModels.options.length]= new Option(item); });

selectNotebookNames.onchange = function () {changeTypes()};
function changeTypes(){
    var types_arr = typesArr[selectNotebookNames.value];
    selectNotebookTypes.options.length=0
    types_arr.forEach(function(item){ selectNotebookTypes.options[selectNotebookTypes.options.length]= new Option(item); });
    changeModels();
}

selectNotebookTypes.onchange = function () {changeModels()};
function changeModels(){
    var models_arr = modelsArr[selectNotebookTypes.value];
    selectNotebookModels.options.length=0
    models_arr.forEach(function(item){ selectNotebookModels.options[selectNotebookModels.options.length]= new Option(item); });
}
