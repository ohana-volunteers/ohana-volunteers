import { Meteor } from 'meteor/meteor';
import { ROLE } from '../../api/role/Role';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';

/* eslint-disable no-console */

function createUser(email, role, firstName, lastName, gender, address, city, state, zip, phone, password, interests, skills, environmentalPreference, availability, acceptTermsOfUse) {
  console.log(`  Creating user ${email} with role ${role}.`);
  if (role === ROLE.ADMIN) {
    AdminProfiles.define({ email, firstName, lastName, password });
  } else if (role === ROLE.VOLUNTEER) { // if user signs up as a volunteer
    VolunteerProfiles.define({ email, firstName, lastName, gender, address, city, state, zip, phone, password, interests, skills, environmentalPreference, availability, acceptTermsOfUse });
  } else { // else sign up as standard user (might remove?)
    UserProfiles.define({ email, firstName, lastName, password });
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, role, firstName, lastName, gender, address, city, state, zip, phone, password, interests, skills,
      environmentalPreference, availability, acceptTermsOfUse }) => createUser(email, role, firstName, lastName, gender, address, city, state, zip, phone, password, interests, skills, environmentalPreference, availability, acceptTermsOfUse));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
