'use strict';

/* jshint undef: false */

(function() {

  describe('iptPopulator', function() {

    var config = {
    };

    var pluginName = 'plugin_iptPopulator';
    var selector = 'form:first';
    var object = null;

    describe('populateManual', function() {

      beforeEach(function() {
        object = $(selector).iptPopulator(config);
      });

      afterEach(function() {
        object.data(pluginName).destroy();
      });

      it('expected to respond', function() {
        expect(object.data(pluginName)).to.respondTo('populateManual');
      });

      context('with invalid target selector', function() {

        var backup = null;
        var name = null;

        beforeEach(function() {
          name = object.find('input[name=billing_name]');
          backup = name.attr('data-population-target');
          name.attr('data-population-target-manual', 'invalid-selector');
        });

        afterEach(function() {
          name.attr('data-population-target-manual', backup);
        });

        it('expected to throw error', function() {
          function test() {
            object.data(pluginName).populateManual();
          }
          expect(test).to.throw(TypeError, /Invalid population target. Target not found./);
        });

      });

      context('with valid target selector(s)', function() {

        it('expected to populate text field value', function() {
          var ctrl = object.find('input[name=billing_name]');
          var value = $(ctrl.attr('data-population-target-manual')).val();
          object.data(pluginName).populateManual();
          return expect(value).to.equal(ctrl.val());
        });

        it('expected to populate email field value', function() {
          var ctrl = object.find('input[name=billing_email]');
          var value = $(ctrl.attr('data-population-target-manual')).val();
          object.data(pluginName).populateManual();
          return expect(value).to.equal(ctrl.val());
        });

        it('expected to populate phone field value', function() {
          var ctrl = object.find('input[name=billing_phone]');
          var value = $(ctrl.attr('data-population-target-manual')).val();
          object.data(pluginName).populateManual();
          return expect(value).to.equal(ctrl.val());
        });

        it('expected to populate password field value', function() {
          var ctrl = object.find('input[name=billing_password]').val('iptools');
          var targets = ctrl.attr('data-population-target-manual').split(',');
          var value = $(targets[0]).val();
          object.data(pluginName).populateManual();
          return expect(value).to.equal(ctrl.val());
        });

        it('expected to populate text field value to hidden input', function() {
          var ctrl = object.find('input[name=billing_city]');
          var value = $(ctrl.attr('data-population-target-manual')).val();
          object.data(pluginName).populateManual();
          return expect(value).to.equal(ctrl.val());
        });

        it('expected to populate select value', function() {
          var ctrl = object.find('select[name=billing_title]');
          var value = $(ctrl.attr('data-population-target-manual')).val();
          object.data(pluginName).populateManual();
          return expect(value).to.equal(ctrl.val());
        });

        it('expected to populate checkbox value', function() {
          var ctrl = object.find('input[name=billing_express]').attr('checked', true);
          object.data(pluginName).populateManual();
          var value = $(ctrl.attr('data-population-target-manual')).val();
          return expect(value).to.equal('on');
        });

        it('expected to populate unchecked checkbox value', function() {
          var ctrl = object.find('input[name=billing_express]').attr('checked', false);
          object.data(pluginName).populateManual();
          var value = $(ctrl.attr('data-population-target-manual')).val();
          return expect(value).to.equal('');
        });

        it('expected to populate radio value', function() {
          var ctrl = object.find('input[name=billing_payment]').eq(0).attr('checked', true);
          object.data(pluginName).populateManual();
          var value = $(ctrl.attr('data-population-target-manual')).val();
          return expect(value).to.equal(ctrl.val());
        });

        it('expected to populate hidden field value', function() {
          var ctrl = object.find('input[name=billing_hash]');
          var value = $(ctrl.attr('data-population-target-manual')).val();
          object.data(pluginName).populateManual();
          return expect(value).to.equal(ctrl.val());
        });

        it('expected to populate password field value to all targets', function() {
          var ctrl = object.find('input[name=billing_password]').eq(0).attr('checked', true);
          object.data(pluginName).populateManual();
          var targets = ctrl.attr('data-population-target-manual').split(',');
          var value1 = $(targets[0]).val();
          var value2 = $(targets[1]).val();
          var value3 = $(targets[2]).val();
          var expectation = ctrl.val();
          return expect(value1).to.equal(expectation) &&
            expect(value2).to.equal(expectation) &&
            expect(value3).to.equal(expectation);
        });

      });

    });

  });

})();
