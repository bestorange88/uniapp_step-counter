document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('#carousel .carousel-item'); // 获取所有卡片
    let currentIndex = 0; // 当前显示的卡片索引
    const totalItems = items.length; // 卡片总数

    function showItem(index) {
        items.forEach((item, i) => {
            item.classList.remove('active', 'previous', 'next');
            if (i === index) {
                item.classList.add('active'); // 当前卡片
            } else if (i === (index - 1 + totalItems) % totalItems) {
                item.classList.add('previous'); // 上一个卡片
            } else if (i === (index + 1) % totalItems) {
                item.classList.add('next'); // 下一个卡片
            }
        });
    }

    // 自动切换卡片
    function startCarousel() {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems; // 更新索引
            showItem(currentIndex); // 显示下一张卡片
        }, 3000); // 3秒切换一次
    }

    // 初始化
    showItem(currentIndex);
    startCarousel();
});
