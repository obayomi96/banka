// Open sidebar when user clicks menu logo
const openSidebarBtn = document.getElementById('menuLogo');
const sideBarItems = document.querySelector('.sidebar');
let isOpened = false;

const openSidebar = () => {
  openSidebarBtn.addEventListener('click', () => {
    if (isOpened) {
      sideBarItems.style.marginLeft = '-45%';
    } else {
      sideBarItems.style.marginLeft = '0';
    }
    isOpened = !isOpened;
  });
};
openSidebar();
// openSidebar end

// const changePasswordModalContent = document.querySelector('.changePasswordModalContent');
const changePasswordBtn = document.querySelector('#changePassword');
const changePasswordModal = document.querySelector('.changePasswordModal');
const savePassword = document.querySelector('#savePassword');
const cancel = document.querySelector('#cancel');

const changePasswordModalEffect = () => {
  // Display modal
  changePasswordBtn.addEventListener('click', () => {
    changePasswordModal.style.display = 'block';
  });
  // Close modal
  cancel.addEventListener('click', () => {
    changePasswordModal.style.display = 'none';
  });
  // Close modal and redirect to Admin dashboard after deleting account
  savePassword.addEventListener('click', () => {
    changePasswordModal.style.display = 'none';
  });
};
changePasswordModalEffect();


// Delete account confirm modal
const deleteAccountPageBtn = document.querySelector('.deleteBtn');
const deleteAccountModal = document.querySelector('.deleteAccountModal');
const confirmDeleteBtn = document.querySelector('#deleteAccountBtn');
const cancelDeleteBtn = document.querySelector('#cancelDeleteBtn');

const deleteAccountModalEffect = () => {
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
    window.location = '../admin/allBankAccounts.html';
  });
};
deleteAccountModalEffect();
// Delete account confirm modal ENDS
