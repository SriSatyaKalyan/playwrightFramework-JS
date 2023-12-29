const base = require("@playwright/test");

exports.customTest = base.test.extend(
    {
      testDataOrder: {
        username: "patyesh123@gmail.com",
        password: "Password@123",
        productName: "ADIDAS ORIGINAL",
    },
});

// import { test as base } from '@playwright/test';
 
// export default base.extend({
//   customCredenials: async ({}, use) => {
//     await use({
//         username: "patyesh123@gmail.com",
//         password: "Password@123",
//         productName: "ZARA COAT 3",
//     });
//   }
// });
