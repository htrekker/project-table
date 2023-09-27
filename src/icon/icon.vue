<script>
export default {
    name: "PtIcon",
    render(h) {
        const iconClass = `pt-icon-${this.name}`
        return (
            <i class={iconClass}></i>
        )
    },
    props: {
        name: String
    }
}
</script>
