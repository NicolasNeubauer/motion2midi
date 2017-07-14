<template>
    <div>
        play
        {{calibration.minx}}, {{calibration.maxx}}
    </div>
</template>
<script>
    export default {
        name: 'play',
        props: ['calibration']
    }
</script>
