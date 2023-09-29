<template>
    <div class="inline-input-outline">
        <p v-if="!editable" @click="editContent" class="inline-input-placeholder">{{ value }}</p>
        <input v-else v-model="value" ref="inlineInput" @blur="editable = false" class="inline-input" />
    </div>
</template>

<script>
export default {
    name: 'PtInlineInput',
    data() {
        return {
            editable: false
        }
    },
    methods: {
        editContent() {
            this.editable = true;
            this.$nextTick(() => {
                const input = this.$refs.inlineInput;
                console.log(input);
                input.focus();
            })
        },
    },
    props: {
        value: String
    }
}
</script>
