/*
 * jQuery Pioneer's Bower Populator
 *
 * Copyright (c) 2013-2014 Ain Tohvri, Interactive Pioneers GmbH
 * Licensed under GPL license.
 */

(function($, window, document, undefined) {

  /*
   * Plugin UID.
   *
   * @type String
   */
  var pluginName = 'pbpopulator';

  var defaults = {
  };

  function PBPopulator(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this._init();
  }

  PBPopulator.prototype._init = function() {
    var self = this;
    $('*[data-population-target]').each(function(param) {
      self._addEventListener(this);
    });
  };

  PBPopulator.prototype._addEventListener = function(control) {
    var type = this._getControlType(control);
    switch (type) {
      case 'input_text':
      case 'input_password':
      case 'input_phone':
      case 'input_email':
        $(control).bind('blur', this, this._populate);
        break;
      default:
        $(control).bind('change', this, this._populate);
        break;
    }
  };

  PBPopulator.prototype._getControlType = function(control) {
    var tag = $(control).prop('tagName').toLowerCase();
    var type = tag;
    if (tag === 'input') {
      type += '_' + $(control).attr('type');
    }
    return type;
  };

  PBPopulator.prototype._populate = function(event) {
    var self = event.data;
    self._populateForControl(this, $(this).attr('data-population-target'));
  };

  PBPopulator.prototype.populateOptional = function() {
    var self = this;
    $('*[data-population-target-optional]').each(function() {
      self._populateForControl(this, $(this).attr('data-population-target-optional'));
    });
  };

  PBPopulator.prototype._hasSelectMatch = function(control, value) {
    var match = false;
    $(control).children('option').each(function() {
      if ($(this).val() === value.toString()) {
        match = true;
        return true;
      }
    });
    return match;
  };

  PBPopulator.prototype._populateForControl = function(control, targetId) {
    var $targetControl = $(this._parseId(targetId));
    var targetType = this._getControlType($targetControl);
    if ($targetControl.length > 0) {
      switch (this._getControlType(control)) {
        case 'input_checkbox':
          switch (targetType) {
            case 'input_hidden':
              if ($(control).prop('checked')) {
                $targetControl.val(1).prop('disabled', false);
              }
              else {
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
          if (this._hasSelectMatch($targetControl, targetedValue)) {
            $targetControl.val(targetedValue);
            $(this.element).trigger('success', { type: 'populationSuccess', target: $targetControl, source: $(control) });
          }
          else {
            var errorDefaultValue = $targetControl.data('population-error-default-value');
            if (errorDefaultValue && this._hasSelectMatch($targetControl, errorDefaultValue)) {
              $targetControl.val(errorDefaultValue);
            }
            $(this.element).trigger('error', { type: 'populationMismatch', target: $targetControl, source: $(control) });
          }
          break;
        default:
          $targetControl.val($(control).val());
          break;
      }
      $targetControl.trigger('change', $(control));
    }
  };

  PBPopulator.prototype._parseId = function(str) {
    var ids = str.replace(/\s+/g, '').split(',');
    for (var i = 0, l = ids.length; i < l; i++) {
      ids[i] = "#" + ids[i];
    }
    return ids.join(',');
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new PBPopulator(this, options));
      }
    });
  };
})(jQuery, window, document);