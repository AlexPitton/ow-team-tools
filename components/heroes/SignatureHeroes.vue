<template>
    <div>
        <h2 class="font-title t-white u-mb15">Signature heroes</h2>
        <div class="signature-heroes-container">
            <div class="hero" v-for="hero in heroes" :key="hero.id">
                <div class="portrait-container u-mr20">
                    <img :src="`${$axios.defaults.baseURL}${getHeroByID(hero.id).attributes.icon.data.attributes.url}`">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignatureHeroes',
    props: {
        heroes: null
    },
    methods: {
        getHeroByID(id) {
            return this.$store.state.heroes.find(x => x.id === id)
        },
    }
}
</script>

<style lang="scss">
.signature-heroes-container {

    .hero {
        overflow: hidden;
        display: inline-block;
        vertical-align: top;

        img {
            filter: invert(100%);
            height: 35px;
            width: auto;
        }
    }
}
</style>
