# Coding Museum

A retro newspaper-style programming language history museum showcasing the evolution of programming languages from the 1940s to the 2020s.

## Overview

The Coding Museum is a bilingual (Chinese/English) static website designed with a formal museum aesthetic and nostalgic feel. It presents the history of 10 influential programming languages across eight decades, formatted as a vintage newspaper or magazine.

## Features

- **Bilingual Support**: Chinese and English language options
- **Retro Design**: Newspaper/magazine style with vintage typography
- **Timeline Display**: Chronological journey through programming language history
- **Interactive Exhibits**: Detailed information cards for each language
- **Clean Architecture**: Pure static HTML/CSS/JS, no frameworks or build tools

## Project Structure

```
codingMuseum/
├── index.html          # Main HTML structure
├── style.css           # Retro newspaper styling
├── script.js           # Interactive functionality
├── assets/
│   ├── images/         # Language-related images and graphics
│   └── fonts/          # Custom fonts for vintage typography
├── .gitignore          # Git exclusions
└── README.md           # Project documentation
```

## Development Setup

This is a static website project. No build tools or dependencies are required.

### Local Development Server

To run the website locally, use Python's built-in HTTP server:

```bash
python3 -m http.server 8000
```

This will start a local development server at: http://localhost:8000

**Expected Output:**
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

**Troubleshooting:**
- If port 8000 is already in use, try a different port: `python3 -m http.server 8080`
- If `python3` is not found, try `python -m http.server 8000`
- To stop the server, press `Ctrl+C` in your terminal

### Alternative Development Methods

1. **Direct File Access**: Simply open `index.html` in a web browser (no server required)
2. **VS Code Live Server**: Install the "Live Server" extension and use "Go Live" button
3. **Other Static File Servers**: Any static file server (nginx, Apache, etc.) will work

### File Organization Conventions

- **index.html**: Main entry point, contains all HTML structure
- **style.css**: All styles including CSS variables, reset, and component styles
- **script.js**: All JavaScript functionality and interactivity
- **assets/images/**: Language-related images and graphics
- **assets/fonts/**: Custom fonts for vintage typography

### Development Tools and Testing

**Manual Browser Testing:**
1. Start the local server: `python3 -m http.server 8000`
2. Open http://localhost:8000 in your browser
3. Test different features and interactions
4. Make changes to code files
5. Refresh the browser to see changes (no live reload)

**Responsive Testing:**
- Use browser DevTools (F12) to test different screen sizes
- Toggle device toolbar in Chrome/Edge: DevTools > Toggle device toolbar (Ctrl+Shift+M)
- Test common breakpoints: mobile (375px), tablet (768px), desktop (1024px+)
- Test landscape and portrait orientations

**Browser Testing:**
- Chrome/Edge (most common)
- Firefox (for cross-browser compatibility)
- Safari (if available, for Apple ecosystem testing)

**No Automated Testing:**
- This project uses manual testing only
- No test frameworks or automation tools required
- Visual inspection and interactive testing are sufficient

## Design Philosophy

- **Minimal Dependencies**: Pure HTML, CSS, and JavaScript
- **Semantic Structure**: Well-organized HTML5 document
- **Responsive Layout**: Mobile-friendly design
- **Nostalgic Aesthetic**: Museum-quality retro newspaper styling

## Future Enhancements

- Language switcher implementation
- Interactive timeline navigation
- Detailed language exhibits with historical context
- Comparative language features
- Educational quizzes and interactive elements

## License

This project is created for educational purposes to showcase programming language history in an engaging, retro-styled format.