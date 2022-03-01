export const state = () => ({
    // CONF
    isTouchEnabled: null,
    isPortrait: null,
    maxHeroes: 6,
    // API
    heroes: [],
    compositions: [],
    lastComposition: [],
    publishedComposition: [],
    userCompositions: [],
    maps: [],
    users: [],
    countCompositions: null,
    // CLIENT
    heroesSelection: [],
    lockedRole: []
})

export const getters = {

    isAuthenticated(state) {
        return state.auth.loggedIn
    },

    loggedInUser(state) {
        return state.auth.user
    },

    getHeroesSelection: (state) => {
        return state.heroesSelection
    }

}

export const mutations = {
    // CONF
    onResize(state) {
        state.isTouchEnabled = ( 'ontouchstart' in window ) || ( navigator.maxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 )
        state.isPortrait = window.innerHeight > window.innerWidth
    },
    // API
    setHeroes(state, heroes) {
        state.heroes = heroes.data.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name))
    },
    setAllCompositions(state, compositions) {
        state.compositions = compositions
    },
    setCountCompositions(state, count) {
        state.countCompositions = count
    },
    setPublishedComposition(state, compositions) {
        state.publishedComposition = compositions
    },
    setLastComposition(state, composition) {
        state.lastComposition = composition
    },
    setUserCompositions(state, compositions) {
        state.userCompositions = compositions
    },
    setMaps(state, maps) {
        state.maps = maps
    },
    setUsers(state, users) {
        state.users = users
    },
    deleteUserComposition(state, userComposition) {
        let index = state.userCompositions.findIndex( c => c.id === userComposition.id)
        state.userCompositions.splice(index, 1)
    },
    // CLIENT
    addHeroToSelection(state, hero) {
        state.heroesSelection.push(hero)
    },
    removeHeroFromSelection(state, hero) {
        state.heroesSelection[state.heroesSelection.indexOf(hero)]['flex'] = null
        state.heroesSelection.splice(state.heroesSelection.indexOf(hero), 1)
        state.lockedRole = state.lockedRole.filter( (value) => { return value !== hero.attributes.role })
    },
    addFlexHero(state, data) {
        // let d = state.heroesSelection.find( obj => {return obj === data.flexTarget})['flex'] = [data.hero]
        state.heroesSelection[state.heroesSelection.indexOf(data.flexTarget)]['flex'] = data.hero
    },
    lockRole(state, role) {
        state.lockedRole.push(role)
    }
}

export const actions = {
    async nuxtServerInit ({commit}) {
        if (this.state.auth.loggedIn) {
            let {data} = await this.$axios.get('/api/heroes?populate=*')
            commit('setHeroes', data)
        }
    },
    async getHeroes ({commit}) {
        let {data} = await this.$axios.get('/api/heroes?populate=*')
        commit('setHeroes', data)
    },
    async getUserCompositions ({commit}, username) {
        let {data} = await this.$axios.get(`/compositions?author.username=${username}`)
        commit('setUserCompositions', data)
    },
    async countCompositions ({commit}) {
        let {data} = await this.$axios.get(`/compositions/count`)
        commit('setCountCompositions', data)
    },
    async getAllCompositions ({commit}) {
        let {data} = await this.$axios.get(`/compositions?_sort=updated_at:DESC`)
        commit('setAllCompositions', data)
    },
    async getLastComposition ({commit}) {
        let {data} = await this.$axios.get(`/compositions?status=published&_sort=updated_at:DESC&_limit=1`)
        commit('setLastComposition', data)
    },
    async getPublishedComposition ({commit}) {
        let {data} = await this.$axios.get(`/compositions?status=published&_sort=updated_at:DESC`)
        commit('setPublishedComposition', data)
    },
    async getMaps ({commit}) {
        let {data} = await this.$axios.get(`/api/maps?populate=*`)
        commit('setMaps', data.data)
    },
    async getUsers ({commit}) {
        let {data} = await this.$axios.get(`/users`)
        commit('setUsers', data)
    }
}

