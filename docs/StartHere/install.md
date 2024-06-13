---
id: install
sidebar_position: 2
---

# Install

## Get Started

To get started coding Couchbase Lite for Ionic Capacitor apps, you will need to clone the Ionic Plugin repo and build the plugin.

 :::note
This plugin is currently under active development.  The plugin is not yet available on npm.  You must use a release from the GitHub repo. 
 :::

### How to install the cbl-ionic Plugin

1. Browse to the list of release on GitHub for the cbl-ionic plugin [here](https://github.com/Couchbase-Ecosystem/cbl-ionic/releases).  Pick a release to download and grab the cbl-ionic.tar.gz file for that release. Once it is downloaded, you can untar the file and the plugin into the root folder of the same as your ionic project.  Your directory structure should look something similar to this: 

- root directory 
  - cbl-ionic
  - ionic-mobile-app

From the root directory change directory into the cbl-ionic folder:

```shell
  cd cbl-ionic
```  
 
2. Install the dependencies on main project.

    ```shell
    npm install
    ```
3. Build and validate that the plugin works.  The verify process will build the plugin and install the CocoaPods in iOS and the gradle files in Android for the plugin.

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
cd ../..
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

### Build your app
You can now use the standard build and run commands that ionic capacitor offers to run your app from the main directory of your app.

```shell
npm run build
```

### Run your app in Native IDEs
You can run your apps in the Native IDEs (XCode and Android Studio) by using the following commands:

**iOS**:
```shell
npx cap sync ios 
npx cap open ios
```

**Android**:
```shell
npx cap sync android
npx cap open android 
```


### Live Reload

To use the live reload feature of ionic capacitor, you can use the following commands:

**iOS**:
```shell
ionic capacitor run ios --livereload external
```

**Android**:
```shell
ionic capacitor run android --livereload external
```

