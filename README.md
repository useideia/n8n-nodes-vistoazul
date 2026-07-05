# n8n-nodes-vistoazul

> Node community do **n8n** para a **API de WhatsApp da [Visto Azul](https://vistoazul.com.br)**. Envie texto, mídia, cobrança **PIX**, dispare campanhas com anti-ban, gerencie contatos e **receba mensagens por webhook** para acionar seus fluxos e agentes de IA.

Sem taxa por mensagem da Meta, com PIX nativo e anti-ban de fábrica. A API REST é o core: plugue no n8n em minutos.

**Palavras-chave:** WhatsApp API, n8n, automação de WhatsApp, chatbot WhatsApp, PIX no WhatsApp, webhook WhatsApp, API WhatsApp Brasil.

---

## Instalação

No n8n (self-hosted), vá em **Settings → Community Nodes → Install** e informe:

```
n8n-nodes-vistoazul
```

Ou via npm, na pasta de custom nodes do n8n:

```bash
npm install n8n-nodes-vistoazul
```

## Credencial

Crie uma credencial **Visto Azul API**:

1. Crie sua conta em **https://dashboard.vistoazul.com.br**
2. Conecte seu número lendo o QR code (em *Instâncias*)
3. Copie sua **API key** e cole no campo **API Key** da credencial

O node usa `Authorization: Bearer SUA_API_KEY`. O campo **Base URL** já vem preenchido (`https://dashboard.vistoazul.com.br/api/v1`).

## Nós incluídos

### Visto Azul (ação)

| Recurso | Operações |
|---|---|
| **Mensagem** | Enviar Texto · Enviar Mídia · Enviar PIX · Enviar Enquete |
| **Contato** | Criar/Atualizar · Listar (por tag) · Importar |
| **Campanha** | Criar (disparo em massa com anti-ban) · Status |
| **Instância** | Listar · Criar (devolve QR code) |
| **Chat** | Checar Números (quem tem WhatsApp) |
| **Grupo** | Criar |

### Visto Azul Trigger (gatilho)

Recebe cada mensagem do WhatsApp como um evento no n8n. Ao ativar o workflow, o node **registra o webhook automaticamente** na sua instância; ao desativar, ele limpa. Basta informar o nome da **Instância**. Ideal para chatbots e agentes de IA (ex.: responder com um modelo de linguagem).

## Exemplo de uso

1. **Visto Azul Trigger** → recebe a mensagem
2. Um nó de IA (ex.: um modelo de linguagem) gera a resposta
3. **Visto Azul → Mensagem → Enviar Texto** → responde no WhatsApp

## Boas práticas (anti-ban)

- Aguarde de 3 a 5 segundos entre chamadas sequenciais.
- Personalize e varie o texto. Para volume, use **Campanha** (já traz rotação e delays).
- Valide números com **Chat → Checar Números** antes de disparar.

## Links

- 🌐 Site: **https://vistoazul.com.br**
- 📚 Documentação: **https://vistoazul.com.br/docs**
- 🧩 Skill para Claude / agentes: **https://github.com/useideia/claude-whatsapp-skill**

## Licença

[MIT](./LICENSE)
