<template>
    <div>
        <p>tag:</p>
        <pt-tag>测试</pt-tag>
        <p>date picker panel:</p>
        <div style="position: relative;">
            <button @click="showDatePickerPanel = !showDatePickerPanel">点击展示日期选择器</button>
            <pt-date-picker v-if="showDatePickerPanel" v-model="date" :disable-date="disabledDate">
                <template #footer>
                    <div>xxxx</div>
                </template>
            </pt-date-picker>
        </div>

        <p>inline input:</p>
        <pt-inline-input v-model="words"></pt-inline-input>

        <p>person picker:</p>
        <div style="position: relative">
            <button @click="showPersonSelector = !showPersonSelector">点击显示人员选择器</button>
            <pt-person-selector></pt-person-selector>
        </div>
    </div>
</template>

<script>
import PtTag from './tag/tag.vue'
import PtDatePicker from './date-picker/date-picker.vue'
import PtInlineInput from './inline-input/inline-input.vue'
import PtPersonSelector from './person-selector/person-selector.vue'

export default {
    data() {
        return {
            date: new Date(),
            showDatePickerPanel: false,
            words: "xxx"
        }
    },
    methods: {
        disabledDate(date) {
            return date.getDate() < 10;
        }
    },
    components: {
        PtTag,
        PtDatePicker,
        PtInlineInput,
        PtPersonSelector
    }
}
</script>

<style scoped></style>
