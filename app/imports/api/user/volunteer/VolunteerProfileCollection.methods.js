import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { VolunteerProfiles } from './VolunteerProfileCollection';

export const signUpNewVolunteerMethod = new ValidatedMethod({
  name: 'VolunteerProfiles.SignupNewVolunteer',
  mixins: [CallPromiseMixin],
  validate: null,
  run(data) {
    if (Meteor.isServer) {
      VolunteerProfiles.define(data);
    }
  },
});

export const removeVolunteerMethod = new ValidatedMethod({
  name: 'VolunteerProfiles.RemoveIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(profileID) {
    if (Meteor.isServer) {
      VolunteerProfiles.removeIt(profileID);
    }
  },
});
