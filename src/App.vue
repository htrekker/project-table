<template>
    <div>
        <pt-tag>测试</pt-tag>
        <div style="position: relative;">
            <pt-date-picker v-model="date" :disable-date="disabledDate">
                <template #footer>
                    <div>xxxx</div>
                </template>
            </pt-date-picker>
        </div>
    </div>
</template>

<script>
import PtTag from './tag/tag.vue'
import PtDatePicker from './date-picker/date-picker.vue'

export default {
    data() {
        return {
            date: new Date()
        }
    },
    methods: {
        disabledDate(date) {
            return date.getDate() < 10;
        }
    },
    components: {
        PtTag,
        PtDatePicker
    }
}
</script>

<style scoped></style>
