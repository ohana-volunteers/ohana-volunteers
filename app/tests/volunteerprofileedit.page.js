import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class VolunteerProfileEditPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.EDIT_VOLUNTEER_PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Edit the profile of the user that is logged in. */
  async editProfile(volunteer) {
    await this.isDisplayed();
    await t.selectText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_FIRST_NAME}`).pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_FIRST_NAME}`, volunteer.firstName);
    await t.selectText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_LAST_NAME}`).pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_LAST_NAME}`, volunteer.lastName);
    await t.click('#volunteer-profile-edit-gender-UHJlZmVyJTIwTm90JTIwdG8lMjBTYXk');
    await t.selectText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_DESCRIPTION}`).pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_DESCRIPTION}`, volunteer.bio);
    await t.selectText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_ADDRESS}`).pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_ADDRESS}`, volunteer.address);
    await t.selectText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_CITY}`).pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_CITY}`, volunteer.city);
    await t.selectText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_STATE}`).pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_STATE}`, volunteer.state);
    await t.selectText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_ZIP}`).pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_ZIP}`, volunteer.zip);
    await t.selectText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_PHONE}`).pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_PHONE}`, volunteer.phone);
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_INTERESTS}`);
    const selectInterest = Selector('span').withText('Homelessness/Poverty');
    await t.click(selectInterest);
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_INTERESTS}`);
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_SKILLS}`);
    const selectSkill = Selector('span').withText('Graphic/Web Design');
    await t.click(selectSkill);
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_SKILLS}`);
    await t.click('#volunteer-profile-edit-preference-T3V0ZG9vcg');
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_AVAILABILITY}`);
    const selectAvailability = Selector('span').withText('Once a month');
    await t.click(selectAvailability);
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_AVAILABILITY}`);
    await t.click(`#${COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_SUBMIT}`);
  }
}

export const volunteerProfileEditPage = new VolunteerProfileEditPage();
