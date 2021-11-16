<template>
    <div class="tag font-mono" :class="label">
        <span>{{label}}</span>
    </div>
</template>

<script>
    export default {
        name: "Tag",
        props: {
            label: String,
        }
    }
</script>

<style lang="scss">

    .tag {
        display: inline-block;
        padding: 0 10px;
        overflow: hidden;
        border-radius: 3px;

        span {
            line-height: 20px;
            font-size: 9px;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.07em;
        }

        &.draft {
            background-color: $color-orange-peel;
        }

        &.published {
            background-color: $color-emerald;
        }

        &.validated {
            background-color: $color-medium-purple;
        }

        &.delete {
            background-color: $color-cinnabar;
        }
    }
</style>
