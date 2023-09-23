<template>
    <span class="badge">
        <slot></slot>
    </span>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {

    },
    props: {
        type: {
            type: String,
            validation: function () {
                return ["danger", "warn", "primary", "info"].includes("");
            }
        },
        color: {
            type: String,
            required: false,
        }
    }
}
</script>

<style scoped>
.badge {
    color: white;
    padding: 5px 2px;
    border-radius: 3px;

    border: 1px solid #ddd;
}

.danger {
    background-color: red !important;
    border: 1px solid red;
}

.warn {
    background-color: yellow !important;
    border: 1px solid yellow;
}

.info {
    background-color: grey !important;
    border: 1px solid grey;
}
</style>