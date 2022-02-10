import { Meteor } from 'meteor/meteor';
import { Organizations } from '../../api/organization/OrgCollection';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addOrg(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Organizations.define(data);
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
