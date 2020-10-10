import { Component, OnInit } from '@angular/core';

import { DataService } from './services/data.service';
import { SaveFileComponent } from './save-file/save-file.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  show = 'source';
  title = 'Config editor';

  constructor(
    public dataServices: DataService,
    public saveFileComponent: SaveFileComponent
  ){}

  ngOnInit(): void{

  }

  init = () => {
    console.log(this.dataServices.data);
    this.show = 'data';
  }
}
