import electron from 'electron';
import {CHECK_FOR_UPDATES_INTERVAL, isDevelopment} from '../common/constants';

const {autoUpdater, BrowserWindow} = electron;

let hasPromptedForUpdates = false;

export function init () {
  if (isDevelopment()) {
    // Check for updates immediately
    _checkForUpdates();

    // Check for updates on an interval
    setInterval(_checkForUpdates, CHECK_FOR_UPDATES_INTERVAL);
  }

  autoUpdater.on('error', e => {
    console.log(`[updater] Error: ${e.message}`);
  });

  autoUpdater.on('update-not-available', () => {
    console.log('[updater] Not Available --');
  });

  autoUpdater.on('update-available', () => {
    console.log('[updater] Update Available --');
  });

  autoUpdater.on('update-downloaded', (e, releaseNotes, releaseName, releaseDate, updateUrl) => {
    console.log(`[updater] Downloaded ${releaseName} --`);
    _showUpdateNotification();
  });
}

function _showUpdateNotification () {
  if (hasPromptedForUpdates) {
    return;
  }

  const windows = BrowserWindow.getAllWindows();
  if (windows.length && windows[0].webContents) {
    windows[0].webContents.send('update-available');
  }

  hasPromptedForUpdates = true;
}

function _checkForUpdates () {
}
