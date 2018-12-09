import States from 'core/States';
import * as pages from 'core/pages';
import projectList from 'config/project-list';
import { createDOM } from 'utils/dom';
import { map, randomFloat } from 'utils/math';
import { autobind } from 'core-decorators';
import { visible, active } from 'core/decorators';
import CloseButton from 'views/common/CloseButton';
import template from './mobile_mech.tpl.html';
import './mobile_mech.scss';
import axios from 'axios';


@visible()
@active()
export default class MobileMech {

  // Setup ---------------------------------------------------------------------

  constructor(options) {

    this._el = options.parent.appendChild(
      createDOM(template()),
    );

    this._ui = {
      titles: this._el.querySelectorAll('.js-mech__title'),
      bodies: this._el.querySelectorAll('.js-mech__body'),
      close: this._el.querySelector('.js-mech__close'),
      lom: this._el.querySelector('.lom_register'),
      night: this._el.querySelector('.night_register'),
      sand: this._el.querySelector('.sand_register'),
      arm: this._el.querySelector('.arm_register'),
      message: this._el.querySelectorAll('.register_message'),
    };
    var that = this;
    this._ui.lom.addEventListener('click', function (e) {
      return that.register(21);
    });

    var that = this;
    this._ui.night.addEventListener('click', function (e) {
      return that.register(22);
    });

    var that = this;
    this._ui.sand.addEventListener('click', function (e) {
      return that.register(23);
    });

    var that = this;
    this._ui.arm.addEventListener('click', function (e) {
      return that.register(24);
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
      that._ui.message[event_id-21].innerHTML = response.data.message;
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

}
