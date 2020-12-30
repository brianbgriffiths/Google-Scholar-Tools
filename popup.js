// Copyright (c) 2021 Brian B. Griffiths. All rights reserved.
// Use of this source code is governed by a MIT license that can be
// found in the LICENSE file included in this extension


function getSavedSetting(setting, callback) {
  chrome.storage.sync.get([setting], (items) => {
    callback(chrome.runtime.lastError ? null : items[setting]);
  });
}

function saveSetting(setting,value) {
  var items = {};
  items[setting] = value;
  console.log('save',items);
  chrome.storage.sync.set(items);
}

document.addEventListener('DOMContentLoaded', () => {
    var dropdown1 = document.getElementById('setting_autoincrementblank');
    getSavedSetting('autoincrementblank', (savedSetting) => {
      if (savedSetting) {
        dropdown1.value = savedSetting;
      }
    });

    dropdown1.addEventListener('change', () => {
      saveSetting('autoincrementblank',dropdown1.value);
    });
  
});
