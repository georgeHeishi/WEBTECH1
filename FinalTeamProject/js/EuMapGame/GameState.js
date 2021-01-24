class GameState{
    gameState = new Map();
    constructor(gameObjects) {
        gameObjects.each((index, item) => {
            this.gameState.set(item.id, false);
        })
    }

    setTrue(id){
        this.gameState.set(id, true);
    }

    won(){
        let winCond = true;
        console.log(winCond);
        this.gameState.forEach((value) => {
            if(!value){
                winCond = false;
            }
        });
        return winCond;
    }
    restart(){
        this.gameState.forEach((value,key) => {
            this.gameState.set(key, false);
        })
    }
}