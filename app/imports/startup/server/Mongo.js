import { Meteor } from 'meteor/meteor';
import { Organizations } from '../../api/organization/OrgCollection';
import { volunteerCategories } from '../../api/utilities/VolunteerCategories';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addOrg(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  // convert category key names to category strings
  const newData = data;
  newData.categories = data.categories.map((key) => volunteerCategories[key].name);
  Organizations.define(newData);
}

// Initialize the OrgCollection if empty.
if (Organizations.count() === 0) {
  if (Meteor.settings.defaultOrganizations) {
    console.log('Creating default organization profiles.');
    Meteor.settings.defaultOrganizations.map(data => addOrg(data));
  }
}
