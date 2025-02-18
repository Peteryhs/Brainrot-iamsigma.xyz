const galleryItems = [
    {
        image: 'https://cdn.brainrot.best/DSC03575.JPG',
        title: 'Huron.jpg',
        description: 'The Huron River',
        size: '2.4 MB',
        date: '2024-01-15',
        type: 'IMAGE/SIGMA',
        metadata: {
            resolution: '3840x2160',
            format: 'JPEG',
            location: 'Kincardine',
            tags: ['DSLR', 'huron', 'river', 'sunset'],
            stats: {
                'Sigma Level': '98%',
                'Neural Density': '145%',
                'Reality Distortion': 'Maximum',
                'Beta Resistance': 'Absolute'
            }
        }
    },
    {
        image: 'https://cdn.brainrot.best/173170777241519163.jpg',
        title: 'Regina_Legislative.jpg',
        description: 'The Legislative Assembly',
        size: '1.8 MB',
        date: '2024-01-14',
        type: 'IMAGE/SIGMA',
        metadata: {
            resolution: '3840x2160',
            format: 'JPEG',
            location: 'Regina',
            tags: ['legislative', 'assembly', 'Vintage'],
            stats: {
                'Sigma Level': '95%',
                'Neural Density': '130%',
                'Reality Distortion': 'High',
                'Beta Resistance': 'Strong'
            }
        }
    },
    {
        image: 'https://cdn.brainrot.best/DSC02786-EFFECTS.jpg',
        title: 'Lake_Ontario.jpg',
        description: 'A tranquil lake in Ontario',
        size: '3.1 MB',
        date: '2024-01-13',
        type: 'IMAGE/SIGMA',
        metadata: {
            resolution: '3840x2160',
            format: 'JPEG',
            location: 'Oakville',
            tags: ['lake', 'ontario', 'tranquil', 'lake'],
            stats: {
                'Sigma Level': '99%',
                'Neural Density': '150%',
                'Reality Distortion': 'Maximum',
                'Beta Resistance': 'Absolute'
            }
        }
    },
    {
        image: 'https://cdn.brainrot.best/DSC02372.JPG',
        title: 'Kamloops_Mountains.jpg',
        description: 'The majestic mountains of Kamloops',
        size: '2.7 MB',
        date: '2024-01-12',
        type: 'IMAGE/SIGMA',
        metadata: {
            resolution: '3840x2160',
            format: 'JPEG',
            location: 'Kamloops',
            tags: ['mountains', 'kamloops'],
            stats: {
                'Sigma Level': '96%',
                'Neural Density': '135%',
                'Reality Distortion': 'High',
                'Beta Resistance': 'Strong'
            }
        }
    },

];

// Initialize file explorer
function initFileExplorer() {
    const fileList = document.querySelector('.file-list');
    
    // Add files to list
    galleryItems.forEach(item => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        fileItem.innerHTML = `
            <img class="file-thumbnail" src="${item.image}" alt="${item.title}">
            <div class="file-name">${item.title}</div>
            <div class="file-size">${item.size}</div>
            <div class="file-date">${item.date}</div>
            <div class="file-type">${item.type}</div>
        `;
        
        // Click handler for expanding
        fileItem.addEventListener('click', () => {
            showExpandedView(item);
        });
        
        fileList.appendChild(fileItem);
    });
}

function showExpandedView(item) {
    const expandedView = document.createElement('div');
    expandedView.className = 'expanded-view';
    
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    const exitHint = document.createElement('div');
    exitHint.className = 'exit-hint';
    exitHint.textContent = 'Press ESC or click outside to close';
    
    expandedView.innerHTML = `
        <div class="expanded-header">
            <div class="expanded-title">${item.title}</div>
            <div class="expanded-controls">
                <button class="expanded-control download-btn">DOWNLOAD</button>
                <button class="expanded-control close-btn">CLOSE</button>
            </div>
        </div>
        <div class="expanded-content">
            <div class="expanded-image-container">
                <img class="expanded-image" src="${item.image}" alt="${item.title}">
            </div>
            <div class="expanded-details">
                <div class="detail-section">
                    <div class="detail-title">FILE INFO</div>
                    <div class="detail-content">
                        <div class="detail-stat">
                            <span class="detail-label">Size:</span>
                            <span class="detail-value">${item.size}</span>
                        </div>
                        <div class="detail-stat">
                            <span class="detail-label">Date:</span>
                            <span class="detail-value">${item.date}</span>
                        </div>
                        <div class="detail-stat">
                            <span class="detail-label">Resolution:</span>
                            <span class="detail-value">${item.metadata.resolution}</span>
                        </div>
                        <div class="detail-stat">
                            <span class="detail-label">Format:</span>
                            <span class="detail-value">${item.metadata.format}</span>
                        </div>
                    </div>
                </div>
                <div class="detail-section">
                    <div class="detail-title">DESCRIPTION</div>
                    <div class="detail-content">${item.description}</div>
                </div>
                <div class="detail-section">
                    <div class="detail-title">METADATA</div>
                    <div class="detail-content">
                        <div class="detail-stat">
                            <span class="detail-label">Location:</span>
                            <span class="detail-value">${item.metadata.location}</span>
                        </div>
                        ${Object.entries(item.metadata.stats).map(([key, value]) => `
                            <div class="detail-stat">
                                <span class="detail-label">${key}:</span>
                                <span class="detail-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="detail-section">
                    <div class="detail-title">TAGS</div>
                    <div class="detail-content">
                        <div class="detail-tags">
                            ${item.metadata.tags.map(tag => `
                                <span class="detail-tag">${tag}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(expandedView);
    document.body.appendChild(exitHint);
    
    // Add active class after a frame for animation
    requestAnimationFrame(() => {
        expandedView.classList.add('active');
        overlay.classList.add('active');
    });
    
    // Close handlers
    function closeExpandedView() {
        expandedView.classList.remove('active');
        overlay.classList.remove('active');
        setTimeout(() => {
            expandedView.remove();
            overlay.remove();
            exitHint.remove();
        }, 300);
    }
    
    expandedView.querySelector('.close-btn').addEventListener('click', closeExpandedView);
    overlay.addEventListener('click', closeExpandedView);
    
    // ESC key to close
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeExpandedView();
            document.removeEventListener('keydown', escHandler);
        }
    });
    
    // Download button handler
    expandedView.querySelector('.download-btn').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = item.image;
        link.download = item.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Initialize terminal access
function initTerminalAccess() {
    const terminalAccess = document.querySelector('.terminal-access');
    
    terminalAccess.addEventListener('click', () => {
        terminalAccess.classList.add('active');
        setTimeout(() => {
            window.location.href = 'gallery.html';
        }, 1000);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFileExplorer();
    initTerminalAccess();
});
