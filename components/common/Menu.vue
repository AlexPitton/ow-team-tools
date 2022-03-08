<template>

    <div class="menu" :class="{'extended' : extended}" @mouseenter="toggleExpandMenu" @mouseleave="toggleExpandMenu">
        <div class="menu-content-wrapper u-flex u-flex-direction-column u-justify-content-between">

            <div class="nav primary-nav">
                <div class="nav-item">
                    <NuxtLink class="u-flex u-align-items-center" to="/dashboard">
                        <div class="menu-icon">
                            <svg-icon name="mosaicboard" />
                        </div>
                        <p class="font-base fw-semibold">Dashboard</p>
                    </NuxtLink>
                </div>
                <div class="nav-item">
                    <NuxtLink class="u-flex u-align-items-center" to="/builder">
                        <div class="menu-icon builder">
                            <svg-icon name="forge-2" />
                        </div>
                        <p class="font-base fw-semibold">Builder</p>
                    </NuxtLink>
                </div>
                <div class="nav-item">
                    <NuxtLink class="u-flex u-align-items-center" to="/compositions">
                        <div class="menu-icon">
                            <svg-icon name="cards" />
                        </div>
                        <p class="font-base fw-semibold">Compositions</p>
                    </NuxtLink>
                </div>

                <div class="nav-item">
                    <NuxtLink class="u-flex u-align-items-center" to="/planning">
                        <div class="menu-icon">
                            <svg-icon name="calendar" />
                        </div>
                        <p class="font-base fw-semibold">Planning</p>
                    </NuxtLink>
                </div>

                <div class="nav-item">
                    <NuxtLink class="u-flex u-align-items-center" to="/replays">
                        <div class="menu-icon">
                            <svg-icon name="calendar" />
                        </div>
                        <p class="font-base fw-semibold">Replays</p>
                    </NuxtLink>
                </div>
            </div>

            <div class="nav bottom-nav">
                <div class="nav-item">
                    <div class="u-flex u-align-items-center" @click="logout()">
                        <div class="menu-icon">
                            <svg-icon name="logout" />
                        </div>
                        <p class="font-base fw-semibold">Disconect</p>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>

    export default {
        name: "Menu",
        data() {
            return {
                extended: false
            }
        },
        methods: {
            async logout() {
                try {
                    await this.$auth.logout()
                } catch (error) {
                    this.error = error
                }
            },
            toggleExpandMenu() {
                this.extended = !this.extended
            }
        }
    }
</script>

<style lang="scss">

    .menu {
        position: fixed;
        z-index: 888;
        left: 0;
        top: 0;
        bottom: 0;

        height: 100vh;
        padding-top: 100px;
        background: $c-primary-light;

        overflow: hidden;
        width: 70px;
        perspective: 1000;
        transition: all 400ms $magikMotion;

        .menu-content-wrapper {
            width: 240px;
            height: 100%;
        }

        &.extended {
            width: 240px;
            transition: all 400ms $magikMotion;

            .nav p {
                opacity: 1;
                transform: translateX(0);
                transition: all 450ms $authenticMotion;
            }
        }

        .nav {
            .nav-item {
                position: relative;
                margin-bottom: 40px;
                cursor: pointer;

                & > a, & > div {
                    padding: 0 23px 0 23px;
                    text-decoration: none;
                    color: $c-white;
                }
            }

            .menu-icon {
                position: relative;
                width: 24px;
                height: 24px;

                svg {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100%;
                    height: 100%;
                    transform: translate(-50%, -50%);
                }

                svg {
                    fill: $c-white;
                }
            }

            p {
                margin-left: 15px;
                font-size: 14px;
                opacity: 0;
                transform: translateX(-25px);
                transition: all 250ms $authenticMotion;
            }
        }

        .primary-nav {

            a {

                &::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    display: block;
                    width: 4px;
                    height: 0;
                    background-color: $c-tonic;
                    border-top-right-radius: 6px;
                    border-bottom-right-radius: 6px;
                    transform: translateY(-50%);
                    transition: 150ms $easeInCirc;
                }

                &:hover::before {
                    height: 50%;
                    transition: 250ms $easeOutCirc;
                }

                &.nuxt-link-active::before {
                    height: 150%;
                }
            }


        }

        .bottom-nav {

        }
    }
</style>
