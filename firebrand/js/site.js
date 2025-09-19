// QuietGo Site JavaScript - Minimal interactions
// No frameworks, just vanilla JavaScript

// App configuration

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('open');
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('open');
}

// Handle login redirect
function handleLogin() {
    // Redirect to QuietGo Hub or authentication
    window.location.href = '/api/login';
}

// Handle get started action
function handleGetStarted() {
    // Redirect to sign up or login
    window.location.href = '/api/login';
}

// Handle app store links
function handleAppStore() {
    // Replace with actual App Store URL when ready
    alert('App Store link - Replace with actual URL when app is published');
    // window.open('https://apps.apple.com/app/quietgo', '_blank');
}

function handlePlayStore() {
    // Replace with actual Play Store URL when ready
    alert('Play Store link - Replace with actual URL when app is published');
    // window.open('https://play.google.com/store/apps/details?id=com.quietgo.app', '_blank');
}



// Handle keyboard events
function setupKeyboardEvents() {
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape key
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
            }
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupKeyboardEvents();
    
    console.log('QuietGo site initialized');
});

// Add some utility functions for potential future use
function updateQueryParam(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.replaceState({}, '', url);
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Simple analytics event tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Add your analytics tracking here
    console.log('Event tracked:', eventName, properties);
}

// Track button clicks for analytics
function trackButtonClick(buttonName) {
    trackEvent('button_click', { button: buttonName });
}

// Enhanced button handlers with tracking
const originalHandleLogin = handleLogin;
handleLogin = function() {
    trackButtonClick('login');
    originalHandleLogin();
};

const originalHandleGetStarted = handleGetStarted;
handleGetStarted = function() {
    trackButtonClick('get_started');
    originalHandleGetStarted();
};

const originalHandleAppStore = handleAppStore;
handleAppStore = function() {
    trackButtonClick('app_store');
    originalHandleAppStore();
};

const originalHandlePlayStore = handlePlayStore;
handlePlayStore = function() {
    trackButtonClick('play_store');
    originalHandlePlayStore();
};

// Add smooth reveal animations on scroll (optional enhancement)
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations after page load
window.addEventListener('load', function() {
    addScrollAnimations();
});

// QuietGo auto-branding (exact match, cross-node).
// Wraps visible occurrences of "QuietGo" even when split across inline elements (e.g., Quiet<em>Go</em>).
(function(){
  try {
    var BRAND_CLASS = "quietgo-brand";
    var BRAND_HTML = '<span class="quietgo-brand"><span class="quiet">Quiet</span><span class="go">Go</span></span>';
    var EXACT = "QuietGo";
    var SKIP_TAGS = new Set(["SCRIPT","STYLE","NOSCRIPT","IFRAME","TITLE","META","LINK","HEAD"]);
    function isElement(n){ return n && n.nodeType === 1; }
    function isText(n){ return n && n.nodeType === 3; }

    function alreadyBranded(node){
      return isElement(node) && (node.classList && node.classList.contains(BRAND_CLASS) || (node.closest && node.closest("."+BRAND_CLASS)));
    }

    function processContainer(root){
      if (!root || SKIP_TAGS.has(root.nodeName)) return;
      // Avoid re-processing branded blocks
      if (alreadyBranded(root)) return;

      // First pass: same-node replacements (fast path)
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: function(n){
          if (!n.nodeValue || !n.nodeValue.includes("QuietGo")) return NodeFilter.FILTER_SKIP;
          var p = n.parentNode;
          if (!p || SKIP_TAGS.has(p.nodeName)) return NodeFilter.FILTER_SKIP;
          if (alreadyBranded(p)) return NodeFilter.FILTER_SKIP;
          // Skip inside inputs/textarea/contenteditable
          if (p.closest && p.closest("input,textarea,select,option,[contenteditable='true']")) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      var text;
      var toReplace = [];
      while ( (text = walker.nextNode()) ){
        toReplace.push(text);
      }
      toReplace.forEach(function(tn){
        var parts = tn.nodeValue.split(EXACT);
        if (parts.length > 1){
          var frag = document.createDocumentFragment();
          for (var i=0;i<parts.length;i++){
            if (parts[i]) frag.appendChild(document.createTextNode(parts[i]));
            if (i < parts.length-1){
              var span = document.createElement("span");
              span.innerHTML = BRAND_HTML;
              while (span.firstChild) frag.appendChild(span.firstChild);
            }
          }
          tn.parentNode.replaceChild(frag, tn);
        }
      });

      // Second pass: cross-node bridging (Quiet + Go across nodes)
      var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var nodes = [];
      var n;
      while ( (n = tw.nextNode()) ){
        nodes.push(n);
      }
      for (var idx=0; idx<nodes.length; idx++){
        var a = nodes[idx];
        var aval = a.nodeValue || "";
        if (!aval) continue;

        // Look for 'Quiet' at the end (ignoring trailing spaces)
        var match = aval.match(/Quiet\s*$/);
        if (!match) continue;

        // Next non-empty text node
        var b = null, bval = "";
        for (var j=idx+1; j<nodes.length; j++){
          var candidate = nodes[j];
          if (!candidate.parentNode) continue;
          if (SKIP_TAGS.has(candidate.parentNode.nodeName)) continue;
          if (alreadyBranded(candidate.parentNode)) break;
          var val = candidate.nodeValue || "";
          if (val.trim().length === 0){ continue; }
          b = candidate; bval = val;
          break;
        }
        if (!b) continue;
        if (!/^Go\b/.test(bval)) continue;

        // Skip form/editable areas
        if (a.parentNode && a.parentNode.closest && a.parentNode.closest("input,textarea,select,option,[contenteditable='true']")) continue;
        if (b.parentNode && b.parentNode.closest && b.parentNode.closest("input,textarea,select,option,[contenteditable='true']")) continue;

        // Build a range from 'Quiet' end on a to after 'Go' on b
        var range = document.createRange();
        var aEnd = a.nodeValue.length;
        var quietLen = 5;
        // position where 'Quiet' starts in 'a'
        var quietStart = aEnd - (match[0].length);
        range.setStart(a, quietStart);
        range.setEnd(b, 2);

        var wrapper = document.createElement("span");
        wrapper.className = BRAND_CLASS;
        var q = document.createElement("span"); q.className="quiet"; q.textContent="Quiet";
        var g = document.createElement("span"); g.className="go"; g.textContent="Go";
        wrapper.appendChild(q); wrapper.appendChild(g);

        try {
          range.surroundContents(wrapper);
        } catch(e){
          // If nodes not partially selectable, skip safely
          continue;
        }
        return processContainer(root);
      }
    }

    function scan(){
      if (!document.body) return;
      processContainer(document.body);
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", scan);
    } else {
      scan();
    }

    var mo = new MutationObserver(function(muts){
      for (var i=0;i<muts.length;i++){
        var m = muts[i];
        if (m.type === "childList"){
          m.addedNodes && m.addedNodes.forEach(function(n){ processContainer(n); });
        } else if (m.type === "characterData"){
          var p = m.target && m.target.parentNode;
          processContainer(p || document.body);
        }
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  } catch(e){
    console && console.warn && console.warn("QuietGo branding script error:", e);
  }
})();