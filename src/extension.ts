// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.generatePrettierConfig', async () => {
		const config = vscode.workspace.getConfiguration();

		const prettierConfig = {
			tabWidth: config.get<number>('prettier.tabWidth') ?? 2,
			useTabs: config.get<boolean>('prettier.useTabs') ?? true,
			singleQuote: config.get<boolean>('prettier.singleQuote') ?? false,
			semi: config.get<boolean>('prettier.semi') ?? true,
			trailingComma: config.get<string>('prettier.trailingComma') ?? 'none',
			arrowParens: config.get<string>('prettier.arrowParens') ?? 'always',
			printWidth: config.get<number>('prettier.printWidth') ?? 80,
			bracketSpacing: config.get<boolean>('prettier.bracketSpacing') ?? true,
		};

		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
			vscode.window.showErrorMessage('No workspace folder is open.');
			return;
		}

		const filePath = path.join(workspaceFolders[0].uri.fsPath, '.prettierrc');
		fs.writeFileSync(filePath, JSON.stringify(prettierConfig, null, 2));

		vscode.window.showInformationMessage('.prettierrc generated successfully!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
