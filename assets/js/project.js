(function () {
  var projects = window.GURU_PROJECTS || [];
  var slug = new URLSearchParams(location.search).get('p');
  var index = projects.findIndex(function (p) { return p.slug === slug; });

  if (index === -1) {
    document.getElementById('project').querySelector('.container').innerHTML =
      '<a class="pp__back" href="index.html#projects">&larr; All projects</a>' +
      '<h1 class="pp__title">Project not found</h1>';
    document.title = 'Project not found | Guru Interiors';
    return;
  }

  var p = projects[index];
  function $(id) { return document.getElementById(id); }

  document.title = p.name + ' | Guru Interiors';
  $('pp-title').textContent = p.name;
  $('pp-service').textContent = p.service;
  $('pp-location').textContent = p.location;
  $('pp-summary').textContent = p.summary;

  var logo = $('pp-logo');
  logo.src = p.logo;
  logo.alt = p.name + ' logo';
  logo.width = p.width;
  logo.height = p.height;

  p.scope.forEach(function (item) {
    var li = document.createElement('li');
    li.textContent = item;
    $('pp-scope').appendChild(li);
  });

  if (p.images && p.images.length) {
    p.images.forEach(function (src, i) {
      var img = document.createElement('img');
      img.src = src;
      img.alt = p.name + ' photo ' + (i + 1);
      img.loading = 'lazy';
      $('pp-gallery').appendChild(img);
    });
    $('pp-gallery-wrap').hidden = false;
  }

  // wrap around so every project has a previous and next
  function link(el, q) {
    el.href = 'project.html?p=' + q.slug;
    el.querySelector('strong').textContent = q.name;
  }
  link($('pp-prev'), projects[(index - 1 + projects.length) % projects.length]);
  link($('pp-next'), projects[(index + 1) % projects.length]);
})();
