import * as vscode from 'vscode';
import { ThemeStatus } from '../helpers/versioning';

/** Initialization of the icons every time the theme get activated */
export const showStartMessages = (themeStatus: Promise<ThemeStatus>) => {
    return themeStatus.then((status: ThemeStatus) => {
        if (status === ThemeStatus.updated) {
          console.log('UPDATED');
        }
        else if (status === ThemeStatus.neverUsedBefore) {
          vscode.window.showInformationMessage('Thanks for using City Lights');
        }
    });
};
