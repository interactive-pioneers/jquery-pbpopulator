'use strict';

/* jshint undef: false */

(function() {

  describe('iptPopulator', function() {

    var config = {
    };

    var pluginName = 'plugin_iptPopulator';
    var selector = 'form:first';
    var object = null;

    describe('populate', function() {

      beforeEach(function() {
        object = $(selector).iptPopulator(config);
      });

      afterEach(function() {
        object.data(pluginName).destroy();
      });

      context('with blur', function() {

        it('expected to populate text field value', function() {
          var ctrl = object.find('input[name=billing_name]').trigger('blur');
          var value = $(ctrl.attr('data-population-target')).val();
          return expect(value).to.equal(ctrl.val());
        });

        it('expected to populate email field value', function() {
          var ctrl = object.find('input[name=billing_email]').trigger('blur');
          var value = $(ctrl.attr('data-population-target')).val();
          return expect(value).to.equal(ctrl.val());
        });

        it('expected to populate phone field value', function() {
          var ctrl = object.find('input[name=billing_phone]').trigger('blur');
          var value = $(ctrl.attr('data-population-target')).val();
          return expect(value).to.equal(ctrl.val());
        });

        it('expected to populate password field value', function() {
          var ctrl = object.find('input[name=billing_password]').val('iptools').trigger('blur');
          var targets = ctrl.attr('data-population-target').split(',');
          var value = $(targets[0]).val();
          return expect(value).to.equal(ctrl.val());
        });

      });

      context('with change', function() {

        it('expected to populate select value', function() {
          var ctrl = object.find('select[name=billing_title]').trigger('change');
          var value = $(ctrl.attr('data-population-target')).val();
          return expect(value).to.equal(ctrl.val());
        });

        it('expected to populate checkbox value', function() {
          var ctrl = object.find('input[name=billing_express]').trigger('change');
          var value = $(ctrl.attr('data-population-target')).val();
          return expect(value).to.equal(ctrl.val());
        });

        it('expected to populate radio value', function() {
          var ctrl = object.find('input[name=billing_payment]').trigger('change');
          var value = $(ctrl.attr('data-population-target')).val();
          return expect(value).to.equal(ctrl.val());
        });

      });

      context('with multiple targets', function() {

        it('expected to populate password field value to all targets', function() {
          var ctrl = object.find('input[name=billing_password]').val('form-field-population').trigger('blur');
          var targets = ctrl.attr('data-population-target').split(',');
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
