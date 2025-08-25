# AI Time is Money - Project Structure

## Directory Organization

```
webapp/
├── public/                     # Static assets served by Cloudflare Workers
│   ├── css/                   # Stylesheets
│   │   ├── main.css          # Main stylesheet with imports
│   │   ├── base.css          # Reset, typography, utilities
│   │   ├── layout.css        # Background, navigation, footer
│   │   ├── components.css    # Buttons, cards, forms, modals  
│   │   └── pages.css         # Section-specific styles
│   ├── js/                   # JavaScript files
│   │   └── main.js          # Application logic and interactions
│   ├── images/               # Image assets
│   └── assets/               # Other assets (fonts, icons, etc.)
│
├── src/                      # Source code
│   ├── index.tsx            # Main Hono application
│   └── renderer.tsx         # JSX renderer with HTML template
│
├── dist/                     # Built application (generated)
├── node_modules/             # Dependencies (generated)
├── .git/                     # Git repository
├── .wrangler/               # Wrangler development files
│
├── .gitignore               # Git ignore rules
├── README.md                # Project documentation
├── STRUCTURE.md             # This file - project structure
├── ai-use-cases.md         # Comprehensive AI use cases database
├── ecosystem.config.cjs     # PM2 configuration for development
├── package.json             # NPM package configuration
├── package-lock.json        # NPM lock file
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
└── wrangler.jsonc          # Cloudflare configuration
```

## CSS Architecture

### Modular Approach
The CSS is organized into focused modules for maintainability:

1. **base.css** - Foundation styles
   - CSS reset and normalization
   - Typography scale and base styles
   - Utility classes for spacing, alignment
   - Grid system and container styles
   - Accessibility considerations

2. **layout.css** - Layout and structure
   - Background animations and themes
   - Navigation header and mobile menu
   - Footer design and responsive layout
   - Section background variants

3. **components.css** - Reusable UI components
   - Button styles and variants
   - Card layouts (feature, pricing, stats)
   - Form controls and inputs
   - Modal dialogs and overlays
   - Loading states and animations

4. **pages.css** - Page-specific styles
   - Hero section design
   - Features grid layout  
   - Pricing section styling
   - Calculator interface
   - Assessment form layout
   - Demo report presentation
   - Responsive breakpoints

### CSS Class Naming Convention

#### Component Classes
- `.btn` - Base button class
- `.btn-primary` - Primary button variant  
- `.btn-secondary` - Secondary button variant
- `.btn-large` - Large button size
- `.btn-block` - Full-width button

#### Layout Classes
- `.container` - Content container with max-width
- `.section` - Page section with standard padding
- `.grid` - CSS Grid container
- `.grid-2`, `.grid-3`, `.grid-4` - Grid column variants

#### Utility Classes
- `.text-center`, `.text-left`, `.text-right` - Text alignment
- `.mb-1`, `.mb-2`, `.mb-3`, `.mb-4` - Margin bottom
- `.gradient-text` - Gradient text effect
- `.bg-light`, `.bg-white`, `.bg-gradient` - Background variants

#### State Classes
- `.fade-in`, `.slide-up`, `.scale-in` - Animation states
- `.visible` - Trigger for animations
- `.loading` - Loading state styling

## JavaScript Organization

### main.js Structure
- **Global State Management** - Business type, employee count
- **Calculator Logic** - ROI calculations and updates
- **Form Handling** - Assessment form submission
- **Modal Management** - Demo reports and success messages
- **Animation Controllers** - Intersection observers, smooth scrolling
- **API Integration** - Fetch calls to backend endpoints
- **Utility Functions** - Helper functions and event handlers

## File Serving Routes

### Static File Routes
```javascript
// Hono route configuration
app.use('/css/*', serveStatic({ root: './public' }))    // CSS files
app.use('/js/*', serveStatic({ root: './public' }))     // JavaScript files  
app.use('/images/*', serveStatic({ root: './public' })) // Images
app.use('/assets/*', serveStatic({ root: './public' })) // Other assets
```

### URL Structure
- `/css/main.css` - Main stylesheet
- `/js/main.js` - Main JavaScript file
- `/images/logo.png` - Image assets
- `/assets/fonts/` - Font files

## Development Workflow

### Local Development
1. **Install Dependencies**: `npm install`
2. **Build Application**: `npm run build`
3. **Start Development**: `pm2 start ecosystem.config.cjs`
4. **View Application**: http://localhost:3000

### File Watching
- CSS changes require rebuild: `npm run build`
- JavaScript changes require rebuild: `npm run build`  
- Server restart: `pm2 restart webapp`

### Production Build
1. **Build**: `npm run build` (creates `/dist` folder)
2. **Deploy**: `wrangler pages deploy dist`

## Performance Considerations

### CSS Loading
- Single main.css file with CSS imports
- Minimal external dependencies
- Optimized for Cloudflare edge caching

### JavaScript Loading
- Single main.js file for reduced HTTP requests
- ES6+ features with modern browser support
- Lazy loading for non-critical features

### Image Optimization
- Use optimized formats (WebP, AVIF when supported)
- Proper sizing and compression
- Lazy loading for below-fold images

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Mobile-First Approach
- Base styles target mobile devices
- Progressive enhancement for larger screens
- Touch-friendly interface elements

## Accessibility Features

### Keyboard Navigation
- Focus styles for all interactive elements
- Logical tab order throughout interface
- Skip links for screen readers

### Screen Reader Support
- Semantic HTML structure
- ARIA labels and descriptions
- Alt text for images

### Visual Accessibility
- High contrast mode support
- Reduced motion preferences
- Scalable text and interface elements

## Browser Support

### Target Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced features with modern CSS/JS
- Graceful degradation for older browsers