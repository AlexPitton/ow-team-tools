<template>
    <div class="calendar" :class="mode">
        <div class="week">
            <div class="cell u-relative u-p15">
                <span class="day">Mon</span>
            </div>
            <div class="cell u-relative u-p15">
                <span class="day">Tue</span>
                <div class="event">

                </div>
            </div>
            <div class="cell u-relative u-p15">
                <span class="day">Wed</span>
            </div>
            <div class="cell u-relative u-p15">
                <span class="day">Thu</span>
            </div>
            <div class="cell u-relative u-p15">
                <span class="day">Fri</span>
            </div>
            <div class="cell u-relative u-p15">
                <span class="day">Sat</span>
            </div>
            <div class="cell u-relative u-p15">
                <span class="day">Sun</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        mode: String,
    }
}
</script>

<style lang="scss">
.calendar {
    overflow: hidden;
    border-radius: 10px;

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

        &:last-child {
            border-bottom: none;
        }

        .day {
            color: $c-primary-lighter;
        }
    }
}
</style>
