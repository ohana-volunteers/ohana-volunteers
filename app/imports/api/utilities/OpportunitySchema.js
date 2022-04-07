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
    optional: true,
  },
  address: String,
  description: String,
  coordinates: {
    type: Object,
    optional: true,
  },
  'coordinates.log': {
    type: Number,
    min: -180,
    max: 180,
    optional: true,
  },
  'coordinates.lat': {
    type: Number,
    min: -90,
    max: 90,
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
