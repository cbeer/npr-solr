(function ($) {

AjaxSolr.theme.prototype.result = function (doc, snippet) {
  var output = '<div><h2><a href="' + doc.link + '">' + doc.title + '</a></h2>';
  output += '<p id="links_' + doc.id + '" class="links"></p>';
  output += '<p>' + snippet + '</p></div>';
  return output;
};

AjaxSolr.theme.prototype.snippet = function (doc) {
  var output = '';
    output += (doc.show || "")+ " " + doc.last_modified.substring(0,10) + ' <span class="author">' + (doc.author || "") + "</span> <span class='category_primary'>" + (doc.category_primary || "")  + "</span>";
if(Manager.response.highlighting[doc.id].description) {
output += "<div class='description description_hl'>" + Manager.response.highlighting[doc.id].description[0] + "</div>";
} else {
output += "<div class='description'>" + doc.description + "</div>";
}
if(Manager.response.highlighting[doc.id].text) {
output += "<div class='hl'>" + Manager.response.highlighting[doc.id].text[0] + "</div>"
}
  return output;
};

AjaxSolr.theme.prototype.tag = function (value, weight, handler) {
  return $('<a href="#" class="tagcloud_item"/>').text(value).addClass('tagcloud_size_' + weight).click(handler);
};

AjaxSolr.theme.prototype.facet_link = function (value, handler) {
  return $('<a href="#"/>').text(value).click(handler);
};

AjaxSolr.theme.prototype.no_items_found = function () {
  return 'no items found in current selection';
};

})(jQuery);
