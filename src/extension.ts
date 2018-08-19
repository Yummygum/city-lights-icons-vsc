'use strict';

import * as vscode from 'vscode';
import * as commands from './commands';
import { detectConfigChanges } from './helpers/changeDetection';

/**
 * This method is called when the extension is activated.
 * It initializes the core functionality of the extension.
 */
export function activate (context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage('Thanks for use City Lights Themes');

  // Adding commands to the editor
  context.subscriptions.push(...commands.commands)

  // Initially trigger the config change detection
  detectConfigChanges().catch(e => {
    console.error(e);
  });

  vscode.workspace.onDidChangeConfiguration(detectConfigChanges);
};

/** This method is called when the extension is deactivated */
export function deactivate () {};