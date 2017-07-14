<template>
  <div id="app">
      <notsupported v-show="tab==='notsupported'"></notsupported>
      <calibrate v-show="tab==='calibrate'" :position="position" @calibrated="calibrated($event)" ></calibrate>
      <play v-show="tab==='play'" :calibration="calibration" :position="position"></play>
  </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                tab: '',
                calibration: {},
                position: {}
            }
        },
        methods: {
            calibrated: function(ev) {
                this.calibration = ev.calibration;
                this.tab = 'play';
            }
        },
        mounted: function() {
            console.log(this.tab);
            if (!this.$parent.$options.mpu.hasMPU()) {
                this.tab = 'notsupported';
                return;
            }
            this.tab = 'calibrate';
            this.position.x = '0';
            
            window.ondevicemotion = e => {
                console.log("ondevicemotion", this);
                const ax = e.acceleration.x;
        		const ay = e.acceleration.y;
    		    this.position.x = e.accelerationIncludingGravity.x - ax;
	            this.position.y = e.accelerationIncludingGravity.y - ay;
                console.log(this.position);
            }
        }
  }
</script>

<style>

</style>
