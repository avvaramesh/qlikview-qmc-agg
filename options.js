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

      $('#servers').append("<div id='"+i+"'>\
      Name: <input type='text' value='" + servers[i].name + "'> </input>\
      &nbsp;&nbsp;URL: <input type='text' value='" + servers[i].url + "' size='50'> </input>\
      &nbsp;&nbsp;Type: <select><option value='QlikView' " + qvSelected +">QlikView</option><option value='Qlik Sense' " + senseSelected +">Qlik Sense</option></select>\
      <input style='vertical-align:middle; padding-bottom: 4px' type='image' src='/assets/remove.png' class='delete' width='16' height='16'></input></div>");
    }

    $('.delete').on('click', function (){
      var removeId = ($(this).parent().closest('div').attr('id'));
      $('#' + removeId).remove();
    });

  });

  $('#addServer').on('click', function (){
    var id = Math.floor(Math.random() * 999999) + 1;
    $('#servers').append("<div id='"+id+"'>Name: <input type='text' value=''> </input>\
      &nbsp;&nbsp;URL: <input type='text' value=''  size='50'> </input>\
      &nbsp;&nbsp;Type: <select><option value='QlikView' selected='selected'>QlikView</option><option value='Qlik Sense'>Qlik Sense</option></select>\
      <input style='vertical-align:middle; padding-bottom: 4px' type='image' src='/assets/remove.png' class='delete' width='16' height='16'></input></div>");

      $('.delete').on('click', function (){
        var removeId = ($(this).parent().closest('div').attr('id'));
        $('#' + removeId).remove();
      });
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