document.addEventListener('DOMContentLoaded', function() {
  const logoutButton = document.querySelector('.logout-button');
  if (logoutButton) {
      logoutButton.addEventListener('click', logout);
  }
});

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


