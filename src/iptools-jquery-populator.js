(function($) {

  'use strict';

  var pluginName = 'iptPopulator';

  function IPTPopulator(element, options) {

    var defaults = {};

    var datas = {
      populationTarget: 'population-target',
      manualPopulationTarget: 'population-target-manual',
      defaultValueError: 'population-error-default-value'
    };

    this.element = $(element);
    this.settings = $.extend({}, defaults, options);

    var self = this;

    this.destroy = function() {
      removeEventListeners();
      this.element.removeData('plugin_' + pluginName);
    };

    this.populate = function(element) {
      var target = getPopulationTarget(element);
      populateForControl(element, target);
    };

    this.populateManual = function() {
      getManualTargeteers().each(function() {
        populateForControl(this, getManualPopulationTarget(this));
      });
    };

    function getPopulationTarget(control) {
      return $(control).attr('data-' + datas.populationTarget);
    }

    function getManualPopulationTarget(control) {
      return $(control).attr('data-' + datas.manualPopulationTarget);
    }

    function getManualTargeteers() {
      return self.element.find('*[data-' + datas.manualPopulationTarget + ']');
    }

    function getTargeteers() {
      return self.element.find('*[data-' + datas.populationTarget + ']');
    }

    function addEventListener(control) {
      switch (getControlType(control)) {
        case 'input_text':
        case 'input_password':
        case 'input_phone':
        case 'input_email':
          $(control).bind(getNamespacedEvent('blur'), handlePopulationRequest);
          break;
        default:
          $(control).bind(getNamespacedEvent('change'), handlePopulationRequest);
          break;
      }
    }

    function getNamespacedEvent(event) {
      return event + '.' + pluginName;
    }

    function handlePopulationRequest(event) {
      self.populate(event.currentTarget);
    }

    function removeEventListeners() {
      getTargeteers().each(function() {
        $(this).unbind(getNamespacedEvent('blur'))
          .unbind(getNamespacedEvent('change'));
      });
    }

    function getControlType(control) {
      var tagName = $(control).attr('tagName');
      var tag = tagName.toLowerCase();
      var type = tag;
      if (tag === 'input') {
        type += '_' + $(control).attr('type');
      }
      return type;
    }

    function hasSelectMatch(control, value) {
      var match = false;
      $(control).children('option').each(function() {
        if ($(this).val() === value.toString()) {
          match = true;
          return true;
        }
      });
      return match;
    }

    function populateForControl(control, targetId) {
      var $targetControl = $(targetId);
      if ($targetControl.length === 0) {
        throw new TypeError('Invalid population target. Target not found.');
      }
      var targetType = getControlType($targetControl);
      if ($targetControl.length > 0) {
        switch (getControlType(control)) {
          case 'input_radio':
          case 'input_checkbox':
            switch (targetType) {
              case 'input_hidden':
                if ($(control).attr('checked')) {
                  $targetControl.val(1).attr('disabled', false);
                } else {
                  $targetControl.attr('disabled', true).removeAttr('value');
                }
                break;
              case 'input_radio':
              case 'input_checkbox':
                $targetControl.attr('checked', $(control).attr('checked'));
                break;
              default:
                $targetControl.val($(control).val());
                break;
            }
            break;
          case 'select':
            var targetedValue = $(control).val();
            if (hasSelectMatch($targetControl, targetedValue)) {
              $targetControl.val(targetedValue);
              self.element.trigger('success', {
                type: 'populationSuccess',
                target: $targetControl,
                source: $(control)
              });
            } else {
              var errorDefaultValue = $targetControl.attr('data-' + datas.defaultValueError);
              if (errorDefaultValue && hasSelectMatch($targetControl, errorDefaultValue)) {
                $targetControl.val(errorDefaultValue);
              }
              self.element.trigger('error', {
                type: 'populationMismatch',
                target: $targetControl,
                source: $(control)
              });
            }
            break;
          default:
            $targetControl.val($(control).val());
            break;
        }
        $targetControl.trigger('change', $(control));
      }
    }

    function init() {
      getTargeteers().each(function() {
        addEventListener(this);
      });
    }

    init();
  }

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTPopulator(this, options));
      }
    });
  };
})(jQuery);
