<template>
    <div class="page">
        <h1 class="font-title">
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

        <div class="composition-filters font-mono">
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

                <div class="filter filter-map">
                    <label for="filter-user">
                        Author
                    </label>
                    <select id="filter-user" v-model="filters.user">
                        <option value="">All</option>
                        <option v-for="user in users" :value="user.username" :key="user.id">{{user.username}}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="compositions-list">
            <div class="composition u-mb-25" :class="compo.status" v-for="compo in filteredComposition" :key="compo.id">
                <div class="composition-header u-flex u-justify-content-between">
                    <div>
                        <p class="composition-title font-base">{{compo.name}}</p>
                        <p class="composition-author font-base" v-if="compo.author.username">Created by <span>{{compo.author.username}}</span></p>
                        <Tag :label="compo.status" />
                    </div>
                    <div>
                        <img class="compositon-map" :src="`${$axios.defaults.baseURL}${compo.map.miniature.url}`" :alt="compo.map.name">
                    </div>
                </div>
                <CompositionReadOnly :heroes="compositionHeroes(compo.heroes)" />

                <div class="u-flex u-justify-content-end u-mt-20">
                    <button class="t-btn t-btn_primary u-ml-10" @click="goToComposition(compo.id)">
                        See details
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex"
    import CompositionReadOnly from "@/components/compositions/CompositionReadOnly.vue"
    import Tag from "@/components/common/ui/Tag.vue"

    export default {
        components: {
            CompositionReadOnly,
            Tag
        },
        computed: {
            heroes() {
                return this.$store.state.heroes
            },
            maps() {
                return this.$store.state.maps
            },
            users() {
                return this.$store.state.users
            },
            filteredComposition() {
                return this.filterByUser(this.filterByMap(this.filterByName(this.filterByStatus(this.$store.state.compositions))))
            }
        },
        data() {
            return {
                filters: {
                    name: '',
                    status: '',
                    map: '',
                    user: ''
                }
            }
        },
        created() {
            this.getAllCompositions()
            this.getMaps()
            this.getUsers()
        },
        methods: {
            ...mapActions(['getAllCompositions', 'getMaps', 'getHeroes', 'getUsers']),
            filterByName(compositions) {
                return compositions.filter(compo => compo.name.toLowerCase().includes(this.filters.name.toLocaleLowerCase()))
            },
            filterByStatus(compositions) {
                return compositions.filter(compo => compo.status.includes(this.filters.status))
            },
            filterByMap(compositions) {
                return compositions.filter(compo => compo.map.name.toLowerCase().includes(this.filters.map.toLowerCase()))
            },
            filterByUser(compositions) {
                return compositions.filter(compo => compo.author.username.toLowerCase().includes(this.filters.user.toLowerCase()))
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

        .composition {
            border-left: 5px solid;
            padding: 25px;
            background-color: rgba(255,255,255, 0.1);
            border-radius: 5px;
            width: 50%;

            &.draft {border-color: $c-tonic;}
            &.published {border-color: $color-emerald;}
            &.validated {border-color: $color-medium-purple;}

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
            }

            .composition-author {
                font-size: 14px;
                font-weight: 400;
                margin-bottom: 10px;

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
