import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data = {
    obj: null,
    source: '',
    script: '',
    template: ''
  };

  renderer2: Renderer2;

  constructor(rendererFactory2: RendererFactory2, @Inject(DOCUMENT) private document: Document){
    this.renderer2 = rendererFactory2.createRenderer(null, null);
  }

  fileParser(str: string, callback: any): void{
    // remember full content
    this.data.source = this.data.template = str;

    this.getScript();

    if (this.data.script){
      const regex = /(?<!\/\s*)\bvar\b\s+(.*?)\s*=\s*(?:(?:\{(?:\{.*?\}|(?!;)[^\{])*\})|(?:\bfalse\b|\btrue\b)|(?:['"][^"|']*['"]))\s*?;?\s*?\n/gsmi;
      this.getObj(regex, str);
    }

    if (this.data.obj){
      // callback
      callback(true);
    }
  }

  // getWindow = (): any => window;

  private getScript = () => {
    // search javascript in content
    const getScript = /<script[^>]*>((?:[^<]+|<(?!\/script>))+)/s.exec(this.data.source);

    // get javascript as text from data
    this.data.script = getScript ? getScript[1] : '';
  }

  private getObj = (regex: RegExp, source: string) => {
    // search variable name in content
    let getVar: any;
    while (getVar !== null) {
      getVar = regex.exec(source);
      if (getVar){
        // This is necessary to avoid infinite loops with zero-width matches
        if (getVar.index === regex.lastIndex) { regex.lastIndex++; }
        this.checkObj( getVar );
      }
    }
  }

  private checkObj = ( getVar: any ) => {
    const objName = getVar[1];
    if ( !this.data.obj && objName ){
      this.data.obj = {};
      // get script from content append to body
      this.addScript();
      // console.clear();
    }
    // get window object
    // const windowObj = this.getWindow()[objName];
    const windowObj = window[objName];
    if (windowObj !== undefined && windowObj !== null){
      this.data.obj[objName] = windowObj;
      this.data.template = this.data.template.replace(getVar[0], `{{${objName}}}\n`);
    }else{
      if ( /\bvar\b.*?=.*?,/gsmi.test(getVar[0]) ){
        this.data.template = this.data.template.replace(getVar[0], getVar[0].replace(/\bvar\s\b/, ''));
        const regex = /(\w*)\s*=\s*(?:(?:\btrue\b|\bfalse\b)|(?:['"][^"|']*['"]))\s*,?\s*;?\s*?\n?/gsmi;
        this.getObj(regex, getVar[0]);
      }else{
        console.log(getVar);
      }
    }
  }

  private addScript = () => {
    // get javascript as text
    let javascript = this.data.script;

    if (javascript){
      // create script tag
      const script = this.renderer2.createElement('script');

      // disallow redirect
      javascript = javascript.replace(/window.location.href(?:\s+)?=|location.href(?:\s+)?=/g, '//-redirectOff');

      script.type = 'text/javascript';
      script.text = javascript;
      // append script which will be executed
      this.renderer2.appendChild(this.document.body, script);
      // after append remove script, but the script objects will still exist
      this.renderer2.removeChild(this.document.body, script);
    }
  }

}
