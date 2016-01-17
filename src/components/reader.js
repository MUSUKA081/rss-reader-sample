var Entry = Vue.extend({
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

var Reader = Vue.extend({
    template: '#my-reader-template',
    component: {
        'my-entry': Entry
    }
    data: {
        entries: entries
    }
});

var entries = data.feed.entries;

new Vue({
    el: '#app',
    data: {
        entries: entries
    },
    component: {
        'my-reader': Reader
    }
});
