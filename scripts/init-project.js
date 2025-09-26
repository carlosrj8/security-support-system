#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Inicializando Security Support System...\n');

// Função para executar comandos
function runCommand(command, cwd = process.cwd()) {
  try {
    console.log(`📦 Executando: ${command}`);
    execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ Erro ao executar: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Função para criar arquivo .env se não existir
function createEnvFile(filePath, template) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, template);
    console.log(`✅ Arquivo ${filePath} criado`);
  } else {
    console.log(`ℹ️  Arquivo ${filePath} já existe`);
  }
}

async function initProject() {
  const rootDir = path.join(__dirname, '..');
  const backendDir = path.join(rootDir, 'backend');
  const frontendDir = path.join(rootDir, 'frontend');

  console.log('1️⃣ Instalando dependências raiz...');
  if (!runCommand('npm install', rootDir)) {
    console.error('❌ Falha ao instalar dependências raiz');
    process.exit(1);
  }

  console.log('\n2️⃣ Instalando dependências do backend...');
  if (!runCommand('npm install', backendDir)) {
    console.error('❌ Falha ao instalar dependências do backend');
    process.exit(1);
  }

  console.log('\n3️⃣ Instalando dependências do frontend...');
  if (!runCommand('npm install', frontendDir)) {
    console.error('❌ Falha ao instalar dependências do frontend');
    process.exit(1);
  }

  console.log('\n4️⃣ Criando arquivos de configuração...');

  // Template do .env do backend
  const backendEnvTemplate = `# Supabase Configuration
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Application
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1d

# OpenAI API Key (for AI features)
OPENAI_API_KEY=your-openai-api-key

# WhatsApp Business API (optional)
WHATSAPP_API_URL=https://api.whatsapp.com/send
WHATSAPP_TOKEN=your-whatsapp-token

# Telegram Bot API (optional)
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
`;

  // Template do .env do frontend
  const frontendEnvTemplate = `REACT_APP_API_URL=http://localhost:3000
REACT_APP_SOCKET_URL=http://localhost:3000
REACT_APP_VERSION=1.0.0
`;

  createEnvFile(path.join(backendDir, '.env'), backendEnvTemplate);
  createEnvFile(path.join(frontendDir, '.env'), frontendEnvTemplate);

  console.log('\n5️⃣ Compilando backend...');
  if (!runCommand('npm run build', backendDir)) {
    console.warn('⚠️  Aviso: Falha ao compilar backend (normal se não tiver Supabase configurado)');
  }

  console.log('\n✅ Inicialização concluída!\n');

  console.log('📋 Próximos passos:');
  console.log('');
  console.log('1. 🗄️  Configure o Supabase:');
  console.log('   - Crie um projeto em https://supabase.com');
  console.log('   - Execute o script supabase/init.sql no SQL Editor');
  console.log('   - Atualize as credenciais no backend/.env');
  console.log('');
  console.log('2. 🚀 Para desenvolvimento local:');
  console.log('   npm run dev');
  console.log('');
  console.log('3. 🌐 Para deploy no Vercel:');
  console.log('   - Siga o guia GITHUB-SETUP.md');
  console.log('   - Depois siga VERCEL-SUPABASE-SETUP.md');
  console.log('');
  console.log('4. 📚 Documentação disponível:');
  console.log('   - README.md - Visão geral');
  console.log('   - docs/agent-manual.md - Manual dos agentes');
  console.log('   - docs/technical-manual.md - Manual técnico');
  console.log('   - docs/service-manual.md - Manual de atendimento');
  console.log('');
  console.log('🎉 Bom desenvolvimento!');
}

// Verificar se está sendo executado diretamente
if (require.main === module) {
  initProject().catch(console.error);
}

module.exports = { initProject };
