<template>
    <div class="page single-composition">

        <h1 class="font-title-bold t-color-white u-mb-90">
            {{composition.name}}
        </h1>

        <div class="u-flex u-justify-content-center u-mb-50">
            <div class="composition">
                <CompositionReadOnly :heroes="compositionHeroes(composition.heroes)" />
            </div>
        </div>

        <Editor :data="composition.description" @onChange="onEditorChange" />

        <button class="t-btn t-btn_primary u-mt-30" @click="updateComposition(composition.id)">
            Update composition
        </button>

    </div>
</template>

<script>
    import CompositionReadOnly from "@/components/compositions/CompositionReadOnly.vue"
    import Editor from "@/components/common/form/Editor.vue"

    export default {
        components: {
            CompositionReadOnly,
            Editor
        },
        computed: {
            heroes() {
                return this.$store.state.heroes
            },
            maps() {
                return this.$store.state.maps
            }
        },
        data() {
            return {
                form: {
                    description: this.description
                },
                success: false,
                error: false,
                errorMessage: ''
            }
        },
        async asyncData({params, $axios}) {
            const composition = await $axios.$get(`/compositions/${params.id}`)
            return {composition}
        },
        methods: {
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

                return [...sortedArray['tank'], ...sortedArray['dps'],...sortedArray['support']]
            },
            onEditorChange(data) {
                this.form.description = data
            },
            updateComposition(id) {

                let formData = {
                    description: this.form.description
                }

                this.$axios.put(`/compositions/${id}`, formData).then( response => { this.success = true}).catch( error => {this.error = true; this.errorMessage = error} )

            }
        }
    }
</script>

<style lang="scss">

    .single-composition {

        .composition {
            display: inline-block;
            background-color: rgba(255,255,255, 0.1);
            border-radius: 6px;
            padding: 25px;
        }

        .description-container {
            background-color: $c-primary-light;
            border-radius: 6px;
            padding: 25px;

            p {
                margin: 15px 0;

                .text-tiny {font-size: 10px;}
                .text-small {font-size: 12px;}
                .text-big {font-size: 21px;}
                .text-huge {font-size: 32px;}
            }

            strong {
                font-weight: 600;
            }

            i {
                font-style: italic;
            }

            u {
                text-decoration: underline;
            }

            s {
                text-decoration: line-through;
            }

            ul, ol {
                padding-left: 40px;
            }

            ul {
                list-style-type: disc;
            }

            figure.media {
                max-width: 720px;
            }
        }
    }

</style>
