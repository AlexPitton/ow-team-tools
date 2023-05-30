<template>
    <div class="page dashboard">
        <h1 class="font-title-bold t-white u-mb90">Hello <span class="t-outline">{{$auth.user.username}}</span></h1>

        <SignatureHeroes v-if="userData" :heroes="userData.signatureheroes" />

        <div class="u-flex u-justify-content-between u-relative">
            <div class="u-w70 u-pr20 u-pt20">
                <h2 class="font-title t-white u-mb15">Last compo published</h2>

                <div class="compositions-list u-mb50">
                    <div class="composition u-mb25" :class="compo.attributes.status" v-for="compo in lastCompoPublished" :key="compo.id">
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

                <h2 class="font-title t-white u-mb15">My compositions</h2>

                <div class="composition-filters u-flex u-align-items-center u-mb30">
                    <div class="u-mr30">
                        <p class="font-mono">Sort by</p>
                    </div>

                    <div class="u-flex u-align-items-center">
                        <div class="filter filter-name u-mr20">
                            <input class="font-mono" type="text" id="filter-name" v-model="filters.name" placeholder="Name">
                            <svg-icon name="loupe" />
                        </div>

                        <div class="filter filter-status u-mr20">
                            <select id="filter-status" v-model="filters.status">
                                <option value="">All status</option>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="validated">Validated</option>
                            </select>
                            <svg-icon name="chevron-down" />
                        </div>

                        <div class="filter filter-map u-mr20">
                            <select id="filter-map" v-model="filters.map">
                                <option value="">All maps</option>
                                <option v-for="map in maps" :value="map.name" :key="map.id">{{map.name}}</option>
                            </select>
                            <svg-icon name="chevron-down" />
                        </div>
                    </div>
                </div>

                <div class="compositions-list">
                    <div class="composition u-mb30" :class="compo.attributes.status" v-for="compo in userFilteredComposition" :key="compo.id">
                        <div class="composition-header u-flex u-justify-content-between">
                            <div>
                                <p class="composition-title">{{compo.attributes.name}}</p>
                                <p class="composition-author">Created by <span>{{compo.attributes.author.data.attributes.username}}</span></p>
                                <Tag :label="compo.attributes.status" />
                                <Tag :label="compo.attributes.map.data.attributes.name" />
                            </div>
                            <div>
                                <img class="compositon-map" :src="`${$axios.defaults.baseURL}${getCompositionMap(compo)}`">
                            </div>
                        </div>
                        <CompositionReadOnly :heroes="getCompositionHeroes(compo.attributes.heroes)" />

                        <div class="u-flex u-justify-content-end u-mt20">
                            <button class="t-btn t-btn_primary u-ml10" @click="updateComposition(compo.id)">
                                Update
                            </button>
                            <button class="t-btn t-btn_primary u-ml10" @click="deleteComposition(compo.id)">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dashboard-calendar-container u-w30 u-pl20 u-pt20" :style="`width: ${calendarWidth}px;`">
                <h2 class="font-title t-white u-mb15">Calendar</h2>
                <Calendar :mode="'aside'" :weekDates="weekDates" :sessions="weekSessions"/>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex"
    import CompositionReadOnly from "@/components/compositions/CompositionReadOnly.vue"
    import Tag from "@/components/common/ui/Tag.vue"
    import Calendar from "../../components/widgets/Calendar";
    import SignatureHeroes from "../../components/heroes/SignatureHeroes";

    export default {
        components: {
            SignatureHeroes,
            Calendar,
            CompositionReadOnly,
            Tag
        },
        fetch({store}) {
            let curr = new Date
            let week = []

            for (let i = 1; i <= 7; i++) {
                let first = curr.getDate() - curr.getDay() + i
                let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
                week.push(day)
            }

            return store.dispatch('getDashboard', week)
        },
        computed: {
            heroes() {
                return this.$store.state.heroes
            },
            maps() {
                return this.$store.state.maps
            },
            userFilteredComposition() {
                if (typeof this.$store.state.userCompositions.data !== 'undefined') {
                    return this.filterByMap(this.filterByName(this.filterByStatus(this.$store.state.userCompositions.data)))
                }
            },
            lastCompoPublished() {
                if (typeof this.$store.state.lastComposition.data !== 'undefined') {
                    return this.$store.state.lastComposition.data
                }
            },
            weekDates() {
                return this.$store.state.weekDates
            },
            weekSessions() {
                return this.$store.state.weekSessions
            }
        },
        data() {
            return {
                userData: null,
                filters: {
                    name: '',
                    status: '',
                    map: ''
                },
                calendarWidth: null,
            }
        },
        created() {
            this.$axios.get(`/api/users/me`)
                .then(response => {
                    this.userData = response.data
                    this.getUserCompositions(this.userData.username)
                })
        },
        mounted() {
            this.calendarWidth = document.querySelector('.dashboard-calendar-container').getBoundingClientRect().width
        },
        methods: {
            ...mapActions(['getUserCompositions']),
            filterByName(compositions) {
                return compositions.filter(compo => compo.attributes.name.toLowerCase().includes(this.filters.name.toLocaleLowerCase()))
            },
            filterByStatus(compositions) {
                return compositions.filter(compo => compo.attributes.status.includes(this.filters.status))
            },
            filterByMap(compositions) {
                return compositions.filter(compo => compo.attributes.map.data.attributes.name.toLowerCase().includes(this.filters.map.toLowerCase()))
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
            },
            updateComposition(id) {
                this.$router.push({path: `/compositions/update/${id}`})
            },
            deleteComposition(id) {
                this.$axios
                    .delete(`/api/compositions/${id}`)
                    .then( response => {
                        this.$store.commit('deleteUserComposition', id)
                    })
                    .catch( error => {
                        window.alert("Error : " + error)
                    })
            },
        }
    }
</script>

<style lang="scss" scoped>

    .dashboard-cards {
        display: flex;
    }

    .dashboard {

        .sticky-calendar {
            position: fixed;
            top: 0;
            right: 35px;
        }
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


    .sticky {
        position: -webkit-sticky;
        position: sticky;
        top: 20px;
    }
</style>
