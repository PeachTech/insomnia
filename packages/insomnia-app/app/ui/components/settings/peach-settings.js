// @flow
import React, { PureComponent } from 'react';
import autobind from 'autobind-decorator';
import HelpTooltip from '../help-tooltip';
import PeachApiSec from 'peachapisec';
import type { Settings } from '../../../models/settings';

type State = {
  error: string,
  isValid: boolean,
  hasRunTest: boolean,
  hasChanged: boolean,
};

type Props = {
  settings: Settings,
  updateSetting: Function,
  handleToggleMenuBar: Function,
};

@autobind
class PeachSettings extends React.PureComponent<void, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: '',
      isValid: false,
      hasRunTest: false,
      hasChanged: false,
    };
  }
  _handleUpdatePeachUrl(e: Event) {
    let value = (e.target: any).value;
    // strip trailing slash if present
    value = value.replace(/\/$/, '');
    this.props.updateSetting((e.target: any).name, value);
    this.setState({ hasChanged: true });
  }
  _handleUpdateSetting(e: Event) {
    let value = e.target.type === 'checkbox' ? (e.target: any).checked : (e.target: any).value;

    if (e.target.type === 'number') {
      value = parseInt(value, 10);
    }

    this.props.updateSetting((e.target: any).name, value);
    this.setState({ hasChanged: true });
  }
  _handleToggleMenuBar(e: Event) {
    this._handleUpdateSetting(e);
    this.props.handleToggleMenuBar((e.target: any).checked);
  }
  async _testPeachConnection(url: string, token: string) {
    let isGood: boolean = false;
    let err = 'OK';
    try {
      let api = new PeachApiSec(url, token);
      let projects = await api.GetJobs();
      if (projects) {
        isGood = true;
      }
    } catch (ex) {
      if (ex.name === 'StatusCodeError') {
        err = JSON.parse(ex.error).Message;
      } else {
        err = ex.message;
      }
      isGood = false;
    }
    this.setState({ isValid: isGood, error: err, hasRunTest: true, hasChanged: false });
  }

  render() {
    const { settings } = this.props;
    const { error, isValid, hasRunTest, hasChanged } = this.state;
    return (
      <div>
        <h2>
          Peach API Settings
          <HelpTooltip
            className="space-left txt-md"
            style={{ maxWidth: '20rem', lineWrap: 'word' }}>
            Peach API Settings
          </HelpTooltip>
        </h2>
        <div className="form-control form-control--outlined">
          <label>
            Peach API URL
            <HelpTooltip className="space-left">(URL for Peach API instance)</HelpTooltip>
            <input
              type="text"
              name="peachApiUrl"
              defaultValue={settings.peachApiUrl}
              onChange={this._handleUpdatePeachUrl}
            />
          </label>
        </div>

        <div className="form-control form-control--outlined">
          <label>
            Peach API Token
            <HelpTooltip className="space-left">Peach API Token</HelpTooltip>
            <input
              type="text"
              name="peachApiToken"
              defaultValue={settings.peachApiToken}
              onChange={this._handleUpdateSetting}
            />
          </label>
        </div>
        <div className="form-control form-control--outlined">
          <label>
            Test Connection to Peach API
            <HelpTooltip className="space-left">
              Test your connection using the supplied URL and API token
            </HelpTooltip>
          </label>
          <button
            className="btn btn--clicky"
            onClick={() => this._testPeachConnection(settings.peachApiUrl, settings.peachApiToken)}>
            Test
          </button>
          <br />
          {hasRunTest && !hasChanged && <label>{isValid ? 'OK' : error}</label>}
        </div>
        <hr className="pad-top" />
        <br />
        <div className="form-control form-control--outlined">
          <label>
            Project name
            <HelpTooltip className="space-left">Peach Project to run tests</HelpTooltip>
            <input
              type="text"
              name="peachProject"
              defaultValue={settings.peachProject}
              onChange={this._handleUpdateSetting}
            />
          </label>
        </div>
        <div className="form-control form-control--outlined">
          <label>
            Project Profile
            <HelpTooltip className="space-left">Profile to use for running tests</HelpTooltip>
            <select
              defaultValue={settings.peachProfile}
              name="peachProfile"
              onChange={this._handleUpdateSetting}>
              <option value="Quick">Quick</option>
              <option value="Nightly">Nightly</option>
              <option value="Weekly">Weekly</option>
              <option value="Full">Full</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

export default PeachSettings;
