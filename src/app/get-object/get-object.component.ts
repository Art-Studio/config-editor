import { Input, Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-get-object',
  templateUrl: './get-object.component.html',
  styleUrls: ['./get-object.component.css']
})
export class GetObjectComponent implements OnInit {

  @Input() path = '';
  @Input() subject: any = this.dataServices.data.obj;

  object = Object;
  showEl = 0;

  constructor(
    public dataServices: DataService
  ) { }

  ngOnInit(): void {
    // this.path += this.key + '.';
  }

  toggleEl(index: number): void {
    this.showEl = (this.showEl === index) ? null : index;
  }

  isHtmlPrintable(value: any): boolean{
    const result = value === '' || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
    return result;
  }

  typeOf(value: any): string{
    const result = Array.isArray(value) ? 'array' : typeof value;
    return result;
  }

  change(e: any): void{
    const objList = this.dataServices.data.obj;
    const objName = e.target.getAttribute('id');

    const checkValueType = (val: any) => {
      const result = val.toLowerCase() === 'true' ? false : val.toLowerCase() === 'false' ? true : val;
      return result;
    };

    const value = checkValueType( e.target.value );

    let objPath = e.target.getAttribute('data-path');
    objPath = objPath ? objPath + '.' + objName : objName;
    objPath = objPath.split('.');

    objPath.reduce( (newObj: any, name: string) => {
      if (typeof newObj[name] !== 'object'){
        newObj[name] = value;
      }
      return newObj[name];
    }, objList);

    console.log(objList);

  }
}
