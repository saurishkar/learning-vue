<template>
  <div class="timer-container container">
    <div class="badge badge-danger px-3 py-2">{{ timeLeft }} seconds remaining</div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "Timer",
  data() {
    return {
      timeLeft: this.countdown,
      timerInstance: null
    }
  },
  props: {
    countdown: Number,
    started: Boolean,
    onCountdownEnd: Function
  },
  watch: {
    started(newVal) {
      if(newVal) {
        this.setTimer();
      }
    }
  },
  beforeDestroy() {
    this.resetTimer();
  },
  methods: {
    resetTimer() {
      clearInterval(this.timerInstance);
      this.timerInstance = null;
    },
    setTimer() {
      this.timerInstance = setInterval(this.updateTimer, 1000);
    },
    updateTimer(val = -1) {
      this.timeLeft += val;
      if (this.timeLeft <= 0) {
        this.resetTimer();
        this.onCountdownEnd();
        return;
      }
    },
  }
};
</script>
