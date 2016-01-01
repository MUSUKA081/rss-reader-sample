google.load("feeds", "1");

addEventListener('DOMContentLoaded', function(){
    /*RSSの一覧をリストで表示*/
    getRSS('http://rss.asahi.com/rss/asahi/digital.rdf', function(data) {
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
        props: [
            'publishedDate',
            'title',
            'link'
        ],
        computed: {
            date: function() {
                return new Date(this.publishedDate).toLocaleDateString("ja-JP", {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
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
