import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  private daysOfMonth: DaysOfMonth

  constructor() { }

  ngOnInit() {
    this.daysOfMonth = new DaysOfMonth(2018, 8)
    console.log(this.daysOfMonth)
  }
}

class DaysOfMonth {
  year: number
  month: number
  days: number
  firstDay: number
  weeks: Array<any>
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  constructor(year: number, month: number) {
    this.days = new Date(year, month + 1, 0).getDate()
    this.firstDay = new Date(year, month, 1).getDay()
    this.year = year
    this.month = month
    this.weeks = this.getWeeksInMonth()
  }

  private getWeeksInMonth() {
    const year = this.year
    const month = this.month
    const numDays = this.days
    const weeks = []

    let start = 1
    let end = 7 - this.firstDay
    let dayStart = this.firstDay
    while (start <= numDays) {
      // console.log({ start: start, end: end, dayStart: dayStart })
      weeks.push(this.generateWeek(start, end, dayStart))
      dayStart = 0
      start = end + 1
      end = end + 7
      if (end > numDays) {
        end = numDays
      }
    }
    return weeks
  }
  private generateWeek(start: number, end: number, dayStart: number): Array<any> {
    const week = []
    const daynames = this.dayNames
    for (let i = 0; i < 7; i++) {
      if (i < dayStart || start > end) {
        week.push({ name: daynames[i], day: 0 })
      } else {
        week.push({ name: daynames[i], day: start })
        start++
      }
    }
    return week
  }
}
