import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../app.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-get-file',
  templateUrl: './get-file.component.html',
  styleUrls: ['./get-file.component.css']
})
export class GetFileComponent implements OnInit {

  file: any;

  constructor(
    public appComponent: AppComponent,
    public dataServices: DataService
  ) { }

  ngOnInit(): void {
  }

  onChange = (fileList: FileList): void => {
    this.file = fileList[0];
    this.appComponent.title = `Config editor: <small>${this.file.name} (${this.file.type})</small>`;
    this.getData(this.file, (e: boolean) => {
      if (e){
        // init
        this.appComponent.init();
      }
    });
  }

  // get affConfig file
  private getData = (file: any, callback: any): any => {

    const fileReader: FileReader = new FileReader();

    fileReader.onloadend = () => {

      this.dataServices.fileParser( fileReader.result as string, callback );


    };
    if (file){ fileReader.readAsText(file); }
  }

}
