<template>
    <div>
        calibrate
        <button v-on:click="play">Play!</button>
    </div>
</template>

<script>
    export default {
        name: 'calibrate',
        props: ["position"],

        computed: {
            currentx: function() { return this.position.x; },
            currenty: function() { return this.position.y; }
        },

        /*
        computed: {
            calibrationdata: function() {
                console.log('updating calirbationdata');
                return {
                    maxx: Math.max(this.calibrationdata.maxx, position.x),
                    minx: Math.min(this.calibrationdata.minx, position.x),
                    maxy: Math.max(this.calibrationdata.maxy, position.y),
                    miny: Math.min(this.calibrationdata.miny, position.y)
                }
            }
        },
        */

        watch: {
            currentx: function() {
                console.log('x position has changed!');
                this.calibrationdata.maxx = Math.max(this.calibrationdata.maxx, position.x);
                this.calibrationdata.minx = Math.min(this.calibrationdata.minx, position.x);
            },
            position: {
                handler(val) {
                    console.log('position has changed!');
                    this.calibrationdata.maxx = Math.max(this.calibrationdata.maxx, position.x);
                    this.calibrationdata.minx = Math.min(this.calibrationdata.minx, position.x);
                    this.calibrationdata.maxy = Math.max(this.calibrationdata.maxy, position.y);
                    this.calibrationdata.miny = Math.min(this.calibrationdata.miny, position.y);
                },
                deep:true
            }
        },

        data() {
            return {
                calibrationdata: {
                    minx: 1,
                    maxx: -1,
                    miny: 1,
                    maxy: -1
                }
            }
        },

        methods: {
            play: function () {
                window.ondevicemotion = null;
                this.$emit("calibrated", {calibration: this.calibrationdata});
            }
        },
        created: function() {
            /*
            window.ondevicemotion = e => {
                const ax = e.acceleration.x;
        		const ay = e.acceleration.y;

    		    const posx = e.accelerationIncludingGravity.x - ax;
	            const posy = e.accelerationIncludingGravity.y - ay;

                this.calibrationdata.maxx = Math.max(this.calibrationdata.maxx, posx);
                this.calibrationdata.minx = Math.min(this.calibrationdata.minx, posx);
                this.calibrationdata.maxy = Math.max(this.calibrationdata.maxy, posy);
                this.calibrationdata.miny = Math.min(this.calibrationdata.miny, posy);
            }
            */
        }
    }

</script>
