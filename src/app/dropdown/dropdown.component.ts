import { Component, OnInit, Input, ElementRef, HostListener, TemplateRef, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  animations: [
    trigger('drowdownState', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-10%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(50, style({ transform: 'translateY(-5%)' }))
      ])
    ])
  ]
})
export class DropdownComponent implements OnInit {

  private inputHeight = '30px'
  private inputWidth = '100px'
  private dropdownWidth = '100px'
  private dropdownHeight = '200px'
  private dropdownLeft = '0px'
  private shouldDisplayDetail = false
  private shouldShowBorder = true
  private selectedItemChange = new EventEmitter<any>()
  private selectedItemText: string

  @Input() width: number
  @Input() height: number
  @Input() dropWidth: number
  @Input() dropHeight: number
  @Input() noBorder: boolean
  @Input() dropdownItemsTemplate: TemplateRef<any>
  @Input() selectedItemTemplate: TemplateRef<any>

  constructor(private ref: ElementRef) { }

  ngOnInit() {
    this.inputWidth = this.width === undefined ? '30px' : this.width + 'px'
    this.inputHeight = this.height === undefined ? '100px' : this.height + 'px'
    this.dropdownWidth = this.dropWidth === undefined ? '100px' : this.dropWidth + 'px'
    this.dropdownHeight = this.dropHeight === undefined ? '200px' : this.dropHeight + 'px'

    this.shouldShowBorder = this.noBorder === undefined ? true : !this.noBorder

    this.selectedItemChange.subscribe(item => {
      console.log(item)
      this.selectedItemText = item
      this.shouldDisplayDetail = false
    })
  }

  @HostListener('document:click', ['$event']) hostClick(evt: Event) {
    if (!this.ref.nativeElement.contains(evt.target)) {
      this.shouldDisplayDetail = false
    }
  }
  dropdownClick(evt) {
    this.repositionDropdown()
    this.shouldDisplayDetail = !this.shouldDisplayDetail
  }
  repositionDropdown() {
    const inputWidth: number = parseInt(this.inputWidth, 10)
    const dropdownWidth: number = parseInt(this.dropdownWidth, 10)
    if (dropdownWidth > inputWidth) {
      const el = this.ref.nativeElement.getBoundingClientRect();
      const left: number = el.left + window.pageXOffset
      const width: number = left + dropdownWidth
      if (width > window.innerWidth) {
        this.dropdownLeft = (window.innerWidth - width) + 'px'
      }
    }
  }
}
