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
    // Redirect Hub visitors to the dedicated subscriber login
    window.location.href = '/hub/login.php';
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
(function(){
  try {
    var BRAND_CLASS = "quietgo-brand";
    var BRAND_HTML = '<span class="quietgo-brand"><span class="quiet">Quiet</span><span class="go">Go</span></span>';
    var EXACT = "QuietGo";
    var SKIP_TAGS = new Set(["SCRIPT","STYLE","NOSCRIPT","IFRAME","TITLE","META","LINK","HEAD"]);
    function alreadyBranded(node){
      return node && node.nodeType===1 && (node.classList && node.classList.contains(BRAND_CLASS) || (node.closest && node.closest("."+BRAND_CLASS)));
    }
    function process(root){
      if (!root) return;
      // Same-node
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: function(n){
          if (!n.nodeValue || !n.nodeValue.includes(EXACT)) return NodeFilter.FILTER_SKIP;
          var p = n.parentNode;
          if (!p || SKIP_TAGS.has(p.nodeName) || alreadyBranded(p)) return NodeFilter.FILTER_SKIP;
          if (p.closest && p.closest("input,textarea,select,option,[contenteditable='true']")) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      var nodes = []; var n;
      while ((n=walker.nextNode())) nodes.push(n);
      nodes.forEach(function(tn){
        var parts = tn.nodeValue.split(EXACT);
        if (parts.length>1){
          var frag = document.createDocumentFragment();
          for (var i=0;i<parts.length;i++){
            if (parts[i]) frag.appendChild(document.createTextNode(parts[i]));
            if (i<parts.length-1){
              var span = document.createElement("span"); span.innerHTML = BRAND_HTML;
              while(span.firstChild) frag.appendChild(span.firstChild);
            }
          }
          tn.parentNode.replaceChild(frag, tn);
        }
      });
      // Cross-node Quiet + Go
      var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var list = []; while((n=tw.nextNode())) list.push(n);
      for (var i=0;i<list.length;i++){
        var a=list[i]; var aval=a.nodeValue||""; var m=aval.match(/Quiet\s*$/);
        if(!m) continue;
        var b=null, bval="";
        for (var j=i+1;j<list.length;j++){
          var c=list[j]; var val=c.nodeValue||"";
          if ((val.trim().length===0)) continue;
          b=c; bval=val; break;
        }
        if(!b) continue;
        if(!/^Go\b/.test(bval)) continue;
        if (a.parentNode && a.parentNode.closest && a.parentNode.closest("input,textarea,select,option,[contenteditable='true']")) continue;
        if (b.parentNode && b.parentNode.closest && b.parentNode.closest("input,textarea,select,option,[contenteditable='true']")) continue;
        try{
          var range=document.createRange();
          range.setStart(a, (a.nodeValue||"").length - m[0].length);
          range.setEnd(b, 2);
          var wrapper=document.createElement("span"); wrapper.className=BRAND_CLASS;
          var q=document.createElement("span"); q.className="quiet"; q.textContent="Quiet";
          var g=document.createElement("span"); g.className="go"; g.textContent="Go";
          wrapper.appendChild(q); wrapper.appendChild(g);
          range.surroundContents(wrapper);
          return process(root);
        }catch(e){}
      }
    }
    function scan(){ process(document.body); }
    if (document.readyState==="loading"){ document.addEventListener("DOMContentLoaded", scan); } else { scan(); }
    var mo=new MutationObserver(function(m){ m.forEach(function(x){ 
      if (x.type==="childList"){ x.addedNodes && x.addedNodes.forEach(function(n){ process(n); }); }
      else if (x.type==="characterData"){ var p=x.target && x.target.parentNode; process(p||document.body); }
    });});
    mo.observe(document.documentElement,{childList:true,subtree:true,characterData:true});
  } catch(e){ console && console.warn && console.warn("QuietGo branding script error:", e); }
})();
