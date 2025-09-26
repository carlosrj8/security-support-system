# 🚀 Deploy no Vercel com Supabase - Guia Completo

## 📋 Pré-requisitos

1. **Conta no GitHub** - Para conectar com o Vercel
2. **Conta no Vercel** - Para deploy da aplicação
3. **Conta no Supabase** - Para o banco de dados PostgreSQL

## 🗄️ Configuração do Supabase

### Passo 1: Criar Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Crie um novo projeto:
   - **Name**: `security-support-system`
   - **Database Password**: Anote esta senha!
   - **Region**: Escolha a mais próxima (South America)

### Passo 2: Executar Script SQL
1. No painel do Supabase, vá para **SQL Editor**
2. Clique em "New query"
3. Copie todo o conteúdo do arquivo `supabase/init.sql`
4. Cole no editor e clique em **RUN**
5. Verifique se todas as tabelas foram criadas em **Table Editor**

### Passo 3: Obter Credenciais
No painel do Supabase, vá para **Settings > API**:
- **Project URL**: `https://[seu-project-ref].supabase.co`
- **Project Reference**: `[seu-project-ref]`
- **anon public**: `eyJ0eXAiOiJKV1Q...` (chave pública)
- **service_role**: `eyJ0eXAiOiJKV1Q...` (chave privada)

### Passo 4: String de Conexão
A URL do banco será:
```
postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJECT-REF].supabase.co:5432/postgres
```

## 🌐 Deploy no Vercel

### Passo 1: Preparar Repositório GitHub
1. Crie um novo repositório no GitHub
2. Faça upload de todos os arquivos do projeto
3. Certifique-se que o `.gitignore` está funcionando

### Passo 2: Conectar Vercel ao GitHub
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Import Project"
3. Conecte sua conta do GitHub
4. Selecione o repositório `security-support-system`

### Passo 3: Configurar Deploy
1. **Framework Preset**: Other
2. **Root Directory**: `./` (raiz do projeto)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Passo 4: Variáveis de Ambiente
No painel do Vercel, vá para **Settings > Environment Variables** e adicione:

```bash
# Supabase
DATABASE_URL=postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJECT-REF].supabase.co:5432/postgres
SUPABASE_URL=https://[SEU-PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=[SUA-CHAVE-ANON]
SUPABASE_SERVICE_ROLE_KEY=[SUA-CHAVE-SERVICE-ROLE]

# Application
NODE_ENV=production
JWT_SECRET=seu-jwt-secret-super-seguro-aqui
JWT_EXPIRES_IN=1d

# OpenAI (opcional)
OPENAI_API_KEY=sk-...

# WhatsApp (opcional)
WHATSAPP_TOKEN=seu-token-whatsapp
WHATSAPP_API_URL=https://api.whatsapp.com/send

# Telegram (opcional)
TELEGRAM_BOT_TOKEN=seu-bot-token
TELEGRAM_CHAT_ID=seu-chat-id
```

### Passo 5: Deploy
1. Clique em **Deploy**
2. Aguarde o build completar
3. Acesse sua aplicação no link fornecido

## 🔧 Configuração Específica para Monorepo

Como temos frontend e backend separados, você pode optar por:

### Opção 1: Deploy Conjunto (Recomendado)
- Use o `vercel.json` na raiz
- Frontend e backend no mesmo domínio
- Rotas `/api/*` vão para o backend
- Outras rotas vão para o frontend

### Opção 2: Deploy Separado
1. **Backend**: Deploy da pasta `backend/` como API
2. **Frontend**: Deploy da pasta `frontend/` como site estático
3. Configure CORS no backend para aceitar o domínio do frontend

## 📊 Verificação do Deploy

### 1. Testar Backend
```bash
curl https://seu-app.vercel.app/api/agents
```

### 2. Testar Frontend
Acesse: `https://seu-app.vercel.app`

### 3. Testar Banco de Dados
No Supabase, vá para **Table Editor** e verifique se há dados nas tabelas.

## 🐛 Troubleshooting

### Erro de Build
```bash
# Se der erro de TypeScript
npm run build

# Se der erro de dependências
npm install
```

### Erro de Conexão com Banco
1. Verifique se a `DATABASE_URL` está correta
2. Teste a conexão no Supabase SQL Editor
3. Verifique se as tabelas foram criadas

### Erro 500 no Backend
1. Verifique os logs no Vercel Dashboard
2. Confirme se todas as variáveis de ambiente estão definidas
3. Teste localmente primeiro

## 🔄 Atualizações

Para atualizar a aplicação:
1. Faça push das mudanças para o GitHub
2. O Vercel fará deploy automático
3. Para mudanças no banco, execute novos scripts SQL no Supabase

## 📱 Domínio Personalizado (Opcional)

1. No Vercel, vá para **Settings > Domains**
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções
4. Aguarde propagação (até 48h)

## 🔐 Segurança

### Supabase
- Row Level Security (RLS) está habilitado
- Políticas básicas foram criadas
- Ajuste as políticas conforme necessário

### Vercel
- HTTPS automático
- Variáveis de ambiente seguras
- Headers de segurança configurados

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no Vercel Dashboard
2. Teste as queries no Supabase SQL Editor  
3. Confirme se todas as variáveis estão definidas
4. Teste localmente primeiro

## 🎉 Pronto!

Sua aplicação está rodando em produção com:
- ✅ Frontend React no Vercel
- ✅ Backend NestJS no Vercel  
- ✅ Banco PostgreSQL no Supabase
- ✅ Deploy automático via GitHub
- ✅ HTTPS e domínio personalizado
- ✅ Monitoramento e logs
