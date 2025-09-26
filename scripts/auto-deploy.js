#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Script de Deploy Automatizado - Security Support System\n');

// Função para fazer perguntas
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Função para executar comandos
function runCommand(command, cwd = process.cwd()) {
  try {
    console.log(`📦 Executando: ${command}`);
    const result = execSync(command, { cwd, stdio: 'pipe', encoding: 'utf8' });
    return { success: true, output: result };
  } catch (error) {
    return { success: false, error: error.message, output: error.stdout };
  }
}

// Função para criar arquivo .env
function createEnvFile(config) {
  const envContent = `# Supabase Configuration
DATABASE_URL=${config.databaseUrl}
SUPABASE_URL=${config.supabaseUrl}
SUPABASE_ANON_KEY=${config.anonKey}
SUPABASE_SERVICE_ROLE_KEY=${config.serviceRoleKey}

# Application
NODE_ENV=production
JWT_SECRET=${config.jwtSecret}

# OpenAI (opcional)
OPENAI_API_KEY=your-openai-api-key

# WhatsApp (opcional)
WHATSAPP_TOKEN=your-whatsapp-token
WHATSAPP_API_URL=https://api.whatsapp.com/send

# Telegram (opcional)
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
`;

  const envPath = path.join(__dirname, '..', 'backend', '.env');
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Arquivo .env criado no backend');
}

// Função para instalar Vercel CLI
async function installVercelCLI() {
  console.log('📦 Instalando Vercel CLI...');
  const result = runCommand('npm install -g vercel');
  if (!result.success) {
    console.log('⚠️  Tentando instalar via winget...');
    const wingetResult = runCommand('winget install Vercel.Vercel');
    if (!wingetResult.success) {
      console.log('❌ Falha ao instalar Vercel CLI. Instale manualmente: npm i -g vercel');
      return false;
    }
  }
  console.log('✅ Vercel CLI instalado');
  return true;
}

// Função para fazer deploy no Vercel
async function deployToVercel(config) {
  console.log('🌐 Fazendo deploy no Vercel...');
  
  // Login no Vercel
  console.log('🔐 Fazendo login no Vercel...');
  const loginResult = runCommand('vercel login');
  if (!loginResult.success) {
    console.log('❌ Falha no login do Vercel. Faça login manualmente: vercel login');
    return false;
  }

  // Deploy
  console.log('🚀 Iniciando deploy...');
  const deployResult = runCommand('vercel --prod');
  if (!deployResult.success) {
    console.log('⚠️  Deploy inicial pode ter falhado. Configurando variáveis...');
  }

  // Configurar variáveis de ambiente
  console.log('⚙️  Configurando variáveis de ambiente...');
  const envVars = [
    { key: 'DATABASE_URL', value: config.databaseUrl },
    { key: 'SUPABASE_URL', value: config.supabaseUrl },
    { key: 'SUPABASE_ANON_KEY', value: config.anonKey },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', value: config.serviceRoleKey },
    { key: 'NODE_ENV', value: 'production' },
    { key: 'JWT_SECRET', value: config.jwtSecret }
  ];

  for (const envVar of envVars) {
    const envResult = runCommand(`vercel env add ${envVar.key} production`);
    if (envResult.success) {
      console.log(`✅ Variável ${envVar.key} configurada`);
    }
  }

  // Redeploy
  console.log('🔄 Fazendo redeploy com as variáveis...');
  const redeployResult = runCommand('vercel --prod');
  
  return redeployResult.success;
}

// Função principal
async function main() {
  try {
    console.log('1️⃣ Coletando informações do Supabase...\n');

    // Coletar informações do usuário
    const projectRef = await askQuestion('🔗 Project Reference do Supabase (ex: abcdefghijk): ');
    const dbPassword = await askQuestion('🔐 Senha do banco de dados: ');
    const anonKey = await askQuestion('🔑 Supabase Anon Key (Settings → API): ');
    const serviceRoleKey = await askQuestion('🔒 Supabase Service Role Key: ');

    // Gerar configurações
    const config = {
      projectRef,
      databaseUrl: `postgresql://postgres:${dbPassword}@db.${projectRef}.supabase.co:5432/postgres`,
      supabaseUrl: `https://${projectRef}.supabase.co`,
      anonKey,
      serviceRoleKey,
      jwtSecret: `security-support-system-2024-${Math.random().toString(36).substring(2, 15)}`
    };

    console.log('\n2️⃣ Criando arquivo de configuração...');
    createEnvFile(config);

    console.log('\n3️⃣ Verificando dependências...');
    
    // Verificar se o projeto está buildando
    console.log('🔨 Testando build do backend...');
    const buildResult = runCommand('npm run build', path.join(__dirname, '..', 'backend'));
    if (!buildResult.success) {
      console.log('⚠️  Build do backend falhou. Continuando mesmo assim...');
    } else {
      console.log('✅ Backend compilado com sucesso');
    }

    console.log('\n4️⃣ Preparando deploy no Vercel...');
    
    const useVercelCLI = await askQuestion('Quer tentar deploy automático via Vercel CLI? (y/n): ');
    
    if (useVercelCLI.toLowerCase() === 'y') {
      const cliInstalled = await installVercelCLI();
      if (cliInstalled) {
        const deploySuccess = await deployToVercel(config);
        if (deploySuccess) {
          console.log('\n🎉 Deploy concluído com sucesso!');
        } else {
          console.log('\n⚠️  Deploy automático falhou. Use o método manual.');
        }
      }
    }

    console.log('\n📋 Configuração Manual (se necessário):');
    console.log('1. Vá para: https://vercel.com/new');
    console.log('2. Import: carlosrj8/security-support-system');
    console.log('3. Configure estas variáveis de ambiente:');
    console.log('');
    console.log('DATABASE_URL:');
    console.log(config.databaseUrl);
    console.log('');
    console.log('SUPABASE_URL:');
    console.log(config.supabaseUrl);
    console.log('');
    console.log('SUPABASE_ANON_KEY:');
    console.log(config.anonKey);
    console.log('');
    console.log('SUPABASE_SERVICE_ROLE_KEY:');
    console.log(config.serviceRoleKey);
    console.log('');
    console.log('NODE_ENV:');
    console.log('production');
    console.log('');
    console.log('JWT_SECRET:');
    console.log(config.jwtSecret);

    console.log('\n✅ Script concluído!');
    console.log('📱 Sua aplicação estará disponível em: https://seu-app.vercel.app');

  } catch (error) {
    console.error('❌ Erro durante execução:', error.message);
  } finally {
    rl.close();
  }
}

// Verificar se está sendo executado diretamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
