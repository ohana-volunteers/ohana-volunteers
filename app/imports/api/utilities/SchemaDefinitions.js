import SimpleSchema from 'simpl-schema';
import { getVolunteerCategoryNames } from './VolunteerCategories';

export const userSchema = new SimpleSchema({
  username: {
    type: String,
    optional: false,
  },
  password: {
    type: String,
    optional: false,
  },
});

export const orgPublicationStatus = ['hidden', 'public'];

export const organizationProfileSchema = new SimpleSchema({
  name: {
    type: String,
    optional: false,
  },
  categories: {
    type: Array,
    optional: false,
  },
  'categories.$': {
    type: String,
    allowedValues: getVolunteerCategoryNames(),
  },
  location: String,
  mailing_address: {
    type: String,
    optional: true,
  },
  website: {
    type: String,
    optional: true,
  },
  logo: {
    type: String,
    optional: true,
  },
  logo_mini: {
    type: String,
    optional: true,
  },
  contact: Object,
  'contact.name': {
    type: String,
    optional: true,
  },
  'contact.email': String,
  'contact.address': {
    type: String,
    optional: true,
  },
  'contact.phone': {
    type: String,
    optional: true,
  },
  status: {
    type: String,
    allowedValues: orgPublicationStatus,
    defaultValue: 'hidden',
  },
  owner: {
    type: String,
    optional: true,
  },
});