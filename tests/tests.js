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

            it('inappbrowser.spec.2 should contain openUrl function', function () {
                expect(cordova.plugins.browsertab.openUrl).toBeDefined();
                expect(cordova.plugins.browsertab.openUrl).toEqual(jasmine.any(Function));
            });
        });
    };
    createTests();
};

// TODO: exports.defineManualTests = function (contentEl, createActionButton) {
