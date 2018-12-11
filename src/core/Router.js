import { autobind } from 'core-decorators';
import * as pages from 'core/pages';
import Navigo from 'navigo';

export default class Router {

  // Setup ---------------------------------------------------------------------

  constructor(options) {
    this.updatePageCallback = options.updatePageCallback;
    this._assetsLoaded = false;

    this._setupRouter();
    this._setupEvents();
  }

  _setupRouter() {
    const root = `${window.location.protocol}//${window.location.host}`;
    const useHash = false;
    this.navigo = new Navigo(root, useHash);

    this.navigo.notFound(this._onRouteNotFound);
    this.navigo.on({
      '/'             :{ as: pages.HOME,        uses: this._onRouteHome },
     // '/experiment'   :{ as: pages.EXPERIMENT,  uses: this._onRouteExperiment },
      '/about'        :{ as: pages.ABOUT,       uses: this._onRouteAbout },
      '/menu/:id'     :{ as: pages.PROJECT,     uses: this._onRouteProject },
      '/genesis'      :{ as: pages.GENESIS,     uses: this._onRouteGenesis },
      '/quizzard'     :{ as: pages.QUIZ,        uses: this._onRouteQuiz },
      '/conceptualize':{ as: pages.CONCEPT,     uses: this._onRouteConcept },
      '/codeconclave' :{ as: pages.CODE,        uses: this._onRouteCode },
      '/robotics'     :{ as: pages.ROBO,        uses: this._onRouteRobo },
      '/mechanize'    :{ as: pages.MECH,        uses: this._onRouteMech },
      '/stratergia'   :{ as: pages.STRG,        uses: this._onRouteStrg },
      '/ibm'          :{ as: pages.IBM,         uses: this._onRouteIbm },
      '/tech'         :{ as: pages.TECH,        uses: this._onRouteTech },
      '/team'         :{ as: pages.TEAM,        uses: this._onRouteTeam },
      '/login'        :{ as: pages.LOGIN,       uses: this._onRouteLogin},
      '/myktj'        :{ as:pages.MYKTJ,        uses: this._onRouteMyktj},
    })
  }

  _setupEvents() {
    Signals.onAssetsLoaded.add(this._onAssetsLoaded);
  }

  // State ---------------------------------------------------------------------

  navigateTo(id, options = {}) {
    this.navigo.navigate(this.navigo.generate(id, options));
  }

  getLastRouteResolved() {
    const lastRouteResolved = this.navigo.lastRouteResolved();

    if (!lastRouteResolved.params) {
      lastRouteResolved.params = null;
    }

    return lastRouteResolved;
  }

  // Events --------------------------------------------------------------------

  @autobind
  _onAssetsLoaded() {
    this._assetsLoaded = true;
  }

  @autobind
  _onRouteNotFound() {
    this.updatePageCallback(pages.HOME);
  }

  @autobind
  _onRouteHome() {
    this.updatePageCallback(pages.HOME);
  }

  @autobind
  _onRouteExperiment() {
    this.updatePageCallback(pages.EXPERIMENT);
  }

  @autobind
  _onRouteAbout() {
    this.updatePageCallback(pages.ABOUT);
  }

  @autobind
  _onRouteProject() {
    this.updatePageCallback(pages.PROJECT);
  }

  @autobind
  _onRouteGenesis() {
    this.updatePageCallback(pages.GENESIS);
  }

  @autobind
  _onRouteQuiz() {
    this.updatePageCallback(pages.QUIZ);
  }

  @autobind
  _onRouteConcept() {
    this.updatePageCallback(pages.CONCEPT);
  }

  @autobind
  _onRouteCode() {
    this.updatePageCallback(pages.CODE);
  }

  @autobind
  _onRouteRobo() {
    this.updatePageCallback(pages.ROBO);
  }

  @autobind
  _onRouteMech() {
    this.updatePageCallback(pages.MECH);
  }

  @autobind
  _onRouteStrg() {
    this.updatePageCallback(pages.STRG);
  }

  @autobind
  _onRouteIbm() {
    this.updatePageCallback(pages.IBM);
  }

  @autobind
  _onRouteTech() {
    this.updatePageCallback(pages.TECH);
  }

  @autobind
  _onRouteTeam() {
    this.updatePageCallback(pages.TEAM);
  }

  @autobind
  _onRouteLogin() {
    this.updatePageCallback(pages.LOGIN);
  }

  @autobind
  _onRouteMyktj() {
    this.updatePageCallback(pages.MYKTJ);
  }
}
