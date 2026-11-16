document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Скрипт загружен');

  // ===== Мобильное меню =====
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('nav--open');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('nav--open'));
    });
  }

  // ===== Демо-чат =====
  const chatBody = document.getElementById('chatBody');
  const suggestions = document.getElementById('chatSuggestions');

  console.log('chatBody:', chatBody);
  console.log('suggestions:', suggestions);

  if (chatBody && suggestions) {
    console.log('✅ Элементы чата найдены');

    const answers = {
      status: 'Уточните, пожалуйста, номер заказа — я сразу сообщу его статус. Обычно заказ доставляется в течение 2–5 дней после оформления.',
      return: 'Оформить возврат можно в личном кабинете маркетплейса в разделе «Мои заказы» → «Вернуть товар». Если заказ ещё не доставлен — просто отмените его. Если уже получен — приложите товар в оригинальной упаковке.',
      size: 'Размерная сетка указана в карточке товара. Если сомневаетесь — сообщите ваши параметры (рост, объём груди/талии), и я помогу подобрать.',
      operator: 'Передаю диалог оператору. Среднее время ожидания — 2–3 минуты. Пожалуйста, оставайтесь на связи.'
    };

    const buttons = suggestions.querySelectorAll('.suggestion');
    console.log('Кнопок найдено:', buttons.length);

    buttons.forEach((btn, index) => {
      console.log(`Кнопка ${index}:`, btn.dataset.q);
      btn.addEventListener('click', function() {
        console.log('🖱️ Клик по кнопке:', this.dataset.q);
        const key = this.dataset.q;
        if (!key) return;

        // Сообщение пользователя
        const userMsg = document.createElement('div');
        userMsg.className = 'msg msg--user';
        userMsg.textContent = this.textContent.trim();
        chatBody.appendChild(userMsg);

        // Скрыть подсказки
        suggestions.style.display = 'none';

        // Ответ бота с задержкой
        setTimeout(() => {
          const botMsg = document.createElement('div');
          botMsg.className = 'msg msg--bot';
          botMsg.textContent = answers[key] || 'Спасибо за вопрос! Передаю его оператору.';
          chatBody.appendChild(botMsg);
          chatBody.scrollTop = chatBody.scrollHeight;

          setTimeout(() => {
            suggestions.style.display = 'flex';
          }, 2000);
        }, 700);

        chatBody.scrollTop = chatBody.scrollHeight;
      });
    });
  } else {
    console.log('❌ Элементы чата НЕ найдены — проверьте ID в HTML');
  }

  // ===== Форма заявки =====
  const form = document.getElementById('leadForm');
  const notice = document.getElementById('formNotice');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const marketplace = form.marketplace.value;

      if (!name || name.length < 2) {
        showNotice('Пожалуйста, укажите имя (минимум 2 символа).', 'err');
        return;
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        showNotice('Проверьте корректность email.', 'err');
        return;
      }
      if (!marketplace) {
        showNotice('Выберите маркетплейс.', 'err');
        return;
      }

      showNotice('Демонстрационная форма — данные не отправляются. Спасибо, ' + name + '!', 'ok');
      form.reset();
    });
  }

  function showNotice(text, type) {
    if (!notice) return;
    notice.hidden = false;
    notice.textContent = text;
    notice.className = 'form__notice form__notice--' + type;
    setTimeout(() => { notice.hidden = true; }, 6000);
  }
});