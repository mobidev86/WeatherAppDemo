
**Generate Android Asset:**

    react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

**Add Google API KEY:**
 
Changes Required In AndroidManifest.xml File

    <meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="PLACE YOUR KEY HERE"/>

Changes Required In AppDelegate.m File

    [GMSServices provideAPIKey:@"PLACE YOUR KEY HERE"];

**To Use OpenWeather APIs:**  

> /src/helper/api.js

    export const client = axios.create({
    baseURL: apiRootLive,
    timeout: 30000,
    headers: {},
    params: {
    appid: "OPEN WEATHER API KEY",
    },
    });