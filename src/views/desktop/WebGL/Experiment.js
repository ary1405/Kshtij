import * as pages from 'core/pages';
import { visible, focused } from 'core/decorators';
import Description from './meshes/Description';
import Points from './meshes/Points';

@visible()
@focused()
export default class Experiment {
  constructor(options) {

    this._raycaster = options.raycaster;

    this._page = null;

    this._setupPoints();
    this._setupDescription();
  }

  _setupPoints() {
    this._points = new Points({
      type: 'experiment',
    });
  }

  _setupDescription() {
    this._description = new Description({
      type: 'experiment',
    });
    this._description.position.set(-9.5, -6.25, 950);
  }

  // Getters / Setters --------------------

  getPoints() {
    return this._points;
  }

  getDescription() {
    return this._description;
  }

  // State --------------------

  show({ delay = 0 } = {}) {
    this._description.show({
      delay: delay + 1,
    });
    this._points.show({ delay });
  }

  hide() {
    this._description.hide();
    this._points.hide();
  }

  focus() {
    this._description.focus();
  }

  blur() {
    this._description.blur();
  }

  deselect() {
    this._points.deselect();
    this._description.hide();
  }

  select() {
    this._points.select();
  }

  showDescription() {
    this._description.show();
  }

  updateDescription(experiment) {
    this._description.updateProject(experiment);
  }

  updateState(page) {
    switch (page) {
      case pages.HOME:
        this.hide();
        break;
      case pages.EXPERIMENT:
        const delay = this._page ? 0 : 2.5;
        this.show({ delay });
        break;
      case pages.ABOUT:
        this.hide();
        break;
      case pages.GENESIS:
        this.hide();
        break;
      case pages.QUIZ:
        this.hide();
        break;
      case pages.CONCEPT:
        this.hide();
        break;
      case pages.CODE:
        this.hide();
        break;
      case pages.ROBO:
        this.hide();
        break;
      case pages.MECH:
        this.hide();
        break;
      case pages.STRG:
        this.hide();
        break;
      case pages.IBM:
        this.hide();
        break;
      case pages.TECH:
        this.hide();
        break;
      case pages.TEAM:
        this.hide();
        break;

      default:
    }

    this._page = page;
  }

  // Events --------------------

  mousedown() {
    this._points.mousedown();
  }

  mouseup() {
    this._points.mouseup();
  }

  mousemove(mouse) {
    this._points.mousemove(mouse);
  }

  resize(camera) {
    this._points.resize(camera);
    this._description.resize();
  }

  // Update --------------------

  update(time, delta, translation, camera) {

    this._points.update(time, delta, translation);
    this._description.update(time, camera);
  }
}
