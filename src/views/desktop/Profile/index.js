import States from 'core/States';
import * as pages from 'core/pages';
import { createDOM } from 'utils/dom';
import { autobind } from 'core-decorators';
import { visible, active } from 'core/decorators';
import CloseButton from 'views/common/CloseButton';
import template from './profile.tpl.html';
import './profile.scss';
import axios from 'axios';


@visible()
@active()
export default class DesktopprofileView {

  // Setup ---------------------------------------------------------------------

  constructor(options) {

    this._el = options.parent.appendChild(
      createDOM(template()),
    );

    this._ui = {
      titles: this._el.querySelectorAll('.js-profile__title'),
      bodies: this._el.querySelectorAll('.js-profile__body'),
      close: this._el.querySelector('.js-profile__close'),
      name: this._el.querySelector('.profile__name'),
      id: this._el.querySelector('.profile__id'),
      email: this._el.querySelector('.profile__email'),
      mobile: this._el.querySelector('.profile__mobile'),
      college: this._el.querySelector('.profile__college'),
      };

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
    this.getprofile();
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
    States.router.navigateTo(pages.HOME);
  }

  getprofile(){
    var datatosend = {
      'tokenval': localStorage.getItem('token') || '',
    };
    var that = this;
    axios({
      method: 'post',
      url: 'https://api.ktj.in/profile',
      crossdomain: true,
      data: Object.keys(datatosend).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(datatosend[key])
      }).join('&'),
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    .then(function (response) {
      for (let value of response.data.userdata.eventdata) 
      {
        
      }
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }



}
