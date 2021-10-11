<template>
    <div class="header">
        <div class="nav">
            <ul>
                <li>
                    <NuxtLink to="/">Builder</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/compositions">Compositions</NuxtLink>
                </li>
            </ul>
        </div>

        <div class="user">
            <div v-if="$auth.loggedIn">
                <p>Hello {{ $auth.user.username }}</p>
                <NuxtLink to="/dashboard">
                    <div class="user-icon">
                        <svg-icon name="user" />
                    </div>
                </NuxtLink>
                <div class="logout" v-on:click="logout()">
                    <svg-icon name="logout" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Header",
        methods: {
            async logout() {
                try {
                    await this.$auth.logout()
                } catch (error) {
                    this.error = error
                }
            }
        }
    }
</script>

<style lang="scss">
    .header {
        position: relative;
        background-color: $color-orange-peel;
        padding: 0 50px;
        height: 70px;
        border-bottom: 2px solid $color-rich-black;
        display: flex;
        justify-content: space-between;
        align-items: center;


        .user {
            font-weight: 600;
            color: $color-rich-black;

            p {
                display: inline-block;
                vertical-align: middle;
                margin-right: 15px;
            }

            .logout {
                display: inline-block;
                vertical-align: middle;
                cursor: pointer;

                svg {
                    width: 18px;
                    height: 20px;
                }
            }

            .user-icon {
                display: inline-block;
                vertical-align: middle;
                cursor: pointer;
                margin-right: 12px;

                svg {
                    width: 18px;
                    height: 20px;
                }
            }
        }

        .nav {

            ul {
                padding: 0;
                font-size: 0;

                li {
                    position: relative;
                    display: inline-block;
                    vertical-align: bottom;
                    margin-right: 15px;
                }
            }

            a {
                font-size: 14px;
                font-weight: 800;
                text-transform: uppercase;
                text-decoration: none;
                color: $color-rich-black;
            }
        }
    }
</style>
