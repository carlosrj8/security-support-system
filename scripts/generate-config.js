#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 Gerador de Configuração - Security Support System\n');
console.log('Este script vai gerar todas as variáveis de ambiente para você!\n');

// Função para fazer perguntas
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  try {
    console.log('📋 Colete estas informações do seu Supabase:\n');
    console.log('1. Vá para seu projeto no Supabase');
    console.log('2. Settings → API');
    console.log('3. Anote as informações solicitadas abaixo\n');

    // Coletar informações
    const projectRef = await askQuestion('🔗 Project Reference (da URL, ex: abcdefghijk): ');
    const dbPassword = await askQuestion('🔐 Senha do banco de dados: ');
    const anonKey = await askQuestion('🔑 Anon Key (Settings → API): ');
    const serviceRoleKey = await askQuestion('🔒 Service Role Key (Settings → API): ');

    // Gerar JWT Secret aleatório
    const jwtSecret = `security-support-system-2024-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`;

    console.log('\n' + '='.repeat(80));
    console.log('🎯 CONFIGURAÇÕES GERADAS - COPIE E COLE NO VERCEL');
    console.log('='.repeat(80));
    console.log('\nVá para: https://vercel.com/new');
    console.log('Import: carlosrj8/security-support-system');
    console.log('Settings → Environment Variables\n');

    console.log('📋 VARIÁVEIS DE AMBIENTE:\n');

    console.log('Nome: DATABASE_URL');
    console.log('Valor:');
    console.log(`postgresql://postgres:${dbPassword}@db.${projectRef}.supabase.co:5432/postgres`);
    console.log('');

    console.log('Nome: SUPABASE_URL');
    console.log('Valor:');
    console.log(`https://${projectRef}.supabase.co`);
    console.log('');

    console.log('Nome: SUPABASE_ANON_KEY');
    console.log('Valor:');
    console.log(anonKey);
    console.log('');

    console.log('Nome: SUPABASE_SERVICE_ROLE_KEY');
    console.log('Valor:');
    console.log(serviceRoleKey);
    console.log('');

    console.log('Nome: NODE_ENV');
    console.log('Valor:');
    console.log('production');
    console.log('');

    console.log('Nome: JWT_SECRET');
    console.log('Valor:');
    console.log(jwtSecret);
    console.log('');

    console.log('='.repeat(80));
    console.log('✅ PRONTO! Copie cada variável acima para o Vercel');
    console.log('🚀 Depois clique em "Deploy" no Vercel');
    console.log('📱 Sua app estará em: https://seu-projeto.vercel.app');
    console.log('='.repeat(80));

    // Salvar em arquivo para referência
    const configContent = `# Configurações geradas em ${new Date().toLocaleString()}

DATABASE_URL=postgresql://postgres:${dbPassword}@db.${projectRef}.supabase.co:5432/postgres
SUPABASE_URL=https://${projectRef}.supabase.co
SUPABASE_ANON_KEY=${anonKey}
SUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}
NODE_ENV=production
JWT_SECRET=${jwtSecret}

# Opcionais (configure depois se quiser)
OPENAI_API_KEY=your-openai-api-key
WHATSAPP_TOKEN=your-whatsapp-token
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
`;

    require('fs').writeFileSync('vercel-config.txt', configContent);
    console.log('\n💾 Configurações salvas em: vercel-config.txt');

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    rl.close();
  }
}

main().catch(console.error);
