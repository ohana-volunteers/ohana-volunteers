import { Meteor } from 'meteor/meteor';
import { ROLE } from '../../api/role/Role';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';

/* eslint-disable no-console */

function createUser(data) {
  console.log(`  Creating user ${data.email} with role ${data.role}.`);
  if (data.role === ROLE.ADMIN) {
    AdminProfiles.define(data);
  } else if (data.role === ROLE.VOLUNTEER) { // if user signs up as a volunteer
    VolunteerProfiles.define(data);
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map((data) => createUser(data));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
