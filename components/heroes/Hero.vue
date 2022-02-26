<template>
    <div @click="heroClickHandler()" class="hero" :class="{'role-locked' : isRoleLocked, 'flex-mode-active' : flexModeRole === hero.attributes.role && flexMode, 'is-selected' : isSelected}">
        <div class="portrait-container">
            <img :src="`${$axios.defaults.baseURL}${heroPortrait}`" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Hero',
        props: {
            hero: Object,
            isRoleLocked: Boolean,
            isSelected: Boolean,
            flexMode: Boolean,
            flexModeRole: String,
            static: Boolean
        },
        computed: {
            heroPortrait: function () {
                return this.hero.attributes.portrait.data.attributes.url
            }
        },
        methods: {
            heroClickHandler: function () {
                if (this.flexModeRole !== this.hero.attributes.role && this.flexMode) {
                    return
                }

                if (!this.isSelected) {
                    this.$emit('heroClicked')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hero {
        border-radius: 3px;
        background-color: $c-white;

        overflow: hidden;
        cursor: pointer;
        transition: transform 80ms $authenticMotion, opacity 150ms $authenticMotion, filter 150ms $authenticMotion;
        will-change: auto;

        .portrait-container {
            position: relative;
            display: block;
            width: 100%;
        }

        &:hover {
            transform: scale(1.4);
        }

        &.role-locked {
            filter: grayscale(1);
            opacity: 0.8;
            cursor: not-allowed;

            &:hover {
                transform: scale(1);
            }
        }


        &.is-selected {
            filter: grayscale(1)!important;
            opacity: 0.25!important;
            cursor: not-allowed!important;

            &:hover {
                transform: scale(1)!important;
            }
        }

        &.flex-mode-active {
            filter: none;
            opacity: 1;
            cursor: pointer!important;

            &:hover {
                transform: scale(1.3);
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
                }
            }
        }
    }
</style>
