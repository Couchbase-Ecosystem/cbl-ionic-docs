---
id: prerequisites
sidebar_position: 1
---

# Prerequisites

Couchbase Lite for Ionic Capacitor is provided as a [Capacitor Plugin](https://capacitorjs.com/docs/plugins/creating-plugins).

The plugin can be found at the following repository [Couchbase Lite for Ionic Capacitor](https://github.com/Couchbase-Ecosystem/cbl-ionic).  This plugin is actively developed and maintained by the community.  It is not an official Couchbase product.  

A developer using this plugin should have a basic understanding of the following technologies:
- [Capacitor](https://capacitorjs.com/docs)
- [Ionic Framework](https://ionicframework.com/docs)
- [Couchbase Lite](https://docs.couchbase.com/couchbase-lite/current/index.html)

## Supported Platforms
- The capacitor plugin is supported on iOS and Android platforms.  Web support is not available.

## Capacitor Version
The plugin is built using Capacitor 6.1.2 and also supports Capacitor 7. The plugin doesn't use any Ionic Framework specific code, so it should work with any version of Ionic that supports Capacitor 6.1.2 or Capacitor 7+.

**Note:** Capacitor 7 has different minimum requirements than Capacitor 6.1.2. Please review the requirements below based on the version you plan to use.

## Development Environment

### Common Requirements (Both Capacitor v6 & v7)
- Capacitor
    - [Capacitor CLI](https://capacitorjs.com/docs/getting-started) (v6 or v7)
    - [Understanding on Capacitor Plugins Development](https://capacitorjs.com/docs/plugins/creating-plugins)
- IDEs
    - [Visual Studio Code](https://code.visualstudio.com/download)
        - [Visual Studio Code Ionic Extension](https://capacitorjs.com/docs/vscode/getting-started)
    - [IntelliJ IDEA](https://www.jetbrains.com/idea/download/)

### Capacitor 6.1.2 Requirements
- Javascript
    - [Node >= 18](https://formulae.brew.sh/formula/node@18)
- iOS Development
    - A modern Mac 
    - [XCode 15](https://developer.apple.com/xcode/) or higher installed and working
    - [iOS 13 or higher].  Any apps using the plugin must be upgraded to iOS 13 or higher.
    - [XCode Command Line Tools](https://developer.apple.com/download/more/) installed 
    - [Simulators](https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators) downloaded and working
    - [Homebrew](https://brew.sh/) 
    - [Cocopods](https://formulae.brew.sh/formula/cocoapods)
    - A valid Apple Developer account and certificates installed and working
- Android Development
    - [API 23 (Android 6)] or higher.  Any apps using the plugin must be upgraded to API 23 or higher.  Any older versions of Android are not supported.
    - [Android Studio](https://developer.android.com/studio?gad_source=1&gclid=CjwKCAjwzN-vBhAkEiwAYiO7oALYfxbMYW_zkuYoacS9TX16aItdvLYe6GB7_j1QwvXBjFDRkawfUBoComcQAvD_BwE&gclsrc=aw.ds) installed and working
    - Android SDK 34 >= installed and working (with command line tools)
    - Java SDK v17 installed and configured to work with Android Studio
    - An Android Emulator downloaded and working

### Capacitor 7+ Requirements
- Javascript
    - [Node >= 20](https://nodejs.org/)
- iOS Development
    - A modern Mac
    - [XCode 16.0](https://developer.apple.com/xcode/) or higher installed and working
    - [iOS 14.0 or higher].  Any apps using the plugin must target iOS 14.0 or higher.
    - [XCode Command Line Tools](https://developer.apple.com/download/more/) installed
    - [Simulators](https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators) downloaded and working
    - [Homebrew](https://brew.sh/)
    - [Cocopods](https://formulae.brew.sh/formula/cocoapods)
    - A valid Apple Developer account and certificates installed and working
- Android Development
    - [API 23 (Android 6)] or higher minimum SDK.  Any apps using the plugin must be upgraded to API 23 or higher.
    - Compile SDK >= Version 35
    - Target SDK >= Version 35
    - [Android Studio 2024.2.1 (Ladybug)](https://developer.android.com/studio) or newer installed and working
    - Android SDK 35 installed and working (with command line tools)
    - Java SDK v21 (JDK 21) installed and configured to work with Android Studio
    - An Android Emulator downloaded and working 
