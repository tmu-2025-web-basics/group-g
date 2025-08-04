// ハンバーガーメニューの制御
document.getElementById('hamburger').addEventListener('click', function() {
    const menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.add('active');
});

// ×アイコンでメニューを閉じる
document.getElementById('close-menu').addEventListener('click', function() {
    const menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.remove('active');
});

// メニューオーバーレイ外をクリックしてメニューを閉じる
document.getElementById('menu-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});

// カルーセル機能
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    
    const totalItems = 7; // 実際のアイテム数
    let currentIndex = 2; // 最初の実要素から開始（複製を考慮）
    let autoSlideInterval;
    
    function getCarouselSettings() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 768) {
            // スマホ: 1つ表示
            return {
                itemWidth: 380,
                gap: 0,
                visibleItems: 1
            };
        } else if (screenWidth <= 1200) {
            // タブレット: 3つ表示
            return {
                itemWidth: 420,
                gap: 25,
                visibleItems: 3
            };
        } else {
            // PC: 3つ表示
            return {
                itemWidth: 500,
                gap: 30,
                visibleItems: 3
            };
        }
    }
    
    function updateCarouselPosition() {
        const settings = getCarouselSettings();
        const totalWidth = settings.itemWidth + settings.gap;
        
        if (settings.visibleItems === 1) {
            // スマホ: 1つ表示の場合、現在のアイテムが中央に
            track.style.transform = `translateX(-${currentIndex * totalWidth}px)`;
        } else {
            // PC/タブレット: 3つ表示の場合、真ん中のアイテムが中央に
            track.style.transform = `translateX(-${currentIndex * totalWidth}px)`;
        }
    }
    
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        
        autoSlideInterval = setInterval(() => {
            currentIndex++;
            updateCarouselPosition();
            
            // 最後の複製要素に到達したら、瞬時に最初の実要素に戻る
            if (currentIndex >= totalItems + 2) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = 2;
                    updateCarouselPosition();
                    setTimeout(() => {
                        track.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
            }
        }, 3500); // 3.5秒間隔
    }
    
    // 初期設定
    updateCarouselPosition();
    startAutoSlide();
    
    // レスポンシブ対応
    window.addEventListener('resize', function() {
        updateCarouselPosition();
        startAutoSlide(); // サイズ変更時にスライドをリスタート
    });
});

// 写真のクリック機能（存在する場合のみ）
document.querySelector('.photo') && document.querySelector('.photo').addEventListener('click', function() {
    this.classList.toggle('is-flipped');
});

// フリップカードの機能
document.addEventListener('DOMContentLoaded', function() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('is-flipped');
        });
    });
});

// トップに戻るボタンの機能
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            // スムーズにページトップへスクロール
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});