import { createDOM } from 'utils/dom';
import { visible } from 'core/decorators';
import template from './networks.tpl.html';
import './networks.scss';


@visible()
export default class DesktopNetworksView {
  constructor(options) {
    this._el = options.parent.appendChild(
      createDOM(template()),
    );
  }

  // State ---------------------------------------------------------------------

  show() {
    this._el.style.display = 'block';
    "use strict";

let _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol
          ? "symbol"
          : typeof obj;
      };

function Countdown(opt) {
  "use strict";

  let options = {
      cont: null,
      endDate: {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
      },
      endCallback: null,
      outputFormat: "year|week|day|hour|minute|second",
      outputTranslation: {
        year: "Roky",
        week: "Týdny",
        day: "Dny",
        hour: "Hodin",
        minute: "Minut",
        second: "Vteřin"
      }
    },
    lastTick = null,
    intervalsBySize = ["year", "week", "day", "hour", "minute", "second"],
    TIMESTAMP_SECOND = 1000,
    TIMESTAMP_MINUTE = 60 * TIMESTAMP_SECOND,
    TIMESTAMP_HOUR = 60 * TIMESTAMP_MINUTE,
    TIMESTAMP_DAY = 24 * TIMESTAMP_HOUR,
    TIMESTAMP_WEEK = 7 * TIMESTAMP_DAY,
    TIMESTAMP_YEAR = 365 * TIMESTAMP_DAY,
    elementClassPrefix = "countDown_",
    interval = null,
    digitConts = {};

  loadOptions(options, opt);

  /**
   * @param date
   * @returns {Date}
   */
  function getDate(date) {
    if (
      (typeof date === "undefined" ? "undefined" : _typeof(date)) === "object"
    ) {
      if (date instanceof Date) {
        return date;
      } else {
        let expectedValues = {
          day: 0,
          month: 0,
          year: 0,
          hour: 0,
          minute: 0,
          second: 0
        };

        for (let i in expectedValues) {
          if (expectedValues.hasOwnProperty(i) && date.hasOwnProperty(i)) {
            expectedValues[i] = date[i];
          }
        }

        return new Date(
          expectedValues.year,
          expectedValues.month > 0
            ? expectedValues.month - 1
            : expectedValues.month,
          expectedValues.day,
          expectedValues.hour,
          expectedValues.minute,
          expectedValues.second
        );
      }
    } else if (typeof date === "number" || typeof date === "string") {
      return new Date(date);
    } else {
      return new Date();
    }
  }

  /**
   * @param {Date} dateObj
   * @return {object}
   */
  function prepareTimeByOutputFormat(dateObj) {
    let usedIntervals = undefined,
      output = {},
      timeDiff = undefined;

    usedIntervals = intervalsBySize.filter(function(item) {
      return options.outputFormat.split("|").indexOf(item) !== -1;
    });

    timeDiff = dateObj.getTime() - Date.now();

    usedIntervals.forEach(function(item) {
      let value = undefined;
      if (timeDiff > 0) {
        switch (item) {
          case "year":
            value = Math.trunc(timeDiff / TIMESTAMP_YEAR);
            timeDiff -= value * TIMESTAMP_YEAR;
            break;
          case "week":
            value = Math.trunc(timeDiff / TIMESTAMP_WEEK);
            timeDiff -= value * TIMESTAMP_WEEK;
            break;
          case "day":
            value = Math.trunc(timeDiff / TIMESTAMP_DAY);
            timeDiff -= value * TIMESTAMP_DAY;
            break;
          case "hour":
            value = Math.trunc(timeDiff / TIMESTAMP_HOUR);
            timeDiff -= value * TIMESTAMP_HOUR;
            break;
          case "minute":
            value = Math.trunc(timeDiff / TIMESTAMP_MINUTE);
            timeDiff -= value * TIMESTAMP_MINUTE;
            break;
          case "second":
            value = Math.trunc(timeDiff / TIMESTAMP_SECOND);
            timeDiff -= value * TIMESTAMP_SECOND;
            break;
        }
      } else {
        value = "00";
      }
      output[item] = (("" + value).length < 2 ? "0" + value : "" + value).split(
        ""
      );
    });

    return output;
  }

  function fixCompatibility() {
    Math.trunc =
      Math.trunc ||
      function(x) {
        if (isNaN(x)) {
          return NaN;
        }
        if (x > 0) {
          return Math.floor(x);
        }
        return Math.ceil(x);
      };
  }

  function writeData(data) {
    let code = '<div class="' + elementClassPrefix + 'cont">',
      intervalName = undefined;

    for (intervalName in data) {
      if (data.hasOwnProperty(intervalName)) {
        let element =
            '<div class="' +
            elementClassPrefix +
            '_interval_basic_cont">\n                                       <div class="' +
            getIntervalContCommonClassName() +
            " " +
            getIntervalContClassName(intervalName) +
            '">',
          intervalDescription =
            '<div class="' +
            elementClassPrefix +
            'interval_basic_cont_description">\n                                                   ' +
            options.outputTranslation[intervalName] +
            "\n                                               </div>";
        data[intervalName].forEach(function(digit, index) {
          element +=
            '<div class="' +
            getDigitContCommonClassName() +
            " " +
            getDigitContClassName(index) +
            '">\n                                        ' +
            getDigitElementString(digit, 0) +
            "\n                                    </div>";
        });

        code += element + "</div>" + intervalDescription + "</div>";
      }
    }

    options.cont.innerHTML = code + "</div>";
    lastTick = data;
  }

  function getDigitElementString(newDigit, lastDigit) {
    return (
      '<div class="' +
      elementClassPrefix +
      'digit_last_placeholder">\n                        <div class="' +
      elementClassPrefix +
      'digit_last_placeholder_inner">\n                            ' +
      lastDigit +
      '\n                        </div>\n                    </div>\n                    <div class="' +
      elementClassPrefix +
      'digit_new_placeholder">' +
      newDigit +
      '</div>\n                    <div class="' +
      elementClassPrefix +
      'digit_last_rotate">' +
      lastDigit +
      '</div>\n                    <div class="' +
      elementClassPrefix +
      'digit_new_rotate">\n                        <div class="' +
      elementClassPrefix +
      'digit_new_rotated">\n                            <div class="' +
      elementClassPrefix +
      'digit_new_rotated_inner">\n                                ' +
      newDigit +
      "\n                            </div>\n                        </div>\n                    </div>"
    );
  }

  function updateView(data) {
    let _loop = function _loop(intervalName) {
      if (data.hasOwnProperty(intervalName)) {
        data[intervalName].forEach(function(digit, index) {
          if (
            lastTick !== null &&
            lastTick[intervalName][index] !== data[intervalName][index]
          ) {
            getDigitCont(intervalName, index).innerHTML = getDigitElementString(
              data[intervalName][index],
              lastTick[intervalName][index]
            );
          }
        });
      }
    };

    for (let intervalName in data) {
      _loop(intervalName);
    }

    lastTick = data;
  }

  function getDigitCont(intervalName, index) {
    if (!digitConts[intervalName + "_" + index]) {
      digitConts[intervalName + "_" + index] = document.querySelector(
        "." +
          getIntervalContClassName(intervalName) +
          " ." +
          getDigitContClassName(index)
      );
    }

    return digitConts[intervalName + "_" + index];
  }

  function getIntervalContClassName(intervalName) {
    return elementClassPrefix + "interval_cont_" + intervalName;
  }

  function getIntervalContCommonClassName() {
    return elementClassPrefix + "interval_cont";
  }

  function getDigitContClassName(index) {
    return elementClassPrefix + "digit_cont_" + index;
  }

  function getDigitContCommonClassName() {
    return elementClassPrefix + "digit_cont";
  }

  function loadOptions(_options, _opt) {
    for (let i in _options) {
      if (_options.hasOwnProperty(i) && _opt.hasOwnProperty(i)) {
        if (
          _options[i] !== null &&
          _typeof(_options[i]) === "object" &&
          _typeof(_opt[i]) === "object"
        ) {
          loadOptions(_options[i], _opt[i]);
        } else {
          _options[i] = _opt[i];
        }
      }
    }
  }

  function start() {
    let endDate = undefined,
      endDateData = undefined;

    fixCompatibility();

    endDate = getDate(options.endDate);

    endDateData = prepareTimeByOutputFormat(endDate);

    writeData(endDateData);

    lastTick = endDateData;

    if (endDate.getTime() <= Date.now()) {
      if (typeof options.endCallback === "function") {
        options.endCallback();
      }
    } else {
      interval = setInterval(function() {
        updateView(prepareTimeByOutputFormat(endDate));
      }, TIMESTAMP_SECOND);
    }
  }

  function stop() {
    if (interval !== null) {
      clearInterval(interval);
    }
  }

  return {
    start: start,
    stop: stop
  };
}

let cd = new Countdown({
  cont: document.querySelector(".container"),
  endDate: 1547749801000,
  outputTranslation: {
  year: "Years",
    week: "Weeks",
    day: "DAYS",
    hour: "HOURS",
    minute: "MINUTES",
    second: "SECONDS"
  },
  endCallback: null,
  outputFormat: "day|hour|minute|second"
});
cd.start();
  }

  hide() {
    this._el.style.display = 'none';
  }
}
