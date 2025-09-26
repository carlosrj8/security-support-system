-- Security Support System - Supabase Database Schema
-- Execute este script no SQL Editor do Supabase para criar todas as tabelas

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
CREATE TYPE agent_type AS ENUM ('client', 'technician', 'validator', 'hitl', 'system');
CREATE TYPE agent_status AS ENUM ('active', 'inactive', 'training', 'maintenance');
CREATE TYPE case_status AS ENUM ('created', 'in_progress', 'waiting_customer', 'waiting_technician', 'resolved', 'cancelled');
CREATE TYPE case_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE case_type AS ENUM ('camera_offline', 'alarm_issue', 'access_control', 'intercom', 'network', 'financial', 'other');
CREATE TYPE client_type AS ENUM ('bar', 'restaurant', 'store', 'condominium', 'office', 'other');
CREATE TYPE client_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE hitl_request_status AS ENUM ('pending', 'in_review', 'approved', 'rejected', 'expired');
CREATE TYPE hitl_request_type AS ENUM ('decision_approval', 'manual_update', 'escalation', 'configuration_change');

-- Create Agents table
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    agent_id VARCHAR(100) UNIQUE NOT NULL,
    type agent_type NOT NULL,
    status agent_status DEFAULT 'active',
    configuration JSONB,
    capabilities JSONB,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    parent_agent_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Clients table
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    client_id VARCHAR(50) UNIQUE NOT NULL,
    type client_type NOT NULL,
    status client_status DEFAULT 'active',
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address JSONB NOT NULL,
    contact JSONB NOT NULL,
    equipment JSONB DEFAULT '[]'::jsonb,
    technical_record JSONB,
    contract_info JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Cases table
CREATE TABLE cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    type case_type NOT NULL,
    status case_status DEFAULT 'created',
    priority case_priority DEFAULT 'medium',
    assigned_to UUID,
    assigned_to_type VARCHAR(50),
    created_by UUID NOT NULL,
    client_id UUID NOT NULL REFERENCES clients(id),
    details JSONB,
    history JSONB DEFAULT '[]'::jsonb,
    resolved_at TIMESTAMP,
    resolution_time INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create HITL Requests table
CREATE TABLE hitl_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    type hitl_request_type NOT NULL,
    status hitl_request_status DEFAULT 'pending',
    requesting_agent VARCHAR(50) NOT NULL,
    requesting_agent_id VARCHAR(100) NOT NULL,
    related_case_id UUID,
    related_client_id UUID,
    description TEXT NOT NULL,
    context JSONB,
    proposed_action JSONB NOT NULL,
    suggestions JSONB DEFAULT '[]'::jsonb,
    human_response TEXT,
    human_decision JSONB,
    expires_at TIMESTAMP NOT NULL,
    conversation JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_agents_type ON agents(type);
CREATE INDEX idx_agents_status ON agents(status);
CREATE INDEX idx_agents_agent_id ON agents(agent_id);

CREATE INDEX idx_clients_client_id ON clients(client_id);
CREATE INDEX idx_clients_type ON clients(type);
CREATE INDEX idx_clients_status ON clients(status);

CREATE INDEX idx_cases_client_id ON cases(client_id);
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_priority ON cases(priority);
CREATE INDEX idx_cases_type ON cases(type);
CREATE INDEX idx_cases_assigned_to ON cases(assigned_to);
CREATE INDEX idx_cases_created_at ON cases(created_at);

CREATE INDEX idx_hitl_requests_status ON hitl_requests(status);
CREATE INDEX idx_hitl_requests_type ON hitl_requests(type);
CREATE INDEX idx_hitl_requests_requesting_agent ON hitl_requests(requesting_agent);
CREATE INDEX idx_hitl_requests_expires_at ON hitl_requests(expires_at);

-- Create triggers to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON cases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hitl_requests_updated_at BEFORE UPDATE ON hitl_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO agents (name, agent_id, type, configuration, capabilities) VALUES
('Case Generator Agent', 'agent-case-generator', 'system', 
 '{"caseTypes": ["camera_offline", "alarm_issue", "access_control"], "generationInterval": 300, "maxCasesPerHour": 10}',
 '["case_generation", "template_management"]'),
('Client Interaction Agent', 'agent-client-interaction', 'client',
 '{"responseTimeout": 900, "maxQuestions": 3, "supportedChannels": ["whatsapp", "email", "web"]}',
 '["client_communication", "problem_identification", "case_routing"]'),
('Main Decision Agent', 'agent-main-decision', 'system',
 '{"decisionTimeout": 600, "escalationThreshold": 3, "priorityMatrix": {"critical": 1, "high": 2, "medium": 3, "low": 4}}',
 '["decision_making", "case_analysis", "technician_dispatch"]'),
('Agent Validator', 'agent-validator', 'validator',
 '{"analysisInterval": 3600, "performanceThresholds": {"responseTime": 300, "resolutionRate": 0.8}}',
 '["performance_monitoring", "quality_assurance", "reporting"]'),
('HITL Coordinator', 'agent-hitl-coordinator', 'hitl',
 '{"escalationRules": ["cost > 1000", "vip_client", "unknown_problem"], "notificationChannels": ["whatsapp", "telegram"]}',
 '["human_coordination", "decision_escalation", "approval_management"]');

INSERT INTO clients (name, client_id, type, email, phone, address, contact, technical_record, contract_info) VALUES
('Restaurant ABC', 'CLI123456789', 'restaurant', 'contact@restaurantabc.com', '+55 11 99999-9999',
 '{"street": "Rua das Flores", "number": "123", "neighborhood": "Centro", "city": "São Paulo", "state": "SP", "zipCode": "01234-567"}',
 '{"primaryName": "João Silva", "primaryPhone": "+55 11 99999-9999", "primaryEmail": "joao@restaurantabc.com"}',
 '{"installationDate": "2023-06-15T00:00:00Z", "totalVisits": 5, "commonIssues": ["camera_offline"], "notes": ["Sistema instalado em junho/2023"]}',
 '{"contractNumber": "CONT-2023-001", "startDate": "2023-06-15T00:00:00Z", "serviceLevel": "premium", "monthlyFee": 299.90}'),
('Bar XYZ', 'CLI987654321', 'bar', 'info@barxyz.com', '+55 11 88888-8888',
 '{"street": "Av. Paulista", "number": "456", "neighborhood": "Bela Vista", "city": "São Paulo", "state": "SP", "zipCode": "01310-100"}',
 '{"primaryName": "Maria Santos", "primaryPhone": "+55 11 88888-8888", "primaryEmail": "maria@barxyz.com"}',
 '{"installationDate": "2023-08-20T00:00:00Z", "totalVisits": 2, "commonIssues": ["alarm_false_trigger"], "notes": ["Sistema básico instalado"]}',
 '{"contractNumber": "CONT-2023-002", "startDate": "2023-08-20T00:00:00Z", "serviceLevel": "basic", "monthlyFee": 149.90}');

-- Enable Row Level Security (RLS) - Opcional, para segurança adicional
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE hitl_requests ENABLE ROW LEVEL SECURITY;

-- Create policies (exemplo básico - ajuste conforme necessário)
CREATE POLICY "Enable read access for all users" ON agents FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated users" ON agents FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON clients FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated users" ON clients FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON cases FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated users" ON cases FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON hitl_requests FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated users" ON hitl_requests FOR ALL USING (auth.role() = 'authenticated');
