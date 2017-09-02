<template>
    <div id="wrapper">
        Clients:
        <ul id="clients">
            <li v-for="client in clients">
                {{ client.name }}<br>
                {{ client.id }}<br>
                {{ client.isActive }}
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'main-page',
        components: {},
        methods: {},
        computed: {...mapGetters([
            'clients'
        ])}
    }
</script>

<style>
</style>
