import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { AdminProfiles } from '../../api/user/admin/AdminProfileCollection';
import UploadFixture from '../components/UploadFixture';
import DumpDbFixture from '../components/DumpDbFixture';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Organizations } from '../../api/user/organization/OrgProfileCollection';

const ManageDatabase = ({ ready }) => ((ready) ? (<Container id={PAGE_IDS.MANAGE_DATABASE}>
  <Header as="h2" textAlign="center">Manage Database</Header>
  <UploadFixture />
  <DumpDbFixture />
</Container>) : <Loader active>Getting data</Loader>);

ManageDatabase.propTypes = {
  ready: PropTypes.bool,
};

export default withTracker(() => {
  const ready = AdminProfiles.subscribe().ready() && Organizations.subscribeOrgsAdmin().ready();
  return {
    ready,
  };
})(ManageDatabase);
