<template>
    <div class="map-custom-select">
        <div class="selected" @click="open = !open">
            <div v-if="selected">
                <img :src="`${$axios.defaults.baseURL}${selected.miniature.url}`">
                <span>{{ selected.name }}</span>
            </div>
            <div v-else>
                <div class="img-placeholder"></div>
                <span>No map selected</span>
            </div>
        </div>
        <div class="items-container" :class="{open : open}">
            <ul class="items">
                <li class="item" @click=onChange(null)>
                    <div class="img-placeholder"></div>
                    <span class="map-name">None</span>
                </li>
                <li class="item" v-for="map in data" :key="map.id" @click=onChange(map)>
                    <img :src="`${$axios.defaults.baseURL}${map.miniature.url}`" :alt="map.name">
                    <span class="map-name">{{ map.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: Array
        },
        data() {
            return {
                selected: null,
                open: false
            }
        },
        methods: {
            onChange(map) {
                this.selected = map
                this.open = !this.open
                this.$emit('mapSelected', map)
            }
        }
    }
</script>

<style lang="scss">

    .map-custom-select {
        position: relative;
        margin: 15px 0;
        cursor: pointer;

        .selected {
            font-weight: 600;

            div {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding-left: 10px;
            }
        }

        img, .img-placeholder {
            width: 100px;
            border-radius: 3px;
            margin-right: 10px;
            background-color: $color-concrete;

            @include aspect-ratio(100,63)
        }

        .items-container {
            position: absolute;
            z-index: 10;
            top: 80px;
            left: 0;
            width: 100%;
            height: 0;
            overflow: hidden;
            border-radius: 8px;

            background-color: $color-concrete;

            transition: all 350ms $authenticMotion;

            &.open {
                height: 300px;
            }
        }

        .items {
            height: 100%;
            overflow-y: scroll;
        }

        .item {
            padding: 10px 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 8px;

            &:hover {
                background-color: rgba(255,255,255, 0.8);
            }

            img, .img-placeholder {
                width: 80px;
                border-radius: 3px;
                margin-right: 10px;
                background-color: gainsboro;
            }

            .map-name {
                font-weight: 600;
                font-size: 14px;
            }
        }
    }

</style>
