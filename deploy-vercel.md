# 🚀 Deploy Automatizado - Vercel

## Método Super Rápido (5 minutos)

### 1. Deploy no Vercel
1. Vá para: https://vercel.com/new
2. Conecte GitHub se ainda não conectou
3. Procure: `carlosrj8/security-support-system`
4. Clique **Import**
5. Clique **Deploy** (vai falhar, é normal)

### 2. Configurar Variáveis (Copy/Paste)
No Vercel, vá para **Settings → Environment Variables** e adicione:

**NODE_ENV**
```
production
```

**JWT_SECRET**
```
security-support-system-2024-super-secret-key-carlos
```

**DATABASE_URL** (substitua [REF] e [SENHA])
```
postgresql://postgres:[SUA-SENHA]@db.[SEU-REF].supabase.co:5432/postgres
```

**SUPABASE_URL** (substitua [REF])
```
https://[SEU-REF].supabase.co
```

**SUPABASE_ANON_KEY** (copie do Supabase Settings → API)
```
[COLE-AQUI-SUA-CHAVE-ANON]
```

**SUPABASE_SERVICE_ROLE_KEY** (copie do Supabase Settings → API)
```
[COLE-AQUI-SUA-CHAVE-SERVICE-ROLE]
```

### 3. Redeploy
- **Deployments** → 3 pontinhos → **Redeploy**

### 4. Testar
- Acesse: `https://seu-app.vercel.app`
- Teste API: `https://seu-app.vercel.app/api/agents`

## ✅ Pronto em 5 minutos!
