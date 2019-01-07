import States from 'core/States';
import * as pages from 'core/pages';
import projectList from 'config/project-list';
import { createDOM } from 'utils/dom';
import { autobind } from 'core-decorators';
import { visible } from 'core/decorators';
import ProjectDescription from './ProjectDescription';
import Title from './Title';
import List from './List';
import Menu from './Menu';
//import MobileAbout from './MobileAbout';

import MobileCode from './MobileCode';
import MobileConcept from './MobileConcept';
import MobileGenesis from './MobileGenesis';
import MobileGamefest from './MobileGamefest';
import MobileIbm from './MobileIbm';
import MobileMech from './MobileMech';
import MobileQuiz from './MobileQuiz';
import MobileRobo from './MobileRobo';
import MobileStrg from './MobileStrg';
import MobileTech from './MobileTech';
import MobileTeam from './MobileTeam';
import MobileLogin from './MobileLogin';
import MobileMyktj from './MobileMyktj';
import MobileWorkshop from './MobileWorkshop';

import Networks from './Networks';
import Scroll from './Scroll';
import template from './ui_home.tpl.html';
import './ui_home.scss';


@visible()
export default class MobileUIHome {

  // Setup ---------------------------------------------------------------------

  constructor(options) {

    this._el = options.parent.appendChild(
      createDOM(template()),
    );

    // this._setupProjectDescription();
    this._setupTitle();
    this._setupList();
    this._setupMenu();
    //this._setupAbout();

    this._setupCode();
    this._setupConcept();
    this._setupGenesis();
    this._setupGamefest();
    this._setupIbm();
    this._setupMech();
    this._setupQuiz();
    this._setupRobo();
    this._setupStrg();
    this._setupTech();
    this._setupTeam();
    this._setupLogin();
    this._setupMyktj();
    this._setupWorkshop();

  // this._setupNetworks();
    this._setupScroll();

    this._setupEvents();
  }

  _setupProjectDescription() {
    this._projectDescription = new ProjectDescription({
      parent: this._el,
    });

    this._projectDescription.updateProject(projectList.projects[0]);
  }

  _setupTitle() {
    this._title = new Title({
      parent: this._el,
    });
  }

  _setupList() {
    this._list = new List({
      parent: this._el,
    });
  }

  _setupMenu() {
    this._menu = new Menu({
      parent: this._el,
    });
  }

 /*  _setupAbout() {
    this._about = new MobileAbout({
      parent: this._el,
    });
  } */

  _setupCode() {
    this._code = new MobileCode({
      parent: this._el,
    });
  }

  _setupConcept() {
    this._concept = new MobileConcept({
      parent: this._el,
    });
  }

  _setupGenesis() {
    this._genesis = new MobileGenesis({
      parent: this._el,
    });
  }

  _setupGamefest() {
    this._gamefest = new MobileGamefest({
      parent: this._el,
    });
  }

  _setupIbm() {
    this._ibm = new MobileIbm({
      parent: this._el,
    });
  }

  _setupMech() {
    this._mech = new MobileMech({
      parent: this._el,
    });
  }

  _setupQuiz() {
    this._quiz = new MobileQuiz({
      parent: this._el,
    });
  }

  _setupRobo() {
    this._robo = new MobileRobo({
      parent: this._el,
    });
  }

  _setupStrg() {
    this._strg = new MobileStrg({
      parent: this._el,
    });
  }

  _setupTech() {
    this._tech = new MobileTech({
      parent: this._el,
    });
  }

  _setupTeam() {
    this._team = new MobileTeam({
      parent: this._el,
    });
  }

  _setupLogin() {
    this._login = new MobileLogin({
      parent: this._el,
    });
  }

  _setupMyktj() {
    this._myktj = new MobileMyktj({
      parent: this._el,
    });
  }

  _setupWorkshop() {
    this._workshop = new MobileWorkshop({
      parent: this._el,
    });
  }

  _setupNetworks() {
    this._networks = new Networks({
      parent: this._el,
    });
  }

  _setupScroll() {
    this._scroll = new Scroll({
      parent: this._el,
    });
  }

  _setupEvents() {
    Signals.onResize.add(this._onResize);
  }

  // State ---------------------------------------------------------------------

  show({ delay = 0 } = {}) {
    this._el.style.display = 'block';
  }

  hide({ delay = 0 } = {}) {
    this._el.style.display = 'none';
  }

  updateState(page) {
    switch (page) {
      case pages.PROJECT:
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        // this._about.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.hide();
        this._gamefest.hide();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.hide();
        this._robo.hide();
        this._strg.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      /* case pages.ABOUT:
        this._about.show();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.hide();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.hide();
        this._robo.hide();
        this._strg.hide();
        this._tech.hide();
        break; */
      case pages.CODE:
        // this._about.hide();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.show();
        this._concept.hide();
        this._genesis.hide();
        this._gamefest.hide();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.hide();
        this._robo.hide();
        this._strg.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.CONCEPT:
        // this._about.hide();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.hide();
        this._concept.show();
        this._genesis.hide();
        this._gamefest.hide();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.hide();
        this._robo.hide();
        this._strg.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.GENESIS:
        // this._about.hide();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.show();
        this._gamefest.hide();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.hide();
        this._robo.hide();
        this._strg.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.GAMEFEST:
        // this._about.hide();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.hide();
        this._gamefest.show();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.hide();
        this._robo.hide();
        this._strg.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;  
      case pages.IBM:
        // this._about.hide();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.hide();
        this._gamefest.hide();
        this._ibm.show();
        this._mech.hide();
        this._quiz.hide();
        this._robo.hide();
        this._strg.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.MECH:
        // this._about.hide();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.hide();
        this._gamefest.hide();
        this._ibm.hide();
        this._mech.show();
        this._quiz.hide();
        this._robo.hide();
        this._strg.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.QUIZ:
        // this._about.hide();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.hide();
        this._gamefest.hide();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.show();
        this._robo.hide();
        this._strg.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.ROBO:
        // this._about.hide();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.hide();
        this._gamefest.hide();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.hide();
        this._robo.show();
        this._strg.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.STRG:
        // this._about.hide();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.hide();
        this._gamefest.hide();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.hide();
        this._robo.hide();
        this._strg.show();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.TECH:
        // this._about.hide();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.hide();
        this._gamefest.hide();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.hide();
        this._robo.hide();
        this._strg.hide();
        this._tech.show();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.TEAM:
        // this._about.hide();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.hide();
        this._gamefest.hide();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.hide();
        this._robo.hide();
        this._strg.hide();
        this._team.show();
        this._tech.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;  
        case pages.LOGIN:
        // this._about.hide();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.hide();
        this._gamefest.hide();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.hide();
        this._robo.hide();
        this._strg.hide();
        this._tech.hide();
        this._team.hide();
        this._login.show();
        this._myktj.hide();
        this._workshop.hide();
        break;
        case pages.MYKTJ:
        // this._about.hide();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.hide();
        this._gamefest.hide();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.hide();
        this._robo.hide();
        this._strg.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.show();
        this._workshop.hide();
        break;
        case pages.WORKSHOP:
        // this._about.hide();
        this._title.hide();
        this._menu.hide();
        this._list.hide();
        this._scroll.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.hide();
        this._gamefest.hide();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.hide();
        this._robo.hide();
        this._strg.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.show();
        break;
      default:
        this._menu.show();
        this._list.show();
        this._title.show();
        this._scroll.show();
        // this._about.hide();
        this._code.hide();
        this._concept.hide();
        this._genesis.hide();
        this._gamefest.hide();
        this._ibm.hide();
        this._mech.hide();
        this._quiz.hide();
        this._robo.hide();
        this._strg.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        
    }

    this._menu.updateState(page);
  }

  removeScrollMessage() {
    this._scroll.onTouchmove();
  }

  // Events --------------------------------------------------------------------

  @autobind
  _onResize(vw, vh) {
    this.resize(vw, vh);

    this._menu.resize();
    this._scroll.resize();
  }

  resize(vw, vh) {
    console.log('width: ', vw);
    console.log('height: ', vh);
  }

  // Update --------------------------------------------------------------------
  update() {
    // const index = Math.floor( ( States.global.progress + (1 / projectList.projects.length) * 2 ) % projectList.projects.length );
    // this._projectDescription.updateProject(projectList.projects[index]);
  }

}
