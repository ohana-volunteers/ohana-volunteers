import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Organizations } from './OrgProfileCollection';

export const signUpNewOrganizationMethod = new ValidatedMethod({
  name: 'Organizations.SignupNewOrganization',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ user, profile }) {
    if (Meteor.isServer) return Organizations.define({ user, profile });
    return undefined;
  },
});
