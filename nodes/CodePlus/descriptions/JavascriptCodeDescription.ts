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
			rows: 10,
		},
		displayOptions: {
			show: {
				language: ['javaScript'],
			},
		},
		default: '',
		description: 'JavaScript to run once before main code (optional)',
		noDataExpression: true,
	},
	{
		displayName: 'JavaScript',
		name: 'jsCode',
		type: 'string',
		typeOptions: {
			editor: 'codeNodeEditor',
			editorLanguage: 'javaScript',
			rows: 20,
		},
		displayOptions: {
			show: {
				language: ['javaScript'],
			},
		},
		default: `// Loop over input items and add a new field called 'myNewField' to the JSON of each one
for (const item of $input.all()) {
  item.json.myNewField = 1;
}

return $input.all();`,
		description:
			'Write JavaScript code to add, remove, change properties of items, or return altogether new items. <a href="https://docs.n8n.io/code/builtin/" target="_blank">Learn more</a>.',
		noDataExpression: true,
	},
];
