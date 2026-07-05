import {
	IDataObject,
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	NodeConnectionTypes,
} from 'n8n-workflow';

export class VistoAzulTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Visto Azul Trigger',
		name: 'vistoAzulTrigger',
		icon: 'file:vistoazul.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '=Instancia: {{$parameter["instance"]}}',
		description: 'Recebe mensagens do WhatsApp (webhook) pela Visto Azul',
		defaults: {
			name: 'Visto Azul Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'vistoAzulApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Instancia',
				name: 'instance',
				type: 'string',
				default: '',
				required: true,
				description: 'Nome da instancia (numero) que vai enviar os eventos recebidos',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const instance = this.getNodeParameter('instance') as string;
				const credentials = await this.getCredentials('vistoAzulApi');
				const baseUrl = (credentials.baseUrl as string).replace(/\/+$/, '');

				try {
					const current = (await this.helpers.httpRequestWithAuthentication.call(
						this,
						'vistoAzulApi',
						{
							method: 'GET',
							url: `${baseUrl}/instances/${instance}/webhook`,
							json: true,
						},
					)) as IDataObject;
					return !!current && current.url === webhookUrl;
				} catch (error) {
					return false;
				}
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const instance = this.getNodeParameter('instance') as string;
				const credentials = await this.getCredentials('vistoAzulApi');
				const baseUrl = (credentials.baseUrl as string).replace(/\/+$/, '');

				await this.helpers.httpRequestWithAuthentication.call(this, 'vistoAzulApi', {
					method: 'POST',
					url: `${baseUrl}/instances/${instance}/webhook`,
					body: { url: webhookUrl, enabled: true },
					json: true,
				});
				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const instance = this.getNodeParameter('instance') as string;
				const credentials = await this.getCredentials('vistoAzulApi');
				const baseUrl = (credentials.baseUrl as string).replace(/\/+$/, '');

				try {
					await this.helpers.httpRequestWithAuthentication.call(this, 'vistoAzulApi', {
						method: 'POST',
						url: `${baseUrl}/instances/${instance}/webhook`,
						body: { url: '', enabled: false },
						json: true,
					});
				} catch (error) {
					return false;
				}
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData();
		return {
			workflowData: [this.helpers.returnJsonArray(body as IDataObject)],
		};
	}
}
