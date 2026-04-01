# .agent - Agent Metadata & Configuration

## Purpose
Central location for agent specifications, skills, and runtime metadata.

## Directory Structure
- `spec/` - Agent blueprints, rules, and requirements
- `wiki/` - Stable domain knowledge and documentation  
- `links/` - External integrations and resource references
- `skills/` - Available agent skills and tools
- `state/` - Runtime state and checkpoints (ephemeral)

## Content Policy
- Specifications are version-controlled and immutable
- Wiki contains stable, reference documentation
- Skills are reusable, documented components
- State is ephemeral and can be safely deleted
- All metadata must be machine-readable and human-documented

## Usage
Orchestrators use this directory to:
- Understand agent capabilities and constraints
- Load domain knowledge and context
- Access available skills and tools
- Manage runtime state and checkpoints
- Configure agent behavior and policies
