const app = new Vue({
  el: '#root',
  data: {
    studying: false,
    breaktime: false,
    hour: '03',
    min: '8',
    sec: '30',
    timecontext: '00h 00m 00s',
    timer: null,
    breakMessage: '',
    subject: '',
    studyingHours: '',
    notes: '',
  },
  methods: {
    takeBreak() {
      this.breaktime = !this.breaktime;

      if(this.breaktime===true) {
        let now = new Date();
        let hour = now.getHours();
        let min = now.getMinutes() + 15;

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
