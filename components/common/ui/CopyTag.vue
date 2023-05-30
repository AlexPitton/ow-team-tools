<template>
    <div ref="tag" class="copy-tag font-mono u-relative" @click="onClick(label)">
        <span>{{label}}</span>
        <svg-icon name="copy" />

        <div ref="tooltip" class="tooltip">
            Copied!
        </div>
    </div>
</template>

<script>
export default {
    name: "CopyTag",
    props: {
        label: String,
    },
    methods: {
        onClick(text) {
            this.$anime({
                targets: this.$refs.tag,
                keyframes: [
                    {scale: 0.95},
                    {scale: 1},
                ],
                duration: '350',
                easings: 'easeOutBack',
                complete: () => {
                    this.$anime({
                        targets: this.$refs.tooltip,
                        keyframes: [
                            {opacity: 1, duration: 0},
                            {opacity: 0, duration: 4000, delay: 1000}
                        ]
                    })
                }
            })

            navigator.clipboard.writeText(text)
        }
    }
}
</script>

<style lang="scss">

.copy-tag {
    display: inline-block;
    padding: 0 20px 0 10px;
    border-radius: 3px;
    background-color: $c-success;
    transition: background-color 250ms $easeInOutSine;

    &:hover {
        background-color: desaturate($c-success, 20%);
        cursor: copy;
    }

    span {
        line-height: 20px;
        font-size: 10px;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.07em;
    }

    svg {
        position: absolute;
        top: 50%;
        right: 5px;
        display: inline-block;
        fill: $c-white;
        width: 10px;
        height: 10px;
        transform: translateY(-50%);

        transition: all 250ms $easeInOutBack;
    }

    .tooltip {
        position: absolute;
        right: 0;
        bottom: -15px;
        text-transform: lowercase;
        font-size: 10px;
        opacity: 0;

        &:first-letter {
            text-transform: uppercase;
        }
    }
}
</style>
