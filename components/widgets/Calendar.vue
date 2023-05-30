<template>
    <div class="calendar" :class="mode">
        <div class="week">
            <div
                v-for="(entry, n) in weekPlans"
                class="cell u-relative u-p15 font-mono"
                :class="{'scrim' : entry.session && entry.session.attributes.type === 'scrim', 'match' : entry.session && entry.session.attributes.type === 'match', 'is-today' : entry.day === today}"
                @click="onCellClicked()"
                :key="entry.day"
            >
                <p class="day u-mb10">{{ days[n] }} {{ getDate(entry.day) }} {{ getMonth(entry.day) }}</p>
                <div class="event" v-if="entry.session">
                    <p class="u-mb5 t-uppercase">
                        {{entry.session.attributes.hour}}
                    </p>
                    <p class="t-uppercase">
                        <strong class="fw-bold">{{entry.session.attributes.type}}</strong>
                        VS
                        <strong v-if="entry.session.attributes.opponent" class="fw-bold">{{entry.session.attributes.opponent}}</strong>
                        <strong v-else class="fw-bold">TBD</strong>
                    </p>
                    <div v-if="mode !== 'aside'">
                        <div class="u-mt10">
                            <CopyTag v-if="entry.session.attributes.btag" :label="entry.session.attributes.btag" />
                        </div>
                        <div v-if="entry.session.attributes.information" class="informations u-mt30">
                            <p class="informations-title t-uppercase u-mb5">Infos :</p>
                            <div v-html="entry.session.attributes.information"></div>
                        </div>
                    </div>
                    <div v-else class="see-more">
                        <svg-icon name="loupe" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Tag from "../common/ui/Tag";
import CopyTag from "../common/ui/CopyTag";
export default {
    components: {CopyTag, Tag},
    props: {
        mode: String,
        sessions: Object,
        weekDates: Array
    },
    computed: {
        weekPlans() {
            let array = []

            this.weekDates.forEach((day) => {
                let entry = {day: day}
                this.sessions.data.forEach((session) => {
                    if (session.attributes.date === day) {
                        entry = {day: day, session : session}
                    }
                })
                array.push(entry)
            })

            return array
        },
        today() {
            let d = new Date()

            let year = d.getFullYear()
            let month = '' + (d.getMonth() + 1)
            let day = '' + d.getDate()

            if (month.length < 2)
                month = '0' + month
            if (day.length < 2)
                day = '0' + day

            return [year, month, day].join('-')
        }
    },
    data() {
        return {
            days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    },
    methods: {
        getDate(date) {
            return new Date(date).getDate()
        },
        getMonth(date) {
            return this.month[new Date(date).getMonth()]
        },
        onCellClicked() {
            if (this.mode === 'aside') {
                this.$router.push('/planning')
            }
        }
    }
}
</script>

<style lang="scss">
.calendar {

    .week {
        border-radius: 4px;
        overflow: hidden;
    }

    .cell {
        background-color: $c-primary-light;
        width: 100%;
        border-bottom: 1px solid $c-primary-lighter;
        color: $c-primary-lighter;
        transition: background-color 250ms $easeInOutSine;

        &.scrim, &.match, &.vod {
            cursor: pointer;
        }

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            background-color: transparent;
            width: 7px;
            height: 100%;
        }

        &.scrim {
            background-color: #3373B9;
            color: $c-white;

            &:hover {
                background-color: saturate(#3373B9, 15%);
            }

            &::before {
                background-color: #0688FF;
            }
        }

        &.match {
            background-color: desaturate(#FFAC18, 15%);
            color: $c-white;

            &:hover {
                background-color: #FFAC18;
            }

            &::before {
                background-color: #FFC700;
            }
        }

        &.is-today {

            @keyframes pulsate-bck{0%{transform:scale(1)}50%{transform:scale(.8)}100%{transform:scale(1)}}

            &::after {
                content: '';
                position: absolute;
                display: block;
                top: 10px;
                right: 10px;
                width: 10px;
                height: 10px;
                background-color: $c-error;
                border-radius: 50%;
                animation: pulsate-bck 2.5s cubic-bezier(.39,.575,.565,1.000) infinite both;
            }
        }

        .day {
            font-size: 12px;
            line-height: 1;
        }

        .event {
            font-size: 14px;
            line-height: 1.3;
            letter-spacing: 0.04em;

            .informations {

                ul {
                    list-style-type: disc;
                    padding-left: 13px;
                }
            }

            .informations-title {
                font-size: 12px;
                letter-spacing: normal;
                font-weight: 700;
            }
        }

        &:last-child {
            border-bottom: none;
        }
    }

    &.aside {
        .week {
            display: flex;
            flex-direction: column;

            .cell {
                min-height: 10vh;

                &:hover {
                    .see-more {
                        transform: scale(1.2);
                    }
                }

                .see-more {
                    position: absolute;
                    bottom: 10px;
                    right: 15px;
                    transition: 500ms cubic-bezier(0.89,-0.5, 0.21, 1.77);

                    svg {
                        width: 15px;
                        height: 15px;
                        fill: $c-white;
                    }
                }
            }
        }
    }

    &.full {
        width: 100%;

        .week {
            display: flex;
            width: 100%;
            min-height: 400px;

            .cell {
                border-bottom: none;
                border-right: 1px solid $c-primary-lighter;

                .event {
                    font-size: 12px;
                }

                &:last-child {
                    border-right: none;
                }

                &::before {
                    width: 100%;
                    height: 7px;
                }

                &.is-today {

                    &::after {
                        top: 15px;
                    }
                }
            }
        }
    }

}
</style>
