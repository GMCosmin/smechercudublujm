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

## Contributing

This is a learning platform project. Feel free to:
- Add more Linux courses
- Improve the terminal simulator
- Enhance the UI/UX
- Add new features

## License

This project is open source and available for educational purposes.

## Notes

- Tokens are stored locally in the browser (localStorage)
- No backend or database required
- No user accounts or authentication needed
- Completely free and open-source
