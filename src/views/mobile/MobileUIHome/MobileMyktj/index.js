import States from 'core/States';
import * as pages from 'core/pages';
import CloseButton from 'views/common/CloseButton';
import { createDOM } from 'utils/dom';
import { autobind } from 'core-decorators';
import template from './mobile_myktj.tpl.html';
import './mobile_myktj.scss';
import axios from 'axios';


export default class Mobilemyktj {

  // Setup ---------------------------------------------------------------------

  constructor(options) {
    this._el = options.parent.appendChild(
      createDOM(template()),
    );

    this._ui = {
        titles: this._el.querySelectorAll('.js-myktj__title'),
        bodies: this._el.querySelectorAll('.js-myktj__body'),
        close: this._el.querySelector('.js-myktj__close'),
        tabcontainer: this._el.querySelector('.myktj__tab'),
        tabcontentcontainer: this._el.querySelector('.myktj__tabcontent__container')
        };

    this._closeButton = new CloseButton({
      parent: this._ui.close,
      clickCallback: this._onCloseClick,
    });

  }

  // State --------

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
    this._closeButton.show();
    this.setlayout();
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
    this.removelayout();
  }

  // Events --------------------------------------------------------------------

  @autobind
  _onCloseClick() {
    States.router.navigateTo(pages.HOME);
  }

  setlayout() {
    var datatosend = {
      'tokenval': localStorage.getItem('token') || '',
    };
    var that = this;
    axios({
      method: 'post',
      url: 'https://api.ktj.in/myktj',
      crossdomain: true,
      data: Object.keys(datatosend).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(datatosend[key])
      }).join('&'),
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(function (response) {
        console.log(response.data);
        for (let prop in response.data.userdata) {
          let btn = document.createElement('button');
          btn.setAttribute('class', 'tablinks');
          btn.setAttribute('id', 'tab' + prop);
          btn.innerText = prop;
          btn.addEventListener('click', function (e) {
            return that.changetab(prop);
          })
          that._ui.tabcontainer.appendChild(btn);

          let tabcnt = document.createElement('div');
          tabcnt.setAttribute('class', 'myktjtabcontent');
          tabcnt.setAttribute('id', 'tabcnt' + prop);

          let table = document.createElement('table');
          table.setAttribute('id', prop + 'table');
          tabcnt.appendChild(table);
          that._ui.tabcontentcontainer.appendChild(tabcnt);
          that.createtable(prop, response.data.userdata[prop]);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  createtable(prop, data) {
    var that = this;
    switch (prop) {
      case 'Profile':
        for (let det in data) {
          let tr = document.createElement('tr');
          let tdtxt = document.createElement('td');
          tdtxt.innerText = det;
          let tdtxt2 = document.createElement('td');
          tdtxt2.innerText = data[det];
          tr.appendChild(tdtxt);
          tr.appendChild(tdtxt2);
          this._el.querySelector('#' + prop + 'table').appendChild(tr);
        }
        break;
      case 'Events':
        for (let value of data) {
          let tr = document.createElement('tr');
          tr.setAttribute('id', "event" + value.eventid);
          let tdtxt = document.createElement('td');
          tdtxt.innerText = value.event;
          let tdtxt2 = document.createElement('td');
          tdtxt2.innerText = value.genre;
          let tdbtn = document.createElement('td');
          let btn = document.createElement('button');
          btn.setAttribute('class', 'myktj__deregister');
          btn.setAttribute('id', value.eventid);
          btn.innerText = 'Deregister';
          btn.addEventListener('click', function (e) {
            return that.deregister(value.eventid);
          })

          tdbtn.appendChild(btn);
          tr.appendChild(tdtxt);
          tr.appendChild(tdtxt2);
          tr.appendChild(tdbtn);
          this._el.querySelector('#' + prop + 'table').appendChild(tr);
        }
        break;
      case 'Teams':
        for (let value of data) {
          let tr = document.createElement('tr');
          tr.setAttribute('id', "team" + value.teamid);
          let tdeventtxt = document.createElement('td');
          tdeventtxt.innerText = value.event;
          let tdteamtxt = document.createElement('td');
          tdteamtxt.innerText = value.teamid;
          let tdmembertxt = document.createElement('td');

          let tdbtn = document.createElement('td');
          let btn = document.createElement('button');
          btn.setAttribute('class', 'myktj__deregister');
          btn.setAttribute('id', value.teamid);
          btn.innerText = 'Leave';
          btn.addEventListener('click', function (e) {
            return that.leaveteam(value.teamid);
          })

          var membertxt = "";
          var j = 0;
          for (let memb of value.members) {
            if (memb != "") {
              if (j == 0) {
                membertxt = membertxt + memb;
                j = 1;
              }
              else {
                membertxt = membertxt + ", " + memb;
                //console.log(membertxt);
              }
            }
          }
          var membertx = document.createTextNode(membertxt);

          tdmembertxt.appendChild(membertx);
          tdbtn.appendChild(btn);
          tr.appendChild(tdeventtxt);
          tr.appendChild(tdteamtxt);
          tr.appendChild(tdmembertxt);
          tr.appendChild(tdbtn);
          this._el.querySelector('#' + prop + 'table').appendChild(tr);
        }
        break;

      case 'Workshops':
        for (let value of data) {
          let tr = document.createElement('tr');
          tr.setAttribute('id', "workshop" + value.workshopid);
          let tdtxt = document.createElement('td');
          tdtxt.innerText = value.workshop;
          let tdbtn = document.createElement('td');
          let btn = document.createElement('button');
          btn.setAttribute('class', 'myktj__deregister');
          btn.setAttribute('id', value.workshopid);
          btn.innerText = 'Deregister';
          btn.addEventListener('click', function (e) {
            return that.leaveworkshop(value.workshopid);
          })

          tdbtn.appendChild(btn);
          tr.appendChild(tdtxt);
          tr.appendChild(tdbtn);
          this._el.querySelector('#' + prop + 'table').appendChild(tr);
        }
        break;
      default:
        break;
    }
  }

  changetab(prop) {
    var that = this;
    var len = that._ui.tabcontentcontainer.children.length;
    for (let a = 0; a < len; a++) {
      that._ui.tabcontainer.children[a].className = that._ui.tabcontainer.children[a].className.replace(" active", "");
      that._ui.tabcontentcontainer.children[a].style.display = 'none';
    }
    that._el.querySelector('#tabcnt' + prop).style.display = 'block';
    that._el.querySelector('#tab' + prop).className += " active";
  }

  leaveteam(teamid) {
    var datatosend = {
      'tokenval': localStorage.getItem('token') || '',
      'teamid': teamid,
    };

    var that = this;
    axios({
      method: 'post',
      url: 'https://api.ktj.in/myktj/leaveteam',
      crossdomain: true,
      data: Object.keys(datatosend).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(datatosend[key])
      }).join('&'),
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(function (response) {
        // that._ui.message.innerHTML = response.data.message;
        var trtoremove = that._el.querySelector('#team' + teamid);
        that._el.querySelector('#Teamstable').removeChild(trtoremove);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  deregister(eventid) {
    var datatosend = {
      'tokenval': localStorage.getItem('token') || '',
      'eventid': eventid,
    };

    var that = this;
    axios({
      method: 'post',
      url: 'https://api.ktj.in/myktj/deregister',
      crossdomain: true,
      data: Object.keys(datatosend).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(datatosend[key])
      }).join('&'),
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(function (response) {
        // that._ui.message.innerHTML = response.data.message;
        var trtoremove = that._el.querySelector('#event' + eventid);
        that._el.querySelector('#Eventstable').removeChild(trtoremove);
        if (response.data.teamid != 0)
          that.leaveteam(response.data.teamid);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  leaveworkshop(workshopid) {
    var datatosend = {
      'tokenval': localStorage.getItem('token') || '',
      'workshopid': workshopid,
    };

    var that = this;
    axios({
      method: 'post',
      url: 'https://api.ktj.in/myktj/leaveworkshop',
      crossdomain: true,
      data: Object.keys(datatosend).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(datatosend[key])
      }).join('&'),
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(function (response) {
        // that._ui.message.innerHTML = response.data.message;
        var trtoremove = that._el.querySelector('#workshop' + workshopid);
        that._el.querySelector('#Workshopstable').removeChild(trtoremove);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  removelayout() {
    let a = this._ui.tabcontainer;
    let b = this._ui.tabcontentcontainer;

    while (a.firstChild) {
      a.removeChild(a.firstChild);
    }
    while (b.firstChild) {
      b.removeChild(b.firstChild);
    }
  }



}
 