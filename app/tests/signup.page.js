import { Selector, t } from 'testcafe';
import { navBar } from './navbar.component';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class SignupPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SIGN_UP}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(username, password) {
    await this.isDisplayed();
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_EMAIL}`, username);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}`, password);
    await t.click(`#${COMPONENT_IDS.SIGN_UP_FORM_SUBMIT}`);
    await navBar.isLoggedIn(username);
  }

  /** Sign up a new volunteer with volunteer related credentials. */
  async signUpVolunteer(newVolunteer) {
    await this.isDisplayed();
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME}`, newVolunteer.firstName);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME}`, newVolunteer.lastName);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_EMAIL}`, newVolunteer.email);
    await t.click('#sign-up-form-gender-Female');
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_ADDRESS}`, newVolunteer.address);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_CITY}`, newVolunteer.city);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_STATE}`, newVolunteer.state);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_ZIP}`, newVolunteer.zip);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PHONE}`, newVolunteer.phone);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}`, newVolunteer.password);
    await t.click('#sign-up-form-interests');
    await t.click('#sign-up-form-environmental-preference-Indoor');
  }
}

export const signUpPage = new SignupPage();
