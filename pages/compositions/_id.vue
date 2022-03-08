<template>
    <div class="page single-composition">

        <h1 class="font-title-bold t-white u-mb90">
            {{composition.data.attributes.name}}
        </h1>

        <div class="u-flex u-justify-content-center u-mb50">
            <div class="composition">
                <CompositionReadOnly :heroes="compositionHeroes(composition.data.attributes.heroes)" />
            </div>
        </div>


        <div class="description-container" v-html="composition.data.attributes.description"></div>
    </div>
</template>

<script>
    import CompositionReadOnly from "@/components/compositions/CompositionReadOnly.vue"

    export default {
        components: {
            CompositionReadOnly
        },
        computed: {
            heroes() {
                return this.$store.state.heroes
            },
            maps() {
                return this.$store.state.maps
            }
        },
        async asyncData({params, $axios}) {
            const composition = await $axios.$get(`/api/compositions/${params.id}`)
            return {composition}
        },
        methods: {
            compositionHeroes(heroes) {

                let sortedArray = {tank: [], dps: [], support: []}

                heroes.forEach( (item) => {
                    let hero = this.heroes.find(x => x.id === item.id)
                    let flex = this.heroes.find(x => x.id === item.flex)

                    if (flex) {
                        hero['flex'] = flex
                    }

                    sortedArray[hero.attributes.role].push(hero)
                })

                return [...sortedArray['tank'], ...sortedArray['dps'],...sortedArray['support']]
            }
        }
    }
</script>

<style lang="scss">

    .single-composition {

        .composition {
            display: inline-block;
            background-color: rgba(255,255,255, 0.1);
            border-radius: 6px;
            padding: 25px;
        }

        .description-container {
            background-color: $c-primary-light;
            border-radius: 6px;
            padding: 25px;

            p {
                margin: 15px 0;

                .text-tiny {font-size: 10px;}
                .text-small {font-size: 12px;}
                .text-big {font-size: 21px;}
                .text-huge {font-size: 32px;}
            }

            strong {
                font-weight: 600;
            }

            i {
                font-style: italic;
            }

            u {
                text-decoration: underline;
            }

            s {
                text-decoration: line-through;
            }

            ul, ol {
                padding-left: 40px;
            }

            ul {
                list-style-type: disc;
            }

            figure.media {
                max-width: 720px;
            }
        }
    }

</style>
