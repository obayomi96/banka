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
// openSidebar ENDS

// Delete account confirm modal
const deleteAccountPageBtn = document.querySelector('.deleteBtn');
const deleteAccountModal = document.querySelector('.deleteAccountModal');
const deleteModalContents = document.querySelector('.deleteModalContent');
const confirmDeleteBtn = document.querySelector('#deleteAccountBtn');
const cancelDeleteBtn = document.querySelector('#cancelDeleteBtn');

const modalDisplayModalRemove = () => {
    // Display modal
    deleteAccountPageBtn.addEventListener('click', () => {
        deleteAccountModal.style.display = 'block';
    });
    // Close modal
    cancelDeleteBtn.addEventListener('click', () => {
        deleteAccountModal.style.display = 'none';
    });
    // Closemodal onclick outiside modal content
    deleteAccountModal.addEventListener('click', () => {
        deleteAccountModal.style.display = 'none';
    });
    // Close modal and redirect to Admin dashboard after deleting account
    confirmDeleteBtn.addEventListener('click', () => {
        deleteAccountModal.style.display = 'none';
        window.location = '../admin/allbankAccounts.html';
    });
}
modalDisplayModalRemove();
// Delete account confirm modal ENDS