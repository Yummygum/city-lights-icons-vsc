'use strict';

import * as vscode from 'vscode';
import * as helpers from '../helpers';

/** Command to toggle the folder icons */
export const toggleFolderArrows = () => {
  return checkArrowStatus()
    .then(showQuickPickItems)
    .then(handleQuickPickActions)
    .catch(err => console.log(err));
}

/** Show QuickPics items to select prefered configuration for the folder icons */
const showQuickPickItems = (status: boolean) => {
  const on: vscode.QuickPickItem = {
    description: 'ON',
    detail: 'Show folder arrows',
    label: !status ? '\u2714' : '\u25FB'
  }
  const off: vscode.QuickPickItem = {
    description: 'OFF',
    detail: 'Hide folder arrows',
    label: status ? '\u2714' : '\u25FB'
  };
  return vscode.window.showQuickPick(
    [on, off], {
      placeHolder: 'Toggle folder arrows',
      ignoreFocusOut: false,
      matchOnDescription: true
    });
}

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: vscode.QuickPickItem) => {
  console.log(value);
  if (!value || !value.description) return;
  switch (value.description) {
    case 'ON': {
      helpers.setThemeConfig('hidesExplorerArrows', false, true);
      break;
    }
    case 'OFF': {
      helpers.setThemeConfig('hidesExplorerArrows', true, true);
      break;
    }
    default:
      break;
  }
};

/** Are the arrows enabled? */
export const checkArrowStatus = (): Promise<boolean> => {
  return helpers.getCityLightsIconJSON().then((config) => config.hidesExplorerArrows);
};