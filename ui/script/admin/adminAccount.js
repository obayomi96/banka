// Open sidebar when user clicks menu logo
const openSidebarBtn = document.getElementById('menuLogo');
const sideBarItems = document.querySelector('.sidebar');
let isOpened = false;

const openSidebar = () => {
    openSidebarBtn.addEventListener('click', () => {
        if(isOpened) {
            sideBarItems.style.marginLeft = '-45%';
        } else {
            sideBarItems.style.marginLeft = '0';
        }
        isOpened = !isOpened;
    });
}
openSidebar();
// openSidebar end
