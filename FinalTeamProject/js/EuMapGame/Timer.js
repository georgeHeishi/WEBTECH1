class Timer{
    t;
    started;
    constructor() {
        this.t = 0;
        this.started = false;
    }
    get getTime(){
        return this.t;
    }
    setTimer(timeContainer){
        timeContainer.html( () => {
            let minutes = Math.floor(this.t/60);
            let seconds = this.t % 60;
            let timeString = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
            timeString = timeString +  (seconds < 10 ? `0${seconds}` : `${seconds}`);
            return timeString;
        });
        if(this.started){
            this.t++;
            setTimeout(() =>{this.setTimer(timeContainer)}, 1000);
        }
        else{
            this.t = 0;
        }
    }
    startTimer(timeContainer){
        this.started = true;
        this.setTimer(timeContainer);
    }
    stopTimer(){
        this.started = false;
    }
}