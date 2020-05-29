// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	var removeDup = vscode.commands.registerCommand('remove-duplicated-lines.removeDup', function () {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		var selection = editor.selection;
		var text = editor.document.getText(selection);
		var lines = text.split('\n')

		var log_lines = [];
		var unique_lines = [];
		lines.forEach(function (line) {
			var index = unique_lines.indexOf(line)
			if (log_lines.indexOf(line) < 0) {
				log_lines.push(line);
				unique_lines.push(line);
			}
			else if (index >= 0) {
				unique_lines.splice(index, 1)
			}
		}, this);

		editor.edit(function (editBuilder) {
			editBuilder.replace(selection, unique_lines.join('\n'));
		});
	});

	context.subscriptions.push(removeDup);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
