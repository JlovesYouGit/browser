# Attribution and Licensing

This document outlines the attributions, licenses, and acknowledgments for third-party components, assets, and dependencies used in the Agentic Browser project.

## 📦 Third-Party Components

### shadcn/ui Components

**Source**: [shadcn/ui](https://ui.shadcn.com/)  
**License**: [MIT License](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)  
**Description**: High-quality, accessible UI components built with Radix UI and Tailwind CSS.

#### Used Components:
- **Button**: Interactive button components with variants
- **Card**: Container components with consistent styling
- **Input**: Form input components with validation states
- **Label**: Form label components with accessibility features
- **Badge**: Small status indicator components
- **Dialog**: Modal dialog components
- **Dropdown Menu**: Context menu components
- **Toast**: Notification components
- **Switch**: Toggle switch components
- **Tabs**: Tab navigation components

#### Integration:
- Components have been adapted for Vue.js 3 with TypeScript
- Styled with custom theme system and macOS design language
- Enhanced with glass morphism effects and animations
- Integrated with Tailwind CSS and custom CSS variables

#### License Compliance:
```text
MIT License

Copyright (c) 2023 shadcn-ui

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📸 Photography and Images

### Unsplash Photos

**Source**: [Unsplash](https://unsplash.com)  
**License**: [Unsplash License](https://unsplash.com/license)  
**Description**: High-quality, royalty-free photography for various use cases.

#### Used Photos:
- **Background Images**: Hero section and landing page backgrounds
- **Demo Screenshots**: Application interface demonstrations
- **User Avatars**: Profile and user representation images
- **Iconography**: Custom icon illustrations and graphics

#### Attribution Requirements:
Unsplash photos do not require attribution, but we credit the photographers when possible:

- Photo by [Photographer Name] on Unsplash
- All photos are free for commercial and non-commercial use
- No attribution required, but appreciated

#### License Terms:
```text
Unsplash License

Unsplash grants you an irrevocable, nonexclusive, worldwide copyright license
to download, copy, modify, distribute, perform, and use photos from Unsplash for
free, including for commercial purposes, without permission from or attributing
the photographer or Unsplash. This license does not include the right to
compile photos from Unsplash to replicate a similar or competing service.
```

## 🎨 Design System and UI Frameworks

### Tailwind CSS

**Source**: [Tailwind CSS](https://tailwindcss.com/)  
**License**: [MIT License](https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE)  
**Usage**: Utility-first CSS framework for rapid UI development

### Radix UI

**Source**: [Radix UI](https://www.radix-ui.com/)  
**License**: [MIT License](https://github.com/radix-ui/primitives/blob/main/LICENSE)  
**Usage**: Low-level UI primitives for accessible component development

### Lucide Icons

**Source**: [Lucide](https://lucide.dev/)  
**License**: [ISC License](https://github.com/lucide-icons/lucide/blob/main/LICENSE)  
**Usage**: Beautiful & consistent icon toolkit

### Vue.js

**Source**: [Vue.js](https://vuejs.org/)  
**License**: [MIT License](https://github.com/vuejs/core/blob/main/LICENSE)  
**Usage**: Progressive JavaScript framework for building user interfaces

## 🔧 Development Tools and Libraries

### Vite

**Source**: [Vite](https://vitejs.dev/)  
**License**: [MIT License](https://github.com/vitejs/vite/blob/main/LICENSE)  
**Usage**: Next generation frontend tooling

### Vitest

**Source**: [Vitest](https://vitest.dev/)  
**License**: [MIT License](https://github.com/vitest-dev/vitest/blob/main/LICENSE)  
**Usage:**
  Fast unit testing framework

### TypeScript

**Source**: [TypeScript](https://www.typescriptlang.org/)  
**License**: [Apache License 2.0](https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt)  
**Usage:**
  Typed JavaScript for improved development experience

### ESLint

**Source**: [ESLint](https://eslint.org/)  
**License**: [MIT License](https://github.com/eslint/eslint/blob/main/LICENSE)  
**Usage:**
  Pluggable JavaScript linter

### Prettier

**Source**: [Prettier](https://prettier.io/)  
**License**: [MIT License](https://github.com/prettier/prettier/blob/main/LICENSE)  
**Usage:**
  Opinionated code formatter

## 🧪 Testing and Quality Assurance

### Vue Test Utils

**Source**: [Vue Test Utils](https://test-utils.vuejs.org/)  
**License**: [MIT License](https://github.com/vuejs/test-utils/blob/main/LICENSE)  
**Usage:**
  Testing utility library for Vue.js

### Playwright

**Source**: [Playwright](https://playwright.dev/)  
**License**: [Apache License 2.0](https://github.com/microsoft/playwright/blob/main/LICENSE)  
**Usage:**
  End-to-end testing framework

### SonarQube

**Source**: [SonarQube](https://www.sonarqube.org/)  
**License**: [LGPL v3](https://github.com/SonarSource/sonarqube/blob/master/LICENSE)  
**Usage:**
  Continuous code quality inspection

## 🔒 Security and Dependency Management

### Snyk

**Source**: [Snyk](https://snyk.io/)  
**License**: [Apache License 2.0](https://github.com/snyk/snyk/blob/master/LICENSE)  
**Usage:**
  Vulnerability scanning and dependency management

### OWASP ZAP

**Source**: [OWASP ZAP](https://www.zaproxy.org/)  
**License**: [Apache License 2.0](https://github.com/zaproxy/zaproxy/blob/main/LICENSE)  
**Usage:**
  Dynamic application security testing

## 📊 Analytics and Monitoring

### SonarCloud

**Source**: [SonarCloud](https://sonarcloud.io/)  
**License**: [Commercial](https://sonarcloud.io/about/pricing)  
**Usage:**
  Cloud-based code quality and security analysis

## 🎯 Custom Components and Modifications

### Browser Chrome Component

**Original Inspiration**: macOS Safari browser interface  
**Modifications**: 
  - Converted to Vue.js 3 with TypeScript
  - Enhanced with glass morphism effects
  - Added macOS native window controls
  - Integrated with custom theme system

### Glass Chat Box Component

**Original Inspiration**: Modern chat interfaces  
**Modifications**:
  - Implemented with Vue 3 Composition API
  - Added glass morphism design with backdrop blur
  - Custom animations and transitions
  - TypeScript interfaces for type safety

### Dotted Wave Background

**Original Inspiration**: Generative art patterns  
**Modifications**:
  - SVG-based animated background
  - Multi-layered wave effects
  - Performance optimized with requestAnimationFrame
  - Responsive and accessibility compliant

## 📜 License Summary

### Project License

This project is licensed under the **MIT License** unless otherwise specified for individual components.

```text
MIT License

Copyright (c) 2026 Agentic Browser Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Third-Party License Compatibility

All third-party dependencies used in this project are compatible with the MIT License:

- ✅ **MIT License**: shadcn/ui, Tailwind CSS, Vue.js, Vite, Vitest, ESLint, Prettier
- ✅ **Apache License 2.0**: TypeScript, Playwright, Snyk, OWASP ZAP
- ✅ **ISC License**: Lucide Icons
- ✅ **LGPL v3**: SonarQube (compatible for static analysis use)
- ✅ **Unsplash License**: Photography assets
- ✅ **Commercial**: SonarCloud (SaaS service)

## 🙏 Acknowledgments

### Core Contributors
- **Vue.js Team**: For the excellent reactive framework
- **shadcn/ui Team**: For the high-quality component library
- **Tailwind CSS Team**: For the utility-first CSS framework
- **Radix UI Team**: For the accessible component primitives
- **Lucide Team**: For the beautiful icon set

### Design Inspiration
- **Apple Design Team**: For macOS design language and principles
- **Unsplash Photographers**: For high-quality photography assets
- **Figma Community**: For design inspiration and resources

### Security and Quality
- **OWASP Foundation**: For security best practices and tools
- **SonarSource**: For code quality analysis tools
- **Snyk Team**: For vulnerability scanning and management

## 📞 Contact and Support

For questions about licensing, attribution, or third-party dependencies:

- **Project Maintainers**: [Contact Information]
- **License Issues**: [Legal Contact]
- **Attribution Requests**: [Attribution Contact]

## 🔄 Updates and Maintenance

This attribution file is updated when:
- New third-party dependencies are added
- License terms change for existing dependencies
- Components are modified or enhanced
- New assets or resources are incorporated

**Last Updated**: 2026-04-01  
**Next Review**: 2026-07-01  
**Maintainers**: Development Team
