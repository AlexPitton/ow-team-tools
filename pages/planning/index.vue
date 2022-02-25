<template>
    <div class="page">
        <h1 class="font-title">Weekly <span class="t-outline t-white">schedule</span></h1>

        <div class="calendar-container">
            <Calendar :mode="'aside'"/>
        </div>
    </div>
</template>

<script>
import Calendar from "../../components/widgets/Calendar";
export default {
    components: {Calendar}
}
</script>

<style lang="scss">
.calendar-container {
    width: 380px;
}
</style>
