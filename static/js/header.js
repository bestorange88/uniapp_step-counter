document.addEventListener("DOMContentLoaded", function () {
    const userMenuButton = document.querySelector(".btn-user-menu");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    if (!userMenuButton || !dropdownMenu) {
        console.error("Dropdown menu or button not found in DOM.");
        return;
    }

    console.log("User menu button and dropdown menu found."); // 调试语句

    // 切换菜单显示状态
    const toggleMenu = () => {
        const isExpanded = dropdownMenu.classList.toggle("show");
        userMenuButton.setAttribute("aria-expanded", isExpanded);
        console.log("Menu toggled:", isExpanded); // 调试语句
    };

    // 点击按钮切换菜单
    userMenuButton.addEventListener("click", function (event) {
        event.preventDefault();
        toggleMenu();
        console.log("User menu button clicked."); // 调试语句
    });

    // 点击其他区域关闭菜单
    document.addEventListener("click", function (event) {
        if (
            !userMenuButton.contains(event.target) &&
            !dropdownMenu.contains(event.target)
        ) {
            dropdownMenu.classList.remove("show");
            userMenuButton.setAttribute("aria-expanded", "false");
            console.log("Clicked outside the menu, menu closed."); // 调试语句
        }
    });

    // 键盘操作支持
    userMenuButton.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleMenu();
            console.log("Enter or Space pressed, menu toggled."); // 调试语句
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            dropdownMenu.classList.remove("show");
            userMenuButton.setAttribute("aria-expanded", "false");
            console.log("Escape pressed, menu closed."); // 调试语句
        }
    });

    // 将事件监听器标记为passive
    document.addEventListener("touchstart", function () {
        // 此处可以放置 touchstart 的处理代码
    }, { passive: true });
});