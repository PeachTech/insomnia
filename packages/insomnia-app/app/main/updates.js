// @flow
import electron from 'electron';

const { autoUpdater, BrowserWindow } = electron;

function _sendUpdateComplete(success: boolean, msg: string) {
  const windows = BrowserWindow.getAllWindows();
  for (const w of windows) {
    w.send('updater.check.complete', success, msg);
  }
}

export async function init() {
  autoUpdater.on('error', e => {
    console.warn(`[updater] Error: ${e.message}`);
  });

  autoUpdater.on('update-not-available', () => {
    console.log('[updater] Not Available');
    _sendUpdateComplete(false, 'Up to Date');
  });
}
