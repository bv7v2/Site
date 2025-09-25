document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('images/portfolio.json');
        if (!response.ok) throw new Error('Не удалось загрузить portfolio.json');
        
        const data = await response.json();

        // Обработка категории
        function renderGallery(categoryKey, galleryId, sectionId) {
            const gallery = document.getElementById(galleryId);
            const section = document.getElementById(sectionId);
            
            if (!gallery || !section) return;

            const items = data[categoryKey] || [];
            
            if (items.length === 0) {
                section.style.display = 'none';
                return;
            }

            section.style.display = 'block';
            gallery.innerHTML = '';

            items.forEach(item => {
                const img = document.createElement('img');
                img.src = item.url;
                img.alt = item.alt;
                img.className = 'gallery-item';
                
                // Для Lightbox: оберни в <a>
                const link = document.createElement('a');
                link.href = item.url;
                link.setAttribute('data-lightbox', categoryKey);
                link.setAttribute('data-title', item.alt);
                link.appendChild(img);
                gallery.appendChild(link);

                gallery.appendChild(img);
            });
        }

        // Рендер всех категорий
        renderGallery('girls', 'girls-gallery', 'girls-section');
        renderGallery('guys', 'guys-gallery', 'guys-section');
        renderGallery('family', 'family-gallery', 'family-section');

    } catch (error) {
        console.error('Ошибка загрузки портфолио:', error);
        document.querySelectorAll('.gallery-grid').forEach(grid => {
            grid.innerHTML = '<p>Не удалось загрузить фото. Обновите страницу.</p>';
        });
    }
});