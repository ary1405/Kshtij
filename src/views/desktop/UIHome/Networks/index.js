import { createDOM } from 'utils/dom';
import { visible } from 'core/decorators';
import template from './networks.tpl.html';
import './networks.scss';


@visible()
export default class DesktopNetworksView {
  constructor(options) {
    this._el = options.parent.appendChild(
      createDOM(template()),
    );

  }

 
  show() {
    this._el.style.display = 'block';
    "use strict";

let _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol
          ? "symbol"
          : typeof obj;
      };
      
     
  }

  hide() {
    this._el.style.display = 'none';
  }
  
}
