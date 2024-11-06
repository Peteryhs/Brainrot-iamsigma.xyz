// Typing animation
const text = "I AM SIGMA";
const retroText = document.getElementById('retro-text');
let charIndex = 0;

// Terminal functionality
const quotes = [
  "> Initializing sigma_OS v2.0...",
  "> Loading quantum mindset modules...",
  "> Bypassing social construct limitations...",
  "> Calculating parallel grindset trajectories...",
  "> Optimizing workflow for maximum gains...",
];

const terminalText = document.getElementById('terminal-text');
const terminalContainer = document.querySelector('.terminal-container');
const maxMessages = 15;

// Add vignette and scanlines
document.body.insertAdjacentHTML('beforeend', '<div class="vignette"></div><div class="scanlines"></div>');

// Command System Class
class CommandSystem {
  constructor() {
    this.commandHistory = [];
    this.historyIndex = -1;
    
    this.commands = {
      help: {
        desc: 'Show available commands',
        fn: () => this.showHelp()
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
        fn: () => this.showStats()
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

  print(message, type = 'default') {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const typeColors = {
      system: 'rgb(78, 205, 196)',
      error: 'rgb(255, 107, 107)',
      default: '#00ff00'
    };

    line.innerHTML = `<span class="terminal-timestamp">[${timestamp}]</span> <span style="color: ${typeColors[type] || typeColors.default}">${message}</span>`;
    terminalText.appendChild(line);

    // Remove old lines
    const lines = Array.from(terminalText.getElementsByClassName('terminal-line'));
    if (lines.length > maxMessages) {
      const linesToRemove = lines.slice(0, lines.length - maxMessages);
      linesToRemove.forEach(line => {
        line.classList.add('fade-out');
        setTimeout(() => {
          if (line.parentNode === terminalText) {
            terminalText.removeChild(line);
          }
        }, 500);
      });
    }

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
      'Created by: [REDACTED]',
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
      wolf: `
         ╭━━━━╮
         ┃▇▇▇▇┃
      ╭━┫▇▇▇▇┣━╮
     ┃  ┃▇▇▇▇┃  ┃
     ╰┳╯╰━━━━╯╰┳╯
      ┃   ╭━╮   ┃
      ┃   ┃ ┃   ┃
      ┃   ╰━╯   ┃
      ┃    ╭━╮  ┃
      ┃    ┃ ┃  ┃
      ╰━━━━╯ ╰━━╯`
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
    const stats = [
      "╔════════ SIGMA METRICS ════════╗",
      "║ Focus Level    : [█████████░] ║",
      "║ Grind Status   : [██████████] ║",
      "║ Social Battery : [░░░░░░░░░░] ║",
      "║ Mindset Level  : [████████░░] ║",
      "║ Productivity   : [███████░░░] ║",
      "║ Beta Resistance: [██████████] ║",
      "╚════════════════════════════════╝"
    ];
    stats.forEach(stat => this.print(stat, 'system'));
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

  // After boot sequence, show command prompt
  setTimeout(() => {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'command-line';
    inputContainer.innerHTML = `
      <span class="prompt-symbol">λ</span>
      <input type="text" id="command-input" spellcheck="false" autocomplete="off" placeholder="Type 'help' for commands...">
    `;
    terminalText.appendChild(inputContainer);
    
    const input = document.getElementById('command-input');
    input.focus();
  }, quotes.length * 1000 + 500);
}

function initializeCommandInput() {
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