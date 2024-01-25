const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

// Ensure that the script is executed after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#logout').addEventListener('click', logout);
});
