import * as vscode from 'vscode';

/** User has to confirm it he wants to reload the editor */
export const showConfirmToReloadMessage = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    vscode.window.showInformationMessage(
      'You have to restart VS Code to activate the changes to the icons.',
      'Restart').then(value => {
        switch (value) {
          case 'Restart':
            resolve(true);
          break;
          default:
            resolve(false);
        }
      });
  });
};
