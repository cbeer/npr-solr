/*
Include this script on a jquerified page to get more like this results..
*/


function solr_mlt_records(text) {
	jQuery.getJSON('http://www.publicmediatech.com:8983/solr/mlt/?fl=link,title,description,show,last_modified&mlt.qf=title^10000000 description^10000000 text&mlt.fl=title,description,text&wt=json&stream.body="' + text.substring(0,1500) +'"&rows=3&json.wrf=?', mlt_callback);
}

function mlt_callback(data) {
	docs = data.response.docs;
	docs.each(function(doc) {
		mlt_display(doc);
	});
}

function mlt_display(doc) {
	var byline = '';
	if(doc.show) { byline += doc.show + " / "; }
	if(doc.last_modified) { byline += doc.last_modified.substring(0,10) + " / "; }
	jQuery('#solr_mlt_target').append('<div><h2><a href="' + doc.link + '">' + doc.title + '</a></h2><p>' + byline + ' ' + doc.description + '</p></div>');
}

jQuery('#c2 .column-inner').append('<div id="solr_mlt_target"></div>');
solr_mlt_records(jQuery('.article-content').text());
