export default {

    baseUrl: '192.168.2.107:5000',

    lastValues: {},

    sendOrientation: function(name, value, client_id) {
        if (!client_id) {
            return;
        }
        value = Math.round(127*value);
        if (this.lastValues[name] === value) {
            return;
        }
        this.lastValues[name] = value;
        const url = `http://${this.baseUrl}/orientation/${name}/${value}/${client_id}?datetime=${new Date().getTime()}`;
        $.ajax({
            url: url,
            method: 'GET'
        });
        console.log(url);
        window.mainApp.msg = url;
    },

    x: function(value, client_id) {
        this.sendOrientation('x', value, client_id);
    },

    y: function(value, client_id) {
        this.sendOrientation('y', value, client_id);
    },

    getID: function(callback) {
          window.mainApp.msg = "getting id";
          callback(1);
          return;
      $.ajax({
        url: 'http://192.168.2.107:3000/id.json',
        method: 'GET'
      }).then(function (response) {
        if(response.error) {
          console.err("There was an error getting the client id:" + response.error);
          window.mainApp.msg = response.error;
        } else {
              window.mainApp.msg = "ID: " + response.id;
          callback(response.id);
        }
      }).catch(function (err) {
          window.mainApp.msg = response.error;
        console.error(err);
      });
    }
}
