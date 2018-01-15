import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fruit-list',
  templateUrl: './fruit-list.component.html',
  styleUrls: ['./fruit-list.component.css']
})
export class FruitListComponent implements OnInit {

  private fruits = ['Banana', 'Apple', 'Avocado', 'Watermelon', 'Grapes', 'Jackfruit', 'Pineapple', 'Orange', 'Pears']
  private selectedFruit = 'Apple'

  constructor() { }

  ngOnInit() {
  }

  selectThisFruit(fruit: string, evt: EventEmitter<any>) {
    this.selectedFruit = fruit
    evt.emit(fruit)
  }
}
