import axios from "axios"

export const state = () => ({
    heroes: [],
    compositions: [],
    userCompositions: [],
    maps: []
})

export const getters = {

    isAuthenticated(state) {
        return state.auth.loggedIn
    },

    loggedInUser(state) {
        return state.auth.user
    },

}

export const mutations = {
    setHeroes(state, heroes) {
        state.heroes = heroes
    },
    setAllCompositions(state, compositions) {
        state.compositions = compositions
    },
    setUserCompositions(state, compositions) {
        state.userCompositions = compositions
    },
    setMaps(state, maps) {
        state.maps = maps
    },
    deleteUserComposition(state, userComposition) {
        let index = state.userCompositions.findIndex( c => c.id === userComposition.id)
        state.userCompositions.splice(index, 1)
    }
}

export const actions = {
    async nuxtServerInit ({commit}) {
        if (this.state.auth.loggedIn) {
            let {data} = await this.$axios.get('/heroes')
            commit('setHeroes', data)
        }
    },
    async getHeroes ({commit}) {
        let {data} = await this.$axios.get('/heroes')
        commit('setHeroes', data)
    },
    async getUserCompositions ({commit}, username) {
        let {data} = await this.$axios.get(`/compositions?author.username=${username}`)
        commit('setUserCompositions', data)
    },
    async getAllCompositions ({commit}) {
        let {data} = await this.$axios.get(`/compositions`)
        commit('setAllCompositions', data)
    },
    async getMaps ({commit}) {
        let {data} = await this.$axios.get(`/maps`)
        commit('setMaps', data)
    }
}
