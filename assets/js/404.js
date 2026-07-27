// Populate the requested path if available
  try {
    var p = window.location.pathname;
    if (p && p !== '/') {
      document.getElementById('path-display').textContent = p;
    }
  } catch(e) {}

  // Generate ambient drifting motes
  (function(){
    var field = document.getElementById('motes');
    var count = window.innerWidth < 600 ? 12 : 22;
    for (var i = 0; i < count; i++){
      var m = document.createElement('div');
      m.className = 'mote';
      var left = Math.random() * 100;
      var delay = Math.random() * 12;
      var dur = 10 + Math.random() * 10;
      var bottom = Math.random() * 20;
      m.style.left = left + 'vw';
      m.style.bottom = bottom + 'vh';
      m.style.animationDelay = delay + 's';
      m.style.animationDuration = dur + 's';
      m.style.opacity = '0';
      field.appendChild(m);
    }
  })();