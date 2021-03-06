import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

/** Create an instance of a SimplePage when all you need to do is verify that the page was displayed. */
class SimplePage {
  constructor(id) {
    this.pageId = `#${id}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed() {
    // From https://testcafe.io/documentation/402803/recipes/best-practices/create-helpers
    // Note that this file imports t (the test controller) from the testcafe module. You don’t need to pass t to helper functions because TestCafe can resolve the current test context and provide the correct test controller instance.
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const organizationsPage = new SimplePage(PAGE_IDS.ORGANIZATION_LIBRARY);
export const opportunitiesPage = new SimplePage(PAGE_IDS.BROWSE_OPPORTUNITIES);
export const addHoursPage = new SimplePage(PAGE_IDS.ADD_HOURS);
export const listHoursPage = new SimplePage(PAGE_IDS.LIST_HOURS);
export const volunteerProfilePage = new SimplePage(PAGE_IDS.MY_VOLUNTEER_PROFILE);
export const calendarPage = new SimplePage(PAGE_IDS.COMMUNITY_EVENT);
export const aboutUsPage = new SimplePage(PAGE_IDS.ABOUT_US);
export const manageDatabasePage = new SimplePage(PAGE_IDS.MANAGE_DATABASE);
export const signOutPage = new SimplePage(PAGE_IDS.SIGN_OUT);

// Page ID is directed to not found until implementation
export const accountSettingsPage = new SimplePage(PAGE_IDS.NOT_FOUND);
