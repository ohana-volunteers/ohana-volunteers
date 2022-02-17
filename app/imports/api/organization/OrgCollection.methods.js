import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Organizations } from './OrgCollection';
import { ROLE } from '../role/Role';
import { Users } from '../user/UserCollection';

export const signUpNewOrganizationMethod = new ValidatedMethod({
  name: 'Organizations.SignupNewOrganization',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ userInfo, orgInfo }) {
    if (Meteor.isServer) {
      const newUserInfo = userInfo;
      newUserInfo.role = ROLE.ORGANIZATION;
      const user = Meteor.users.findOne({ username: userInfo.username });
      if (!user) Users.define(newUserInfo);

      const newOrgInfo = orgInfo;
      newOrgInfo.owner = userInfo.username;
      return Organizations.define(newOrgInfo);
    }
    return undefined;
  },
});
