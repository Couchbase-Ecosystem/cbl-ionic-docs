---
id: scratch 
sidebar_position: 4
---

# Build an App from Scratch 

## Get Started

To get started coding Couchbase Lite for Ionic Capacitor apps, you will need to make sure you have installed all the pre-requisites on your development machine.  You can find the pre-requisites in the [Prerequisites](./prerequisties.md) page.

## Ionic Documenation 
The Ionic documentation for installing a new React App can be found [here](https://ionicframework.com/docs/react/your-first-app).  The directions below are based on the Ionic documentation.  If discrepancies exist between this document and the Ionic documentation, the Ionic documentation should be used.

## Install Ionic

```shell
npm install -g @ionic/cli native-run
```

## Create a new Ionic Capacitor App

This assumes your app name is `my-app`.

```shell
ionic start my-app tabs --type=react --capacitor

cd my-app 
```

:::note
Note the flag at the end states to use Capacitor as the Bridge engine instead of Cordova. This is because the cbl-ionic package requires Capacitor to work.
:::

## Add iOS Support
```shell
npm install @capacitor/ios

npx cap add ios
```

## Add Android Support
```shell
npm install @capacitor/android

npx cap add android
```

:::note
You can now open the project in your IDE of choice. It’s recommended to use VSCode or Cursor as they have plugins for Ionic built in: https://capacitorjs.com/docs/getting-started/vscode-extension
:::

## Update package.json with quality of life improvement commands
By default, the package.json file will have some basic commands to build, run and sync your app.  For a better developer experience, you can add the following commands to the package.json file to make it easier to build, run and sync your app.

```json
 "clean": "rm -rf dist",
 "verify:ios": "cd ios/App && pod install && xcodebuild
  -workspace App.xcworkspace -scheme App -destination
   generic/platform=iOS CODE_SIGN_IDENTITY=\\\"\\\"
    CODE_SIGNING_REQUIRED=NO && cd ../..",
 "verify:android": "cd android && ./gradlew clean build
  test && cd .."
```
The commands above will clean the dist folder, verify the iOS project and verify the Android project.

## Install cbl-ionic and validate installation 

 - Add cbl-ionic to the project using npm:

```shell
npm install cbl-ionic
```
 - Run build to also generate the web assets according to the Capacitor configuration:

```shell
npm run build
```
- Run Capacitor sync:

```shell
npx cap sync
```

:::note
This will sync the iOS and Android Native projects and set them up so they can build. If you skip this step and try to run a verify first, it will fail with some rather obscure errors. 
:::

## Android - Update Gradle file for Couchbase Lite 

Update Gradle file with maven for Couchbase Lite - directions can be found [here](./install#android---update-the-all-projects-gradle-file).

:::note
Skipping this step will result in an error when running verify on the Android project, and thus the Android project will not be able to build.
:::

## Run Verify to validate each platform can build the Native app

Verify each platform tools are properly installed:

```shell
npm run verify:ios

npm run verify:android
```
:::note
This is an intensive task - Android can take upwards of 20 minutes to restore all the dependencies if your Gradle cache is empty.  Failures in the verify process are almost always tools related and you must have your computer set up to do iOS and Android builds from the command line.
:::

## Build your mobile app 

Write awesome code to build your super awesome mobile app. Ionic has a very good set of [React Components](https://ionicframework.com/react).

## Running your app 

Once you are ready to run, helpful commands include:


```shell
ionic capacitor run ios --external -l 

ionic capacitor run android -l --external
```

Note that you can target a specific device.
**iOS**
```shell
ionic capacitor run ios --external -l --target=6C2D0BF0-6D13-4F4C-A452-03B707A2DC9B
```

For iOS you must provide the UUID for the device you want to use. To find your iOS simulator UUID:

```shell
xcrun simctl list devices
```

**Android**
```shell
ionic capacitor run android -l --external --target=API_35
```

For Android emulators, it’s the device name and if there are spaces you must replace the spaces with underscore - see example above where my emulator is named API 35 so I must target it as the name API_35.List all available AVDs, so to see their names:  

```shell
emulator -list-avds
```

:::note
Note: To run the emulator -list-avds command, ensure that your Android SDK tools are correctly configured in your system's PATH and that you have created virtual devices using the Android Virtual Device (AVD) Manager. This command lists available emulators but does not start them.
:::

Example output:

```
Pixel_4_API_33
Pixel_6_Pro_API_34
```

Now you can target a specific device using: 

```shell
npx cap run android --target=Pixel_6_Pro_API_34
```
