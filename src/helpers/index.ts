import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { AdvancedWorkspaceConfiguration } from '../models'
import { showConfirmToReloadMessage } from '../messages/reload';

/** Get list of configuration entries of package.json */
export const getExtensionConfiguration = (): { [config: string]: any } => {
  return vscode.extensions.getExtension('Yummygum.city-lights-icon-vsc').packageJSON.contributes.configuration.properties;
};

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
export const promptToReload = () => {
  return showConfirmToReloadMessage().then(result => {
    if (result) reloadWindow();
  })
}

const reloadWindow = () => {
  return vscode.commands.executeCommand('workbench.action.reloadWindow');
};

/**
 * Is the theme already activated in the editor configuration?
 * @param{boolean} global false by default
 */
export const isThemeActivated = (global: boolean = false): boolean => {
  return global ? (getConfig().inspect('workbench.iconTheme').globalValue === 'city-lights-icon-vsc-light' || getConfig().inspect('workbench.iconTheme').globalValue === 'city-lights-icon-vsc')
      : (getConfig().inspect('workbench.iconTheme').workspaceValue === 'city-lights-icon-vsc-light' || getConfig().inspect('workbench.iconTheme').globalValue === 'city-lights-icon-vsc');
};