<template>
    <div class="composition-wrapper">
        <div
            class="hero"
            v-for="hero in heroes"
            :key="hero.id"
        >
            <div class="portrait-container">
                <img :src="`${$axios.defaults.baseURL}${hero.attributes.portrait.data.attributes.url}`">
            </div>
            <div v-if="hero.flex" class="flex-heroes">
                <div>
                    <img :src="`${$axios.defaults.baseURL}${hero.flex.attributes.portrait.data.attributes.url}`">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Hero from "@/components/heroes/Hero.vue"

    export default {
        components: {Hero},
        name: "CompositionReadOnly",
        props: {
            heroes: Array
        }
    }
</script>

<style lang="scss">

    .composition-wrapper {
        position: relative;
        display: flex;
        justify-content: flex-start;

        .hero {
            width: 100%;
            max-width: 75px;
            margin-right: 4px;
            border-radius: 3px;

            img {
                border-radius: 3px;
                background-color: $color-white;
            }

            &:last-child {
                margin-right: 0;
            }

            .flex-heroes {

                div {
                    position: relative;
                    margin-top: 5px;
                    border-radius: 3px;
                    overflow: hidden;
                    background-color: #dadada;
                    height: 35px;

                    transition: all 350ms $magikMotion;

                    img {
                        position: absolute;
                        top: 50%;
                        left: 0;
                        right: 0;
                        transform: translateY(-50%);
                    }
                }
            }
        }
    }
</style>
