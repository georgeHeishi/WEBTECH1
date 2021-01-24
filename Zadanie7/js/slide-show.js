let current;
let intervalNext;
document.addEventListener("DOMContentLoaded", () => {



    document.querySelector('.close').addEventListener("click", function (){
        clearInterval(intervalNext);
        closeModal();
    });

    document.getElementById('prev').addEventListener("click",function (){
        clearInterval(intervalNext);
        showNext(-1);
    });

    document.getElementById('next').addEventListener("click",function () {
        clearInterval(intervalNext);
        showNext(1);
    });

    document.getElementById('play').addEventListener("click", function () {
        console.log("yep");
        intervalNext = setInterval(() => {showNext(1)}, 2000);
    });

    document.getElementById('pause').addEventListener('click', function () {
        console.log("nope");
        clearInterval(intervalNext);
    });

});

function openModal(id) {
    let index = Number(id.substring(3));
    showModal(index);
}

function closeModal() {
    document.querySelector('#slideShow').style.display = 'none';
}

function showNext(n) {
    console.log(filterOrder);
    const index = filterOrder.indexOf(current);
    let nextIndex = (index + n);
    if (nextIndex >= filterOrder.length) {
        nextIndex = 0;
    } else if (nextIndex < 0) {
        nextIndex = filterOrder.length - 1;
    }
    showModal(filterOrder[nextIndex]);
}

function showModal(id) {
    current = id;
    document.querySelector('#slideShow').style.display = 'block';
    order.forEach((item, index) => {
        if (id === item) {
            document.getElementById(item).style.display = 'block';
        } else {
            document.getElementById(item).style.display = 'none';
        }
    });
}