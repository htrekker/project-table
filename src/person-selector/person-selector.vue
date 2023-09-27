<template>
    <div class="shallow-box-shadow people-selector">
        <div style="">
            <input>
            <div v-for="(person, index) in people" :key="`person-select-${index}`" class="person-item">
                <div style="display: flex;">
                    <div style="border-radius: 50%; width: 50px; height: 50px; background-color: #ddd;"></div>
                    <div>
                        <span style="display: block;">{{ person.name }}</span>
                        <span style="display: block;">{{ person.description }}</span>
                    </div>
                </div>
                <div class="select-button" @click="select(person)">√</div>
            </div>
        </div>
        <div class="selector-separator"></div>
        <div style="min-width: 200px;">
            <div>已选择（{{ selectedPeople.length }}）</div>
            <div v-for="(person, index) in selectedPeople" :key="`person-selected-${index}`"
                style="display: flex; justify-content: space-between; align-items: center; width: 200px;">
                <div style="display: flex;">
                    <div style="border-radius: 50%; width: 50px; height: 50px; background-color: #ddd;"></div>
                    <div>
                        <span style="display: block;">{{ person.name }}</span>
                        <span style="display: block;">{{ person.description }}</span>
                    </div>
                </div>

                <div class="select-button" @click="unselect(person)">x</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PtPersonSelector',
    data() {
        return {
            people: [
                { name: "xxx", description: "xxxxxx" }
            ],
            selectedPeople: []
        }
    },
    methods: {
        select(person) {
            this.selectedPeople.push(person);
        },
        unselect(person) {
            this.selectedPeople.splice(0, 1);
        }
    },
    props: {}
}
</script>

<style scoped>
.shallow-box-shadow {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.people-selector {
    display: flex;
    gap: 5px;
    width: fit-content;
    border: 1px solid #dcdfe6;
    padding: 10px;
}

.selector-separator {
    width: 1px;
    background-color: #999;
}

.select-button {
    padding: 5px;
    width: 20px;
    height: 20px;
    text-align: center;
}

.select-button:hover {
    background-color: #ddd;
    border-radius: 5px;
}

.person-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
