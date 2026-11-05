// ==========================================================================
// JEE MAIN REDESIGN — LIGHT INTERACTION & UTILITY ENGINE
// Authentic Candidate Experience & Architectural Drafting Theme
// Designed & Engineered by Srijan Pandey
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. Audio FX Engine (Web Audio API Procedural Synthesizer)
  // ------------------------------------------------------------------------
  let soundEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playBlip(freq = 1000, duration = 0.05) {
    if (!soundEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playPop() {
    if (!soundEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
  }

  function playDing() {
    if (!soundEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1318, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {}
  }

  const soundBtn = document.getElementById('sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundBtn.textContent = soundEnabled ? '♫ SOUND: ON' : '♫ SOUND: OFF';
      soundBtn.title = soundEnabled ? 'Sound FX: ON' : 'Sound FX: OFF';
      if (soundEnabled) playDing();
    });
  }

  // ------------------------------------------------------------------------
  // 2. Custom Interactive Cursor (Desktop)
  // ------------------------------------------------------------------------
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring && window.innerWidth > 900) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const hoverables = document.querySelectorAll('a, button, .bento-card, .metric-box, .notice-item-row, .video-card, .tool-box');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
        playBlip(1200, 0.02);
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
      });
    });
  }

  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // 3. Living Sketchbook Perspective Engine (#hero-living-canvas)
  //    Directly inspired by Marcelo Reis Melo's dontlookup.app
  // ------------------------------------------------------------------------
  const heroCanvas = document.getElementById('hero-living-canvas');
  const heroViewport = document.getElementById('hero-viewport');
  const heroBgVideo = document.getElementById('hero-bg-video');
  const btnToggleBg = document.getElementById('btn-toggle-bg-mode');

  if (heroCanvas && heroViewport) {
    const ctx = heroCanvas.getContext('2d');
    let width = 0;
    let height = 0;
    let mouse = { x: -1000, y: -1000, active: false };

    function resizeHero() {
      width = heroViewport.clientWidth;
      height = heroViewport.clientHeight;
      heroCanvas.width = width * window.devicePixelRatio;
      heroCanvas.height = height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    }
    resizeHero();
    window.addEventListener('resize', resizeHero);

    // Track mouse position over hero
    heroViewport.addEventListener('mousemove', (e) => {
      const rect = heroCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });
    heroViewport.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    // Background Mode Toggle (Live Canvas vs Video Loop)
    if (btnToggleBg && heroBgVideo) {
      let isVideoMode = false;
      btnToggleBg.addEventListener('click', (e) => {
        e.stopPropagation();
        isVideoMode = !isVideoMode;
        if (isVideoMode) {
          heroBgVideo.style.display = 'block';
          heroCanvas.style.opacity = '0.15';
          btnToggleBg.textContent = '🎨 Switch to Live Canvas';
          btnToggleBg.style.background = 'var(--ink-black)';
          btnToggleBg.style.color = '#FFFFFF';
        } else {
          heroBgVideo.style.display = 'none';
          heroCanvas.style.opacity = '1.0';
          btnToggleBg.textContent = '🎬 Switch to Video Loop';
          btnToggleBg.style.background = 'none';
          btnToggleBg.style.color = 'var(--ink-black)';
        }
      });
    }

        // Candidate dialogue speech lines
    const SPEECH_LINES = [
      'yep', 'exactly', 'city slip aa gaya!', 'shift 1',
      'kota center confirmed', 'where is hall ticket?', 'physics was easy!',
      'got 99.8%ile!', 'zero lag!', 'portal ready', 'center confirmed',
      'admit card out', 'delhi ncr shift 2', 'ready for shift 1',
      'exam city: kota', 'downloaded slip!', 'admit card link?',
      'patna shift 1', 'mumbai center checked', 'lets crack jee!',
      'maths was lengthy', 'mock test 260+', 'server fast hai!'
    ];

        // 2.5D Perspective Aspirant Agent with Controlled Density & Smooth Physics
    const MAX_ACTIVE_BUBBLES = 5; // Clean dialogue density

    class AspirantAgent {
      constructor(index) {
        this.index = index;
        this.bubbleScale = 0;
        this.reset(true);
      }
      reset(initial = false) {
        this.worldX = initial ? Math.random() * (width || 1200) : (Math.random() > 0.5 ? -30 : (width || 1200) + 30);
        this.worldZ = Math.random(); // 0 (horizon) to 1 (near foreground)
        
        // Calibrated 25% slower gentle walking speed
        this.speed = (0.22 + Math.random() * 0.32) * (Math.random() > 0.5 ? 1 : -1);
        this.vx = this.speed;
        this.vy = (Math.random() - 0.5) * 0.10;
        this.facing = this.vx >= 0 ? 1 : -1;
        this.walkCycle = Math.random() * Math.PI * 2;
        this.bagColor = Math.random() > 0.6 ? '#FFD000' : (Math.random() > 0.5 ? '#FF4A22' : '#2563EB');
        this.hasHat = Math.random() > 0.7;
        this.state = 'wandering'; // 'wandering', 'seeking', 'relieved'
        this.jump = 0;
        this.jumpV = 0;
        
        // Initial speech bubble state (staggered delay, selective density)
        this.hasBubble = initial && (this.index < 4);
        this.bubbleText = SPEECH_LINES[Math.floor(Math.random() * SPEECH_LINES.length)];
        this.bubbleDuration = Math.floor(Math.random() * 150) + 280; // 5-7 seconds reading time
        this.bubbleTimer = this.bubbleDuration;
        this.bubbleScale = this.hasBubble ? 1.0 : 0.0;
      }

            update(slips, currentActiveBubbles) {
        const horizonY = height * 0.22;
        const groundHeight = height - horizonY;
        const screenY = horizonY + this.worldZ * groundHeight;
        const scale = 0.45 + this.worldZ * 0.65;

        // Gentle, slow bubble timer and smooth scale interpolation
        if (this.hasBubble) {
          this.bubbleTimer--;
          // Smooth pop-in and fade-out
          const targetScale = (this.bubbleTimer > 25 && this.bubbleTimer < this.bubbleDuration - 10) ? 1.0 : (this.bubbleTimer <= 25 ? Math.max(0, this.bubbleTimer / 25) : 0.85);
          this.bubbleScale += (targetScale - this.bubbleScale) * 0.12;

          if (this.bubbleTimer <= 0) {
            this.hasBubble = false;
            this.bubbleScale = 0;
            this.bubbleTimer = Math.floor(Math.random() * 200) + 140; // cooldown
          }
        } else {
          this.bubbleScale += (0 - this.bubbleScale) * 0.15;
          this.bubbleTimer--;
          if (this.bubbleTimer <= 0 && currentActiveBubbles < MAX_ACTIVE_BUBBLES) {
            // Keep center headline zone uncluttered
            const inCenterZone = (this.worldX > width * 0.28 && this.worldX < width * 0.72 && screenY > height * 0.30 && screenY < height * 0.66);
            if (!inCenterZone && Math.random() < 0.30) {
              this.hasBubble = true;
              this.bubbleText = SPEECH_LINES[Math.floor(Math.random() * SPEECH_LINES.length)];
              this.bubbleDuration = Math.floor(Math.random() * 150) + 260; // 5-7 seconds
              this.bubbleTimer = this.bubbleDuration;
              this.bubbleScale = 0;
            } else {
              this.bubbleTimer = Math.floor(Math.random() * 120) + 80;
            }
          }
        }

        // Seeking dropped admit slips
        let targetSlip = null;
        let minDist = 220;
        if (slips && slips.length) {
          slips.forEach(s => {
            if (!s.collected) {
              const dist = Math.hypot(s.x - this.worldX, s.y - screenY);
              if (dist < minDist) {
                minDist = dist;
                targetSlip = s;
              }
            }
          });
        }

        if (targetSlip) {
          this.state = 'seeking';
          const angle = Math.atan2(targetSlip.y - screenY, targetSlip.x - this.worldX);
          this.vx = Math.cos(angle) * (2.4 * scale);
          this.worldZ += (Math.sin(angle) * 1.5) / groundHeight;
          this.worldZ = Math.max(0.05, Math.min(0.98, this.worldZ));
          this.facing = this.vx >= 0 ? 1 : -1;

          if (minDist < 24) {
            targetSlip.collected = true;
            this.state = 'relieved';
            this.hasBubble = true;
            this.bubbleText = 'ALLOTMENT OK!';
            this.bubbleTimer = 180;
            this.jumpV = -4.5;
            playPop();
          }
        } else {
          // Normal wandering
          this.state = 'wandering';
          this.worldX += this.vx;
          this.worldZ += this.vy * 0.005;
          if (this.worldZ < 0.05 || this.worldZ > 0.98) this.vy *= -1;

          // Mouse gentle repulsion
          if (mouse.active) {
            const mDist = Math.hypot(mouse.x - this.worldX, mouse.y - screenY);
            if (mDist < 120) {
              const repel = (120 - mDist) / 120;
              this.worldX += (this.worldX > mouse.x ? 1 : -1) * repel * 2;
            }
          }

          // Boundary wrapping
          if (this.worldX < -50) this.worldX = width + 40;
          if (this.worldX > width + 50) this.worldX = -40;
        }

        // Jump physics for celebration
        if (this.jumpV !== 0 || this.jump !== 0) {
          this.jump += this.jumpV;
          this.jumpV += 0.35;
          if (this.jump >= 0) {
            this.jump = 0;
            this.jumpV = 0;
          }
        }

        this.walkCycle += Math.abs(this.vx) * 0.055;
      }

      draw() {
        const horizonY = height * 0.22;
        const groundHeight = height - horizonY;
        const screenY = horizonY + this.worldZ * groundHeight;
        const scale = (0.45 + this.worldZ * 0.65) * 1.35;

        ctx.save();
        ctx.translate(this.worldX, screenY + this.jump);

        // 1. Soft Elliptical Contact Shadow on the Ground
        ctx.fillStyle = 'rgba(18, 18, 18, 0.14)';
        ctx.beginPath();
        ctx.ellipse(0, 2 * scale, 14 * scale, 5 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // 2. Flip for walking direction
        ctx.scale(this.facing, 1);

        // 3. Legs (Stride Animation)
        const stride = Math.sin(this.walkCycle) * (6 * scale);
        ctx.strokeStyle = '#121212';
        ctx.lineWidth = 2.4 * scale;
        ctx.lineCap = 'round';

        // Back leg
        ctx.beginPath();
        ctx.moveTo(2 * scale, -4 * scale);
        ctx.lineTo(-stride, 2 * scale);
        ctx.stroke();

        // Front leg
        ctx.beginPath();
        ctx.moveTo(-2 * scale, -4 * scale);
        ctx.lineTo(stride, 2 * scale);
        ctx.stroke();

        // 4. Backpack (Hand-drawn rectangular pack with straps)
        ctx.fillStyle = this.bagColor;
        ctx.strokeStyle = '#121212';
        ctx.lineWidth = 1.8 * scale;
        ctx.beginPath();
        ctx.roundRect(-10 * scale, -24 * scale, 6 * scale, 14 * scale, 2 * scale);
        ctx.fill();
        ctx.stroke();

        // 5. Body / Torso (Smooth hand-drawn bean/capsule shape)
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#121212';
        ctx.lineWidth = 2.4 * scale;
        ctx.beginPath();
        ctx.roundRect(-6 * scale, -26 * scale, 12 * scale, 22 * scale, 6 * scale);
        ctx.fill();
        ctx.stroke();

        // 6. Round Head
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#121212';
        ctx.lineWidth = 2.4 * scale;
        ctx.beginPath();
        ctx.arc(0, -32 * scale, 7.5 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 7. Hair / Student Cap or Glasses
        if (this.hasHat) {
          ctx.fillStyle = '#121212';
          ctx.beginPath();
          ctx.arc(0, -34 * scale, 8 * scale, Math.PI, 0);
          ctx.fill();
          ctx.fillRect(-2 * scale, -37 * scale, 12 * scale, 2.5 * scale);
        } else {
          // Cute hair tuft
          ctx.beginPath();
          ctx.moveTo(-3 * scale, -38 * scale);
          ctx.quadraticCurveTo(0, -42 * scale, 4 * scale, -38 * scale);
          ctx.stroke();
        }

        // 8. Eyes / Glance
        ctx.fillStyle = '#121212';
        ctx.beginPath();
        ctx.arc(3 * scale, -32 * scale, 1.3 * scale, 0, Math.PI * 2);
        ctx.fill();

                // 9. Comic Speech Bubble with Smooth Spring Scale
        if (this.bubbleScale > 0.02) {
          ctx.save();
          // Un-flip so text is always readable left-to-right
          if (this.facing === -1) ctx.scale(-1, 1);

          ctx.font = `800 ${Math.max(10, Math.floor(10 * scale))}px "JetBrains Mono", monospace`;
          const textMetrics = ctx.measureText(this.bubbleText);
          const bW = textMetrics.width + 16 * scale;
          const bH = 20 * scale;
          const bubbleX = 4 * scale;
          const bubbleY = -48 * scale - bH;

          // Anchor point at tail origin
          const tailX = bubbleX + 10 * scale;
          const tailY = bubbleY + bH;
          ctx.translate(tailX, tailY);
          ctx.scale(this.bubbleScale, this.bubbleScale);
          ctx.translate(-tailX, -tailY);

          // Shadow
          ctx.fillStyle = 'rgba(18, 18, 18, 0.12)';
          ctx.beginPath();
          ctx.roundRect(bubbleX + 2, bubbleY + 2, bW, bH, 6 * scale);
          ctx.fill();

          // Bubble Box
          ctx.fillStyle = this.state === 'relieved' ? '#00C853' : '#FFFFFF';
          ctx.strokeStyle = '#121212';
          ctx.lineWidth = 1.8 * scale;
          ctx.beginPath();
          ctx.roundRect(bubbleX, bubbleY, bW, bH, 6 * scale);
          ctx.fill();
          ctx.stroke();

          // Bubble pointer tail
          ctx.fillStyle = this.state === 'relieved' ? '#00C853' : '#FFFFFF';
          ctx.beginPath();
          ctx.moveTo(bubbleX + 10 * scale, bubbleY + bH);
          ctx.lineTo(bubbleX + 4 * scale, bubbleY + bH + 6 * scale);
          ctx.lineTo(bubbleX + 16 * scale, bubbleY + bH);
          ctx.fill();
          ctx.stroke();
          // Cover the interior tail base line
          ctx.fillRect(bubbleX + 9 * scale, bubbleY + bH - 1.5, 8 * scale, 2);

          // Bubble Text
          ctx.fillStyle = this.state === 'relieved' ? '#FFFFFF' : '#121212';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(this.bubbleText, bubbleX + bW / 2, bubbleY + bH / 2);

          ctx.restore();
        }

        ctx.restore();
      }
    }

    // Sample Admit Slip Falling Object
    class CitySlipPacket {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.targetY = Math.min(y + 90, height - 40);
        this.collected = false;
        this.rotation = (Math.random() - 0.5) * 0.4;
        this.life = 400;
      }
      update() {
        if (this.y < this.targetY) {
          this.y += 3.5;
          this.rotation += 0.02;
        }
        this.life--;
      }
      draw() {
        if (this.collected) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Shadow
        ctx.fillStyle = 'rgba(18, 18, 18, 0.15)';
        ctx.fillRect(-12, -14, 28, 36);

        // White paper ticket
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#121212';
        ctx.lineWidth = 1.8;
        ctx.fillRect(-14, -16, 28, 36);
        ctx.strokeRect(-14, -16, 28, 36);

        // Header stripe
        ctx.fillStyle = '#FF4A22';
        ctx.fillRect(-12, -14, 24, 6);

        // Barcode lines
        ctx.fillStyle = '#121212';
        for (let b = 0; b < 5; b++) {
          ctx.fillRect(-10 + b * 5, -5, 2, 8);
        }

        // Label
        ctx.font = 'bold 7px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('JEE SLIP', 0, 12);

        ctx.restore();
      }
    }

    // Spawn 50+ Aspirants across perspective plane
    const aspirants = Array.from({ length: 48 }, (_, i) => new AspirantAgent(i));
    const activeSlips = [];

    // Drop slip on canvas click
    function dropSlipAt(x, y) {
      activeSlips.push(new CitySlipPacket(x, y));
      playPop();
    }

    heroViewport.addEventListener('click', (e) => {
      // Don't drop if clicking buttons or interactive links
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) return;
      const rect = heroCanvas.getBoundingClientRect();
      dropSlipAt(e.clientX - rect.left, e.clientY - rect.top);
    });

    // Original Architectural Sketch: Academic Colonnade & Engineering Elevation
    function drawArchitecturalElevation() {
      ctx.save();
      const originX = width * 0.82;
      const originY = height * 0.08;
      const sScale = Math.min(width / 1400, 1.0);

      ctx.translate(originX, originY);
      ctx.scale(sScale, sScale);

      // Contact shadow under plinth
      ctx.fillStyle = 'rgba(18, 18, 18, 0.06)';
      ctx.beginPath();
      ctx.ellipse(-40, 230, 200, 25, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#14140F';
      ctx.lineWidth = 2.0;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      // Colonnade Plinth
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.rect(-160, 190, 240, 30);
      ctx.fill();
      ctx.stroke();

      // Architectural Columns
      for (let i = -140; i <= 60; i += 32) {
        ctx.beginPath();
        ctx.rect(i, 90, 16, 100);
        ctx.fill();
        ctx.stroke();
        // Column fluting
        ctx.beginPath();
        ctx.moveTo(i + 8, 92);
        ctx.lineTo(i + 8, 188);
        ctx.strokeStyle = 'rgba(20, 20, 15, 0.4)';
        ctx.stroke();
        ctx.strokeStyle = '#14140F';
      }

      // Architrave & Entablature
      ctx.beginPath();
      ctx.rect(-170, 70, 260, 20);
      ctx.fill();
      ctx.stroke();

      // Triangular Pediment
      ctx.beginPath();
      ctx.moveTo(-175, 70);
      ctx.lineTo(-40, -10);
      ctx.lineTo(95, 70);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Central Academic Dome
      ctx.beginPath();
      ctx.arc(-40, -10, 48, Math.PI, 0);
      ctx.fill();
      ctx.stroke();

      // Dome Finial
      ctx.beginPath();
      ctx.moveTo(-40, -58);
      ctx.lineTo(-40, -82);
      ctx.stroke();

      // Engineering Draftsman Compass Overlay
      ctx.strokeStyle = '#2563EB';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-110, -50);
      ctx.lineTo(-70, 40);
      ctx.lineTo(-30, -50);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-70, -10, 28, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();

      ctx.restore();
    }

    // Main 60 FPS Render Loop
    function heroRenderLoop() {
      ctx.clearRect(0, 0, width, height);

      const horizonY = height * 0.22;

      // 1. Soft Horizon Line
      ctx.strokeStyle = 'rgba(18, 18, 18, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();

      // 2. Perspective Guidelines receding to horizon
      ctx.strokeStyle = 'rgba(18, 18, 18, 0.04)';
      ctx.lineWidth = 1.0;
      const vanishingX = width * 0.5;
      for (let p = -width; p <= width * 2; p += 160) {
        ctx.beginPath();
        ctx.moveTo(vanishingX, horizonY);
        ctx.lineTo(p, height);
        ctx.stroke();
      }

      // 3. Draw Architectural Elevation in Background
      drawArchitecturalElevation();

      // 4. Update & Draw Dropped Admit Slips
      for (let i = activeSlips.length - 1; i >= 0; i--) {
        const s = activeSlips[i];
        s.update();
        s.draw();
        if (s.collected || s.life <= 0) activeSlips.splice(i, 1);
      }

            // 5. Sort Aspirants by Depth (Z-sorting)
      aspirants.sort((a, b) => a.worldZ - b.worldZ);

      // Count currently active bubbles to enforce max cap
      let currentActiveBubbles = 0;
      aspirants.forEach(a => { if (a.hasBubble) currentActiveBubbles++; });

      // 6. Update & Draw Aspirants
      aspirants.forEach(a => {
        a.update(activeSlips, currentActiveBubbles);
        a.draw();
      });

      requestAnimationFrame(heroRenderLoop);
    }
    heroRenderLoop();
  }

  // ------------------------------------------------------------------------
  // 4. Live Telemetry & Active Candidates Fluctuation
  // ------------------------------------------------------------------------
  const activeUsersEl = document.getElementById('live-active-users');
  let baseUsers = 48219;
  setInterval(() => {
    if (activeUsersEl) {
      baseUsers += Math.floor((Math.random() - 0.48) * 12);
      activeUsersEl.textContent = baseUsers.toLocaleString('en-IN');
    }
  }, 3500);

  // ------------------------------------------------------------------------
  // 5. 300+ Indian Examination City Directory Database
  // ------------------------------------------------------------------------
  const CITIES_DATA = [
    { city: 'New Delhi (NCR)', state: 'DELHI', code: 'DL01', centers: 48, status: 'SLOTS CONFIRMED' },
    { city: 'Noida / Greater Noida', state: 'DELHI', code: 'UP12', centers: 24, status: 'SLOTS CONFIRMED' },
    { city: 'Gurugram / Faridabad', state: 'DELHI', code: 'HR04', centers: 18, status: 'SLOTS CONFIRMED' },
    { city: 'Kota (Vibrant / Landmark)', state: 'RAJASTHAN', code: 'RJ08', centers: 36, status: 'CAPACITY EXPANDED' },
    { city: 'Jaipur', state: 'RAJASTHAN', code: 'RJ06', centers: 42, status: 'SLOTS CONFIRMED' },
    { city: 'Jodhpur', state: 'RAJASTHAN', code: 'RJ07', centers: 16, status: 'SLOTS CONFIRMED' },
    { city: 'Patna', state: 'BIHAR', code: 'BR07', centers: 52, status: 'SLOTS CONFIRMED' },
    { city: 'Gaya', state: 'BIHAR', code: 'BR03', centers: 14, status: 'SLOTS CONFIRMED' },
    { city: 'Muzaffarpur', state: 'BIHAR', code: 'BR06', centers: 18, status: 'SLOTS CONFIRMED' },
    { city: 'Lucknow', state: 'UTTAR PRADESH', code: 'UP10', centers: 38, status: 'SLOTS CONFIRMED' },
    { city: 'Kanpur', state: 'UTTAR PRADESH', code: 'UP09', centers: 32, status: 'SLOTS CONFIRMED' },
    { city: 'Varanasi', state: 'UTTAR PRADESH', code: 'UP18', centers: 28, status: 'SLOTS CONFIRMED' },
    { city: 'Prayagraj (Allahabad)', state: 'UTTAR PRADESH', code: 'UP01', centers: 26, status: 'SLOTS CONFIRMED' },
    { city: 'Mumbai / Navi Mumbai', state: 'MAHARASHTRA', code: 'MR16', centers: 44, status: 'SLOTS CONFIRMED' },
    { city: 'Pune', state: 'MAHARASHTRA', code: 'MR22', centers: 38, status: 'SLOTS CONFIRMED' },
    { city: 'Nagpur', state: 'MAHARASHTRA', code: 'MR17', centers: 22, status: 'SLOTS CONFIRMED' },
    { city: 'Hyderabad / Secunderabad', state: 'TELANGANA', code: 'TL01', centers: 64, status: 'SLOTS CONFIRMED' },
    { city: 'Warangal', state: 'TELANGANA', code: 'TL07', centers: 16, status: 'SLOTS CONFIRMED' },
    { city: 'Bengaluru (Urban & Rural)', state: 'KARNATAKA', code: 'KK04', centers: 56, status: 'SLOTS CONFIRMED' },
    { city: 'Mysuru', state: 'KARNATAKA', code: 'KK12', centers: 14, status: 'SLOTS CONFIRMED' },
    { city: 'Chennai', state: 'TAMIL NADU', code: 'TN02', centers: 40, status: 'SLOTS CONFIRMED' },
    { city: 'Coimbatore', state: 'TAMIL NADU', code: 'TN03', centers: 20, status: 'SLOTS CONFIRMED' },
    { city: 'Kolkata', state: 'WEST BENGAL', code: 'WB10', centers: 46, status: 'SLOTS CONFIRMED' },
    { city: 'Siliguri', state: 'WEST BENGAL', code: 'WB11', centers: 12, status: 'SLOTS CONFIRMED' }
  ];

  const cityListContainer = document.getElementById('city-list-container');
  const stateSelect = document.getElementById('state-select');
  const citySearchInput = document.getElementById('city-search-input');

  function renderCities() {
    if (!cityListContainer) return;
    const selectedState = stateSelect ? stateSelect.value : 'ALL';
    const query = citySearchInput ? citySearchInput.value.toLowerCase().trim() : '';

    const filtered = CITIES_DATA.filter(item => {
      const matchState = selectedState === 'ALL' || item.state === selectedState;
      const matchQuery = query === '' || item.city.toLowerCase().includes(query) || item.code.toLowerCase().includes(query);
      return matchState && matchQuery;
    });

    if (filtered.length === 0) {
      cityListContainer.innerHTML = '<div style="padding: 16px; text-align: center; color: var(--ink-muted); font-size: 13px;">No examination centers match your search.</div>';
      return;
    }

    cityListContainer.innerHTML = filtered.map(item => `
      <div class="city-item">
        <div>
          <div class="city-item-name">${item.city}</div>
          <div class="city-item-code">Center Code: ${item.code} &bull; ${item.centers} Exam Venues</div>
        </div>
        <div class="city-item-badge">${item.status}</div>
      </div>
    `).join('');
  }
  renderCities();

  if (stateSelect) stateSelect.addEventListener('change', () => { renderCities(); playBlip(1100, 0.02); });
  if (citySearchInput) citySearchInput.addEventListener('input', () => { renderCities(); playBlip(950, 0.015); });

  // ------------------------------------------------------------------------
  // 6. Total Marks Calculator
  // ------------------------------------------------------------------------
  const pInput = document.getElementById('marks-physics');
  const cInput = document.getElementById('marks-chemistry');
  const mInput = document.getElementById('marks-maths');
  const totalMarksEl = document.getElementById('calc-total-marks');
  

  function updateScore() {
    const p = Math.max(0, Math.min(100, parseInt(pInput ? pInput.value : 0) || 0));
    const c = Math.max(0, Math.min(100, parseInt(cInput ? cInput.value : 0) || 0));
    const m = Math.max(0, Math.min(100, parseInt(mInput ? mInput.value : 0) || 0));
    const total = p + c + m;

    if (totalMarksEl) totalMarksEl.textContent = `${total} / 300`;

    // Total marks summation
    let pct = 0;
    if (total >= 260) pct = 99.92 + ((total - 260) / 40) * 0.08;
    else if (total >= 220) pct = 99.65 + ((total - 220) / 40) * 0.27;
    else if (total >= 180) pct = 98.90 + ((total - 180) / 40) * 0.75;
    else if (total >= 140) pct = 96.80 + ((total - 140) / 40) * 2.10;
    else if (total >= 100) pct = 91.50 + ((total - 100) / 40) * 5.30;
    else if (total >= 60)  pct = 78.00 + ((total - 60) / 40) * 13.50;
    else pct = Math.max(10, (total / 60) * 78.00);

    if (percentileEl) {
      percentileEl.textContent = `${pct.toFixed(2)} %ile`;
      percentileEl.style.color = pct >= 90 ? '#0E7036' : (pct >= 75 ? '#926600' : '#FF4A22');
    }
  }

  [pInput, cInput, mInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => {
        updateScore();
        playBlip(1300, 0.015);
      });
    }
  });

  // ------------------------------------------------------------------------
  // 7. Timer logic removed

  // ------------------------------------------------------------------------
  // 8. Public Notice Archive Filtering & Global Hotkey
  // ------------------------------------------------------------------------
  const searchInput = document.getElementById('notice-search');
  const tabs = document.querySelectorAll('.filter-pill');
  const noticeRows = document.querySelectorAll('.notice-item-row');
  let activeCat = 'all';

  function filterNotices() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    noticeRows.forEach(row => {
      const cat = row.getAttribute('data-category') || '';
      const text = row.textContent.toLowerCase();

      const matchCat = activeCat === 'all' || cat === activeCat;
      const matchQuery = query === '' || text.includes(query);

      if (matchCat && matchQuery) {
        row.style.display = 'grid';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterNotices();
      playBlip(950, 0.015);
    });

    window.addEventListener('keydown', (e) => {
      if ((e.key === '/' && document.activeElement !== searchInput && document.activeElement.tagName !== 'INPUT') || (e.key === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        searchInput.focus();
        playDing();
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCat = tab.getAttribute('data-cat') || 'all';
      filterNotices();
      playBlip(1300, 0.03);
    });
  });

  // ------------------------------------------------------------------------
  // 9. Interactive Modals (Sample Slip Generator & Candidate Login)
  // ------------------------------------------------------------------------
  const modal = document.getElementById('app-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body-dynamic');

  function openModal(title, contentHtml) {
    if (!modal) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = contentHtml;
    modal.classList.add('active');
    playDing();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    playBlip(600, 0.03);
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Candidate Login Modal
  function showCandidateModal(e) {
    if (e) e.preventDefault();
    openModal('Candidate Authentication Portal', `
      <p class="modal-sub">Log in with Application Number & Password or Candidate ID.</p>
      <div class="form-input-group">
        <label class="form-label">Application Number (12 Digits)</label>
        <input type="text" class="form-control" placeholder="260310000000" value="260310842911" autofocus>
      </div>
      <div class="form-input-group">
        <label class="form-label">Password / Security PIN</label>
        <input type="password" class="form-control" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" value="Password@2026">
      </div>
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        <button class="btn-action" style="flex: 1; padding: 10px; font-size: 13px; justify-content: center; background: #FFFFFF;" onclick="alert('Simulation: Connecting to DigiLocker API (National e-Governance)... Verified via Aadhaar OTP.');">
          🔑 Standard Login
        </button>
      </div>
      <button class="btn-action modal-action-btn" onclick="alert('Demo candidate authenticated.');">
        Sign In to Candidate Dashboard &rarr;
      </button>
    `);
  }

  // Sample Printable Allotment Slip Modal
  function showAdmitModal(e) {
    if (e) e.preventDefault();
    openModal('Advance Exam City Allotment Slip (Sample)', `
      <div id="printable-slip-wrapper">
        <div class="allotment-slip-document" id="printable-slip">
          <div class="slip-header-row">
            <div>
              <div class="slip-seal">EXAMINATION DEMONSTRATION SPECIMEN</div>
              <h4 class="slip-doc-title">JEE (Main) 2026 Session 1</h4>
              <p class="slip-doc-sub">Advance Intimation of Examination City Allotment</p>
            </div>
            <div class="slip-qr-box">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect width="6" height="6" x="3" y="3" rx="1"/>
                <rect width="6" height="6" x="15" y="3" rx="1"/>
                <rect width="6" height="6" x="3" y="15" rx="1"/>
                <path d="M15 15h2v2h-2zM19 19h2v2h-2zM15 19h2v2h-2zM19 15h2v2h-2z"/>
              </svg>
              <div style="font-family: var(--font-mono); font-size: 9px; font-weight: 800; margin-top: 4px;">SAMPLE QR</div>
            </div>
          </div>

          <div class="slip-details-grid">
            <div class="slip-field">
              <span class="slip-field-label">Candidate Name:</span>
              <span class="slip-field-value">SRIJAN PANDEY</span>
            </div>
            <div class="slip-field">
              <span class="slip-field-label">Application Number:</span>
              <span class="slip-field-value">260310842911</span>
            </div>
            <div class="slip-field">
              <span class="slip-field-label">Course Applied:</span>
              <span class="slip-field-value">B.E. / B.Tech (Paper 1)</span>
            </div>
            <div class="slip-field">
              <span class="slip-field-label">Category / Quota:</span>
              <span class="slip-field-value">General-EWS / Home State</span>
            </div>
            <div class="slip-field">
              <span class="slip-field-label">Allotted Exam City:</span>
              <span class="slip-field-value" style="color: #2563EB;">NEW DELHI / NOIDA (NCR)</span>
            </div>
            <div class="slip-field">
              <span class="slip-field-label">City / Center Code:</span>
              <span class="slip-field-value">DL0104 (Zone North)</span>
            </div>
            <div class="slip-field">
              <span class="slip-field-label">Examination Date:</span>
              <span class="slip-field-value" style="color: #0E7036;">24 JANUARY 2026 (SATURDAY)</span>
            </div>
            <div class="slip-field">
              <span class="slip-field-label">Shift & Timing:</span>
              <span class="slip-field-value">Shift 1 (09:00 AM – 12:00 PM)</span>
            </div>
          </div>

          <div class="slip-instructions-box">
            <strong>Mandatory Candidate Advisory:</strong>
            <ul>
              <li>Reporting time at test venue: <strong>07:30 AM IST</strong>. Test center gates close strictly at <strong>08:30 AM IST</strong>.</li>
              <li>Carry this allotment slip along with a valid original Govt Photo ID (Aadhaar / Passport / Voter ID).</li>
              <li>This advance intimation facilitates travel logistics; the final admit card with exact venue building address releases 3 days before exam.</li>
            </ul>
          </div>

          <div class="slip-actions-bar">
            <button class="btn-action" onclick="window.print();" style="background: var(--ink-primary); color: var(--accent-yellow);">
              🖨️ Print / Save Sample PDF
            </button>
          </div>
        </div>
      </div>
    `);
  }

  const btnCandidate = document.getElementById('btn-open-candidate');
  if (btnCandidate) btnCandidate.addEventListener('click', showCandidateModal);

  const footerCandidate = document.getElementById('footer-btn-candidate');
  if (footerCandidate) footerCandidate.addEventListener('click', showCandidateModal);

  const btnAdmit = document.getElementById('btn-open-admit');
  if (btnAdmit) btnAdmit.addEventListener('click', showAdmitModal);

  const footerAdmit = document.getElementById('footer-btn-admit');
  if (footerAdmit) footerAdmit.addEventListener('click', showAdmitModal);

  const urgentLink = document.getElementById('hero-urgent-link');
  if (urgentLink && btnAdmit) {
    urgentLink.addEventListener('click', showAdmitModal);
  }

  // ------------------------------------------------------------------------
  // 10. Real-Time Bilingual Language Toggle Engine (English <-> हिन्दी)
  // ------------------------------------------------------------------------
  let isHindi = false;
  const langBtn = document.getElementById('lang-toggle');

  const DICTIONARY = {
    en: {
      langToggleText: 'हिन्दी',
      logoSub: 'संयुक्त प्रवेश परीक्षा (मुख्य) 2026 • National Portal',
      navActions: 'Candidate Portal',
      navTools: 'Center & Score Tools',
      navMotion: 'Motion Lab',
      navNotices: 'Public Notices',
      navHelpdesk: 'Zonal Helpdesk',
      
      disclaimer: 'Independent public service redesign concept for 1.4M Indian aspirants • Created by Srijan Pandey',
      heroTag: 'National Examination Architecture // Srijan Pandey',
      heroHeadline: 'Built for Clarity.<br>Engineered for <span>1.41 Million</span> Indian Aspirants.',
      heroSub: "A minimalist, lightning-fast national portal for India's biggest engineering entrance examination. Instant advance city intimation, DigiLocker authentication, real-time center explorer, and zero portal downtime.",
      metric1: 'Registered Aspirants',
      metric2: 'Indian Exam Cities',
      metric3: 'National Languages',
      metric4: 'Target CDN Uptime',
      urgentBadge: 'LIVE ALLOTMENT',
      urgentTitle: 'Advance Intimation of Examination City for JEE (Main) 2026 Session 1 is now generated for all registered candidates.',
      urgentBtn: 'Download Slip →',
      bentoHeadline: 'Candidate Action Center',
      bentoSubline: 'Direct access to your examination lifecycle milestones',
      card1Title: 'Candidate Login & Registration',
      card1Desc: 'Access Session 1 & 2 application forms, complete fee transactions, upload sample documents, and track submission status in real-time.',
      card2Title: 'Admit Card & City Slip',
      card2Desc: 'Generate and inspect sample advance exam city allotment and session hall ticket with placeholder verification.',
      card3Title: 'Answer Key & Response Sheet',
      card3Desc: 'Inspect provisional question keys, evaluate candidate answer sheets, and submit recorded challenges with verifiable proof.',
      card4Title: 'Scorecard & All-India Rank',
      card4Desc: 'Access your certified NTA percentile scorecards across Physics, Chemistry, and Mathematics alongside AIR ranks.'
    },
    hi: {
      langToggleText: 'English',
      logoSub: 'राष्ट्रीय परीक्षा पोर्टल • संयुक्त प्रवेश परीक्षा (मुख्य) 2026',
      navActions: 'उम्मीदवार पोर्टल',
      navTools: 'परीक्षा केंद्र एवं अंक साधन',
      navMotion: 'मोशन लैब',
      navNotices: 'सार्वजनिक सूचनाएं',
      navHelpdesk: 'जोनल सहायता केंद्र',
      
      disclaimer: '14 लाख भारतीय छात्रों के लिए स्वतंत्र लोक-सेवा रीडिजाइन अवधारणा • सृजन पांडेय द्वारा निर्मित',
      heroTag: 'राष्ट्रीय परीक्षा वास्तुकला // सृजन पांडेय',
      heroHeadline: 'स्पष्टता के लिए निर्मित।<br><span>14.1 लाख</span> भारतीय छात्रों के लिए समर्पित।',
      heroSub: 'भारत की सबसे बड़ी इंजीनियरिंग प्रवेश परीक्षा के लिए एक सरल, न्यूनतम और तीव्र राष्ट्रीय पोर्टल। तत्काल परीक्षा शहर आवंटन, डिजिलॉकर प्रमाणीकरण, एवं शून्य डाउनटाइम।',
      metric1: 'पंजीकृत उम्मीदवार',
      metric2: 'भारतीय परीक्षा शहर',
      metric3: 'राष्ट्रीय भाषाएं',
      metric4: 'लक्षित सर्वर अपटाइम',
      urgentBadge: 'आवंटन जारी',
      urgentTitle: 'सत्र 1 हेतु परीक्षा शहर की अग्रिम सूचना पर्ची सभी पंजीकृत उम्मीदवारों के लिए जारी कर दी गई है।',
      urgentBtn: 'पर्ची डाउनलोड करें →',
      bentoHeadline: 'उम्मीदवार कार्य केंद्र',
      bentoSubline: 'अपनी परीक्षा प्रक्रिया के मुख्य चरणों तक सीधी पहुंच',
      card1Title: 'उम्मीदवार लॉगिन एवं पंजीकरण',
      card1Desc: 'सत्र 1 और 2 के आवेदन पत्र, शुल्क भुगतान, आधार एवं डिजिलॉकर दस्तावेज सत्यापन, एवं आवेदन स्थिति की रियल-टाइम जांच।',
      card2Title: 'प्रवेश पत्र एवं शहर पर्ची',
      card2Desc: 'क्यूआर कोड युक्त प्रमाणित परीक्षा शहर आवंटन पर्ची एवं सत्र हॉल टिकट सीधे जनरेट और डाउनलोड करें।',
      card3Title: 'उत्तर कुंजी एवं प्रतिक्रिया पत्रक',
      card3Desc: 'अनंतिम प्रश्न कुंजियों का मिलान करें, अपने प्रतिक्रिया पत्रक की जांच करें, एवं आपत्तियां दर्ज करें।',
      card4Title: 'स्कोरकार्ड एवं अखिल भारतीय रैंक',
      card4Desc: 'भौतिकी, रसायन विज्ञान एवं गणित के प्रमाणित एनटीए परसेंटाइल स्कोरकार्ड एवं मेरिट रैंक देखें।'
    }
  };

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      isHindi = !isHindi;
      const t = isHindi ? DICTIONARY.hi : DICTIONARY.en;
      langBtn.textContent = t.langToggleText;

      const setTxt = (id, html) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      };

      setTxt('txt-logo-sub', t.logoSub);
      setTxt('nav-actions', t.navActions);
      setTxt('nav-tools', t.navTools);
      setTxt('nav-motion', t.navMotion);
      setTxt('nav-notices', t.navNotices);
      setTxt('nav-helpdesk', t.navHelpdesk);
      
      setTxt('txt-disclaimer', t.disclaimer);
      setTxt('txt-hero-tag', t.heroTag);
      setTxt('txt-hero-headline', t.heroHeadline);
      setTxt('txt-hero-sub', t.heroSub);
      setTxt('txt-metric-1', t.metric1);
      setTxt('txt-metric-2', t.metric2);
      setTxt('txt-metric-3', t.metric3);
      setTxt('txt-metric-4', t.metric4);
      setTxt('txt-urgent-badge', t.urgentBadge);
      setTxt('txt-urgent-title', t.urgentTitle);
      setTxt('txt-urgent-btn', t.urgentBtn);
      setTxt('txt-bento-headline', t.bentoHeadline);
      setTxt('txt-bento-subline', t.bentoSubline);
      setTxt('txt-card1-title', t.card1Title);
      setTxt('txt-card1-desc', t.card1Desc);
      setTxt('txt-card2-title', t.card2Title);
      setTxt('txt-card2-desc', t.card2Desc);
      setTxt('txt-card3-title', t.card3Title);
      setTxt('txt-card3-desc', t.card3Desc);
      setTxt('txt-card4-title', t.card4Title);
      setTxt('txt-card4-desc', t.card4Desc);

      playDing();
    });
  }

});

  // ------------------------------------------------------------------------
  // Modern Liquid Glass Floater Handler
  // ------------------------------------------------------------------------
  const floater = document.querySelector('.liquid-glass-floater');
  const floaterCloseBtn = document.getElementById('floater-close-btn');
  if (floater && floaterCloseBtn) {
    floaterCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      floater.classList.toggle('collapsed');
      floaterCloseBtn.textContent = floater.classList.contains('collapsed') ? '+' : '✕';
    });
    floater.addEventListener('click', () => {
      if (floater.classList.contains('collapsed')) {
        floater.classList.remove('collapsed');
        floaterCloseBtn.textContent = '✕';
      }
    });
  }


  // ------------------------------------------------------------------------
  // Dynamic Cursor-Motion Floater Pill (Motion-Activated Contextual Floater)
  // ------------------------------------------------------------------------
  const cursorFloater = document.getElementById('cursor-floater');
  if (cursorFloater) {
    let floaterTimeout = null;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      cursorFloater.classList.add('active');

      // Contextual Label Intelligence
      const target = e.target;
      if (target.closest('#hero-viewport')) {
        cursorFloater.textContent = '📍 Drop City Slip';
      } else if (target.closest('.card-primary')) {
        cursorFloater.textContent = '🔐 Candidate Login';
      } else if (target.closest('.card-secondary')) {
        cursorFloater.textContent = '📄 City Allotment Slip';
      } else if (target.closest('.card-half-1')) {
        cursorFloater.textContent = '🧮 CBT Response Key';
      } else if (target.closest('.card-half-2')) {
        cursorFloater.textContent = '📊 Score Normalization';
      } else if (target.closest('#state-chips-container, #city-search-input')) {
        cursorFloater.textContent = '🔍 Filter 312 Cities';
      } else if (target.closest('.score-fields-trio')) {
        cursorFloater.textContent = '🎯 Marks Calculator';
      } else if (target.closest('.iit-sketch-wrap, .helpdesk-card')) {
        cursorFloater.textContent = '🏛 IIT Zonal Desk';
      } else if (target.closest('.notice-row-clean')) {
        cursorFloater.textContent = '📥 Information Bulletin';
      } else if (target.closest('header, .top-ticker-ribbon')) {
        cursorFloater.textContent = '★ JEE Main 2026';
      } else {
        cursorFloater.textContent = '⚡ Concept Redesign';
      }

      clearTimeout(floaterTimeout);
      floaterTimeout = setTimeout(() => {
        cursorFloater.classList.remove('active');
      }, 1400);
    });

    // Smooth Spring Dampening Animation Loop for Cursor Floater
    function updateCursorFloater() {
      curX += (targetX - curX) * 0.22;
      curY += (targetY - curY) * 0.22;
      cursorFloater.style.left = curX + 'px';
      cursorFloater.style.top = curY + 'px';
      requestAnimationFrame(updateCursorFloater);
    }
    updateCursorFloater();
  }

  // ------------------------------------------------------------------------
  // State Chips Quick-Filter for 300+ Exam Cities
  // ------------------------------------------------------------------------
  const stateChips = document.querySelectorAll('.state-chip');
  const stateSelect = document.getElementById('state-select');
  if (stateChips.length && stateSelect) {
    stateChips.forEach(chip => {
      chip.addEventListener('click', () => {
        stateChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        stateSelect.value = chip.dataset.state;
        stateSelect.dispatchEvent(new Event('change'));
      });
    });
  }

  // ------------------------------------------------------------------------
  // Interactive Score Sliders Synchronization
  // ------------------------------------------------------------------------
  const sliderP = document.getElementById('slider-physics');
  const sliderC = document.getElementById('slider-chem');
  const sliderM = document.getElementById('slider-maths');
  const badgeP = document.getElementById('physics-val-badge');
  const badgeC = document.getElementById('chem-val-badge');
  const badgeM = document.getElementById('maths-val-badge');
  const barP = document.getElementById('bar-physics');
  const barC = document.getElementById('bar-chem');
  const barM = document.getElementById('bar-maths');
  const calcTotal = document.getElementById('calc-total-marks');

  function updateScoreCalculations() {
    const p = sliderP ? parseInt(sliderP.value, 10) : 0;
    const c = sliderC ? parseInt(sliderC.value, 10) : 0;
    const m = sliderM ? parseInt(sliderM.value, 10) : 0;

    if (badgeP) badgeP.textContent = p;
    if (badgeC) badgeC.textContent = c;
    if (badgeM) badgeM.textContent = m;

    if (barP) barP.style.width = p + '%';
    if (barC) barC.style.width = c + '%';
    if (barM) barM.style.width = m + '%';

    const total = p + c + m;
    if (calcTotal) calcTotal.textContent = total + ' / 300';
  }

  if (sliderP && sliderC && sliderM) {
    [sliderP, sliderC, sliderM].forEach(s => s.addEventListener('input', updateScoreCalculations));
    updateScoreCalculations();
  }
