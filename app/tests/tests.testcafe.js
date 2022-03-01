import { signOutPage, aboutUsPage, calendarPage, opportunitiesPage, organizationsPage } from './simple.page';
import { signInPage } from './signin.page';
import { landingPage } from './landing.page';
import { navBar } from './navbar.component';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

/* global fixture:false, test:false */

/** Credentials for sample users defined in settings.development.json. */
const volunteer = { username: 'john@foo.com', password: 'changeme' };
const admin = { username: 'admin@foo.com', password: 'changeme' };
const organization = { username: 'hawaiifoodbank@foo.com', password: 'changeme' };

// const newOrg = {
//   username: 'testorg@foo.com', password: 'changeme',
//   name: 'Test Organization',
//   location: '123 King St. Honolulu HI 96822',
//   contact_email: '123 King St. Honolulu HI 96822',
//   publish: 'public',
// };

fixture('matrp localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

test('Test that sign in and sign out work for each role', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(volunteer.username, volunteer.password);
  await navBar.isLoggedIn(volunteer.username);
  await navBar.logout();
  await signOutPage.isDisplayed();

  await navBar.gotoSigninPage();
  await signInPage.signin(admin.username, admin.password);
  await navBar.isLoggedIn(admin.username);
  await navBar.logout();
  await signOutPage.isDisplayed();

  await navBar.gotoSigninPage();
  await signInPage.signin(organization.username, organization.password);
  await navBar.isLoggedIn(organization.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that sign up as organization works', async () => {
  // sign in as admin
  await navBar.gotoSigninPage();
  await signInPage.signin(admin.username, admin.password);
  await navBar.isLoggedIn(admin.username);
  // create new organization
  // TODO
  // sign out again
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that volunteer pages show up', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(volunteer.username, volunteer.password);
  await navBar.isLoggedIn(volunteer.username);
  await navBar.gotoPage(COMPONENT_IDS.NAVBAR_ORGANIZATION_LIBRARY);
  await organizationsPage.isDisplayed();
  await navBar.gotoPage(COMPONENT_IDS.NAVBAR_BROWSE_OPPORTUNITIES);
  await opportunitiesPage.isDisplayed();
  await navBar.gotoPage(COMPONENT_IDS.NAVBAR_COMMUNITY_EVENT);
  await calendarPage.isDisplayed();
  await navBar.gotoPage(COMPONENT_IDS.NAVBAR_ABOUT_US);
  await aboutUsPage.isDisplayed();
  await navBar.logout();
  await signOutPage.isDisplayed();
});
