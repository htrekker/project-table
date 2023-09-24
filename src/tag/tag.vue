<script>
export default {
    name: "PtTag",
    props: {
        text: String,
        closable: Boolean,
        type: String,
        size: String
    },
    methods: {
        handleClick(event) {
            this.$emit('click', event);
        }
    },
    render(h) {
        const { type, size } = this;
        const classes = [
            'pt-tag',
            type ? `pt-tag--${type}` : '',
            size ? `pt-tag--${size}` : ''
        ]
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
    display: inline-block;
    padding: 0 10px;
    font-size: 13px;
    border: 1px solid #ccc;
    border-radius: 10px;
    line-height: 20px;
    height: 22px;
    box-sizing: border-box;
    white-space: nowrap;
    background-color: #eee;
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
