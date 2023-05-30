<template>
    <div class="page">
        <h1 class="font-title u-mb90">
            Your team's compositions
        </h1>

        <div class="composition-filters font-mono u-flex u-align-items-center u-mb30">
            <div class="u-mr30">
                <p class="font-mono">Sort by</p>
            </div>

            <div class="u-flex">
                <div class="filter filter-name u-mr20">
                    <input type="text" id="filter-name" v-model="filters.name" placeholder="Filter by name">
                    <svg-icon name="loupe" />
                </div>
                <div class="filter filter-status u-mr20">
                    <select id="filter-status" v-model="filters.status">
                        <option value="">All status</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="validated">Validated</option>
                    </select>
                </div>

                <div class="filter filter-map u-mr20">
                    <select id="filter-map" v-model="filters.map">
                        <option value="">All maps</option>
                        <option v-for="map in maps.data" :value="map.attributes.name" :key="map.id">{{map.attributes.name}}</option>
                    </select>
                </div>

                <div class="filter filter-map u-mr20">
                    <select id="filter-map" v-model="filters.mapType">
                        <option value="">All map types</option>
                        <option value="Payloads">Payloads</option>
                        <option value="KOTHs">KOTHs</option>
                        <option value="Hybrids">Hybrids</option>
                        <option value="CPs">CPs</option>
                    </select>
                </div>

                <div class="filter filter-author">
                    <select id="filter-user" v-model="filters.user">
                        <option value="">All author</option>
                        <option v-for="user in users" :value="user.username" :key="user.id">{{user.username}}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="compositions-list">
            <div class="composition u-mb25" :class="compo.attributes.status" v-for="compo in filteredComposition" :key="compo.id">
                <div class="composition-header u-flex u-justify-content-between">
                    <div>
                        <p class="composition-title font-base">{{compo.attributes.name}}</p>
                        <p class="composition-author font-base">Created by <span>{{compo.attributes.author.data.attributes.username}}</span></p>
                        <Tag :label="compo.attributes.status" />
                        <Tag :label="compo.attributes.map.data.attributes.name" />
                    </div>
                    <div>
                        <img class="compositon-map" :src="`${$axios.defaults.baseURL}${getCompositionMap(compo)}`">
                    </div>
                </div>
                <CompositionReadOnly :heroes="getCompositionHeroes(compo.attributes.heroes)" />

                <div class="u-flex u-justify-content-end u-mt20">
                    <button class="t-btn t-btn_primary u-ml10" @click="goToComposition(compo.id)">
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
                if (typeof this.$store.state.compositions.data !== 'undefined') {
                    return this.filterByUser(this.filterByMapType(this.filterByMap(this.filterByName(this.filterByStatus(this.$store.state.compositions.data)))))
                }
            }
        },
        data() {
            return {
                filters: {
                    name: '',
                    status: '',
                    map: '',
                    mapType: '',
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
                return compositions.filter(compo => compo.attributes.name.toLowerCase().includes(this.filters.name.toLocaleLowerCase()))
            },
            filterByStatus(compositions) {
                return compositions.filter(compo => compo.attributes.status.includes(this.filters.status))
            },
            filterByMap(compositions) {
                return compositions.filter(compo => compo.attributes.map.data.attributes.name.toLowerCase().includes(this.filters.map.toLowerCase()))
            },
            filterByMapType(compositions) {
                return compositions.filter(compo => compo.attributes.map.data.attributes.type.toLowerCase().includes(this.filters.mapType.toLowerCase()))
            },
            filterByUser(compositions) {
                return compositions.filter(compo => compo.attributes.author.data.attributes.username.toLowerCase().includes(this.filters.user.toLowerCase()))
            },
            getCompositionHeroes(heroes) {
                let sortedArray = {tank: [], dps: [], support: []}

                heroes.forEach( (item) => {
                    let hero = this.heroes.find(x => x.id === item.id)
                    let flex = this.heroes.find(x => x.id === item.flex)

                    if (flex) {
                        hero['flex'] = flex
                    }

                    sortedArray[hero.attributes.role].push(hero)
                })

                return [...sortedArray['tank'], ...sortedArray['dps'], ...sortedArray['support']]
            },
            getCompositionMap(composition) {
                if (typeof this.$store.state.maps.data !== 'undefined') {
                    return this.$store.state.maps.data.find(map => map.id === composition.attributes.map.data.id).attributes.miniature.data.attributes.url
                }
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

            .map-name {
                font-size: 12px;
            }

            .button {
                margin-top: 25px;
            }
        }
    }
</style>
