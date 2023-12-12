
function getBlogPosts() {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    return posts;
  }
  

  function displayBlogPosts() {
    const blogList = document.getElementById('blogList');
    blogList.innerHTML = '';
  
    const posts = getBlogPosts();
    posts.forEach((post, index) => {
      const blogPost = document.createElement('div');
      blogPost.classList.add('blog-post');
  
      const titleElement = document.createElement('h3');
      titleElement.textContent = post.title;
  
      const contentElement = document.createElement('p');
      contentElement.textContent = post.content;
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editBlogPost(index));
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteBlogPost(index));
  
      blogPost.appendChild(titleElement);
      blogPost.appendChild(contentElement);
      blogPost.appendChild(editButton);
      blogPost.appendChild(deleteButton);
  
      blogList.appendChild(blogPost);
    });
  }
  
 
  function addBlogPost(event) {
    event.preventDefault();
  
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
  
    const title = titleInput.value;
    const content = contentInput.value;
  
    if (title.trim() === '' || content.trim() === '') {
      alert('Please enter both title and content.');
      return;
    }
  
    const newPost = {
      title: title,
      content: content,
    };
  
    const posts = getBlogPosts();
    posts.push(newPost);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  
    titleInput.value = '';
    contentInput.value = '';
  
    displayBlogPosts();
  }
  
   
  function editBlogPost(index) {
    const posts = getBlogPosts();
    const post = posts[index];
  
    const newTitle = prompt('Enter new title:', post.title);
    const newContent = prompt('Enter new content:', post.content);
  
    if (newTitle === null || newContent === null) {
      return; 
    }
  
    post.title = newTitle;
    post.content = newContent;
  
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    displayBlogPosts();
  }
  
  
  function deleteBlogPost(index) {
    const posts = getBlogPosts();
    posts.splice(index, 1);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    displayBlogPosts();
  }
  
 
  const blogForm = document.getElementById('blogForm');
  blogForm.addEventListener('submit', addBlogPost);
  
  
  displayBlogPosts();
  