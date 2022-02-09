import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Organizations } from './OrgCollection';

export const signUpNewOrganizationMethod = new ValidatedMethod({
  name: 'Organizations.SignupNewOrganization',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ name, categories, location, mailing_address, website, logo, logo_mini, contact, owner, status }) {
    if (Meteor.isServer) {
      Organizations.define({ name, categories, location, mailing_address, website, logo, logo_mini, contact, owner, status });
    }
  },
});
