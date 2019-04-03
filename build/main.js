!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1),e.exports=n(2)},function(e,t){e.exports=require("@babel/polyfill")},function(e,t,n){"use strict";var r=c(n(3)),o=n(4),a=c(n(5)),i=c(n(6)),u=c(n(7)),l=c(n(8));(function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}t.default=e})(n(9)),c(n(10));function c(e){return e&&e.__esModule?e:{default:e}}function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){d(e,t,n[t])})}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}console.log;var b=function(e){function t(){var e,n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,(e=!(r=v(t).call(this))||"object"!==f(r)&&"function"!=typeof r?y(n):r).state={error:"",errorInfo:"",phase:"",env:{spaceId:"",apiToken:"",outputLoc:""},config:{quantity:"",kits:[]}},e.handleIntro=e.handleIntro.bind(y(e)),e.handleEnvOutput=e.handleEnvOutput.bind(y(e)),e.handleEnvApiToken=e.handleEnvApiToken.bind(y(e)),e.handleEnvSpaceId=e.handleEnvSpaceId.bind(y(e)),e.handleConfigKitQuantity=e.handleConfigKitQuantity.bind(y(e)),e.handleConfigKitName=e.handleConfigKitName.bind(y(e)),e.renderEnv=e.renderEnv.bind(y(e)),e.renderConfig=e.renderConfig.bind(y(e)),e.renderIntro=e.renderIntro.bind(y(e)),e.cIntro=e.cIntro.bind(y(e)),e.cEmptyBoilerplate=e.cEmptyBoilerplate.bind(y(e)),e.cError=e.cError.bind(y(e)),e}var n,c,b;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,r.default.Component),n=t,(c=[{key:"updatePhase",value:function(e){this.setState({phase:e})}},{key:"handleIntro",value:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:selection).value;this.setState({phase:e})}},{key:"handleEnvOutput",value:function(e){this.setNestedStateEnv({outputLoc:e})}},{key:"handleEnvApiToken",value:function(e){this.setNestedStateEnv({apiToken:e})}},{key:"handleEnvSpaceId",value:function(e){this.setNestedStateEnv({spaceId:e})}},{key:"handleConfigKitQuantity",value:function(e){this.setNestedStateConfig({quantity:e})}},{key:"handleConfigKitName",value:function(e){this.setState(function(t){var n=t.config,r=null===n.kits?[]:p(n.kits);return{config:s({},n,{kits:[].concat(p(r),[{name:e}])})}})}},{key:"setNestedStateEnv",value:function(e){var t=Object.keys(e);this.setState(function(n){return{env:s({},n.env,d({},t,e[t]))}})}},{key:"setNestedStateConfig",value:function(e){var t=Object.keys(e);this.setState(function(n){return{config:s({},n.config,d({},t,e[t]))}})}},{key:"componentDidCatch",value:function(e,t){this.setState({error:e,errorInfo:t})}},{key:"cIntro",value:function(){return r.default.createElement(o.Box,null,r.default.createElement(o.Text,null,"What would you like to do?"),r.default.createElement(i.default,{items:[{label:"Generate empty boilerplate",value:"emptyBoilerplate"},{label:"Generate boilerplate interactively",value:"interactiveBoilerplate"}],onSelect:this.handleIntro}))}},{key:"cConfigKitQuantity",value:function(){var e=this;return r.default.createElement(o.Box,null,r.default.createElement(o.Text,null,"How many kits would you like to download assets from?")," ",r.default.createElement(a.default,{value:this.state.config.quantity,onChange:this.handleConfigKitQuantity,onSubmit:function(){e.updatePhase("configKitName")},placeholder:"#"}))}},{key:"cError",value:function(e,t){return r.default.createElement(o.Box,null,r.default.createElement(o.Color,{blue:!0},e,"(): "),r.default.createElement(o.Color,{red:!0},"Error: ",t))}},{key:"cEmptyBoilerplate",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"./",n=".env",a="SPACE_ID=''\nAPI_TOKEN=''",i=".laf.json",l={kits:[{name:"",sections:[{name:""},{name:"",headers:["",""]}]},{name:"",sections:[{name:"",headers:["",""]},{name:""}]}]};return u.default.outputFile("".concat(t,"/").concat(i),a,function(t){if(t)return e.cError("cEmptyBoilerplate",t)}),u.default.outputFile("".concat(t,"/").concat(i),JSON.stringify(l,null,2),function(t){if(t)return e.cError("cEmptyBoilerplate",t)}),r.default.createElement(o.Box,null,r.default.createElement(o.Text,null,r.default.createElement(o.Color,{blue:!0},i)," and ",r.default.createElement(o.Color,{blue:!0},n)," ","have been created"))}},{key:"cEnvSpaceId",value:function(){var e=this;return r.default.createElement(o.Box,null,r.default.createElement(o.Text,null,"What's your Lingo Space ID?")," ",r.default.createElement(a.default,{value:this.state.env.spaceId,onChange:this.handleEnvSpaceId,onSubmit:function(){return e.updatePhase("envApiToken")},placeholder:"000000"}))}},{key:"cEnvApiToken",value:function(){var e=this;return r.default.createElement(o.Box,null,r.default.createElement(o.Text,null,"What's your Lingo API Token?")," ",r.default.createElement(a.default,{value:this.state.env.apiToken,onChange:this.handleEnvApiToken,onSubmit:function(){return e.updatePhase("envOutputMethod")},placeholder:"token"}))}},{key:"cEnvOutputMethod",value:function(){var e=this;return r.default.createElement(o.Box,null,r.default.createElement(o.Text,null,"Where would you like to output this data?\n"),r.default.createElement(i.default,{items:[{label:"Write to ./.env",value:"dotEnv"},{label:"Write to clipboard",value:"clipboard"}],onSelect:function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:outputLoc).value;e.handleEnvOutput(t),e.updatePhase("envDone")}}))}},{key:"cConfigKitName",value:function(){this.state.config.index;return r.default.createElement(o.Box,null,r.default.createElement(o.Text,null,"What's the name of your kit's config?")," ",r.default.createElement(a.default,{value:this.state.config.tempKitName,onChange:this.handleConfigKitName}))}},{key:"renderIntro",value:function(){return""==this.state.phase?this.cIntro():"emptyBoilerplate"==this.state.phase?this.cEmptyBoilerplate():"interactiveBoilerplate"==this.state.phase?this.cEnvSpaceId():void 0}},{key:"renderEnv",value:function(){var e=this.state,t=e.phase,n=e.env.outputLoc;switch(t){case"envSpaceId":return this.cEnvSpaceId();case"envApiToken":return this.cEnvApiToken();case"envOutputMethod":return this.cEnvOutputMethod();case"envDone":var a="SPACE_ID='".concat(this.state.env.spaceId,"'\nAPI_TOKEN='").concat(this.state.env.apiToken,"'");return"dotEnv"==n?u.default.outputFile(".env",a,function(e){if(e)throw e}):"clipboard"==n&&l.default.writeSync(a),this.cConfigKitQuantity();default:return r.default.createElement(o.Box,null,r.default.createElement(o.Text,null,"Nothing found in ",r.default.createElement(o.Color,{blue:!0},"renderEnv()")))}}},{key:"renderConfig",value:function(){return"configKitQuantity"==this.state.phase?this.cConfigKitQuantity():"configKitName"==this.state.phase?this.cConfigKitName():void 0}},{key:"render",value:function(){var e=this.state.phase;return e.includes("Boilerplate")||""==e?this.renderIntro():e.includes("env")?this.renderEnv():e.includes("config")?this.renderConfig():"end"==e?r.default.createElement(o.Box,null,r.default.createElement(o.Text,null,"el fin")):void 0}}])&&h(n.prototype,c),b&&h(n,b),t}();(0,o.render)(r.default.createElement(b,null))},function(e,t){e.exports=require("react")},function(e,t){e.exports=require("ink")},function(e,t){e.exports=require("ink-text-input")},function(e,t){e.exports=require("ink-select-input")},function(e,t){e.exports=require("fs-extra")},function(e,t){e.exports=require("clipboardy")},function(e,t){e.exports=require("lingo-asset-fetcher-lib")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={testMe:{targetOne:{sections:[{name:"Illustrations"}]},targetTwo:{sections:[{name:"Illustrations",headers:["Lined"]}]}},capswan:{targetOne:{sections:[{name:"Illustrations"},{name:"Icons",headers:["Icons","Components"]}]},targetTwo:{sections:[{name:"Icons"}]}}}}]));
//# sourceMappingURL=main.js.map