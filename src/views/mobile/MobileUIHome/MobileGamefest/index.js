import States from 'core/States';
import * as pages from 'core/pages';
import projectList from 'config/project-list';
import { createDOM } from 'utils/dom';
import { map, randomFloat } from 'utils/math';
import { autobind } from 'core-decorators';
import { visible, active } from 'core/decorators';
import CloseButton from 'views/common/CloseButton';
import template from './mobile_gamefest.tpl.html';
import './mobile_gamefest.scss';
import axios from 'axios';


@visible()
@active()
export default class MobileGamefest{

  // Setup ---------------------------------------------------------------------

  constructor(options) {

    this._el = options.parent.appendChild(
      createDOM(template()),
    );

    this._ui = {
      titles: this._el.querySelectorAll('.js-gamefest__title'),
      bodies: this._el.querySelectorAll('.js-gamefest__body'),
      close: this._el.querySelector('.js-gamefest__close'),
      tabcontainer: this._el.querySelector('.gamefest__tab'),
      tabcontentcontainer: this._el.querySelector('.gamefest__tabcontent__container'),
      popup: this._el.querySelector('.popup'),
      popupclose: this._el.querySelector('.popup__close'),
      popup1: this._el.querySelector('.popup1'),
      popupclose1: this._el.querySelector('.popup__close1'),
      popup2: this._el.querySelector('.popup2'),
      popupclose2: this._el.querySelector('.popup__close2'),
      popup3: this._el.querySelector('.popup3'),
      popupclose3: this._el.querySelector('.popup__close3'),
    };

    this._closeButton = new CloseButton({
      parent: this._ui.close,
      clickCallback: this._onCloseClick,
    });

    //this.geteventdata();
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
    if (this._ui.tabcontentcontainer.children.length === 0) {
      this.geteventdata();
    }
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

  geteventdata() {
    var that = this;
    axios({
      method: 'get',
      url: 'https://api.ktj.in/events/10',
      crossdomain: true,
    })
      .then(function (response) {
        for (let eve of response.data) {
          let btn = document.createElement('button');
          btn.setAttribute('class', 'tablinks');
          btn.setAttribute('id', 'tab' + eve.id);
          btn.style.fontSize = "1.5em";
          //btn.style.padding = "10px 5px";
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
          aboutbtn.style.fontSize='1em';
          let rulesbtn = document.createElement('button');
          rulesbtn.setAttribute('class', 'verlinks');
          rulesbtn.setAttribute('id', 'btnrules' + eve.id);
          let rulestxt = document.createTextNode('Rules');
          rulesbtn.appendChild(rulestxt);
          rulesbtn.style.fontSize='1em';
          let psbtn = document.createElement('button');
          psbtn.setAttribute('class', 'verlinks');
          psbtn.setAttribute('id', 'btnps' + eve.id);
          let pstxt = document.createTextNode('Schedule');
          psbtn.appendChild(pstxt);
          psbtn.style.fontSize='1em';
          let contactbtn = document.createElement('button');
          contactbtn.setAttribute('class', 'verlinks');
          contactbtn.setAttribute('id', 'btncontact' + eve.id);
          let contacttxt = document.createTextNode('Contact');
          contactbtn.appendChild(contacttxt);
          contactbtn.style.fontSize='1em';
          let regisbtn = document.createElement('button');
          regisbtn.setAttribute('class', 'verlinks');
          regisbtn.setAttribute('id', 'btnregis' + eve.id);
          let registxt = document.createTextNode('Register');
          regisbtn.appendChild(registxt);
          regisbtn.style.fontSize='1em';

          let eventwisediv = document.createElement('div');

          let aboutdiv = document.createElement('div');
          aboutdiv.setAttribute('class', 'verttabcontent');
          aboutdiv.setAttribute('id', 'about' + eve.id);
          aboutdiv.innerHTML = eve.about;

          let rulesdiv = document.createElement('div');
          rulesdiv.setAttribute('class', 'verttabcontent');
          rulesdiv.setAttribute('id', 'rules' + eve.id);
          rulesdiv.innerHTML = eve.rules;

          let psdiv = document.createElement('div');
          psdiv.setAttribute('class', 'verttabcontent');
          psdiv.setAttribute('id', 'ps' + eve.id);
          psdiv.innerHTML = eve.ps;

          let contactdiv = document.createElement('div');
          contactdiv.setAttribute('class', 'verttabcontent');
          contactdiv.setAttribute('id', 'contact' + eve.id);
          contactdiv.innerHTML = eve.contact;



          let regisdiv = document.createElement('div');
          regisdiv.setAttribute('class', 'verttabcontent');
          regisdiv.setAttribute('id', 'regis' + eve.id);
          let registext = document.createTextNode(eve.register);
          regisdiv.appendChild(registext);


          bottomtabdiv.appendChild(aboutbtn);
          //
          bottomtabdiv.appendChild(rulesbtn);
          bottomtabdiv.appendChild(psbtn);
          bottomtabdiv.appendChild(contactbtn);
          bottomtabdiv.appendChild(regisbtn);

          eventwisediv.appendChild(aboutdiv);
          //
          eventwisediv.appendChild(rulesdiv);
          eventwisediv.appendChild(psdiv);
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
          // 
          //   
          // 
          rulesbtn.addEventListener('click', function (e) {
            return that.showeventdetail('rules', eve.id);
          });
          psbtn.addEventListener('click', function (e) {
            return that.showeventdetail('ps', eve.id);
          });
          contactbtn.addEventListener('click', function (e) {
            return that.showeventdetail('contact', eve.id);
          });
          regisbtn.addEventListener('click', function (e) {
            return that.payme(eve.id);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  clicktochangeevent(eventid) {
    var that = this;
    var len = that._ui.tabcontentcontainer.children.length;
    for (let a = 0; a < len; a++) {
      that._ui.tabcontainer.children[a].className = that._ui.tabcontainer.children[a].className.replace(" active", "");
      that._ui.tabcontentcontainer.children[a].style.display = 'none';
    }
    that._el.querySelector('#tabcnt' + eventid).style.display = 'block';
    that._el.querySelector('#tab' + eventid).className += " active";

    that._el.querySelector('#about' + eventid).style.display = 'block';
    that._el.querySelector('#btnabout' + eventid).className += " active";
  }

  showeventdetail(divtype, eventid) {
    var that = this;
    var detailtabs = that._el.querySelectorAll('.verlinks');
    var detail = that._el.querySelectorAll('.verttabcontent')
    for (let a = 0; a < detail.length; a++) {
      detailtabs[a].className = detailtabs[a].className.replace(" active", "");
      detail[a].style.display = 'none';
    }
    that._el.querySelector('#' + divtype + eventid).style.display = 'block';
    that._el.querySelector('#btn' + divtype + eventid).className += " active";
  }

  payme(eventid){
    var that =this;
    

          var datatosend = {
            'tokenval': localStorage.getItem('token') || '',
            'eventid': eventid,
          };
      
          
          axios({
            method: 'post',
            url: 'https://api.ktj.in/events/gamefestcheck',
            crossdomain: true,
            data: Object.keys(datatosend).map(function (key) {
              return encodeURIComponent(key) + '=' + encodeURIComponent(datatosend[key])
            }).join('&'),
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
              .then(function (response) {
                if(eventid==34){
              if(response.data.status== 1){
                that._el.querySelector('#regis' + eventid).innerHTML ='Registration Status: ' + response.data.message ;
                that.showeventdetail('regis', eventid);
              }
              else if(response.data.status==0) {
                let paynotice= document.createElement('h3');
                paynotice.setAttribute('class','noticepay');
                paynotice.innerHTML='You need to pay 50rs to ensure your registration<br>Keep your transaction-id safe, to ignore any trouble.<br><br><center>Proceed with:</center> ';
                if (eventid == 34) {
                  paynotice.innerHTML = 'You need to pay 20rs to ensure your registration<br>Keep your transaction-id safe, to ignore any trouble.<br><br><center>Proceed with:</center> ';
                }
               
                let payopt = document.createElement('div');
                payopt.setAttribute('class', 'optpay');

                let payoptbtn1=document.createElement('img');
                payoptbtn1.setAttribute('class','btnoptpay');
                payoptbtn1.src = 'images/share/gpay.jpg'    //img url- for experimental purpose
                let payoptbtn2=document.createElement('img');
                payoptbtn2.setAttribute('class','btnoptpay');
                payoptbtn2.src = 'images/share/phonepe.jpg'
                let payoptbtn3=document.createElement('img');
                payoptbtn3.setAttribute('class','btnoptpay');
                payoptbtn3.src = 'images/share/paytm.jpg'

                payopt.appendChild(payoptbtn1);
                payopt.appendChild(payoptbtn2);
                payopt.appendChild(payoptbtn3);

                payoptbtn1.addEventListener('click', function(){
                  that._ui.popup1.style.display = 'block';
                  that._el.querySelector('.popup-container1 input').setAttribute('id','tid'+ eventid);
                  that._el.querySelector('.popup-container1 button').addEventListener('click',function(){
                    return that.gamefestregister(eventid);
                  })
                });
                that._ui.popupclose1.addEventListener('click', function () {
                  that._ui.popup1.style.display = 'none';
                });

                payoptbtn2.addEventListener('click', function(){
                  that._ui.popup2.style.display = 'block';
                  that._el.querySelector('.popup-container2 input').setAttribute('id','tid'+ eventid);
                  that._el.querySelector('.popup-container2 button').addEventListener('click',function(){
                    return that.gamefestregister(eventid);
                  })
                });
                that._ui.popupclose2.addEventListener('click', function () {
                  that._ui.popup2.style.display = 'none';
                });

                payoptbtn3.addEventListener('click', function(){
                  that._ui.popup3.style.display = 'block';
                  that._el.querySelector('.popup-container3 input').setAttribute('id','tid'+ eventid);
                  that._el.querySelector('.popup-container3 button').addEventListener('click',function(){
                    return that.gamefestregister(eventid);
                  })
                });
                that._ui.popupclose3.addEventListener('click', function () {
                  that._ui.popup3.style.display = 'none';
                });

                

                that._el.querySelector('#regis' + eventid).appendChild(paynotice);
                that._el.querySelector('#regis' + eventid).appendChild(payopt);
                that.showeventdetail('regis', eventid);
                
              }

              else{
                that._el.querySelector('#regis' + eventid).innerHTML ='Registration Status: ' + response.data.message ;
        that.showeventdetail('regis', eventid);

              }
            }
            else{
              that._el.querySelector('#regis' + eventid).innerHTML ='Registration Status: Registration for this event is finished.'  ;
              that.showeventdetail('regis', eventid);
            }
            }) 
            .catch(function (error) {
              console.log(error);
            })

  }
  gamefestregister(eventid) {
    var datatosend = {
      'tokenval': localStorage.getItem('token') || '',
      'eventid': eventid,
      'transactionid':this._el.querySelector('#tid'+eventid).value
    };

    var that = this;
    axios({
      method: 'post',
      url: 'https://api.ktj.in/events/gamefestregister',
      crossdomain: true,
      data: Object.keys(datatosend).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(datatosend[key])
      }).join('&'),
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
        .then(function (response) {
        that._ui.popup.style.display = 'none';  
        that._el.querySelector('#regis' + eventid).innerHTML ='Registration Status: ' + response.data.message + '<br/><a href="https://api.ktj.in/team" target="_blank">Click here</a> to create your team';
        that.showeventdetail('regis', eventid);
      }) 
      .catch(function (error) {
        console.log(error);
      })
  }
}
