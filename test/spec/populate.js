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

      it('expected to respond', function() {
        expect(object.data(pluginName)).to.respondTo('populate');
      });

      context('with invalid target selector', function() {

        var backup = null;
        var name = null;

        beforeEach(function() {
          name = object.find('input[name=billing_name]');
          backup = name.attr('data-population-target');
          name.attr('data-population-target', 'invalid-selector');
        });

        afterEach(function() {
          name.attr('data-population-target', backup);
        });

        it('expected to throw error', function() {
          function test() {
            object.data(pluginName).populate(name);
          }
          expect(test).to.throw(TypeError, /Invalid population target. Target not found./);
        });

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

        it('expected to populate text field value to hidden input', function() {
          var ctrl = object.find('input[name=billing_city]').trigger('blur');
          var value = $(ctrl.attr('data-population-target')).val();
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
          var ctrl = object.find('input[name=billing_express]');
          if (ctrl.prop) {
            ctrl.prop('checked', true);
          } else {
            ctrl.attr('checked', true);
          }
          ctrl.trigger('change');
          var checked = $(ctrl.attr('data-population-target')).is(':checked');
          return expect(checked).to.be.ok;
        });

        it('expected to populate unchecked checkbox value', function() {
          var ctrl = object.find('input[name=billing_express]');
          if (ctrl.prop) {
            ctrl.prop('checked', false);
          } else {
            ctrl.attr('checked', false);
          }
          ctrl.trigger('change');
          var checked = $(ctrl.attr('data-population-target')).is(':checked');
          return expect(checked).to.not.be.ok;
        });

        it('expected to populate checked checkbox value to hidden input', function() {
          var ctrl = object.find('input[name=billing_newsletter]');
          if (ctrl.prop) {
            ctrl.prop('checked', true);
          } else {
            ctrl.attr('checked', true);
          }
          ctrl.trigger('change');
          var value = $(ctrl.attr('data-population-target')).val();
          return expect(value).to.equal('1');
        });

        it('expected to populate unchecked checkbox value to hidden input', function() {
          var ctrl = object.find('input[name=billing_newsletter]');
          if (ctrl.prop) {
            ctrl.prop('checked', false);
          } else {
            ctrl.attr('checked', false);
          }
          ctrl.trigger('change');
          var target = $(ctrl.attr('data-population-target'));
          return expect(target.is(':disabled')).to.be.ok &&
            expect(target.val()).to.be.empty;
        });

        it('expected to populate radio value', function() {
          var ctrl = object.find('input[name=billing_payment]').eq(0).attr('checked', true).trigger('change');
          var value = $(ctrl.attr('data-population-target')).val();
          return expect(value).to.equal(ctrl.val());
        });

        it('expected to populate hidden field value', function() {
          var ctrl = object.find('input[name=billing_hash]').trigger('change');
          var value = $(ctrl.attr('data-population-target')).val();
          return expect(value).to.equal(ctrl.val());
        });

      });

      context('with multiple targets', function() {

        it('expected to populate password field value to all targets', function() {
          var ctrl = object.find('input[name=billing_password]').eq(0).attr('checked', true).trigger('blur');
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
