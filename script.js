/* ==========================================================================
   CropCare Portal — Interactive Client-Side Script (script.js)
   Course: Web Designing (DCSE0152) | Module 4: Interactive Website using JS
   Team: B.Tech CSE (Data Science — DS-A), PBL Group 11, NIET Greater Noida
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var currentCropFilter = 'all';
  var ticketCounter = 201;

  // 1. INTERACTIVE MOBILE MENU TOGGLE (JavaScript Event Listener)
  var menuToggleBtn = document.getElementById('menuToggleBtn');
  var navMenuList = document.getElementById('navMenuList');

  if (menuToggleBtn && navMenuList) {
    menuToggleBtn.addEventListener('click', function () {
      navMenuList.classList.toggle('show-menu');
    });
  }

  // 2. LIVE DISEASE CARD SEARCH & CROP FILTER (Loops & Conditionals)
  var searchInput = document.getElementById('diseaseSearchInput');
  var filterButtons = document.querySelectorAll('.filter-btn');
  var diseaseCards = document.querySelectorAll('.disease-card');
  var filterStatusText = document.getElementById('filterStatusText');

  function filterDiseaseCards() {
    var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var visibleCount = 0;

    // Loop through all disease cards using forEach
    diseaseCards.forEach(function (card) {
      var cardCrop = card.getAttribute('data-crop');
      var cardText = card.textContent.toLowerCase();

      // Conditional statements checking crop filter and search keyword
      var matchesCrop = (currentCropFilter === 'all') || (cardCrop === currentCropFilter);
      var matchesQuery = (query === '') || (cardText.indexOf(query) !== -1);

      if (matchesCrop && matchesQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (filterStatusText) {
      filterStatusText.textContent = 'Showing ' + visibleCount + ' of ' + diseaseCards.length + ' disease profiles';
    }
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentCropFilter = btn.getAttribute('data-filter');
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      filterDiseaseCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterDiseaseCards);
  }

  // 3. SEASONAL TIMETABLE FILTER (Change Event & Loop)
  var seasonFilterSelect = document.getElementById('seasonFilterSelect');
  var timetableRows = document.querySelectorAll('#timetableBody tr');

  if (seasonFilterSelect) {
    seasonFilterSelect.addEventListener('change', function () {
      var selectedSeason = seasonFilterSelect.value;
      timetableRows.forEach(function (row) {
        var rowSeason = row.getAttribute('data-season');
        if (selectedSeason === 'all' || rowSeason === selectedSeason) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // 4. ELIGIBILITY READINESS SCORE CALCULATOR (Loop & Percentage Math)
  var eligibilityChecks = document.querySelectorAll('.elig-check');
  var readinessOutput = document.getElementById('readinessScoreOutput');

  function updateEligibilityScore() {
    var checkedCount = 0;
    for (var i = 0; i < eligibilityChecks.length; i++) {
      if (eligibilityChecks[i].checked) {
        checkedCount++;
      }
    }
    var percentage = Math.round((checkedCount / eligibilityChecks.length) * 100);
    var statusLabel = percentage >= 75 ? 'Field Ready' : (percentage >= 50 ? 'Moderate Readiness' : 'Action Needed');

    if (readinessOutput) {
      readinessOutput.textContent = percentage + '% (' + checkedCount + '/' + eligibilityChecks.length + ' Criteria Met — ' + statusLabel + ')';
    }
  }

  eligibilityChecks.forEach(function (chk) {
    chk.addEventListener('change', updateEligibilityScore);
  });

  // 5. PER-ACRE PREVENTIVE COST & DOSAGE CALCULATOR (Math Calculations & Alert)
  var calcBtn = document.getElementById('calcCostBtn');
  var calcResultBox = document.getElementById('calcResultText');

  if (calcBtn) {
    calcBtn.addEventListener('click', function () {
      var acres = parseFloat(document.getElementById('acreInput').value);
      var inputType = document.getElementById('bioInputSelect').value;

      if (isNaN(acres) || acres <= 0 || acres > 500) {
        alert('Please enter a valid farm area between 0.5 and 500 acres.');
        return;
      }

      var costPerAcre = 0;
      var dosagePerAcre = '';
      var unitName = '';

      // Conditional statements for dosage and cost rates
      if (inputType === 'trichoderma') {
        costPerAcre = 150;
        dosagePerAcre = (acres * 100).toFixed(0);
        unitName = 'grams of Trichoderma viride';
      } else if (inputType === 'neem') {
        costPerAcre = 300;
        dosagePerAcre = (acres * 600).toFixed(0);
        unitName = 'ml of Neem Oil (1500 ppm)';
      } else {
        costPerAcre = 375;
        dosagePerAcre = Math.ceil(acres * 18);
        unitName = 'Yellow Sticky Traps';
      }

      var totalCost = (acres * costPerAcre).toFixed(2);
      calcResultBox.innerHTML = '<strong>Estimated Requirement for ' + acres + ' Acre(s):</strong> ' +
        dosagePerAcre + ' ' + unitName + ' | <strong>Total Cost: ₹' + totalCost + '</strong>';
    });
  }

  // 6. INTERACTIVE GALLERY LIGHTBOX MODAL
  var modal = document.getElementById('lightboxModal');
  var modalImg = document.getElementById('lightboxImg');
  var modalCaption = document.getElementById('lightboxCaption');
  var closeModalBtn = document.getElementById('closeModalBtn');

  document.querySelectorAll('.gallery-item img, .disease-card img').forEach(function (img) {
    img.addEventListener('click', function () {
      if (modal && modalImg && modalCaption) {
        modalImg.src = img.src;
        modalCaption.textContent = img.alt;
        modal.style.display = 'flex';
      }
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  }

  // 7. CLIENT-SIDE FORM VALIDATION & DYNAMIC INQUIRY LOG
  var contactForm = document.getElementById('contactForm');
  var formFeedback = document.getElementById('formFeedback');
  var ticketLogList = document.getElementById('ticketLogList');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var region = document.getElementById('region').value.trim();
      var crop = document.getElementById('crop').value.trim();
      var message = document.getElementById('message').value.trim();

      if (!name || !email || !region || !crop || !message) {
        alert('Validation Error: Please complete all required fields (*) before submitting.');
        formFeedback.innerHTML = '<span style="color:#B71C1C;font-weight:700;">✖ Error: All fields marked with (*) are mandatory.</span>';
        return;
      }

      if (email.length < 6) {
        alert('Validation Error: Please enter a valid 10-digit phone number or email address.');
        return;
      }

      var ticketId = '#CC-' + (ticketCounter++);
      alert('Success! Advisory Ticket ' + ticketId + ' generated for ' + name + ' (' + crop + ').');
      formFeedback.innerHTML = '<span style="color:#1B5E20;font-weight:700;">✔ Inquiry ' + ticketId + ' submitted successfully for ' + name + ' (' + crop + ' — ' + region + ').</span>';

      if (ticketLogList) {
        var li = document.createElement('li');
        li.innerHTML = '<strong>' + ticketId + ' (' + crop + '):</strong> ' + name + ' — ' + region + ' (<em>"' + message + '"</em>)';
        ticketLogList.prepend(li);
      }

      contactForm.reset();
    });
  }
});
