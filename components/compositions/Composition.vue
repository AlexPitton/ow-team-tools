<template>
    <div class="composition-wrapper">
        <div class="empty-decorator">
            <div v-for="n in 6" :key="n" class="empty-slot"></div>
        </div>


        <HeroSelected
            v-for="(hero, index) in heroesFilteredByRole"
            :hero="hero"
            @removeHero="heroRemoved(hero)"
            @removeFlex="flexRemoved(hero)"
            @activeFlexMode="flexModeRequested(hero.attributes.role, index, hero)"
            :key="hero.id"
            ref="heroesRefs"
        />

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
            }
        },
        methods: {
            heroRemoved(hero) {
                this.$emit('heroRemoved', hero)
            },
            flexRemoved(hero) {
                this.$emit('flexRemoved', hero)
            },
            flexModeRequested(role, index, hero) {

                console.log(role, index, hero)
                this.$emit('flexModeRequested', {role : role, index : index, hero : hero})
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
        position: relative;
        max-width: 620px;
        min-height: 180px;
        display: flex;
        justify-content: flex-start;

        .heroes-list-wrapper {
            position: absolute;
            top: 0;
            left: 0;
        }

        .hero {
            width: 100%;
            max-width: 90px;
            margin-right: 4px;

            img {
                background-color: red!important;
            }

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .empty-decorator {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;

        .empty-slot {
            display: inline-block;
            vertical-align: top;
            width: 100%;
            max-width: 90px;
            margin-right: 4px;
            border-radius: 3px;
            background-color: gainsboro;
            @include aspect-ratio(7,12);

            &:last-child {
                margin-right: 0;
            }
        }
    }
</style>
