const base = require('@playwright/test');


exports.customtest = base.test.extend(
    {
        testDataForOrder:
        {
            productName: "ZARA COAT 3",
            username: "madalin.petrasciuc@yahoo.com",
            password: "Madalin@123"
        }
    }
)