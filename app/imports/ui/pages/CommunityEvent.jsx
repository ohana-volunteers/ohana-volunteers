import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { PAGE_IDS } from '../utilities/PageIDs';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const bodyStyle = { backgroundColor: 'rgba(0, 255, 255, .1)', marginBottom: '-22px', marginTop: '-25px' };

const dfdate = '2015-03-01';

const App = () => {
  const [open, setOpen] = useState(false);
  const show = () => setOpen(true);
  const close = () => setOpen(false);
  const [eventToModal, setEventToModal] = useState({});
};

const handleModal = event => {
  show();
  setEventToModal(event);
  console.log(eventToModal);
};

const eventStyleGetter = (event, start, end, isSelected) => {
  const backgroundColor = event.bgColor;
  const style = {
    backgroundColor,
  };
  return {
    style,
  };
};

// /** A simple static component to render some text for the landing page. */
class CommunityEvent extends React.Component {

  state = {
    events: [
      {
        start: '2022-04-16 09:00:00',
        end: '2022-04-16 12:00:00',
        title: 'Hawaii Foodbank',
      },
      {
        start: '2022-04-20T10:30:00',
        end: '2022-04-20T12:30:00',
        title: 'a-Organization#1',
      },
      {
        start: '2022-04-24T10:30:00',
        end: '2022-04-24T12:30:00',
        title: 'a-Organization#2',
      },
      {
        start: '2022-04-28T10:30:00',
        end: '2022-04-28T12:30:00',
        title: 'a-Organization#3',
      },
    ],
  };

  render() {
    return (
      <div id={PAGE_IDS.COMMUNITY_EVENT} className="ohana-event-background" style={bodyStyle}>
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
