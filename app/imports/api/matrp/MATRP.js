import { Meteor } from 'meteor/meteor';
import { AdminProfiles } from '../user/AdminProfileCollection';
import { UserProfiles } from '../user/UserProfileCollection';
import { Organizations } from '../organization/OrgCollection';
import { VolunteerProfiles } from '../user/VolunteerProfileCollection';
import { Opportunities } from '../opportunities/OpportunityCollection';

class MATRPClass {
  collections;

  collectionLoadSequence;

  collectionAssociation;

  constructor() {
    // list of all the MATRP collections
    this.collections = [
      AdminProfiles,
      UserProfiles,
      VolunteerProfiles,
      Organizations,
      Opportunities,
    ];
    /*
     * A list of collection class instances in the order required for them to be sequentially loaded from a file.
     */
    this.collectionLoadSequence = [
      AdminProfiles,
      UserProfiles,
      VolunteerProfiles,
      Organizations,
      Opportunities,
    ];

    /*
     * An object with keys equal to the collection name and values the associated collection instance.
     */
    this.collectionAssociation = {};
    this.collections.forEach((collection) => {
      this.collectionAssociation[collection.getCollectionName()] = collection;
    });

  }

  /**
   * Return the collection class instance given its name.
   * @param collectionName The name of the collection.
   * @returns The collection class instance.
   * @throws { Meteor.Error } If collectionName does not name a collection.
   */
  getCollection(collectionName) {
    // console.log('MATRP', collectionName, this.collectionAssociation);
    const collection = this.collectionAssociation[collectionName];
    if (!collection) {
      throw new Meteor.Error(`Called MATRP.getCollection with unknown collection name: ${collectionName}`);
    }
    return collection;
  }
}

export const MATRP = new MATRPClass();
