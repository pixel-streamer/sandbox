//from : https://javascript.info/class#rewrite-to-class
let uses12hourClock = false;

class Clock {
    constructor({ template }) {
        this.template = template;
    }

    render() {
        console.clear();
        let date = new Date();

        let hours = date.getHours();
        /*  if (hours < 10) hours = "0" + hours; */
        if (uses12hourClock === true) {
            if (hours > 12) {
                hours = parseInt(hours - 12);
            }
        }
        if (hours < 10) hours = "0" + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = "0" + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = "0" + secs;

        let output = this.template
            .replace("hh", hours)
            .replace("mm", mins)
            .replace("ss", secs);

        console.log(output);
    }

    stop() {
        clearInterval(this.timer);
    }

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    }
}

let clock = new Clock({ template: "hh:mm:ss" });
clock.start();
