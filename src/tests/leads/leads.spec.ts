import { test } from '../../core/customeFixtures'; 
import { ExpectUtil } from '../../utils/expectUtil';
import { JsonUtil } from '../../utils/jsonUtil';
import { FakerDataUtil } from '../../utils/fakerDataUtil';

const testDataName = "loginData";
test('Create a new lead in Salesforce', async ({ loginPage, dashboardPage, homePage, leadsPage }) => {
  
  const config =  await JsonUtil.readJsonFile(testDataName);
  // Step 1: Navigate to login page
  await loginPage.navigateToLogin();

  // Step 2: Perform login
  await loginPage.login(config.username, config.password);

  // Step 3: Validate login and navigate to home page
  await dashboardPage.clickAppLauncher();
  await dashboardPage.clickViewAll();

  // Step 4: Navigate to Sales and Leads
  await homePage.clickSales();
  await homePage.clickLeads();

  // Step 5: Create a new lead
  await leadsPage.clickNewButton();
  await leadsPage.fillMandatoryFields(FakerDataUtil.generateLastName(), FakerDataUtil.generateCompany(), 'Open - Not Contacted');
  await leadsPage.clickSave();

  // Step 6: Validate lead creation
  const isLeadCreated = await leadsPage.validateLeadCreation();
  await ExpectUtil.expectToBeTrue(isLeadCreated); 
  await loginPage.clickProfileImage();
  const loginIsVisible = await loginPage.clickLogout();
   await ExpectUtil.expectToBeTrue(loginIsVisible);

  // Step 6: Perform Sign Off
});