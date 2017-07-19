<template>
    <div>
        <h2>Play</h2>
        {{x}}, {{y}}
    </div>
</template>
<script>
    export default {
        name: 'play',

        props: ['calibration', 'gravity', 'comms'],

        data: function() {
            return {
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
                this.comms.x(this.x);
                // this.msg += 'x';
            },
            y: function() {
                this.comms.y(this.y);
                // this.msg += 'y';
            },
            client_id: function() {
                console.log('watching ID', this.id)
                this.msg += "ID = " + this.id;
            }
        },

        methods: {
            normalise: function(val, minval, maxval) {
                const to_zero = Math.max(val - minval, 0);
                return Math.min (1,  to_zero / (maxval - minval));
            }
        },

        mounted: function () {
            var that = this;
            this.comms.getID(function(id) {
                console.log('setting id to ', id);
                that.client_id = id;
            });
        }

    }
</script>
