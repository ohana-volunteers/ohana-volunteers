import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { VolunteerProfiles } from './VolunteerProfileCollection';

export const signUpNewVolunteerMethod = new ValidatedMethod({
  name: 'VolunteerProfiles.SignupNewVolunteer',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ email, firstName, lastName, gender, address, city, state, zip, phone, password, interests, skills, environmentalPreference, availability, acceptTermsOfUse }) {
    if (Meteor.isServer) {
      VolunteerProfiles.define({ email, firstName, lastName, gender, address, city, state, zip, phone, password, interests, skills, environmentalPreference, availability, acceptTermsOfUse });
    }
  },
});
