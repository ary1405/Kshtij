import States from 'core/States';
import * as pages from 'core/pages';
import projectList from 'config/project-list';
import { createDOM } from 'utils/dom';
import { map, randomFloat } from 'utils/math';
import { autobind } from 'core-decorators';
import { visible, active } from 'core/decorators';
import CloseButton from 'views/common/CloseButton';
import template from './project_view.tpl.html';
import './project_view.scss';


@visible()
@active()
export default class DesktopProjectView {

  // Setup ---------------------------------------------------------------------

  constructor(options) {

    this._el = options.parent.appendChild(
      createDOM(template()),
    );

    this._ui = {
      columns: this._el.querySelector('.js-project__viewColumns'),
      mediaContainer: this._el.querySelector('.js-project__medias'),
      title: this._el.querySelector('.js-project__viewTitle'),
      description: this._el.querySelector('.js-project__viewDescription'),
      date: this._el.querySelector('.js-project__date'),
      link: this._el.querySelector('.js-project__link'),
      close: this._el.querySelector('.js-project__close'),
      loading: this._el.querySelector('.js-project__loading'),
      back: this._el.querySelector('.js-project__back'),
      viewText: this._el.querySelector('.js-project__viewText'),
      medias: [],
    };

    this._closeButton = new CloseButton({
      parent: this._ui.close,
      clickCallback: this._onCloseClick,
    });

    this._rotations = [];
    this._playing = [];

    this._deltaY = 0;
    this._deltaTargetY = 0;
    this._easing = 0.2;

    this._needsUpdate = false;
    this._backShowed = false;

    this._setupEvents();
  }

  _setupEvents() {
    this._ui.back.addEventListener('click', this._onBackClick);
    Signals.onResize.add(this._onResize);
    Signals.onScrollWheel.add(this._onScrollWheel);
  }

  // State ---------------------------------------------------------------------

  show({ delay = 0 } = {}) {
    this._el.style.display = 'block';
    TweenLite.to(
      this._el,
      0.6,
      {
        opacity: 1,
        ease: 'Power2.easeOut',
      },
    );

    this._deltaY = 0;
    this._deltaTargetY = 0;

    this._closeButton.show();
  }

  hide({ delay = 0 } = {}) {
    TweenLite.to(
      this._el,
      0.6,
      {
        // delay: 0.4,
        opacity: 0,
        ease: 'Power2.easeOut',
        onComplete: () => {
          this._el.style.display = 'none';
        },
      },
    );

    this._closeButton.hide();

    this.deactivate();
  }

  updateProject() {
    const project = projectList.getProject(States.router.getLastRouteResolved().params.id);

    this._ui.loading.style.transform = 'scaleX(0)';
    TweenLite.set(this._ui.loading, { opacity: 1 });
    TweenLite.set(this._ui.back, { opacity: 0, display: 'none' });
    this._loadingNeedsUpdate = true;
    this._toLoad = 0;
    this._loaded = 0;
    this._targetLoad = 0;
    this._currentLoad = 0;

    this._ui.title.innerHTML = project.title;
    this._ui.description.innerHTML = project.description;
    this._ui.date.innerHTML = project.date;
   /*  if (project.url) {
      this._ui.link.innerHTML = `<a href="${project.url}" target="_blank">${project.link}</a>`;
    } else {
      this._ui.link.innerHTML = `${project.link}`;
    } */
    this._ui.link.innerHTML = project.link;
    this._ui.link.addEventListener('click', this._onClickUrl);

    while (this._ui.columns.firstChild) {
      this._ui.columns.removeChild(this._ui.columns.firstChild);
    }
 
    while (this._ui.mediaContainer.firstChild) {
      this._ui.mediaContainer.removeChild(this._ui.mediaContainer.firstChild);
    }

    // clearTimeout(this._updateTimeout);
    // this._updateTimeout = setTimeout(() => {
    this._rotations = [];

    for (let i = 0; i < project.medias.length; i++) {
      const media = project.medias[i]; 
      if (media.type === 'image') {
        const img = new Image();
        img.classList.add('js-project__viewImg');
        img.classList.add('js-project__viewMedia');
        img.classList.add('project__viewImg');
        // img.onload = this.activate.bind(this);
        img.onload = this._onImgLoad;
        
        img.setAttribute('data-id', project.medias[i].nameid);
        img.addEventListener('click', this._onClickGenre);

        img.src = media.url;
        this._ui.mediaContainer.appendChild(img);
      
        this._toLoad++;
      } else {
       
      }

      this._rotations.push({ x: randomFloat(-1, 1), y: randomFloat(-1, 1) });
    }

      this._ui.medias = this._ui.mediaContainer.querySelectorAll('.js-project__viewMedia');
      // }, 300);

  }
  @autobind
  _onClickUrl(){
    States.router.navigateTo(pages.TEAM);
  }
  @autobind
  _onClickGenre(event) {
     
    switch( event.target.getAttribute('data-id')){
     
      case 'one_g':
     States.router.navigateTo(pages.GENESIS);
     break;
    
     case 'two_g':
     States.router.navigateTo(pages.MECH);
     break;

     case 'three_g':
     States.router.navigateTo(pages.CODE);
     break;

     case 'four_g':
     States.router.navigateTo(pages.ROBO);
     break;

     case 'five_g':
     States.router.navigateTo(pages.STRG);
     break;

     case 'six_g':
     States.router.navigateTo(pages.TECH);
     break;

     case 'seven_g':
     States.router.navigateTo(pages.QUIZ);
     break;

     case 'eight_g':
     States.router.navigateTo(pages.CONCEPT);
     break;

     case 'nine_g':
     States.router.navigateTo(pages.IBM);
     break;

     case 'ten_g':
     States.router.navigateTo(pages.GAMEFEST);
     break;
      //for workshop route ~each media 
     case 'one_work':
     States.router.navigateTo(pages.WORKSHOP);
     break;
     case 'two_work':
     States.router.navigateTo(pages.WORKSHOP);
     break;
     case 'three_work':
     States.router.navigateTo(pages.WORKSHOP);
     break;
     case 'four_work':
     States.router.navigateTo(pages.WORKSHOP);
     break;
     case 'five_work':
     States.router.navigateTo(pages.WORKSHOP);
     break;
    }
                      } 


  @autobind
  _onImgLoad() {
    this._loaded++;

    this._targetLoad = this._loaded / this._toLoad;

    if (this._loaded === this._toLoad) {
      this.activate();
    }
  }

  activate() {

    TweenLite.killTweensOf(this._ui.loading);
    this._ui.loading.style.display = 'block';
    TweenLite.to(
      this._ui.loading,
      0.5,
      {
        opacity: 0,
        ease: 'Power2.easeOut',
      },
    );

    TweenLite.killTweensOf(this._ui.mediaContainer);
    this._ui.mediaContainer.style.display = 'block';
    TweenLite.fromTo(
      this._ui.mediaContainer,
      1,
      {
        y: 200,
        opacity: 0,
      },
      {
        delay: 0.3,
        y: 0,
        opacity: 1,
        ease: 'Power4.easeOut',
        onComplete: () => {
          this._loadingNeedsUpdate = false;
          this._ui.loading.style.display = 'none';
        },
      },
    );
  }

  deactivate() {
    TweenLite.killTweensOf(this._ui.loading);
    this._ui.loading.style.display = 'block';

    TweenLite.killTweensOf(this._ui.mediaContainer);
    TweenLite.to(
      this._ui.mediaContainer,
      0.6,
      {
        delay: 0,
        y: 200,
        opacity: 0,
        ease: 'Power4.easeOut',
        onComplete: () => {
          while (this._ui.mediaContainer.firstChild) {
            this._ui.mediaContainer.removeChild(this._ui.mediaContainer.firstChild);
          }

          this._deltaY = 0;
          this._deltaTargetY = 0;

          this._ui.mediaContainer.style.display = 'none';
        },
      },
    );
  }

  // Events --------------------------------------------------------------------
 
  
  @autobind
  _onBackClick() {
    States.router.navigateTo(pages.HOME);
  }

  @autobind
  _onResize(vw, vh) {
    this.resize(vw, vh);
  }

  @autobind
  _onCloseClick() {
    States.router.navigateTo(pages.HOME);
  }

  resize(vw, vh) {
    this._vh = vh;
    this._deltaTargetY = 0;
    this._deltaY = 0;
    this._needsUpdate = true;

    const mediaContainerRect = this._ui.mediaContainer.getBoundingClientRect();
    const mediaHeight = mediaContainerRect.height;
    const height = this._el.offsetHeight - mediaHeight;

    if (window.innerHeight < height) {
      this._deltaTargetY = window.innerHeight - height;
    }
  }

  @autobind
  _onScrollWheel(event) {
    if (this._ui.medias.length > 0) {
      const lastMediaHeight = this._ui.medias[this._ui.medias.length - 1].offsetHeight;
      const mediaContainerRect = this._ui.mediaContainer.getBoundingClientRect();
      const height = mediaContainerRect.height;
      const max = height + ( this._el.offsetHeight - height ) - window.innerHeight * 0.5 - lastMediaHeight * 0.5;

      this._deltaTargetY -= event.deltaMode === 1 ? event.deltaY * 20 : event.deltaY * 0.5;
      this._deltaTargetY = Math.max( -max, Math.min( 0, this._deltaTargetY ) );

      if (Math.abs(max) - Math.abs(this._deltaTargetY) < 300 && !this._backShowed) {
        this._ui.back.style.display = 'block';
        TweenLite.killTweensOf(this._ui.back);
        TweenLite.to(
          this._ui.back,
          0.8,
          {
            opacity: 0.7,
            ease: 'Power2.easeOut',
          },
        );

        this._backShowed = true;
      } else if (Math.abs(max) - Math.abs(this._deltaTargetY) >= 300 && this._backShowed) {
        TweenLite.killTweensOf(this._ui.back);
        TweenLite.to(
          this._ui.back,
          0.8,
          {
            opacity: 0,
            ease: 'Power2.easeOut',
            onComplete: () => {
              this._ui.back.style.display = 'none';
            },
          },
        );

        this._backShowed = false;
      }

      this._easing = event.deltaMode === 1 ? 0.05 : 0.2;


      this._needsUpdate = true;
    }
  }

  // Update --------------------------------------------------------------------
  update() {

    if (this._loadingNeedsUpdate) this._updateLoading();

    if (this._needsUpdate) {
      this._updateMediaContainer();
      this._updateMedias();
    }
  }

  _updateLoading() {
    this._currentLoad += (this._targetLoad - this._currentLoad) * 0.1;

    this._ui.loading.style.transform = `scaleX(${this._currentLoad})`;
  }

  _updateMediaContainer() {
    this._deltaY += (this._deltaTargetY - this._deltaY) * this._easing;
    if (Math.abs(this._deltaTargetY - this._deltaY) < 0.1) {
      this._deltaY = this._deltaTargetY;
      this._needsUpdate = false;
    }

    this._ui.mediaContainer.style.transform = `translate3d(0,${this._deltaY}px,0)`;
  }

  _updateMedias() {
    for (let i = 0; i < this._ui.medias.length; i++) {
      this._ui.medias[i].style.transform = 'perspective(500px) translate3d(0, 0, 0) rotate3d(0, 0, 0, 0deg)';
      const mediaRect = this._ui.medias[i].getBoundingClientRect();
      const minValue = -600;
      const maxValue = -200;
      const opacity = i === this._ui.medias.length - 1 ? 1 : map( Math.max( minValue, Math.min( maxValue, mediaRect.top ) ), minValue, maxValue, -1.5, 1);
      const tween = i === this._ui.medias.length - 1 ? 1 : Math.abs( map( Math.max( minValue, Math.min( maxValue, mediaRect.top ) ), minValue, maxValue, 0, 1) );
      const translate = i === this._ui.medias.length - 1 ? 0 : Math.abs( tween - 1 ) * -300;
      const rotation = i === this._ui.medias.length - 1 ? 0 : Math.abs( tween - 1 ) * 60;

      if (this._ui.medias[i].paused !== undefined && mediaRect.top > -mediaRect.height && mediaRect.top <= this._vh) {

        let toPlay = true;

        for (let j = 0; j < this._playing.length; j++) {
          const playingY = this._playing[j].getBoundingClientRect().top + this._playing[j].offsetHeight * 0.5;
          const currentY = mediaRect.top + this._ui.medias[i].offsetHeight * 0.5;
          const playingDistance = Math.abs(window.innerHeight * 0.5 - playingY);
          const currentVideoDistance = Math.abs(window.innerHeight * 0.5 - currentY);
          if (playingDistance < currentVideoDistance) {
            toPlay = false;
          } else if (this._ui.medias[i] !== this._playing[j]) {
            this._playing[j].pause();
          }
        }

        if (toPlay) {
          this._ui.medias[i].play();
          this._playing.push(this._ui.medias[i]);
        }

      } else if (this._ui.medias[i].paused !== undefined) {
        this._ui.medias[i].pause();

        const index = this._playing.indexOf(this._ui.medias[i]);
        if (index > -1) {
          this._playing.splice(index, 1);
        }
      }

      this._ui.medias[i].style.opacity = opacity;
      this._ui.medias[i].style.transform = `perspective(500px) translate3d(0, 0, ${translate}px) rotate3d(${this._rotations[i].x}, ${this._rotations[i].y}, 0, ${rotation}deg)`;
    }
  }

}
