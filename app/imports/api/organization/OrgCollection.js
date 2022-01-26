import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
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
  specialneeds: {
    name: 'Special Needs',
    icon: 'wheelchair',
  },
};

class OrgCollection extends BaseCollection {
  constructor() {
    super('Orgs', new SimpleSchema({
      name: String,
      categories: Array,
      'categories.$': String,
      location: String,
      website: URL,
      owner: String,
      status: {
        type: String,
        allowedValues: orgPublicationStatus,
        defaultValue: 'hidden',
      },
    }));
  }

  /**
   * Defines a new Stuff item.
   * @param name the name of the item.
   * @param quantity how many.
   * @param owner the owner of the item.
   * @param condition the condition of the item.
   * @return {String} the docID of the new document.
   */
  define({ name, quantity, owner, condition }) {
    const docID = this._collection.insert({
      name,
      quantity,
      owner,
      condition,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param quantity the new quantity (optional).
   * @param condition the new condition (optional).
   */
  update(docID, { name, quantity, condition }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (_.isNumber(quantity)) {
      updateData.quantity = quantity;
    }
    if (condition) {
      updateData.condition = condition;
    }
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
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(orgPublications.orgs, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(orgPublications.orgsAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeStuff() {
    if (Meteor.isClient) {
      return Meteor.subscribe(orgPublications.orgs);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeStuffAdmin() {
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

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const quantity = doc.quantity;
    const condition = doc.condition;
    const owner = doc.owner;
    return { name, quantity, condition, owner };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Organizations = new OrgCollection();
