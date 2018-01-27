import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core'

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  private daysOfMonth: DaysOfMonth
  private selectedDate: Date
  private headerText: string
  private currentViewType: ViewType = ViewType.DAY
  private viewTemplate: TemplateRef<any>

  @ViewChild('dayViewTemplate') dayViewTemplate: TemplateRef<any>
  @ViewChild('monthViewTemplate') monthViewTemplate: TemplateRef<any>
  @ViewChild('yearViewTemplate') yearViewTemplate: TemplateRef<any>

  @Input() defaultValue: string
  @Output() selectedDateChange = new EventEmitter<Date>()

  constructor() { }

  ngOnInit() {
    this.selectedDate = this.defaultValue === undefined ? new Date() : new Date(this.defaultValue)
    this.daysOfMonth = new DaysOfMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate)

    this.viewTemplate = this.dayViewTemplate
    this.setHeaderText(this.currentViewType)
  }
  private setHeaderText(view: ViewType) {
    switch (view) {
      case ViewType.DAY:
        this.headerText = this.daysOfMonth.monthNames[this.daysOfMonth.month] + ' ' + this.daysOfMonth.year
        break
      case ViewType.MONTH:
        this.headerText = String(+this.daysOfMonth.year)
        break
      case ViewType.YEAR:
        this.headerText = String(this.daysOfMonth.year - 12) + ' - ' + String(this.daysOfMonth.year + 12)
        break;
    }
  }
  private changeViewDown() {
    switch (this.currentViewType) {
      case ViewType.DAY:
        this.currentViewType = ViewType.MONTH
        this.viewTemplate = this.monthViewTemplate
        break
      case ViewType.MONTH:
        this.currentViewType = ViewType.YEAR
        this.viewTemplate = this.yearViewTemplate
        break
      default:
        break
    }
    this.setHeaderText(this.currentViewType)
  }
  private changeViewUp(evt: Event, value: number) {
    let month = this.daysOfMonth.month
    let year = this.daysOfMonth.year
    switch (this.currentViewType) {
      case ViewType.MONTH:
        this.currentViewType = ViewType.DAY
        this.viewTemplate = this.dayViewTemplate
        month = value
        break
      case ViewType.YEAR:
        this.currentViewType = ViewType.MONTH
        this.viewTemplate = this.monthViewTemplate
        year = value
        break
      default:
        break
    }
    this.daysOfMonth = new DaysOfMonth(year, month, this.selectedDate)
    this.setHeaderText(this.currentViewType)
    evt.stopPropagation()
  }

  private selectDate(date: DateInfo) {
    const month = this.daysOfMonth.month
    const year = this.daysOfMonth.year
    this.selectedDate = new Date(year, month, date.day)
    this.daysOfMonth = new DaysOfMonth(year, month, this.selectedDate)
    this.selectedDateChange.emit(this.selectedDate)
  }

  private nextView() {
    switch (this.currentViewType) {
      case ViewType.DAY:
        this.nextMonth()
        break
      case ViewType.MONTH:
        this.viewYearRange(1)
        break;
      case ViewType.YEAR:
        this.viewYearRange(25)
        break
      default:
        break
    }
  }

  private previousView() {
    switch (this.currentViewType) {
      case ViewType.DAY:
        this.previousMonth()
        break
      case ViewType.MONTH:
        this.viewYearRange(-1)
        break;
      case ViewType.YEAR:
        this.viewYearRange(-25)
        break
      default:
        break
    }
  }

  private viewYearRange(yearOffset: number) {
    let year = this.daysOfMonth.year
    const month = this.daysOfMonth.month
    year += yearOffset
    this.daysOfMonth = new DaysOfMonth(year, month, this.selectedDate)
    this.setHeaderText(this.currentViewType)
  }
  private nextMonth() {
    let month = this.daysOfMonth.month
    let year = this.daysOfMonth.year
    if (month === 11) {
      month = 0;
      year++
    } else {
      month++
    }
    this.daysOfMonth = new DaysOfMonth(year, month, this.selectedDate)
    this.setHeaderText(this.currentViewType)
  }
  private previousMonth() {
    let month = this.daysOfMonth.month
    let year = this.daysOfMonth.year
    if (month === 0) {
      month = 11;
      year--
    } else {
      month--
    }
    this.daysOfMonth = new DaysOfMonth(year, month, this.selectedDate)
    this.setHeaderText(this.currentViewType)
  }
}

class DaysOfMonth {
  year: number
  month: number
  days: number
  firstDay: number
  weeks: Array<any>
  selectedDate: Date
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  constructor(year: number, month: number, selectedDate: Date) {
    this.days = new Date(year, month + 1, 0).getDate()
    this.firstDay = new Date(year, month, 1).getDay()
    this.selectedDate = selectedDate
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
    let selected = false
    for (let i = 0; i < 7; i++) {
      if (i < dayStart || start > end) {
        week.push(new DateInfo(daynames[i], 0, false))
      } else {
        selected = false;
        if (start === this.selectedDate.getDate() &&
          this.month === this.selectedDate.getMonth() &&
          this.year === this.selectedDate.getFullYear()) {
          selected = true
        }
        week.push(new DateInfo(daynames[i], start, selected))
        start++
      }
    }
    return week
  }
}

class DateInfo {
  constructor(public name: string, public day: number, public selected: boolean) { }
}

enum ViewType {
  DAY,
  MONTH,
  YEAR
}
