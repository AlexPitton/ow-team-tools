<template>
    <div>
        <Menu v-if="$auth.loggedIn" />
        <Nuxt :class="{'menu-extended' : menuExtended}"/>
    </div>
</template>

<script>
    import Menu from "@/components/common/Menu.vue"

    export default {
        components: {
            Menu
        },
        data() {
            return {
                menuExtended: false
            }
        }
    }
</script>
