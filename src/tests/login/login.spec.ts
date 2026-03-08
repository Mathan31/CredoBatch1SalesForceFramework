import { test } from "../../core/customeFixtures";
import { LoginPage } from "../../pages/loginPage";
import { ExpectUtil } from "../../utils/expectUtil";
import { JsonUtil } from "../../utils/jsonUtil";
import{ ExceptionUtil }  from "../../utils/exceptionUtil";


const testDataName = "loginData";

test('Login to salesforce with valid credential',async({ loginPage }) => {
try{ 

const config = await JsonUtil.readJsonFile(testDataName);
// Navigate to Salesforce
await loginPage.navigateToLogin();
// Enter User name,Password and click on login button
await loginPage.login(config.username,config.password);
// Validate the home page and check the user name
const loginSuccess = await loginPage.verifyLoginSuccess();
ExpectUtil.expectToBeTrue(loginSuccess);
// Click on Logout and validate the user reached login page
const logoutSuccess = await loginPage.clickLogout();
ExpectUtil.expectToBeTrue(logoutSuccess);
}catch(error){
    await ExceptionUtil.handleException(error as Error);
}
}) 

test('Login to salesforce with In valid credential and validate the erroe msg',async({ loginPage }) => {
try{

const config = await JsonUtil.readJsonFile(testDataName);
// Navigate to Salesforce
await loginPage.navigateToLogin(); 
// Enter User name,Password and click on login button
await loginPage.login(config.username,config.password+"InValid");
// Validate user receives the error msg
const loginFailed = await loginPage.verifyLoginError();
ExpectUtil.expectToBeTrue(loginFailed);
}catch(error){
    await ExceptionUtil.handleException(error as Error);
}
}) 