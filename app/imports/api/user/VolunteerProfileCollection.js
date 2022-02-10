import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';

class VolunteerProfileCollection extends BaseProfileCollection {
  constructor() {
    super('VolunteerProfile', new SimpleSchema({
      email: String,
      firstName: String,
      lastName: String,
      description: {
        type: String,
        defaultValue: 'I am a new user of Volunteer Ally!',
      },
      gender: {
        type: String,
        allowedValues: ['Female', 'Male', 'Other', 'Prefer Not to Say'],
      },
      address: String,
      city: String,
      state: String,
      zip: String,
      phone: String,
      interests: {
        type: Array,
        optional: false,
      },
      'interests.$': {
        type: String,
        allowedValues: ['Animal Welfare/Rescue', 'COVID-19 Recovery', 'Education', 'Elderly/Senior Care',
          'Housing', 'Special Needs', 'Child/Family Support', 'Crisis/Disaster Relief', 'Environment', 'Food Banks',
          'Homelessness/Poverty'],
      },
      skills: {
        type: Array,
        optional: true,
      },
      'skills.$': {
        type: String,
        optional: true,
        allowedValues: ['Agriculture', 'Education', 'Event Planning', 'Technology',
          'CPR (Certification Required)', 'Nursing (CNA/RNA Certified)', 'Construction', 'Engineering', 'Sales/Marketing',
          'Graphic/Web Design', 'First Aid (Certification Required)', 'Other'],
      },
      environmentalPreference: {
        type: String,
        allowedValues: ['Indoor', 'Outdoor', 'Both', 'No Preference'],
      },
      availability: {
        type: Array,
        optional: false,
      },
      'availability.$': {
        type: String,
        allowedValues: ['One-time', 'Once a week', 'More than 3 times a week', 'Weekdays only',
          'Once a month', '1-3 times a week', 'Weekends only'],
      },
      totalHours: {
        type: Number,
        defaultValue: 0,
      },
      eventsParticipated: {
        type: Number,
        defaultValue: 0,
      },
      acceptTermsOfUse: 'boolean',
    }));
  }

  /**
   * Defines the volunteer profile associated with a User and the associated Meteor account.
   * @param email The email associated with this profile. Will be the username.
   * @param password The password for this user.
   * @param firstName The first name.
   * @param lastName The last name.
   * @param gender User's gender.
   * @param address User's address.
   * @param city User's city.
   * @param state User's state.
   * @param zip User's zip
   * @param phone User's phone number.
   * @param interests Set of interests.
   * @param skills Set of Skills.
   * @param environmentalPreference Set of preferences.
   * @param availability Set of availabilities.
   * @param acceptTermsOfUse Check if users accepted TOU.
   */
  define({ email, firstName, lastName, gender, description, address, city, state, zip, phone, password, interests, skills, environmentalPreference, availability, totalHours, eventsParticipated, acceptTermsOfUse }) {
    if (Meteor.isServer) {
      const username = email;
      const user = this.findOne({ email, firstName, lastName });
      if (!user) {
        const role = ROLE.VOLUNTEER;
        const profileID = this._collection.insert({ email, firstName, lastName,
          gender, description, address, city, state, zip, phone, interests, skills, environmentalPreference, availability, totalHours, eventsParticipated, acceptTermsOfUse, userID: this.getFakeUserId(), role });
        const userID = Users.define({ username, role, password });
        this._collection.update(profileID, { $set: { userID } });
        return profileID;
      }
      return user._id;
    }
    return undefined;
  }

  /**
   * Updates the VolunteerProfile. You cannot change the email or role.
   * @param docID the id of the VolunteerProfile
   * @param firstName new first name (optional).
   * @param lastName new last name (optional).
   * @param gender new gender (optional).
   * @param description new description (optional).
   * @param address new address (optional).
   * @param city new city (optional).
   * @param zip new zip (optional).
   * @param phone new phone (optional).
   * @param interests new interests (optional).
   * @param skills new skills (optional).
   * @param environmentalPreference new preferences (optional).
   * @param availability new availability (optional).
   * @param totalHours update hours (optional).
   * @param eventsParticipated update events participated (optional).
   */
  update(docID, { firstName, lastName, gender, description, address, city, state, zip, phone, interests, skills, environmentalPreference, availability, totalHours, eventsParticipated }) {
    this.assertDefined(docID);
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (gender) {
      updateData.gender = gender;
    }
    if (description) {
      updateData.description = description;
    }
    if (address) {
      updateData.address = address;
    }
    if (city) {
      updateData.city = city;
    }
    if (state) {
      updateData.zip = zip;
    }
    if (phone) {
      updateData.phone = phone;
    }
    if (interests) {
      updateData.interests = interests;
    }
    if (skills) {
      updateData.skills = skills;
    }
    if (environmentalPreference) {
      updateData.environmentalPreference = environmentalPreference;
    }
    if (availability) {
      updateData.availability = availability;
    }
    if (totalHours) {
      updateData.totalHours = totalHours;
    }
    if (eventsParticipated) {
      updateData.eventsParticipated = eventsParticipated;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  removeIt(profileID) {
    if (this.isDefined(profileID)) {
      return super.removeIt(profileID);
    }
    return null;
  }

  /**
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.VOLUNTEER]);
  }

  /**
   * Returns an array of strings, each one representing an integrity problem with this collection.
   * Returns an empty array if no problems were found.
   * Checks the profile common fields and the role..
   * @returns {Array} A (possibly empty) array of strings indicating integrity issues.
   */
  checkIntegrity() {
    const problems = [];
    this.find().forEach((doc) => {
      if (doc.role !== ROLE.VOLUNTEER) {
        problems.push(`VolunteerProfile instance does not have ROLE.VOLUNTEER: ${doc}`);
      }
    });
    return problems;
  }

  /**
   * Returns an object representing the VolunteerProfile docID in a format acceptable to define().
   * @param docID The docID of a VolunteerProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const gender = doc.gender;
    const description = doc.description;
    const address = doc.address;
    const city = doc.city;
    const state = doc.state;
    const zip = doc.zip;
    const phone = doc.phone;
    const interests = doc.interests;
    const skills = doc.skills;
    const environmentalPreference = doc.environmentalPreference;
    const availability = doc.availability;
    const totalHours = doc.totalHours;
    const eventsParticipated = doc.eventsParticipated;
    return { email, firstName, lastName, gender, description, address, city, state, zip, phone, interests, skills, environmentalPreference, availability, totalHours, eventsParticipated };
  }
}

/**
 * Profides the singleton instance of this class to all other entities.
 * @type {VolunteerProfileCollection}
 */
export const VolunteerProfiles = new VolunteerProfileCollection();
