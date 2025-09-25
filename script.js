document.querySelectorAll('.gallery-item').forEach(img => {
    img.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            cursor: zoom-out;
        `;
        const enlarged = document.createElement('img');
        enlarged.src = this.src;
        enlarged.style.maxWidth = '90%';
        enlarged.style.maxHeight = '90%';
        enlarged.style.objectFit = 'contain';
        modal.appendChild(enlarged);
        document.body.appendChild(modal);
        modal.onclick = () => document.body.removeChild(modal);
    });
});