'use strict';

/* jshint undef: false, expr: true */

(function() {

  describe('iptPopulator', function() {

    var config = {
    };

    var pluginName = 'plugin_iptPopulator';
    var selector = 'form:first';
    var object = null;

    describe('destroy', function() {

      beforeEach(function() {
        object = $(selector).iptPopulator(config);
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

      // TODO: implement event emission destroy test.
      xit('expected to stop event emission', function(done) {
        var emission = false;
        object.data(pluginName).destroy();
        $(selector).on('complete.iptPopulator success.iptPopulator error.iptPopulator', function() {
          done();
          emission = true;
          expect(emission).to.not.be.ok;
        }).trigger('click');
        setTimeout(function() {
          done();
          expect(emission).to.not.be.ok;
        }, 1500);
      });

    });

  });

})();
