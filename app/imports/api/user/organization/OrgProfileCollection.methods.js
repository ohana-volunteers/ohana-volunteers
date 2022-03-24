import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Organizations } from './OrgProfileCollection';

export const isOrganizationDefinedMethod = new ValidatedMethod({
  name: 'Organizations.isDefined',
  mixins: [CallPromiseMixin],
  validate: null,
  run(id) {
    return Organizations.isDefined(id);
  },
});

export const findOneOrganizationMethod = new ValidatedMethod({
  name: 'Organizations.findOne',
  mixins: [CallPromiseMixin],
  validate: null,
  run(id) {
    return Organizations.findOne(id);
  },
});

export const signUpNewOrganizationMethod = new ValidatedMethod({
  name: 'Organizations.SignupNewOrganization',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ user, profile }) {
    return Organizations.define({ user, profile });
  },
});

export const removeOrganizationMethod = new ValidatedMethod({
  name: 'Organizations.RemoveIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(id) {
    Organizations.removeIt(id);
  },
});
