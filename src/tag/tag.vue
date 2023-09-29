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
