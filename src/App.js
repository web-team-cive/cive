import { routes } from './routes.js';

// Function to navigate to a specific route
function navigateTo(route) {
  // Check if the route exists in the routes object
  if (routes.hasOwnProperty(route)) {
    // Fetch and render the HTML content of the corresponding file
    fetchHtml(routes[route]);
  } else {
    // Route Not Found Route

    // The custom 404 page
    fetchHtml('/src/components/not-found/404.html');

    /* Uncomment to display custom message only ( No File ) */
    //renderComponent('404: Page not found.');
  }
}

// Function to fetch HTML content from a file
function fetchHtml(path) {
  fetch(path)
    .then(response => {
      if (!response.ok) {
        console.log(`(cive) File:: {path} not found!`);
        throw new Error('Failed to fetch HTML file');

      }
      return response.text();
    })
    .then(html => renderComponent(html))
    .catch(error => {
      console.error(error);
      console.log(`(cive) FailMessage:: Failed to load page!`)
      renderComponent('Failed to load page.');
    });
}

// Function to render component content into the main content area
function renderComponent(content) {
  document.getElementById('main-content-cive').innerHTML = content;
}

// Function to handle changes in the URL
window.onpopstate = function(event) {
  const route = window.location.pathname;
  navigateTo(route || '/home'); // Default to '/home' if no route is provided
};

// Initial page load, check the current route from the URL
window.onload = function() {
  const route = window.location.pathname;
  navigateTo(route || '/home'); // Default to '/home' if no route is provided
};

// Function to handle navigation when a link is clicked
document.addEventListener('click', function(event) {
  if (event.target.tagName === 'A' && event.target.getAttribute('href').startsWith('/')) {
    event.preventDefault(); // Prevent default navigation behavior
    const route = event.target.getAttribute('href');
    navigateTo(route);
    history.pushState(null, '', route); // Update browser history without causing a page reload
  }
});
