import './weapp-adapter'
import './symbol'
window.resHost = "http://192.168.1.117:8000";

// import Main from './js/main'

// var TOTAL_MEMORY = 134217728, STATIC_BASE = 1024, DYNAMICTOP_PTR = 739664;
// var wasmMaximumMemory = TOTAL_MEMORY;

// var wasmMemory = new WebAssembly.Memory({"initial": TOTAL_MEMORY >> 16, "maximum": wasmMaximumMemory >> 16});

// console.log("wasmMemory" + wasmMemory);

// new Main()

// Fix window.performance.now
((window) => {
    if (typeof window.performance === 'object' && typeof window.performance.now === 'function') {
        const __window_performance_now = window.performance.now;
        window.performance.now = () => {
            return __window_performance_now() * 1000;
        }
    }
})(window || {})

function b(url) { // Downloads a binary file and outputs it in the specified callback
    return new Promise((ok, err) => {
        var x = new XMLHttpRequest();
        x.open('GET', url, true);
        x.responseType = 'arraybuffer';
        x.onload = () => {
            ok(x.response);
        }
        x.send(null);
    });
}

window.Module = {};

function revokeURL(url) {
    // In multithreaded builds, the runtime .js script we are loading will need to be kept alive
    // so that pthread workers can load that same script for each created Worker.
    URL.revokeObjectURL(url)
}

// Depending on the build flags that one uses, different files need to be downloaded
// to load the compiled page. What follows is a matrix of all different combinations that
// affect how code is downloaded. When developing your own shell file, you can copy the whole
// matrix, or just focus on a single/specific set of download schemes to use.


function b(url) { // Downloads a binary file and outputs it in the specified callback
    console.log("Get " + url);
    return new Promise((ok, err) => {
        var x = new XMLHttpRequest();
        x.open('GET', url, true);
        x.responseType = 'arraybuffer';
        x.onload = () => {
            ok(x.response);
        };
        x.send(null);

        // wx.downloadFile({
        //     url: url, //仅为示例，并非真实的资源
        //     success: function (res) {
        //         console.log(res)
        //         if (res.statusCode === 200) {
        //             ok(res.response);
        //         }
        //     },
        //     fail:function(e){
        //         console.log(e);
        //     }
        // });
    });
}


b(window.resHost+"/TinyRacing.mem").then((r) => {
    // Module.wasm = r;
    Module.mem = r;
    require('./TinyRacing.asm.js');
    require('./TinyRacing.js');
});

// Promise.all([b('TinyRacing.js'), b('TinyRacing.wasm')]).then((r) => {
//     Module.wasm = r[1];
//
// });


// No modularize, no streaming wasm compilation, no separate .mem init file
// Promise.all([b('TinyRacing.js'), b('TinyRacing.wasm')]).then((r) => {
//   Module.wasm = r[1];
//   var url = URL.createObjectURL(new Blob([r[0]], { type: 'application/javascript' }));
//   s(url).then(() => { revokeURL(url) });
// });
// var SendMessage = function () {

// }
// window.Module = {};
//import './js/TinyRacing.js'
// import './js/TinyRacing.wasm'