import { Meteor } from 'meteor/meteor';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';
import { Hours } from '../../api/hours/HoursCollection';

/* eslint-disable no-console */

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
