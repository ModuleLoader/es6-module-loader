/*
 *  es6-module-loader v1.0.0-alpha
 *  https://github.com/ModuleLoader/es6-module-loader
 *  Copyright (c) 2015 Guy Bedford, Luke Hoban, Addy Osmani; Licensed MIT
 */

!function(a){function b(){this._loader={loaderObj:this,resolve:void 0,fetch:void 0,translate:void 0,instantiate:void 0,registry:{}}}function c(a,b,c){return a.registry[b]||(a.registry[b]={key:b,state:G,metadata:c||{},fetch:void 0,translate:void 0,instantiate:void 0,fetchResolve:void 0,translateResolve:void 0,instantiateResolve:void 0,dependencies:void 0,module:void 0,declare:void 0,error:null})}function d(a,b,c){b.fetchResolve?b.fetchResolve(c):b.fetch=D.resolve(c),b.fetchResolve=void 0,b.state=Math.max(b.state,H)}function e(a,b,c){b.translateResolve?b.translateResolve(c):b.translate=D.resolve(c),b.translateResolve=void 0,b.state=Math.max(b.state,I)}function f(a,b,c,d){if(void 0===c)var e=a.loaderObj.transpile(b.key,d,b.metadata);else if("function"!=typeof c)throw new TypeError("Instantiate must return an execution function.");b.instantiateResolve?b.instantiateResolve(c):b.instantiate=D.resolve(c),b.instantiateResolve=void 0;var f=[];if(void 0===c){b.declare=e.declare;for(var g=0;g<e.deps.length;g++)f.push({key:e.deps[g],value:void 0})}b.dependencies=f,b.module=c,b.state=Math.max(b.state,J)}function g(a,b,e,f){return f=f||c(a,b,e),f.error?D.reject(f.error):f.state===L?D.reject(new Error(b+" cannot be fetched as it is already linked.")):f.fetch?f.fetch:(D.resolve().then(function(){return a.fetch(b,f.metadata)}).then(function(b){d(a,f,b)},function(a){throw r(a,"Fetching "+b)})["catch"](function(a){f.error=f.error||a}).then(function(){f.error&&f.fetchResolve&&f.fetchResolve(D.reject(f.error))}),f.fetch=new D(function(a){f.fetchResolve=a}))}function h(a,b,d,f){return f=f||c(a,b,d),f.error?D.reject(f.error):f.state===L?D.reject(new Error(b+" cannot initiate translate as it is already linked.")):f.translate?f.translate:(g(a,b,null,f).then(function(c){return D.resolve().then(function(){return a.translate(b,c,f.metadata)}).then(function(b){e(a,f,b)},function(a){throw r(a,"Translating "+b)})})["catch"](function(a){f.error=f.error||a}).then(function(){f.error&&f.translateResolve&&f.translateResolve(D.reject(f.error))}),f.translate=new D(function(a){f.translateResolve=a}))}function i(a,b,d,e){return e=e||c(a,b,d),e.error?D.reject(e.error):e.state===L?D.reject(new Error(b+" cannot instantiate as it is already linked.")):e.instantiate?e.instantiate:(h(a,b,null,e).then(function(c){return D.resolve().then(function(){return a.instantiate(b,c,e.metadata)}).then(function(b){f(a,e,b,c)},function(a){throw r(a,"Instantiating "+b)})})["catch"](function(a){e.error=e.error||a}).then(function(){e.error&&e.instantiateResolve&&e.instantiateResolve(D.reject(e.error))}),e.instantiate=new D(function(a){e.instantiateResolve=a}))}function j(a,b,d,e){return e=e||c(a,b,d),e.state>J?e:i(a,b,null,e).then(function(){e.state=Math.max(e.state,K);for(var d=[],f=0;f<e.dependencies.length;f++)(function(e){var f={};d.push(D.resolve(a.resolve(e.key,b,f)).then(function(b){var d=c(a,b,f);return e.value=d,j(a,b,null,d)}))})(e.dependencies[f]);return D.all(d)["catch"](function(a){throw a=r(a,"Loading "+b),e.error=e.error||a,a})})}function k(a,b,d,e){return e=e||c(a,b,d),e.error?D.reject(e.error):e.state===L?D.resolve(e):j(a,b,d,e).then(function(){var a=[];n(e,a);for(var b=0;b<a.length;b++){var c=a[b];c.state==K&&"function"==typeof c.module&&(m(c),c.state=L)}return e.state==K&&o(e),e})["catch"](function(a){throw e.error=a,a})}function l(a,b,d,e){return e=e||c(a,b,d),k(a,b,d,e).then(function(a){var c=a.module;if(c instanceof t)return c;var d=p(c,[]);if(d)throw d=r(d,"Error evaluating "+b),a.error=d,d;return c.module},function(a){throw e.error=e.error||a,a})}function m(a){if(a.error)throw a.error;try{a.module=a.module()}catch(b){throw a.error=b,b}}function n(a,b){if(-1==E.call(b,a)){b.push(a);for(var c=0;c<a.dependencies.length;c++)n(a.dependencies[c].value,b)}}function o(b){var c=b.module=s(b.key),d=c.module,e=b.declare.call(a,function(a,b){c.locked=!0,d[a]=b;for(var e=0;e<c.importers.length;e++){var f=c.importers[e];if(!f.locked){var g=E.call(f.dependencies,c);f.setters[g](d)}}return c.locked=!1,b});c.setters=e.setters,c.execute=e.execute;for(var f=0;f<b.dependencies.length;f++){var g=b.dependencies[f].value;g.module||o(g);var h=g.module;h instanceof t?c.dependencies.push(null):(c.dependencies.push(h),h.importers.push(c)),c.setters[f]&&c.setters[f](h.module)}b.state=L}function p(a,b){if(-1==E.call(b,a)){if(a.error)return a.error;b.push(a);for(var c,d=a.dependencies,e=0;e<d.length;e++){var f=d[e];if(f&&(c=p(d[e],b)))return a.error=r(c,"Error evaluating "+f.key),a.error}return c=q(a),c&&(a.error=c),c}}function q(a){try{a.execute.call({})}catch(b){return b}}function r(a,b){var c;if(a instanceof Error){var c=new a.constructor(a.message,a.fileName,a.lineNumber);c.message=a.message+"\n  "+b,c.stack=a.stack}else c=a+"\n  "+b;return c}function s(a){return P[a]||(P[a]={key:a,dependencies:[],module:new t({}),importers:[],locked:!1,error:null})}function t(a){for(var b in a)this[b]=a[b]}function u(a,b,c){var d=this.traceurOptions||{};d.modules="instantiate",d.script=!1,d.sourceMaps="inline",d.inputSourceMap=c.sourceMap,d.filename=a;var e=new O.Compiler(d),b=v(b,e,d.filename);return b+="!eval"}function v(a,b,c){try{return b.compile(a,c)}catch(d){throw d[0]||d}}function w(a,b){var c=this.babelOptions||{};c.modules="system",c.sourceMap="inline",c.filename=a,c.code=!0,c.ast=!1,c.blacklist=c.blacklist||[],c.blacklist.push("react");var b=O.transform(b,c).code;return b+"\n//# sourceURL="+a+"!eval"}function x(b,c){var d,e=a.System=a.System||V,f=e.register;return e.register=function(a,b){d={deps:a,declare:b}},y(c),e.register=f,d}function y(a){try{eval.call(null,a)}catch(b){throw("SyntaxError"==b.name||"TypeError"==b.name)&&(b.message="Evaluating "+key+"\n	"+b.message),b}}function z(a,b){if("string"!=typeof a)throw new TypeError("URL must be a string");var c=String(a).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);if(!c)throw new RangeError;var d=c[1]||"",e=c[2]||"",f=c[3]||"",g=c[4]||"",h=c[5]||"",i=c[6]||"",j=c[7]||"",k=c[8]||"",l=c[9]||"";if(void 0!==b){var m=b instanceof z?b:new z(b),n=""===d&&""===g&&""===e;n&&""===j&&""===k&&(k=m.search),n&&"/"!==j.charAt(0)&&(j=""!==j?(""===m.host&&""===m.username||""!==m.pathname?"":"/")+m.pathname.slice(0,m.pathname.lastIndexOf("/")+1)+j:m.pathname);var o=[];j.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(a){"/.."===a?o.pop():o.push(a)}),j=o.join("").replace(/^\//,"/"===j.charAt(0)?"/":""),n&&(i=m.port,h=m.hostname,g=m.host,f=m.password,e=m.username),""===d&&(d=m.protocol)}this.origin=d+(""!==d||""!==g?"//":"")+g,this.href=d+(""!==d||""!==g?"//":"")+(""!==e?e+(""!==f?":"+f:"")+"@":"")+g+j+k+l,this.protocol=d,this.username=e,this.password=f,this.host=g,this.hostname=h,this.port=i,this.pathname=j,this.search=k,this.hash=l}function A(){}function B(){document.removeEventListener("DOMContentLoaded",B,!1),window.removeEventListener("load",B,!1),C()}function C(){for(var a=document.getElementsByTagName("script"),b=0,c=0;c<a.length;c++){var d=a[c];if("module"==d.type){var e=d.src;e?V.load(e,"ready"):(V.provide("anon"+ ++b,"fetch",d.innerHTML.substr(1)),V.load("anon"+b,"ready"))}}}var D=a.Promise||require("when/es6-shim/Promise"),E=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},F="object"==typeof exports&&"function"==typeof require,G=0,H=1,I=2,J=3,K=4,L=5;b.prototype["import"]=function(a,b){var c=this._loader,d={};return D.resolve().then(function(){return c.resolve(a,b,d)})["catch"](function(c){throw r(c,"Resolving "+a+(b?", "+b:""))}).then(function(a){return l(c,a,d)})},b.prototype.resolve=function(a,b,c){var d=this._loader;return d.resolve(a,b,c||{})},b.prototype.load=function(a,b,c){var d=this._loader;if("fetch"==b)return g(d,a,c);if("translate"==b)return h(d,a,c);if("instantiate"==b)return j(d,a,c).then(function(a){return a.module instanceof t?void 0:a.module});if("link"==b)return k(d,a,c).then(function(){});if(b&&"ready"!=b)throw new TypeError("Invalid stage "+b);return l(d,a,c).then(function(a){return a.module})},b.prototype.provide=function(a,b,g,h){var i=this._loader,j=c(i,a,h);if("fetch"==b){if(j.state>G)throw new TypeError(a+" has already been fetched.");d(i,j,g)}else if("translate"==b){if(j.state>H)throw new TypeError(a+" has already been translated.");e(i,j,g)}else{if("instantiate"!=b)throw new TypeError("Invalid stage "+b);if(j.state>I)throw new TypeError(a+" has already been instantiated.");d(i,j,void 0),e(i,j,void 0),j.translate.then(function(a){f(i,j,g,a)})}},b.prototype.error=function(){},b.prototype.lookup=function(a){var b=this._loader,c=b.registry[a];if(!c)return null;var d;return c.state==G?d="fetch":c.state==H?d="translate":c.state==I?d="instantiate":c.state==K?d="link":c.state==L&&(d="ready"),{state:d,metadata:c.metadata,fetch:c.fetch&&D.resolve(c.fetch),translate:c.translate&&D.resolve(c.translate),instantiate:c.instantiate&&D.resolve(c.instantiate),module:c.state==L&&(c.module instanceof t?c.module:c.module.module),error:c.error}},b.prototype.install=function(a,b){var c=this._loader;if(c.registry[a])throw new TypeError(a+" is already defined in the Loader registry.");c.registry[a]={key:a,state:L,metadata:metadata,fetch:void 0,translate:void 0,instantiate:void 0,dependencies:void 0,module:b,declare:void 0,error:null}},b.prototype.uninstall=function(a){var b=this._loader,c=b.registry[a];if(!c)throw new TypeError(a+" is not defined in the Loader registry.");if(c.state<K)throw new TypeError(a+" is still loading.");delete b.registry[a]},b.prototype.cancel=function(a){var b=this._loader,c=b.registry[a];if(!c)throw new TypeError(a+" does not exist.");if(c.state>=K)throw new TypeError(a+" is already past linking.");delete b.registry[a]};var M=["resolve","fetch","translate","instantiate"];b.prototype.hook=function(a,b){var c=this._loader;if(-1==E.call(M,a))throw new TypeError(a+" is not a valid hook.");return b?void(c[a]=b):c[a]};var N,O,P={};b.prototype.transpiler="traceur",b.prototype.transpile=function(b,c,d){if(!N)if("babel"==this.transpiler){if(O=F?require("babel-core"):a.babel,!O)throw new TypeError("Unable to find the Babel transpiler.");N=w}else{if(O=F?require("traceur"):a.traceur,!O)throw new TypeError("Unable to find the Traceur transpiler.");N=u}return x(b,N.call(this,b,c,d))};var Q,R="undefined"!=typeof process&&!!process.platform.match(/^win/);if("undefined"!=typeof XMLHttpRequest)Q=function(a,b,c){function d(){b(f.responseText)}function e(){c(new Error("GET "+a+" "+f.status+" ("+f.statusText+")"))}var f=new XMLHttpRequest,g=!0,h=!1;if(!("withCredentials"in f)){var i=/^(\w+:)?\/\/([^\/]+)/.exec(a);i&&(g=i[2]===window.location.host,i[1]&&(g&=i[1]===window.location.protocol))}g||"undefined"==typeof XDomainRequest||(f=new XDomainRequest,f.onload=d,f.onerror=e,f.ontimeout=e,f.onprogress=function(){},f.timeout=0,h=!0),f.onreadystatechange=function(){4===f.readyState&&(200===f.status||0==f.status&&f.responseText?d():e())},f.open("GET",a,!0),h&&setTimeout(function(){f.send()},0),f.send(null)};else{if(!F)throw new TypeError("No environment fetch API available.");var S;Q=function(a,b,c){if("file:///"!=a.substr(0,8))throw"Only file URLs of the form file: allowed running in Node.";S=S||require("fs"),a=R?a.replace(/\//g,"\\").substr(8):a.substr(7),S.readFile(a,function(a,d){a?c(a):b(d+"")})}}var T=function(){function a(a){for(var b in c){var d="*"===b.charAt(b.length-1);if(d){if(a.substr(0,b.length-1)===b.substr(0,b.length-1))return c[b].replace("*",a.substr(b.length-1,a.length-b.length+1))}else if(a===b)return c[b]}}b.call(this,arguments);var c={};this.site=function(a){for(var b in a)c[b]=a[b]},this.site.get=function(a){return c[a]},this.site.set=function(a,b){c[a]=b},this.site.has=function(a){return!!c[a]},this.site["delete"]=function(a){delete c[a]},this.hook("resolve",function(b,c){var d=a(b);return(d||!c)&&(c=U),new z(d||b,c).href}),this.hook("fetch",function(a){return new D(function(b,c){Q(a,b,c)})}),this.hook("translate",function(a,b){return b}),this.hook("instantiate",function(){})};A.prototype=b.prototype,T.prototype=new A;var U;"undefined"!=typeof document&&document.baseURI?U=document.baseURI:"undefined"!=typeof location&&location.href?U=location.href:"undefined"!=typeof document&&document.getElementsByTagName&&(U=document.getElementsByTagName("base")[0],U=U&&U.href),U?(U=U.split("#")[0].split("?")[0],U=U.substr(0,U.lastIndexOf("/")+1)):"undefined"!=typeof process&&process.cwd&&(U="file://"+(R?"/":"")+process.cwd()+"/",R&&(U=U.replace(/\\/g,"/"))),U=new z(U);var V=new T;if(V.constructor=T,"undefined"!=typeof document&&document.getElementsByTagName){var W=document.getElementsByTagName("script");W=W[W.length-1],"complete"===document.readyState?setTimeout(C):document.addEventListener&&(document.addEventListener("DOMContentLoaded",B,!1),window.addEventListener("load",B,!1)),W&&W.getAttribute("data-init")&&window[W.getAttribute("data-init")]()}var X;!function(c){X=c.Reflect||{},X.Loader=X.Loader||b,X.Module=X.Module||t,X.global=X.global||a,c.LoaderPolyfill=b,c.ModulePolyfill=t,c.Reflect=X,c.System=V}(F?exports:a)}("undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope?self:global);
//# sourceMappingURL=es6-module-loader-sans-promises.js.map