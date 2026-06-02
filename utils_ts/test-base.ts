
import {test as baseTest} from '@playwright/test';
interface TestDataForOrder
{
    productName: string;
    username: string;
    password: string;
};


export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>(
    {
        testDataForOrder:
        {
            productName: "ZARA COAT 3",
            username: "madalin.petrasciuc@yahoo.com",
            password: "Madalin@123"
        }
    }
)