# Manual dos Agentes - Sistema de Suporte de Segurança Eletrônica

## Visão Geral

Este manual descreve o funcionamento, responsabilidades e procedimentos de cada agente no sistema multi-agente de suporte de segurança eletrônica.

## 1. GERADOR DE CASES

### Responsabilidades
- Gerar cases simulados baseados em possibilidades reais da operação
- Criar cenários de teste para validação do sistema
- Manter templates de cases atualizados

### Configurações
- **Tipos de Cases**: camera_offline, alarm_issue, access_control, intercom, network, financial, other
- **Intervalo de Geração**: 300 segundos (padrão)
- **Máximo de Cases por Hora**: 10 (padrão)

### Procedimentos
1. Analisar padrões históricos de cases reais
2. Gerar cases com base em templates pré-definidos
3. Incluir dados realistas (IDs de clientes, localizações, horários)
4. Encaminhar cases gerados para o Módulo Cliente

### Exemplos de Cases Gerados
- **Câmera Offline**: "Cliente relatando câmera sem sinal na entrada principal"
- **Sistema Offline**: "Sistema de monitoramento completamente offline"
- **Solicitação de Gravações**: "Cliente solicitando acesso a gravações específicas"

## 2. MÓDULO CLIENTE

### Responsabilidades
- Receber cases do Gerador de Cases
- Interagir com clientes através de múltiplos canais
- Identificar problemas através de árvore de decisão
- Encaminhar solicitações para o Módulo Agente

### Configurações
- **Timeout de Resposta**: 900 segundos (15 minutos)
- **Máximo de Perguntas**: 3
- **Canais Suportados**: WhatsApp, Email, Web

### Árvore de Identificação de Problemas
1. **Primeira Pergunta**: "Onde está precisando de suporte?"
   - Câmeras
   - Alarmes
   - Portas e Portões Automáticos
   - Interfone
   - Redes
   - Financeiro
   - Outros

2. **Segunda Pergunta**: Específica baseada na primeira resposta
3. **Terceira Pergunta**: Confirmação e detalhes adicionais

### Procedimentos
1. Identificar cliente através de token (QR Code, WhatsApp, Email)
2. Aplicar árvore de identificação de problemas
3. Coletar informações necessárias em máximo 3 perguntas
4. Validar informações com imagens/dados pré-armazenados
5. Encaminhar caso completo para Módulo Agente

## 3. MÓDULO AGENTE (Principal)

### Responsabilidades
- Receber solicitações do Módulo Cliente
- Identificar clientes através de tokens
- Analisar histórico de problemas
- Gerar ordens de serviço
- Definir prioridades de atendimento
- Agendar atendimentos automaticamente
- Gerenciar comunicação com técnicos

### Configurações
- **Timeout de Decisão**: 600 segundos (10 minutos)
- **Limite de Escalação**: 3 tentativas
- **Matriz de Prioridade**: Critical=1, High=2, Medium=3, Low=4

### Procedimentos de Análise
1. **Identificação do Cliente**
   - Verificar token de origem (QR Code, WhatsApp, Email)
   - Buscar dados do cliente no banco de dados
   - Validar histórico de atendimentos

2. **Análise do Problema**
   - Comparar com casos anteriores do mesmo cliente
   - Verificar padrões de problemas recorrentes
   - Consultar prontuário técnico da instalação

3. **Verificações Automáticas**
   - Status de internet do cliente (via APIs/webhooks)
   - Status dos equipamentos (quando disponível)
   - Disponibilidade de técnicos na região

4. **Geração de OS**
   - Criar ordem de serviço com prioridade definida
   - Incluir histórico relevante
   - Adicionar sugestões de solução baseadas em IA

5. **Agendamento**
   - Verificar agenda dos técnicos
   - Propor horário baseado em prioridade e disponibilidade
   - Confirmar com cliente

### Escalação para HITL
- Quando problema foge das possibilidades de decisão
- Incluir questionamento específico
- Fornecer sugestões baseadas no cenário
- Aguardar aprovação humana para alterações em manuais

## 4. MÓDULO TÉCNICO PARCEIRO

### Responsabilidades
- Receber solicitações de OS do Módulo Agente
- Gerenciar agenda de técnicos
- Confirmar disponibilidade para atendimentos
- Atualizar status de atendimentos

### Opções de Resposta via WhatsApp
1. **Realizar Atendimento**: Aceita a OS e confirma horário
2. **Solicitar Mais Informações**: Pede detalhes adicionais
3. **Não Disponível**: Recusa a OS (será redirecionada)

### Procedimentos
1. Receber notificação de OS via WhatsApp
2. Analisar informações fornecidas:
   - Dados do cliente
   - Descrição do problema
   - Sugestões de solução
   - Histórico relevante
3. Responder com uma das opções disponíveis
4. Se aceitar, confirmar horário proposto
5. Atualizar status durante atendimento

## 5. VALIDADOR DE AGENTES

### Responsabilidades
- Monitorar interações entre todos os módulos
- Verificar cumprimento de procedimentos
- Analisar performance dos agentes
- Gerar relatórios de melhoria
- Preparar estudos de expediente

### Configurações
- **Intervalo de Análise**: 60 minutos
- **Métricas Monitoradas**: Tempo de resposta, taxa de resolução, satisfação
- **Alertas**: Desvios de procedimento, performance baixa

### Base de Conhecimento
- Job description de cada agente
- Código de conduta
- Leis e regulamentações aplicáveis
- Missão e valores da empresa
- Procedimentos operacionais padrão

### Procedimentos
1. **Monitoramento Contínuo**
   - Acompanhar todas as interações
   - Verificar aderência aos procedimentos
   - Identificar desvios ou problemas

2. **Análise de Performance**
   - Medir KPIs de cada agente
   - Comparar com benchmarks estabelecidos
   - Identificar oportunidades de melhoria

3. **Relatórios**
   - Gerar relatório diário de operações
   - Analisar tendências e padrões
   - Sugerir ajustes e melhorias

## Registros e Documentação

### Prontuário Técnico
- Histórico de todas as decisões por instalação
- Organizado por data, hora e OS de referência
- Estrutura otimizada para consulta pelos técnicos
- Inclui soluções aplicadas e resultados

### Manual de Atendimento
- Soluções catalogadas por tema e assunto
- Cada solução possui identificador único
- Rastreabilidade de decisões
- Aprovação humana para alterações

### Registro de Estratégias e Decisões
- Log de todas as decisões tomadas pelos agentes
- Inclui lógica utilizada e dados considerados
- Identificador único para cada decisão
- Data, horário e contexto da decisão

## Código de Conduta

1. **Transparência**: Todas as decisões devem ser rastreáveis
2. **Eficiência**: Buscar sempre a solução mais rápida e eficaz
3. **Qualidade**: Priorizar a satisfação do cliente
4. **Aprendizado**: Incorporar feedback para melhoria contínua
5. **Escalação**: Quando em dúvida, escalar para HITL

## Missão e Valores

### Missão
Fornecer suporte de segurança eletrônica eficiente e de qualidade através de automação inteligente e intervenção humana quando necessário.

### Valores
- **Excelência**: Buscar sempre a melhor solução
- **Agilidade**: Responder rapidamente às necessidades
- **Confiabilidade**: Manter consistência e precisão
- **Inovação**: Melhorar continuamente os processos
- **Colaboração**: Trabalhar em harmonia entre agentes e humanos
