import { Meteor } from 'meteor/meteor';
import { Organizations } from '../../api/organization/OrgCollection';
import { volunteerCategories } from '../../api/utilities/VolunteerCategories';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';
import { Hours } from '../../api/hours/HoursCollection';

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

// Initialize the database with a default data document.
function addOpp(data) {
  console.log(`  Adding: ${data.event} (${data.organization})`);
  Opportunities.define(data);
}

// Initialize the OpportunityCollection if empty.
if (Opportunities.count() === 0) {
  if (Meteor.settings.defaultOpportunities) {
    console.log('Creating default opportunities.');
    Meteor.settings.defaultOpportunities.map(data => addOpp(data));
  }
}

// Initialize the database with a default data document.
function addHours(data) {
  console.log(`  Adding: ${data.eventID} (${data.hours})`);
  // console.log(data);
  Hours.define(data);
}

if (Hours.count() === 0) {
  if (Meteor.settings.defaultHours) {
    console.log('Creating default opportunities.');
    Meteor.settings.defaultHours.map(data => addHours(data));
  }
}
