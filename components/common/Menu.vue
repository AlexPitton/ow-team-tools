<template>
    <div class="menu-container u-relative" :class="{'extended' : extended}">
        <div class="extend-btn" @click="toggleExpandMenu">
            <div class="chevron">
                <svg width="1em" height="1em" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="sc-hrjYtz sc-fDZUdJ iKEgYX FsTpe"><path d="M9.88 14.12L3.773 8 9.88 1.88 8 0 0 8l8 8 1.88-1.88z"></path></svg>
            </div>
        </div>
        <div class="menu">
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

                    <div class="nav-item">
                        <NuxtLink class="u-flex u-align-items-center" to="/roster">
                            <div class="menu-icon">
                                <svg-icon name="team" />
                            </div>
                            <p class="font-base fw-semibold">Roster</p>
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

    .menu-container {
        position: fixed;
        z-index: 888;
        left: 0;
        top: 0;
        bottom: 0;
        height: 100vh;
        width: 60px;

        transition: all 400ms $magikMotion;

        &.extended {
            width: 220px;
            transition: all 400ms $magikMotion;

            .nav p {
                opacity: 1;
                transform: translateX(0);
                transition: all 450ms $authenticMotion 100ms;
            }


            .extend-btn {
                position: absolute;
                right: 10px;

                .chevron {

                    svg {
                        transform: scale(1);
                    }
                }

            }
        }
    }

    .extend-btn {
        position: absolute;
        z-index: 20;
        bottom: 20px;
        right: -9px;
        width: 18px;
        height: 25px;
        border: 1px solid $c-primary-lighter;
        background-color: $c-primary-light;
        border-radius: 4px;
        cursor: pointer;
        transition: all 450ms $authenticMotion;

        .chevron {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 6px;
            height: 9px;
            transform: translate(-50%, -50%);

            svg {
                position: absolute;
                top: 0;
                left: 0;
                fill: $c-white;
                width: 6px;
                height: 9px;
                transform: scale(-1);
            }
        }
    }

    .menu {
        position: absolute;
        z-index: 10;
        left: 0;
        top: 0;
        bottom: 0;

        height: 100%;
        padding-top: 100px;
        background: $c-primary-light;

        overflow: hidden;
        width: 100%;

        .menu-content-wrapper {
            width: 220px;
            height: 100%;
        }

        .nav {
            .nav-item {
                position: relative;
                margin-bottom: 40px;
                cursor: pointer;

                & > a, & > div {
                    padding: 0 23px 0 19px;
                    text-decoration: none;
                    color: $c-white;
                }
            }

            .menu-icon {
                position: relative;
                width: 22px;
                height: 22px;

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
                font-size: 12px;
                opacity: 0;
                transform: translateX(-25px);
                transition: transform 450ms $authenticMotion, opacity 150ms $authenticMotion;
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
    }
</style>
