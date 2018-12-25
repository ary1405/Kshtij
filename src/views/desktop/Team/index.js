import States from 'core/States';
import * as pages from 'core/pages';
import projectList from 'config/project-list';
import { createDOM } from 'utils/dom';
import { map, randomFloat } from 'utils/math';
import { autobind } from 'core-decorators';
import { visible, active } from 'core/decorators';
import CloseButton from 'views/common/CloseButton';
import template from './team.tpl.html';
import './team.scss';
import axios from 'axios';



@visible()
@active()
export default class DesktopTeamView {

  // Setup ---------------------------------------------------------------------

  constructor(options) {

    this._el = options.parent.appendChild(
      createDOM(template()),
    );

    this._ui = {
      titles: this._el.querySelectorAll('.js-team__title'),
      bodies: this._el.querySelectorAll('.js-team__body'),
      close: this._el.querySelector('.js-team__close'),
      tabcontainer: this._el.querySelector('.team__tab'),
      tabme: this._el.querySelector('.team__text')
    };

    this._closeButton = new CloseButton({
      parent: this._ui.close,
      clickCallback: this._onCloseClick,
    });

     
  
   this.onclickteamtab();
 
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
 
      onclickteamtab(){
        var that= this;
        var urlcore='https://api.ktj.in/ourteam/core';
        var urlweb='https://api.ktj.in/ourteam/web';
        var urldesign='https://api.ktj.in/ourteam/design';
        

      let leftmenu= document.createElement('div');
      leftmenu.setAttribute('class','ourteamtab');

      let corebtn= document.createElement('button');
      corebtn.setAttribute('id','coreteam');
      corebtn.addEventListener('click', that.getteamdata(urlcore));
      

      let webbtn= document.createElement('button');
      webbtn.setAttribute('id','webteam');
      webbtn.addEventListener('click', that.getteamdata(urlweb));
    

      let designbtn= document.createElement('button');
      designbtn.setAttribute('id','designteam');
      designbtn.addEventListener('click', that.getteamdata(urldesign));

      let coretxt = document.createTextNode('Core Team');
      corebtn.appendChild(coretxt);
      let webtxt = document.createTextNode('Web Team');
      webbtn.appendChild(webtxt);
      let dsgntxt = document.createTextNode('Design Team');
      designbtn.appendChild(dsgntxt);

      leftmenu.appendChild(corebtn);
      leftmenu.appendChild(webbtn);
      leftmenu.appendChild(designbtn);

      this._ui.tabme.appendChild(leftmenu); 
          
   

      /*  getteamtype(teamtype)
       {
        if(teamtype='coreteam')
        {
          return axios({
        method: 'get',
        url: 'https://api.ktj.in/ourteam/core',
        crossdomain: true,
              })
        }
        
        if(teamtype='webteam')
        {
          return axios({
        method: 'get',
        url: 'https://api.ktj.in/ourteam/web',
        crossdomain: true,
              })
        }

        if(teamtype='designteam')
        {
          return axios({
        method: 'get',
        url: 'https://api.ktj.in/ourteam/design',
        crossdomain: true,
              })
        }
      } */
    
   }  
  
  getteamdata(urltype) {
    
    var that = this;
      
    

      axios({
      method: 'get',
      url: urltype,                                   //'https://api.ktj.in/ourteam/core',
      crossdomain: true,
  })  
      .then(function (response) {
        for (let eve of response.data) {

         
          let thumb = document.createElement('div');
          thumb.setAttribute('class','singlecard');
          
          let memphoto=document.createElement('img');
          memphoto.src=eve.photo; 

          let namecard = document.createElement('h2');
          let nametxt=document.createTextNode(eve.name);

          let postcard=document.createElement('h4');
          let posttxt=document.createTextNode(eve.post);

          let bottomcard = document.createElement('h3');
          let mailtxt=document.createTextNode(eve.mail);
          let breaktag=document.createElement('br');
          let phonetxt=document.createTextNode(eve.phone);

          //let hovercard= document.createElement('h5');
          //hovercard.setAttribute('class','hvrcard');
          //let hvrtxt= document.createTextNode(eve.type);
          
          //to be updated later as per the demand-start
          if(eve.type!='core'){
            postcard.style.fontSize="2rem";
          }
          //to be updated later as per the demand-end


          bottomcard.appendChild(mailtxt);
          bottomcard.appendChild(breaktag);
          bottomcard.appendChild(phonetxt);
          namecard.appendChild(nametxt);
          postcard.appendChild(posttxt);
          //hvrcard.appendChild(hvrtxt);

         

          //thumb.appendChild(hovercard);
          thumb.appendChild(namecard);
          thumb.appendChild(memphoto);
  
          thumb.appendChild(postcard);
          thumb.appendChild(bottomcard); 
          
        
          
          that._ui.tabcontainer.appendChild(thumb);

        
         
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    
  }

 
 

  


}




