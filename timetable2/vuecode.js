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
    notes: '',
    schedule: [
      {period: '[1] 05:00 - 06:00', fin: false},
      {period: '[2] 06:15 - 07:15', fin: false},
      {period: '[3] 07:30 - 08:30', fin: false},
      {period: 'Long break', fin: false},
      {period: '[4] 09:30 - 10:30', fin: false},
      {period: '[5] 10:45 - 11:45', fin: false},
      {period: '[6] 12:00 - 13:00', fin: false},
      {period: '[7] 13:15 - 14:15', fin: false},
      {period: '[8] 14:30 - 15:30', fin: false},
      {period: '[9] 15:45 - 16:45', fin: false},
      {period: 'Long break', fin: false},
      {period: '[10] 17:45 - 18:45', fin: false},
      {period: '[11] 19:00 - 20:00', fin: false},
      {period: '[12] 20:15 - 21:15', fin: false},
      {period: '[13] 21:30 - 22:30', fin: false},
    ]
  },
  methods: {
    takeBreak() {
      this.breaktime = !this.breaktime;
      if(this.breaktime == this.studying)
        this.isStudying();

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
