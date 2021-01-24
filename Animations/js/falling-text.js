$(document).ready( () =>{
    let letters = $('.letter').toArray();
    letters.forEach((item,index) =>{
       item.addEventListener("click", ()=>{
        fallDown(item);
       })
    });

    $('#rerun-button').click(() => {
        anime({
            targets: '.letter',
            top:    '200px',
            easing: 'linear'
        });
        letters.forEach((item) => {
            backUp(item);
        });
    });
});

function fallDown(item){
    anime({
        targets: item,
        top: `${window.innerHeight - item.offsetHeight}`,
        easing: 'easeOutBounce',
        rotate: getRandomArbitrary(-180, 180),
    });
}

function getRandomArbitrary(min, max) {
    return `${Math.random() * (max - min) + min}`;
}

function backUp(item){
    anime({
        targets: item,
        rotate: `0`,
    });
}