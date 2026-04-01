# Code Review Guidelines & Standards

## 🎯 Review Philosophy

**"CI First, Human Second"** - Automated checks must pass before any human spends time on review. This ensures reviewers focus on **logic, architecture, and security** rather than formatting and basic issues.

## 📋 Review Process

### 1. Pre-Review Requirements
- ✅ All automated checks pass (tests, lint, security scan)
- ✅ Code coverage ≥ 80%
- ✅ Documentation updated
- ✅ PR description complete with testing notes
- ✅ No merge conflicts

### 2. Review Assignment
- **At least 1 reviewer** required for all PRs
- **Security review** required for sensitive changes
- **Architecture review** required for major refactors
- **Performance review** required for performance-critical code

### 3. Review Timeline
- **Small PRs (< 200 lines)**: Review within 4 hours
- **Medium PRs (200-500 lines)**: Review within 24 hours
- **Large PRs (> 500 lines)**: Consider splitting, review within 48 hours

### 4. Review Completion
- **Approve**: All feedback addressed
- **Request Changes**: Specific, actionable feedback
- **Comment**: Questions or suggestions
- **No LGTM**: Must address all change requests

## 🔍 Review Checklist

### ✅ Correctness
- [ ] **Logic is sound** - Code does what it claims
- [ ] **Edge cases handled** - Null, empty, error conditions
- [ ] **Error handling** - Proper try/catch, logging, user messages
- [ ] **Performance considered** - No obvious bottlenecks
- [ ] **Thread safety** - No race conditions or shared state issues

### ✅ Readability 
- [ ] **Self-documenting code** - Clear intent without comments
- [ ] **Meaningful names** - Variables, functions, classes
- [ ] **Consistent style** - Follows team conventions
- [ ] **Appropriate abstraction** - Right level of complexity
- [ ] **Comments add value** - Explain why, not what

### ✅ Security
- [ ] **Input validation** - All user inputs validated
- [ ] **No hardcoded secrets** - Keys, passwords, tokens
- [ ] **SQL injection safe** - Parameterized queries
- [ ] **XSS protection** - Output encoding where needed
- [ ] **Authentication/authorization** - Proper access controls
- [ ] **Error messages** - No sensitive information leaked

### ✅ Architecture
- [ ] **Follows patterns** - Established design patterns
- [ ] **Appropriate dependencies** - Minimal, well-chosen
- [ ] **Low coupling** - Minimal dependencies between modules
- [ ] **High cohesion** - Related functionality grouped
- [ ] **Testable code** - Can be easily unit tested
- [ ] **Documentation** - API docs, README updated

### ✅ Testing
- [ ] **Unit tests** - Cover new functionality
- [ ] **Integration tests** - Component interactions
- [ ] **Edge case tests** - Boundary conditions
- [ ] **Error scenarios** - Failure modes tested
- [ ] **Performance tests** - If performance-critical
- [ ] **Security tests** - Authentication, validation

## 🚫 Review Anti-Patterns

### ❌ What NOT to Focus On
- **Formatting issues** - Let Prettier/ESLint handle
- **Minor style preferences** - Follow automated standards
- **Personal coding style** - Use team conventions
- **Nitpicking** - Focus on substantive issues
- **Blame** - Collaborative, constructive feedback

### ❌ Poor Review Practices
- **"Looks good to me"** without detailed review
- **Delaying review** without explanation
- **Requesting major changes** late in process
- **Ignoring security implications**
- **Reviewing too quickly** - miss important issues

## 📝 Review Comments Guidelines

### ✅ Good Comments
```markdown
# Specific and actionable
Consider using parameterized queries here to prevent SQL injection:
```typescript
// Instead of:
const query = `SELECT * FROM users WHERE id = ${userId}`
// Use:
const query = 'SELECT * FROM users WHERE id = ?'
```

# Explain the "why"
This approach could lead to memory leaks because the event listener isn't cleaned up. Consider using useEffect cleanup.

# Provide alternatives
Have you considered using a Map instead of an object for better performance with frequent lookups?
```

### ❌ Poor Comments
```markdown
# Vague and unhelpful
"This doesn't look right."

# Formatting issues (let tools handle)
"Add spaces here."

# Personal preferences
"I would have written this differently."
```

## 🔄 Review Workflow

### 1. Automated Checks First
```bash
# These must pass before human review
npm run lint
npm run test
npm run build
npm audit
```

### 2. Human Review Process
1. **Understand the context** - Read PR description, issues
2. **Review the code** - Line by line analysis
3. **Check tests** - Ensure adequate coverage
4. **Verify security** - Check for vulnerabilities
5. **Validate architecture** - Ensure good design
6. **Provide feedback** - Clear, actionable comments

### 3. Post-Review Actions
- **Author addresses feedback** - Respond to each comment
- **Reviewer verifies fixes** - Re-review if needed
- **Approval** - Merge when all requirements met
- **Documentation** - Update any relevant docs

## 📊 Review Metrics

### Quality Metrics
- **Review Time**: Average time from PR to review
- **Cycle Time**: Time from PR to merge
- **Revisions**: Number of revision cycles
- **Defect Density**: Bugs found post-merge

### Performance Targets
- **Review Response**: < 24 hours for 90% of PRs
- **Merge Time**: < 48 hours for 90% of PRs
- **Revisions**: < 3 cycles for 80% of PRs
- **Post-merge defects**: < 5% of PRs

## 🎓 Review Training

### New Reviewer Onboarding
1. **Review guidelines** - Read this document
2. **Shadow reviews** - Observe experienced reviewers
3. **Paired reviews** - Review with mentor
4. **Independent reviews** - Start with simple PRs
5. **Complex reviews** - Graduate to challenging changes

### Ongoing Education
- **Monthly review workshops** - Share best practices
- **Code review retrospectives** - Improve process
- **Security training** - Stay updated on threats
- **Architecture discussions** - Design pattern reviews

## 🔧 Tool Integration

### GitHub Integration
- **Required checks**: Tests, lint, security scan
- **Review assignments**: Automatic based on expertise
- **Approval requirements**: Minimum 1 reviewer
- **Merge protection**: Branch protection rules

### Review Tools
- **SonarQube**: Code quality analysis
- **CodeClimate**: Automated review suggestions
- **DeepCode**: AI-powered code review
- **GitHub CodeQL**: Security vulnerability detection

## 🚀 Special Review Types

### Security Review
Required for:
- Authentication/authorization changes
- Data handling modifications
- API endpoint changes
- Database schema changes
- External integrations

### Performance Review
Required for:
- Algorithm changes
- Database query modifications
- Memory-intensive operations
- Network request changes
- UI performance updates

### Architecture Review
Required for:
- Major refactors
- New feature modules
- Dependency changes
- Design pattern updates
- API design changes

## 📋 Emergency Review Process

### Critical Security Issues
1. **Immediate review** - Drop everything else
2. **Fast-track merge** - Bypass normal process
3. **Retroactive review** - Document lessons learned
4. **Process improvement** - Update guidelines

### Production Hotfixes
1. **Minimal review** - Focus on correctness
2. **Automated testing** - Must pass
3. **Quick merge** - Deploy to production
4. **Full review** - Follow-up with proper review

---

**Last Updated**: 2026-04-01  
**Next Review**: 2026-07-01  
**Owners**: Development Team, Quality Assurance Team
