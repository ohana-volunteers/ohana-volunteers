import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import {
  findOneOrganizationMethod,
  isOrganizationDefinedMethod,
  signUpNewOrganizationMethod,
} from './OrgProfileCollection.methods';
import { getVolunteerCategoryNames } from '../../utilities/VolunteerCategories';
import { ROLE } from '../../role/Role';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isClient) {
  describe('OrgCollection Meteor Methods', function testSuite() {
    it('Can signUpNewOrganization', async function test1() {
      // set up for testing
      const user = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: ROLE.ORGANIZATION,
      };
      const profile = {
        name: faker.lorem.words(),
        categories: getVolunteerCategoryNames().sort(() => 0.5 - Math.random()).slice(0, 2),
        owner: user.email,
      };

      // test define method
      const docID = await signUpNewOrganizationMethod.callPromise({ user, profile });
      expect(await isOrganizationDefinedMethod.callPromise(docID)).to.be.true;
      const doc = await findOneOrganizationMethod.callPromise(docID);
      expect(doc.name).to.equal(profile.name);
      // expect(doc.categories).to.equal(profile.categories);
      expect(doc.owner).to.equal(profile.owner);
    });
  });
}
