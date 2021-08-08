/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

/* global MSApp */

var cordova = require('cordova');
var isWindows = cordova.platformId === 'windows';
var isIos = cordova.platformId === 'ios';
var isAndroid = cordova.platformId === 'android';
var isBrowser = cordova.platformId === 'browser';

window.alert = window.alert || navigator.notification.alert;
if (isWindows && navigator && navigator.notification && navigator.notification.alert) {
    // window.alert is defined but not functional on UWP
    window.alert = navigator.notification.alert;
}

exports.defineAutoTests = function () {
    var createTests = function (platformOpts) {
        platformOpts = platformOpts || '';

        describe('cordova.plugins.browsertab', function () {
            it('browsertab.spec.1 should exist', function () {
                expect(cordova.plugins.browsertab).toBeDefined();
            });

            it('browsertab.spec.2 should contain openUrl function', function () {
                expect(cordova.plugins.browsertab.openUrl).toBeDefined();
                expect(cordova.plugins.browsertab.openUrl).toEqual(jasmine.any(Function));
            });

            it('browsertab.spec.3 should contain isAvailable function', function () {
                expect(cordova.plugins.browsertab.isAvailable).toBeDefined();
                expect(cordova.plugins.browsertab.isAvailable).toEqual(jasmine.any(Function));
            });
        });


        describe('openUrl method', function () {
            if (cordova.platformId === 'osx') {
                pending('Open method not fully supported on OSX.');
                return;
            }

            var originalTimeout;
            var url = 'https://dist.apache.org/repos/dist/dev/cordova/';
            var badUrl = 'http://bad-uri/';

            beforeEach(function () {
                // increase timeout to ensure test url could be loaded within test time
                originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

                iabInstance = null;
            });

            afterEach(function (done) {
                // restore original timeout
                jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;

                // close
                cordova.plugins.browsertab.close()

                // add some extra time so that browser dialog is closed
                setTimeout(done, 2000);
            });

            it('browsertab.spec.4 should support response from isAvailable callback', function (done) {
                cordova.plugins.browsertab.isAvailable(function(result) {
                    // happy path response
                    expect(result).toBeDefined();
                    expect(result).toEqual(true);
                    done();
                  },
                  function(isAvailableError) {
                    done.fail("Error callback has been called");
                  });
            });
        });
    };
    createTests();
};

// TODO: exports.defineManualTests = function (contentEl, createActionButton) {
