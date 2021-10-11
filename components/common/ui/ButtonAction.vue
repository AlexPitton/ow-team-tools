<template>
    <button class="button" :class="{disabled : isDisabled}" v-on:click="onClick()">
        {{label}}
    </button>
</template>

<script>
    export default {
        props: {
            label: String,
            isDisabled: Boolean
        },
        methods: {
            onClick() {
                if (!this.isDisabled) {
                    this.$emit('click')
                }
            }
        }
    }
</script>

<style lang="scss">

    .button {
        display: inline-block;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;

        text-transform: uppercase;
        line-height: 30px;
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 0.03em;
        padding: 0 15px;

        border-radius: 3px;
        background-color: $color-blue-crayola;
        color: $color-white;

        cursor: pointer;

        &.success {
            background-color: $color-emerald;
            color: $color-white;
        }

        &.disabled {
            opacity: 0.4;

            &:hover {
                cursor: not-allowed;
            }
        }
    }

</style>
