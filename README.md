git reset --soft HEAD~

Build & Clean Android App
./gradlew clean
./gradlew assembleRelease
./gradlew app:assembleRelease
./gradlew bundleRelease
./gradlew app:bundleRelease

========================================

Run Anroid App
npx react-native run-android

Run Android in mac
source ~/.bash_profile
chmod +x gradlew

========================================

Generate react-native bundle with assets
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

Generate react-native bundle without assets
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle

========================================

npx react-native bundle --dev false --entry-file index.js --bundle-output ios/main.jsbundle --platform ios

npx react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/zaraye/main.jsbundle
