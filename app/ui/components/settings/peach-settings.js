import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import HelpTooltip from '../help-tooltip';

@autobind
class PeachSettings extends PureComponent {
  _handleUpdateSetting (e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    if (e.target.type === 'number') {
      value = parseInt(value, 10);
    }

    this.props.updateSetting(e.target.name, value);
  }

  _handleToggleMenuBar (e) {
    this._handleUpdateSetting(e);
    this.props.handleToggleMenuBar(e.target.checked);
  }

  render () {
    const {settings} = this.props;
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
                   defaultValue=''
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
