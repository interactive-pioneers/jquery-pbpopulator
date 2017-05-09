'use strict';

/* global expect */

/* Disable JSHint complaining about async Mocha expects */
/* jshint -W030 */

(function() {

  describe('iptPopulator', function() {

    var selector = 'form:first';
    var object = null;

    describe('populate', function() {

      beforeEach(function() {
        object = $(selector).iptPopulator();
      });

      afterEach(function() {
        $(selector).unbind();
      });

      context('when emitting success event', function() {

        context('with text field', function() {

          it('expected to have type', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('type', 'populationSuccess').that.is.a('string');
              done();
            }).find('input[name=billing_name]').trigger('blur');
          });

          it('expected to have target', function(done) {
            var ctrl = object.find('input[name=billing_password]');
            var firstName = $(ctrl.attr('data-population-target')).attr('name');
            object.bind('success', function(event, data) {
              expect(data).to.have.property('target').that.is.an('object') &&
                expect(data.target.attr('name')).to.equal(firstName);
              done();
            });
            ctrl.trigger('blur');
          });

          it('expected to have source', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('source').that.is.an('object') &&
                expect(data.source.attr('name')).to.equal('billing_name');
              done();
            }).find('input[name=billing_name]').trigger('blur');
          });

        });

        context('with password field', function() {

          it('expected to have type', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('type', 'populationSuccess').that.is.a('string');
              done();
            }).find('input[name=billing_password]').trigger('blur');
          });

          it('expected to have target', function(done) {
            var ctrl = object.find('input[name=billing_password]');
            var firstName = $(ctrl.attr('data-population-target')).attr('name');
            object.bind('success', function(event, data) {
              expect(data).to.have.property('target').that.is.an('object') &&
                expect(data.target.attr('name')).to.equal(firstName);
              done();
            });
            ctrl.trigger('blur');
          });

          it('expected to have source', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('source').that.is.an('object') &&
                expect(data.source.attr('name')).to.equal('billing_password');
              done();
            }).find('input[name=billing_password]').trigger('blur');
          });

        });

        context('with email field', function() {

          it('expected to have type', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('type', 'populationSuccess').that.is.a('string');
              done();
            }).find('input[name=billing_email]').trigger('blur');
          });

          it('expected to have target', function(done) {
            var ctrl = object.find('input[name=billing_email]');
            var firstName = $(ctrl.attr('data-population-target')).attr('name');
            object.bind('success', function(event, data) {
              expect(data).to.have.property('target').that.is.an('object') &&
                expect(data.target.attr('name')).to.equal(firstName);
              done();
            });
            ctrl.trigger('blur');
          });

          it('expected to have source', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('source').that.is.an('object') &&
                expect(data.source.attr('name')).to.equal('billing_email');
              done();
            }).find('input[name=billing_email]').trigger('blur');
          });

        });

        context('with phone field', function() {

          it('expected to have type', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('type', 'populationSuccess').that.is.a('string');
              done();
            }).find('input[name=billing_phone]').trigger('blur');
          });

          it('expected to have target', function(done) {
            var ctrl = object.find('input[name=billing_phone]');
            var firstName = $(ctrl.attr('data-population-target')).attr('name');
            object.bind('success', function(event, data) {
              expect(data).to.have.property('target').that.is.an('object') &&
                expect(data.target.attr('name')).to.equal(firstName);
              done();
            });
            ctrl.trigger('blur');
          });

          it('expected to have source', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('source').that.is.an('object') &&
                expect(data.source.attr('name')).to.equal('billing_phone');
              done();
            }).find('input[name=billing_phone]').trigger('blur');
          });

        });

        context('with hidden field', function() {

          it('expected to have type', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('type', 'populationSuccess').that.is.a('string');
              done();
            }).find('input[name=billing_hash]').trigger('change');
          });

          it('expected to have target', function(done) {
            var ctrl = object.find('input[name=billing_hash]');
            var firstName = $(ctrl.attr('data-population-target')).attr('name');
            object.bind('success', function(event, data) {
              expect(data).to.have.property('target').that.is.an('object') &&
                expect(data.target.attr('name')).to.equal(firstName);
              done();
            });
            ctrl.trigger('change');
          });

          it('expected to have source', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('source').that.is.an('object') &&
                expect(data.source.attr('name')).to.equal('billing_hash');
              done();
            }).find('input[name=billing_hash]').trigger('change');
          });

        });

        context('with checkbox', function() {

          it('expected to have type', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('type', 'populationSuccess').that.is.a('string');
              done();
            }).find('input[name=billing_express]').trigger('change');
          });

          it('expected to have target', function(done) {
            var ctrl = object.find('input[name=billing_express]');
            var firstName = $(ctrl.attr('data-population-target')).attr('name');
            object.bind('success', function(event, data) {
              expect(data).to.have.property('target').that.is.an('object') &&
                expect(data.target.attr('name')).to.equal(firstName);
              done();
            });
            ctrl.trigger('change');
          });

          it('expected to have source', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('source').that.is.an('object') &&
                expect(data.source.attr('name')).to.equal('billing_express');
              done();
            }).find('input[name=billing_express]').trigger('change');
          });

        });

        context('with radio input', function() {

          it('expected to have type', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('type', 'populationSuccess').that.is.a('string');
              done();
            }).find('input[name=billing_payment]:first').trigger('change');
          });

          it('expected to have target', function(done) {
            var ctrl = object.find('input[name=billing_payment]:first');
            var firstName = $(ctrl.attr('data-population-target')).attr('name');
            object.bind('success', function(event, data) {
              expect(data).to.have.property('target').that.is.an('object') &&
                expect(data.target.attr('name')).to.equal(firstName);
              done();
            });
            ctrl.trigger('change');
          });

          it('expected to have source', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('source').that.is.an('object') &&
                expect(data.source.attr('name')).to.equal('billing_payment');
              done();
            }).find('input[name=billing_payment]:first').trigger('change');
          });

        });

        context('with select', function() {

          it('expected to have type', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('type', 'populationSuccess').that.is.a('string');
              done();
            }).find('select[name=billing_title]').trigger('change');
          });

          it('expected to have target', function(done) {
            var ctrl = object.find('select[name=billing_title]');
            var firstName = $(ctrl.attr('data-population-target')).attr('name');
            object.bind('success', function(event, data) {
              expect(data).to.have.property('target').that.is.an('object') &&
                expect(data.target.attr('name')).to.equal(firstName);
              done();
            });
            ctrl.trigger('change');
          });

          it('expected to have source', function(done) {
            object.bind('success', function(event, data) {
              expect(data).to.have.property('source').that.is.an('object') &&
                expect(data.source.attr('name')).to.equal('billing_title');
              done();
            }).find('select[name=billing_title]').trigger('change');
          });

        });

      });

      context('when emitting error event', function() {

        // XXX: select is currently only control that emits error.

        context('with select', function() {

          var backup = null;
          var select = null;

          beforeEach(function() {
            select = object.find('select[name=billing_title]');
            backup = select.attr('data-population-target');
            select.attr('data-population-target', '#js_outside_mismatch_title');
          });

          afterEach(function() {
            select.attr('data-population-target', backup);
          });

          it('expected to have type', function(done) {
            object.bind('error', function(event, data) {
              expect(data).to.have.property('type', 'populationMismatch').that.is.a('string');
              done();
            }).find('select[name=billing_title]').trigger('change');
          });

          it('expected to have target', function(done) {
            var ctrl = object.find('select[name=billing_title]');
            var firstName = $(ctrl.attr('data-population-target')).attr('name');
            object.bind('error', function(event, data) {
              expect(data).to.have.property('target').that.is.an('object') &&
                expect(data.target.attr('name')).to.equal(firstName);
              done();
            });
            ctrl.trigger('change');
          });

          it('expected to have source', function(done) {
            object.bind('error', function(event, data) {
              expect(data).to.have.property('source').that.is.an('object') &&
                expect(data.source.attr('name')).to.equal('billing_title');
              done();
            }).find('select[name=billing_title]').trigger('change');
          });

        });

      });

    });

  });

})();
