<template>
    <div class="heroes-list u-flex u-justify-content-between u-align-items-start">
        <div class="role-list role-tank u-flex u-flex-wrap u-justify-content-end u-align-items-start">
            <svg-icon name="tank" />
            <div class="hero-card" v-for="hero in heroesFilteredByRole.tanks" :key="hero.id">
                <Hero
                    @heroClicked="heroSelected(hero)"
                    :hero="hero"
                    :isRoleLocked="lockedRole.includes(hero.attributes.role)"
                    :isSelected="heroesSelection.includes(hero)"
                    :flexModeRole="flexModeRole"
                    :flexMode="flexMode"
                />
            </div>
        </div>
        <div class="role-list role-dps u-flex u-flex-wrap u-justify-content-center u-align-items-start">
            <svg-icon name="damage" />
            <div class="hero-card" v-for="hero in heroesFilteredByRole.dpss" :key="hero.id">
                <Hero
                    @heroClicked="heroSelected(hero)"
                    :hero="hero"
                    :isRoleLocked="lockedRole.includes(hero.attributes.role)"
                    :isSelected="heroesSelection.includes(hero)"
                    :flexModeRole="flexModeRole"
                    :flexMode="flexMode"
                />
            </div>
        </div>
        <div class="role-list role-support u-flex u-flex-wrap u-justify-content-start u-align-items-start">
            <svg-icon name="support" />
            <div class="hero-card" v-for="hero in heroesFilteredByRole.supports" :key="hero.id">
                <Hero
                    @heroClicked="heroSelected(hero)"
                    :hero="hero"
                    :isRoleLocked="lockedRole.includes(hero.attributes.role)"
                    :isSelected="heroesSelection.includes(hero)"
                    :flexModeRole="flexModeRole"
                    :flexMode="flexMode"
                />
            </div>
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
                let tanks = this.heroes.filter(hero => { return hero.attributes.role === 'tank' })

                let dpss = this.heroes.filter(hero => { return hero.attributes.role === 'dps' })

                let supports = this.heroes.filter(hero => { return hero.attributes.role === 'support' })

                let obj = {
                    "tanks": tanks,
                    "dpss": dpss,
                    "supports": supports
                }

                return obj
            },
            lockedRole: function () {
                return this.$store.state.lockedRole
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

        .role-list {
            gap: 4px;
            position: relative;

            .icon {
                position: absolute;
                display: block;
                top: -20px;
                left: 50%;
                width: 25px;
                height: 25px;
                fill: $c-secondary;
                transform: translateY(-100%) translateX(-50%);
                border: 1px solid $c-secondary;
                border-radius: 50%;
            }

            &::before {
                content: '';
                position: absolute;
                top: -10px;
                left: 0;
                right: 0;
                width: 100%;
                height: 2px;
                border-radius: 3px;
                background-color: $c-tonic;
            }
        }

        .role-dps {
            width: 40%;
        }
        .role-support, .role-tank {
            width: 25%;
        }

        .hero-card {
            position: relative;
            width: 50px;

            &:hover {
                z-index: 111;
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

        }
    }
</style>
