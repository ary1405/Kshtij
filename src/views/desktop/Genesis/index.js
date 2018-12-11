import States from 'core/States';
import * as pages from 'core/pages';
import projectList from 'config/project-list';
import { createDOM } from 'utils/dom';
import { map, randomFloat } from 'utils/math';
import { autobind } from 'core-decorators';
import { visible, active } from 'core/decorators';
import CloseButton from 'views/common/CloseButton';
import template from './genesis.tpl.html';
import './genesis.scss';
import axios from 'axios';



@visible()
@active()
export default class DesktopGenesisView {

  // Setup ---------------------------------------------------------------------

  constructor(options) {

    this._el = options.parent.appendChild(
      createDOM(template()),
    );

    this._ui = {
      titles: this._el.querySelectorAll('.js-genesis__title'),
      bodies: this._el.querySelectorAll('.js-genesis__body'),
      close: this._el.querySelector('.js-genesis__close'),
      woodstock: this._el.querySelector('.woodstock_register'),
      forex: this._el.querySelector('.forex_register'),
      supply_matrix: this._el.querySelector('.supply_matrix_register'),
      relic_hunter: this._el.querySelector('.relic_hunter_register'),
      message: this._el.querySelectorAll('.register_message'),
    };

    var that = this;
    this._ui.woodstock.addEventListener('click', function (e) {
      return that.register(1);
    });

    var that = this;
    this._ui.forex.addEventListener('click', function (e) {
      return that.register(2);
    });

    var that = this;
    this._ui.supply_matrix.addEventListener('click', function (e) {
      return that.register(3);
    });

    var that = this;
    this._ui.relic_hunter.addEventListener('click', function (e) {
      return that.register(4);
    });



    this._closeButton = new CloseButton({
      parent: this._ui.close,
      clickCallback: this._onCloseClick,
    });
  }

  // State ---------------------------------------------------------------------

  show({ delay = 0 } = {}) {
    this._el.style.display = 'block';

    TweenLite.killTweensOf(this._ui.titles);
    TweenLite.fromTo(
      this._ui.titles,
      1,
      {
        y: 50,
      },
      {
        y: 0,
        opacity: 1,
        ease: 'Power4.easeOut',
      },
    );

    TweenLite.killTweensOf(this._ui.bodies);
    TweenLite.fromTo(
      this._ui.bodies,
      1,
      {
        y: 50,
      },
      {
        delay: 0.15,
        y: 0,
        opacity: 1,
        ease: 'Power4.easeOut',
      },
    );

    this._closeButton.show();
  }

  hide({ delay = 0 } = {}) {
    TweenLite.killTweensOf(this._ui.bodies);
    TweenLite.to(
      this._ui.bodies,
      0.55,
      {
        opacity: 0,
        ease: 'Power2.easeOut',
      },
    );

    TweenLite.killTweensOf(this._ui.titles);
    TweenLite.to(
      this._ui.titles,
      0.55,
      {
        delay: 0.1,
        opacity: 0,
        ease: 'Power2.easeOut',
        onComplete: () => {
          this._el.style.display = 'none';
        },
      },
    );

    this._closeButton.hide();
  }

  // Events --------------------------------------------------------------------

  @autobind
  _onCloseClick() {
    States.router.navigateTo(pages.PROJECT, { id: projectList.projects[1].id });
  }

  register(event_id) {
    var datatosend = {
      'tokenval': localStorage.getItem('token') || '',
      'eventid': event_id,
    };

    var that = this;
    axios({
      method: 'post',
      url: 'https://api.ktj.in/events/register',
      crossdomain: true,
      data: Object.keys(datatosend).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(datatosend[key])
      }).join('&'),
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    .then(function (response) {
      that._ui.message[event_id-1].innerHTML = response.data.message;
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  


}
