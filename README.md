# Deven Shah Portfolio

> **Modern Portfolio Showcasing Technical Innovation with Interactive Features**

A cutting-edge personal portfolio built with **Next.js 14**, **TypeScript**, and
**Tailwind CSS**, featuring immersive experiences including an interactive
guided tour, live quantum IDE, and real-time integrations.

[![Live Site](https://img.shields.io/badge/Live-Portfolio-blue?style=for-the-badge&logo=vercel)](https://www.deven-shah.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/devenshah2018/deven-shah-portfolio)

---

## ✨ **Key Features**

### 🎯 **Interactive Guided Tour System**

- **Smart Navigation**: Context-aware tour that adapts to user interaction
  patterns
- **Progressive Storytelling**: Takes visitors through my professional journey
  chronologically
- **Responsive Design**: Seamlessly works across desktop, tablet, and mobile
  devices
- **Keyboard Navigation**: Full accessibility with arrow keys and escape
  controls
- **Visual Highlighting**: Dynamic element highlighting with smooth transitions

**Tour Highlights:**

- Professional experience progression from intern to Co-founder/CTO
- Featured projects with technical deep-dives
- Educational background and certifications
- Skills demonstration with real-world applications

### 🔬 **Qode Interactive IDE**

- **Live Code Execution**: Real-time quantum circuit simulation using
  WebAssembly
- **Syntax Highlighting**: Custom editor with Qode language support
- **Example Library**: Pre-built quantum algorithms and circuit demonstrations
- **Performance Optimized**: WASM-powered interpreter for near-native execution
  speed
- **Educational Focus**: Perfect for learning quantum computing concepts

**Supported Qode Operations:**

```qode
#> $Basic_Qubit_Operations
!X q1    # Pauli-X (NOT) gate
!H q1    # Hadamard gate (superposition)
!I q1    # Identity gate (measurement)
!Y q1    # Pauli-Y gate
!Z q1    # Pauli-Z gate
!S q1    # Phase gate
TERM     # Terminate program
```

### 🔗 **Real-Time Integrations**

#### **Cal.com Booking System**

- **Seamless Scheduling**: Embedded calendar for instant meeting booking
- **Automated Workflows**: Direct integration with Google Calendar and
  notifications
- **Time Zone Detection**: Automatically adjusts for visitor's local time
- **Mobile Optimized**: Touch-friendly interface for mobile booking

#### **Strava Athletic Dashboard**

- **Live Statistics**: Real-time cycling and running metrics via Strava API
- **Performance Tracking**: Total distance, elevation gain, and active hours
- **Caching Strategy**: Intelligent caching to minimize API calls and improve
  performance
- **Achievement Display**: Visual representation of athletic accomplishments

#### **GitHub Integration**

- **Contribution Calendar**: Live GitHub activity visualization
- **Repository Showcase**: Featured projects with real-time statistics
- **Code Quality Metrics**: Automated display of project health indicators

---

## 🏗️ **Technical Architecture**

### **Frontend Framework**

- **Next.js 14** with App Router for optimal performance
- **TypeScript** for type safety and developer experience
- **Tailwind CSS** for responsive, utility-first styling
- **Framer Motion** for fluid animations and transitions

### **Component Architecture**

- **Modular Design**: Reusable components with clear separation of concerns
- **Context Management**: React Context for global state (tour, theme)
- **Custom Hooks**: Efficient data fetching and state management
- **Accessibility First**: WCAG compliant with proper ARIA labels

### **Performance Optimizations**

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Dynamic imports for reduced bundle size
- **Caching Strategy**: Strategic use of localStorage and API caching
- **Lighthouse Score**: 100% Performance on desktop, 95+ on mobile

---

## 📱 **Features Deep Dive**

### **Guided Tour Implementation**

The guided tour system is built with sophisticated state management and smooth
animations:

- **Tour Context**: React Context manages tour state across components
- **Step Configuration**: JSON-driven tour steps with flexible positioning
- **Scroll Management**: Intelligent scrolling with viewport awareness
- **Responsive Positioning**: Dynamic tooltip positioning based on screen size
- **Interaction Prevention**: Blocks user interaction during tour for focused
  experience

### **Qode IDE Technical Details**

The quantum IDE represents a significant technical achievement:

- **WebAssembly Integration**: C++ quantum simulator compiled to WASM
- **File System Emulation**: Virtual filesystem for quantum programs
- **Syntax Parser**: Custom lexer/parser for Qode language
- **Error Handling**: Comprehensive error reporting and debugging
- **Memory Management**: Efficient quantum state vector management

---

## 🎨 **Design Philosophy**

### **Visual Design**

- **Dark Theme**: Professional dark theme with accent colors
- **Typography**: JetBrains Mono for code, Inter for content
- **Color Palette**: Blue-to-purple gradient system with semantic colors
- **Spacing**: Consistent 8px grid system for visual harmony

### **User Experience**

- **Progressive Disclosure**: Information revealed gradually to avoid overwhelm
- **Microinteractions**: Subtle animations that provide feedback
- **Mobile-First**: Designed for mobile and enhanced for desktop
- **Loading States**: Skeleton loaders and progress indicators

### **Accessibility**

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color contrast ratios
- **Focus Management**: Clear focus indicators and logical tab order

---

## 📊 **Project Statistics**

### **Performance Metrics**

- **Lighthouse Performance**: 95/100
- **First Contentful Paint**: < 0.7s
- **Largest Contentful Paint**: < 1.4s
- **Cumulative Layout Shift**: < 0.044

### **Code Quality**

- **TypeScript Coverage**: 100% typed codebase with strict mode enabled
- **ESLint Rules**: 0 linting errors with custom Next.js and React rules
- **Test Coverage**: Comprehensive component testing with Jest and React Testing
  Library
- **Bundle Analysis**: Optimized bundle size with tree-shaking and code
  splitting
- **Quality Checks**: Automated quality assurance with `npm run quality:check`
  - Type checking with TypeScript compiler
  - Linting enforcement with ESLint
  - Code formatting validation with Prettier
  - Test suite execution with Jest
  - Build verification and bundle analysis

### **Browser Support**

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+
- Mobile Safari 14+
- Chrome Mobile 90+

---

## 🚀 **Local Development**

### **Getting Started**

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### **Accessing the Research Portal**

The research portal uses subdomain-based routing. In development, you can access it in several ways:

#### **Option 1: Subdomain (Chrome/Firefox)**
- Main site: `http://localhost:3000`
- Research portal: `http://research.localhost:3000`

#### **Option 2: Path-based (Safari/All Browsers)**
Safari doesn't support `localhost` subdomains by default. Use these alternatives:

- **Direct path**: `http://localhost:3000/research`
- **Query parameter**: `http://localhost:3000/research?subdomain=research`

#### **Option 3: Configure /etc/hosts (Safari)**
For Safari to work with subdomains, add this to `/etc/hosts`:

```bash
# Edit hosts file (requires sudo)
sudo nano /etc/hosts

# Add this line:
127.0.0.1 research.localhost
```

Then access: `http://research.localhost:3000`

**Note**: After editing `/etc/hosts`, you may need to:
- Clear Safari's DNS cache: `dscacheutil -flushcache`
- Restart Safari

---

## 🔧 **Development Tools**

### **Code Quality**

- **ESLint**: Comprehensive linting with custom rules
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for quality enforcement
- **TypeScript**: Strict type checking configuration

### **Development Experience**

- **Hot Reload**: Instant feedback during development
- **Error Overlay**: Detailed error reporting in development
- **DevTools**: React and Next.js developer tools integration
- **VS Code Extensions**: Recommended extensions for optimal DX

---
