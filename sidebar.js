document.addEventListener('DOMContentLoaded', function() {
  const newPromptTextarea = document.getElementById('new-prompt');
  const savePromptBtn = document.getElementById('save-prompt');
  const promptList = document.getElementById('prompt-list');

  // Load and display prompts
  function loadPrompts() {
    promptList.innerHTML = ''; // Clear existing list
    const prompts = JSON.parse(localStorage.getItem('savedPrompts') || '[]');
    
    prompts.forEach((prompt, index) => {
      const promptItem = document.createElement('div');
      promptItem.className = 'prompt-item';
      
      const promptText = document.createElement('div');
      promptText.className = 'prompt-text';
      promptText.textContent = prompt;
      
      const actions = document.createElement('div');
      actions.className = 'prompt-actions';
      
      // Copy Button
      const copyBtn = document.createElement('button');
      copyBtn.textContent = 'Copy';
      copyBtn.className = 'copy-btn';
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(prompt);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
        }, 1500);
      };
      
      // View Button (New Feature)
      const viewBtn = document.createElement('button');
      viewBtn.textContent = 'View';
      viewBtn.className = 'view-btn';
      viewBtn.onclick = () => {
        // Create focus mode overlay
        const focusOverlay = document.createElement('div');
        focusOverlay.className = 'focus-mode';
        
        const focusContent = document.createElement('div');
        focusContent.className = 'focus-content';
        
        // Create close button container
        const closeButtonContainer = document.createElement('div');
        closeButtonContainer.style.position = 'absolute';
        closeButtonContainer.style.top = '10px';
        closeButtonContainer.style.right = '10px';
        
        // Close Button with X icon
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;'; // HTML entity for X
        closeBtn.className = 'close-btn';
        closeBtn.style.cssText = `
          background: none;
          border: none;
          color: #ff4136;
          font-size: 30px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          font-weight: bold;
          transition: color 0.3s ease;
        `;
        closeBtn.onclick = () => {
          document.body.removeChild(focusOverlay);
        };
        
        // Hover effect
        closeBtn.addEventListener('mouseenter', () => {
          closeBtn.style.color = '#ff6b6b';
        });
        closeBtn.addEventListener('mouseleave', () => {
          closeBtn.style.color = '#ff4136';
        });
        
        // Create text content
        const focusText = document.createElement('pre');
        focusText.textContent = prompt;
        focusText.style.cssText = `
          white-space: pre-wrap;
          font-family: inherit;
          margin-top: 40px; // Add space for close button
          max-height: calc(100% - 60px);
          overflow-y: auto;
        `;
        
        // Assemble the overlay
        closeButtonContainer.appendChild(closeBtn);
        focusContent.appendChild(closeButtonContainer);
        focusContent.appendChild(focusText);
        focusOverlay.appendChild(focusContent);
        
        document.body.appendChild(focusOverlay);
      };
      
      // Edit Button
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.className = 'edit-btn';
      editBtn.onclick = () => {
        // Create focus mode overlay
        const editOverlay = document.createElement('div');
        editOverlay.className = 'focus-mode';
        
        const editContent = document.createElement('div');
        editContent.className = 'focus-content';
        
        // Create edit input
        const editInput = document.createElement('textarea');
        editInput.value = prompt;
        editInput.className = 'prompt-edit-input';
        editInput.style.width = '90%';
        editInput.style.height = 'inherit';
        editInput.style.resize = 'vertical';
        
        // Create action buttons container
        const actionButtons = document.createElement('div');
        actionButtons.style.display = 'flex';
        actionButtons.style.justifyContent = 'space-between';
        actionButtons.style.marginTop = '10px';
        
        // Save Button
        const saveEditBtn = document.createElement('button');
        saveEditBtn.textContent = 'Save Changes';
        saveEditBtn.className = 'copy-btn';
        saveEditBtn.style.flex = '1';
        saveEditBtn.style.marginRight = '10px';
        
        // Cancel Button
        const cancelEditBtn = document.createElement('button');
        cancelEditBtn.textContent = 'Cancel';
        cancelEditBtn.className = 'delete-btn';
        cancelEditBtn.style.flex = '1';
        
        // Save functionality
        saveEditBtn.onclick = () => {
          const newPromptText = editInput.value.trim();
          if (newPromptText) {
            // Get current prompts from localStorage
            const prompts = JSON.parse(localStorage.getItem('savedPrompts') || '[]');
            
            // Update the specific prompt
            prompts[index] = newPromptText;
            
            // Save back to localStorage
            localStorage.setItem('savedPrompts', JSON.stringify(prompts));
            
            // Remove overlay
            document.body.removeChild(editOverlay);
            
            // Reload prompts to reflect changes
            loadPrompts();
          }
        };
        
        // Cancel functionality
        cancelEditBtn.onclick = () => {
          // Simply remove the overlay
          document.body.removeChild(editOverlay);
        };
        
        // Append elements
        actionButtons.append(saveEditBtn, cancelEditBtn);
        editContent.append(editInput, actionButtons);
        editOverlay.appendChild(editContent);
        
        // Add to body
        document.body.appendChild(editOverlay);
        
        // Focus on input
        editInput.focus();
      };
      
      // Delete Button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete-btn';
      deleteBtn.onclick = () => {
        if(confirm('Are you sure you want to delete this prompt?')) {
          const prompts = JSON.parse(localStorage.getItem('savedPrompts') || '[]');
          prompts.splice(index, 1);
          localStorage.setItem('savedPrompts', JSON.stringify(prompts));
          loadPrompts();
        }
      };
      
      // Append buttons
      actions.append(copyBtn, viewBtn, editBtn, deleteBtn);
      promptItem.append(promptText, actions);
      promptList.appendChild(promptItem);
    });
  }

  // Save new prompt
  savePromptBtn.addEventListener('click', function() {
    const newPrompt = newPromptTextarea.value.trim();
    if (newPrompt) {
      const prompts = JSON.parse(localStorage.getItem('savedPrompts') || '[]');
      prompts.push(newPrompt);
      localStorage.setItem('savedPrompts', JSON.stringify(prompts));
      newPromptTextarea.value = ''; // Clear textarea
      loadPrompts();
    }
  });

  // Initial load of prompts
  loadPrompts();
});