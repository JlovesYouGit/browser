# Agentic Browser Workspace

A comprehensive, rule-based framework for autonomous web browsing, data extraction, and browser automation with strict safety and privacy controls.

## 🎯 Project Overview

This workspace implements an **agentic browser system** that can autonomously navigate, analyze, and interact with web content while maintaining enterprise-grade security and compliance. The architecture follows the **"runbook + workspace"** pattern where any agent can read and execute workflows without ambiguity.

## 🏗️ Architecture

### Core Workflow Stages

```
/workspace
├── 00_setup/        # Environment configuration and policies
├── 01_discovery/    # Crawling, scraping, link discovery
├── 02_enrichment/   # Page parsing, metadata, entities
├── 03_decision/     # Rules, scoring, routing logic
├── 04_actions/      # Form fills, clicks, automations
├── 05_reports/      # Logs, artifacts, dashboards
└── .agent/          # Agent metadata, skills, rules
```

### Backend/Frontend Separation

```
├── backend/         # Core agent engine and APIs
└── frontend/        # Vue.js native macOS application
```

## 📋 Key Features

### 🤖 Intelligent Automation
- **Autonomous Navigation**: Smart crawling with respect for robots.txt
- **Content Extraction**: Advanced data parsing and entity recognition
- **Decision Making**: Rule-based routing and prioritization
- **Browser Automation**: Secure form filling and interaction handling

### 🖥️ Native macOS Experience
- **Vue.js Frontend**: Modern, reactive UI with minimal boilerplate
- **Pinia State Management**: Official Vue state management solution
- **Electron Wrapper**: Native macOS desktop application
- **Less Styling**: Component-scoped styles with macOS design system

### 🔒 Security & Compliance
- **Rule-Based Control**: Comprehensive YAML rule engine
- **Privacy Protection**: GDPR and CCPA compliant data handling
- **Security Boundaries**: Sandboxed browser environments
- **Audit Trails**: Complete logging and monitoring

### 📊 Monitoring & Control
- **Real-time Dashboard**: Live monitoring of agent activities
- **Performance Metrics**: Comprehensive analytics and reporting
- **Error Handling**: Automated recovery and rollback mechanisms
- **Resource Management**: Memory, CPU, and network optimization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.9+ (for backend)
- Docker and Docker Compose
- PostgreSQL and Redis
- macOS 11+ (for native app)
- Xcode Command Line Tools

### Installation

1. **Clone the workspace**
   ```bash
   git clone <repository-url>
   cd agentic-browser-workspace
   ```

2. **Set up environment**
   ```bash
   cp 00_setup/config.yaml.example 00_setup/config.yaml
   # Edit configuration with your settings
   ```

3. **Install dependencies**
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend (Vue.js + Electron)
   cd ../frontend && npm install
   ```

4. **Start services**
   ```bash
   # Start backend services
   docker-compose up -d
   
   # Start frontend in development
   cd frontend && npm run electron:dev
   ```

5. **Access the application**
   - Native macOS app will launch automatically
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📖 Detailed Documentation

### Workspace Structure

#### **00_setup/** - Environment Configuration
- Environment variables and secrets management
- Global configuration settings
- Authentication tokens and API keys
- High-level usage policies

#### **01_discovery/** - Crawling & Link Discovery
- Seed URL management
- Crawling strategies and plans
- URL validation and filtering
- Crawl progress tracking

#### **02_enrichment/** - Content Processing
- HTML parsing and text extraction
- PDF processing and document analysis
- Entity recognition and metadata extraction
- Content quality assessment

#### **03_decision/** - Rules & Decision Logic
- Browser agent rules and constraints
- Scoring algorithms and prioritization
- Routing logic between stages
- Policy enforcement mechanisms

#### **04_actions/** - Browser Automation
- Playwright automation scripts
- Form filling and interaction handling
- Screenshot capture and verification
- Session management and state tracking

#### **05_reports/** - Monitoring & Reporting
- Execution logs and performance metrics
- Interactive dashboards and visualizations
- Generated artifacts and deliverables
- Historical data archiving

#### **.agent/** - Agent Metadata
- Agent specifications and capabilities
- Domain knowledge and documentation
- Available skills and tools
- Runtime state and checkpoints

### Configuration

#### Browser Rules (`03_decision/rules.yaml`)
```yaml
browser_rules:
  - stage: "01_discovery"
    allowed:
      domains: ["example.com", "*.org"]
      max_depth: 3
      max_pages_per_session: 500
    actions:
      allowed: ["collect_urls", "follow_links"]
      forbidden: ["login_unless_allowed_domain"]
```

#### Agent Specification (`.agent/spec/`)
- `goals.md` - Mission objectives and success metrics
- `rules.yaml` - Core agent behavior and constraints
- `tasks.md` - Detailed task breakdown by stage

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev              # Vite development server
npm run electron:dev      # Electron development mode
npm run build             # Build for production
npm run electron:build    # Build macOS app
npm run test              # Run tests
npm run test:ui           # Test UI with Vitest
```

### Backend Development
```bash
cd backend
npm run dev          # Development server
npm run test         # Run tests
npm run build        # Build for production
```

### Testing
```bash
# Run all tests
npm run test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 📊 Monitoring

### Key Metrics
- **Discovery Rate**: Pages found per hour
- **Extraction Accuracy**: Data quality precision/recall
- **Task Completion**: Success/failure rates
- **Resource Efficiency**: CPU, memory, network usage

### Dashboards
- **System Overview**: Real-time agent status
- **Performance Metrics**: Historical trends and analytics
- **Security Monitor**: Rule compliance and violations
- **Activity Feed**: Live agent actions and events

## 🔒 Security

### Safety Features
- **Rule Enforcement**: Comprehensive YAML-based rule engine
- **Sandboxing**: Isolated browser environments
- **Rate Limiting**: Polite crawling with configurable delays
- **Audit Logging**: Complete activity tracking

### Compliance
- **GDPR/CCPA**: Privacy-by-design data handling
- **Robots.txt**: Respect for website crawling policies
- **Authentication**: Secure credential management
- **Data Protection**: Encrypted storage and transmission

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit a pull request
5. Code review and merge

### Code Standards
- TypeScript for type safety
- ESLint + Prettier for code quality
- Comprehensive test coverage (90%+)
- Documentation for all public APIs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Reference](docs/api.md)
- [User Guide](docs/user-guide.md)
- [Developer Documentation](docs/developer.md)
- [Troubleshooting](docs/troubleshooting.md)

### Community
- [GitHub Issues](https://github.com/your-org/agentic-browser/issues)
- [Discord Community](https://discord.gg/your-server)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/agentic-browser)

---

**Built with ❤️ for autonomous web intelligence**
