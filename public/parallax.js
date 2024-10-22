const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const header = document.querySelector('.header');
        
        // Handle smooth parallax on scroll
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.min(1, window.scrollY / window.innerHeight);
            const startY = 50; // Start at 50%
            const endY = 5;    // End at 5%
            const startSize = 3;  // Start at 3em
            const endSize = 1.5;  // End at 1.5em
            
            const currentY = startY + (endY - startY) * scrollPercent;
            const currentSize = startSize + (endSize - startSize) * scrollPercent;
            
            header.style.top = `${currentY}%`;
            header.style.fontSize = `${currentSize}em`;
        });