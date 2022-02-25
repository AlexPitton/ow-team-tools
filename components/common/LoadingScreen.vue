<template>
    <transition name="loaded">
        <div v-if="loading" class="loading-screen">
            <div class="loader u-flex u-justify-content-center">

                <svg xmlns="http://www.w3.org/2000/svg" width="850" height="850" viewBox="0 0 850 850">
                    <path d="M334.145 358.92c-2.7 1.56-7.12 1.56-9.82 0l-77.152-44.545c-2.7-1.56-4.91-5.386-4.91-8.504v-89.086c0-3.118 2.21-6.945 4.91-8.504l77.154-44.545c2.7-1.56 7.12-1.56 9.82 0l77.152 44.544c2.7 1.558 4.91 5.385 4.91 8.503v89.09c0 3.117-2.21 6.944-4.91 8.503l-77.155 44.544z"/>
                    <path d="M521.262 359.014c-2.7 1.56-7.12 1.56-9.82 0L434.29 314.47c-2.7-1.56-4.91-5.387-4.91-8.505v-89.087c0-3.118 2.208-6.945 4.91-8.504l77.153-44.545c2.7-1.56 7.12-1.56 9.82 0l77.152 44.542c2.7 1.56 4.91 5.386 4.91 8.504v89.09c0 3.117-2.21 6.944-4.91 8.503l-77.153 44.544z"/>
                    <path d="M614.9 521.2c-2.7 1.56-7.118 1.56-9.818 0l-77.153-44.543c-2.7-1.56-4.91-5.386-4.91-8.504v-89.088c0-3.118 2.208-6.945 4.91-8.504l77.153-44.544c2.7-1.56 7.12-1.56 9.82 0l77.15 44.544c2.7 1.56 4.91 5.386 4.91 8.504v89.09c0 3.117-2.208 6.943-4.91 8.503L614.902 521.2z"/>
                    <path d="M521.424 683.294c-2.7 1.56-7.12 1.56-9.82 0l-77.153-44.545c-2.7-1.56-4.91-5.387-4.91-8.505v-89.088c0-3.118 2.21-6.944 4.91-8.504l77.156-44.543c2.7-1.56 7.12-1.56 9.82 0l77.15 44.543c2.7 1.56 4.91 5.386 4.91 8.504v89.09c0 3.118-2.208 6.944-4.91 8.504l-77.152 44.544z"/>
                    <path d="M333.73 683.534c-2.7 1.56-7.118 1.56-9.818 0L246.76 638.99c-2.7-1.56-4.91-5.385-4.91-8.503v-89.09c0-3.118 2.21-6.944 4.91-8.504l77.153-44.543c2.7-1.56 7.12-1.56 9.82 0l77.152 44.543c2.7 1.56 4.91 5.386 4.91 8.504v89.088c0 3.118-2.21 6.944-4.91 8.504l-77.154 44.544z"/>
                    <path d="M240.09 521.345c-2.7 1.56-7.118 1.56-9.818 0l-77.153-44.543c-2.7-1.56-4.91-5.386-4.91-8.504V379.21c0-3.118 2.21-6.945 4.91-8.504l77.153-44.545c2.7-1.558 7.12-1.558 9.82 0l77.152 44.545c2.7 1.56 4.91 5.386 4.91 8.504v89.088c0 3.118-2.21 6.944-4.91 8.504l-77.154 44.543z"/>
                    <path d="M427.785 521.106c-2.7 1.56-7.12 1.56-9.82 0l-77.152-44.545c-2.7-1.56-4.91-5.385-4.91-8.503V378.97c0-3.118 2.21-6.945 4.91-8.504l77.153-44.545c2.7-1.558 7.12-1.558 9.82 0l77.153 44.545c2.7 1.56 4.91 5.386 4.91 8.504v89.087c0 3.118-2.21 6.944-4.91 8.504l-77.155 44.546z"/>
                </svg>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'LoadingScreen',
        data: () => ({
            loading: false
        }),
        methods: {
            start() {
                this.loading = true
            },
            finish() {
                window.setTimeout( () => {
                    this.loading = false
                }, 500)
            }
        }
    }
</script>

<style lang="scss" scoped>

    .loaded-leave-active {
        transition: all 450ms $authenticMotion;
    }
    .loaded-leave-to {
        opacity: 0;
    }

    .loading-screen {
        position: fixed;
        z-index: 777;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: $c-primary-lighter;
    }


    .loader {

        @keyframes hexa-animation {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            15%, 50% {
                transform: scale(0.5);
                opacity: 0;
            }
            65% {
                transform: scale(1);
                opacity: 1;
            }
        }

        svg {
            width: 300px;
            fill: $c-white;

            path {
                transform-origin: 50% 50%;

                &:nth-child(1) {
                    transform-origin: 39% 30%;
                }
                &:nth-child(2) {
                    transform-origin: 62% 30%;
                }
                &:nth-child(3) {
                    transform-origin: 70% 50%;
                }
                &:nth-child(4) {
                    transform-origin: 62% 70%;
                }
                &:nth-child(5) {
                    transform-origin: 39% 70%;
                }
                &:nth-child(6) {
                    transform-origin: 30% 50%;
                }
            }

            @for $i from 0 through 6  {
               path:nth-child( #{$i + 1} ){
                   animation: hexa-animation 3000ms $authenticMotion #{$i * 220}ms infinite;
               }
            }
        }
    }

</style>
