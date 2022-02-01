import { Meteor } from 'meteor/meteor';
import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
// be sure to import the methods.
import '../imports/api/base/BaseCollection.methods';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../imports/api/role/Role';

Meteor.methods({
  assignRole() {
    const role = ROLE.USER;
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(Meteor.user(), [role]);
  },
});