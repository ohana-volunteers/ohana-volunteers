import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  return (
    <footer>
      <div style={divStyle} className="ui center aligned container">
        <hr/>
        ©2021-2022 VolunteerAlly and
        <a href='https://github.com/ohana-volunteers'> Ohana Volunteers. </a>
        All rights reserved.
        Privacy Policy.
        Terms & Conditions.
      </div>
    </footer>
  );
};

export default Footer;
