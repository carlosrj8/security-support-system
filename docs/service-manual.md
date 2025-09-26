# Manual de Atendimento - Sistema de Suporte de Segurança Eletrônica

## Identificador: MA-001
## Versão: 1.0
## Data: Janeiro 2024

---

## 1. PROCEDIMENTOS GERAIS DE ATENDIMENTO

### 1.1 Recepção de Solicitações
**ID: PROC-001**

**Canais de Atendimento**:
- WhatsApp Business: Resposta em até 5 minutos
- Email: Resposta em até 30 minutos
- Portal Web: Resposta em até 15 minutos
- QR Code no local: Resposta imediata

**Procedimento**:
1. Identificar origem da solicitação através do token
2. Buscar dados do cliente no sistema
3. Aplicar árvore de identificação de problemas
4. Registrar caso no sistema com prioridade adequada

### 1.2 Identificação de Clientes
**ID: PROC-002**

**Métodos de Identificação**:
- **QR Code**: Instalado no local, contém ID único do cliente
- **WhatsApp**: Número cadastrado vinculado ao cliente
- **Email**: Endereço registrado no sistema
- **Portal Web**: Login com credenciais do cliente

**Validação**:
1. Verificar correspondência entre canal e cliente cadastrado
2. Confirmar dados básicos (nome, endereço)
3. Validar histórico de atendimentos recentes

---

## 2. ÁRVORE DE IDENTIFICAÇÃO DE PROBLEMAS

### 2.1 Primeira Pergunta - Categoria do Problema
**ID: TREE-001**

**Pergunta**: "Em qual área você precisa de suporte?"

**Opções**:
1. **Câmeras** → Ir para TREE-002
2. **Alarmes** → Ir para TREE-003
3. **Portas e Portões Automáticos** → Ir para TREE-004
4. **Interfone** → Ir para TREE-005
5. **Redes** → Ir para TREE-006
6. **Financeiro** → Ir para TREE-007
7. **Outros** → Ir para TREE-008

### 2.2 Problemas com Câmeras
**ID: TREE-002**

**Segunda Pergunta**: "Qual o problema específico com as câmeras?"
1. **Câmera sem sinal** → Ir para TREE-002A
2. **Imagem com qualidade ruim** → Ir para TREE-002B
3. **Câmera não grava** → Ir para TREE-002C
4. **Não consigo acessar remotamente** → Ir para TREE-002D

#### 2.2.1 Câmera Sem Sinal
**ID: TREE-002A**

**Terceira Pergunta**: "Qual o número da câmera que está sem sinal?"
- Validar com imagem pré-armazenada do canal
- Se confirmado → Gerar OS com ID: CAM-OFFLINE-001
- Se não confirmado → Orientar verificação do número

**Solução Padrão**: SOL-001

### 2.3 Problemas com Alarmes
**ID: TREE-003**

**Segunda Pergunta**: "Qual o problema com o sistema de alarme?"
1. **Disparos falsos** → SOL-002
2. **Não consegue armar** → SOL-003
3. **Sirene não funciona** → SOL-004
4. **Sensor com problema** → SOL-005

---

## 3. SOLUÇÕES CATALOGADAS

### 3.1 Câmera Offline
**ID: SOL-001**
**Categoria**: Câmeras
**Subcategoria**: Conectividade

**Diagnóstico Inicial**:
1. Verificar se outras câmeras estão funcionando
2. Confirmar se internet está funcionando no local
3. Verificar histórico de problemas na mesma câmera

**Ações Automáticas**:
- Consultar API de status da internet do cliente
- Verificar logs de conectividade da câmera
- Buscar casos similares no histórico

**Prioridade**: Alta (se entrada principal) / Média (demais locais)

**Tempo Estimado**: 60-90 minutos

**Peças Comuns**: Cabo de rede, fonte de alimentação, switch

**Histórico de Efetividade**: 85% resolvido na primeira visita

### 3.2 Alarme com Disparos Falsos
**ID: SOL-002**
**Categoria**: Alarmes
**Subcategoria**: Sensores

**Diagnóstico**:
1. Identificar zona que está disparando
2. Verificar histórico de disparos
3. Analisar condições ambientais

**Soluções Comuns**:
- Ajuste de sensibilidade do sensor
- Reposicionamento do sensor
- Limpeza de lentes/sensores
- Substituição de sensor defeituoso

**Prioridade**: Média

**Tempo Estimado**: 45-60 minutos

### 3.3 Sistema Não Arma
**ID: SOL-003**
**Categoria**: Alarmes
**Subcategoria**: Central

**Diagnóstico**:
1. Verificar display da central
2. Identificar zonas em aberto
3. Testar teclado e códigos

**Soluções**:
- Correção de zona em aberto
- Reset da central
- Substituição de bateria
- Reprogramação de códigos

**Prioridade**: Alta

**Tempo Estimado**: 30-45 minutos

---

## 4. MATRIZ DE PRIORIDADES

### 4.1 Critérios de Priorização
**ID: PRIOR-001**

**Crítica** (Atendimento em 2 horas):
- Sistema completamente offline
- Invasão detectada
- Incêndio ou emergência
- Estabelecimento sem segurança

**Alta** (Atendimento em 4 horas):
- Câmera principal offline
- Alarme não arma
- Controle de acesso não funciona
- Múltiplos equipamentos com problema

**Média** (Atendimento em 8 horas):
- Câmera secundária offline
- Disparos falsos esporádicos
- Qualidade de imagem ruim
- Problemas de acesso remoto

**Baixa** (Atendimento em 24 horas):
- Ajustes de configuração
- Treinamento de usuário
- Manutenção preventiva
- Atualizações de software

### 4.2 Fatores Modificadores
- **Tipo de Cliente**: Premium (+1 nível), Enterprise (+2 níveis)
- **Horário**: Noturno/Fim de semana (-1 nível)
- **Histórico**: Cliente problemático (+1 nível)
- **Sazonalidade**: Datas especiais (+1 nível)

---

## 5. AGENDAMENTO AUTOMÁTICO

### 5.1 Regras de Agendamento
**ID: SCHED-001**

**Horários Disponíveis**:
- Segunda a Sexta: 08:00 às 18:00
- Sábado: 08:00 às 12:00
- Domingo: Apenas emergências

**Tempo de Deslocamento**:
- Mesmo bairro: 30 minutos
- Bairros adjacentes: 45 minutos
- Outras regiões: 60 minutos

**Janela de Atendimento**:
- Crítica: Próximo horário disponível
- Alta: Dentro de 4 horas
- Média: Próximo dia útil
- Baixa: Conforme disponibilidade

### 5.2 Confirmação com Cliente
**ID: SCHED-002**

**Mensagem Padrão**:
"Seu reparo foi agendado com o técnico [NOME] (Matrícula: [MATRICULA]) para o dia [DATA] às [HORA]. Podemos confirmar a visita?"

**Política de Confirmação**:
- Aguardar resposta por 15 minutos
- Se não responder, perguntar novamente
- Oferecer alternativas de horário
- Máximo 3 tentativas de contato

**Política de Atendimento**:
- Técnico deve chegar no horário agendado
- Tolerância de 15 minutos
- Cliente deve ser avisado de atrasos
- Reagendamento automático se necessário

---

## 6. COMUNICAÇÃO COM TÉCNICOS

### 6.1 Formato da Mensagem
**ID: COMM-001**

**Template WhatsApp**:
```
🔧 NOVA OS - [PRIORIDADE]
Cliente: [NOME] ([ID])
Problema: [DESCRIÇÃO]
Endereço: [ENDEREÇO]
Horário: [DATA/HORA]

📋 Histórico Relevante:
[HISTÓRICO]

💡 Sugestões IA:
[SUGESTÕES]

Responda:
1️⃣ Realizar Atendimento
2️⃣ Solicitar Mais Informações  
3️⃣ Não Disponível
```

### 6.2 Respostas dos Técnicos
**ID: COMM-002**

**Opção 1 - Realizar Atendimento**:
- Sistema confirma automaticamente
- Envia detalhes completos da OS
- Atualiza agenda do técnico
- Notifica cliente sobre agendamento

**Opção 2 - Solicitar Mais Informações**:
- Sistema solicita especificação
- Técnico recebe informações adicionais
- Nova tentativa de agendamento
- Prazo de 30 minutos para resposta

**Opção 3 - Não Disponível**:
- OS redirecionada para próximo técnico
- Sistema atualiza disponibilidade
- Log de recusa registrado
- Busca alternativas automaticamente

---

## 7. ESCALAÇÃO PARA HITL

### 7.1 Situações que Requerem HITL
**ID: HITL-001**

**Escalação Obrigatória**:
- Custo estimado > R$ 1.000
- Cliente VIP com reclamação
- Problema técnico não catalogado
- Conflito entre técnico e cliente
- Alteração de procedimento padrão

**Escalação Recomendada**:
- Terceira recorrência do mesmo problema
- Cliente solicita desconto/compensação
- Equipamento fora de garantia
- Necessidade de upgrade de sistema

### 7.2 Formato da Solicitação HITL
**ID: HITL-002**

**Informações Obrigatórias**:
- Contexto completo da situação
- Ações já tomadas
- Opções disponíveis
- Recomendação do sistema
- Impacto no cliente
- Urgência da decisão

**Tempo de Resposta Esperado**:
- Crítico: 30 minutos
- Alto: 2 horas
- Médio: 4 horas
- Baixo: 24 horas

---

## 8. INDICADORES DE PERFORMANCE

### 8.1 KPIs Principais
**ID: KPI-001**

**Tempo de Resposta**:
- Meta: 95% em até 5 minutos (WhatsApp)
- Meta: 90% em até 30 minutos (Email)

**Taxa de Resolução na Primeira Visita**:
- Meta: 80% dos casos
- Medição mensal

**Satisfação do Cliente**:
- Meta: NPS > 70
- Pesquisa pós-atendimento

**Tempo Médio de Resolução**:
- Crítico: < 2 horas
- Alto: < 4 horas
- Médio: < 8 horas
- Baixo: < 24 horas

### 8.2 Relatórios Automáticos
**ID: REP-001**

**Diário**:
- Casos abertos/fechados
- Performance por técnico
- Problemas recorrentes
- Alertas de SLA

**Semanal**:
- Análise de tendências
- Efetividade das soluções
- Feedback dos clientes
- Sugestões de melhoria

**Mensal**:
- Relatório executivo
- ROI do sistema
- Benchmarking
- Plano de ações

---

## 9. CONTROLE DE VERSÕES

### 9.1 Histórico de Alterações

| Versão | Data | Alteração | Aprovado por |
|--------|------|-----------|--------------|
| 1.0 | Jan/2024 | Versão inicial | Sistema |

### 9.2 Próximas Revisões
- **Fev/2024**: Inclusão de novos tipos de equipamento
- **Mar/2024**: Atualização de tempos de SLA
- **Abr/2024**: Revisão de procedimentos HITL

---

## 10. APROVAÇÕES E ASSINATURAS

**Elaborado por**: Sistema Multi-Agente
**Revisado por**: [Pendente HITL]
**Aprovado por**: [Pendente HITL]

**Data de Vigência**: Janeiro 2024
**Próxima Revisão**: Abril 2024
