var Manager;

(function ($) {

  $(function () {
    Manager = new AjaxSolr.Manager({
      solrUrl: 'http://localhost:8983/solr/'
    });
    Manager.init();
    Manager.addWidget(new AjaxSolr.ResultWidget({
      id: 'result',
      target: '#docs'
    }));

    Manager.addWidget(new AjaxSolr.PagerWidget({
  id: 'pager',
  target: '#pager',
  prevLabel: '&lt;',
  nextLabel: '&gt;',
  innerWindow: 1,
  renderHeader: function (perPage, offset, total) {
    $('#pager-header').html($('<span/>').text('displaying ' + Math.min(total, offset + 1) + ' to ' + Math.min(total, offset + perPage) + ' of ' + total));
  }
}));
var fields = [ 'show', 'category', 'author', 'organization' ];
    for (var i = 0, l = fields.length; i < l; i++) {
      Manager.store.addByValue('facet.field', fields[i]);
      Manager.addWidget(new AjaxSolr.TagcloudWidget({
        id: fields[i],
        target: '#' + fields[i],
        field: fields[i]
      }));
    }
      Manager.addWidget(new AjaxSolr.TagcloudDateWidget({
        id: 'last_modified',
        target: '#' + 'last_modified',
        field: 'last_modified'
      }));
    Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
      id: 'currentsearch',
      target: '#selection'
    }));



    Manager.store.addByValue('q', '*:*');
    Manager.store.addByValue('facet', 'true');
    Manager.store.addByValue('facet.date', 'last_modified');
    Manager.store.addByValue('facet.date.start', '2006-01-01T00:00:00Z');
    Manager.store.addByValue('facet.date.end', '2011-01-01T00:00:00Z');
    Manager.store.addByValue('facet.date.gap', '+1MONTH');
    Manager.store.addByValue('hl', 'true');
    Manager.store.addByValue('hl.fl', 'description,text');
    Manager.store.addByValue('f.description.hl.fragsize', 0);

    Manager.doRequest();

  });

})(jQuery);
