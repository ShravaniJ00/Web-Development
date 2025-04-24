
// Digital Library Application JavaScript
$(document).on("pagecreate", function() {
  // Global variables
  let bookmarkedItems = JSON.parse(localStorage.getItem('bookmarks')) || [];
  let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  let isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Initialize dark mode if previously enabled
  if (isDarkMode) {
    $('body').addClass('dark-mode');
    $('#darkModeToggle').prop('checked', true);
  }
  
  // Load bookmarks and apply to UI
  function applyBookmarks() {
    $('.bookmark-icon').each(function() {
      const itemId = $(this).data('id');
      if (bookmarkedItems.includes(itemId)) {
        $(this).addClass('active');
      }
    });
  }
  
  // Load recently viewed
  function loadRecentlyViewed() {
    const recentList = $('#recentlyViewedList');
    if (recentList.length) {
      recentList.empty();
      
      if (recentlyViewed.length === 0) {
        recentList.append('<p>No recently viewed items</p>');
        return;
      }
      
      recentlyViewed.slice(0, 5).forEach(item => {
        recentList.append(
          <div class="recent-item" data-id="${item.id}">
            <strong>${item.title}</strong>
            <span class="viewed-date">${item.date}</span>
          </div>
        );
      });
    }
  }
  
  // Initialize
  applyBookmarks();
  loadRecentlyViewed();
  
  // Handle dark mode toggle
  $('#darkModeToggle').on('change', function() {
    if ($(this).is(':checked')) {
      $('body').addClass('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      $('body').removeClass('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  });
  
  // Search functionality
  $('#searchInput').on('input', function() {
    const query = $(this).val().toLowerCase();
    
    if (query.length < 2) {
      $('#searchResults').hide();
      return;
    }
    
    // Show loader while "searching"
    $('.loader').show();
    
    // Simulate search delay
    setTimeout(function() {
      // Sample search results (in a real app, this would come from a database)
      const results = [
        { id: 1, title: "Digital Photography Basics", type: "Course" },
        { id: 2, title: "Introduction to Machine Learning", type: "E-Book" },
        { id: 3, title: "The Digital Age", type: "Documentary" },
        { id: 4, title: "Computer Science Fundamentals", type: "Research Paper" },
        { id: 5, title: "Digital Art Techniques", type: "Video Tutorial" }
      ].filter(item => item.title.toLowerCase().includes(query));
      
      const resultsContainer = $('#searchResults');
      resultsContainer.empty();
      
      if (results.length === 0) {
        resultsContainer.append('<p>No results found</p>');
      } else {
        $.each(results, function(i, result) {
          resultsContainer.append(
            <div class="search-result-item" data-id="${result.id}">
              <h4>${result.title}</h4>
              <span>${result.type}</span>
            </div>
          );
        });
      }
      
      $('.loader').hide();
      resultsContainer.show();
    }, 500);
  });
  
  // Close search results when clicking elsewhere
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.search-container').length) {
      $('#searchResults').hide();
    }
  });
  
  // Enhanced animation for catalog items
  $(".featured-item").on("click", function() {
    const itemId = $(this).data('id');
    const itemTitle = $(this).find('h4').text();
    
    // Add to recently viewed
    const newItem = {
      id: itemId,
      title: itemTitle,
      date: new Date().toLocaleDateString()
    };
    
    // Add to front of array, remove duplicates
    recentlyViewed = recentlyViewed.filter(item => item.id !== itemId);
    recentlyViewed.unshift(newItem);
    
    // Keep only last 10 items
    if (recentlyViewed.length > 10) {
      recentlyViewed.pop();
    }
    
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    
    // Show resource details in modal
    $('#resourceTitle').text(itemTitle);
    $('#resourceModal').fadeIn(300);
  });
  
  // Modal close button
  $('.close-modal').on('click', function() {
    $('#resourceModal').fadeOut(200);
  });
  
  // Close modal when clicking outside
  $(window).on('click', function(e) {
    if ($(e.target).is('#resourceModal')) {
      $('#resourceModal').fadeOut(200);
    }
  });
  
  // Handle bookmark toggling
  $(document).on('click', '.bookmark-icon', function(e) {
    e.stopPropagation();
    
    const itemId = $(this).data('id');
    
    if ($(this).hasClass('active')) {
      // Remove bookmark
      $(this).removeClass('active');
      bookmarkedItems = bookmarkedItems.filter(id => id !== itemId);
    } else {
      // Add bookmark
      $(this).addClass('active');
      bookmarkedItems.push(itemId);
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkedItems));
  });
  
  // Hero section color cycling
  let colorIndex = 0;
  const heroColors = ['#3498db', '#9b59b6', '#2ecc71', '#e67e22', '#1abc9c'];
  
  setInterval(function() {
    colorIndex = (colorIndex + 1) % heroColors.length;
    $('.hero-image').css('background-color', heroColors[colorIndex]);
  }, 5000);
  
  // Show notifications alert randomly
  setTimeout(function() {
    if (Math.random() > 0.5) {
      $('#alertBanner').slideDown();
      
      // Update notification badge
      $('.badge').text('1');
      $('.badge').show();
    }
  }, 10000);
  
  // Dismiss alert
  $('#alertBanner .close-alert').on('click', function() {
    $('#alertBanner').slideUp();
    $('.badge').hide();
  });
  
  // Handle navigation transitions
  $("[data-role='navbar'] a").on("click", function() {
    // Add a loading indicator (in a real app)
    console.log("Navigating to: " + $(this).attr("href"));
  });
  
  // For a real map integration
  if ($("#location").length) {
    console.log("Location page loaded - would initialize map here");
    // In a real app, this would initialize a map
  }
});

// Handle page transitions
$(document).on("pagebeforeshow", function(event, ui) {
  var pageId = $.mobile.activePage.attr("id");
  console.log("Loading page: " + pageId);
  
  // Load dynamic content based on page
  if (pageId === "catalog") {
    // In a real app, you might load catalog items from an API
    console.log("Catalog page - loading latest resources");
    
    // Simulate loading catalog data
    setTimeout(function() {
      loadCatalogItems();
    }, 800);
  }
});

// Simulated catalog loading function
function loadCatalogItems() {
  // In a real app, this data would come from an API
  const catalogItems = [
    { id: 1, title: "Introduction to Programming", type: "Course", featured: true },
    { id: 2, title: "History of Computing", type: "E-Book", featured: false },
    { id: 3, title: "Digital Privacy", type: "Research Paper", featured: true },
    { id: 4, title: "Quantum Computing Explained", type: "Video", featured: false },
    { id: 5, title: "Artificial Intelligence Ethics", type: "Article", featured: true }
  ];
  
  // Would add these items to the page
  console.log("Loaded " + catalogItems.length + " catalog items");
}
