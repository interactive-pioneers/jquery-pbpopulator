'use strict';

/* jshint undef: false */

(function() {

  describe('iptPopulator', function() {

    var config = {
    };

    var pluginName = 'plugin_iptPopulator';
    var selector = 'form:first';
    var object = null;

    describe('init', function() {

      beforeEach(function() {
        object = $(selector).iptPopulator(config);
      });

      afterEach(function() {
        object.data(pluginName).destroy();
      });

      it('expected to construct object', function() {
        return expect(object).to.not.be.null;
      });

    });

  });

})();
