<template>
    <div>
        <Header v-if="$auth.loggedIn" />
        <Nuxt />
    </div>
</template>

<script>
    import Header from "@/components/common/Header.vue"

    export default {
        components: {
            Header
        }
    }
</script>
