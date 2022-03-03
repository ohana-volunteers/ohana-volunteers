import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import { Organizations } from './OrgProfileCollection';
import { defineTestUser, withLoggedInUser, withSubscriptions } from '../../test-utilities/test-utilities';
import { defineMethod, updateMethod, removeItMethod } from '../base/BaseCollection.methods';
import { getVolunteerCategoryNames } from '../../utilities/VolunteerCategories';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isClient) {
  describe('OrgCollection Meteor Methods', function testSuite() {
    it('Can define, update, and removeIt', async function test1() {
      // set up for testing
      const { email, password } = await defineTestUser.callPromise();
      await withLoggedInUser({ email, password });
      await withSubscriptions();
      const collectionName = Organizations.getCollectionName();

      // test define method
      const definitionData = {
        name: faker.lorem.words(),
        categories: getVolunteerCategoryNames().sort(() => 0.5 - Math.random()).slice(0, 2),
        owner: email,
      };
      console.log(collectionName, definitionData);

      const docID = await defineMethod.callPromise({ collectionName, definitionData });
      expect(Organizations.isDefined(docID)).to.be.true;
      let doc = Organizations.findDoc(docID);
      expect(doc.name).to.equal(definitionData.name);
      expect(doc.categories).to.equal(definitionData.categories);
      expect(doc.owner).to.equal(definitionData.owner);

      // test update functionality
      const updateData = {
        name: faker.lorem.words(),
        categories: getVolunteerCategoryNames().sort(() => 0.5 - Math.random()).slice(0, 2),
        owner: email,
      };
      await updateMethod.callPromise({ collectionName, updateData });
      doc = Organizations.findDoc(docID);
      expect(doc.name).to.equal(definitionData.name);
      expect(doc.categories).to.equal(definitionData.categories);
      expect(doc.owner).to.equal(definitionData.owner);

      // test removal
      await removeItMethod.callPromise({ collectionName, instance: docID });
      expect(Organizations.isDefined(docID)).to.be.false;
    });
  });
}
