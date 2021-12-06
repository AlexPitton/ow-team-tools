<template>
    <div class="composition-builder" :class="{'show-error' : send}">

        <h1 class="main-title">
            Composition builder
        </h1>

        <div class="heroes-list-container">
            <HeroesList
                @heroSelected="setHero"
                :heroes="heroes"
                :heroesSelection="heroesSelection"
                :lockedRole="lockedRole"
                :flexMode="flexMode"
                :flexModeRole="flexModeRole"
            />
        </div>

        <div class="composition-container">
            <Composition
                :heroes="heroesSelection"
                :valid="heroesSelection >= 6"
                @heroRemoved="removeHero"
                @flexRemoved="removeFlex"
                @flexModeRequested="onFlexModeRequested"
                ref="composition"
            />
        </div>

        <div class="form-container">

            <div class="map-selector">
                <p class="sub-title">
                    Choose a map
                </p>

                <MapSelect :data="maps" @mapSelected="onMapSelected" />
            </div>

            <div class="field-container">
                <input type="text" name="title" id="title" v-model="form.name" :class="{hasvalue : form.name}" required>
                <label class="label" for="title">Name your composition</label>
            </div>

            <div class="editor-container">
                <p>Add more details</p>
                <p class="hint">
                    A good composition is a composition that makes sense! So don't hesitate to explain here the strong points, the weak points, the victory conditions, the ultimate rotations...
                </p>
                <Editor @onChange="onEditorChange" />
            </div>

            <button class="t-btn t-btn_primary" :class="{'disabled' : heroesSelection.length !== 6 || !form.name || !form.map}" @click="sendComposition">
                Save composition
            </button>

            <p class="message success" v-if="success">Your composition have been successfully saved !</p>
            <p class="message error" v-if="error">Oops something went wrong on API side, please contact your administrator.</p>
        </div>

    </div>
</template>

<script>
    import { mapActions } from "vuex"
    import Composition from "@/components/compositions/Composition.vue"
    import HeroesList from "@/components/heroes/HeroesList.vue"
    import Editor from "@/components/common/form/Editor.vue"
    import MapSelect from "@/components/common/form/MapSelect.vue"

    export default {
        name: 'CompositionBuilder',
        components: {
            Composition,
            HeroesList,
            Editor,
            MapSelect
        },
        data() {
            return {
                maxHeroes: 6,
                heroesSelection: [],
                lockedRole: [],
                flexMode: false,
                flexModeRole: '',
                flexModeHeroIndex: null,
                flexTarget: null,
                form: {
                    name: '',
                    description: '',
                    map: null
                },
                send: false,
                success: false,
                error: false,
                errorMessage: ''
            }
        },
        computed: {
            heroes: function () {
                return this.$store.state.heroes
            },
            maps: function () {
                return this.$store.state.maps
            }
        },
        methods: {
            ...mapActions(['getHeroes', 'getMaps']),
            /**
             * callback when a hero is clicked from HeroesList
             * Most of the conditions are done beforehand but I still do a review of the conditions before sending the object to its final table
             * to avoid having unwanted data
             * @param hero : Object : Hero object
             */
            setHero(hero) {

                // Check if flexMode is active
                if (this.flexMode) {
                    this.heroesSelection.find( obj => {return obj === this.flexTarget})['flex'] = [hero]
                    this.flexMode = !this.flexMode
                    this.flexModeRole = ''

                    this.$refs.composition.flexHasBeenSelected()
                } else {
                    // Check if composition is full, hero is already picked, there already 2 of each role
                    if (this.heroesSelection.length >= this.maxHeroes || this.heroesSelection.includes(hero) || this.lockedRole.find(i => i === hero.role)) {
                        return;
                    }

                    // Only 2 of each role, check if role exist, if so add that role in lockedRole
                    if (this.heroesSelection.find(item => item.role === hero.role)) {
                        this.lockedRole.push(hero.role)
                    }

                    this.heroesSelection.push(hero)
                }

            },
            /**
             * Triggered when hero needs to be removed from Composition
             * @param hero : Object : Hero object
             */
            removeHero(hero) {
                // First, reset flex property
                this.heroesSelection[this.heroesSelection.indexOf(hero)]['flex'] = null
                this.heroesSelection.splice(this.heroesSelection.indexOf(hero), 1)
                this.lockedRole = this.lockedRole.filter( (value) => { return value !== hero.role })
            },
            /**
             * Triggered when flex hero needs to be removed from Composition
             * @param hero : Object : Hero object
             */
            removeFlex(hero) {
                // TODO c'est bug ca, ca marche mais le Composition refait pas le render parce que Vue n'a pas détecté de changement
                this.heroesSelection[this.heroesSelection.indexOf(hero)]['flex'] = null
            },
            /**
             * Active/re-Active HeroesList base on role.
             * Basicly, Sometimes for the same position, several heroes can be played.
             * User might needs to associate other heroes to the same position.
             * @param object : Object {role, index}
             */
            onFlexModeRequested(object) {
                this.flexMode = !this.flexMode
                this.flexModeRole = object.role
                this.flexModeHeroIndex = object.index
                this.flexTarget = object.hero
            },
            onMapSelected(map) {
                this.form.map = map
            },
            onEditorChange(data) {
                this.form.description = data
            },
            /**
             * Send Composition data in a valid format for Strapi API
             */
            sendComposition() {

                if (this.success)
                    return

                let heroesListFormated = []

                this.heroesSelection.forEach( (hero) => {
                    let obj = {}
                    if (hero.flex) {
                        obj = {id: hero.id, flex: hero.flex[0].id}
                    } else {
                        obj = {id: hero.id, flex: null}
                    }
                    heroesListFormated.push(obj)
                })

                let formData = {
                    author: this.$auth.user,
                    name: this.form.name,
                    description: this.form.description,
                    map: this.form.map,
                    heroes: heroesListFormated,
                    status: "draft"
                }

                this.$axios.post('/compositions',
                    formData
                )
                    .then( response => {
                        this.success = true
                    })
                    .catch(error => {
                        this.error = true
                        this.errorMessage = error
                    })

            }
        },
        mounted() {
            // Get heroes if store is empty when you came from login page, see vuex store nuxtServerInit hook
            if (this.$store.state.heroes.length < 1) {
                this.getHeroes()
            }
            this.getMaps()
        }
    }
</script>

<style lang="scss">

    .composition-builder {

        .heroes-list-container {
            margin-top: 30px;
            margin-bottom: 50px;
        }

        .editor-container {
            margin-bottom: 25px;

            & > p {
                font-size: 18px;
                font-family: "Courier", monospace;
                margin-bottom: 15px;

                &.hint {
                    font-size: 12px;
                    font-style: italic;
                    font-weight: bold;
                    max-width: 450px;
                }
            }
        }

        .message {
            margin: 15px 0;
        }
    }



</style>
