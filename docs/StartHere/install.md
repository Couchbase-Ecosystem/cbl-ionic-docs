---
id: install
sidebar_position: 2
---

# Install

## Get Started

To get started coding Couchbase Lite for Ionic Capacitor apps, you will need to clone the Ionic Plugin repo and build the plugin.

 :::note
 This plugin is actively developed and a full release download isn't currently available. A downloadable release is planned for the future. 
 :::

### How to Build the Plugin

1. Fork and clone this repo.  You will need to also clone all the submodules for the shared libraries and tests and update them with the latest version of each of those modules code.  Run the following commands from the root of the cbl-ionic repo:
 ```shell
    git clone --recurse-submodules git@github.com:Couchbase-Ecosystem/cbl-ionic.git
    cd cbl-ionic
    git submodule update --remote --recursive
    ```  
 
2. Install the dependencies on main project.

    ```shell
    cd cbl-ionic
    npm install
    ```
3. Install CocoaPods if you are going to work on iOS. 

    ```shell
    cd ios
    pod install 
    cd ..
    ```

4. Run npm build to build Javascript - from project root.

    ```shell
    npm run build
    npm run verify
    ```
Once you have built the plugin, you can add it to your Ionic project.

### Add the Plugin to your Ionic Project

In your project package.json add the ionic plugin to your dependencies. Since this is done at the file system you can use either a relative file path or [npm link/unlink](https://docs.npmjs.com/cli/v10/commands/npm-link).  The following example shows using a file path. 

```json  
 "dependencies": {
    "cbl-ionic": "file:../cbl-ionic/"
	...
}
```

In this example the cbl-ionic repo is in the same "root" folder as the Ionic app, this .. would do a change directory (cd) out the root folder where the cbl-ionic folder is located.

Finally do an npm install to install the plugin into your project.

```shell
npm install
```

### iOS - Validate Cocoa Pod Installation

The `npm install` should add the plugin to your project and install the CocoaPods for iOS.  You can validate the CocoaPods installation by reviewing the `Podfile` the ios\App folder of your Ionic project.  The file should look something like this:

```ruby
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '13.0'
use_frameworks!

# workaround to avoid Xcode caching of Pods that requires
# Product -> Clean Build Folder after new Cordova plugins installed
# Requires CocoaPods 1.6 or newer
install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
  pod 'CblIonic', :path => '../../../cbl-ionic'
  pod 'CapacitorApp', :path => '../../node_modules/@capacitor/app'
  pod 'CapacitorHaptics', :path => '../../node_modules/@capacitor/haptics'
  pod 'CapacitorKeyboard', :path => '../../node_modules/@capacitor/keyboard'
  pod 'CapacitorStatusBar', :path => '../../node_modules/@capacitor/status-bar'
end

target 'App' do
  capacitor_pods
  # Add your Pods here
end

post_install do |installer|
  assertDeploymentTarget(installer)
end
```

:::note
Note that the plugin requires iOS 13.0 or higher.  You must update any existing iOS projects to use iOS 13.0 or higher.
:::

Once you validated the CocoaPods installation, you must do a `pod install` from the ios\App folder to install the CocoaPods into your iOS project before your app will build to add the CocoaPod to your project.

```shell 
cd ios/App
pod install
```

### Android - Update the `all projects` gradle file 

In Android, you need to update the main build.gradle file found at the root of your Android folder of the application to include the URL to find Couchbase Lite for Android.  The following is an example of the build.gradle file:

```gradle
allprojects {
    repositories {
        google()
        maven {url 'https://mobile.maven.couchbase.com/maven2/dev/'}
        mavenCentral()
    }
}
```
![Android Maven Gradle screenshot](./android-maven-gradle.png)

In this example, the maven url was added that points to the maven server that hosts the Couchbase Lite Android packages.