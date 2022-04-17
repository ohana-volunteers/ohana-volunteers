import React, { useState } from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import {
  AutoForm,
  ErrorsField, LongTextField,
  RadioField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import { VolunteerProfiles } from '../../api/user/volunteer/VolunteerProfileCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import ImageUploadField from '../components/form-fields/ImageUploadField';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const bridge = new SimpleSchema2Bridge(VolunteerProfiles._schema);

/** Renders the Page for editing a profile of a volunteer. */
const EditVolunteerProfile = ({ doc, ready, location }) => {

  const [redirectToReferer, setRedirectToReferer] = useState(false);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, description, gender, address, city, state, zip, phone, interests, skills, environmentalPreference, availability, profilePicture, bannerPicture, _id } = data;
    const collectionName = VolunteerProfiles.getCollectionName();
    const updateData = { id: _id, firstName, lastName, description, gender, address, city, state, zip, phone, interests, skills, environmentalPreference, availability, profilePicture, bannerPicture };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Profile updated successfully!', 'success'));
    setRedirectToReferer(true);
  };

  const { from } = location.state || { from: { pathname: '/my-profile' } };
  if (redirectToReferer) {
    return <Redirect to={from} />;
  }

  return (ready) ? (
    <Grid id={PAGE_IDS.EDIT_VOLUNTEER_PROFILE} textAlign="center" verticalAlign="middle" container centered columns={1}>
      <Grid.Column>
        <Header as="h2" textAlign="center">Edit Profile</Header>
        <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
          <Segment>
            <TextField id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_FIRST_NAME} label='First Name' name='firstName'/>
            <TextField id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_LAST_NAME} label='Last Name' name='lastName'/>
            <RadioField id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_GENDER} name='gender'/>
            <LongTextField id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_DESCRIPTION} label='Bio' name='description'/>
            <TextField id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_ADDRESS} label='Primary Address' name='address'/>
            <TextField id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_CITY} label='City' name='city'/>
            <TextField id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_STATE} label='State' name='state'/>
            <TextField id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_ZIP} label='Zip/Postal Code' name='zip'/>
            <TextField id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_PHONE} label='Phone Number' name='phone'/>
            <MultiSelectField id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_INTERESTS} name='interests'/>
            <MultiSelectField id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_SKILLS} name='skills'/>
            <RadioField id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_ENVIRONMENTAL_PREFERENCE} name='environmentalPreference'/>
            <MultiSelectField id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_AVAILABILITY} label='Availability' name='availability'/>
            <ImageUploadField name='profilePicture' label='Profile Picture' id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_PROFILE_PICTURE}/>
            <ImageUploadField name='bannerPicture' label='Banner Picture' id={COMPONENT_IDS.SIGN_UP_FORM_BANNER_PICTURE}/>
            <SubmitField id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT_SUBMIT} value='Submit' />
            <ErrorsField />
          </Segment>
        </AutoForm>
      </Grid.Column>
    </Grid>
  ) : <Loader active>Getting data</Loader>;
};

// Require the presence of a Volunteer Profile in the props object. Uniforms adds 'model' to the props, which we use.
EditVolunteerProfile.propTypes = {
  doc: PropTypes.object,
  location: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const user = Meteor.user() ? Meteor.user().username : '';
  const subscription = VolunteerProfiles.subscribe();
  const ready = subscription.ready();
  const doc = (ready) ? VolunteerProfiles.findDoc({ email: user }) : undefined;
  return {
    doc,
    ready,
  };
})(EditVolunteerProfile);
