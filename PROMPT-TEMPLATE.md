# 🎯 Template de Prompt para Próximos Projetos

## 📋 **Prompt Completo para Copy/Paste**

```
Crie uma aplicação web completa usando a seguinte stack EXATA:

## FRONTEND STACK:
- React 19.1.1 + TypeScript 4.9.5
- Material-UI v6.1.6 (CRÍTICO: não usar v7+ - causa conflitos)
- @mui/icons-material v6.1.6
- @mui/x-data-grid v7.22.2 (usar API v7 com initialState)
- @emotion/react v11.14.0 + @emotion/styled v11.14.1
- React Router DOM v7.9.2
- Axios v1.12.2 para HTTP requests
- Socket.io-client v4.8.1 (se precisar real-time)

## BACKEND STACK:
- Vercel Serverless Functions
- TypeScript 5.0.0
- @vercel/node v3.0.0
- Node.js runtime

## DATABASE STACK:
- Supabase (PostgreSQL)
- Conexão via environment variables
- SQL schema em /supabase/init.sql

## DEPLOYMENT STACK:
- Vercel hosting
- GitHub integration
- Automatic deployments

## ESTRUTURA DE PROJETO OBRIGATÓRIA:
```
project-root/
├── src/                          # Frontend React
│   ├── components/               # Componentes reutilizáveis
│   ├── pages/                    # Páginas da aplicação
│   └── services/                 # APIs e serviços
├── api/                          # Serverless Functions (Vercel)
│   ├── health.ts                 # Health check endpoint
│   └── [outros-endpoints].ts     # APIs específicas
├── public/                       # Arquivos estáticos React
├── supabase/                     # Scripts de banco
│   └── init.sql                  # Schema inicial
├── package.json                  # Dependências principais
├── vercel.json                   # Configuração Vercel
└── README.md                     # Documentação
```

## CONFIGURAÇÕES CRÍTICAS OBRIGATÓRIAS:

### 1. package.json (VERSÕES EXATAS):
```json
{
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/icons-material": "^6.1.6",
    "@mui/material": "^6.1.6",
    "@mui/x-data-grid": "^7.22.2",
    "@types/react": "^19.1.13",
    "@types/react-dom": "^19.1.9",
    "axios": "^1.12.2",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.9.2",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}
```

### 2. vercel.json (OBRIGATÓRIO):
```json
{
  "outputDirectory": "build"
}
```

### 3. DataGrid API v7 (CRÍTICO - usar exatamente assim):
```typescript
<DataGrid
  rows={data}
  columns={columns}
  initialState={{
    pagination: {
      paginationModel: { page: 0, pageSize: 10 },
    },
  }}
  pageSizeOptions={[10, 25, 50]}
  disableRowSelectionOnClick
/>
```

### 4. Serverless Function Template:
```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Sua lógica aqui
  res.status(200).json({ success: true, data: [] });
}
```

## ENVIRONMENT VARIABLES NECESSÁRIAS:
- DATABASE_URL (Supabase connection string)
- SUPABASE_URL (Project URL)
- SUPABASE_ANON_KEY (Public anon key)
- SUPABASE_SERVICE_ROLE_KEY (Service role key)
- NODE_ENV=production
- JWT_SECRET (32 caracteres aleatórios)

## REGRAS CRÍTICAS - NÃO VIOLAR:

❌ NUNCA USAR:
- @mui/lab (causa conflitos de dependências)
- @mui/material v7+ (incompatível com DataGrid v7)
- pageSize, rowsPerPageOptions, disableSelectionOnClick (API antiga)
- Timeline component (usar List simples)
- outputDirectory diferente de "build"

✅ SEMPRE USAR:
- Versões exatas especificadas acima
- initialState.pagination.paginationModel para DataGrid
- CORS headers em todas as APIs
- TypeScript strict mode
- Componentes funcionais com hooks

## DEPLOYMENT PROCESS:
1. Criar repositório GitHub
2. Push do código
3. Conectar Vercel ao repositório
4. Configurar environment variables no Vercel
5. Fazer redeploy após configurar variáveis

## FUNCIONALIDADES PADRÃO A INCLUIR:
- Dashboard com estatísticas
- CRUD operations com DataGrid
- Navegação com React Router
- API health check endpoint
- Responsive design com Material-UI
- Error handling e loading states
- TypeScript types para todas as entidades

Siga EXATAMENTE estas especificações para evitar conflitos de dependências, problemas de build e falhas de deployment. Esta stack foi testada e funciona perfeitamente em produção.
```

---

## 🔄 **Variações do Prompt**

### **Para Projetos Simples:**
```
Crie uma aplicação React simples usando Material-UI v6.1.6, TypeScript, e Vercel deployment. 
Use exatamente as dependências e configurações do manual DEPLOYMENT-MANUAL.md.
Inclua: Dashboard básico, uma página de listagem com DataGrid v7 API, e uma API serverless.
```

### **Para Projetos Complexos:**
```
Crie uma aplicação web completa seguindo o manual DEPLOYMENT-MANUAL.md.
Inclua: Sistema de autenticação, CRUD completo, real-time updates, dashboard avançado.
Stack: React 19 + Material-UI v6 + Supabase + Vercel.
Use todas as configurações críticas especificadas no manual.
```

### **Para Projetos com Foco em Database:**
```
Crie uma aplicação com foco em gestão de dados usando Supabase + React + Material-UI v6.
Inclua: Schema SQL complexo, relacionamentos, DataGrid com filtros avançados, APIs CRUD.
Siga exatamente as especificações do DEPLOYMENT-MANUAL.md para evitar conflitos.
```

---

## 📚 **Documentação de Referência**

Sempre mencione estes links no prompt para referência:
- Manual completo: `DEPLOYMENT-MANUAL.md`
- Stack testada e aprovada em produção
- Configurações críticas documentadas
- Problemas comuns e soluções incluídas

---

## ✅ **Checklist do Prompt**

Antes de usar o prompt, certifique-se de incluir:
- [ ] Versões exatas das dependências
- [ ] Configuração do vercel.json
- [ ] API v7 do DataGrid
- [ ] Template de serverless function
- [ ] Environment variables necessárias
- [ ] Regras do que NÃO usar
- [ ] Estrutura de projeto obrigatória
- [ ] Processo de deployment

**Com este template, você terá uma aplicação funcionando perfeitamente na primeira tentativa!** 🚀
