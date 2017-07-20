<template>
    <div>
        <h2>Calibration</h2>
        {{gravity}}<br>
        {{calibrationdata}}<br>
        <button v-on:click="play" v-show="nonzerodifference">Play!</button>
    </div>
</template>

<script>
    export default {
        name: 'calibrate',
        props: ["gravity"],
        computed: {
            nonzerodifference: function() {
                return this.calibrationdata.maxx != this.calibrationdata.minx &&
                    this.calibrationdata.maxy != this.calibrationdata.miny;
            }
        },
        watch: {
            gravity () {
                this.calibrationdata = {
                    maxx: Math.max(this.calibrationdata.maxx, this.gravity.x),
                    minx: Math.min(this.calibrationdata.minx, this.gravity.x),
                    maxy: Math.max(this.calibrationdata.maxy, this.gravity.y),
                    miny: Math.min(this.calibrationdata.miny, this.gravity.y)
                };
            }
        },
        data() {
            return {
                calibrationdata: {
                    minx: 360,
                    maxx: 0,
                    miny: 360,
                    maxy: 0
                }
            }
        },
        methods: {
            play: function () {
                this.$emit("calibrated", {calibration: this.calibrationdata});
            }
        }
    }
</script>
