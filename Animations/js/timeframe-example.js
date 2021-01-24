$(document).ready( () =>{
    let parent = $('.square-wrapper');
    let i = 10, j = 5;
    let index;
    for(index = 0; index < (i * j); index++){
        let square = document.createElement('div');
        square.classList.add('square');
        parent.append(square);
    }
    parent.css('width',`${(i * 20) + ((i + 1) * 4)}`);
    parent.css('height',`${(j * 20) + ((j + 1) * 4)}`);

    anime({
        targets: '.dot',
        keyframes: [
            {top: function (el){
                    return window.innerHeight - 2*el.offsetHeight;
                }},
            {left: function (el){
                    return window.innerWidth - el.offsetWidth - 50;
                }},
            {top: function (el){
                    return el.offsetHeight + 10;
                }},
            {top: function(el){
                    return window.innerHeight - 2*el.offsetHeight;
                }},
            {left: '50'},
            {top: '10'},
            ],
        easing: 'easeOutBounce',
        duration: 6000,
        loop: true
    });

    var animation = anime({
        targets: '.square-wrapper .square',
        scale: [
            {value: .1, easing: 'easeOutSine', duration: 500},
            {value: 1, easing: 'easeInOutQuad', duration: 1200}
        ],
        delay: anime.stagger(200, {grid: [10, 5], from: 'center'}),
        autoplay: false
    });


    let click = false;
    parent.click(() => {
        click = !click;
        if(click){
            animation.play();
        }else{
            animation.pause();
        }
    });
});

