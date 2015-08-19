'use strict';

/* jshint undef: false */

(function() {

  describe('iptPopulator', function() {

    var pluginName = 'plugin_iptPopulator';
    var selector = 'form:first';
    var object = null;

    describe('init', function() {

      beforeEach(function() {
        object = $(selector).iptPopulator();
      });

      afterEach(function() {
        object.data(pluginName).destroy();
      });

      it('expected to have non-null result', function() {
        return expect(object).to.not.be.null;
      });

      it('expected not to bind elements for population outside of init scope', function() {
        var target = $('#js_shipping_name').val('');
        $('form:last').find('input[name=name]')
          .attr('data-population-target', '#js_shipping_name')
          .val('different value')
          .trigger('blur');
        return expect(target.val()).to.be.empty;
      });

    });

  });

})();
