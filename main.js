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
      var serverType = servers[i].type;

      if(serverType === 'QlikView') {
        $('#servers').append('<li><strong>' + serverName + '</strong><ul> \
        <li class="tab">Status \
        <ul>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/Default.htm'  +'">Tasks</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/ServiceStatusOverview.htm'  +'">Services</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/QvsStatistics.htm'  +'">QVS Statistics</li>\
        </ul>\
        </li>\
        \
        <li class="tab">Documents \
        <ul>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/SourceDocuments.htm'  +'">Source Documents</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/UserDocuments.htm'  +'">User Documents</li>\
        </ul>\
        </li>\
        \
        <li class="tab">Users \
        <ul>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/usermanagement.htm'  +'">User Management</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/AuthTables.htm'  +'">Section Access Management</li>\
        </ul>\
        </li>\
        \
        <li class="tab">System \
        <ul>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/SystemSetup.htm'  +'">Setup</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/Licenses.htm'  +'">Licenses</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/About.htm'  +'">About</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/SupportingTasks.htm'  +'">Supporting Tasks</li>\
        </ul>\
        </li>\
        </ul></li>');
      } else {
        $('#servers').append('<li><strong>' + serverName + '</strong><ul> \
        <li class="tab">Manage Content\
        <ul>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/apps'  +'">Apps</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/contentlibraries'  +'">Content libraries</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/dataconnections'  +'">Data connections</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/appobjects'  +'">App objects</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/streams'  +'">Streams</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/tasks'  +'">Tasks</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/users'  +'">Users</li>\
        </ul>\
        </li>\
        \
        <li class="tab">Manage Resources \
        <ul>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/audit'  +'">Audit</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/securityrules'  +'">Security rules</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/customproperties'  +'">Custom properties</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/tokens'  +'">License and tokens</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/extensions'  +'">Extensions</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/tags'  +'">Tags</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/userdirectoryconnectors'  +'">User directory connectors</li>\
        </ul>\
        </li>\
        \
        <li class="tab">Config System \
        <ul>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/nodes'  +'">Nodes</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/engines'  +'">Engines</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/proxies'  +'">Proxies</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/schedulers'  +'">Schedulers</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/repositories'  +'">Repositories</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/syncrules'  +'">Sync rules</li>\
        <li class="link" data-ref="'+ serverName  +'" title="'+ serverUrl + '/certificates'  +'">Certificates</li>\
        </ul>\
        </li>\
        </ul></li>');
      }
    }

    CollapsibleLists.apply();

    $('.link').on('click', function (){
      var selected = $(this);
      var webview = document.getElementById("webview");
      webview.setAttribute('src', $.trim(selected[0].title));
      $('#selectedServer').text(jQuery(selected[0]).attr('data-ref'));
    });

    $('.tab').on('click', function (){
      var selected = $(this);
    });
});


}
