<template>
    <div class="login-page u-flex">

        <div class="user-connect t-white font-mono u-flex u-align-items-center">
            <div class="form-container">
                <p class="font-title-bold form-title">
                    Sign-in to access your <span class="t-outline">team's tools</span>
                </p>

                <p class="t-c_plighter">
                    OwTT is a personnal project. Account creation is currently closed.
                </p>

                <form method="post" @submit.prevent="login">
                    <div class="field-container">
                        <input v-model="email" type="email" class="input" name="email" id="email" required :class="{'has-value' : email}"/>
                        <label class="label" for="email">Email</label>
                        <span class="icon-wrapper">
                            <svg-icon name="paperplane" />
                        </span>
                    </div>
                    <div class="field-container">
                        <input v-model="password" type="password" class="input" name="password" id="password" required :class="{'has-value' : password}"/>
                        <label class="label" for="password">Password</label>
                        <span class="icon-wrapper">
                            <svg-icon name="lock" />
                        </span>
                    </div>
                    <p v-show="error" class="t-error">Invalid credentials.</p>
                    <button type="submit" class="t-btn t-btn_full t-c_white t-bck_tonic">
                        Log in
                    </button>
                </form>
            </div>
        </div>

        <div class="art-splashscreen">
            <img src="https://images.eurogamer.net/2015/articles//a/1/8/4/3/7/0/3/ana_amari_by_re_dye_daa7lhd.jpg.jpg/EG11/resize/690x-1/quality/75/format/jpg" alt="">
        </div>

    </div>
</template>


<script>
    export default {
        data() {
            return {
                email: "",
                password: "",
                error: null
            }
        },
        methods: {
            async login() {
                try {
                    await this.$auth.loginWith('local', {
                        data: {
                            identifier: this.email,
                            password: this.password
                        }
                    })
                } catch (error) {
                    this.error = error
                }
            }
        }
    }
</script>


<style lang="scss" scoped>

    .login-page {
        width: 100%;
        height: 100vh;

        .user-connect {
            width: 35%;
            padding: 0 50px;
            background-color: $c-primary-dark;

            .form-title {
                font-size: 45px;
                line-height: 55px;
                margin-bottom: 25px;
                letter-spacing: 0.04em;
            }

            p {
                font-size: 14px;
                line-height: 24px;
                margin-bottom: 35px;
            }
        }

        .art-splashscreen {
            position: relative;
            width: 65%;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        form {

            .field-container {
                position: relative;
                margin-bottom: 13px;
                overflow: hidden;
            }

            .label {
                position: absolute;
                left: 20px;
                top: 50%;
                font-size: 16px;
                transform: translateY(-50%);
                transition: 300ms $magikMotion;
            }

            .icon-wrapper {
                position: absolute;
                left: 15px;
                top: 50%;
                width: 22px;
                height: 100%;
                transform: translateY(-50%) translateX(-75px);
                transition: 300ms $magikMotion;

                svg {
                    width: 100%;
                    height: 100%;
                }

                svg, path {
                    fill: $c-primary-lighter;
                }
            }

            button {
                margin-top: 50px;
            }

            .input {
                width: 100%;
                padding: 0 20px 0 50px;
                background-color: $c-primary-light;
                color: $c-primary-lighter;
                border-radius: 5px;
                font-family: $font-base;
                font-size: 16px;
                line-height: 50px;

                &:focus {
                    color: $c-white;

                    ~ .icon-wrapper {
                        svg, path {
                            fill: $c-white;
                        }
                    }
                }

                &:focus + .label, &.has-value + .label {
                    transform: translateY(-50%) translateX(75px);
                    opacity: 0;
                }

                &:focus ~ .icon-wrapper, &.has-value ~ .icon-wrapper {
                    transform: translateY(-50%) translateX(0);
                }

                &[type="password"] ~ .icon-wrapper {
                    width: 18px;
                }
            }
        }
    }

</style>
