import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import HelpTooltip from '../help-tooltip';
import {isMac} from '../../../common/constants';

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
                   name="PeachAPI"
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
                   name="PeachApiToken"
                   defaultValue=''
                   onChange={this._handleUpdateSetting}/>
          </label>
        </div>
        <hr className="pad-top"/>
        <br/>
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
