const candidates = [
  {
    rank: 1,
    name: 'Travis Hunter',
    school: 'Colorado',
    odds: '+180',
    position: 'CB / WR',
    photo: 'https://a.espncdn.com/i/headshots/college-football/players/full/4682060.png',
    color: '#d8aa3a',
    stats: { passing: '—', rushing: '81 yds', receiving: '1,004 yds', td: '15', efficiency: '65.4%' }
  },
  {
    rank: 2,
    name: 'Jeremiah Smith',
    school: 'Ohio State',
    odds: '+260',
    position: 'WR',
    photo: 'https://a.espncdn.com/i/headshots/college-football/players/full/5158625.png',
    color: '#bb1e2d',
    stats: { passing: '—', rushing: '—', receiving: '1,248 yds', td: '17', efficiency: '28.7 ypr' }
  },
  {
    rank: 3,
    name: 'Bo Nix',
    school: 'Oregon',
    odds: '+420',
    position: 'QB',
    photo: 'https://a.espncdn.com/i/headshots/college-football/players/full/4567198.png',
    color: '#154733',
    stats: { passing: '3,540 yds', rushing: '145 yds', receiving: '—', td: '38', efficiency: '76.1%' }
  },
  {
    rank: 4,
    name: 'Jayden Daniels',
    school: 'LSU',
    odds: '+700',
    position: 'QB',
    photo: 'https://a.espncdn.com/i/headshots/college-football/players/full/4432813.png',
    color: '#461d7c',
    stats: { passing: '3,170 yds', rushing: '620 yds', receiving: '—', td: '36', efficiency: '77.5%' }
  },
  {
    rank: 5,
    name: 'Carson Beck',
    school: 'Georgia',
    odds: '+1100',
    position: 'QB',
    photo: 'https://a.espncdn.com/i/headshots/college-football/players/full/4432608.png',
    color: '#ba0c2f',
    stats: { passing: '3,420 yds', rushing: '111 yds', receiving: '—', td: '31', efficiency: '72.8%' }
  },
  {
    rank: 6,
    name: 'Quinshon Judkins',
    school: 'Ohio State',
    odds: '+1600',
    position: 'RB',
    photo: 'https://a.espncdn.com/i/headshots/college-football/players/full/4689819.png',
    color: '#bb1e2d',
    stats: { passing: '—', rushing: '1,372 yds', receiving: '286 yds', td: '21', efficiency: '6.1 ypc' }
  }
];

const canvas = document.getElementById('heismanCanvas');
const listEl = document.getElementById('heismanList');
const favoriteName = document.getElementById('favoriteName');
const resumeName = document.getElementById('resumeName');
const explosiveName = document.getElementById('explosiveName');

favoriteName.textContent = candidates[0].name;
resumeName.textContent = 'Bo Nix';
explosiveName.textContent = 'Jeremiah Smith';

function renderCandidates() {
  listEl.innerHTML = candidates.map((player) => `
    <article class="heisman-card ${player.rank === 1 ? 'lead' : ''}">
      <div class="heisman-headshot">
        <img src="${player.photo}" alt="${player.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="heisman-fallback" style="display:none;">${player.name.split(' ').map((part) => part[0]).slice(0,2).join('')}</div>
      </div>
      <div>
        <div class="heisman-meta">
          <span class="heisman-rank">#${player.rank}</span>
          <div class="heisman-player">
            <h3>${player.name}</h3>
            <p>${player.school} · ${player.position}</p>
          </div>
          <span class="heisman-odds">${player.odds}</span>
        </div>
        <div class="heisman-stats">
          <div class="heisman-stat">
            <span class="heisman-stat-label">PASS</span>
            <span class="heisman-stat-value">${player.stats.passing}</span>
          </div>
          <div class="heisman-stat">
            <span class="heisman-stat-label">RUSH</span>
            <span class="heisman-stat-value">${player.stats.rushing}</span>
          </div>
          <div class="heisman-stat">
            <span class="heisman-stat-label">TD</span>
            <span class="heisman-stat-value">${player.stats.td}</span>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

function drawHeismanGraphic() {
  const ctx = canvas.getContext('2d');
  const W = 1080;
  const H = 1350;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#f0eee8';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#101311';
  ctx.fillRect(0, 0, W, 270);
  ctx.fillStyle = '#3f7954';
  ctx.fillRect(0, 0, 28, H);

  ctx.fillStyle = '#f0eee8';
  ctx.font = '500 18px DM Mono';
  ctx.fillText('FULL 9 YARDS  /  HEISMAN WATCH', 72, 62);
  ctx.font = '900 88px Barlow Condensed';
  ctx.fillText('TOP CANDIDATES', 72, 152);
  ctx.font = '600 26px Manrope';
  ctx.fillText('WHO’S GOT THE BEST RESUMÉ?', 75, 207);

  ctx.fillStyle = '#101311';
  ctx.font = '500 18px DM Mono';
  ctx.fillText('WEEK 5 | 2026', 72, 305);

  ctx.strokeStyle = '#bbbdb4';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(72, 332);
  ctx.lineTo(1008, 332);
  ctx.stroke();

  candidates.forEach((player, index) => {
    const x = 70;
    const y = 365 + index * 135;
    const cardH = 118;
    const cardW = 940;

    ctx.fillStyle = index === 0 ? '#f3f0e8' : '#f8f6f2';
    ctx.fillRect(x, y, cardW, cardH);
    ctx.strokeStyle = '#d4d1ca';
    ctx.strokeRect(x, y, cardW, cardH);

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x + 70, y + 58, 40, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(image, x + 30, y + 18, 80, 80);
      ctx.restore();
    };
    image.onerror = () => {
      ctx.fillStyle = '#101311';
      ctx.font = '800 22px Barlow Condensed';
      const initials = player.name.split(' ').map((part) => part[0]).slice(0, 2).join('');
      ctx.fillText(initials, x + 43, y + 70);
    };
    image.src = player.photo;

    ctx.fillStyle = '#3f7954';
    ctx.font = '800 24px Barlow Condensed';
    ctx.fillText(`#${player.rank}`, x + 150, y + 42);

    ctx.fillStyle = '#101311';
    ctx.font = '800 30px Barlow Condensed';
    ctx.fillText(player.name, x + 190, y + 46);

    ctx.fillStyle = '#5e655d';
    ctx.font = '500 10px DM Mono';
    ctx.fillText(`${player.school.toUpperCase()} · ${player.position.toUpperCase()}`, x + 190, y + 68);

    ctx.fillStyle = '#101311';
    ctx.fillRect(x + 720, y + 22, 160, 52);
    ctx.fillStyle = '#f5f2ec';
    ctx.font = '800 22px Barlow Condensed';
    ctx.fillText(player.odds, x + 782, y + 56);

    ctx.fillStyle = '#5e655d';
    ctx.font = '500 10px DM Mono';
    ctx.fillText('PASS', x + 190, y + 88);
    ctx.fillText('RUSH', x + 300, y + 88);
    ctx.fillText('TD', x + 410, y + 88);

    ctx.fillStyle = '#101311';
    ctx.font = '800 18px Barlow Condensed';
    ctx.fillText(player.stats.passing, x + 190, y + 108);
    ctx.fillText(player.stats.rushing, x + 300, y + 108);
    ctx.fillText(player.stats.td, x + 410, y + 108);
  });

  ctx.fillStyle = '#101311';
  ctx.fillRect(0, 1240, W, 110);
  ctx.fillStyle = '#f0eee8';
  ctx.font = '800 32px Barlow Condensed';
  ctx.fillText('HEISMAN RACE', 72, 1302);
  ctx.font = '500 16px DM Mono';
  ctx.fillText('LIVE ODDS / 2026', 790, 1302);
}

renderCandidates();
drawHeismanGraphic();

window.addEventListener('resize', drawHeismanGraphic);
