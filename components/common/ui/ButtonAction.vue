<template>
    <button class="t-btn" :class="{disabled : isDisabled}" v-on:click="onClick()">
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
