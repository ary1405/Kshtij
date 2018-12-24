import States from 'core/States';
import * as pages from 'core/pages';
import projectList from 'config/project-list';
import { createDOM } from 'utils/dom';
import { map, randomFloat } from 'utils/math';
import { autobind } from 'core-decorators';
import { visible, active } from 'core/decorators';
import CloseButton from 'views/common/CloseButton';
import template from './mobile_workshop.tpl.html';
import './mobile_workshop.scss';
import axios from 'axios';


@visible()
@active()
export default class DesktopworkshopView {

  // Setup ---------------------------------------------------------------------

  constructor(options) {

    this._el = options.parent.appendChild(
      createDOM(template()),
    );

    this._ui = {
      titles: this._el.querySelectorAll('.js-workshop__title'),
      bodies: this._el.querySelectorAll('.js-workshop__body'),
      close: this._el.querySelector('.js-workshop__close'),
      tabcontainer: this._el.querySelector('.workshop__tab'),
      tabcontentcontainer: this._el.querySelector('.workshop__tabcontent__container')
    };

    this._closeButton = new CloseButton({
      parent: this._ui.close,
      clickCallback: this._onCloseClick,
    });

    this.geteventdata();
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
    States.router.navigateTo(pages.PROJECT, { id: projectList.projects[2].id });
  }

  geteventdata() {
    var that = this;
    axios({
      method: 'get',
      url: 'https://api.ktj.in/workshops',
      crossdomain: true,
    })
      .then(function (response) {
        for (let eve of response.data) {
          let btn = document.createElement('button');
          btn.setAttribute('class', 'tablinks');
          btn.setAttribute('id', 'tab' + eve.id);
          btn.style.fontSize = "23px";
          btn.innerHTML = eve.name;
          that._ui.tabcontainer.appendChild(btn);

          let tabcnt = document.createElement('div');
          tabcnt.setAttribute('class', 'tabcontent');
          tabcnt.setAttribute('id', 'tabcnt' + eve.id);

          let bottomtabdiv = document.createElement('div');
          bottomtabdiv.setAttribute('class', 'verttab');
          bottomtabdiv.setAttribute('id', 'verttab' + eve.id);

          let aboutbtn = document.createElement('button');
          aboutbtn.setAttribute('class', 'verlinks');
          aboutbtn.setAttribute('id', 'btnabout' + eve.id);
          let abouttxt = document.createTextNode('About');
          aboutbtn.appendChild(abouttxt);

          let topicbtn = document.createElement('button');
          topicbtn.setAttribute('class', 'verlinks');
          topicbtn.setAttribute('id', 'btntopic' + eve.id);
          let topictxt = document.createTextNode('Topic');
          topicbtn.appendChild(topictxt);
          // let psbtn = document.createElement('button');
          // psbtn.setAttribute('class', 'verlinks');
          // // psbtn.setAttribute('id', 'btnps' + eve.id);
          // let pstxt = document.createTextNode('Problem Statement');
          // // psbtn.appendChild(pstxt);
          let contactbtn = document.createElement('button');
          contactbtn.setAttribute('class', 'verlinks');
          contactbtn.setAttribute('id', 'btncontact' + eve.id);
          let contacttxt = document.createTextNode('Contact');
          contactbtn.appendChild(contacttxt);
          let regisbtn = document.createElement('button');
          regisbtn.setAttribute('class', 'verlinks');
          regisbtn.setAttribute('id', 'btnregis' + eve.id);
          let registxt = document.createTextNode('Register');
          regisbtn.appendChild(registxt);

          let eventwisediv = document.createElement('div');

          let aboutdiv = document.createElement('div');
          aboutdiv.setAttribute('class', 'verttabcontent');
          aboutdiv.setAttribute('id', 'about' + eve.id);
          aboutdiv.innerHTML = eve.about;

          let topicdiv = document.createElement('div');
          topicdiv.setAttribute('class', 'verttabcontent');
          topicdiv.setAttribute('id', 'topic' + eve.id);
          topicdiv.innerHTML = eve.topic;
          
          // let psdiv = document.createElement('div');
          // psdiv.setAttribute('class', 'verttabcontent');
          // // psdiv.setAttribute('id', 'ps' + eve.id);
          // // psdiv.innerHTML = eve.ps;

          let contactdiv = document.createElement('div');
          contactdiv.setAttribute('class', 'verttabcontent');
          contactdiv.setAttribute('id', 'contact' + eve.id);
          contactdiv.innerHTML = eve.contact;
          
          let regisdiv = document.createElement('div');
          regisdiv.setAttribute('class', 'verttabcontent');
          regisdiv.setAttribute('id', 'regis' + eve.id);
          let registext = document.createTextNode(eve.register);
          regisdiv.appendChild(registext);

          bottomtabdiv.appendChild(topicbtn);
          bottomtabdiv.appendChild(aboutbtn);
          // bottomtabdiv.appendChild(psbtn);
          bottomtabdiv.appendChild(contactbtn);
          bottomtabdiv.appendChild(regisbtn);

          eventwisediv.appendChild(topicdiv);
          eventwisediv.appendChild(aboutdiv);
          // eventwisediv.appendChild(psdiv);
          eventwisediv.appendChild(contactdiv);
          eventwisediv.appendChild(regisdiv);

          tabcnt.appendChild(bottomtabdiv);
          tabcnt.appendChild(eventwisediv);

          that._ui.tabcontentcontainer.appendChild(tabcnt);

          btn.addEventListener('click', function (e) {
            return that.clicktochangeevent(eve.id);
          });
          aboutbtn.addEventListener('click', function (e) {
            return that.showeventdetail('about', eve.id);
          });

          topicbtn.addEventListener('click', function (e) {
            return that.showeventdetail('topic', eve.id);
          });
          // psbtn.addEventListener('click', function (e) {
            // return that.showeventdetail('ps', eve.id);
          //});
          contactbtn.addEventListener('click', function (e) {
            return that.showeventdetail('contact', eve.id);
          });
          regisbtn.addEventListener('click', function (e) {
            return that.register(eve.id);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  clicktochangeevent(workshopid) {
    var that = this;
    var len = that._ui.tabcontentcontainer.children.length;
    for (let a = 0; a < len; a++) {
      that._ui.tabcontainer.children[a].className = that._ui.tabcontainer.children[a].className.replace(" active", "");
      that._ui.tabcontentcontainer.children[a].style.display = 'none';
    }
    that._el.querySelector('#tabcnt' + workshopid).style.display = 'block';
    that._el.querySelector('#tab' + workshopid).className += " active";

    that._el.querySelector('#topic' + workshopid).style.display = 'block';
    that._el.querySelector('#btntopic' + workshopid).className += " active";
  }

  showeventdetail(divtype, workshopid) {
    var that = this;
    var detailtabs = that._el.querySelectorAll('.verlinks');
    var detail = that._el.querySelectorAll('.verttabcontent')
    for (let a = 0; a < detail.length; a++) {
      detailtabs[a].className = detailtabs[a].className.replace(" active", "");
      detail[a].style.display = 'none';
    }
    that._el.querySelector('#' + divtype + workshopid).style.display = 'block';
    that._el.querySelector('#btn' + divtype + workshopid).className += " active";
  }

  register(workshopid) {
    var datatosend = {
      'tokenval': localStorage.getItem('token') || '',
      'workshopid': workshopid,
    };

    var that = this;
    axios({
      method: 'post',
      url: 'https://api.ktj.in/workshops/register',
      crossdomain: true,
      data: Object.keys(datatosend).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(datatosend[key])
      }).join('&'),
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(function (response) {
        that._el.querySelector('#regis' + workshopid).innerHTML ='Registration Status: ' + response.data.message;
        that.showeventdetail('regis', workshopid);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

}
