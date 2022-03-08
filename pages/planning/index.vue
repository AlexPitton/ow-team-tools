<template>
    <div class="page">
        <h1 class="font-title-bold u-mb50">Weekly <span class="t-outline t-white">schedule</span></h1>

        <div class="calendar-container">
            <Calendar :mode="'aside'" :weekDates="weekDates" :sessions="weekSessions"/>
        </div>
    </div>
</template>

<script>
import Calendar from "../../components/widgets/Calendar";
export default {
    components: {Calendar},
    fetch({store}) {
        let curr = new Date
        let week = []

        for (let i = 1; i <= 7; i++) {
            let first = curr.getDate() - curr.getDay() + i
            let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
            week.push(day)
        }

        return store.dispatch('getWeekSessions', week)
    },
    computed: {
        weekDates() {
            return this.$store.state.weekDates
        },
        weekSessions() {
            return this.$store.state.weekSessions
        }
    }
}
</script>

<style lang="scss">
.calendar-container {
    width: 380px;
}
</style>
