import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Users } from '../UserCollection';
import BaseCollection from '../../base/BaseCollection';
import { ROLE } from '../../role/Role';
import { organizationProfileSchema } from '../../utilities/SchemaDefinitions';

export const organizationPublications = {
  orgs: 'Organizations',
  orgsAdmin: 'OrganizationsAdmin',
};

class OrgProfileCollection extends BaseCollection {
  constructor() {
    super('Organizations', new SimpleSchema(organizationProfileSchema));
  }

  /**
   * Defines a new Organization.
   * @return {String} the docID of the new document.
   */
  define(profile) {
    if (Meteor.isServer) {
      const profileID = this._collection.insert(profile);
      const username = profile.email;
      const password = profile.password;
      const user = this.findOne(username);
      // create new user if necessary
      if (!user) {
        const role = ROLE.ORGANIZATION;
        const userID = Users.define({ username, role, password });
        Roles.createRole(ROLE.ORGANIZATION, { unlessExists: true });
        Roles.addUsersToRoles(userID, ROLE.ORGANIZATION);
      }
      return profileID;
    }
    return undefined;
  }

  /**
   * Updates the given document.
   * @return {never}
   */
  update(docID, object) {
    this._collection.update(docID, { $set: object });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   */
  publish() {
    if (Meteor.isServer) {
      // get the Collection instance.
      const instance = this;
      /** Publish only profiles marked as 'public' to all users */
      Meteor.publish(organizationPublications.orgs, function publish() {
        return instance._collection.find({ status: 'public' });
      });

      /** Publish all profiles to admin */
      Meteor.publish(organizationPublications.orgsAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for organizations marked as public
   */
  subscribe() {
    if (Meteor.isClient) {
      return Meteor.subscribe(organizationPublications.orgs);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(organizationPublications.orgsAdmin);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Organizations = new OrgProfileCollection();