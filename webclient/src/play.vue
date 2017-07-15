<template>
    <div>
        <h2>Play</h2>
        {{x}}, {{y}}
    </div>
</template>
<script>
    export default {
        name: 'play',

        props: ['calibration', 'gravity'],

        data: function() {
            return {
                a: 0,
                b: 0,
                c: 0,
                msg: ''
            }
        },

        computed: {
            x: function() {
                return this.normalise(this.gravity.x, this.calibration.minx, this.calibration.maxx);
            },
            y: function() {
                return this.normalise(this.gravity.y, this.calibration.miny, this.calibration.maxy);
            }
        },

        watch: {
            x: function () {
                this.msg += 'x';
            },
            y: function() {
                this.msg += 'y';
            }
        },

        methods: {
            normalise: function(val, minval, maxval) {
                const to_zero = Math.max(val - minval, 0);
                const normalised =Math.min (1,  to_zero / (maxval - minval));
                return Math.round(normalised * 127);
            }
        }

    }
</script>
