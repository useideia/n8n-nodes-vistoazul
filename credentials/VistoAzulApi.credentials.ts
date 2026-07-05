import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class VistoAzulApi implements ICredentialType {
	name = 'vistoAzulApi';

	displayName = 'Visto Azul API';

	documentationUrl = 'https://vistoazul.com.br/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Sua API key do Visto Azul. Pegue no painel em Instancias: https://dashboard.vistoazul.com.br',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://dashboard.vistoazul.com.br/api/v1',
			description: 'Base da API REST. Normalmente nao precisa alterar.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/instances',
			method: 'GET',
		},
	};
}
