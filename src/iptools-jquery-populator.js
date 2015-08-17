(function($) {

  'use strict';

  var pluginName = 'iptPopulator';

  function IPTPopulator(element, options) {

    var defaults = {};

    var datas = {
      populationTarget: 'population-target',
      optionalPopulationTarget: 'population-target-optional',
      defaultValueError: 'population-error-default-value'
    };

    this.element = $(element);
    this.settings = $.extend({}, defaults, options);

    var self = this;

    this.destroy = function() {
      removeEventListeners();
      this.element.removeData('plugin_' + pluginName);
    };

    // TODO: evaluate use-case, possibly refactor/remove.
    this.populateOptional = function() {
      getOptionalTargeteers().each(function() {
        populateForControl(this, getOptionalPopulationTarget(this));
      });
    };

    function getPopulationTarget(control) {
      return $(control).attr('data-' + datas.populationTarget);
    }

    function getOptionalPopulationTarget(control) {
      return $(control).attr('data-' + datas.optionalPopulationTarget);
    }

    function getOptionalTargeteers() {
      return $('*[data-' + datas.optionalPopulationTarget + ']');
    }

    function getTargeteers() {
      return $('*[data-' + datas.populationTarget + ']');
    }

    // TODO: namespace events.
    function addEventListener(control) {
      switch (getControlType(control)) {
        case 'input_text':
        case 'input_password':
        case 'input_phone':
        case 'input_email':
          $(control).bind('blur', populate);
          break;
        default:
          $(control).bind('change', populate);
          break;
      }
    }

    function removeEventListeners() {
      getTargeteers().each(function() {
        $(this).unbind('blur change');
      });
    }

    function getControlType(control) {
      var tag = $(control).attr('tagName').toLowerCase();
      var type = tag;
      if (tag === 'input') {
        type += '_' + $(control).attr('type');
      }
      return type;
    }

    function populate(event) {
      var element = event.currentTarget;
      populateForControl(element, getPopulationTarget(element));
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
      var $targetControl = $(parseId(targetId));
      var targetType = getControlType($targetControl);
      if ($targetControl.length > 0) {
        switch (getControlType(control)) {
          case 'input_checkbox':
            switch (targetType) {
              case 'input_hidden':
                // FIXME: prop dysfunctional at 1.3.2
                if ($(control).prop('checked')) {
                  $targetControl.val(1).prop('disabled', false);
                } else {
                  $targetControl.prop('disabled', true).removeAttr('value');
                }
                break;
              case 'input_checkbox':
                $targetControl.prop('checked', $(control).prop('checked'));
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
                target: $targetControl, source: $(control)
              });
            } else {
              var errorDefaultValue = $targetControl.attr('data-' + datas.defaultValueError);
              if (errorDefaultValue && hasSelectMatch($targetControl, errorDefaultValue)) {
                $targetControl.val(errorDefaultValue);
              }
              self.element.trigger('error', {
                type: 'populationMismatch',
                target: $targetControl, source: $(control)
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

    function parseId(str) {
      var ids = str.replace(/\s+/g, '').split(',');
      for (var i = 0, l = ids.length; i < l; i++) {
        ids[i] = '#' + ids[i];
      }
      return ids.join(',');
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
