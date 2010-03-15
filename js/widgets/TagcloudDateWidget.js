(function ($) {

AjaxSolr.TagcloudDateWidget = AjaxSolr.AbstractFacetWidget.extend({
  afterRequest: function () {
    if (this.manager.response.facet_counts.facet_dates[this.field] === undefined) {
      $(this.target).html(AjaxSolr.theme('no_items_found'));
      return;
    }

    var maxCount = 0;
    var objectedItems = [];
	for(var facet in this.manager.response.facet_counts.facet_dates[this.field]) {
	if(facet != 'gap') { 
		var count = this.manager.response.facet_counts.facet_dates[this.field][facet];
      if (count > maxCount) {
        maxCount = count;
      }
      objectedItems.push({ facet: facet, count: count });
	}
    }
    /*objectedItems.sort(function (a, b) {
      return a.facet < b.facet ? -1 : 1;
    });*/
    $(this.target).empty();
    for (var i = 0, l = objectedItems.length; i < l; i++) {
	if(objectedItems[i].count != 0) { 
      var facet = objectedItems[i].facet;
      year = parseInt(facet.substring(0,4));
      month = parseInt(facet.substring(5,7));
      month += 1;
      if(month > 12) {
	year++; month -= 12;
     }
     month = String(month);
     if(month.length == 1) { month = "0" + month; }
      next = year + "-" + month + "-01T00:00:00Z"; 
      $(this.target).append(AjaxSolr.theme('tag', facet.substring(0,7), parseInt(objectedItems[i].count / maxCount * 10), this.clickHandler("["+ facet + " TO " + next + "]")));
	}
    }
  }
});

})(jQuery);
