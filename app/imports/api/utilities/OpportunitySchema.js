import SimpleSchema from 'simpl-schema';
import Buffer from 'buffer';
import { volunteerCategories } from './VolunteerCategories';

export const OpportunityEnvironment = ['Indoor', 'Outdoor', 'Both', 'No Preference'];
export const OpportunityAge = ['Adults', 'Family-Friendly', 'Teens', 'Seniors'];

export const OpportunitySchema = new SimpleSchema({
  date: Object,
  'date.start': {
    type: Date,
  },
  'date.end': {
    type: Date,
  },
  img: {
    type: Buffer,
    optional: true,
    defaultValue: '/images/va-logo/VA-logo-circle-v5.svg',
  },
  organization: {
    type: String,
  },
  address: String,
  coordinates: {
    type: Object,
    optional: true,
  },
  'coordinates.log': {
    type: Number,
    optional: true,
  },
  'coordinates.lat': {
    type: Number,
    optional: true,
  },
  event: String,
  categories: Array, // List of applicable categories
  'categories.$': {
    type: String,
    allowedValues: Object.keys(volunteerCategories),
  },
  environment: {
    type: String,
    allowedValues: OpportunityEnvironment,
  },
  age: {
    type: String,
    allowedValues: OpportunityAge,
  },
});
