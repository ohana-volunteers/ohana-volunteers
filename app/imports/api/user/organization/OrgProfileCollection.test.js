import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import fc from 'fast-check';
import { removeAllEntities } from '../../base/BaseUtilities';
import { Organizations } from './OrgProfileCollection';
import { getVolunteerCategoryNames } from '../../utilities/VolunteerCategories';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe(Organizations.getCollectionName(), function testSuite() {
    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('Can define and removeIt', function test1(done) {
      fc.assert(
        fc.property(fc.lorem({ maxCount: 1 }), fc.lorem({ maxCount: 1 }),
          () => {
            const user = {
              username: faker.internet.email(),
              password: faker.internet.password(),
            };
            const profile = {
              name: faker.lorem.words(),
              categories: getVolunteerCategoryNames().sort(() => 0.5 - Math.random()).slice(0, 2),
              owner: user.username,
            };
            const docID = Organizations.define(user, profile);
            expect(Organizations.isDefined(docID)).to.be.true;
            Organizations.removeIt(docID);
            expect(Organizations.isDefined(docID)).to.be.false;
          }),
      );
      done();
    });

  });
}
