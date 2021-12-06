<template>
    <client-only placeholder="loading...">
        <ckeditor-nuxt v-model="contentHolder" :config="editorConfig" @input="onEditorInput"  />
    </client-only>
</template>

<script>
    export default {
        components: {
            'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
        },
        props: {
            data: String,
        },
        data() {
            return {
                editorConfig: {
                    placeholder: "You can leave it blank but it's a shame ... :(",
                    removePlugins: [
                        'Title'
                    ],
                    toolbar: {
                        items: [
                            'heading',
                            '|',
                            'alignment',
                            '|',
                            'fontSize',
                            'fontColor',
                            'fontBackgroundColor',
                            '|',
                            'bold',
                            'italic',
                            'underline',
                            'strikethrough',
                            'link',
                            '|',
                            // 'subscript',
                            // 'superscript',
                            // 'specialCharacters',
                            '|',
                            'bulletedList',
                            'numberedList',
                            'todoList',
                            'indent',
                            'outdent',
                            '|',
                            // 'horizontalLine',
                            // 'blockQuote',
                            // 'htmlEmbed',
                            'mediaEmbed',
                            // 'codeBlock',
                            // 'code',
                            // 'insertTable',
                            '|',
                            // 'exportPdf',
                            'removeFormat',
                        ]
                    },
                    mediaEmbed : {
                        previewsInData : true
                    },
                    simpleUpload: {
                        uploadUrl: 'path_to_image_controller',
                        headers: {
                            'Authorization': 'optional_token'
                        }
                    }
                },
                contentHolder: this.data
            }
        },
        computed: {
            ckcontent: function () {
                return this.data
            }
        },
        methods: {
            onEditorInput() {
                this.$emit('onChange', this.contentHolder)
            }
        }
    }
</script>

<style lang="scss">
    .ck-content {
        font-family: $font-mono;
        font-size: 16px;
        line-height: 26px;
        height: 350px;
        color: $c-black;

        p {
            margin: 15px 0;
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

        ul {
            padding-left: 40px;
            list-style-type: disc;
        }

        ol {
            padding-left: 40px;
        }

    }

    .ck.ck-editor__editable > .ck-placeholder::before {
        color: $c-black;
        font-size: 12px;
        font-family: "Courier", monospace;
    }
</style>
