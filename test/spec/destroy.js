'use strict';

/* jshint undef: false, expr: true */

(function() {

  describe('iptPopulator', function() {

    var pluginName = 'plugin_iptPopulator';
    var selector = 'form:first';
    var object = null;

    describe('destroy', function() {

      beforeEach(function() {
        object = $(selector).iptPopulator();
      });

      afterEach(function() {
        $(selector).unbind();
      });

      it('expected to respond', function() {
        expect(object.data(pluginName)).to.respondTo('destroy');
      });

      it('expected to remove data', function() {
        object.data(pluginName).destroy();
        return expect(object.data(pluginName)).to.not.be.ok;
      });

      it('expected to cease event handling', function() {
        object.data(pluginName).destroy();
        var ctrl = object.find('input[name=billing_name]').val('new value');
        var target = $(ctrl.attr('data-population-target')).val('something unique');
        ctrl.trigger('blur');
        expect(target.val()).to.not.equal(ctrl.val());
      });

    });

  });

})();
