// @flow
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import HelpTooltip from '../help-tooltip';
import PeachApiSec from 'peachapisec';

type State = {
  error: string,
  isValid: boolean,
  hasRunTest: boolean,
  hasChanged: boolean
};

@autobind
class PeachSettings extends PureComponent<void, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      error: '',
      isValid: false,
      hasRunTest: false,
      hasChanged: false
    };
  }
  _handleUpdateSetting (e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    if (e.target.type === 'number') {
      value = parseInt(value, 10);
    }

    this.props.updateSetting(e.target.name, value);
    this.setState({hasChanged: true});
  }
  _handleToggleMenuBar (e) {
    this._handleUpdateSetting(e);
    this.props.handleToggleMenuBar(e.target.checked);
  }
  async _testPeachConnection (url: string, token: string) {
    let isGood = false;
    let err = 'OK';
    let api = new PeachApiSec(url, token);
    try {
      let projects = await api.GetProjects();
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
    this.setState({isValid: isGood, error: err, hasRunTest: true, hasChanged: false});
    return isGood;
  }

  render () {
    const {settings} = this.props;
    const {error, isValid, hasRunTest, hasChanged} = this.state;
    return (
      <div>
          <h2>
          Peach API Settings
          <HelpTooltip className="space-left txt-md" style={{maxWidth: '20rem', lineWrap: 'word'}}>
            Peach API Settings
          </HelpTooltip>
        </h2>
        <div className="form-control form-control--outlined">
          <label>Peach API URL
            <HelpTooltip className="space-left">
              (URL for Peach API instance)
            </HelpTooltip>
            <input type="text"
                   name="peachApiUrl"
                   defaultValue={settings.peachApiUrl}
                   onChange={this._handleUpdateSetting}/>
          </label>
        </div>

        <div className="form-control form-control--outlined">
          <label>Peach API Token
            <HelpTooltip className="space-left">
              Peach API Token
            </HelpTooltip>
            <input type="text"
                   name="peachApiToken"
                   defaultValue={settings.peachApiToken}
                   onChange={this._handleUpdateSetting}/>
          </label>
        </div>
        <div className="form-control form-control--outlined">
          <label>Test Connection to Peach API
            <HelpTooltip className="space-left">
              Test your connection using the supplied URL and API token
            </HelpTooltip>
          </label>
          <button className="btn btn--clicky"
                onClick={() => this._testPeachConnection(settings.peachApiUrl, settings.peachApiToken)} >
                Test
              </button>
          <br/>
          {hasRunTest && !hasChanged && (
          <label >{isValid ? 'OK' : error}</label>)}
        </div>
        <hr className="pad-top"/>
        <br/>
        <div className="form-control form-control--outlined">
          <label>Project name
            <HelpTooltip className="space-left">
              Peach Project to run tests
            </HelpTooltip>
            <input type="text"
                   name="peachProject"
                   defaultValue={settings.peachProject}
                   onChange={this._handleUpdateSetting}/>
          </label>
        </div>
        <div className="form-control form-control--outlined">
          <label>Project Profile
            <HelpTooltip className="space-left">
              Profile to use for running tests
            </HelpTooltip>
            <select defaultValue={settings.peachProfile}
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

PeachSettings.propTypes = {
  settings: PropTypes.object.isRequired,
  updateSetting: PropTypes.func.isRequired,
  handleToggleMenuBar: PropTypes.func.isRequired
};

export default PeachSettings;
