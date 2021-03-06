google.load("feeds", "1");

addEventListener('DOMContentLoaded', function(){
    /*RSSの一覧をリストで表示*/
    getRSS('http://summer.ics.nitech.ac.jp/apps/news/rss/', function(data) {
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
    var entries = data.feed.entries;

    /* 各記事のコンポーネント */
    var Entry = Vue.extend({
        template: '#my-entry-template',
        props: ['entry'],
        computed: {
            date: function() {
                return new Date(this.entry.publishedDate).toLocaleDateString("ja-JP", {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
            },
            new: function() {
                var date = new Date(this.entry.publishedDate);
                var now = new Date();
                var diff = new Date(now - date);
                return diff.getUTCMonth() < 1;
            }
        }
    });

    /* 記事リストのコンポーネント */
    var Reader = Vue.extend({
        template: '#my-reader-template',
        components: {
            'my-entry': Entry
        },
        props: ['entries']
    });

    new Vue({
        el: '#app',
        data: {
            entries: []
        },
        components: {
            'my-reader': Reader
        },
        ready() {
            entries.forEach(function(item) {
                this.entries.push(item);
            }.bind(this));
        }
    });


}
