# Security Support System - Multi-Agent Platform

A comprehensive multi-agent system for managing electronic security support operations, including client interactions, technician dispatch, and automated problem resolution.

## 🎯 System Overview

This platform implements a sophisticated multi-agent architecture designed to automate and optimize security support operations for bars, restaurants, stores, and condominiums. The system handles everything from case generation to technician dispatch, with human oversight when needed.

### 🤖 Core Modules

1. **Case Generator Agent** - Generates realistic support cases based on operational patterns
2. **Client Module Agent** - Manages multi-channel client interactions (WhatsApp, Email, Web)
3. **Main Decision Agent** - Handles intelligent routing, prioritization, and scheduling
4. **Partner Technician Module** - Manages field technician dispatch and communication
5. **Agent Validator** - Monitors system performance and validates agent decisions
6. **HITL Module** - Human-in-the-Loop oversight for complex decisions

### 🏗️ Technical Architecture

- **Frontend**: React.js with TypeScript + Material-UI
- **Backend**: Node.js with NestJS framework
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.io for live updates
- **AI/ML**: OpenAI API integration for intelligent decision making
- **Authentication**: JWT-based security
- **Deployment**: Docker + Kubernetes ready

## ✨ Key Features

### 🎛️ Agent Configuration Interface
- Visual agent management with AI-powered insights
- Real-time configuration updates
- Performance monitoring and optimization suggestions
- Capability management and status tracking

### 📋 Intelligent Case Management
- Automated case generation and routing
- Priority-based scheduling
- Historical analysis and pattern recognition
- Real-time case tracking and updates

### 👥 Client Management
- Multi-channel communication support
- Technical record maintenance
- Equipment tracking and history
- Service level management

### 🔄 HITL (Human-in-the-Loop) System
- Automated escalation for complex decisions
- Approval workflows for high-impact actions
- Decision tracking and audit trails
- WhatsApp/Telegram integration for notifications

### 📊 Advanced Analytics
- Real-time dashboard with KPIs
- Performance metrics and trends
- Automated reporting
- System health monitoring

## 🚀 Quick Start

### 🌐 Deploy em Produção (Recomendado)
**Tempo: ~15 minutos | Custo: Gratuito**

1. **📋 Siga o guia rápido**: [`QUICK-START.md`](QUICK-START.md)
2. **🗄️ Configure Supabase**: Banco PostgreSQL gratuito
3. **🌐 Deploy no Vercel**: Hospedagem gratuita com GitHub
4. **✅ Acesse sua aplicação**: URL personalizada do Vercel

### 💻 Desenvolvimento Local
**Para desenvolvedores que querem modificar o código**

#### Prerequisites
- Node.js 18.0.0 or higher
- Conta no Supabase (gratuita)
- npm 8.0.0 or higher

#### Installation

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd security-support-system
   npm run init
   ```

2. **Configure Supabase**
   - Crie projeto em [supabase.com](https://supabase.com)
   - Execute `supabase/init.sql` no SQL Editor
   - Atualize credenciais em `backend/.env`

3. **Start Development**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

## 📁 Project Structure

```
security-support-system/
├── 📱 frontend/                 # React TypeScript Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Main application pages
│   │   ├── services/          # API service layer
│   │   └── types/             # TypeScript definitions
│   └── public/                # Static assets
├── 🔧 backend/                 # NestJS Backend API
│   ├── src/
│   │   ├── modules/           # Feature modules
│   │   │   ├── agent/         # Agent management
│   │   │   ├── case/          # Case handling
│   │   │   ├── client/        # Client management
│   │   │   └── hitl/          # Human oversight
│   │   └── common/            # Shared utilities
├── 📚 docs/                    # Documentation
│   ├── agent-manual.md        # Agent operation manual
│   ├── technical-manual.md    # Technical procedures
│   └── service-manual.md      # Service protocols
└── 🛠️ scripts/                # Utility scripts
```

## 🎮 Usage Guide

### Agent Configuration
1. Navigate to **Agent Configuration** page
2. View all active agents and their status
3. Click **Configure** to modify agent parameters
4. Use **AI Insight** buttons for optimization suggestions
5. Save changes and monitor performance

### Case Management
1. Access **Case Management** dashboard
2. View all cases with filtering options
3. Click **View** to see detailed case history
4. Generate test cases for system validation
5. Monitor resolution times and patterns

### Client Management
1. Go to **Client Management** section
2. View client database with search/filter
3. Access detailed client profiles
4. Review technical records and equipment
5. Add new clients or update existing ones

### HITL Operations
1. Monitor **HITL Management** for pending requests
2. Review agent recommendations and context
3. Approve or reject with detailed feedback
4. Track decision history and outcomes
5. Configure notification preferences

## 🔧 Configuration

### Agent Parameters
Each agent can be configured with specific parameters:

- **Response Timeouts**: Customize wait times
- **Priority Matrices**: Define urgency levels
- **Escalation Rules**: Set HITL triggers
- **Communication Channels**: Enable/disable channels
- **AI Thresholds**: Adjust decision confidence levels

### System Integration
- **WhatsApp Business API**: Client communication
- **Telegram Bot**: HITL notifications
- **OpenAI API**: Intelligent decision making
- **MongoDB**: Data persistence
- **Email Services**: Automated notifications

## 📊 Monitoring & Analytics

### Real-time Dashboard
- Active agents status
- Case volume and resolution rates
- Client satisfaction metrics
- System performance indicators

### Automated Reports
- Daily operations summary
- Weekly trend analysis
- Monthly performance review
- Custom report generation

## 🛡️ Security & Compliance

### Data Protection
- JWT-based authentication
- Role-based access control
- Data encryption at rest and in transit
- LGPD/GDPR compliance ready

### Audit Trail
- Complete action logging
- Decision traceability
- Performance monitoring
- Compliance reporting

## 🚀 Deployment

### 🌐 Vercel + Supabase (Recomendado)
```bash
# 1. Configure Supabase (execute supabase/init.sql)
# 2. Suba para GitHub
git add . && git commit -m "Initial commit" && git push

# 3. Deploy no Vercel (conecte GitHub)
# 4. Configure variáveis de ambiente
# 5. Acesse sua aplicação!
```

### 💻 Development Local
```bash
npm run init  # Configuração inicial
npm run dev   # Desenvolvimento
```

### 🐳 Docker (Opcional)
```bash
npm run build
docker-compose up -d
```

**Guias Detalhados:**
- **[QUICK-START.md](QUICK-START.md)** - Deploy rápido (15 min)
- **[GITHUB-SETUP.md](GITHUB-SETUP.md)** - Como subir para GitHub
- **[VERCEL-SUPABASE-SETUP.md](VERCEL-SUPABASE-SETUP.md)** - Deploy detalhado
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Outras opções de deploy

## 📖 Documentation

- **[Agent Manual](docs/agent-manual.md)** - Complete agent operation guide
- **[Technical Manual](docs/technical-manual.md)** - Equipment and maintenance procedures
- **[Service Manual](docs/service-manual.md)** - Service protocols and solutions
- **[Deployment Guide](DEPLOYMENT.md)** - Installation and deployment instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

- **Technical Support**: support@company.com
- **Emergency Hotline**: +55 11 9999-9999
- **Documentation**: docs@company.com

## 📄 License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ for the security industry**
