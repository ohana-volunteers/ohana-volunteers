import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
// be sure to import the methods.
import '../imports/api/base/BaseCollection.methods';

/**
Meteor.methods({
  assignRole() {
    const role = ROLE.USER;
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(Meteor.user(), [role]);
  },
});
 */