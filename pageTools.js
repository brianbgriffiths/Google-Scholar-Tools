// Copyright (c) 2021 Brian B. Griffiths. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found by searching for the license on the internet.
var loaded=false;
var global_unread=1;
var global_trash=0;

console.log('Google Scholar Tools is running');

function displayChromeToolsLink() {
	if (document.getElementById('gs_hdr_hpl')) {
		document.getElementById('gs_hdr_hpl').innerHTML+='<a href="" class="gs_btnPRO gs_in_ib"><span class="gs_ico" style="filter: invert(100%) brightness(0.05) sepia(1) saturate(10000%);"></span><span class="gs_lbl">Tools</span></a>';
	}
	if (document.getElementById('gs_ab_btns')) {
		var btnhtml=document.getElementById('gs_ab_btns').innerHTML;
		document.getElementById('gs_ab_btns').innerHTML='<a href="" class="gs_btnPRO gs_in_ib"><span class="gs_ico" style="filter: invert(100%) brightness(0.05) sepia(1) saturate(10000%);"></span><span class="gs_lbl">Tools</span></a>'+btnhtml;
	}
	if (document.getElementById('gs_res_ccl_top')) {
		document.getElementById('gs_res_ccl_top').innerHTML+='<div id="gst_info"></div>';
	}
}

chrome.storage.sync.get(function(result) {
	console.log(result);
});
function toggleItems() {
	var read = document.getElementsByClassName('item-saved');
	for (r of read) {
		if (global_unread==0) {
			r.parentElement.parentElement.parentElement.style.display='block';
		} else {
			r.parentElement.parentElement.parentElement.style.display='none';
		}
	}
	
	var trash = document.getElementsByClassName('item-trashed');
	for (t of trash) {
		if (global_trash==1) {
			t.parentElement.parentElement.parentElement.style.display='block';
		} else {
			t.parentElement.parentElement.parentElement.style.display='none';
		}
	}
	var vresults = document.getElementsByClassName('gs_ri');

	var visible=0;
	for (a of vresults) {
		if (a.parentElement.style.display!='none') {
			visible++;
		}
	}
	
	console.log(visible,'visible items of',vresults.length,'total');
	if (visible==0) {
		chrome.storage.sync.get(['autoincrementblank'], function(result) {
			console.log(result);
			//load the next page
			if (result.autoincrementblank=='yes') {
				try {
					document.getElementsByClassName('gs_ico_nav_next')[0].click();
				} catch(err) {
					
				}
			} else {
				document.getElementById('gst_info').innerHTML='all display items are in the trash or marked as read. Enable "auto increment to next page" or manually proceed the next page.';
			}
		});
	}
}
function updateItem(id,value) {
	if (value>0) {
		document.getElementById('img_'+id).classList.add("item-saved");
	} else if (value<0) {
		document.getElementById('trash_'+id).classList.add("item-trashed");
	} else {
		document.getElementById('img_'+id).classList.remove("item-saved");
		document.getElementById('trash_'+id).classList.remove("item-trashed");
	}
	var key={};
	key[id]=value;
	toggleItems();
	  chrome.storage.sync.set(key, function() {
		  console.log('Value is set to '+value);
		});
}
	

	
var results = document.getElementsByClassName('gs_ri');

for (a of results) {
	var thisid = a.parentElement.dataset.cid;
	//console.log(a,thisid);
	var itembar = a.querySelector('.gs_fl');
	itembar.setAttribute('data-cid',thisid);
	var thishtml=itembar.innerHTML;
	itembar.innerHTML='<div class="item_img" id="img_'+thisid+'"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="save" class="svg-inline--fa fa-save fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"></path></svg></div>'+thishtml+'<div class="item-trash" id="trash_'+thisid+'"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg></div>';
	
	chrome.storage.sync.get([thisid], function(result) {
		console.log('load',result);
		var thisvalue=parseInt(Object.values(result)[0]) || 0;
		if (thisvalue>0) {
			document.getElementById('img_'+Object.keys(result)[0]).classList.add("item-saved");
		} else if (thisvalue<0) {
			document.getElementById('trash_'+Object.keys(result)[0]).classList.add("item-trashed");
		}
	});
	var itemimg=document.getElementById('img_'+thisid);
	itemimg.addEventListener('click', function(e) {
		var eid=e.currentTarget.parentElement.dataset.cid;
		console.log('img eid:',eid,e.currentTarget);
		chrome.storage.sync.get([eid], function(result) {
			var value=1;
			if (result[eid]==1) {
				value=0;
			} 
			updateItem(eid,value);
		});
		
	});
	var itemtrash=document.getElementById('trash_'+thisid);
	itemtrash.addEventListener('click', function(e) {
		var eid=e.currentTarget.parentElement.dataset.cid;
		console.log('trash eid:',eid,e.currentTarget);
		chrome.storage.sync.get([eid], function(result) {
			var value=-1;
			if (result[eid]==-1) {
				value=0;
			} 
			updateItem(eid,value);
		});
		
	});
}

function setTrash() {
	chrome.storage.sync.get(['trash'], function(result) {
		var sidebar2=document.getElementById('gs_bdy_sb_in').getElementsByClassName('gs_bdy_sb_sec')[2];
		var li = document.createElement("li");
		li.setAttribute("id", "gst_trash");
		li.classList.add('gs_inw');
		sidebar2.appendChild(li);
		if (result.trash==1) {
			global_trash=1;
			console.log('show trashed');
			li.innerHTML+='<a href="javascript:void(0);" role="checkbox" aria-checked="true" data-s="1" class="gs_cb_gen gs_in_cb gs_sel"><span class="gs_lbl">show trash</span><span class="gs_chk"></span><span class="gs_cbx"></span></a>';
		} else {
			global_trash=0;
			console.log('hide trashed');
			li.innerHTML+='<a href="javascript:void(0);" role="checkbox" aria-checked="false" data-s="1" class="gs_cb_gen gs_in_cb"><span class="gs_lbl">show trash</span><span class="gs_chk"></span><span class="gs_cbx"></span></a>';		
		}
		toggleItems();
		document.getElementById('gst_trash').addEventListener('click', function(e) {
			var value=document.getElementById('gst_trash').getElementsByTagName('a')[0].getAttribute('aria-checked');
			console.log('trash value is set to ',value);
			if (value=='true') {
				global_trash=0;
			} else {
				global_trash=1;
			}
			toggleItems();
			chrome.storage.sync.set({trash:global_trash}, function() {
				  console.log('trash value is set to '+global_trash);
				});
		});
	});
}

chrome.storage.sync.get(['unread'], function(result) {
	var sidebar=document.getElementById('gs_bdy_sb_in').getElementsByClassName('gs_bdy_sb_sec')[2];
	
	var li = document.createElement("li");
	li.setAttribute("id", "gst_unread");
	li.classList.add('gs_inw');
	sidebar.appendChild(li);
	if (result.unread==1) {
		global_unread=1;
		console.log('only show unread');
		
		li.innerHTML+='<a href="javascript:void(0);" role="checkbox" aria-checked="true" data-s="1" class="gs_cb_gen gs_in_cb gs_sel"><span class="gs_lbl">unread only</span><span class="gs_chk"></span><span class="gs_cbx"></span></a>';
	} else {
		global_unread=0;
		console.log('show all');
		li.innerHTML+='<a href="javascript:void(0);" role="checkbox" aria-checked="false" data-s="1" class="gs_cb_gen gs_in_cb"><span class="gs_lbl">unread only</span><span class="gs_chk"></span><span class="gs_cbx"></span></a>';		
	}
	toggleItems();
	document.getElementById('gst_unread').addEventListener('click', function(e) {
		var value=document.getElementById('gst_unread').getElementsByTagName('a')[0].getAttribute('aria-checked');
		console.log('Unread value is set to ',value);
		if (value=='true') {
			global_unread=0;
		} else {
			global_unread=1;
		}
		toggleItems();
		chrome.storage.sync.set({unread:global_unread}, function() {
			  console.log('Unread value is set to '+global_unread);
			});
	});
	setTrash();
});

displayChromeToolsLink();
