import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import { Organizations } from './OrgProfileCollection';
import { signUpNewOrganizationMethod } from './OrgProfileCollection.methods';
import { getVolunteerCategoryNames } from '../../utilities/VolunteerCategories';
import { defineTestAdminUser, withLoggedInUser, withSubscriptions } from '../../../test-utilities/test-utilities';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isClient) {
  describe('OrgCollection Meteor Methods', function testSuite() {
    it('Can signUpNewOrganization', async function test1() {
      // set up for testing
      const { email, password } = await defineTestAdminUser.callPromise();
      await withLoggedInUser({ email, password });
      await withSubscriptions();

      // test define method
      const user = {
        username: email,
        password: password,
      };
      const profile = {
        name: faker.lorem.words(),
        categories: getVolunteerCategoryNames().sort(() => 0.5 - Math.random()).slice(0, 2),
        owner: email,
      };

      const docID = await signUpNewOrganizationMethod.callPromise({ user, profile });
      expect(Organizations.isDefined(docID)).to.be.true;
      const doc = Organizations.findDoc(docID);
      expect(doc.name).to.equal(profile.name);
      expect(doc.categories).to.equal(profile.categories);
      expect(doc.owner).to.equal(profile.owner);
    });
  });
}
