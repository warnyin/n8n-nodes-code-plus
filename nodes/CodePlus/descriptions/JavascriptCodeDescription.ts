import type { INodeProperties } from 'n8n-workflow';

export const javascriptCodeDescription: INodeProperties[] = [
	{
		displayName: 'Libraries',
		name: 'libraries',
		type: 'string',
		displayOptions: {
			show: {
				language: ['javaScript'],
			},
		},
		default: '',
		description:
			'Comma-separated packages or JSON array (e.g. nanoid@latest,lodash or ["nanoid"])',
		placeholder: 'nanoid@latest,lodash',
	},
	{
		displayName: 'Init Code',
		name: 'initCode',
		type: 'string',
		typeOptions: {
			editor: 'codeNodeEditor',
			editorLanguage: 'javaScript',
		},
		displayOptions: {
			show: {
				language: ['javaScript'],
			},
		},
		default: '',
		description: 'JavaScript to run once before main code (optional). Variables declared here are accessible in main code.',
		noDataExpression: true,
	},
	{
		displayName: 'JavaScript',
		name: 'jsCode',
		type: 'string',
		typeOptions: {
			editor: 'codeNodeEditor',
			editorLanguage: 'javaScript',
		},
		displayOptions: {
			show: {
				language: ['javaScript'],
				runMode: ['runOnceForAllItems'],
			},
		},
		default: `// Loop over input items and add a new field called 'myNewField' to the JSON of each one
for (const item of items) {
  item.myNewField = 1;
}

return items;`,
		description:
			'Write JavaScript code to add, remove, change properties of items, or return altogether new items. <a href="https://docs.n8n.io/code/builtin/" target="_blank">Learn more</a>.',
		noDataExpression: true,
	},
	{
		displayName: 'JavaScript',
		name: 'jsCode',
		type: 'string',
		typeOptions: {
			editor: 'codeNodeEditor',
			editorLanguage: 'javaScript',
		},
		displayOptions: {
			show: {
				language: ['javaScript'],
				runMode: ['runOnceForEachItem'],
			},
		},
		default: `// Add a new field called 'myNewField' to the JSON of the item
item.myNewField = 1;

return item;`,
		description:
			'Write JavaScript code to add, remove, change properties of items, or return altogether new items. <a href="https://docs.n8n.io/code/builtin/" target="_blank">Learn more</a>.',
		noDataExpression: true,
	},
	{
		displayName: 'JavaScript',
		name: 'jsCode',
		type: 'string',
		typeOptions: {
			editor: 'codeNodeEditor',
			editorLanguage: 'javaScript',
		},
		displayOptions: {
			show: {
				language: ['javaScript'],
				runMode: ['n8nCode'],
			},
		},
		default: `// Loop over input items and add a new field called 'myNewField' to the JSON of each one
for (const item of items) {
  item.json.myNewField = 1;
}

return items;`,
		description:
			'Write JavaScript code to add, remove, change properties of items, or return altogether new items. <a href="https://docs.n8n.io/code/builtin/" target="_blank">Learn more</a>.',
		noDataExpression: true,
	},
];
