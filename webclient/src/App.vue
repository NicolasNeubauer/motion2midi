<template>
  <div id="app">
      {{msg}}
      <notsupported v-show="tab==='notsupported'"></notsupported>
      <calibrate v-show="tab==='calibrate'" :gravity="gravity" @calibrated="calibrated($event)" ></calibrate>
      <play  v-show="tab==='play'" :calibration="calibration" :comms="comms" :gravity="gravity"></play>
  </div>
</template>

<script>
    import mpu from './mpu.js'

    export default {

        name: 'app',

        props: ['comms'],

        data () {
            return {
                tab: '',
                calibration: {},
                gravity: {},
                msg: '',
                currentOrientation: 0,
                lastOrientation: 0,
                gravityResolution: 10
            }
        },

        methods: {
            calibrated: function(ev) {
                this.calibration = ev.calibration;
                this.tab = 'play';
            }
        },

        mounted () {

            console.log('comms:', this.comms);
            if (!mpu.hasMPU()) {
                this.tab = 'notsupported';
                return;
            }
            this.tab = 'calibrate';

            /* doesn't react for some reason
            window.addEventListener('orientationchange', function() {
                this.msg = "change!";
            });
            */

            this.lastOrientation = window.orientation;
            this.currentOrientation = window.currentOrientation;

            window.ondevicemotion = e => {
                if (this.currentOrientation != window.orientation) {
                    this.lastOrientation = this.currentOrientation;
                    this.currentOrientation = window.orientation;
                    // TODO change calibrationdata
                    // TODO notify calibrate
                }

                const x = Math.round(this.gravityResolution *
                    (e.accelerationIncludingGravity.x - e.acceleration.x)) /
                    this.gravityResolution;
                const y = Math.round(this.gravityResolution *
                    (e.accelerationIncludingGravity.y - e.acceleration.y)) /
                     this.gravityResolution;

                if (x != this.gravity.x || y != this.gravity.y) {
                    this.gravity = {x, y};
                }
            }
        }
  }
</script>

<style>

</style>
