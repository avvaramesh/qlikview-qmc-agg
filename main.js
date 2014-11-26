window.onload = function() {
  chrome.app.window.current().maximize;
        var webview = document.getElementById("webview");
        var indicator = $("#indicator");

        var loadstart = function() {
          indicator.innerText = "loading...";
        }
        var loadstop = function() {
          indicator.innerText = "";
        }
        webview.addEventListener("loadstart", loadstart);
        webview.addEventListener("loadstop", loadstop);
};

DrawServers();

$('#reloadServers').on('click', function (){
  DrawServers();
});

$('#options').on('click', function (){
  chrome.app.window.create('options.html', {
                id: 'loginWindow',
                'bounds': {
                    'width':    800,
                    'height':   600
                },
                minWidth: 800,
                minHeight: 600,
                maxWidth: 800,
                maxHeight: 600
            } , function() { })
});


function DrawServers() {
  var storage = chrome.storage.local;
  storage.get('servers', function (servers) {
  servers = servers.servers;
  $('#servers').empty();

  for(var i = 0; i < servers.length; i++) {
      var serverUrl = servers[i].url;
      var serverName = servers[i].name;

      $('#servers').append('<li>' + serverName + '<ul> \
      <li class="tab">Status \
      <ul>\
      <li class="link" title="'+ serverUrl + '/Default.htm'  +'">Tasks</li>\
      <li class="link" title="'+ serverUrl + '/ServiceStatusOverview.htm'  +'">Services</li>\
      <li class="link" title="'+ serverUrl + '/QvsStatistics.htm'  +'">QVS Statistics</li>\
      </ul>\
      </li>\
      \
      <li class="tab">Documents \
      <ul>\
      <li class="link" title="'+ serverUrl + '/SourceDocuments.htm'  +'">Source Documents</li>\
      <li class="link" title="'+ serverUrl + '/UserDocuments.htm'  +'">User Documents</li>\
      </ul>\
      </li>\
      \
      <li class="tab">Users \
      <ul>\
      <li class="link" title="'+ serverUrl + '/usermanagement.htm'  +'">User Management</li>\
      <li class="link" title="'+ serverUrl + '/AuthTables.htm'  +'">Section Access Management</li>\
      </ul>\
      </li>\
      \
      <li class="tab">System \
      <ul>\
      <li class="link" title="'+ serverUrl + '/SystemSetup.htm'  +'">Setup</li>\
      <li class="link" title="'+ serverUrl + '/Licenses.htm'  +'">Licenses</li>\
      <li class="link" title="'+ serverUrl + '/About.htm'  +'">About</li>\
      <li class="link" title="'+ serverUrl + '/SupportingTasks.htm'  +'">Supporting Tasks</li>\
      </ul>\
      </li>\
      </ul></li>');
    }

    CollapsibleLists.apply();

    $('.link').on('click', function (){
      var selected = $(this);
      var webview = document.getElementById("webview");
      webview.setAttribute('src', $.trim(selected[0].title));
    });

    $('.tab').on('click', function (){
      var selected = $(this);
    });
});


}
