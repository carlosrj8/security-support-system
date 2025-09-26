# 📚 Como Subir o Projeto para o GitHub

## 🚀 Passo a Passo Completo

### 1. Criar Repositório no GitHub
1. Acesse [github.com](https://github.com)
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Configure o repositório:
   - **Repository name**: `security-support-system`
   - **Description**: `Multi-agent security support system`
   - **Visibility**: Private (recomendado) ou Public
   - ❌ **NÃO** marque "Add a README file"
   - ❌ **NÃO** adicione .gitignore (já temos um)
   - ❌ **NÃO** escolha uma licença (já configurado)
5. Clique em **"Create repository"**

### 2. Preparar o Projeto Local

Abra o terminal/prompt na pasta do projeto e execute:

```bash
# Inicializar repositório Git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit: Multi-agent security support system"

# Adicionar o repositório remoto (substitua SEU-USUARIO pelo seu username)
git remote add origin https://github.com/SEU-USUARIO/security-support-system.git

# Enviar para o GitHub
git push -u origin main
```

### 3. Verificar Upload
1. Atualize a página do seu repositório no GitHub
2. Verifique se todos os arquivos foram enviados:
   - ✅ `backend/` - Código do servidor
   - ✅ `frontend/` - Código do React
   - ✅ `docs/` - Documentação
   - ✅ `supabase/` - Scripts do banco
   - ✅ `package.json` - Configurações raiz
   - ✅ `vercel.json` - Configuração do Vercel
   - ✅ `README.md` - Documentação principal

## 🔧 Comandos Git Úteis

### Atualizações Futuras
```bash
# Adicionar mudanças
git add .

# Commit com mensagem
git commit -m "Descrição das mudanças"

# Enviar para GitHub
git push
```

### Verificar Status
```bash
# Ver arquivos modificados
git status

# Ver histórico de commits
git log --oneline

# Ver diferenças
git diff
```

### Branches (Opcional)
```bash
# Criar nova branch para desenvolvimento
git checkout -b desenvolvimento

# Voltar para main
git checkout main

# Fazer merge da branch
git merge desenvolvimento
```

## 🌐 Conectar com Vercel

Após subir para o GitHub:

### 1. Acessar Vercel
1. Vá para [vercel.com](https://vercel.com)
2. Clique em **"Import Project"**
3. Conecte sua conta do GitHub
4. Autorize o Vercel a acessar seus repositórios

### 2. Importar Projeto
1. Encontre `security-support-system` na lista
2. Clique em **"Import"**
3. Configure conforme o guia `VERCEL-SUPABASE-SETUP.md`

### 3. Deploy Automático
- Toda vez que você fizer `git push`, o Vercel fará deploy automático
- Você receberá notificações por email sobre o status do deploy
- Acesse os logs no painel do Vercel para debug

## 📁 Estrutura Final no GitHub

```
security-support-system/
├── 📂 .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD automático
├── 📂 backend/                 # API NestJS
│   ├── src/
│   ├── package.json
│   └── vercel.json
├── 📂 frontend/                # React App
│   ├── src/
│   ├── public/
│   └── package.json
├── 📂 docs/                    # Documentação
│   ├── agent-manual.md
│   ├── technical-manual.md
│   └── service-manual.md
├── 📂 supabase/               # Scripts do banco
│   ├── init.sql
│   └── setup.js
├── 📄 .gitignore              # Arquivos ignorados
├── 📄 package.json            # Configuração raiz
├── 📄 vercel.json             # Deploy Vercel
├── 📄 README.md               # Documentação principal
├── 📄 DEPLOYMENT.md           # Guia de deploy
├── 📄 VERCEL-SUPABASE-SETUP.md # Guia específico
└── 📄 GITHUB-SETUP.md         # Este arquivo
```

## 🔐 Segurança

### Arquivos Sensíveis
O `.gitignore` já está configurado para **NÃO** enviar:
- ❌ Arquivos `.env` (senhas e chaves)
- ❌ `node_modules/` (dependências)
- ❌ `dist/` e `build/` (arquivos compilados)
- ❌ Logs e arquivos temporários

### Verificação de Segurança
Antes de fazer push, sempre verifique:
```bash
# Ver o que será enviado
git status

# Ver conteúdo dos arquivos
git diff --cached
```

## 🆘 Problemas Comuns

### "Repository not found"
- Verifique se o nome do repositório está correto
- Confirme se você tem permissão de escrita
- Tente usar HTTPS ao invés de SSH

### "Permission denied"
```bash
# Configurar credenciais Git
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Ou usar token de acesso pessoal
# Settings > Developer settings > Personal access tokens
```

### Arquivos muito grandes
```bash
# Ver tamanho dos arquivos
du -sh *

# Remover arquivos grandes do histórico
git rm --cached arquivo-grande
```

## ✅ Checklist Final

Antes de conectar com o Vercel:
- [ ] ✅ Projeto enviado para GitHub
- [ ] ✅ Todos os arquivos importantes estão lá
- [ ] ✅ `.env` **NÃO** foi enviado (segurança)
- [ ] ✅ README.md está atualizado
- [ ] ✅ Supabase configurado e funcionando
- [ ] ✅ Variáveis de ambiente anotadas

## 🎉 Pronto!

Agora você pode:
1. ✅ Conectar o Vercel ao seu repositório GitHub
2. ✅ Configurar as variáveis de ambiente no Vercel
3. ✅ Fazer deploy automático a cada push
4. ✅ Monitorar logs e performance no painel do Vercel

**Próximo passo**: Siga o guia `VERCEL-SUPABASE-SETUP.md` para completar o deploy!
