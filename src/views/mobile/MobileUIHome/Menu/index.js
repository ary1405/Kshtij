import States from 'core/States';
import * as pages from 'core/pages';
import { createDOM } from 'utils/dom';
import { visible } from 'core/decorators';
import { autobind } from 'core-decorators';
import { map } from 'utils/math';
import template from './menu.tpl.html';
import './menu.scss';


@visible()
export default class MobileMenu {
  constructor(options) {
    this._el = options.parent.appendChild(
      createDOM(template()),
    );

    this._ui = {
      works: this._el.querySelector('.js-UIHome__menuWorks'),
      experiments: this._el.querySelector('.js-UIHome__menuExperiments'),
      myktj: this._el.querySelector('.myktj'),
      logout: this._el.querySelector('.logout'),
    };

    this._setupDOM();
    this._addEvents();
    this.hideIfLogin();
    this.onClickLogout();
  }

  _setupDOM() {
    if (States.IOS) {
      this._el.classList.add('ios');
    }
  }

  _addEvents() {
    this._ui.works.addEventListener('click', this._onWorksClick);
    this._ui.experiments.addEventListener('click', this._onExperimentsClick);
    this._ui.myktj.addEventListener('click', this._onMyktjClick);
    //Signals.onApplicationStart.add(this._start);
  }

  // State ---------------------------------------------------------------------

  show() {
    this._el.style.display = 'flex';
  }

  hide() {
    this._el.style.display = 'none';
  }

  // @autobind
  // _start() {
  //   if (States.router.getLastRouteResolved().name === 'experiment') {
  //     this._ui.works.classList.remove('is-active');
  //     this._ui.experiments.classList.add('is-active');
  //   } else {
  //     this._ui.works.classList.add('is-active');
  //     this._ui.experiments.classList.remove('is-active');
  //   }
  // }

  updateState(page) {
    switch (page) {
      case pages.HOME:
        // this._ui.works.classList.add('is-active');
        // this._ui.experiments.classList.remove('is-active');
        this.hideIfLogin();
        break;
      case pages.EXPERIMENT:
        // this._ui.works.classList.remove('is-active');
        // this._ui.experiments.classList.add('is-active');
        break;
      default:
    }
  }

  // Events ------------------------------------

  // @autobind
  // _onWorksClick(event) {
  //   event.preventDefault();
  //   console.log("login");
  //  // States.router.navigateTo(pages.HOME);
  // }
  @autobind
  _onWorksClick(event) {
    event.preventDefault();
    States.router.navigateTo(pages.LOGIN);
  }
  @autobind
  _onMyktjClick() {
    States.router.navigateTo(pages.MYKTJ);
  }


  // @autobind
  // _onExperimentsClick(event) {
  //   event.preventDefault();
  //   console.log('signup');
  //  States.router.navigateTo(pages.LOGIN);
  // }

  hideIfLogin()
  {
    if(localStorage.getItem('name'))
    if(localStorage.getItem('name')!= '')
    {
      this._ui.works.style.display = "none";
      this._ui.experiments.style.display = "none";
      //this._ui.logger.innerText = localStorage.getItem('name');
      this._ui.myktj.style.display = "inline-block";
      this._ui.logout.style.display = "inline-block";
    }

    if(localStorage.getItem('name'))
    if(localStorage.getItem('name')!= '')
    {
      this._ui.works.style.display = "none";
      this._ui.experiments.style.display = "none";
      // this._ui.myktj.innerText = localStorage.getItem('name');
      this._ui.myktj.style.display = "inline-block";
      this._ui.logout.style.display = "inline-block";
    }


  }

  
  onClickLogout()
  {
    var that = this;
    this._ui.logout.addEventListener('click', function(e){
      return that.logout();
    })
  }

  logout()
  {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    document.cookie = "token=";
    this._ui.works.style.display = "block";
    this._ui.experiments.style.display = "block";
    this._ui.logout.style.display = "none";
    this._ui.myktj.style.display = "none";
   
  }

  resize() {
    if (window.innerWidth > window.innerHeight) {
      this._el.style.top = `${window.innerHeight * 0.9}px`;
    } else {
      this._el.style.top = `${window.innerHeight * 0.95}px`;
    }
  }
}
