$(window).on("load",()=>{
    let gameObjects = $('.object-container');
    let gameState = new GameState(gameObjects);
    let timer = new Timer();

    initialPosition(gameObjects);


    $('#start-button ').on('click',() => {
        timer.startTimer($('#timer-container #p1'));
        initializeDraggable(gameObjects);
        initializeDroppable(gameObjects, gameState);
        $('.start').css("display", "none");
        $('.object-container, #game-canvas').css("opacity", "1");
        $("#demo-button").css("display", "none");
    });

    $('#restart-button').on('click', () =>{
        initialPosition(gameObjects);
        gameState.restart();
        $("#demo-button").css("display", "inline-block");
        $('#restart-container').css("display", "none");
        $('#start-container').css("display", "inline-block");
        $('#win-container').css('opacity', 0);
    });

    $('#demo-button').on('click', () => {
        $('.start').css("display", "none");
        $('.object-container, #game-canvas').css("opacity", "1");

        gameObjects.css('transition','left, top 2s');
        wantedPosition(gameObjects);
        setTimeout(() => {
            initialPosition(gameObjects);
            gameObjects.css('transition','');
            $('.object-container, #game-canvas').css("opacity", "0.3");
            $('#start-container').css("display", "inline-block");
        },5000);
    });

    function initializeDraggable(gameObjects){
        gameObjects.draggable({
            cursor: "move",
            revert: true,
        });
    }

    function initializeDroppable(gameObjects, gameState){
        gameObjects.each((index, item) => {
            $(`.object${index}-target`).droppable({
                accept: `#object${index}`,
                tolerance: 'intersect',
                drop: function(event){
                    let gameObject = $(`#object${event.target.id[6]}`);
                    gameObject.css({
                        'z-index': '2',
                        'left': `${gameObject.data('left')}`,
                        'top': `${gameObject.data('top')}`});
                    gameObject.draggable('option', 'revert', false);
                    gameObject.draggable("destroy");
                    gameState.setTrue(`object${event.target.id[6]}`);
                    if(gameState.won()){
                        timer.stopTimer();
                        showVictory();
                    }
                }
            });
        });
    }

    function wantedPosition(gameObjects){
        gameObjects.each((index ) => {
            let object = $(`#object${index}`);
            object.css('left', `${object.data('left')}`)
            object.css('top', `${object.data('top')}`);
        });
    }
    function initialPosition(gameObjects){
        gameObjects.each((index ) => {
            let object = $(`#object${index}`);
            object.css('left', `${(index % 5) * 17}%`)
            object.css('top', `${100 + Math.floor(index / 5) * 23}%`);
        });
    }

    function showVictory(){
        $('#restart-container').css('display', 'inline-block');
        $('.object-container, #game-canvas').css('opacity', '0.3');
        $('#win-container').css('opacity', 1);
    }
});