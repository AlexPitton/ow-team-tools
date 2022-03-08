<template>
    <div class="page replays">
        <h1 class="font-title-bold t-white u-mb90">
            Replays code
        </h1>

        <div v-for="replay in replays">
            <pre><code>
                {{replay}}
            </code></pre>
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({$axios}) {
        const replays = await $axios.$get(`/api/sessions?populate=*`)
        return {replays}
    }
}
</script>

<style lang="scss">

</style>
