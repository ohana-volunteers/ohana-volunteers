import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const HoursPublications = {
  hours: 'Hours',
  hoursOrg: 'HoursOrg',
  hoursAdmin: 'HoursAdmin',
};

class HoursCollection extends BaseCollection {
  constructor() {
    super('Hours', new SimpleSchema({
      eventID: String,
      organization: String,
      date: String,
      hours: Number,
      verifiedOn: String,
      isVerified: Boolean,
    }));
  }

  /**
   * Defines a new Hours item.
   * @param eventID the docID of the event item.
   * @param organization the organization the item belongs to.
   * @param date the date of when the item was taken place.
   * @param hours the quantity of hours of the item.
   * @param verifiedOn the date the item was verified on
   * @param isVerified if the item was verified by the organization.
   */
  define({ eventID, organization, date, hours, verifiedOn, isVerified }) {
    const docID = this._collection.insert({
      eventID,
      organization,
      date,
      hours,
      verifiedOn,
      isVerified,
    });
    return docID;
  }

  /**
   * Defines a new Hours item.
   * @param eventID the docID of the event item.
   * @param organization the organization the item belongs to.
   * @param date the date of when the item was taken place.
   * @param hours the quantity of hours of the item.
   * @param verifiedOn the date the item was verified on
   * @param isVerified if the item was verified by the organization.
   * @return {never}
   */
  update(docID, {
    eventID, organization, date, hours, verifiedOn, isVerified,
  }) {
    const updateData = {};
    if (eventID) updateData.eventID = eventID;
    if (organization) updateData.organization = organization;
    if (date) updateData.date = date;
    if (hours) updateData.hours = hours;
    if (verifiedOn) updateData.verifiedOn = verifiedOn;
    if (isVerified) updateData.isVerified = isVerified;
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
      // get the HoursCollection instance.
      const instance = this;
      /** This subscription publishes all documents  */
      Meteor.publish(HoursPublications.hours, function publish() {
        return instance._collection.find();
        // return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the organization. */
      Meteor.publish(HoursPublications.hoursOrg, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.USER)) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ organization: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(HoursPublications.hoursAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for Hours owned by the current user.
   */
  subscribeOpportunity() {
    if (Meteor.isClient) {
      return Meteor.subscribe(HoursPublications.hours);
    }
    return null;
  }

  /**
   * Subscription method for organization users.
   */
  subscribeOpportunityOrg() {
    if (Meteor.isClient) {
      return Meteor.subscribe(HoursPublications.hoursOrg);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeOpportunityAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(HoursPublications.hoursAdmin);
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
   * Returns an object represnting the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{ eventID: *, organization: *, date: *, hours: *, verifiedOn: *, isVerified: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const eventID = doc.eventID;
    const organization = doc.organization;
    const date = doc.date;
    const hours = doc.hours;
    const verifiedOn = doc.verifiedOn;
    const isVerified = doc.isVerified;
    return { eventID, organization, date, hours, verifiedOn, isVerified };
  }
}

export const Hours = new HoursCollection();
