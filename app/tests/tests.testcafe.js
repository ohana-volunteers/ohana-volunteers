import { t } from 'testcafe';
import {
  signOutPage,
  aboutUsPage,
  calendarPage,
  opportunitiesPage,
  organizationsPage,
  volunteerProfilePage,
  addHoursPage,
  listHoursPage,
  accountSettingsPage,
} from './simple.page';
import { signUpPage } from './signup.page';
import { signInPage } from './signin.page';
import { landingPage } from './landing.page';
import { navBar } from './navbar.component';
import { volunteerProfileEditPage } from './volunteerprofileedit.page';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

/* global fixture:false, test:false */

/** Credentials for sample users defined in settings.development.json. */
const volunteer = { username: 'john@foo.com', password: 'changeme' };
const admin = { username: 'admin@foo.com', password: 'changeme' };
const organization = { username: 'hawaiifoodbank@foo.com', password: 'changeme' };

const volunteerInput = {
  email: 'jane@foo.com',
  firstName: 'Jane',
  lastName: 'Foo',
  password: 'changeme',
  address: '2600 Campus Ave.',
  city: 'Honolulu',
  bio: 'My first bio.',
  state: 'HI',
  zip: '96822',
  phone: '(808) 123-4567',
};

const updatedVolunteerInput = {
  email: 'jane@foo.com',
  firstName: 'Jessica',
  lastName: 'Fool',
  password: 'changeme',
  address: '2600 Campus Road.',
  city: 'Kapolei',
  bio: 'My new updated bio.',
  state: 'HI',
  zip: '96123',
  phone: '(808) 987-6543',
};

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

test('Test that sign in and sign out work for volunteer', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(volunteer.username, volunteer.password);
  await navBar.isLoggedIn(volunteer.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that sign in and sign out work for admin', async () => {
  await navBar.gotoSigninPage();
  await signInPage.signin(admin.username, admin.password);
  await navBar.isLoggedIn(admin.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that sign in and sign out work for organization', async () => {
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
  await navBar.goToDropDownPage(COMPONENT_IDS.NAVBAR_ADD_HOURS);
  await addHoursPage.isDisplayed();
  await navBar.goToDropDownPage(COMPONENT_IDS.NAVBAR_LIST_HOURS);
  await listHoursPage.isDisplayed();
  await navBar.goToDropDownPage(COMPONENT_IDS.NAVBAR_DROPDOWN_ACCOUNT_SETTINGS);
  await accountSettingsPage.isDisplayed();
  await navBar.goToDropDownPage(COMPONENT_IDS.NAVBAR_DROPDOWN_MY_PROFILE);
  await volunteerProfilePage.isDisplayed();
  await t.click(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT}`);
  await volunteerProfileEditPage.isDisplayed();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that volunteer forms work', async () => {
  await navBar.gotoSignupPage();
  await signUpPage.isDisplayed();
  await signUpPage.signUpVolunteer(volunteerInput);
  await navBar.gotoSigninPage();
  await signInPage.signin(volunteerInput.email, volunteerInput.password);
  await navBar.goToDropDownPage(COMPONENT_IDS.NAVBAR_DROPDOWN_MY_PROFILE);
  await volunteerProfilePage.isDisplayed();
  await t.click(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT}`);
  await volunteerProfileEditPage.isDisplayed();
  await volunteerProfileEditPage.editProfile(updatedVolunteerInput);
});
