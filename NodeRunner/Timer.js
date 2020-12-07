const { performance } = require('perf_hooks');


module.exports = class Timer{
    constructor() {
        this.startTime=0;
        this.stopTime=0;
    }
    startTimer=() => {
        this.startTime=performance.now();
    }
    stopTimer = () => {
        this.endTime=performance.now();
    }
    getTotalTimeTaken = () => {
        return this.endTime - this.startTime;
    }
}
