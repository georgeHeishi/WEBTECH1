const teslaCarWidth = 1344;
const teslaCarHeight = 672;

window.addEventListener('resize', reportWindowSize);
function reportWindowSize() {

    let tmp = Array.from(document.querySelectorAll('.game-object'))
    let teslaCar = document.getElementById('tesla-car');
    const scaleWidth = teslaCar.width / teslaCarWidth;
    tmp.forEach(function (element){

            element.width = element.naturalWidth * scaleWidth;

    });

}

function myMove() {
    $('#animate').on('click', function() {
        $('#object1').animate({
            "top":"45%",
            "left":"4%"
        }, 1000);
        $('#object2').animate({
            "top":"44%",
            "left":"70%"
        }, 1000);
        $('#object3').animate({
            "top":"42%",
            "left":"69%"
        }, 1000);
        $('#object4').animate({
            "top":"31.5%",
            "left":"43.8%"
        }, 1000);
        $('#object5').animate({
            "top":"17.5%",
            "left":"4.6%"
        }, 1000);
        $('#object6').animate({
            "top":"63.5%",
            "left":"24%"
        }, 1000);
        $('#object7').animate({
            "top":"39.5%",
            "left":"3.5%"
        }, 1000);
        $('#object8').animate({
            "top":"42%",
            "left":"0.2%"
        }, 1000);
        $('#object9').animate({
            "top":"33.9%",
            "left":"24.5%"
        }, 1000);
        $('#object10').animate({
            "top":"19%",
            "left":"12.5%"
        }, 1000);
        $('#object11').animate({
            "top":"32.5%",
            "left":"63.6%"
        }, 1000);
    });
}



function givePositions(){
    const parent = document.querySelector('#game-objects');
    for (let i = 0; i < parent.children.length; i++) {
       parent.children[i].style.cssText = "top:80%";
       parent.children[i].style.cssText = "left:(i*3)%";

    }
}

$( function() {
    reportWindowSize();
    var gameVar = 0;
    let teslaCar = document.getElementById('tesla-car');
    $('#game-objects div').toArray().forEach(x=>{
        $(x).css('z-index',1);
        $(x).draggable({

            start : function(event, ui){
                ui.helper.css('z-index',3);
                start();
            },
            stop: function( event, ui ) {
                // ui.helper.css('z-index',2);
            }

        });


    });

    $( "#game-board" ).droppable({

        drop: function( event, ui ) {
            let uiPercentageLeft = ui.position.left / teslaCar.width;
            let uiPercentageTop  = ui.position.top / teslaCar.height;
            let distanceLeft = Math.abs(parseFloat(ui.draggable.data().left) - (uiPercentageLeft*100));
            let distanceTop = Math.abs(parseFloat(ui.draggable.data().top) - (uiPercentageTop*100));
            if (distanceLeft <= 5 && distanceTop <= 5 ) {
                ui.draggable.css('left',ui.draggable.data().left+'%');
                ui.draggable.css('top',ui.draggable.data().top+'%');
                ui.draggable.css('z-index',0);
                $(ui.draggable).draggable("destroy");
                gameVar++;
            }
            if (gameVar === 11){
                $( "#game-board" ).droppable("destroy");
                pause();
                $('#tesla-car').css('opacity',100+'%');
                let gameState = document.getElementById('game-state');
                gameState.innerHTML = 'You Won!';

            }

        }
    });
    reportWindowSize();
    givePositions();
    myMove();
    reportWindowSize();

});

