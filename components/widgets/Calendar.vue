<template>
    <div class="calendar" :class="mode">
        <p class="font-title t-uppercase u-mb20">Calendar</p>
        <div class="week">
            <div
                v-for="(entry, n) in weekPlans"
                class="cell u-relative u-p15 font-mono"
                :class="{'scrim' : entry.session && entry.session.attributes.type === 'scrim', 'match' : entry.session && entry.session.attributes.type === 'match', 'is-today' : entry.day === today}"
                :key="entry.day"
            >
                <p class="day u-mb10">{{ days[n] }} {{ getDate(entry.day) }} {{ getMonth(entry.day) }}</p>
                <div class="informations t-uppercase" v-if="entry.session">
                    <p class="u-mb5">
                        {{entry.session.attributes.hour}}
                    </p>
                    <p>
                        <strong class="fw-bold">{{entry.session.attributes.type}}</strong>
                        VS
                        <strong v-if="entry.session.attributes.opponent" class="fw-bold">{{entry.session.attributes.opponent}}</strong>
                        <strong v-else class="fw-bold">TBD</strong>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Tag from "../common/ui/Tag";
export default {
    components: {Tag},
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

            console.log([year, month, day].join('-'))

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
        }
    }
}
</script>

<style lang="scss">
.calendar {
    overflow: hidden;
    border-radius: 4px;

    &.aside {

        .cell {
            height: 140px;
        }
    }

    .week {
        min-height: 500px;
    }

    .cell {
        background-color: $c-primary-light;
        width: 100%;
        border-bottom: 1px solid $c-primary-lighter;
        color: $c-primary-lighter;

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

            &::before {
                background-color: #0688FF;
            }
        }

        &.match {
            background-color: #FFAC18;
            color: $c-white;

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

        .informations {
            font-size: 14px;
            line-height: 1.3;
            letter-spacing: 0.04em;
        }

        &:last-child {
            border-bottom: none;
        }
    }
}
</style>
