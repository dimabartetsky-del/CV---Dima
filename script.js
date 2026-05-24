const browserInfo = {
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  cookiesEnabled: navigator.cookieEnabled,
  screenWidth: screen.width,
  screenHeight: screen.height,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  visitedAt: new Date().toLocaleString('uk-UA'),
};

localStorage.setItem('browserInfo', JSON.stringify(browserInfo));


const stored = JSON.parse(localStorage.getItem('browserInfo'));

const labels = {
  userAgent: 'User Agent',
  platform: 'Платформа',
  language: 'Мова браузера',
  cookiesEnabled: 'Cookies увімкнені',
  screenWidth: 'Ширина екрану',
  screenHeight: 'Висота екрану',
  windowWidth: 'Ширина вікна',
  windowHeight: 'Висота вікна',
  timezone: 'Часовий пояс',
  visitedAt: 'Час відвідування',
};

const systemInfoEl = document.getElementById('system-info');

if (systemInfoEl && stored) {
  const items = Object.entries(stored)
    .map(([key, value]) => `<li><strong>${labels[key] || key}:</strong> ${value}</li>`)
    .join('');

  systemInfoEl.innerHTML = `<ul>${items}</ul>`;
}


const themeToggle = document.getElementById('theme-toggle');

function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add('dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  } else {
    document.body.classList.remove('dark');
    if (themeToggle) themeToggle.textContent = '🌙';
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

const hour = new Date().getHours();
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  setTheme(savedTheme === 'dark');
} else {
  setTheme(hour < 7 || hour >= 21);
}

// Ручне перемикання
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    setTheme(!isDark);
  });
}


const modal = document.getElementById('feedback-modal');
const closeModal = document.getElementById('close-modal');

setTimeout(() => {
  if (modal) modal.style.display = 'block';
}, 60000); 

if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}


const commentsListEl = document.getElementById('comments-list');

if (commentsListEl) {
  fetch('https://jsonplaceholder.typicode.com/posts/2/comments')
    .then(response => response.json())
    .then(comments => {
      const html = comments.map(comment => `
        <article>
          <h3>${comment.name}</h3>
          <p><a href="mailto:${comment.email}">${comment.email}</a></p>
          <p>${comment.body}</p>
        </article>
      `).join('');

      commentsListEl.innerHTML = html;
    })
    .catch(error => {
      commentsListEl.innerHTML = '<p>Не вдалося завантажити коментарі.</p>';
      console.error('Помилка:', error);
    });
}