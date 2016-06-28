/*
 *  es6-module-loader v0.50.0
 *  https://github.com/ModuleLoader/es6-module-loader
 *  Copyright (c) 2016 Guy Bedford, Luke Hoban, Addy Osmani; Licensed MIT
 */

!function(a){function b(a,c){if("string"!=typeof a)throw new TypeError("URL must be a string");var d=String(a).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);if(!d)throw new RangeError("Invalid URL format");var e=d[1]||"",f=d[2]||"",g=d[3]||"",h=d[4]||"",i=d[5]||"",j=d[6]||"",k=d[7]||"",l=d[8]||"",m=d[9]||"";if(void 0!==c){var n=c instanceof b?c:new b(c),o=!e&&!h&&!f;!o||k||l||(l=n.search),o&&"/"!==k[0]&&(k=k?(!n.host&&!n.username||n.pathname?"":"/")+n.pathname.slice(0,n.pathname.lastIndexOf("/")+1)+k:n.pathname);var p=[];k.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(a){"/.."===a?p.pop():p.push(a)}),k=p.join("").replace(/^\//,"/"===k[0]?"/":""),o&&(j=n.port,i=n.hostname,h=n.host,g=n.password,f=n.username),e||(e=n.protocol)}"file:"==e&&(k=k.replace(/\\/g,"/")),this.origin=h?e+(""!==e||""!==h?"//":"")+h:"",this.href=e+(e&&h||"file:"==e?"//":"")+(""!==f?f+(""!==g?":"+g:"")+"@":"")+h+k+l+m,this.protocol=e,this.username=f,this.password=g,this.host=h,this.hostname=i,this.port=j,this.pathname=k,this.search=l,this.hash=m}a.URLPolyfill=b}("undefined"!=typeof self?self:global),function(a){function b(a,b){var c;if(a instanceof Error){var c=new a.constructor(a.message,a.fileName,a.lineNumber);c.message=a.message+"\n\t"+b,c.stack=a.stack}else c=a+"\n\t"+b;return c}function c(a,c,d){try{new Function(a).call(d)}catch(e){throw b(e,"Evaluating "+c)}}function d(){this._loader={loaderObj:this,resolve:void 0,fetch:void 0,translate:void 0,instantiate:void 0,registry:{},newRegistry:new e}}function e(){this.registryMap=new a.Map}function f(a){if("object"!=typeof a)throw new TypeError("entry is not an object");return a.pipeline[0]}function g(a,b){if("object"!=typeof a)throw new TypeError("registry is not an object");var c=a._registry.registryData[b];if(!c)return null;var d=f(c),e=new Promise(function(a){a(d.result)});return{stage:d.stage,result:e,module:"ready"==d.stage?c.module:void 0,error:c.error?{value:c.error}:null}}function h(a,b,c){return a.registry[b]||(a.registry[b]={key:b,state:M,metadata:c||{},fetch:void 0,translate:void 0,instantiate:void 0,fetchResolve:void 0,translateResolve:void 0,instantiateResolve:void 0,dependencies:void 0,module:void 0,declare:void 0,error:null})}function i(a,b,c){b.fetchResolve?b.fetchResolve(c):b.fetch=Promise.resolve(c),b.fetchResolve=void 0,b.state=Math.max(b.state,N)}function j(a,b,c){b.translateResolve?b.translateResolve(c):b.translate=Promise.resolve(c),b.translateResolve=void 0,b.state=Math.max(b.state,O)}function k(a,b,c,d){if(void 0===c)var e=B(a.loaderObj,b.key,d,b.metadata);else if("function"!=typeof c)throw new TypeError("Instantiate must return an execution function.");b.instantiateResolve?b.instantiateResolve(c):b.instantiate=Promise.resolve(c),b.instantiateResolve=void 0;var f=[];if(void 0===c){b.declare=e.declare;for(var g=0;g<e.deps.length;g++)f.push({key:e.deps[g],value:void 0})}b.dependencies=f,b.module=c,b.state=Math.max(b.state,P)}function l(a,b,c,d){return Promise.resolve(void 0===c&&A(a.loaderObj)).then(function(){k(a,b,c,d)})}function m(a,c,d,e){return e=e||h(a,c,d),e.error?Promise.reject(e.error):e.state===R?Promise.reject(new Error(c+" cannot be fetched as it is already linked.")):e.fetch?e.fetch:(Promise.resolve().then(function(){return a.fetch.call(a.loaderObj,c,e.metadata)}).then(function(b){i(a,e,b)},function(a){throw b(a,"Fetching "+c)})["catch"](function(a){e.error=e.error||a}).then(function(){e.error&&e.fetchResolve&&e.fetchResolve(Promise.reject(e.error))}),e.fetch=new Promise(function(a){e.fetchResolve=a}))}function n(a,c,d,e){return e=e||h(a,c,d),e.error?Promise.reject(e.error):e.state===R?Promise.reject(new Error(c+" cannot initiate translate as it is already linked.")):e.translate?e.translate:(m(a,c,null,e).then(function(d){return Promise.resolve().then(function(){return a.translate.call(a.loaderObj,c,d,e.metadata)}).then(function(b){j(a,e,b)},function(a){throw b(a,"Translating "+c)})})["catch"](function(a){e.error=e.error||a}).then(function(){e.error&&e.translateResolve&&e.translateResolve(Promise.reject(e.error))}),e.translate=new Promise(function(a){e.translateResolve=a}))}function o(a,c,d,e){return e=e||h(a,c,d),e.error?Promise.reject(e.error):e.state===R?Promise.reject(new Error(c+" cannot instantiate as it is already linked.")):e.instantiate?e.instantiate:(n(a,c,null,e).then(function(d){return Promise.resolve().then(function(){return a.instantiate.call(a.loaderObj,c,d,e.metadata)}).then(function(b){return l(a,e,b,d)},function(a){throw b(a,"Instantiating "+c)})})["catch"](function(a){e.error=e.error||a}).then(function(){e.error&&e.instantiateResolve&&e.instantiateResolve(Promise.reject(e.error))}),e.instantiate=new Promise(function(a){e.instantiateResolve=a}))}function p(a,c,d,e){return e=e||h(a,c,d),e.state>P?e:o(a,c,null,e).then(function(){e.state=Math.max(e.state,Q);for(var d=[],f=0;f<e.dependencies.length;f++)(function(b){var e={};d.push(Promise.resolve(a.resolve.call(a.loaderObj,b.key,c,e)).then(function(c){var d=h(a,c,e);return b.value=d,p(a,c,null,d)}))})(e.dependencies[f]);return Promise.all(d)["catch"](function(a){throw a=b(a,"Loading "+c),e.error=e.error||a,a})})}function q(a,b,c,d){return d=d||h(a,b,c),d.error?Promise.reject(d.error):d.state===R?Promise.resolve(d):p(a,b,c,d).then(function(){var a=[];s(d,a);for(var b=0;b<a.length;b++){var c=a[b];c.state==Q&&"function"==typeof c.module&&(t(c),c.state=R)}return d.state==Q&&v(d),d})["catch"](function(a){throw d.error=a,a})}function r(a,c,d,e){return e=e||h(a,c,d),q(a,c,d,e).then(function(a){var d=a.module;if(d instanceof u)return d;var e=w(d,[]);if(e)throw e=b(e,"Error evaluating "+c),a.error=e,e;return d.module},function(a){throw e.error=e.error||a,a})}function s(a,b){if(b.indexOf(a)==-1){b.push(a);for(var c=0;c<a.dependencies.length;c++)s(a.dependencies[c].value,b)}}function t(a){if(a.error)throw a.error;try{a.module=a.module()}catch(b){throw a.error=b,b}}function u(a,b,c){for(var d in a)this[d]=a[d]}function v(b){var c=b.module=y(b.key),d=c.module,e=b.declare.call(a,function(a,b){c.locked=!0,d[a]=b;for(var e=0;e<c.importers.length;e++){var f=c.importers[e];if(!f.locked){var g=f.dependencies.indexOf(c);f.setters[g](d)}}return c.locked=!1,b});c.setters=e.setters,c.execute=e.execute;for(var f=0;f<b.dependencies.length;f++){var g=b.dependencies[f].value;g.module||v(g);var h=g.module;h instanceof u?c.dependencies.push(null):(c.dependencies.push(h),h.importers.push(c)),c.setters[f]&&c.setters[f](h.module)}b.state=R}function w(a,c){if(c.indexOf(a)==-1){if(a.error)return a.error;c.push(a);for(var d,e=a.dependencies,f=0;f<e.length;f++){var g=e[f];if(g&&(d=w(e[f],c)))return a.error=b(d,"Error evaluating "+g.key),a.error}return d=x(a),d&&(a.error=d),d}}function x(a){try{a.execute.call({})}catch(b){return b}}function y(a){return T[a]||(T[a]={key:a,dependencies:[],module:new u({}),importers:[],locked:!1,error:null})}function z(b){try{a.traceur?b.install("traceur",new u({"default":a.traceur})):a.babel&&b.install("babel",new u({"default":a.babel}))}catch(c){}}function A(a){var b=a.transpiler;if(b!==U||!V)return U=b,V=W=null,a["import"](b).then(function(a){V=a["default"]})}function B(a,b,c,d){return G(b,(V.Compiler?D:F)(V,b,c,d))}function C(b,d,e){var f=this;return Promise.resolve(U===f.transpiler&&W||f.resolve(U=f.transpiler)).then(function(e){if(W=e,W===b)return function(){var e=a.System,g=a.Reflect.Loader;return c("~function(require,exports,module){"+d+"}()",b,a),a.System=e,a.Reflect.Loader=g,new u({"default":a[f.transpiler]})}})}function D(a,b,c,d){var e=this.traceurOptions||{};e.modules="instantiate",e.script=!1,e.sourceMaps="inline",e.inputSourceMap=d.sourceMap,e.filename=b,e.inputSourceMap=d.sourceMap,e.moduleName=!1;var f=new a.Compiler(e);return E(c,f,e.filename)}function E(a,b,c){try{return b.compile(a,c)}catch(d){throw d[0]||d}}function F(a,b,c,d){var e=this.babelOptions||{};return e.modules="system",e.sourceMap="inline",e.filename=b,e.code=!0,e.ast=!1,e.blacklist||(e.blacklist=["react"]),a.transform(c,e).code}function G(b,d){var e,f=a.System=a.System||X,g=f.register;return f.register=function(a,b){e={deps:a,declare:b}},c('var __moduleURL = "'+b+'";'+d+"\n//# sourceURL="+b+"!eval",b,{}),f.register=g,e}function H(){}function I(){document.removeEventListener("DOMContentLoaded",I,!1),window.removeEventListener("load",I,!1),J()}function J(){for(var a=document.getElementsByTagName("script"),b=0,c=0;c<a.length;c++){var d=a[c];if("module"==d.type){var e=d.src;e?X.load(e,"ready"):(X.provide("anon"+ ++b,"fetch",d.innerHTML.substr(1)),X.load("anon"+b,"ready"))}}}var K="object"==typeof exports&&"function"==typeof require,L="undefined"!=typeof process&&!!process.platform.match(/^win/),M=0,N=1,O=2,P=3,Q=4,R=5;d.prototype["import"]=function(a,c){var d=this._loader,e={};return Promise.resolve().then(function(){return d.resolve.call(d.loaderObj,a,c,e)})["catch"](function(d){throw b(d,"Resolving "+a+(c?", "+c:""))}).then(function(a){return r(d,a,e)})},d.prototype.resolve=function(a,b,c){var d=this._loader;return d.resolve.call(d.loaderObj,a,b,c||{})},d.prototype.load=function(a,b,c){var d=this._loader;if("fetch"==b)return m(d,a,c);if("translate"==b)return n(d,a,c);if("instantiate"==b)return p(d,a,c).then(function(a){if(!(a.module instanceof u))return a.module});if("link"==b)return q(d,a,c).then(function(){});if(b&&"ready"!=b)throw new TypeError("Invalid stage "+b);return r(d,a,c).then(function(a){return a.module})},Object.defineProperty(d.prototype,"registry",{get:function(){if("object"!=typeof this)throw new TypeError("this must be a Loader");if(!(this._loader.newRegistry instanceof e))throw new TypeError("invalid registry -- must be created during Loader constructor");return this._loader.newRegistry}}),d.prototype.provide=function(a,b,c,d){var e=this._loader,f=h(e,a,d);if("fetch"==b){if(f.state>M)throw new TypeError(a+" has already been fetched.");i(e,f,c)}else if("translate"==b){if(f.state>N)throw new TypeError(a+" has already been translated.");j(e,f,c)}else{if("instantiate"!=b)throw new TypeError("Invalid stage "+b);if(f.state>O)throw new TypeError(a+" has already been instantiated.");i(e,f,void 0),j(e,f,void 0),f.translate.then(function(a){l(e,f,c,a)})}};var S=["resolve","fetch","translate","instantiate"];d.prototype.hook=function(a,b){var c=this._loader;if(S.indexOf(a)==-1)throw new TypeError(a+" is not a valid hook.");return b?void(c[a]=b):c[a]},e.prototype.constructor=e,e.prototype.entries=function(){if("object"!=typeof this)throw new TypeError("cannot get entries of a non-registry");return this.registryMap.entries()},e.prototype.keys=function(){if("object"!=typeof this)throw new TypeError("invalid registry");return this.registryMap.keys()},e.prototype.values=function(){if("object"!=typeof this)throw new TypeError("invalid registry");return this.registryMap.values()},e.prototype.get=function(a){if("object"!=typeof this)throw new TypeError("invalid registry");return this.registryMap.get(a)},e.prototype.set=function(a,b){if("object"!=typeof this)throw new TypeError("invalid registry");return this.registryMap.set(a,b),this},e.prototype.has=function(a){if("object"!=typeof this)throw new TypeError("invalid registry");return this.registryMap.has(a)},e.prototype["delete"]=function(a){if("object"!=typeof this)throw new TypeError("invalid registry");return this.registryMap["delete"](a)},e.prototype.lookup=function(a){return g(this,a)},e.prototype.install=function(a,b){if("object"!=typeof this)throw new TypeError("registry must be an object");if(this._registry.registryData[a])throw new TypeError("Module with key "+a+" already exists");var c=new Promise(function(a){a(b)});this._registry.registryData[a]={key:a,pipeline:[{stage:"ready",result:c}],metadata:void 0,dependencies:void 0,module:b}},e.prototype.uninstall=function(a){if("object"!=typeof this)throw new TypeError("Registry must be an object");var b=this._registry.registryData[a];if(!b)throw new TypeError("Module "+a+" does not exist");var c=f(b);if("link"!==c.stage&&"ready"!==c.stage)throw new TypeError("Module "+a+" is still loading");delete this._registry.registryData[a]},e.prototype.cancel=function(a){if("object"!=typeof this)throw new TypeError("Registry must be an object");var b=this._registry.registryData[a];if(!b)throw new TypeError("Module "+a+" does not exist");var c=f(b);if("link"===c.stage||"ready"===c.stage)throw new TypeError("Module "+a+" is already done linking");delete this._registry.registryData[a]};var T={};d.prototype.transpiler="traceur";var U,V,W,X,Y;if("undefined"!=typeof XMLHttpRequest)Y=function(a,b,c){function d(){b(f.responseText)}function e(){c(new Error("GET "+a+" "+f.status+" ("+f.statusText+")"))}var f=new XMLHttpRequest,g=!0,h=!1;if(!("withCredentials"in f)){var i=/^(\w+:)?\/\/([^\/]+)/.exec(a);i&&(g=i[2]===window.location.host,i[1]&&(g&=i[1]===window.location.protocol))}g||"undefined"==typeof XDomainRequest||(f=new XDomainRequest,f.onload=d,f.onerror=e,f.ontimeout=e,f.onprogress=function(){},f.timeout=0,h=!0),f.onreadystatechange=function(){4===f.readyState&&(200===f.status||0==f.status&&f.responseText?d():e())},f.open("GET",a,!0),h&&setTimeout(function(){f.send()},0),f.send(null)};else{if(!K)throw new TypeError("No environment fetch API available.");var Z;Y=function(a,b,c){if("file:///"!=a.substr(0,8))throw"Only file URLs of the form file: allowed running in Node.";Z=Z||require("fs"),a=L?a.replace(/\//g,"\\").substr(8):a.substr(7),Z.readFile(a,function(a,d){a?c(a):b(d+"")})}}var $=function(){function a(a){if(b[a])return b[a];var c,d=0;for(var e in b){var f=e.split("*");if(f.length>2)throw new TypeError("Sites entry "+e+" contains multiple wildcards.");1!=f.length&&e.split("/").length>=d&&e.substr(0,f[0].length)===a.substr(0,f[0].length)&&e.substr(e.length-f[1].length)===f[1]&&(c=b[e].replace("*",a.substr(f[0].length,a.length-e.length+1)),d=e.split("/").length)}return c}d.call(this,arguments);var b={};this.site=function(a){for(var c in a)b[c]=a[c]},this.site.get=function(a){return b[a]},this.site.set=function(a,c){b[a]=c},this.site.has=function(a){return!!b[a]},this.site["delete"]=function(a){delete b[a]},this.hook("resolve",function(b,c,d){var e=a(b);return!e&&c||(c=_),new URL(e||b,c).href}),this.hook("fetch",function(a,b){return new Promise(function(b,c){Y(a,b,c)})}),this.hook("translate",function(a,b,c){return b}),this.hook("instantiate",C),this.transpiler&&z(this)};H.prototype=d.prototype,$.prototype=new H;var _;if("undefined"!=typeof document&&document.baseURI?_=document.baseURI:"undefined"!=typeof document&&document.getElementsByTagName?(_=document.getElementsByTagName("base")[0],_=_&&_.href):"undefined"!=typeof location&&location.href&&(_=location.href),_?(_=_.split("#")[0].split("?")[0],_=_.substr(0,_.lastIndexOf("/")+1)):"undefined"!=typeof process&&process.cwd&&(_="file://"+(L?"/":"")+process.cwd()+"/",L&&(_=_.replace(/\\/g,"/"))),_=new URL(_),"undefined"!=typeof document&&document.getElementsByTagName){var aa=document.getElementsByTagName("script");aa=aa[aa.length-1],"complete"===document.readyState?setTimeout(J):document.addEventListener&&(document.addEventListener("DOMContentLoaded",I,!1),window.addEventListener("load",I,!1))}var ba=new $;ba.constructor=$,K&&(exports.Loader=d,exports.Module=u,exports.SystemLoader=$),a.LoaderPolyfill=d,a.ModulePolyfill=u,a.Reflect=a.Reflect||{},a.Reflect.Module=a.Reflect.Module||u,a.Reflect.Loader=a.Reflect.Loader||d,a.System=a.System||{},a.System.global=a.System.global||a,a.System.loader=a.System.loader||ba}("undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope?self:global);
//# sourceMappingURL=es6-module-loader-declarative.js.map