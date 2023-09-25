<template>
    <div class="pt-calendar">
        <div v-if="$slots.footer" class="pt-calendar-aside">
            <slot name="footer"></slot>
        </div>
        <div class="pt-calendar-main">
            <div class="pt-calendar-header">
                <div class="pt-calendar-shortcut">
                    <i class="pt-icon-d-arrow-left" @click="previousYear">x</i>
                    <i class="pt-icon-arrow-left" @click="previousMonth">x</i>
                </div>
                <p style="font-size: 18px;">{{ currentYear }} 年&nbsp;&nbsp;{{ currentMonth + 1 }} 月</p>
                <div class="pt-calendar-shortcut">
                    <i class="pt-icon-arrow-right" @click="nextMonth">x</i>
                    <i class="pt-icon-d-arrow-right" @click="nextYear">x</i>
                </div>
            </div>
            <div class="pt-calendar-body">
                <table class="pt-calendar-table">
                    <thead style="border-bottom: 1px solid #ddd;">
                        <tr role="row">
                            <th v-for="(day, index) in daysInWeek" :key="`pt-calendar-head-${index}`" role="column"
                                class="pt-calendar-column-header">
                                <span>{{ day }}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="pt-calendar-tbody">
                        <tr v-for="(dayInWeek, weekIndex) in daysInMonth" :key="`pt-calendar-row-${weekIndex}`" role="row">
                            <td role="gridcell" v-for="(day, dayIndex) in dayInWeek" :key="`pt-calendar-cell-${dayIndex}`"
                                class="pt-calendar-cell"
                                :class="{ 'disabled': disableDate(day.date), 'today': _isToday(day.date) }">
                                <div class="pt-calendar-date"
                                    :class="{ 'selected-date': day.selected, 'not-current-month': !day.isCurMonth }"
                                    @click="selectDate(day)">
                                    {{ day.date.getDate() }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { last } from 'lodash/array'
export default {
    name: 'PtDatePicker',
    data() {
        return {
            daysInWeek: ["日", "一", "二", "三", "四", "五", "六"],
            currentYear: this.value.getFullYear(),
            currentMonth: this.value.getMonth(),
            currentDate: this.value.getDate(),
        }
    },
    methods: {
        previousYear() {
            this.currentYear -= 1;
        },
        previousMonth() {
            if (this.currentMonth === 0) {
                this.currentYear -= 1;
                this.currentMonth = 11;
            } else {
                this.currentMonth -= 1;
            }
        },
        nextMonth() {
            if (this.currentMonth === 11) {
                this.currentYear += 1;
            }
            this.currentMonth = (this.currentMonth + 1) % 12;
        },
        nextYear() {
            this.currentYear += 1;
        },
        selectDate(selected) {
            if (selected.isDisabled) {
                return;
            }
            this.$emit("input", selected.date);
            console.log(this.value);
        },
        _getDayByOffset(date, offset) {
            let dayInMills = 24 * 60 * 60 * 1000;
            return new Date(date.getTime() + dayInMills * offset);
        },
        _appendToDayGrid(grid, date) {
            if (last(grid).length === 7) {
                grid.push([]);
            }
            last(grid).push(date);
        },
        _isToday(date) {
            let now = new Date();
            return now.toDateString() === date.toDateString()
        }
    },
    computed: {
        today() {
            let now = new Date();
            console.log(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
            return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        },
        daysInMonth() {
            let daysInMonth = [[]];
            let dayCount = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            let firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
            // append visible last month days
            for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
                this._appendToDayGrid(daysInMonth, {
                    isCurMonth: false,
                    date: this._getDayByOffset(firstDayOfMonth, -i),
                    selected: false,
                });
            }
            // append days in current Month
            for (let i = 0; i < dayCount; i++) {
                let date = this._getDayByOffset(firstDayOfMonth, i);
                // console.log(date);
                this._appendToDayGrid(daysInMonth, {
                    isCurMonth: true,
                    date: date,
                    // selected: date === modelValue,
                });
            }
            // append days in next month
            let lastDayOfMonth = new Date(this.currentYear, this.currentMonth, dayCount);
            for (let i = lastDayOfMonth.getDay() + 1, j = 1; i < 7; i++, j++) {
                this._appendToDayGrid(daysInMonth, {
                    isCurMonth: false,
                    date: this._getDayByOffset(lastDayOfMonth, j),
                    selected: false,
                });
            }

            return daysInMonth;
        }
    },
    props: {
        value: Date,
        disableDate: {
            type: Function,
            default: () => true
        }
    },
}
</script>

<style scoped>
.pt-calendar {
    display: flex;

    border: 1px solid #dcdfe6;
    border-radius: 3px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    margin-top: 7px;

    background-color: #fff;
    z-index: 9999;
}

.pt-calendar-aside {
    border-right: 1px solid #dcdfe6;
    width: 100px;
    padding-top: 5px;
}

.pt-calendar-main {
    display: flex;
    flex-direction: column;
}

.pt-calendar-header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    border-bottom: 1px solid #dcdfe6;
}

.pt-calendar-table {
    border-collapse: collapse;
}

.pt-calendar-body {
    flex: 1;
    margin: 20px;
}

.pt-calendar-tbody {
    padding: 10px;
}

.pt-calendar-column-header {
    line-height: 40px;
    padding: 5px;
    text-align: center;
    width: 40px;
}

.pt-calendar-cell {
    padding: 2px 0;
    text-align: center;
    cursor: pointer;
    line-height: 30px;
}

.pt-calendar-cell.disabled {
    color: #999;
    background-color: #ddd;
}

.pt-calendar-cell.disabled:hover {
    color: #999;
    cursor: not-allowed;
}

.pt-calendar-cell .selected-date {
    border-radius: 14px;
    background-color: #999;
    color: white;
}

.pt-calendar-cell:hover {
    color: aqua;
}

.pt-calendar-cell.today {
    color: aqua;
    font-weight: 400;
}

.pt-calendar-cell .not-current-month {
    color: #999;
}

.pt-calendar-date {
    margin: 0 2px;
    width: 40px;
}

.pt-calendar-cell .selected-date:hover {}
</style>
