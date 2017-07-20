<template>
  <div id="app">
      Hallo
      {{msg}}
      <notsupported v-show="tab==='notsupported'"></notsupported>
      <calibrate v-show="tab==='calibrate'" :gravity="gravity" @calibrated="calibrated($event)" ></calibrate>
      <play  v-show="tab==='play'" :active="tab==='play'" :calibration="calibration" :comms="comms" :gravity="gravity"></play>
  </div>
</template>

<script>
    import { hasMPU } from './mpu.js'

    export default {
        name: 'app',
        props: ['comms'],
        data () {
            return {
                tab: '',
                calibration: {},
                gravity: {},
                msg: ''
            }
        },
        methods: {
            calibrated: function(ev) {
                this.calibration = ev.calibration;
                this.tab = 'play';
            },
            updateGravity: function(x, y) {
                if (x != this.gravity.x || y != this.gravity.y) {
                    this.gravity = {x, y};
                }
            },
            switchOrientation: function(lastOrientation, currentOrientation) {
                // TODO change calibrationdata
                // TODO notify calibrate
            }
        },
        mounted () {
            if (!hasMPU()) {
                this.tab = 'notsupported';
                return;
            }
            this.tab = 'calibrate';
        }
  }
</script>

<style>
</style>
