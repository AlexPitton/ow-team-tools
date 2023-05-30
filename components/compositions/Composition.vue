<template>
    <div class="composition-wrapper u-relative">
        <div class="empty-decorator">
            <div v-for="n in maxHeroes" :key="n" class="empty-slot"></div>
        </div>


        <div class="heroes-selected-container">
            <HeroSelected
                v-for="(hero, index) in heroesFilteredByRole"
                :hero="hero"
                @activeFlexMode="flexModeRequested(hero)"
                :key="hero.id"
                ref="heroesRefs"
            />
        </div>

    </div>
</template>

<script>
    import HeroSelected from "@/components/compositions/HeroSelected.vue"

    export default {
        components: {HeroSelected},
        name: "Composition",
        props: {
            heroes: Array,
            flexMode: Boolean
        },
        computed: {
            heroesFilteredByRole: function () {
                let sortedArray = {tank: [], dps: [], support: []}

                this.heroes.forEach( (hero) => {
                    sortedArray[hero.attributes.role].push(hero)
                })

                return [...sortedArray['tank'], ...sortedArray['dps'],...sortedArray['support']]
            },
            maxHeroes: function () {
                return this.$store.state.maxHeroes
            }
        },
        methods: {
            flexModeRequested(hero) {
                this.$emit('flexModeRequested', hero)
            },
            flexHasBeenSelected() {
                this.$refs.heroesRefs.forEach( (hero) => {
                    hero.deactivateFlexMode()
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

    .composition-wrapper {

        .hero {
            width: 100%;
            max-width: 90px;
            margin-right: 6px;

            img {
                background-color: red!important;
            }

            &:last-child {
                margin-right: 0;
            }
        }

        .heroes-selected-container {
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
        }
    }

    .empty-decorator {
        width: 100%;

        .empty-slot {
            display: inline-block;
            vertical-align: top;
            width: 100%;
            max-width: 90px;
            margin-right: 6px;
            border-radius: 3px;
            background-color: $c-primary-lighter;
            @include aspect-ratio(1,1);

            &:last-child {
                margin-right: 0;
            }
        }
    }
</style>
