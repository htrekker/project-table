<template>
    <div class="pt-calendar">
        <div v-if="$slots.options" class="pt-calendar-aside">
            <slot name="options"></slot>
        </div>
        <div v-else-if="shortcut" style="display: flex; flex-direction: column; gap: 10px; padding: 20px 20px; border-right: 1px solid #ddd;">
            <button>上个月</button>
            <button @click="gotoToday">今天</button>
            <button>下个月</button>
        </div>
        <div class="pt-calendar-main">
            <div class="pt-calendar-header">
                <div class="pt-calendar-shortcut">
                    <i class="pt-icon-double-left" @click="previousYear"></i>
                    <i class="pt-icon-arrow-left" @click="previousMonth"></i>
                </div>
                <p style="font-size: 18px;">{{ currentYear }} 年&nbsp;&nbsp;{{ currentMonth + 1 }} 月</p>
                <div class="pt-calendar-shortcut">
                    <i class="pt-icon-arrow-right" @click="nextMonth"></i>
                    <i class="pt-icon-double-right" @click="nextYear"></i>
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
                                :class="{ 'disabled': day.isDisabled, 'today': _isToday(day.date) }">
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
        gotoToday() {
            let now = new Date();
            let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            this.currentYear = today.getFullYear();
            this.currentMonth = today.getMonth();
            this.currentDate = today.getDate();
            this.$emit("input", today);
        },
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
            this.currentYear = selected.date.getFullYear();
            this.currentMonth = selected.date.getMonth();
            this.currentDate = selected.date.getDate();
            this.$emit("input", selected.date);
            // console.log(selected.date);
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
        },
        _isSameDay(d1, d2) {
            return d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
        }
    },
    computed: {
        today() {
            let now = new Date();
            console.log(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
            return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        },
        daysInMonth() {
            console.log(this.value);
            let daysInMonth = [[]];
            let dayCount = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            let firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
            // append visible last month days
            for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
                let date = this._getDayByOffset(firstDayOfMonth, -i);
                this._appendToDayGrid(daysInMonth, {
                    isCurMonth: false,
                    date: date,
                    selected: false,
                    isDisabled: this.disableDate(date)
                });
            }
            // append days in current Month
            for (let i = 0; i < dayCount; i++) {
                let date = this._getDayByOffset(firstDayOfMonth, i);
                // console.log(date);
                this._appendToDayGrid(daysInMonth, {
                    isCurMonth: true,
                    date: date,
                    selected: this._isSameDay(date, this.value),
                    isDisabled: this.disableDate(date)
                });
            }
            // append days in next month
            let lastDayOfMonth = new Date(this.currentYear, this.currentMonth, dayCount);
            for (let i = lastDayOfMonth.getDay() + 1, j = 1; i < 7; i++, j++) {
                let date = this._getDayByOffset(lastDayOfMonth, j);
                this._appendToDayGrid(daysInMonth, {
                    isCurMonth: false,
                    date: date,
                    selected: false,
                    isDisabled: this.disableDate(date)
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
        },
        shortcut: {
            type: Boolean,
            default: true,
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

.pt-calendar-shortcut i:hover {
    cursor: pointer;
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
    line-height: 40px;
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
    border-radius: 50%;
    background-color: #ccc;
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
