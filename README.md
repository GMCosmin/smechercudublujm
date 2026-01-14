# LinuxToken.com - Free Linux Learning Platform

A modern web application for learning Linux through a time-based token system. All content is completely free - you earn tokens by spending time on the platform, then use those tokens to unlock courses and learning materials.

## Features

- 🎓 **Free Learning Platform** - All Linux courses and content are free
- ⏱️ **Time-Based Tokens** - Earn 1 token per minute spent on the site
- 🔓 **Token Gating** - Unlock courses by spending tokens
- 💻 **Interactive Terminal** - Practice Linux commands in a safe environment
- 🎨 **Modern UI** - Beautiful, responsive design with dark mode support
- 📱 **Mobile Friendly** - Works seamlessly on all devices

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SmecherCuDubluJM
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Free Hosting & Testing

You can deploy and test this application for free on several platforms:

### Option 1: Vercel (Recommended - Made by Next.js creators)

1. **Push your code to GitHub** (if not already done)
2. Go to [vercel.com](https://vercel.com) and sign up/login with GitHub
3. Click "Add New Project"
4. Import your repository
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy" - your app will be live in minutes!

**Free tier includes:**
- Unlimited deployments
- Custom domain support
- Automatic HTTPS
- Global CDN
- Preview deployments for every push

**Your app will be available at:** `https://your-project-name.vercel.app`

### Option 2: Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### Option 3: Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects Next.js and deploys

### Option 4: Render

1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Click "Create Web Service"

### Quick Test Locally (Free)

You can also test locally for free right now:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. **Spend Time Learning**: Simply browse the platform and learn. Every minute you spend earns you 1 Linux Token.

2. **Earn Tokens**: Your tokens accumulate automatically in the background. The more time you spend learning, the more tokens you earn.

3. **Unlock Content**: Use your tokens to unlock courses. Each course has a token requirement based on its difficulty level:
   - Beginner courses: 10 tokens
   - Intermediate courses: 20 tokens
   - Advanced courses: 30 tokens

4. **Learn**: Access unlocked courses and practice Linux commands in the interactive terminal simulator.

## Project Structure

```
├── app/
│   ├── courses/          # Course listing and content pages
│   ├── terminal/         # Interactive terminal simulator
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/
│   ├── Navigation.tsx    # Main navigation component
│   ├── TokenDisplay.tsx  # Token balance display
│   └── TokenProvider.tsx # Token context provider
├── lib/
│   └── tokenSystem.ts    # Token management logic
└── package.json
```

## Token System

The token system tracks time spent on the platform using localStorage. Tokens are:
- Earned at a rate of 1 token per minute
- Updated every 30 seconds
- Persisted across browser sessions
- Used to unlock premium course content

## Features in Detail

### Courses Page
- Browse available Linux courses
- See token requirements for each course
- Unlock courses by spending tokens
- View course content after unlocking

### Terminal Simulator
- Practice Linux commands safely
- Interactive command history
- Simulated file system operations
- Help command for available commands

### Token Display
- Real-time token balance
- Total time spent tracking
- Always visible in top-right corner

## Roadmap & Future Improvements

### 🎯 Phase 1: Core Enhancements (High Priority)

#### Content & Courses
- [ ] **Expand Course Library**
  - Add 10+ more Linux courses covering:
    - Shell scripting (bash, zsh)
    - File permissions and ownership
    - Process management
    - Network configuration
    - Package management (apt, yum, pacman)
    - System services and systemd
    - Log management
    - Backup and recovery
    - Security basics
    - Docker and containers

- [ ] **Course Content Format**
  - Migrate from plain text to Markdown with proper rendering
  - Add syntax highlighting for code blocks
  - Include interactive code examples
  - Add images and diagrams
  - Create course progress tracking

- [ ] **Course Structure**
  - Break courses into lessons/modules
  - Add quizzes and exercises
  - Implement course completion certificates
  - Add prerequisites between courses

#### Terminal Simulator
- [ ] **Enhanced Terminal Features**
  - Implement a more realistic file system structure
  - Add more commands (grep, sed, awk, find, etc.)
  - Support command piping and redirection
  - Add file creation/editing capabilities
  - Implement directory navigation persistence
  - Add command autocomplete (tab completion)
  - Support multi-line commands
  - Add command aliases

- [ ] **Terminal Challenges**
  - Create guided exercises
  - Add challenge mode with specific goals
  - Implement progress tracking for terminal practice
  - Add hints system for stuck users

#### Token System Improvements
- [ ] **Token Features**
  - Add token earning animations/notifications
  - Implement token history/transaction log
  - Add bonus tokens for completing courses
  - Create token milestones and achievements
  - Add daily login bonuses
  - Implement token gifting (if multi-user)

- [ ] **Token Display**
  - Add token earning rate indicator
  - Show estimated time to unlock next course
  - Add token breakdown (earned vs spent)
  - Create token statistics dashboard

### 🚀 Phase 2: User Experience (Medium Priority)

#### UI/UX Enhancements
- [ ] **Design Improvements**
  - Add loading states and skeletons
  - Implement smooth page transitions
  - Add toast notifications for actions
  - Create better error handling and messages
  - Add keyboard shortcuts
  - Implement search functionality for courses
  - Add course filtering and sorting

- [ ] **Accessibility**
  - Improve ARIA labels
  - Add keyboard navigation
  - Ensure proper color contrast
  - Add screen reader support
  - Implement focus management

- [ ] **Mobile Experience**
  - Optimize token display for mobile
  - Improve terminal simulator for touch devices
  - Add mobile-specific navigation
  - Optimize course content for small screens

#### Features
- [ ] **Progress Tracking**
  - User profile page
  - Learning statistics dashboard
  - Course completion percentage
  - Time spent per course
  - Achievements and badges system

- [ ] **Social Features** (Optional)
  - Leaderboard (time spent, tokens earned)
  - Share achievements
  - Course recommendations
  - Community forum integration

- [ ] **Search & Discovery**
  - Full-text search across courses
  - Course tags and categories
  - Related courses suggestions
  - Popular courses section

### 🔧 Phase 3: Technical Improvements (Medium Priority)

#### Performance
- [ ] **Optimization**
  - Implement code splitting
  - Add lazy loading for courses
  - Optimize bundle size
  - Add service worker for offline support
  - Implement caching strategies

- [ ] **SEO**
  - Add proper meta tags
  - Implement Open Graph tags
  - Create sitemap.xml
  - Add structured data (JSON-LD)
  - Improve page load times

#### Code Quality
- [ ] **Testing**
  - Add unit tests for token system
  - Add integration tests for components
  - Add E2E tests for critical flows
  - Set up CI/CD pipeline
  - Add test coverage reporting

- [ ] **Documentation**
  - Add JSDoc comments
  - Create component documentation
  - Add API documentation (if backend added)
  - Create developer guide
  - Add contribution guidelines

- [ ] **Code Organization**
  - Refactor components for reusability
  - Create shared utilities
  - Add proper error boundaries
  - Implement proper TypeScript types
  - Add ESLint and Prettier configuration

### 🌟 Phase 4: Advanced Features (Low Priority)

#### Backend Integration (Optional)
- [ ] **If moving to backend:**
  - User authentication system
  - Database for course content
  - User progress synchronization
  - Multi-device token sync
  - Admin panel for course management
  - Analytics and usage tracking

#### Advanced Learning Features
- [ ] **Interactive Learning**
  - Code playground integration
  - Real terminal connection (sandboxed)
  - Video tutorials integration
  - Interactive diagrams
  - Step-by-step guided tutorials

- [ ] **Assessment**
  - Quiz system with multiple choice
  - Practical exams
  - Code challenges
  - Peer review system
  - Certification program

#### Content Management
- [ ] **CMS Features**
  - Markdown editor for courses
  - Course versioning
  - Content moderation tools
  - Translation support (i18n)
  - Content scheduling

### 🐛 Bug Fixes & Maintenance

- [ ] Fix any reported bugs
- [ ] Update dependencies regularly
- [ ] Security audits
- [ ] Performance monitoring
- [ ] Error tracking and logging
- [ ] Browser compatibility testing

### 📋 Quick Wins (Easy Tasks)

- [ ] Add more sample courses (quick content)
- [ ] Improve terminal command responses
- [ ] Add more terminal commands
- [ ] Enhance course card design
- [ ] Add course previews
- [ ] Implement course favorites/bookmarks
- [ ] Add "Continue Learning" section
- [ ] Create course categories/tags
- [ ] Add course difficulty indicators
- [ ] Implement course ratings

## Contributing

This is a learning platform project. We welcome contributions! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test your changes**: `npm run build` and `npm run dev`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Areas Needing Help

- **Content Creation**: Add more Linux courses and tutorials
- **Terminal Commands**: Expand the terminal simulator with more commands
- **UI/UX**: Improve the design and user experience
- **Documentation**: Help improve documentation
- **Testing**: Add tests to improve code quality
- **Bug Fixes**: Fix issues and improve stability

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add comments for complex logic
- Test your changes before submitting
- Update documentation if needed

## License

This project is open source and available for educational purposes.

## Notes

- Tokens are stored locally in the browser (localStorage)
- No backend or database required (currently)
- No user accounts or authentication needed (currently)
- Completely free and open-source
