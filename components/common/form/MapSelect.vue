<template>
    <div class="map-custom-select">
        <div class="selected" @click="open = !open">
            <div class="u-relative">
                <img v-if="selected" :src="`${$axios.defaults.baseURL}${selected.attributes.miniature.data.attributes.url}`">
                <div v-else class="img-placeholder"></div>

                <span v-if="selected" class="selected-name">{{ selected.attributes.name }}</span>
                <span v-else class="selected-name">None</span>
            </div>
        </div>
        <div class="items-container" :class="{open : open}">
            <ul class="items">
                <li class="item" @click=onChange(null)>
                    <div class="img-placeholder"></div>
                    <span class="map-name">None</span>
                </li>
                <li class="item" v-for="map in data" :key="map.id" @click=onChange(map)>
                    <img :src="`${$axios.defaults.baseURL}${map.attributes.miniature.data.attributes.url}`" :alt="map.name">
                    <span class="map-name">{{ map.attributes.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: []
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
        cursor: pointer;

        .selected {
            font-weight: 600;
            display: inline-block;
            border-radius: 3px;
            overflow: hidden;


            .selected-name {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                display: block;
                padding: 5px 0;
                text-align: center;
                //text-transform: uppercase;
                font-size: 14px;
                background: rgb(12,90,77);
                background: linear-gradient(180deg, rgba(12,90,77,0) 0%, rgba(0,0,0,0.5032606792717087) 100%);
            }

            img, .img-placeholder {
                width: 100px;
                background-color: rgba(255,255,255, 0.3);

                @include aspect-ratio(100,63)
            }
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

            background-color: $c-primary-light;

            transition: all 350ms $authenticMotion;

            img {
                width: 100px;
                border-radius: 3px;
                margin-right: 10px;
                background-color: $color-concrete;

                @include aspect-ratio(100,63)
            }

            &.open {
                height: 400px;
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
                background-color: $c-primary-lighter;
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
