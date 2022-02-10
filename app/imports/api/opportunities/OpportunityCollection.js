import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
// import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { volunteerCategories } from '../utilities/VolunteerCategories';

export const OpportunityPublications = {
  opportunity: 'Opportunity',
  opportunityOrg: 'OpportunityOrg',
  opportunityAdmin: 'OpportunityAdmin',
};

class OpportunityCollection extends BaseCollection {
  constructor() {
    super('Opportunities', new SimpleSchema({
      url: String,
      date: String,
      img: String,
      organization: String,
      address: String,
      event: String,
      categories: Array, // List of applicable categories
      'categories.$': {
        type: String,
        allowedValues: Object.keys(volunteerCategories),
      },
    }));
  }

  /**
   * Defines a new Opportunity item.
   * @param url the url of the item.
   * @param date the date.
   * @param img the image of the item.
   * @param organization  the organization the item belongs to.
   * @param address  the address of the item.
   * @param event  the name of the item.
   * @param categories  the categories of the item.
   * @return {String} the docID of the new document.
   */
  define({ url, date, img, organization, address, event, categories }) {
    const docID = this._collection.insert({
      url,
      date,
      img,
      organization,
      address,
      event,
      categories,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param url the url of the item.
   * @param date the date.
   * @param img the image of the item.
   * @param organization  the organization the item belongs to.
   * @param address  the address of the item.
   * @param event  the name of the item.
   * @param categories  the categories of the item.
   */
  update(docID, { url, date, img, organization, address, event, categories }) {
    const updateData = {};
    if (url) {
      updateData.url = url;
    }
    if (date) {
      updateData.date = date;
    }
    if (img) {
      updateData.img = img;
    }
    if (organization) {
      updateData.organization = organization;
    }
    if (address) {
      updateData.address = address;
    }
    if (event) {
      updateData.event = event;
    }
    if (categories) {
      updateData.categories = categories;
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
   * It publishes the entire collection for admin and just the Event associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the OpportunityCollection instance.
      const instance = this;
      /** This subscription publishes all documents  */
      Meteor.publish(OpportunityPublications.opportunity, function publish() {
        return instance._collection.find();
        // return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the organization. */
      Meteor.publish(OpportunityPublications.opportunityOrg, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.USER)) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ organization: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const url = doc.url;
    const date = doc.date;
    const img = doc.img;
    const organization = doc.organization;
    const address = doc.address;
    const event = doc.event;
    const categories = doc.categories;
    return { url, date, img, organization, address, event, categories };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Opportunities = new OpportunityCollection();