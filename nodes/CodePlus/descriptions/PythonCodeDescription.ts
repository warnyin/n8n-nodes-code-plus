import type { INodeProperties } from 'n8n-workflow';

export const pythonCodeDescription: INodeProperties[] = [
	{
		displayName: 'Libraries',
		name: 'libraries',
		type: 'string',
		displayOptions: {
			show: {
				language: ['python', 'pythonNative'],
			},
		},
		default: '',
		description:
			'Comma-separated packages or JSON array (e.g. requests,pandas or ["requests"])',
		placeholder: 'requests,pandas',
	},
	{
		displayName: 'Init Code',
		name: 'initCode',
		type: 'string',
		typeOptions: {
			editor: 'codeNodeEditor',
			editorLanguage: 'python',
			rows: 10,
		},
		displayOptions: {
			show: {
				language: ['python', 'pythonNative'],
			},
		},
		default: '',
		description: 'Python to run once before main code (optional)',
		noDataExpression: true,
	},
	{
		displayName: 'Python',
		name: 'pythonCode',
		type: 'string',
		typeOptions: {
			editor: 'codeNodeEditor',
			editorLanguage: 'python',
		},
		displayOptions: {
			show: {
				language: ['python', 'pythonNative'],
				runMode: ['runOnceForAllItems'],
			},
		},
		default: `# Loop over input items and add a new field called 'myNewField' to the JSON of each one
for item in _input.all():
    item.json['myNewField'] = 1

return _input.all()`,
		description:
			'Write Python code to add, remove, change properties of items, or return altogether new items. <a href="https://docs.n8n.io/code/builtin/" target="_blank">Learn more</a>.',
		noDataExpression: true,
	},
	{
		displayName: 'Python',
		name: 'pythonCode',
		type: 'string',
		typeOptions: {
			editor: 'codeNodeEditor',
			editorLanguage: 'python',
		},
		displayOptions: {
			show: {
				language: ['python', 'pythonNative'],
				runMode: ['runOnceForEachItem'],
			},
		},
		default: `# Add a new field called 'myNewField' to the JSON of the item
_input.item.json['myNewField'] = 1

return _input.item`,
		description:
			'Write Python code to add, remove, change properties of items, or return altogether new items. <a href="https://docs.n8n.io/code/builtin/" target="_blank">Learn more</a>.',
		noDataExpression: true,
	},
	{
		displayName: 'Python',
		name: 'pythonCode',
		type: 'string',
		typeOptions: {
			editor: 'codeNodeEditor',
			editorLanguage: 'python',
		},
		displayOptions: {
			show: {
				language: ['python', 'pythonNative'],
				runMode: ['n8nCode'],
			},
		},
		default: `# Loop over input items and add a new field called 'myNewField' to the JSON of each one
for item in items:
    item.json['myNewField'] = 1

return items`,
		description:
			'Write Python code to add, remove, change properties of items, or return altogether new items. <a href="https://docs.n8n.io/code/builtin/" target="_blank">Learn more</a>.',
		noDataExpression: true,
	},
];
