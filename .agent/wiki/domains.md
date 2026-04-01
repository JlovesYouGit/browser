# Domain Knowledge and Policies

## Permitted Domains

### Educational and Research Domains
- `*.edu` - Educational institutions
- `*.org` - Non-profit organizations
- `*.gov` - Government websites
- `*.ac.*` - Academic institutions (country-specific)

### Technology and Development
- `github.com` - Code repositories and documentation
- `stackoverflow.com` - Programming Q&A
- `developer.mozilla.org` - Web development documentation
- `docs.python.org` - Python documentation
- `nodejs.org` - Node.js documentation
- `reactjs.org` - React documentation

### News and Media
- `bbc.com` - BBC News
- `cnn.com` - CNN News
- `reuters.com` - Reuters News Agency
- `ap.org` - Associated Press

### E-commerce (Limited)
- `amazon.com` - Product information only
- `ebay.com` - Public listings only

## Blocked Domains

### Malicious and Unsafe
- Any domain on malware/phishing blacklists
- Domains with poor SSL certificates
- Known spam and scam websites
- Domains serving malicious content

### Inappropriate Content
- Adult content websites
- Gambling sites
- Illegal content distribution
- Hate speech and extremist sites

### Privacy-Sensitive
- Social media platforms (user-generated content)
- Email services (Gmail, Outlook, etc.)
- Banking and financial services
- Healthcare portals (HIPAA protected)

## Domain-Specific Rules

### Social Media Platforms
**Status**: Mostly Blocked
- **Facebook**: Blocked - User privacy concerns
- **Twitter/X**: Limited - Public profiles only
- **LinkedIn**: Limited - Company pages only
- **Instagram**: Blocked - Image-heavy, privacy concerns

#### Exceptions:
- Public company pages and profiles
- Official brand accounts
- Public announcements and press releases

### E-commerce Platforms
**Status**: Limited Access
- **Product Pages**: Allowed for price monitoring
- **Search Results**: Allowed for product discovery
- **User Reviews**: Allowed for sentiment analysis
- **Checkout Process**: Blocked - Financial transactions

#### Rate Limits:
- Amazon: 1 request per 2 seconds
- eBay: 1 request per 3 seconds
- Other e-commerce: 1 request per 5 seconds

### News Websites
**Status**: Generally Allowed
- **Article Content**: Allowed for text extraction
- **Comments Sections**: Blocked - User-generated content
- **Paywall Content**: Blocked - Subscription required
- **Video Content**: Limited - Metadata only

#### Special Considerations:
- Respect paywall restrictions
- Do not bypass subscription barriers
- Limit article scraping to fair use
- Cache content to minimize repeated requests

### Academic and Research Sites
**Status**: Generally Allowed
- **Research Papers**: Allowed for abstract and metadata
- **University Websites**: Full access allowed
- **Online Libraries**: Limited - Public content only
- **Research Datasets**: Limited - Public datasets only

#### Access Protocols:
- Follow institutional access policies
- Respect copyright and licensing
- Use institutional access when available
- Cite sources appropriately

## Geographic Considerations

### Country-Specific Restrictions
- **China**: Great Firewall restrictions apply
- **EU**: GDPR compliance required
- **Russia**: Content filtering and monitoring
- **Iran**: Limited internet access

### Regional Content Rules
- **Language Support**: Prioritize English and major languages
- **Cultural Sensitivity**: Respect cultural norms and restrictions
- **Legal Compliance**: Follow local laws and regulations
- **Time Zones**: Consider time-based access patterns

## Content Type Policies

### Allowed Content Types
- **HTML Pages**: Full text and metadata extraction
- **PDF Documents**: Text extraction and analysis
- **JSON APIs**: Structured data access
- **XML Feeds**: RSS and structured data
- **Images**: Metadata extraction only
- **Videos**: Metadata and transcript extraction

### Restricted Content Types
- **Binary Files**: Executables, archives blocked
- **Large Media Files**: Size limits apply
- **Streaming Content**: Real-time access blocked
- **User-Generated Content**: Privacy concerns
- **Personal Data**: PII extraction blocked

## Rate Limiting by Domain

### High-Traffic Domains
```yaml
rate_limits:
  google.com:
    requests_per_second: 2
    burst_limit: 10
    daily_limit: 10000
  
  wikipedia.org:
    requests_per_second: 1
    burst_limit: 5
    daily_limit: 5000
  
  github.com:
    requests_per_second: 1
    burst_limit: 3
    daily_limit: 1000
```

### Standard Domains
```yaml
default_limits:
  requests_per_second: 0.5
  burst_limit: 2
  daily_limit: 500
  cooldown_minutes: 5
```

## Authentication Handling

### Public Access
- No authentication required
- Standard HTTP/HTTPS access
- Basic rate limiting applies

### API Access
- API key authentication required
- Higher rate limits for authenticated access
- Respect API terms of service
- Implement proper error handling

### Session-Based Access
- Handle session management
- Cookie persistence and renewal
- Login flow automation (when permitted)
- Session expiration handling

## Compliance and Legal

### GDPR Compliance
- Data minimization principles
- Purpose limitation compliance
- Storage limitation enforcement
- User rights respect

### CCPA Compliance
- California privacy law adherence
- Consumer rights implementation
- Data transparency requirements
- Opt-out mechanism respect

### Terms of Service
- Respect website ToS
- No circumvention of restrictions
- Proper attribution and citation
- Fair use principles

## Monitoring and Enforcement

### Automated Monitoring
- Real-time domain checking
- Blacklist integration
- Reputation scoring
- Automated blocking

### Manual Review Process
- Suspicious domain review
- Policy exception requests
- Compliance audit procedures
- Incident response protocols

### Reporting and Analytics
- Domain access statistics
- Violation tracking
- Performance metrics
- Compliance reporting
