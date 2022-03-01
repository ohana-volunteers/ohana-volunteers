import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../api/role/Role';
import { AdminProfiles } from '../../api/user/admin/AdminProfileCollection';
import { VolunteerProfiles } from '../../api/user/volunteer/VolunteerProfileCollection';

/* eslint-disable no-console */

function createUser(data) {
  console.log(`  Creating user ${data.email} with role ${data.role}.`);
  const user = Accounts.findUserByUsername(data.email);
  console.log(user);
  let userID;
  if (!user) {
    userID = Accounts.createUser({
      username: data.email,
      email: data.email,
      password: data.password,
    });
  }
  if (data.role === ROLE.ADMIN) {
    AdminProfiles.define(data);
    Roles.createRole(data.role, { unlessExists: true });
    Roles.addUsersToRoles(userID, ROLE.ADMIN);
  } else if (data.role === ROLE.VOLUNTEER) { // if user signs up as a volunteer
    VolunteerProfiles.define(data);
    Roles.createRole(data.role, { unlessExists: true });
    Roles.addUsersToRoles(userID, ROLE.VOLUNTEER);
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
