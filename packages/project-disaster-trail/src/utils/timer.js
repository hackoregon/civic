import { TweenLite, Linear } from "gsap/TweenMax";

class Timer {
  constructor({ duration = 10 } = {}) {
    this.duration = duration;
    this.time = 0;
    this.tween = null;
    this.callbacks = [];
    this.completeCallbacks = [];
  }

  setDuration = duration => {
    this.duration = duration;
  };

  addCallback = callback => {
    this.callbacks.push(callback);
  };

  addCompleteCallback = callback => {
    this.completeCallbacks.push(callback);
  };

  reset = () => {
    this.time = 0;
    if (this.tween) {
      this.tween.kill();
    }
    this.callbacks = [];
    this.completeCallbacks = [];
  };

  start = () => {
    if (this.tween) {
      this.tween.kill();
    }
    this.tween = TweenLite.to(this, this.duration, {
      time: this.duration,
      ease: Linear.easeNone,
      onUpdate: () => {
        for (let i = 0; i < this.callbacks.length; i += 1) {
          this.callbacks[i](this.time, this.time / this.duration);
        }
      },
      onComplete: () => {
        for (let i = 0; i < this.completeCallbacks.length; i += 1) {
          this.completeCallbacks[i]();
        }
      }
    });
  };

  stop = () => {
    if (this.tween) {
      this.tween.kill();
    }
  };

  stopEarly = () => {
    if (this.tween) {
      for (let i = 0; i < this.completeCallbacks.length; i += 1) {
        this.completeCallbacks[i]();
      }
      this.tween.kill();
    }
  };
}

export default Timer;
