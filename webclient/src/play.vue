<template>
    <div>
        <h2>Play | client id {{ client_id }}</h2>
        {{x | round}}, {{y | round}}
    </div>
</template>
<script>
    export default {
        name: 'play',

        props: ['calibration', 'gravity', 'comms', 'active'],

        data: function() {
            return {
                msg: '',
                client_id: null
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
                this.comms.x(1.0 - this.x, this.client_id);
            },
            y: function() {
                this.comms.y(this.y, this.client_id);
            },
            client_id: function() {
                this.msg += "ID = " + this.client_id;
            },
            active: function() {
                console.log("active change");
                if (this.client_id === null) {
                    this.register();
                }
            }
        },

        methods: {
            normalise: function(val, minval, maxval) {
                const to_zero = Math.max(val - minval, 0);
                return Math.min (1,  to_zero / (maxval - minval));
            },
            register: function() {
                var that = this;
                this.comms.getID(function(id) {
                    console.log('setting id to ', id);
                    that.client_id = id;
                },
                that.$http);
            }
        }
    }
</script>
