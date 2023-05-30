<script>
export default {
    name: 'HeroSelected',
    props: {
        hero: Object,
        isDisabled: Boolean,
    },
    data() {
        return {
            isFlexModeActive: false
        }
    },
    computed: {
        heroPortrait: function () {
            return this.hero.attributes.portrait.data.attributes.url
        }
    },
    methods: {
        removeHeroClickHandler() {
            this.$store.commit('removeHeroFromSelection', this.hero)
        },
        activeFlexMode() {
            this.$emit('activeFlexMode', this.hero)
            this.isFlexModeActive = !this.isFlexModeActive
        },
        deactivateFlexMode() {
            this.isFlexModeActive = false
        }
    }
}
</script>

<template>
    <div class="hero" :class="{'flex-mode-active' : isFlexModeActive}">
        <div class="portrait-container">
            <img :src="`${$axios.defaults.baseURL}${heroPortrait}`">
            <span class="cross" @click="removeHeroClickHandler()">
                <svg-icon name="bin" />
            </span>
            <span
                title="Add flexible picks"
                class="flex"
                @click="activeFlexMode()"
            >
                <svg-icon name="flex" />
            </span>
        </div>
        <div class="flex-heroes">
            <div v-if="hero.flex">
                <img :src="`${$axios.defaults.baseURL}${hero.flex.attributes.portrait.data.attributes.url}`">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .hero {
        position: relative;
        transition: opacity 80ms $authenticMotion, transform 80ms $authenticMotion;
        will-change: auto;

        @keyframes hero-in {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        @keyframes flex-hero-in {
            from {
                opacity: 0;
                transform: translateY(-40%);
            }
            to {
                opacity: 1;
                transform: translateY(-50%);
            }
        }


        &.flex-mode-active {

            .portrait-container {
                &::before {
                    opacity: 1;
                }
            }
        }

        .portrait-container {
            position: relative;
            border-radius: 3px;
            overflow: hidden;
            background-color: $c-primary-lighter;

            img {
                opacity: 0;
                animation: hero-in 650ms $authenticMotion 200ms forwards;
                background-color: transparent;
            }

            &::after {
                content: '';
                display: block;
                position: absolute;
                z-index: 1;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(15,15,15, 0.25);
                opacity: 0;
                transition: opacity 250ms $easeInOutCubic;
            }

            &::before {
                content: '';
                box-sizing: border-box;
                display: block;
                position: absolute;
                z-index: 1;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                box-shadow: inset 0px 0px 9px 4px rgba(255,155,0,1);
                opacity: 0;

                transition: all 350ms $easeInOutCirc;
            }

        }

        &:hover {
            .portrait-container::after, .cross, .flex {
                opacity: 1;
            }

            .flex-heroes div {
                height: 100px;
            }
        }

        .portrait-container {
            position: relative;
            display: block;
            width: 100%;
        }

        &.disabled {
            filter: grayscale(1);
            opacity: 0.5;
            cursor: default;

            &:hover {
                transform: scale(1)!important;
            }
        }

        .cross {
            position: absolute;
            z-index: 2;
            top: 7px;
            right: 5px;
            width: 15px;
            height: 15px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 150ms $easeInOutCubic;

            svg {
                display: block;
                width: 15px;
                height: 15px;
                fill: $color-white;
            }

        }

        .flex {
            position: absolute;
            z-index: 2;
            bottom: 6px;
            left: 6px;
            display: block;
            opacity: 0;
            transition: opacity 150ms $easeInOutCubic;
            cursor: pointer;

            &.active {

                svg {
                    fill: $color-orange-peel;
                }
            }

            svg {
                display: block;
                width: 20px;
                height: 20px;
                fill: $color-white;
            }
        }

        .flex-heroes {

            div {
                position: relative;
                margin-top: 5px;
                border-radius: 7px;
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

                    opacity: 0;
                    background-color: #dadada!important;
                    animation: flex-hero-in 650ms $authenticMotion 200ms forwards;
                }
            }
        }
    }
</style>
