import React, {PureComponent} from 'react';
import Link from '../base/link';

class About extends PureComponent {
  render () {
    return (
      <div>
        <h2 className="no-margin-top">Thank you for using Peach Sidecar</h2>
        <p>
          Peach Sidecar is a fork of the <Link href="https://github.com/getinsomnia/insomnia">Insomnia REST client</Link> that has been extended to work with Peach API Security.
          It retains most of the features of Insomnia and the <Link href="https://support.insomnia.rest/">Insomnia Documentation</Link> still applies to Peach Sidecar.
        </p>
        <p>
          If you have any questions or experience any issues, please email
          {' '}
          support@peach.tech
          {' '}
        </p>
      </div>
    );
  }
}

About.propTypes = {};

export default About;
