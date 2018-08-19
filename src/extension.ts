'use strict';

import * as vscode from 'vscode';
import * as commands from './commands';
import { detectConfigChanges } from './helpers/changeDetection';
import { checkThemeStatus } from './helpers/versioning';
import { showStartMessages } from './messages/start';

/**
 * This method is called when the extension is activated.
 * It initializes the core functionality of the extension.
 */
export function activate (context: vscode.ExtensionContext) {
  showStartMessages(checkThemeStatus(context.globalState));

  // Adding commands to the editor
  context.subscriptions.push(...commands.commands);

  // Initially trigger the config change detection
  detectConfigChanges().catch(e => {
    console.error(e);
  });

  vscode.workspace.onDidChangeConfiguration(detectConfigChanges);
}

/** This method is called when the extension is deactivated */
export function deactivate () {}
