import { Meteor } from 'meteor/meteor';
import { ROLE } from '../../api/role/Role';
import { AdminProfiles } from '../../api/user/admin/AdminProfileCollection';
import { VolunteerProfiles } from '../../api/user/volunteer/VolunteerProfileCollection';
import { Organizations } from '../../api/user/organization/OrgProfileCollection';
import { volunteerCategories } from '../../api/utilities/VolunteerCategories';

/* eslint-disable no-console */

function createUser(data) {
  console.log(`  Creating user ${data.email} with role ${data.role}.`);
  if (data.role === ROLE.ADMIN) {
    AdminProfiles.define(data);
  } else if (data.role === ROLE.VOLUNTEER) { // if user signs up as a volunteer
    VolunteerProfiles.define(data);
  } else if (data.role === ROLE.ORGANIZATION) { // if user account belongs to organization
    const newData = data;
    newData.categories = data.categories.map((key) => volunteerCategories[key].name);
    Organizations.define(data);
  }
  Meteor.users.insert(data);
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
