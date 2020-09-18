'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _class, _temp;

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _propTypes = require('prop-types');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ResourceView = (_temp = _class = function (_Component) {
  _inherits(ResourceView, _Component);

  function ResourceView(props) {
    _classCallCheck(this, ResourceView);

    return _possibleConstructorReturn(this, (ResourceView.__proto__ || Object.getPrototypeOf(ResourceView)).call(this, props));
  }

  _createClass(ResourceView, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          schedulerData = _props.schedulerData,
          contentScrollbarHeight = _props.contentScrollbarHeight,
          slotClickedFunc = _props.slotClickedFunc,
          slotItemTemplateResolver = _props.slotItemTemplateResolver,
          toggleExpandFunc = _props.toggleExpandFunc;
      var renderData = schedulerData.renderData;

      var width = schedulerData.getResourceTableWidth() - 2;
      var paddingBottom = contentScrollbarHeight;
      var displayRenderData = renderData.filter(function (o) {
        return o.render;
      });
      var resourceList = displayRenderData.map(function (item) {
        var indents = [];
        for (var i = 0; i < item.indent; i++) {
          indents.push(_react2.default.createElement('span', { key: 'es' + i, className: 'expander-space' }));
        }
        var indent = _react2.default.createElement('span', { key: 'es' + item.indent, className: 'expander-space' });
        if (item.hasChildren) {
          indent = item.expanded ? _react2.default.createElement(_icon2.default, {
            type: 'minus-square',
            key: 'es' + item.indent,
            style: {},
            className: '',
            onClick: function onClick() {
              if (!!toggleExpandFunc) {
                toggleExpandFunc(schedulerData, item.slotId);
              }
            }
          }) : _react2.default.createElement(_icon2.default, {
            type: 'plus-square',
            key: 'es' + item.indent,
            style: {},
            className: '',
            onClick: function onClick() {
              if (!!toggleExpandFunc) {
                toggleExpandFunc(schedulerData, item.slotId);
              }
            }
          });
        }
        indents.push(indent);

        var resourceRightSide = null;
        if (item.resourceRightSide) {
          resourceRightSide = _react2.default.createElement('div', { className: "resource-right-side" }, item.resourceRightSide);
        }
        console.log(resourceRightSide, item.resourceRightSide);

        var slotItem = void 0;
        if (slotClickedFunc != undefined) {
          slotItem = _react2.default.createElement('a', {
            title: item.slotName,
            className: 'overflow-text header2-text clickable',
            style: { textAlign: 'left' },
            onClick: function onClick() {
              return slotClickedFunc(schedulerData, item);
            }
          }, _react2.default.createElement('span', { className: 'slot-cell' }, indents, _react2.default.createElement('span', { className: 'slot-text' }, item.slotName), resourceRightSide));
        } else {
          slotItem = _react2.default.createElement('div', {
            title: item.slotName,
            className: 'overflow-text header2-text non-clickable',
            style: { textAlign: 'left' }
          }, _react2.default.createElement('span', { className: 'slot-cell' }, indents, _react2.default.createElement('span', { className: 'slot-text' }, item.slotName), resourceRightSide));
        }

        if (!!slotItemTemplateResolver) {
          var temp = slotItemTemplateResolver(schedulerData, item, slotClickedFunc, width, 'overflow-text header2-text');
          if (!!temp) {
            slotItem = temp;
          }
        }

        var tdStyle = { height: item.rowHeight };
        if (item.groupOnly) {
          tdStyle = _extends({}, tdStyle, {
            backgroundColor: schedulerData.config.groupOnlySlotColor
          });
        }

        return _react2.default.createElement('tr', { key: item.slotId }, _react2.default.createElement('td', { 'data-resource-id': item.slotId, style: tdStyle, className: item.groupOnly ? 'group-only' : '' }, slotItem));
      });

      return _react2.default.createElement('div', { style: { paddingBottom: paddingBottom } }, _react2.default.createElement('table', { className: 'resource-table' }, _react2.default.createElement('tbody', null, resourceList)));
    }
  }]);

  return ResourceView;
}(_react.Component), _class.propTypes = {
  schedulerData: _propTypes.PropTypes.object.isRequired,
  contentScrollbarHeight: _propTypes.PropTypes.number.isRequired,
  slotClickedFunc: _propTypes.PropTypes.func,
  slotItemTemplateResolver: _propTypes.PropTypes.func,
  toggleExpandFunc: _propTypes.PropTypes.func
}, _temp);
exports.default = ResourceView;