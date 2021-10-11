<template>
    <div class="login-page">

        <div class="form-container">
            <p>
                Please log in to access your team's tools.
            </p>
            <form method="post" @submit.prevent="login">
                <div class="field-container">
                    <input v-model="email" type="email" class="input" name="email" id="email" :class="{hasvalue : email}"/>
                    <label class="label" for="email">Email</label>
                </div>
                <div class="field-container">
                    <input v-model="password" type="password" class="input" name="password" id="password" :class="{hasvalue : password}"/>
                    <label class="label" for="password">Password</label>
                </div>
                <div class="control">
                    <button type="submit" class="button is-dark">
                        Log in
                    </button>
                </div>
            </form>
        </div>

    </div>
</template>


<script>
    import axios from 'axios'

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
        background-color: $color-concrete;
        width: 100%;
        height: 100vh;
        text-align: center;

        display: flex;
        justify-content: center;
        align-items: center;


        p {
            font-weight: 800;
            font-size: 35px;
            line-height: 45px;
            margin-bottom: 50px;
        }

        .form-container {
            position: relative;
            background-color: $color-concrete;
            color: $color-rich-black;
            padding: 50px;
            max-width: 450px;
            box-shadow: 0 0 8px #8c8c8c;
            overflow: hidden;

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                display: block;
                width: 100%;
                height: 4px;
                background-color: $color-blue-crayola;
            }
        }
    }

    .field-container {
        position: relative;
        margin-bottom: 25px;

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 100%;
            height: 1px;
            background-color: $color-rich-black;
            display: block;
        }
    }

    input, select {
        font-family: "Courier", monospace;
        font-weight: 100;
        appearance: none;
        background: none;
        border: none;
        width: 100%;
        height: 25px;
        font-size: 14px;
        line-height: 25px;
        outline: none;
        color: $color-rich-black;
    }

    input:focus + label {
        top: -18px;
        font-size: 10px;
    }

    input.hasvalue + label {
        top: -18px;
        font-size: 10px;
    }

    .label {
        position: absolute;
        left: 2px;
        top: 0;
        font-size: 14px;
        line-height: 25px;
        font-family: "Courier", monospace;
        transition: all 250ms $magikMotion;
    }

    button {
        display: block;
        width: 100%;
        background-color: $color-blue-crayola;
        margin-top: 50px;

        font-size: 18px;
        font-weight: 600;
        line-height: 45px;
        color: $color-concrete;

        border: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 6px;
    }



</style>
