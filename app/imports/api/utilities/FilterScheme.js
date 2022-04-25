import SimpleSchema from 'simpl-schema';
import { OpportunityEnvironment, OpportunityAge } from '../opportunities/OpportunityCollection';
import { volunteerCategories } from './VolunteerCategories';

export const searchForm = new SimpleSchema({
  categories: {
    label: 'Categories',
    type: Array,
    optional: true,
  },
  'categories.$': {
    type: String,
    allowedValues: Object.keys(volunteerCategories),
  },
  orderBy: {
    type: String,
    allowedValues: ['Latest', 'A-Z'],
    defaultValue: 'A-Z',
  },
  time: {
    label: 'Start From',
    type: Date,
    defaultValue: new Date(),
  },
  age: {
    label: 'Age Group',
    type: Array,
    optional: true,
  },
  'age.$': {
    type: String,
    allowedValues: OpportunityAge,
  },
  environmentalPreference: {
    label: 'Environment',
    type: String,
    allowedValues: OpportunityEnvironment,
    uniforms: { checkboxes: true },
    optional: true,
  },
});
