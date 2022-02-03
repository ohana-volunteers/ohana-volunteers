import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const orgPublicationStatus = ['hidden', 'published'];
export const orgPublications = {
  orgs: 'Organizations', // only orgs marked as published
  orgsAdmin: 'OrganizationsAdmin', // All orgs, even ones not marked as 'published'
};
export const volunteerCategories = {
  animal: {
    name: 'Animal Welfare/Rescue',
    icon: 'paw',
  },
  family: {
    name: 'Child/Family Support',
    icon: 'child',
  },
  covid: {
    name: 'COVID-19 Recovery',
    icon: 'certificate',
  },
  disaster: {
    name: 'Crisis/Disaster Relief',
    icon: 'bell',
  },
  education: {
    name: 'Education',
    icon: 'apple',
  },
  environment: {
    name: 'Environment',
    icon: 'leaf',
  },
  seniors: {
    name: 'Elderly/Senior Care',
    icon: 'users',
  },
  food: {
    name: 'Food Insecurity',
    icon: 'food',
  },
  housing: {
    name: 'Housing',
    icon: 'home',
  },
  homelessness: {
    name: 'Homelessness/Poverty',
    icon: 'bed',
  },
  special_needs: {
    name: 'Special Needs',
    icon: 'wheelchair',
  },
};

class OrgCollection extends BaseCollection {
  constructor() {
    super('Organizations', new SimpleSchema({
      name: String, // Organization name
      categories: Array, // List of applicable categories
      'categories.$': {
        type: String,
        allowedValues: Object.keys(volunteerCategories),
      },
      location: String, // Organization address
      website: URL, // Organization website
      avatar: String,
      contact: Object, // Organization contact info
      'contact.name': String, // Name of person to contact
      'contact.email': String, // Email of person to contact
      'contact.address': {
        type: String,
        optional: true,
      },
      'contact.phone': {
        type: String,
        optional: true,
      },
      owner: String, // Organization owner user account
      status: {
        type: String,
        allowedValues: orgPublicationStatus,
        defaultValue: 'hidden',
      },
    }));
  }

  /**
   * Defines a new Organization.
   * @param name the name of the organization.
   * @param categories List of applicable categories.
   * @param location Organization address.
   * @param website Organization website.
   * @param avatar Organization logo/ profile pic.
   * @param contact Organization contact info.
   * @param owner the owner of the item.
   * @param status the publication status of the item.
   * @return {never} the docID of the new document.
   */
  define({ name, categories, location, website, avatar, contact, owner, status }) {
    return this._collection.insert({
      name,
      categories,
      location,
      website,
      avatar,
      contact,
      owner,
      status,
    });
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param categories List of applicable categories (optional).
   * @param location Organization address (optional).
   * @param website Organization website (optional).
   * @param avatar Organization logo/ profile pic (optional).
   * @param contact Organization contact info (optional).
   * @param status the publication status of the item (optional).
   * @return {never}
   */
  update(docID, { name, categories, location, website, avatar, contact, status }) {
    const updateData = {};
    if (name) updateData.name = name;
    if (categories) updateData.categories = categories;
    if (location) updateData.location = location;
    if (website) updateData.website = website;
    if (avatar) updateData.avatar = avatar;
    if (contact) updateData.contact = contact;
    if (status) updateData.status = status;
    this._collection.update(docID, { $set: updateData });
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
   * It publishes the 'published' orgs for users, and all orgs for admin
   */
  publish() {
    if (Meteor.isServer) {
      // get the Collection instance.
      const instance = this;
      /** This subscription publishes only the documents with status 'published' */
      Meteor.publish(orgPublications.orgs, function publish() {
        return instance._collection.find({ status: 'published' });
      });

      /** This subscription publishes all documents, but only if the logged in user is Admin. */
      Meteor.publish(orgPublications.orgsAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for normal user.
   */
  subscribeOrgs() {
    if (Meteor.isClient) {
      return Meteor.subscribe(orgPublications.orgs);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeOrgsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(orgPublications.orgsAdmin);
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
export const Organizations = new OrgCollection();
