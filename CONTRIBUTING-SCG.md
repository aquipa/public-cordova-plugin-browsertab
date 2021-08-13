# Contributor Guidelines
Thanks for helping to improve this project! This page provides specific details for contributing to this project. It is important to first see the General Contributing guidelines [TODO: add a link]().

## Prerequisites
Make sure your development environment is setup:
- [Android](https://cordova.apache.org/docs/en/10.x/guide/platforms/android/index.html)
- [iOS](https://cordova.apache.org/docs/en/10.x/guide/platforms/ios/index.html)

## Testing
*NOTE: Currently has only been validated with Android on macos.

### 1. 
`cordova-paramedic` must be installed globally.

```bash
npm install -g SwitchCaseGroup/cordova-paramedic#996951d
```
***SwitchCase** branch includes a patch to support cordova-android@10, intend to get merged back to **apache/cordova-paramedic**.*

---
### 2. 

MUST start with an Android emulator running on your machine
[start from the command line](https://developer.android.com/studio/run/emulator-commandline)
```bash
emulator -avd <avd_name> -netdelay none -netspeed full
```

---
### 3. 

With emulator still running, the testing tool `cordova-paramedic` can be run:

```bash
cordova-paramedic --platform android@10.1.0 --plugin .
```

---
### 4.

For debugging and testing changes, you can use the project created during the run of `cordova-paramedic`. The project path is printed in the terminal history.

```bash
# cd to project path
cd /var/folders/k1/565sl72s2sv1cc4k7d93984w0000gn/T/tmp-62630x4OtvvVFlfS8
# open the android project
open -a /Applications/Android\ Studio.app ./platforms/android/
```

From Android Studio you can run and debug, just like like any standard Android project.

### Notes

- tests reside in the [/tests](/tests) folder. More details can be found at https://github.com/apache/cordova-plugin-test-framework#readme

## About `cordova-paramedic`

[cordova-paramedic](https://github.com/apache/cordova-paramedic) is a tool to automate execution of Cordova plugins tests (via [cordova-plugin-test-framework](https://github.com/apache/cordova-plugin-test-framework)).

`cordova-paramedic` creates a temporary cordova project using the `cordova create` command and the default behavior will use the template [cordova-app-hello-world](https://github.com/apache/cordova-app-hello-world).

Currently, the [cordova-app-hello-world](https://github.com/apache/cordova-app-hello-world) template with [cordova-android](https://github.com/apache/cordova-android)@10+ blocks insecure (HTTP) requests. Allowing insecure (HTTP) is necessary for `cordova-paramedic` to work, because the [cordova-plugin-test-framework](https://github.com/apache/cordova-plugin-test-framework) scripts running in the cordova environment, need to post (HTTP PUT) test results to the local server of `cordova-paramedic`, awaiting the results. 

To address the need for insecure (HTTP) is why we are installing the forked [SwitchCaseGroup/cordova-paramedic#996951d](https://github.com/SwitchCaseGroup/cordova-paramedic/commit/996951d3e455d91c9439951d2c3f1a96ef927de2)) version, which runs `cordova create` with the forked [SwitchCaseGroup/cordova-app-hello-world#allow-http-for-posting-status](https://github.com/SwitchCaseGroup/cordova-app-hello-world/tree/allow-http-for-posting-status) which enables both `AndroidInsecureFileModeEnabled=true` and `android:usesCleartextTraffic=true`.
