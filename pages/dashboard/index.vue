<template>
    <div class="page dashboard">
        <h1 class="font-title-bold t-color-white u-mb-90">Hello <span class="t-txt-outline">{{$auth.user.username}}</span></h1>

        <h2 class="font-title t-color-white u-mb-15">Last compo published</h2>

        <div class="compositions-list">
            <div class="composition" :class="compo.status" v-for="compo in lastCompoPublished" :key="compo.id">
                <div class="composition-header u-flex u-justify-content-between">
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

                <div class="u-flex u-mt-20 u-justify-content-end">
                    <button class="t-btn t-btn_primary u-mr-10" @click="goToComposition(compo.id)">
                        See details
                    </button>
                </div>
            </div>
        </div>

        <!--<div class="dashboard-cards">-->
            <!--<div class="card user-details" v-if="userData">-->
                <!--<p class="sub-title">User details</p>-->
                <!--<p>Username : {{userData.username}}</p>-->
                <!--<p>Email (may be a fake email) : {{userData.email}}</p>-->
                <!--<p>Role : {{userData.role.name}}</p>-->
            <!--</div>-->
        <!--</div>-->

        <h2 class="font-title t-color-white u-mb-15">My compositions</h2>

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
            <div class="composition" :class="compo.status" v-for="compo in filteredComposition" :key="compo.id">
                <div class="composition-header u-flex u-justify-content-between">
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

                <div class="u-flex u-justify-content-end u-mt-20">
                    <button class="t-btn t-btn_primary u-ml-10" @click="goToComposition(compo.id)">
                        Update
                    </button>
                    <button class="t-btn t-btn_primary u-ml-10" @click="deleteComposition(compo.id)">
                        Delete
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
            filteredComposition() {
                return this.filterByMap(this.filterByName(this.filterByStatus(this.$store.state.userCompositions)))
            },
            lastCompoPublished() {
                return this.$store.state.lastComposition
            }
        },
        data() {
            return {
                userData: null,
                filters: {
                    name: '',
                    status: '',
                    map: ''
                }
            }
        },
        created() {
            this.getMaps()
            this.getLastComposition()
            this.$axios.get(`/users/me`)
                .then(response => {
                    this.userData = response.data
                    this.getUserCompositions(this.userData.username)
                })
        },
        methods: {
            ...mapActions(['getUserCompositions', 'getLastComposition', 'getMaps']),
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
            },
            deleteComposition(id) {
                this.$axios
                    .delete(`/compositions/${id}`)
                    .then( response => {
                        this.$store.commit('deleteUserComposition', id)
                    })
                    .catch( error => {
                        window.alert("Error : " + error)
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>

    .dashboard-cards {
        display: flex;
    }

    .user-details {
        background-color: $color-concrete;
        padding: 30px;
        border-radius: 6px;
        margin: 25px 0;

        p {
            font-size: 15px;
            line-height: 25px;
        }
    }

</style>
