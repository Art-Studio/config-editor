import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-save-file',
  templateUrl: './save-file.component.html',
  styleUrls: ['./save-file.component.css']
})
export class SaveFileComponent implements OnInit {

  constructor(
    public dataServices: DataService
  ) { }

  ngOnInit(): void {

  }

  saveFile(): void{

    let newObj: string;
    let output = this.dataServices.data.template;

    for (const obj in this.dataServices.data.obj) {
      if (this.dataServices.data.obj.hasOwnProperty(obj)) {
        newObj = `var ${obj} = `;
        newObj += JSON.stringify(this.dataServices.data.obj[obj], null, 2);
        output = output.replace(`{{${obj}}}`, newObj + ';');
      }
    }

    const textToWrite = output;
    const textFileAsBlob = new Blob([ textToWrite ], { type: 'text/plain' });
    const fileNameToSaveAs = 'index.html';

    const downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = 'Download File';

    if (window.webkitURL !== null) {
      // Chrome allows the link to be clicked without actually adding it to the DOM.
      downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
      // Firefox requires the link to be added to the DOM before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      // remove the link from the DOM
      downloadLink.onclick = (e: Event) => { document.body.removeChild(e.target as HTMLInputElement); };
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
    }
    downloadLink.click();
  }

}
