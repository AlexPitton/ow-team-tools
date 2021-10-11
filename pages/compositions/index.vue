<template>
    <div class="page">
        <h1 class="main-title">
            Your team's compositions
        </h1>
        <div class="upcomming-feature">
            <span>
                Upcomming feature
            </span>
            <p>
                In fact this list contains all the compositions created by the players of the team, validated or not. A future feature is coming in which draft and validated compositions will be in separated lists.
            </p>
        </div>

        <div class="composition-filters">
            <p class="sub-title">Filter tools</p>

            <div class="u-flex">
                <div class="filter filter-name">
                    <label for="filter-name">
                        Name
                    </label>
                    <input type="text" id="filter-name" v-model="filters.name" placeholder="Filter by name">
                </div>
                <div class="filter filter-status">
                    <label for="filter-status">
                        Status
                    </label>
                    <select id="filter-status" v-model="filters.status">
                        <option value="">All</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="validated">Validated</option>
                    </select>
                </div>

                <div class="filter filter-map">
                    <label for="filter-map">
                        Map
                    </label>
                    <select id="filter-map" v-model="filters.map">
                        <option value="">All</option>
                        <option v-for="map in maps" :value="map.name" :key="map.id">{{map.name}}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="compositions-list">
            <div class="composition" v-for="compo in filteredComposition" :key="compo.id">
                <div class="composition-header u-flex u-flex-sb">
                    <div>
                        <p class="composition-title">{{compo.name}}</p>
                        <p class="composition-author" v-if="compo.author.username">Created by <span>{{compo.author.username}}</span></p>
                        <Tag :label="compo.status" />
                    </div>
                    <div>
                        <img class="compositon-map" :src="`${$axios.defaults.baseURL}${compo.map.miniature.url}`" :alt="compo.map.name">
                    </div>
                </div>
                <CompositionReadOnly :heroes="compositionHeroes(compo.heroes)" />
                <ButtonAction :label="'See details'" v-on:click="goToComposition(compo.id)" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex"
    import CompositionReadOnly from "@/components/compositions/CompositionReadOnly.vue"
    import ButtonAction from "@/components/common/ui/ButtonAction.vue"
    import Tag from "@/components/common/ui/Tag.vue"

    export default {
        components: {
            CompositionReadOnly,
            ButtonAction,
            Tag
        },
        computed: {
            heroes() {
                return this.$store.state.heroes
            },
            maps() {
                return this.$store.state.maps
            },
            filteredComposition() {
                return this.filterByMap(this.filterByName(this.filterByStatus(this.$store.state.compositions)))
            }
        },
        data() {
            return {
                filters: {
                    name: '',
                    status: '',
                    map: ''
                }
            }
        },
        created() {
            this.getAllCompositions()
            this.getMaps()
        },
        methods: {
            ...mapActions(['getAllCompositions', 'getMaps', 'getHeroes']),
            filterByName(compositions) {
                return compositions.filter(compo => compo.name.toLowerCase().includes(this.filters.name.toLocaleLowerCase()))
            },
            filterByStatus(compositions) {
                return compositions.filter(compo => compo.status.includes(this.filters.status))
            },
            filterByMap(compositions) {
                return compositions.filter(compo => compo.map.name.toLowerCase().includes(this.filters.map.toLowerCase()))
            },
            compositionHeroes(heroes) {
                let sortedArray = {tank: [], dps: [], support: []}

                heroes.forEach( (item) => {
                    let hero = this.heroes.find(x => x.id === item.id)
                    let flex = this.heroes.find(x => x.id === item.flex)

                    if (flex) {
                        hero['flex'] = flex
                    }

                    sortedArray[hero.role].push(hero)
                })

                return [...sortedArray['tank'], ...sortedArray['dps'], ...sortedArray['support']]
            },
            goToComposition(id) {
                this.$router.push({path: `/compositions/${id}`})
            }
        }
    }
</script>

<style lang="scss">

    .composition-filters {

        .sub-title {
            margin-bottom: 20px;
        }
    }

    .compositions-list {
        margin: 50px 0;

        .composition {
            border-left: 5px solid $color-rich-black;
            padding: 25px;
            margin-bottom: 50px;
            background-color: $color-concrete;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            width: 50%;

            .composition-wrapper .hero {
                max-width: 65px;
            }

            .composition-header {
                margin-bottom: 25px;
            }

            .composition-title {
                font-size: 18px;
                font-weight: 800;
                margin-bottom: 5px;
                text-transform: uppercase;
                transform: skew(-10deg);
            }

            .composition-author {
                font-size: 14px;
                font-weight: 400;
                margin-bottom: 10px;
                transform: skew(-10deg);

                span {
                    font-weight: 600;
                }
            }

            .compositon-map {
                max-width: 100px;
                border-radius: 3px;
            }

            .button {
                margin-top: 25px;
            }
        }
    }
</style>
