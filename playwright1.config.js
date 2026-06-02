// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries : 2,// o sa reia testele failed inca o data la final
  //workers : 3,// cate teste sa ruleze in paralel, default e numarul de core-uri/
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  projects: [
    {
      name:'chrome',
  use: {

    browserName : 'chromium',
    headless : true,
    //viewport : {width: 720, height: 720},
    screenshot : 'on',
    ignoreHTTPSErrors : true,//ignora eroriele de tip SSL, accepta automat optiunea ca sa poate deschide siteul.
    permissions : ['geolocation'],//permite sa se dea accept la permisiunea de geolocatie
    trace : 'on',//off,on,only-on-failure
    video : 'retain-on-failure',//off,on,retain-on-failure,on-first-retry
    //...devices['Pixel 5']
    },
  },
  {
    name:'safari',
use: {

  browserName : 'webkit',
  headless : true,
  screenshot : 'on',
  trace : 'on',//off,on,only-on-failure
  video : 'retain-on-failure',//off,on,retain-on-failure,on-first-retry
  ...devices['iPad Pro 11']
  },
}
]


};

module.exports = config;
