import _ from 'lodash';

const baseUrl = '192.168.2.108:3000';

export default {

    baseUrl,

    lastValues: {},

    sendOrientation: function(name, value, client_id) {
        console.log('sendOrientation', name, value, client_id);
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
        const that = this;
        //_.debounce(() => that.sendOrientation('x', value, client_id), 100);
        that.sendOrientation('x', value, client_id);
    },

    y: function(value, client_id) {
        const that = this;
        // _.debounce(() => that.sendOrientation('y', value, client_id), 100);
        that.sendOrientation('y', value, client_id)
    },

    getID: function(callback, $http) {
        window.mainApp.msg = "getting id";
        const url = `http://${baseUrl}/register`;
        $http.get(url, {}).then(
            (response) => callback(response.body.id),
            (response) => {
                console.err("There was an error getting the client id:" + response.statusText);
                window.mainApp.msg = response.statusText;
        });
    }
}
