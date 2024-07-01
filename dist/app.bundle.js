(()=>{"use strict";class t{constructor(t){this.data=t,this.next=null}}class e{constructor(){this.head=null,this.size=0,this.tail=null}append(e){const s=new t(e);this.head?(this.tail.next=s,this.tail=s):(this.head=s,this.tail=s),this.size++}prepend(e){const s=new t(e);s.next=this.head,this.head=s,this.tail||(this.tail=s),this.size++}at(t){if(t>=this.size)return null;let e=0,s=this.head;for(;e<t;)s=s.next,e++;return s}pop(){if(!this.head)return null;if(this.head===this.tail){const t=this.head;return this.head=null,this.tail=null,this.size--,t}let t=this.head,e=this.head;for(;e.next;)t=e,e=e.next;return t.next=null,this.tail=t,this.size--,e}traverse(t,e="find"){if("find"===e){let e=this.head;for(;e;){if(t(e))return e;e=e.next}return null}if("modify"===e){let e=this.head;for(;e;){if(t(e))return e;e=e.next}return null}if("has"===e){let e=this.head;for(;e;){if(t(e))return!0;e=e.next}return!1}if("delete"===e){let e=this.head,s=this.head;for(;s;){if(t(s))return s===this.head?(this.head=this.head.next,this.size--,s):(s===this.tail&&(this.tail=e),e.next=s.next,this.size--,s);e=s,s=s.next}return null}return null}contains(t){let e=this.head;for(;e;){if(e.data===t)return!0;e=e.next}return!1}find(t){let e=this.head;for(;e;){if(e.data===t)return e;e=e.next}return null}toString(){let t=this.head,e="";for(;t;)e+=`(${t.data}) -> `,t=t.next;return e+"null"}insertAt(e,s){if(e>this.size)return null;if(0===e)return void this.prepend(s);if(e===this.size)return void this.append(s);let i=new t(s),h=this.at(e-1);i.next=h.next,h.next=i,this.size++}removeAt(t){if(t>=this.size)return null;if(0===t){const t=this.head;return this.head=this.head.next,this.size--,t}let e=this.at(t-1);const s=e.next;return e.next=s.next,t===this.size-1&&(this.tail=e),this.size--,s}}const s=new class{constructor(t=16,s=.8){this.size=0,this.capacity=t,this.load_factor=s,this.buckets=new Array(this.capacity).fill(null).map((()=>new e))}hash(t){let e=0;for(let s=0;s<t.length;s++)e=31*e+t.charCodeAt(s);return e%this.capacity}set(t,e){const s=this.hash(t);console.log(s);const i=this.buckets[s],h=i.traverse((e=>e.data.key===t));h?h.data.value=e:(i.append({key:t,value:e}),this.size++,this.resize())}resize(){if(this.size<this.capacity*this.load_factor)return;this.capacity*=2,this.size=0;const t=this.buckets;this.buckets=new Array(this.capacity).fill(null).map((()=>new e)),t.forEach((t=>{let e=t.head;for(;e;)this.set(e.data.key,e.data.value),e=e.next}))}entries(){const t=[];return this.buckets.forEach((e=>{let s=e.head;for(;s;)t.push([s.data.key,s.data.value]),s=s.next})),t}get(t){const e=this.hash(t);return this.buckets[e].traverse((e=>e.data.key===t),"has")}has(t){return!!this.get(t)}remove(t){const e=this.hash(t);return!!this.buckets[e].traverse((e=>e.data.key===t),"delete")}clear(){this.buckets=new Array(this.capacity).fill(null).map((()=>new e)),this.size=0}keys(){return this.entries().map((([t,e])=>t))}values(){return this.entries().map((([t,e])=>e))}}(1);s.set("name","John Doe"),s.set("age",30),s.set("city","New York"),s.set("name","Jane Doe"),s.clear(),s.set("name","John Doe"),console.log(s),console.log(s.entries()),console.log(s.keys()),console.log(s.values())})();