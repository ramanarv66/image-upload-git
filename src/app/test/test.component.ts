import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  mapTest(): void {
    let nameAgeMapping = new Map();

    nameAgeMapping.set('Lokesh', 37);
    nameAgeMapping.set('Raj', 35);
    nameAgeMapping.set('John', 40);
    nameAgeMapping.set('John', 66);

    //Iterate over map keys
    for (let key of nameAgeMapping.keys()) {
      console.log(key);                   //Lokesh Raj John
    }

    //Iterate over map values
    for (let value of nameAgeMapping.values()) {
      console.log(value);                 //37 35 40
    }

  }


}
