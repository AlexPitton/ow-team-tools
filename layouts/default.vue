<template>
    <div>
        <Menu v-if="$auth.loggedIn" />
        <Nuxt />
    </div>
</template>

<script>
    import Menu from "@/components/common/Menu.vue"

    export default {
        components: {
            Menu
        },
        mounted() {
            window.addEventListener('resize', this.onResize)
            this.onResize()
        },
        methods: {
            onResize() {
                this.$nuxt.$emit('onresize')
                this.$store.commit('onResize')
            }
        }
    }
</script>
