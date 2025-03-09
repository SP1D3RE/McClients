
document.addEventListener('DOMContentLoaded', function() {
    // Load default images for client cards
    loadDefaultImages();
    
    // Add click handlers to client image containers to allow image upload
    const imageContainers = document.querySelectorAll('.client-image');

    imageContainers.forEach(container => {
        // Load any previously stored custom images (override default images)
        const savedImage = localStorage.getItem(container.id);
        if (savedImage) {
            // Clear the container
            container.innerHTML = '';

            // Create and add the saved image
            const img = document.createElement('img');
            img.src = savedImage;
            container.appendChild(img);
        }

        // Add click handlers to client image containers to allow image upload
        container.addEventListener('click', function() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';

            fileInput.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        // Clear the container
                        container.innerHTML = '';
                        
                        // Create and add the image
                        const img = document.createElement('img');
                        img.src = event.target.result;
                        container.appendChild(img);
                        
                        // Store the image in localStorage
                        localStorage.setItem(container.id, event.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
            fileInput.click();
        });
    });
});

function loadDefaultImages() {
    // Set default images based on provided URLs
    const defaultImages = {
        'chest-client-img': 'https://www.9minecraft.net/wp-content/uploads/2022/10/1-Chest-Client-MCPE.jpg',
        'astral-client-img': 'https://www.9minecraft.net/wp-content/uploads/2022/06/Logo-Astral-Client.jpg',
        'tiger-client-img': '[No image found]',
        'invoker-client-img': 'https://www.9minecraft.net/wp-content/uploads/2022/06/Logo-Evoker-UI-Pack.jpg',
        'lighting-client-img': 'https://www.9minecraft.net/wp-content/uploads/2022/06/Lightning-Client.jpg',
        'codebreaker-client-img': 'https://www.9minecraft.net/wp-content/uploads/2023/04/CodeBreaker-Client-MCPE-Thumbnail.jpg'
    };
    
    for (const [id, url] of Object.entries(defaultImages)) {
        const container = document.getElementById(id);
        if (container && !localStorage.getItem(id)) {
            if (url === '[No image found]') {
                container.innerHTML = '<p>No image found</p>';
            } else {
                container.innerHTML = '';
                const img = document.createElement('img');
                img.src = url;
                img.onerror = function() {
                    container.innerHTML = '<p>Image failed to load</p>';
                };
                container.appendChild(img);
            }
        }
    }
}
