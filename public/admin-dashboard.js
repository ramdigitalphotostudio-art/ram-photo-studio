
// Admin Dashboard JavaScript - Enquiries and Customers functionality

// ============================================
// GLOBAL STATE
// ============================================
let selectedCustomers = new Set();
let selectedEnquiries = new Set();
let sendingQueue = [];
let queueIndex = 0;
let isDeleteMode = false;
let currentTemplates = {
    birthday: `🎂 Happy Birthday {name}! 🎉

Wishing you a wonderful day filled with joy and happiness! May this year bring you success, health, and countless beautiful moments.

Thank you for being a valued customer of Ram Digital Photo Studio. We hope to capture more of your special moments!

Best wishes,
Ram Digital Photo Studio
Contact: +91 9412733288`,
    anniversary: `💍 Happy Anniversary {name}! 🎊

Wishing you both a beautiful day filled with love and cherished memories! May your bond grow stronger with each passing year.

Thank you for trusting Ram Digital Photo Studio to capture your precious moments. We wish you many more years of happiness together!

Warm regards,
Ram Digital Photo Studio
Contact: +91 9412733288`
};

let pendingDeleteId = null;
let pendingDeleteButton = null;
let pendingDeleteType = 'customer'; // 'customer' | 'enquiry' | 'bulk_enquiry'


// ============================================
// HELPER FUNCTIONS
// ============================================

function showSuccess(title, message) {
    const titleEl = document.getElementById('successModalTitle');
    const msgEl = document.getElementById('successModalMessage');
    const modal = document.getElementById('successModal');
    
    if(titleEl) titleEl.textContent = title;
    if(msgEl) msgEl.textContent = message;
    if(modal) modal.classList.remove('hidden');
}

function showError(title, message) {
    const titleEl = document.getElementById('errorModalTitle');
    const msgEl = document.getElementById('errorModalMessage');
    const modal = document.getElementById('errorModal');
    
    if(titleEl) titleEl.textContent = title;
    if(msgEl) msgEl.textContent = message;
    if(modal) modal.classList.remove('hidden');
}

function updateBulkActionBar() {
    const count = selectedCustomers.size;
    const bar = document.getElementById('bulkActionBar');
    const span = document.getElementById('selectedCount');
    const modalSpan = document.getElementById('msgRecipientCount');
    const selectAll = document.getElementById('selectAllCustomers');

    if(span) span.textContent = count;
    if(modalSpan) modalSpan.textContent = count;
    
    if (bar) {
        if (count > 0) {
            bar.classList.remove('hidden');
            bar.classList.add('flex');
            requestAnimationFrame(() => {
                bar.classList.remove('translate-y-20', 'opacity-0');
            });
        } else {
            bar.classList.add('translate-y-20', 'opacity-0');
            setTimeout(() => {
                if(selectedCustomers.size === 0) {
                    bar.classList.add('hidden');
                    bar.classList.remove('flex');
                }
            }, 300);
            
            if(selectAll) selectAll.checked = false;
        }
    }
}

function updateEnquiryBulkUI() {
    const count = selectedEnquiries.size;
    const bar = document.getElementById('bulkDeleteActions');
    const span = document.getElementById('selectedCountEnq');
    
    if(span) span.textContent = count;
    
    if (bar) {
        if (count > 0 && isDeleteMode) {
            bar.classList.remove('hidden');
        } else {
            bar.classList.add('hidden');
        }
    }
}

// ============================================
// INITIALIZATION
// ============================================

function initDashboard() {
    console.log('Initializing Admin Dashboard...');

    // 1. Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Show target, hide others
            tabContents.forEach(content => {
                if (content.id === targetTab + 'Content') {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
            
            // Update buttons
            tabBtns.forEach(b => {
                const isActive = b.dataset.tab === targetTab;
                b.classList.toggle('border-blue-500', isActive);
                b.classList.toggle('text-blue-600', isActive);
                b.classList.toggle('dark:text-blue-400', isActive);
                
                b.classList.toggle('border-transparent', !isActive);
                b.classList.toggle('text-gray-500', !isActive);
                b.classList.toggle('dark:text-gray-400', !isActive);
            });
        });
    });

    // 2. Enquiries Status Buttons
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const target = e.currentTarget; // Use currentTarget
            const enquiryId = target.dataset.enquiryId;
            const newStatus = target.dataset.status;
            const originalText = target.textContent;
            
            try {
                target.disabled = true;
                target.textContent = '...';
                
                const response = await fetch('/api/enquiries/update-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: enquiryId, status: newStatus }),
                });

                if (!response.ok) throw new Error('Failed to update');
                window.location.reload();
            } catch (error) {
                showError('Update Failed', error.message);
                target.disabled = false;
                target.textContent = originalText;
            }
        });
    });

    // 3. Enquiry Reply Forms (Copy/WhatsApp/SMS)
    document.querySelectorAll('.reply-form').forEach(form => {
        const input = form.querySelector('input');
        const { email, phone, name } = form.dataset;

        // Copy Email
        form.querySelector('[data-type="copy-email"]')?.addEventListener('click', async (e) => {
            e.preventDefault();
            const message = input.value.trim();
            if (!message) return showError('Missing Message', 'Please type a message');

            const emailText = `Hi ${name},\n\n${message}\n\nBest regards,\nRam Digital Photo Studio\nContact: +91 9412733288`;
            
            try {
                await navigator.clipboard.writeText(emailText);
                showSuccess('Copied!', 'Open Gmail and paste the email.');
                input.value = '';
            } catch (err) {
                showError('Copy Failed', 'Please copy manually.');
            }
        });

        // WhatsApp
        form.querySelector('[data-type="whatsapp"]')?.addEventListener('click', (e) => {
            e.preventDefault();
            const message = input.value.trim();
            if (!message) return showError('Missing Message', 'Please type a message');
            
            const text = encodeURIComponent(`Hi ${name},\n\n${message}\n\nBest regards,\nRam Digital Photo Studio`);
            window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
            input.value = '';
        });

        // SMS
        form.querySelector('[data-type="sms"]')?.addEventListener('click', (e) => {
            e.preventDefault();
            const message = input.value.trim();
            if (!message) return showError('Missing Message', 'Please type a message');
            
            const text = encodeURIComponent(`Hi ${name},\n\n${message}\n\nBest regards,\nRam Digital Photo Studio`);
            window.location.href = `sms:${phone}?body=${text}`;
            input.value = '';
        });
    });

    // 4. Customers - Toggle Special Occasions
    const toggleOccasionsBtn = document.getElementById('toggleOccasionsBtn');
    const occasionsSection = document.getElementById('occasionsSection');
    const occasionsBtnText = document.getElementById('occasionsBtnText');
    
    if (toggleOccasionsBtn && occasionsSection) {
        toggleOccasionsBtn.addEventListener('click', () => {
            const isHidden = occasionsSection.classList.contains('hidden');
            occasionsSection.classList.toggle('hidden');
            if(occasionsBtnText) {
                occasionsBtnText.innerHTML = isHidden 
                    ? '<span class="hidden sm:inline">Hide </span>Special Occasions' 
                    : '<span class="hidden sm:inline">View </span>Special Occasions';
            }
        });
    }

    // 5. Customers - Add/Edit Modal
    const customerModal = document.getElementById('customerModal');
    const addCustomerBtn = document.getElementById('addCustomerBtn');
    const customerForm = document.getElementById('customerForm');
    
    if (addCustomerBtn && customerModal) {
        addCustomerBtn.addEventListener('click', () => {
            document.getElementById('modalTitle').textContent = 'Add Customer';
            if(customerForm) customerForm.reset();
            document.getElementById('customerId').value = '';
            customerModal.classList.remove('hidden');
        });
    }

    // Close Modals (Generic)
    document.querySelectorAll('[id$="Modal"]').forEach(modal => {
        // Find close buttons inside
        const cancelBtn = modal.querySelector('#cancelBtn'); // Customer modal
        const closeBtn = modal.querySelector('#closeErrorBtn, #closeSuccessBtn, #closeTemplatesBtn, #closeBulkMsgBtn, #queueCloseBtn');
        
        if(cancelBtn) cancelBtn.addEventListener('click', () => modal.classList.add('hidden'));
        if(closeBtn) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
        
        // Outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        });
    });

    // Form Submission (Add/Edit Customer)
    if (customerForm) {
        customerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const saveBtn = document.getElementById('saveBtn');
            const id = document.getElementById('customerId').value;
            
            const formData = {
                id: id || undefined,
                name: document.getElementById('customerName').value.trim(),
                phone: document.getElementById('customerPhone').value.trim(),
                spouse_name: document.getElementById('customerSpouseName').value.trim() || null,
                email: document.getElementById('customerEmail').value.trim() || null,
                birthday: document.getElementById('customerBirthday').value || null,
                anniversary: document.getElementById('customerAnniversary').value || null,
                location: document.getElementById('customerLocation').value.trim() || null,
                city: document.getElementById('customerCity').value.trim() || null,
                notes: document.getElementById('customerNotes').value.trim() || null,
            };

            // Validation
            if (formData.phone.length !== 10) return showError('Invalid Phone', '10 digits required');

            try {
                if(saveBtn) { saveBtn.disabled = true; saveBtn.textContent = 'Saving...'; }
                const url = id ? '/api/customers/update' : '/api/customers/add';
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData)
                });
                
                if (!res.ok) throw new Error((await res.json()).error || 'Failed');
                window.location.reload();
            } catch (err) {
                showError('Error', err.message);
                if(saveBtn) { saveBtn.disabled = false; saveBtn.textContent = 'Save'; }
            }
        });
    }
    
    // Phone Input Restriction
    document.getElementById('customerPhone')?.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    });

    // Edit Customer Buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const data = JSON.parse(e.currentTarget.dataset.customer);
            document.getElementById('modalTitle').textContent = 'Edit Customer';
            document.getElementById('customerId').value = data.id;
            document.getElementById('customerName').value = data.name;
            document.getElementById('customerPhone').value = data.phone;
            document.getElementById('customerSpouseName').value = data.spouse_name || '';
            document.getElementById('customerEmail').value = data.email || '';
            document.getElementById('customerBirthday').value = data.birthday || '';
            document.getElementById('customerAnniversary').value = data.anniversary || '';
            document.getElementById('customerLocation').value = data.location || '';
            document.getElementById('customerCity').value = data.city || '';
            document.getElementById('customerNotes').value = data.notes || '';
            
            if(customerModal) customerModal.classList.remove('hidden');
        });
    });

    // 6. Delete Functionality (Shared)
    const deleteModal = document.getElementById('deleteModal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const deleteNameSpan = document.getElementById('deleteCustomerName');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

    // Delete Buttons (Customer)
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const { customerId, customerName } = e.currentTarget.dataset;
            pendingDeleteId = customerId;
            pendingDeleteButton = e.currentTarget;
            pendingDeleteType = 'customer';
            if(deleteNameSpan) deleteNameSpan.textContent = customerName;
            if(deleteModal) deleteModal.classList.remove('hidden');
        });
    });

    // Delete Buttons (Enquiry)
    document.querySelectorAll('.delete-enquiry-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            pendingDeleteId = e.currentTarget.dataset.enquiryId;
            pendingDeleteButton = e.currentTarget;
            pendingDeleteType = 'enquiry';
            if(deleteNameSpan) deleteNameSpan.textContent = 'this enquiry';
            if(deleteModal) deleteModal.classList.remove('hidden');
        });
    });
    
    if(cancelDeleteBtn && deleteModal) {
         cancelDeleteBtn.addEventListener('click', () => deleteModal.classList.add('hidden'));
    }

    if(confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', async () => {
            if(!pendingDeleteId) return;
            
            try {
                confirmDeleteBtn.disabled = true;
                confirmDeleteBtn.textContent = 'Deleting...';
                
                if (pendingDeleteType === 'bulk_enquiry') {
                    // Bulk Delete
                     const ids = pendingDeleteId; // array
                     await Promise.all(ids.map(id => fetch('/api/enquiries/delete', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({id})
                     })));
                     
                     ids.forEach(id => {
                        const cb = document.querySelector(`.enquiry-checkbox[data-id="${id}"]`);
                        cb?.closest('.rounded-xl')?.remove(); // Updated selector logic might be needed
                        // Try removing the wrapper if it exists, or just the card
                        document.querySelectorAll('.enquiry-checkbox').forEach(c => {
                             if(c.dataset.id === id) {
                                 // With new structure: checkbox is sibling to card-inner
                                 // c.parentElement (wrapper) -> parent (flex container) -> remove
                                 c.closest('.show-checkbox-on-bulk')?.remove();
                             }
                        });
                     });
                     selectedEnquiries.clear();
                     updateEnquiryBulkUI();
                     showSuccess('Deleted', `${ids.length} items removed.`);

                } else {
                    // Single Delete
                    const url = pendingDeleteType === 'customer' ? '/api/customers/delete' : '/api/enquiries/delete';
                    const res = await fetch(url, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ id: pendingDeleteId })
                    });
                    
                    if(!res.ok) throw new Error('Delete failed');
                    
                    // UI Update
                    if(pendingDeleteType === 'customer') {
                        pendingDeleteButton.closest('tr').remove();
                    } else {
                        // Enquiry remove
                        // If standard delete button inside a card
                        pendingDeleteButton.closest('.enquiry-card-inner')?.closest('.show-checkbox-on-bulk')?.remove() 
                        || pendingDeleteButton.closest('.show-checkbox-on-bulk')?.remove(); 
                    }
                    showSuccess('Deleted', 'Item removed.');
                }
                
                if(deleteModal) deleteModal.classList.add('hidden');
            } catch (err) {
                showError('Delete Failed', err.message);
            } finally {
                confirmDeleteBtn.disabled = false;
                confirmDeleteBtn.textContent = 'Delete';
                pendingDeleteId = null;
            }
        });
    }

    // 7. Bulk Messaging (Customers)
    const selectAllCheckbox = document.getElementById('selectAllCustomers');
    const customerCheckboxes = document.getElementsByClassName('customer-select-checkbox');
    const clearSelectionBtn = document.getElementById('clearSelectionBtn');
    const openBulkMsgBtn = document.getElementById('openBulkMsgBtn');
    
    if(selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', (e) => {
            const checked = e.target.checked;
            selectedCustomers.clear();
            Array.from(customerCheckboxes).forEach(cb => {
                const tr = cb.closest('tr');
                if(tr && tr.style.display !== 'none') {
                    cb.checked = checked;
                    if(checked) selectedCustomers.add(cb.dataset.id);
                }
            });
            updateBulkActionBar();
        });
    }
    
    // Delegate for customer checkboxes
    document.getElementById('customersTableBody')?.addEventListener('change', (e) => {
        if(e.target.classList.contains('customer-select-checkbox')) {
            if(e.target.checked) selectedCustomers.add(e.target.dataset.id);
            else selectedCustomers.delete(e.target.dataset.id);
            updateBulkActionBar();
        }
    });
    
    if(clearSelectionBtn) {
        clearSelectionBtn.addEventListener('click', () => {
             selectedCustomers.clear();
             if(selectAllCheckbox) selectAllCheckbox.checked = false;
             Array.from(customerCheckboxes).forEach(cb => cb.checked = false);
             updateBulkActionBar();
        });
    }
    
    if(openBulkMsgBtn) {
         openBulkMsgBtn.addEventListener('click', () => {
             document.getElementById('bulkMsgModal').classList.remove('hidden');
         });
    }
    
    // Start Sending
    const startSendingBtn = document.getElementById('startSendingBtn');
    if(startSendingBtn) {
        startSendingBtn.addEventListener('click', () => {
            const template = document.getElementById('bulkMsgInput').value.trim();
            if(!template) return showError('Error', 'Please enter a message');
            
            // Build Queue
            sendingQueue = [];
            Array.from(customerCheckboxes).forEach(cb => {
                if(cb.checked) {
                    sendingQueue.push({
                        name: cb.dataset.name,
                        phone: cb.dataset.phone,
                        message: template
                    });
                }
            });
            
            queueIndex = 0;
            document.getElementById('bulkMsgModal').classList.add('hidden');
            document.getElementById('sendingQueueModal').classList.remove('hidden');
            document.getElementById('queueTotal').textContent = sendingQueue.length;
            
            loadQueueItem();
        });
    }

    // 8. Templates Management
    const openTemplatesBtn = document.getElementById('openTemplatesBtn');
    const templatesModal = document.getElementById('templatesModal');
    
    if(openTemplatesBtn && templatesModal) {
        openTemplatesBtn.addEventListener('click', () => {
             fetchTemplates().then(() => {
                 document.getElementById('birthdayTemplateInput').value = currentTemplates.birthday;
                 document.getElementById('anniversaryTemplateInput').value = currentTemplates.anniversary;
                 templatesModal.classList.remove('hidden');
             });
        });
    }
    
    const templatesForm = document.getElementById('templatesForm');
    if(templatesForm) {
        templatesForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = templatesForm.querySelector('button[type="submit"]');
            const original = btn.textContent;
            btn.disabled = true; btn.textContent = 'Saving...';
            
            const newT = {
                birthday: document.getElementById('birthdayTemplateInput').value,
                anniversary: document.getElementById('anniversaryTemplateInput').value
            };
            
            try {
                const res = await fetch('/api/settings/update', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ templates: newT })
                });
                if(!res.ok) throw new Error('Failed');
                
                currentTemplates = newT;
                showSuccess('Saved', 'Templates updated.');
                templatesModal.classList.add('hidden');
            } catch(err) {
                showError('Error', err.message);
            } finally {
                btn.disabled = false; btn.textContent = original;
            }
        });
    }
    
    // 9. Bulk Delete Enquiries
    const toggleDeleteModeBtn = document.getElementById('toggleDeleteModeBtn');
    const confirmBulkDeleteBtn_Enq = document.getElementById('confirmBulkDeleteBtn');
    
    if(toggleDeleteModeBtn) {
        toggleDeleteModeBtn.addEventListener('click', () => {
            isDeleteMode = !isDeleteMode;
            toggleDeleteModeBtn.classList.toggle('text-red-500', isDeleteMode);
            
            document.querySelectorAll('.show-checkbox-on-bulk').forEach(row => {
               const wrapper = row.querySelector('.bulk-checkbox-wrapper');
               const inner = row.querySelector('.enquiry-card-inner');
               
               if(wrapper) wrapper.classList.toggle('hidden', !isDeleteMode);
               if(inner) {
                   if(isDeleteMode) inner.classList.add('pointer-events-none', 'opacity-60');
                   else inner.classList.remove('pointer-events-none', 'opacity-60');
               }
            });
            
            if(!isDeleteMode) {
                selectedEnquiries.clear();
                document.querySelectorAll('.enquiry-checkbox').forEach(c => c.checked = false);
            }
            updateEnquiryBulkUI();
        });
        
        // Enquiry Checkbox Delegate
         document.addEventListener('change', (e) => {
            if(e.target.classList.contains('enquiry-checkbox')) {
                if(e.target.checked) selectedEnquiries.add(e.target.dataset.id);
                else selectedEnquiries.delete(e.target.dataset.id);
                updateEnquiryBulkUI();
            }
        });
        
        if(confirmBulkDeleteBtn_Enq) {
            confirmBulkDeleteBtn_Enq.addEventListener('click', () => {
                if(selectedEnquiries.size === 0) return;
                pendingDeleteId = Array.from(selectedEnquiries);
                pendingDeleteType = 'bulk_enquiry';
                pendingDeleteButton = confirmBulkDeleteBtn_Enq;
                
                if(deleteNameSpan) deleteNameSpan.textContent = `${selectedEnquiries.size} enquiries`;
                if(deleteModal) deleteModal.classList.remove('hidden');
            });
        }
    }
    
    // 10. Greeting Buttons
    document.querySelectorAll('.greet-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const { phone, name, occasion } = e.currentTarget.dataset;
            const msg = currentTemplates[occasion] || `Happy ${occasion} ${name}!`;
            const final = msg.replace(/{name}/g, name);
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(final)}`, '_blank');
        });
    });
    
    // 11. Search & Sort Customers
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
             const term = e.target.value.toLowerCase();
             document.querySelectorAll('.customer-row').forEach(row => {
                 const text = row.textContent.toLowerCase();
                 row.style.display = text.includes(term) ? '' : 'none';
             });
        });
    }
    
    if(sortSelect) {
        sortSelect.addEventListener('change', (e) => {
             const order = e.target.value;
             const tbody = document.getElementById('customersTableBody');
             const rows = Array.from(tbody.querySelectorAll('.customer-row'));
             
             rows.sort((a, b) => {
                 const idA = parseInt(a.dataset.customerId);
                 const idB = parseInt(b.dataset.customerId);
                 return order === 'newest' ? idB - idA : idA - idB;
             });
             
             rows.forEach(r => tbody.appendChild(r));
        });
    }

    // Initial Fetch (Templates, etc)
    fetchTemplates();
}

// Queue Helper
function loadQueueItem() {
    if(queueIndex >= sendingQueue.length) {
        document.getElementById('sendingQueueModal').classList.add('hidden');
        showSuccess('Finished', 'All messages processed.');
        return;
    }
    const item = sendingQueue[queueIndex];
    document.getElementById('queueCurrent').textContent = queueIndex + 1;
    document.getElementById('queueName').textContent = item.name;
    document.getElementById('queuePhone').textContent = item.phone;
}

// Queue Buttons outside init to be accessible from helpers if needed, but safer inside init if IDs used.
// But queue buttons are static.
// We already attached listeners in initDashboard. (queueCloseBtn, etc).
// Wait, I missed wrapping queueSendBtn, queueSkipBtn in initDashboard.
// Let's add them now.

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    
    // Queue Actions
    const queueSendBtn = document.getElementById('queueSendBtn');
    const queueSkipBtn = document.getElementById('queueSkipBtn');
    
    if(queueSendBtn) {
        queueSendBtn.addEventListener('click', () => {
            const item = sendingQueue[queueIndex];
            const msg = item.message.replace(/{name}/g, item.name);
            window.open(`https://wa.me/${item.phone}?text=${encodeURIComponent(msg)}`, '_blank');
            queueIndex++;
            loadQueueItem();
        });
    }
    
    if(queueSkipBtn) {
        queueSkipBtn.addEventListener('click', () => {
            queueIndex++;
            loadQueueItem();
        });
    }
});

async function fetchTemplates() {
    try {
        const res = await fetch('/api/settings/get');
        if(res.ok) {
            const data = await res.json();
            if(data.templates) currentTemplates = { ...currentTemplates, ...data.templates };
        }
    } catch(e) { console.error(e); }
}

