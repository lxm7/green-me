globalThis.openNextDebug = false;globalThis.openNextVersion = "3.0.2";
var N=Object.defineProperty;var m=(e,r)=>()=>(e&&(r=e(e=0)),r);var f=(e,r)=>{for(var t in r)N(e,t,{get:r[t],enumerable:!0})};function i(...e){globalThis.openNextDebug&&console.log(...e)}function b(...e){console.warn(...e)}function d(...e){if(e.some(r=>C(r))){b(...e);return}console.error(...e)}var _,C,p=m(()=>{_=[{clientName:"S3Client",commandName:"GetObjectCommand",errorName:"NoSuchKey"}],C=e=>_.some(r=>r.clientName===e?.clientName&&r.commandName===e?.commandName&&(r.errorName===e?.error?.name||r.errorName===e?.error?.Code))});var u={};f(u,{default:()=>E});var S,E,h=m(()=>{S={convertFrom(e){let r=e.Records.map(t=>{let{host:o,url:n}=JSON.parse(t.body);return{host:o,url:n,id:t.messageId}});return Promise.resolve({type:"revalidate",records:r})},convertTo(e){return Promise.resolve({type:"revalidate",batchItemFailures:e.records.map(r=>({itemIdentifier:r.id}))})},name:"sqs-revalidate"},E=S});var v={};f(v,{default:()=>T});import{Writable as R}from"stream";function D(e){return new Promise(r=>{setTimeout(()=>{r({serverId,type:"warmer"})},e.delay)})}var P,T,w=m(()=>{P=async(e,r)=>async t=>{if("type"in t)return D(t);let o=await r.convertFrom(t),s=await e(o,{writeHeaders:()=>new R({write:(l,c,a)=>{a()}}),onFinish:()=>{}});return r.convertTo(s,t)},T={wrapper:P,name:"aws-lambda",supportStreaming:!1}});import F from"node:fs";import O from"node:https";import j from"node:path";p();async function g(e){return typeof e=="function"?e():(await Promise.resolve().then(()=>(h(),u))).default}async function y(e){return typeof e=="function"?e():(await Promise.resolve().then(()=>(w(),v))).default}async function x(e){let r=await import("./open-next.config.mjs").then(s=>s.default);globalThis.openNextConfig=r;let t=r[e.type]?.override,o=await g(t?.converter),n=await y(t?.wrapper);return i("Using wrapper",n.name),n.wrapper(e.handler,o)}p();var H=A(),W=async e=>{let r=[];for(let t of e.records){let{host:o,url:n}=t;i("Revalidating stale page",{host:o,url:n});try{await new Promise((s,l)=>{let c=O.request(`https://${o}${n}`,{method:"HEAD",headers:{"x-prerender-revalidate":H.preview.previewModeId,"x-isr":"1"}},a=>{i("revalidating",{url:n,host:o,headers:a.headers,statusCode:a.statusCode}),(a.statusCode!==200||a.headers["x-nextjs-cache"]!=="REVALIDATED")&&r.push(t),s(a)});c.on("error",a=>{d("Error revalidating page",{host:o,url:n}),l(a)}),c.end()})}catch{r.push(t)}}return r.length>0&&d(`Failed to revalidate ${r.length} pages`,{failedRecords:r}),{type:"revalidate",records:r}},z=await x({handler:W,type:"revalidate"});function A(){let e=j.join("prerender-manifest.json"),r=F.readFileSync(e,"utf-8");return JSON.parse(r)}export{z as handler};