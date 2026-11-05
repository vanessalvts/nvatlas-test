const lang = localStorage.getItem('nvatlas-lang') || 'en';
document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
document.body.classList.toggle('zh', lang === 'zh');
document.querySelectorAll('[data-lang]').forEach(button => {
  button.classList.toggle('active', button.dataset.lang === lang);
  button.addEventListener('click', () => {
    const next = button.dataset.lang;
    localStorage.setItem('nvatlas-lang', next);
    document.documentElement.lang = next === 'zh' ? 'zh-Hant' : 'en';
    document.body.classList.toggle('zh', next === 'zh');
    document.querySelectorAll('[data-en][data-zh]').forEach(el => {
      el.textContent = el.dataset[next];
    });
    document.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('active', b.dataset.lang === next));
    document.title = document.title.replace(/^.*?\|/, `${next === 'zh' ? 'NV Atlas 中文' : 'NV Atlas'} |`);
  });
});
document.querySelectorAll('[data-en][data-zh]').forEach(el => {
  el.textContent = el.dataset[lang];
});
