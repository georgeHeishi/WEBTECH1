window.addEventListener('DOMContentLoaded', () =>{
    animateSite();
    let button = document.querySelector('#rerun-button');
    button.addEventListener('click', () => {
        console.log("hello");
        animateSite();
    });
    let list = document.querySelectorAll('.menu');
    console.log(list);
    list.forEach((item) =>{
        item.addEventListener('mouseover', ()=>{
            anime({
                targets: item,
                translateY: 10
            })
        });
        item.addEventListener('mouseout', ()=>{
            anime({
                targets: item,
                translateY: 0
            })
        })
    })
})

function animateSite(){
    anime({
        targets: '.navigation-content li',
        translateY: [20, 0],
        delay: function(el, i, l) {
            return i * 50;
        },
    });
    anime({
        targets: '.header',
        scale: '0',
        direction: 'reverse',
        duration: 1000
    });
    anime.timeline({loop: false}).add({
        targets: '.collum-vlg',
        translateY: [400, 0],
        duration: 2000,
        easing: 'easeOutElastic'
    }).add({
        targets: 'img',
        width: ['0', '100%'],
        delay: '100'
    })
}