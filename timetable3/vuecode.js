const app = new Vue({
  el: '#root',
  data: {
    studying: false,
    breaktime: false,
    hour: '00',
    min: '00',
    sec: '00',
    timecontext: '00h 00m 00s',
    timer: null,
    breakMessage: '',
    submitted: false,
    startTime: "0600",
    endTime: "0700",
    interval: 15,
    longBreakCount: 0,
    schedule: [
    ]
  },
  methods: {
    tableFormSubmit(e) {
      e.preventDefault();
      this.endTime = ('0000'+((1*this.startTime)+100)).toString().slice(-4);

      this.schedule.push({period: `[${this.schedule.length+1-this.longBreakCount}] 
                                    ${this.startTime.slice(0,2)}:${this.startTime.slice(2,4)} - 
                                    ${this.endTime.slice(0,2)}:${this.endTime.slice(2,4)}`, 
                                    fin: false});
      this.submitted = true;
    },
    newPeriod() {
      this.startTime = ('0000'+((1*this.endTime)+this.interval)).toString().slice(-4);
      let hour = 1*this.startTime.slice(0,2);
      let min = 1*this.startTime.slice(2,4);

      if(min>59) {
        min -= 60;
        hour += 1
      }
      hour = ('00'+hour).slice(-2);
      min = ('00'+min).slice(-2);
      this.startTime = `${hour}${min}`;

      hour = 1*hour;
      hour += 1

      hour = ('00'+hour).slice(-2);
      this.endTime = `${hour}${min}`;
      this.schedule.push({period: `[${this.schedule.length+1-this.longBreakCount}] 
                                    ${this.startTime.slice(0,2)}:${this.startTime.slice(2,4)} - 
                                    ${this.endTime.slice(0,2)}:${this.endTime.slice(2,4)}`, 
                                    fin: false});
    },
    newBreak() {
      this.schedule.push({period: 'Long break', fin: false})

      let hour = 1*this.endTime.slice(0,2);
      let min = 1*this.endTime.slice(2,4) + (60-this.interval);

      if (min > 59) {
        hour += 1
        min -= 60;
      }

      hour = ('00'+hour).slice(-2);
      min = ('00'+min).slice(-2);

      this.endTime = `${hour}${min}`;
      this.longBreakCount += 1;
    },
    clearSchedule() {
      this.submitted = false;
      this.startTime = "0600";
      this.endTime = "0700";
      this.interval = 15;
      this.longBreakCount = 0;
      this.schedule = [];
    },
    takeBreak() {
      this.breaktime = !this.breaktime;
      if(this.breaktime == this.studying)
        this.isStudying();

      if(this.breaktime===true) {
        let now = new Date();
        let hour = now.getHours();
        let min = now.getMinutes() + this.interval;

        if(min>59) {
          min %= 60;
          ++hour;
        }

        this.breakMessage = `${('00'+hour).slice(-2)}:${('00'+min).slice(-2)}`;
      }
    },
    runClock() {
      let hour = 1 * this.hour
      let min = 1 * this.min
      let sec = 1 * this.sec

      ++sec;

      if(sec>=60) {
        sec = 0;
        ++min;
      }
      if(min>=60) {
        min = 0;
        ++hour;
      }

      this.hour = ('00'+hour).slice(-2);
      this.min = ('00'+min).slice(-2);
      this.sec = ('00'+sec).slice(-2);

      this.timecontext = `${this.hour}h ${this.min}m ${this.sec}s`;
    },
    isStudying() {
      this.studying = !this.studying;

      if(this.studying === true) {
        this.timer = setInterval(this.runClock, 1000);
      }
      else {
        clearInterval(this.timer);
      }
    }
  },
})
