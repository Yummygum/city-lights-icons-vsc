'use strict';
import * as vscode from 'vscode';
import { toggleFolderArrows } from './folderArrows'

// Toggle the arrows near the folder icons
const hidesExplorerArrowsCommand = vscode.commands.registerCommand('city-lights-icons-vsc.hidesExplorerArrows', () => {
  toggleFolderArrows();
})

export const commands = [
  hidesExplorerArrowsCommand
]