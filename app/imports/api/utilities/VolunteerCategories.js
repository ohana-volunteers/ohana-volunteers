export const volunteerCategories = {
  animal: { name: 'Animal Welfare/Rescue', icon: 'paw' },
  family: { name: 'Child/Family Support', icon: 'child' },
  covid: { name: 'COVID-19 Recovery', icon: 'certificate' },
  disaster: { name: 'Crisis/Disaster Relief', icon: 'bell' },
  education: { name: 'Education', icon: 'apple' },
  environment: { name: 'Environment', icon: 'leaf' },
  seniors: { name: 'Elderly/Senior Care', icon: 'users' },
  food: { name: 'Food Insecurity', icon: 'food' },
  housing: { name: 'Housing', icon: 'home' },
  poverty: { name: 'Homelessness/Poverty', icon: 'bed' },
  special_needs: { name: 'Special Needs', icon: 'wheelchair' },
};

export const getVolunteerCategoryNames = () => Object.getOwnPropertyNames(volunteerCategories).map(key => volunteerCategories[key].name);
