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
    this.setleftlayout();
    this.geteventdata('core');
    this.geteventdata('design');
    this.geteventdata('web');
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

  setleftlayout()
  {
    var that = this;
    let leftmenu = document.createElement('div');
    leftmenu.setAttribute('class', 'ourteamtab');

    let corebtn = document.createElement('button');
    corebtn.setAttribute('id', 'coreteam');
    corebtn.addEventListener('click', function (e) {
      return that.showteam('core');
    });
    corebtn.innerHTML = 'Core Team';

    let webbtn = document.createElement('button');
    webbtn.setAttribute('id', 'webteam');
    webbtn.addEventListener('click', function (e) {
      return that.showteam('web');
    });
    webbtn.innerHTML = 'Web Team';

    let designbtn = document.createElement('button');
    designbtn.setAttribute('id', 'designteam');
    designbtn.addEventListener('click', function (e) {
      return that.showteam('design');
    });
    designbtn.innerHTML = 'Design Team';

    leftmenu.appendChild(corebtn);
    leftmenu.appendChild(webbtn);
    leftmenu.appendChild(designbtn);

    this._ui.tabme.appendChild(leftmenu); 
  }
 
  geteventdata(types) {
    var that = this;
    axios({
      method: 'get',
      url: 'https://api.ktj.in/ourteam/'+types,
      crossdomain: true,
    })
    .then(function (response) {
      // Container div for each type
      let containerdiv = document.createElement('div');
      containerdiv.setAttribute('class', types + 'teamdiv');
      containerdiv.style.display = 'none';
      that._ui.tabcontainer.appendChild(containerdiv);

      for (let member of response.data) {
        // For each thumbnail
        let thumb = document.createElement('div');
        thumb.setAttribute('class', 'singlecard');

        let memphoto = document.createElement('img');
        memphoto.src = member.photo;

        let namecard = document.createElement('h2');
        namecard.innerText = member.name;

        let postcard = document.createElement('h4');
        postcard.innerText = member.post;

        let bottomcard = document.createElement('h3');
        let mailtxt = document.createTextNode(member.mail);
        let breaktag = document.createElement('br');
        let phonetxt = document.createTextNode(member.phone);

        let hovercard= document.createElement('div');
        hovercard.setAttribute('class','hvrcard');
        let sociallinks1= document.createElement('img');
        let sociallinks2= document.createElement('img');
        sociallinks1.setAttribute('class','linklogo');
        sociallinks2.setAttribute('class','linklogo');
        sociallinks1.src="images/share/facebook-logo.png";
        sociallinks2.src="images/share/linkedin-logo.png";
        
        sociallinks1.addEventListener("click", function(){
          window.open(member.fb, '_blank');
      });
        sociallinks2.addEventListener("click", function(){
          window.open(member.linkedin, '_blank');
    });

        //to be updated later as per the demand-start
        if (member.type != 'core') {
          //postcard.style.fontSize = "2rem";
          
        }
        //to be updated later as per the demand-end

        bottomcard.appendChild(mailtxt);
        bottomcard.appendChild(breaktag);
        bottomcard.appendChild(phonetxt);
        hovercard.appendChild(sociallinks1);
        hovercard.appendChild(sociallinks2);
        
        //hovercard.appendChild(hvrtxt);

        
        thumb.appendChild(namecard);
        thumb.appendChild(memphoto);
        thumb.appendChild(postcard);
        thumb.appendChild(bottomcard);
        thumb.appendChild(hovercard);
        containerdiv.appendChild(thumb);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  showteam(types)
  {
    var that = this;
    let teamdivs = that._el.querySelectorAll("div[class$=teamdiv]");

    for(let div of teamdivs)
    {
      if(div.className == types+'teamdiv')
      {
        div.style.display = 'block'
      }
      else
      {
        div.style.display = 'none';
      }
    }
  }

}




