import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { OpportunitySchema } from '../utilities/OpportunitySchema';

export const OpportunityEnvironment = ['Indoor', 'Outdoor', 'Both', 'No Preference'];
export const OpportunityAge = ['Adults', 'Family-Friendly', 'Teens', 'Seniors'];
export const OpportunityPublications = {
  opportunity: 'Opportunity',
  opportunityOrg: 'OpportunityOrg',
  opportunityAdmin: 'OpportunityAdmin',
};

class OpportunityCollection extends BaseCollection {
  constructor() {
    super('Opportunities', new SimpleSchema(OpportunitySchema));
  }

  /**
   * Defines a new Opportunity item.
   * @param date the date.
   * @param img the image of the item.
   * @param organization  the organization the item belongs to.
   * @param address  the address of the item.
   * @param description  the description of the item.
   * @param coordinates  the coordinates of the item.
   * @param event  the name of the item.
   * @param categories  the categories of the item.
   * @param environment  the environment of the item.
   * @param age  the age group of the item.
   * @param isVerified if the item was verified by the admin.
   * @return {String} the docID of the new document.
   */
  define({ date, img, organization, address, description, coordinates, event, categories, environment, age, isVerified }) {
    const docID = this._collection.insert({
      date,
      img,
      organization,
      address,
      description,
      coordinates,
      event,
      categories,
      environment,
      age,
      isVerified,
    });
    // this._collection.createIndex({ '$**': 'text' });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param date the date.
   * @param img the image of the item.
   * @param organization  the organization the item belongs to.
   * @param address  the address of the item.
   * @param description  the description of the item.
   * @param coordinates  the coordinates of the item.
   * @param event  the name of the item.
   * @param categories  the categories of the item.
   * @param environment  the environment of the item.
   * @param age the age group of the item.
   * @param isVerified if the item was verified by the admin.
   */
  update(docID, { date, img, organization, address, description, coordinates, event, categories, environment, age, isVerified }) {
    const updateData = {};
    if (date)updateData.date = date;
    if (img) updateData.img = img;
    if (organization) updateData.organization = organization;
    if (address) updateData.address = address;
    if (description) updateData.description = description;
    if (coordinates) updateData.coordinates = coordinates;
    if (event) updateData.event = event;
    if (categories) updateData.categories = categories;
    if (environment) updateData.environment = environment;
    if (age) updateData.age = age;
    if (isVerified) {
      updateData.isVerified = true;
    } else {
      updateData.isVerified = false;
    }
    if (isVerified) updateData.isVerified = true;
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
   * It publishes the entire collection for admin and just the Event associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the OpportunityCollection instance.
      const instance = this;
      /**
       * This subscription publishes all documents for volunteer.
       */
      Meteor.publish(OpportunityPublications.opportunity, function publish() {
        return instance._collection.find();
        // return this.ready();
      });

      /**
       * This subscription publishes documents that belong to logged-in organization who can access define, update and removeIt.
       */
      Meteor.publish(OpportunityPublications.opportunityOrg, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.VOLUNTEER)) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ organization: username });
        }
        return this.ready();
      });

      /**
       *This subscription publishes all documents for Admin who can access define, update and removeIt.
       */
      Meteor.publish(OpportunityPublications.opportunityAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for Opportunity owned by the current user.
   */
  subscribeOpportunity() {
    if (Meteor.isClient) {
      return Meteor.subscribe(OpportunityPublications.opportunity);
    }
    return null;
  }

  /**
   * Subscription method for organization users.
   */
  subscribeOpportunityOrg() {
    if (Meteor.isClient) {
      return Meteor.subscribe(OpportunityPublications.opportunityOrg);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeOpportunityAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(OpportunityPublications.opportunityAdmin);
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.ORGANIZATION]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const date = doc.date;
    // When dumped, string will be sliced as the original base64 string is too long
    const img = doc.img.slice(0, 50);
    const organization = doc.organization;
    const address = doc.address;
    const description = doc.description;
    const coordinates = doc.coordinates;
    const event = doc.event;
    const categories = doc.categories;
    const environment = doc.environment;
    const age = doc.age;
    const isVerified = doc.isVerified;
    return { date, img, organization, address, description, coordinates, event, categories, environment, age, isVerified };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Opportunities = new OpportunityCollection();
