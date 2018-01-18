import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import classnames from 'classnames';

@autobind
class TestTimer extends PureComponent {
  constructor (props) {
    super(props);
    this._interval = null;
    this.state = {
      elapsedTime: 0
    };
  }

  async _handleCancel (sessionid) {
    this.props.handleCancelTests(sessionid);
  }

  componentWillUnmount () {
    clearInterval(this._interval);
  }

  _handleUpdateElapsedTime () {
    const {loadStartTime} = this.props;
    const millis = Date.now() - loadStartTime - 200;
    const elapsedTime = Math.round(millis / 100) / 10;
    this.setState({elapsedTime});
  }

  componentDidUpdate () {
    const {loadStartTime} = this.props;

    if (loadStartTime <= 0) {
      clearInterval(this._interval);
      return;
    }

    clearInterval(this._interval); // Just to be sure
    this._interval = setInterval(this._handleUpdateElapsedTime, 100);
    this._handleUpdateElapsedTime();
  }

  render () {
    const {testInfo} = this.props;
    const reqGroup = testInfo.workspace === '' ? '' : <div>Request Group: {testInfo.workspace}</div>;
    return (
      <div className={classnames('overlay theme--overlay', {'overlay--hidden': false})}>
        <h2>Testing...</h2>
        {!testInfo ? <span>Unknown</span> : (
          <div>
            {reqGroup}
            <div>Test Case: {testInfo.test}</div>
          </div>
        )}
        <div className="pad">
          <i className="fa fa-refresh fa-spin"/>
        </div>
        <div className="pad">
          <button className="btn btn--clicky" onClick={() => this.props.handleCancelTests(testInfo.session)}>
            Cancel Test Run
          </button>
        </div>
      </div>
    );
  }
}

TestTimer.propTypes = {
  handleCancelTests: PropTypes.func.isRequired,
  loadStartTime: PropTypes.number.isRequired,
  testInfo: PropTypes.object
};

export default TestTimer;
