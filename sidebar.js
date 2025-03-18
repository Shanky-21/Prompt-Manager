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
        
        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.onclick = () => {
          // Create an edit input directly in the prompt item
          const editInput = document.createElement('textarea');
          editInput.value = prompt;
          editInput.className = 'prompt-edit-input';
          
          // Replace prompt text with edit input
          promptText.innerHTML = '';
          promptText.appendChild(editInput);
          
          // Create save and cancel buttons
          const saveEditBtn = document.createElement('button');
          saveEditBtn.textContent = 'Save';
          saveEditBtn.className = 'copy-btn';
          
          const cancelEditBtn = document.createElement('button');
          cancelEditBtn.textContent = 'Cancel';
          cancelEditBtn.className = 'delete-btn';
          
          // Replace edit button with save/cancel
          actions.innerHTML = '';
          actions.append(saveEditBtn, cancelEditBtn);
          
          // Save edit functionality
          saveEditBtn.onclick = () => {
            const newPromptText = editInput.value.trim();
            if (newPromptText) {
              // Get current prompts from localStorage
              const prompts = JSON.parse(localStorage.getItem('savedPrompts') || '[]');
              
              // Update the specific prompt
              prompts[index] = newPromptText;
              
              // Save back to localStorage
              localStorage.setItem('savedPrompts', JSON.stringify(prompts));
              
              // Reload prompts to reflect changes
              loadPrompts();
            }
          };
          
          // Cancel edit functionality
          cancelEditBtn.onclick = () => {
            // Reload prompts to discard changes
            loadPrompts();
          };
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
        
        actions.append(copyBtn, editBtn, deleteBtn);
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