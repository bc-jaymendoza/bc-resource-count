// ==UserScript==
// @name         Migrations Resource Totals
// @namespace    http://bigcommerce.com
// @version      0.1
// @description  grabs product, etc. count from /admin/ninja
// @author       Jay Mendoza
// @match        https://*.mybigcommerce.com/manage/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$.get("/admin/ninja", function(resp) {
	var doc = (new DOMParser).parseFromString(resp, 'text/html');

	var productCount = getProductCount(doc);
	var categoryCount = getCategoryCount(doc);
	var customerCount = getCustomerCount(doc);

	counts = "<br> \
			  Products: "+productCount+"<br> \
			  Categories: "+categoryCount+"<br> \
			  Customers: "+customerCount;

	$('li.logo').append(counts);
});

function getProductCount(doc) {
	return getElementByXpath('//*[@id="content"]/dl[3]/dd[2]/code', doc);
}

function getCategoryCount(doc) {
	return getElementByXpath('//*[@id="content"]/dl[12]/dd[2]/code', doc);
}

function getCustomerCount(doc) {
	return getElementByXpath('//*[@id="content"]/dl[3]/dd[4]/code', doc);
}

function getElementByXpath(path, doc) {
  return document.evaluate(path, doc, null, XPathResult.STRING_TYPE, null).stringValue;
}