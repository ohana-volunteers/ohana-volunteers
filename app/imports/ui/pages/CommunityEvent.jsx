import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { PAGE_IDS } from '../utilities/PageIDs';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

/** A simple static component to render some text for the landing page. */
class CommunityEvent extends React.Component {

  state = {
    events: [
      {
        start: moment().toDate(),
        end: moment()
          .add(2, 'days')
          .toDate(),
        title: 'Hawaii Foodbank',
      },
      {
        start: moment().toDate(),
        end: moment()
          .add(1, 'hour')
          .toDate(),
        title: 'a-Organization#1',
      },
    ],
  };

  render() {
    return (
      <div id={PAGE_IDS.COMMNUITY_EVENT} className="ohana-event-background">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: '1000px' }}
        />
      </div>
    );
  }
}

export default CommunityEvent;
