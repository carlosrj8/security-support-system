// Script para configurar automaticamente o Supabase
// Execute com: node supabase/setup.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configurações - SUBSTITUA PELOS SEUS DADOS
const SUPABASE_URL = 'https://[SEU-PROJECT-REF].supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = '[SUA-SERVICE-ROLE-KEY]';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function setupDatabase() {
  console.log('🚀 Iniciando configuração do Supabase...');

  try {
    // Ler o arquivo SQL
    const sqlPath = path.join(__dirname, 'init.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    console.log('📄 Executando script SQL...');
    
    // Dividir o SQL em comandos individuais
    const commands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

    for (const command of commands) {
      if (command.trim()) {
        try {
          const { error } = await supabase.rpc('exec_sql', { sql: command });
          if (error) {
            console.warn(`⚠️  Aviso ao executar comando: ${error.message}`);
          }
        } catch (err) {
          console.warn(`⚠️  Erro ao executar comando: ${err.message}`);
        }
      }
    }

    console.log('✅ Script SQL executado com sucesso!');

    // Verificar se as tabelas foram criadas
    console.log('🔍 Verificando tabelas criadas...');
    
    const tables = ['agents', 'clients', 'cases', 'hitl_requests'];
    for (const table of tables) {
      const { data, error } = await supabase.from(table).select('*').limit(1);
      if (error) {
        console.error(`❌ Erro ao verificar tabela ${table}: ${error.message}`);
      } else {
        console.log(`✅ Tabela ${table} criada com sucesso`);
      }
    }

    console.log('🎉 Configuração do Supabase concluída!');
    console.log('');
    console.log('📋 Próximos passos:');
    console.log('1. Acesse o painel do Supabase para verificar as tabelas');
    console.log('2. Configure as variáveis de ambiente no Vercel');
    console.log('3. Faça o deploy da aplicação');

  } catch (error) {
    console.error('❌ Erro na configuração:', error.message);
    console.log('');
    console.log('💡 Dica: Execute o SQL manualmente no painel do Supabase');
  }
}

// Verificar se as configurações foram definidas
if (SUPABASE_URL.includes('[SEU-PROJECT-REF]') || SUPABASE_SERVICE_ROLE_KEY.includes('[SUA-SERVICE-ROLE-KEY]')) {
  console.log('❌ Por favor, configure suas credenciais do Supabase no arquivo setup.js');
  console.log('');
  console.log('📋 Você precisa substituir:');
  console.log('- [SEU-PROJECT-REF] pela referência do seu projeto');
  console.log('- [SUA-SERVICE-ROLE-KEY] pela sua service role key');
  console.log('');
  console.log('🔍 Encontre essas informações em: Settings > API no painel do Supabase');
  process.exit(1);
}

setupDatabase();
