<template>
    <div class="heroes-list">
        <div class="hero-card" v-for="hero in heroesFilteredByRole" :key="hero.id" :class="{'separator' : hero.last}">
            <Hero
                v-on:heroClicked="heroSelected(hero)"
                :hero="hero"
                :isRoleLocked="lockedRole.includes(hero.role)"
                :isSelected="heroesSelection.includes(hero)"
                :flexModeRole="flexModeRole"
                :flexMode="flexMode"
            />
        </div>
    </div>
</template>

<script>
    import Hero from "@/components/heroes/Hero.vue"
    export default {
        name: 'HeroesList',
        components: {
            Hero
        },
        props: {
            heroes: Array,
            lockedRole: Array,
            heroesSelection: Array,
            flexMode: Boolean,
            flexModeRole: String
        },
        data() {
            return {
                heroesList: Array
            }
        },
        computed: {
            heroesFilteredByRole: function () {

                let tanks = this.heroes.filter(hero => { return hero.role === 'tank' })
                tanks.length > 0 ? tanks[tanks.length - 1].last = true : false

                let dpss = this.heroes.filter(hero => { return hero.role === 'dps' })
                dpss.length > 0 ? dpss[dpss.length - 1].last = true : false

                let supports = this.heroes.filter(hero => { return hero.role === 'support' })
                supports.length > 0 ? supports[supports.length - 1].last = true : false

                return [...tanks, ...dpss, ...supports]

            }
        },
        methods: {
            heroSelected(hero) {
                this.$emit('heroSelected', hero)
            }
        }
    }
</script>

<style lang="scss">
    .heroes-list {
        display: flex;

        .hero-card {
            position: relative;
            margin: 0 2px;

            &::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 0;
                display: block;
                width: 110%;
                height: 2px;
                background-color: $color-orange-peel;
            }

            &:first-child {
                margin-left: 0;
            }

            &:last-child {
                margin-right: 0!important;
            }

            .hero {
                position: relative;
                z-index: 2;
            }

            &.separator {
                margin-right: 20px;

                &::after {
                    width: 100%;
                }
            }

        }
    }
</style>
