# 🚀 Manual Completo: Supabase + Vercel + GitHub Integration

## 📋 **Visão Geral da Stack**

Este manual documenta a stack completa e processo de deployment para aplicações web modernas usando:

- **Frontend**: React 19 + TypeScript + Material-UI v6
- **Backend**: Node.js Serverless Functions (Vercel)
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Version Control**: GitHub
- **Build System**: Create React App

---

## 🏗️ **Estrutura do Projeto**

```
project-root/
├── src/                          # Frontend React
│   ├── components/               # Componentes reutilizáveis
│   ├── pages/                    # Páginas da aplicação
│   └── services/                 # APIs e serviços
├── api/                          # Serverless Functions (Vercel)
│   ├── health.ts                 # Health check endpoint
│   └── agents.ts                 # API endpoints
├── public/                       # Arquivos estáticos
├── supabase/                     # Scripts de banco
│   └── init.sql                  # Schema inicial
├── package.json                  # Dependências principais
├── vercel.json                   # Configuração Vercel
└── README.md                     # Documentação
```

---

## 📦 **Dependências Essenciais**

### **Frontend Dependencies (package.json)**

```json
{
  "name": "your-app-name",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/icons-material": "^6.1.6",
    "@mui/material": "^6.1.6",
    "@mui/x-data-grid": "^7.22.2",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.8.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.126",
    "@types/react": "^19.1.13",
    "@types/react-dom": "^19.1.9",
    "axios": "^1.12.2",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.9.2",
    "react-scripts": "5.0.1",
    "socket.io-client": "^4.8.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### **API Dependencies (api/package.json)**

```json
{
  "name": "api",
  "version": "1.0.0",
  "dependencies": {
    "@vercel/node": "^3.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

## ⚙️ **Configurações Críticas**

### **1. Vercel Configuration (vercel.json)**

```json
{
  "outputDirectory": "build"
}
```

**⚠️ IMPORTANTE**: 
- React gera arquivos em `build/`, não `dist/`
- Vercel por padrão procura por `dist/`
- Esta configuração é OBRIGATÓRIA

### **2. Material-UI Version Compatibility**

**✅ VERSÕES COMPATÍVEIS:**
- `@mui/material`: `^6.1.6`
- `@mui/icons-material`: `^6.1.6`
- `@mui/x-data-grid`: `^7.22.2`

**❌ EVITAR:**
- `@mui/lab` (causa conflitos de dependências)
- `@mui/material` v7+ (incompatível com DataGrid v7)

### **3. DataGrid v7 API (CRÍTICO)**

**❌ API ANTIGA (não funciona):**
```typescript
<DataGrid
  pageSize={10}
  rowsPerPageOptions={[10, 25, 50]}
  disableSelectionOnClick
/>
```

**✅ API NOVA (v7):**
```typescript
<DataGrid
  initialState={{
    pagination: {
      paginationModel: { page: 0, pageSize: 10 },
    },
  }}
  pageSizeOptions={[10, 25, 50]}
  disableRowSelectionOnClick
/>
```

---

## 🗄️ **Supabase Setup**

### **1. Criar Projeto Supabase**
1. Acesse [supabase.com](https://supabase.com)
2. Crie novo projeto
3. Aguarde provisionamento (2-3 minutos)

### **2. Configurar Database**
```sql
-- Exemplo de schema (supabase/init.sql)
CREATE TABLE agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Inserir dados de exemplo
INSERT INTO agents (name, type) VALUES 
('Security Monitor', 'MONITORING'),
('Support Agent', 'SUPPORT');
```

### **3. Obter Credenciais**
**Localização no Supabase Dashboard:**
- **Project URL**: Settings → API → Project URL
- **Anon Key**: Settings → API → Project API keys → anon public
- **Service Role Key**: Settings → API → Project API keys → service_role
- **Database URL**: Settings → Database → Connection string → URI

---

## 🔧 **Vercel Deployment**

### **1. Preparar Repositório GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

### **2. Conectar Vercel**
1. Acesse [vercel.com](https://vercel.com)
2. **New Project** → **Import Git Repository**
3. Selecione seu repositório
4. **Framework Preset**: `Other` (não Create React App)
5. **Deploy**

### **3. Configurar Environment Variables**
**No Vercel Dashboard → Settings → Environment Variables:**

```
DATABASE_URL=postgresql://[user]:[password]@[host]:5432/[database]
SUPABASE_URL=https://[project-id].supabase.co
SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
NODE_ENV=production
JWT_SECRET=[random-32-char-string]
```

**⚠️ IMPORTANTE**: Após adicionar variáveis, fazer **Redeploy**

---

## 🔌 **Serverless Functions (API)**

### **Estrutura de API Function**
```typescript
// api/health.ts
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      message: 'API is running',
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
```

### **Endpoints Automáticos**
- `https://your-app.vercel.app/api/health`
- `https://your-app.vercel.app/api/agents`

---

## 🚨 **Problemas Comuns e Soluções**

### **1. Build Fails - Timeline Import Error**
**Erro**: `'Timeline' is not exported from '@mui/material'`

**Solução**: Usar componente List simples
```typescript
// ❌ Não usar Timeline
import { Timeline } from '@mui/lab';

// ✅ Usar List
import { List, ListItem, ListItemText } from '@mui/material';
```

### **2. Build Fails - DataGrid pageSize Error**
**Erro**: `Property 'pageSize' does not exist`

**Solução**: Atualizar para API v7 (ver seção DataGrid acima)

### **3. Deploy Fails - Output Directory**
**Erro**: `No Output Directory named "dist" found`

**Solução**: Adicionar `vercel.json`:
```json
{ "outputDirectory": "build" }
```

### **4. Dependency Conflicts**
**Erro**: `ERESOLVE unable to resolve dependency tree`

**Solução**: Usar versões compatíveis (ver seção Dependências)

### **5. 404 em Produção**
**Causas possíveis**:
- Vercel não conectado ao repositório correto
- Branch errada configurada
- Build falhou silenciosamente

**Solução**: Verificar Deployments no Vercel Dashboard

---

## 📝 **Checklist de Deployment**

### **Pré-Deploy**
- [ ] Supabase projeto criado e configurado
- [ ] Database schema aplicado
- [ ] Repositório GitHub criado
- [ ] Dependências corretas no package.json
- [ ] vercel.json configurado
- [ ] APIs testadas localmente

### **Deploy**
- [ ] Vercel projeto criado
- [ ] Repositório conectado
- [ ] Environment variables configuradas
- [ ] Deploy inicial executado
- [ ] Redeploy após configurar variáveis

### **Pós-Deploy**
- [ ] Frontend acessível
- [ ] APIs respondendo
- [ ] Database conectado
- [ ] Funcionalidades testadas

---

## 🎯 **Template de Prompt para Próximos Projetos**

```
Crie uma aplicação web usando a seguinte stack EXATA:

FRONTEND:
- React 19 + TypeScript
- Material-UI v6.1.6 (EXATO - não usar v7+)
- @mui/x-data-grid v7.22.2 (usar API v7 com initialState)
- React Router v7
- Axios para HTTP requests

BACKEND:
- Vercel Serverless Functions
- TypeScript
- @vercel/node v3

DATABASE:
- Supabase (PostgreSQL)
- Conexão via environment variables

DEPLOYMENT:
- Vercel hosting
- GitHub integration
- Environment variables: DATABASE_URL, SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, NODE_ENV, JWT_SECRET

ESTRUTURA:
- Frontend na raiz (src/, public/)
- APIs em /api/ folder
- Database scripts em /supabase/
- vercel.json com outputDirectory: "build"

CONFIGURAÇÕES CRÍTICAS:
- DataGrid usar initialState.pagination.paginationModel (não pageSize)
- Material-UI v6 (evitar @mui/lab)
- CORS headers em todas as APIs
- Build output em /build (não /dist)

Siga exatamente estas especificações para evitar conflitos de dependências e problemas de build.
```

---

## 🔗 **Links Úteis**

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Material-UI v6 Documentation](https://mui.com/material-ui/)
- [DataGrid v7 API Reference](https://mui.com/x/react-data-grid/)
- [React Router v7 Documentation](https://reactrouter.com/)

---

## ✅ **Conclusão**

Este manual documenta uma stack completa e testada para aplicações web modernas. Seguindo exatamente estas especificações, você evitará os principais problemas de compatibilidade e deployment que enfrentamos.

**Pontos críticos para lembrar:**
1. Versões específicas do Material-UI
2. API v7 do DataGrid
3. Configuração do outputDirectory
4. Environment variables no Vercel
5. Estrutura de pastas correta

**Com esta configuração, você terá uma aplicação moderna, escalável e pronta para produção!** 🚀
