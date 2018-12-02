import States from 'core/States';
import * as pages from 'core/pages';
import { createDOM } from 'utils/dom';
import { visible } from 'core/decorators';
import { autobind } from 'core-decorators';
import template from './menu.tpl.html';
import './menu.scss';


@visible()
export default class DesktopNetworksView {
  constructor(options) {
    this._el = options.parent.appendChild(
      createDOM(template()),
    );

    this._ui = {
      works: this._el.querySelector('.js-UIHome__menuWorks'),
      experiments: this._el.querySelector('.js-UIHome__menuExperiments'),
      logger: this._el.querySelector('.logger'),
      logout: this._el.querySelector('.logout'),
    };

    this._addEvents();
    this.hideIfLogin();
    this.onClickLogout();
  }

  _addEvents() {
    this._ui.works.addEventListener('click', this._onWorksClick);
    this._ui.experiments.addEventListener('click', this._onExperimentsClick);
    Signals.onApplicationStart.add(this._start);
  }

  // State ---------------------------------------------------------------------

  show() {
    this._el.style.display = 'block';
  }

  hide() {
    this._el.style.display = 'none';
  }

  @autobind
  _start() {
    if (States.router.getLastRouteResolved().name === 'experiment') {
      this._ui.works.classList.remove('is-active');
      this._ui.experiments.classList.add('is-active');
    } else {
      this._ui.works.classList.add('is-active');
      this._ui.experiments.classList.remove('is-active');
    }
  }

  updateState(page) {
    switch (page) {
      case pages.HOME:
        this._ui.works.classList.add('is-active');
        this._ui.experiments.classList.remove('is-active');
        this.hideIfLogin();
        break;
      case pages.EXPERIMENT:
        this._ui.works.classList.remove('is-active');
        this._ui.experiments.classList.add('is-active');
        break;
      default:
    }
  }

  // Events ------------------------------------

  @autobind
  _onWorksClick() {
    States.router.navigateTo(pages.LOGIN);
  }
 
  // @autobind
  // _onExperimentsClick() {
  //   States.router.navigateTo(pages.EXPERIMENT);
  // }

  hideIfLogin()
  {
    if(localStorage.getItem('name'))
    if(localStorage.getItem('name')!= '')
    {
      this._ui.works.style.display = "none";
      this._ui.experiments.style.display = "none";
      this._ui.logout.style.display = "inline-block";
      this._ui.logger.innerText = localStorage.getItem('name');
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
    this._ui.logger.innerText = "";
  }
}
