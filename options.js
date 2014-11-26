$(document).ready(function() {
  var storage = chrome.storage.local;

  storage.get('servers', function (servers) {
    servers = servers.servers;
    for(var i = 0; i < servers.length; i++) {
      if(servers[i].type === 'QlikView') {
        qvSelected = 'selected="selected"';
        senseSelected = '';
      } else {
        qvSelected = '';
        senseSelected = 'selected="selected"';
      }

      $('#servers').append("<div id='"+i+"'><input type='text' value='" + servers[i].name + "'> </input>\
      <input type='text' value='" + servers[i].url + "'> </input>\
      <select><option value='QlikView' " + qvSelected +">QlikView</option><option value='Qlik Sense' " + senseSelected +">Qlik Sense</option></select>\
      <input type='button' class='delete' value='x'></input></div>");
    }

    $('.delete').on('click', function (){
      var removeId = ($(this).parent().closest('div').attr('id'));
      $('#' + removeId).remove();
    });

  });

  $('#addServer').on('click', function (){
    $('#servers').append("<div id=''><input type='text' value=''> </input>\
      <input type='text' value=''> </input>\
      <select><option value='QlikView' selected='selected'>QlikView</option><option value='Qlik Sense'>Qlik Sense</option></select>\
      </input><input type='button' class='delete' value='x'></input></div>");
  });

  $('#saveOptions').on('click', function (){
    var options = $('#servers').children("div");
    var serversSave = {"servers" : []};

    for(var i = 0; i < options.length; i++) {
      var server = {};
      $.each(jQuery(options[i]).children(), function( index, value ) {
        var value = jQuery(value).val();
        switch (index) {
            case 0:
                server['name'] = value;
                break;
            case 1:
                server['url'] = value;
                break;
            case 2:
                server['type'] = value;
                break;
        }
      });
      serversSave.servers.push(server);
    }

    storage.set(serversSave);
  });
});