!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var t=n();for(var o in t)("object"==typeof exports?exports:e)[o]=t[o]}}(window,function(){return function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){e.exports=t(1)},function(e,n,t){"use strict";t.r(n),n.default=function(){return{clspRouter:function(){var e=window.parent.videojs.getPlugin("clsp").conduits.getById(window.MqttClientId).iov,n=-1;function t(n,t){console.warn("Error for "+e.id+":"),console.warn(n),t&&console.error(t)}function o(n){try{n.clientId=e.id,window.parent.postMessage(n,"*")}catch(e){t('Error while executing "postMessage"...',e)}}function r(){if(window.MQTTClient)try{window.MQTTClient.disconnect()}catch(e){t("Error while trying to disconnect...",e)}}function i(e){var n="";try{n=e.payloadString}catch(e){}o({event:"data",destinationName:e.destinationName,payloadString:n,payloadBytes:e.payloadBytes||null})}function a(e){var n=e.data;try{switch(n.method){case"destroy":r();break;case"subscribe":window.MQTTClient.subscribe(n.topic);break;case"unsubscribe":window.MQTTClient.unsubscribe(n.topic);break;case"publish":try{!function(e,n){try{var o=new window.parent.Paho.Message(n);o.destinationName=e,window.MQTTClient.send(o)}catch(e){t("Error while sending mqtt message...",e)}}(n.topic,JSON.stringify(n.data))}catch(e){return t("Unable to parse message data..."),void t(n.data)}break;default:t('Unknown message method "'+n.method+'" received...')}}catch(e){t("Unknown onMessage error...",e),o({event:"fail",reason:"network failure"}),r()}}function c(){try{r()}catch(e){}-1===n&&(n=setInterval(()=>{l()},2e3))}function s(){window.addEventListener?window.addEventListener("message",a,!1):window.attachEvent&&window.attachEvent("onmessage",a),o({event:"ready"}),-1!==n&&(clearInterval(n),n=-1)}function d(e){var n="Failed to connect: Error code "+parseInt(e.errorCode)+": "+e.errorMessage;t(n),o({event:"fail",reason:n}),c()}function u(e){if(0!==e.errorCode){var n="Lost connection: Error code "+parseInt(e.errorCode)+": "+e.errorMessage;t(n),o({event:"fail",reason:n}),c()}}function l(){var n=new window.parent.Paho.Message(JSON.stringify({clientId:e.id}));n.destinationName="iov/clientDisconnect";var r={timeout:120,onSuccess:s,onFailure:d,willMessage:n};!0===e.config.useSSL&&(r.useSSL=!0);try{window.MQTTClient.connect(r)}catch(e){t("Unknown connection failure...",e),o({event:"fail",reason:"connect failed"})}}!function(){try{window.MQTTClient=new window.parent.Paho.Client(e.config.wsbroker,e.config.wsport,e.id),window.MQTTClient.onConnectionLost=u,window.MQTTClient.onMessageArrived=i,l()}catch(e){console.error("IFRAME error"),console.error(e)}}()},onunload:function(){window.MQTTClient&&window.MQTTClient.disconnect()}}}}])});