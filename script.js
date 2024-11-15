// Typing animation

const text = "I AM SIGMA";
let charIndex = 0;

document.addEventListener('DOMContentLoaded', async () => {
  // Hide the main content and retro text initially
  const container = document.querySelector('.container');
  const retroText = document.getElementById('retro-text');
  container.style.display = 'none';
  retroText.style.opacity = '0';

  // Start boot sequence
  const bootSequence = new BootSequence();
  await bootSequence.start();

  // After boot sequence, show container and start typing
  container.style.display = 'block';
  container.classList.add('fade-in');
  
  // Start the typing animation
  function typeText() {
    if (charIndex < text.length) {
      retroText.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeText, 100 + Math.random() * 100);
    } else {
      // After typing is complete, show terminal
      setTimeout(() => {
        gsap.to('.terminal-container', {
          opacity: 1,
          y: 0,
          duration: 1,
          onComplete: () => {
            startTerminalAnimation();
            initializeCommandInput();
          }
        });
      }, 500);
    }
  }

  // Make retro text visible and start typing
  retroText.style.opacity = '1';
  retroText.textContent = '';
  setTimeout(typeText, 500);
});

class BootSequence {
  constructor() {
    this.bootContainer = document.createElement('div');
    this.bootContainer.className = 'boot-sequence';
    document.body.appendChild(this.bootContainer);
    
    this.bootMessages = [
      { text: 'INITIALIZING SIGMA_OS v2.0...', delay: 100 },
      { text: 'PERFORMING MEMORY CHECK...', delay: 80 },
      { text: '[OK] 32GB SIGMA MINDSET CAPACITY DETECTED', delay: 100 },
      { text: 'LOADING CORE DRIVERS:', delay: 50 },
      { text: '  > GRINDSET.SYS', delay: 30 },
      { text: '  > FOCUS.DRV', delay: 30 },
      { text: '  > DISCIPLINE.DLL', delay: 30 },
      { text: '  > WEALTH.EXE', delay: 30 },
      { text: 'CHECKING BETA RESISTANCE LEVELS... [100%]', delay: 120, progress: true },
      { text: 'OPTIMIZING NEURAL PATHWAYS... [100%]', delay: 100, progress: true },
      { text: 'ESTABLISHING MARKET DOMINANCE... [100%]', delay: 150, progress: true },
      { text: 'VALIDATING SIGMA PROTOCOLS...', delay: 80 },
      { text: '[WARNING] DETECTING BETA MINDSET IN VICINITY', delay: 100, type: 'warning' },
      { text: '[OK] BETA RESISTANCE SHIELDS ACTIVATED', delay: 80 },
      { text: 'CALIBRATING FOCUS ALGORITHMS... [100%]', delay: 120, progress: true },
      { text: 'SIGMA_OS BOOT SEQUENCE COMPLETE', delay: 100, type: 'success' },
      { text: 'ENTERING SIGMA SPACE...', delay: 150 }
    ];
  }

  async start() {
    // Hide main content initially
    document.querySelector('.container').style.display = 'none';
    
    // Show boot container
    this.bootContainer.style.display = 'block';
    
    // Add glitch overlay
    const glitchOverlay = document.createElement('div');
    glitchOverlay.className = 'glitch-overlay';
    this.bootContainer.appendChild(glitchOverlay);

    // Process each boot message
    for (let msg of this.bootMessages) {
      await this.showBootMessage(msg);
    }

    // Final transition
    await this.transitionToMain();
  }

  async showBootMessage({ text, delay, type = 'info', progress = false }) {
    const line = document.createElement('div');
    line.className = 'boot-line';
    if (type) line.classList.add(`boot-${type}`);
    
    // Create timestamp
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    });
    
    if (progress) {
      // Show progress bar
      const progressText = text.split('[')[0];
      line.innerHTML = `[${timestamp}] ${progressText}[`;
      
      const progressBar = document.createElement('span');
      progressBar.className = 'boot-progress';
      line.appendChild(progressBar);
      
      line.innerHTML += ']';
      this.bootContainer.appendChild(line);
      
      await this.animateProgress(progressBar);
    } else {
      line.innerHTML = `[${timestamp}] ${text}`;
      this.bootContainer.appendChild(line);
    }

    // Add glitch effect randomly
    if (Math.random() < 0.3) {
      line.classList.add('glitch-text');
    }

    // Scroll to bottom
    this.bootContainer.scrollTop = this.bootContainer.scrollHeight;
    
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  async animateProgress(progressBar) {
    let width = 0;
    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
      } else {
        width += 2;
        progressBar.style.width = width + '%';
      }
    }, 20);

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  async transitionToMain() {
    // Add final glitch effect
    this.bootContainer.classList.add('glitch-out');
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Hide boot sequence
    this.bootContainer.style.display = 'none';
    
    // Show main content
    const container = document.querySelector('.container');
    container.style.display = 'block';
    container.classList.add('fade-in');
  }
}
const bootStyles = `
.boot-progress-container {
  margin: 10px 0;
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(0, 255, 0, 0.2);
  background: rgba(0, 255, 0, 0.05);
}

.boot-progress-bar {
  height: 20px;
  width: 100%;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 0, 0.3);
}

.boot-progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(
    90deg,
    #00ff00 0%,
    #88ff00 50%,
    #00ff00 100%
  );
  background-size: 200% 100%;
  animation: gradientMove 2s linear infinite;
  position: relative;
  transition: width 0.05s linear;
}

.boot-progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    transparent 0%,
    rgba(0, 255, 0, 0.2) 50%,
    transparent 100%
  );
  animation: scanline 1s linear infinite;
}

.boot-progress-text {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  color: #00ff00;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
  font-family: 'Share Tech Mono', monospace;
  font-size: 12px;
  z-index: 1;
}

.boot-stats {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  font-size: 12px;
  color: rgba(0, 255, 0, 0.8);
}

@keyframes gradientMove {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.boot-section {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid rgba(0, 255, 0, 0.1);
  background: rgba(0, 255, 0, 0.02);
}

.boot-section-title {
  color: #00ff00;
  margin-bottom: 5px;
  font-weight: bold;
}

.loading-detail {
  font-size: 12px;
  color: rgba(0, 255, 0, 0.7);
  margin: 2px 0;
}`;
// Terminal functionality
const quotes = [
  "> Initializing sigma_OS v2.0...",
  "> Loading quantum mindset modules...",
  "> Bypassing social construct limitations...",
  "> Calculating parallel grindset trajectories...",
  "> Initialized gallery DB...",
];

const terminalText = document.getElementById('terminal-text');
const terminalContainer = document.querySelector('.terminal-container');
const maxMessages = 15;

// Add vignette and scanlines
document.body.insertAdjacentHTML('beforeend', '<div class="vignette"></div><div class="scanlines"></div>');

class StatTracker {
  constructor(commandSystem) {
    this.commandSystem = commandSystem;  // Store reference to command system
    this.stats = {
      focusLevel: { value: 90, trend: 'up', max: 100 },
      grindStatus: { value: 100, trend: 'stable', max: 100 },
      socialBattery: { value: 0, trend: 'down', max: 100 },
      mindsetLevel: { value: 85, trend: 'up', max: 100 },
      productivity: { value: 75, trend: 'up', max: 100 },
      betaResistance: { value: 100, trend: 'stable', max: 100 }
    };

    this.isDisplaying = false;  // Track if stats are being displayed
    
    // Start periodic updates
    setInterval(() => {
      this.updateStats();
      if (this.isDisplaying) {
        this.commandSystem.clearTerminal();
        this.commandSystem.showStats();
      }
    }, 3000);
  }

  updateStats() {
    for (let stat in this.stats) {
      // Random fluctuation based on trend
      const fluctuation = Math.random() * 5 - 2;
      let newValue = this.stats[stat].value;

      switch (this.stats[stat].trend) {
        case 'up':
          newValue += Math.abs(fluctuation);
          break;
        case 'down':
          newValue -= Math.abs(fluctuation);
          break;
        case 'stable':
          newValue += fluctuation;
          break;
      }

      // Ensure value stays within bounds
      this.stats[stat].value = Math.min(Math.max(Math.round(newValue), 0), this.stats[stat].max);

      // Dynamically update trends based on value thresholds
      if (this.stats[stat].value <= 10) {
        this.stats[stat].trend = 'up';  // Start increasing if too low
      } else if (this.stats[stat].value >= 95) {
        this.stats[stat].trend = 'down';  // Start decreasing if too high
      }
    }

    // Special case: social battery should always trend downward
    this.stats.socialBattery.trend = 'down';
    // Beta resistance should stay stable and high
    this.stats.betaResistance.trend = 'stable';
  }

  startDisplaying() {
    this.isDisplaying = true;
  }

  stopDisplaying() {
    this.isDisplaying = false;
  }

  getStatBar(value, max = 100, width = 10) {
    const filledCount = Math.round((value / max) * width);
    const emptyCount = width - filledCount;
    
    let fillChar = '█';
    if (value < 30) fillChar = '▒';  // Low value indicator
    else if (value < 70) fillChar = '▓';  // Medium value indicator

    return fillChar.repeat(filledCount) + '░'.repeat(emptyCount);
  }

  getTrendIndicator(trend) {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      case 'stable': return '→';
      default: return '-';
    }
  }

  getStatColor(value) {
    if (value >= 80) return 'rgb(78, 205, 196)';  // Cyan for high values
    if (value >= 50) return 'rgb(255, 217, 61)';  // Yellow for medium values
    return 'rgb(255, 107, 107)';                  // Red for low values
  }

  // Helper method to get readable stat name
  formatStatName(name) {
    return name.replace(/([A-Z])/g, ' $1').trim();
  }

  // Helper method to get status description
  getStatusDescription(statName, value) {
    const descriptions = {
      focusLevel: {
        high: "Maximum concentration achieved",
        medium: "Focus maintaining",
        low: "Distraction detected"
      },
      grindStatus: {
        high: "Sigma grindset optimal",
        medium: "Grind intensity acceptable",
        low: "Grind harder required"
      },
      socialBattery: {
        high: "WARNING: Too social",
        medium: "Acceptable isolation",
        low: "Perfect solitude achieved"
      },
      mindsetLevel: {
        high: "Peak sigma mentality",
        medium: "Mindset developing",
        low: "Beta thoughts detected"
      },
      productivity: {
        high: "Maximum efficiency",
        medium: "Output acceptable",
        low: "Efficiency compromised"
      },
      betaResistance: {
        high: "Beta immunity active",
        medium: "Resistance holding",
        low: "WARNING: Beta influence detected"
      }
    };

    if (value >= 80) return descriptions[statName].high;
    if (value >= 50) return descriptions[statName].medium;
    return descriptions[statName].low;
  }
}

class CommandSystem {
  constructor() {
    this.commandHistory = [];
    this.historyIndex = -1;
    this.statTracker = new StatTracker(this);  // Pass 'this' to StatTracker
    
    this.commands = {
      help: {
        desc: 'Show available commands',
        fn: () => this.showHelp()
      },
      gallery: {
        desc: 'Access the sigma image database',
        fn: () => this.accessGallery()
      },
      clear: {
        desc: 'Clear terminal output',
        fn: () => this.clearTerminal()
      },
      sigma: {
        desc: 'Display sigma rules',
        fn: () => this.showSigmaRules()
      },
      about: {
        desc: 'About this system',
        fn: () => this.showAbout()
      },
      matrix: {
        desc: 'Toggle matrix effect',
        fn: () => this.toggleMatrix()
      },
      quote: {
        desc: 'Get a sigma motivation quote',
        fn: () => this.showQuote()
      },
      stats: {
        desc: 'Display current sigma metrics',
        fn: () => {
          this.statTracker.startDisplaying();  // Start auto-updating
          this.showStats();
          
          // Optional: Stop updating after a certain time
          setTimeout(() => {
            this.statTracker.stopDisplaying();
          }, 30000); // Stop after 30 seconds
        }
      },
      hack: {
        desc: 'Simulate a "hacking" sequence',
        fn: () => this.simulateHack()
      },
      schedule: {
        desc: 'Show sigma daily schedule',
        fn: () => this.showSchedule()
      },
      focus: {
        desc: 'Enter deep focus mode',
        fn: () => this.enterFocusMode()
      },

    };
  }

  print(message, type = 'default', color = null) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const messageColor = color || {
      system: 'rgb(78, 205, 196)',
      error: 'rgb(255, 107, 107)',
      default: '#00ff00'
    }[type];

    line.innerHTML = `<span class="terminal-timestamp">[${timestamp}]</span> <span style="color: ${messageColor}">${message}</span>`;
    terminalText.appendChild(line);

    // Scroll to bottom
    terminalText.scrollTop = terminalText.scrollHeight;
  }

  handleCommand(commandText) {
    if (!commandText) return;

    // Add to history
    this.commandHistory.push(commandText);
    this.historyIndex = this.commandHistory.length;

    // Parse command and arguments
    const [cmd, ...args] = commandText.toLowerCase().split(' ');

    // Execute command
    if (this.commands[cmd]) {
      try {
        this.commands[cmd].fn(args);
      } catch (error) {
        this.print(`Error executing command: ${error.message}`, 'error');
      }
    } else {
      this.print(`Command not found: ${cmd}`, 'error');
      this.print('Type "help" for available commands.', 'system');
    }
  }

  showHelp() {
    this.print('Available commands:', 'system');
    Object.entries(this.commands).forEach(([cmd, info]) => {
      this.print(`  ${cmd.padEnd(10)} - ${info.desc}`, 'system');
    });
  }

  clearTerminal() {
    const lines = Array.from(terminalText.getElementsByClassName('terminal-line'));
    lines.forEach(line => {
      line.classList.add('fade-out');
      setTimeout(() => {
        if (line.parentNode === terminalText) {
          terminalText.removeChild(line);
        }
      }, 500);
    });
  }

  showSigmaRules() {
    const rules = [
      'Rule #1: The grind never stops',
      'Rule #2: Sleep is for the weak',
      'Rule #3: Time is currency',
      'Rule #4: Distractions are temporary, gains are forever',
      'Rule #5: Trust the algorithm'
    ];
    rules.forEach(rule => this.print(rule, 'system'));
  }

  showAbout() {
    const about = [
      'SIGMA_OS - Advanced Mindset Operating System',
      'Version: 2.0',
      'Build: 20241105',
      'Created by: [███████]',
      'Purpose: Maximize efficiency, eliminate weakness'
    ];
    about.forEach(line => this.print(line, 'system'));
  }

  toggleMatrix() {
    document.body.classList.toggle('matrix-mode');
    this.print('Matrix mode toggled', 'system');
    
    if (document.body.classList.contains('matrix-mode')) {
      setTimeout(() => {
        document.body.classList.remove('matrix-mode');
        this.print('Matrix mode disabled', 'system');
      }, 5000);
    }
  }

  showAscii(type = 'sigma') {
    const art = {
      sigma: `
    ░██████╗██╗░██████╗░███╗░░░███╗░█████╗░
    ██╔════╝██║██╔════╝░████╗░████║██╔══██╗
    ╚█████╗░██║██║░░██╗░██╔████╔██║███████║
    ░╚═══██╗██║██║░░╚██╗██║╚██╔╝██║██╔══██║
    ██████╔╝██║╚██████╔╝██║░╚═╝░██║██║░░██║
    ╚═════╝░╚═╝░╚═════╝░╚═╝░░░░░╚═╝╚═╝░░╚═╝`,
    };

    if (art[type]) {
      this.print(art[type], 'system');
    } else {
      this.print('Available art: ' + Object.keys(art).join(', '), 'system');
    }
  }

  showQuote() {
    const quotes = [
      "While they sleep, we grind.",
      "Success is not an option, it's a lifestyle.",
      "Beta: 'I need motivation' | Sigma: 'I am the motivation'",
      "The grind is not a phase, it's a constant.",
      "Time you enjoy wasting was not wasted - But I never enjoy wasting time.",
      "The market rewards obsession.",
      "Social life is temporary, success is forever.",
      "Your competition is taking a break right now."
    ];
    this.print(`"${quotes[Math.floor(Math.random() * quotes.length)]}"`, 'system');
  }

  showStats() {
    const stats = this.statTracker.stats;
    
    // Header
    this.print('SIGMA METRICS:', 'system');
    this.print('-------------', 'system');

    // Stats
    for (let [name, stat] of Object.entries(stats)) {
      const formattedName = this.statTracker.formatStatName(name).padEnd(15, ' ');
      const bar = this.statTracker.getStatBar(stat.value);
      const trend = this.statTracker.getTrendIndicator(stat.trend);
      const value = stat.value.toString().padStart(3);
      const desc = this.statTracker.getStatusDescription(name, stat.value);
      const color = this.statTracker.getStatColor(stat.value);

      // Combined stat line with description
      this.print(
        `${formattedName} [${bar}] ${value}% ${trend} | ${desc}`,
        'default',
        color
      );
    }

    // Footer

    const timeStamp = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    this.print(`Last updated: ${timeStamp}`, 'system');
  }

  simulateHack() {
    const sequences = [
      "ACCESS GRANTED",
      "BYPASSING SECURITY PROTOCOLS...",
      "INJECTING SIGMA MINDSET...",
      "OVERCLOCKING BRAIN CAPACITY...",
      "DOWNLOADING MARKET STRATEGIES...",
      "UPGRADING NEURAL NETWORKS...",
      "PROCESS COMPLETE"
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < sequences.length) {
        this.print(sequences[i], 'system');
        i++;
      } else {
        clearInterval(interval);
        document.body.classList.add('matrix-mode');
        setTimeout(() => {
          document.body.classList.remove('matrix-mode');
          this.print('Hack sequence completed.', 'system');
        }, 3000);
      }
    }, 500);
  }

  showSchedule() {
    const schedule = [
      "03:00 - Wake up",
      "03:01 - Cold shower",
      "03:30 - Meditate in complete darkness",
      "04:00 - Trade crypto",
      "05:00 - Workout (minimum 3 hours)",
      "08:00 - Begin work",
      "13:00 - LinkedIn grindset posting",
      "14:00 - More work",
      "22:00 - Read 48 Laws of Power",
      "23:00 - Plan tomorrow's grind",
      "23:30 - Brief rest (optional)"
    ];
    
    schedule.forEach(item => this.print(item, 'system'));
  }

  enterFocusMode() {
    document.body.classList.add('focus-mode');
    this.print('Entering focus mode...', 'system');
    this.print('Eliminating distractions...', 'system');
    this.print('Maximizing efficiency...', 'system');
    
    setTimeout(() => {
      document.body.classList.remove('focus-mode');
      this.print('Focus mode deactivated.', 'system');
    }, 5000);
  }

  changeColor(color) {
    const colors = {
      blue: { main: '#4A90E2', accent: '#5FB6E7' },
      green: { main: '#00ff00', accent: '#33ff33' },
      red: { main: '#FF6B6B', accent: '#FF8E8E' },
      cyan: { main: '#4ECDC4', accent: '#6EE7E0' }
    };

    if (colors[color]) {
      document.documentElement.style.setProperty('--terminal-color', colors[color].main);
      document.documentElement.style.setProperty('--terminal-accent', colors[color].accent);
      this.print(`Terminal color changed to ${color}`, 'system');
    } else {
      this.print('Available colors: ' + Object.keys(colors).join(', '), 'error');
    }
  }

  accessGallery() {
    this.print('ACCESSING SIGMA IMAGE DATABASE...', 'system');
    this.print('ESTABLISHING SECURE CONNECTION...', 'system');
    
    // Simulate loading
    setTimeout(() => {
      this.print('CONNECTION ESTABLISHED', 'success');
      this.print('REDIRECTING TO SECURE VIEWER...', 'system');
      
      // Add glitch effect to whole page before redirect
      document.body.classList.add('glitch-effect');
      
      // Redirect after effects
      setTimeout(() => {
        window.location.href = 'gallery.html';
      }, 1000);
    }, 1500);
  }
}

// Initialize command system
const cmdSystem = new CommandSystem();

function typeText() {
  if (charIndex < text.length) {
    retroText.textContent += text.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 100 + Math.random() * 100);
  } else {
    setTimeout(() => {
      gsap.to('.terminal-container', {
        opacity: 1,
        y: 0,
        duration: 1,
        onComplete: () => {
          startTerminalAnimation();
          initializeCommandInput();
        }
      });
    }, 500);
  }
}

function createTerminalLine(text) {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  const timestamp = new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  line.innerHTML = `<span class="terminal-timestamp">[${timestamp}]</span> ${text}`;
  return line;
}

function startTerminalAnimation() {
  // Initial boot sequence
  quotes.forEach((quote, index) => {
    setTimeout(() => {
      const line = createTerminalLine(quote);
      terminalText.appendChild(line);
      terminalText.scrollTop = terminalText.scrollHeight;
    }, index * 1000);
  });

  // After boot sequence, just focus the existing input
  setTimeout(() => {
    const input = document.getElementById('command-input');
    if (input) {
      input.focus();
    }
  }, quotes.length * 1000 + 500);
}

// Remove any existing duplicate command lines when initializing
function initializeCommandInput() {
  // Remove any duplicate command-line elements that might exist
  const commandLines = document.querySelectorAll('.command-line');
  if (commandLines.length > 1) {
    for (let i = 1; i < commandLines.length; i++) {
      commandLines[i].remove();
    }
  }

  document.addEventListener('keydown', (e) => {
    const input = document.getElementById('command-input');
    if (!input) return;

    if (e.key === 'Enter' && input === document.activeElement) {
      const command = input.value.trim();
      if (command) {
        cmdSystem.print(`λ ${command}`);
        cmdSystem.handleCommand(command);
        input.value = '';
      }
    }
  });

  // Keep focus on input
  document.addEventListener('click', () => {
    const input = document.getElementById('command-input');
    if (input) input.focus();
  });
}

// Parallax effect
function handleMouseMove(e) {
  const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
  
  gsap.to('.bg-grid', {
    x: moveX,
    y: moveY,
    duration: 1,
    ease: 'power2.out'
  });
  
  gsap.to('.bg-gradient', {
    x: moveX * 2,
    y: moveY * 2,
    duration: 1,
    ease: 'power2.out'
  });
}

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.2;
  cursorY += (mouseY - cursorY) * 0.2;
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;

  gsap.set(cursor, { x: cursorX - 10, y: cursorY - 10 });
  gsap.set(cursorFollower, { x: followerX - 4, y: followerY - 4 });

  requestAnimationFrame(animateCursor);
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  handleMouseMove(e);
});

// Handle cursor visibility
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = 0;
  cursorFollower.style.opacity = 0;
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = 1;
  cursorFollower.style.opacity = 1;
});

// Start animations
gsap.to('.retro-text-container', {
  opacity: 1,
  x: 0,
  duration: 1,
  delay: 0.5,
  onComplete: () => {
    setTimeout(typeText, 500);
  }
});

// Initialize cursor animation
animateCursor();

// Updated terminal formatting functions
function formatTerminalMessage(message, type = 'default') {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  
  const timestamp = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Different message type formatting
  let messageContent = message;
  if (type === 'error') {
    messageContent = `<div class="msg-error">${message}</div>`;
  } else if (type === 'success') {
    messageContent = `<div class="msg-success">${message}</div>`;
  } else if (type === 'warning') {
    messageContent = `<div class="msg-warning">${message}</div>`;
  } else if (type === 'system') {
    messageContent = `<div class="msg-system">${message}</div>`;
  }

  line.innerHTML = `
    <span class="terminal-timestamp">[${timestamp}]</span>
    <span class="terminal-message">${messageContent}</span>
  `;

  return line;
}

// Enhanced command handling
function handleCommand(command) {
  const args = command.split(' ');
  const cmd = args[0].toLowerCase();

  // Add command to history with proper formatting
  terminalText.appendChild(formatTerminalMessage(`λ ${command}`, 'command'));

  switch(cmd) {
    case 'clear':
      clearTerminal();
      break;
    case 'help':
      showHelp();
      break;
    // ... other commands ...
    default:
      terminalText.appendChild(
        formatTerminalMessage(`Command not found: ${cmd}`, 'error')
      );
      terminalText.appendChild(
        formatTerminalMessage('Type "help" for available commands.', 'system')
      );
  }

  // Scroll to bottom with smooth animation
  terminalText.scrollTo({
    top: terminalText.scrollHeight,
    behavior: 'smooth'
  });
}

// Function to show progress for long-running commands
function showProgress(message, duration = 1000) {
  const progressLine = document.createElement('div');
  progressLine.className = 'terminal-line';
  progressLine.innerHTML = `
    <span class="terminal-timestamp">[${getCurrentTime()}]</span>
    <span class="terminal-message">
      ${message}
      <div class="progress-bar"></div>
    </span>
  `;
  terminalText.appendChild(progressLine);
}

// Function to show tables in terminal
function showTerminalTable(headers, data) {
  let tableHTML = '<table class="terminal-table"><thead><tr>';
  
  // Add headers
  headers.forEach(header => {
    tableHTML += `<th>${header}</th>`;
  });
  tableHTML += '</tr></thead><tbody>';
  
  // Add data rows
  data.forEach(row => {
    tableHTML += '<tr>';
    row.forEach(cell => {
      tableHTML += `<td>${cell}</td>`;
    });
    tableHTML += '</tr>';
  });
  
  tableHTML += '</tbody></table>';
  
  const line = formatTerminalMessage(tableHTML);
  terminalText.appendChild(line);
}

// Function to show ASCII art with proper formatting
function showAsciiArt(art) {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  line.innerHTML = `
    <span class="terminal-timestamp">[${getCurrentTime()}]</span>
    <pre class="ascii-art">${art}</pre>
  `;
  terminalText.appendChild(line);
}

// Helper function to get current time
function getCurrentTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// Add loading animation for commands
function simulateLoading(message, callback) {
  const frames = ['-', '\\', '|', '/'];
  let i = 0;
  
  const loadingLine = formatTerminalMessage(`${message} ${frames[0]}`);
  terminalText.appendChild(loadingLine);
  
  const interval = setInterval(() => {
    i = (i + 1) % frames.length;
    loadingLine.querySelector('.terminal-message').textContent = 
      `${message} ${frames[i]}`;
  }, 100);
  
  setTimeout(() => {
    clearInterval(interval);
    loadingLine.remove();
    callback();
  }, 1000);
}
