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
        bandekanaam: this._el.querySelector('.myktj__name'),
        eventstable : this._el.querySelector('.myktj__eventstable'),
        teamtable: this._el.querySelector('.myktj__teamtable'),
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
    this._ui.bandekanaam.innerText = localStorage.getItem('name') || '';
    this.getdata();
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
    this.removedata();
  }

  // Events --------------------------------------------------------------------

  @autobind
  _onCloseClick() {
    States.router.navigateTo(pages.HOME);
  }

  removedata(){
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
      if(response.data.userdata)
      for (let value of response.data.userdata.eventdata) {
        var trtoremove = that._el.querySelector('#id'+value.eventid);
        that._ui.eventstable.removeChild(trtoremove);   
      }
      if(response.data.userdata)
      for (let value of response.data.userdata.teamdata) {
        var trtoremove = that._el.querySelector('#' + value.teamid);
        that._ui.teamtable.removeChild(trtoremove);
      }
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  getdata(){
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
      if(response.data.userdata)
      for (let value of response.data.userdata.eventdata) 
      {
        var tr = document.createElement('tr');                    // Create tr 
        var tdtxt = document.createElement('td');                 // Create td for the event name
        var tdbtn = document.createElement('td');                 // Create td for button
        var btn = document.createElement('button');               // Create the deregister button
        btn.setAttribute('class', 'myktj__deregister');             // Setting the class of the button
        btn.setAttribute('id', value.eventid);                    // Setting the class of the button
        var btntxt = document.createTextNode('Deregister');       // Creating the text of button
        var txt = document.createTextNode(value.event);           // Putting the event data
        tr.setAttribute('id', "id"+value.eventid);

        tdtxt.appendChild(txt);                                   // Put the event date in its td
        tr.appendChild(tdtxt);                                    // Put the above td into tr
        btn.appendChild(btntxt);                                  // Put the derigter txt in the btn
        tdbtn.appendChild(btn);                                   // Put the btn in its td
        tr.appendChild(tdbtn);                                    // Put the above td into tr
        that._ui.eventstable.appendChild(tr);                     // Finally put everything inside table
        btn.addEventListener('click', function(e){
          return that.deregister(value.eventid);
        });
      }
      for (let value of response.data.userdata.teamdata) {
        var tr2 = document.createElement('tr');                    // Create tr 
        var tdeventtxt = document.createElement('td');                 // Create td for the event name
        var tdteamtxt = document.createElement('td');
        var tdmembertxt = document.createElement('td');
        var tdbtn2 = document.createElement('td');                 // Create td for button
        var btn2 = document.createElement('button');               // Create the deregister button
        btn2.setAttribute('class', 'myktj__deregister');             // Setting the class of the button
        btn2.setAttribute('id', value.teamid);                    // Setting the class of the button
        var btntxt2 = document.createTextNode('Leave');       // Creating the text of button
        var eventtxt = document.createTextNode(value.event);           // Putting the event data
        var teamtxt = document.createTextNode(value.teamid);
        var membertxt="";
        var j=0;
        for(let memb of value.members){
            if(memb!=""){
              if(j==0){
              membertxt= membertxt + memb;
              j=1;
              }
              else{
              membertxt= membertxt +", "+ memb;
              //console.log(membertxt);
              }
            }
         } 
        var membertx=document.createTextNode(membertxt);
        tr2.setAttribute('id', value.teamid);
        tdeventtxt.appendChild(eventtxt);                                   // Put the event date in its td
        tr2.appendChild(tdeventtxt);                                    // Put the above td into tr
        tdteamtxt.appendChild(teamtxt);
        tr2.appendChild(tdteamtxt);
        tdmembertxt.appendChild(membertx);
        tr2.appendChild(tdmembertxt);
        btn2.appendChild(btntxt2);                                  // Put the derigter txt in the btn
        tdbtn2.appendChild(btn2);                                   // Put the btn in its td
        tr2.appendChild(tdbtn2);                                    // Put the above td into tr
        that._ui.teamtable.appendChild(tr2);                     // Finally put everything inside table
        btn2.addEventListener('click', function (e) {
          return that.leaveteam(value.teamid);
        });
      }
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  deregister(eventid){
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
        var trtoremove = that._el.querySelector('#id'+eventid);
        that._ui.eventstable.removeChild(trtoremove);
        if(response.data.teamid !=0)
          that.leaveteam(response.data.teamid);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  leaveteam(teamid){
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
        var trtoremove = that._el.querySelector('#' + teamid);
        that._ui.teamtable.removeChild(trtoremove);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }


}
 