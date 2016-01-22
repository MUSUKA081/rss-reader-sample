google.load("feeds", "1");

addEventListener('DOMContentLoaded', function(){
    /*RSSの一覧をリストで表示*/
    getRSS('http://staff.hatenablog.com/rss', function(data) {
        showData(data);
    });
});

/* Google Ajax APIを利用してRSS取得 */
function getRSS(url, callback) {
    function initialize() {
        var feed = new google.feeds.Feed(url + "?" + (new Date()).getTime());
        feed.setNumEntries(10);
        feed.load(function(result) {
            if (result.error) {
                console.log("Failed Get Feed.");
                console.log("error_code " + result.error.code + ": " + result.error.message);
            } else {
                callback(result);
            }
        });
    }
    google.setOnLoadCallback(initialize);
}

/* 取得したJSONをvue.jsで表示 */
function showData(data) {
    Vue.component('my-entry', {
        template: '#my-entry-template',
        props: ['item'],
        computed: {
            date: function() {
                return new Date(this.item.publishedDate).toLocaleDateString("ja-JP", {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
            },
            new: function() {
                var date = new Date(this.item.publishedDate);
                var now = new Date();
                var diff = new Date(now - date);
                return diff.getUTCMonth() < 1;
            }
        }
    });

    var entries = data.feed.entries;
    vm = new Vue({
        el: '#app',
        data: {
            entries: entries
        }
    });
}
