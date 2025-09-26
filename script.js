document.addEventListener('DOMContentLoaded', async () => {
    const main = document.querySelector('.portfolios');
    if (!main) return;

    try {
        const response = await fetch('images/portfolio.json');
        if (!response.ok) throw new Error('Не удалось загрузить portfolio.json');
        const data = await response.json();

        const categories = [
            { key: 'girls', title: 'Девушки' },
            { key: 'guys', title: 'Парни' },
            { key: 'family', title: 'Семья' }
        ];

        categories.forEach(cat => {
            const catData = data[cat.key];
            if (!catData || !Array.isArray(catData.photos) || catData.photos.length === 0) {
                return;
            }

            const photos = catData.photos;
            const previewPhotos = photos.slice(0, 6);

            const section = document.createElement('section');
            section.className = 'portfolio-category';
            section.innerHTML = `
                <h2>${cat.title}</h2>
                <div class="slider-container" data-category="${cat.key}">
                    <div class="slider"></div>
                    <div class="slider-nav">
                        <button class="prev-btn">‹</button>
                        <button class="next-btn">›</button>
                    </div>
                    <div class="slider-dots"></div>
                </div>
            `;
            main.appendChild(section);

            const slider = section.querySelector('.slider');
            const dotsContainer = section.querySelector('.slider-dots');
            const prevBtn = section.querySelector('.prev-btn');
            const nextBtn = section.querySelector('.next-btn');

            let currentIndex = 0;
            const total = previewPhotos.length;

            // Заполняем слайдер изображениями
            slider.innerHTML = previewPhotos.map(p => `
                <img src="${p.url}" 
                     alt="${p.alt}" 
                     loading="lazy" 
                     decoding="async" 
                     fetchpriority="low"
                     onerror="this.style.opacity='0.3'; this.title='Изображение недоступно'">
            `).join('');

            // Создаём точки пагинации
            dotsContainer.innerHTML = previewPhotos.map((_, i) =>
                `<button class="${i === 0 ? 'active' : ''}"></button>`
            ).join('');

            const dots = dotsContainer.querySelectorAll('button');

            const updateSlider = () => {
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            };

            // Навигация
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + total) % total;
                updateSlider();
            });

            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % total;
                updateSlider();
            });

            dots.forEach((dot, i) => {
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentIndex = i;
                    updateSlider();
                });
            });

            // Автопрокрутка
            let autoSlide = setInterval(() => {
                currentIndex = (currentIndex + 1) % total;
                updateSlider();
            }, 5000);

            const container = section.querySelector('.slider-container');
            container.addEventListener('mouseenter', () => clearInterval(autoSlide));
            container.addEventListener('mouseleave', () => {
                clearInterval(autoSlide);
                autoSlide = setInterval(() => {
                    currentIndex = (currentIndex + 1) % total;
                    updateSlider();
                }, 5000);
            });

            // === Lightbox: добавляем ВСЕ фото категории в DOM (скрытые ссылки) ===
            photos.forEach(photo => {
                const link = document.createElement('a');
                link.href = photo.url;
                link.setAttribute('data-lightbox', cat.key);
                link.setAttribute('data-title', photo.alt);
                link.style.display = 'none';
                document.body.appendChild(link); // добавляем в body — чище
            });

            // Клик по слайдеру → открываем Lightbox с первой фото категории
            container.addEventListener('click', () => {
                const firstLink = document.querySelector(`a[data-lightbox="${cat.key}"]`);
                if (firstLink) {
                    firstLink.click();
                }
            });
        });

    } catch (error) {
        console.error('Ошибка загрузки портфолио:', error);
        main.innerHTML = '<p style="text-align:center; padding:40px; color:#555;">Не удалось загрузить портфолио. Обновите страницу.</p>';
    }
});
