# Manual Técnico - Sistema de Suporte de Segurança Eletrônica

## Visão Geral Técnica

Este manual fornece informações técnicas detalhadas sobre equipamentos, procedimentos de manutenção e soluções para problemas comuns em sistemas de segurança eletrônica.

## 1. SISTEMAS DE CÂMERAS

### Tipos de Equipamentos
- **Câmeras IP**: 2MP, 4MP, 8MP
- **Câmeras Analógicas**: HD-TVI, HD-CVI, AHD
- **Câmeras Especiais**: PTZ, Fisheye, Térmica

### Problemas Comuns e Soluções

#### Câmera Sem Sinal
**Sintomas**: Tela preta ou "No Signal" no monitor
**Possíveis Causas**:
1. Problema de alimentação
2. Cabo de rede danificado
3. Configuração de IP incorreta
4. Switch com defeito

**Procedimentos de Diagnóstico**:
1. Verificar LED de status na câmera
2. Testar alimentação com multímetro (12V DC ou PoE)
3. Verificar continuidade do cabo de rede
4. Testar conectividade de rede (ping)
5. Verificar configurações de IP

**Soluções**:
- Substituir fonte de alimentação
- Trocar cabo de rede
- Reconfigurar endereço IP
- Substituir switch defeituoso

#### Imagem com Qualidade Ruim
**Sintomas**: Imagem borrada, com ruído ou distorcida
**Possíveis Causas**:
1. Lente suja ou danificada
2. Configuração de foco incorreta
3. Interferência eletromagnética
4. Cabo de baixa qualidade

**Procedimentos**:
1. Limpar lente com produto específico
2. Ajustar foco manualmente ou via software
3. Verificar proximidade de fontes de interferência
4. Testar com cabo de melhor qualidade

### Manutenção Preventiva
- **Mensal**: Limpeza de lentes e verificação de fixação
- **Trimestral**: Verificação de cabos e conexões
- **Semestral**: Atualização de firmware e backup de configurações
- **Anual**: Substituição preventiva de fontes e cabos críticos

## 2. SISTEMAS DE ALARME

### Componentes Principais
- **Central de Alarme**: Processamento e controle
- **Sensores**: PIR, Magnético, Infravermelho, Fumaça
- **Sirenes**: Interna e externa
- **Teclados**: Interface do usuário

### Problemas Comuns e Soluções

#### Disparos Falsos
**Sintomas**: Alarme dispara sem invasão real
**Possíveis Causas**:
1. Sensor mal posicionado
2. Sensibilidade muito alta
3. Interferência de animais/insetos
4. Variação de temperatura

**Procedimentos**:
1. Verificar posicionamento dos sensores
2. Ajustar sensibilidade
3. Instalar pet immunity se necessário
4. Verificar estabilidade da alimentação

#### Sistema Não Arma
**Sintomas**: Não é possível ativar o alarme
**Possíveis Causas**:
1. Zona em aberto
2. Problema na central
3. Bateria baixa
4. Falha de comunicação

**Soluções**:
1. Identificar e corrigir zona em aberto
2. Reset da central de alarme
3. Substituir bateria
4. Verificar linha telefônica/GSM

### Códigos de Erro Comuns
- **E01**: Falha na bateria
- **E02**: Problema na linha telefônica
- **E03**: Zona em curto
- **E04**: Falha no módulo GSM
- **E05**: Problema na sirene

## 3. CONTROLE DE ACESSO

### Equipamentos
- **Controladora**: Gerenciamento central
- **Leitores**: RFID, Biométrico, Teclado
- **Fechaduras**: Eletromagnética, Elétrica
- **Botões**: Saída de emergência

### Problemas Comuns

#### Porta Não Abre
**Diagnóstico**:
1. Verificar alimentação da fechadura
2. Testar cartão/biometria em outro leitor
3. Verificar configuração de usuário
4. Testar acionamento manual da fechadura

#### Leitor Não Responde
**Soluções**:
1. Verificar conexão Wiegand
2. Reset do leitor
3. Verificar alimentação (12V DC)
4. Atualizar firmware se necessário

## 4. SISTEMAS DE INTERFONE

### Tipos
- **Interfone Coletivo**: Prédios e condomínios
- **Interfone Individual**: Residências
- **Video Porteiro**: Com câmera integrada

### Manutenção
- Limpeza regular dos alto-falantes
- Verificação de cabos e conexões
- Teste de áudio e vídeo
- Atualização de firmware

## 5. INFRAESTRUTURA DE REDE

### Componentes
- **Switches**: PoE e não-PoE
- **Roteadores**: Conectividade internet
- **Cabos**: Cat5e, Cat6, Cat6a
- **Conectores**: RJ45, BNC

### Diagnóstico de Rede
1. **Teste de Conectividade**: ping, traceroute
2. **Verificação de Largura de Banda**: iperf
3. **Análise de Tráfego**: Wireshark
4. **Teste de Cabos**: Testador de rede

### Problemas de Rede Comuns
- **Perda de Pacotes**: Verificar qualidade dos cabos
- **Latência Alta**: Analisar congestionamento
- **Desconexões**: Verificar estabilidade da alimentação
- **Velocidade Baixa**: Testar largura de banda disponível

## 6. PROCEDIMENTOS DE INSTALAÇÃO

### Planejamento
1. **Levantamento do Local**: Medições e análise
2. **Projeto Técnico**: Desenho e especificações
3. **Lista de Materiais**: Quantidades e especificações
4. **Cronograma**: Etapas e prazos

### Instalação de Câmeras
1. **Posicionamento**: Altura, ângulo, cobertura
2. **Fixação**: Suportes adequados para cada superfície
3. **Cabeamento**: Rota protegida e organizada
4. **Configuração**: IP, qualidade, gravação
5. **Teste**: Verificação completa do funcionamento

### Instalação de Alarmes
1. **Central**: Local protegido e acessível
2. **Sensores**: Posicionamento estratégico
3. **Cabeamento**: 4 vias blindado
4. **Programação**: Zonas, tempos, códigos
5. **Teste**: Simulação de todos os cenários

## 7. FERRAMENTAS E EQUIPAMENTOS

### Ferramentas Básicas
- Furadeira com brocas variadas
- Alicate desencapador
- Alicate crimpar RJ45
- Testador de cabos
- Multímetro
- Chaves de fenda e Phillips
- Escada telescópica

### Equipamentos de Teste
- **Testador de CCTV**: Verificação de vídeo
- **Multímetro**: Medição elétrica
- **Testador de Rede**: Certificação de cabos
- **Gerador de Tom**: Identificação de cabos
- **Câmera de Inspeção**: Verificação de dutos

### Materiais Consumíveis
- Cabos de rede Cat6
- Conectores RJ45
- Abraçadeiras plásticas
- Fita isolante
- Silicone neutro
- Parafusos e buchas

## 8. SEGURANÇA NO TRABALHO

### EPIs Obrigatórios
- Capacete de segurança
- Óculos de proteção
- Luvas de segurança
- Calçado de segurança
- Cinto de segurança (trabalho em altura)

### Procedimentos de Segurança
1. **Análise de Risco**: Antes de iniciar qualquer trabalho
2. **Isolamento Elétrico**: Desligar energia quando necessário
3. **Trabalho em Altura**: Uso de EPI adequado
4. **Manuseio de Ferramentas**: Verificação antes do uso

## 9. DOCUMENTAÇÃO TÉCNICA

### Documentos Obrigatórios
- **As Built**: Desenho final da instalação
- **Manual do Usuário**: Instruções de operação
- **Certificado de Garantia**: Termos e condições
- **Relatório de Testes**: Verificações realizadas

### Registros de Manutenção
- Data e hora do atendimento
- Problema relatado
- Diagnóstico realizado
- Solução aplicada
- Peças substituídas
- Tempo de execução
- Assinatura do cliente

## 10. CONTATOS DE EMERGÊNCIA

### Suporte Técnico
- **Central de Atendimento**: 0800-XXX-XXXX
- **WhatsApp Técnico**: (11) 9XXXX-XXXX
- **Email Suporte**: suporte@empresa.com.br

### Fornecedores
- **Câmeras**: Fornecedor A - (11) XXXX-XXXX
- **Alarmes**: Fornecedor B - (11) XXXX-XXXX
- **Rede**: Fornecedor C - (11) XXXX-XXXX

### Emergências
- **Bombeiros**: 193
- **Polícia**: 190
- **SAMU**: 192
- **Defesa Civil**: 199

## Anexos

### A. Tabela de Códigos de Erro
### B. Diagramas de Conexão
### C. Especificações Técnicas
### D. Formulários de Manutenção
### E. Check-lists de Instalação
