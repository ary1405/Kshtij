import raf            from 'raf';
import * as pages     from 'core/pages';
import { autobind }   from 'core-decorators';
import UIHomeView     from 'views/desktop/UIHome';
import TimelineView   from 'views/desktop/Timeline';
//import AboutView      from 'views/desktop/About';
import ProjectView    from 'views/desktop/ProjectView';
//import ScrollView  from 'views/desktop/Scroll';
import WebglView      from 'views/desktop/WebGL';
import dat            from 'dat.gui';
import GenesisView    from 'views/desktop/Genesis';
import QuizView       from 'views/desktop/Quiz';
import ConceptView    from 'views/desktop/Concept';
import CodeView       from 'views/desktop/Code';
import RoboView       from 'views/desktop/Robo';
import MechView       from 'views/desktop/Mech';
import StrgView       from 'views/desktop/Strg';
import IbmView        from 'views/desktop/Ibm';
import TechView       from 'views/desktop/Tech';
import TeamView       from 'views/desktop/Team';
import LoginView      from 'views/desktop/Login';
import MyktjView	    from 'views/desktop/Myktj';
import WorkshopView	  from 'views/desktop/Workshop'


export default class DesktopAppView {

  // Setup ---------------------------------------------------------------------

  constructor() {
    window.GUI = new dat.GUI();

    console.info('desktop application initializing');
    this.el = document.getElementById('application');

    this._views         = [];
    this._uiHome        = this._setupHome();
    this._projectView   = this._setupProject();
    this._timeline      = this._setupTimeline();
    //this._about         = this._setupAbout();
    this._webgl         = this._setupWebGL();

    this._quiz          = this._setupQuiz();
    this._genesis       = this._setupGenesis();
    this._concept       = this._setupConcept();
    this._code          = this._setupCode();
    this._robo          = this._setupRobo();
    this._mech          = this._setupMech();
    this._strg          = this._setupStrg();
    this._ibm           = this._setupIbm();
    this._tech          = this._setupTech();
    this._team          = this._setupTeam();
    this._login	        = this._setupLogin();
    this._myktj	        = this._setupMyktj();
    this._workshop	    = this._setupWorkshop();

    // this._scrollView = this._setupScroll();

    this._views.push(this._uiHome, this._timeline, this._webgl);

    this._setupEvents();
    this._update();
  }

  _setupHome() {
    const view = new UIHomeView({
      parent: this.el,
    });

    return view;
  }

  _setupProject() {
    const view = new ProjectView({
      parent: this.el,
    });

    return view;
  }

  _setupTimeline() {
    const view = new TimelineView({
      parent: this.el,
    });

    return view;
  }

 /*  _setupAbout() {
    const view = new AboutView({
      parent: this.el,
    });

    return view;
  } */

  _setupWebGL() {
    const view = new WebglView({
      parent: this.el,
    });

    return view;
  }

  _setupScroll() {
    const view = new ScrollView({
      parent: this.el,
    });

    return view;
  }

  _setupGenesis() {
    const view = new GenesisView({
      parent: this.el,
    });
  
    return view;
  }

  _setupQuiz() {
    const view = new QuizView({
      parent: this.el,
    });

    return view;
  }

  _setupConcept() {
    const view = new ConceptView({
      parent: this.el,
    });
  
    return view;
  }

  _setupCode() {
    const view = new CodeView({
      parent: this.el,
    });
  
    return view;
  }

  _setupRobo() {
    const view = new RoboView({
      parent: this.el,
    });
  
    return view;
  }
  
  _setupMech() {
    const view = new MechView({
      parent: this.el,
    });
  
    return view;
  }

  _setupStrg() {
    const view = new StrgView({
      parent: this.el,
    });
  
    return view;
  }

  _setupIbm() {
    const view = new IbmView({
      parent: this.el,
    });
  
    return view;
  }

  _setupTech() {
    const view = new TechView({
      parent: this.el,
    });
  
    return view;
  }
  _setupTeam() {
    const view = new TeamView({
      parent: this.el,
    });
  
    return view;
  }

  _setupLogin() {
    const view = new LoginView({
      parent: this.el,
    });

    return view;
  }

  _setupMyktj() {
    const view = new MyktjView({
      parent: this.el,
    });

    return view;
  }

  _setupWorkshop() {
    const view = new WorkshopView({
      parent: this.el,
    });

    return view;
  }

  _setupEvents() {
    window.addEventListener('mousemove', this._onMousemove);
    window.addEventListener('resize', this._onResize);
    window.addEventListener('scroll', this._onScroll);
    window.addEventListener('mousewheel', this._onScrollWheel);
    window.addEventListener('wheel', this._onScrollWheel);

    this._onResize();
  }

  // State ---------------------------------------------------------------------

  start() {
    Signals.onApplicationStart.dispatch();
  }

  // Events --------------------------------------------------------------------

  updatePage(page) {

    switch (page) {
      case pages.HOME:
        // document.body.style.overflow = 'hidden';
        this._uiHome.show();
        this._webgl.activate();
        this._projectView.hide();
        //this._about.hide();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.hide();
        this._code.hide();
        this._robo.hide();
        this._mech.hide();
        this._strg.hide();
        this._ibm.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.EXPERIMENT:
        // document.body.style.overflow = 'hidden';
        this._uiHome.show();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.hide();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.hide();
        this._code.hide();
        this._robo.hide();
        this._mech.hide();
        this._strg.hide();
        this._ibm.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.PROJECT:
        document.body.style.cursor = 'inherit';
        this._uiHome.show();
        this._webgl.deactivate();

        this._projectView.updateProject();
        this._projectView.show();
        // this._about.hide();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.hide();
        this._code.hide();
        this._robo.hide();
        this._mech.hide();
        this._strg.hide();
        this._ibm.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
     /*  case pages.ABOUT:
        // document.body.style.overflow = 'hidden';
        this._uiHome.show();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.show();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.hide();
        this._code.hide();
        this._robo.hide();
        this._mech.hide();
        this._strg.hide();
        this._ibm.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        break; */
      case pages.GENESIS:
        // document.body.style.overflow = 'hidden';
        this._uiHome.hide();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.show();
        this._genesis.show();
        this._quiz.hide();
        this._concept.hide();
        this._code.hide();
        this._robo.hide();
        this._mech.hide();
        this._strg.hide();
        this._ibm.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.QUIZ:
        // document.body.style.overflow = 'hidden';
        this._uiHome.hide();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.show();
        this._genesis.hide();
        this._quiz.show();
        this._concept.hide();
        this._code.hide();
        this._robo.hide();
        this._mech.hide();
        this._strg.hide();
        this._ibm.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.CONCEPT:
        // document.body.style.overflow = 'hidden';
        this._uiHome.hide();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.show();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.show();
        this._code.hide();
        this._robo.hide();
        this._mech.hide();
        this._strg.hide();
        this._ibm.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.CODE:
        // document.body.style.overflow = 'hidden';
        this._uiHome.hide();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.show();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.hide();
        this._code.show();
        this._robo.hide();
        this._mech.hide();
        this._strg.hide();
        this._ibm.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.ROBO:
        // document.body.style.overflow = 'hidden';
        this._uiHome.hide();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.show();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.hide();
        this._code.hide();
        this._robo.show();
        this._mech.hide();
        this._strg.hide();
        this._ibm.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.MECH:
        // document.body.style.overflow = 'hidden';
        this._uiHome.hide();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.show();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.hide();
        this._code.hide();
        this._robo.hide();
        this._mech.show();
        this._strg.hide();
        this._ibm.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.STRG:
        // document.body.style.overflow = 'hidden';
        this._uiHome.hide();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.show();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.hide();
        this._code.hide();
        this._robo.hide();
        this._mech.hide();
        this._strg.show();
        this._ibm.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.IBM:
        // document.body.style.overflow = 'hidden';
        this._uiHome.hide();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.show();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.hide();
        this._code.hide();
        this._robo.hide();
        this._mech.hide();
        this._strg.hide();
        this._ibm.show();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.TECH:
        // document.body.style.overflow = 'hidden';
        this._uiHome.hide();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.show();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.hide();
        this._code.hide();
        this._robo.hide();
        this._mech.hide();
        this._strg.hide();
        this._ibm.hide();
        this._tech.show();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.TEAM:
        // document.body.style.overflow = 'hidden';
        this._uiHome.hide();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.show();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.hide();
        this._code.hide();
        this._robo.hide();
        this._mech.hide();
        this._strg.hide();
        this._ibm.hide();
        this._tech.hide();
        this._team.show();
        this._login.hide();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.LOGIN:
        // document.body.style.overflow = 'hidden';
        this._uiHome.hide();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.show();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.hide();
        this._code.hide();
        this._robo.hide();
        this._mech.hide();
        this._strg.hide();
        this._ibm.hide();
        this._tech.hide();
        this._team.hide();
        this._login.show();
        this._myktj.hide();
        this._workshop.hide();
        break;
      case pages.MYKTJ:
        // document.body.style.overflow = 'hidden';
        this._uiHome.hide();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.show();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.hide();
        this._code.hide();
        this._robo.hide();
        this._mech.hide();
        this._strg.hide();
        this._ibm.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.show();
        this._workshop.hide();
        break;
      case pages.WORKSHOP:
        // document.body.style.overflow = 'hidden';
        this._uiHome.hide();
        this._webgl.activate();
        this._projectView.hide();
        // this._about.show();
        this._genesis.hide();
        this._quiz.hide();
        this._concept.hide();
        this._code.hide();
        this._robo.hide();
        this._mech.hide();
        this._strg.hide();
        this._ibm.hide();
        this._tech.hide();
        this._team.hide();
        this._login.hide();
        this._myktj.hide();
        this._workshop.show();
        break;
      default:
    }

    this._webgl.updateState(page);
    this._timeline.updateState(page);
    this._uiHome.updateState(page);
  }

  @autobind
  _onMousemove(event) {
    this._timeline.mousemove(event);
    this._webgl.mousemove(event);
  }

  @autobind
  _onResize() {
    Signals.onResize.dispatch( window.innerWidth, window.innerHeight );
  }

  @autobind
  _onScroll() {
    Signals.onScroll.dispatch();
  }

  @autobind
  _onScrollWheel(event) {
    Signals.onScrollWheel.dispatch(event);
  }

  // Update --------------------------------------------------------------------
  @autobind
  _update() {
    this._webgl.update();
    this._uiHome.update();
    this._timeline.update();
    this._projectView.update();

    raf(this._update);
  }

}
