import React from 'react';
import { Grid, Header, Divider } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** A simple static component to render some text for the landing page. */
const OrganizationProfile = () => (
  <Grid id={PAGE_IDS.ORGANIZATION_PROFILE} textAlign='center' container>

    <Grid.Row>
      <Header as='h1'>Organization Profile.</Header>
      <Header as='h2'>We connect passionate volunteers with charitable organizations in order to build community. Let us help you easily find service opportunities for organizations in your area of interest.</Header>
    </Grid.Row>

    <Divider/>

  </Grid>
);

export default OrganizationProfile;
