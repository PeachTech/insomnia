// @flow
import type { BaseModel } from './index';
import * as db from '../common/database';
import { UPDATE_CHANNEL_STABLE } from '../common/constants';

type BaseSettings = {
  showPasswords: boolean,
  useBulkHeaderEditor: boolean,
  followRedirects: boolean,
  editorFontSize: number,
  editorIndentSize: number,
  editorLineWrapping: boolean,
  editorKeyMap: string,
  editorIndentWithTabs: boolean,
  httpProxy: string,
  httpsProxy: string,
  noProxy: string,
  proxyEnabled: boolean,
  timeout: number,
  validateSSL: boolean,
  forceVerticalLayout: boolean,
  autoHideMenuBar: boolean,
  theme: string,
  maxRedirects: number,
  pluginPath: string,
  nunjucksPowerUserMode: boolean,
  peachApiUrl: string,
  peachApiToken: string,
  peachProject: string,
  peachProfile: string
  deviceId: string | null,
  updateChannel: string,
  updateAutomatically: boolean,
  disableUpdateNotification: boolean,
  environmentHighlightColorStyle: string,
  fontMonospace: string | null,
  fontInterface: string | null,
  fontSize: number,
  fontVariantLigatures: boolean,
};

export type Settings = BaseModel & BaseSettings;

export const name = 'Settings';
export const type = 'Settings';
export const prefix = 'set';
export const canDuplicate = false;

export function init (): BaseSettings {
  let pUrl = '';
  if (process.env.PEACH_API) {
    pUrl = process.env.PEACH_API;
  }
  let pApiToken = '';
  if (process.env.PEACH_API_TOKEN) {
    pApiToken = process.env.PEACH_API_TOKEN;
  }

  return {
    showPasswords: false,
    useBulkHeaderEditor: false,
    followRedirects: true,
    editorFontSize: 11,
    editorIndentSize: 2,
    editorLineWrapping: true,
    editorKeyMap: 'default',
    editorIndentWithTabs: true,
    httpProxy: '',
    httpsProxy: '',
    noProxy: '',
    maxRedirects: -1,
    proxyEnabled: false,
    timeout: 0,
    validateSSL: false,
    forceVerticalLayout: false,
    autoHideMenuBar: false,
    theme: 'default',
    pluginPath: '',
    nunjucksPowerUserMode: false,
    peachApiUrl: pUrl,
    peachApiToken: pApiToken,
    peachProject: 'Default',
    peachProfile: 'Quick'
    deviceId: null,
    updateChannel: UPDATE_CHANNEL_STABLE,
    updateAutomatically: true,
    disableUpdateNotification: false,
    environmentHighlightColorStyle: 'sidebar-indicator',
    fontMonospace: null,
    fontInterface: null,
    fontSize: 13,
    fontVariantLigatures: false,
  };
}

export function migrate(doc: Settings): Settings {
  return doc;
}

export async function all(patch: Object = {}): Promise<Array<Settings>> {
  const settings = await db.all(type);
  if (settings.length === 0) {
    return [await getOrCreate()];
  } else {
    return settings;
  }
}

export async function create(patch: Object = {}): Promise<Settings> {
  return db.docCreate(type, patch);
}

export async function update(settings: Settings, patch: Object): Promise<Settings> {
  return db.docUpdate(settings, patch);
}

export async function getOrCreate(patch: Object = {}): Promise<Settings> {
  const results = await db.all(type);
  if (results.length === 0) {
    return create(patch);
  } else {
    return results[0];
  }
}
