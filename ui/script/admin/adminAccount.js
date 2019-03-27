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
// openSidebar ENDS

// Delete account confirm modal
const deleteAccountPageBtn = document.querySelector('.deleteBtn');
const deleteAccountModal = document.querySelector('.deleteAccountModal');
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
};
modalDisplayModalRemove();
// Delete account confirm modal ENDS

// Credit and Debit account confirm
// const paymentAmount = document.querySelector('.paymentInput').value;
// const creditBtn = document.querySelector('.paymentBtn1');
// const debitBtn = document.querySelector('.paymentBtn2');
// const deleteAccountModal2 = document.querySelector('.deleteAccountModal2');
// const deleteModalContent2 = document.querySelector('.deleteModalContent2');

// const displayPaymentModal = () => {
//   // Display modal
//   creditBtn.addEventListener('click', () => {
//     deleteModalContent2.innerHTML += `<p>Credit account Obayomi $${paymentAmount} ?</p>
//     <div class="confirmBtn">
//         <button class="confirmbtn" id="deleteAccountBtn">Yes</button>
//         <button class="confirmbtn" id="cancelDeleteBtn">Cancel</button>
//     </div>`;
//     deleteAccountModal2.style.display = 'block';
//   });
//   // Close modal
//   cancelDeleteBtn.addEventListener('click', () => {
//     deleteAccountModal2.style.dislay = 'none';
//   });
//   deleteAccountModal2.addEventListener('click', () => {
//     deleteAccountModal2.style.display = 'none';
//   });
//   // credit account and close modal
//   confirmDeleteBtn.addEventListener('click', () => {
//     deleteModalContent2.innerHTML += `<h3>Account Credited with $${paymentAmount} !</h3>`;
//     window.location = '..admin/bankAccountRecord.html';
//   });
//   debitBtn.addEventListener('click', () => {
//     deleteModalContent2.innerHTML = `<p>Debit account Obayomi $${paymentAmount} ?</p>
//     <div class="confirmBtn">
//         <button class="confirmbtn" id="deleteAccountBtn">Yes</button>
//         <button class="confirmbtn" id="cancelDeleteBtn">Cancel</button>
//     </div>`;
//     deleteAccountModal2.style.display = 'block';
//   });
//   // Close modal
//   cancelDeleteBtn.addEventListener('click', () => {
//     deleteAccountModal2.style.dislay = 'none';
//   });
//   deleteAccountModal2.addEventListener('click', () => {
//     deleteAccountModal2.style.display = 'none';
//   });
//   // credit account and close modal
//   confirmDeleteBtn.addEventListener('click', () => {
//     deleteModalContent2.innerHTML = `<h3>Account Debited with $${paymentAmount} !</h3>`;
//     window.location = '..admin/bankAccountRecord.html';
//   });
// };
// displayPaymentModal();
