import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { AdvancedWorkspaceConfiguration } from '../models'

/** Get configuration of vs code */
export const getConfig = (section?: string) => {
  return vscode.workspace.getConfiguration(section) as AdvancedWorkspaceConfiguration;
}

/** Update configuration of vs code. */
export const setConfig = (section: string, value: any, global: boolean = false) => {
  return getConfig().update(section, value, global);
};

/** Get the config of the theme */
export const getThemeConfig = (section: string) => {
  return getConfig('city-lights-icons-vsc').inspect(section);
};

/** Update the config of the theme */
export const setThemeConfig = (section: string, value: any, global: boolean = false) => {
  return getConfig('city-lights-icons-vsc').update(section, value, global);
}

/** Return the path of the extension in the file system */
export const getExtensionPath = () => path.join(__dirname, '..', '..');

/** Get the configuration of the icons as JSON Object */
export const getCityLightsIconJSON = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const iconJSONPath = path.join(__dirname, '../../../icons/city-lights-icon-theme.json');
    fs.readFile(iconJSONPath, 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(JSON.parse(data))
    })
  })
}

/** Reload vs code window */
const reloadWindow = () => {
  return vscode.commands.executeCommand('workbench.action.reloadWindow');
};