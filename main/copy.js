
function CopyItem() {   
    
    browser.tabs.executeScript({
        file: 'https://code.jquery.com/jquery-3.2.1.min.js',
        // Guaranteed to execute only after the previous script returns
    }, function() {
        // Guaranteed to execute only after the previous script returns
        browser.tabs.executeScript({
            file: '/content_scripts/common.js'
        },function(){
          browser.tabs.executeScript({
              file: '/content_scripts/main.js'
          });        
        });        
    });
}

function pasteItem() {  
    browser.tabs.executeScript({
        file: '/content_scripts/paste.js',
        // Guaranteed to execute only after the previous script returns
    });      
}

document.querySelector("#Copy").addEventListener("click", CopyItem);
document.querySelector("#Paste").addEventListener("click", pasteItem);
