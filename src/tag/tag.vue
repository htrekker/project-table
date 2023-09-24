<script>
export default {
    name: "pt-tag",
    props: {
        text: String,
        closable: Boolean,
        type: String,
        size: String,
    },
    methods: {
        handleClick(event) {
            this.$emit('click', event);
        }
    },
    render(h) {
        const classes = [
            'pt-tag',
            type ? `pt-tag--${type}` : '',
            size ? `pt-tag--${size}` : '',
        ];
        const ptTag = (
            <span
                class={classes}
                on-click={this.handleClick}>
                {this.$slots.default}
                {
                    this.closable && <i class="pt-icon-close" on-click={this.handleClose}></i>
                }
            </span>
        )

        // Element UI add transitions here, we temporally not support transitions.
        return ptTag;
    }
}
</script>

<style scoped>
.pt-tag {
    border: 1px solid #ddd;
    border-radius: 3px;
}

.pt-tag--primary {
    background-color: #409eff;
    color: white;
    border-color: #409eff;
}

.pt-tag--danger {
    background-color: #f56c6c;
    color: #ffffff;
    border-color: #f56c6c;
}

.pt-tag--success {
    background-color: #67c23a;
    color: #ffffff;
    border-color: #67c23a;
}
</style>