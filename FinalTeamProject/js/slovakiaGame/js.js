let seconds = 0;
let minutes = 0;
let hours   = 0;

let displaySeconds = 0;
let displayMinutes = 0;
let displayHours   = 0;

let interval = null;

function stopWatch(){
    seconds++;
    if(seconds / 60 ===1){
        seconds = 0;
        minutes++;

        if(minutes / 60 ===1){
            minutes = 0;
            hours++;
        }
    }
    if(seconds < 10){
        displaySeconds = "0"+seconds;
    }else{
        displaySeconds = seconds
    }
    if(minutes < 10){
        displayMinutes = "0"+ minutes;
    }else{
        displayMinutes = minutes
    }
    if(hours < 10){
        displayHours = "0"+ hours;
    }else{
        displayHours = hours
    }
    document.getElementById("display").innerHTML = displayHours + " : " + displayMinutes + " : " + displaySeconds;
}

function startStop(){

    if(counter === 8){
        window.clearInterval(interval);
        openModal();

    }else if(counter < 8 && started === false){
        let demoBtn = document.getElementById('demo');
        demoBtn.style.backgroundColor = "#878c8e"
        demoBtn.style.cursor = "default";
        interval = window.setInterval(stopWatch, 1000);
        started = true;
    }

}

let positions = [];
let counter = 0 ;
let started = false;

document.addEventListener("DOMContentLoaded",()=>{
    dragzones.forEach(function (item,index){
        positions[index] = item.getAttribute('transform');
    });
    dropzones.forEach(function (item,index){
        item.style.transitionDuration ="1s"
    });
});

document.getElementById('demo').addEventListener('click',function (){
    if(started === false) {
        let interval = 500;
        dragzones.forEach(function (item, index) {
            item.style.transitionDuration = "0s"
            item.style.transform = positions[index];
            setInterval(function () {
                item.style.transitionDuration = "2s"
                item.style.transform = "translateY(0.00001px)";
                item.style.stroke = "#ffffff"
                item.style.strokeWidth = "3"
                item.style.strokeLinejoin = "bevel"
                item.style.strokeMiterlimit = "10"
            }, interval)
            interval = interval + 375;

        })
        interval = 500;
    }
})

document.getElementById('reset').addEventListener('click',function (){
    location.reload();
})

let dragzones = document.querySelectorAll('.dragzone');
let dropzones = document.querySelectorAll('.dropzone');

dragzones.forEach(function (item,index){

            let classList = item.classList;
            Draggable.create(item, {
                bounds: "svg",

                onDrag: function () {
                },

                onDragStart: function () {
                    startStop();
                },

                onDragEnd: function () {
                    if (this.hitTest(".Trenciansky-dropzone") && classList[0] === "Trenciansky-dragzone") {
                        counter++;
                        startStop();
                        this.target.style.opacity = "0";
                        item.remove();
                        document.getElementsByClassName("Trenciansky-dropzone-index")[0].style.fill = "#980054"
                    } else if (this.hitTest(".Zilinsky-dropzone") && classList[0] === "Zilinsky-dragzone") {
                        counter++;
                        startStop();
                        this.target.style.opacity = "0";
                        item.remove();
                        document.getElementsByClassName("Zilinsky-dropzone-index")[0].style.fill = "#abcd88"
                    } else if (this.hitTest(".Trnavsky-dropzone") && classList[0] === "Trnavsky-dragzone") {
                        counter++;
                        startStop();
                        this.target.style.opacity = "0";
                        item.remove();
                        document.getElementsByClassName("Trnavsky-dropzone-index")[0].style.fill = "#afd852"
                    } else if (this.hitTest(".Presovsky-dropzone") && classList[0] === "Presovsky-dragzone") {
                        counter++;
                        startStop();
                        this.target.style.opacity = "0";
                        item.remove();
                        document.getElementsByClassName("Presovsky-dropzone-index")[0].style.fill = "#854632"
                    } else if (this.hitTest(".Nitriansky-dropzone") && classList[0] === "Nitriansky-dragzone") {
                        counter++;
                        startStop();
                        this.target.style.opacity = "0";
                        item.remove();
                        document.getElementsByClassName("Nitriansky-dropzone-index")[0].style.fill = "#132465"
                    } else if (this.hitTest(".Kosicky-dropzone") && classList[0] === "Kosicky-dragzone") {
                        counter++;
                        startStop();
                        this.target.style.opacity = "0";
                        item.remove();
                        document.getElementsByClassName("Kosicky-dropzone-index")[0].style.fill = "#654321"
                    } else if (this.hitTest(".Bratislavsky-dropzone") && classList[0] === "Bratislavsky-dragzone") {
                        counter++;
                        startStop();
                        this.target.style.opacity = "0";
                        item.remove();
                        document.getElementsByClassName("Bratislavsky-dropzone-index")[0].style.fill = "#0a0a0a"
                    } else if (this.hitTest(".Banskobystricky-dropzone") && classList[0] === "Banskobystricky-dragzone") {
                        counter++;
                        startStop();
                        this.target.style.opacity = "0";
                        item.remove();
                        document.getElementsByClassName("Banskobystricky-dropzone-index")[0].style.fill = "#0072a2"
                    }

                }
            });

})

let modal = document.getElementById('simpleModal2');
let closeBtn = document.getElementById('closeBtn2');

closeBtn.addEventListener("click",closeModal);
window.addEventListener("click", closeOutside)

function openModal(){
    document.getElementById("message1").innerHTML ="Congratz your score is : ";
    document.getElementById("message2").innerHTML = displayHours + " : " + displayMinutes + " : " + displaySeconds;
    modal.style.display = 'block';
}

function closeModal(){
    document.getElementById('message1').innerHTML="";
    document.getElementById("message2").innerHTML ="";
    modal.style.display = 'none';

}

function closeOutside(e){

    if(e.target === modal) {
        document.getElementById('message1').innerHTML="";
        document.getElementById("message2").innerHTML ="";
        modal.style.display = 'none';
    }
}




