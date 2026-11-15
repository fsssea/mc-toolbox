(()=>{var el=Object.defineProperty,tl=Object.defineProperties;var nl=Object.getOwnPropertyDescriptors;var Oi=Object.getOwnPropertySymbols;var al=Object.prototype.hasOwnProperty,il=Object.prototype.propertyIsEnumerable;var Hi=e=>{throw TypeError(e)};var wa=(e,n,t)=>n in e?el(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,xe=(e,n)=>{for(var t in n||(n={}))al.call(n,t)&&wa(e,t,n[t]);if(Oi)for(var t of Oi(n))il.call(n,t)&&wa(e,t,n[t]);return e},St=(e,n)=>tl(e,nl(n));var F=(e,n,t)=>wa(e,typeof n!="symbol"?n+"":n,t),ka=(e,n,t)=>n.has(e)||Hi("Cannot "+t);var Y=(e,n,t)=>(ka(e,n,"read from private field"),t?t.call(e):n.get(e)),Ge=(e,n,t)=>n.has(e)?Hi("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(e):n.set(e,t),pt=(e,n,t,a)=>(ka(e,n,"write to private field"),a?a.call(e,t):n.set(e,t),t),G=(e,n,t)=>(ka(e,n,"access private method"),t);var Wi=4,Zi=0,Vi=1,ol=2;function Ot(e){let n=e.length;for(;--n>=0;)e[n]=0}var rl=0,To=1,sl=2,Io=29,Ha=256,Lo=286,Ut=30,Wa=19,No=573,sn=15,xa=16,ll=7,Za=256,Ao=16,jo=17,Po=18,Aa=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),Hn=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),cl=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),Do=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ml=512,lt=new Array(288*2);Ot(lt);var ln=new Array(Ut*2);Ot(ln);var mn=new Array(ml);Ot(mn);var dn=new Array(256);Ot(dn);var Va=new Array(Io);Ot(Va);var Wn=new Array(Ut);Ot(Wn);var Sa=class{constructor(e,n,t,a,i){this.static_tree=e,this.extra_bits=n,this.extra_base=t,this.elems=a,this.max_length=i,this.has_stree=e&&e.length}},Uo,Fo,Ro,Ea=class{constructor(e,n){this.dyn_tree=e,this.max_code=0,this.stat_desc=n}},Oo=e=>e<256?mn[e]:mn[256+(e>>>7)],un=(e,n)=>{e.pending_buf[e.pending++]=n&255,e.pending_buf[e.pending++]=n>>>8&255},Me=(e,n,t)=>{e.bi_valid>xa-t?(e.bi_buf|=n<<e.bi_valid&65535,un(e,e.bi_buf),e.bi_buf=n>>xa-e.bi_valid,e.bi_valid+=t-xa):(e.bi_buf|=n<<e.bi_valid&65535,e.bi_valid+=t)},Xe=(e,n,t)=>{Me(e,t[n*2],t[n*2+1])},Ho=(e,n)=>{let t=0;do t|=e&1,e>>>=1,t<<=1;while(--n>0);return t>>>1},dl=e=>{e.bi_valid===16?(un(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):e.bi_valid>=8&&(e.pending_buf[e.pending++]=e.bi_buf&255,e.bi_buf>>=8,e.bi_valid-=8)},ul=(e,n)=>{let t=n.dyn_tree,a=n.max_code,i=n.stat_desc.static_tree,o=n.stat_desc.has_stree,r=n.stat_desc.extra_bits,s=n.stat_desc.extra_base,l=n.stat_desc.max_length,c,m,u,p,d,b,_=0;for(p=0;p<=sn;p++)e.bl_count[p]=0;for(t[e.heap[e.heap_max]*2+1]=0,c=e.heap_max+1;c<No;c++)m=e.heap[c],p=t[t[m*2+1]*2+1]+1,p>l&&(p=l,_++),t[m*2+1]=p,!(m>a)&&(e.bl_count[p]++,d=0,m>=s&&(d=r[m-s]),b=t[m*2],e.opt_len+=b*(p+d),o&&(e.static_len+=b*(i[m*2+1]+d)));if(_!==0){do{for(p=l-1;e.bl_count[p]===0;)p--;e.bl_count[p]--,e.bl_count[p+1]+=2,e.bl_count[l]--,_-=2}while(_>0);for(p=l;p!==0;p--)for(m=e.bl_count[p];m!==0;)u=e.heap[--c],!(u>a)&&(t[u*2+1]!==p&&(e.opt_len+=(p-t[u*2+1])*t[u*2],t[u*2+1]=p),m--)}},Wo=(e,n,t)=>{let a=new Array(16),i=0,o,r;for(o=1;o<=sn;o++)i=i+t[o-1]<<1,a[o]=i;for(r=0;r<=n;r++){let s=e[r*2+1];s!==0&&(e[r*2]=Ho(a[s]++,s))}},pl=()=>{let e,n,t,a,i,o=new Array(16);for(t=0,a=0;a<Io-1;a++)for(Va[a]=t,e=0;e<1<<Aa[a];e++)dn[t++]=a;for(dn[t-1]=a,i=0,a=0;a<16;a++)for(Wn[a]=i,e=0;e<1<<Hn[a];e++)mn[i++]=a;for(i>>=7;a<Ut;a++)for(Wn[a]=i<<7,e=0;e<1<<Hn[a]-7;e++)mn[256+i++]=a;for(n=0;n<=sn;n++)o[n]=0;for(e=0;e<=143;)lt[e*2+1]=8,e++,o[8]++;for(;e<=255;)lt[e*2+1]=9,e++,o[9]++;for(;e<=279;)lt[e*2+1]=7,e++,o[7]++;for(;e<=287;)lt[e*2+1]=8,e++,o[8]++;for(Wo(lt,287,o),e=0;e<Ut;e++)ln[e*2+1]=5,ln[e*2]=Ho(e,5);Uo=new Sa(lt,Aa,257,Lo,sn),Fo=new Sa(ln,Hn,0,Ut,sn),Ro=new Sa(new Array(0),cl,0,Wa,ll)},Zo=e=>{let n;for(n=0;n<Lo;n++)e.dyn_ltree[n*2]=0;for(n=0;n<Ut;n++)e.dyn_dtree[n*2]=0;for(n=0;n<Wa;n++)e.bl_tree[n*2]=0;e.dyn_ltree[Za*2]=1,e.opt_len=e.static_len=0,e.sym_next=e.matches=0},Vo=e=>{e.bi_valid>8?un(e,e.bi_buf):e.bi_valid>0&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0},Ji=(e,n,t,a)=>{let i=n*2,o=t*2;return e[i]<e[o]||e[i]===e[o]&&a[n]<=a[t]},Ba=(e,n,t)=>{let a=e.heap[t],i=t<<1;for(;i<=e.heap_len&&(i<e.heap_len&&Ji(n,e.heap[i+1],e.heap[i],e.depth)&&i++,!Ji(n,a,e.heap[i],e.depth));)e.heap[t]=e.heap[i],t=i,i<<=1;e.heap[t]=a},Ki=(e,n,t)=>{let a,i,o=0,r,s;if(e.sym_next!==0)do a=e.pending_buf[e.sym_buf+o++]&255,a+=(e.pending_buf[e.sym_buf+o++]&255)<<8,i=e.pending_buf[e.sym_buf+o++],a===0?Xe(e,i,n):(r=dn[i],Xe(e,r+Ha+1,n),s=Aa[r],s!==0&&(i-=Va[r],Me(e,i,s)),a--,r=Oo(a),Xe(e,r,t),s=Hn[r],s!==0&&(a-=Wn[r],Me(e,a,s)));while(o<e.sym_next);Xe(e,Za,n)},ja=(e,n)=>{let t=n.dyn_tree,a=n.stat_desc.static_tree,i=n.stat_desc.has_stree,o=n.stat_desc.elems,r,s,l=-1,c;for(e.heap_len=0,e.heap_max=No,r=0;r<o;r++)t[r*2]!==0?(e.heap[++e.heap_len]=l=r,e.depth[r]=0):t[r*2+1]=0;for(;e.heap_len<2;)c=e.heap[++e.heap_len]=l<2?++l:0,t[c*2]=1,e.depth[c]=0,e.opt_len--,i&&(e.static_len-=a[c*2+1]);for(n.max_code=l,r=e.heap_len>>1;r>=1;r--)Ba(e,t,r);c=o;do r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],Ba(e,t,1),s=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=s,t[c*2]=t[r*2]+t[s*2],e.depth[c]=(e.depth[r]>=e.depth[s]?e.depth[r]:e.depth[s])+1,t[r*2+1]=t[s*2+1]=c,e.heap[1]=c++,Ba(e,t,1);while(e.heap_len>=2);e.heap[--e.heap_max]=e.heap[1],ul(e,n),Wo(t,l,e.bl_count)},Gi=(e,n,t)=>{let a,i=-1,o,r=n[1],s=0,l=7,c=4;for(r===0&&(l=138,c=3),n[(t+1)*2+1]=65535,a=0;a<=t;a++)o=r,r=n[(a+1)*2+1],!(++s<l&&o===r)&&(s<c?e.bl_tree[o*2]+=s:o!==0?(o!==i&&e.bl_tree[o*2]++,e.bl_tree[Ao*2]++):s<=10?e.bl_tree[jo*2]++:e.bl_tree[Po*2]++,s=0,i=o,r===0?(l=138,c=3):o===r?(l=6,c=3):(l=7,c=4))},qi=(e,n,t)=>{let a,i=-1,o,r=n[1],s=0,l=7,c=4;for(r===0&&(l=138,c=3),a=0;a<=t;a++)if(o=r,r=n[(a+1)*2+1],!(++s<l&&o===r)){if(s<c)do Xe(e,o,e.bl_tree);while(--s!==0);else o!==0?(o!==i&&(Xe(e,o,e.bl_tree),s--),Xe(e,Ao,e.bl_tree),Me(e,s-3,2)):s<=10?(Xe(e,jo,e.bl_tree),Me(e,s-3,3)):(Xe(e,Po,e.bl_tree),Me(e,s-11,7));s=0,i=o,r===0?(l=138,c=3):o===r?(l=6,c=3):(l=7,c=4)}},fl=e=>{let n;for(Gi(e,e.dyn_ltree,e.l_desc.max_code),Gi(e,e.dyn_dtree,e.d_desc.max_code),ja(e,e.bl_desc),n=Wa-1;n>=3&&e.bl_tree[Do[n]*2+1]===0;n--);return e.opt_len+=3*(n+1)+5+5+4,n},hl=(e,n,t,a)=>{let i;for(Me(e,n-257,5),Me(e,t-1,5),Me(e,a-4,4),i=0;i<a;i++)Me(e,e.bl_tree[Do[i]*2+1],3);qi(e,e.dyn_ltree,n-1),qi(e,e.dyn_dtree,t-1)},_l=e=>{let n=4093624447,t;for(t=0;t<=31;t++,n>>>=1)if(n&1&&e.dyn_ltree[t*2]!==0)return Zi;if(e.dyn_ltree[18]!==0||e.dyn_ltree[20]!==0||e.dyn_ltree[26]!==0)return Vi;for(t=32;t<Ha;t++)if(e.dyn_ltree[t*2]!==0)return Vi;return Zi},Xi=!1,bl=e=>{Xi||(pl(),Xi=!0),e.l_desc=new Ea(e.dyn_ltree,Uo),e.d_desc=new Ea(e.dyn_dtree,Fo),e.bl_desc=new Ea(e.bl_tree,Ro),e.bi_buf=0,e.bi_valid=0,Zo(e)},Zn=(e,n,t,a)=>{Me(e,(rl<<1)+(a?1:0),3),Vo(e),un(e,t),un(e,~t),t&&e.pending_buf.set(e.window.subarray(n,n+t),e.pending),e.pending+=t},gl=e=>{Me(e,To<<1,3),Xe(e,Za,lt),dl(e)},yl=(e,n,t,a)=>{let i,o,r=0;e.level>0?(e.strm.data_type===ol&&(e.strm.data_type=_l(e)),ja(e,e.l_desc),ja(e,e.d_desc),r=fl(e),i=e.opt_len+3+7>>>3,o=e.static_len+3+7>>>3,(o<=i||e.strategy===Wi)&&(i=o)):i=o=t+5,t+4<=i&&n!==-1?Zn(e,n,t,a):e.strategy===Wi||o===i?(Me(e,(To<<1)+(a?1:0),3),Ki(e,lt,ln)):(Me(e,(sl<<1)+(a?1:0),3),hl(e,e.l_desc.max_code+1,e.d_desc.max_code+1,r+1),Ki(e,e.dyn_ltree,e.dyn_dtree)),Zo(e),a&&Vo(e)},ht=(e,n,t)=>(e.pending_buf[e.sym_buf+e.sym_next++]=n,e.pending_buf[e.sym_buf+e.sym_next++]=n>>8,e.pending_buf[e.sym_buf+e.sym_next++]=t,n===0?e.dyn_ltree[t*2]++:(e.matches++,n--,e.dyn_ltree[(dn[t]+Ha+1)*2]++,e.dyn_dtree[Oo(n)*2]++),e.sym_next===e.sym_end),pn=(e,n,t,a)=>{let i=e&65535|0,o=e>>>16&65535|0,r=0;for(;t!==0;){r=t>2e3?2e3:t,t-=r;do i=i+n[a++]|0,o=o+i|0;while(--r);i%=65521,o%=65521}return i|o<<16|0},vl=()=>{let e=new Uint32Array(2048),n;for(let t=0;t<256;t++){n=t;for(let a=0;a<8;a++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n}for(let t=0;t<256;t++){n=e[t];for(let a=256;a<256*8;a+=256)n=e[n&255]^n>>>8,e[a+t]=n}return e},wl=vl(),fe=(e,n,t,a)=>{let i=wl,o=a+t,r=a;e^=-1;for(let s=o-7;r<s;r+=8)e^=n[r]|n[r+1]<<8|n[r+2]<<16|n[r+3]<<24,e=i[1792+(e&255)]^i[1536+(e>>>8&255)]^i[1280+(e>>>16&255)]^i[1024+(e>>>24)]^i[768+n[r+4]]^i[512+n[r+5]]^i[256+n[r+6]]^i[n[r+7]];for(;r<o;r++)e=e>>>8^i[(e^n[r])&255];return e^-1},Mt={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};var kl=9;var xl=573,re=3,Et=258,Ye=262,Sl=32,Ft=42,Ja=57,Pa=69,Da=73,Ua=91,Fa=103,Bt=113,on=666,Se=1,Ht=2,$t=3,Wt=4,El=3,Ct=(e,n)=>(e.msg=Mt[n],n),Yi=e=>e*2-(e>4?9:0),ft=e=>{let n=e.length;for(;--n>=0;)e[n]=0},Bl=e=>{let n,t,a,i=e.w_size;n=e.hash_size,a=n;do t=e.head[--a],e.head[a]=t>=i?t-i:0;while(--n);n=i,a=n;do t=e.prev[--a],e.prev[a]=t>=i?t-i:0;while(--n)},Ka=(e,n,t)=>(n<<e.hash_shift^t)&e.hash_mask,zt=(e,n)=>{let t;if(e.legacy_hash)t=e.ins_h=Ka(e,e.ins_h,e.window[n+re-1]);else{let i=e.window,o=i[n]|i[n+1]<<8|i[n+2]<<16|i[n+3]<<24;t=e.ins_h=Math.imul(o,66521)+66521>>>16&e.hash_mask}let a=e.prev[n&e.w_mask]=e.head[t];return e.head[t]=n,a},Ne=e=>{let n=e.state,t=n.pending;t>e.avail_out&&(t=e.avail_out),t!==0&&(e.output.set(n.pending_buf.subarray(n.pending_out,n.pending_out+t),e.next_out),e.next_out+=t,n.pending_out+=t,e.total_out+=t,e.avail_out-=t,n.pending-=t,n.pending===0&&(n.pending_out=0))},Ae=(e,n)=>{yl(e,e.block_start>=0?e.block_start:-1,e.strstart-e.block_start,n),e.block_start=e.strstart,Ne(e.strm)},oe=(e,n)=>{e.pending_buf[e.pending++]=n},an=(e,n)=>{e.pending_buf[e.pending++]=n>>>8&255,e.pending_buf[e.pending++]=n&255},Ra=(e,n,t,a)=>{let i=e.avail_in;return i>a&&(i=a),i===0?0:(e.avail_in-=i,n.set(e.input.subarray(e.next_in,e.next_in+i),t),e.state.wrap===1?e.adler=pn(e.adler,n,i,t):e.state.wrap===2&&(e.adler=fe(e.adler,n,i,t)),e.next_in+=i,e.total_in+=i,i)},Jo=(e,n)=>{let t=e.max_chain_length,a=e.strstart,i,o,r=e.prev_length,s=e.nice_match,l=e.strstart>e.w_size-Ye?e.strstart-(e.w_size-Ye):0,c=e.window,m=e.w_mask,u=e.prev,p=e.strstart+Et,d=c[a+r-1],b=c[a+r];e.prev_length>=e.good_match&&(t>>=2),s>e.lookahead&&(s=e.lookahead);do if(i=n,!(c[i+r]!==b||c[i+r-1]!==d||c[i]!==c[a]||c[++i]!==c[a+1])){a+=2,i++;do;while(c[++a]===c[++i]&&c[++a]===c[++i]&&c[++a]===c[++i]&&c[++a]===c[++i]&&c[++a]===c[++i]&&c[++a]===c[++i]&&c[++a]===c[++i]&&c[++a]===c[++i]&&a<p);if(o=Et-(p-a),a=p-Et,o>r){if(e.match_start=n,r=o,o>=s)break;d=c[a+r-1],b=c[a+r]}}while((n=u[n&m])>l&&--t!==0);return r<=e.lookahead?r:e.lookahead},Rt=e=>{let n=e.w_size,t,a,i;do{if(a=e.window_size-e.lookahead-e.strstart,e.strstart>=n+(n-Ye)&&(e.window.set(e.window.subarray(n,n+n-a),0),e.match_start-=n,e.strstart-=n,e.block_start-=n,e.insert>e.strstart&&(e.insert=e.strstart),Bl(e),a+=n),e.strm.avail_in===0)break;if(t=Ra(e.strm,e.window,e.strstart+e.lookahead,a),e.lookahead+=t,e.legacy_hash){if(e.lookahead+e.insert>=re)for(i=e.strstart-e.insert,e.ins_h=e.window[i],e.ins_h=Ka(e,e.ins_h,e.window[i+1]);e.insert&&(zt(e,i),i++,e.insert--,!(e.lookahead+e.insert<re)););}else if(e.lookahead+e.insert>re)for(i=e.strstart-e.insert;e.insert&&(zt(e,i),i++,e.insert--,!(e.lookahead+e.insert<=re)););}while(e.lookahead<Ye&&e.strm.avail_in!==0)},Ko=(e,n)=>{let t=e.pending_buf_size-5>e.w_size?e.w_size:e.pending_buf_size-5,a,i,o,r=0,s=e.strm.avail_in;do{if(a=65535,o=e.bi_valid+42>>3,e.strm.avail_out<o||(o=e.strm.avail_out-o,i=e.strstart-e.block_start,a>i+e.strm.avail_in&&(a=i+e.strm.avail_in),a>o&&(a=o),a<t&&(a===0&&n!==4||n===0||a!==i+e.strm.avail_in)))break;r=n===4&&a===i+e.strm.avail_in?1:0,Zn(e,0,0,r),e.pending_buf[e.pending-4]=a,e.pending_buf[e.pending-3]=a>>8,e.pending_buf[e.pending-2]=~a,e.pending_buf[e.pending-1]=~a>>8,Ne(e.strm),i&&(i>a&&(i=a),e.strm.output.set(e.window.subarray(e.block_start,e.block_start+i),e.strm.next_out),e.strm.next_out+=i,e.strm.avail_out-=i,e.strm.total_out+=i,e.block_start+=i,a-=i),a&&(Ra(e.strm,e.strm.output,e.strm.next_out,a),e.strm.next_out+=a,e.strm.avail_out-=a,e.strm.total_out+=a)}while(r===0);return s-=e.strm.avail_in,s&&(s>=e.w_size?(e.matches=2,e.window.set(e.strm.input.subarray(e.strm.next_in-e.w_size,e.strm.next_in),0),e.strstart=e.w_size,e.insert=e.strstart):(e.window_size-e.strstart<=s&&(e.strstart-=e.w_size,e.window.set(e.window.subarray(e.w_size,e.w_size+e.strstart),0),e.matches<2&&e.matches++,e.insert>e.strstart&&(e.insert=e.strstart)),e.window.set(e.strm.input.subarray(e.strm.next_in-s,e.strm.next_in),e.strstart),e.strstart+=s,e.insert+=s>e.w_size-e.insert?e.w_size-e.insert:s),e.block_start=e.strstart),e.high_water<e.strstart&&(e.high_water=e.strstart),r?Wt:n!==0&&n!==4&&e.strm.avail_in===0&&e.strstart===e.block_start?Ht:(o=e.window_size-e.strstart,e.strm.avail_in>o&&e.block_start>=e.w_size&&(e.block_start-=e.w_size,e.strstart-=e.w_size,e.window.set(e.window.subarray(e.w_size,e.w_size+e.strstart),0),e.matches<2&&e.matches++,o+=e.w_size,e.insert>e.strstart&&(e.insert=e.strstart)),o>e.strm.avail_in&&(o=e.strm.avail_in),o&&(Ra(e.strm,e.window,e.strstart,o),e.strstart+=o,e.insert+=o>e.w_size-e.insert?e.w_size-e.insert:o),e.high_water<e.strstart&&(e.high_water=e.strstart),o=e.bi_valid+42>>3,o=e.pending_buf_size-o>65535?65535:e.pending_buf_size-o,t=o>e.w_size?e.w_size:o,i=e.strstart-e.block_start,(i>=t||(i||n===4)&&n!==0&&e.strm.avail_in===0&&i<=o)&&(a=i>o?o:i,r=n===4&&e.strm.avail_in===0&&a===i?1:0,Zn(e,e.block_start,a,r),e.block_start+=a,Ne(e.strm)),r?$t:Se)},Ca=(e,n)=>{let t,a;for(;;){if(e.lookahead<Ye){if(Rt(e),e.lookahead<Ye&&n===0)return Se;if(e.lookahead===0)break}if(t=0,e.lookahead>=re&&(t=zt(e,e.strstart)),t!==0&&e.strstart-t<=e.w_size-Ye&&(e.match_length=Jo(e,t)),e.match_length>=re)if(a=ht(e,e.strstart-e.match_start,e.match_length-re),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=re){e.match_length--;do e.strstart++,t=zt(e,e.strstart);while(--e.match_length!==0);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.legacy_hash&&(e.ins_h=e.window[e.strstart],e.ins_h=Ka(e,e.ins_h,e.window[e.strstart+1]));else a=ht(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(a&&(Ae(e,!1),e.strm.avail_out===0))return Se}return e.insert=e.strstart<re-1?e.strstart:re-1,n===4?(Ae(e,!0),e.strm.avail_out===0?$t:Wt):e.sym_next&&(Ae(e,!1),e.strm.avail_out===0)?Se:Ht},Dt=(e,n)=>{let t,a,i;for(;;){if(e.lookahead<Ye){if(Rt(e),e.lookahead<Ye&&n===0)return Se;if(e.lookahead===0)break}if(t=0,e.lookahead>=re&&(t=zt(e,e.strstart)),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=re-1,t!==0&&e.prev_length<e.max_lazy_match&&e.strstart-t<=e.w_size-Ye&&(e.match_length=Jo(e,t),e.match_length<=5&&(e.strategy===1||e.match_length===re&&e.strstart-e.match_start>4096)&&(e.match_length=re-1)),e.prev_length>=re&&e.match_length<=e.prev_length){i=e.strstart+e.lookahead-re,a=ht(e,e.strstart-1-e.prev_match,e.prev_length-re),e.lookahead-=e.prev_length-1,e.prev_length-=2;do++e.strstart<=i&&(t=zt(e,e.strstart));while(--e.prev_length!==0);if(e.match_available=0,e.match_length=re-1,e.strstart++,a&&(Ae(e,!1),e.strm.avail_out===0))return Se}else if(e.match_available){if(a=ht(e,0,e.window[e.strstart-1]),a&&Ae(e,!1),e.strstart++,e.lookahead--,e.strm.avail_out===0)return Se}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(a=ht(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<re-1?e.strstart:re-1,n===4?(Ae(e,!0),e.strm.avail_out===0?$t:Wt):e.sym_next&&(Ae(e,!1),e.strm.avail_out===0)?Se:Ht},Cl=(e,n)=>{let t,a,i,o,r=e.window;for(;;){if(e.lookahead<=Et){if(Rt(e),e.lookahead<=Et&&n===0)return Se;if(e.lookahead===0)break}if(e.match_length=0,e.lookahead>=re&&e.strstart>0&&(i=e.strstart-1,a=r[i],a===r[++i]&&a===r[++i]&&a===r[++i])){o=e.strstart+Et;do;while(a===r[++i]&&a===r[++i]&&a===r[++i]&&a===r[++i]&&a===r[++i]&&a===r[++i]&&a===r[++i]&&a===r[++i]&&i<o);e.match_length=Et-(o-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=re?(t=ht(e,1,e.match_length-re),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(t=ht(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),t&&(Ae(e,!1),e.strm.avail_out===0))return Se}return e.insert=0,n===4?(Ae(e,!0),e.strm.avail_out===0?$t:Wt):e.sym_next&&(Ae(e,!1),e.strm.avail_out===0)?Se:Ht},Ml=(e,n)=>{let t;for(;;){if(e.lookahead===0&&(Rt(e),e.lookahead===0)){if(n===0)return Se;break}if(e.match_length=0,t=ht(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,t&&(Ae(e,!1),e.strm.avail_out===0))return Se}return e.insert=0,n===4?(Ae(e,!0),e.strm.avail_out===0?$t:Wt):e.sym_next&&(Ae(e,!1),e.strm.avail_out===0)?Se:Ht},qe=class{constructor(e,n,t,a,i){this.good_length=e,this.max_lazy=n,this.nice_length=t,this.max_chain=a,this.func=i}},rn=[new qe(0,0,0,0,Ko),new qe(4,4,8,4,Ca),new qe(4,5,16,8,Ca),new qe(4,6,32,32,Ca),new qe(4,4,16,16,Dt),new qe(8,16,32,32,Dt),new qe(8,16,128,128,Dt),new qe(8,32,128,256,Dt),new qe(32,128,258,1024,Dt),new qe(32,258,258,4096,Dt)],$l=e=>{e.window_size=2*e.w_size,ft(e.head),e.max_lazy_match=rn[e.level].max_lazy,e.good_match=rn[e.level].good_length,e.nice_match=rn[e.level].nice_length,e.max_chain_length=rn[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=re-1,e.match_available=0,e.ins_h=0},zl=class{constructor(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=8,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.legacy_hash=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(xl*2),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),ft(this.dyn_ltree),ft(this.dyn_dtree),ft(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),ft(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),ft(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}},Jn=e=>{if(!e)return 1;let n=e.state;return!n||n.strm!==e||n.status!==Ft&&n.status!==Ja&&n.status!==Pa&&n.status!==Da&&n.status!==Ua&&n.status!==Fa&&n.status!==Bt&&n.status!==on?1:0},Tl=e=>{if(Jn(e))return Ct(e,-2);e.total_in=e.total_out=0,e.data_type=2;let n=e.state;return n.pending=0,n.pending_out=0,n.wrap<0&&(n.wrap=-n.wrap),n.status=n.wrap===2?Ja:n.wrap?Ft:Bt,e.adler=n.wrap===2?0:1,n.last_flush=-2,bl(n),0},Il=e=>{let n=Tl(e);return n===0&&$l(e.state),n};var Ll=(e,n,t,a,i,o,r)=>{if(!e)return-2;let s=1;if(n===-1&&(n=6),a<0?(s=0,a=-a):a>15&&(s=2,a-=16),i<1||i>kl||t!==8||a<8||a>15||n<0||n>9||o<0||o>4||a===8&&s!==1)return Ct(e,-2);a===8&&(a=9);let l=new zl;return e.state=l,l.strm=e,l.status=Ft,l.wrap=s,l.gzhead=null,l.w_bits=a,l.w_size=1<<l.w_bits,l.w_mask=l.w_size-1,l.legacy_hash=r?1:0,l.hash_bits=i+7,!l.legacy_hash&&l.hash_bits<15&&(l.hash_bits=15),l.hash_size=1<<l.hash_bits,l.hash_mask=l.hash_size-1,l.hash_shift=~~((l.hash_bits+re-1)/re),l.window=new Uint8Array(l.w_size*2),l.head=new Uint16Array(l.hash_size),l.prev=new Uint16Array(l.w_size),l.lit_bufsize=1<<i+6,l.pending_buf_size=l.lit_bufsize*4,l.pending_buf=new Uint8Array(l.pending_buf_size),l.sym_buf=l.lit_bufsize,l.sym_end=(l.lit_bufsize-1)*3,l.level=n,l.strategy=o,l.method=t,Il(e)};var Nl=(e,n)=>{if(Jn(e)||n>5||n<0)return e?Ct(e,-2):-2;let t=e.state;if(!e.output||e.avail_in!==0&&!e.input||t.status===on&&n!==4)return Ct(e,e.avail_out===0?-5:-2);let a=t.last_flush;if(t.last_flush=n,t.pending!==0){if(Ne(e),e.avail_out===0)return t.last_flush=-1,0}else if(e.avail_in===0&&Yi(n)<=Yi(a)&&n!==4)return Ct(e,-5);if(t.status===on&&e.avail_in!==0)return Ct(e,-5);if(t.status===Ft&&t.wrap===0&&(t.status=Bt),t.status===Ft){let i=8+(t.w_bits-8<<4)<<8,o=-1;if(t.strategy>=2||t.level<2?o=0:t.level<6?o=1:t.level===6?o=2:o=3,i|=o<<6,t.strstart!==0&&(i|=Sl),i+=31-i%31,an(t,i),t.strstart!==0&&(an(t,e.adler>>>16),an(t,e.adler&65535)),e.adler=1,t.status=Bt,Ne(e),t.pending!==0)return t.last_flush=-1,0}if(t.status===Ja){if(e.adler=0,oe(t,31),oe(t,139),oe(t,8),t.gzhead)oe(t,(t.gzhead.text?1:0)+(t.gzhead.hcrc?2:0)+(t.gzhead.extra?4:0)+(t.gzhead.name?8:0)+(t.gzhead.comment?16:0)),oe(t,t.gzhead.time&255),oe(t,t.gzhead.time>>8&255),oe(t,t.gzhead.time>>16&255),oe(t,t.gzhead.time>>24&255),oe(t,t.level===9?2:t.strategy>=2||t.level<2?4:0),oe(t,t.gzhead.os&255),t.gzhead.extra&&t.gzhead.extra.length&&(oe(t,t.gzhead.extra.length&255),oe(t,t.gzhead.extra.length>>8&255)),t.gzhead.hcrc&&(e.adler=fe(e.adler,t.pending_buf,t.pending,0)),t.gzindex=0,t.status=Pa;else if(oe(t,0),oe(t,0),oe(t,0),oe(t,0),oe(t,0),oe(t,t.level===9?2:t.strategy>=2||t.level<2?4:0),oe(t,El),t.status=Bt,Ne(e),t.pending!==0)return t.last_flush=-1,0}if(t.status===Pa){if(t.gzhead.extra){let i=t.pending,o=(t.gzhead.extra.length&65535)-t.gzindex;for(;t.pending+o>t.pending_buf_size;){let s=t.pending_buf_size-t.pending;if(t.pending_buf.set(t.gzhead.extra.subarray(t.gzindex,t.gzindex+s),t.pending),t.pending=t.pending_buf_size,t.gzhead.hcrc&&t.pending>i&&(e.adler=fe(e.adler,t.pending_buf,t.pending-i,i)),t.gzindex+=s,Ne(e),t.pending!==0)return t.last_flush=-1,0;i=0,o-=s}let r=new Uint8Array(t.gzhead.extra);t.pending_buf.set(r.subarray(t.gzindex,t.gzindex+o),t.pending),t.pending+=o,t.gzhead.hcrc&&t.pending>i&&(e.adler=fe(e.adler,t.pending_buf,t.pending-i,i)),t.gzindex=0}t.status=Da}if(t.status===Da){if(t.gzhead.name){let i=t.pending,o;do{if(t.pending===t.pending_buf_size){if(t.gzhead.hcrc&&t.pending>i&&(e.adler=fe(e.adler,t.pending_buf,t.pending-i,i)),Ne(e),t.pending!==0)return t.last_flush=-1,0;i=0}t.gzindex<t.gzhead.name.length?o=t.gzhead.name.charCodeAt(t.gzindex++)&255:o=0,oe(t,o)}while(o!==0);t.gzhead.hcrc&&t.pending>i&&(e.adler=fe(e.adler,t.pending_buf,t.pending-i,i)),t.gzindex=0}t.status=Ua}if(t.status===Ua){if(t.gzhead.comment){let i=t.pending,o;do{if(t.pending===t.pending_buf_size){if(t.gzhead.hcrc&&t.pending>i&&(e.adler=fe(e.adler,t.pending_buf,t.pending-i,i)),Ne(e),t.pending!==0)return t.last_flush=-1,0;i=0}t.gzindex<t.gzhead.comment.length?o=t.gzhead.comment.charCodeAt(t.gzindex++)&255:o=0,oe(t,o)}while(o!==0);t.gzhead.hcrc&&t.pending>i&&(e.adler=fe(e.adler,t.pending_buf,t.pending-i,i))}t.status=Fa}if(t.status===Fa){if(t.gzhead.hcrc){if(t.pending+2>t.pending_buf_size&&(Ne(e),t.pending!==0))return t.last_flush=-1,0;oe(t,e.adler&255),oe(t,e.adler>>8&255),e.adler=0}if(t.status=Bt,Ne(e),t.pending!==0)return t.last_flush=-1,0}if(e.avail_in!==0||t.lookahead!==0||n!==0&&t.status!==on){let i=t.level===0?Ko(t,n):t.strategy===2?Ml(t,n):t.strategy===3?Cl(t,n):rn[t.level].func(t,n);if((i===$t||i===Wt)&&(t.status=on),i===Se||i===$t)return e.avail_out===0&&(t.last_flush=-1),0;if(i===Ht&&(n===1?gl(t):n!==5&&(Zn(t,0,0,!1),n===3&&(ft(t.head),t.lookahead===0&&(t.strstart=0,t.block_start=0,t.insert=0))),Ne(e),e.avail_out===0))return t.last_flush=-1,0}return n!==4?0:t.wrap<=0?1:(t.wrap===2?(oe(t,e.adler&255),oe(t,e.adler>>8&255),oe(t,e.adler>>16&255),oe(t,e.adler>>24&255),oe(t,e.total_in&255),oe(t,e.total_in>>8&255),oe(t,e.total_in>>16&255),oe(t,e.total_in>>24&255)):(an(t,e.adler>>>16),an(t,e.adler&65535)),Ne(e),t.wrap>0&&(t.wrap=-t.wrap),t.pending!==0?0:1)},Al=e=>{if(Jn(e))return-2;let n=e.state.status;return e.state=null,n===Bt?Ct(e,-3):0},jl=(e,n)=>{let t=n.length;if(Jn(e))return-2;let a=e.state,i=a.wrap;if(i===2||i===1&&a.status!==Ft||a.lookahead)return-2;if(i===1&&(e.adler=pn(e.adler,n,t,0)),a.wrap=0,t>=a.w_size){i===0&&(ft(a.head),a.strstart=0,a.block_start=0,a.insert=0);let l=new Uint8Array(a.w_size);l.set(n.subarray(t-a.w_size,t),0),n=l,t=a.w_size}let o=e.avail_in,r=e.next_in,s=e.input;for(e.avail_in=t,e.next_in=0,e.input=n,Rt(a);a.lookahead>=re;){let l=a.strstart,c=a.lookahead-(re-1);do zt(a,l),l++;while(--c);a.strstart=l,a.lookahead=re-1,Rt(a)}return a.strstart+=a.lookahead,a.block_start=a.strstart,a.insert=a.lookahead,a.lookahead=0,a.match_length=a.prev_length=re-1,a.match_available=0,e.next_in=r,e.input=s,e.avail_in=o,a.wrap=i,0},Un=16209,Pl=16191;function Dl(e,n){let t,a,i,o,r,s,l,c,m,u,p,d,b,_,f,h,y,v,w,M,$,B,z,S,T=e.state;t=e.next_in,z=e.input,a=t+(e.avail_in-5),i=e.next_out,S=e.output,o=i-(n-e.avail_out),r=i+(e.avail_out-257),s=T.dmax,l=T.wsize,c=T.whave,m=T.wnext,u=T.window,p=T.hold,d=T.bits,b=T.lencode,_=T.distcode,f=(1<<T.lenbits)-1,h=(1<<T.distbits)-1;e:do{d<15&&(p+=z[t++]<<d,d+=8,p+=z[t++]<<d,d+=8),y=b[p&f];t:for(;;){if(v=y>>>24,p>>>=v,d-=v,v=y>>>16&255,v===0)S[i++]=y&65535;else if(v&16){w=y&65535,v&=15,v&&(d<v&&(p+=z[t++]<<d,d+=8),w+=p&(1<<v)-1,p>>>=v,d-=v),d<15&&(p+=z[t++]<<d,d+=8,p+=z[t++]<<d,d+=8),y=_[p&h];n:for(;;){if(v=y>>>24,p>>>=v,d-=v,v=y>>>16&255,v&16){if(M=y&65535,v&=15,d<v&&(p+=z[t++]<<d,d+=8,d<v&&(p+=z[t++]<<d,d+=8)),M+=p&(1<<v)-1,M>s){e.msg="invalid distance too far back",T.mode=Un;break e}if(p>>>=v,d-=v,v=i-o,M>v){if(v=M-v,v>c&&T.sane){e.msg="invalid distance too far back",T.mode=Un;break e}if($=0,B=u,m===0){if($+=l-v,v<w){w-=v;do S[i++]=u[$++];while(--v);$=i-M,B=S}}else if(m<v){if($+=l+m-v,v-=m,v<w){w-=v;do S[i++]=u[$++];while(--v);if($=0,m<w){v=m,w-=v;do S[i++]=u[$++];while(--v);$=i-M,B=S}}}else if($+=m-v,v<w){w-=v;do S[i++]=u[$++];while(--v);$=i-M,B=S}for(;w>2;)S[i++]=B[$++],S[i++]=B[$++],S[i++]=B[$++],w-=3;w&&(S[i++]=B[$++],w>1&&(S[i++]=B[$++]))}else{$=i-M;do S[i++]=S[$++],S[i++]=S[$++],S[i++]=S[$++],w-=3;while(w>2);w&&(S[i++]=S[$++],w>1&&(S[i++]=S[$++]))}}else if((v&64)===0){y=_[(y&65535)+(p&(1<<v)-1)];continue n}else{e.msg="invalid distance code",T.mode=Un;break e}break}}else if((v&64)===0){y=b[(y&65535)+(p&(1<<v)-1)];continue t}else if(v&32){T.mode=Pl;break e}else{e.msg="invalid literal/length code",T.mode=Un;break e}break}}while(t<a&&i<r);w=d>>3,t-=w,d-=w<<3,p&=(1<<d)-1,e.next_in=t,e.next_out=i,e.avail_in=t<a?5+(a-t):5-(t-a),e.avail_out=i<r?257+(r-i):257-(i-r),T.hold=p,T.bits=d}var Fn=15,Qi=852,eo=592,to=0,Ma=1,no=2,Ul=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),Fl=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,199,75]),Rl=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),Ol=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]),cn=(e,n,t,a,i,o,r,s)=>{let l=s.bits,c=0,m=0,u=0,p=0,d=0,b=0,_=0,f=0,h=0,y=0,v,w,M,$,B,z=null,S,T=new Uint16Array(16),L=new Uint16Array(16),D=null,U,H,X;for(c=0;c<=Fn;c++)T[c]=0;for(m=0;m<a;m++)T[n[t+m]]++;for(d=l,p=Fn;p>=1&&T[p]===0;p--);if(d>p&&(d=p),p===0)return i[o++]=20971520,i[o++]=20971520,s.bits=1,0;for(u=1;u<p&&T[u]===0;u++);for(d<u&&(d=u),f=1,c=1;c<=Fn;c++)if(f<<=1,f-=T[c],f<0)return-1;if(f>0&&(e===to||p!==1))return-1;for(L[1]=0,c=1;c<Fn;c++)L[c+1]=L[c]+T[c];for(m=0;m<a;m++)n[t+m]!==0&&(r[L[n[t+m]]++]=m);if(e===to?(z=D=r,S=20):e===Ma?(z=Ul,D=Fl,S=257):(z=Rl,D=Ol,S=0),y=0,m=0,c=u,B=o,b=d,_=0,M=-1,h=1<<d,$=h-1,e===Ma&&h>Qi||e===no&&h>eo)return 1;for(;;){U=c-_,r[m]+1<S?(H=0,X=r[m]):r[m]>=S?(H=D[r[m]-S],X=z[r[m]-S]):(H=96,X=0),v=1<<c-_,w=1<<b,u=w;do w-=v,i[B+(y>>_)+w]=U<<24|H<<16|X|0;while(w!==0);for(v=1<<c-1;y&v;)v>>=1;if(v!==0?(y&=v-1,y+=v):y=0,m++,--T[c]===0){if(c===p)break;c=n[t+r[m]]}if(c>d&&(y&$)!==M){for(_===0&&(_=d),B+=u,b=c-_,f=1<<b;b+_<p&&(f-=T[b+_],!(f<=0));)b++,f<<=1;if(h+=1<<b,e===Ma&&h>Qi||e===no&&h>eo)return 1;M=y&$,i[M]=d<<24|b<<16|B-o|0}}return y!==0&&(i[B+y]=c-_<<24|4194304),s.bits=d,0},Hl=0,Go=1,qo=2,Kn=16180,ao=16181,io=16182,oo=16183,ro=16184,so=16185,lo=16186,co=16187,mo=16188,uo=16189,Vn=16190,st=16191,$a=16192,po=16193,za=16194,fo=16195,ho=16196,_o=16197,bo=16198,Rn=16199,On=16200,go=16201,yo=16202,vo=16203,wo=16204,ko=16205,Ta=16206,xo=16207,So=16208,ce=16209,Oa=16210,Xo=16211,Wl=852,Zl=592;var Eo=e=>(e>>>24&255)+(e>>>8&65280)+((e&65280)<<8)+((e&255)<<24),Vl=class{constructor(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}},Zt=e=>{if(!e)return 1;let n=e.state;return!n||n.strm!==e||n.mode<Kn||n.mode>Xo?1:0},Jl=e=>{if(Zt(e))return-2;let n=e.state;return e.total_in=e.total_out=n.total=0,e.msg="",n.wrap&&(e.adler=n.wrap&1),n.mode=Kn,n.last=0,n.havedict=0,n.flags=-1,n.dmax=32768,n.head=null,n.hold=0,n.bits=0,n.lencode=n.lendyn=new Int32Array(Wl),n.distcode=n.distdyn=new Int32Array(Zl),n.sane=1,n.back=-1,0},Yo=e=>{if(Zt(e))return-2;let n=e.state;return n.wsize=0,n.whave=0,n.wnext=0,Jl(e)},Kl=(e,n)=>{let t;if(Zt(e))return-2;let a=e.state;return n<0?(t=0,n=-n):(t=(n>>4)+5,n<48&&(n&=15)),n&&(n<8||n>15)?-2:(a.window!==null&&a.wbits!==n&&(a.window=null),a.wrap=t,a.wbits=n,Yo(e))},Gl=(e,n)=>{if(!e)return-2;let t=new Vl;e.state=t,t.strm=e,t.window=null,t.mode=Kn;let a=Kl(e,n);return a!==0&&(e.state=null),a};var Bo=!0,Ia,La,ql=e=>{if(Bo){Ia=new Int32Array(512),La=new Int32Array(32);let n=0;for(;n<144;)e.lens[n++]=8;for(;n<256;)e.lens[n++]=9;for(;n<280;)e.lens[n++]=7;for(;n<288;)e.lens[n++]=8;for(cn(Go,e.lens,0,288,Ia,0,e.work,{bits:9}),n=0;n<32;)e.lens[n++]=5;cn(qo,e.lens,0,32,La,0,e.work,{bits:5}),Bo=!1}e.lencode=Ia,e.lenbits=9,e.distcode=La,e.distbits=5},Qo=(e,n,t,a)=>{let i,o=e.state;return o.window===null&&(o.window=new Uint8Array(1<<o.wbits)),o.wsize===0&&(o.wsize=1<<o.wbits,o.wnext=0,o.whave=0),a>=o.wsize?(o.window.set(n.subarray(t-o.wsize,t),0),o.wnext=0,o.whave=o.wsize):(i=o.wsize-o.wnext,i>a&&(i=a),o.window.set(n.subarray(t-a,t-a+i),o.wnext),a-=i,a?(o.window.set(n.subarray(t-a,t),0),o.wnext=a,o.whave=o.wsize):(o.wnext+=i,o.wnext===o.wsize&&(o.wnext=0),o.whave<o.wsize&&(o.whave+=i))),0},Na=(e,n)=>{let t,a,i,o,r,s,l,c,m,u,p,d,b,_,f=0,h,y,v,w,M,$,B,z,S=new Uint8Array(4),T,L,D=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(Zt(e)||!e.output||!e.input&&e.avail_in!==0)return-2;t=e.state,t.mode===st&&(t.mode=$a),r=e.next_out,i=e.output,l=e.avail_out,o=e.next_in,a=e.input,s=e.avail_in,c=t.hold,m=t.bits,u=s,p=l,z=0;e:for(;;)switch(t.mode){case Kn:if(t.wrap===0){t.mode=$a;break}for(;m<16;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}if(t.wrap&2&&c===35615){t.wbits===0&&(t.wbits=15),t.check=0,S[0]=c&255,S[1]=c>>>8&255,t.check=fe(t.check,S,2,0),c=0,m=0,t.mode=ao;break}if(t.head&&(t.head.done=!1),!(t.wrap&1)||(((c&255)<<8)+(c>>8))%31){e.msg="incorrect header check",t.mode=ce;break}if((c&15)!==8){e.msg="unknown compression method",t.mode=ce;break}if(c>>>=4,m-=4,B=(c&15)+8,t.wbits===0&&(t.wbits=B),B>15||B>t.wbits){e.msg="invalid window size",t.mode=ce;break}t.dmax=1<<t.wbits,t.flags=0,e.adler=t.check=1,t.mode=c&512?uo:st,c=0,m=0;break;case ao:for(;m<16;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}if(t.flags=c,(t.flags&255)!==8){e.msg="unknown compression method",t.mode=ce;break}if(t.flags&57344){e.msg="unknown header flags set",t.mode=ce;break}t.head&&(t.head.text=c>>8&1),t.flags&512&&t.wrap&4&&(S[0]=c&255,S[1]=c>>>8&255,t.check=fe(t.check,S,2,0)),c=0,m=0,t.mode=io;case io:for(;m<32;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}t.head&&(t.head.time=c>>>0),t.flags&512&&t.wrap&4&&(S[0]=c&255,S[1]=c>>>8&255,S[2]=c>>>16&255,S[3]=c>>>24&255,t.check=fe(t.check,S,4,0)),c=0,m=0,t.mode=oo;case oo:for(;m<16;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}t.head&&(t.head.xflags=c&255,t.head.os=c>>8),t.flags&512&&t.wrap&4&&(S[0]=c&255,S[1]=c>>>8&255,t.check=fe(t.check,S,2,0)),c=0,m=0,t.mode=ro;case ro:if(t.flags&1024){for(;m<16;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}t.length=c,t.head&&(t.head.extra_len=c),t.flags&512&&t.wrap&4&&(S[0]=c&255,S[1]=c>>>8&255,t.check=fe(t.check,S,2,0)),c=0,m=0}else t.head&&(t.head.extra=null);t.mode=so;case so:if(t.flags&1024&&(d=t.length,d>s&&(d=s),d&&(t.head&&(B=t.head.extra_len-t.length,t.head.extra||(t.head.extra=new Uint8Array(t.head.extra_len)),t.head.extra.set(a.subarray(o,o+d),B)),t.flags&512&&t.wrap&4&&(t.check=fe(t.check,a,d,o)),s-=d,o+=d,t.length-=d),t.length))break e;t.length=0,t.mode=lo;case lo:if(t.flags&2048){if(s===0)break e;d=0;do B=a[o+d++],t.head&&B&&t.length<65536&&(t.head.name+=String.fromCharCode(B),t.length++);while(B&&d<s);if(t.flags&512&&t.wrap&4&&(t.check=fe(t.check,a,d,o)),s-=d,o+=d,B)break e}else t.head&&(t.head.name=null);t.length=0,t.mode=co;case co:if(t.flags&4096){if(s===0)break e;d=0;do B=a[o+d++],t.head&&B&&t.length<65536&&(t.head.comment+=String.fromCharCode(B),t.length++);while(B&&d<s);if(t.flags&512&&t.wrap&4&&(t.check=fe(t.check,a,d,o)),s-=d,o+=d,B)break e}else t.head&&(t.head.comment=null);t.mode=mo;case mo:if(t.flags&512){for(;m<16;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}if(t.wrap&4&&c!==(t.check&65535)){e.msg="header crc mismatch",t.mode=ce;break}c=0,m=0}t.head&&(t.head.hcrc=t.flags>>9&1,t.head.done=!0),e.adler=t.check=0,t.mode=st;break;case uo:for(;m<32;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}e.adler=t.check=Eo(c),c=0,m=0,t.mode=Vn;case Vn:if(t.havedict===0)return e.next_out=r,e.avail_out=l,e.next_in=o,e.avail_in=s,t.hold=c,t.bits=m,2;e.adler=t.check=1,t.mode=st;case st:if(n===5||n===6)break e;case $a:if(t.last){c>>>=m&7,m-=m&7,t.mode=Ta;break}for(;m<3;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}switch(t.last=c&1,c>>>=1,m-=1,c&3){case 0:t.mode=po;break;case 1:if(ql(t),t.mode=Rn,n===6){c>>>=2,m-=2;break e}break;case 2:t.mode=ho;break;case 3:e.msg="invalid block type",t.mode=ce}c>>>=2,m-=2;break;case po:for(c>>>=m&7,m-=m&7;m<32;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}if((c&65535)!==(c>>>16^65535)){e.msg="invalid stored block lengths",t.mode=ce;break}if(t.length=c&65535,c=0,m=0,t.mode=za,n===6)break e;case za:t.mode=fo;case fo:if(d=t.length,d){if(d>s&&(d=s),d>l&&(d=l),d===0)break e;i.set(a.subarray(o,o+d),r),s-=d,o+=d,l-=d,r+=d,t.length-=d;break}t.mode=st;break;case ho:for(;m<14;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}if(t.nlen=(c&31)+257,c>>>=5,m-=5,t.ndist=(c&31)+1,c>>>=5,m-=5,t.ncode=(c&15)+4,c>>>=4,m-=4,t.nlen>286||t.ndist>30){e.msg="too many length or distance symbols",t.mode=ce;break}t.have=0,t.mode=_o;case _o:for(;t.have<t.ncode;){for(;m<3;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}t.lens[D[t.have++]]=c&7,c>>>=3,m-=3}for(;t.have<19;)t.lens[D[t.have++]]=0;if(t.lencode=t.lendyn,t.lenbits=7,T={bits:t.lenbits},z=cn(Hl,t.lens,0,19,t.lencode,0,t.work,T),t.lenbits=T.bits,z){e.msg="invalid code lengths set",t.mode=ce;break}t.have=0,t.mode=bo;case bo:for(;t.have<t.nlen+t.ndist;){for(;f=t.lencode[c&(1<<t.lenbits)-1],h=f>>>24,y=f>>>16&255,v=f&65535,!(h<=m);){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}if(v<16)c>>>=h,m-=h,t.lens[t.have++]=v;else{if(v===16){for(L=h+2;m<L;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}if(c>>>=h,m-=h,t.have===0){e.msg="invalid bit length repeat",t.mode=ce;break}B=t.lens[t.have-1],d=3+(c&3),c>>>=2,m-=2}else if(v===17){for(L=h+3;m<L;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}c>>>=h,m-=h,B=0,d=3+(c&7),c>>>=3,m-=3}else{for(L=h+7;m<L;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}c>>>=h,m-=h,B=0,d=11+(c&127),c>>>=7,m-=7}if(t.have+d>t.nlen+t.ndist){e.msg="invalid bit length repeat",t.mode=ce;break}for(;d--;)t.lens[t.have++]=B}}if(t.mode===ce)break;if(t.lens[256]===0){e.msg="invalid code -- missing end-of-block",t.mode=ce;break}if(t.lenbits=9,T={bits:t.lenbits},z=cn(Go,t.lens,0,t.nlen,t.lencode,0,t.work,T),t.lenbits=T.bits,z){e.msg="invalid literal/lengths set",t.mode=ce;break}if(t.distbits=6,t.distcode=t.distdyn,T={bits:t.distbits},z=cn(qo,t.lens,t.nlen,t.ndist,t.distcode,0,t.work,T),t.distbits=T.bits,z){e.msg="invalid distances set",t.mode=ce;break}if(t.mode=Rn,n===6)break e;case Rn:t.mode=On;case On:if(s>=6&&l>=258){e.next_out=r,e.avail_out=l,e.next_in=o,e.avail_in=s,t.hold=c,t.bits=m,Dl(e,p),r=e.next_out,i=e.output,l=e.avail_out,o=e.next_in,a=e.input,s=e.avail_in,c=t.hold,m=t.bits,t.mode===st&&(t.back=-1);break}for(t.back=0;f=t.lencode[c&(1<<t.lenbits)-1],h=f>>>24,y=f>>>16&255,v=f&65535,!(h<=m);){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}if(y&&(y&240)===0){for(w=h,M=y,$=v;f=t.lencode[$+((c&(1<<w+M)-1)>>w)],h=f>>>24,y=f>>>16&255,v=f&65535,!(w+h<=m);){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}c>>>=w,m-=w,t.back+=w}if(c>>>=h,m-=h,t.back+=h,t.length=v,y===0){t.mode=ko;break}if(y&32){t.back=-1,t.mode=st;break}if(y&64){e.msg="invalid literal/length code",t.mode=ce;break}t.extra=y&15,t.mode=go;case go:if(t.extra){for(L=t.extra;m<L;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}t.length+=c&(1<<t.extra)-1,c>>>=t.extra,m-=t.extra,t.back+=t.extra}t.was=t.length,t.mode=yo;case yo:for(;f=t.distcode[c&(1<<t.distbits)-1],h=f>>>24,y=f>>>16&255,v=f&65535,!(h<=m);){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}if((y&240)===0){for(w=h,M=y,$=v;f=t.distcode[$+((c&(1<<w+M)-1)>>w)],h=f>>>24,y=f>>>16&255,v=f&65535,!(w+h<=m);){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}c>>>=w,m-=w,t.back+=w}if(c>>>=h,m-=h,t.back+=h,y&64){e.msg="invalid distance code",t.mode=ce;break}t.offset=v,t.extra=y&15,t.mode=vo;case vo:if(t.extra){for(L=t.extra;m<L;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}t.offset+=c&(1<<t.extra)-1,c>>>=t.extra,m-=t.extra,t.back+=t.extra}if(t.offset>t.dmax){e.msg="invalid distance too far back",t.mode=ce;break}t.mode=wo;case wo:if(l===0)break e;if(d=p-l,t.offset>d){if(d=t.offset-d,d>t.whave&&t.sane){e.msg="invalid distance too far back",t.mode=ce;break}d>t.wnext?(d-=t.wnext,b=t.wsize-d):b=t.wnext-d,d>t.length&&(d=t.length),_=t.window}else _=i,b=r-t.offset,d=t.length;d>l&&(d=l),l-=d,t.length-=d;do i[r++]=_[b++];while(--d);t.length===0&&(t.mode=On);break;case ko:if(l===0)break e;i[r++]=t.length,l--,t.mode=On;break;case Ta:if(t.wrap){for(;m<32;){if(s===0)break e;s--,c|=a[o++]<<m,m+=8}if(p-=l,e.total_out+=p,t.total+=p,t.wrap&4&&p&&(e.adler=t.check=t.flags?fe(t.check,i,p,r-p):pn(t.check,i,p,r-p)),p=l,t.wrap&4&&(t.flags?c:Eo(c))!==t.check){e.msg="incorrect data check",t.mode=ce;break}c=0,m=0}t.mode=xo;case xo:if(t.wrap&&t.flags){for(;m<32;){if(s===0)break e;s--,c+=a[o++]<<m,m+=8}if(t.wrap&4&&c!==(t.total&4294967295)){e.msg="incorrect length check",t.mode=ce;break}c=0,m=0}t.mode=So;case So:z=1;break e;case ce:z=-3;break e;case Oa:return-4;case Xo:default:return-2}return e.next_out=r,e.avail_out=l,e.next_in=o,e.avail_in=s,t.hold=c,t.bits=m,(t.wsize||p!==e.avail_out&&t.mode<ce&&(t.mode<Ta||n!==4))&&Qo(e,e.output,e.next_out,p-e.avail_out)?(t.mode=Oa,-4):(u-=e.avail_in,p-=e.avail_out,e.total_in+=u,e.total_out+=p,t.total+=p,t.wrap&4&&p&&(e.adler=t.check=t.flags?fe(t.check,i,p,e.next_out-p):pn(t.check,i,p,e.next_out-p)),e.data_type=t.bits+(t.last?64:0)+(t.mode===st?128:0)+(t.mode===Rn||t.mode===za?256:0),(u===0&&p===0||n===4)&&z===0&&(z=-5),z)},Co=e=>{if(Zt(e))return-2;let n=e.state;return n.window&&(n.window=null),e.state=null,0};var Mo=(e,n)=>{let t=n.length,a,i,o;return Zt(e)||(a=e.state,a.wrap!==0&&a.mode!==Vn)?-2:a.mode===Vn&&(i=1,i=pn(i,n,t,0),i!==a.check)?-3:(o=Qo(e,n,t,t),o?(a.mode=Oa,-4):(a.havedict=1,0))},er=class{constructor(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}};var tr=e=>{let n=new Uint8Array(e.reduce((a,i)=>a+i.length,0)),t=0;for(let a of e)n.set(a,t),t+=a.length;return n},$o=Object.prototype.toString,Xl={level:-1,chunkSize:16384,windowBits:15,memLevel:8,strategy:0,raw:!1,gzip:!1,legacyHash:!1,dictionary:new Uint8Array(0)},Yl=class{constructor(e={}){F(this,"options");F(this,"err");F(this,"msg");F(this,"ended");F(this,"started");F(this,"chunks");F(this,"strm");F(this,"result");this.options=Object.assign({},Xl,e);let n=this.options;n.raw&&n.windowBits>0?n.windowBits=-n.windowBits:n.gzip&&n.windowBits>0&&n.windowBits<16&&(n.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.started=!1,this.chunks=[],this.result=new Uint8Array(0),this.strm=new er,this.strm.avail_out=0;let t=Ll(this.strm,n.level,8,n.windowBits,n.memLevel,n.strategy,n.legacyHash);if(t!==0)throw new Error(Mt[t]);$o.call(n.dictionary)==="[object ArrayBuffer]"&&(n.dictionary=new Uint8Array(n.dictionary));let a=n.dictionary;if(a.length){if(n.gzip)throw new Error("dictionary is not supported with gzip");if(t=jl(this.strm,a),t!==0)throw new Error(Mt[t])}}push(e,n=!1){let t=this.strm,a=this.options.chunkSize,i,o;if(this.ended)return!1;for(typeof n=="number"?o=n:o=n===!0?4:0,typeof e=="string"?t.input=new TextEncoder().encode(e):$o.call(e)==="[object ArrayBuffer]"?t.input=new Uint8Array(e):t.input=e,t.next_in=0,t.avail_in=t.input.length,this.started||(this.started=!0,this.onStart(t));;){if(t.avail_out===0&&(t.output=new Uint8Array(a),t.next_out=0,t.avail_out=a),(o===2||o===3)&&t.avail_out<=6){this.onData(t.output.subarray(0,t.next_out)),t.avail_out=0;continue}if(i=Nl(t,o),i===-2)break;if(i===1){t.next_out>0&&this.onData(t.output.subarray(0,t.next_out)),i=Al(this.strm);break}if(t.avail_out===0){this.onData(t.output);continue}if(o>0&&t.next_out>0){this.onData(t.output.subarray(0,t.next_out)),t.avail_out=0;continue}if(t.avail_in===0)return!0}return this.err=i,this.msg=t.msg||Mt[i],this.ended=!0,this.onEnd(i),i===0}onStart(e){}onData(e){this.chunks.push(e)}onEnd(e){e===0&&(this.result=tr(this.chunks)),this.chunks=[]}};function Gn(e,n={}){let t=new Yl(n);if(t.push(e,!0),t.err)throw new Error(t.msg);return t.result}function nr(e,n={}){return Gn(e,Object.assign({},n,{raw:!0}))}function fn(e,n={}){return Gn(e,Object.assign({},n,{gzip:!0}))}var zo=Object.prototype.toString,Ql={chunkSize:1024*64,windowBits:15,raw:!1,dictionary:new Uint8Array(0)},ec=class{constructor(e={}){F(this,"options");F(this,"err");F(this,"msg");F(this,"ended");F(this,"started");F(this,"chunks");F(this,"strm");F(this,"result");this.options=Object.assign({},Ql,e);let n=this.options;n.raw&&n.windowBits>=0&&n.windowBits<16&&(n.windowBits=-n.windowBits,n.windowBits===0&&(n.windowBits=-15)),n.windowBits>=0&&n.windowBits<16&&!e.windowBits&&(n.windowBits+=32),n.windowBits>15&&n.windowBits<48&&(n.windowBits&15)===0&&(n.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.started=!1,this.chunks=[],this.result=new Uint8Array(0),this.strm=new er,this.strm.avail_out=0;let t=Gl(this.strm,n.windowBits);if(t!==0)throw new Error(Mt[t]);zo.call(n.dictionary)==="[object ArrayBuffer]"&&(n.dictionary=new Uint8Array(n.dictionary));let a=n.dictionary;if(n.raw&&a.length&&(t=Mo(this.strm,a),t!==0))throw new Error(Mt[t])}push(e,n=!1){let t=this.strm,a=this.options.chunkSize,i,o,r;if(this.ended)return this.err===0;for(typeof n=="number"?o=n:o=n===!0?4:0,zo.call(e)==="[object ArrayBuffer]"?t.input=new Uint8Array(e):t.input=e,t.next_in=0,t.avail_in=t.input.length,this.started||(this.started=!0,this.onStart(t));;){if(t.avail_out===0&&(t.output=new Uint8Array(a),t.next_out=0,t.avail_out=a),i=Na(t,o),i===2){let s=this.options.dictionary;s.length&&(i=Mo(t,s),i===0?i=Na(t,o):i===-3&&(i=2))}for(;t.avail_in>0&&i===1&&t.state.wrap&2&&t.state.flags!==0&&t.input[t.next_in]!==0;)Yo(t),i=Na(t,o);if(i===-2||i===-3||i===2||i===-4)break;if(r=t.avail_out,t.next_out&&(t.avail_out===0||i===1||o>0)&&(this.onData(t.output.length===t.next_out?t.output:t.output.subarray(0,t.next_out)),t.avail_out=0,t.next_out=0),!((i===0||i===-5)&&r===0)){if(i===1){i=Co(this.strm);break}if(t.avail_in===0){if(o===4){i=Co(this.strm),i===0&&(i=-5);break}return!0}}}return this.err=i,this.msg=t.msg||Mt[i],this.ended=!0,this.onEnd(i),i===0}onStart(e){}onData(e){this.chunks.push(e)}onEnd(e){e===0&&(this.result=tr(this.chunks)),this.chunks=[]}};function $e(e,n={}){let t=new ec(n);if(t.push(e,!0),t.err)throw new Error(t.msg);let a=t.result;return n.toText?new TextDecoder().decode(a):a}function ar(e,n={}){return $e(e,St(xe({},n),{raw:!0}))}var qn=void 0;var Re=class{static getUnsignedInteger(n,t,a,i,o){let r;return o?r=(i&255)<<24|(a&255)<<16|(t&255)<<8|n&255:r=(n&255)<<24|(t&255)<<16|(a&255)<<8|i&255,r>>>0}static getUnsignedShort(n,t,a){return a?(t&255)<<8|n&255:(n&255)<<8|t&255}static getSignedInteger(n,t,a,i,o){let r;return o?r=(i&255)<<24|(a&255)<<16|(t&255)<<8|n&255:r=(n&255)<<24|(t&255)<<16|(a&255)<<8|i&255,r|0}};var Vt=class{constructor(){F(this,"ldbFileIndexes",[]);F(this,"logFileIndexes",[]);F(this,"filesByIndex",new Map);F(this,"deletedFileNumbers",new Set)}get totalFiles(){return this.ldbFileIndexes.length+this.logFileIndexes.length}initFromManifest(n,t,a,i,o,r,s){if(this.deletedFileNumbers.clear(),s)for(let l of s)this.deletedFileNumbers.add(l);this.ldbFileIndexes=[],this.filesByIndex.clear();for(let l of n)try{let c=parseInt(l.name);if(this.deletedFileNumbers.has(c))continue;let m=0,u,p;if(a&&i){for(let b=0;b<i.length;b++)if(i[b]===c){m=a[b],o&&(u=o[b]),r&&(p=r[b]);break}}let d={fileInfo:{index:c,file:l,isDeleted:!1,level:m},smallestKey:u,largestKey:p,isLoaded:!1,priority:1e3-m};this.ldbFileIndexes.push(d),this.filesByIndex.set(c,d)}catch(c){}this.ldbFileIndexes.sort((l,c)=>l.fileInfo.level===c.fileInfo.level?l.fileInfo.index-c.fileInfo.index:c.fileInfo.level-l.fileInfo.level),this.logFileIndexes=[];for(let l of t)this.logFileIndexes.push({file:l,name:l.name,isLoaded:!1});this.logFileIndexes.sort((l,c)=>l.name.localeCompare(c.name))}findPotentialFilesForKey(n){let t=[];for(let a of this.logFileIndexes)t.push(a);for(let a of this.ldbFileIndexes)a.smallestKey!==void 0&&a.largestKey!==void 0?n>=a.smallestKey&&n<=a.largestKey&&t.push(a):t.push(a);return t}};var nc=new Set(["__proto__","prototype","[[Prototype]]","this","delete","constructor","hasOwnProperty","isPrototypeOf","__defineGetter__","__defineSetter__","__lookupGetter__","__lookupSetter__"]),ye=class e{static isUsableAsObjectKey(n){return n==null?!1:!nc.has(n)}static readStringASCII(n,t,a){let i="",o=0;t=t||0;let r=!1;typeof a=="undefined"&&(r=!0,a=n.byteLength-n.byteOffset);let s;for(let l=0;l<a&&(s=n.getUint8(l+t),!(s===0&&r));l++)i+=String.fromCharCode(s),o++;return{str:i,byteLength:o+(r?1:0)}}static getAsciiString(n,t,a){return e.readStringASCII(n,t,a).str}static getAsciiStringFromUint8Array(n){let t="";for(let a=0;a<n.length;a++)t+=String.fromCharCode(n[a]);return t}};var ae=class{constructor(n,t){F(this,"fileBytes");F(this,"startIndex");F(this,"byteLength",0);F(this,"value",0);this.fileBytes=n,this.startIndex=t;let a=0;for(;this.fileBytes[this.startIndex+a]>=128&&this.startIndex+a<n.length;)a++;for(this.byteLength=a+1,this.value=this.fileBytes[this.startIndex+a];a>0;)this.value*=128,this.value+=this.fileBytes[this.startIndex+a-1]-128,a--}};var _t=class{constructor(){F(this,"fileBytes");F(this,"startIndex");F(this,"unsharedKeyBytes");F(this,"keyDelta");F(this,"value");F(this,"sharedKey");F(this,"sharedByteLength");F(this,"length");F(this,"previousKey");F(this,"keyCached");F(this,"fullBytesCached")}get unsharedKey(){if(this.unsharedKeyBytes===void 0)return;let n=new DataView(this.unsharedKeyBytes.buffer,this.unsharedKeyBytes.byteOffset,this.unsharedKeyBytes.byteLength);return ye.getAsciiString(n,0,n.byteLength)}get key(){if(this.keyCached)return this.keyCached;let n=this.previousKey,t="";n!==void 0&&(t=n.key.substring(0,this.sharedByteLength));let a=this.unsharedKey;return a!==void 0&&(t+=a),this.keyCached=t,t}get keyBytes(){if(!this.unsharedKeyBytes)return;if(this.fullBytesCached)return this.fullBytesCached;if(this.sharedByteLength===void 0||this.sharedByteLength===0)return this.unsharedKeyBytes;if(this.previousKey===void 0)throw new Error("Unexpected shared key without a previous");let n=this.previousKey.keyBytes;if(n===void 0)throw new Error("Unexpected shared key without previous bytes");let t=new Uint8Array(this.sharedByteLength+this.unsharedKeyBytes.length),a=this.sharedByteLength;for(let i=0;i<a;i++)t[i]=n[i];for(let i=0;i<this.unsharedKeyBytes.length;i++)t[i+a]=this.unsharedKeyBytes[i];return this.fullBytesCached=t,t}clearAllData(){this.value=void 0,this.fileBytes=void 0,this.unsharedKeyBytes=void 0,this.fullBytesCached=void 0,this.previousKey=void 0}loadFromLdb(n,t,a){this.startIndex=t;let i=0,o=new ae(n,t);this.sharedByteLength=o.value,i+=o.byteLength,this.sharedByteLength>0&&(this.previousKey=a);let r=new ae(n,t+i);i+=r.byteLength;let s=new ae(n,t+i);i+=s.byteLength,this.unsharedKeyBytes=n.slice(t+i,t+i+r.value-8),i+=r.value,this.value=n.slice(t+i,t+i+s.value),i+=s.value,this.length=i}};var _e,bt,Tt,Qe,gt,bn,gn,Z,hn,se,yn,Ga,ir,qa,_n=class _n{constructor(n,t,a,i,o){Ge(this,Z);F(this,"logger");F(this,"ldbFiles");F(this,"logFiles");F(this,"manifestFiles");F(this,"keys",new Map);F(this,"isInErrorState");F(this,"errorMessages");F(this,"comparator");F(this,"logNumber");F(this,"previousLogNumber");F(this,"nextFileNumber");F(this,"lastSequence");F(this,"compactPointerLevels");F(this,"compactPointerStrings");F(this,"deletedFileLevel");F(this,"deletedFileNumber");F(this,"newFileLevel");F(this,"newFileNumber");F(this,"newFileSize");F(this,"newFileSmallest");F(this,"newFileLargest");F(this,"context");Ge(this,_e);Ge(this,bt,!1);Ge(this,Tt,5e4);Ge(this,Qe,[]);Ge(this,gt,new Set);Ge(this,bn,!1);Ge(this,yn,new Map);this.ldbFiles=n,this.logFiles=t,this.manifestFiles=a,this.context=i,this.logger=o!=null?o:{log:r=>console.log(`[LevelDb] ${r}`),verbose:r=>console.debug(`[LevelDb] ${r}`),error:r=>console.error(`[LevelDb] ${r}`),assert:console.assert}}get isLazyMode(){return Y(this,bt)}get index(){return Y(this,_e)}get keysInMemoryCount(){return this.keys.size}async init(n){var r,s,l,c,m,u,p,d,b;this.keys=new Map,this.isInErrorState=!1,this.errorMessages=void 0;let t=(r=n==null?void 0:n.unloadFilesAfterParse)!=null?r:!1;for(let _=0;_<this.manifestFiles.length;_++){let f=this.manifestFiles[_].content;f instanceof Uint8Array&&f.length>0&&(this.parseManifestContent(f,this.manifestFiles[_].storageRelativePath),(l=(s=this.logger).log)==null||l.call(s,"Loaded map manifest file '"+this.manifestFiles[_].fullPath+"'.")),t&&this.manifestFiles[_].unload()}let a=[];for(let _=0;_<this.ldbFiles.length;_++){let f=this.ldbFiles[_];try{let h=parseInt(f.name);if(!this.deletedFileNumber||!this.deletedFileNumber.includes(h)){let y=0;if(this.newFileLevel&&this.newFileNumber&&((m=(c=this.logger).assert)==null||m.call(c,this.newFileLevel.length===this.newFileNumber.length),this.newFileLevel.length===this.newFileNumber.length))for(let v=0;v<this.newFileNumber.length;v++)this.newFileNumber[v]===h&&(y=this.newFileLevel[v]);a.push({index:h,file:f,isDeleted:!1,level:y})}}catch(h){G(this,Z,se).call(this,`Error including LDB file: ${f.fullPath} Error: ${h}`)}}let i=a.sort((_,f)=>_.level===f.level?_.index-f.index:f.level-_.level);for(let _=0;_<i.length;_++){let f=i[_].file,h=f.content;if(h instanceof Uint8Array&&h.length>0){let y=this.parseLdbContent(h,f.storageRelativePath);(p=(u=this.logger).log)==null||p.call(u,"Loaded map record file '"+f.fullPath+"'. Records: "+y)}t&&f.unload(),_%Y(_n,gn)===0&&_>0&&await new Promise(y=>setTimeout(y,0))}let o=this.logFiles.sort((_,f)=>_.name.localeCompare(f.name));for(let _=0;_<o.length;_++){let f=o[_].content;if(f instanceof Uint8Array&&f.length>0){let h=this.parseLogContent(f,o[_].storageRelativePath);(b=(d=this.logger).log)==null||b.call(d,"Loaded map latest-updates file '"+o[_].fullPath+"'. Records: "+h)}t&&o[_].unload(),_%Y(_n,gn)===0&&_>0&&await new Promise(h=>setTimeout(h,0))}}async initLazy(n){var t;this.keys=new Map,this.isInErrorState=!1,this.errorMessages=void 0,pt(this,bt,!0),pt(this,Tt,(t=n==null?void 0:n.maxKeysInMemory)!=null?t:5e4),pt(this,Qe,[]),pt(this,gt,new Set);for(let a=0;a<this.manifestFiles.length;a++){let i=this.manifestFiles[a].content;i instanceof Uint8Array&&i.length>0&&this.parseManifestContent(i,this.manifestFiles[a].storageRelativePath),this.manifestFiles[a].unload()}pt(this,_e,new Vt),Y(this,_e).initFromManifest(this.ldbFiles,this.logFiles,this.newFileLevel,this.newFileNumber,this.newFileSmallest,this.newFileLargest,this.deletedFileNumber),pt(this,bn,!0)}async loadAllFiles(n){var r;if(!Y(this,bn)||!Y(this,_e))throw new Error("LevelDb must be initialized before loading files");let t=(r=n==null?void 0:n.unloadFilesAfterParse)!=null?r:!0,a=10,i=0,o=Y(this,_e).totalFiles;for(let s=0;s<Y(this,_e).ldbFileIndexes.length;s++){let l=Y(this,_e).ldbFileIndexes[s],c=l.fileInfo.file,m=c.content;m instanceof Uint8Array&&m.length>0&&this.parseLdbContent(m,c.storageRelativePath),l.isLoaded=!0,t&&c.unload(),i++,n!=null&&n.progressCallback&&i%5===0&&n.progressCallback("Summarizing all world files",i,o),s%a===0&&s>0&&await new Promise(u=>setTimeout(u,0))}for(let s=0;s<Y(this,_e).logFileIndexes.length;s++){let l=Y(this,_e).logFileIndexes[s],c=l.file,m=c.content;m instanceof Uint8Array&&m.length>0&&this.parseLogContent(m,c.storageRelativePath),l.isLoaded=!0,t&&c.unload(),i++,n!=null&&n.progressCallback&&n.progressCallback("Loading LOG files",i,o),s%a===0&&s>0&&await new Promise(u=>setTimeout(u,0))}return this.keys.size}async loadFile(n){let t="name"in n,a=t?n.file:n.fileInfo.file,i=a.content,o=0;return i instanceof Uint8Array&&i.length>0&&(t?o=this.parseLogContent(i,a.storageRelativePath)||0:o=this.parseLdbContent(i,a.storageRelativePath)||0),n.isLoaded=!0,a.unload(),o}async parseIncrementalFile(n){let t=[],a=new Set;n.isContentLoaded&&n.unload();let i=n.content;if(!(i instanceof Uint8Array)||i.length===0)return t;let o=n.name.toLowerCase().endsWith(".log"),r=n.storageRelativePath||n.fullPath,s=Y(this,yn).get(r)||0,l=i.length;if(o&&l<=s)return n.unload(),t;let c=new Map;for(let[m,u]of this.keys)c.set(m,u);if(o){this.parseLogContent(i,n.storageRelativePath),Y(this,yn).set(r,l);for(let[m,u]of this.keys)!u||typeof u=="boolean"||c.get(m)===u||G(this,Z,Ga).call(this,m,a,t)}else{this.parseLdbContent(i,n.storageRelativePath);for(let[m,u]of this.keys)!u||c.get(m)===u||G(this,Z,Ga).call(this,m,a,t)}return n.unload(),o&&!this.logFiles.includes(n)?this.logFiles.push(n):!o&&!this.ldbFiles.includes(n)&&this.ldbFiles.push(n),t}async getKey(n){if(this.keys.has(n))return G(this,Z,qa).call(this,n),this.keys.get(n);if(!Y(this,bt)||!Y(this,_e))return;let t=Y(this,_e).findPotentialFilesForKey(n);for(let a of t)if(!a.isLoaded&&(await this.loadFile(a),this.keys.has(n)))return G(this,Z,qa).call(this,n),this.keys.get(n)}clearLoadedKeys(){for(let[,n]of this.keys)n&&typeof n!="boolean"&&n.clearAllData();if(this.keys.clear(),pt(this,Qe,[]),Y(this,gt).clear(),Y(this,_e)){for(let n of Y(this,_e).ldbFileIndexes)n.isLoaded=!1;for(let n of Y(this,_e).logFileIndexes)n.isLoaded=!1}}parseLdbContent(n,t,a){let i=0;if(n.length<=8||n[n.length-8]!==87||n[n.length-7]!==251||n[n.length-6]!==128||n[n.length-5]!==139||n[n.length-4]!==36||n[n.length-3]!==117||n[n.length-2]!==71||n[n.length-1]!==219){G(this,Z,se).call(this,"Unexpected bytes in LDB file. File seems unreadable.",t);return}let o=n.length-48,r=new ae(n,o);o+=r.byteLength;let s=new ae(n,o);o+=s.byteLength;let l=new ae(n,o);o+=l.byteLength;let c=new ae(n,o);if(l.value<=0||l.value+c.value>=n.length)return G(this,Z,se).call(this,"LDB content index offset not within bounds.",t),!1;if(r.value<=0||r.value+s.value>=n.length)return G(this,Z,se).call(this,"LDB meta index offset not within bounds.",t),!1;let m=n.subarray(l.value,l.value+c.value),u;if(u=G(this,Z,hn).call(this,m,!0),u||(u=G(this,Z,hn).call(this,m,!1)),u||(u=m),u){let p={};if(!this.parseIndexBytes(u,0,u.length,p,t))return!1;for(let d in p){let b=p[d];if(b&&b.value){let _=b.value,f=0,h=new ae(_,f);f+=h.byteLength;let y=new ae(_,f);if(f+=y.byteLength,h.value<0||h.value+y.value>=n.length){G(this,Z,se).call(this,"Block offset does not appear correct",t);return}if(f!==_.length){G(this,Z,se).call(this,"Index byte index is not correct",t);return}let v=n.subarray(h.value,h.value+y.value),w;w=G(this,Z,hn).call(this,v,!0),w||(w=G(this,Z,hn).call(this,v,!1)),w||(w=v),i+=this.parseLdbBlockBytes(w,0,w.length,t,a)}else G(this,Z,se).call(this,"Could not find index key.",t)}}return i===0&&G(this,Z,se).call(this,"No keys found in LDB.",t),i}parseIndexBytes(n,t,a,i,o){let r=t,s,c=Re.getUnsignedInteger(n[a-4],n[a-3],n[a-2],n[a-1],!0)*4+4;for(;r<t+a-c;){let m=new _t;m.loadFromLdb(n,r,s);let u=m.key;if(s=m,ye.isUsableAsObjectKey(u)&&(i[u]=m),m.length===void 0)return G(this,Z,se).call(this,"Unexpected parse of level key value "+u,o),!1;r+=m.length}return!0}parseLdbBlockBytes(n,t,a,i,o){let r=t,s=0,l,m=Re.getUnsignedInteger(n[a-4],n[a-3],n[a-2],n[a-1],!0)*4+4;if(m>t+a)return G(this,Z,se).call(this,"Unexpected size received for LDB bytes. File could be corrupt.",i),0;for(;r<t+a-m;){let u=new _t;u.loadFromLdb(n,r,l);let p=u.key;if(l=u,ye.isUsableAsObjectKey(p))if(o){let d=u.keyBytes;d&&o.visitor({ordinal:o.ordinal++,key:p,keyBytes:d,value:o.options.includeValues?u.value:void 0,sourceKind:o.sourceKind,sourcePath:o.sourcePath})}else this.keys.set(p,u);if(u.length===void 0||u.length<0)throw new Error(G(this,Z,se).call(this,"Unexpected parse of key "+p,i));s++,r+=u.length}return s}parseLogContent(n,t,a){let i=0,o,r=0;for(;i<n.length-6;){let s=Re.getUnsignedShort(n[i+4],n[i+5],!0),l=n[i+6];if(i+=7,l===1)r+=this.addValueFromLog(n,i,s,t,a);else if(l===2)o=new Uint8Array(n.buffer,i,s);else if(l===3||l===4)if(o!==void 0){let m=new Uint8Array(n.buffer,i,s),u=new Uint8Array(o.byteLength+m.byteLength);u.set(o),u.set(m,o.byteLength),o=u,l===4&&(r+=this.addValueFromLog(o,0,o.length,t,a))}else{G(this,Z,se).call(this,"Unexpected middle to a set of bytes found within LevelDB content. File seems unreadable.",t);return}else{G(this,Z,se).call(this,"Unexpected type for log file. File seems unreadable.",t);return}i+=s;let c=32768-i%32768;for(;c<=6&&c>0;)c--,n[i]!==0&&G(this,Z,se).call(this,"Unexpectedly found a padding trailer with data",t),i++}return r<=0&&G(this,Z,se).call(this,"Did not find any keys in log file",t),r}addValueFromLog(n,t,a,i,o){let r=t;t+=12;let s=0;for(;t<=r+a-5;){let l=n[t];t++;let c=new ae(n,t);t+=c.byteLength;let m=new Uint8Array(c.value);for(let u=0;u<c.value;u++)m[u]=n[t+u];if(t+=c.value,t>n.length&&G(this,Z,se).call(this,"Unexpected log file length issue.",i),t<=n.length){let u=ye.getAsciiStringFromUint8Array(m);if(u===void 0&&G(this,Z,se).call(this,"Unexpected empty key in a log file. File could be unreadable.",i),s++,l){t>=n.length&&G(this,Z,se).call(this,"Unexpectedly leftover content in a log file. File could be unreadable.",i);let p=new ae(n,t);if(t+=p.byteLength,p.value+t<=n.buffer.byteLength){let d=t;if(t+=p.value,ye.isUsableAsObjectKey(u))if(o){let b;o.options.includeValues&&(b=n.slice(d,d+p.value)),o.visitor({ordinal:o.ordinal++,key:u,keyBytes:m,value:o.options.includeValues?b:void 0,sourceKind:o.sourceKind,sourcePath:o.sourcePath})}else{let b=n.slice(d,d+p.value),_=new _t;_.sharedKey="",_.keyDelta=u,_.unsharedKeyBytes=m,_.value=b,this.keys.set(u,_)}}}else ye.isUsableAsObjectKey(u)&&(o?o.options.includeDeleted&&o.visitor({ordinal:o.ordinal++,key:u,keyBytes:m,isDeleted:!0,sourceKind:o.sourceKind,sourcePath:o.sourcePath}):this.keys.set(u,!1))}}return s}parseManifestContent(n,t){let a=0,i;for(this.comparator=void 0,this.logNumber=void 0,this.nextFileNumber=void 0,this.lastSequence=void 0,this.compactPointerLevels=void 0,this.compactPointerStrings=void 0,this.deletedFileLevel=void 0,this.deletedFileNumber=void 0,this.newFileLevel=void 0,this.newFileNumber=void 0,this.newFileSize=void 0,this.newFileSmallest=void 0,this.newFileLargest=void 0;a<n.length-6;){let o=Re.getUnsignedShort(n[a+4],n[a+5],!0),r=n[a+6];if(a+=7,r===1)this.addValueFromManifest(n,a,o);else if(r===2)i=new Uint8Array(n.buffer,a,o);else if(r===3||r===4)if(i!==void 0){let l=new Uint8Array(n.buffer,a,o),c=new Uint8Array(i.byteLength+l.byteLength);c.set(i),c.set(l,i.byteLength),i=c,r===4&&this.addValueFromManifest(i,0,i.length)}else{G(this,Z,se).call(this,"Unexpected middle to a set of bytes found within a manifest file. File could be unreadable.",t);return}else{G(this,Z,se).call(this,"Unexpected type for manifest file. File could be unreadable.",t);return}a+=o;let s=32768-a%32768;for(;s<=6&&s>0;)s--,n[a]!==0&&G(this,Z,se).call(this,"Unexpectedly found a padding trailer with data in a manifest file.",t),a++}}addValueFromManifest(n,t,a,i){let o=t;for(;t<o+a;){let r=new ae(n,t);switch(t+=r.byteLength,r.value){case 1:let s=new ae(n,t);t+=s.byteLength;let l=new Uint8Array(s.value);for(let S=0;S<s.value;S++)l[S]=n[t+S];t+=s.value,t>n.length&&G(this,Z,se).call(this,"Unexpected manifest file length issue.",i),this.comparator=ye.getAsciiStringFromUint8Array(l),this.comparator===void 0&&G(this,Z,se).call(this,"Unexpected comparator.",i);break;case 2:let c=new ae(n,t);t+=c.byteLength,this.logNumber=c.value;break;case 3:let m=new ae(n,t);t+=m.byteLength,this.nextFileNumber=m.value;break;case 4:let u=new ae(n,t);t+=u.byteLength,this.lastSequence=u.value;break;case 5:this.compactPointerLevels===void 0&&(this.compactPointerLevels=[]),this.compactPointerStrings===void 0&&(this.compactPointerStrings=[]);let p=new ae(n,t);t+=p.byteLength,this.compactPointerLevels.push(p.value);let d=new ae(n,t);t+=d.byteLength;let b=new Uint8Array(d.value);for(let S=0;S<d.value;S++)b[S]=n[t+S];t+=d.value,t>n.length&&G(this,Z,se).call(this,"Unexpected manifest file length issue at compact pointer.",i),this.compactPointerStrings.push(ye.getAsciiStringFromUint8Array(b)),this.compactPointerStrings[this.compactPointerStrings.length-1]===void 0&&G(this,Z,se).call(this,"Unexpected compact pointer string.",i);break;case 6:this.deletedFileLevel===void 0&&(this.deletedFileLevel=[]),this.deletedFileNumber===void 0&&(this.deletedFileNumber=[]);let _=new ae(n,t);t+=_.byteLength,this.deletedFileLevel.push(_.value);let f=new ae(n,t);t+=f.byteLength,this.deletedFileNumber.push(f.value);break;case 7:this.newFileLargest===void 0&&(this.newFileLargest=[]),this.newFileLevel===void 0&&(this.newFileLevel=[]),this.newFileNumber===void 0&&(this.newFileNumber=[]),this.newFileSmallest===void 0&&(this.newFileSmallest=[]),this.newFileSize===void 0&&(this.newFileSize=[]);let h=new ae(n,t);t+=h.byteLength,this.newFileLevel.push(h.value);let y=new ae(n,t);t+=y.byteLength,this.newFileNumber.push(y.value);let v=new ae(n,t);t+=v.byteLength,this.newFileSize.push(v.value);let w=new ae(n,t);t+=w.byteLength;let M=new Uint8Array(w.value);for(let S=0;S<w.value;S++)M[S]=n[t+S];t+=w.value,t>n.length&&G(this,Z,se).call(this,"Unexpected manifest file length issue at new file smallest.",i),this.newFileSmallest.push(ye.getAsciiStringFromUint8Array(M)),this.newFileSmallest[this.newFileSmallest.length-1]===void 0&&G(this,Z,se).call(this,"Unexpected file smallest tag string.",i);let $=new ae(n,t);t+=$.byteLength;let B=new Uint8Array($.value);for(let S=0;S<$.value;S++)B[S]=n[t+S];t+=$.value,t>n.length&&G(this,Z,se).call(this,"Unexpected manifest file length issue at new file largest.",i),this.newFileLargest.push(ye.getAsciiStringFromUint8Array(B)),this.newFileLargest[this.newFileLargest.length-1]===void 0&&G(this,Z,se).call(this,"Unexpected file largest tag string.",i);break;case 9:let z=new ae(n,t);t+=z.byteLength,this.previousLogNumber=z.value;break;default:G(this,Z,se).call(this,"Unexpected manifest item: "+r.value,i)}}}};_e=new WeakMap,bt=new WeakMap,Tt=new WeakMap,Qe=new WeakMap,gt=new WeakMap,bn=new WeakMap,gn=new WeakMap,Z=new WeakSet,hn=function(n,t){if(qn)try{let a=t?qn.inflateRawSync(n):qn.inflateSync(n);return new Uint8Array(a.buffer,a.byteOffset,a.byteLength)}catch(a){}try{return $e(n,{raw:t})}catch(a){return}},se=function(n,t){var i,o;this.isInErrorState=!0,this.errorMessages===void 0&&(this.errorMessages=[]);let a;return t?a=this.context?this.context+"-"+t:t:a=this.context,(o=(i=this.logger).error)==null||o.call(i,n+(a?" "+a:"")),this.errorMessages.push({message:n,context:a}),n},yn=new WeakMap,Ga=function(n,t,a){if(n.length<9||n.length>14||n.startsWith("AutonomousEntities")||n.startsWith("schedulerWT")||n.startsWith("Overworld")||n.startsWith("BiomeData")||n.startsWith("digp")||n.startsWith("actorprefix")||n.startsWith("player")||n.startsWith("portals"))return!1;let i=n.length>=13,o=Re.getSignedInteger(n.charCodeAt(0),n.charCodeAt(1),n.charCodeAt(2),n.charCodeAt(3),!0),r=Re.getSignedInteger(n.charCodeAt(4),n.charCodeAt(5),n.charCodeAt(6),n.charCodeAt(7),!0),s=0;if(i&&(s=Re.getSignedInteger(n.charCodeAt(8),n.charCodeAt(9),n.charCodeAt(10),n.charCodeAt(11),!0),s<0||s>2))return!1;let l=`${s}_${o}_${r}`;return t.has(l)?!1:(t.add(l),a.push({x:o,z:r,dimension:s}),!0)},ir=function(){if(!Y(this,bt)||this.keys.size<=Y(this,Tt))return;let n=this.keys.size-Math.floor(Y(this,Tt)*.8);for(let t=0;t<n&&Y(this,Qe).length>0;t++){let a=Y(this,Qe).shift();if(a&&Y(this,gt).has(a)){let i=this.keys.get(a);i&&typeof i!="boolean"&&i.clearAllData(),this.keys.delete(a),Y(this,gt).delete(a)}}},qa=function(n){if(!Y(this,bt))return;let t=Y(this,Qe).indexOf(n);t>=0&&Y(this,Qe).splice(t,1),Y(this,Qe).push(n),Y(this,gt).add(n),this.keys.size>Y(this,Tt)&&G(this,Z,ir).call(this)},Ge(_n,gn,10);var Jt=_n;function ac(e){return e.startsWith("MANIFEST")||e.endsWith(".ldb")||e.endsWith(".log")}async function Xn(e,n){let t=await vn(e,n);return await t.init({unloadFilesAfterParse:!0}),new Map(Array.from(t.keys.entries()).filter(([,i])=>i))}async function vn(e,n){let t=await Promise.all(e.filter(r=>ac(r.name)).map(async r=>({content:new Uint8Array(await r.arrayBuffer()),name:r.name,storageRelativePath:r.name,fullPath:r.name,isContentLoaded:!0,unload(){this.content=null,this.isContentLoaded=!1}}))),a=[],i=[],o=[];return t.forEach(r=>{r.name.startsWith("MANIFEST")?o.push(r):r.name.endsWith(".ldb")?i.push(r):r.name.endsWith(".log")&&a.push(r)}),new Jt(i,a,o,"LlamaStructureReader",n)}function me(e,n=0,t=!0){let a=n,i=new DataView(e.buffer,e.byteOffset,e.byteLength),o=()=>{let _=i.getUint16(a,t);return a+=2,_},r=()=>{let _=i.getInt32(a,t);return a+=4,_},s=()=>{let _=i.getFloat32(a,t);return a+=4,_},l=()=>{let _=i.getFloat64(a,t);return a+=8,_},c=()=>{let _=i.getBigInt64(a,t);return a+=8,_},m=()=>{let _=o(),f=new TextDecoder("utf-8",{fatal:!1}).decode(e.subarray(a,a+_));return a+=_,f};function u(_){switch(_){case 1:return{t:_,v:i.getInt8(a++)};case 2:{let f=i.getInt16(a,t);return a+=2,{t:_,v:f}}case 3:return{t:_,v:r()};case 4:return{t:_,v:c()};case 5:return{t:_,v:s()};case 6:return{t:_,v:l()};case 7:{let f=r(),h=e.subarray(a,a+f);return a+=f,{t:_,v:Array.from(h)}}case 8:return{t:_,v:m()};case 9:{let f=i.getUint8(a++),h=r(),y=[];for(let v=0;v<h;v++)y.push(u(f));return{t:9,et:f,v:y}}case 10:{let f={};for(;;){let h=i.getUint8(a++);if(h===0)break;let y=m();f[y]=u(h)}return{t:10,v:f}}case 11:{let f=r(),h=[];for(let y=0;y<f;y++)h.push(r());return{t:_,v:h}}case 12:{let f=r(),h=[];for(let y=0;y<f;y++)h.push(Number(c()));return{t:_,v:h}}default:throw new Error("\u672A\u77E5 NBT \u7C7B\u578B "+_+" @"+(a-1))}}let p=i.getUint8(a++),d=m(),b=u(p);return{root:{type:p,name:d,value:b.v},end:a,consumed:a-n}}function Xa(e){if(e===void 0)return;let n=e.v!==void 0?e.v:e;switch(e.t){case 4:return Number(n);case 7:return n;case 9:return n.map(t=>t&&t.t!==void 0?Xa(t):t);case 10:{let t={};for(let a in n)t[a]=Xa(n[a]);return t}default:return n}}function Ee(e){return Xa({t:e.root.type,v:e.root.value})}function Kt(e,n=!0){let t=null;for(let a of[0,8])try{let i=me(e,a,n);if(i.root.type===10&&(t=i,a===8))return i}catch(i){}if(t)return t;throw new Error("\u65E0\u6CD5\u89E3\u6790 NBT")}var ic=new TextEncoder;function Be(e,n=!0){let t=[],a=4096,i=new Uint8Array(a),o=0,r=_=>{if(o+_<=a)return;for(;o+_>a;)a*=2;let f=new Uint8Array(a);f.set(i.subarray(0,o)),i=f},s=_=>{r(1),i[o++]=_&255},l=_=>{r(2),new DataView(i.buffer).setInt16(o,_,n),o+=2},c=_=>{r(4),new DataView(i.buffer).setInt32(o,_,n),o+=4},m=_=>{r(8),new DataView(i.buffer).setBigInt64(o,BigInt(_),n),o+=8},u=_=>{r(4),new DataView(i.buffer).setFloat32(o,_,n),o+=4},p=_=>{r(8),new DataView(i.buffer).setFloat64(o,_,n),o+=8},d=_=>{let f=ic.encode(String(_));l(f.length),r(f.length),i.set(f,o),o+=f.length};function b(_){let{t:f,v:h}=_;switch(f){case 1:s(h);break;case 2:l(h);break;case 3:c(h);break;case 4:m(h);break;case 5:u(h);break;case 6:p(h);break;case 7:{let y=h instanceof Uint8Array?h:Uint8Array.from(h);c(y.length),r(y.length),i.set(y,o),o+=y.length;break}case 8:d(h);break;case 9:{s(_.et),c(h.length);for(let y of h)b(y);break}case 10:{for(let y in h){let v=h[y];s(v.t),d(y),b(v)}s(0);break}case 11:{c(h.length);for(let y of h)c(y);break}case 12:{c(h.length);for(let y of h)m(y);break}default:throw new Error("\u65E0\u6CD5\u5E8F\u5217\u5316 NBT \u7C7B\u578B "+f)}}return s(e.root.type),d(e.root.name||""),b({t:e.root.type,v:e.root.value}),i.subarray(0,o)}function or(e,n){let t=Be(n,!0),a=new Uint8Array(8+t.length);return a.set(e.subarray(0,4),0),new DataView(a.buffer).setUint32(4,t.length,!0),a.set(t,8),a}function Yn(e,n=2){let t=new DataView(e.buffer,e.byteOffset,e.byteLength),a=t.getUint8(0),i=t.getUint8(1),o=2,r=0;a>=9&&(r=t.getInt8(2),o=3);let s=[];for(let l=0;l<i&&!(o>=e.length);l++){let c=t.getUint8(o++),m=c>>1;if((c&1)!==0){s.push({bits:m,palette:[],indices:null,skipped:!0});continue}if(m===0){s.push({bits:0,palette:[],indices:null,solid:!0});continue}let d=32-(m===3||m===5||m===6?n:0),b=Math.ceil(4096*m/d),_=new Uint32Array(b);for(let w=0;w<b;w++)_[w]=t.getUint32(o+w*4,!0);o+=b*4;let f=t.getInt32(o,!0);o+=4;let h=[];for(let w=0;w<f;w++){let M=me(e,o,!0),$=M.root.value;h.push({name:$.name?String($.name.v):"unknown",states:$.states&&$.states.v?$.states.v:{}}),o=M.end}let y=(1<<m)-1,v=new Uint16Array(4096);for(let w=0;w<4096;w++){let M=w*m,$=M/d|0,B=M-$*d,z=_[$]>>>B&y;B+m>d&&$+1<b&&(z=(_[$]>>>B|_[$+1]<<d-B)&y),v[w]=z}s.push({bits:m,palette:h,indices:v})}return{version:a,layerCount:i,yIndex:r,layers:s,bytesRead:o}}var oc=47,rc=49,sc=43,lc=44;function cc(e){return e.keyBytes||new Uint8Array}async function Qn(e,n,t){let a=[],i=new Map,o=new Map,r=new Map,s=0,l=0,c=0,m=[],u=[],p=null,d=null,b=[];for(let[y,v]of e){let w=cc(v);if(a.push(y),y.startsWith("actorprefix")){try{let M=Ee(me(v.value,0,!0));m.push({type:String(M.identifier||M.Identifier||"unknown"),pos:M.Pos||null,raw:M})}catch(M){m.push({type:"unknown",error:M.message})}continue}if(y==="~local_player"){try{p=Ee(me(v.value,0,!0))}catch(M){p={error:M.message}}continue}if(w.length>=9){let M=new DataView(w.buffer,w.byteOffset,w.byteLength).getInt32(0,!0),$=new DataView(w.buffer,w.byteOffset,w.byteLength).getInt32(4,!0),B=w[8],z=M+","+$;if(B===oc&&w.length===10){let S=w[9]>127?w[9]-256:w[9],T=Yn(v.value,2);s++,T.layers.forEach((L,D)=>{if(!(!L.palette||L.palette.length===0)){if(L.solid){L.palette=[{name:"minecraft:unknown"}];return}if(L.indices)for(let U=0;U<4096;U++){let H=L.palette[L.indices[U]];H&&(D===0?(l++,o.set(H.name,(o.get(H.name)||0)+1)):(c++,r.set(H.name,(r.get(H.name)||0)+1)))}}}),i.set(z,(i.get(z)||0)+1)}else if(B===rc)try{let S=Ee(me(v.value,0,!0));u.push({id:String(S.id||"unknown"),pos:[S.x,S.y,S.z]})}catch(S){u.push({id:"unknown"})}else B!==sc&&B!==lc&&B!==54&&B!==63&&B!==64&&B!==65&&B===119&&b.push(z)}}if(t)try{d=Ee(Kt(t,!0))}catch(y){d={error:y.message}}let _=[...o.entries()].map(([y,v])=>({name:y,count:v})).sort((y,v)=>v.count-y.count),f={};for(let y of m)f[y.type]=(f[y.type]||0)+1;let h={};for(let y of u)h[y.id]=(h[y.id]||0)+1;return n.keys=a.length,n.chunks=i.size,n.subchunks=s,n.blocks=l,n.blockTypes=_.length,n.blockList=_,n.extraLayer=[...r.entries()].map(([y,v])=>({name:y,count:v})).sort((y,v)=>v.count-y.count),n.extraLayerBlocks=c,n.entities=m.length,n.entitiesByType=f,n.entityList=m.slice(0,400).map(y=>({type:y.type,pos:y.pos?y.pos.map(v=>Math.round(v)):null})),n.blockEntities=u.length,n.blockEntityList=u.slice(0,2e3),n.blockEntitiesByType=h,n.player=dc(p),n.level=mc(d),n.levelRaw=d,n}function mc(e){if(!e)return null;let n=e.flatWorldLayers||null;return{levelName:e.LevelName,version:e.InventoryVersion||e.lastOpenedWithVersion,gameType:e.GameType,difficulty:e.Difficulty,hardcore:e.IsHardcore,seed:e.RandomSeed,spawn:e.SpawnX+", "+e.SpawnY+", "+e.SpawnZ,time:e.Time,currentTick:e.currentTick,cheats:e.cheatsEnabled,keepInventory:e.keepInventory,commandsEnabled:e.commandsEnabled,generator:e.Generator,storageVersion:e.StorageVersion,limited:e.limitedWorldWidth?e.limitedWorldWidth+"\xD7"+e.limitedWorldDepth:null,flatPreset:n?(()=>{var t;try{return((t=JSON.parse(n))==null?void 0:t.biome_id)!==void 0?"\u81EA\u5B9A\u4E49":"\u6709"}catch(a){return"\u6709"}})():null,achievements:e.hasBeenLoadedInCreative}}function dc(e){if(!e)return null;let n=[],t=e.Inventory&&Array.isArray(e.Inventory)?e.Inventory:[];for(let a of t)a&&a.Name&&n.push({name:a.Name,count:a.Count,slot:a.Slot});return{pos:e.Pos?e.Pos.map(a=>Math.round(a*100)/100):null,dimension:e.DimensionId,gameType:e.PlayerGameMode,xp:e.XPLevel,health:e.Health,inventory:n}}var rr={"minecraft:air":"\u7A7A\u6C14","minecraft:stone":"\u77F3\u5934","minecraft:deepslate":"\u6DF1\u677F\u5CA9","minecraft:water":"\u6C34","minecraft:lava":"\u5CA9\u6D46","minecraft:bedrock":"\u57FA\u5CA9","minecraft:dirt":"\u6CE5\u571F","minecraft:grass_block":"\u8349\u65B9\u5757","minecraft:sand":"\u6C99\u5B50","minecraft:gravel":"\u7802\u783E","minecraft:tuff":"\u51DD\u7070\u5CA9","minecraft:sulfur":"\u786B\u78FA","minecraft:cinnabar":"\u6731\u7802","minecraft:granite":"\u82B1\u5C97\u5CA9","minecraft:diorite":"\u95EA\u957F\u5CA9","minecraft:andesite":"\u5B89\u5C71\u5CA9","minecraft:iron_ore":"\u94C1\u77FF\u77F3","minecraft:coal_ore":"\u7164\u77FF\u77F3","minecraft:copper_ore":"\u94DC\u77FF\u77F3","minecraft:gold_ore":"\u91D1\u77FF\u77F3","minecraft:diamond_ore":"\u94BB\u77F3\u77FF\u77F3","minecraft:redstone_ore":"\u7EA2\u77F3\u77FF\u77F3","minecraft:lapis_ore":"\u9752\u91D1\u77F3\u77FF\u77F3","minecraft:emerald_ore":"\u7EFF\u5B9D\u77F3\u77FF\u77F3","minecraft:deepslate_iron_ore":"\u6DF1\u5C42\u94C1\u77FF\u77F3","minecraft:deepslate_coal_ore":"\u6DF1\u5C42\u7164\u77FF\u77F3","minecraft:deepslate_copper_ore":"\u6DF1\u5C42\u94DC\u77FF\u77F3","minecraft:deepslate_gold_ore":"\u6DF1\u5C42\u91D1\u77FF\u77F3","minecraft:deepslate_diamond_ore":"\u6DF1\u5C42\u94BB\u77F3\u77FF\u77F3","minecraft:deepslate_redstone_ore":"\u6DF1\u5C42\u7EA2\u77F3\u77FF\u77F3","minecraft:deepslate_lapis_ore":"\u6DF1\u5C42\u9752\u91D1\u77F3\u77FF\u77F3","minecraft:deepslate_emerald_ore":"\u6DF1\u5C42\u7EFF\u5B9D\u77F3\u77FF\u77F3","minecraft:chest":"\u7BB1\u5B50","minecraft:mob_spawner":"\u5237\u602A\u7B3C","minecraft:trial_spawner":"\u8BD5\u70BC\u5237\u602A\u7B3C","minecraft:vault":"\u5B9D\u5E93","minecraft:dispenser":"\u53D1\u5C04\u5668","minecraft:barrel":"\u6728\u6876","minecraft:hopper":"\u6F0F\u6597","minecraft:bed":"\u5E8A","minecraft:amethyst_block":"\u7D2B\u6C34\u6676\u5757","minecraft:obsidian":"\u9ED1\u66DC\u77F3","minecraft:glow_lichen":"\u53D1\u5149\u5730\u8863","minecraft:budding_amethyst":"\u7D2B\u6C34\u6676\u6BCD\u5CA9","minecraft:sulfur_spike":"\u786B\u78FA\u5C16\u9525","minecraft:potent_sulfur":"\u6D53\u7F29\u786B\u78FA","minecraft:crafting_table":"\u5DE5\u4F5C\u53F0","minecraft:torch":"\u706B\u628A","minecraft:acacia_planks":"\u91D1\u5408\u6B22\u6728\u677F","minecraft:acacia_log":"\u91D1\u5408\u6B22\u539F\u6728","minecraft:acacia_stairs":"\u91D1\u5408\u6B22\u697C\u68AF","minecraft:acacia_slab":"\u91D1\u5408\u6B22\u53F0\u9636","minecraft:acacia_fence":"\u91D1\u5408\u6B22\u6805\u680F","minecraft:wheat":"\u5C0F\u9EA6","minecraft:carrots":"\u80E1\u841D\u535C","minecraft:potatoes":"\u9A6C\u94C3\u85AF","minecraft:beetroot":"\u751C\u83DC","minecraft:melon_stem":"\u897F\u74DC\u830E","minecraft:short_grass":"\u77EE\u8349","minecraft:tall_grass":"\u9AD8\u8349","minecraft:oak_leaves":"\u6A61\u6728\u6811\u53F6","minecraft:acacia_leaves":"\u91D1\u5408\u6B22\u6811\u53F6","minecraft:raw_iron_block":"\u7C97\u94C1\u5757","minecraft:decorated_pot":"\u9970\u7EB9\u9676\u7F50"};function be(e){let n=new DataView(e.buffer,e.byteOffset,e.byteLength),t=e.length,a=-1;for(let d=t-22;d>=Math.max(0,t-65558);d--)if(n.getUint32(d,!0)===101010256){a=d;break}if(a<0)throw new Error("\u4E0D\u662F\u6709\u6548\u7684 ZIP\uFF08\u627E\u4E0D\u5230\u4E2D\u592E\u76EE\u5F55\uFF09");let i=n.getUint16(a+10,!0),o=n.getUint32(a+16,!0),r=[],s=o,l=new TextDecoder("utf-8"),c="\xC7\xFC\xE9\xE2\xE4\xE0\xE5\xE7\xEA\xEB\xE8\xEF\xEE\xEC\xC4\xC5\xC9\xE6\xC6\xF4\xF6\xF2\xFB\xF9\xFF\xD6\xDC\xA2\xA3\xA5\u20A7\u0192\xE1\xED\xF3\xFA\xF1\xD1\xAA\xBA\xBF\u2310\xAC\xBD\xBC\xA1\xAB\xBB\u2591\u2592\u2593\u2502\u2524\u2561\u2562\u2556\u2555\u2563\u2551\u2557\u255D\u255C\u255B\u2510\u2514\u2534\u252C\u251C\u2500\u253C\u255E\u255F\u255A\u2554\u2569\u2566\u2560\u2550\u256C\u2567\u2568\u2564\u2565\u2559\u2558\u2552\u2553\u256B\u256A\u2518\u250C\u2588\u2584\u258C\u2590\u2580\u03B1\xDF\u0393\u03C0\u03A3\u03C3\xB5\u03C4\u03A6\u0398\u03A9\u03B4\u221E\u03C6\u03B5\u2229\u2261\xB1\u2265\u2264\u2320\u2321\xF7\u2248\xB0\u2219\xB7\u221A\u207F\xB2\u25A0\xA0";function m(d,b){if(b&2048)return l.decode(d);let _="";for(let f of d)_+=f<128?String.fromCharCode(f):c[f-128]||"?";return _}for(let d=0;d<i&&!(s+46>t||n.getUint32(s,!0)!==33639248);d++){let b=n.getUint16(s+8,!0),_=n.getUint16(s+10,!0),f=n.getUint32(s+20,!0),h=n.getUint32(s+24,!0),y=n.getUint16(s+28,!0),v=n.getUint16(s+30,!0),w=n.getUint16(s+32,!0),M=n.getUint32(s+42,!0),$=e.subarray(s+46,s+46+y);r.push({name:m($,b),method:_,csize:f,usize:h,localOffset:M,flags:b}),s+=46+y+v+w}function u(d){if(n.getUint32(d.localOffset,!0)!==67324752)throw new Error("ZIP \u672C\u5730\u5934\u635F\u574F\uFF1A"+d.name);let b=n.getUint16(d.localOffset+26,!0),_=n.getUint16(d.localOffset+28,!0),f=d.localOffset+30+b+_,h=Math.min(e.length,f+(d.csize||d.usize));return e.subarray(f,h)}function p(d){if(d.usize>268435456)throw new Error("\u538B\u7F29\u6761\u76EE\u89E3\u538B\u540E\u8D85\u8FC7 256MB\uFF0C\u5DF2\u963B\u6B62\uFF1A"+d.name);let _=u(d);if(d.method===0)return _;if(d.method===8)try{let f=ar(_);if(f.length>268435456)throw new Error("\u89E3\u538B\u7ED3\u679C\u8D85\u8FC7 256MB");return f}catch(f){throw new Error("\u89E3\u538B\u5931\u8D25\uFF08"+d.name+"\uFF09\uFF1A"+f.message)}throw new Error("\u4E0D\u652F\u6301\u7684\u538B\u7F29\u65B9\u5F0F "+d.method)}return{entries:r,names:r.map(d=>d.name),find:d=>r.find(b=>b.name===d),findEndsWith:d=>r.find(b=>b.name.endsWith(d)),read:p,levelDbFiles(){let d=/(^|\/)(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/,b=[];for(let _ of r){let f=_.name.split("/").pop();if(!d.test(_.name)||!f)continue;let h=p(_);b.push({name:f,arrayBuffer:async()=>h})}return b}}}var uc=(()=>{let e=new Uint32Array(256);for(let n=0;n<256;n++){let t=n;for(let a=0;a<8;a++)t=t&1?3988292384^t>>>1:t>>>1;e[n]=t>>>0}return e})();function pc(e){let n=4294967295;for(let t=0;t<e.length;t++)n=uc[(n^e[t])&255]^n>>>8;return(n^4294967295)>>>0}function ze(e,{deflate:n=!0}={}){if(!Array.isArray(e))throw new Error("buildZip \u9700\u8981 [{name,data}] \u6570\u7EC4");if(e.length>65535)throw new Error("ZIP \u6761\u76EE\u8D85\u8FC7 65535\uFF0C\u6682\u4E0D\u652F\u6301");let t=[],a=0,i=[],o=new TextEncoder;for(let p of e){let d=p.data instanceof Uint8Array?p.data:new Uint8Array(p.data),b=o.encode(p.name||p.path),_=pc(d),f=d;if(n&&d.length>64)try{f=fc(d),f.length>=d.length&&(f=d)}catch(w){f=d}if(a>4294967294)throw new Error("ZIP \u8D85\u8FC7 4GB");let h=f===d?0:8,y=new Uint8Array(30+b.length),v=new DataView(y.buffer);v.setUint32(0,67324752,!0),v.setUint16(4,20,!0),v.setUint16(6,2048,!0),v.setUint16(8,h,!0),v.setUint16(10,0,!0),v.setUint16(12,33,!0),v.setUint32(14,_,!0),v.setUint32(18,f.length,!0),v.setUint32(22,d.length,!0),v.setUint16(26,b.length,!0),v.setUint16(28,0,!0),y.set(b,30),t.push(y,f),i.push({nameBytes:b,crc:_,compLen:f.length,size:d.length,method:h,offset:a}),a+=y.length+f.length}let r=a;for(let p of i){let d=new Uint8Array(46+p.nameBytes.length),b=new DataView(d.buffer);b.setUint32(0,33639248,!0),b.setUint16(4,20,!0),b.setUint16(6,20,!0),b.setUint16(8,2048,!0),b.setUint16(10,p.method,!0),b.setUint16(12,0,!0),b.setUint16(14,33,!0),b.setUint32(16,p.crc,!0),b.setUint32(20,p.compLen,!0),b.setUint32(24,p.size,!0),b.setUint16(28,p.nameBytes.length,!0),b.setUint32(42,p.offset,!0),d.set(p.nameBytes,46),t.push(d),a+=d.length}let s=new Uint8Array(22),l=new DataView(s.buffer);l.setUint32(0,101010256,!0),l.setUint16(8,i.length,!0),l.setUint16(10,i.length,!0),l.setUint32(12,a-r,!0),l.setUint32(16,r,!0),t.push(s);let c=t.reduce((p,d)=>p+d.length,0),m=new Uint8Array(c),u=0;for(let p of t)m.set(p,u),u+=p.length;return m}function fc(e){try{let n=nr(e);return n.length<e.length?n:e}catch(n){return e}}var lr=[125,39,37,177,160,82,112,38],ea=256,sr=247;function Ya(e){if(e.length<16)return!1;for(let n=0;n<8;n++)if(e[n]!==lr[n])return!1;return!0}function ta(e){if(!Ya(e))throw new Error("\u4E0D\u662F\u6709\u6548\u7684 .brarchive \u6587\u4EF6");let n=new DataView(e.buffer,e.byteOffset,e.byteLength),t=n.getUint32(8,!0),a=n.getUint32(12,!0);if(t>2e5)throw new Error("\u6761\u76EE\u6570\u5F02\u5E38\uFF1A"+t);let i=16,o=i+t*ea,r=[],s=new TextDecoder("utf-8");for(let l=0;l<t;l++){let c=i+l*ea,m=e[c],u=s.decode(e.subarray(c+1,c+1+m)),p=n.getUint32(c+248,!0),d=n.getUint32(c+252,!0);r.push({name:u,offset:p,length:d,data:e.subarray(o+p,o+p+d)})}return{version:a,entries:r}}function cr(e){let n=e.length,t=16+n*ea,a=0;for(let l of e)a+=l.data.length;let i=new Uint8Array(t+a),o=new DataView(i.buffer);for(let l=0;l<8;l++)i[l]=lr[l];o.setUint32(8,n,!0),o.setUint32(12,1,!0);let r=new TextEncoder,s=0;for(let l=0;l<n;l++){let c=e[l],m=16+l*ea,u=r.encode(c.name||c.path);u.length>sr&&(u=u.subarray(0,sr)),i[m]=u.length,i.set(u,m+1),o.setUint32(m+248,s,!0),o.setUint32(m+252,c.data.length,!0),i.set(c.data,t+s),s+=c.data.length}return i}var hc=/\.(mcpack|mcaddon|mcworld|mctemplate|zip|mcskin|mceditpack)$/i;function Gt(e,n){return Ya(n)||/\.brarchive$/i.test(e)?"brarchive":n.length>4&&n[0]===80&&n[1]===75||hc.test(e)?"zip":/\.mcstructure$/i.test(e)?"mcstructure":/\.(dat|ldb|log|sst|nbt)$/i.test(e)?"nbt":"unknown"}var Oe=class e{constructor(n,t){this.kind=n,this.files=t.map(a=>({path:wn(a.path||a.name),data:a.data}))}static fromBytes(n,t){let a=Gt(n,t);if(a==="brarchive"){let i=ta(t);return new e("brarchive",i.entries.map(o=>({path:o.name,data:o.data})))}if(a==="zip"){let i=be(t);return new e("zip",i.entries.filter(o=>!o.name.endsWith("/")).map(o=>({path:o.name,data:i.read(o)})))}throw new Error("\u8FD9\u4E2A\u6587\u4EF6\u4E0D\u662F\u538B\u7F29\u5305\u683C\u5F0F\uFF08.mcpack/.mcaddon/.mcworld/.brarchive\uFF09")}paths(){return this.files.map(n=>n.path)}get(n){return this.files.find(t=>t.path===n)}getBytes(n){let t=this.get(n);if(!t)throw new Error("\u6587\u4EF6\u4E0D\u5B58\u5728\uFF1A"+n);return t.data}getText(n){return new TextDecoder("utf-8").decode(this.getBytes(n))}setBytes(n,t){n=wn(n);let a=this.get(n);a?a.data=t:this.files.push({path:n,data:t})}remove(n){n=wn(n);let t=n+"/";this.files=this.files.filter(a=>a.path!==n&&!a.path.startsWith(t))}rename(n,t,a){if(n=wn(n),t=wn(t),a){let i=n+"/";for(let o of this.files)o.path.startsWith(i)&&(o.path=t+"/"+o.path.slice(i.length))}else{let i=this.get(n);i&&(i.path=t,i.data=i.data)}}tree(){let n=[],t=new Set;for(let a of this.files){let i=a.path.split("/");for(let o=1;o<i.length;o++){let r=i.slice(0,o).join("/");t.has(r)||(t.add(r),n.push({type:"dir",path:r,name:i[o-1],depth:o-1}))}n.push({type:"file",path:a.path,name:i[i.length-1],depth:i.length-1,size:a.data.length})}return n}toBytes(){return this.kind==="brarchive"?cr(this.files):ze(this.files)}};function wn(e){return String(e).replace(/\\/g,"/").replace(/^\/+/,"")}var _c=/\.(json|js|ts|mjs|cjs|mcfunction|txt|md|xml|html|css|lang|material|vertex|fragment|glsl|yaml|yml|toml|ini|cfg|properties|bat|sh|py|ni)$/i;function na(e,n){if(_c.test(e))return!0;if(n&&n.length>2*1024*1024)return!1;let t=Math.min(n.length,4096);for(let a=0;a<t;a++)if(n[a]===0)return!1;try{new TextDecoder("utf-8",{fatal:!0}).decode(n.subarray(0,Math.min(n.length,65536)))}catch(a){return!1}return!0}function Qa(e){let n=Kt(e),t=Ee(n);return{nbt:n,plain:t}}function mr(e){var n,t,a,i,o,r,s,l;return{levelName:(n=e.LevelName)!=null?n:"",gameType:(t=e.GameType)!=null?t:0,difficulty:(a=e.Difficulty)!=null?a:2,hardcore:!!e.hardcore,cheats:!!e.commandsEnabled,keepInventory:!!e.keepInventory,spawnX:(i=e.SpawnX)!=null?i:0,spawnY:(o=e.SpawnY)!=null?o:0,spawnZ:(r=e.SpawnZ)!=null?r:0,time:Number((s=e.Time)!=null?s:0),seed:String((l=e.RandomSeed)!=null?l:"0")}}function dr(e,n){let t=e.root.value,a=(i,o,r)=>{t[i]={t:o,v:r}};if("levelName"in n&&a("LevelName",8,String(n.levelName)),"gameType"in n&&a("GameType",3,Number(n.gameType)),"difficulty"in n&&a("Difficulty",3,Number(n.difficulty)),"hardcore"in n&&a("hardcore",1,n.hardcore?1:0),"cheats"in n&&a("commandsEnabled",1,n.cheats?1:0),"keepInventory"in n&&a("keepInventory",1,n.keepInventory?1:0),"spawnX"in n&&a("SpawnX",3,Number(n.spawnX)),"spawnY"in n&&a("SpawnY",3,Number(n.spawnY)),"spawnZ"in n&&a("SpawnZ",3,Number(n.spawnZ)),"time"in n&&a("Time",4,BigInt(Math.round(Number(n.time)))),"seed"in n)try{a("RandomSeed",4,BigInt(String(n.seed).trim()))}catch(i){throw new Error("\u79CD\u5B50\u5FC5\u987B\u662F\u6574\u6570")}return e}function ei(e,n){return or(e,n)}function ti(e){var p;let n=me(e,0,!0);if(n.root.type!==10)throw new Error("\u7ED3\u6784\u6587\u4EF6\u6839\u6807\u7B7E\u4E0D\u662F Compound");let t=Ee(n),a=t.size||t.Size||[0,0,0],i=t.structure||{},r=(i.palette&&i.palette.default||{}).block_palette||[],s=i.block_indices||[],l=i.entities||[],c=new Map,m=0,u=s[0]||[];for(let d of u){if(d<0)continue;let b=r[d];if(!b){m++;continue}c.set(b.name,(c.get(b.name)||0)+1)}return{nbt:n,size:a,palette:r,indices:s,entities:l,counts:c,bad:m,formatVersion:(p=t.format_version)!=null?p:null,blockCount:u.filter(d=>d>=0).length,plain:t}}function ur(e){let n=[...e.counts.entries()].sort((t,a)=>a[1]-t[1]);return{size:`${e.size[0]} \xD7 ${e.size[1]} \xD7 ${e.size[2]}`,formatVersion:e.formatVersion,paletteTypes:e.palette.length,blocks:e.blockCount,layers:e.indices.length,entities:e.entities.length,top:n.slice(0,100)}}function ni(e){let n=new Map,t=e.indices[0]||[];for(let a of t){if(a<0)continue;let i=e.palette[a];i&&n.set(i.name,(n.get(i.name)||0)+1)}return n}function pr(e,n,t){let a=0;for(let o of e.palette)o.name===n&&(o.name=t,a++);let i=e.nbt.root.value.structure.v.palette.v.default.v.block_palette.v;for(let o of i){let r=o.v&&o.v.name;r&&r.v===n&&(r.v=t)}return e.counts=ni(e),a}function ai(e){return Be(e.nbt,!0)}function ii(e,n,t,a,i){let[o,r,s]=e.size;if(n<0||t<0||a<0||n>=o||t>=r||a>=s)throw new Error(`\u5750\u6807\u8D85\u51FA\u8303\u56F4\uFF1A\u5C3A\u5BF8 ${o}\xD7${r}\xD7${s}`);let l=e.palette.findIndex(p=>p.name===i&&JSON.stringify(p.states||{})==="{}");if(l<0){e.palette.push({name:i,states:{},version:1}),l=e.palette.length-1,e.nbt.root.value.structure.v.palette.v.default.v.block_palette.v.push({t:10,v:{name:{t:8,v:i},states:{t:10,v:{}},version:{t:3,v:1}}});let d=e.nbt.root.value.structure.v.palette.v.default.v.block_palette;d.t=9,d.et=10}let c=e.indices[0]||[],m=(n*s+a)*r+t;e.indices[0]||(e.indices[0]=new Array(o*r*s).fill(-1)),e.indices[0][m]=l;let u=e.nbt.root.value.structure.v.block_indices.v[0];return u&&(u.v[m]=l),e.counts=ni(e),m}function fr(e,n,t,a){let[i,o,r]=e.size,s=(n*r+a)*o+t;e.indices[0][s]=-1;let l=e.nbt.root.value.structure.v.block_indices.v[0];return l&&(l.v[s]=-1),e.counts=ni(e),s}function aa(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function hr(e){let n=String(e).toLowerCase().match(/\.([a-z0-9]+)$/),t=n?n[1]:"";return t==="json"||t==="mcmeta"?"json":t==="js"||t==="mjs"||t==="ts"||t==="cjs"?"js":t==="py"?"py":t==="lua"?"lua":t==="mcfunction"?"mcfunction":t==="xml"||t==="html"||t==="svg"?"xml":t==="css"?"css":t==="lang"||t==="properties"||t==="ini"?"ini":"plain"}var ip=String.raw,bc={json:[[/\/\/[^\n]*|\/\*[\s\S]*?\*\//y,"com"],[/"(\\.|[^"\\])*"(?=\s*:)/y,"key"],[/"(\\.|[^"\\])*"/y,"str"],[/\b(true|false|null)\b/y,"kw"],[/-?\d+(\.\d+)?(e[+-]?\d+)?/iy,"num"]],js:[[/\/\/[^\n]*|\/\*[\s\S]*?\*\//y,"com"],[/`(\\.|[^`\\])*`|"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/y,"str"],[/\b(import|from|export|const|let|var|function|return|if|else|for|while|class|new|await|async|typeof|of|in)\b/y,"kw"],[/\b(true|false|null|undefined)\b/y,"kw"],[/-?\d+(\.\d+)?/y,"num"]],py:[[/#[^\n]*/y,"com"],[/"""[\s\S]*?"""|'''[\s\S]*?'''|"(\\.|[^"])*"|'(\\.|[^'])*'/y,"str"],[/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|True|False|None|print|lambda|with|as)\b/y,"kw"],[/-?\d+(\.\d+)?/y,"num"]],lua:[[/--[^\n]*/y,"com"],[/"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/y,"str"],[/\b(local|function|end|if|then|else|elseif|for|while|return|print|nil|true|false|pairs|ipairs)\b/y,"kw"],[/-?\d+(\.\d+)?/y,"num"]],mcfunction:[[/#[^\n]*/y,"com"],[/^[a-z_]+/my,"kw"],[/~?-?\d+(\.\d+)?/y,"num"],[/@[apesr]/y,"key"],[/"[^"\n]*"/y,"str"]],xml:[[/<!--[\s\S]*?-->/y,"com"],[/<\/?[A-Za-z0-9:_-]+/y,"key"],[/[A-Za-z0-9:_-]+(?==)/y,"kw"],[/"[^"\n]*"/y,"str"]],css:[[/\/\*[\s\S]*?\*\//y,"com"],[/[.#]?[A-Za-z0-9_-]+(?=\s*\{)/y,"key"],[/\b[a-z-]+(?=\s*:)/y,"kw"],[/"[^"\n]*"|'[^'\n]*'/y,"str"],[/-?\d+(\.\d+)?(px|em|rem|%|vh|vw)?/y,"num"]],ini:[[/^[#;][^\n]*/my,"com"],[/^[^=\n]+(?==)/my,"key"],[/=[^\n]*/y,"str"]],plain:[]};function _r(e,n){let t=bc[n]||[],a=120*1024,i=12e3,o=90;if(!t.length||e.length>a)return aa(e);let r="",s=0,l=0,c=Date.now(),m=u=>{r+=aa(e.slice(s,s+u)),s+=u};for(;s<e.length;){if(l>i||Date.now()-c>o)return aa(e);let u=!1;for(let[p,d]of t){p.lastIndex=s;let b;try{b=p.exec(e)}catch(_){continue}if(b&&b.index===s&&b[0].length>0){r+='<span class="hl-'+d+'">'+aa(b[0])+"</span>",s+=b[0].length,l++,u=!0;break}}u||m(1)}return r}function br(){let e=new Uint8Array(16);if(globalThis.crypto&&crypto.getRandomValues)crypto.getRandomValues(e);else for(let t=0;t<16;t++)e[t]=Math.floor(Math.random()*256);e[6]=e[6]&15|64,e[8]=e[8]&63|128;let n=[...e].map(t=>t.toString(16).padStart(2,"0")).join("");return n.slice(0,8)+"-"+n.slice(8,12)+"-"+n.slice(12,16)+"-"+n.slice(16,20)+"-"+n.slice(20)}async function gr(e=4e3){let n=["https://www.uuidgenerator.net/api/version4","https://api.uuid4.org"];for(let t of n)try{let a=new AbortController,i=setTimeout(()=>a.abort(),e),o=await fetch(t,{signal:a.signal});if(clearTimeout(i),!o.ok)continue;let s=(await o.text()).trim().match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);if(s)return s[0]}catch(a){}return null}function yr(e){let n=e.split(",")[1]||"",t=atob(n),a=new Uint8Array(t.length);for(let i=0;i<t.length;i++)a[i]=t.charCodeAt(i);return a}function gc(e){let n=2166136261;for(let t of e)n^=t.charCodeAt(0),n=Math.imul(n,16777619);return Math.abs(n)}function yc(e,n,t){let a=document.createElement("canvas");a.width=a.height=n;let i=a.getContext("2d"),o=gc(e+t+n),r=o%360;if(t==="entity"){let s=n/4;i.fillStyle=`hsl(${r},55%,52%)`,i.fillRect(s*.8,s*.8,s*2.4,s*2.4),i.fillStyle=`hsl(${r},60%,38%)`,i.fillRect(s*.8,s*.8,s*2.4,s*.4),i.fillStyle="#111",i.fillRect(s*1.2,s*1.4,s*.35,s*.35),i.fillRect(s*2,s*1.4,s*.35,s*.35)}else{i.fillStyle=`hsl(${r},50%,45%)`,i.fillRect(0,0,n,n);let s=n/8;for(let l=0;l<8;l++)for(let c=0;c<8;c++)(c*7+l*13+o)%5===0&&(i.fillStyle=`hsla(${r},40%,${30+(o+c*l)%35}%,0.9)`,i.fillRect(c*s,l*s,s,s));i.strokeStyle=`hsl(${r},45%,25%)`,i.lineWidth=Math.max(1,n/32),i.strokeRect(0,0,n,n)}return yr(a.toDataURL("image/png"))}async function vr(e,n,t,a){let i=`${e}, minecraft ${t} texture, pixel art, ${n}x${n}, game asset`,o="https://image.pollinations.ai/prompt/"+encodeURIComponent(i)+`?width=${n}&height=${n}&nologo=true&seed=${a}`;try{let r=new AbortController,s=setTimeout(()=>r.abort(),12e3),l=await fetch(o,{signal:r.signal});if(clearTimeout(s),!l.ok)throw new Error("HTTP "+l.status);let c=await l.blob(),m=await createImageBitmap(c),u=document.createElement("canvas");u.width=u.height=n;let p=u.getContext("2d");return t==="entity"&&p.clearRect(0,0,n,n),p.imageSmoothingEnabled=!1,p.drawImage(m,0,0,n,n),{data:yr(u.toDataURL("image/png")),source:"api"}}catch(r){return{data:yc(e,n,t),source:"local"}}}var wr={Stone:"\u77F3\u5934",Granite:"\u82B1\u5C97\u5CA9",Diorite:"\u95EA\u957F\u5CA9",Andesite:"\u5B89\u5C71\u5CA9",Deepslate:"\u6DF1\u677F\u5CA9",Cobblestone:"\u5706\u77F3",Dirt:"\u6CE5\u571F","Grass Block":"\u8349\u65B9\u5757",Grass:"\u8349\u65B9\u5757",Sand:"\u6C99\u5B50",Sandstone:"\u7802\u5CA9",Gravel:"\u7802\u783E",Clay:"\u9ECF\u571F",Bedrock:"\u57FA\u5CA9",Obsidian:"\u9ED1\u66DC\u77F3",Water:"\u6C34",Lava:"\u7194\u5CA9",Ice:"\u51B0","Packed Ice":"\u6D6E\u51B0",Snow:"\u96EA","Snow Layer":"\u96EA\u5C42","Coal Ore":"\u7164\u77FF\u77F3","Iron Ore":"\u94C1\u77FF\u77F3","Copper Ore":"\u94DC\u77FF\u77F3","Gold Ore":"\u91D1\u77FF\u77F3","Diamond Ore":"\u94BB\u77F3\u77FF\u77F3","Emerald Ore":"\u7EFF\u5B9D\u77F3\u77FF\u77F3","Redstone Ore":"\u7EA2\u77F3\u77FF\u77F3","Lapis Lazuli Ore":"\u9752\u91D1\u77F3\u77FF\u77F3","Nether Quartz Ore":"\u4E0B\u754C\u77F3\u82F1\u77FF\u77F3","Deepslate Iron Ore":"\u6DF1\u5C42\u94C1\u77FF\u77F3","Deepslate Gold Ore":"\u6DF1\u5C42\u91D1\u77FF\u77F3","Deepslate Diamond Ore":"\u6DF1\u5C42\u94BB\u77F3\u77FF\u77F3","Deepslate Coal Ore":"\u6DF1\u5C42\u7164\u77FF\u77F3","Deepslate Copper Ore":"\u6DF1\u5C42\u94DC\u77FF\u77F3","Deepslate Emerald Ore":"\u6DF1\u5C42\u7EFF\u5B9D\u77F3\u77FF\u77F3","Deepslate Redstone Ore":"\u6DF1\u5C42\u7EA2\u77F3\u77FF\u77F3",Tuff:"\u51DD\u7070\u5CA9",Calcite:"\u65B9\u89E3\u77F3",Sulfur:"\u786B\u78FA",Cinnabar:"\u6731\u7802",Basalt:"\u7384\u6B66\u5CA9",Blackstone:"\u9ED1\u77F3","Soul Sand":"\u7075\u9B42\u6C99","Soul Soil":"\u7075\u9B42\u571F","Magma Block":"\u5CA9\u6D46\u5757",Netherrack:"\u4E0B\u754C\u5CA9",Glowstone:"\u8367\u77F3","End Stone":"\u672B\u5730\u77F3","Purpur Block":"\u7D2B\u73C0\u5757","Oak Planks":"\u6A61\u6728\u6728\u677F","Spruce Planks":"\u4E91\u6749\u6728\u677F","Birch Planks":"\u767D\u6866\u6728\u677F","Jungle Planks":"\u4E1B\u6797\u6728\u677F","Acacia Planks":"\u91D1\u5408\u6B22\u6728\u677F","Dark Oak Planks":"\u6DF1\u8272\u6A61\u6728\u6728\u677F","Mangrove Planks":"\u7EA2\u6811\u6728\u677F","Cherry Planks":"\u6A31\u82B1\u6728\u677F","Crimson Planks":"\u7EEF\u7EA2\u6728\u677F","Warped Planks":"\u8BE1\u5F02\u6728\u677F","Oak Log":"\u6A61\u6728\u539F\u6728","Spruce Log":"\u4E91\u6749\u539F\u6728","Birch Log":"\u767D\u6866\u539F\u6728","Oak Leaves":"\u6A61\u6811\u6811\u53F6","Spruce Leaves":"\u4E91\u6749\u6811\u53F6","Birch Leaves":"\u767D\u6866\u6811\u53F6",Glass:"\u73BB\u7483","Glass Pane":"\u73BB\u7483\u677F","Stained Glass":"\u67D3\u8272\u73BB\u7483",Wool:"\u7F8A\u6BDB",Bricks:"\u7816\u5757","Stone Bricks":"\u77F3\u7816","Mossy Stone Bricks":"\u82D4\u77F3\u7816","Mud Bricks":"\u6CE5\u7816","Quartz Block":"\u77F3\u82F1\u5757","Smooth Quartz":"\u5E73\u6ED1\u77F3\u82F1","Chiseled Quartz":"\u96D5\u7EB9\u77F3\u82F1",Prismarine:"\u6D77\u6676\u77F3","Prismarine Bricks":"\u6D77\u6676\u77F3\u7816","Dark Prismarine":"\u6697\u6D77\u6676\u77F3","Sea Lantern":"\u6D77\u6676\u706F",Sponge:"\u6D77\u7EF5","Wet Sponge":"\u6E7F\u6D77\u7EF5","Coral Block":"\u73CA\u745A\u5757",Bookshelf:"\u4E66\u67B6","Crafting Table":"\u5DE5\u4F5C\u53F0",Furnace:"\u7194\u7089","Blast Furnace":"\u9AD8\u7089",Smoker:"\u70DF\u718F\u7089",Anvil:"\u94C1\u7827","Enchanting Table":"\u9644\u9B54\u53F0","Brewing Stand":"\u917F\u9020\u53F0",Cauldron:"\u70BC\u836F\u9505",Chest:"\u7BB1\u5B50",Barrel:"\u6728\u6876","Ender Chest":"\u672B\u5F71\u7BB1","Trapped Chest":"\u9677\u9631\u7BB1","Shulker Box":"\u6F5C\u5F71\u76D2",Hopper:"\u6F0F\u6597",Dispenser:"\u53D1\u5C04\u5668",Dropper:"\u6295\u63B7\u5668",Piston:"\u6D3B\u585E","Sticky Piston":"\u9ECF\u6027\u6D3B\u585E",Observer:"\u4FA6\u6D4B\u5668","Note Block":"\u97F3\u7B26\u76D2",Jukebox:"\u5531\u7247\u673A",Lever:"\u62C9\u6746",Button:"\u6309\u94AE","Pressure Plate":"\u538B\u529B\u677F","Redstone Torch":"\u7EA2\u77F3\u706B\u628A","Redstone Lamp":"\u7EA2\u77F3\u706F","Redstone Repeater":"\u7EA2\u77F3\u4E2D\u7EE7\u5668","Redstone Comparator":"\u7EA2\u77F3\u6BD4\u8F83\u5668",Rail:"\u94C1\u8F68","Powered Rail":"\u52A8\u529B\u94C1\u8F68","Detector Rail":"\u63A2\u6D4B\u94C1\u8F68","Activator Rail":"\u6FC0\u6D3B\u94C1\u8F68",Minecart:"\u77FF\u8F66",Torch:"\u706B\u628A",Lantern:"\u706F\u7B3C","Soul Lantern":"\u7075\u9B42\u706F\u7B3C",Campfire:"\u8425\u706B","Soul Campfire":"\u7075\u9B42\u8425\u706B",Candle:"\u8721\u70DB",Ladder:"\u68AF\u5B50",Scaffolding:"\u811A\u624B\u67B6",Door:"\u95E8",Trapdoor:"\u6D3B\u677F\u95E8",Fence:"\u6805\u680F","Fence Gate":"\u6805\u680F\u95E8",Bed:"\u5E8A",Carpet:"\u5730\u6BEF",Banner:"\u65D7\u5E1C",Sign:"\u544A\u793A\u724C","Flower Pot":"\u82B1\u76C6","Mob Spawner":"\u5237\u602A\u7B3C",Spawner:"\u5237\u602A\u7B3C","Trial Spawner":"\u8BD5\u70BC\u5237\u602A\u7B3C",Vault:"\u5B9D\u5E93","Decorated Pot":"\u9970\u7EB9\u9676\u7F50","Brushable Block":"\u53EF\u7591\u65B9\u5757","Potent Sulfur Block":"\u6D53\u7F29\u786B\u78FA\u5757",Beacon:"\u4FE1\u6807",Conduit:"\u6F6E\u6D8C\u6838\u5FC3",Bell:"\u949F",Composter:"\u5806\u80A5\u6876",Stonecutter:"\u5207\u77F3\u673A",Grindstone:"\u7802\u8F6E",Loom:"\u7EC7\u5E03\u673A","Cartography Table":"\u5236\u56FE\u53F0","Fletching Table":"\u5236\u7BAD\u53F0","Smithing Table":"\u953B\u9020\u53F0",Lectern:"\u8BB2\u53F0","Honey Block":"\u8702\u871C\u5757","Slime Block":"\u9ECF\u6DB2\u5757","Honeycomb Block":"\u871C\u813E\u5757","Nether Portal":"\u4E0B\u754C\u4F20\u9001\u95E8","End Portal":"\u672B\u5730\u4F20\u9001\u95E8","End Portal Frame":"\u672B\u5730\u4F20\u9001\u95E8\u6846\u67B6","Chorus Flower":"\u7D2B\u9882\u82B1","Chorus Plant":"\u7D2B\u9882\u690D\u682A",Bamboo:"\u7AF9\u5B50","Sugar Cane":"\u7518\u8517",Cactus:"\u4ED9\u4EBA\u638C",Pumpkin:"\u5357\u74DC",Melon:"\u897F\u74DC","Hay Block":"\u5E72\u8349\u5757","Dirt Path":"\u571F\u5F84",Farmland:"\u8015\u5730",Podzol:"\u7070\u5316\u571F",Mycelium:"\u83CC\u4E1D\u4F53","Red Sand":"\u7EA2\u6C99","Red Sandstone":"\u7EA2\u7802\u5CA9",Mud:"\u6CE5\u5DF4","Moss Block":"\u82D4\u85D3\u5757","Mushroom Stem":"\u8611\u83C7\u67C4","Brown Mushroom Block":"\u68D5\u8272\u8611\u83C7\u5757","Red Mushroom Block":"\u7EA2\u8272\u8611\u83C7\u5757",Cobweb:"\u8718\u86DB\u7F51",Fire:"\u706B",Air:"\u7A7A\u6C14",Unknown:"\u672A\u77E5",Book:"\u4E66","Book and Quill":"\u4E66\u4E0E\u7B14","Written Book":"\u6210\u4E66",Paper:"\u7EB8",Map:"\u5730\u56FE",Compass:"\u6307\u5357\u9488",Clock:"\u65F6\u949F","Recovery Compass":"\u8FFD\u6EAF\u6307\u5357\u9488","Echo Shard":"\u56DE\u54CD\u788E\u7247",Stick:"\u6728\u68CD",Bowl:"\u7897",Bucket:"\u6876","Water Bucket":"\u6C34\u6876","Lava Bucket":"\u7194\u5CA9\u6876","Milk Bucket":"\u5976\u6876","Powder Snow Bucket":"\u7EC6\u96EA\u6876",Bundle:"\u6536\u7EB3\u888B",Shears:"\u526A\u5200","Flint and Steel":"\u6253\u706B\u77F3","Fishing Rod":"\u9493\u9C7C\u7AFF","Carrot on a Stick":"\u80E1\u841D\u535C\u9493\u7AFF","Warped Fungus on a Stick":"\u8BE1\u5F02\u83CC\u9493\u7AFF",Lead:"\u62F4\u7EF3","Name Tag":"\u547D\u540D\u724C",Saddle:"\u978D",Elytra:"\u9798\u7FC5","Totem of Undying":"\u4E0D\u6B7B\u56FE\u817E","End Crystal":"\u672B\u5730\u6C34\u6676",Snowball:"\u96EA\u7403",Egg:"\u86CB","Ender Pearl":"\u672B\u5F71\u73CD\u73E0","Eye of Ender":"\u672B\u5F71\u4E4B\u773C","Blaze Rod":"\u70C8\u7130\u68D2","Blaze Powder":"\u70C8\u7130\u7C89","Ghast Tear":"\u6076\u9B42\u4E4B\u6CEA","Nether Star":"\u4E0B\u754C\u4E4B\u661F","Netherite Ingot":"\u4E0B\u754C\u5408\u91D1\u952D","Netherite Scrap":"\u4E0B\u754C\u5408\u91D1\u788E\u7247","Iron Ingot":"\u94C1\u952D","Gold Ingot":"\u91D1\u952D","Copper Ingot":"\u94DC\u952D",Coal:"\u7164\u70AD",Charcoal:"\u6728\u70AD",Diamond:"\u94BB\u77F3",Emerald:"\u7EFF\u5B9D\u77F3","Lapis Lazuli":"\u9752\u91D1\u77F3",Redstone:"\u7EA2\u77F3",Quartz:"\u77F3\u82F1","Amethyst Shard":"\u7D2B\u6C34\u6676\u788E\u7247","Echo Shard ":"\u56DE\u54CD\u788E\u7247",Netherite:"\u4E0B\u754C\u5408\u91D1",Bread:"\u9762\u5305",Apple:"\u82F9\u679C","Golden Apple":"\u91D1\u82F9\u679C","Enchanted Golden Apple":"\u9644\u9B54\u91D1\u82F9\u679C",Carrot:"\u80E1\u841D\u535C","Golden Carrot":"\u91D1\u80E1\u841D\u535C",Potato:"\u9A6C\u94C3\u85AF","Baked Potato":"\u70E4\u9A6C\u94C3\u85AF",Beetroot:"\u751C\u83DC\u6839",Wheat:"\u5C0F\u9EA6","Wheat Seeds":"\u5C0F\u9EA6\u79CD\u5B50","Beetroot Seeds":"\u751C\u83DC\u79CD\u5B50","Melon Seeds":"\u897F\u74DC\u79CD\u5B50","Pumpkin Seeds":"\u5357\u74DC\u79CD\u5B50",Sugar:"\u7CD6","Cocoa Beans":"\u53EF\u53EF\u8C46",Potion:"\u836F\u6C34","Splash Potion":"\u55B7\u6E85\u836F\u6C34","Lingering Potion":"\u6EDE\u7559\u836F\u6C34",Arrow:"\u7BAD","Spectral Arrow":"\u5149\u7075\u7BAD","Tipped Arrow":"\u836F\u7BAD",Bow:"\u5F13",Crossbow:"\u5F29",Trident:"\u4E09\u53C9\u621F",Shield:"\u76FE\u724C","Wooden Sword":"\u6728\u5251","Stone Sword":"\u77F3\u5251","Iron Sword":"\u94C1\u5251","Golden Sword":"\u91D1\u5251","Diamond Sword":"\u94BB\u77F3\u5251","Netherite Sword":"\u4E0B\u754C\u5408\u91D1\u5251","Wooden Pickaxe":"\u6728\u9550","Stone Pickaxe":"\u77F3\u9550","Iron Pickaxe":"\u94C1\u9550","Golden Pickaxe":"\u91D1\u9550","Diamond Pickaxe":"\u94BB\u77F3\u9550","Netherite Pickaxe":"\u4E0B\u754C\u5408\u91D1\u9550","Wooden Axe":"\u6728\u65A7","Stone Axe":"\u77F3\u65A7","Iron Axe":"\u94C1\u65A7","Golden Axe":"\u91D1\u65A7","Diamond Axe":"\u94BB\u77F3\u65A7","Wooden Shovel":"\u6728\u9539","Stone Shovel":"\u77F3\u9539","Iron Shovel":"\u94C1\u9539","Diamond Shovel":"\u94BB\u77F3\u9539","Wooden Hoe":"\u6728\u9504","Stone Hoe":"\u77F3\u9504","Iron Hoe":"\u94C1\u9504","Diamond Hoe":"\u94BB\u77F3\u9504","Armor Stand":"\u76D4\u7532\u67B6","Leather Cap":"\u76AE\u9769\u5E3D\u5B50","Leather Tunic":"\u76AE\u9769\u5916\u5957","Leather Pants":"\u76AE\u9769\u88E4\u5B50","Leather Boots":"\u76AE\u9769\u9774\u5B50","Iron Helmet":"\u94C1\u5934\u76D4","Iron Chestplate":"\u94C1\u80F8\u7532","Iron Leggings":"\u94C1\u62A4\u817F","Iron Boots":"\u94C1\u9774\u5B50","Diamond Helmet":"\u94BB\u77F3\u5934\u76D4","Diamond Chestplate":"\u94BB\u77F3\u80F8\u7532","Diamond Leggings":"\u94BB\u77F3\u62A4\u817F","Diamond Boots":"\u94BB\u77F3\u9774\u5B50","Netherite Helmet":"\u4E0B\u754C\u5408\u91D1\u5934\u76D4","Netherite Chestplate":"\u4E0B\u754C\u5408\u91D1\u80F8\u7532",Villager:"\u6751\u6C11","Villager V2":"\u6751\u6C11","Wandering Trader":"\u6D41\u6D6A\u5546\u4EBA","Iron Golem":"\u94C1\u5080\u5121","Snow Golem":"\u96EA\u5080\u5121",Cat:"\u732B",Ocelot:"\u8C79\u732B",Wolf:"\u72FC",Pig:"\u732A",Cow:"\u725B",Sheep:"\u7F8A",Chicken:"\u9E21",Rabbit:"\u5154\u5B50",Horse:"\u9A6C",Donkey:"\u9A74",Mule:"\u9AA1",Llama:"\u7F8A\u9A7C",Camel:"\u9A86\u9A7C",Fox:"\u72D0\u72F8",Panda:"\u718A\u732B",Bee:"\u871C\u8702",Parrot:"\u9E66\u9E49",Bat:"\u8759\u8760",Squid:"\u9C7F\u9C7C","Glow Squid":"\u53D1\u5149\u9C7F\u9C7C",Dolphin:"\u6D77\u8C5A",Turtle:"\u6D77\u9F9F",Axolotl:"\u7F8E\u897F\u8788",Cod:"\u9CD5\u9C7C",Salmon:"\u9C91\u9C7C","Tropical Fish":"\u70ED\u5E26\u9C7C",Pufferfish:"\u6CB3\u8C5A",Zombie:"\u50F5\u5C38","Zombie Villager":"\u50F5\u5C38\u6751\u6C11",Husk:"\u5C38\u58F3",Drowned:"\u6EBA\u5C38",Skeleton:"\u9AB7\u9AC5",Stray:"\u6D41\u6D6A\u8005",Bogged:"\u6CBC\u9AB8","Wither Skeleton":"\u51CB\u7075\u9AB7\u9AC5",Creeper:"\u82E6\u529B\u6015",Spider:"\u8718\u86DB","Cave Spider":"\u6D1E\u7A74\u8718\u86DB",Silverfish:"\u8839\u866B",Enderman:"\u672B\u5F71\u4EBA",Slime:"\u53F2\u83B1\u59C6","Magma Cube":"\u5CA9\u6D46\u602A",Blaze:"\u70C8\u7130\u4EBA",Ghast:"\u6076\u9B42",Witch:"\u5973\u5DEB",Pillager:"\u63A0\u593A\u8005",Vindicator:"\u536B\u9053\u58EB",Evoker:"\u5524\u9B54\u8005",Illusioner:"\u5E7B\u672F\u5E08",Ravager:"\u52AB\u63A0\u517D",Warden:"\u76D1\u5B88\u8005",Wither:"\u51CB\u7075","Ender Dragon":"\u672B\u5F71\u9F99",Guardian:"\u5B88\u536B\u8005","Elder Guardian":"\u8FDC\u53E4\u5B88\u536B\u8005",Shulker:"\u6F5C\u5F71\u8D1D",Phantom:"\u5E7B\u7FFC",Vex:"\u607C\u9B3C",Allay:"\u60A6\u7075",Frog:"\u9752\u86D9",Tadpole:"\u874C\u86AA",Goat:"\u5C71\u7F8A",Strider:"\u70BD\u8DB3\u517D",Hoglin:"\u75A3\u732A\u517D",Zoglin:"\u50F5\u5C38\u75A3\u732A\u517D",Piglin:"\u732A\u7075","Piglin Brute":"\u732A\u7075\u86EE\u5175","Zombified Piglin":"\u50F5\u5C38\u732A\u7075",Breeze:"\u65CB\u98CE\u4EBA","Armor Stand":"\u76D4\u7532\u67B6",Item:"\u7269\u54C1",Player:"\u73A9\u5BB6","Experience Orb":"\u7ECF\u9A8C\u7403",Health:"\u751F\u547D",Hunger:"\u9965\u997F",Armor:"\u62A4\u7532",Experience:"\u7ECF\u9A8C",Level:"\u7B49\u7EA7",Inventory:"\u80CC\u5305",Hotbar:"\u5FEB\u6377\u680F",Settings:"\u8BBE\u7F6E",Options:"\u9009\u9879",Video:"\u89C6\u9891",Audio:"\u58F0\u97F3",Controls:"\u63A7\u5236",Keyboard:"\u952E\u76D8",Mouse:"\u9F20\u6807",Controller:"\u63A7\u5236\u5668",Touch:"\u89E6\u5C4F",Graphics:"\u56FE\u5F62","Render Distance":"\u6E32\u67D3\u8DDD\u79BB",Brightness:"\u4EAE\u5EA6",Music:"\u97F3\u4E50",Sound:"\u97F3\u6548",Volume:"\u97F3\u91CF",Language:"\u8BED\u8A00",General:"\u901A\u7528",Multiplayer:"\u591A\u4EBA\u6E38\u620F",Singleplayer:"\u5355\u4EBA\u6E38\u620F",World:"\u4E16\u754C",Seed:"\u79CD\u5B50",Creative:"\u521B\u9020",Survival:"\u751F\u5B58",Adventure:"\u5192\u9669",Spectator:"\u65C1\u89C2",Peaceful:"\u548C\u5E73",Easy:"\u7B80\u5355",Normal:"\u666E\u901A",Difficult:"\u56F0\u96BE",Hard:"\u56F0\u96BE",Cheats:"\u4F5C\u5F0A","Allow Cheats":"\u5141\u8BB8\u4F5C\u5F0A","Game Mode":"\u6E38\u620F\u6A21\u5F0F",Difficulty:"\u96BE\u5EA6",Spawn:"\u51FA\u751F\u70B9",Coordinates:"\u5750\u6807",Biome:"\u751F\u7269\u7FA4\u7CFB",Dimension:"\u7EF4\u5EA6",Overworld:"\u4E3B\u4E16\u754C",Nether:"\u4E0B\u754C","The End":"\u672B\u5730",Day:"\u767D\u5929",Night:"\u591C\u665A",Weather:"\u5929\u6C14",Time:"\u65F6\u95F4",Structure:"\u7ED3\u6784",Block:"\u65B9\u5757",Item:"\u7269\u54C1",Entity:"\u5B9E\u4F53",Recipe:"\u914D\u65B9",Crafting:"\u5408\u6210",Furnace:"\u7194\u7089",Chest:"\u7BB1\u5B50",Close:"\u5173\u95ED",Open:"\u6253\u5F00",Cancel:"\u53D6\u6D88",Confirm:"\u786E\u8BA4",Done:"\u5B8C\u6210",Back:"\u8FD4\u56DE",Next:"\u4E0B\u4E00\u4E2A",Previous:"\u4E0A\u4E00\u4E2A",Reset:"\u91CD\u7F6E",Apply:"\u5E94\u7528",Save:"\u4FDD\u5B58",Load:"\u52A0\u8F7D",Delete:"\u5220\u9664",Create:"\u521B\u5EFA",Edit:"\u7F16\u8F91",Name:"\u540D\u79F0",Description:"\u63CF\u8FF0",Version:"\u7248\u672C",Author:"\u4F5C\u8005",Enabled:"\u5DF2\u542F\u7528",Disabled:"\u5DF2\u7981\u7528",On:"\u5F00",Off:"\u5173","Enabled ":"\u5DF2\u542F\u7528","Resource Pack":"\u8D44\u6E90\u5305","Behavior Pack":"\u884C\u4E3A\u5305","Add-On":"\u9644\u52A0\u5305","Texture Pack":"\u6750\u8D28\u5305",Shader:"\u7740\u8272\u5668",Pack:"\u5305",Manifest:"\u6E05\u5355",Module:"\u6A21\u5757",Dependency:"\u4F9D\u8D56",Script:"\u811A\u672C",Function:"\u51FD\u6570",Event:"\u4E8B\u4EF6",Command:"\u547D\u4EE4",Tag:"\u6807\u7B7E",Loading:"\u52A0\u8F7D\u4E2D","Please wait":"\u8BF7\u7A0D\u5019","Not enough space":"\u7A7A\u95F4\u4E0D\u8DB3","This pack has been disabled":"\u8BE5\u8D44\u6E90\u5305\u5DF2\u88AB\u7981\u7528",Import:"\u5BFC\u5165",Export:"\u5BFC\u51FA",Share:"\u5206\u4EAB",Download:"\u4E0B\u8F7D",Upload:"\u4E0A\u4F20",Select:"\u9009\u62E9",Search:"\u641C\u7D22",Hello:"\u4F60\u597D",Warning:"\u8B66\u544A",Error:"\u9519\u8BEF",Success:"\u6210\u529F",Info:"\u4FE1\u606F",Village:"\u6751\u5E84","Trial Chamber":"\u8BD5\u70BC\u5BC6\u5BA4","Ancient City":"\u8FDC\u53E4\u57CE\u5E02",Stronghold:"\u8981\u585E",Mineshaft:"\u5E9F\u5F03\u77FF\u4E95",Dungeon:"\u5730\u7262","Desert Temple":"\u6C99\u6F20\u795E\u6BBF","Jungle Temple":"\u4E1B\u6797\u795E\u5E99","Witch Hut":"\u5973\u5DEB\u5C0F\u5C4B","Ocean Monument":"\u6D77\u5E95\u795E\u6BBF","Woodland Mansion":"\u6797\u5730\u5E9C\u90B8","Pillager Outpost":"\u63A0\u593A\u8005\u524D\u54E8\u7AD9","Ruined Portal":"\u5E9F\u5F03\u4F20\u9001\u95E8",Shipwreck:"\u6C89\u8239","Buried Treasure":"\u57CB\u85CF\u7684\u5B9D\u85CF","Ocean Ruin":"\u6D77\u5E95\u5E9F\u589F",Igloo:"\u96EA\u5C4B",the:"\u7684",of:"\u7684",and:"\u548C",with:"\u5E26\u6709",for:"\u7528\u4E8E",in:"\u5728",on:"\u5728",a:"",an:"",is:"\u662F",are:"\u662F",you:"\u4F60",your:"\u4F60\u7684",has:"\u62E5\u6709",empty:"\u7A7A\u7684",full:"\u6EE1\u7684",new:"\u65B0\u7684",old:"\u65E7\u7684",custom:"\u81EA\u5B9A\u4E49",default:"\u9ED8\u8BA4",none:"\u65E0",all:"\u5168\u90E8",any:"\u4EFB\u4F55",more:"\u66F4\u591A",less:"\u66F4\u5C11",up:"\u4E0A",down:"\u4E0B",left:"\u5DE6",right:"\u53F3",fast:"\u5FEB\u901F",slow:"\u7F13\u6162",click:"\u70B9\u51FB",tap:"\u70B9\u51FB",hold:"\u957F\u6309",toggle:"\u5207\u6362",enable:"\u542F\u7528",disable:"\u7981\u7528",increase:"\u589E\u52A0",decrease:"\u51CF\u5C11",minimum:"\u6700\u5C0F",maximum:"\u6700\u5927",speed:"\u901F\u5EA6",distance:"\u8DDD\u79BB",fov:"\u89C6\u91CE",gamma:"\u4EAE\u5EA6",split:"\u62C6\u5206",hide:"\u9690\u85CF",show:"\u663E\u793A",hud:"\u754C\u9762",chat:"\u804A\u5929",text:"\u6587\u672C",screen:"\u754C\u9762",button:"\u6309\u94AE",slider:"\u6ED1\u5757",title:"\u6807\u9898",subtitle:"\u526F\u6807\u9898",message:"\u6D88\u606F",warning:"\u8B66\u544A",item:"\u7269\u54C1",block:"\u65B9\u5757",level:"\u7B49\u7EA7",mode:"\u6A21\u5F0F",range:"\u8303\u56F4",size:"\u5927\u5C0F",min:"\u6700\u5C0F",max:"\u6700\u5927",low:"\u4F4E",high:"\u9AD8",medium:"\u4E2D",normal:"\u666E\u901A",auto:"\u81EA\u52A8",manual:"\u624B\u52A8",fixed:"\u56FA\u5B9A",random:"\u968F\u673A",randomly:"\u968F\u673A\u5730",true:"\u662F",false:"\u5426",yes:"\u662F",no:"\u5426",ok:"\u786E\u5B9A",close:"\u5173\u95ED",free:"\u81EA\u7531",locked:"\u9501\u5B9A",visible:"\u53EF\u89C1",hidden:"\u9690\u85CF",active:"\u6FC0\u6D3B",powered:"\u5DF2\u6FC0\u6D3B",power:"\u80FD\u91CF",energy:"\u80FD\u91CF",durability:"\u8010\u4E45",damage:"\u4F24\u5BB3",attack:"\u653B\u51FB",defense:"\u9632\u5FA1",protection:"\u4FDD\u62A4",resistance:"\u6297\u6027","speed ":"\u901F\u5EA6",strength:"\u529B\u91CF",jump:"\u8DF3\u8DC3",boost:"\u63D0\u5347",effect:"\u6548\u679C",potion:"\u836F\u6C34",spell:"\u6CD5\u672F",magic:"\u9B54\u6CD5",fire:"\u706B",ice:"\u51B0",water:"\u6C34",lava:"\u7194\u5CA9",air:"\u7A7A\u6C14",earth:"\u5927\u5730",stone:"\u77F3\u5934",wood:"\u6728\u5934",metal:"\u91D1\u5C5E",gold:"\u91D1",iron:"\u94C1",diamond:"\u94BB\u77F3",emerald:"\u7EFF\u5B9D\u77F3",copper:"\u94DC",coal:"\u7164",redstone:"\u7EA2\u77F3",quartz:"\u77F3\u82F1",glass:"\u73BB\u7483",wool:"\u7F8A\u6BDB",sand:"\u6C99\u5B50",dirt:"\u6CE5\u571F",grass:"\u8349",leaves:"\u6811\u53F6",log:"\u539F\u6728",planks:"\u6728\u677F",stairs:"\u697C\u68AF",slab:"\u53F0\u9636",wall:"\u5899",fence:"\u6805\u680F",door:"\u95E8",trapdoor:"\u6D3B\u677F\u95E8",chest:"\u7BB1\u5B50",barrel:"\u6728\u6876",furnace:"\u7194\u7089",torch:"\u706B\u628A",lamp:"\u706F",lantern:"\u706F\u7B3C",carpet:"\u5730\u6BEF",banner:"\u65D7\u5E1C",sign:"\u544A\u793A\u724C",bed:"\u5E8A",campfire:"\u8425\u706B",crafting:"\u5408\u6210",table:"\u53F0",anvil:"\u94C1\u7827",enchant:"\u9644\u9B54",enchantment:"\u9644\u9B54",trading:"\u4EA4\u6613",trade:"\u4EA4\u6613","emerald ":"\u7EFF\u5B9D\u77F3",villager:"\u6751\u6C11",zombie:"\u50F5\u5C38",skeleton:"\u9AB7\u9AC5",creeper:"\u82E6\u529B\u6015",spider:"\u8718\u86DB",enderman:"\u672B\u5F71\u4EBA",pig:"\u732A",cow:"\u725B",sheep:"\u7F8A",chicken:"\u9E21",cat:"\u732B",wolf:"\u72FC",horse:"\u9A6C",rabbit:"\u5154\u5B50",fish:"\u9C7C",bee:"\u871C\u8702",panda:"\u718A\u732B",fox:"\u72D0\u72F8",turtle:"\u6D77\u9F9F","world ":"\u4E16\u754C","world.":"\u4E16\u754C\u3002",player:"\u73A9\u5BB6",server:"\u670D\u52A1\u5668",client:"\u5BA2\u6237\u7AEF",single:"\u5355\u4EBA",multi:"\u591A\u4EBA","mode ":"\u6A21\u5F0F",survival:"\u751F\u5B58",creative:"\u521B\u9020",adventure:"\u5192\u9669",peaceful:"\u548C\u5E73",easy:"\u7B80\u5355",hard:"\u56F0\u96BE","normal ":"\u666E\u901A"};var vc=/[\u4e00-\u9fff]/;function oi(e){return vc.test(e||"")}function kr(e){let n=String(e).replace(/^\uFEFF/,"").split(/\r?\n/),t=[],a=new TextDecoder;for(let i of n){let o=i,r=o.trim();if(!r||r.startsWith("#")){t.push({raw:o,key:null});continue}let s=o.indexOf("=");if(s<0){t.push({raw:o,key:null});continue}t.push({raw:o,key:o.slice(0,s).trim(),value:o.slice(s+1),eq:s})}return t}function wc(e){return e.map(n=>n.raw).join(`
`)}function xr(e,n=wr){if(!e||oi(e))return e;let t=n[e]||n[e.trim()];if(t)return kc(e,t);let a=e,i=Object.keys(n).sort((s,l)=>l.length-s.length);for(let s of i){if(s.length<3)continue;let l=new RegExp("\\b"+s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","gi");a=a.replace(l,n[s])}let o=e.match(/[A-Za-z]{3,}/g)||[],r=0;return a=e.replace(/\b([A-Za-z]{3,})\b/g,s=>{let l=n[s]||n[s.toLowerCase()];return l?(r++,l):s}),o.length>=2&&r/o.length<.6||o.length===1&&r===0?e:a}function kc(e,n){return n}function xc(e,n){for(let t of n){let a=e.getText(t);for(let i of kr(a))if(i.key&&oi(i.value))return{file:t,key:i.key}}return null}function Sc(e,n){let t=e.paths(),a=t.filter(m=>(n?m.startsWith(n+"/"):!0)&&/(^|\/)texts\/[^/]+\.lang$/i.test(m));if(!a.length)return{status:"no-lang",translated:0,created:!1};let i=xc(e,a);if(i)return{status:"already-zh",where:i.file,translated:0};let o=a.find(m=>/en_US\.lang$/i.test(m))||a[0],r=e.getText(o),s=kr(r),l=0;for(let m of s){if(!m.key||!m.value)continue;let u=xr(m.value);u!==m.value&&(m.raw=m.key+"="+u,l++)}let c=o.replace(/[^/]+\.lang$/,"zh_CN.lang");return e.setBytes(c,new TextEncoder().encode(wc(s))),{status:"localized",translated:l,created:!t.includes(c),file:c}}function Sr(e){let n=[],t=new Set;for(let a of e.paths()){let i=a.match(/^(behavior_packs|resource_packs)\/([^/]+)\//);i&&t.add(i[1]+"/"+i[2])}t.size||t.add("");for(let a of t)n.push(xe({pack:a||"(\u6839\u76EE\u5F55\u5305)"},Sc(e,a)));return n}function Er(e,n){let t=e.getText(n),a;try{a=JSON.parse(t)}catch(r){return 0}let i=0,o=r=>{if(Array.isArray(r)){r.forEach(o);return}if(!(!r||typeof r!="object"))for(let s of Object.keys(r)){let l=r[s];if(typeof l=="string"&&/^(text|label|title|content|message|tooltip|button_text)$/i.test(s)&&!oi(l)){let c=xr(l);c!==l&&(r[s]=c,i++)}else o(l)}};return o(a),i&&e.setBytes(n,new TextEncoder().encode(JSON.stringify(a,null,2))),i}var Br=`entity.agent.name=\u4EE3\u7406\u673A\u5668\u4EBA
entity.area_effect_cloud.name=\u533A\u57DF\u6548\u679C\u4E91
entity.armadillo.name=\u72B0\u72F3
entity.armor_stand.name=\u76D4\u7532\u67B6
entity.arrow.name=\u7BAD
entity.bat.name=\u8759\u8760
entity.bee.name=\u871C\u8702
entity.blaze.name=\u70C8\u7130\u4EBA
entity.boat.name=\u8239
entity.bogged.name=\u6CBC\u9AB8
entity.breeze.name=\u65CB\u98CE\u4EBA
entity.breeze_wind_charge_projectile.name=\u98CE\u5F39
entity.cat.name=\u732B
entity.cave_spider.name=\u6D1E\u7A74\u8718\u86DB
entity.chicken.name=\u9E21
entity.cow.name=\u725B
entity.creaking.name=\u560E\u679D
entity.creeper.name=\u82E6\u529B\u6015
entity.dolphin.name=\u6D77\u8C5A
entity.goat.name=\u5C71\u7F8A
entity.panda.name=\u718A\u732B
entity.donkey.name=\u9A74
entity.dragon_fireball.name=\u672B\u5F71\u9F99\u706B\u7403
entity.drowned.name=\u6EBA\u5C38
entity.egg.name=\u63B7\u51FA\u7684\u9E21\u86CB
entity.elder_guardian.name=\u8FDC\u53E4\u5B88\u536B\u8005
entity.ender_crystal.name=\u672B\u5F71\u6C34\u6676
entity.ender_dragon.name=\u672B\u5F71\u9F99
entity.enderman.name=\u672B\u5F71\u4EBA
entity.endermite.name=\u672B\u5F71\u87A8
entity.ender_pearl.name=\u63B7\u51FA\u7684\u672B\u5F71\u73CD\u73E0
entity.evocation_illager.name=\u5524\u9B54\u8005
entity.evocation_fang.name=\u5524\u9B54\u8005\u5C16\u7259
entity.eye_of_ender_signal.name=\u672B\u5F71\u4E4B\u773C
entity.falling_block.name=\u4E0B\u843D\u7684\u65B9\u5757
entity.fireball.name=\u706B\u7403
entity.fireworks_rocket.name=\u7130\u706B\u706B\u7BAD
entity.fishing_hook.name=\u9C7C\u94A9
entity.fox.name=\u72D0\u72F8
entity.cod.name=\u9CD5\u9C7C
entity.pufferfish.name=\u6CB3\u8C5A
entity.salmon.name=\u9C91\u9C7C
entity.tropicalfish.name=\u70ED\u5E26\u9C7C
entity.axolotl.name=\u7F8E\u897F\u8788
entity.ghast.name=\u6076\u9B42
entity.glow_squid.name=\u53D1\u5149\u9C7F\u9C7C
entity.piglin_brute.name=\u732A\u7075\u86EE\u5175
entity.guardian.name=\u5B88\u536B\u8005
entity.hoglin.name=\u75A3\u732A\u517D
entity.horse.name=\u9A6C
entity.husk.name=\u5C38\u58F3
entity.ravager.name=\u52AB\u63A0\u517D
entity.iron_golem.name=\u94C1\u5080\u5121
entity.item.name=\u7269\u54C1
entity.leash_knot.name=\u62F4\u7EF3\u7ED3
entity.lightning_bolt.name=\u95EA\u7535\u675F
entity.lingering_potion.name=\u6EDE\u7559\u836F\u6C34
entity.llama.name=\u7F8A\u9A7C
entity.trader_llama.name=\u884C\u5546\u7F8A\u9A7C
entity.llama_spit.name=\u7F8A\u9A7C\u553E\u6CAB
entity.magma_cube.name=\u5CA9\u6D46\u602A
entity.minecart.name=\u77FF\u8F66
entity.chest_minecart.name=\u8FD0\u8F93\u77FF\u8F66
entity.command_block_minecart.name=\u547D\u4EE4\u65B9\u5757\u77FF\u8F66
entity.furnace_minecart.name=\u52A8\u529B\u77FF\u8F66
entity.hopper_minecart.name=\u6F0F\u6597\u77FF\u8F66
entity.tnt_minecart.name=TNT\u77FF\u8F66
entity.mule.name=\u9AA1
entity.mooshroom.name=\u54DE\u83C7
entity.moving_block.name=\u79FB\u52A8\u4E2D\u7684\u65B9\u5757
entity.ocelot.name=\u8C79\u732B
entity.ominous_item_spawner.name=\u4E0D\u7965\u4E4B\u7269\u751F\u6210\u5668
entity.painting.name=\u753B
entity.parrot.name=\u9E66\u9E49
entity.phantom.name=\u5E7B\u7FFC
entity.pig.name=\u732A
entity.piglin.name=\u732A\u7075
entity.pillager.name=\u63A0\u593A\u8005
entity.player.name=\u73A9\u5BB6
entity.polar_bear.name=\u5317\u6781\u718A
entity.rabbit.name=\u5154\u5B50
entity.sheep.name=\u7EF5\u7F8A
entity.shulker.name=\u6F5C\u5F71\u8D1D
entity.shulker_bullet.name=\u6F5C\u5F71\u5F39
entity.silverfish.name=\u8839\u866B
entity.skeleton.name=\u9AB7\u9AC5
entity.skeleton_horse.name=\u9AB7\u9AC5\u9A6C
entity.stray.name=\u6D41\u6D6A\u8005
entity.slime.name=\u53F2\u83B1\u59C6
entity.small_fireball.name=\u5C0F\u706B\u7403
entity.sniffer.name=\u55C5\u63A2\u517D
entity.snowball.name=\u96EA\u7403
entity.snow_golem.name=\u96EA\u5080\u5121
entity.spider.name=\u8718\u86DB
entity.splash_potion.name=\u55B7\u6E85\u836F\u6C34
entity.squid.name=\u9C7F\u9C7C
entity.strider.name=\u70BD\u8DB3\u517D
entity.tnt.name=\u88AB\u6FC0\u6D3B\u7684TNT
entity.thrown_trident.name=\u4E09\u53C9\u621F
entity.tripod_camera.name=\u4E09\u811A\u67B6\u6444\u50CF\u673A
entity.turtle.name=\u6D77\u9F9F
entity.unknown.name=\u672A\u77E5
entity.vex.name=\u607C\u9B3C
entity.villager.name=\u6751\u6C11
entity.villager_v2.name=\u6751\u6C11
entity.vindicator.name=\u536B\u9053\u58EB
entity.wandering_trader.name=\u6D41\u6D6A\u5546\u4EBA
entity.wind_charge_projectile.name=\u98CE\u5F39
entity.witch.name=\u5973\u5DEB
entity.wither.name=\u51CB\u7075
entity.wither_skeleton.name=\u51CB\u7075\u9AB7\u9AC5
entity.wither_skull.name=\u51CB\u7075\u4E4B\u9996
entity.wither_skull_dangerous.name=\u51CB\u7075\u5934\u9885
entity.wolf.name=\u72FC
entity.xp_orb.name=\u7ECF\u9A8C\u7403
entity.xp_bottle.name=\u9644\u9B54\u4E4B\u74F6
entity.zoglin.name=\u50F5\u5C38\u75A3\u732A\u517D
entity.zombie.name=\u50F5\u5C38
entity.zombie_horse.name=\u50F5\u5C38\u9A6C
entity.zombie_pigman.name=\u50F5\u5C38\u732A\u7075
entity.zombie_villager.name=\u50F5\u5C38\u6751\u6C11
entity.zombie_villager_v2.name=\u602A\u4EBA\u6751\u6C11
item.air.name=\u7A7A\u6C14
item.apple.name=\u82F9\u679C
item.axolotlAdultBodySingle.name=\u6210\u5E74 %1$s \u7F8E\u897F\u8788
item.axolotlBabyBodySingle.name=\u5E7C\u5E74 %1$s \u7F8E\u897F\u8788
item.axolotlColorLucy.name=\u767D\u5316
item.axolotlColorCyan.name=\u9752\u8272
item.axolotlColorGold.name=\u91D1\u8272
item.axolotlColorWild.name=\u68D5\u8272
item.axolotlColorBlue.name=\u84DD\u8272
item.golden_apple.name=\u91D1\u82F9\u679C
item.appleEnchanted.name=\u9644\u9B54\u91D1\u82F9\u679C
item.armadillo_scute.name=\u72B0\u72F3\u9CDE\u7532
item.armor_stand.name=\u76D4\u7532\u67B6
item.arrow.name=\u7BAD
item.tipped_arrow.name=\u836F\u7BAD
item.bell.name=\u949F
item.steak.name=\u725B\u6392
item.beef.name=\u751F\u725B\u8089
item.beetroot.name=\u751C\u83DC\u6839
item.beetroot_soup.name=\u751C\u83DC\u6C64
item.blaze_powder.name=\u70C8\u7130\u7C89
item.blaze_rod.name=\u70C8\u7130\u68D2
item.bone.name=\u9AA8\u5934
item.book.name=\u4E66
item.breeze_rod.name=\u65CB\u98CE\u68D2
item.chainmail_boots.name=\u9501\u94FE\u9774\u5B50
item.leather_boots.name=\u76AE\u9769\u9774\u5B50
item.diamond_boots.name=\u94BB\u77F3\u9774\u5B50
item.golden_boots.name=\u91D1\u9774\u5B50
item.iron_boots.name=\u94C1\u9774\u5B50
item.bow.name=\u5F13
item.bowl.name=\u7897
item.bread.name=\u9762\u5305
item.brewing_stand.name=\u917F\u9020\u53F0
item.brick.name=\u7EA2\u7816
item.bucket.name=\u94C1\u6876
item.bucketLava.name=\u7194\u5CA9\u6876
item.bucketWater.name=\u6C34\u6876
item.bucketFish.name=\u9CD5\u9C7C\u6876
item.bucketSalmon.name=\u9C91\u9C7C\u6876
item.bucketTropical.name=\u70ED\u5E26\u9C7C\u6876
item.bucketPuffer.name=\u6CB3\u8C5A\u6876
item.bucketCustomFish.name=\u6876\u88C5
item.bucketAxolotl.name=\u7F8E\u897F\u8788\u6876
item.tropicalColorWhite.name=\u767D\u8272
item.tropicalColorOrange.name=\u6A59\u8272
item.tropicalColorMagenta.name=\u54C1\u7EA2\u8272
item.tropicalColorSky.name=\u5929\u84DD\u8272
item.tropicalColorYellow.name=\u9EC4\u8272
item.tropicalColorLime.name=\u9EC4\u7EFF\u8272
item.tropicalColorRose.name=\u73AB\u7470\u8272
item.tropicalColorGray.name=\u7070\u8272
item.tropicalColorSilver.name=\u94F6\u8272
item.tropicalColorTeal.name=\u6C34\u9E2D\u8272
item.tropicalColorPlum.name=\u7D2B\u7EA2\u8272
item.tropicalColorBlue.name=\u84DD\u8272
item.tropicalColorBrown.name=\u68D5\u8272
item.tropicalColorGreen.name=\u7EFF\u8272
item.tropicalColorRed.name=\u7EA2\u8272
item.tropicalBodyKobSingle.name=%1$s \u77F3\u9996\u9C7C
item.tropicalBodySunstreakSingle.name=%1$s \u65E5\u7EB9\u9C7C
item.tropicalBodySnooperSingle.name=%1$s \u523A\u63A2\u8005
item.tropicalBodyDasherSingle.name=%1$s \u901F\u8DC3\u8005
item.tropicalBodyBrinelySingle.name=%1$s \u54B8\u6C34\u9C7C
item.tropicalBodySpottySingle.name=%1$s \u6591\u70B9\u9C7C
item.tropicalBodyFlopperSingle.name=%1$s \u98DE\u7FFC\u9C7C
item.tropicalBodyStripeySingle.name=%1$s \u6761\u7EB9\u9C7C
item.tropicalBodyGlitterSingle.name=%1$s \u95EA\u9CDE\u9C7C
item.tropicalBodyBlockfishSingle.name=%1$s \u65B9\u5757\u9C7C
item.tropicalBodyBettySingle.name=%1$s \u8D1D\u8482\u9C7C
item.tropicalBodyClayfishSingle.name=%1$s \u9ECF\u571F\u9C7C
item.tropicalBodyKobMulti.name=%1$s-%2$s \u77F3\u9996\u9C7C
item.tropicalBodySunstreakMulti.name=%1$s-%2$s \u65E5\u7EB9\u9C7C
item.tropicalBodySnooperMulti.name=%1$s-%2$s \u523A\u63A2\u8005
item.tropicalBodyDasherMulti.name=%1$s-%2$s \u901F\u8DC3\u8005
item.tropicalBodyBrinelyMulti.name=%1$s-%2$s \u54B8\u6C34\u9C7C
item.tropicalBodySpottyMulti.name=%1$s-%2$s \u6591\u70B9\u9C7C
item.tropicalBodyFlopperMulti.name=%1$s-%2$s \u98DE\u7FFC\u9C7C
item.tropicalBodyStripeyMulti.name=%1$s-%2$s \u6761\u7EB9\u9C7C
item.tropicalBodyGlitterMulti.name=%1$s-%2$s \u95EA\u9CDE\u9C7C
item.tropicalBodyBlockfishMulti.name=%1$s-%2$s \u65B9\u5757\u9C7C
item.tropicalBodyBettyMulti.name=%1$s-%2$s \u8D1D\u8482\u9C7C
item.tropicalBodyClayfishMulti.name=%1$s-%2$s \u9ECF\u571F\u9C7C
item.tropicalSchoolAnemone.name=\u6D77\u8475\u9C7C
item.tropicalSchoolBlackTang.name=\u9ED1\u523A\u5C3E\u9CB7
item.tropicalSchoolBlueDory.name=\u62DF\u523A\u5C3E\u9CB7
item.tropicalSchoolButterflyFish.name=\u8776\u9C7C
item.tropicalSchoolCichlid.name=\u6148\u9CB7
item.tropicalSchoolClownfish.name=\u6D77\u8475\u9C7C
item.tropicalSchoolCottonCandyBetta.name=\u4E94\u5F69\u640F\u9C7C
item.tropicalSchoolDottyback.name=\u62DF\u96C0\u9CB7
item.tropicalSchoolEmperorRedSnapper.name=\u5DDD\u7EB9\u7B1B\u9CB7
item.tropicalSchoolGoatfish.name=\u62DF\u7F8A\u9C7C
item.tropicalSchoolMoorishIdol.name=\u9570\u9C7C
item.tropicalSchoolOrnateButterfly.name=\u534E\u4E3D\u8774\u8776\u9C7C
item.tropicalSchoolParrotfish.name=\u9E66\u5634\u9C7C
item.tropicalSchoolQueenAngelFish.name=\u989D\u6591\u523A\u8776\u9C7C
item.tropicalSchoolRedCichlid.name=\u7EA2\u6148\u9CB7
item.tropicalSchoolRedLippedBlenny.name=\u7EA2\u5507\u9CDA\u9C7C
item.tropicalSchoolRedSnapper.name=\u7EA2\u8FB9\u7B1B\u9CB7
item.tropicalSchoolThreadfin.name=\u9A6C\u9C85
item.tropicalSchoolTomatoClown.name=\u767D\u6761\u53CC\u952F\u9C7C
item.tropicalSchoolTriggerfish.name=\u9CDE\u9C80
item.tropicalSchoolYellowTang.name=\u9EC4\u523A\u5C3E\u9CB7
item.tropicalSchoolYellowtailParrot.name=\u9EC4\u5C3E\u9E66\u5634\u9C7C
item.cake.name=\u86CB\u7CD5
item.camera.name=\u6444\u50CF\u673A
item.canBreak.name=\u4F1A\u635F\u574F\uFF1A
item.canPlace.name=\u53EF\u4EE5\u653E\u5728\uFF1A
item.customProperties.name=\u5177\u6709\u81EA\u5B9A\u4E49\u5C5E\u6027
item.golden_carrot.name=\u91D1\u80E1\u841D\u535C
item.carrotOnAStick.name=\u80E1\u841D\u535C\u9493\u7AFF
item.warped_fungus_on_a_stick.name=\u8BE1\u5F02\u83CC\u9493\u7AFF
item.carrot.name=\u80E1\u841D\u535C
item.cauldron.name=\u70BC\u836F\u9505
item.charcoal.name=\u6728\u70AD
item.chainmail_chestplate.name=\u9501\u94FE\u80F8\u7532
item.leather_chestplate.name=\u76AE\u9769\u5916\u5957
item.diamond_chestplate.name=\u94BB\u77F3\u80F8\u7532
item.golden_chestplate.name=\u91D1\u80F8\u7532
item.iron_chestplate.name=\u94C1\u80F8\u7532
item.chorus_fruit.name=\u7D2B\u9882\u679C
item.chorus_fruit_popped.name=\u7206\u88C2\u7D2B\u9882\u679C
item.cooked_beef.name=\u725B\u6392
item.cooked_chicken.name=\u719F\u9E21\u8089
item.cooked_porkchop.name=\u719F\u732A\u6392
item.chicken.name=\u751F\u9E21\u8089
item.clay_ball.name=\u9ECF\u571F\u7403
item.clock.name=\u65F6\u949F
item.coal.name=\u7164\u70AD
item.comparator.name=\u6BD4\u8F83\u5668
item.compass.name=\u6307\u5357\u9488
item.lodestonecompass.name=\u78C1\u77F3\u6307\u5357\u9488
item.cookie.name=\u66F2\u5947
item.copper_door.name=\u94DC\u95E8
item.crossbow.name=\u5F29
item.diamond.name=\u94BB\u77F3
item.repeater.name=\u7EA2\u77F3\u4E2D\u7EE7\u5668
item.acacia_door.name=\u91D1\u5408\u6B22\u6728\u95E8
item.birch_door.name=\u767D\u6866\u6728\u95E8
item.dark_oak_door.name=\u6DF1\u8272\u6A61\u6728\u95E8
item.iron_door.name=\u94C1\u95E8
item.jungle_door.name=\u4E1B\u6797\u6728\u95E8
item.wooden_door.name=\u6A61\u6728\u95E8
item.spruce_door.name=\u4E91\u6749\u6728\u95E8
item.crimson_door.name=\u7EEF\u7EA2\u6728\u95E8
item.warped_door.name=\u8BE1\u5F02\u6728\u95E8
item.dragon_breath.name=\u9F99\u606F
item.dyed.name=\u5DF2\u67D3\u8272
item.glow_ink_sac.name=\u8367\u5149\u58A8\u56CA
item.glow_frame.name=\u8367\u5149\u7269\u54C1\u5C55\u793A\u6846
item.egg.name=\u9E21\u86CB
item.elytra.name=\u9798\u7FC5
item.emerald.name=\u7EFF\u5B9D\u77F3
item.emptyMap.name=\u7A7A\u5730\u56FE
item.emptyLocatorMap.name=\u7A7A\u5B9A\u4F4D\u5668\u5730\u56FE
item.enchanted_book.name=\u9644\u9B54\u4E66
item.end_crystal.name=\u672B\u5730\u6C34\u6676
tile.end_rod.name=\u672B\u5730\u70DB
item.ender_eye.name=\u672B\u5F71\u4E4B\u773C
item.ender_pearl.name=\u672B\u5F71\u73CD\u73E0
item.experience_bottle.name=\u9644\u9B54\u4E4B\u74F6
item.exposed_copper_door.name=\u6591\u9A73\u94DC\u95E8
item.feather.name=\u7FBD\u6BDB
item.fermented_spider_eye.name=\u53D1\u9175\u86DB\u773C
item.fireball.name=\u706B\u7130\u5F39
item.fireworks.name=\u7130\u706B\u706B\u7BAD
item.fireworksCharge.name=\u7130\u706B\u4E4B\u661F
item.clownfish.name=\u70ED\u5E26\u9C7C
item.cooked_fish.name=\u719F\u9CD5\u9C7C
item.fish.name=\u751F\u9CD5\u9C7C
item.photo.name=\u7167\u7247
item.pufferfish.name=\u6CB3\u8C5A
item.cooked_salmon.name=\u719F\u9C91\u9C7C
item.salmon.name=\u751F\u9C91\u9C7C
item.fishing_rod.name=\u9493\u9C7C\u7AFF
item.flint.name=\u71E7\u77F3
item.flint_and_steel.name=\u6253\u706B\u77F3
item.flower_pot.name=\u82B1\u76C6
item.frame.name=\u7269\u54C1\u5C55\u793A\u6846
item.ghast_tear.name=\u6076\u9B42\u4E4B\u6CEA
item.glass_bottle.name=\u73BB\u7483\u74F6
item.gold_nugget.name=\u91D1\u7C92
item.iron_nugget.name=\u94C1\u7C92
item.diamond_axe.name=\u94BB\u77F3\u65A7
item.golden_axe.name=\u91D1\u65A7
item.iron_axe.name=\u94C1\u65A7
item.stone_axe.name=\u77F3\u65A7
item.wooden_axe.name=\u6728\u65A7
item.chainmail_helmet.name=\u9501\u94FE\u5934\u76D4
item.leather_helmet.name=\u76AE\u9769\u5E3D\u5B50
item.diamond_helmet.name=\u94BB\u77F3\u5934\u76D4
item.golden_helmet.name=\u91D1\u5934\u76D4
item.iron_helmet.name=\u94C1\u5934\u76D4
item.diamond_hoe.name=\u94BB\u77F3\u9504
item.golden_hoe.name=\u91D1\u9504
item.iron_hoe.name=\u94C1\u9504
item.stone_hoe.name=\u77F3\u9504
item.wooden_hoe.name=\u6728\u9504
item.honey_bottle.name=\u8702\u871C\u74F6
item.honeycomb.name=\u871C\u813E
item.netherite_horse_armor.name=\u4E0B\u754C\u5408\u91D1\u9A6C\u94E0
item.horsearmordiamond.name=\u94BB\u77F3\u9A6C\u94E0
item.horsearmorgold.name=\u91D1\u9A6C\u94E0
item.horsearmoriron.name=\u94C1\u9A6C\u94E0
item.copper_horse_armor.name=\u94DC\u9A6C\u94E0
item.horsearmorleather.name=\u76AE\u9769\u9A6C\u94E0
item.gold_ingot.name=\u91D1\u952D
item.iron_ingot.name=\u94C1\u952D
item.netherite_ingot.name=\u4E0B\u754C\u5408\u91D1\u952D
item.netherite_scrap.name=\u4E0B\u754C\u5408\u91D1\u788E\u7247
item.netherite_sword.name=\u4E0B\u754C\u5408\u91D1\u5251
item.netherite_pickaxe.name=\u4E0B\u754C\u5408\u91D1\u9550
item.netherite_axe.name=\u4E0B\u754C\u5408\u91D1\u65A7
item.netherite_shovel.name=\u4E0B\u754C\u5408\u91D1\u9539
item.netherite_hoe.name=\u4E0B\u754C\u5408\u91D1\u9504
item.netherite_boots.name=\u4E0B\u754C\u5408\u91D1\u9774\u5B50
item.netherite_leggings.name=\u4E0B\u754C\u5408\u91D1\u62A4\u817F
item.netherite_chestplate.name=\u4E0B\u754C\u5408\u91D1\u80F8\u7532
item.netherite_helmet.name=\u4E0B\u754C\u5408\u91D1\u5934\u76D4
item.lead.name=\u62F4\u7EF3
item.leather.name=\u76AE\u9769
item.leaves.name=\u6811\u53F6
item.chainmail_leggings.name=\u9501\u94FE\u62A4\u817F
item.leather_leggings.name=\u76AE\u9769\u88E4\u5B50
item.diamond_leggings.name=\u94BB\u77F3\u62A4\u817F
item.golden_leggings.name=\u91D1\u62A4\u817F
item.iron_leggings.name=\u94C1\u62A4\u817F
item.nautilus_shell.name=\u9E66\u9E49\u87BA\u58F3
item.heart_of_the_sea.name=\u6D77\u6D0B\u4E4B\u5FC3
item.mace.name=\u91CD\u9524
item.magma_cream.name=\u5CA9\u6D46\u818F
item.map.name=\u7A7A\u5730\u56FE
item.melon.name=\u897F\u74DC\u7247
item.milk.name=\u725B\u5976\u6876
item.minecart.name=\u77FF\u8F66
item.chest_minecart.name=\u8FD0\u8F93\u77FF\u8F66
item.command_block_minecart.name=\u547D\u4EE4\u65B9\u5757\u77FF\u8F66
item.minecartFurnace.name=\u52A8\u529B\u77FF\u8F66
item.hopper_minecart.name=\u6F0F\u6597\u77FF\u8F66
item.ominous_bottle.name=\u4E0D\u7965\u4E4B\u74F6
item.ominous_trial_key.name=\u4E0D\u7965\u8BD5\u70BC\u94A5\u5319
item.oxidized_copper_door.name=\u6C27\u5316\u94DC\u95E8
item.tnt_minecart.name=TNT\u77FF\u8F66
item.pitcher_pod.name=\u74F6\u5B50\u8349\u835A\u679C
item.torchflower_seeds.name=\u706B\u628A\u82B1\u79CD\u5B50
item.trident.name=\u4E09\u53C9\u621F
item.mushroom_stew.name=\u8611\u83C7\u7172
item.muttonCooked.name=\u719F\u7F8A\u8089
item.muttonRaw.name=\u751F\u7F8A\u8089
item.name_tag.name=\u547D\u540D\u724C
item.netherbrick.name=\u4E0B\u754C\u7816
item.quartz.name=\u4E0B\u754C\u77F3\u82F1
item.nether_wart.name=\u4E0B\u754C\u75A3
item.netherStar.name=\u4E0B\u754C\u4E4B\u661F
item.painting.name=\u753B
item.paper.name=\u7EB8
item.diamond_pickaxe.name=\u94BB\u77F3\u9550
item.golden_pickaxe.name=\u91D1\u9550
item.iron_pickaxe.name=\u94C1\u9550
item.stone_pickaxe.name=\u77F3\u9550
item.wooden_pickaxe.name=\u6728\u9550
item.porkchop_cooked.name=\u719F\u732A\u6392
item.porkchop.name=\u751F\u732A\u6392
item.portfolio.name=\u76F8\u7247\u7C3F
item.potato.name=\u9A6C\u94C3\u85AF
item.baked_potato.name=\u70E4\u9A6C\u94C3\u85AF
item.poisonous_potato.name=\u6BD2\u9A6C\u94C3\u85AF
item.prismarine_crystals.name=\u6D77\u6676\u7802\u7C92
item.prismarine_shard.name=\u6D77\u6676\u788E\u7247
item.pumpkin_pie.name=\u5357\u74DC\u6D3E
item.cooked_rabbit.name=\u719F\u5154\u8089
item.rabbit_foot.name=\u5154\u5B50\u811A
item.rabbit_hide.name=\u5154\u5B50\u76AE
item.rabbit.name=\u751F\u5154\u8089
item.rabbit_stew.name=\u5154\u8089\u7172
item.record.name=\u97F3\u4E50\u5531\u7247
item.redstone.name=\u7EA2\u77F3\u7C89
item.reeds.name=\u7518\u8517
item.kelp.name=\u6D77\u5E26
item.dried_kelp.name=\u5E72\u6D77\u5E26
item.rotten_flesh.name=\u8150\u8089
item.ruby.name=\u7EA2\u5B9D\u77F3
item.saddle.name=\u978D
item.wheat_seeds.name=\u5C0F\u9EA6\u79CD\u5B50
item.beetroot_seeds.name=\u751C\u83DC\u79CD\u5B50
item.melon_seeds.name=\u897F\u74DC\u79CD\u5B50
item.pumpkin_seeds.name=\u5357\u74DC\u79CD\u5B50
item.shears.name=\u526A\u5200
item.diamond_shovel.name=\u94BB\u77F3\u9539
item.golden_shovel.name=\u91D1\u9539
item.iron_shovel.name=\u94C1\u9539
item.stone_shovel.name=\u77F3\u9539
item.wooden_shovel.name=\u6728\u9539
item.sign.name=\u544A\u793A\u724C
item.spruce_sign.name=\u4E91\u6749\u6728\u544A\u793A\u724C
item.birch_sign.name=\u767D\u6866\u6728\u544A\u793A\u724C
item.jungle_sign.name=\u4E1B\u6797\u6728\u544A\u793A\u724C
item.acacia_sign.name=\u91D1\u5408\u6B22\u6728\u544A\u793A\u724C
item.darkoak_sign.name=\u6DF1\u8272\u6A61\u6728\u544A\u793A\u724C
item.crimson_sign.name=\u7EEF\u7EA2\u6728\u544A\u793A\u724C
item.warped_sign.name=\u8BE1\u5F02\u6728\u544A\u793A\u724C
item.slime_ball.name=\u9ECF\u6DB2\u7403
item.snowball.name=\u96EA\u7403
item.speckled_melon.name=\u95EA\u70C1\u7684\u897F\u74DC\u7247
item.spider_eye.name=\u8718\u86DB\u773C
item.stick.name=\u6728\u68CD
item.string.name=\u7EBF
item.sugar.name=\u7CD6
item.gunpowder.name=\u706B\u836F
item.diamond_sword.name=\u94BB\u77F3\u5251
item.golden_sword.name=\u91D1\u5251
item.iron_sword.name=\u94C1\u5251
item.stone_sword.name=\u77F3\u5251
item.wooden_sword.name=\u6728\u5251
item.unbreakable.name=\u65E0\u6CD5\u7834\u574F
item.waxed_copper_door.name=\u6D82\u8721\u94DC\u95E8
item.waxed_exposed_copper_door.name=\u6D82\u8721\u6591\u9A73\u94DC\u95E8
item.waxed_oxidized_copper_door.name=\u6D82\u8721\u6C27\u5316\u94DC\u95E8
item.waxed_weathered_copper_door.name=\u6D82\u8721\u98CE\u5316\u94DC\u95E8
item.weathered_copper_door.name=\u98CE\u5316\u94DC\u95E8
item.wind_charge.name=\u98CE\u5F39
item.wheat.name=\u5C0F\u9EA6
item.wolf_armor.name=\u72FC\u94E0
item.writable_book.name=\u4E66\u4E0E\u7B14
item.written_book.name=\u6210\u4E66
item.glowstone_dust.name=\u8367\u77F3\u7C89
item.shulker_shell.name=\u6F5C\u5F71\u58F3
item.totem.name=\u4E0D\u6B7B\u56FE\u817E
item.trial_key.name=\u8BD5\u70BC\u94A5\u5319
item.turtle_helmet.name=\u6D77\u9F9F\u58F3
item.turtle_shell_piece.name=\u6D77\u9F9F\u9CDE\u7532
item.phantom_membrane.name=\u5E7B\u7FFC\u819C
item.sweet_berries.name=\u751C\u6D46\u679C
item.suspicious_stew.name=\u8C1C\u4E4B\u7096\u83DC
item.field_masoned_banner_pattern.name=\u7816\u7EB9\u65D7\u5E1C\u56FE\u6848
item.creeper_banner_pattern.name=\u65D7\u5E1C\u56FE\u6848
item.flow_banner_pattern.name=\u65D7\u5E1C\u56FE\u6848
item.flower_banner_pattern.name=\u65D7\u5E1C\u56FE\u6848
item.globe_banner_pattern.name=\u65D7\u5E1C\u56FE\u6848
item.guster_banner_pattern.name=\u65D7\u5E1C\u56FE\u6848
item.piglin_banner_pattern.name=\u65D7\u5E1C\u56FE\u6848
item.skull_banner_pattern.name=\u65D7\u5E1C\u56FE\u6848
item.mojang_banner_pattern.name=\u65D7\u5E1C\u56FE\u6848
item.bordure_indented_banner_pattern.name=\u6CE2\u7EB9\u8FB9\u65D7\u5E1C\u56FE\u6848
item.banner_pattern.name=\u65D7\u5E1C\u56FE\u6848
item.bucketPowderSnow.name=\u7EC6\u96EA\u6876
item.pale_oak_door.name=\u82CD\u767D\u6A61\u6728\u95E8
tile.pale_oak_door.name=\u82CD\u767D\u6A61\u6728\u95E8
item.pale_oak_hanging_sign.name=\u82CD\u767D\u6A61\u6728\u60AC\u6302\u544A\u793A\u724C
item.pale_oak_sign.name=\u82CD\u767D\u6A61\u6728\u544A\u793A\u724C
tile.pale_oak_sapling.name=\u82CD\u767D\u6A61\u6811\u6811\u82D7
tile.pale_oak_leaves.name=\u82CD\u767D\u6A61\u6811\u6811\u53F6
item.resin_brick.name=\u6811\u8102\u7816
item.shield.name=\u76FE\u724C
item.bundle.name=\u6536\u7EB3\u888B
item.black_bundle.name=\u9ED1\u8272\u6536\u7EB3\u888B
item.white_bundle.name=\u767D\u8272\u6536\u7EB3\u888B
item.red_bundle.name=\u7EA2\u8272\u6536\u7EB3\u888B
item.orange_bundle.name=\u6A59\u8272\u6536\u7EB3\u888B
item.yellow_bundle.name=\u9EC4\u8272\u6536\u7EB3\u888B
item.green_bundle.name=\u7EFF\u8272\u6536\u7EB3\u888B
item.lime_bundle.name=\u9EC4\u7EFF\u8272\u6536\u7EB3\u888B
item.brown_bundle.name=\u68D5\u8272\u6536\u7EB3\u888B
item.light_gray_bundle.name=\u6DE1\u7070\u8272\u6536\u7EB3\u888B
item.light_blue_bundle.name=\u6DE1\u84DD\u8272\u6536\u7EB3\u888B
item.blue_bundle.name=\u84DD\u8272\u6536\u7EB3\u888B
item.gray_bundle.name=\u7070\u8272\u6536\u7EB3\u888B
item.pink_bundle.name=\u7C89\u7EA2\u8272\u6536\u7EB3\u888B
item.magenta_bundle.name=\u54C1\u7EA2\u8272\u6536\u7EB3\u888B
item.purple_bundle.name=\u7D2B\u8272\u6536\u7EB3\u888B
item.cyan_bundle.name=\u9752\u8272\u6536\u7EB3\u888B
item.goat_horn.name=\u5C71\u7F8A\u89D2
tile.sculk_sensor.name=\u5E7D\u533F\u611F\u6D4B\u4F53
tile.sculk.name=\u5E7D\u533F\u5757
tile.sculk_vein.name=\u5E7D\u533F\u8109\u7EDC
tile.sculk_catalyst.name=\u5E7D\u533F\u50AC\u53D1\u4F53
tile.sculk_shrieker.name=\u5E7D\u533F\u5C16\u5578\u4F53
tile.reinforced_deepslate.name=\u5F3A\u5316\u6DF1\u677F\u5CA9
entity.frog.name=\u9752\u86D9
entity.tadpole.name=\u874C\u86AA
entity.warden.name=\u76D1\u5B88\u8005
entity.allay.name=\u60A6\u7075
item.bucketTadpole.name=\u874C\u86AA\u6876
tile.frog_spawn.name=\u9752\u86D9\u5375
tile.pearlescent_froglight.name=\u73E0\u5149\u86D9\u660E\u706F
tile.verdant_froglight.name=\u9752\u7FE0\u86D9\u660E\u706F
tile.ochre_froglight.name=\u8D6D\u9EC4\u86D9\u660E\u706F
tile.mud.name=\u6CE5\u5DF4
tile.packed_mud.name=\u6CE5\u576F
tile.mud_bricks.name=\u6CE5\u7816
tile.mud_brick_slab.name=\u6CE5\u7816\u53F0\u9636
tile.mud_brick_double_slab.name=\u6CE5\u7816\u53CC\u5C42\u53F0\u9636
tile.mud_brick_stairs.name=\u6CE5\u7816\u697C\u68AF
tile.mud_brick_wall.name=\u6CE5\u7816\u5899
tile.mangrove_leaves.name=\u7EA2\u6811\u6811\u53F6
tile.mangrove_propagule.name=\u7EA2\u6811\u80CE\u751F\u82D7
tile.mangrove_roots.name=\u7EA2\u6811\u6839
tile.muddy_mangrove_roots.name=\u6CBE\u6CE5\u7684\u7EA2\u6811\u6839
tile.mangrove_log.name=\u7EA2\u6811\u539F\u6728
tile.stripped_mangrove_log.name=\u53BB\u76AE\u7EA2\u6811\u539F\u6728
tile.mangrove_planks.name=\u7EA2\u6811\u6728\u677F
tile.mangrove_button.name=\u7EA2\u6811\u6728\u6309\u94AE
tile.mangrove_stairs.name=\u7EA2\u6811\u6728\u697C\u68AF
tile.mangrove_slab.name=\u7EA2\u6811\u6728\u53F0\u9636
tile.mangrove_double_slab.name=\u7EA2\u6811\u6728\u53CC\u5C42\u53F0\u9636
tile.mangrove_pressure_plate.name=\u7EA2\u6811\u6728\u538B\u529B\u677F
tile.mangrove_fence.name=\u7EA2\u6811\u6728\u6805\u680F
tile.mangrove_fence_gate.name=\u7EA2\u6811\u6728\u6805\u680F\u95E8
item.mangrove_door.name=\u7EA2\u6811\u6728\u95E8
item.mangrove_sign.name=\u7EA2\u6811\u6728\u544A\u793A\u724C
tile.mangrove_standing_sign.name=\u7EA2\u6811\u6728\u544A\u793A\u724C
tile.mangrove_wall_sign.name=\u5899\u4E0A\u7684\u7EA2\u6811\u6728\u544A\u793A\u724C
tile.mangrove_hanging_sign.name=\u60AC\u6302\u5F0F\u7EA2\u6811\u6728\u544A\u793A\u724C
tile.mangrove_door.name=\u7EA2\u6811\u6728\u95E8
tile.mangrove_trapdoor.name=\u7EA2\u6811\u6728\u6D3B\u677F\u95E8
tile.mangrove_wood.name=\u7EA2\u6811\u6728
tile.stripped_mangrove_wood.name=\u53BB\u76AE\u7EA2\u6811\u6728
item.echo_shard.name=\u56DE\u54CD\u788E\u7247
item.recovery_compass.name=\u8FFD\u6EAF\u6307\u9488
item.disc_fragment.name=\u5531\u7247\u6B8B\u7247
entity.chest_boat.name=\u8FD0\u8F93\u8239
entity.camel.name=\u9A86\u9A7C
entity.chest_raft.name=\u5E26\u7BB1\u5B50\u7684\u7AF9\u7B4F
item.acacia_hanging_sign.name=\u91D1\u5408\u6B22\u6728\u60AC\u6302\u544A\u793A\u724C
item.angler_pottery_sherd.name=\u5782\u9493\u7EB9\u6837\u9676\u7247
item.archer_pottery_sherd.name=\u5F13\u7BAD\u7EB9\u6837\u9676\u7247
item.arms_up_pottery_sherd.name=\u4E3E\u81C2\u7EB9\u6837\u9676\u7247
item.bamboo_door.name=\u7AF9\u95E8
item.bamboo_hanging_sign.name=\u7AF9\u5236\u60AC\u6302\u544A\u793A\u724C
item.bamboo_sign.name=\u7AF9\u5236\u544A\u793A\u724C
item.birch_hanging_sign.name=\u767D\u6866\u6728\u60AC\u6302\u544A\u793A\u724C
item.blade_pottery_sherd.name=\u5229\u5203\u7EB9\u6837\u9676\u7247
item.brewer_pottery_sherd.name=\u4F73\u917F\u7EB9\u6837\u9676\u7247
item.brush.name=\u5237\u5B50
item.burn_pottery_sherd.name=\u70C8\u7130\u7EB9\u6837\u9676\u7247
item.cherry_door.name=\u6A31\u82B1\u6728\u95E8
item.cherry_hanging_sign.name=\u6A31\u82B1\u6728\u60AC\u6302\u544A\u793A\u724C
item.cherry_sign.name=\u6A31\u82B1\u6728\u544A\u793A\u724C
item.crimson_hanging_sign.name=\u7EEF\u7EA2\u6728\u60AC\u6302\u544A\u793A\u724C
item.danger_pottery_sherd.name=\u5371\u673A\u7EB9\u6837\u9676\u7247
item.dark_oak_hanging_sign.name=\u6DF1\u8272\u6A61\u6728\u60AC\u6302\u544A\u793A\u724C
item.explorer_pottery_sherd.name=\u63A2\u9669\u7EB9\u6837\u9676\u7247
item.flow_pottery_sherd.name=\u6DA1\u6D41\u7EB9\u6837\u9676\u7247
item.friend_pottery_sherd.name=\u631A\u53CB\u7EB9\u6837\u9676\u7247
item.guster_pottery_sherd.name=\u65CB\u98CE\u7EB9\u6837\u9676\u7247
item.heart_pottery_sherd.name=\u7231\u5FC3\u7EB9\u6837\u9676\u7247
item.heartbreak_pottery_sherd.name=\u5FC3\u788E\u7EB9\u6837\u9676\u7247
item.howl_pottery_sherd.name=\u72FC\u568E\u7EB9\u6837\u9676\u7247
item.jungle_hanging_sign.name=\u4E1B\u6797\u6728\u60AC\u6302\u544A\u793A\u724C
item.mangrove_hanging_sign.name=\u7EA2\u6811\u6728\u60AC\u6302\u544A\u793A\u724C
item.miner_pottery_sherd.name=\u91C7\u77FF\u7EB9\u6837\u9676\u7247
item.mourner_pottery_sherd.name=\u60B2\u6078\u7EB9\u6837\u9676\u7247
item.oak_hanging_sign.name=\u6A61\u6728\u60AC\u6302\u544A\u793A\u724C
item.plenty_pottery_sherd.name=\u5BCC\u9976\u7EB9\u6837\u9676\u7247
item.prize_pottery_sherd.name=\u73CD\u5B9D\u7EB9\u6837\u9676\u7247
item.scrape_pottery_sherd.name=\u522E\u524A\u7EB9\u6837\u9676\u7247
item.sheaf_pottery_sherd.name=\u9EA6\u6346\u7EB9\u6837\u9676\u7247
item.shelter_pottery_sherd.name=\u6811\u836B\u7EB9\u6837\u9676\u7247
item.skull_pottery_sherd.name=\u5934\u9885\u7EB9\u6837\u9676\u7247
item.smithing_template.name=\u953B\u9020\u6A21\u677F
item.netherite_upgrade_smithing_template.name=\u953B\u9020\u6A21\u677F
item.sentry_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.vex_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.wild_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.coast_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.dune_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.wayfinder_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.raiser_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.shaper_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.host_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.ward_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.silence_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.tide_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.snout_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.rib_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.eye_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.spire_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.flow_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.bolt_armor_trim_smithing_template.name=\u953B\u9020\u6A21\u677F
item.snort_pottery_sherd.name=\u55C5\u63A2\u7EB9\u6837\u9676\u7247
item.spruce_hanging_sign.name=\u4E91\u6749\u6728\u60AC\u6302\u544A\u793A\u724C
item.warped_hanging_sign.name=\u8BE1\u5F02\u6728\u60AC\u6302\u544A\u793A\u724C
tile.bamboo_block.name=\u7AF9\u5757
tile.bamboo_button.name=\u7AF9\u6309\u94AE
tile.bamboo_door.name=\u7AF9\u95E8
tile.bamboo_fence_gate.name=\u7AF9\u6805\u680F\u95E8
tile.bamboo_fence.name=\u7AF9\u6805\u680F
tile.bamboo_mosaic_slab.name=\u7AF9\u9A6C\u8D5B\u514B\u53F0\u9636
tile.bamboo_mosaic_double_slab.name=\u7AF9\u5236\u9A6C\u8D5B\u514B\u53CC\u5C42\u53F0\u9636
tile.bamboo_mosaic_stairs.name=\u7AF9\u9A6C\u8D5B\u514B\u697C\u68AF
tile.bamboo_mosaic.name=\u7AF9\u9A6C\u8D5B\u514B
tile.bamboo_planks.name=\u7AF9\u677F
tile.bamboo_pressure_plate.name=\u7AF9\u538B\u529B\u677F
tile.bamboo_sapling.name=\u7AF9\u7B0B
tile.bamboo_standing_sign.name=\u7AF9\u5236\u544A\u793A\u724C
tile.bamboo_wall_sign.name=\u5899\u4E0A\u7684\u7AF9\u544A\u793A\u724C
tile.bamboo_hanging_sign.name=\u60AC\u6302\u5F0F\u7AF9\u544A\u793A\u724C
tile.bamboo_slab.name=\u7AF9\u53F0\u9636
tile.bamboo_double_slab.name=\u7AF9\u5236\u53CC\u5C42\u53F0\u9636
tile.bamboo_stairs.name=\u7AF9\u697C\u68AF
tile.bamboo_trapdoor.name=\u7AF9\u6D3B\u677F\u95E8
tile.calibrated_sculk_sensor.name=\u6821\u9891\u5E7D\u533F\u611F\u6D4B\u4F53
tile.cherry_button.name=\u6A31\u82B1\u6728\u6309\u94AE
tile.cherry_double_slab.name=\u6A31\u82B1\u6728\u53CC\u5C42\u53F0\u9636
tile.cherry_fence_gate.name=\u6A31\u82B1\u6728\u6805\u680F\u95E8
tile.cherry_fence.name=\u6A31\u82B1\u6728\u6805\u680F
tile.cherry_leaves.name=\u6A31\u82B1\u6811\u53F6
tile.cherry_log.name=\u6A31\u82B1\u539F\u6728
tile.cherry_planks.name=\u6A31\u82B1\u6728\u677F
tile.cherry_pressure_plate.name=\u6A31\u82B1\u6728\u538B\u529B\u677F
tile.cherry_sapling.name=\u6A31\u82B1\u6811\u82D7
tile.cherry_standing_sign.name=\u6A31\u82B1\u6728\u544A\u793A\u724C
tile.cherry_wall_sign.name=\u5899\u4E0A\u7684\u6A31\u82B1\u6728\u544A\u793A\u724C
tile.cherry_hanging_sign.name=\u60AC\u6302\u5F0F\u6A31\u82B1\u6728\u544A\u793A\u724C
tile.cherry_slab.name=\u6A31\u82B1\u6728\u53F0\u9636
tile.cherry_stairs.name=\u6A31\u82B1\u6728\u697C\u68AF
tile.cherry_door.name=\u6A31\u82B1\u6728\u95E8
tile.cherry_trapdoor.name=\u6A31\u82B1\u6728\u6D3B\u677F\u95E8
tile.cherry_wood.name=\u6A31\u82B1\u6728
tile.chiseled_bookshelf.name=\u96D5\u7EB9\u4E66\u67B6
tile.chiseled_tuff.name=\u96D5\u7EB9\u51DD\u7070\u5CA9
tile.chiseled_tuff_bricks.name=\u96D5\u7EB9\u51DD\u7070\u5CA9\u7816
tile.decorated_pot.name=\u9970\u7EB9\u9676\u7F50
tile.pink_petals.name=\u7C89\u7EA2\u8272\u82B1\u7C07
tile.stripped_bamboo_block.name=\u53BB\u76AE\u7AF9\u5757
tile.stripped_cherry_log.name=\u53BB\u76AE\u6A31\u82B1\u539F\u6728
tile.stripped_cherry_wood.name=\u53BB\u76AE\u6A31\u82B1\u6728
tile.suspicious_gravel.name=\u53EF\u7591\u7684\u6C99\u783E
tile.suspicious_sand.name=\u53EF\u7591\u7684\u6C99\u5B50
tile.acaciaFence.name=\u91D1\u5408\u6B22\u6728\u6805\u680F
tile.acacia_fence_gate.name=\u91D1\u5408\u6B22\u6728\u6805\u680F\u95E8
tile.activator_rail.name=\u6FC0\u6D3B\u94C1\u8F68
tile.allow.name=\u5141\u8BB8\u65B9\u5757
tile.air.name=\u7A7A\u6C14
tile.unknown.name=\u672A\u77E5
tile.deny.name=\u62D2\u7EDD\u65B9\u5757
tile.border_block.name=\u8FB9\u754C\u65B9\u5757
tile.anvil.name=\u94C1\u7827
tile.barrier.name=\u5C4F\u969C
tile.beacon.name=\u4FE1\u6807
tile.beehive.name=\u8702\u7BB1
tile.bee_nest.name=\u8702\u5DE2
tile.target.name=\u6807\u9776
tile.bed.name=\u5E8A
tile.bedrock.name=\u57FA\u5CA9
tile.bell.name=\u949F
tile.camera.name=\u6444\u50CF\u673A
tile.conduit.name=\u6F6E\u6D8C\u6838\u5FC3
tile.invisibleBedrock.name=\u9690\u5F62\u57FA\u5CA9
tile.beetroot.name=\u751C\u83DC\u6839
tile.big_dripleaf.name=\u5927\u578B\u5782\u6EF4\u53F6
tile.small_dripleaf_block.name=\u5C0F\u578B\u5782\u6EF4\u53F6
tile.hanging_roots.name=\u5782\u6839
tile.dirt_with_roots.name=\u7F20\u6839\u6CE5\u571F
tile.spore_blossom.name=\u5B62\u5B50\u82B1
tile.azalea_leaves.name=\u675C\u9E43\u6811\u53F6
tile.azalea_leaves_flowered.name=\u76DB\u5F00\u7684\u675C\u9E43\u82B1\u6811\u53F6
tile.azalea.name=\u675C\u9E43\u82B1\u4E1B
tile.flowering_azalea.name=\u76DB\u5F00\u7684\u675C\u9E43\u82B1\u4E1B
tile.cave_vines.name=\u6D1E\u7A74\u85E4\u8513
tile.cave_vines_body_with_berries.name=\u6D1E\u7A74\u85E4\u8513
tile.cave_vines_head_with_berries.name=\u6D1E\u7A74\u85E4\u8513
item.glow_berries.name=\u53D1\u5149\u6D46\u679C
tile.moss_block.name=\u82D4\u85D3\u5757
tile.moss_carpet.name=\u8986\u5730\u82D4\u85D3
tile.birch_door.name=\u767D\u6866\u6728\u95E8
tile.birchFence.name=\u767D\u6866\u6728\u6805\u680F
tile.birch_fence_gate.name=\u767D\u6866\u6728\u6805\u680F\u95E8
tile.blast_furnace.name=\u9AD8\u7089
tile.lit_blast_furnace.name=\u70B9\u71C3\u9AD8\u7089
tile.bone_block.name=\u9AA8\u5757
tile.coal_block.name=\u7164\u70AD\u5757
tile.diamond_block.name=\u94BB\u77F3\u5757
tile.emerald_block.name=\u7EFF\u5B9D\u77F3\u5757
tile.gold_block.name=\u91D1\u5757
tile.iron_block.name=\u94C1\u5757
tile.lapis_block.name=\u9752\u91D1\u77F3\u5757
tile.redstone_block.name=\u7EA2\u77F3\u5757
tile.bookshelf.name=\u4E66\u67B6
tile.brick_block.name=\u7816
tile.brown_mushroom.name=\u68D5\u8272\u8611\u83C7
tile.wooden_button.name=\u6A61\u6728\u6309\u94AE
tile.acacia_button.name=\u91D1\u5408\u6B22\u6728\u6309\u94AE
tile.birch_button.name=\u767D\u6866\u6728\u6309\u94AE
tile.dark_oak_button.name=\u6DF1\u8272\u6A61\u6728\u6309\u94AE
tile.jungle_button.name=\u4E1B\u6797\u6728\u6309\u94AE
tile.spruce_button.name=\u4E91\u6749\u6728\u6309\u94AE
tile.stone_button.name=\u77F3\u5934\u6309\u94AE
tile.cactus.name=\u4ED9\u4EBA\u638C
tile.cake.name=\u86CB\u7CD5
tile.kelp.name=\u6D77\u5E26
tile.dried_kelp_block.name=\u5E72\u6D77\u5E26\u5757
tile.carrots.name=\u80E1\u841D\u535C
tile.carved_pumpkin.name=\u96D5\u523B\u5357\u74DC
tile.cauldron.name=\u70BC\u836F\u9505
tile.chalkboard.name=\u9ED1\u677F
tile.chest.name=\u7BB1\u5B50
tile.ender_chest.name=\u672B\u5F71\u7BB1
tile.jigsaw.name=\u62FC\u56FE\u65B9\u5757
tile.heavy_core.name=\u6C89\u91CD\u6838\u5FC3
tile.honey_block.name=\u8702\u871C\u5757
tile.honeycomb_block.name=\u871C\u813E\u5757
tile.lodestone.name=\u78C1\u77F3
tile.nether_sprouts.name=\u4E0B\u754C\u82D7
tile.crimson_stem.name=\u7EEF\u7EA2\u83CC\u67C4
tile.warped_stem.name=\u8BE1\u5F02\u83CC\u67C4
tile.stripped_crimson_stem.name=\u53BB\u76AE\u7EEF\u7EA2\u83CC\u67C4
tile.stripped_warped_stem.name=\u53BB\u76AE\u8BE1\u5F02\u83CC\u67C4
tile.crimson_hyphae.name=\u7EEF\u7EA2\u83CC\u6838
tile.warped_hyphae.name=\u8BE1\u5F02\u83CC\u6838
tile.stripped_crimson_hyphae.name=\u53BB\u76AE\u7EEF\u7EA2\u83CC\u6838
tile.stripped_warped_hyphae.name=\u53BB\u76AE\u8BE1\u5F02\u83CC\u6838
tile.crimson_planks.name=\u7EEF\u7EA2\u6728\u677F
tile.warped_planks.name=\u8BE1\u5F02\u6728\u677F
tile.crimson_door.name=\u7EEF\u7EA2\u6728\u95E8
tile.warped_door.name=\u8BE1\u5F02\u6728\u95E8
tile.crimson_trapdoor.name=\u7EEF\u7EA2\u6728\u6D3B\u677F\u95E8
tile.warped_trapdoor.name=\u8BE1\u5F02\u6728\u6D3B\u677F\u95E8
tile.crimson_standing_sign.name=\u7EEF\u7EA2\u6728\u544A\u793A\u724C
tile.warped_standing_sign.name=\u8BE1\u5F02\u6728\u544A\u793A\u724C
tile.warped_hanging_sign.name=\u60AC\u6302\u5F0F\u8BE1\u5F02\u6728\u544A\u793A\u724C
tile.crimson_wall_sign.name=\u5899\u4E0A\u7684\u7EEF\u7EA2\u6728\u544A\u793A\u724C
tile.warped_wall_sign.name=\u5899\u4E0A\u7684\u8BE1\u5F02\u6728\u544A\u793A\u724C
tile.crimson_stairs.name=\u7EEF\u7EA2\u6728\u697C\u68AF
tile.warped_stairs.name=\u8BE1\u5F02\u6728\u697C\u68AF
tile.crimson_fence.name=\u7EEF\u7EA2\u6728\u6805\u680F
tile.warped_fence.name=\u8BE1\u5F02\u6728\u6805\u680F
tile.crimson_fence_gate.name=\u7EEF\u7EA2\u6728\u6805\u680F\u95E8
tile.warped_fence_gate.name=\u8BE1\u5F02\u6728\u6805\u680F\u95E8
tile.crimson_button.name=\u7EEF\u7EA2\u6728\u6309\u94AE
tile.warped_button.name=\u8BE1\u5F02\u6728\u6309\u94AE
tile.crimson_pressure_plate.name=\u7EEF\u7EA2\u6728\u538B\u529B\u677F
tile.warped_pressure_plate.name=\u8BE1\u5F02\u6728\u538B\u529B\u677F
tile.crimson_slab.name=\u7EEF\u7EA2\u6728\u53F0\u9636
tile.warped_slab.name=\u8BE1\u5F02\u6728\u53F0\u9636
tile.crimson_double_slab.name=\u7EEF\u7EA2\u6728\u53F0\u9636
tile.warped_double_slab.name=\u8BE1\u5F02\u6728\u53F0\u9636
tile.shroomlight.name=\u83CC\u5149\u4F53
tile.crimson_nylium.name=\u7EEF\u7EA2\u83CC\u5CA9
tile.warped_nylium.name=\u8BE1\u5F02\u83CC\u5CA9
tile.basalt.name=\u7384\u6B66\u5CA9
tile.polished_basalt.name=\u78E8\u5236\u7384\u6B66\u5CA9
tile.blackstone.name=\u9ED1\u77F3
tile.polished_blackstone_bricks.name=\u78E8\u5236\u9ED1\u77F3\u7816
tile.cracked_polished_blackstone_bricks.name=\u88C2\u7EB9\u78E8\u5236\u9ED1\u77F3\u7816
tile.polished_blackstone_brick_stairs.name=\u78E8\u5236\u9ED1\u77F3\u7816\u697C\u68AF
tile.blackstone_stairs.name=\u9ED1\u77F3\u697C\u68AF
tile.blackstone_wall.name=\u9ED1\u77F3\u5899
tile.polished_blackstone_brick_wall.name=\u78E8\u5236\u9ED1\u77F3\u7816\u5899
tile.chiseled_polished_blackstone.name=\u96D5\u7EB9\u78E8\u5236\u9ED1\u77F3
tile.gilded_blackstone.name=\u9576\u91D1\u9ED1\u77F3
tile.blackstone_slab.name=\u9ED1\u77F3\u53F0\u9636
tile.blackstone_double_slab.name=\u9ED1\u77F3\u53CC\u5C42\u53F0\u9636
tile.polished_blackstone_brick_slab.name=\u78E8\u5236\u9ED1\u77F3\u7816\u53F0\u9636
tile.polished_blackstone_brick_double_slab.name=\u78E8\u5236\u9ED1\u77F3\u7816\u53CC\u5C42\u53F0\u9636
tile.chain.name=\u9501\u94FE
tile.soul_soil.name=\u7075\u9B42\u571F
tile.soul_fire.name=\u7075\u9B42\u706B
tile.polished_blackstone.name=\u78E8\u5236\u9ED1\u77F3
tile.polished_blackstone_stairs.name=\u78E8\u5236\u9ED1\u77F3\u697C\u68AF
tile.polished_blackstone_slab.name=\u78E8\u5236\u9ED1\u77F3\u53F0\u9636
tile.polished_blackstone_double_slab.name=\u78E8\u5236\u9ED1\u77F3\u53CC\u5C42\u53F0\u9636
tile.polished_blackstone_pressure_plate.name=\u78E8\u5236\u9ED1\u77F3\u538B\u529B\u677F
tile.polished_blackstone_button.name=\u78E8\u5236\u9ED1\u77F3\u6309\u94AE
tile.polished_blackstone_wall.name=\u78E8\u5236\u9ED1\u77F3\u5899
tile.polished_tuff.name=\u78E8\u5236\u51DD\u7070\u5CA9
tile.polished_tuff_slab.name=\u78E8\u5236\u51DD\u7070\u5CA9\u53F0\u9636
tile.polished_tuff_double_slab.name=\u78E8\u5236\u51DD\u7070\u5CA9\u53CC\u5C42\u53F0\u9636
tile.polished_tuff_stairs.name=\u78E8\u5236\u51DD\u7070\u5CA9\u697C\u68AF
tile.polished_tuff_wall.name=\u78E8\u5236\u51DD\u7070\u5CA9\u5899
tile.soul_campfire.name=\u7075\u9B42\u8425\u706B
tile.chiseled_nether_bricks.name=\u96D5\u7EB9\u4E0B\u754C\u7816\u5757
tile.cracked_nether_bricks.name=\u88C2\u7EB9\u4E0B\u754C\u7816\u5757
tile.quartz_bricks.name=\u77F3\u82F1\u7816
tile.trapped_chest.name=\u9677\u9631\u7BB1
tile.shulkerBoxWhite.name=\u767D\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxOrange.name=\u6A59\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxMagenta.name=\u54C1\u7EA2\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxLightBlue.name=\u6DE1\u84DD\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxYellow.name=\u9EC4\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxLime.name=\u9EC4\u7EFF\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxPink.name=\u7C89\u7EA2\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxGray.name=\u7070\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxSilver.name=\u6DE1\u7070\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxCyan.name=\u9752\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxPurple.name=\u7D2B\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxBlue.name=\u84DD\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxBrown.name=\u68D5\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxGreen.name=\u7EFF\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxRed.name=\u7EA2\u8272\u6F5C\u5F71\u76D2
tile.shulkerBoxBlack.name=\u9ED1\u8272\u6F5C\u5F71\u76D2
tile.shulkerBox.name=\u6F5C\u5F71\u76D2
tile.chorus_flower.name=\u7D2B\u9882\u82B1
tile.chorus_plant.name=\u7D2B\u9882\u690D\u682A
tile.clay.name=\u9ECF\u571F
tile.hardened_clay.name=\u9676\u74E6
tile.stained_hardened_clay.name=\u9676\u74E6
tile.structure_block.name=\u7ED3\u6784\u65B9\u5757
tile.structure_void.name=\u7ED3\u6784\u7A7A\u4F4D
tile.trial_spawner.name=\u8BD5\u70BC\u5237\u602A\u7B3C
tile.vault.name=\u5B9D\u5E93
tile.wool.name=\u7F8A\u6BDB
tile.cocoa.name=\u53EF\u53EF\u679C
tile.command_block.name=\u547D\u4EE4\u65B9\u5757
tile.composter.name=\u5806\u80A5\u6876
tile.light_block.name=\u6D45\u8272
tile.repeating_command_block.name=\u5FAA\u73AF\u578B\u547D\u4EE4\u65B9\u5757
tile.chain_command_block.name=\u8FDE\u9501\u578B\u547D\u4EE4\u65B9\u5757
tile.wheat.name=\u5C0F\u9EA6\u690D\u682A
tile.darkOakFence.name=\u6DF1\u8272\u6A61\u6728\u6805\u680F
tile.dark_oak_fence_gate.name=\u6DF1\u8272\u6A61\u6728\u6805\u680F\u95E8
tile.daylight_detector.name=\u9633\u5149\u63A2\u6D4B\u5668
tile.daylight_detector_inverted.name=\u9633\u5149\u63A2\u6D4B\u5668\u5DF2\u53CD\u8F6C
tile.deadbush.name=\u67AF\u840E\u7684\u704C\u6728
tile.detector_rail.name=\u63A2\u6D4B\u94C1\u8F68
tile.dirt.name=\u6CE5\u571F
tile.podzol.name=\u7070\u5316\u571F
tile.dispenser.name=\u53D1\u5C04\u5668
tile.iron_door.name=\u94C1\u95E8
tile.wooden_door.name=\u6728\u95E8
tile.acacia_door.name=\u91D1\u5408\u6B22\u6728\u95E8
tile.dark_oak_door.name=\u6DF1\u8272\u6A61\u6728\u95E8
tile.jungle_door.name=\u4E1B\u6797\u6728\u95E8
tile.spruce_door.name=\u4E91\u6749\u6728\u95E8
tile.doorWood.name=\u6728\u95E8
tile.double_plant.name=\u690D\u7269
tile.dragon_egg.name=\u9F99\u86CB
tile.dropper.name=\u6295\u63B7\u5668
tile.enchanting_table.name=\u9644\u9B54\u53F0
tile.enderChest.name=\u672B\u5F71\u7BB1\u5B50
tile.end_gateway.name=\u672B\u5730\u6298\u8DC3\u95E8
tile.end_portal_frame.name=\u672B\u5730\u4F20\u9001\u95E8\u6846\u67B6
tile.end_portal.name=\u672B\u5730\u4F20\u9001\u95E8
tile.farmland.name=\u8015\u5730
tile.fletching_table.name=\u5236\u7BAD\u53F0
tile.fence.name=\u6A61\u6728\u6805\u680F
tile.fence_gate.name=\u6A61\u6728\u6805\u680F\u95E8
tile.iron_bars.name=\u94C1\u680F\u6746
tile.fire.name=\u706B
tile.yellow_flower.name=\u82B1
tile.red_flower.name=\u82B1
tile.torchflower_crop.name=\u706B\u628A\u82B1\u690D\u682A
tile.wither_rose.name=\u51CB\u7075\u73AB\u7470
tile.flower_pot.name=\u82B1\u76C6
tile.furnace.name=\u7194\u7089
tile.lit_furnace.name=\u70B9\u71C3\u7194\u7089
tile.glass.name=\u73BB\u7483
tile.golden_rail.name=\u52A8\u529B\u94C1\u8F68
tile.grass.name=\u8349
tile.grass_path.name=\u571F\u5F84
tile.gravel.name=\u6C99\u783E
tile.hay_block.name=\u5E72\u8349\u6346
tile.netherrack.name=\u4E0B\u754C\u5CA9
tile.soul_sand.name=\u7075\u9B42\u6C99
tile.hopper.name=\u6F0F\u6597
tile.ice.name=\u51B0
tile.packed_ice.name=\u6D6E\u51B0
tile.blue_ice.name=\u84DD\u51B0
tile.frosted_ice.name=\u971C\u51B0
tile.iron_trapdoor.name=\u94C1\u6D3B\u677F\u95E8
tile.jukebox.name=\u5531\u7247\u673A
tile.jungleFence.name=\u4E1B\u6797\u6728\u6805\u680F
tile.jungle_fence_gate.name=\u4E1B\u6797\u6728\u6805\u680F\u95E8
tile.ladder.name=\u68AF\u5B50
tile.frame.name=\u7269\u54C1\u5C55\u793A\u6846
tile.flowing_lava.name=\u7194\u5CA9
tile.lava.name=\u7194\u5CA9
tile.leaves.name=\u6811\u53F6
tile.lever.name=\u62C9\u6746
tile.glowstone.name=\u8367\u77F3
tile.glow_frame.name=\u8367\u5149\u5C55\u793A\u6846
tile.glow_lichen.name=\u53D1\u5149\u5730\u8863
tile.lightning_rod.name=\u907F\u96F7\u9488
tile.exposed_lightning_rod.name=\u6591\u9A73\u7684\u907F\u96F7\u9488
tile.weathered_lightning_rod.name=\u9508\u8680\u7684\u907F\u96F7\u9488
tile.oxidized_lightning_rod.name=\u6C27\u5316\u7684\u907F\u96F7\u9488
tile.waxed_lightning_rod.name=\u6D82\u8721\u7684\u907F\u96F7\u9488
tile.waxed_exposed_lightning_rod.name=\u6D82\u8721\u7684\u6591\u9A73\u907F\u96F7\u9488
tile.waxed_weathered_lightning_rod.name=\u6D82\u8721\u7684\u9508\u8680\u907F\u96F7\u9488
tile.waxed_oxidized_lightning_rod.name=\u6D82\u8721\u7684\u6C27\u5316\u907F\u96F7\u9488
tile.lit_pumpkin.name=\u5357\u74DC\u706F
tile.lockedchest.name=\u4E0A\u9501\u7684\u7BB1\u5B50
tile.log.name=\u539F\u6728
tile.magma.name=\u5CA9\u6D46\u5757
tile.melon_block.name=\u897F\u74DC
tile.melon_stem.name=\u897F\u74DC\u830E
tile.mob_spawner.name=\u5237\u602A\u7B3C
tile.monster_egg.name=\u88AB\u866B\u8680\u7684\u77F3\u5934
tile.mushroom.name=\u8611\u83C7
tile.noteblock.name=\u97F3\u7B26\u76D2
tile.mycelium.name=\u83CC\u4E1D\u4F53
tile.nether_brick.name=\u4E0B\u754C\u7816
tile.red_nether_brick.name=\u7EA2\u8272\u4E0B\u754C\u7816\u5757
tile.nether_brick_fence.name=\u4E0B\u754C\u7816\u6805\u680F
tile.quartz_ore.name=\u4E0B\u754C\u77F3\u82F1\u77FF\u77F3
tile.netherreactor.name=\u4E0B\u754C\u53CD\u5E94\u6838
tile.nether_wart.name=\u4E0B\u754C\u75A3
tile.nether_wart_block.name=\u4E0B\u754C\u75A3\u5757
tile.warped_wart_block.name=\u8BE1\u5F02\u75A3\u5757
tile.unlit_redstone_torch.name=\u7EA2\u77F3\u706B\u628A
tile.redstone_torch.name=\u7EA2\u77F3\u706B\u628A
tile.soul_torch.name=\u7075\u9B42\u706B\u628A
tile.obsidian.name=\u9ED1\u66DC\u77F3
tile.glowingobsidian.name=\u8367\u5149\u9ED1\u66DC\u77F3
tile.coal_ore.name=\u7164\u77FF\u77F3
tile.diamond_ore.name=\u94BB\u77F3\u77FF\u77F3
tile.emerald_ore.name=\u7EFF\u5B9D\u77F3\u77FF\u77F3
tile.gold_ore.name=\u91D1\u77FF\u77F3
tile.iron_ore.name=\u94C1\u77FF\u77F3
tile.copper_ore.name=\u94DC\u77FF\u77F3
tile.lapis_ore.name=\u9752\u91D1\u77F3\u77FF\u77F3
tile.redstone_ore.name=\u7EA2\u77F3\u77FF\u77F3
tile.lit_redstone_ore.name=\u70B9\u71C3\u7EA2\u77F3\u77FF\u77F3
tile.oreRuby.name=\u7EA2\u5B9D\u77F3\u77FF\u77F3
tile.observer.name=\u4FA6\u6D4B\u5668
tile.piston.name=\u6D3B\u585E
tile.sticky_piston.name=\u9ECF\u6027\u6D3B\u585E
tile.piston_arm_collision.name=\u6D3B\u585E\u624B\u81C2\u78B0\u649E
tile.sticky_piston_arm_collision.name=\u7C98\u6027\u6D3B\u585E\u624B\u81C2\u78B0\u649E
tile.unpowered_comparator.name=\u65E0\u52A8\u529B\u6BD4\u8F83\u5668
tile.powered_comparator.name=\u52A8\u529B\u6BD4\u8F83\u5668
tile.unpowered_repeater.name=\u65E0\u52A8\u529B\u4E2D\u7EE7\u5668
tile.powered_repeater.name=\u52A8\u529B\u4E2D\u7EE7\u5668
tile.portal.name=\u4F20\u9001\u95E8
tile.potatoes.name=\u9A6C\u94C3\u85AF
tile.stone_pressure_plate.name=\u77F3\u5934\u538B\u529B\u677F
tile.wooden_pressure_plate.name=\u6A61\u6728\u538B\u529B\u677F
tile.acacia_pressure_plate.name=\u91D1\u5408\u6B22\u6728\u538B\u529B\u677F
tile.birch_pressure_plate.name=\u767D\u6866\u6728\u538B\u529B\u677F
tile.dark_oak_pressure_plate.name=\u6DF1\u8272\u6A61\u6728\u538B\u529B\u677F
tile.jungle_pressure_plate.name=\u4E1B\u6797\u6728\u538B\u529B\u677F
tile.spruce_pressure_plate.name=\u4E91\u6749\u6728\u538B\u529B\u677F
tile.pumpkin.name=\u5357\u74DC
tile.pumpkin_stem.name=\u5357\u74DC\u830E
tile.quartz_block.name=\u77F3\u82F1\u5757
tile.rail.name=\u94C1\u8F68
tile.red_mushroom.name=\u7EA2\u8272\u8611\u83C7
tile.crimson_fungus.name=\u7EEF\u7EA2\u83CC
tile.warped_fungus.name=\u8BE1\u5F02\u83CC
tile.red_mushroom_block.name=\u7EA2\u8272\u8611\u83C7\u65B9\u5757
tile.red_sandstone.name=\u7EA2\u7802\u5CA9
tile.redstone_wire.name=\u7EA2\u77F3\u7EBF
tile.redstone_lamp.name=\u7EA2\u77F3\u706F
tile.lit_redstone_lamp.name=\u70B9\u4EAE\u7EA2\u77F3\u706F
tile.reeds.name=\u7518\u8517
tile.sand.name=\u6C99\u5B50
tile.sandstone.name=\u7802\u5CA9
tile.seaLantern.name=\u6D77\u6676\u706F
tile.standing_sign.name=\u544A\u793A\u724C
tile.wall_sign.name=\u58C1\u6302\u544A\u793A\u724C
tile.crimson_hanging_sign.name=\u60AC\u6302\u5F0F\u7EEF\u7EA2\u6728\u544A\u793A\u724C
tile.spruce_standing_sign.name=\u4E91\u6749\u6728\u544A\u793A\u724C
tile.spruce_wall_sign.name=\u5899\u4E0A\u7684\u4E91\u6749\u6728\u544A\u793A\u724C
tile.birch_standing_sign.name=\u767D\u6866\u6728\u544A\u793A\u724C
tile.birch_wall_sign.name=\u5899\u4E0A\u7684\u767D\u6866\u6728\u544A\u793A\u724C
tile.birch_hanging_sign.name=\u60AC\u6302\u5F0F\u767D\u6866\u6728\u544A\u793A\u724C
tile.jungle_standing_sign.name=\u4E1B\u6797\u6728\u544A\u793A\u724C
tile.jungle_wall_sign.name=\u5899\u4E0A\u7684\u4E1B\u6797\u6728\u544A\u793A\u724C
tile.jungle_hanging_sign.name=\u60AC\u6302\u5F0F\u4E1B\u6797\u6728\u544A\u793A\u724C
tile.acacia_standing_sign.name=\u91D1\u5408\u6B22\u6728\u544A\u793A\u724C
tile.acacia_wall_sign.name=\u5899\u4E0A\u7684\u91D1\u5408\u6B22\u6728\u544A\u793A\u724C
tile.acacia_hanging_sign.name=\u60AC\u6302\u5F0F\u91D1\u5408\u6B22\u6728\u544A\u793A\u724C
tile.spruce_hanging_sign.name=\u60AC\u6302\u5F0F\u4E91\u6749\u6728\u544A\u793A\u724C
tile.oak_hanging_sign.name=\u60AC\u6302\u5F0F\u6A61\u6728\u544A\u793A\u724C
tile.darkoak_standing_sign.name=\u6DF1\u8272\u6A61\u6728\u544A\u793A\u724C
tile.darkoak_wall_sign.name=\u6DF1\u8272\u6A61\u6728\u58C1\u6302\u544A\u793A\u724C
tile.dark_oak_hanging_sign.name=\u60AC\u6302\u5F0F\u6DF1\u8272\u6A61\u6728\u544A\u793A\u724C
tile.slime.name=\u9ECF\u6DB2\u5757
tile.snow.name=\u96EA
tile.spruceFence.name=\u4E91\u6749\u6728\u6805\u680F
tile.spruce_fence_gate.name=\u4E91\u6749\u6728\u6805\u680F\u95E8
tile.brick_stairs.name=\u7EA2\u7816\u697C\u68AF
tile.nether_brick_stairs.name=\u4E0B\u754C\u7816\u697C\u68AF
tile.quartz_stairs.name=\u77F3\u82F1\u697C\u68AF
tile.smooth_quartz_stairs.name=\u5E73\u6ED1\u77F3\u82F1\u697C\u68AF
tile.red_sandstone_stairs.name=\u7EA2\u7802\u5CA9\u697C\u68AF
tile.sandstone_stairs.name=\u7802\u5CA9\u697C\u68AF
tile.stone_stairs.name=\u77F3\u5934\u697C\u68AF
tile.normal_stone_stairs.name=\u77F3\u8D28\u697C\u68AF
tile.stone_brick_stairs.name=\u77F3\u7816\u697C\u68AF
tile.oak_stairs.name=\u6A61\u6728\u697C\u68AF
tile.acacia_stairs.name=\u91D1\u5408\u6B22\u6728\u697C\u68AF
tile.birch_stairs.name=\u767D\u6866\u6728\u697C\u68AF
tile.dark_oak_stairs.name=\u6DF1\u8272\u6A61\u6728\u697C\u68AF
tile.jungle_stairs.name=\u4E1B\u6797\u6728\u697C\u68AF
tile.spruce_stairs.name=\u4E91\u6749\u6728\u697C\u68AF
tile.purpur_stairs.name=\u7D2B\u73C0\u697C\u68AF
tile.prismarine_stairs.name=\u6D77\u6676\u77F3\u697C\u68AF
tile.dark_prismarine_stairs.name=\u6697\u6D77\u6676\u77F3\u697C\u68AF
tile.prismarine_bricks_stairs.name=\u6D77\u6676\u77F3\u7816\u697C\u68AF
tile.granite_stairs.name=\u82B1\u5C97\u5CA9\u697C\u68AF
tile.diorite_stairs.name=\u95EA\u957F\u5CA9\u697C\u68AF
tile.andesite_stairs.name=\u5B89\u5C71\u5CA9\u697C\u68AF
tile.polished_granite_stairs.name=\u78E8\u5236\u82B1\u5C97\u5CA9\u697C\u68AF
tile.polished_diorite_stairs.name=\u78E8\u5236\u95EA\u957F\u5CA9\u697C\u68AF
tile.polished_andesite_stairs.name=\u78E8\u5236\u5B89\u5C71\u5CA9\u697C\u68AF
tile.mossy_stone_brick_stairs.name=\u82D4\u77F3\u7816\u697C\u68AF
tile.smooth_red_sandstone_stairs.name=\u5E73\u6ED1\u7EA2\u7802\u5CA9\u697C\u68AF
tile.smooth_sandstone_stairs.name=\u5E73\u6ED1\u7802\u5CA9\u697C\u68AF
tile.end_brick_stairs.name=\u672B\u5730\u77F3\u7816\u697C\u68AF
tile.mossy_cobblestone_stairs.name=\u82D4\u77F3\u697C\u68AF
tile.red_nether_brick_stairs.name=\u7EA2\u8272\u4E0B\u754C\u7816\u697C\u68AF
tile.smooth_stone.name=\u5E73\u6ED1\u77F3\u5934
tile.standing_banner.name=\u65D7\u5E1C
tile.wall_banner.name=\u58C1\u6302\u65D7\u5E1C
tile.cobblestone.name=\u5706\u77F3
tile.stonebrick.name=\u77F3\u7816
tile.stonecutter.name=\u5207\u77F3\u673A
tile.stonecutter_block.name=\u5207\u77F3\u673A
tile.mossy_cobblestone.name=\u82D4\u77F3
tile.double_stone_slab.name=\u77F3\u53F0\u9636
tile.stone_slab.name=\u77F3\u5934\u53F0\u9636
tile.tallgrass.name=\u77EE\u8349\u4E1B
tile.tuff_brick_slab.name=\u51DD\u7070\u5CA9\u7816\u53F0\u9636
tile.tuff_brick_double_slab.name=\u51DD\u7070\u5CA9\u7816\u53CC\u5C42\u53F0\u9636
tile.tuff_brick_stairs.name=\u51DD\u7070\u5CA9\u7816\u697C\u68AF
tile.tuff_brick_wall.name=\u51DD\u7070\u5CA9\u7816\u5899
tile.tuff_bricks.name=\u51DD\u7070\u5CA9\u7816
tile.tuff_slab.name=\u51DD\u7070\u5CA9\u53F0\u9636
tile.tuff_double_slab.name=\u51DD\u7070\u5CA9\u53CC\u5C42\u53F0\u9636
tile.tuff_stairs.name=\u51DD\u7070\u5CA9\u697C\u68AF
tile.tuff_wall.name=\u51DD\u7070\u5CA9\u5899
tile.sea_pickle.name=\u6D77\u6CE1\u83DC
tile.turtle_egg.name=\u6D77\u9F9F\u86CB
tile.bubble_column.name=\u6C14\u6CE1\u67F1
tile.dead_bubble_coral_wall_fan.name=\u5899\u4E0A\u7684\u5931\u6D3B\u6C14\u6CE1\u73CA\u745A\u6247
tile.dead_horn_coral_wall_fan.name=\u5899\u4E0A\u7684\u5931\u6D3B\u9E7F\u89D2\u73CA\u745A\u6247
tile.dead_fire_coral_wall_fan.name=\u5899\u4E0A\u7684\u5931\u6D3B\u706B\u73CA\u745A\u6247
tile.tube_coral_wall_fan.name=\u5899\u4E0A\u7684\u7BA1\u73CA\u745A\u6247
tile.dead_brain_coral_wall_fan.name=\u5899\u4E0A\u7684\u5931\u6D3B\u8111\u7EB9\u73CA\u745A\u6247
tile.brain_coral_wall_fan.name=\u5899\u4E0A\u7684\u8111\u7EB9\u73CA\u745A\u6247
tile.horn_coral_wall_fan.name=\u5899\u4E0A\u7684\u9E7F\u89D2\u73CA\u745A\u6247
tile.fire_coral_wall_fan.name=\u5899\u4E0A\u7684\u706B\u73CA\u745A\u6247
tile.bubble_coral_wall_fan.name=\u5899\u4E0A\u7684\u6C14\u6CE1\u73CA\u745A\u6247
tile.dead_tube_coral_wall_fan.name=\u5899\u4E0A\u7684\u5931\u6D3B\u7BA1\u73CA\u745A\u6247
tile.glass_pane.name=\u73BB\u7483\u677F
tile.snow_layer.name=\u96EA
tile.torch.name=\u706B\u628A
tile.trapdoor.name=\u6A61\u6728\u6D3B\u677F\u95E8
tile.acacia_trapdoor.name=\u91D1\u5408\u6B22\u6728\u6D3B\u677F\u95E8
tile.birch_trapdoor.name=\u767D\u6866\u6728\u6D3B\u677F\u95E8
tile.dark_oak_trapdoor.name=\u6DF1\u8272\u6A61\u6728\u6D3B\u677F\u95E8
tile.jungle_trapdoor.name=\u4E1B\u6797\u6728\u6D3B\u677F\u95E8
tile.spruce_trapdoor.name=\u4E91\u6749\u6728\u6D3B\u677F\u95E8
tile.tripWire.name=\u7ECA\u7EBF
tile.tripwire_hook.name=\u7ECA\u7EBF\u94A9
tile.vine.name=\u85E4\u8513
tile.weeping_vines.name=\u5782\u6CEA\u85E4
tile.twisting_vines.name=\u7F20\u6028\u85E4
tile.flowing_water.name=\u6C34
tile.water.name=\u6C34
tile.waterlily.name=\u7761\u83B2
tile.web.name=\u8718\u86DB\u7F51
tile.heavy_weighted_pressure_plate.name=\u91CD\u8D28\u6D4B\u91CD\u538B\u529B\u677F
tile.light_weighted_pressure_plate.name=\u8F7B\u8D28\u6D4B\u91CD\u538B\u529B\u677F
tile.end_stone.name=\u672B\u5730\u77F3
tile.end_bricks.name=\u672B\u5730\u77F3\u7816
tile.planks.name=\u6728\u677F
tile.wooden_slab.name=\u6728\u53F0\u9636
tile.carpet.name=\u5730\u6BEF
tile.crafter.name=\u5408\u6210\u5668
tile.crafting_table.name=\u5DE5\u4F5C\u53F0
tile.pale_oak_button.name=\u82CD\u767D\u6A61\u6728\u6309\u94AE
tile.pale_oak_double_slab.name=\u82CD\u767D\u6A61\u6728\u53CC\u5C42\u53F0\u9636
tile.pale_oak_fence.name=\u82CD\u767D\u6A61\u6728\u6805\u680F
tile.pale_oak_fence_gate.name=\u82CD\u767D\u6A61\u6728\u6805\u680F\u95E8
tile.pale_oak_log.name=\u82CD\u767D\u6A61\u6728\u539F\u6728
tile.pale_oak_planks.name=\u82CD\u767D\u6A61\u6728\u6728\u677F
tile.pale_oak_pressure_plate.name=\u82CD\u767D\u6A61\u6728\u538B\u529B\u677F
tile.pale_oak_standing_sign.name=\u82CD\u767D\u6A61\u6728\u544A\u793A\u724C
tile.pale_oak_wall_sign.name=\u5899\u4E0A\u7684\u82CD\u767D\u6A61\u6728\u544A\u793A\u724C
tile.pale_oak_hanging_sign.name=\u60AC\u6302\u5F0F\u82CD\u767D\u6A61\u6728\u544A\u793A\u724C
tile.pale_oak_slab.name=\u82CD\u767D\u6A61\u6728\u53F0\u9636
tile.pale_oak_stairs.name=\u82CD\u767D\u6A61\u6728\u697C\u68AF
tile.pale_oak_trapdoor.name=\u82CD\u767D\u6A61\u6728\u6D3B\u677F\u95E8
tile.pale_oak_wood.name=\u82CD\u767D\u6A61\u6728
tile.stripped_pale_oak_log.name=\u53BB\u76AE\u82CD\u767D\u6A61\u6728\u539F\u6728
tile.stripped_pale_oak_wood.name=\u53BB\u76AE\u82CD\u767D\u6A61\u6728
tile.pale_hanging_moss.name=\u82CD\u767D\u5782\u987B
tile.pale_moss_block.name=\u82CD\u767D\u82D4\u85D3\u5757
tile.pale_moss_carpet.name=\u82CD\u767D\u8986\u5730\u82D4\u85D3
tile.creaking_heart.name=\u560E\u679D\u4E4B\u5FC3
tile.open_eyeblossom.name=\u5F20\u5F00\u7684\u773C\u7738\u82B1
tile.closed_eyeblossom.name=\u95ED\u5408\u7684\u773C\u7738\u82B1
tile.resin_bricks.name=\u6811\u8102\u7816\u5757
tile.resin_brick_double_slab.name=\u6811\u8102\u7816\u53CC\u5C42\u53F0\u9636
tile.resin_brick_slab.name=\u6811\u8102\u7816\u53F0\u9636
tile.resin_brick_stairs.name=\u6811\u8102\u7816\u697C\u68AF
tile.resin_brick_wall.name=\u6811\u8102\u7816\u5899
tile.chiseled_resin_bricks.name=\u96D5\u7EB9\u6811\u8102\u7816\u5757
tile.resin_block.name=\u6811\u8102\u5757
tile.resin_clump.name=\u6811\u8102\u56E2
tile.glazedTerracottaWhite.name=\u767D\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaOrange.name=\u6A59\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaMagenta.name=\u54C1\u7EA2\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaLightBlue.name=\u6DE1\u84DD\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaYellow.name=\u9EC4\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaLime.name=\u9EC4\u7EFF\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaPink.name=\u7C89\u7EA2\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaGray.name=\u7070\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaSilver.name=\u6DE1\u7070\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaCyan.name=\u9752\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaPurple.name=\u7D2B\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaBlue.name=\u84DD\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaBrown.name=\u68D5\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaGreen.name=\u7EFF\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaRed.name=\u7EA2\u8272\u5E26\u91C9\u9676\u74E6
tile.glazedTerracottaBlack.name=\u9ED1\u8272\u5E26\u91C9\u9676\u74E6
tile.stripped_spruce_log.name=\u53BB\u76AE\u4E91\u6749\u539F\u6728
tile.stripped_dark_oak_log.name=\u53BB\u76AE\u6DF1\u8272\u6A61\u6728\u539F\u6728
tile.stripped_birch_log.name=\u53BB\u76AE\u767D\u6866\u539F\u6728
tile.stripped_jungle_log.name=\u53BB\u76AE\u4E1B\u6797\u539F\u6728
tile.stripped_oak_log.name=\u53BB\u76AE\u6A61\u6728\u539F\u6728
tile.stripped_acacia_log.name=\u53BB\u76AE\u91D1\u5408\u6B22\u539F\u6728
tile.bamboo.name=\u7AF9\u5B50
tile.scaffolding.name=\u811A\u624B\u67B6
tile.grindstone.name=\u7802\u8F6E
tile.cartography_table.name=\u5236\u56FE\u53F0
tile.lantern.name=\u706F\u7B3C
tile.soul_lantern.name=\u7075\u9B42\u706F\u7B3C
tile.smoker.name=\u70DF\u718F\u7089
tile.lit_smoker.name=\u70B9\u71C3\u70DF\u718F\u7089
tile.smithing_table.name=\u953B\u9020\u53F0
tile.barrel.name=\u6728\u6876
tile.campfire.name=\u8425\u706B
tile.loom.name=\u7EC7\u5E03\u673A
tile.lectern.name=\u8BB2\u53F0
tile.sweet_berry_bush.name=\u751C\u6D46\u679C\u4E1B
tile.netherite_block.name=\u4E0B\u754C\u5408\u91D1\u5757
tile.ancient_debris.name=\u8FDC\u53E4\u6B8B\u9AB8
tile.nether_gold_ore.name=\u4E0B\u754C\u91D1\u77FF\u77F3
tile.respawn_anchor.name=\u91CD\u751F\u951A
tile.crying_obsidian.name=\u54ED\u6CE3\u7684\u9ED1\u66DC\u77F3
tile.powder_snow.name=\u7EC6\u96EA
tile.deepslate.name=\u6DF1\u677F\u5CA9
tile.infested_deepslate.name=\u866B\u8680\u6DF1\u677F\u5CA9
tile.cobbled_deepslate.name=\u6DF1\u677F\u5CA9\u5706\u77F3
tile.dripstone_block.name=\u6EF4\u6C34\u77F3\u5757
tile.pointed_dripstone.name=\u6EF4\u6C34\u77F3\u9525
tile.cobbled_deepslate_slab.name=\u6DF1\u677F\u5CA9\u5706\u77F3\u53F0\u9636
tile.cobbled_deepslate_stairs.name=\u6DF1\u677F\u5CA9\u5706\u77F3\u697C\u68AF
tile.cobbled_deepslate_wall.name=\u6DF1\u677F\u5CA9\u5706\u77F3\u5899
tile.polished_deepslate.name=\u78E8\u5236\u6DF1\u677F\u5CA9
tile.polished_deepslate_slab.name=\u78E8\u5236\u6DF1\u677F\u5CA9\u53F0\u9636
tile.polished_deepslate_stairs.name=\u78E8\u5236\u6DF1\u677F\u5CA9\u697C\u68AF
tile.polished_deepslate_wall.name=\u78E8\u5236\u6DF1\u677F\u5CA9\u5899
tile.deepslate_tiles.name=\u6DF1\u677F\u5CA9\u74E6
tile.deepslate_tile_slab.name=\u6DF1\u677F\u5CA9\u74E6\u53F0\u9636
tile.deepslate_tile_stairs.name=\u6DF1\u677F\u5CA9\u74E6\u697C\u68AF
tile.deepslate_tile_wall.name=\u6DF1\u677F\u5CA9\u74E6\u5899
tile.deepslate_bricks.name=\u6DF1\u677F\u5CA9\u7816
tile.deepslate_brick_slab.name=\u6DF1\u677F\u5CA9\u7816\u53F0\u9636
tile.deepslate_brick_stairs.name=\u6DF1\u677F\u5CA9\u7816\u697C\u68AF
tile.deepslate_brick_wall.name=\u6DF1\u677F\u5CA9\u7816\u5899
tile.chiseled_deepslate.name=\u96D5\u7EB9\u6DF1\u677F\u5CA9
tile.cobbled_deepslate_double_slab.name=\u6DF1\u677F\u5CA9\u5706\u77F3\u53CC\u5C42\u53F0\u9636
tile.polished_deepslate_double_slab.name=\u78E8\u5236\u6DF1\u677F\u5CA9\u53CC\u5C42\u53F0\u9636
tile.deepslate_tile_double_slab.name=\u6DF1\u677F\u5CA9\u74E6\u53CC\u5C42\u53F0\u9636
tile.deepslate_brick_double_slab.name=\u6DF1\u677F\u5CA9\u7816\u53CC\u5C42\u53F0\u9636
tile.deepslate_lapis_ore.name=\u6DF1\u5C42\u9752\u91D1\u77F3\u77FF\u77F3
tile.deepslate_iron_ore.name=\u6DF1\u5C42\u94C1\u77FF\u77F3
tile.deepslate_gold_ore.name=\u6DF1\u5C42\u91D1\u77FF\u77F3
tile.deepslate_redstone_ore.name=\u6DF1\u5C42\u7EA2\u77F3\u77FF\u77F3
tile.lit_deepslate_redstone_ore.name=\u70B9\u4EAE\u7684\u6DF1\u677F\u5CA9\u7EA2\u77F3\u77FF\u77F3
tile.deepslate_diamond_ore.name=\u6DF1\u5C42\u94BB\u77F3\u77FF\u77F3
tile.deepslate_coal_ore.name=\u6DF1\u5C42\u7164\u77FF\u77F3
tile.deepslate_emerald_ore.name=\u6DF1\u5C42\u7EFF\u5B9D\u77F3\u77FF\u77F3
tile.deepslate_copper_ore.name=\u6DF1\u5C42\u94DC\u77FF\u77F3
tile.cracked_deepslate_tiles.name=\u88C2\u7EB9\u6DF1\u677F\u5CA9\u74E6
tile.cracked_deepslate_bricks.name=\u88C2\u7EB9\u6DF1\u677F\u5CA9\u7816
tile.pitcher_plant.name=\u74F6\u5B50\u8349
tile.pitcher_crop.name=\u74F6\u5B50\u8349\u690D\u682A
tile.sniffer_egg.name=\u55C5\u63A2\u517D\u86CB
tile.torchflower.name=\u706B\u628A\u82B1
item.copper_ingot.name=\u94DC\u952D
item.raw_copper.name=\u7C97\u94DC
item.raw_iron.name=\u7C97\u94C1
item.raw_gold.name=\u7C97\u91D1
tile.copper_block.name=\u94DC\u5757
tile.exposed_copper.name=\u6591\u9A73\u7684\u94DC\u5757
tile.weathered_copper.name=\u9508\u8680\u7684\u94DC\u5757
tile.oxidized_copper.name=\u6C27\u5316\u7684\u94DC\u5757
tile.waxed_copper.name=\u6D82\u8721\u94DC\u5757
tile.waxed_exposed_copper.name=\u6D82\u8721\u7684\u6591\u9A73\u94DC\u5757
tile.waxed_weathered_copper.name=\u6D82\u8721\u7684\u9508\u8680\u94DC\u5757
tile.waxed_oxidized_copper.name=\u6D82\u8721\u7684\u6C27\u5316\u94DC\u5757
tile.cut_copper.name=\u5207\u5236\u94DC\u5757
tile.exposed_cut_copper.name=\u6591\u9A73\u7684\u5207\u5236\u94DC\u5757
tile.weathered_cut_copper.name=\u9508\u8680\u7684\u5207\u5236\u94DC\u5757
tile.oxidized_cut_copper.name=\u6C27\u5316\u7684\u5207\u5236\u94DC\u5757
tile.waxed_cut_copper.name=\u6D82\u8721\u7684\u5207\u5236\u94DC\u5757
tile.waxed_exposed_cut_copper.name=\u6D82\u8721\u7684\u6591\u9A73\u5207\u5236\u94DC\u5757
tile.waxed_weathered_cut_copper.name=\u6D82\u8721\u7684\u9508\u8680\u5207\u5236\u94DC\u5757
tile.waxed_oxidized_cut_copper.name=\u6D82\u8721\u7684\u6C27\u5316\u5207\u5236\u94DC\u5757
tile.cut_copper_stairs.name=\u5207\u5236\u94DC\u697C\u68AF
tile.exposed_cut_copper_stairs.name=\u6591\u9A73\u7684\u5207\u5236\u94DC\u697C\u68AF
tile.weathered_cut_copper_stairs.name=\u9508\u8680\u7684\u5207\u5236\u94DC\u697C\u68AF
tile.oxidized_cut_copper_stairs.name=\u6C27\u5316\u7684\u5207\u5236\u94DC\u697C\u68AF
tile.waxed_cut_copper_stairs.name=\u6D82\u8721\u7684\u5207\u5236\u94DC\u697C\u68AF
tile.waxed_exposed_cut_copper_stairs.name=\u6D82\u8721\u7684\u6591\u9A73\u5207\u5236\u94DC\u697C\u68AF
tile.waxed_weathered_cut_copper_stairs.name=\u6D82\u8721\u7684\u9508\u8680\u5207\u5236\u94DC\u697C\u68AF
tile.waxed_oxidized_cut_copper_stairs.name=\u6D82\u8721\u7684\u6C27\u5316\u5207\u5236\u94DC\u697C\u68AF
tile.cut_copper_slab.name=\u5207\u5236\u94DC\u53F0\u9636
tile.double_cut_copper_slab.name=\u5207\u5236\u94DC\u53CC\u53F0\u9636
tile.exposed_cut_copper_slab.name=\u6591\u9A73\u7684\u5207\u5236\u94DC\u53F0\u9636
tile.exposed_double_cut_copper_slab.name=\u6591\u9A73\u5207\u5236\u94DC\u53CC\u53F0\u9636
tile.weathered_cut_copper_slab.name=\u9508\u8680\u7684\u5207\u5236\u94DC\u53F0\u9636
tile.weathered_double_cut_copper_slab.name=\u98CE\u5316\u5207\u5236\u94DC\u53CC\u53F0\u9636
tile.oxidized_cut_copper_slab.name=\u6C27\u5316\u7684\u5207\u5236\u94DC\u53F0\u9636
tile.oxidized_double_cut_copper_slab.name=\u6C27\u5316\u5207\u5236\u94DC\u53CC\u53F0\u9636
tile.waxed_cut_copper_slab.name=\u6D82\u8721\u7684\u5207\u5236\u94DC\u53F0\u9636
tile.waxed_double_cut_copper_slab.name=\u6D82\u8721\u5207\u5236\u94DC\u53CC\u53F0\u9636
tile.waxed_exposed_cut_copper_slab.name=\u6D82\u8721\u7684\u6591\u9A73\u5207\u5236\u94DC\u53F0\u9636
tile.waxed_exposed_double_cut_copper_slab.name=\u6D82\u8721\u6591\u9A73\u5207\u5236\u94DC\u53CC\u53F0\u9636
tile.waxed_weathered_cut_copper_slab.name=\u6D82\u8721\u7684\u9508\u8680\u5207\u5236\u94DC\u53F0\u9636
tile.waxed_weathered_double_cut_copper_slab.name=\u6D82\u8721\u98CE\u5316\u5207\u5236\u94DC\u53CC\u53F0\u9636
tile.waxed_oxidized_cut_copper_slab.name=\u6D82\u8721\u7684\u6C27\u5316\u5207\u5236\u94DC\u53F0\u9636
tile.waxed_oxidized_double_cut_copper_slab.name=\u6D82\u8721\u6C27\u5316\u5207\u5236\u94DC\u53CC\u53F0\u9636
tile.chiseled_copper.name=\u96D5\u7EB9\u94DC\u5757
tile.exposed_chiseled_copper.name=\u6591\u9A73\u7684\u96D5\u7EB9\u94DC\u5757
tile.oxidized_chiseled_copper.name=\u6C27\u5316\u7684\u96D5\u7EB9\u94DC\u5757
tile.waxed_chiseled_copper.name=\u6D82\u8721\u7684\u96D5\u7EB9\u94DC\u5757
tile.waxed_exposed_chiseled_copper.name=\u6D82\u8721\u7684\u6591\u9A73\u96D5\u7EB9\u94DC\u5757
tile.waxed_oxidized_chiseled_copper.name=\u6D82\u8721\u7684\u6C27\u5316\u96D5\u7EB9\u94DC\u5757
tile.waxed_weathered_chiseled_copper.name=\u6D82\u8721\u7684\u9508\u8680\u96D5\u7EB9\u94DC\u5757
tile.weathered_chiseled_copper.name=\u9508\u8680\u7684\u96D5\u7EB9\u94DC\u5757
tile.copper_bulb.name=\u94DC\u706F
tile.exposed_copper_bulb.name=\u6591\u9A73\u7684\u94DC\u706F
tile.oxidized_copper_bulb.name=\u6C27\u5316\u7684\u94DC\u706F
tile.waxed_copper_bulb.name=\u6D82\u8721\u7684\u94DC\u706F
tile.waxed_exposed_copper_bulb.name=\u6D82\u8721\u7684\u6591\u9A73\u94DC\u706F
tile.waxed_oxidized_copper_bulb.name=\u6D82\u8721\u7684\u6C27\u5316\u94DC\u706F
tile.waxed_weathered_copper_bulb.name=\u6D82\u8721\u7684\u9508\u8680\u94DC\u706F
tile.weathered_copper_bulb.name=\u9508\u8680\u7684\u94DC\u706F
tile.copper_door.name=\u94DC\u95E8
tile.exposed_copper_door.name=\u6591\u9A73\u7684\u94DC\u95E8
tile.oxidized_copper_door.name=\u6C27\u5316\u7684\u94DC\u95E8
tile.waxed_copper_door.name=\u6D82\u8721\u7684\u94DC\u95E8
tile.waxed_exposed_copper_door.name=\u6D82\u8721\u7684\u6591\u9A73\u94DC\u95E8
tile.waxed_oxidized_copper_door.name=\u6D82\u8721\u7684\u6C27\u5316\u94DC\u95E8
tile.waxed_weathered_copper_door.name=\u6D82\u8721\u7684\u9508\u8680\u94DC\u95E8
tile.weathered_copper_door.name=\u9508\u8680\u7684\u94DC\u95E8
tile.copper_grate.name=\u94DC\u683C\u6805
tile.exposed_copper_grate.name=\u6591\u9A73\u7684\u94DC\u683C\u6805
tile.oxidized_copper_grate.name=\u6C27\u5316\u7684\u94DC\u683C\u6805
tile.waxed_copper_grate.name=\u6D82\u8721\u7684\u94DC\u683C\u6805
tile.waxed_exposed_copper_grate.name=\u6D82\u8721\u7684\u6591\u9A73\u94DC\u683C\u6805
tile.waxed_oxidized_copper_grate.name=\u6D82\u8721\u7684\u6C27\u5316\u94DC\u683C\u6805
tile.waxed_weathered_copper_grate.name=\u6D82\u8721\u7684\u9508\u8680\u94DC\u683C\u6805
tile.weathered_copper_grate.name=\u9508\u8680\u7684\u94DC\u683C\u6805
tile.copper_trapdoor.name=\u94DC\u6D3B\u677F\u95E8
tile.exposed_copper_trapdoor.name=\u6591\u9A73\u7684\u94DC\u6D3B\u677F\u95E8
tile.oxidized_copper_trapdoor.name=\u6C27\u5316\u7684\u94DC\u6D3B\u677F\u95E8
tile.waxed_copper_trapdoor.name=\u6D82\u8721\u7684\u94DC\u6D3B\u677F\u95E8
tile.waxed_exposed_copper_trapdoor.name=\u6D82\u8721\u7684\u6591\u9A73\u94DC\u6D3B\u677F\u95E8
tile.waxed_oxidized_copper_trapdoor.name=\u6D82\u8721\u7684\u6C27\u5316\u94DC\u6D3B\u677F\u95E8
tile.waxed_weathered_copper_trapdoor.name=\u6D82\u8721\u7684\u9508\u8680\u94DC\u6D3B\u677F\u95E8
tile.weathered_copper_trapdoor.name=\u9508\u8680\u7684\u94DC\u6D3B\u677F\u95E8
tile.raw_copper_block.name=\u7C97\u94DC\u5757
tile.raw_iron_block.name=\u7C97\u94C1\u5757
tile.raw_gold_block.name=\u7C97\u91D1\u5757
tile.candle.name=\u8721\u70DB
tile.white_candle.name=\u767D\u8272\u8721\u70DB
tile.orange_candle.name=\u6A59\u8272\u8721\u70DB
tile.magenta_candle.name=\u54C1\u7EA2\u8272\u8721\u70DB
tile.light_blue_candle.name=\u6DE1\u84DD\u8272\u8721\u70DB
tile.yellow_candle.name=\u9EC4\u8272\u8721\u70DB
tile.lime_candle.name=\u9EC4\u7EFF\u8272\u8721\u70DB
tile.pink_candle.name=\u7C89\u7EA2\u8272\u8721\u70DB
tile.gray_candle.name=\u7070\u8272\u8721\u70DB
tile.light_gray_candle.name=\u6DE1\u7070\u8272\u8721\u70DB
tile.cyan_candle.name=\u9752\u8272\u8721\u70DB
tile.purple_candle.name=\u7D2B\u8272\u8721\u70DB
tile.blue_candle.name=\u84DD\u8272\u8721\u70DB
tile.brown_candle.name=\u68D5\u8272\u8721\u70DB
tile.green_candle.name=\u7EFF\u8272\u8721\u70DB
tile.red_candle.name=\u7EA2\u8272\u8721\u70DB
tile.black_candle.name=\u9ED1\u8272\u8721\u70DB
tile.candle_cake.name=\u63D2\u4E0A\u8721\u70DB\u7684\u86CB\u7CD5
tile.white_candle_cake.name=\u63D2\u4E0A\u767D\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.orange_candle_cake.name=\u63D2\u4E0A\u6A59\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.magenta_candle_cake.name=\u63D2\u4E0A\u54C1\u7EA2\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.light_blue_candle_cake.name=\u63D2\u4E0A\u6DE1\u84DD\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.yellow_candle_cake.name=\u63D2\u4E0A\u9EC4\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.lime_candle_cake.name=\u63D2\u4E0A\u9EC4\u7EFF\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.pink_candle_cake.name=\u63D2\u4E0A\u7C89\u7EA2\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.gray_candle_cake.name=\u63D2\u4E0A\u7070\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.light_gray_candle_cake.name=\u63D2\u4E0A\u6DE1\u7070\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.cyan_candle_cake.name=\u63D2\u4E0A\u9752\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.purple_candle_cake.name=\u63D2\u4E0A\u7D2B\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.blue_candle_cake.name=\u63D2\u4E0A\u84DD\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.brown_candle_cake.name=\u63D2\u4E0A\u68D5\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.green_candle_cake.name=\u63D2\u4E0A\u7EFF\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.red_candle_cake.name=\u63D2\u4E0A\u7EA2\u8272\u8721\u70DB\u7684\u86CB\u7CD5
tile.black_candle_cake.name=\u63D2\u4E0A\u9ED1\u8272\u8721\u70DB\u7684\u86CB\u7CD5
item.spyglass.name=\u671B\u8FDC\u955C
item.amethyst_shard.name=\u7D2B\u6C34\u6676\u788E\u7247
tile.amethyst_block.name=\u7D2B\u6C34\u6676\u5757
tile.budding_amethyst.name=\u7D2B\u6C34\u6676\u6BCD\u5CA9
tile.amethyst_cluster.name=\u7D2B\u6C34\u6676\u7C07
tile.large_amethyst_bud.name=\u5927\u578B\u7D2B\u6676\u82BD
tile.medium_amethyst_bud.name=\u4E2D\u578B\u7D2B\u6676\u82BD
tile.small_amethyst_bud.name=\u5C0F\u578B\u7D2B\u6676\u82BD
tile.tuff.name=\u51DD\u7070\u5CA9
tile.calcite.name=\u65B9\u89E3\u77F3
tile.tinted_glass.name=\u906E\u5149\u73BB\u7483
tile.smooth_basalt.name=\u5E73\u6ED1\u7384\u6B66\u5CA9
tile.wildflowers.name=\u91CE\u82B1\u7C07
tile.firefly_bush.name=\u8424\u706B\u866B\u704C\u6728\u4E1B
tile.bush.name=\u704C\u6728\u4E1B
tile.leaf_litter.name=\u67AF\u53F6\u5806
tile.cactus_flower.name=\u4ED9\u4EBA\u638C\u82B1
item.brown_egg.name=\u68D5\u8272\u9E21\u86CB
item.blue_egg.name=\u84DD\u8272\u9E21\u86CB
tile.short_dry_grass.name=\u77EE\u67AF\u8349\u4E1B
tile.tall_dry_grass.name=\u9AD8\u67AF\u8349\u4E1B
entity.happy_ghast.name=\u5FEB\u4E50\u6076\u9B42
tile.dried_ghast.name=\u5931\u6C34\u6076\u9B42
item.black_harness.name=\u9ED1\u8272\u633D\u5177
item.blue_harness.name=\u84DD\u8272\u633D\u5177
item.brown_harness.name=\u68D5\u8272\u633D\u5177
item.cyan_harness.name=\u9752\u8272\u633D\u5177
item.gray_harness.name=\u7070\u8272\u633D\u5177
item.green_harness.name=\u7EFF\u8272\u633D\u5177
item.light_blue_harness.name=\u6DE1\u84DD\u8272\u633D\u5177
item.light_gray_harness.name=\u6DE1\u7070\u8272\u633D\u5177
item.lime_harness.name=\u9EC4\u7EFF\u8272\u633D\u5177
item.magenta_harness.name=\u54C1\u7EA2\u8272\u633D\u5177
item.orange_harness.name=\u6A59\u8272\u633D\u5177
item.pink_harness.name=\u7C89\u7EA2\u8272\u633D\u5177
item.purple_harness.name=\u7D2B\u8272\u633D\u5177
item.red_harness.name=\u7EA2\u8272\u633D\u5177
item.white_harness.name=\u767D\u8272\u633D\u5177
item.yellow_harness.name=\u9EC4\u8272\u633D\u5177
entity.copper_golem.name=\u94DC\u5080\u5121
item.copper_nugget.name=\u94DC\u7C92
item.copper_sword.name=\u94DC\u5251
item.copper_pickaxe.name=\u94DC\u9550
item.copper_axe.name=\u94DC\u65A7
item.copper_shovel.name=\u94DC\u9539
item.copper_hoe.name=\u94DC\u9504
item.copper_boots.name=\u94DC\u9774\u5B50
item.copper_leggings.name=\u94DC\u62A4\u817F
item.copper_chestplate.name=\u94DC\u80F8\u7532
item.copper_helmet.name=\u94DC\u5934\u76D4
tile.copper_chest.name=\u94DC\u7BB1\u5B50
tile.exposed_copper_chest.name=\u6591\u9A73\u7684\u94DC\u7BB1\u5B50
tile.weathered_copper_chest.name=\u9508\u8680\u7684\u94DC\u7BB1\u5B50
tile.oxidized_copper_chest.name=\u6C27\u5316\u7684\u94DC\u7BB1\u5B50
tile.waxed_copper_chest.name=\u6D82\u8721\u7684\u94DC\u7BB1\u5B50
tile.waxed_exposed_copper_chest.name=\u6D82\u8721\u7684\u6591\u9A73\u94DC\u7BB1\u5B50
tile.waxed_weathered_copper_chest.name=\u6D82\u8721\u7684\u9508\u8680\u94DC\u7BB1\u5B50
tile.waxed_oxidized_copper_chest.name=\u6D82\u8721\u7684\u6C27\u5316\u94DC\u7BB1\u5B50
tile.acacia_shelf.name=\u91D1\u5408\u6B22\u6728\u5C55\u793A\u67B6
tile.bamboo_shelf.name=\u7AF9\u5C55\u793A\u67B6
tile.birch_shelf.name=\u767D\u6866\u6728\u5C55\u793A\u67B6
tile.cherry_shelf.name=\u6A31\u82B1\u6728\u5C55\u793A\u67B6
tile.crimson_shelf.name=\u7EEF\u7EA2\u6728\u5C55\u793A\u67B6
tile.dark_oak_shelf.name=\u6DF1\u8272\u6A61\u6728\u5C55\u793A\u67B6
tile.jungle_shelf.name=\u4E1B\u6797\u6728\u5C55\u793A\u67B6
tile.mangrove_shelf.name=\u7EA2\u6811\u6728\u5C55\u793A\u67B6
tile.oak_shelf.name=\u6A61\u6728\u5C55\u793A\u67B6
tile.pale_oak_shelf.name=\u82CD\u767D\u6A61\u6728\u5C55\u793A\u67B6
tile.spruce_shelf.name=\u4E91\u6749\u6728\u5C55\u793A\u67B6
tile.warped_shelf.name=\u8BE1\u5F02\u6728\u5C55\u793A\u67B6
tile.copper_golem_statue.name=\u94DC\u5080\u5121\u50CF
tile.exposed_copper_golem_statue.name=\u6591\u9A73\u7684\u94DC\u5080\u5121\u50CF
tile.weathered_copper_golem_statue.name=\u9508\u8680\u7684\u94DC\u5080\u5121\u50CF
tile.oxidized_copper_golem_statue.name=\u6C27\u5316\u7684\u94DC\u5080\u5121\u50CF
tile.waxed_copper_golem_statue.name=\u6D82\u8721\u7684\u94DC\u5080\u5121\u50CF
tile.waxed_exposed_copper_golem_statue.name=\u6D82\u8721\u7684\u6591\u9A73\u94DC\u5080\u5121\u50CF
tile.waxed_weathered_copper_golem_statue.name=\u6D82\u8721\u7684\u9508\u8680\u94DC\u5080\u5121\u50CF
tile.waxed_oxidized_copper_golem_statue.name=\u6D82\u8721\u7684\u6C27\u5316\u94DC\u5080\u5121\u50CF
tile.copper_chain.name=\u94DC\u94FE
tile.exposed_copper_chain.name=\u6591\u9A73\u7684\u94DC\u94FE
tile.weathered_copper_chain.name=\u9508\u8680\u7684\u94DC\u94FE
tile.oxidized_copper_chain.name=\u6C27\u5316\u7684\u94DC\u94FE
tile.waxed_copper_chain.name=\u6D82\u8721\u7684\u94DC\u94FE
tile.waxed_exposed_copper_chain.name=\u6D82\u8721\u7684\u6591\u9A73\u94DC\u94FE
tile.waxed_weathered_copper_chain.name=\u6D82\u8721\u7684\u9508\u8680\u94DC\u94FE
tile.waxed_oxidized_copper_chain.name=\u6D82\u8721\u7684\u6C27\u5316\u94DC\u94FE
tile.copper_bars.name=\u94DC\u680F\u6746
tile.exposed_copper_bars.name=\u6591\u9A73\u7684\u94DC\u680F\u6746
tile.weathered_copper_bars.name=\u9508\u8680\u7684\u94DC\u680F\u6746
tile.oxidized_copper_bars.name=\u6C27\u5316\u7684\u94DC\u680F\u6746
tile.waxed_copper_bars.name=\u6D82\u8721\u7684\u94DC\u680F\u6746
tile.waxed_exposed_copper_bars.name=\u6D82\u8721\u7684\u6591\u9A73\u94DC\u680F\u6746
tile.waxed_weathered_copper_bars.name=\u6D82\u8721\u7684\u9508\u8680\u94DC\u680F\u6746
tile.waxed_oxidized_copper_bars.name=\u6D82\u8721\u7684\u6C27\u5316\u94DC\u680F\u6746
tile.copper_lantern.name=\u94DC\u706F\u7B3C
tile.exposed_copper_lantern.name=\u6591\u9A73\u7684\u94DC\u706F\u7B3C
tile.weathered_copper_lantern.name=\u9508\u8680\u7684\u94DC\u706F\u7B3C
tile.oxidized_copper_lantern.name=\u6C27\u5316\u7684\u94DC\u706F\u7B3C
tile.waxed_copper_lantern.name=\u6D82\u8721\u7684\u94DC\u706F\u7B3C
tile.waxed_exposed_copper_lantern.name=\u6D82\u8721\u7684\u6591\u9A73\u94DC\u706F\u7B3C
tile.waxed_weathered_copper_lantern.name=\u6D82\u8721\u7684\u9508\u8680\u94DC\u706F\u7B3C
tile.waxed_oxidized_copper_lantern.name=\u6D82\u8721\u7684\u6C27\u5316\u94DC\u706F\u7B3C
tile.copper_torch.name=\u94DC\u706B\u628A
tile.iron_chain.name=\u94C1\u94FE
tile.golden_dandelion.name=\u91D1\u84B2\u516C\u82F1
entity.sulfur_cube.name=\u786B\u65B9\u602A
item.bucketSulfurCube.name=\u786B\u65B9\u602A\u6876
tile.sulfur.name=\u786B\u9EC4
tile.sulfur_slab.name=\u786B\u9EC4\u53F0\u9636
tile.sulfur_double_slab.name=\u786B\u9EC4\u53CC\u53F0\u9636
tile.sulfur_stairs.name=\u786B\u9EC4\u697C\u68AF
tile.sulfur_wall.name=\u786B\u9EC4\u5899
tile.polished_sulfur.name=\u78E8\u5236\u786B\u9EC4
tile.polished_sulfur_slab.name=\u78E8\u5236\u786B\u9EC4\u53F0\u9636
tile.polished_sulfur_double_slab.name=\u78E8\u5236\u786B\u9EC4\u53CC\u53F0\u9636
tile.polished_sulfur_stairs.name=\u78E8\u5236\u786B\u9EC4\u697C\u68AF
tile.polished_sulfur_wall.name=\u78E8\u5236\u786B\u9EC4\u5899
tile.sulfur_bricks.name=\u786B\u9EC4\u7816
tile.sulfur_brick_slab.name=\u786B\u9EC4\u7816\u53F0\u9636
tile.sulfur_brick_double_slab.name=\u786B\u9EC4\u7816\u53CC\u53F0\u9636
tile.sulfur_brick_stairs.name=\u786B\u9EC4\u7816\u697C\u68AF
tile.sulfur_brick_wall.name=\u786B\u9EC4\u7816\u5899
tile.chiseled_sulfur.name=\u96D5\u7EB9\u786B\u9EC4
tile.potent_sulfur.name=\u70C8\u6027\u786B\u9EC4
tile.cinnabar.name=\u6731\u7802
tile.cinnabar_slab.name=\u6731\u7802\u53F0\u9636
tile.cinnabar_double_slab.name=\u6731\u7802\u53CC\u53F0\u9636
tile.cinnabar_stairs.name=\u6731\u7802\u697C\u68AF
tile.cinnabar_wall.name=\u6731\u7802\u5899
tile.polished_cinnabar.name=\u78E8\u5236\u6731\u7802
tile.polished_cinnabar_slab.name=\u78E8\u5236\u6731\u7802\u53F0\u9636
tile.polished_cinnabar_double_slab.name=\u78E8\u5236\u6731\u7802\u53CC\u53F0\u9636
tile.polished_cinnabar_stairs.name=\u78E8\u5236\u6731\u7802\u697C\u68AF
tile.polished_cinnabar_wall.name=\u78E8\u5236\u6731\u7802\u5899
tile.cinnabar_bricks.name=\u6731\u7802\u7816
tile.cinnabar_brick_slab.name=\u6731\u7802\u7816\u53F0\u9636
tile.cinnabar_brick_double_slab.name=\u6731\u7802\u7816\u53CC\u53F0\u9636
tile.cinnabar_brick_stairs.name=\u6731\u7802\u7816\u697C\u68AF
tile.cinnabar_brick_wall.name=\u6731\u7802\u7816\u5899
tile.chiseled_cinnabar.name=\u96D5\u7EB9\u6731\u7802
tile.sulfur_spike.name=\u786B\u9EC4\u5C16\u9525
item.wooden_spear.name=\u6728\u77DB
item.stone_spear.name=\u77F3\u77DB
item.copper_spear.name=\u94DC\u77DB
item.iron_spear.name=\u94C1\u77DB
item.golden_spear.name=\u91D1\u77DB
item.diamond_spear.name=\u94BB\u77F3\u77DB
item.netherite_spear.name=\u4E0B\u754C\u5408\u91D1\u77DB
entity.nautilus.name=\u9E66\u9E49\u87BA
entity.zombie_nautilus.name=\u50F5\u5C38\u9E66\u9E49\u87BA
item.copper_nautilus_armor.name=\u94DC\u9E66\u9E49\u87BA\u94E0
item.iron_nautilus_armor.name=\u94C1\u9E66\u9E49\u87BA\u94E0
item.golden_nautilus_armor.name=\u91D1\u9E66\u9E49\u87BA\u94E0
item.diamond_nautilus_armor.name=\u94BB\u77F3\u9E66\u9E49\u87BA\u94E0
item.netherite_nautilus_armor.name=\u4E0B\u754C\u5408\u91D1\u9E66\u9E49\u87BA\u94E0
entity.parched.name=\u7126\u9AB8
entity.camel_husk.name=\u9A86\u9A7C\u5C38\u58F3
entity.cushion.name=\u5750\u57AB
item.poplar_door.name=\u767D\u6768\u6728\u95E8
item.poplar_hanging_sign.name=\u767D\u6768\u6728\u60AC\u6302\u544A\u793A\u724C
item.poplar_sign.name=\u767D\u6768\u6728\u544A\u793A\u724C
tile.poplar_button.name=\u6768\u6728\u6309\u94AE
tile.poplar_double_slab.name=\u767D\u6768\u6728\u53CC\u5C42\u53F0\u9636
tile.poplar_fence.name=\u6768\u6728\u6805\u680F
tile.poplar_fence_gate.name=\u6768\u6728\u6805\u680F\u95E8
tile.poplar_log.name=\u6768\u6728\u539F\u6728
tile.poplar_planks.name=\u6768\u6728\u6728\u677F
tile.poplar_pressure_plate.name=\u6768\u6728\u538B\u529B\u677F
tile.poplar_slab.name=\u6768\u6728\u53F0\u9636
tile.poplar_stairs.name=\u6768\u6728\u697C\u68AF
tile.poplar_trapdoor.name=\u6768\u6728\u6D3B\u677F\u95E8
tile.poplar_wood.name=\u6768\u6728
tile.stripped_poplar_log.name=\u53BB\u76AE\u6768\u6728\u539F\u6728
tile.stripped_poplar_wood.name=\u53BB\u76AE\u6768\u6728
tile.poplar_door.name=\u6768\u6728\u95E8
tile.poplar_hanging_sign.name=\u60AC\u6302\u5F0F\u6768\u6728\u544A\u793A\u724C
tile.poplar_standing_sign.name=\u767D\u6768\u6728\u544A\u793A\u724C
tile.poplar_wall_sign.name=\u5899\u4E0A\u7684\u6768\u6728\u544A\u793A\u724C
tile.poplar_sapling.name=\u6768\u6811\u6811\u82D7
tile.orange_poplar_leaves.name=\u6A59\u8272\u6768\u6811\u6811\u53F6
tile.red_poplar_leaves.name=\u7EA2\u8272\u6768\u6811\u6811\u53F6
tile.yellow_poplar_leaves.name=\u9EC4\u8272\u6768\u6811\u6811\u53F6
tile.poplar_shelf.name=\u6768\u6728\u5C55\u793A\u67B6
tile.red_shrub.name=\u7EA2\u704C\u6728
tile.shelf_mushroom.name=\u5C42\u5B54\u83C7
tile.blue_wool_stairs.name=\u84DD\u8272\u7F8A\u6BDB\u697C\u68AF
tile.red_wool_stairs.name=\u7EA2\u8272\u7F8A\u6BDB\u697C\u68AF
tile.white_wool_stairs.name=\u767D\u8272\u7F8A\u6BDB\u697C\u68AF
tile.orange_wool_stairs.name=\u6A59\u8272\u7F8A\u6BDB\u697C\u68AF
tile.magenta_wool_stairs.name=\u54C1\u7EA2\u8272\u7F8A\u6BDB\u697C\u68AF
tile.light_blue_wool_stairs.name=\u6DE1\u84DD\u8272\u7F8A\u6BDB\u697C\u68AF
tile.yellow_wool_stairs.name=\u9EC4\u8272\u7F8A\u6BDB\u697C\u68AF
tile.lime_wool_stairs.name=\u9EC4\u7EFF\u8272\u7F8A\u6BDB\u697C\u68AF
tile.pink_wool_stairs.name=\u7C89\u7EA2\u8272\u7F8A\u6BDB\u697C\u68AF
tile.gray_wool_stairs.name=\u7070\u8272\u7F8A\u6BDB\u697C\u68AF
tile.light_gray_wool_stairs.name=\u6DE1\u7070\u8272\u7F8A\u6BDB\u697C\u68AF
tile.cyan_wool_stairs.name=\u9752\u8272\u7F8A\u6BDB\u697C\u68AF
tile.purple_wool_stairs.name=\u7D2B\u8272\u7F8A\u6BDB\u697C\u68AF
tile.green_wool_stairs.name=\u7EFF\u8272\u7F8A\u6BDB\u697C\u68AF
tile.brown_wool_stairs.name=\u68D5\u8272\u7F8A\u6BDB\u697C\u68AF
tile.black_wool_stairs.name=\u9ED1\u8272\u7F8A\u6BDB\u697C\u68AF
tile.white_wool_slab.name=\u767D\u8272\u7F8A\u6BDB\u53F0\u9636
tile.light_gray_wool_slab.name=\u6DE1\u7070\u8272\u7F8A\u6BDB\u53F0\u9636
tile.gray_wool_slab.name=\u7070\u8272\u7F8A\u6BDB\u53F0\u9636
tile.black_wool_slab.name=\u9ED1\u8272\u7F8A\u6BDB\u53F0\u9636
tile.brown_wool_slab.name=\u68D5\u8272\u7F8A\u6BDB\u53F0\u9636
tile.red_wool_slab.name=\u7EA2\u8272\u7F8A\u6BDB\u53F0\u9636
tile.orange_wool_slab.name=\u6A59\u8272\u7F8A\u6BDB\u53F0\u9636
tile.yellow_wool_slab.name=\u9EC4\u8272\u7F8A\u6BDB\u53F0\u9636
tile.lime_wool_slab.name=\u9EC4\u7EFF\u8272\u7F8A\u6BDB\u53F0\u9636
tile.green_wool_slab.name=\u7EFF\u8272\u7F8A\u6BDB\u53F0\u9636
tile.cyan_wool_slab.name=\u9752\u8272\u7F8A\u6BDB\u53F0\u9636
tile.light_blue_wool_slab.name=\u6DE1\u84DD\u8272\u7F8A\u6BDB\u53F0\u9636
tile.blue_wool_slab.name=\u84DD\u8272\u7F8A\u6BDB\u53F0\u9636
tile.purple_wool_slab.name=\u7D2B\u8272\u7F8A\u6BDB\u53F0\u9636
tile.magenta_wool_slab.name=\u54C1\u7EA2\u8272\u7F8A\u6BDB\u53F0\u9636
tile.pink_wool_slab.name=\u7C89\u7EA2\u8272\u7F8A\u6BDB\u53F0\u9636
tile.white_wool_double_slab.name=\u767D\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.light_gray_wool_double_slab.name=\u6DE1\u7070\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.gray_wool_double_slab.name=\u7070\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.black_wool_double_slab.name=\u9ED1\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.brown_wool_double_slab.name=\u68D5\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.red_wool_double_slab.name=\u7EA2\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.orange_wool_double_slab.name=\u6A59\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.yellow_wool_double_slab.name=\u9EC4\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.lime_wool_double_slab.name=\u9EC4\u7EFF\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.green_wool_double_slab.name=\u7EFF\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.cyan_wool_double_slab.name=\u9752\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.light_blue_wool_double_slab.name=\u6DE1\u84DD\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.blue_wool_double_slab.name=\u84DD\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.purple_wool_double_slab.name=\u7D2B\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.magenta_wool_double_slab.name=\u54C1\u7EA2\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.pink_wool_double_slab.name=\u7C89\u7EA2\u8272\u7F8A\u6BDB\u53CC\u5C42\u53F0\u9636
tile.yellow_concrete_stairs.name=\u9EC4\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.white_concrete_stairs.name=\u767D\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.light_gray_concrete_stairs.name=\u6DE1\u7070\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.gray_concrete_stairs.name=\u7070\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.black_concrete_stairs.name=\u9ED1\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.brown_concrete_stairs.name=\u68D5\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.red_concrete_stairs.name=\u7EA2\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.orange_concrete_stairs.name=\u6A59\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.lime_concrete_stairs.name=\u9EC4\u7EFF\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.green_concrete_stairs.name=\u7EFF\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.cyan_concrete_stairs.name=\u9752\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.light_blue_concrete_stairs.name=\u6DE1\u84DD\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.blue_concrete_stairs.name=\u84DD\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.purple_concrete_stairs.name=\u7D2B\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.magenta_concrete_stairs.name=\u54C1\u7EA2\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.pink_concrete_stairs.name=\u7C89\u7EA2\u8272\u6DF7\u51DD\u571F\u697C\u68AF
tile.white_concrete_slab.name=\u767D\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.light_gray_concrete_slab.name=\u6DE1\u7070\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.gray_concrete_slab.name=\u7070\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.black_concrete_slab.name=\u9ED1\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.brown_concrete_slab.name=\u68D5\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.red_concrete_slab.name=\u7EA2\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.orange_concrete_slab.name=\u6A59\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.yellow_concrete_slab.name=\u9EC4\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.lime_concrete_slab.name=\u9EC4\u7EFF\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.green_concrete_slab.name=\u7EFF\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.cyan_concrete_slab.name=\u9752\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.light_blue_concrete_slab.name=\u6DE1\u84DD\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.blue_concrete_slab.name=\u84DD\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.purple_concrete_slab.name=\u7D2B\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.magenta_concrete_slab.name=\u54C1\u7EA2\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.pink_concrete_slab.name=\u7C89\u7EA2\u8272\u6DF7\u51DD\u571F\u53F0\u9636
tile.white_concrete_double_slab.name=\u767D\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.light_gray_concrete_double_slab.name=\u6DE1\u7070\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.gray_concrete_double_slab.name=\u7070\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.black_concrete_double_slab.name=\u9ED1\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.brown_concrete_double_slab.name=\u68D5\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.red_concrete_double_slab.name=\u7EA2\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.orange_concrete_double_slab.name=\u6A59\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.yellow_concrete_double_slab.name=\u9EC4\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.lime_concrete_double_slab.name=\u9EC4\u7EFF\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.green_concrete_double_slab.name=\u7EFF\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.cyan_concrete_double_slab.name=\u9752\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.light_blue_concrete_double_slab.name=\u6DE1\u84DD\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.blue_concrete_double_slab.name=\u84DD\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.purple_concrete_double_slab.name=\u7D2B\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.magenta_concrete_double_slab.name=\u54C1\u7EA2\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.pink_concrete_double_slab.name=\u7C89\u7EA2\u8272\u6DF7\u51DD\u571F\u53CC\u5C42\u53F0\u9636
tile.straw_bed.name=\u9EA6\u79C6\u5E8A
item.straw_bed.name=\u9EA6\u79C6\u5E8A
tile.acacia_fence.name=\u91D1\u5408\u6B22\u6728\u6805\u680F
tile.acacia_leaves.name=\u91D1\u5408\u6B22\u6811\u53F6
tile.acacia_log.name=\u91D1\u5408\u6B22\u539F\u6728
tile.acacia_planks.name=\u91D1\u5408\u6B22\u6728\u677F
tile.acacia_sapling.name=\u91D1\u5408\u6B22\u6811\u82D7
tile.acacia_sign.name=\u91D1\u5408\u6B22\u6728\u544A\u793A\u724C
tile.acacia_slab.name=\u91D1\u5408\u6B22\u6728\u53F0\u9636
tile.acacia_wall_hanging_sign.name=\u5899\u4E0A\u7684\u60AC\u6302\u5F0F\u91D1\u5408\u6B22\u6728\u544A\u793A\u724C
tile.acacia_wood.name=\u91D1\u5408\u6B22\u6728
tile.allium.name=\u7ED2\u7403\u8471
tile.andesite.name=\u5B89\u5C71\u5CA9
tile.andesite_slab.name=\u5B89\u5C71\u5CA9\u53F0\u9636
tile.andesite_wall.name=\u5B89\u5C71\u5CA9\u5899
tile.attached_melon_stem.name=\u7ED3\u679C\u7684\u897F\u74DC\u830E
tile.attached_pumpkin_stem.name=\u7ED3\u679C\u7684\u5357\u74DC\u830E
tile.azure_bluet.name=\u84DD\u82B1\u7F8E\u8033\u8349
tile.bamboo_sign.name=\u7AF9\u544A\u793A\u724C
tile.bamboo_wall_hanging_sign.name=\u5899\u4E0A\u7684\u60AC\u6302\u5F0F\u7AF9\u544A\u793A\u724C
tile.beetroots.name=\u751C\u83DC\u6839
tile.big_dripleaf_stem.name=\u5927\u578B\u5782\u6EF4\u53F6\u830E
tile.birch_fence.name=\u767D\u6866\u6728\u6805\u680F
tile.birch_leaves.name=\u767D\u6866\u6811\u53F6
tile.birch_log.name=\u767D\u6866\u539F\u6728
tile.birch_planks.name=\u767D\u6866\u6728\u677F
tile.birch_sapling.name=\u767D\u6866\u6811\u82D7
tile.birch_sign.name=\u767D\u6866\u6728\u544A\u793A\u724C
tile.birch_slab.name=\u767D\u6866\u6728\u53F0\u9636
tile.birch_wall_hanging_sign.name=\u5899\u4E0A\u7684\u60AC\u6302\u5F0F\u767D\u6866\u6728\u544A\u793A\u724C
tile.birch_wood.name=\u767D\u6866\u6728
tile.black_banner.name=\u9ED1\u8272\u65D7\u5E1C
tile.black_bed.name=\u9ED1\u8272\u5E8A
tile.black_carpet.name=\u9ED1\u8272\u5730\u6BEF
tile.black_concrete.name=\u9ED1\u8272\u6DF7\u51DD\u571F
tile.black_concrete_powder.name=\u9ED1\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.black_glazed_terracotta.name=\u9ED1\u8272\u5E26\u91C9\u9676\u74E6
tile.black_shulker_box.name=\u9ED1\u8272\u6F5C\u5F71\u76D2
tile.black_stained_glass.name=\u9ED1\u8272\u67D3\u8272\u73BB\u7483
tile.black_stained_glass_pane.name=\u9ED1\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.black_terracotta.name=\u9ED1\u8272\u9676\u74E6
tile.black_wool.name=\u9ED1\u8272\u7F8A\u6BDB
tile.blue_banner.name=\u84DD\u8272\u65D7\u5E1C
tile.blue_bed.name=\u84DD\u8272\u5E8A
tile.blue_carpet.name=\u84DD\u8272\u5730\u6BEF
tile.blue_concrete.name=\u84DD\u8272\u6DF7\u51DD\u571F
tile.blue_concrete_powder.name=\u84DD\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.blue_glazed_terracotta.name=\u84DD\u8272\u5E26\u91C9\u9676\u74E6
tile.blue_orchid.name=\u5170\u82B1
tile.blue_shulker_box.name=\u84DD\u8272\u6F5C\u5F71\u76D2
tile.blue_stained_glass.name=\u84DD\u8272\u67D3\u8272\u73BB\u7483
tile.blue_stained_glass_pane.name=\u84DD\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.blue_terracotta.name=\u84DD\u8272\u9676\u74E6
tile.blue_wool.name=\u84DD\u8272\u7F8A\u6BDB
tile.brain_coral.name=\u8111\u7EB9\u73CA\u745A
tile.brain_coral_block.name=\u8111\u7EB9\u73CA\u745A\u5757
tile.brain_coral_fan.name=\u8111\u7EB9\u73CA\u745A\u6247
tile.brewing_stand.name=\u917F\u9020\u53F0
tile.brick_slab.name=\u7EA2\u7816\u53F0\u9636
tile.brick_wall.name=\u7EA2\u7816\u5899
tile.bricks.name=\u7EA2\u7816\u5757
tile.brown_banner.name=\u68D5\u8272\u65D7\u5E1C
tile.brown_bed.name=\u68D5\u8272\u5E8A
tile.brown_carpet.name=\u68D5\u8272\u5730\u6BEF
tile.brown_concrete.name=\u68D5\u8272\u6DF7\u51DD\u571F
tile.brown_concrete_powder.name=\u68D5\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.brown_glazed_terracotta.name=\u68D5\u8272\u5E26\u91C9\u9676\u74E6
tile.brown_mushroom_block.name=\u68D5\u8272\u8611\u83C7\u65B9\u5757
tile.brown_shulker_box.name=\u68D5\u8272\u6F5C\u5F71\u76D2
tile.brown_stained_glass.name=\u68D5\u8272\u67D3\u8272\u73BB\u7483
tile.brown_stained_glass_pane.name=\u68D5\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.brown_terracotta.name=\u68D5\u8272\u9676\u74E6
tile.brown_wool.name=\u68D5\u8272\u7F8A\u6BDB
tile.bubble_coral.name=\u6C14\u6CE1\u73CA\u745A
tile.bubble_coral_block.name=\u6C14\u6CE1\u73CA\u745A\u5757
tile.bubble_coral_fan.name=\u6C14\u6CE1\u73CA\u745A\u6247
tile.cave_air.name=\u6D1E\u7A74\u7A7A\u6C14
tile.cave_vines_plant.name=\u6D1E\u7A74\u85E4\u8513\u690D\u682A
tile.cherry_sign.name=\u6A31\u82B1\u6728\u544A\u793A\u724C
tile.cherry_wall_hanging_sign.name=\u5899\u4E0A\u7684\u60AC\u6302\u5F0F\u6A31\u82B1\u6728\u544A\u793A\u724C
tile.chipped_anvil.name=\u5F00\u88C2\u7684\u94C1\u7827
tile.chiseled_quartz_block.name=\u96D5\u7EB9\u77F3\u82F1\u5757
tile.chiseled_red_sandstone.name=\u96D5\u7EB9\u7EA2\u7802\u5CA9
tile.chiseled_sandstone.name=\u96D5\u7EB9\u7802\u5CA9
tile.chiseled_stone_bricks.name=\u96D5\u7EB9\u77F3\u7816
tile.coarse_dirt.name=\u7802\u571F
tile.cobblestone_slab.name=\u5706\u77F3\u53F0\u9636
tile.cobblestone_stairs.name=\u5706\u77F3\u697C\u68AF
tile.cobblestone_wall.name=\u5706\u77F3\u5899
tile.cobweb.name=\u8718\u86DB\u7F51
tile.comparator.name=\u7EA2\u77F3\u6BD4\u8F83\u5668
tile.copper_wall_torch.name=\u5899\u4E0A\u7684\u94DC\u706B\u628A
tile.cornflower.name=\u77E2\u8F66\u83CA
tile.cracked_stone_bricks.name=\u88C2\u7EB9\u77F3\u7816
tile.creeper_head.name=\u82E6\u529B\u6015\u7684\u5934
tile.creeper_wall_head.name=\u5899\u4E0A\u7684\u82E6\u529B\u6015\u7684\u5934
tile.crimson_roots.name=\u7EEF\u7EA2\u83CC\u7D22
tile.crimson_sign.name=\u7EEF\u7EA2\u6728\u544A\u793A\u724C
tile.crimson_wall_hanging_sign.name=\u5899\u4E0A\u7684\u60AC\u6302\u5F0F\u7EEF\u7EA2\u6728\u544A\u793A\u724C
tile.cut_red_sandstone.name=\u5207\u5236\u7EA2\u7802\u5CA9
tile.cut_red_sandstone_slab.name=\u5207\u5236\u7EA2\u7802\u5CA9\u53F0\u9636
tile.cut_sandstone.name=\u5207\u5236\u7802\u5CA9
tile.cut_sandstone_slab.name=\u5207\u5236\u7802\u5CA9\u53F0\u9636
tile.cyan_banner.name=\u9752\u8272\u65D7\u5E1C
tile.cyan_bed.name=\u9752\u8272\u5E8A
tile.cyan_carpet.name=\u9752\u8272\u5730\u6BEF
tile.cyan_concrete.name=\u9752\u8272\u6DF7\u51DD\u571F
tile.cyan_concrete_powder.name=\u9752\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.cyan_glazed_terracotta.name=\u9752\u8272\u5E26\u91C9\u9676\u74E6
tile.cyan_shulker_box.name=\u9752\u8272\u6F5C\u5F71\u76D2
tile.cyan_stained_glass.name=\u9752\u8272\u67D3\u8272\u73BB\u7483
tile.cyan_stained_glass_pane.name=\u9752\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.cyan_terracotta.name=\u9752\u8272\u9676\u74E6
tile.cyan_wool.name=\u9752\u8272\u7F8A\u6BDB
tile.damaged_anvil.name=\u635F\u574F\u7684\u94C1\u7827
tile.dandelion.name=\u84B2\u516C\u82F1
tile.dark_oak_fence.name=\u6DF1\u8272\u6A61\u6728\u6805\u680F
tile.dark_oak_leaves.name=\u6DF1\u8272\u6A61\u6811\u6811\u53F6
tile.dark_oak_log.name=\u6DF1\u8272\u6A61\u6728\u539F\u6728
tile.dark_oak_planks.name=\u6DF1\u8272\u6A61\u6728\u6728\u677F
tile.dark_oak_sapling.name=\u6DF1\u8272\u6A61\u6811\u6811\u82D7
tile.dark_oak_sign.name=\u6DF1\u8272\u6A61\u6728\u544A\u793A\u724C
tile.dark_oak_slab.name=\u6DF1\u8272\u6A61\u6728\u53F0\u9636
tile.dark_oak_wall_hanging_sign.name=\u5899\u4E0A\u7684\u60AC\u6302\u5F0F\u6DF1\u8272\u6A61\u6728\u544A\u793A\u724C
tile.dark_oak_wall_sign.name=\u5899\u4E0A\u7684\u6DF1\u8272\u6A61\u6728\u544A\u793A\u724C
tile.dark_oak_wood.name=\u6DF1\u8272\u6A61\u6728
tile.dark_prismarine.name=\u6697\u6D77\u6676\u77F3
tile.dark_prismarine_slab.name=\u6697\u6D77\u6676\u77F3\u53F0\u9636
tile.dead_brain_coral.name=\u5931\u6D3B\u7684\u8111\u7EB9\u73CA\u745A
tile.dead_brain_coral_block.name=\u5931\u6D3B\u7684\u8111\u7EB9\u73CA\u745A\u5757
tile.dead_brain_coral_fan.name=\u5931\u6D3B\u7684\u8111\u7EB9\u73CA\u745A\u6247
tile.dead_bubble_coral.name=\u5931\u6D3B\u7684\u6C14\u6CE1\u73CA\u745A
tile.dead_bubble_coral_block.name=\u5931\u6D3B\u7684\u6C14\u6CE1\u73CA\u745A\u5757
tile.dead_bubble_coral_fan.name=\u5931\u6D3B\u7684\u6C14\u6CE1\u73CA\u745A\u6247
tile.dead_bush.name=\u67AF\u840E\u7684\u704C\u6728
tile.dead_fire_coral.name=\u5931\u6D3B\u7684\u706B\u73CA\u745A
tile.dead_fire_coral_block.name=\u5931\u6D3B\u7684\u706B\u73CA\u745A\u5757
tile.dead_fire_coral_fan.name=\u5931\u6D3B\u7684\u706B\u73CA\u745A\u6247
tile.dead_horn_coral.name=\u5931\u6D3B\u7684\u9E7F\u89D2\u73CA\u745A
tile.dead_horn_coral_block.name=\u5931\u6D3B\u7684\u9E7F\u89D2\u73CA\u745A\u5757
tile.dead_horn_coral_fan.name=\u5931\u6D3B\u7684\u9E7F\u89D2\u73CA\u745A\u6247
tile.dead_tube_coral.name=\u5931\u6D3B\u7684\u7BA1\u73CA\u745A
tile.dead_tube_coral_block.name=\u5931\u6D3B\u7684\u7BA1\u73CA\u745A\u5757
tile.dead_tube_coral_fan.name=\u5931\u6D3B\u7684\u7BA1\u73CA\u745A\u6247
tile.diorite.name=\u95EA\u957F\u5CA9
tile.diorite_slab.name=\u95EA\u957F\u5CA9\u53F0\u9636
tile.diorite_wall.name=\u95EA\u957F\u5CA9\u5899
tile.dirt_path.name=\u571F\u5F84
tile.dragon_head.name=\u9F99\u9996
tile.dragon_wall_head.name=\u5899\u4E0A\u7684\u9F99\u9996
tile.end_stone_brick_slab.name=\u672B\u5730\u77F3\u7816\u53F0\u9636
tile.end_stone_brick_stairs.name=\u672B\u5730\u77F3\u7816\u697C\u68AF
tile.end_stone_brick_wall.name=\u672B\u5730\u77F3\u7816\u5899
tile.end_stone_bricks.name=\u672B\u5730\u77F3\u7816
tile.fern.name=\u8568
tile.fire_coral.name=\u706B\u73CA\u745A
tile.fire_coral_block.name=\u706B\u73CA\u745A\u5757
tile.fire_coral_fan.name=\u706B\u73CA\u745A\u6247
tile.flowering_azalea_leaves.name=\u76DB\u5F00\u7684\u675C\u9E43\u6811\u53F6
tile.frogspawn.name=\u9752\u86D9\u5375
tile.granite.name=\u82B1\u5C97\u5CA9
tile.granite_slab.name=\u82B1\u5C97\u5CA9\u53F0\u9636
tile.granite_wall.name=\u82B1\u5C97\u5CA9\u5899
tile.grass_block.name=\u8349\u65B9\u5757
tile.gray_banner.name=\u7070\u8272\u65D7\u5E1C
tile.gray_bed.name=\u7070\u8272\u5E8A
tile.gray_carpet.name=\u7070\u8272\u5730\u6BEF
tile.gray_concrete.name=\u7070\u8272\u6DF7\u51DD\u571F
tile.gray_concrete_powder.name=\u7070\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.gray_glazed_terracotta.name=\u7070\u8272\u5E26\u91C9\u9676\u74E6
tile.gray_shulker_box.name=\u7070\u8272\u6F5C\u5F71\u76D2
tile.gray_stained_glass.name=\u7070\u8272\u67D3\u8272\u73BB\u7483
tile.gray_stained_glass_pane.name=\u7070\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.gray_terracotta.name=\u7070\u8272\u9676\u74E6
tile.gray_wool.name=\u7070\u8272\u7F8A\u6BDB
tile.green_banner.name=\u7EFF\u8272\u65D7\u5E1C
tile.green_bed.name=\u7EFF\u8272\u5E8A
tile.green_carpet.name=\u7EFF\u8272\u5730\u6BEF
tile.green_concrete.name=\u7EFF\u8272\u6DF7\u51DD\u571F
tile.green_concrete_powder.name=\u7EFF\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.green_glazed_terracotta.name=\u7EFF\u8272\u5E26\u91C9\u9676\u74E6
tile.green_shulker_box.name=\u7EFF\u8272\u6F5C\u5F71\u76D2
tile.green_stained_glass.name=\u7EFF\u8272\u67D3\u8272\u73BB\u7483
tile.green_stained_glass_pane.name=\u7EFF\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.green_terracotta.name=\u7EFF\u8272\u9676\u74E6
tile.green_wool.name=\u7EFF\u8272\u7F8A\u6BDB
tile.horn_coral.name=\u9E7F\u89D2\u73CA\u745A
tile.horn_coral_block.name=\u9E7F\u89D2\u73CA\u745A\u5757
tile.horn_coral_fan.name=\u9E7F\u89D2\u73CA\u745A\u6247
tile.infested_chiseled_stone_bricks.name=\u866B\u8680\u96D5\u7EB9\u77F3\u7816
tile.infested_cobblestone.name=\u866B\u8680\u5706\u77F3
tile.infested_cracked_stone_bricks.name=\u866B\u8680\u88C2\u7EB9\u77F3\u7816
tile.infested_mossy_stone_bricks.name=\u866B\u8680\u82D4\u77F3\u7816
tile.infested_stone.name=\u866B\u8680\u77F3\u5934
tile.infested_stone_bricks.name=\u866B\u8680\u77F3\u7816
tile.jack_o_lantern.name=\u5357\u74DC\u706F
tile.jungle_fence.name=\u4E1B\u6797\u6728\u6805\u680F
tile.jungle_leaves.name=\u4E1B\u6797\u6811\u53F6
tile.jungle_log.name=\u4E1B\u6797\u539F\u6728
tile.jungle_planks.name=\u4E1B\u6797\u6728\u677F
tile.jungle_sapling.name=\u4E1B\u6797\u6811\u82D7
tile.jungle_sign.name=\u4E1B\u6797\u6728\u544A\u793A\u724C
tile.jungle_slab.name=\u4E1B\u6797\u6728\u53F0\u9636
tile.jungle_wall_hanging_sign.name=\u5899\u4E0A\u7684\u60AC\u6302\u5F0F\u4E1B\u6797\u6728\u544A\u793A\u724C
tile.jungle_wood.name=\u4E1B\u6797\u6728
tile.kelp_plant.name=\u6D77\u5E26\u690D\u682A
tile.large_fern.name=\u5927\u578B\u8568
tile.lava_cauldron.name=\u88C5\u6709\u7194\u5CA9\u7684\u70BC\u836F\u9505
tile.light.name=\u5149\u6E90\u65B9\u5757
tile.light_blue_banner.name=\u6DE1\u84DD\u8272\u65D7\u5E1C
tile.light_blue_bed.name=\u6DE1\u84DD\u8272\u5E8A
tile.light_blue_carpet.name=\u6DE1\u84DD\u8272\u5730\u6BEF
tile.light_blue_concrete.name=\u6DE1\u84DD\u8272\u6DF7\u51DD\u571F
tile.light_blue_concrete_powder.name=\u6DE1\u84DD\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.light_blue_glazed_terracotta.name=\u6DE1\u84DD\u8272\u5E26\u91C9\u9676\u74E6
tile.light_blue_shulker_box.name=\u6DE1\u84DD\u8272\u6F5C\u5F71\u76D2
tile.light_blue_stained_glass.name=\u6DE1\u84DD\u8272\u67D3\u8272\u73BB\u7483
tile.light_blue_stained_glass_pane.name=\u6DE1\u84DD\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.light_blue_terracotta.name=\u6DE1\u84DD\u8272\u9676\u74E6
tile.light_blue_wool.name=\u6DE1\u84DD\u8272\u7F8A\u6BDB
tile.light_gray_banner.name=\u6DE1\u7070\u8272\u65D7\u5E1C
tile.light_gray_bed.name=\u6DE1\u7070\u8272\u5E8A
tile.light_gray_carpet.name=\u6DE1\u7070\u8272\u5730\u6BEF
tile.light_gray_concrete.name=\u6DE1\u7070\u8272\u6DF7\u51DD\u571F
tile.light_gray_concrete_powder.name=\u6DE1\u7070\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.light_gray_glazed_terracotta.name=\u6DE1\u7070\u8272\u5E26\u91C9\u9676\u74E6
tile.light_gray_shulker_box.name=\u6DE1\u7070\u8272\u6F5C\u5F71\u76D2
tile.light_gray_stained_glass.name=\u6DE1\u7070\u8272\u67D3\u8272\u73BB\u7483
tile.light_gray_stained_glass_pane.name=\u6DE1\u7070\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.light_gray_terracotta.name=\u6DE1\u7070\u8272\u9676\u74E6
tile.light_gray_wool.name=\u6DE1\u7070\u8272\u7F8A\u6BDB
tile.lilac.name=\u4E01\u9999
tile.lily_of_the_valley.name=\u94C3\u5170
tile.lily_pad.name=\u7761\u83B2
tile.lime_banner.name=\u9EC4\u7EFF\u8272\u65D7\u5E1C
tile.lime_bed.name=\u9EC4\u7EFF\u8272\u5E8A
tile.lime_carpet.name=\u9EC4\u7EFF\u8272\u5730\u6BEF
tile.lime_concrete.name=\u9EC4\u7EFF\u8272\u6DF7\u51DD\u571F
tile.lime_concrete_powder.name=\u9EC4\u7EFF\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.lime_glazed_terracotta.name=\u9EC4\u7EFF\u8272\u5E26\u91C9\u9676\u74E6
tile.lime_shulker_box.name=\u9EC4\u7EFF\u8272\u6F5C\u5F71\u76D2
tile.lime_stained_glass.name=\u9EC4\u7EFF\u8272\u67D3\u8272\u73BB\u7483
tile.lime_stained_glass_pane.name=\u9EC4\u7EFF\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.lime_terracotta.name=\u9EC4\u7EFF\u8272\u9676\u74E6
tile.lime_wool.name=\u9EC4\u7EFF\u8272\u7F8A\u6BDB
tile.magenta_banner.name=\u54C1\u7EA2\u8272\u65D7\u5E1C
tile.magenta_bed.name=\u54C1\u7EA2\u8272\u5E8A
tile.magenta_carpet.name=\u54C1\u7EA2\u8272\u5730\u6BEF
tile.magenta_concrete.name=\u54C1\u7EA2\u8272\u6DF7\u51DD\u571F
tile.magenta_concrete_powder.name=\u54C1\u7EA2\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.magenta_glazed_terracotta.name=\u54C1\u7EA2\u8272\u5E26\u91C9\u9676\u74E6
tile.magenta_shulker_box.name=\u54C1\u7EA2\u8272\u6F5C\u5F71\u76D2
tile.magenta_stained_glass.name=\u54C1\u7EA2\u8272\u67D3\u8272\u73BB\u7483
tile.magenta_stained_glass_pane.name=\u54C1\u7EA2\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.magenta_terracotta.name=\u54C1\u7EA2\u8272\u9676\u74E6
tile.magenta_wool.name=\u54C1\u7EA2\u8272\u7F8A\u6BDB
tile.magma_block.name=\u5CA9\u6D46\u5757
tile.mangrove_sign.name=\u7EA2\u6811\u6728\u544A\u793A\u724C
tile.mangrove_wall_hanging_sign.name=\u5899\u4E0A\u7684\u60AC\u6302\u5F0F\u7EA2\u6811\u6728\u544A\u793A\u724C
tile.melon.name=\u897F\u74DC
tile.mossy_cobblestone_slab.name=\u82D4\u77F3\u53F0\u9636
tile.mossy_cobblestone_wall.name=\u82D4\u77F3\u5899
tile.mossy_stone_brick_slab.name=\u82D4\u77F3\u7816\u53F0\u9636
tile.mossy_stone_brick_wall.name=\u82D4\u77F3\u7816\u5899
tile.mossy_stone_bricks.name=\u82D4\u77F3\u7816
tile.moving_piston.name=\u79FB\u52A8\u7684\u6D3B\u585E
tile.mushroom_stem.name=\u8611\u83C7\u67C4
tile.nether_brick_slab.name=\u4E0B\u754C\u7816\u53F0\u9636
tile.nether_brick_wall.name=\u4E0B\u754C\u7816\u5899
tile.nether_bricks.name=\u4E0B\u754C\u7816\u5757
tile.nether_portal.name=\u4E0B\u754C\u4F20\u9001\u95E8
tile.nether_quartz_ore.name=\u4E0B\u754C\u77F3\u82F1\u77FF\u77F3
tile.note_block.name=\u97F3\u7B26\u76D2
tile.oak_button.name=\u6A61\u6728\u6309\u94AE
tile.oak_door.name=\u6A61\u6728\u95E8
tile.oak_fence.name=\u6A61\u6728\u6805\u680F
tile.oak_fence_gate.name=\u6A61\u6728\u6805\u680F\u95E8
tile.oak_leaves.name=\u6A61\u6811\u6811\u53F6
tile.oak_log.name=\u6A61\u6728\u539F\u6728
tile.oak_planks.name=\u6A61\u6728\u6728\u677F
tile.oak_pressure_plate.name=\u6A61\u6728\u538B\u529B\u677F
tile.oak_sapling.name=\u6A61\u6811\u6811\u82D7
tile.oak_sign.name=\u6A61\u6728\u544A\u793A\u724C
tile.oak_slab.name=\u6A61\u6728\u53F0\u9636
tile.oak_trapdoor.name=\u6A61\u6728\u6D3B\u677F\u95E8
tile.oak_wall_hanging_sign.name=\u5899\u4E0A\u7684\u60AC\u6302\u5F0F\u6A61\u6728\u544A\u793A\u724C
tile.oak_wall_sign.name=\u5899\u4E0A\u7684\u6A61\u6728\u544A\u793A\u724C
tile.oak_wood.name=\u6A61\u6728
tile.ominous_banner.name=\u4E0D\u7965\u65D7\u5E1C
tile.orange_banner.name=\u6A59\u8272\u65D7\u5E1C
tile.orange_bed.name=\u6A59\u8272\u5E8A
tile.orange_carpet.name=\u6A59\u8272\u5730\u6BEF
tile.orange_concrete.name=\u6A59\u8272\u6DF7\u51DD\u571F
tile.orange_concrete_powder.name=\u6A59\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.orange_glazed_terracotta.name=\u6A59\u8272\u5E26\u91C9\u9676\u74E6
tile.orange_shulker_box.name=\u6A59\u8272\u6F5C\u5F71\u76D2
tile.orange_stained_glass.name=\u6A59\u8272\u67D3\u8272\u73BB\u7483
tile.orange_stained_glass_pane.name=\u6A59\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.orange_terracotta.name=\u6A59\u8272\u9676\u74E6
tile.orange_tulip.name=\u6A59\u8272\u90C1\u91D1\u9999
tile.orange_wool.name=\u6A59\u8272\u7F8A\u6BDB
tile.oxeye_daisy.name=\u6EE8\u83CA
tile.pale_oak_sign.name=\u82CD\u767D\u6A61\u6728\u544A\u793A\u724C
tile.pale_oak_wall_hanging_sign.name=\u5899\u4E0A\u7684\u60AC\u6302\u5F0F\u82CD\u767D\u6A61\u6728\u544A\u793A\u724C
tile.peony.name=\u7261\u4E39
tile.petrified_oak_slab.name=\u77F3\u5316\u6A61\u6728\u53F0\u9636
tile.piglin_head.name=\u732A\u7075\u7684\u5934
tile.piglin_wall_head.name=\u5899\u4E0A\u7684\u732A\u7075\u7684\u5934
tile.pink_banner.name=\u7C89\u7EA2\u8272\u65D7\u5E1C
tile.pink_bed.name=\u7C89\u7EA2\u8272\u5E8A
tile.pink_carpet.name=\u7C89\u7EA2\u8272\u5730\u6BEF
tile.pink_concrete.name=\u7C89\u7EA2\u8272\u6DF7\u51DD\u571F
tile.pink_concrete_powder.name=\u7C89\u7EA2\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.pink_glazed_terracotta.name=\u7C89\u7EA2\u8272\u5E26\u91C9\u9676\u74E6
tile.pink_shulker_box.name=\u7C89\u7EA2\u8272\u6F5C\u5F71\u76D2
tile.pink_stained_glass.name=\u7C89\u7EA2\u8272\u67D3\u8272\u73BB\u7483
tile.pink_stained_glass_pane.name=\u7C89\u7EA2\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.pink_terracotta.name=\u7C89\u7EA2\u8272\u9676\u74E6
tile.pink_tulip.name=\u7C89\u7EA2\u8272\u90C1\u91D1\u9999
tile.pink_wool.name=\u7C89\u7EA2\u8272\u7F8A\u6BDB
tile.piston_head.name=\u6D3B\u585E\u5934
tile.player_head.name=\u73A9\u5BB6\u7684\u5934
tile.player_wall_head.name=\u5899\u4E0A\u7684\u73A9\u5BB6\u7684\u5934
tile.polished_andesite.name=\u78E8\u5236\u5B89\u5C71\u5CA9
tile.polished_andesite_slab.name=\u78E8\u5236\u5B89\u5C71\u5CA9\u53F0\u9636
tile.polished_diorite.name=\u78E8\u5236\u95EA\u957F\u5CA9
tile.polished_diorite_slab.name=\u78E8\u5236\u95EA\u957F\u5CA9\u53F0\u9636
tile.polished_granite.name=\u78E8\u5236\u82B1\u5C97\u5CA9
tile.polished_granite_slab.name=\u78E8\u5236\u82B1\u5C97\u5CA9\u53F0\u9636
tile.poplar_leaves.name=\u6768\u6811\u6811\u53F6
tile.poplar_sign.name=\u6768\u6728\u544A\u793A\u724C
tile.poplar_wall_hanging_sign.name=\u5899\u4E0A\u7684\u60AC\u6302\u5F0F\u6768\u6728\u544A\u793A\u724C
tile.poppy.name=\u865E\u7F8E\u4EBA
tile.potted_acacia_sapling.name=\u91D1\u5408\u6B22\u6811\u82D7\u76C6\u683D
tile.potted_allium.name=\u7ED2\u7403\u8471\u76C6\u683D
tile.potted_azalea_bush.name=\u675C\u9E43\u82B1\u4E1B\u76C6\u683D
tile.potted_azure_bluet.name=\u84DD\u82B1\u7F8E\u8033\u8349\u76C6\u683D
tile.potted_bamboo.name=\u7AF9\u5B50\u76C6\u683D
tile.potted_birch_sapling.name=\u767D\u6866\u6811\u82D7\u76C6\u683D
tile.potted_blue_orchid.name=\u5170\u82B1\u76C6\u683D
tile.potted_brown_mushroom.name=\u68D5\u8272\u8611\u83C7\u76C6\u683D
tile.potted_cactus.name=\u4ED9\u4EBA\u638C\u76C6\u683D
tile.potted_cherry_sapling.name=\u6A31\u82B1\u6811\u82D7\u76C6\u683D
tile.potted_closed_eyeblossom.name=\u95ED\u5408\u7684\u773C\u7738\u82B1\u76C6\u683D
tile.potted_cornflower.name=\u77E2\u8F66\u83CA\u76C6\u683D
tile.potted_crimson_fungus.name=\u7EEF\u7EA2\u83CC\u76C6\u683D
tile.potted_crimson_roots.name=\u7EEF\u7EA2\u83CC\u7D22\u76C6\u683D
tile.potted_dandelion.name=\u84B2\u516C\u82F1\u76C6\u683D
tile.potted_dark_oak_sapling.name=\u6DF1\u8272\u6A61\u6811\u6811\u82D7\u76C6\u683D
tile.potted_dead_bush.name=\u67AF\u840E\u7684\u704C\u6728\u76C6\u683D
tile.potted_fern.name=\u8568\u76C6\u683D
tile.potted_flowering_azalea_bush.name=\u76DB\u5F00\u7684\u675C\u9E43\u82B1\u4E1B\u76C6\u683D
tile.potted_golden_dandelion.name=\u91D1\u84B2\u516C\u82F1\u76C6\u683D
tile.potted_jungle_sapling.name=\u4E1B\u6797\u6811\u82D7\u76C6\u683D
tile.potted_lily_of_the_valley.name=\u94C3\u5170\u76C6\u683D
tile.potted_mangrove_propagule.name=\u7EA2\u6811\u80CE\u751F\u82D7\u76C6\u683D
tile.potted_oak_sapling.name=\u6A61\u6811\u6811\u82D7\u76C6\u683D
tile.potted_open_eyeblossom.name=\u5F20\u5F00\u7684\u773C\u7738\u82B1\u76C6\u683D
tile.potted_orange_tulip.name=\u6A59\u8272\u90C1\u91D1\u9999\u76C6\u683D
tile.potted_oxeye_daisy.name=\u6EE8\u83CA\u76C6\u683D
tile.potted_pale_oak_sapling.name=\u82CD\u767D\u6A61\u6811\u6811\u82D7\u76C6\u683D
tile.potted_pink_tulip.name=\u7C89\u7EA2\u8272\u90C1\u91D1\u9999\u76C6\u683D
tile.potted_poplar_sapling.name=\u6768\u6811\u6811\u82D7\u76C6\u683D
tile.potted_poppy.name=\u865E\u7F8E\u4EBA\u76C6\u683D
tile.potted_red_mushroom.name=\u7EA2\u8272\u8611\u83C7\u76C6\u683D
tile.potted_red_tulip.name=\u7EA2\u8272\u90C1\u91D1\u9999\u76C6\u683D
tile.potted_spruce_sapling.name=\u4E91\u6749\u6811\u82D7\u76C6\u683D
tile.potted_torchflower.name=\u706B\u628A\u82B1\u76C6\u683D
tile.potted_warped_fungus.name=\u8BE1\u5F02\u83CC\u76C6\u683D
tile.potted_warped_roots.name=\u8BE1\u5F02\u83CC\u7D22\u76C6\u683D
tile.potted_white_tulip.name=\u767D\u8272\u90C1\u91D1\u9999\u76C6\u683D
tile.potted_wither_rose.name=\u51CB\u7075\u73AB\u7470\u76C6\u683D
tile.powder_snow_cauldron.name=\u88C5\u6709\u7EC6\u96EA\u7684\u70BC\u836F\u9505
tile.powered_rail.name=\u52A8\u529B\u94C1\u8F68
tile.prismarine.name=\u6D77\u6676\u77F3
tile.prismarine_brick_slab.name=\u6D77\u6676\u77F3\u7816\u53F0\u9636
tile.prismarine_brick_stairs.name=\u6D77\u6676\u77F3\u7816\u697C\u68AF
tile.prismarine_bricks.name=\u6D77\u6676\u77F3\u7816
tile.prismarine_slab.name=\u6D77\u6676\u77F3\u53F0\u9636
tile.prismarine_wall.name=\u6D77\u6676\u77F3\u5899
tile.purple_banner.name=\u7D2B\u8272\u65D7\u5E1C
tile.purple_bed.name=\u7D2B\u8272\u5E8A
tile.purple_carpet.name=\u7D2B\u8272\u5730\u6BEF
tile.purple_concrete.name=\u7D2B\u8272\u6DF7\u51DD\u571F
tile.purple_concrete_powder.name=\u7D2B\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.purple_glazed_terracotta.name=\u7D2B\u8272\u5E26\u91C9\u9676\u74E6
tile.purple_shulker_box.name=\u7D2B\u8272\u6F5C\u5F71\u76D2
tile.purple_stained_glass.name=\u7D2B\u8272\u67D3\u8272\u73BB\u7483
tile.purple_stained_glass_pane.name=\u7D2B\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.purple_terracotta.name=\u7D2B\u8272\u9676\u74E6
tile.purple_wool.name=\u7D2B\u8272\u7F8A\u6BDB
tile.purpur_block.name=\u7D2B\u73C0\u5757
tile.purpur_pillar.name=\u7D2B\u73C0\u67F1
tile.purpur_slab.name=\u7D2B\u73C0\u53F0\u9636
tile.quartz_pillar.name=\u77F3\u82F1\u67F1
tile.quartz_slab.name=\u77F3\u82F1\u53F0\u9636
tile.red_banner.name=\u7EA2\u8272\u65D7\u5E1C
tile.red_bed.name=\u7EA2\u8272\u5E8A
tile.red_carpet.name=\u7EA2\u8272\u5730\u6BEF
tile.red_concrete.name=\u7EA2\u8272\u6DF7\u51DD\u571F
tile.red_concrete_powder.name=\u7EA2\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.red_glazed_terracotta.name=\u7EA2\u8272\u5E26\u91C9\u9676\u74E6
tile.red_nether_brick_slab.name=\u7EA2\u8272\u4E0B\u754C\u7816\u53F0\u9636
tile.red_nether_brick_wall.name=\u7EA2\u8272\u4E0B\u754C\u7816\u5899
tile.red_nether_bricks.name=\u7EA2\u8272\u4E0B\u754C\u7816\u5757
tile.red_sand.name=\u7EA2\u6C99
tile.red_sandstone_slab.name=\u7EA2\u7802\u5CA9\u53F0\u9636
tile.red_sandstone_wall.name=\u7EA2\u7802\u5CA9\u5899
tile.red_shulker_box.name=\u7EA2\u8272\u6F5C\u5F71\u76D2
tile.red_stained_glass.name=\u7EA2\u8272\u67D3\u8272\u73BB\u7483
tile.red_stained_glass_pane.name=\u7EA2\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.red_terracotta.name=\u7EA2\u8272\u9676\u74E6
tile.red_tulip.name=\u7EA2\u8272\u90C1\u91D1\u9999
tile.red_wool.name=\u7EA2\u8272\u7F8A\u6BDB
tile.redstone_wall_torch.name=\u5899\u4E0A\u7684\u7EA2\u77F3\u706B\u628A
tile.repeater.name=\u7EA2\u77F3\u4E2D\u7EE7\u5668
tile.rooted_dirt.name=\u7F20\u6839\u6CE5\u571F
tile.rose_bush.name=\u73AB\u7470\u4E1B
tile.sandstone_slab.name=\u7802\u5CA9\u53F0\u9636
tile.sandstone_wall.name=\u7802\u5CA9\u5899
tile.sea_lantern.name=\u6D77\u6676\u706F
tile.seagrass.name=\u6D77\u8349
tile.set_spawn.name=\u5DF2\u8BBE\u7F6E\u91CD\u751F\u70B9
tile.short_grass.name=\u77EE\u8349\u4E1B
tile.shulker_box.name=\u6F5C\u5F71\u76D2
tile.skeleton_skull.name=\u9AB7\u9AC5\u5934\u9885
tile.skeleton_wall_skull.name=\u5899\u4E0A\u7684\u9AB7\u9AC5\u5934\u9885
tile.slime_block.name=\u9ECF\u6DB2\u5757
tile.small_dripleaf.name=\u5C0F\u578B\u5782\u6EF4\u53F6
tile.smooth_quartz.name=\u5E73\u6ED1\u77F3\u82F1\u5757
tile.smooth_quartz_slab.name=\u5E73\u6ED1\u77F3\u82F1\u53F0\u9636
tile.smooth_red_sandstone.name=\u5E73\u6ED1\u7EA2\u7802\u5CA9
tile.smooth_red_sandstone_slab.name=\u5E73\u6ED1\u7EA2\u7802\u5CA9\u53F0\u9636
tile.smooth_sandstone.name=\u5E73\u6ED1\u7802\u5CA9
tile.smooth_sandstone_slab.name=\u5E73\u6ED1\u7802\u5CA9\u53F0\u9636
tile.smooth_stone_slab.name=\u5E73\u6ED1\u77F3\u5934\u53F0\u9636
tile.snow_block.name=\u96EA\u5757
tile.soul_wall_torch.name=\u5899\u4E0A\u7684\u7075\u9B42\u706B\u628A
tile.spawner.name=\u5237\u602A\u7B3C
tile.sponge.name=\u6D77\u7EF5
tile.spruce_fence.name=\u4E91\u6749\u6728\u6805\u680F
tile.spruce_leaves.name=\u4E91\u6749\u6811\u53F6
tile.spruce_log.name=\u4E91\u6749\u539F\u6728
tile.spruce_planks.name=\u4E91\u6749\u6728\u677F
tile.spruce_sapling.name=\u4E91\u6749\u6811\u82D7
tile.spruce_sign.name=\u4E91\u6749\u6728\u544A\u793A\u724C
tile.spruce_slab.name=\u4E91\u6749\u6728\u53F0\u9636
tile.spruce_wall_hanging_sign.name=\u5899\u4E0A\u7684\u60AC\u6302\u5F0F\u4E91\u6749\u6728\u544A\u793A\u724C
tile.spruce_wood.name=\u4E91\u6749\u6728
tile.stone.name=\u77F3\u5934
tile.stone_brick_slab.name=\u77F3\u7816\u53F0\u9636
tile.stone_brick_wall.name=\u77F3\u7816\u5899
tile.stone_bricks.name=\u77F3\u7816
tile.stripped_acacia_wood.name=\u53BB\u76AE\u91D1\u5408\u6B22\u6728
tile.stripped_birch_wood.name=\u53BB\u76AE\u767D\u6866\u6728
tile.stripped_dark_oak_wood.name=\u53BB\u76AE\u6DF1\u8272\u6A61\u6728
tile.stripped_jungle_wood.name=\u53BB\u76AE\u4E1B\u6797\u6728
tile.stripped_oak_wood.name=\u53BB\u76AE\u6A61\u6728
tile.stripped_spruce_wood.name=\u53BB\u76AE\u4E91\u6749\u6728
tile.sugar_cane.name=\u7518\u8517
tile.sunflower.name=\u5411\u65E5\u8475
tile.tall_grass.name=\u9AD8\u8349\u4E1B
tile.tall_seagrass.name=\u9AD8\u6D77\u8349
tile.terracotta.name=\u9676\u74E6
tile.test_block.name=\u6D4B\u8BD5\u65B9\u5757
tile.test_instance_block.name=\u6D4B\u8BD5\u5B9E\u4F8B\u65B9\u5757
tile.tripwire.name=\u7ECA\u7EBF
tile.tube_coral.name=\u7BA1\u73CA\u745A
tile.tube_coral_block.name=\u7BA1\u73CA\u745A\u5757
tile.tube_coral_fan.name=\u7BA1\u73CA\u745A\u6247
tile.twisting_vines_plant.name=\u7F20\u6028\u85E4\u690D\u682A
tile.void_air.name=\u865A\u7A7A\u7A7A\u6C14
tile.wall_torch.name=\u5899\u4E0A\u7684\u706B\u628A
tile.warped_roots.name=\u8BE1\u5F02\u83CC\u7D22
tile.warped_sign.name=\u8BE1\u5F02\u6728\u544A\u793A\u724C
tile.warped_wall_hanging_sign.name=\u5899\u4E0A\u7684\u60AC\u6302\u5F0F\u8BE1\u5F02\u6728\u544A\u793A\u724C
tile.water_cauldron.name=\u88C5\u6709\u6C34\u7684\u70BC\u836F\u9505
tile.waxed_copper_block.name=\u6D82\u8721\u7684\u94DC\u5757
tile.weeping_vines_plant.name=\u5782\u6CEA\u85E4\u690D\u682A
tile.wet_sponge.name=\u6E7F\u6D77\u7EF5
tile.white_banner.name=\u767D\u8272\u65D7\u5E1C
tile.white_bed.name=\u767D\u8272\u5E8A
tile.white_carpet.name=\u767D\u8272\u5730\u6BEF
tile.white_concrete.name=\u767D\u8272\u6DF7\u51DD\u571F
tile.white_concrete_powder.name=\u767D\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.white_glazed_terracotta.name=\u767D\u8272\u5E26\u91C9\u9676\u74E6
tile.white_shulker_box.name=\u767D\u8272\u6F5C\u5F71\u76D2
tile.white_stained_glass.name=\u767D\u8272\u67D3\u8272\u73BB\u7483
tile.white_stained_glass_pane.name=\u767D\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.white_terracotta.name=\u767D\u8272\u9676\u74E6
tile.white_tulip.name=\u767D\u8272\u90C1\u91D1\u9999
tile.white_wool.name=\u767D\u8272\u7F8A\u6BDB
tile.wither_skeleton_skull.name=\u51CB\u7075\u9AB7\u9AC5\u5934\u9885
tile.wither_skeleton_wall_skull.name=\u5899\u4E0A\u7684\u51CB\u7075\u9AB7\u9AC5\u5934\u9885
tile.yellow_banner.name=\u9EC4\u8272\u65D7\u5E1C
tile.yellow_bed.name=\u9EC4\u8272\u5E8A
tile.yellow_carpet.name=\u9EC4\u8272\u5730\u6BEF
tile.yellow_concrete.name=\u9EC4\u8272\u6DF7\u51DD\u571F
tile.yellow_concrete_powder.name=\u9EC4\u8272\u6DF7\u51DD\u571F\u7C89\u672B
tile.yellow_glazed_terracotta.name=\u9EC4\u8272\u5E26\u91C9\u9676\u74E6
tile.yellow_shulker_box.name=\u9EC4\u8272\u6F5C\u5F71\u76D2
tile.yellow_stained_glass.name=\u9EC4\u8272\u67D3\u8272\u73BB\u7483
tile.yellow_stained_glass_pane.name=\u9EC4\u8272\u67D3\u8272\u73BB\u7483\u677F
tile.yellow_terracotta.name=\u9EC4\u8272\u9676\u74E6
tile.yellow_wool.name=\u9EC4\u8272\u7F8A\u6BDB
tile.zombie_head.name=\u50F5\u5C38\u7684\u5934
tile.zombie_wall_head.name=\u5899\u4E0A\u7684\u50F5\u5C38\u7684\u5934
entity.acacia_boat.name=\u91D1\u5408\u6B22\u6728\u8239
entity.acacia_chest_boat.name=\u91D1\u5408\u6B22\u6728\u8FD0\u8F93\u8239
entity.bamboo_chest_raft.name=\u8FD0\u8F93\u7AF9\u7B4F
entity.bamboo_raft.name=\u7AF9\u7B4F
entity.birch_boat.name=\u767D\u6866\u6728\u8239
entity.birch_chest_boat.name=\u767D\u6866\u6728\u8FD0\u8F93\u8239
entity.block_display.name=\u65B9\u5757\u5C55\u793A\u5B9E\u4F53
entity.breeze_wind_charge.name=\u98CE\u5F39
entity.cherry_boat.name=\u6A31\u82B1\u6728\u8239
entity.cherry_chest_boat.name=\u6A31\u82B1\u6728\u8FD0\u8F93\u8239
entity.creaking_transient.name=\u560E\u679D
entity.dark_oak_boat.name=\u6DF1\u8272\u6A61\u6728\u8239
entity.dark_oak_chest_boat.name=\u6DF1\u8272\u6A61\u6728\u8FD0\u8F93\u8239
entity.end_crystal.name=\u672B\u5730\u6C34\u6676
entity.evoker.name=\u5524\u9B54\u8005
entity.evoker_fangs.name=\u5524\u9B54\u8005\u5C16\u7259
entity.experience_bottle.name=\u63B7\u51FA\u7684\u9644\u9B54\u4E4B\u74F6
entity.experience_orb.name=\u7ECF\u9A8C\u7403
entity.eye_of_ender.name=\u672B\u5F71\u4E4B\u773C
entity.falling_block_type.name=\u4E0B\u843D\u7684%s
entity.firework_rocket.name=\u70DF\u82B1\u706B\u7BAD
entity.fishing_bobber.name=\u6D6E\u6F02
entity.giant.name=\u5DE8\u4EBA
entity.glow_item_frame.name=\u8367\u5149\u7269\u54C1\u5C55\u793A\u6846
entity.illusioner.name=\u5E7B\u672F\u5E08
entity.interaction.name=\u4EA4\u4E92\u5B9E\u4F53
entity.item_display.name=\u7269\u54C1\u5C55\u793A\u5B9E\u4F53
entity.item_frame.name=\u7269\u54C1\u5C55\u793A\u6846
entity.jungle_boat.name=\u4E1B\u6797\u6728\u8239
entity.jungle_chest_boat.name=\u4E1B\u6797\u6728\u8FD0\u8F93\u8239
entity.killer_bunny.name=\u6740\u624B\u5154
entity.mangrove_boat.name=\u7EA2\u6811\u6728\u8239
entity.mangrove_chest_boat.name=\u7EA2\u6811\u6728\u8FD0\u8F93\u8239
entity.mannequin.name=\u73A9\u5BB6\u6A21\u578B
entity.marker.name=\u6807\u8BB0
entity.oak_boat.name=\u6A61\u6728\u8239
entity.oak_chest_boat.name=\u6A61\u6728\u8FD0\u8F93\u8239
entity.pale_oak_boat.name=\u82CD\u767D\u6A61\u6728\u8239
entity.pale_oak_chest_boat.name=\u82CD\u767D\u6A61\u6728\u8FD0\u8F93\u8239
entity.poplar_boat.name=\u6768\u6728\u8239
entity.poplar_chest_boat.name=\u6768\u6728\u8FD0\u8F93\u8239
entity.potion.name=\u836F\u6C34
entity.spawner_minecart.name=\u5237\u602A\u7B3C\u77FF\u8F66
entity.spectral_arrow.name=\u5149\u7075\u7BAD
entity.spruce_boat.name=\u4E91\u6749\u6728\u8239
entity.spruce_chest_boat.name=\u4E91\u6749\u6728\u8FD0\u8F93\u8239
entity.text_display.name=\u6587\u672C\u5C55\u793A\u5B9E\u4F53
entity.trident.name=\u4E09\u53C9\u621F
entity.tropical_fish.name=\u70ED\u5E26\u9C7C
entity.wind_charge.name=\u98CE\u5F39
entity.zombified_piglin.name=\u50F5\u5C38\u732A\u7075
item.abandoned_camp_map.name=\u5E9F\u5F03\u8425\u5730\u5730\u56FE
item.abandoned_campsite_map.name=\u5E9F\u5F03\u8425\u5730\u5730\u56FE
item.acacia_boat.name=\u91D1\u5408\u6B22\u6728\u8239
item.acacia_chest_boat.name=\u91D1\u5408\u6B22\u6728\u8FD0\u8F93\u8239
item.allay_spawn_egg.name=\u60A6\u7075\u5237\u602A\u86CB
item.ancient_city_map.name=\u8FDC\u53E4\u57CE\u5E02\u5730\u56FE
item.angler_pottery_shard.name=\u5782\u9493\u7EB9\u6837\u9676\u7247
item.archer_pottery_shard.name=\u5F13\u7BAD\u7EB9\u6837\u9676\u7247
item.armadillo_spawn_egg.name=\u72B0\u72F3\u5237\u602A\u86CB
item.arms_up_pottery_shard.name=\u4E3E\u81C2\u7EB9\u6837\u9676\u7247
item.axolotl_bucket.name=\u7F8E\u897F\u8788\u6876
item.axolotl_spawn_egg.name=\u7F8E\u897F\u8788\u5237\u602A\u86CB
item.bamboo_chest_raft.name=\u8FD0\u8F93\u7AF9\u7B4F
item.bamboo_raft.name=\u7AF9\u7B4F
item.bat_spawn_egg.name=\u8759\u8760\u5237\u602A\u86CB
item.bee_spawn_egg.name=\u871C\u8702\u5237\u602A\u86CB
item.birch_boat.name=\u767D\u6866\u6728\u8239
item.birch_chest_boat.name=\u767D\u6866\u6728\u8FD0\u8F93\u8239
item.black_cushion.name=\u9ED1\u8272\u5750\u57AB
item.black_dye.name=\u9ED1\u8272\u67D3\u6599
item.blade_pottery_shard.name=\u5229\u5203\u7EB9\u6837\u9676\u7247
item.blaze_spawn_egg.name=\u70C8\u7130\u4EBA\u5237\u602A\u86CB
item.blue_cushion.name=\u84DD\u8272\u5750\u57AB
item.blue_dye.name=\u84DD\u8272\u67D3\u6599
item.bogged_spawn_egg.name=\u6CBC\u9AB8\u5237\u602A\u86CB
item.bone_meal.name=\u9AA8\u7C89
item.breeze_spawn_egg.name=\u65CB\u98CE\u4EBA\u5237\u602A\u86CB
item.brewer_pottery_shard.name=\u4F73\u917F\u7EB9\u6837\u9676\u7247
item.brown_cushion.name=\u68D5\u8272\u5750\u57AB
item.brown_dye.name=\u68D5\u8272\u67D3\u6599
item.buried_ancient_city_map.name=\u57CB\u85CF\u7684\u8FDC\u53E4\u57CE\u5E02\u5730\u56FE
item.buried_mineshaft_map.name=\u57CB\u85CF\u7684\u5E9F\u5F03\u77FF\u4E95\u5730\u56FE
item.buried_treasure_map.name=\u85CF\u5B9D\u56FE
item.buried_trial_chambers_map.name=\u57CB\u85CF\u7684\u8BD5\u70BC\u5BC6\u5BA4\u5730\u56FE
item.burn_pottery_shard.name=\u70C8\u7130\u7EB9\u6837\u9676\u7247
item.camel_husk_spawn_egg.name=\u9A86\u9A7C\u5C38\u58F3\u5237\u602A\u86CB
item.camel_spawn_egg.name=\u9A86\u9A7C\u5237\u602A\u86CB
item.carrot_on_a_stick.name=\u80E1\u841D\u535C\u9493\u7AFF
item.cat_spawn_egg.name=\u732B\u5237\u602A\u86CB
item.cave_spider_spawn_egg.name=\u6D1E\u7A74\u8718\u86DB\u5237\u602A\u86CB
item.cherry_boat.name=\u6A31\u82B1\u6728\u8239
item.cherry_chest_boat.name=\u6A31\u82B1\u6728\u8FD0\u8F93\u8239
item.chicken_spawn_egg.name=\u9E21\u5237\u602A\u86CB
item.cocoa_beans.name=\u53EF\u53EF\u8C46
item.cod.name=\u751F\u9CD5\u9C7C
item.cod_bucket.name=\u9CD5\u9C7C\u6876
item.cod_spawn_egg.name=\u9CD5\u9C7C\u5237\u602A\u86CB
item.cooked_cod.name=\u719F\u9CD5\u9C7C
item.cooked_mutton.name=\u719F\u7F8A\u8089
item.copper_golem_spawn_egg.name=\u94DC\u5080\u5121\u5237\u602A\u86CB
item.cow_spawn_egg.name=\u725B\u5237\u602A\u86CB
item.creaking_spawn_egg.name=\u560E\u679D\u5237\u602A\u86CB
item.creeper_spawn_egg.name=\u82E6\u529B\u6015\u5237\u602A\u86CB
item.cyan_cushion.name=\u9752\u8272\u5750\u57AB
item.cyan_dye.name=\u9752\u8272\u67D3\u6599
item.danger_pottery_shard.name=\u5371\u673A\u7EB9\u6837\u9676\u7247
item.dark_oak_boat.name=\u6DF1\u8272\u6A61\u6728\u8239
item.dark_oak_chest_boat.name=\u6DF1\u8272\u6A61\u6728\u8FD0\u8F93\u8239
item.debug_stick.name=\u8C03\u8BD5\u68D2
item.desert_pyramid_map.name=\u6C99\u6F20\u795E\u6BBF\u5730\u56FE
item.desert_village_map.name=\u6C99\u6F20\u6751\u5E84\u5730\u56FE
item.diamond_horse_armor.name=\u94BB\u77F3\u9A6C\u94E0
item.disc_fragment_5.name=\u5531\u7247\u6B8B\u7247
item.dolphin_spawn_egg.name=\u6D77\u8C5A\u5237\u602A\u86CB
item.donkey_spawn_egg.name=\u9A74\u5237\u602A\u86CB
item.drowned_spawn_egg.name=\u6EBA\u5C38\u5237\u602A\u86CB
item.elder_guardian_spawn_egg.name=\u8FDC\u53E4\u5B88\u536B\u8005\u5237\u602A\u86CB
item.enchanted_golden_apple.name=\u9644\u9B54\u91D1\u82F9\u679C
item.ender_dragon_spawn_egg.name=\u672B\u5F71\u9F99\u5237\u602A\u86CB
item.enderman_spawn_egg.name=\u672B\u5F71\u4EBA\u5237\u602A\u86CB
item.endermite_spawn_egg.name=\u672B\u5F71\u87A8\u5237\u602A\u86CB
item.evoker_spawn_egg.name=\u5524\u9B54\u8005\u5237\u602A\u86CB
item.explorer_pottery_shard.name=\u63A2\u9669\u7EB9\u6837\u9676\u7247
item.filled_map.name=\u5730\u56FE
item.fire_charge.name=\u706B\u7130\u5F39
item.firework_rocket.name=\u70DF\u82B1\u706B\u7BAD
item.firework_star.name=\u70DF\u706B\u4E4B\u661F
item.fox_spawn_egg.name=\u72D0\u72F8\u5237\u602A\u86CB
item.friend_pottery_shard.name=\u631A\u53CB\u7EB9\u6837\u9676\u7247
item.frog_spawn_egg.name=\u9752\u86D9\u5237\u602A\u86CB
item.furnace_minecart.name=\u52A8\u529B\u77FF\u8F66
item.ghast_spawn_egg.name=\u6076\u9B42\u5237\u602A\u86CB
item.glistering_melon_slice.name=\u95EA\u70C1\u7684\u897F\u74DC\u7247
item.glow_item_frame.name=\u8367\u5149\u7269\u54C1\u5C55\u793A\u6846
item.glow_squid_spawn_egg.name=\u53D1\u5149\u9C7F\u9C7C\u5237\u602A\u86CB
item.goat_spawn_egg.name=\u5C71\u7F8A\u5237\u602A\u86CB
item.golden_horse_armor.name=\u91D1\u9A6C\u94E0
item.gray_cushion.name=\u7070\u8272\u5750\u57AB
item.gray_dye.name=\u7070\u8272\u67D3\u6599
item.green_cushion.name=\u7EFF\u8272\u5750\u57AB
item.green_dye.name=\u7EFF\u8272\u67D3\u6599
item.guardian_spawn_egg.name=\u5B88\u536B\u8005\u5237\u602A\u86CB
item.happy_ghast_spawn_egg.name=\u5FEB\u4E50\u6076\u9B42\u5237\u602A\u86CB
item.harness.name=\u633D\u5177
item.heart_pottery_shard.name=\u7231\u5FC3\u7EB9\u6837\u9676\u7247
item.heartbreak_pottery_shard.name=\u5FC3\u788E\u7EB9\u6837\u9676\u7247
item.hoglin_spawn_egg.name=\u75A3\u732A\u517D\u5237\u602A\u86CB
item.horse_spawn_egg.name=\u9A6C\u5237\u602A\u86CB
item.howl_pottery_shard.name=\u72FC\u568E\u7EB9\u6837\u9676\u7247
item.husk_spawn_egg.name=\u5C38\u58F3\u5237\u602A\u86CB
item.ink_sac.name=\u58A8\u56CA
item.iron_golem_spawn_egg.name=\u94C1\u5080\u5121\u5237\u602A\u86CB
item.iron_horse_armor.name=\u94C1\u9A6C\u94E0
item.item_frame.name=\u7269\u54C1\u5C55\u793A\u6846
item.jungle_boat.name=\u4E1B\u6797\u6728\u8239
item.jungle_chest_boat.name=\u4E1B\u6797\u6728\u8FD0\u8F93\u8239
item.jungle_explorer_map.name=\u4E1B\u6797\u63A2\u9669\u5BB6\u5730\u56FE
item.jungle_pyramid_map.name=\u4E1B\u6797\u795E\u5E99\u5730\u56FE
item.knowledge_book.name=\u77E5\u8BC6\u4E4B\u4E66
item.lapis_lazuli.name=\u9752\u91D1\u77F3
item.lava_bucket.name=\u7194\u5CA9\u6876
item.leather_horse_armor.name=\u76AE\u9769\u9A6C\u94E0
item.light_blue_cushion.name=\u6DE1\u84DD\u8272\u5750\u57AB
item.light_blue_dye.name=\u6DE1\u84DD\u8272\u67D3\u6599
item.light_gray_cushion.name=\u6DE1\u7070\u8272\u5750\u57AB
item.light_gray_dye.name=\u6DE1\u7070\u8272\u67D3\u6599
item.lime_cushion.name=\u9EC4\u7EFF\u8272\u5750\u57AB
item.lime_dye.name=\u9EC4\u7EFF\u8272\u67D3\u6599
item.lingering_potion.name=\u6EDE\u7559\u836F\u6C34
item.llama_spawn_egg.name=\u7F8A\u9A7C\u5237\u602A\u86CB
item.lodestone_compass.name=\u78C1\u77F3\u6307\u9488
item.magenta_cushion.name=\u54C1\u7EA2\u8272\u5750\u57AB
item.magenta_dye.name=\u54C1\u7EA2\u8272\u67D3\u6599
item.magma_cube_spawn_egg.name=\u5CA9\u6D46\u602A\u5237\u602A\u86CB
item.mangrove_boat.name=\u7EA2\u6811\u6728\u8239
item.mangrove_chest_boat.name=\u7EA2\u6811\u6728\u8FD0\u8F93\u8239
item.melon_slice.name=\u897F\u74DC\u7247
item.milk_bucket.name=\u5976\u6876
item.miner_pottery_shard.name=\u91C7\u77FF\u7EB9\u6837\u9676\u7247
item.mineshaft_map.name=\u5E9F\u5F03\u77FF\u4E95\u5730\u56FE
item.mooshroom_spawn_egg.name=\u54DE\u83C7\u5237\u602A\u86CB
item.mourner_pottery_shard.name=\u60B2\u6078\u7EB9\u6837\u9676\u7247
item.mule_spawn_egg.name=\u9AA1\u5237\u602A\u86CB
item.music_disc_11.name=\u97F3\u4E50\u5531\u7247
item.music_disc_13.name=\u97F3\u4E50\u5531\u7247
item.music_disc_5.name=\u97F3\u4E50\u5531\u7247
item.music_disc_blocks.name=\u97F3\u4E50\u5531\u7247
item.music_disc_bounce.name=\u97F3\u4E50\u5531\u7247
item.music_disc_cat.name=\u97F3\u4E50\u5531\u7247
item.music_disc_chirp.name=\u97F3\u4E50\u5531\u7247
item.music_disc_creator.name=\u97F3\u4E50\u5531\u7247
item.music_disc_creator_music_box.name=\u97F3\u4E50\u5531\u7247
item.music_disc_far.name=\u97F3\u4E50\u5531\u7247
item.music_disc_lava_chicken.name=\u97F3\u4E50\u5531\u7247
item.music_disc_mall.name=\u97F3\u4E50\u5531\u7247
item.music_disc_mellohi.name=\u97F3\u4E50\u5531\u7247
item.music_disc_otherside.name=\u97F3\u4E50\u5531\u7247
item.music_disc_pigstep.name=\u97F3\u4E50\u5531\u7247
item.music_disc_precipice.name=\u97F3\u4E50\u5531\u7247
item.music_disc_relic.name=\u97F3\u4E50\u5531\u7247
item.music_disc_stal.name=\u97F3\u4E50\u5531\u7247
item.music_disc_strad.name=\u97F3\u4E50\u5531\u7247
item.music_disc_tears.name=\u97F3\u4E50\u5531\u7247
item.music_disc_wait.name=\u97F3\u4E50\u5531\u7247
item.music_disc_ward.name=\u97F3\u4E50\u5531\u7247
item.mutton.name=\u751F\u7F8A\u8089
item.nautilus_spawn_egg.name=\u9E66\u9E49\u87BA\u5237\u602A\u86CB
item.nether_brick.name=\u4E0B\u754C\u7816
item.nether_star.name=\u4E0B\u754C\u4E4B\u661F
item.oak_boat.name=\u6A61\u6728\u8239
item.oak_chest_boat.name=\u6A61\u6728\u8FD0\u8F93\u8239
item.ocean_explorer_map.name=\u6D77\u6D0B\u63A2\u9669\u5BB6\u5730\u56FE
item.ocean_monument_map.name=\u6D77\u5E95\u795E\u6BBF\u5730\u56FE
item.ocelot_spawn_egg.name=\u8C79\u732B\u5237\u602A\u86CB
item.orange_cushion.name=\u6A59\u8272\u5750\u57AB
item.orange_dye.name=\u6A59\u8272\u67D3\u6599
item.pale_oak_boat.name=\u82CD\u767D\u6A61\u6728\u8239
item.pale_oak_chest_boat.name=\u82CD\u767D\u6A61\u6728\u8FD0\u8F93\u8239
item.panda_spawn_egg.name=\u718A\u732B\u5237\u602A\u86CB
item.parched_spawn_egg.name=\u7126\u9AB8\u5237\u602A\u86CB
item.parrot_spawn_egg.name=\u9E66\u9E49\u5237\u602A\u86CB
item.phantom_spawn_egg.name=\u5E7B\u7FFC\u5237\u602A\u86CB
item.pig_spawn_egg.name=\u732A\u5237\u602A\u86CB
item.piglin_brute_spawn_egg.name=\u732A\u7075\u86EE\u5175\u5237\u602A\u86CB
item.piglin_spawn_egg.name=\u732A\u7075\u5237\u602A\u86CB
item.pillager_spawn_egg.name=\u63A0\u593A\u8005\u5237\u602A\u86CB
item.pink_cushion.name=\u7C89\u7EA2\u8272\u5750\u57AB
item.pink_dye.name=\u7C89\u7EA2\u8272\u67D3\u6599
item.pitcher_plant.name=\u74F6\u5B50\u8349
item.plains_village_map.name=\u5E73\u539F\u6751\u5E84\u5730\u56FE
item.plenty_pottery_shard.name=\u5BCC\u9976\u7EB9\u6837\u9676\u7247
item.polar_bear_spawn_egg.name=\u5317\u6781\u718A\u5237\u602A\u86CB
item.poplar_boat.name=\u6768\u6728\u8239
item.poplar_chest_boat.name=\u6768\u6728\u8FD0\u8F93\u8239
item.popped_chorus_fruit.name=\u7206\u88C2\u7D2B\u9882\u679C
item.potion.name=\u836F\u6C34
item.pottery_shard_archer.name=\u5F13\u7BAD\u7EB9\u6837\u9676\u7247
item.pottery_shard_arms_up.name=\u4E3E\u81C2\u7EB9\u6837\u9676\u7247
item.pottery_shard_prize.name=\u73CD\u5B9D\u7EB9\u6837\u9676\u7247
item.pottery_shard_skull.name=\u5934\u9885\u7EB9\u6837\u9676\u7247
item.powder_snow_bucket.name=\u7EC6\u96EA\u6876
item.prize_pottery_shard.name=\u73CD\u5B9D\u7EB9\u6837\u9676\u7247
item.pufferfish_bucket.name=\u6CB3\u8C5A\u6876
item.pufferfish_spawn_egg.name=\u6CB3\u8C5A\u5237\u602A\u86CB
item.purple_cushion.name=\u7D2B\u8272\u5750\u57AB
item.purple_dye.name=\u7D2B\u8272\u67D3\u6599
item.rabbit_spawn_egg.name=\u5154\u5B50\u5237\u602A\u86CB
item.ravager_spawn_egg.name=\u52AB\u63A0\u517D\u5237\u602A\u86CB
item.red_cushion.name=\u7EA2\u8272\u5750\u57AB
item.red_dye.name=\u7EA2\u8272\u67D3\u6599
item.resin_clump.name=\u6811\u8102\u56E2
item.salmon_bucket.name=\u9C91\u9C7C\u6876
item.salmon_spawn_egg.name=\u9C91\u9C7C\u5237\u602A\u86CB
item.savanna_village_map.name=\u70ED\u5E26\u8349\u539F\u6751\u5E84\u5730\u56FE
item.scute.name=\u9CDE\u7532
item.sheaf_pottery_shard.name=\u9EA6\u6346\u7EB9\u6837\u9676\u7247
item.sheep_spawn_egg.name=\u7EF5\u7F8A\u5237\u602A\u86CB
item.shelter_pottery_shard.name=\u6811\u836B\u7EB9\u6837\u9676\u7247
item.shulker_spawn_egg.name=\u6F5C\u5F71\u8D1D\u5237\u602A\u86CB
item.silverfish_spawn_egg.name=\u8839\u866B\u5237\u602A\u86CB
item.skeleton_horse_spawn_egg.name=\u9AB7\u9AC5\u9A6C\u5237\u602A\u86CB
item.skeleton_spawn_egg.name=\u9AB7\u9AC5\u5237\u602A\u86CB
item.skull_pottery_shard.name=\u5934\u9885\u7EB9\u6837\u9676\u7247
item.slime_spawn_egg.name=\u53F2\u83B1\u59C6\u5237\u602A\u86CB
item.sniffer_spawn_egg.name=\u55C5\u63A2\u517D\u5237\u602A\u86CB
item.snort_pottery_shard.name=\u55C5\u63A2\u7EB9\u6837\u9676\u7247
item.snow_golem_spawn_egg.name=\u96EA\u5080\u5121\u5237\u602A\u86CB
item.snowy_village_map.name=\u96EA\u539F\u6751\u5E84\u5730\u56FE
item.spectral_arrow.name=\u5149\u7075\u7BAD
item.spider_spawn_egg.name=\u8718\u86DB\u5237\u602A\u86CB
item.splash_potion.name=\u55B7\u6E85\u836F\u6C34
item.spruce_boat.name=\u4E91\u6749\u6728\u8239
item.spruce_chest_boat.name=\u4E91\u6749\u6728\u8FD0\u8F93\u8239
item.squid_spawn_egg.name=\u9C7F\u9C7C\u5237\u602A\u86CB
item.stray_spawn_egg.name=\u6D41\u6D6A\u8005\u5237\u602A\u86CB
item.strider_spawn_egg.name=\u70BD\u8DB3\u517D\u5237\u602A\u86CB
item.sulfur_cube_bucket.name=\u786B\u65B9\u602A\u6876
item.sulfur_cube_spawn_egg.name=\u786B\u65B9\u602A\u5237\u602A\u86CB
item.swamp_explorer_map.name=\u6CBC\u6CFD\u63A2\u9669\u5BB6\u5730\u56FE
item.swamp_hut_map.name=\u6CBC\u6CFD\u5C0F\u5C4B\u5730\u56FE
item.tadpole_bucket.name=\u874C\u86AA\u6876
item.tadpole_spawn_egg.name=\u874C\u86AA\u5237\u602A\u86CB
item.taiga_village_map.name=\u9488\u53F6\u6797\u6751\u5E84\u5730\u56FE
item.totem_of_undying.name=\u4E0D\u6B7B\u56FE\u817E
item.trader_llama_spawn_egg.name=\u884C\u5546\u7F8A\u9A7C\u5237\u602A\u86CB
item.trial_explorer_map.name=\u8BD5\u70BC\u63A2\u9669\u5BB6\u5730\u56FE
item.tropical_fish.name=\u70ED\u5E26\u9C7C
item.tropical_fish_bucket.name=\u70ED\u5E26\u9C7C\u6876
item.tropical_fish_spawn_egg.name=\u70ED\u5E26\u9C7C\u5237\u602A\u86CB
item.turtle_scute.name=\u6D77\u9F9F\u9CDE\u7532
item.turtle_spawn_egg.name=\u6D77\u9F9F\u5237\u602A\u86CB
item.vex_spawn_egg.name=\u607C\u9B3C\u5237\u602A\u86CB
item.villager_spawn_egg.name=\u6751\u6C11\u5237\u602A\u86CB
item.vindicator_spawn_egg.name=\u536B\u9053\u58EB\u5237\u602A\u86CB
item.wandering_trader_spawn_egg.name=\u6D41\u6D6A\u5546\u4EBA\u5237\u602A\u86CB
item.warden_spawn_egg.name=\u76D1\u5B88\u8005\u5237\u602A\u86CB
item.warm_ocean_ruins_map.name=\u6696\u6C34\u6D77\u5E95\u5E9F\u589F\u5730\u56FE
item.water_bucket.name=\u6C34\u6876
item.white_cushion.name=\u767D\u8272\u5750\u57AB
item.white_dye.name=\u767D\u8272\u67D3\u6599
item.witch_spawn_egg.name=\u5973\u5DEB\u5237\u602A\u86CB
item.wither_skeleton_spawn_egg.name=\u51CB\u7075\u9AB7\u9AC5\u5237\u602A\u86CB
item.wither_spawn_egg.name=\u51CB\u7075\u5237\u602A\u86CB
item.wolf_spawn_egg.name=\u72FC\u5237\u602A\u86CB
item.woodland_explorer_map.name=\u6797\u5730\u63A2\u9669\u5BB6\u5730\u56FE
item.woodland_mansion_map.name=\u6797\u5730\u5E9C\u90B8\u5730\u56FE
item.yellow_cushion.name=\u9EC4\u8272\u5750\u57AB
item.yellow_dye.name=\u9EC4\u8272\u67D3\u6599
item.zoglin_spawn_egg.name=\u50F5\u5C38\u75A3\u732A\u517D\u5237\u602A\u86CB
item.zombie_horse_spawn_egg.name=\u50F5\u5C38\u9A6C\u5237\u602A\u86CB
item.zombie_nautilus_spawn_egg.name=\u50F5\u5C38\u9E66\u9E49\u87BA\u5237\u602A\u86CB
item.zombie_spawn_egg.name=\u50F5\u5C38\u5237\u602A\u86CB
item.zombie_villager_spawn_egg.name=\u50F5\u5C38\u6751\u6C11\u5237\u602A\u86CB
item.zombified_piglin_spawn_egg.name=\u50F5\u5C38\u732A\u7075\u5237\u602A\u86CB`;var Cr=[["\u786B\u9EC4","\u786B\u78FA"],["\u98CE\u5316\u94DC","\u9508\u8680\u94DC"],["\u70C8\u6027\u786B\u78FA","\u6D53\u7F29\u786B\u78FA"]],ri={sulfur_spike:"\u786B\u78FA\u5C16\u9525",sulfur_spike_base:"\u786B\u78FA\u5C16\u9525\u57FA\u5EA7"};var Ec=/[\u4e00-\u9fa5]/,ct={block:new Map,item:new Map,entity:new Map},kn=null,Mr={},Bc={grass_path:"dirt_path",lit_furnace:"furnace",flowing_water:"water",flowing_lava:"lava",grass:"short_grass",villager_v2:"villager",zombie_villager_v2:"zombie_villager",wither_skeleton:"wither_skeleton",snow_golem:"snow_golem"};function $r(e,n){let t=0;for(let a of e.split(/\r?\n/)){let i=a.trim();if(!i||i.startsWith("#")||i.startsWith("//"))continue;let o=i.indexOf("=");if(o<0)continue;let r=i.slice(0,o).trim(),s=i.slice(o+1).trim();if(!r||!s||!Ec.test(s))continue;let l=r.match(/^(tile|block|item|entity)\.(.+)$/i);if(!l)continue;let c=l[2].replace(/\.(name|description)$/i,""),m=l[1].toLowerCase()==="entity"?n.entity:l[1].toLowerCase()==="item"?n.item:n.block;!c.includes(".")&&!m.has(c)?(m.set(c,s),t++):c.includes(".")&&!m.has(c)&&m.set(c,s)}return t}function si(e){if(ct.block.clear(),ct.item.clear(),ct.entity.clear(),!e)return 0;let n=e.paths().filter(t=>/(^|\/)texts\/zh[^/]*\.lang$/i.test(t));for(let t of n)try{$r(e.getText(t),ct)}catch(a){}return ct.block.size+ct.item.size+ct.entity.size}function Cc(){return kn||(kn={block:new Map,item:new Map,entity:new Map},$r(Br,kn),kn)}var xn=new Map,It="";function zr(){xn.clear();try{It=localStorage.getItem("mcbe_name_fix")||""}catch(e){It=It||""}for(let e of It.split(/\r?\n/)){let n=e.indexOf("=");if(n<=0)continue;let t=e.slice(0,n).trim().replace(/^minecraft:/i,"").toLowerCase(),a=e.slice(n+1).trim();t&&a&&xn.set(t,a)}}function Tr(){return It}function Ir(e){It=e||"";try{localStorage.setItem("mcbe_name_fix",It)}catch(n){}return zr(),xn.size}zr();function ia(e){return String(e).replace(/^minecraft:/i,"").toLowerCase()}function Lr(e,n){let t=ia(e);if(xn.has(t))return xn.get(t);let a=Bc[t],i=a?[t,a]:[t];for(let r of i)if(ct[n].has(r))return ct[n].get(r);let o=Cc();for(let r of i){if(o[n].has(r))return o[n].get(r);if(o.item.has(r))return o.item.get(r);if(Mr[r])return Mr[r]}return null}function Nr(e,n){if(!e)return e;let t=ia(n);if(ri[t])return ri[t];let a=e;for(let[i,o]of Cr)a=a.split(i).join(o);return a}function et(e){return Nr(Lr(e,"block"),e)||ia(e).replace(/_/g," ")}function Ar(e){return Nr(Lr(e,"entity"),e)||ia(e).replace(/_/g," ")}var ci={pig:[64,32],cow:[64,32],chicken:[64,32],creeper:[64,32],zombie:[64,64],sheep:[64,32],villager_v2:[64,64]},Dr=Object.keys(ci);function Sn(){return crypto&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{let n=Math.random()*16|0;return(e==="x"?n:n&3|8).toString(16)})}function je(e,n){let t=e.replace("#","");return"rgba("+parseInt(t.slice(0,2),16)+","+parseInt(t.slice(2,4),16)+","+parseInt(t.slice(4,6),16)+","+(n!=null?n:1)+")"}function Mc(e,n,t){let a=document.createElement("canvas");a.width=e,a.height=n;let i=a.getContext("2d");i.clearRect(0,0,e,n),t(i,e,n);let o=a.toDataURL("image/png"),r=o.slice(o.indexOf(",")+1),s=atob(r),l=new Uint8Array(s.length);for(let c=0;c<s.length;c++)l[c]=s.charCodeAt(c);return l}function jr(e,n,t,a,i,o){let r=7,s=()=>(r=r*16807%2147483647,r/2147483647),l=Math.max(1,Math.floor(n/16));for(let c=0;c<t;c+=l)for(let m=0;m<n;m+=l)e.fillStyle=s()<(o!=null?o:.35)?je(i,1):je(a,1),e.fillRect(m,c,l,l)}function $c(e,n,t,a,i,o){if(a==="wood"){e.fillStyle=je(i),e.fillRect(0,0,n,t),e.fillStyle=je(o);for(let r=0;r<n;r+=Math.max(2,n/8))e.fillRect(r,0,Math.max(1,n/32),t);e.fillRect(0,Math.floor(t/2),n,Math.max(1,t/16))}else if(a==="metal")e.fillStyle=je(i),e.fillRect(0,0,n,t),e.fillStyle=je(o),e.fillRect(0,0,n,Math.max(1,t/8)),e.fillRect(0,t-Math.max(1,t/8),n,Math.max(1,t/8)),e.fillStyle="rgba(255,255,255,.18)",e.fillRect(Math.floor(n/8),0,Math.max(1,n/8),t);else if(a==="crystal"){e.fillStyle=je(i),e.fillRect(0,0,n,t);for(let r=0;r<6;r++){e.fillStyle=je(o,.55);let s=n/4;e.beginPath(),e.moveTo(n/2,0),e.lineTo(n-s,t/2),e.lineTo(n/2,t),e.lineTo(s,t/2),e.closePath(),e.fill()}}else if(a==="wool"){jr(e,n,t,i,o,.5),e.fillStyle="rgba(0,0,0,.12)";for(let r=0;r<n;r+=4)e.fillRect(r,r*3%t,2,2)}else jr(e,n,t,i,o,.4);e.strokeStyle=je(o,.9),e.lineWidth=1,e.strokeRect(.5,.5,n-1,t-1)}function zc(e,n,t,a,i){e.clearRect(0,0,n,t);let o=n/16;e.fillStyle=je(a),e.fillRect(6*o,2*o,4*o,12*o),e.fillStyle=je(i),e.fillRect(4*o,12*o,8*o,2*o),e.fillRect(7*o,0*o,2*o,2*o)}function Tc(e,n,t,a,i){e.fillStyle=je(a),e.fillRect(0,0,n,t),e.fillStyle=je(i),e.fillRect(0,t/2,n,t/2);let o=n/64;e.fillStyle="#111",e.fillRect(9*o,12*o,2*o,2*o),e.fillRect(14*o,12*o,2*o,2*o),e.fillStyle="#000",e.fillRect(11*o,14*o,3*o,1*o),e.fillStyle="rgba(0,0,0,.12)";for(let r=0;r<n;r+=Math.max(2,o*2))e.fillRect(r,r*5%t,o,o)}function yt(e,n,t,a,i){let[o,r]=e==="entity"?ci[i]||[64,32]:[n,n];return Mc(o,r,s=>{e==="item"?zc(s,o,r,t,a):e==="entity"?Tc(s,o,r,t,a):$c(s,o,r,e,t,a)})}function Ur(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return"data:image/png;base64,"+btoa(n)}var li=`// \u7531 MCBE \u5DE5\u5177\u7BB1\u9644\u52A0\u5305\u5236\u4F5C\u5668\u751F\u6210
import { world, system, CommandPermissionLevel } from "@minecraft/server";

`;function Ic(e,n){return e==="particle"?li+`// \u6BCF\u79D2\u5728\u73A9\u5BB6\u811A\u4E0B\u751F\u6210\u7C92\u5B50
system.runInterval(() => {
  for (const p of world.getAllPlayers()) {
    p.dimension.spawnParticle("minecraft:campfire_tick_particle", {
      x: p.location.x, y: p.location.y + 0.2, z: p.location.z
    });
  }
}, 20);
`:e==="welcome"?li+`// \u73A9\u5BB6\u8FDB\u670D\u63D0\u793A
world.afterEvents.playerSpawn.subscribe((ev) => {
  if (!ev.initialSpawn) return;
  ev.player.sendMessage("\xA7b\u6B22\u8FCE\u6765\u5230 ${n} \u7684\u4E16\u754C");
});
`:li+`// \u8BA1\u5206\u677F\u793A\u4F8B\uFF1A\u6BCF\u6B21\u8FDB\u670D\u52A0 1 \u5206
world.afterEvents.playerSpawn.subscribe(({ player }) => {
  try {
    world.scoreboard.addObjective("points", "\u79EF\u5206");
    const obj = world.scoreboard.getObjective("points");
    obj.setScore(player, (obj.getScore(player) || 0) + 1);
    player.sendMessage("\xA7a\u5F53\u524D\u79EF\u5206\uFF1A" + obj.getScore(player));
  } catch (e) {
    console.warn(e);
  }
});
`}function Lc(e){return`# \u7531 MCBE \u5DE5\u5177\u7BB1\u9644\u52A0\u5305\u5236\u4F5C\u5668\u751F\u6210
# \u6CE8\u610F\uFF1AMinecraft \u57FA\u5CA9\u7248\u4E0D\u4F1A\u6267\u884C Python\u3002\u6B64\u6587\u4EF6\u4EC5\u4F5C\u6A21\u677F / \u5916\u90E8\u5DE5\u5177\uFF08\u5982\u670D\u52A1\u7AEF\u7BA1\u7406\u811A\u672C\uFF09\u53C2\u8003\u3002
# ${e} \u7684\u81EA\u52A8\u5316\u811A\u672C\u9AA8\u67B6
import json
import os

PACK_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def read_json(rel):
    with open(os.path.join(PACK_ROOT, rel), "r", encoding="utf-8") as f:
        return json.load(f)

def main():
    data = read_json("manifest.json")
    print("\u5305\u540D:", data["header"]["name"])

if __name__ == "__main__":
    main()
`}function Nc(e){return`// TypeScript \u6A21\u677F\uFF08\u9700\u81EA\u884C\u7528 tsc \u7F16\u8BD1\u6210 scripts/main.js\uFF09
import { world, system } from "@minecraft/server";

system.runInterval(() => {
  for (const p of world.getAllPlayers()) {
    p.onScreenDisplay.setActionBar("\xA7e${e} \u6B63\u5728\u8FD0\u884C");
  }
}, 40);
`}var Pr={block:(e,n)=>({format_version:"1.21.0","minecraft:block":{description:{identifier:`${e}:${n}`,menu_category:{category:"construction"}},components:{"minecraft:material_instances":{"*":{texture:n,render_method:"opaque"}},"minecraft:destructible_by_mining":{seconds_to_destroy:1.5},"minecraft:destructible_by_explosion":{explosion_resistance:3},"minecraft:light_dampening":15,"minecraft:map_color":"#8a8f98"}}}),item:(e,n,t)=>({format_version:"1.21.0","minecraft:item":{description:{identifier:`${e}:${n}`,menu_category:{category:"items"}},components:{"minecraft:icon":{texture:t},"minecraft:max_stack_size":64}}})};function Fr(e){let n=e.namespace||"demo",t=e.name||"\u6211\u7684\u9644\u52A0\u5305",a=[1,0,0],i=e.size||16,o=e.color1||"#7a7f8c",r=e.color2||"#4a505c",s=e.pattern||"stone",l=e.mode||"addon",c=e.block!==!1,m=e.item!==!1,u=e.entity||"",p=e.scriptLang||"js",d=e.scriptTpl||"scoreboard",b=Array.isArray(e.uuids)?e.uuids:[],_=b[0]||Sn(),f=b[1]||Sn(),h=b[2]||Sn(),y=b[3]||Sn(),v=b[4]||Sn(),w=e.tex||{},M=`behavior_packs/${n}_bp`,$=`resource_packs/${n}_rp`,B=[],z=(k,E)=>{let P=B.findIndex(J=>J.path===k),R=new TextEncoder().encode(E);P>=0?B[P].data=R:B.push({path:k,data:R})},S=(k,E)=>{let P=B.findIndex(R=>R.path===k);if(P>=0){let R=new TextDecoder().decode(B[P].data);B[P].data=new TextEncoder().encode(R.endsWith(`
`)||!R?R+E:R+`
`+E)}else B.push({path:k,data:new TextEncoder().encode(E)})},T=(k,E)=>{let P=B.findIndex(R=>R.path===k);P>=0?B[P].data=E:B.push({path:k,data:E})},L=(k,E)=>z(k,JSON.stringify(E,null,2)),D=(k,E)=>z(k,E),U=[],H=l!=="resource",X=l!=="behavior";if(H){if(T(`${M}/pack_icon.png`,w.icon||w.block||yt("block",64,o,r)),L(`${M}/manifest.json`,{format_version:2,header:{name:t+" BP",description:t+" \u884C\u4E3A\u5305",uuid:_,version:a,min_engine_version:[1,21,0]},modules:[{type:"data",uuid:h,version:a}],metadata:{authors:[e.author||"MCBE\u5DE5\u5177\u7BB1"],generated_with:{mcbe_toolbox:["2.5.0"]}}}),c&&L(`${M}/blocks/${n}_block.json`,Pr.block(n,n+"_block")),m&&L(`${M}/items/${n}_item.json`,Pr.item(n,n+"_item",n+"_item")),S(`${M}/texts/zh_CN.lang`,`pack.name=${t} \u884C\u4E3A\u5305
pack.description=${t} \u884C\u4E3A\u5305
`),S(`${M}/texts/en_US.lang`,`pack.name=${t} BP
pack.description=${t} behavior pack
`),p==="js"||p==="json"){let k=JSON.parse(new TextDecoder().decode(B.find(E=>E.path===`${M}/manifest.json`).data));k.modules.push({type:"script",language:"javascript",uuid:v,entry:"scripts/main.js",version:a}),k.dependencies=[{module_name:"@minecraft/server",version:"1.11.0"}],L(`${M}/manifest.json`,k),D(`${M}/scripts/main.js`,Ic(d,n))}else p==="ts"?D(`${M}/scripts/main.ts`,Nc(n)):p==="py"&&D(`${M}/scripts/main.py`,Lc(n));z(`${M}/README.md`,`# ${t}

\u7531 MCBE \u5DE5\u5177\u7BB1\u751F\u6210\u3002

- \u547D\u540D\u7A7A\u95F4\uFF1A${n}
- \u7248\u672C\uFF1A1.0.0
- \u811A\u672C\u8BED\u8A00\uFF1A${p}

\u5B89\u88C5\uFF1A\u628A\u6574\u4E2A .mcaddon \u7528 Minecraft \u6253\u5F00\u5373\u53EF\u3002
`)}if(X){T(`${$}/pack_icon.png`,w.icon||w.block||yt("block",64,o,r));let k=H?[{uuid:_,version:a}]:[];if(L(`${$}/manifest.json`,{format_version:2,header:{name:t+" RP",description:t+" \u8D44\u6E90\u5305",uuid:f,version:a,min_engine_version:[1,21,0]},modules:[{type:"resources",uuid:y,version:a}],dependencies:k,metadata:{authors:[e.author||"MCBE\u5DE5\u5177\u7BB1"],generated_with:{mcbe_toolbox:["2.5.0"]}}}),c&&(T(`${$}/textures/blocks/${n}_block.png`,w.block||yt(s,i,o,r)),L(`${$}/textures/terrain_texture.json`,{resource_pack_name:t,texture_name:"atlas.terrain",padding:8,num_mip_levels:4,texture_data:{[n+"_block"]:{textures:`textures/blocks/${n}_block`}}}),L(`${$}/blocks.json`,{format_version:[1,1,0],[n+"_block"]:{textures:n+"_block",sound:"stone"}}),S(`${$}/texts/zh_CN.lang`,`tile.${n}_block.name=${e.blockName||"\u81EA\u5B9A\u4E49\u65B9\u5757"}
pack.name=${t} \u8D44\u6E90\u5305
pack.description=${t} \u8D44\u6E90\u5305
`),S(`${$}/texts/en_US.lang`,`tile.${n}_block.name=${e.blockNameEn||"Custom Block"}
pack.name=${t} RP
pack.description=${t} resource pack
`)),m&&(T(`${$}/textures/items/${n}_item.png`,w.item||yt("item",i,o,r)),L(`${$}/textures/item_texture.json`,{resource_pack_name:t,texture_name:"atlas.items",texture_data:{[n+"_item"]:{textures:`textures/items/${n}_item`}}}),S(`${$}/texts/zh_CN.lang`,`item.${n}_item.name=${e.itemName||"\u81EA\u5B9A\u4E49\u7269\u54C1"}
`),S(`${$}/texts/en_US.lang`,`item.${n}_item.name=${e.itemNameEn||"Custom Item"}
`)),u){let[E,P]=ci[u]||[64,32];T(`${$}/textures/entity/${u}/${u}.png`,w.entity||yt("entity",i,o,r,u)),U.push(`\u5B9E\u4F53\u8D34\u56FE ${u}\uFF1A${E}\xD7${P}\uFF08\u8986\u76D6\u539F\u7248\u8DEF\u5F84 textures/entity/${u}/${u}.png\uFF09`)}}return U.unshift(`\u5DF2\u751F\u6210 ${B.length} \u4E2A\u6587\u4EF6\uFF0C\u6A21\u5F0F ${l}\uFF0C\u8D34\u56FE ${i}\xD7${i}\uFF0C\u811A\u672C ${p}`),{entries:B,log:U,dirB:M,dirR:$}}var Rr=[{lang:"JSON",title:"\u65B9\u5757\u5B9A\u4E49\uFF08\u6700\u5C0F\u53EF\u8FD0\u884C\uFF09",code:`{
  "format_version": "1.21.0",
  "minecraft:block": {
    "description": { "identifier": "demo:my_block" },
    "components": {
      "minecraft:material_instances": { "*": { "texture": "my_block", "render_method": "opaque" } },
      "minecraft:destructible_by_mining": { "seconds_to_destroy": 1.5 }
    }
  }
}`},{lang:"JSON",title:"\u7269\u54C1\u5B9A\u4E49",code:`{
  "format_version": "1.21.0",
  "minecraft:item": {
    "description": { "identifier": "demo:my_item" },
    "components": { "minecraft:icon": { "texture": "my_item" }, "minecraft:max_stack_size": 64 }
  }
}`},{lang:"JS",title:"\u8FDB\u670D\u6B22\u8FCE",code:`import { world } from "@minecraft/server";
world.afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {
  if (initialSpawn) player.sendMessage("\xA7a\u6B22\u8FCE\uFF01");
});`},{lang:"JS",title:"\u5B9A\u65F6\u7C92\u5B50",code:`import { world, system } from "@minecraft/server";
system.runInterval(() => {
  for (const p of world.getAllPlayers()) {
    p.dimension.spawnParticle("minecraft:campfire_tick_particle", p.location);
  }
}, 20);`},{lang:"JS",title:"\u8BA1\u5206\u677F\u52A0\u5206",code:`import { world } from "@minecraft/server";
const obj = world.scoreboard.getObjective("points");
obj.setScore(player, (obj.getScore(player) || 0) + 1);`},{lang:"TS",title:"\u7C7B\u578B\u5316\u4E8B\u4EF6\u76D1\u542C",code:`import { world, Player } from "@minecraft/server";
world.afterEvents.playerSpawn.subscribe((ev) => {
  const p: Player = ev.player;
  p.sendMessage(ev.initialSpawn ? "\u9996\u6B21\u8FDB\u5165" : "\u56DE\u6765\u5566");
});`},{lang:"PY",title:"\u5916\u90E8\u5DE5\u5177\u9AA8\u67B6\uFF08\u6E38\u620F\u4E0D\u6267\u884C\uFF09",code:`# \u57FA\u5CA9\u7248\u4E0D\u6267\u884C Python\uFF0C\u4EC5\u4F9B\u5916\u90E8\u5DE5\u5177\u53C2\u8003
import json, os
ROOT = os.path.dirname(os.path.dirname(__file__))
with open(os.path.join(ROOT, "manifest.json"), encoding="utf-8") as f:
    print(json.load(f)["header"]["name"])
`}];var Or=[{name:"\u5934",x:0,y:0,w:32,h:16},{name:"\u8EAB\u4F53",x:16,y:16,w:24,h:16},{name:"\u53F3\u81C2",x:40,y:16,w:16,h:16},{name:"\u5DE6\u81C2",x:32,y:48,w:16,h:16},{name:"\u53F3\u817F",x:0,y:16,w:16,h:16},{name:"\u5DE6\u817F",x:16,y:48,w:16,h:16}],Ac=["#000000","#ffffff","#7f7f7f","#c0c0c0","#8b5a2b","#a0642a","#d9a066","#3b5b2f","#5a8c3a","#7fbf4a","#2b4a8b","#3d6fd1","#7aa7ff","#8b1f2f","#c0392b","#e67e22","#f1c40f","#16a085","#8e44ad","#ecf0f1"];function ie(e){return document.getElementById(e)}function Hr(e,n){let t=document.createElement("canvas");return t.width=e,t.height=n,t}function mi(e){let n=e==="cape",t=64,a=n?32:64,i=new Uint8ClampedArray(t*a*4),o="#7fbf4a",r="brush",s=!1,l=n?10:8,c=[],m=!1,u=Hr(t,a),p=u.getContext("2d"),d=p.createImageData(t,a),b=()=>{for(let x=0;x<i.length;x+=4)d.data[x]=i[x],d.data[x+1]=i[x+1],d.data[x+2]=i[x+2],d.data[x+3]=i[x+3];p.putImageData(d,0,0)},_=()=>{c.push(i.slice()),c.length>24&&c.shift()},f=(x,I,j,W)=>{if(x<0||I<0||x>=t||I>=a)return;let[le,K,ee]=y(j),rt=W==null?255:W,Fe=(I*t+x)*4;i[Fe]=le,i[Fe+1]=K,i[Fe+2]=ee,i[Fe+3]=rt},h=(x,I)=>{let j=(I*t+x)*4;return[i[j],i[j+1],i[j+2],i[j+3]]};function y(x){let I=x.replace("#",""),j=I.length===3?I.split("").map(W=>W+W).join(""):I;return[parseInt(j.slice(0,2),16)||0,parseInt(j.slice(2,4),16)||0,parseInt(j.slice(4,6),16)||0]}let v=(x,I)=>{if(r==="eraser")f(x,I,"#000000",0),s&&f(t-1-x,I,"#000000",0);else if(r==="picker"){let j=h(x,I);if(j[3]>0){o=w(j[0],j[1],j[2]);let W=ie("skColor");W&&(W.value=o)}}else f(x,I,o,255),s&&f(t-1-x,I,o,255);b(),z()};function w(x,I,j){return"#"+[x,I,j].map(W=>W.toString(16).padStart(2,"0")).join("")}function M(x,I,j){let W=h(x,I),[le,K,ee]=y(j);if(W[0]===le&&W[1]===K&&W[2]===ee&&W[3]===255)return;let rt=[[x,I]],Fe=new Uint8Array(t*a);for(;rt.length;){let[ge,ke]=rt.pop();if(ge<0||ke<0||ge>=t||ke>=a)continue;let Ri=ke*t+ge;if(Fe[Ri])continue;let Dn=h(ge,ke);Dn[0]===W[0]&&Dn[1]===W[1]&&Dn[2]===W[2]&&Dn[3]===W[3]&&(Fe[Ri]=1,f(ge,ke,j,255),rt.push([ge+1,ke],[ge-1,ke],[ge,ke+1],[ge,ke-1]))}b(),z()}function $(){let x=u.getContext("2d");if(x.save(),x.strokeStyle="rgba(120,180,255,.55)",x.lineWidth=1,n)x.strokeStyle="rgba(255,255,255,.5)",x.strokeRect(.5,.5,10,16),x.strokeRect(11.5,.5,10,16),x.fillStyle="rgba(10,20,35,.6)",x.font="4px sans-serif",x.fillText("\u6B63\u9762",1,5),x.fillText("\u80CC\u9762",12,5);else for(let I of Or)x.strokeRect(I.x+.5,I.y+.5,I.w-1,I.h-1),x.fillStyle="rgba(10,20,35,.6)",x.font="4px sans-serif",x.fillText(I.name,I.x+1,I.y+5);x.restore()}function B(){b(),$(),z()}function z(){let x=ie("skPreview");if(!x)return;let I=x.getContext("2d");if(I.clearRect(0,0,x.width,x.height),I.fillStyle="rgba(255,255,255,0.04)",I.fillRect(0,0,x.width,x.height),n){I.imageSmoothingEnabled=!1,I.drawImage(u,0,0,10,16,20,10,120,192);return}I.imageSmoothingEnabled=!1,I.drawImage(u,8,8,8,8,54,10,52,52),I.drawImage(u,20,20,8,12,54,66,52,78),I.drawImage(u,44,20,4,12,18,66,26,78),I.drawImage(u,36,52,4,12,110,66,26,78),I.drawImage(u,4,20,4,12,42,148,26,78),I.drawImage(u,20,52,4,12,86,148,26,78)}function S(){return{W:t,H:a,set:(x,I,j)=>f(x,I,j,255),get:(x,I)=>h(x,I),fill:x=>{for(let I=0;I<a;I++)for(let j=0;j<t;j++)f(j,I,x,255)},rect:(x,I,j,W,le)=>{for(let K=I;K<I+W;K++)for(let ee=x;ee<x+j;ee++)f(ee,K,le,255)},line:(x,I,j,W,le)=>{let K=Math.abs(j-x),ee=Math.abs(W-I),rt=x<j?1:-1,Fe=I<W?1:-1,ge=K-ee;for(;f(x,I,le,255),!(x===j&&I===W);){let ke=2*ge;ke>-ee&&(ge-=ee,x+=rt),ke<K&&(ge+=K,I+=Fe)}},clear:()=>{i.fill(0)},noise:x=>{for(let I=0;I<a;I++)for(let j=0;j<t;j++)f(j,I,x[Math.floor(Math.random()*x.length)],255)},rand:x=>Math.floor(Math.random()*x),done:()=>{b(),$(),z()}}}let T={stripes:`// \u659C\u6761\u7EB9
const c=['#2b4a8b','#7aa7ff','#ffffff'];
for(let y=0;y<api.H;y++)for(let x=0;x<api.W;x++){
  const k=(x+y)%9;
  api.set(x,y,c[k<3?0:k<6?1:2]);
}
api.done();`,camo:`// \u8FF7\u5F69\u566A\u70B9
const c=['#3b5b2f','#5a8c3a','#7fbf4a','#2b3b22'];
api.fill(c[0]);
for(let i=0;i<260;i++){
  const x=api.rand(api.W), y=api.rand(api.H), s=1+api.rand(4);
  api.rect(x,y,s,s,c[1+api.rand(3)]);
}
api.done();`,gradient:`// \u4E0A\u4E0B\u6E10\u53D8
for(let y=0;y<api.H;y++){
  const t=y/(api.H-1);
  const r=Math.round(40+t*180), g=Math.round(70+t*120), b=Math.round(120+t*60);
  const hex='#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
  api.line(0,y,api.W-1,y,hex);
}
api.done();`,checker:`// \u68CB\u76D8\u683C
for(let y=0;y<api.H;y++)for(let x=0;x<api.W;x++){
  api.set(x,y,((x>>2)+(y>>2))%2?'#1d2430':'#7aa7ff');
}
api.done();`,star:`// \u62AB\u98CE\u661F\u7A7A
api.fill('#0b1230');
for(let i=0;i<90;i++){
  const x=api.rand(api.W),y=api.rand(api.H);
  api.set(x,y,Math.random()<0.8?'#ffffff':'#ffd479');
}
api.line(20,2,20,14,'#e74c3c');
api.done();`};function L(){_(),i.fill(0);let x="#d9a066",I="#3a2a1a",j="#3d6fd1",W="#2b3b5b",le="#2b2b2b";for(let K=0;K<32;K++)for(let ee=0;ee<32;ee++)K<8?f(ee,K,I,255):K<16&&f(ee,K,K<11?I:x,255);for(let K=16;K<32;K++)for(let ee=16;ee<40;ee++)f(ee,K,j,255);for(let K=16;K<32;K++)for(let ee=40;ee<56;ee++)f(ee,K,j,255);for(let K=16;K<32;K++)for(let ee=0;ee<16;ee++)f(ee,K,W,255);f(8,8,"#000000",255),f(12,8,"#000000",255),b(),$(),z()}let D=ie("modalBody");D.innerHTML=`
    <div class="skhead"><h3>${n?"\u62AB\u98CE\u5236\u4F5C\u5668":"\u76AE\u80A4\u5236\u4F5C\u5668"}</h3>
      <span class="muted">\u5C3A\u5BF8 ${t}\xD7${a}\uFF08\u57FA\u5CA9\u7248\u6807\u51C6\uFF09</span></div>
    <div class="skbar">
      <button id="skBrush" class="primary">\u753B\u7B14</button>
      <button id="skErase" class="ghost">\u6A61\u76AE</button>
      <button id="skFill" class="ghost">\u586B\u5145</button>
      <button id="skPick" class="ghost">\u5438\u7BA1</button>
      <button id="skMirror" class="ghost">\u955C\u50CF\u5173</button>
      <button id="skUndo" class="ghost">\u64A4\u9500</button>
      <button id="skClear" class="ghost">\u6E05\u7A7A</button>
      <input type="color" id="skColor" value="${o}" title="\u989C\u8272">
    </div>
    <div class="skpalette">${Ac.map(x=>`<button class="skc" data-c="${x}" style="background:${x}"></button>`).join("")}</div>
    <div class="skmain">
      <div class="skcanvaswrap"><canvas id="skCanvas"></canvas></div>
      <div class="skpreviewwrap"><canvas id="skPreview" width="160" height="240"></canvas><p class="muted">\u9884\u89C8\uFF08\u6B63\u9762\uFF09</p></div>
    </div>
    <div class="skbar">
      <button id="skZoomOut" class="ghost">\u7F29\u5C0F</button>
      <button id="skZoomIn" class="ghost">\u653E\u5927</button>
      <button id="skTemplate" class="ghost">\u57FA\u7840\u6A21\u677F</button>
      <button id="skExport" class="primary">\u5BFC\u51FA PNG</button>
    </div>
    <h3>\u4EE3\u7801\u751F\u6210</h3>
    <p class="muted">\u5199 JS \u76F4\u63A5\u753B\u50CF\u7D20\uFF1Aapi.set(x,y,\u8272) / api.rect / api.line / api.fill / api.noise\u3002\u672C\u5730\u6267\u884C\uFF0C\u53EA\u5F71\u54CD\u753B\u5E03\u3002</p>
    <select id="skSnippet" class="skselect">${Object.keys(T).map(x=>`<option value="${x}">${{stripes:"\u659C\u6761\u7EB9",camo:"\u8FF7\u5F69",gradient:"\u6E10\u53D8",checker:"\u68CB\u76D8\u683C",star:"\u62AB\u98CE\u661F\u7A7A"}[x]}</option>`).join("")}</select>
    <textarea id="skCode" class="code" style="height:22vh" spellcheck="false"></textarea>
    <div class="skbar"><button id="skRun" class="primary">\u8FD0\u884C\u4EE3\u7801</button><button id="skClose" class="ghost">\u5173\u95ED</button></div>
    <p id="skMsg" class="muted"></p>
  `,ie("modal").style.display="flex";let U=document.querySelector(".modalbox");U&&(U.style.maxWidth="760px",U.style.width="96vw",U.style.maxHeight="92vh");let H=ie("skCanvas");H.width=t,H.height=a;let X=H.getContext("2d");function k(){if(X.clearRect(0,0,t,a),X.imageSmoothingEnabled=!1,X.drawImage(u,0,0),n)X.save(),X.strokeStyle="rgba(255,255,255,.45)",X.strokeRect(.5,.5,10,16),X.strokeRect(11.5,.5,10,16),X.restore();else{X.save(),X.strokeStyle="rgba(120,180,255,.55)",X.lineWidth=1;for(let x of Or)X.strokeRect(x.x+.5,x.y+.5,x.w-1,x.h-1),X.fillStyle="rgba(10,20,35,.55)",X.font="3px sans-serif",X.fillText(x.name,x.x+1,x.y+4);X.restore()}}function E(x){l=Math.max(4,Math.min(20,x)),H.style.width=t*l+"px",H.style.height=a*l+"px"}E(l),k(),z();let P=x=>{let I=H.getBoundingClientRect();return[Math.floor((x.clientX-I.left)/I.width*t),Math.floor((x.clientY-I.top)/I.height*a)]};H.addEventListener("pointerdown",x=>{x.preventDefault(),_(),m=!0;let[I,j]=P(x);r==="fill"?M(I,j,o):v(I,j),k()}),H.addEventListener("pointermove",x=>{if(!m)return;let[I,j]=P(x);r!=="fill"&&r!=="picker"&&v(I,j)});let R=()=>{m=!1};H.addEventListener("pointerup",R),H.addEventListener("pointerleave",R),H.addEventListener("pointercancel",R);let J=(x,I)=>{r=x,["skBrush","skErase","skFill","skPick"].forEach(j=>{let W=ie(j);W&&(W.className=j===I?"primary":"ghost")})};ie("skBrush").onclick=()=>J("brush","skBrush"),ie("skErase").onclick=()=>J("eraser","skErase"),ie("skFill").onclick=()=>J("fill","skFill"),ie("skPick").onclick=()=>J("picker","skPick"),ie("skMirror").onclick=()=>{s=!s,ie("skMirror").textContent=s?"\u955C\u50CF\u5F00":"\u955C\u50CF\u5173"},ie("skUndo").onclick=()=>{let x=c.pop();x&&(i.set(x),b(),k(),z())},ie("skClear").onclick=()=>{_(),i.fill(0),b(),k(),z()},ie("skColor").oninput=x=>{o=x.target.value},D.querySelectorAll(".skc").forEach(x=>{x.onclick=()=>{o=x.dataset.c,ie("skColor").value=o}}),ie("skZoomIn").onclick=()=>E(l+2),ie("skZoomOut").onclick=()=>E(l-2),ie("skTemplate").onclick=()=>{L(),k()},ie("skSnippet").onchange=()=>{ie("skCode").value=T[ie("skSnippet").value]},ie("skSnippet").onchange(),ie("skRun").onclick=()=>{_();try{new Function("api",ie("skCode").value)(S()),ie("skMsg").textContent="\u5DF2\u751F\u6210\uFF0C\u53EF\u7EE7\u7EED\u7528\u753B\u7B14\u4FEE\u6539",k(),z()}catch(x){ie("skMsg").textContent="\u4EE3\u7801\u51FA\u9519\uFF1A"+x.message}},ie("skExport").onclick=()=>{let x=Hr(t,a),I=x.getContext("2d"),j=I.createImageData(t,a);j.data.set(i),I.putImageData(j,0,0);let W=n?"cape_64x32.png":"skin_64x64.png",le=x.toDataURL("image/png");if(window.AndroidBridge&&window.AndroidBridge.saveBinary){let ee=window.AndroidBridge.saveBinary(W,le.split(",")[1]);ie("skMsg").textContent=String(ee).startsWith("ERR")?"\u4FDD\u5B58\u5931\u8D25\uFF1A"+ee:"\u5DF2\u4FDD\u5B58\u5230\u5E94\u7528\u5B58\u50A8/"+W;return}let K=document.createElement("a");K.download=W,K.href=le,document.body.appendChild(K),K.click(),K.remove(),ie("skMsg").textContent="\u5DF2\u5BFC\u51FA "+W},ie("skClose").onclick=()=>{U&&(U.style.maxWidth="",U.style.width="",U.style.maxHeight=""),ie("modal").style.display="none"}}var jc=47,qt={"minecraft:air":null,"minecraft:water":"#2d6bb3","minecraft:lava":"#d94b1e","minecraft:grass_block":"#63a64b","minecraft:grass":"#63a64b","minecraft:dirt":"#8a6642","minecraft:stone":"#8a8a8a","minecraft:deepslate":"#4a4a50","minecraft:sand":"#ded29a","minecraft:sandstone":"#d9c98a","minecraft:gravel":"#9c9188","minecraft:ice":"#a8d8f0","minecraft:snow":"#f2f7fb","minecraft:bedrock":"#2a2a2a","minecraft:oak_planks":"#b08a4e","minecraft:oak_log":"#6b5328","minecraft:oak_leaves":"#3f7a33","minecraft:acacia_planks":"#ad5d32","minecraft:tuff":"#6d6b63","minecraft:sulfur":"#d6cf5a","minecraft:cinnabar":"#b3443f","minecraft:clay":"#a3a8b4","minecraft:moss_block":"#5b7d3a","minecraft:podzol":"#6b4f26","minecraft:mycelium":"#8b7b8b","minecraft:red_sand":"#c2661f","minecraft:snow_layer":"#eef4f8","sim:lush_cave":"#3f8a4a","sim:sulfur_cave":"#c9b52e","sim:dripstone_cave":"#a89a86"};async function sa(e,n={}){let t=new Set,a=new Map,i=0;for(let[u,p]of e){let d=p.keyBytes||new Uint8Array;if(d.length!==10)continue;let b=new DataView(d.buffer,d.byteOffset,d.byteLength),_=b.getInt32(0,!0),f=b.getInt32(4,!0);if(d[8]!==jc)continue;let y=d[9]<<24>>24,v;try{v=Yn(p.value,2)}catch(M){continue}let w=v.layers[0];if(!(!w||!w.indices||w.solid)){t.add(_+","+f),i++;for(let M=0;M<16;M++)for(let $=0;$<16;$++){if(n.y!==void 0&&n.y!==null){let B=Math.floor(n.y);if(B<y*16||B>y*16+15)continue;let S=B-y*16+16*($+16*M),T=w.palette[w.indices[S]];if(!T||/^minecraft:(air|void_air|structure_void)$/.test(T.name))continue;let L=_*16+M,D=f*16+$;a.set(L+","+D,{y:B,block:T.name});continue}for(let B=15;B>=0;B--){let z=B+16*($+16*M),S=w.palette[w.indices[z]];if(!S||/^minecraft:(air|cave_air|void_air|structure_void)$/.test(S.name))continue;let T=_*16+M,L=f*16+$,D=y*16+B,U=T+","+L,H=a.get(U);!H||D>H.y?a.set(U,{y:D,block:S.name,subs:1}):H.subs=(H.subs||1)+1;break}}n.onProgress&&i%32===0&&n.onProgress(i)}}let o=1/0,r=-1/0,s=1/0,l=-1/0;for(let[u]of a){let[p,d]=u.split(",").map(Number);p<o&&(o=p),p>r&&(r=p),d<s&&(s=d),d>l&&(l=d)}if(!a.size)return{cols:a,chunks:0,chunkSet:t,minX:0,maxX:0,minZ:0,maxZ:0,yRange:[0,0]};let c=1/0,m=-1/0;for(let u of a.values())u.y<c&&(c=u.y),u.y>m&&(m=u.y);return{cols:a,chunks:t.size,chunkSet:t,minX:o,maxX:r,minZ:s,maxZ:l,yRange:[c,m]}}function Pc(e,n,t){if(qt[e]!==void 0&&qt[e])return qt[e];if(!e)return"#1b1f26";let a=0;for(let s=0;s<e.length;s++)a=a*31+e.charCodeAt(s)&65535;let i=a%360,r=32+(t&&t[1]>t[0]?(n-t[0])/(t[1]-t[0]):.5)*28;return`hsl(${i},38%,${r.toFixed(0)}%)`}function Kr(e,n,t=2){let{cols:a,minX:i,maxX:o,minZ:r,maxZ:s,yRange:l}=n,c=(o-i+1)*t,m=(s-r+1)*t;if(c>8192||m>8192)return;e.width=Math.max(1,c),e.height=Math.max(1,m);let u=e.getContext("2d");u.fillStyle="#14181e",u.fillRect(0,0,e.width,e.height);for(let[p,d]of a){let[b,_]=p.split(",").map(Number),f=Pc(d.block,d.y,l);if(!f)continue;if(d.biome&&qt[d.biome]){u.globalAlpha=.18,u.fillStyle=qt[d.biome];let y=d.sim&&n.simStep||1;u.fillRect((b-i)*t,(_-r)*t,t*y,t*y)}u.globalAlpha=d.sim?.72:1,u.fillStyle=f;let h=d.sim&&n.simStep||1;u.fillRect((b-i)*t,(_-r)*t,t*h,t*h)}return u.globalAlpha=1,{width:e.width,height:e.height,origin:[i,r],scale:t}}function Gr(e,n,t){let a=e.cols.get(n+","+t);if(!a)return`(${n}, ${t})\uFF1A\u672A\u4FDD\u5B58\u7684\u533A\u5757`;let i=a.sim?"\u3000\u3010\u6A21\u62DF\u63A8\u6D4B\uFF0C\u975E\u771F\u5B9E\u6570\u636E\u3011":"",o="";if(a.sim)try{o="\u3000\u7FA4\u7CFB\u63A8\u6D4B\uFF1A"+fi(n,t,e.seed||0).zh}catch(l){}if(a.block==="minecraft:cave_air")return`(${n}, ${t})  \u6D1E\u7A74\u7A7A\u8154\uFF08\u63A8\u6D4B\uFF09  y=${a.y}${i}${o}`;let r=a.biome==="sim:lush_cave"?"\u3000\u63A8\u6D4B\u751F\u7269\u7FA4\u7CFB\uFF1A\u7E41\u8302\u6D1E\u7A74":a.biome==="sim:sulfur_cave"?"\u3000\u63A8\u6D4B\u751F\u7269\u7FA4\u7CFB\uFF1A\u786B\u78FA\u6D1E\u7A74":a.biome==="sim:dripstone_cave"?"\u3000\u63A8\u6D4B\u751F\u7269\u7FA4\u7CFB\uFF1A\u6EF4\u6C34\u77F3\u6D1E\u7A74":"",s=a.block.startsWith("sim:")?a.block==="sim:lush_cave"?"\u7E41\u8302\u6D1E\u7A74\uFF08\u63A8\u6D4B\uFF09":a.block==="sim:sulfur_cave"?"\u786B\u78FA\u6D1E\u7A74\uFF08\u63A8\u6D4B\uFF09":"\u6EF4\u6C34\u77F3\u6D1E\u7A74\uFF08\u63A8\u6D4B\uFF09":`${et(a.block)}\uFF08${a.block}\uFF09`;return`(${n}, ${t})  \u65B9\u5757\uFF1A${s}  y=${a.y}${r}${i}`}function Dc(e){let n=e>>>0;return()=>{n=n+2654435769>>>0;let t=n;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Uc(e){let n=Dc(e||1),t=new Uint8Array(512),a=[...Array(256).keys()];for(let i=255;i>0;i--){let o=Math.floor(n()*(i+1)),r=a[i];a[i]=a[o],a[o]=r}for(let i=0;i<512;i++)t[i]=a[i&255];return t}function oa(e,n,t){switch(e&7){case 0:return n+t;case 1:return-n+t;case 2:return n-t;case 3:return-n-t;case 4:return n;case 5:return-n;case 6:return t;default:return-t}}function En(e){return e*e*e*(e*(e*6-15)+10)}function Fc(e,n,t){let a=Math.floor(n)&255,i=Math.floor(t)&255,o=n-Math.floor(n),r=t-Math.floor(t),s=En(o),l=En(r),c=e[e[a]+i],m=e[e[a]+i+1],u=e[e[a+1]+i],p=e[e[a+1]+i+1],d=oa(c,o,r)*(1-s)+oa(u,o-1,r)*s,b=oa(m,o,r-1)*(1-s)+oa(p,o-1,r-1)*s;return(d*(1-l)+b*l)*.7}function Pe(e,n,t,a,i=4){let o=0,r=1,s=1/a,l=0;for(let c=0;c<i;c++)o+=Fc(e,n*s,t*s)*r,l+=r,r*=.5,s*=2;return o/l}function pi(e,n,t){let a=vt(t),i=Pe(a,e,n,320,5),o=Pe(a,e+1e3,n-1e3,180,4),r=1-Math.abs(Pe(a,e-700,n+700,90,3))*1.4,s=Pe(a,e+500,n+500,22,3),l=64+i*34+s*6;return i>.18&&(l+=(i-.18)*46+Math.max(0,r-.55)*34*(.4+o*.6)),i<-.2&&(l-=(-.2-i)*70),Math.round(Math.max(-64,Math.min(150,l)))}var di={seed:null,perm:null};function vt(e){return di.seed!==e&&(di={seed:e,perm:Uc(e||1)}),di.perm}function Rc(e,n,t){let a=Pe(vt(t),e+2e3,n+2e3,260,3),i=Pe(vt(t),e-2e3,n-2e3,260,3);return{temp:a,humid:i}}function ve(e,n,t){let a=2166136261^t;return a^=e*374761393,a=Math.imul(a,16777619),a^=n*668265263,a=Math.imul(a,16777619),a^=a>>>13,(a>>>0)/4294967295}function Oc(e,n,t,a){switch(e&15){case 0:return n+t;case 1:return-n+t;case 2:return n-t;case 3:return-n-t;case 4:return n+a;case 5:return-n+a;case 6:return n-a;case 7:return-n-a;case 8:return t+a;case 9:return-t+a;case 10:return t-a;case 11:return-t-a;case 12:return n+t;case 13:return-n+t;case 14:return-t+a;default:return-t-a}}function ui(e,n,t,a){let i=Math.floor(n)&255,o=Math.floor(t)&255,r=Math.floor(a)&255,s=n-Math.floor(n),l=t-Math.floor(t),c=a-Math.floor(a),m=En(s),u=En(l),p=En(c),d=e[i]+o,b=e[d]+r,_=e[d+1]+r,f=e[i+1]+o,h=e[f]+r,y=e[f+1]+r,v=(T,L,D,U)=>Oc(e[T&511],L,D,U),w=v(b,s,l,c)*(1-m)+v(h,s-1,l,c)*m,M=v(_,s,l-1,c)*(1-m)+v(y,s-1,l-1,c)*m,$=v(b+1,s,l,c-1)*(1-m)+v(h+1,s-1,l,c-1)*m,B=v(_+1,s,l-1,c-1)*(1-m)+v(y+1,s-1,l-1,c-1)*m,z=w*(1-u)+M*u,S=$*(1-u)+B*u;return(z*(1-p)+S*p)*.7}function ra(e,n,t,a,i,o=2){let r=0,s=1,l=1/i,c=0;for(let m=0;m<o;m++)r+=ui(e,n*l,t*l,a*l)*s,c+=s,s*=.5,l*=2;return r/c}var Wr=[{id:"plains",zh:"\u5E73\u539F",temp:.05,humid:0,cont:.1,ero:.05,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:oak_leaves"},{id:"forest",zh:"\u68EE\u6797",temp:.05,humid:.18,cont:.1,ero:.05,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:oak_leaves"},{id:"birch_forest",zh:"\u767D\u6866\u68EE\u6797",temp:-.02,humid:.14,cont:.1,ero:.02,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:oak_leaves"},{id:"dark_forest",zh:"\u9ED1\u68EE\u6797",temp:.04,humid:.3,cont:.1,ero:.02,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:oak_leaves"},{id:"cherry_grove",zh:"\u6A31\u82B1\u6811\u6797",temp:.16,humid:.16,cont:.22,ero:.1,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:cherry_leaves"},{id:"pale_garden",zh:"\u82CD\u767D\u4E4B\u56ED",temp:-.05,humid:.24,cont:.12,ero:0,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:pale_oak_leaves"},{id:"jungle",zh:"\u4E1B\u6797",temp:.35,humid:.45,cont:.12,ero:.05,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:oak_leaves"},{id:"swamp",zh:"\u6CBC\u6CFD",temp:.14,humid:.4,cont:.02,ero:0,top:"minecraft:grass_block",sub:"minecraft:mud",accent:"minecraft:oak_leaves"},{id:"mangrove_swamp",zh:"\u7EA2\u6811\u6797\u6CBC\u6CFD",temp:.32,humid:.42,cont:.02,ero:0,top:"minecraft:mud",sub:"minecraft:mud",accent:"minecraft:mangrove_roots"},{id:"desert",zh:"\u6C99\u6F20",temp:.45,humid:-.35,cont:.16,ero:.1,top:"minecraft:sand",sub:"minecraft:sandstone",accent:"minecraft:sand"},{id:"badlands",zh:"\u6076\u5730",temp:.45,humid:-.4,cont:.3,ero:.4,top:"minecraft:red_sand",sub:"minecraft:terracotta",accent:"minecraft:orange_terracotta"},{id:"savanna",zh:"\u70ED\u5E26\u8349\u539F",temp:.35,humid:-.05,cont:.2,ero:.12,top:"minecraft:grass_block",sub:"minecraft:coarse_dirt",accent:"minecraft:oak_leaves"},{id:"taiga",zh:"\u9488\u53F6\u6797",temp:-.15,humid:.25,cont:.16,ero:.1,top:"minecraft:grass_block",sub:"minecraft:podzol",accent:"minecraft:oak_leaves"},{id:"snowy_taiga",zh:"\u96EA\u9488\u53F6\u6797",temp:-.4,humid:.25,cont:.16,ero:.1,top:"minecraft:snowy_grass_block",sub:"minecraft:dirt",accent:"minecraft:snow"},{id:"snowy_plains",zh:"\u96EA\u539F",temp:-.45,humid:0,cont:.1,ero:.02,top:"minecraft:snowy_grass_block",sub:"minecraft:dirt",accent:"minecraft:snow_layer"},{id:"ice_spikes",zh:"\u51B0\u523A\u5E73\u539F",temp:-.5,humid:.05,cont:.2,ero:.35,top:"minecraft:snow_layer",sub:"minecraft:packed_mud",accent:"minecraft:ice"},{id:"mushroom_fields",zh:"\u8611\u83C7\u5C9B",temp:.1,humid:.35,cont:.35,ero:-.1,top:"minecraft:mycelium",sub:"minecraft:dirt",accent:"minecraft:mycelium"},{id:"meadow",zh:"\u8349\u7538",temp:0,humid:.05,cont:.38,ero:-.2,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:grass_block"},{id:"windswept_hills",zh:"\u98CE\u88AD\u4E18\u9675",temp:-.05,humid:.02,cont:.4,ero:.35,top:"minecraft:grass_block",sub:"minecraft:stone",accent:"minecraft:stone"},{id:"stony_peaks",zh:"\u88F8\u5CA9\u5C71\u5CF0",temp:-.1,humid:-.1,cont:.55,ero:.55,top:"minecraft:stone",sub:"minecraft:stone",accent:"minecraft:snow_layer"},{id:"beach",zh:"\u6C99\u6EE9",temp:.2,humid:0,cont:.18,ero:0,top:"minecraft:sand",sub:"minecraft:sandstone",accent:"minecraft:sand"},{id:"warm_ocean",zh:"\u6696\u6C34\u6D77\u6D0B",temp:.4,humid:.1,cont:-.45,ero:.05,top:"minecraft:water",sub:"minecraft:sand",accent:"minecraft:sand"},{id:"ocean",zh:"\u6D77\u6D0B",temp:.1,humid:.1,cont:-.3,ero:.05,top:"minecraft:water",sub:"minecraft:gravel",accent:"minecraft:gravel"},{id:"frozen_ocean",zh:"\u51BB\u6D0B",temp:-.45,humid:.1,cont:-.35,ero:.05,top:"minecraft:ice",sub:"minecraft:gravel",accent:"minecraft:ice"}];function fi(e,n,t){let a=vt(t),i=Pe(a,e+2e3,n+2e3,260,3)+Pe(a,e-400,n+400,90,2)*.25,o=Pe(a,e-2e3,n-2e3,260,3)+Pe(a,e+400,n-400,90,2)*.25,r=Pe(a,e,n,320,5),s=Pe(a,e+1e3,n-1e3,180,4),l=Wr[0],c=1e9;for(let m of Wr){let u=(i-m.temp)**2*2.2+(o-m.humid)**2*1.8+(r-m.cont)**2*2.6+(s-m.ero)**2*1.2;u<c&&(c=u,l=m)}return l}function qr(e,n,t,a){let i=vt(a),o=Pe(i,e+3e3,t+3e3,150,3)+ra(i,e,n*2,t,220,2)*.35;return n<-24&&o<-.12?"deep_dark":o>.22?"lush":o>.02?"dripstone":o>-.06&&n<16?"sulfur":"stone"}function Hc(e,n,t,a){let i=ra(e,n,t*1.6,a,56,2),o=Math.abs(ra(e,n+800,t*1.8,a-800,28,2)),r=Math.abs(ra(e,n-900,t*1.5,a+900,42,2));return i>.66||o<.02||r<.014&&t<30}var Zr={lush:["minecraft:moss_block","minecraft:clay","minecraft:azalea_leaves","minecraft:moss_carpet"],dripstone:["minecraft:dripstone_block","minecraft:stone","minecraft:calcite"],deep_dark:["minecraft:sculk","minecraft:deepslate","minecraft:sculk_catalyst"],sulfur:["minecraft:sulfur_block","minecraft:stone","minecraft:sulfur"],stone:["minecraft:stone","minecraft:stone","minecraft:deepslate","minecraft:tuff"]};function Vr(e,n,t,a,i,o){let r=i===void 0?pi(e,n,a):i;if(t>r)return null;let{temp:s,humid:l}=Rc(e,n,a);if(o&&o.caves&&t<r-2){let u=vt(a),p=ui(u,e/46,t/28,n/46),d=ui(u,e/19+300,t/14-200,n/19+700);if(Math.abs(p)<.1&&Math.abs(d)<.16)return null}let c=fi(e,n,a);if(t===r)return r>126?"minecraft:snow_layer":r>108?c.accent==="minecraft:snow_layer"?"minecraft:snow_layer":"minecraft:stone":c.top==="minecraft:water"?r<=61?"minecraft:water":"minecraft:sand":r<=62?"minecraft:sand":c.top;if(t>r-3)return r<=62?"minecraft:sand":c.sub;if(r-t>6){let u=vt(a);if(t<-54)return"minecraft:lava";if(Hc(u,e,t,n))return"minecraft:cave_air";let p=qr(e,t,n,a),d=Zr[p]||Zr.stone,b=Math.floor(ve(e+t*7,n-t*3,a+11)*d.length);return d[Math.min(d.length-1,b)]}return t<0?"minecraft:deepslate":"minecraft:stone"}function Xr(e,n={}){var _;let t=Number(n.seed||0),a=(_=n.margin)!=null?_:512,i=n.y!==void 0&&n.y!==null?Math.floor(n.y):null,o=e.chunkSet||new Set,r=e.minX-a,s=e.maxX+a,l=e.minZ-a,c=e.maxZ+a,m=s-r+1,u=c-l+1,p=n.step||(m*u>14e5?2:1),d=0,b=vt(t);for(let f=r;f<=s;f+=p)for(let h=l;h<=c;h+=p){if(o.has(Math.floor(f/16)+","+Math.floor(h/16))||e.cols.has(f+","+h))continue;let y=pi(f,h,t),v,w,M=null;i===null?(w=y,v=Vr(f,h,y,t,y)):(w=i,v=Vr(f,h,i,t,y,{caves:n.caves}),M=n.caves?qr(f,i,h,t):null,v||(M?(v=M,w=i):w=null)),v&&(e.cols.set(f+","+h,{y:w,block:v,sim:!0,biome:M}),d++)}return e.minX=r,e.maxX=s,e.minZ=l,e.maxZ=c,e.simulated=d,e.simStep=p,e.seed=t,e}var Wc=[{id:"village_plains",zh:"\u6751\u5E84\uFF08\u5E73\u539F\uFF09",biomes:["plains","meadow","forest"],spacing:34,chance:.35,color:"#e0b34a"},{id:"village_desert",zh:"\u6751\u5E84\uFF08\u6C99\u6F20\uFF09",biomes:["desert"],spacing:34,chance:.4,color:"#e0b34a"},{id:"village_savanna",zh:"\u6751\u5E84\uFF08\u70ED\u5E26\u8349\u539F\uFF09",biomes:["savanna"],spacing:34,chance:.4,color:"#e0b34a"},{id:"village_taiga",zh:"\u6751\u5E84\uFF08\u9488\u53F6\u6797\uFF09",biomes:["taiga","snowy_taiga"],spacing:34,chance:.4,color:"#e0b34a"},{id:"village_snowy",zh:"\u6751\u5E84\uFF08\u96EA\u539F\uFF09",biomes:["snowy_plains"],spacing:34,chance:.35,color:"#e0b34a"},{id:"pillager_outpost",zh:"\u63A0\u593A\u8005\u524D\u54E8\u7AD9",biomes:["plains","desert","savanna","taiga"],spacing:40,chance:.25,color:"#c0504d"},{id:"ruined_portal",zh:"\u4E0B\u754C\u4F20\u9001\u95E8\u9057\u5740",biomes:["plains","forest","desert","savanna","taiga","snowy_plains","beach","swamp"],spacing:24,chance:.3,color:"#9b59b6"},{id:"ruined_portal_nether",zh:"\u4E0B\u754C\u4F20\u9001\u95E8\u9057\u5740\uFF08\u4E0B\u754C\u578B\uFF09",biomes:["ocean","warm_ocean"],spacing:24,chance:.2,color:"#8e44ad"},{id:"abandoned_camp",zh:"\u5E9F\u5F03\u8425\u5730",biomes:["forest","taiga","plains","savanna"],spacing:30,chance:.22,color:"#7f8c8d"},{id:"shipwreck",zh:"\u6C89\u8239",biomes:["ocean","warm_ocean","frozen_ocean","beach"],spacing:22,chance:.35,color:"#5d8aa8"},{id:"buried_treasure",zh:"\u57CB\u85CF\u7684\u5B9D\u85CF",biomes:["beach"],spacing:18,chance:.45,color:"#d4af37"},{id:"ocean_monument",zh:"\u6D77\u5E95\u795E\u6BBF",biomes:["ocean","frozen_ocean"],spacing:60,chance:.3,color:"#2e86c1"},{id:"woodland_mansion",zh:"\u6797\u5730\u5E9C\u90B8",biomes:["dark_forest"],spacing:80,chance:.3,color:"#6c3483"},{id:"desert_temple",zh:"\u6C99\u6F20\u795E\u6BBF",biomes:["desert"],spacing:40,chance:.3,color:"#d68910"},{id:"jungle_temple",zh:"\u4E1B\u6797\u795E\u5E99",biomes:["jungle"],spacing:40,chance:.3,color:"#229954"},{id:"witch_hut",zh:"\u5973\u5DEB\u5C0F\u5C4B",biomes:["swamp"],spacing:36,chance:.35,color:"#7d3c98"}],Jr={village:[["minecraft:bread",1,4,6],["minecraft:emerald",1,2,4],["minecraft:iron_ingot",1,3,3],["minecraft:oak_planks",4,12,4],["minecraft:apple",1,3,3],["minecraft:torch",1,4,3],["minecraft:iron_pickaxe",1,1,1],["minecraft:diamond",1,1,.5]],outpost:[["minecraft:crossbow",1,1,2],["minecraft:arrow",4,12,4],["minecraft:iron_ingot",1,3,3],["minecraft:dark_oak_log",3,8,3],["minecraft:emerald",1,3,1]],portal:[["minecraft:gold_ingot",1,4,4],["minecraft:golden_apple",1,1,.6],["minecraft:flint_and_steel",1,1,1],["minecraft:obsidian",1,4,4],["minecraft:gold_block",1,2,1],["minecraft:fire_charge",1,3,1]],camp:[["minecraft:campfire",1,1,2],["minecraft:leather",2,5,3],["minecraft:iron_ingot",1,2,2],["minecraft:bread",1,4,3],["minecraft:arrow",3,9,2],["minecraft:emerald",1,2,1]],shipwreck:[["minecraft:iron_ingot",2,6,4],["minecraft:emerald",1,3,2],["minecraft:gold_ingot",1,3,2],["minecraft:map",1,1,1],["minecraft:oak_planks",4,10,3],["minecraft:paper",2,6,2]],buried:[["minecraft:heart_of_the_sea",1,1,.5],["minecraft:gold_ingot",1,4,2],["minecraft:emerald",2,5,2],["minecraft:tnt",1,2,1]],monument:[["minecraft:gold_block",1,3,2],["minecraft:emerald",1,4,2],["minecraft:prismarine_shard",2,6,3],["minecraft:sponge",1,2,1]],mansion:[["minecraft:iron_ingot",2,6,2],["minecraft:diamond",1,2,1],["minecraft:emerald",1,4,2],["minecraft:gold_ingot",1,3,2]],temple:[["minecraft:gold_ingot",2,5,2],["minecraft:diamond",1,2,1],["minecraft:iron_ingot",2,5,2],["minecraft:emerald",1,3,1]],jungle:[["minecraft:diamond",1,2,1],["minecraft:emerald",1,3,1],["minecraft:gold_ingot",2,5,2],["minecraft:bamboo",2,8,2]],witch:[["minecraft:glass_bottle",1,3,2],["minecraft:redstone",1,4,3],["minecraft:glowstone_dust",1,4,3],["minecraft:spider_eye",1,3,2]]};function Yr(e,n={}){var m;let t=Number(n.seed||0),a=(m=n.margin)!=null?m:512,i=e.minX-a,o=e.maxX+a,r=e.minZ-a,s=e.maxZ+a,l=32,c=[];for(let u=Math.floor(i/l)*l;u<=o;u+=l)for(let p=Math.floor(r/l)*l;p<=s;p+=l){let d=ve(Math.floor(u/l),Math.floor(p/l),t+12345),b=u+Math.floor(ve(u,p,t+7)*l),_=p+Math.floor(ve(u,p,t+19)*l),f=fi(b,_,t),h=Wc.filter($=>$.biomes.includes(f.id));if(!h.length)continue;let y=ve(u+11,p-13,t+41)*h.length,v=h[Math.min(h.length-1,Math.floor(y))];if(ve(u+3,p-5,t+31)>v.chance)continue;let M=pi(b,_,t);c.push({x:b,z:_,y:M,type:v.id,zh:v.zh,color:v.color,biome:f.zh})}return c}function Xt(e,n){let t=e.startsWith("village")?"village":e.startsWith("ruined_portal")?"portal":e==="pillager_outpost"?"outpost":e==="abandoned_camp"?"camp":e==="shipwreck"?"shipwreck":e==="buried_treasure"?"buried":e==="ocean_monument"?"monument":e==="woodland_mansion"?"mansion":e==="desert_temple"||e==="jungle_temple"?"temple":e==="witch_hut"?"witch":"village",a=Jr[t]||Jr.village,i=3+Math.floor(ve(n,t.length,5)*5),o=[];for(let r=0;r<i;r++){let s=ve(r+1,n,t.length+9),l=0,c=a[0];for(let u of a)if(l+=u[3],s*a.reduce((p,d)=>p+d[3],0)<l){c=u;break}let m=c[1]+Math.floor(ve(r,n+3,11)*(c[2]-c[1]+1));o.push({name:c[0],count:m})}return o}var Zc={village:{size:27,ground:"minecraft:grass_block",path:"minecraft:dirt_path",wall:"minecraft:oak_planks",roof:"minecraft:oak_log",floor:"minecraft:cobblestone",light:"minecraft:torch"},desert_village:{size:27,ground:"minecraft:sand",path:"minecraft:sandstone",wall:"minecraft:sandstone",roof:"minecraft:smooth_sandstone",floor:"minecraft:sandstone",light:"minecraft:torch"},outpost:{size:17,ground:"minecraft:grass_block",wall:"minecraft:dark_oak_planks",roof:"minecraft:dark_oak_log",floor:"minecraft:cobblestone",light:"minecraft:torch"},portal:{size:15,ground:"minecraft:netherrack",frame:"minecraft:obsidian",broken:"minecraft:crying_obsidian",light:"minecraft:fire"},camp:{size:15,ground:"minecraft:grass_block",tent:"minecraft:white_wool",log:"minecraft:oak_log",fire:"minecraft:campfire"},shipwreck:{size:21,hull:"minecraft:oak_planks",deck:"minecraft:spruce_planks",mast:"minecraft:oak_log"},temple:{size:21,ground:"minecraft:sandstone",wall:"minecraft:sandstone",accent:"minecraft:orange_terracotta",gold:"minecraft:gold_block"},jungle_temple:{size:21,ground:"minecraft:mossy_cobblestone",wall:"minecraft:cobblestone",accent:"minecraft:chiseled_stone_bricks"},monument:{size:25,ground:"minecraft:prismarine",wall:"minecraft:prismarine_bricks",accent:"minecraft:sea_lantern"},mansion:{size:31,ground:"minecraft:grass_block",wall:"minecraft:dark_oak_planks",roof:"minecraft:dark_oak_log",floor:"minecraft:cobblestone"},witch_hut:{size:13,ground:"minecraft:grass_block",wall:"minecraft:spruce_planks",roof:"minecraft:dark_oak_log"}};function Bn(e,n){let t=e.startsWith("village")?e.includes("desert")?"desert_village":"village":e.startsWith("ruined_portal")?"portal":e==="pillager_outpost"?"outpost":e==="abandoned_camp"?"camp":e==="shipwreck"?"shipwreck":e==="desert_temple"?"temple":e==="jungle_temple"?"jungle_temple":e==="ocean_monument"?"monument":e==="woodland_mansion"?"mansion":e==="witch_hut"?"witch_hut":"camp",a=Zc[t],i=a.size,o=Math.floor(i/2),r=new Map,s=(m,u,p)=>{m>=0&&u>=0&&m<i&&u<i&&r.set(m+","+u,p)},l=m=>ve(m*7+1,m*13+3,n+99);for(let m=0;m<i;m++)for(let u=0;u<i;u++)s(m,u,a.ground||a.hull||a.wall);if(t==="village"||t==="desert_village"){for(let u=0;u<i;u++)s(u,o,a.path),s(o,u,a.path);let m=3+Math.floor(l(1)*4);for(let u=0;u<m;u++){let p=3+Math.floor(ve(u,2,n+5)*(i-8)),d=3+Math.floor(ve(u,3,n+6)*(i-8)),b=5+Math.floor(ve(u,4,n+7)*3),_=5+Math.floor(ve(u,5,n+8)*3);for(let f=p;f<p+b;f++)for(let h=d;h<d+_;h++)s(f,h,a.wall);for(let f=p;f<p+b;f++)s(f,d,a.roof);s(p+Math.floor(b/2),d+_-1,a.light)}for(let u=o-1;u<=o+1;u++)for(let p=o-1;p<=o+1;p++)s(u,p,a.floor)}else if(t==="portal"){for(let[m,u]of[[5,5],[5,10],[10,5],[10,10]])s(m,u,a.frame);for(let m=6;m<=9;m++)s(m,6,a.broken),s(m,9,a.broken);s(6,7,a.frame),s(7,7,a.light),s(8,8,a.frame)}else if(t==="camp"){for(let m=0;m<i;m++)s(m,o,"minecraft:dirt_path");s(o,o,a.fire);for(let m=0;m<3;m++){let u=2+Math.floor(ve(m,1,n+3)*(i-6)),p=2+Math.floor(ve(m,2,n+4)*(i-6));for(let d=u;d<u+4;d++)for(let b=p;b<p+3;b++)s(d,b,a.tent)}s(2,2,a.log),s(i-3,i-3,a.log)}else if(t==="shipwreck"){for(let m=4;m<i-4;m++)s(m,4,a.hull),s(m,i-5,a.hull);for(let m=4;m<i-4;m++)s(4,m,a.hull),s(i-5,m,a.hull);for(let m=6;m<i-6;m++)for(let u=6;u<i-6;u++)s(m,u,a.deck);s(o,o,a.mast)}else if(t==="temple"){for(let m=1;m<i-1;m++)for(let u=1;u<i-1;u++)s(m,u,a.wall);for(let m=2;m<i-2;m+=3)s(m,2,a.accent),s(2,m,a.accent),s(m,i-3,a.accent),s(i-3,m,a.accent);s(o,o,a.gold)}else if(t==="outpost"||t==="mansion"||t==="witch_hut"){for(let m=2;m<i-2;m++)for(let u=2;u<i-2;u++)s(m,u,a.wall);for(let m=2;m<i-2;m++)s(m,2,a.roof);s(o,o,a.light)}else if(t==="monument"){for(let m=2;m<i-2;m++)for(let u=2;u<i-2;u++)s(m,u,a.wall);for(let m=3;m<i-3;m+=4)s(m,o,a.accent)}else if(t==="jungle_temple"){for(let m=1;m<i-1;m++)for(let u=1;u<i-1;u++)s(m,u,a.wall);for(let m=2;m<i-2;m+=2)s(m,2,a.accent)}let c=[];for(let[m,u]of r){let[p,d]=m.split(",").map(Number);c.push({x:p,z:d,block:u})}return{size:i,blocks:c,kind:t}}function tt(e){return qt[e]||"#6b7280"}function la(e,n,t=0){let{size:a,palette:i,blocks:o}=n;if(!e||!a||!o||!o.length)return;let[r,s,l]=a,c=Math.cos(t*Math.PI/2),m=Math.sin(t*Math.PI/2),u=5,p=3,d=o.map(B=>{let z=B.pos[0],S=B.pos[1],T=B.pos[2],L=Math.round(z*c+T*m),D=Math.round(-z*m+T*c);return{x:L,y:S,z:D,id:B.state}}),b=1/0,_=-1/0,f=1/0,h=-1/0;for(let B of d)b=Math.min(b,B.x),_=Math.max(_,B.x),f=Math.min(f,B.z),h=Math.max(h,B.z);let y=(_-b+h-f+2)*u+40,v=(_-b+h-f+2)*p+s*p+40;e.width=Math.min(1200,Math.max(320,y)),e.height=Math.min(900,Math.max(260,v));let w=e.getContext("2d");w.fillStyle="#0b0f15",w.fillRect(0,0,e.width,e.height);let M=14+(_-b+1)*u,$=20+s*p;d.sort((B,z)=>B.x+B.z+B.y*.01-(z.x+z.z+z.y*.01));for(let B of d){let z=(B.x-b+(B.z-f))*u/2+(_-b+1)*0,S=(B.x-B.z)*u+e.width/2,T=$-B.y*p+(B.x+B.z)*p/2-(b+f)*0,L=i[B.id]||"minecraft:stone",D=tt(L);w.fillStyle=Qr(D,.86),w.beginPath(),w.moveTo(S,T),w.lineTo(S+u,T+p/2),w.lineTo(S,T+p),w.lineTo(S-u,T+p/2),w.closePath(),w.fill(),w.fillStyle=D,w.beginPath(),w.moveTo(S-u,T+p/2),w.lineTo(S-u,T+p*1.5),w.lineTo(S,T+p*2),w.lineTo(S,T+p),w.closePath(),w.fill(),w.fillStyle=Qr(D,1.14),w.beginPath(),w.moveTo(S+u,T+p/2),w.lineTo(S+u,T+p*1.5),w.lineTo(S,T+p*2),w.lineTo(S,T+p),w.closePath(),w.fill()}}function Qr(e,n){let t=e.replace("#",""),a=parseInt(t.length===3?t.split("").map(s=>s+s).join(""):t,16),i=a>>16&255,o=a>>8&255,r=a&255;return i=Math.max(0,Math.min(255,Math.round(i*n))),o=Math.max(0,Math.min(255,Math.round(o*n))),r=Math.max(0,Math.min(255,Math.round(r*n))),"#"+((1<<24)+(i<<16)+(o<<8)+r).toString(16).slice(1)}function es(e,n=12){return e.slice(0,n).map(t=>`<span class="legenditem"><i style="background:${tt(t)}"></i>${t.replace("minecraft:","")}</span>`).join("")}function De(e){let n=new DataView(e.buffer,e.byteOffset,e.byteLength),t=new TextDecoder("utf-8",{fatal:!1}),a=0,i=()=>{let l=n.getUint16(a);if(a+=2,a+l>e.length)throw new Error("NBT \u5B57\u7B26\u4E32\u8D8A\u754C");let c=t.decode(e.subarray(a,a+l));return a+=l,c};function o(l){switch(l){case 1:{let c=n.getInt8(a);return a+=1,c}case 2:{let c=n.getInt16(a);return a+=2,c}case 3:{let c=n.getInt32(a);return a+=4,c}case 4:{let c=n.getBigInt64(a);a+=8;let m=Number(c);return Number.isSafeInteger(m)?m:c}case 5:{let c=n.getFloat32(a);return a+=4,c}case 6:{let c=n.getFloat64(a);return a+=8,c}case 7:{let c=n.getInt32(a);a+=4;let m=e.subarray(a,a+c);return a+=c,m}case 8:return i();case 9:{let c=n.getInt8(a);a+=1;let m=n.getInt32(a);a+=4;let u=[];for(let p=0;p<m;p++)u.push(o(c));return{listType:c,items:u}}case 10:{let c={};for(;;){let m=n.getInt8(a);if(a+=1,m===0)break;let u=i();c[u]={type:m,value:o(m)}}return c}case 11:{let c=n.getInt32(a);a+=4;let m=new Int32Array(c);for(let u=0;u<c;u++)m[u]=n.getInt32(a),a+=4;return m}case 12:{let c=n.getInt32(a);a+=4;let m=[];for(let u=0;u<c;u++)m.push(n.getBigInt64(a)),a+=8;return m}default:throw new Error("\u672A\u77E5 NBT \u7C7B\u578B "+l)}}let r=n.getInt8(a);if(a+=1,r!==10)throw new Error("NBT \u6839\u8282\u70B9\u4E0D\u662F Compound");let s=i();return{rootType:r,rootName:s,data:o(10)}}function Cn(e){let n=new TextEncoder,t=[],a=0,i=c=>{t.push(c),a+=c.length},o=c=>{let m=n.encode(c);if(m.length>65535)throw new Error("NBT \u5B57\u7B26\u4E32\u8D85\u8FC7 65535 \u5B57\u8282");let u=new Uint8Array(2);new DataView(u.buffer).setUint16(0,m.length),i(u),i(m)},r=(c,m)=>{let u=new Uint8Array(c===1?1:c===2?2:c===3?4:c===4?8:c===5?4:c===6?8:0),p=new DataView(u.buffer);if(c===1?p.setInt8(0,m):c===2?p.setInt16(0,m):c===3?p.setInt32(0,m):c===4?p.setBigInt64(0,typeof m=="bigint"?m:BigInt(Math.trunc(m))):c===5?p.setFloat32(0,m):c===6&&p.setFloat64(0,m),c<=6){i(u);return}if(c===7){let d=m instanceof Uint8Array?m:new Uint8Array(m),b=new Uint8Array(4+d.length);new DataView(b.buffer).setInt32(0,d.length),b.set(d,4),i(b);return}if(c===8){o(m);return}if(c===9){let d=m.listType,b=m.items,_=new Uint8Array(5);_[0]=d,new DataView(_.buffer).setInt32(1,b.length),i(_);for(let f of b)r(d,f);return}if(c===10){for(let d of Object.keys(m)){let b=m[d].type,_=m[d].value;i(new Uint8Array([b])),o(d),r(b,_)}i(new Uint8Array([0]));return}if(c===11){let d=new Uint8Array(4+m.length*4);new DataView(d.buffer).setInt32(0,m.length);for(let b=0;b<m.length;b++)new DataView(d.buffer).setInt32(4+b*4,m[b]);i(d);return}if(c===12){let d=new Uint8Array(4+m.length*8);new DataView(d.buffer).setInt32(0,m.length);for(let b=0;b<m.length;b++)new DataView(d.buffer).setBigInt64(4+b*8,typeof m[b]=="bigint"?m[b]:BigInt(Math.trunc(m[b])));i(d);return}};i(new Uint8Array([10])),o(e.rootName||""),r(10,e.data);let s=new Uint8Array(a),l=0;for(let c of t)s.set(c,l),l+=c.length;return s}function Q(e,n,t){let a=e&&e[n];return a?a.value:t}function Lt(e){let n=be(e),t=n.entries.find(l=>l.name==="level.dat"||l.name.endsWith("/level.dat"));if(!t)throw new Error("ZIP \u91CC\u6CA1\u6709 level.dat\uFF0C\u53EF\u80FD\u4E0D\u662F Java \u5B58\u6863");let a=De($e(n.read(t))),i=a.data.Data?a.data.Data.value:a.data,o=n.entries.filter(l=>/(^|\/)region\/r\.-?\d+\.-?\d+\.mca$/.test(l.name)),r=n.entries.filter(l=>/(^|\/)playerdata\/[0-9a-f-]+\.dat$/.test(l.name)),s={name:Q(i,"LevelName",""),version:Q(i,"Version",null)?Q(Q(i,"Version",{}),"Name",""):"",seed:Q(i,"WorldGenSettings",null)?Q(Q(i,"WorldGenSettings",{}),"seed",0):Q(i,"RandomSeed",0),spawn:[Q(i,"SpawnX",0),Q(i,"SpawnY",0),Q(i,"SpawnZ",0)],time:Q(i,"Time",0),dayTime:Q(i,"DayTime",0),gameType:Q(i,"GameType",0),difficulty:Q(i,"Difficulty",0),hardcore:Q(i,"hardcore",0),allowCommands:Q(i,"allowCommands",0),lastPlayed:Q(i,"LastPlayed",0),regions:o.length,players:r.length,data:i,level:a,zip:n};return s.days=Math.floor(s.dayTime/24e3),s}function wt(e,n){let t=e.entries.filter(c=>/(^|\/)region\/r\.-?\d+\.-?\d+\.mca$/.test(c.name)),a=new Map,i=1/0,o=-1/0,r=1/0,s=-1/0,l=0;for(let c of t){let m;try{m=e.read(c)}catch(p){continue}if(!m||m.length<8192)continue;let u=new DataView(m.buffer,m.byteOffset,m.byteLength);for(let p=0;p<1024;p++){let d=(u.getUint32(p*4)>>>8)*4096;if(!d||d+8>m.length)continue;let b=u.getUint32(d);if(b<5||d+4+b>m.length)continue;let _=u.getUint8(d+4),f=m.subarray(d+5,d+4+b);try{f=_===1?$e(f):_===2?$e(f):f}catch(z){continue}let h;try{h=De(f)}catch(z){continue}l++;let y=h.data,v=Q(y,"Level",null)?Q(y,"Level",{}):y,w=Q(v,"xPos",0),M=Q(v,"zPos",0),$=Q(v,"Sections",null)||Q(v,"sections",null);if(!$)continue;let B=$.items;for(let z of B){let S=Q(z,"Y",0),T=Q(z,"block_states",null),L=Q(z,"Palette",null)||T&&Q(T,"palette",null);if(!L)continue;let D=L.items.map(E=>Q(E,"Name","minecraft:air")),U=Math.max(4,Math.ceil(Math.log2(Math.max(2,D.length)))),H=Q(z,"BlockStates",null)||T&&Q(T,"data",null);if(!H)continue;let X=Math.floor(64/U),k=(BigInt(1)<<BigInt(U))-BigInt(1);for(let E=0;E<16;E++)for(let P=0;P<16;P++)for(let R=0;R<16;R++){let J=E*256+P*16+R,x=Math.floor(J/X),I=BigInt(J%X*U),j=H[x],W=typeof j=="bigint"?j:BigInt(Math.trunc(j||0)),le=Number(W>>I&k),K=D[le]||"minecraft:air";if(K.endsWith(":air")||K.includes("cave_air")||K.includes("void_air"))continue;let ee=w*16+R,rt=M*16+P,Fe=S*16+E,ge=ee+","+rt,ke=a.get(ge);(!ke||Fe>ke.y)&&a.set(ge,{block:K,y:Fe})}}for(let z of[w,w]);i=Math.min(i,w*16),o=Math.max(o,w*16+15),r=Math.min(r,M*16),s=Math.max(s,M*16+15)}n&&n(l)}return{cols:a,minX:i,maxX:o,minZ:r,maxZ:s,chunkSet:new Set,chunks:l,simulated:0}}function V(e){return document.getElementById(e)}function Yt(e){return String(e).replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function as(){let e=V("modalBody");e.innerHTML=`<h3>Java \u7248\u5B58\u6863</h3>
    <p class="muted">\u652F\u6301 Java \u5B58\u6863 .zip\uFF08\u542B level.dat + region\uFF09\u3001\u5355\u6587\u4EF6 .mca\u3001.dat\u3001.nbt \u7ED3\u6784\u3002</p>
    <input type="file" id="jvFile" accept=".zip,.mca,.dat,.nbt,*/*" style="margin:6px 0">
    <div id="jvOut" class="muted"></div>
    <div class="modalbtns"><button id="jvClose" class="ghost">\u5173\u95ED</button></div>`,V("modal").style.display="flex";let n=document.querySelector(".modalbox");n&&(n.style.maxWidth="760px",n.style.width="96vw"),V("jvClose").onclick=()=>{n&&(n.style.maxWidth="",n.style.width=""),V("modal").style.display="none"},V("jvFile").onchange=async t=>{let a=t.target.files[0];if(!a)return;let i=V("jvOut");i.innerHTML="\u8BFB\u53D6\u4E2D\u2026";try{let o=new Uint8Array(await a.arrayBuffer());if(/\.nbt$/i.test(a.name))return Vc(o,i);if(/\.mca$/i.test(a.name)){if(o.length<8192)throw new Error("\u4E0D\u662F\u6709\u6548\u7684 .mca\uFF08\u4E0D\u8DB3 8KB \u5934\u90E8\uFF09");let l=wt({entries:[{name:"region/r.0.0.mca"}],read:()=>o},null);i.innerHTML=`<p>\u533A\u5757 ${l.chunks} \u4E2A\uFF0C\u8303\u56F4 X ${l.minX}~${l.maxX}\uFF0CZ ${l.minZ}~${l.maxZ}</p>
          <div class="mapwrap" style="max-height:56vh"><canvas id="jvCanvas"></canvas></div>`,ts(l);return}if(/\.dat$/i.test(a.name)){let l;try{l=De($e(o))}catch(c){l=De(o)}i.innerHTML=`<p class="skbar"><button id="jvTree" class="primary">\u6811\u72B6\u7F16\u8F91</button></p>
          <pre class="code" style="height:40vh;overflow:auto">${Yt(JSON.stringify(ca(l.data),null,2).slice(0,2e4))}</pre>`,V("jvTree").onclick=()=>ns(l,c=>{let m=fn(Cn(c)),u="\u4FEE\u6539\u540E\u7684.dat";if(window.AndroidBridge&&window.AndroidBridge.saveBinary)hi(u,m);else{let p=document.createElement("a");p.href=URL.createObjectURL(new Blob([m])),p.download=u,p.click()}});return}let r=Lt(o),s=wt(r.zip,null);i.innerHTML=`<div class="grid2">
        <div class="card"><span>\u4E16\u754C\u540D</span><b>${Yt(r.name||"\u672A\u547D\u540D")}</b></div>
        <div class="card"><span>\u7248\u672C</span><b>${Yt(r.version||"\u672A\u77E5")}</b></div>
        <div class="card"><span>\u79CD\u5B50</span><b>${r.seed}</b></div>
        <div class="card"><span>\u51FA\u751F\u70B9</span><b>${r.spawn.join(", ")}</b></div>
        <div class="card"><span>\u6E38\u620F\u5929\u6570</span><b>${r.days}</b></div>
        <div class="card"><span>\u5B58\u6863\u533A\u5757</span><b>${r.regions} \u4E2A region</b></div>
        <div class="card"><span>\u73A9\u5BB6\u6570\u636E</span><b>${r.players} \u4E2A</b></div>
        <div class="card"><span>\u65B9\u5757\u5217</span><b>${s.cols.size}</b></div>
      </div>
      <p class="muted">\u533A\u57DF\u8303\u56F4 X ${s.minX}~${s.maxX}\uFF0CZ ${s.minZ}~${s.maxZ}</p>
      <div class="form2">
        <label>\u4E16\u754C\u540D<input id="jvName" value="${Yt(r.name)}"></label>
        <label>\u79CD\u5B50<input id="jvSeed" value="${r.seed}"></label>
        <label>\u6E38\u620F\u5929\u6570<input id="jvDay" value="${r.days}"></label>
        <label>\u6A21\u5F0F<input id="jvMode" value="${r.gameType}"></label>
        <label>\u51FA\u751F X<input id="jvSx" value="${r.spawn[0]}"></label>
        <label>\u51FA\u751F Y<input id="jvSy" value="${r.spawn[1]}"></label>
        <label>\u51FA\u751F Z<input id="jvSz" value="${r.spawn[2]}"></label>
      </div>
      <div class="skbar"><button id="jvMap" class="primary">\u6E32\u67D3\u5730\u56FE</button><button id="jvPlayers" class="ghost">\u73A9\u5BB6\u5217\u8868</button><button id="jvTree" class="ghost">NBT \u6811\u7F16\u8F91</button><button id="jvSave" class="ghost">\u4FDD\u5B58\u4FEE\u6539\uFF08\u5BFC\u51FA ZIP\uFF09</button></div>
      <div class="mapwrap" style="max-height:46vh"><canvas id="jvCanvas"></canvas></div>`,V("jvMap").onclick=()=>ts(s),V("jvPlayers").onclick=()=>{let l=r.zip.entries.filter(c=>/playerdata\/[0-9a-f-]+\.dat$/.test(c.name));i.insertAdjacentHTML("beforeend",`<p class="muted">${l.length} \u4E2A\u73A9\u5BB6\u6570\u636E\uFF1A${l.map(c=>c.name.split("/").pop()).join("\u3001")||"\u65E0"}</p>`)},V("jvTree").onclick=()=>ns(r.level,l=>{r.level=l,i.insertAdjacentHTML("beforeend",'<p class="muted">\u5DF2\u4FEE\u6539\u5230\u5185\u5B58\uFF0C\u70B9\u201C\u4FDD\u5B58\u4FEE\u6539\u201D\u5BFC\u51FA ZIP \u751F\u6548</p>')}),V("jvSave").onclick=()=>{let l=r.level.data.Data.value,c=(f,h,y)=>{l[f]?l[f].value=y:l[f]={type:h,value:y}},m=(f,h)=>{let y=Number(V(f).value);return Number.isFinite(y)?y:h};c("LevelName",8,V("jvName").value),l.WorldGenSettings?l.WorldGenSettings.value.seed.value=m("jvSeed",r.seed):c("RandomSeed",4,m("jvSeed",r.seed)),c("DayTime",4,m("jvDay",r.days)*24e3),c("GameType",3,m("jvMode",r.gameType)),c("SpawnX",3,m("jvSx",r.spawn[0])),c("SpawnY",3,m("jvSy",r.spawn[1])),c("SpawnZ",3,m("jvSz",r.spawn[2]));let u=fn(Cn(r.level)),p=r.zip.entries.find(f=>f.name==="level.dat"||f.name.endsWith("/level.dat")).name,d=r.zip.entries.map(f=>({name:f.name,data:f.name===p?u:r.zip.read(f)})),b=ze(d),_="\u4FEE\u6539\u540E\u7684\u5B58\u6863.zip";if(window.AndroidBridge&&window.AndroidBridge.saveBinary)hi(_,b);else{let f=document.createElement("a");f.href=URL.createObjectURL(new Blob([b])),f.download=_,f.click()}i.insertAdjacentHTML("beforeend",'<p class="muted">\u5DF2\u5BFC\u51FA\u4FEE\u6539\u540E\u7684\u5B8C\u6574\u5B58\u6863 ZIP\uFF08level.dat \u5DF2\u66FF\u6362\uFF09</p>')}}catch(o){i.innerHTML='<p class="banner" style="display:block">'+Yt(o.message)+"</p>"}}}function ts(e){let n=V("jvCanvas");if(!n||!e.cols.size)return;let t=e.maxX-e.minX+1,a=e.maxZ-e.minZ+1,i=t>1400?1:t>800?2:3;if(t*i>4096||a*i>4096)return;n.width=t*i,n.height=a*i;let o=n.getContext("2d");o.fillStyle="#0b0f15",o.fillRect(0,0,n.width,n.height);for(let[r,s]of e.cols){let[l,c]=r.split(",").map(Number);o.fillStyle=tt(s.block),o.fillRect((l-e.minX)*i,(c-e.minZ)*i,i,i)}n.style.width=Math.min(n.width,720)+"px",n.style.imageRendering="pixelated"}function ca(e){if(!e||typeof e!="object")return e;if(typeof e=="bigint")return e.toString();if(e instanceof Uint8Array)return"<bytes "+e.length+">";if(Array.isArray(e))return e.map(ca);if("type"in e&&"value"in e)return ca(e.value);let n={};for(let t of Object.keys(e))n[t]=ca(e[t]);return n}function hi(e,n){let t="";for(let i=0;i<n.length;i+=32768)t+=String.fromCharCode.apply(null,n.subarray(i,i+32768));window.AndroidBridge.saveBinary(e,btoa(t))}function Vc(e,n){try{let t;try{t=De($e(e))}catch(m){t=De(e)}let a=t.data,i=a.size?a.size.value:null,o=a.palette?a.palette.value.items.map(m=>Q(m,"Name","?")):[],s=(a.blocks?a.blocks.value.items:[]).map(m=>({pos:Q(m,"pos",[0,0,0]),state:Q(m,"state",0)})),l=0;n.innerHTML=`<p>\u7ED3\u6784\u5927\u5C0F\uFF1A${i?i.join(" \xD7 ")+" \u65B9\u5757":"\u672A\u77E5"}\uFF0C\u65B9\u5757 ${s.length} \u4E2A\uFF0C\u72B6\u6001 ${o.length} \u79CD</p>
      <div class="skbar"><button id="st3dL" class="ghost">\u5DE6\u8F6C</button><button id="st3dR" class="ghost">\u53F3\u8F6C</button><button id="st3dTop" class="ghost">\u4FEF\u89C6</button></div>
      <div class="mapwrap" style="max-height:52vh"><canvas id="st3dCanvas"></canvas></div>
      <div class="legend">${es(o)}</div>
      <p class="muted">\u6309\u9AD8\u5EA6\u5806\u53E0\u6E32\u67D3\uFF0C\u53EF\u5DE6\u53F3\u65CB\u8F6C 90\xB0\uFF1B\u65B9\u5757\u989C\u8272\u53D6\u81EA\u8C03\u8272\u677F\u540D\u79F0\u3002</p>`;let c=()=>la(V("st3dCanvas"),{size:i,palette:o,blocks:s},l);c(),V("st3dL").onclick=()=>{l=(l+3)%4,c()},V("st3dR").onclick=()=>{l=(l+1)%4,c()},V("st3dTop").onclick=()=>{l=0,c()}}catch(t){n.innerHTML='<p class="banner" style="display:block">'+Yt(t.message)+"</p>"}}var Jc={fabric:{name:"Fabric",build:"fabric-loom"},forge:{name:"Forge",build:"forgegradle"},neoforge:{name:"NeoForge",build:"neoForge"}};function Kc(e){return e.replace(/\./g,"/")}function is(){let e=V("modalBody");e.innerHTML=`<h3>Java \u6A21\u7EC4\u5236\u4F5C\u5668</h3>
    <p class="muted">\u751F\u6210\u53EF\u76F4\u63A5\u7528 Gradle \u6784\u5EFA\u7684\u6A21\u7EC4\u5DE5\u7A0B\uFF08\u6E90\u7801 + \u6784\u5EFA\u811A\u672C + \u8D44\u6E90\uFF09\uFF0C\u4E0D\u5728\u8FD9\u91CC\u7F16\u8BD1 jar\u3002</p>
    <div class="form"><label>\u6A21\u7EC4\u540D</label><input id="jmName" value="MyMod">
      <label>modid</label><input id="jmId" value="mymod">
      <label>\u5305\u540D</label><input id="jmPkg" value="com.example.mymod">
      <label>\u52A0\u8F7D\u5668</label><select id="jmLoader">
        <option value="fabric">Fabric</option><option value="forge">Forge</option><option value="neoforge">NeoForge</option>
      </select>
      <label>Minecraft \u7248\u672C</label><input id="jmMc" value="1.21.1">
      <label>\u5305\u542B\u5185\u5BB9</label>
      <div class="skbar"><label class="chk"><input type="checkbox" id="jmItem" checked> \u7269\u54C1</label>
      <label class="chk"><input type="checkbox" id="jmBlock" checked> \u65B9\u5757</label>
      <label class="chk"><input type="checkbox" id="jmFood"> \u98DF\u7269</label>
      <label class="chk"><input type="checkbox" id="jmRecipe" checked> \u5408\u6210\u914D\u65B9</label></div>
    </div>
    <div class="skbar"><button id="jmGen" class="primary">\u751F\u6210\u5DE5\u7A0B ZIP</button><button id="jmClose" class="ghost">\u5173\u95ED</button></div>
    <p id="jmMsg" class="muted"></p>`,V("modal").style.display="flex";let n=document.querySelector(".modalbox");n&&(n.style.maxWidth="640px",n.style.width="96vw"),V("jmClose").onclick=()=>{n&&(n.style.maxWidth="",n.style.width=""),V("modal").style.display="none"},V("jmGen").onclick=()=>{let t=V("jmName").value.trim()||"MyMod",a=(V("jmId").value.trim()||"mymod").replace(/[^a-z0-9_]/gi,""),i=V("jmPkg").value.trim()||"com.example."+a,o=V("jmLoader").value,r=V("jmMc").value.trim()||"1.21.1",s=V("jmItem").checked,l=V("jmBlock").checked,c=V("jmFood").checked,m=V("jmRecipe").checked,u={};if(o==="fabric")u["build.gradle"]=`plugins { id 'fabric-loom' version '1.7-SNAPSHOT' }
version = '1.0.0'
group = '${i}'
repositories { mavenCentral() }
dependencies { minecraft "com.mojang:minecraft:${r}" mappings "net.fabricmc:yarn:${r}+build.1:v2" modImplementation "net.fabricmc:fabric-loader:0.15.11" modImplementation "net.fabricmc.fabric-api:fabric-api:0.100.0" }
`,u["settings.gradle"]=`pluginManagement { repositories { maven { url 'https://maven.fabricmc.net/' } gradlePluginPortal() } }
`,u["src/main/resources/fabric.mod.json"]=JSON.stringify({schemaVersion:1,id:a,name:t,version:"1.0.0",entrypoints:{main:[i+".MyMod"]},depends:{minecraft:r,"fabric-loader":">=0.15"},description:t},null,2);else{let f=o==="neoforge";u["build.gradle"]=f?`plugins { id 'net.neoforged.gradle.userdev' version '7.0.+' }
version='1.0.0'
group='${i}'
minecraft { version = '${r}' }
dependencies { implementation 'net.neoforged:neoforge:21.1.0' }
`:`buildscript { repositories { maven { url 'https://maven.minecraftforge.net' } } dependencies { classpath 'net.minecraftforge.gradle:ForgeGradle:6.0.+' } }
apply plugin: 'net.minecraftforge.gradle'
minecraft { mappings channel: 'official', version: '${r}' }
dependencies { minecraft 'net.minecraftforge:forge:${r}-47.2.0' }
`;let h=`modLoader="javafml"
loaderVersion="[1,) "license="${a}"
[[mods]]
modId="${a}"
version="1.0.0"
displayName="${t}"
`;u[f?"src/main/resources/META-INF/neoforge.mods.toml":"src/main/resources/META-INF/mods.toml"]=h}let p="src/main/java/"+Kc(i);u[p+"/MyMod.java"]=`package ${i};

import net.minecraft.resources.ResourceLocation;

public class MyMod {
    public static final String MODID = "${a}";
    public static ResourceLocation id(String path) { return ResourceLocation.fromNamespaceAndPath(MODID, path); }
}
`,s&&(u[p+"/ModItems.java"]=`package ${i};

import net.minecraft.world.item.Item;
import net.minecraft.world.item.Rarity;

public final class ModItems {
    public static final Item SAMPLE = new Item(new Item.Properties().stacksTo(64).rarity(Rarity.COMMON));
}
`,u["src/main/resources/assets/"+a+"/lang/en_us.json"]=JSON.stringify({["item."+a+".sample"]:"Sample Item"},null,2),u["src/main/resources/assets/"+a+"/models/item/sample.json"]=JSON.stringify({parent:"item/generated",textures:{layer0:a+":item/sample"}},null,2)),l&&(u[p+"/ModBlocks.java"]=`package ${i};

import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.state.BlockBehaviour;

public final class ModBlocks {
    public static final Block SAMPLE_BLOCK = new Block(BlockBehaviour.Properties.of().strength(2.0f));
}
`),m&&(u["src/main/resources/data/"+a+"/recipe/sample.json"]=JSON.stringify({type:"minecraft:crafting_shapeless",ingredients:[{item:"minecraft:dirt"}],result:{id:a+":sample",count:1}},null,2)),u["README.md"]=`# ${t}

- modid: ${a}
- \u52A0\u8F7D\u5668: ${Jc[o].name}
- MC \u7248\u672C: ${r}

\u6784\u5EFA\uFF1A\u5B89\u88C5 JDK 17+ \u540E\u6267\u884C \`./gradlew build\`\uFF0C\u4EA7\u7269\u5728 \`build/libs\`\u3002
\u672C\u5DE5\u7A0B\u7531 MCBE\u5DE5\u5177\u7BB1 \u751F\u6210\uFF0C\u672A\u5728\u6B64\u73AF\u5883\u7F16\u8BD1\u3002
`;let d={};for(let[f,h]of Object.entries(u))d[f]=new TextEncoder().encode(h);let b=ze(Object.entries(d).map(([f,h])=>({name:f,data:h}))),_=a+"-project.zip";if(window.AndroidBridge&&window.AndroidBridge.saveBinary)hi(_,b),V("jmMsg").textContent="\u5DF2\u4FDD\u5B58\u5230\u5E94\u7528\u5B58\u50A8/"+_;else{let f=document.createElement("a");f.href=URL.createObjectURL(new Blob([b])),f.download=_,f.click(),V("jmMsg").textContent="\u5DF2\u5BFC\u51FA "+_}}}var Gc={1:"byte",2:"short",3:"int",4:"long",5:"float",6:"double",8:"string"};function ns(e,n){let t=V("modalBody"),a=document.createElement("div");a.className="nbtroot",t.innerHTML='<h3>NBT \u6811\u7F16\u8F91</h3><p class="muted">\u6539\u503C\u3001\u52A0\u952E\u3001\u5220\u952E\uFF1B\u6570\u7EC4\u53EA\u8BFB\u3002\u4FDD\u5B58\u540E\u5199\u56DE\u6587\u4EF6\u3002</p><div id="nbtHost"></div><div class="skbar"><button id="nbtSave" class="primary">\u4FDD\u5B58</button><button id="nbtClose" class="ghost">\u5173\u95ED</button></div><p id="nbtMsg" class="muted"></p>',o(e.data,0),V("modal").style.display="flex";let i=document.querySelector(".modalbox");i&&(i.style.maxWidth="760px",i.style.width="96vw");function o(l,c){for(let m of Object.keys(l))r(l,m,c)}function r(l,c,m){var _,f,h;let u=l[c],p=document.createElement("div");p.className="nbtrow",p.style.marginLeft=m*12+"px";let d=document.createElement("code");if(d.textContent=c,p.appendChild(d),u.type===10){let y=document.createElement("button");y.className="nbtdel",y.textContent="\u5220",y.onclick=()=>{delete l[c],p.remove()},p.appendChild(y),V("nbtHost").appendChild(p),o(u.value,m+1);let v=document.createElement("div");v.className="nbtadd",v.style.marginLeft=(m+1)*12+"px";let w=document.createElement("input");w.placeholder="\u65B0\u952E\u540D";let M=document.createElement("select");for(let[z,S]of Object.entries(Gc))M.innerHTML+=`<option value="${z}">${S}</option>`;let $=document.createElement("input");$.placeholder="\u503C";let B=document.createElement("button");B.textContent="\uFF0B",B.onclick=()=>{let z=w.value.trim();if(!z)return;let S=Number(M.value),T=$.value;S===8?T=String(T):T=Number(T)||0,u.value[z]={type:S,value:T},p.remove(),v.remove(),o(u.value,m+1),s(l,c,m)},v.append(w,M,$,B),V("nbtHost").appendChild(v);return}if(u.type===9){p.appendChild(document.createTextNode(` [list ${u.value.items.length}]`)),V("nbtHost").appendChild(p);return}if(u.type>=7&&u.type<=12){p.appendChild(document.createTextNode(` [${(h=(f=u.value.length)!=null?f:(_=u.value.items)==null?void 0:_.length)!=null?h:0}]`)),V("nbtHost").appendChild(p);return}let b=document.createElement("input");if(b.value=u.value,b.onchange=()=>{u.value=u.type===8?b.value:Number(b.value)||0},p.appendChild(b),l!==e.data){let y=document.createElement("button");y.className="nbtdel",y.textContent="\u5220",y.onclick=()=>{delete l[c],p.remove()},p.appendChild(y)}V("nbtHost").appendChild(p)}function s(l,c,m){let u=l[c];o(u.value,m+1)}V("nbtClose").onclick=()=>{V("modal").style.display="none"},V("nbtSave").onclick=()=>{n(e),V("nbtMsg").textContent="\u5DF2\u4FDD\u5B58"}}var qc=(()=>{let e=new Uint32Array(256);for(let n=0;n<256;n++){let t=n;for(let a=0;a<8;a++)t=t&1?2197175160^t>>>1:t>>>1;e[n]=t>>>0}return e})();function Xc(e){let n=4294967295;for(let t=0;t<e.length;t++)n=qc[(n^e[t])&255]^n>>>8;return(n^4294967295)>>>0}function Yc(e){return((e>>>15|e<<17)>>>0)+2726488792>>>0}function He(e){let n=[];for(e=Number(e);e>=128;)n.push(e&127|128),e=Math.floor(e/128);return n.push(e),Uint8Array.from(n)}var ma=e=>{let n=0;for(let i of e)n+=i.length;let t=new Uint8Array(n),a=0;for(let i of e)t.set(i,a),a+=i.length;return t};function os(e){let a=[],i=0;for(let o of e){let r=0;for(;r<o.length;){let s=32768-i;s<7&&(a.push(new Uint8Array(s)),i=0,s=32768);let l=Math.min(s-7,o.length-r),c=r===0&&l===o.length?1:r===0?2:r+l===o.length?4:3,m=o.subarray(r,r+l),u=Yc(Xc(ma([Uint8Array.from([c]),m]))),p=new Uint8Array(7),d=new DataView(p.buffer);d.setUint32(0,u,!0),d.setUint16(4,l,!0),d.setUint8(6,c),a.push(p,m),r+=l,i+=7+l}}return ma(a)}function Qc(e,n){let t=[new Uint8Array(8),new Uint8Array(4)];new DataView(t[0].buffer).setUint32(0,n>>>0,!0),n>=2**32&&new DataView(t[0].buffer).setUint32(4,Math.floor(n/2**32),!0),new DataView(t[1].buffer).setUint32(0,e.length,!0);let a=[t[0],t[1]];for(let i of e){let o=typeof i.key=="string"?new TextEncoder().encode(i.key):i.key,r=typeof i.value=="string"?new TextEncoder().encode(i.value):i.value;a.push(Uint8Array.from([1]),He(o.length),o,He(r.length),r)}return ma(a)}function em(e,n,t,a){let i=[],o=new TextEncoder().encode(e);return i.push(He(1),He(o.length),o),i.push(He(2),He(n)),i.push(He(9),He(0)),i.push(He(3),He(t)),i.push(He(4),He(a)),ma(i)}function _i(e,{comparator:n="leveldb.BytewiseComparator",chunk:t=2e3}={}){if(!e.length)throw new Error("\u6CA1\u6709\u53EF\u5199\u5165\u7684\u952E\u503C");let a=[],i=0;for(let c=0;c<e.length;c+=t){let m=e.slice(c,c+t);i+=m.length,a.push(Qc(m,i))}let o=2,r=3,s="MANIFEST-000001",l=String(o).padStart(6,"0")+".log";return{[s]:os([em(n,o,r,i)]),[l]:os(a),CURRENT:new TextEncoder().encode(s+`
`),logName:l}}var tm=/(^|\/)(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/;function nm(e){return e.paths().filter(n=>tm.test(n))}async function rs(e){let n=nm(e);if(!n.length)throw new Error("\u8FD9\u4E2A\u5305\u91CC\u6CA1\u6709 LevelDB \u6570\u636E\u5E93");let t=n.map(i=>{let o=e.getBytes(i);return{name:i.split("/").pop(),arrayBuffer:async()=>o}});return{db:await Xn(t,{}),paths:n}}var bi={"minecraft:grass_block":"minecraft:grass_block","minecraft:grass_path":"minecraft:dirt_path","minecraft:stone":"minecraft:stone","minecraft:cobblestone":"minecraft:cobblestone","minecraft:dirt":"minecraft:dirt","minecraft:sand":"minecraft:sand","minecraft:sandstone":"minecraft:sandstone","minecraft:gravel":"minecraft:gravel","minecraft:water":"minecraft:water","minecraft:flowing_water":"minecraft:water","minecraft:lava":"minecraft:lava","minecraft:flowing_lava":"minecraft:lava","minecraft:bedrock":"minecraft:bedrock","minecraft:snow":"minecraft:snow_block","minecraft:snow_layer":"minecraft:snow","minecraft:ice":"minecraft:ice","minecraft:packed_ice":"minecraft:packed_ice","minecraft:clay":"minecraft:clay","minecraft:log":"minecraft:oak_log","minecraft:log2":"minecraft:birch_log","minecraft:leaves":"minecraft:oak_leaves","minecraft:leaves2":"minecraft:birch_leaves","minecraft:planks":"minecraft:oak_planks","minecraft:stonebrick":"minecraft:stone_bricks","minecraft:stone_stairs":"minecraft:stone_brick_stairs","minecraft:wooden_slab":"minecraft:oak_slab","minecraft:double_wooden_slab":"minecraft:oak_planks","minecraft:tallgrass":"minecraft:short_grass","minecraft:short_grass":"minecraft:short_grass","minecraft:yellow_flower":"minecraft:dandelion","minecraft:red_flower":"minecraft:poppy","minecraft:mob_spawner":"minecraft:spawner","minecraft:monster_egg":"minecraft:infested_stone","minecraft:quartz_block":"minecraft:quartz_block","minecraft:hardened_clay":"minecraft:terracotta","minecraft:stained_hardened_clay":"minecraft:white_terracotta","minecraft:iron_ore":"minecraft:iron_ore","minecraft:gold_ore":"minecraft:gold_ore","minecraft:diamond_ore":"minecraft:diamond_ore","minecraft:redstone_ore":"minecraft:redstone_ore","minecraft:lit_redstone_ore":"minecraft:redstone_ore","minecraft:emerald_ore":"minecraft:emerald_ore","minecraft:coal_ore":"minecraft:coal_ore","minecraft:lapis_ore":"minecraft:lapis_ore","minecraft:copper_ore":"minecraft:copper_ore","minecraft:deepslate":"minecraft:deepslate","minecraft:tuff":"minecraft:tuff","minecraft:dripstone_block":"minecraft:dripstone_block","minecraft:moss_block":"minecraft:moss_block","minecraft:netherrack":"minecraft:netherrack","minecraft:soul_sand":"minecraft:soul_sand","minecraft:magma":"minecraft:magma_block","minecraft:glowstone":"minecraft:glowstone","minecraft:end_stone":"minecraft:end_stone","minecraft:obsidian":"minecraft:obsidian","minecraft:mycelium":"minecraft:mycelium","minecraft:podzol":"minecraft:podzol","minecraft:red_sand":"minecraft:red_sand","minecraft:red_sandstone":"minecraft:red_sandstone"},am=(()=>{let e={};for(let[n,t]of Object.entries(bi))e[t]||(e[t]=n);return e})();function im(e,n){let t=String(e||"");return n[t]||n[t.replace("minecraft:","minecraft:")]||t}function om(e){return{paths:()=>e.entries.map(n=>n.name),getBytes:n=>{let t=e.entries.find(a=>a.name===n);if(!t)throw new Error("\u7F3A\u5C11 "+n);return e.read(t)}}}function rm(e,n,t,a=12){let i=new Map,o=1/0,r=-1/0;for(let s=0;s<16;s++)for(let l=0;l<16;l++){let c=e.get(n*16+s+","+(t*16+l));if(!c)continue;o=Math.min(o,c.y),r=Math.max(r,c.y);let m=Math.max(-64,c.y-a);for(let u=m;u<=c.y;u++){let p=u+"|"+s+"|"+l;i.set(p,u===c.y?c.block:u<c.y-3?"minecraft:stone":"minecraft:dirt")}}return{yy:i,minY:Math.max(-64,o-a),maxY:r}}function sm(e,n,t){let a=new Map,i=[];for(let[r,s]of t){let[l,c,m]=r.split("|").map(Number),u=Math.floor(l/16);a.has(u)||(a.set(u,[]),i.push(u)),a.get(u).push({y:l,x:c,z:m,name:s})}if(!i.length)return null;let o=i.sort((r,s)=>r-s).map(r=>{let s=a.get(r),l=["minecraft:air"],c={};for(let b of s)b.name in c||(c[b.name]=l.length,l.push(b.name));let m=Math.max(4,Math.ceil(Math.log2(Math.max(2,l.length)))),u=Math.floor(64/m),p=new Array(Math.ceil(4096/u)).fill(BigInt(0)),d=(BigInt(1)<<BigInt(m))-BigInt(1);for(let b of s){let _=(b.y-r*16)*256+b.z*16+b.x,f=Math.floor(_/u),h=BigInt(_%u*m),y=BigInt(c[b.name]);p[f]=p[f]&~(d<<h)|y<<h}return{Y:{type:1,value:r},Palette:{type:9,value:{listType:10,items:l.map(b=>({Name:{type:8,value:b}}))}},BlockStates:{type:12,value:p}}});return{rootType:10,rootName:"",data:{DataVersion:{type:3,value:2586},Level:{type:10,value:{xPos:{type:3,value:e},zPos:{type:3,value:n},Status:{type:8,value:"full"},LastUpdate:{type:4,value:0},Sections:{type:9,value:{listType:10,items:o}}}}}}}function lm(e){let n=new Map;for(let[i,o]of e){let[r,s]=i.split(",").map(Number),l=Math.floor(r/16),c=Math.floor(s/16);n.has(l+","+c)||n.set(l+","+c,new Set),n.get(l+","+c).add(i)}let t={},a=new Map;for(let[i]of n){let[o,r]=i.split(",").map(Number),s=Math.floor(o/32),l=Math.floor(r/32),c=s+","+l;a.has(c)||a.set(c,[]);let m=rm(e,o,r);if(!m.yy.size)continue;let u=sm(o,r,m.yy);u&&a.get(c).push({cx:o,cz:r,nbt:u})}for(let[i,o]of a)t[`region/r.${i.replace(",",".")}.mca`]=cm(o);return t}function cm(e){let n=new Uint8Array(8192),t=new DataView(n.buffer),a=[],i=2;for(let s of e){let l=Cn(s.nbt),c=Gn(l),m=new Uint8Array(5+c.length);new DataView(m.buffer).setUint32(0,c.length+1),m[4]=2,m.set(c,5);let u=Math.ceil(m.length/4096),p=(s.cx&31)+(s.cz&31)*32;t.setUint32(p*4,(i<<8|u&255)>>>0),t.setUint32(4096+p*4,Math.floor(Date.now()/1e3));let d=new Uint8Array(u*4096);d.set(m,0),a.push({sector:i,data:d}),i+=u}let o=8192;for(let s of a)o=Math.max(o,s.sector*4096+s.data.length);let r=new Uint8Array(o);r.set(n,0);for(let s of a)r.set(s.data,s.sector*4096);return r}function mm(e){let n={},t=(a,i,o)=>{n[a]={type:i,value:o}};return t("LevelName",8,e.name||"\u8F6C\u6362\u4E16\u754C"),t("Version",10,{Name:{type:8,value:"1.16.5"},Id:{type:3,value:2586},Snapshot:{type:1,value:0}}),t("SpawnX",3,e.spawn[0]),t("SpawnY",3,e.spawn[1]),t("SpawnZ",3,e.spawn[2]),t("Time",4,0),t("DayTime",4,0),t("GameType",3,1),t("Difficulty",1,2),t("hardcore",1,0),t("allowCommands",1,1),t("WorldGenSettings",10,{seed:{type:4,value:e.seed||0},generate_features:{type:1,value:0},bonus_chest:{type:1,value:0}}),fn(Cn({rootType:10,rootName:"",data:{Data:{type:10,value:n}}}))}async function dm(e,n=()=>{}){let t=be(e),a=om(t);n("\u8BFB\u53D6\u57FA\u5CA9\u7248 LevelDB\u2026");let{db:i}=await rs(a);n("\u89E3\u6790\u533A\u5757\u5730\u5F62\u2026");let o=await sa(i,{});if(!o.cols.size)throw new Error("\u6CA1\u6709\u89E3\u6790\u5230\u4EFB\u4F55\u533A\u5757\uFF0C\u65E0\u6CD5\u8F6C\u6362");n(`\u89E3\u6790\u5230 ${o.chunks} \u4E2A\u533A\u5757 / ${o.cols.size} \u5217\uFF0C\u5F00\u59CB\u751F\u6210 Java \u533A\u5757\u2026`);let r={},s=lm(o.cols);for(let[p,d]of Object.entries(s))r[p]=d;let l=Math.round((o.minX+o.maxX)/2),c=Math.round((o.minZ+o.maxZ)/2),m=64,u=o.cols.get(l+","+c);return u&&(m=u.y+1),r["level.dat"]=mm({name:"\u4ECE\u57FA\u5CA9\u7248\u8F6C\u6362",spawn:[l,m,c]}),r["levelname.txt"]=new TextEncoder().encode("\u4ECE\u57FA\u5CA9\u7248\u8F6C\u6362"),n("\u6253\u5305 Java \u5B58\u6863 ZIP\u2026"),ze(Object.entries(r).map(([p,d])=>({name:p,data:d})))}function um(e,n){let t=e.length<=16?4:e.length<=256?8:16,a=Math.floor(32/t)*8/8,i=Math.floor(32/t),o=Math.ceil(4096/i),r=new Uint32Array(o),s=(1<<t)-1;for(let d=0;d<4096;d++){let b=Math.floor(d/i),_=d%i*t;r[b]|=(n[d]&s)<<_}let l=new TextEncoder,c=[];for(let d of e){let b=Be({root:{type:10,name:"",value:{name:{t:8,v:d},states:{t:10,v:{}},version:{t:3,v:17959425}}}},!0);c.push(b)}let m=new Uint8Array(10+o*4+4+c.reduce((d,b)=>d+b.length,0)),u=0;m[u++]=8,m[u++]=1,m[u++]=t<<1|0,new Uint8Array(m.buffer).set(new Uint8Array(r.buffer),u),u+=o*4,new DataView(m.buffer).setInt32(u,e.length,!0),u+=4;for(let d of c)m.set(d,u),u+=d.length;return m}function pm(e){let n={LevelName:{t:8,v:e.name},GameType:{t:3,v:1},Difficulty:{t:3,v:2},SpawnX:{t:3,v:e.spawn[0]},SpawnY:{t:3,v:e.spawn[1]},SpawnZ:{t:3,v:e.spawn[2]},Time:{t:4,v:BigInt(0)},LastPlayed:{t:4,v:BigInt(Date.now())},StorageVersion:{t:3,v:10},generator:{t:3,v:0},Inventory:{t:9,et:10,v:[]}},t=Be({root:{type:10,name:"",value:n}},!0),a=new Uint8Array(8+t.length),i=new DataView(a.buffer);return i.setInt32(0,10,!0),i.setInt32(4,t.length,!0),a.set(t,8),a}function fm(e,n=()=>{}){let t=Lt(e);n("\u89E3\u6790 Java \u533A\u5757\u2026");let a=wt(t.zip,null);if(!a.cols.size)throw new Error("Java \u5B58\u6863\u91CC\u6CA1\u6709\u89E3\u6790\u5230\u533A\u5757");n(`\u89E3\u6790\u5230 ${a.chunks} \u4E2A\u533A\u5757 / ${a.cols.size} \u5217\uFF0C\u751F\u6210\u57FA\u5CA9\u7248\u5B50\u533A\u5757\u2026`);let i=[],o=new Map;for(let[d,b]of a.cols){let[_,f]=d.split(",").map(Number),h=Math.floor(_/16),y=Math.floor(f/16),v=h+","+y;o.has(v)||o.set(v,{cx:h,cz:y,cols:new Map,maxY:64});let w=o.get(v);w.cols.set((_%16+16)%16+","+(f%16+16)%16,b),b.y>w.maxY&&(w.maxY=b.y)}let r=0;for(let{cx:d,cz:b,cols:_,maxY:f}of o.values()){let h=new Map;for(let y=0;y<16;y++)for(let v=0;v<16;v++){let w=_.get(y+","+v),M=w?w.y:f,$=w?im(w.block,am):"minecraft:stone",B=Math.max(-64,Math.min(319,M)-12);for(let z=B;z<=M;z++){let S=Math.floor(z/16);h.has(S)||h.set(S,[]),h.get(S).push({i:(z%16+16)%16+16*(v+16*y),name:z===M?$:"minecraft:stone"})}}for(let[y,v]of h){let w=["minecraft:air"],M={"minecraft:air":0},$=new Uint16Array(4096);for(let T of v)T.name in M||(M[T.name]=w.length,w.push(T.name)),$[T.i]=M[T.name];let B=um(w,$),z=new Uint8Array(10),S=new DataView(z.buffer);S.setInt32(0,d,!0),S.setInt32(4,b,!0),z[8]=47,z[9]=y&255,i.push({key:z,value:B}),r++}}let s=_i(i),l={};for(let[d,b]of Object.entries(s))/^(CURRENT|MANIFEST-[0-9]+|[0-9]+\.log)$/.test(d)&&(l["db/"+d]=b);let c=Math.round((a.minX+a.maxX)/2),m=Math.round((a.minZ+a.maxZ)/2),u=64,p=a.cols.get(c+","+m);return p&&(u=p.y+1),l["level.dat"]=pm({name:t.name||"\u4ECEJava\u8F6C\u6362",spawn:[c,u,m]}),l["levelname.txt"]=new TextEncoder().encode(t.name||"\u4ECEJava\u8F6C\u6362"),n(`\u5199\u5165 ${r} \u4E2A\u5B50\u533A\u5757`),ze(Object.entries(l).map(([d,b])=>({name:d,data:b})))}function kt(e){return document.getElementById(e)}function ss(){let e=kt("modalBody");e.innerHTML=`<h3>\u5B58\u6863\u8F6C\u6362</h3>
    <p class="muted">\u53CC\u65B9\u5411\u5730\u5F62\u5C42\u8F6C\u6362\uFF0C\u4E0D\u9700\u8981\u5B89\u88C5\u4EFB\u4F55\u6A21\u7EC4/\u7B2C\u4E09\u65B9\u8F6C\u6362\u5668\u3002\u5B9E\u4F53\u3001\u5BB9\u5668\u3001\u7EA2\u77F3\u72B6\u6001\u4E0D\u8FC1\u79FB\u3002</p>
    <div class="skbar">
      <button id="cvB2J" class="primary">\u57FA\u5CA9\u7248 \u2192 Java</button>
      <button id="cvJ2B" class="primary">Java \u2192 \u57FA\u5CA9\u7248</button>
      <button id="cvClose" class="ghost">\u5173\u95ED</button>
    </div>
    <p class="muted">\u57FA\u5CA9\u7248\uFF1A.mcworld / .mctemplate\uFF1BJava\uFF1A.zip</p>
    <input type="file" id="cvFile" style="display:none">
    <div id="cvLog" class="logbox" style="max-height:34vh;overflow:auto"></div>`,kt("modal").style.display="flex";let n=document.querySelector(".modalbox");n&&(n.style.maxWidth="700px",n.style.width="96vw"),kt("cvClose").onclick=()=>{n&&(n.style.maxWidth="",n.style.width=""),kt("modal").style.display="none"};let t=r=>{let s=kt("cvLog");s&&(s.textContent+=r+`
`),s.scrollTop=s.scrollHeight},a="",i=r=>new Promise((s,l)=>{let c=kt("cvFile");c.value="",c.accept=r==="b2j"?".mcworld,.mctemplate,.zip":".zip",c.onchange=()=>{let m=c.files[0];if(!m)return l(new Error("\u672A\u9009\u62E9\u6587\u4EF6"));m.arrayBuffer().then(u=>s(new Uint8Array(u))).catch(l)},c.click()}),o=(r,s)=>{if(window.AndroidBridge&&window.AndroidBridge.saveBinary){let l="";for(let c=0;c<s.length;c++)l+=String.fromCharCode(s[c]);window.AndroidBridge.saveBinary(r,btoa(l))}else{let l=document.createElement("a");l.href=URL.createObjectURL(new Blob([s])),l.download=r,l.click()}};kt("cvB2J").onclick=async()=>{try{let r=await i("b2j");t("\u5F00\u59CB\uFF1A\u57FA\u5CA9\u7248 \u2192 Java");let s=await dm(r,t);o("\u8F6C\u6362-Java\u7248.zip",s),t("\u5B8C\u6210\uFF1A\u5DF2\u5BFC\u51FA \u8F6C\u6362-Java\u7248.zip")}catch(r){t("\u5931\u8D25\uFF1A"+r.message)}},kt("cvJ2B").onclick=async()=>{try{let r=await i("j2b");t("\u5F00\u59CB\uFF1AJava \u2192 \u57FA\u5CA9\u7248");let s=fm(r,t);o("\u8F6C\u6362-\u57FA\u5CA9\u7248.mcworld",s),t("\u5B8C\u6210\uFF1A\u5DF2\u5BFC\u51FA \u8F6C\u6362-\u57FA\u5CA9\u7248.mcworld")}catch(r){t("\u5931\u8D25\uFF1A"+r.message)}}}function xt(e){return document.getElementById(e)}function Ve(e){return new TextEncoder().encode(e)}var Te=e=>JSON.stringify(e,null,2);function Nt(e,n){try{return JSON.parse(new TextDecoder().decode(e.read(n)))}catch(t){return null}}function yi(e){return e.split("/").pop()}function Qt(e){return yi(e).replace(/\.(json|png|lang|mcmeta)$/i,"")}function hm(e){let n={};for(let t of e.split(/\r?\n/)){let a=t.match(/^([^=#]+)=(.*)$/);a&&(n[a[1].trim()]=a[2])}return n}function _m(e){let n=e.entries.filter(s=>/manifest\.json$/.test(s.name)).map(s=>Nt(e,s)).filter(Boolean),t={};for(let s of e.entries)if(/texts\/([a-zA-Z_]+)\.lang$/.test(s.name)||/\.lang$/.test(s.name)){let l=Qt(s.name);t[l]=hm(new TextDecoder().decode(e.read(s)))}let a=[];for(let s of e.entries){if(!/\/items\/.*\.json$/.test(s.name)||s.name.includes("/textures/"))continue;let l=Nt(e,s),c=l&&l["minecraft:item"];if(!c)continue;let m=c.description||{},u=m.identifier;if(!u)continue;let p=c.components||{},d=p["minecraft:icon"];d&&typeof d=="object"&&(d=Array.isArray(d.textures)?d.textures[0]:d.texture||d.textures||""),a.push({id:u,file:s.name,icon:String(d||u.split(":")[1]),comps:p,menu:m.menu_category||""})}let i=[];for(let s of e.entries){if(!/\/blocks\/.*\.json$/.test(s.name))continue;let l=Nt(e,s),c=l&&l["minecraft:block"];if(!c)continue;let m=(c.description||{}).identifier;if(!m)continue;let u=c.components||{},p="",d=u["minecraft:material_instances"];if(d){let b=d["*"]||Object.values(d)[0];b&&(p=b.texture||"")}i.push({id:m,file:s.name,comps:u,tex:p||m.split(":")[1]})}let o=[];for(let s of e.entries){if(!/recipes\/.*\.json$/.test(s.name))continue;let l=Nt(e,s);if(!l)continue;let c=Object.keys(l).find(m=>m.startsWith("minecraft:recipe_"));c&&o.push({type:c,data:l[c],file:s.name})}let r=e.entries.filter(s=>/\.png$/.test(s.name)).map(s=>({name:s.name,data:e.read(s)}));return{manifests:n,texts:t,items:a,blocks:i,recipes:o,pngs:r}}function ls(e,n){let t=String(n||"").toLowerCase();return e.find(i=>yi(i.name).toLowerCase()===t+".png")||e.find(i=>yi(i.name).toLowerCase().includes(t.split(":").pop()))||e.find(i=>/items\/|blocks\//.test(i.name))||null}function bm(e,n){let t=n.includes(":")?n.split(":")[1]:n;for(let a of Object.keys(e)){let i=e[a];for(let o of[`item.${n}`,`item.${n}.name`,`item.${t}`,`item.${t}.name`,`tile.${t}.name`])if(i[o])return i[o]}return t.replace(/_/g," ").replace(/\b\w/g,a=>a.toUpperCase())}function gm(e,n){let t=e.data||{},a=o=>typeof o=="string"?o:o&&(o.item||o.name)||"",i=o=>{let r=a(o);return{item:r.includes(":")?r:"minecraft:"+r}};if(e.type==="minecraft:recipe_shaped"){let o=(t.pattern||[]).map(s=>s.map(l=>l===" "?" ":l)),r={};for(let[s,l]of Object.entries(t.key||{}))r[s]=i(l);return{type:"minecraft:crafting_shaped",pattern:o,key:r,result:gi(t.result,n)}}return e.type==="minecraft:recipe_shapeless"?{type:"minecraft:crafting_shapeless",ingredients:(t.ingredients||[]).map(i),result:gi(t.result,n)}:e.type==="minecraft:recipe_furnace"?{type:"minecraft:smelting",ingredient:i(t.input),result:gi(t.result,n),cookingtime:200,experience:.1}:null}function gi(e,n){Array.isArray(e)&&(e=e[0]||{});let t=e.item||e.name||"";return t.includes(":")||(t="minecraft:"+t),{item:t,count:e.count||1}}function cs(e,n,t,a){let i=s=>s.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_|_$/g,"")||"Entry",o=new Set,r=[];if(r.push(`package ${e};

import net.minecraft.resources.ResourceLocation;

public final class ${n.replace(/[^a-zA-Z0-9]/g,"")}Mod {
    public static final String MODID = "${n}";
    public static ResourceLocation id(String path) { return ResourceLocation.fromNamespaceAndPath(MODID, path); }
}
`),t.length){let s=t.map(l=>{let c=i(l.id.split(":")[1]);for(;o.has(c);)c+="_";return o.add(c),`    // ${l.id}
    public static final net.minecraft.world.item.Item ${c.toUpperCase()} = new net.minecraft.world.item.Item(new net.minecraft.world.item.Item.Properties());`});r.push(`package ${e};

public final class ModItems {
${s.join(`
`)}
}
`)}if(a.length){let s=a.map(l=>{let c=i(l.id.split(":")[1]);for(;o.has(c);)c+="_";return o.add(c),`    // ${l.id}
    public static final net.minecraft.world.level.block.Block ${c.toUpperCase()} = new net.minecraft.world.level.block.Block(net.minecraft.world.level.block.state.BlockBehaviour.Properties.of());`});r.push(`package ${e};

public final class ModBlocks {
${s.join(`
`)}
}
`)}return r.join(`
`)}function ym(e,n,t,a="1.21.1"){return{"build.gradle":`plugins { id 'fabric-loom' version '1.7-SNAPSHOT' }
version = '1.0.0'
group = '${t}'
repositories { mavenCentral() }
dependencies { minecraft "com.mojang:minecraft:${a}" mappings "net.fabricmc:yarn:${a}+build.1:v2" modImplementation "net.fabricmc:fabric-loader:0.15.11" modImplementation "net.fabricmc.fabric-api:fabric-api:0.100.0" }
`,"settings.gradle":`pluginManagement { repositories { maven { url 'https://maven.fabricmc.net/' } gradlePluginPortal() } }
`,"src/main/resources/fabric.mod.json":Te({schemaVersion:1,id:n,name:e,version:"1.0.0",entrypoints:{main:[t+".MyMod"]},depends:{minecraft:a,"fabric-loader":">=0.15"},description:"\u7531\u57FA\u5CA9\u7248\u9644\u52A0\u5305\u8F6C\u6362"}),"README.md":`# ${e}

\u7531 MC\u5DE5\u5177\u7BB1 \u4ECE\u57FA\u5CA9\u7248\u9644\u52A0\u5305\u9759\u6001\u8F6C\u6362\u751F\u6210\u3002

\u5DF2\u8F6C\u6362\uFF1A\u7269\u54C1/\u65B9\u5757\u6CE8\u518C\u5360\u4F4D\u7C7B\u3001\u8D34\u56FE\u3001\u8BED\u8A00\u3001\u7269\u54C1\u6A21\u578B\u3001\u5408\u6210\u914D\u65B9\u3002
\u672A\u8F6C\u6362\uFF1A\u884C\u4E3A\u5305\u811A\u672C(JS)\u3001\u5B9E\u4F53 AI\u3001\u65B9\u5757\u81EA\u5B9A\u4E49\u7EC4\u4EF6\u903B\u8F91\u3001\u4E8B\u4EF6\u3001UI\u3002
`}}function vm(e,n=()=>{}){let t=be(e);n("\u8BFB\u53D6\u9644\u52A0\u5305\u2026");let a=_m(t);if(!a.items.length&&!a.blocks.length)throw new Error("\u6CA1\u6709\u627E\u5230\u53EF\u8F6C\u6362\u7684\u7269\u54C1/\u65B9\u5757 JSON");let r=((a.manifests[0]||{}).header||{}).name||"ConvertedAddon",s=String(r).toLowerCase().replace(/[^a-z0-9_]/g,"_").slice(0,24)||"converted",l="com.example."+s,c=ym(r,s,l),m="src/main/java/"+l.replace(/\./g,"/");c[m+"/MyMod.java"]=`package ${l};

import net.minecraft.resources.ResourceLocation;

public class MyMod {
    public static final String MODID = "${s}";
    public static ResourceLocation id(String path) { return ResourceLocation.fromNamespaceAndPath(MODID, path); }
}
`,c[m+"/ModItems.java"]=cs(l,s,a.items,[]).split(`

`).slice(1).join(`

`)||"",a.blocks.length&&(c[m+"/ModBlocks.java"]=cs(l,s,[],a.blocks).split(`

`).slice(1).join(`

`)||"");let u={};for(let d of a.items){let b=bm(a.texts,d.id);u.en_us=u.en_us||{},u.en_us["item."+s+"."+d.id.split(":")[1]]=b;let _=ls(a.pngs,d.icon),f=d.id.split(":")[1];_&&(c[`src/main/resources/assets/${s}/textures/item/${f}.png`]=_.data),c[`src/main/resources/assets/${s}/models/item/${d.id.split(":")[1]}.json`]=Te({parent:"item/generated",textures:{layer0:`${s}:item/${d.id.split(":")[1]}`}})}for(let d of a.blocks){let b=ls(a.pngs,d.tex),_=d.id.split(":")[1];b&&(c[`src/main/resources/assets/${s}/textures/block/${_}.png`]=b.data),c[`src/main/resources/assets/${s}/blockstates/${d.id.split(":")[1]}.json`]=Te({variants:{"":{model:`${s}:block/${d.id.split(":")[1]}`}}}),c[`src/main/resources/assets/${s}/models/block/${d.id.split(":")[1]}.json`]=Te({parent:"block/cube_all",textures:{all:`${s}:block/${d.id.split(":")[1]}`}}),u.en_us["block."+s+"."+d.id.split(":")[1]]=d.id.split(":")[1].replace(/_/g," ")}for(let[d,b]of Object.entries(u))c[`src/main/resources/assets/${s}/lang/${d}.json`]=Te(b);let p=0;return a.recipes.forEach((d,b)=>{let _=gm(d,s);_&&(c[`src/main/resources/data/${s}/recipe/converted_${b+1}.json`]=Te(_),p++)}),c[m+"/MyMod.java"]=c[m+"/MyMod.java"].replace("// register",""),n(`\u7269\u54C1 ${a.items.length}\uFF0C\u65B9\u5757 ${a.blocks.length}\uFF0C\u914D\u65B9 ${p}\uFF0C\u8D34\u56FE ${a.pngs.length}`),ze(Object.entries(c).filter(([,d])=>d!==void 0&&d!=="").map(([d,b])=>({name:d,data:typeof b=="string"?Ve(b):b})))}function wm(e,n=()=>{}){let t=be(e);n("\u8BFB\u53D6 Java \u6A21\u7EC4\u2026");let a="",i="",o="1.0.0",r=t.entries.find(L=>L.name.endsWith("fabric.mod.json"));if(r){let L=Nt(t,r)||{};a=L.id||"",i=L.name||a,o=String(L.version||"1.0.0")}if(!a){let L=t.entries.find(D=>/mods\.toml$|neoforge\.mods\.toml$/.test(D.name));if(L){let D=new TextDecoder().decode(t.read(L)),U=D.match(/modId\s*=\s*"([^"]+)"/),H=D.match(/displayName\s*=\s*"([^"]+)"/);U&&(a=U[1]),H&&(i=H[1])}}let s=t.entries.find(L=>/META-INF\/MANIFEST\.MF$/.test(L.name));a||(a=Qt(t.entries[0].name)||"converted");let l=a||"converted",c=t.entries.filter(L=>/assets\/.*\/textures\/(item|block|blocks|items)\/[^/]+\.png$/.test(L.name)),m=c.filter(L=>/textures\/(item|items)\//.test(L.name)),u=c.filter(L=>/textures\/(block|blocks)\//.test(L.name)),p=t.entries.filter(L=>/assets\/.*\/lang\/(en_us|zh_cn)\.json$/.test(L.name)),d=t.entries.filter(L=>/data\/.*\/recipe(s)?\/[^/]+\.json$/.test(L.name)),b=t.entries.filter(L=>/assets\/.*\/models\/item\/[^/]+\.json$/.test(L.name));if(n(`\u8D34\u56FE ${c.length}\uFF08\u7269\u54C1 ${m.length} / \u65B9\u5757 ${u.length}\uFF09\uFF0C\u8BED\u8A00 ${p.length}\uFF0C\u914D\u65B9 ${d.length}`),!m.length&&!u.length)throw new Error("\u6A21\u7EC4\u91CC\u6CA1\u6709\u53EF\u63D0\u53D6\u7684\u8D34\u56FE\uFF0C\u65E0\u6CD5\u751F\u6210\u9644\u52A0\u5305");let _=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,L=>{let D=Math.random()*16|0;return(L==="x"?D:D&3|8).toString(16)}),f=_(),h=_(),y={format_version:2,header:{name:`${i} BP`,description:"\u7531 Java \u6A21\u7EC4\u8F6C\u6362",uuid:f,version:[1,0,0],min_engine_version:[1,20,10]},modules:[{type:"data",uuid:_(),version:[1,0,0]}]},v={format_version:2,header:{name:`${i} RP`,description:"\u7531 Java \u6A21\u7EC4\u8F6C\u6362",uuid:h,version:[1,0,0],min_engine_version:[1,20,10]},modules:[{type:"resources",uuid:_(),version:[1,0,0]}],dependencies:[{uuid:f,version:[1,0,0]}]},w={"behavior_pack/manifest.json":Ve(Te(y)),"resource_pack/manifest.json":Ve(Te(v))},M={resource_pack_name:i,texture_name:"atlas.items",texture_data:{}};for(let L of m){let D=Qt(L.name),U=D,H=2;for(;M.texture_data[U];)U=D+"_"+H++;w[`resource_pack/textures/items/${U}.png`]=t.read(L),M.texture_data[U]={textures:`textures/items/${U}`},w[`behavior_pack/items/${U}.json`]=Ve(Te({format_version:"1.20.10","minecraft:item":{description:{identifier:`${l}:${U}`,menu_category:{category:"items",group:"itemGroup.name.item"}},components:{"minecraft:icon":{texture:U},"minecraft:max_stack_size":64}}}))}w["resource_pack/textures/item_texture.json"]=Ve(Te(M));let $={resource_pack_name:i,texture_name:"atlas.terrain",padding:8,num_mip_levels:4,texture_data:{}},B={format_version:[1,1,0]};for(let L of u){let D=Qt(L.name);w[`resource_pack/textures/blocks/${D}.png`]=t.read(L),$.texture_data[D]={textures:`textures/blocks/${D}`},B[D]={textures:D,sound:"stone"},w[`behavior_pack/blocks/${D}.json`]=Ve(Te({format_version:"1.20.10","minecraft:block":{description:{identifier:`${l}:${D}`},components:{"minecraft:material_instances":{"*":{texture:D,render_method:"opaque"}},"minecraft:destructible_by_mining":{seconds_to_destroy:1},"minecraft:geometry":"minecraft:geometry.full_block"}}}))}u.length&&(w["resource_pack/textures/terrain_texture.json"]=Ve(Te($)),w["resource_pack/blocks.json"]=Ve(Te(B)));let z={},S=new Set;for(let L of p){let D=Nt(t,L)||{};for(let[U,H]of Object.entries(D)){let X=U;if(U.startsWith("item.")){let k=U.slice(5);X=`item.${k.includes(":")?k:l+":"+k}`}else if(U.startsWith("block.")){let k=U.slice(6);X=`tile.${k.includes(":")?k:l+":"+k}.name`}S.has(X)||(S.add(X),z[X]=H)}}if(!Object.keys(z).length)for(let L of m)z[`item.${l}:${Qt(L.name)}`]=Qt(L.name).replace(/_/g," ");w["resource_pack/texts/en_US.lang"]=Ve(Object.entries(z).map(([L,D])=>`${L}=${D}`).join(`
`)),w["resource_pack/texts/zh_CN.lang"]=w["resource_pack/texts/en_US.lang"];let T=0;for(let L of d){let D=Nt(t,L);if(!D)continue;let U=km(D,l,T+1);U&&(w[`behavior_pack/recipes/converted_${T}.json`]=Ve(Te(U)),T++)}return n(`\u751F\u6210\u7269\u54C1 ${m.length}\u3001\u65B9\u5757 ${u.length}\u3001\u914D\u65B9 ${T}`),w["README.md"]=Ve(`# ${i} \u2192 \u57FA\u5CA9\u7248\u9644\u52A0\u5305

\u5DF2\u8F6C\u6362\uFF1A\u7269\u54C1/\u65B9\u5757\u8D34\u56FE\u3001\u7269\u54C1/\u65B9\u5757\u6CE8\u518C JSON\u3001\u8D34\u56FE\u56FE\u96C6\u3001\u8BED\u8A00\u3001\u5408\u6210\u914D\u65B9\u3002
\u672A\u8F6C\u6362\uFF1AJava \u4EE3\u7801\u903B\u8F91\u3001\u5B9E\u4F53 AI\u3001\u4E8B\u4EF6\u3001GUI\u3001\u81EA\u5B9A\u4E49\u6A21\u578B\u51E0\u4F55\u3002
`),ze(Object.entries(w).map(([L,D])=>({name:L,data:D})))}function km(e,n,t=1){let a=i=>String(i||"").replace("minecraft:","");return e.type==="minecraft:crafting_shaped"?{format_version:"1.20.10","minecraft:recipe_shaped":{description:{identifier:`${n}:converted_${t}`},tags:["crafting_table"],pattern:e.pattern,key:Object.fromEntries(Object.entries(e.key||{}).map(([i,o])=>[i,{item:a(o.item)}])),result:{item:a(e.result.item),count:e.result.count||1}}}:e.type==="minecraft:crafting_shapeless"?{format_version:"1.20.10","minecraft:recipe_shapeless":{description:{identifier:`${n}:converted_${t}`},tags:["crafting_table"],ingredients:(e.ingredients||[]).map(i=>({item:a(i.item)})),result:{item:a(e.result.item),count:e.result.count||1}}}:e.type==="minecraft:smelting"?{format_version:"1.20.10","minecraft:recipe_furnace":{description:{identifier:`${n}:converted_${t}`},tags:["furnace"],input:a(e.ingredient.item),output:a(e.result.item)}}:null}function ms(){let e=xt("modalBody");e.innerHTML=`<h3>\u6A21\u7EC4 / \u9644\u52A0\u5305\u8F6C\u6362</h3>
    <p class="muted">\u9759\u6001\u8F6C\u6362\u8D44\u6E90\u4E0E\u6570\u636E\uFF1A\u8D34\u56FE\u3001\u7269\u54C1/\u65B9\u5757\u5B9A\u4E49\u3001\u8BED\u8A00\u3001\u914D\u65B9\u3002\u4E0D\u7FFB\u8BD1\u4EE3\u7801\u903B\u8F91\u3002</p>
    <div class="skbar"><button id="mcAddon2J" class="primary">\u57FA\u5CA9\u9644\u52A0\u5305 \u2192 Java \u6A21\u7EC4\u5DE5\u7A0B</button>
      <button id="mcJ2Addon" class="primary">Java \u6A21\u7EC4 \u2192 \u57FA\u5CA9\u9644\u52A0\u5305</button>
      <button id="mcClose" class="ghost">\u5173\u95ED</button></div>
    <input type="file" id="mcFile" style="display:none">
    <div id="mcLog" class="logbox" style="max-height:36vh;overflow:auto"></div>`,xt("modal").style.display="flex";let n=document.querySelector(".modalbox");n&&(n.style.maxWidth="720px",n.style.width="96vw"),xt("mcClose").onclick=()=>{n&&(n.style.maxWidth="",n.style.width=""),xt("modal").style.display="none"};let t=o=>{let r=xt("mcLog");r&&(r.textContent+=o+`
`,r.scrollTop=r.scrollHeight)},a=o=>new Promise((r,s)=>{let l=xt("mcFile");l.value="",l.accept=o,l.onchange=()=>{let c=l.files[0];if(!c)return s(new Error("\u672A\u9009\u62E9\u6587\u4EF6"));c.arrayBuffer().then(m=>r(new Uint8Array(m))).catch(s)},l.click()}),i=(o,r)=>{if(window.AndroidBridge&&window.AndroidBridge.saveBinary){let s="";for(let l=0;l<r.length;l++)s+=String.fromCharCode(r[l]);window.AndroidBridge.saveBinary(o,btoa(s))}else{let s=document.createElement("a");s.href=URL.createObjectURL(new Blob([r])),s.download=o,s.click()}};xt("mcAddon2J").onclick=async()=>{try{let o=await a(".mcaddon,.mcpack,.zip");t("\u5F00\u59CB\uFF1A\u9644\u52A0\u5305 \u2192 Java \u6A21\u7EC4\u5DE5\u7A0B");let r=vm(o,t);i("\u8F6C\u6362-Java\u6A21\u7EC4\u5DE5\u7A0B.zip",r),t("\u5B8C\u6210")}catch(o){t("\u5931\u8D25\uFF1A"+o.message)}},xt("mcJ2Addon").onclick=async()=>{try{let o=await a(".jar,.zip");t("\u5F00\u59CB\uFF1AJava \u6A21\u7EC4 \u2192 \u57FA\u5CA9\u9644\u52A0\u5305");let r=wm(o,t);i("\u8F6C\u6362-\u57FA\u5CA9\u9644\u52A0\u5305.mcaddon",r),t("\u5B8C\u6210")}catch(o){t("\u5931\u8D25\uFF1A"+o.message)}}}var wi=e=>document.getElementById(e);function vi(){return window.innerWidth>=900||window.matchMedia&&window.matchMedia("(min-width: 900px)").matches}function ds(e){document.body.classList.toggle("bigscreen",!!e)}function Mn(e){document.body.classList.toggle("immersive",!!e);try{window.AndroidBridge&&window.AndroidBridge.setFullscreen&&window.AndroidBridge.setFullscreen(!!e)}catch(i){}if(e)try{document.documentElement.requestFullscreen&&!window.AndroidBridge&&document.documentElement.requestFullscreen()}catch(i){}else try{document.fullscreenElement&&document.exitFullscreen&&document.exitFullscreen()}catch(i){}try{localStorage.setItem("mcbeImmersive",e?"1":"0")}catch(i){}let t=wi("btnFull");t&&(t.textContent=e?"\u9000\u51FA\u5168\u5C4F":"\u5168\u5C4F");let a=wi("fsExit");a&&(a.style.display=e?"block":"none")}function us(){let e=vi();try{let r=localStorage.getItem("mcbeBig");r!==null&&(e=r==="1"?!0:vi()&&r!=="0")}catch(r){}ds(e);let n=0,t=()=>{cancelAnimationFrame(n),n=requestAnimationFrame(()=>{ds(vi())})};window.addEventListener("resize",t),window.addEventListener("orientationchange",()=>setTimeout(t,300));let a=!1;try{a=localStorage.getItem("mcbeImmersive")==="1"}catch(r){}a&&Mn(!0);let i=wi("btnFull");i&&i.addEventListener("click",()=>{a=!document.body.classList.contains("immersive"),Mn(a)});let o=document.querySelector("header h1");o&&o.addEventListener("dblclick",()=>Mn(!document.body.classList.contains("immersive")))}var mt=e=>document.getElementById(e),xm=/Electron/i.test(navigator.userAgent||""),Sm=e=>{if(!e)return!1;let n=e.tagName;return n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||e.isContentEditable},We=e=>{let n=mt(e);return!n||n.disabled||getComputedStyle(n).display==="none"?!1:(n.click(),!0)},xi=()=>{let e=mt("modal");return e&&getComputedStyle(e).display!=="none"?(e.style.display="none",!0):!1},ki=()=>Mn(!document.body.classList.contains("immersive")),Si=()=>["mapBack","nbtBack","dbBack","stBack"].some(e=>We(e)),Em=()=>{let e=mt("editor");if(!e)return!1;let n=[...e.querySelectorAll("button")].find(t=>t.textContent.includes("\u4FDD\u5B58\u4FEE\u6539")||t.textContent==="\u4FDD\u5B58");return n?(n.click(),!0):!1},$n=[{keys:"Ctrl+S",label:"\u5BFC\u51FA / \u53E6\u5B58",run:()=>We("btnExport")},{keys:"Ctrl+O",label:"\u6253\u5F00\u6587\u4EF6",run:()=>We("pickBtn")},{keys:"Ctrl+F",label:"\u641C\u7D22\u6587\u4EF6",run:()=>window.dispatchEvent(new CustomEvent("mcShortcut",{detail:"search"}))},{keys:"Ctrl+Shift+F",label:"\u641C\u7D22\u6587\u4EF6\u5185\u5BB9",run:()=>window.dispatchEvent(new CustomEvent("mcShortcut",{detail:"contentSearch"}))},{keys:"Ctrl+T",label:"\u66F4\u591A\u5DE5\u5177",run:()=>We("btnTools")},{keys:"Ctrl+M",label:"\u4E16\u754C\u89C2\u770B",run:()=>We("btnMap")},{keys:"Ctrl+P",label:"\u73A9\u5BB6\u6570\u636E",run:()=>We("btnPlayer")},{keys:"Ctrl+L",label:"\u4E00\u952E\u6C49\u5316",run:()=>We("btnLocalize")},{keys:"Ctrl+N",label:"\u65B0\u5EFA\u6587\u4EF6",run:()=>We("btnNewFile")},{keys:"Ctrl+Shift+D",label:"\u4E16\u754C\u7EDF\u8BA1",run:()=>We("btnStats")},{keys:"Ctrl+Shift+R",label:"\u91CD\u547D\u540D",run:()=>We("btnRename")},{keys:"Ctrl+Enter",label:"\u4FDD\u5B58\u5F53\u524D\u7F16\u8F91",run:Em},{keys:"F11",label:"\u5168\u5C4F / \u9000\u51FA\u5168\u5C4F",run:ki},{keys:"Alt+Enter",label:"\u5168\u5C4F / \u9000\u51FA\u5168\u5C4F",run:ki},{keys:"F1",label:"\u5FEB\u6377\u952E\u5E2E\u52A9",run:()=>ps()},{keys:"Shift+/",label:"\u5FEB\u6377\u952E\u5E2E\u52A9",run:()=>ps()},{keys:"Esc",label:"\u5173\u95ED\u5F39\u7A97 / \u9000\u51FA\u5168\u5C4F",run:()=>{!xi()&&document.body.classList.contains("immersive")&&ki()}},{keys:"Alt+Left",label:"\u8FD4\u56DE\u6587\u4EF6\u5217\u8868",run:Si},{keys:"\u9F20\u6807\u4FA7\u952E",label:"\u5173\u95ED\u5F39\u7A97 / \u8FD4\u56DE",run:()=>{xi()||Si()}}];function Bm(e){let n=[];(e.ctrlKey||e.metaKey)&&n.push("Ctrl"),e.altKey&&n.push("Alt"),e.shiftKey&&n.push("Shift");let t=e.key;return t===" "&&(t="Space"),t==="/"&&(t="/"),t==="?"&&(t="?"),t==="Enter"&&(t="Enter"),t==="Escape"&&(t="Esc"),t.length===1&&(t=t.toUpperCase()),n.push(t),n.join("+")}function Cm(e){let n=Bm(e);return $n.find(t=>t.keys===n)||(n==="Shift+?"?$n.find(t=>t.keys==="Shift+/"):null)}function ps(){let e=mt("modalBody");e&&(e.innerHTML=`<h3>\u5FEB\u6377\u952E\uFF08\u5916\u63A5\u952E\u76D8 / Windows\uFF09</h3>
    <p class="muted">\u63A5\u4E0A\u84DD\u7259\u6216 USB \u952E\u76D8\u3001\u9F20\u6807\u540E\u76F4\u63A5\u53EF\u7528\uFF1BWindows \u7AEF\u540C\u4E00\u5957\u5FEB\u6377\u952E\u3002</p>
    <div class="legend">${$n.map(n=>`<div class="nbtrow"><code>${n.keys}</code><span>${n.label}</span></div>`).join("")}</div>
    <p class="muted">\u8F93\u5165\u6846\u5185\u53EA\u6709 Esc\u3001F1\u3001F11 \u4F1A\u751F\u6548\uFF0C\u907F\u514D\u6253\u65AD\u6253\u5B57\u3002\u9F20\u6807\uFF1A\u5DE6\u952E\u9009\u62E9\u6587\u4EF6\uFF0C\u53F3\u952E\u6587\u4EF6\u53EF\u91CD\u547D\u540D / \u5220\u9664\u3002</p>
    <div class="skbar"><button id="scClose" class="ghost">\u5173\u95ED</button></div>`,mt("modal").style.display="flex",mt("scClose").onclick=()=>{mt("modal").style.display="none"})}function en(){let e=mt("ctxMenu");e&&e.remove()}function Mm(e,n,t){en();let a=document.createElement("div");a.id="ctxMenu",a.className="ctxmenu",a.style.left=Math.min(e,window.innerWidth-170)+"px",a.style.top=Math.min(n,window.innerHeight-100)+"px",a.innerHTML='<button data-a="rename">\u91CD\u547D\u540D</button><button data-a="delete" class="danger">\u5220\u9664</button>',document.body.appendChild(a),a.querySelector("[data-a=rename]").onclick=()=>{en(),t.click(),setTimeout(()=>We("btnRename"),0)},a.querySelector("[data-a=delete]").onclick=()=>{en(),t.click(),setTimeout(()=>We("btnDelete"),0)},setTimeout(()=>document.addEventListener("pointerdown",en,{once:!0}),0)}function fs(){window.addEventListener("keydown",n=>{if(n.defaultPrevented)return;let t=Sm(n.target),a=Cm(n);a&&(xm&&(a.keys==="F11"||a.keys==="Alt+Enter")||t&&!/^(F1|F11|Alt\+Enter|Shift\+\/|Shift\+\?)$/.test(a.keys)||a.keys==="Esc"&&t||(n.preventDefault(),n.stopPropagation(),a.run()))},!0);let e=mt("tree");e&&e.addEventListener("contextmenu",n=>{let t=n.target.closest&&n.target.closest(".node.file");t&&(n.preventDefault(),Mm(n.clientX,n.clientY,t))}),window.addEventListener("mouseup",n=>{(n.button===3||n.button===4)&&(xi()||Si(),n.preventDefault())}),window.addEventListener("auxclick",n=>{(n.button===3||n.button===4)&&n.preventDefault()}),window.addEventListener("blur",en),window.addEventListener("resize",en)}var N=e=>document.getElementById(e),At=e=>new TextEncoder().encode(e),Ei=e=>new TextDecoder().decode(e),da=e=>JSON.stringify(e,null,2);function de(e,n,t){let a=N("modalBody");a.innerHTML=`<h3>${e}</h3>${n}<div class="skbar"><button id="tbClose" class="ghost">\u5173\u95ED</button></div>`,N("modal").style.display="flex";let i=document.querySelector(".modalbox");i&&(i.style.maxWidth="760px",i.style.width="96vw");let o=()=>{i&&(i.style.maxWidth="",i.style.width=""),N("modal").style.display="none"};return N("tbClose").onclick=o,t&&t(o),o}function nt(e,n){if(window.AndroidBridge&&window.AndroidBridge.saveBinary){let t="";for(let i=0;i<n.length;i+=32768)t+=String.fromCharCode.apply(null,n.subarray(i,i+32768));window.AndroidBridge.saveBinary(e,btoa(t))}else{let t=document.createElement("a");t.href=URL.createObjectURL(new Blob([n])),t.download=e,t.click()}}function we(e){return new Promise((n,t)=>{let a=document.createElement("input");a.type="file",a.accept=e,a.multiple=!0,a.onchange=async()=>{let i=[...a.files];if(!i.length)return t(new Error("\u672A\u9009\u62E9\u6587\u4EF6"));let o=[];for(let r of i)o.push({name:r.name,bytes:new Uint8Array(await r.arrayBuffer())});n(o)},a.click()})}function zn(){return typeof crypto!="undefined"&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{let n=Math.random()*16|0;return(e==="x"?n:n&3|8).toString(16)})}function $m(){de("UUID \u751F\u6210\u5668",`<div class="skbar"><button id="uNew" class="primary">\u751F\u6210</button><input id="uVal" style="flex:1;min-width:200px" value="${zn()}"></div>
    <p class="muted">\u79BB\u7EBF\u751F\u6210 v4 UUID\uFF0C\u7528\u4E8E manifest \u7684 header/module/dependency\u3002</p><div id="uList" class="code" style="padding:8px;max-height:30vh;overflow:auto"></div>`,()=>{let e=()=>{N("uList").textContent=[...(N("uList").textContent||"").split(`
`),N("uVal").value].filter(Boolean).join(`
`)};N("uNew").onclick=()=>{N("uVal").value=zn()},e(),N("uVal").onclick=()=>{N("uVal").select()}})}function zm(){de("manifest \u751F\u6210\u5668",`<div class="form2">
    <label>\u5305\u540D<input id="mName" value="My Addon"></label>
    <label>\u7C7B\u578B<select id="mType"><option value="both">\u884C\u4E3A+\u8D44\u6E90</option><option value="data">\u4EC5\u884C\u4E3A</option><option value="resources">\u4EC5\u8D44\u6E90</option></select></label>
    <label>\u7248\u672C<input id="mVer" value="1.0.0"></label>
    <label>\u6700\u4F4E\u5F15\u64CE<input id="mMin" value="1.20.10"></label>
    <label>BP UUID<input id="mBp" value="${zn()}"></label>
    <label>RP UUID<input id="mRp" value="${zn()}"></label>
  </div><div class="skbar"><button id="mGen" class="primary">\u751F\u6210 ZIP</button></div><div id="mMsg" class="muted"></div>`,()=>{N("mGen").onclick=()=>{let e=N("mType").value,n=N("mVer").value.split(".").map(Number),t=N("mMin").value.split(".").map(Number),a={},i=(o,r,s)=>({format_version:2,header:{name:s,description:"",uuid:r,version:n,min_engine_version:t},modules:[{type:o,uuid:zn(),version:n}]});e!=="resources"&&(a["behavior_pack/manifest.json"]=At(da(i("data",N("mBp").value,N("mName").value+" BP")))),e!=="data"&&(a["resource_pack/manifest.json"]=At(da(i("resources",N("mRp").value,N("mName").value+" RP")))),nt("manifest.zip",ze(Object.entries(a).map(([o,r])=>({name:o,data:r})))),N("mMsg").textContent="\u5DF2\u5BFC\u51FA manifest.zip"}})}function Tm(){let e=Object.entries(bi).map(([n,t])=>({b:n,j:t}));de("\u65B9\u5757\u540D\u79F0\u5BF9\u7167",`<input id="lkQ" placeholder="\u8F93\u5165 BE \u6216 JE \u540D\u79F0\uFF0C\u5982 stone / \u8349" style="width:100%">
    <div id="lkOut" class="code" style="margin-top:8px;padding:8px;max-height:46vh;overflow:auto"></div>`,()=>{let n=()=>{let t=N("lkQ").value.trim().toLowerCase(),a=e.filter(i=>!t||i.b.includes(t)||i.j.includes(t));N("lkOut").innerHTML=a.slice(0,300).map(i=>`<div class="nbtrow"><code>${i.b}</code><span>\u2192</span><code>${i.j}</code></div>`).join("")||'<p class="muted">\u6CA1\u6709\u5339\u914D\u9879</p>'};N("lkQ").oninput=n,n()})}function Im(){de("\u8BED\u8A00\u6587\u4EF6\u5BF9\u6BD4\u8865\u952E",`<p class="muted">\u9009\u62E9\u57FA\u51C6\u8BED\u8A00\u4E0E\u76EE\u6807\u8BED\u8A00\uFF08.json \u6216 .lang\uFF09\uFF0C\u8F93\u51FA\u7F3A\u5931\u952E\u6E05\u5355\u548C\u8865\u5168\u540E\u7684\u76EE\u6807\u6587\u4EF6\u3002</p>
    <div class="skbar"><button id="lgBase" class="ghost">\u9009\u57FA\u51C6</button><button id="lgTarget" class="ghost">\u9009\u76EE\u6807</button><button id="lgRun" class="primary">\u5BF9\u6BD4</button></div>
    <div id="lgOut"></div>`,()=>{let e=null,n=null,t=(a,i)=>{let o=Ei(i);if(a.endsWith(".json"))try{return JSON.parse(o)}catch(s){return{}}let r={};for(let s of o.split(/\r?\n/)){let l=s.match(/^([^=]+)=(.*)$/);l&&(r[l[1].trim()]=l[2])}return r};N("lgBase").onclick=async()=>{let a=await we(".json,.lang");e={name:a[0].name,data:t(a[0].name,a[0].bytes)},N("lgOut").textContent="\u57FA\u51C6\uFF1A"+e.name},N("lgTarget").onclick=async()=>{let a=await we(".json,.lang");n={name:a[0].name,data:t(a[0].name,a[0].bytes)},N("lgOut").textContent="\u76EE\u6807\uFF1A"+n.name},N("lgRun").onclick=()=>{if(!e||!n)return N("lgOut").textContent="\u5148\u9009\u4E24\u4E2A\u6587\u4EF6";let a=Object.keys(e.data).filter(o=>!(o in n.data)),i=Object.keys(n.data).filter(o=>!(o in e.data));N("lgOut").innerHTML=`<p>\u7F3A\u5931 ${a.length} \u6761\uFF0C\u591A\u4F59 ${i.length} \u6761</p><pre class="code" style="max-height:32vh;overflow:auto">${a.join(`
`)}</pre>
        <div class="skbar"><button id="lgSave" class="primary">\u5BFC\u51FA\u8865\u5168\u6587\u4EF6</button></div>`,N("lgSave").onclick=()=>{let o=xe({},n.data);for(let l of a)o[l]=e.data[l];let r=n.name.endsWith(".json")?"merged.json":"merged.lang",s=r.endsWith(".json")?da(o):Object.entries(o).map(([l,c])=>`${l}=${c}`).join(`
`);nt(r,At(s))}}})}function Lm(){de("\u8D34\u56FE\u5C3A\u5BF8\u68C0\u67E5",`<p class="muted">\u6279\u91CF\u9009 PNG\uFF0C\u8BFB IHDR \u68C0\u67E5\u5C3A\u5BF8/\u4F4D\u6DF1/\u989C\u8272\u7C7B\u578B\uFF0C\u6807\u51FA\u975E 2 \u7684\u5E42\u4E0E\u8D85\u5927\u56FE\u3002</p>
    <div class="skbar"><button id="pcPick" class="primary">\u9009\u62E9 PNG</button></div><div id="pcOut" class="code" style="max-height:46vh;overflow:auto;padding:8px"></div>`,()=>{N("pcPick").onclick=async()=>{let n=(await we(".png")).map(t=>{let a=t.bytes,i=0,o=0,r=0,s=0;if(a.length>=29&&a[0]===137&&a[1]===80){let c=new DataView(a.buffer,a.byteOffset,a.byteLength);i=c.getUint32(16),o=c.getUint32(20),r=a[24],s=a[25]}let l=c=>c>0&&(c&c-1)===0;return{name:t.name,w:i,h:o,depth:r,ct:s,bad:!l(i)||!l(o)||i>1024||o>1024}});N("pcOut").innerHTML=n.map(t=>`<div class="nbtrow"><code>${t.name}</code><span>${t.w}\xD7${t.h} ${t.depth}bit ct=${t.ct}</span><b style="color:${t.bad?"#ff8a8a":"#7ddc9a"}">${t.bad?"\u5F02\u5E38":"\u6B63\u5E38"}</b></div>`).join("")}})}function Nm(){de("\u56FE\u7247\u8F6C PNG",`<div class="form2"><label>\u76EE\u6807\u8FB9\u957F\uFF08\u50CF\u7D20\uFF09<input id="icSize" type="number" value="64"></label>
    <label>\u7F29\u653E\u7B97\u6CD5<select id="icSmooth"><option value="false">\u6700\u8FD1\u90BB\uFF08\u50CF\u7D20\u753B\uFF09</option><option value="true">\u5E73\u6ED1</option></select></label></div>
    <div class="skbar"><button id="icPick" class="primary">\u9009\u62E9\u56FE\u7247</button></div><div id="icOut" class="muted"></div>`,()=>{N("icPick").onclick=async()=>{let e=await we("image/*"),n=Math.max(1,Math.min(2048,Number(N("icSize").value)||64));for(let t of e){let a=await createImageBitmap(new Blob([t.bytes])),i=document.createElement("canvas");i.width=n,i.height=n;let o=i.getContext("2d");o.imageSmoothingEnabled=N("icSmooth").value==="true",o.drawImage(a,0,0,n,n);let r=await new Promise(s=>i.toBlob(s,"image/png"));nt(t.name.replace(/\.\w+$/,"")+"_"+n+".png",new Uint8Array(await r.arrayBuffer()))}N("icOut").textContent=`\u5DF2\u8F6C\u6362 ${e.length} \u5F20`}})}function Am(){de("\u5305\u5185\u6587\u672C\u6279\u91CF\u66FF\u6362",`<p class="muted">\u5BF9 .json/.js/.lang/.txt/.mcfunction \u7B49\u6587\u672C\u6587\u4EF6\u505A\u6279\u91CF\u66FF\u6362\uFF0C\u8F93\u51FA\u65B0 ZIP\u3002</p>
    <div class="form2"><label>\u67E5\u627E<input id="rpFind"></label><label>\u66FF\u6362\u4E3A<input id="rpRep"></label></div>
    <div class="skbar"><button id="rpPick" class="primary">\u9009\u62E9 ZIP \u5E76\u6267\u884C</button></div><div id="rpOut" class="muted"></div>`,()=>{N("rpPick").onclick=async()=>{let e=N("rpFind").value,n=N("rpRep").value;if(!e)return N("rpOut").textContent="\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9";let[t]=await we(".zip,.mcpack,.mcaddon,.mcworld,.mctemplate,.jar"),a=be(t.bytes),i=0,o=a.entries.map(r=>{let s=a.read(r);if(/\.(json|js|lang|txt|mcfunction|md|yml|yaml|toml|properties)$/i.test(r.name)){let l=Ei(s);l.includes(e)&&(i+=l.split(e).length-1,s=At(l.split(e).join(n)))}return{name:r.name,data:s}});nt(t.name.replace(/\.\w+$/,"")+"_\u66FF\u6362.zip",ze(o)),N("rpOut").textContent=`\u66FF\u6362 ${i} \u5904\uFF0C\u5DF2\u5BFC\u51FA`}})}function jm(){de("\u5341\u516D\u8FDB\u5236\u67E5\u770B",`<div class="skbar"><button id="hxPick" class="primary">\u9009\u62E9\u6587\u4EF6</button><label>\u504F\u79FB<input id="hxOff" type="number" value="0" style="width:110px"></label><button id="hxGo" class="ghost">\u8DF3\u8F6C</button></div>
    <pre id="hxOut" class="code" style="max-height:48vh;overflow:auto;padding:8px"></pre>`,()=>{let e=null,n=()=>{if(!e)return;let t=Math.max(0,Math.min(e.length-1,Number(N("hxOff").value)||0)),a=[];for(let i=t;i<Math.min(e.length,t+512);i+=16){let o=e.subarray(i,i+16),r=[...o].map(l=>l.toString(16).padStart(2,"0")).join(" "),s=[...o].map(l=>l>=32&&l<127?String.fromCharCode(l):".").join("");a.push(`${i.toString(16).padStart(8,"0")}  ${r.padEnd(48)}  ${s}`)}N("hxOut").textContent=a.join(`
`)};N("hxPick").onclick=async()=>{let[t]=await we("*/*");e=t.bytes,N("hxOut").textContent=`${t.name}  ${e.length} \u5B57\u8282`,N("hxOff").value=0,n()},N("hxGo").onclick=n})}function Pm(){de("\u7ED3\u6784\u8F6C .mcstructure",`<p class="muted">Java .nbt \u7ED3\u6784 \u2192 \u57FA\u5CA9\u7248 .mcstructure\uFF08\u65E0\u538B\u7F29 LE NBT\uFF09\uFF0C\u53EF\u5728\u7ED3\u6784\u65B9\u5757\u91CC\u5BFC\u5165\u3002</p>
    <div class="skbar"><button id="msPick" class="primary">\u9009\u62E9 .nbt</button></div><div id="msOut" class="muted"></div>`,()=>{N("msPick").onclick=async()=>{let[e]=await we(".nbt"),n;try{n=De($e(e.bytes))}catch(_){n=De(e.bytes)}let t=n.data,a=t.size?t.size.value:[1,1,1],i=t.palette?t.palette.value.items.map(_=>({Name:_.Name.value,Properties:_.Properties?_.Properties.value:{}})):[],o=t.blocks?t.blocks.value.items.map(_=>({pos:_.pos.value,state:_.state.value})):[],[r,s,l]=a,c=r*s*l,m=new Int32Array(c).fill(-1);for(let _ of o){let[f,h,y]=_.pos;m[f+y*r+h*r*l]=_.state}let u=i.map(_=>({name:_.Name,states:Object.fromEntries(Object.entries(_.Properties).map(([f,h])=>{var y;return[f,(y=h.value)!=null?y:h]})),version:17959425})),p=[];for(let _=0;_<c;_++)p.push(m[_]<0?0:m[_]+1);let d={format_version:{t:3,v:1},size:{t:9,et:3,v:a.map(_=>({t:3,v:_}))},structure:{t:10,v:{block_indices:{t:9,et:9,v:[{t:9,et:3,v:p.map(_=>({t:3,v:_}))},{t:9,et:3,v:new Array(c).fill({t:3,v:-1})}]},palette:{t:10,v:{default:{t:10,v:{block_palette:{t:9,et:10,v:u.map(_=>({t:10,v:{name:{t:8,v:_.name},states:{t:10,v:{}},version:{t:3,v:_.version}}}))},block_position_data:{t:10,v:{}}}}}}}}},b=Be({root:{type:10,name:"",value:d}},!0);nt(e.name.replace(/\.nbt$/,".mcstructure"),b),N("msOut").textContent=`\u5DF2\u8F6C\u6362 ${o.length} \u65B9\u5757\uFF0C\u5C3A\u5BF8 ${a.join("\xD7")}`}})}function Dm(){de("Region \u533A\u5757\u88C1\u526A",`<p class="muted">\u53EA\u4FDD\u7559\u6307\u5B9A X/Z \u8303\u56F4\u5185\u7684\u533A\u5757\uFF0C\u8F93\u51FA\u65B0\u7684 .mca\u3002</p>
    <div class="form2"><label>\u6700\u5C0F X<input id="rcX0" type="number" value="0"></label><label>\u6700\u5927 X<input id="rcX1" type="number" value="511"></label>
    <label>\u6700\u5C0F Z<input id="rcZ0" type="number" value="0"></label><label>\u6700\u5927 Z<input id="rcZ1" type="number" value="511"></label></div>
    <div class="skbar"><button id="rcPick" class="primary">\u9009\u62E9 .mca \u5E76\u88C1\u526A</button></div><div id="rcOut" class="muted"></div>`,()=>{N("rcPick").onclick=async()=>{let[e]=await we(".mca"),n=e.bytes,t=new DataView(n.buffer,n.byteOffset,n.byteLength),a=new Uint8Array(8192),i=new DataView(a.buffer),o=[],r=2,s=Number(N("rcX0").value),l=Number(N("rcX1").value),c=Number(N("rcZ0").value),m=Number(N("rcZ1").value);for(let d=0;d<1024;d++){let b=(t.getUint32(d*4)>>>8)*4096;if(!b||b+5>n.length)continue;let _=t.getUint32(b);if(_<5||b+4+_>n.length)continue;let f=d%32,h=Math.floor(d/32);if(f<s||f>l||h<c||h>m)continue;let y=n.subarray(b+5,b+4+_),v=Math.ceil((y.length+5)/4096);if(v>255)continue;let w=new Uint8Array(v*4096);new DataView(w.buffer).setUint32(0,y.length+1),w[4]=n[b+4],w.set(y,5),i.setUint32(d*4,(r<<8|v)>>>0),i.setUint32(4096+d*4,t.getUint32(4096+d*4)),o.push({sector:r,data:w}),r+=v}let u=8192;for(let d of o)u=Math.max(u,d.sector*4096+d.data.length);let p=new Uint8Array(u);p.set(a);for(let d of o)p.set(d.data,d.sector*4096);nt(e.name.replace(/\.mca$/,"_\u88C1\u526A.mca"),p),N("rcOut").textContent=`\u4FDD\u7559 ${o.length} \u4E2A\u533A\u5757`}})}function Um(){de("Java \u5B58\u6863\u62A5\u544A",`<p class="muted">\u8BFB Java \u5B58\u6863 ZIP\uFF0C\u751F\u6210 Markdown \u62A5\u544A\uFF08\u79CD\u5B50/\u51FA\u751F\u70B9/\u5929\u6570/\u533A\u5757/\u5730\u8868\u65B9\u5757\u76F4\u65B9\u56FE\uFF09\u3002</p>
    <div class="skbar"><button id="jrPick" class="primary">\u9009\u62E9 ZIP</button></div><div id="jrOut" class="muted"></div>`,()=>{N("jrPick").onclick=async()=>{let[e]=await we(".zip"),n=Lt(e.bytes),t=wt(n.zip,null),a={};for(let[,r]of t.cols)a[r.block]=(a[r.block]||0)+1;let i=Object.entries(a).sort((r,s)=>s[1]-r[1]).slice(0,20),o=`# Java \u5B58\u6863\u62A5\u544A\uFF1A${n.name||"\u672A\u547D\u540D"}

- \u7248\u672C\uFF1A${n.version}
- \u79CD\u5B50\uFF1A${n.seed}
- \u51FA\u751F\u70B9\uFF1A${n.spawn.join(", ")}
- \u6E38\u620F\u5929\u6570\uFF1A${n.days}
- region\uFF1A${n.regions} \u4E2A
- \u5DF2\u89E3\u6790\u533A\u5757\uFF1A${t.chunks}
- \u65B9\u5757\u5217\uFF1A${t.cols.size}
- \u8303\u56F4\uFF1AX ${t.minX}~${t.maxX}\uFF0CZ ${t.minZ}~${t.maxZ}

## \u5730\u8868\u65B9\u5757 Top 20

| \u65B9\u5757 | \u5217\u6570 |
|---|---|
${i.map(([r,s])=>`| ${r} | ${s} |`).join(`
`)}
`;nt("java-\u5B58\u6863\u62A5\u544A.md",At(o)),N("jrOut").textContent="\u5DF2\u5BFC\u51FA java-\u5B58\u6863\u62A5\u544A.md"}})}function Fm(){let e=[];try{e=JSON.parse(localStorage.getItem("mcbeRecent")||"[]")}catch(n){e=[]}de("\u6700\u8FD1\u6253\u5F00",`<p class="muted">\u8BB0\u5F55\u6700\u8FD1\u6253\u5F00\u7684\u6587\u4EF6\u540D\uFF08\u4E0D\u4FDD\u5B58\u6587\u4EF6\u5185\u5BB9\uFF09\u3002</p><div id="rcList" class="code" style="padding:8px;max-height:44vh;overflow:auto">${e.map(n=>`<div>${n.name} \xB7 ${new Date(n.at).toLocaleString()}</div>`).join("")||'<p class="muted">\u6682\u65E0\u8BB0\u5F55</p>'}</div>
    <div class="skbar"><button id="rcClear" class="ghost">\u6E05\u7A7A\u8BB0\u5F55</button></div>`,()=>{N("rcClear").onclick=()=>{localStorage.removeItem("mcbeRecent"),N("rcList").textContent="\u5DF2\u6E05\u7A7A"}})}function Rm(){let e=$n.map(n=>[n.keys,n.label]).concat([["\u53F3\u952E\u6587\u4EF6","\u91CD\u547D\u540D / \u5220\u9664"],["\u6EDA\u8F6E / \u53CC\u6307","\u5730\u56FE\u7F29\u653E 0.25~5\xD7"],["\u957F\u6309\u65E5\u5FD7","\u9009\u4E2D\u590D\u5236"]]);de("\u5FEB\u6377\u952E\u4E0E\u624B\u52BF",`<div class="legend">${e.map(([n,t])=>`<div class="nbtrow"><code>${n}</code><span>${t}</span></div>`).join("")}</div>
    <p class="muted">\u5916\u63A5\u952E\u76D8\u3001\u84DD\u7259\u952E\u9F20\u4E0E Windows \u7248\u5171\u7528\u540C\u4E00\u5957\uFF1B\u8F93\u5165\u6846\u5185\u53EA\u54CD\u5E94 Ctrl+S / Esc \u7B49\u5B89\u5168\u7EC4\u5408\u3002</p>`,()=>{})}function Om(){de("\u9644\u52A0\u5305\u4F9D\u8D56\u8BCA\u65AD",`<p class="muted">\u68C0\u67E5 manifest \u7684 UUID\u3001\u7248\u672C\u3001modules\u3001dependencies \u662F\u5426\u81EA\u6D3D\u3002</p>
    <div class="skbar"><button id="adPick" class="primary">\u9009\u62E9\u9644\u52A0\u5305</button></div><div id="adOut"></div>`,()=>{N("adPick").onclick=async()=>{let[e]=await we(".mcaddon,.mcpack,.zip"),n=be(e.bytes),t=n.entries.filter(o=>/manifest\.json$/.test(o.name)).map(o=>({name:o.name,j:JSON.parse(Ei(n.read(o)))}));if(!t.length)return N("adOut").textContent="\u6CA1\u6709 manifest.json";let a=new Set(t.map(o=>o.j.header&&o.j.header.uuid)),i=t.map(o=>{let r=o.j.header||{},s=o.j.modules||[],l=[];r.uuid||l.push("\u7F3A header.uuid"),Array.isArray(r.version)||l.push("\u7248\u672C\u683C\u5F0F"),s.length||l.push("\u65E0 modules");let c=o.j.dependencies||[];for(let m of c)a.has(m.uuid)||l.push("\u4F9D\u8D56\u4E0D\u5B58\u5728 "+m.uuid);return`<div class="nbtrow"><code>${o.name}</code><b style="color:${l.length?"#ff8a8a":"#7ddc9a"}">${l.length?l.join("\uFF1B"):"\u901A\u8FC7"}</b></div>`});N("adOut").innerHTML=i.join("")}})}function Hm(){de("\u5305\u5185\u5BB9\u5BF9\u6BD4",`<p class="muted">\u6BD4\u4E24\u4E2A ZIP \u7684\u6587\u4EF6\u6E05\u5355\u548C\u5927\u5C0F\uFF0C\u5217\u51FA\u65B0\u589E/\u5220\u9664/\u5927\u5C0F\u53D8\u5316\u3002</p>
    <div class="skbar"><button id="dfA" class="ghost">\u5305 A</button><button id="dfB" class="ghost">\u5305 B</button><button id="dfRun" class="primary">\u5BF9\u6BD4</button></div>
    <div id="dfOut" style="max-height:46vh;overflow:auto"></div>`,()=>{let e=null,n=null;N("dfA").onclick=async()=>{let[t]=await we(".zip,.mcpack,.mcaddon,.jar,.mcworld,.mctemplate");e={name:t.name,z:be(t.bytes)},N("dfOut").textContent="A="+t.name},N("dfB").onclick=async()=>{let[t]=await we(".zip,.mcpack,.mcaddon,.jar,.mcworld,.mctemplate");n={name:t.name,z:be(t.bytes)},N("dfOut").textContent="B="+t.name},N("dfRun").onclick=()=>{if(!e||!n)return;let t=new Map(e.z.entries.map(s=>[s.name,s.usize])),a=new Map(n.z.entries.map(s=>[s.name,s.usize])),i=[...a.keys()].filter(s=>!t.has(s)),o=[...t.keys()].filter(s=>!a.has(s)),r=[...t.keys()].filter(s=>a.has(s)&&t.get(s)!==a.get(s));N("dfOut").innerHTML=`<p>\u65B0\u589E ${i.length}\uFF0C\u5220\u9664 ${o.length}\uFF0C\u5927\u5C0F\u53D8\u5316 ${r.length}</p>
        <pre class="code" style="max-height:30vh;overflow:auto">${["+ "+i.join(`
+ `),"- "+o.join(`
- `)].join(`
`).slice(0,8e3)}</pre>`}})}function Wm(){de("\u5B58\u6863\u5065\u5EB7\u68C0\u67E5",`<p class="muted">\u68C0\u67E5\u57FA\u5CA9\u7248/Java \u5B58\u6863\u7684\u5173\u952E\u6587\u4EF6\u4E0E\u7ED3\u6784\u5B8C\u6574\u6027\u3002</p>
    <div class="skbar"><button id="hlPick" class="primary">\u9009\u62E9\u5B58\u6863</button></div><div id="hlOut"></div>`,()=>{N("hlPick").onclick=async()=>{let[e]=await we(".zip,.mcworld,.mctemplate"),t=be(e.bytes).entries.map(r=>r.name),a=t.some(r=>/level\.dat$/.test(r))&&t.some(r=>/region\/.*\.mca$/.test(r)),i=t.some(r=>/db\/CURRENT$/.test(r)),o=[];if(a){let r=Lt(e.bytes);o.push(["level.dat",r.name],["region \u6570",r.regions],["\u533A\u5757",wt(r.zip,null).chunks])}else i?(o.push(["level.dat",t.some(r=>/level\.dat$/.test(r))?"\u5B58\u5728":"\u7F3A\u5931"]),o.push(["db/CURRENT","\u5B58\u5728"]),o.push(["db \u6587\u4EF6\u6570",t.filter(r=>/db\/[^/]+$/.test(r)).length])):o.push(["\u8BC6\u522B","\u672A\u77E5\u683C\u5F0F"]);N("hlOut").innerHTML=o.map(([r,s])=>`<div class="nbtrow"><code>${r}</code><span>${s}</span></div>`).join("")}})}function Zm(){let e=localStorage.getItem("mcbeAccent")||"#2f7df6";de("\u81EA\u5B9A\u4E49\u5F3A\u8C03\u8272",`<div class="skbar"><input type="color" id="acColor" value="${e}"><button id="acReset" class="ghost">\u6062\u590D\u9ED8\u8BA4</button></div>
    <p class="muted">\u5F71\u54CD\u4E3B\u6309\u94AE\u3001\u9009\u4E2D\u6001\u7B49\u5F3A\u8C03\u5143\u7D20\u3002</p>`,()=>{let n=t=>{document.documentElement.style.setProperty("--accent",t),localStorage.setItem("mcbeAccent",t)};N("acColor").oninput=()=>n(N("acColor").value),N("acColor").onchange=()=>n(N("acColor").value),N("acReset").onclick=()=>{localStorage.removeItem("mcbeAccent"),document.documentElement.style.removeProperty("--accent")},n(e)})}function Vm(){de("\u5730\u8868\u65B9\u5757\u76F4\u65B9\u56FE",`<p class="muted">\u4ECE Java \u5B58\u6863\u7EDF\u8BA1\u5730\u8868\u65B9\u5757\u5217\u6570\uFF0C\u5BFC\u51FA CSV\u3002</p>
    <div class="skbar"><button id="hsPick" class="primary">\u9009\u62E9 ZIP</button></div><div id="hsOut" class="muted"></div>`,()=>{N("hsPick").onclick=async()=>{let[e]=await we(".zip"),n=Lt(e.bytes),t=wt(n.zip,null),a={};for(let[,o]of t.cols)a[o.block]=(a[o.block]||0)+1;let i=Object.entries(a).sort((o,r)=>r[1]-o[1]);nt("\u5730\u8868\u65B9\u5757.csv",At(`\u65B9\u5757,\u5217\u6570
`+i.map(([o,r])=>`${o},${r}`).join(`
`))),N("hsOut").textContent=`\u5171 ${i.length} \u79CD\u65B9\u5757\uFF0C\u5DF2\u5BFC\u51FA`}})}function Jm(){de("\u7ED3\u6784 3D \u5BFC\u51FA PNG",`<p class="muted">\u8BFB Java .nbt \u7ED3\u6784\uFF0C\u6E32\u67D3 3D \u56FE\u5E76\u5BFC\u51FA PNG\u3002</p>
    <div class="skbar"><button id="spPick" class="primary">\u9009\u62E9 .nbt</button></div><div id="spOut" class="muted"></div>`,()=>{N("spPick").onclick=async()=>{let[e]=await we(".nbt"),n;try{n=De($e(e.bytes))}catch(l){n=De(e.bytes)}let t=n.data,a=t.size?t.size.value:[1,1,1],i=t.palette?t.palette.value.items.map(l=>l.Name.value):[],o=t.blocks?t.blocks.value.items.map(l=>({pos:l.pos.value,state:l.state.value})):[],r=document.createElement("canvas");la(r,{size:a,palette:i,blocks:o},0);let s=await new Promise(l=>r.toBlob(l,"image/png"));nt(e.name.replace(/\.nbt$/,"_3d.png"),new Uint8Array(await s.arrayBuffer())),N("spOut").textContent="\u5DF2\u5BFC\u51FA PNG"}})}function Km(){de("NBT \u8F6C JSON",`<p class="muted">\u8BFB Java .dat/.nbt\uFF08gzip \u6216\u672A\u538B\u7F29\uFF09\uFF0C\u5BFC\u51FA\u53EF\u8BFB JSON\u3002</p>
    <div class="skbar"><button id="njPick" class="primary">\u9009\u62E9\u6587\u4EF6</button></div><div id="njOut" class="muted"></div>`,()=>{N("njPick").onclick=async()=>{let[e]=await we(".dat,.nbt,.schematic"),n;try{n=De($e(e.bytes))}catch(a){n=De(e.bytes)}let t=a=>{if(a==null)return a;if(typeof a=="bigint")return a.toString();if(a instanceof Uint8Array)return"<bytes "+a.length+">";if(Array.isArray(a))return a.map(t);if(typeof a=="object"){let i={};for(let o of Object.keys(a))i[o]=t(a[o]);return i}return a};nt(e.name.replace(/\.\w+$/,"")+".json",At(da(t(n.data)))),N("njOut").textContent="\u5DF2\u5BFC\u51FA JSON"}})}var hs=[["UUID \u751F\u6210\u5668","\u79BB\u7EBF\u751F\u6210 v4 UUID",$m],["manifest \u751F\u6210\u5668","BP/RP \u53CC\u6E05\u5355 + UUID",zm],["\u65B9\u5757\u540D\u79F0\u5BF9\u7167","BE \u21C4 JE \u540D\u79F0\u67E5\u8BE2",Tm],["\u8BED\u8A00\u8865\u952E","\u5BF9\u6BD4\u4E0E\u5408\u5E76 lang/json",Im],["\u8D34\u56FE\u5C3A\u5BF8\u68C0\u67E5","\u6279\u91CF PNG \u5C3A\u5BF8/\u4F4D\u6DF1",Lm],["\u56FE\u7247\u8F6C PNG","\u7F29\u653E + \u8F6C\u4E3A PNG",Nm],["\u6587\u672C\u6279\u91CF\u66FF\u6362","\u5305\u5185 json/js/lang \u66FF\u6362",Am],["\u5341\u516D\u8FDB\u5236\u67E5\u770B","\u53EA\u8BFB\u5341\u516D\u8FDB\u5236\u6D4F\u89C8",jm],["\u7ED3\u6784\u8F6C mcstructure","Java .nbt \u2192 \u57FA\u5CA9\u7ED3\u6784",Pm],["Region \u88C1\u526A","\u6309 X/Z \u8303\u56F4\u88C1\u526A .mca",Dm],["Java \u5B58\u6863\u62A5\u544A","\u5BFC\u51FA Markdown \u62A5\u544A",Um],["\u6700\u8FD1\u6253\u5F00","\u6700\u8FD1\u6587\u4EF6\u540D\u8BB0\u5F55",Fm],["\u5FEB\u6377\u952E\u4E0E\u624B\u52BF","\u64CD\u4F5C\u8BF4\u660E",Rm],["\u9644\u52A0\u5305\u8BCA\u65AD","manifest \u4F9D\u8D56\u68C0\u67E5",Om],["\u5305\u5185\u5BB9\u5BF9\u6BD4","\u4E24\u4E2A ZIP \u5DEE\u5F02",Hm],["\u5B58\u6863\u5065\u5EB7\u68C0\u67E5","\u5173\u952E\u6587\u4EF6\u5B8C\u6574\u6027",Wm],["\u81EA\u5B9A\u4E49\u5F3A\u8C03\u8272","\u4E3B\u9898\u4E3B\u8272",Zm],["\u65B9\u5757\u76F4\u65B9\u56FE","\u5BFC\u51FA CSV",Vm],["\u7ED3\u6784 3D \u5BFC\u51FA","\u6E32\u67D3 PNG",Jm],["NBT \u8F6C JSON","\u5BFC\u51FA\u53EF\u8BFB JSON",Km]];function _s(){let e=N("modalBody");e.innerHTML=`<h3>\u5DE5\u5177\u4E2D\u5FC3</h3><p class="muted">20 \u4E2A\u79BB\u7EBF\u5DE5\u5177\uFF0C\u5168\u90E8\u672C\u5730\u8FD0\u884C\u3002</p>
    <div class="toolgrid">${hs.map(([t,a],i)=>`<button class="toolcard" data-i="${i}"><b>${t}</b><span>${a}</span></button>`).join("")}</div>
    <div class="skbar"><button id="tbClose" class="ghost">\u5173\u95ED</button></div>`,N("modal").style.display="flex";let n=document.querySelector(".modalbox");n&&(n.style.maxWidth="760px",n.style.width="96vw"),N("tbClose").onclick=()=>{n&&(n.style.maxWidth="",n.style.width=""),N("modal").style.display="none"},e.querySelectorAll(".toolcard").forEach(t=>{t.onclick=()=>hs[Number(t.dataset.i)][2]()})}var vs="mcbeSfx",Tn=null,dt=!0;try{dt=localStorage.getItem(vs)!=="0"}catch(e){}function ws(){if(!dt)return null;let e=window.AudioContext||window.webkitAudioContext;if(!e)return null;if(!Tn)try{Tn=new e}catch(n){return null}if(Tn.state==="suspended")try{Tn.resume()}catch(n){}return Tn}function Ze(e,n,t,a,i){let o=ws();if(!o)return;let r=o.currentTime,s=o.createOscillator(),l=o.createGain();s.type=t||"triangle",s.frequency.setValueAtTime(e,r),i&&s.frequency.exponentialRampToValueAtTime(i,r+n),l.gain.setValueAtTime(1e-4,r),l.gain.exponentialRampToValueAtTime(a||.18,r+.008),l.gain.exponentialRampToValueAtTime(1e-4,r+n),s.connect(l),l.connect(o.destination),s.start(r),s.stop(r+n+.02)}function bs(e,n){let t=ws();if(!t)return;let a=Math.floor(t.sampleRate*e),i=t.createBuffer(1,a,t.sampleRate),o=i.getChannelData(0);for(let l=0;l<a;l++)o[l]=(Math.random()*2-1)*(1-l/a)**2;let r=t.createBufferSource();r.buffer=i;let s=t.createGain();s.gain.value=n||.05,r.connect(s),s.connect(t.destination),r.start()}function ua(e){if(dt)switch(e){case"primary":Ze(760,.055,"square",.1),Ze(1140,.045,"triangle",.07),bs(.035,.025);break;case"soft":Ze(520,.05,"sine",.1);break;case"open":Ze(420,.07,"triangle",.12,760);break;case"close":Ze(680,.07,"triangle",.1,340);break;case"toggle":Ze(560,.06,"square",.08,980);break;case"success":Ze(660,.05,"triangle",.1),setTimeout(()=>Ze(880,.05,"triangle",.1),55),setTimeout(()=>Ze(1320,.07,"triangle",.09),110);break;case"warn":Ze(300,.09,"sawtooth",.1,200);break;case"error":Ze(220,.12,"sawtooth",.12,150);break;default:Ze(900,.035,"square",.07),bs(.025,.03)}}function gs(e){return e?e.id==="btnExport"||e.id==="btnLocalize"||e.id==="btnTools"?"success":e.id==="btnFull"||e.id==="btnSfx"?"toggle":/Close$|^tbClose|^keyClose|^scClose/.test(e.id||"")?"close":e.classList&&e.classList.contains("danger")?"warn":e.classList&&e.classList.contains("primary")?"primary":e.classList&&e.classList.contains("ghost")?"soft":e.classList&&(e.classList.contains("toolcard")||e.classList.contains("toolitem"))?"open":e.classList&&e.classList.contains("slotrow")?"soft":e.classList&&e.classList.contains("node")?e.classList.contains("dir")?"open":"click":e.tagName==="SELECT"?"soft":"click":"click"}function ys(e){let n=e.target;return!n||!n.closest?null:n.closest("button, .node, .toolcard, .toolitem, .slotrow, select, canvas")}function ks(){let e=document.getElementById("btnSfx"),n=()=>{e&&(e.textContent=dt?"\u97F3\u6548\u5F00":"\u97F3\u6548\u5173",e.classList.toggle("mutedbtn",!dt))};n(),e&&e.addEventListener("click",()=>{dt=!dt;try{localStorage.setItem(vs,dt?"1":"0")}catch(t){}n(),dt&&ua("success")}),document.addEventListener("pointerdown",t=>{let a=ys(t);a&&ua(a.tagName==="CANVAS"?"soft":gs(a))},!0),document.addEventListener("click",t=>{if(t.detail!==0)return;let a=ys(t);a&&ua(gs(a))},!0),document.addEventListener("change",t=>{t.target&&t.target.tagName==="SELECT"&&ua("soft")},!0)}var Ie=e=>document.getElementById(e),Bi=null,at=()=>window.AndroidBridge||null,Gm=()=>!!(at()&&at().listAppFiles);function qm(e){let n="";for(let a=0;a<e.length;a+=32768)n+=String.fromCharCode.apply(null,e.subarray(a,a+32768));return btoa(n)}function xs(e){let n=atob(e),t=new Uint8Array(n.length);for(let a=0;a<n.length;a++)t[a]=n.charCodeAt(a);return t}function Xm(e){return e<1024?e+" B":e<1048576?(e/1024).toFixed(1)+" KB":(e/1048576).toFixed(2)+" MB"}function Ss(e){Bi=e}function Ci(){let e=Ie("modalBody");if(!Gm()){e.innerHTML='<h3>\u5E94\u7528\u5B58\u50A8</h3><p class="muted">\u4EC5\u5B89\u5353\u7248\u53EF\u7528\uFF1A\u6587\u4EF6\u5B58\u653E\u5728 /Android/data/com.doubao.mctoolbox/files\u3002</p><div class="skbar"><button id="asClose" class="ghost">\u5173\u95ED</button></div>',Ie("modal").style.display="flex",Ie("asClose").onclick=()=>{Ie("modal").style.display="none"};return}Je()}function Je(e){let n=at().appDirPath(),t=Ie("modalBody"),a=[];try{a=JSON.parse(at().listAppFiles())}catch(o){a=[]}t.innerHTML=`<h3>\u5E94\u7528\u5B58\u50A8</h3>
    <p class="pathline">${n}</p>
    <p class="muted">\u5BFC\u51FA\u9ED8\u8BA4\u5199\u8FD9\u91CC\uFF1BAndroid 11+ \u7CFB\u7EDF\u6587\u4EF6\u7BA1\u7406\u5668\u770B\u4E0D\u5230\u8BE5\u76EE\u5F55\uFF0C\u9700\u8981\u65F6\u70B9\u201C\u5BFC\u51FA\u5230\u4E0B\u8F7D\u201D\u3002</p>
    <div class="skbar"><button id="asRefresh" class="ghost">\u5237\u65B0</button><button id="asImport" class="primary">\u5BFC\u5165\u6587\u4EF6</button><button id="asCrash" class="ghost">\u67E5\u770B\u5D29\u6E83\u65E5\u5FD7</button><button id="asClose" class="ghost">\u5173\u95ED</button></div>
    <div id="asMsg" class="muted">${e||""}</div>
    <div class="aslist">${a.length?a.map((o,r)=>`<div class="asrow">
      <span class="asname" title="${o.name}">${o.dir?"\u{1F4C1} ":"\u{1F4C4} "}${o.name}</span>
      <span class="assize">${o.dir?"":Xm(o.size)}</span>
      <div class="asbtns">${o.dir?"":`<button class="ghost" data-open="${r}">\u6253\u5F00</button><button class="ghost" data-dl="${r}">\u5BFC\u51FA\u5230\u4E0B\u8F7D</button>`}<button class="danger" data-del="${r}">\u5220\u9664</button></div>
    </div>`).join(""):'<p class="muted">\u76EE\u5F55\u8FD8\u662F\u7A7A\u7684\u3002\u5BFC\u51FA\u4E00\u4E2A\u5305\uFF0C\u6216\u70B9\u201C\u5BFC\u5165\u6587\u4EF6\u201D\u3002</p>'}</div>
    <div class="skbar"><button id="asClose2" class="ghost">\u5173\u95ED</button></div>`,Ie("modal").style.display="flex";let i=()=>{Ie("modal").style.display="none"};Ie("asClose").onclick=i,Ie("asClose2").onclick=i,Ie("asRefresh").onclick=()=>Je(),Ie("asCrash").onclick=()=>{let o=at().readAppFile("logs/crash.log");if(String(o).startsWith("ERR"))return Je("\u8FD8\u6CA1\u6709\u5D29\u6E83\u65E5\u5FD7");try{let r=new TextDecoder().decode(xs(o));t.innerHTML=`<h3>\u5D29\u6E83\u65E5\u5FD7</h3><pre class="code" style="max-height:52dvh;overflow:auto">${r.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</pre>
        <div class="skbar"><button id="asCrashDel" class="danger">\u6E05\u7A7A\u65E5\u5FD7</button><button id="asCrashBack" class="ghost">\u8FD4\u56DE\u76EE\u5F55</button></div>`,Ie("asCrashDel").onclick=()=>{at().deleteAppFile("logs/crash.log"),Je("\u65E5\u5FD7\u5DF2\u6E05\u7A7A")},Ie("asCrashBack").onclick=()=>Je()}catch(r){Je("\u65E5\u5FD7\u8BFB\u53D6\u5931\u8D25")}},Ie("asImport").onclick=async()=>{let o=document.createElement("input");o.type="file",o.multiple=!0,o.onchange=async()=>{let r=0;for(let s of[...o.files]){let l=new Uint8Array(await s.arrayBuffer()),c=at().writeAppFile(s.name,qm(l));if(String(c).startsWith("ERR"))return Je("\u5BFC\u5165\u5931\u8D25\uFF1A"+c);r++}Je("\u5DF2\u5BFC\u5165 "+r+" \u4E2A\u6587\u4EF6")},o.click()},t.querySelectorAll("[data-open]").forEach(o=>o.onclick=()=>{let r=a[Number(o.dataset.open)],s=at().readAppFile(r.name);if(String(s).startsWith("ERR"))return Je("\u8BFB\u53D6\u5931\u8D25\uFF1A"+s);let l=xs(s);i(),Bi&&Bi(new File([l],r.name.split("/").pop()))}),t.querySelectorAll("[data-dl]").forEach(o=>o.onclick=()=>{let r=a[Number(o.dataset.dl)],s=at().exportAppFile(r.name);Je(String(s).startsWith("ERR")?"\u5BFC\u51FA\u5931\u8D25\uFF1A"+s:"\u5DF2\u5BFC\u51FA\u5230 Download/MCBE\u89E3\u6790/"+r.name.split("/").pop())}),t.querySelectorAll("[data-del]").forEach(o=>o.onclick=()=>{let r=a[Number(o.dataset.del)];if(!confirm("\u5220\u9664 "+r.name+"\uFF1F"))return;let s=at().deleteAppFile(r.name);Je(String(s).startsWith("ERR")?"\u5220\u9664\u5931\u8D25\uFF1A"+s:"\u5DF2\u5220\u9664 "+r.name)})}var te=e=>document.getElementById(e),Le=e=>String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function Es(e){let n=(e?e():[])||[],t=te("modalBody");t.innerHTML=`<h3>\u811A\u672C\u6A21\u62DF\u5668</h3>
    <p class="muted">\u672C\u5730\u6A21\u62DF @minecraft/server \u7684\u5E38\u7528 API\u3001\u4E8B\u4EF6\u548C tick \u8C03\u5EA6\uFF1B\u4E0D\u8FDE\u63A5\u6E38\u620F\uFF0C\u4E0D\u4F1A\u6267\u884C\u771F\u5B9E\u547D\u4EE4\u3002</p>
    <div class="skbar">
      <select id="simPick" style="min-width:220px;flex:1">
        <option value="">\u2014 \u4ECE\u5F53\u524D\u5305\u9009\u62E9 scripts/*.js \u2014</option>
        ${n.map((k,E)=>`<option value="${E}">${Le(k.path)}</option>`).join("")}
      </select>
      <button id="simLoad" class="ghost">\u8F7D\u5165</button>
      <button id="simRun" class="primary">\u8FD0\u884C</button>
      <button id="simStop" class="ghost">\u505C\u6B62</button>
    </div>
    <div class="simgrid">
      <div>
        <textarea id="simCode" class="code" spellcheck="false" style="height:32dvh" placeholder="\u7C98\u8D34 behavior pack \u7684 JS\uFF0C\u6216\u4ECE\u4E0A\u9762\u8F7D\u5165 scripts/*.js"></textarea>
        <div class="simctrl">
          <button id="simBreak" class="ghost">\u6A21\u62DF\u6316\u65B9\u5757</button>
          <button id="simUse" class="ghost">\u6A21\u62DF\u7528\u7269\u54C1</button>
          <button id="simSpawn" class="ghost">\u6A21\u62DF\u73A9\u5BB6\u8FDB\u5165</button>
          <button id="simCommand" class="ghost">\u6A21\u62DF\u6267\u884C\u547D\u4EE4</button>
          <button id="simTick1" class="ghost">+1 tick</button>
          <button id="simTick20" class="ghost">+20 tick</button>
          <button id="simAuto" class="primary">\u81EA\u52A8\u8FD0\u884C</button>
        </div>
      </div>
      <div>
        <div id="simState" class="simstate"></div>
        <div id="simLog" class="simlog"></div>
      </div>
    </div>
    <div class="simformwrap" id="simFormWrap" style="display:none"><div class="simform" id="simForm"></div></div>
    <div class="skbar"><button id="simClear" class="ghost">\u6E05\u7A7A\u65E5\u5FD7</button><button id="simClose" class="ghost">\u5173\u95ED</button></div>`,te("modal").style.display="flex";let a=document.querySelector(".modalbox");a&&(a.style.maxWidth="1100px",a.style.width="96vw");let i={tick:0,logs:[],listeners:{},timers:[],runQueue:[],seq:0,auto:null,running:!1,player:{name:"\u6A21\u62DF\u73A9\u5BB6",location:{x:0,y:64,z:0},dimension:null,dynamic:{}},blocks:new Map,entities:[],dynamic:{},stats:{messages:0,blockChanges:0,entities:0,errors:0}},o=k=>{if(!i.listeners[k]){let E=[];i.listeners[k]={subscribe(P){return E.push(P),P},unsubscribe(P){let R=E.indexOf(P);R>=0&&E.splice(R,1)},_emit(P){for(let R of E.slice())try{R(P)}catch(J){r("\u4E8B\u4EF6 "+k+" \u5904\u7406\u51FA\u9519\uFF1A"+J.message,"err")}},_subs:E}}return i.listeners[k]},r=(k,E)=>{let P=typeof k=="string"?k:JSON.stringify(k);i.logs.push({tick:i.tick,text:P,kind:E||"log"}),i.logs.length>500&&i.logs.shift(),s()},s=()=>{let k=te("simLog");k&&(k.innerHTML=i.logs.slice(-200).map(E=>`<div class="simline ${E.kind}"><span class="simtick">${E.tick}</span>${Le(E.text)}</div>`).join("")||'<p class="muted">\u8FD8\u6CA1\u6709\u8F93\u51FA\u3002\u70B9\u201C\u8FD0\u884C\u201D\u5F00\u59CB\u3002</p>',k.scrollTop=k.scrollHeight)},l=()=>{let k=te("simState");k&&(k.innerHTML=`<div class="simstat"><b>tick</b><span>${i.tick}</span></div>
      <div class="simstat"><b>\u73A9\u5BB6</b><span>${Le(i.player.name)} @ ${i.player.location.x}, ${i.player.location.y}, ${i.player.location.z}</span></div>
      <div class="simstat"><b>\u6D88\u606F</b><span>${i.stats.messages}</span></div>
      <div class="simstat"><b>\u65B9\u5757\u53D8\u5316</b><span>${i.stats.blockChanges}</span></div>
      <div class="simstat"><b>\u5B9E\u4F53</b><span>${i.stats.entities}</span></div>
      <div class="simstat"><b>\u9519\u8BEF</b><span>${i.stats.errors}</span></div>
      <div class="simstat"><b>\u72B6\u6001</b><span>${i.auto?"\u81EA\u52A8\u8FD0\u884C":i.running?"\u5DF2\u8F7D\u5165":"\u672A\u8FD0\u884C"}</span></div>`)},c={id:"minecraft:overworld",getBlock(k){let E=`${k.x},${k.y},${k.z}`,P=i.blocks.get(E)||"minecraft:stone";return{typeId:P,location:xe({},k),dimension:c,permutation:{type:{id:P}},setType(R){let J=typeof R=="string"?R:R&&R.type&&R.type.id||"minecraft:air";i.blocks.set(E,J),i.stats.blockChanges++,r(`setblock ${k.x} ${k.y} ${k.z} ${J}`,"world"),l()},setPermutation(R){this.setType(R)}}},spawnEntity(k,E){let P={id:String(++i.seq),typeId:k,location:xe({},E),dimension:c,nameTag:k,teleport(R){this.location=xe({},R),r(`\u5B9E\u4F53 ${this.id} \u4F20\u9001\u5230 ${R.x}, ${R.y}, ${R.z}`,"world")},kill(){i.entities=i.entities.filter(R=>R!==P),r(`\u5B9E\u4F53 ${this.id} \u88AB\u79FB\u9664`,"world")},getComponent(){return{container:null}}};return i.entities.push(P),i.stats.entities++,r(`\u751F\u6210\u5B9E\u4F53 ${k} @ ${E.x}, ${E.y}, ${E.z}`,"world"),l(),P},spawnItem(k,E){r(`\u751F\u6210\u6389\u843D\u7269 ${k.typeId} \xD7${k.amount} @ ${E.x}, ${E.y}, ${E.z}`,"world")},getEntities(){return i.entities.slice()},runCommand(k){r("\u547D\u4EE4\uFF1A"+k,"cmd");let E=String(k).match(/^say\s+(.+)$/i);E&&(i.stats.messages++,r("\u804A\u5929\uFF1A"+E[1],"chat"));let P=String(k).match(/^tp\s+([^\s]+)\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)/i);return P&&(i.player.location={x:+P[2],y:+P[3],z:+P[4]},r(`\u73A9\u5BB6\u4F20\u9001\u5230 ${P[2]}, ${P[3]}, ${P[4]}`,"world")),l(),{successCount:1}}};i.player.dimension=c;let m={name:i.player.name,location:i.player.location,dimension:c,id:"player-1",sendMessage(k){i.stats.messages++,r("\u2192 \u73A9\u5BB6\uFF1A"+k,"chat"),l()},onScreenDisplay(k){r("\u5C4F\u5E55\u6807\u9898\uFF1A"+k,"chat")},teleport(k){i.player.location=xe({},k),this.location=i.player.location,r(`\u73A9\u5BB6\u4F20\u9001\u5230 ${k.x}, ${k.y}, ${k.z}`,"world"),l()},getGameMode(){return"creative"},getComponent(k){return k==="inventory"||k==="minecraft:inventory"?{container:{addItem(E){return r(`\u80CC\u5305\u52A0\u5165 ${E.typeId} \xD7${E.amount}`,"world"),E},size:36}}:null},getDynamicProperty(k){return i.player.dynamic[k]},setDynamicProperty(k,E){i.player.dynamic[k]=E}};class u{constructor(E,P){this.typeId=E||"minecraft:air",this.amount=P==null?1:P}clone(){return new u(this.typeId,this.amount)}getComponent(){return null}}class p{constructor(E){this.type={id:E}}static resolve(E){return new p(typeof E=="string"?E:E&&E.id||"minecraft:stone")}getState(){}}let d={BlockTypes:new Proxy({},{get:(k,E)=>({id:"minecraft:"+String(E).toLowerCase()})}),EquipmentSlot:{Mainhand:"Mainhand",Offhand:"Offhand",Head:"Head",Chest:"Chest",Legs:"Legs",Feet:"Feet"},GameMode:{Survival:"survival",Creative:"creative",Adventure:"adventure",Spectator:"spectator"},EntityComponentTypes:{},ItemComponentTypes:{},DimensionTypes:{overworld:{type:"overworld"},nether:{type:"nether"},theEnd:{type:"the_end"}},Direction:{Up:"Up",Down:"Down",North:"North",South:"South",East:"East",West:"West"},TimeOfDay:{Day:0,Noon:6e3,Sunset:12e3,Night:18e3,Midnight:24e3},MoonPhase:{}},b={afterEvents:new Proxy({},{get:(k,E)=>o(String(E))}),beforeEvents:new Proxy({},{get:(k,E)=>o("before:"+String(E))}),getPlayers(){return[m]},getAllPlayers(){return[m]},getDimension(k){return c},sendMessage(k){i.stats.messages++,r("\u4E16\u754C\u6D88\u606F\uFF1A"+k,"chat"),l()},getDynamicProperty(k){return i.dynamic[k]},setDynamicProperty(k,E){i.dynamic[k]=E},getTimeOfDay(){return i.tick%24e3},setTimeOfDay(k){r("\u8BBE\u7F6E\u65F6\u95F4 "+k,"world")}},_={get currentTick(){return i.tick},run(k){return i.runQueue.push(k),++i.seq},runTimeout(k,E){return i.timers.push({at:i.tick+Math.max(0,E||1),cb:k,id:++i.seq}),i.seq},runInterval(k,E){return i.timers.push({every:Math.max(1,E||1),at:i.tick+Math.max(1,E||1),cb:k,id:++i.seq}),i.seq},clearRun(k){i.timers=i.timers.filter(E=>E.id!==k)},afterEvents:new Proxy({},{get:(k,E)=>o("system:"+String(E))}),beforeEvents:new Proxy({},{get:(k,E)=>o("system-before:"+String(E))}),isEditorWorld(){return!1}},f=null,h=k=>{if(!f)return;let E=f;f=null,te("simFormWrap").style.display="none",te("simForm").innerHTML="",E.resolve({canceled:!0,cancelationReason:k||"UserClosed"})},y=k=>new Promise(E=>{if(f){E({canceled:!0,cancelationReason:"UserBusy"});return}f={resolve:E,spec:k};let P=te("simForm"),R=te("simFormWrap"),J=`<div class="simformtitle">${Le(k.title||"")}</div>`;k.body&&(J+=`<div class="simformbody">${Le(k.body)}</div>`),k.kind==="modal"?(k.fields.forEach((x,I)=>{let j="simf"+I;x.type==="text"&&(J+=`<label class="simfield">${Le(x.label)}<input id="${j}" value="${Le(x.defaultValue||"")}" placeholder="${Le(x.placeholder||"")}"></label>`),x.type==="dropdown"&&(J+=`<label class="simfield">${Le(x.label)}<select id="${j}">${x.options.map((W,le)=>`<option value="${le}"${le===(x.defaultIndex||0)?" selected":""}>${Le(W)}</option>`).join("")}</select></label>`),x.type==="toggle"&&(J+=`<label class="simfield simtoggle"><input id="${j}" type="checkbox"${x.defaultValue?" checked":""}> ${Le(x.label)}</label>`),x.type==="slider"&&(J+=`<label class="simfield">${Le(x.label)}<input id="${j}" type="range" min="${x.min}" max="${x.max}" step="${x.step}" value="${x.defaultValue}"><span id="${j}v">${x.defaultValue}</span></label>`)}),J+=`<div class="simformactions"><button class="primary" id="simFormSubmit">${Le(k.submitText||"\u63D0\u4EA4")}</button></div>`):k.buttons.forEach((x,I)=>{J+=`<button class="simformbtn" data-i="${I}">${Le(x)}</button>`}),P.innerHTML=J,R.style.display="block",r("\u8868\u5355\u5DF2\u6253\u5F00\uFF1A"+(k.title||"(\u65E0\u6807\u9898)"),"info"),k.kind==="modal"?(k.fields.forEach((x,I)=>{if(x.type==="slider"){let j=te("simf"+I);j&&(j.oninput=()=>{let W=te("simf"+I+"v");W&&(W.textContent=j.value)})}}),te("simFormSubmit").onclick=()=>{let x=k.fields.map((j,W)=>{let le=te("simf"+W);if(le)return j.type==="toggle"?le.checked:j.type==="slider"||j.type==="dropdown"?Number(le.value):le.value}),I=f;f=null,R.style.display="none",P.innerHTML="",I&&I.resolve({canceled:!1,formValues:x})}):P.querySelectorAll(".simformbtn").forEach(x=>{x.onclick=()=>{let I=f;f=null,R.style.display="none",P.innerHTML="",I&&I.resolve({canceled:!1,selection:Number(x.dataset.i)})}})});class v{constructor(){this._title="",this._body="",this._buttons=[]}title(E){return this._title=E,this}body(E){return this._body=E,this}button(E){return this._buttons.push(E),this}show(){return y({kind:"action",title:this._title,body:this._body,buttons:this._buttons})}}class w{constructor(){this._title="",this._body="",this._b=["\u786E\u5B9A","\u53D6\u6D88"]}title(E){return this._title=E,this}body(E){return this._body=E,this}button1(E){return this._b[0]=E,this}button2(E){return this._b[1]=E,this}show(){return y({kind:"message",title:this._title,body:this._body,buttons:this._b})}}class M{constructor(){this._title="",this._fields=[],this._submit="\u63D0\u4EA4"}title(E){return this._title=E,this}textField(E,P,R){return this._fields.push({type:"text",label:E,placeholder:P,defaultValue:R}),this}dropdown(E,P,R){return this._fields.push({type:"dropdown",label:E,options:P,defaultIndex:R}),this}toggle(E,P){return this._fields.push({type:"toggle",label:E,defaultValue:P}),this}slider(E,P,R,J,x){return this._fields.push({type:"slider",label:E,min:P,max:R,step:J,defaultValue:x}),this}submitButton(E){return this._submit=E,this}show(){return y({kind:"modal",title:this._title,fields:this._fields,submitText:this._submit})}}let $={UserBusy:"UserBusy",UserClosed:"UserClosed"},B=St(xe({world:b,system:_},d),{ItemStack:u,BlockPermutation:p,ActionFormData:v,MessageFormData:w,ModalFormData:M,FormCancelationReason:$}),z={log:(...k)=>r(k.join(" ")),warn:(...k)=>r(k.join(" "),"warn"),error:(...k)=>{i.stats.errors++,r(k.join(" "),"err"),l()},info:(...k)=>r(k.join(" "))},S=k=>{for(let E=0;E<k;E++){i.tick++;let P=i.timers.filter(J=>J.at<=i.tick);for(let J of P){try{J.cb()}catch(x){i.stats.errors++,r("\u5B9A\u65F6\u5668\u51FA\u9519\uFF1A"+x.message,"err")}J.every&&(J.at=i.tick+J.every)}i.timers=i.timers.filter(J=>J.every||J.at>i.tick);let R=i.runQueue.splice(0);for(let J of R)try{J()}catch(x){i.stats.errors++,r("system.run \u51FA\u9519\uFF1A"+x.message,"err")}}l(),s()},T=k=>{let E=String(k),P=new Set;E=E.replace(/^\s*import\s*\{([^}]*)\}\s*from\s*['"]@minecraft\/server(?:-ui)?['"]\s*;?/gm,(I,j)=>(j.split(",").forEach(W=>{let le=W.trim().split(/\s+as\s+/);le[0]&&P.add(le[1]||le[0])}),"")),E=E.replace(/^\s*import\s*\*\s*as\s*([A-Za-z_$][\w$]*)\s*from\s*['"]@minecraft\/server(?:-ui)?['"]\s*;?/gm,(I,j)=>(P.add(j),"")),P.delete("world"),P.delete("system");let R=[...P],J=R.map(I=>I in B?B[I]:I==="console"?z:void 0),x=new Function("world","system","console",...R,E+`
//# sourceURL=sim-script.js`);return()=>x(b,_,z,...J)},L=()=>{i.tick=0,i.logs=[],i.timers=[],i.runQueue=[],i.blocks.clear(),i.entities=[],i.stats={messages:0,blockChanges:0,entities:0,errors:0},i.player.location={x:0,y:64,z:0},i.listeners={},i.running=!1,h("UserClosed"),U()},D=()=>{L();let k=te("simCode").value;if(!k.trim()){r("\u811A\u672C\u4E3A\u7A7A","err");return}try{T(k)(),i.running=!0,i.tick=1,o("startup")._emit({}),o("system:startup")._emit({}),o("worldInitialize")._emit({}),r("\u811A\u672C\u5DF2\u8FD0\u884C\uFF0C\u6CE8\u518C\u4E8B\u4EF6\uFF1A"+Object.keys(i.listeners).join("\u3001"),"info"),S(1),l()}catch(E){i.stats.errors++,r("\u811A\u672C\u6267\u884C\u5931\u8D25\uFF1A"+(E&&E.message)+(E&&E.stack?`
`+E.stack.split(`
`).slice(0,3).join(`
`):""),"err"),l()}},U=()=>{i.auto&&(clearInterval(i.auto),i.auto=null)},H=()=>{if(i.auto){U(),l();return}i.running||D(),i.auto=setInterval(()=>S(1),300),te("simAuto").textContent="\u6682\u505C\u81EA\u52A8",l()},X=()=>{U(),te("simAuto").textContent="\u81EA\u52A8\u8FD0\u884C",l()};te("simPick").onchange=()=>{let k=te("simPick").value;k!==""&&(te("simCode").value=n[Number(k)].code)},te("simLoad").onclick=()=>{let k=te("simPick").value;if(k==="")return r("\u5148\u5728\u5217\u8868\u91CC\u9009\u4E00\u4E2A\u811A\u672C","warn");te("simCode").value=n[Number(k)].code,r("\u5DF2\u8F7D\u5165 "+n[Number(k)].path,"info")},te("simRun").onclick=D,te("simStop").onclick=X,te("simAuto").onclick=H,te("simClear").onclick=()=>{i.logs=[],s()},te("simTick1").onclick=()=>S(1),te("simTick20").onclick=()=>S(20),te("simBreak").onclick=()=>{let k={x:i.player.location.x,y:i.player.location.y-1,z:i.player.location.z},E=c.getBlock(k),P={player:m,block:E,dimension:c,brokenBlockPermutation:E.permutation},R=o("before:playerBreakBlock"),J=!1;R._emit(St(xe({},P),{cancel(){J=!0}})),J||(E.setType("minecraft:air"),o("blockBreak")._emit(P)),S(1)},te("simUse").onclick=()=>{let k=new u("minecraft:diamond_sword",1);o("itemUse")._emit({source:m,itemStack:k}),o("before:itemUse")._emit({source:m,itemStack:k,cancel(){}}),S(1)},te("simSpawn").onclick=()=>{o("playerSpawn")._emit({player:m,initialSpawn:!1}),S(1)},te("simCommand").onclick=()=>{let k=prompt("\u6A21\u62DF\u6267\u884C\u547D\u4EE4","say \u4F60\u597D\uFF0C\u4E16\u754C");k&&c.runCommand(k),S(1)},te("simClose").onclick=()=>{X(),a&&(a.style.maxWidth="",a.style.width=""),te("modal").style.display="none"},l(),s(),r("\u6A21\u62DF\u5668\u5C31\u7EEA\uFF1A\u53EF\u8F7D\u5165 scripts/*.js\uFF0C\u6216\u7C98\u8D34\u4EE3\u7801\u540E\u70B9\u201C\u8FD0\u884C\u201D\u3002","info")}var In=32768,Ln=7,Nn=null;function Ym(){if(Nn)return Nn;Nn=new Int32Array(256);for(let e=0;e<256;e++){let n=e;for(let t=0;t<8;t++)n=n&1?2197175160^n>>>1:n>>>1;Nn[e]=n}return Nn}function Qm(e){let n=Ym(),t=4294967295;for(let a=0;a<e.length;a++)t=n[(t^e[a])&255]^t>>>8;return(t^4294967295)>>>0}function ed(e){return(e>>>15|e<<17)+2726488792>>>0}function Bs(e){let n=[];for(;e>=128;)n.push(e&127|128),e>>>=7;return n.push(e&127),n}function td(e,n){let t=[],a=o=>{let r=new Uint8Array(8);new DataView(r.buffer).setBigUint64(0,BigInt(o),!0),t.push(...r)},i=o=>{let r=new Uint8Array(4);new DataView(r.buffer).setUint32(0,o,!0),t.push(...r)};a(e),i(n.length);for(let o of n){t.push(1);let r=Cs(o.key),s=Cs(o.value);t.push(...Bs(r.length),...r,...Bs(s.length),...s)}return new Uint8Array(t)}function Cs(e){return e instanceof Uint8Array?e:e instanceof ArrayBuffer?new Uint8Array(e):ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new TextEncoder().encode(String(e))}function nd(e,n){let t=Array.from(e),a=o=>{for(;t.length<o;)t.push(0)},i=(o,r)=>{let s=In-t.length%In;if(s<Ln+1)for(let m=0;m<s;m++)t.push(0);let l=new Uint8Array(Ln+o.length),c=new DataView(l.buffer);c.setUint32(0,ed(Qm(o)),!0),c.setUint32(4,o.length,!0),l[6]=r,l.set(o,Ln);for(let m=0;m<l.length;m++)t.push(l[m])};for(let o of n){let r=0,s=!0;for(;r<o.length;){let l=In-t.length%In;if(l<Ln+1){for(let d=0;d<l;d++)t.push(0);l=In}let c=l-Ln,m=Math.min(c,o.length-r),u=r+m===o.length,p=s&&u?1:s?2:u?4:3;i(o.subarray(r,r+m),p),r+=m,s=!1}}return new Uint8Array(t)}function Ms(e,n){let a=me(e,0,!0).root.value,i=(o,r)=>{a[o]=r};if(n.pos){let[o,r,s]=n.pos,l=a.Pos,c=l&&l.t===9&&l.et===6?6:5;i("Pos",{t:9,et:c,v:[o,r,s].map(m=>({t:c,v:Number(m)}))})}if(n.health!==void 0){let o=a.Health,r=o&&(o.t===2||o.t===5)?o.t:5;i("Health",{t:r,v:Number(n.health)})}if(n.inventory){let o=n.inventory.map(r=>{var s,l;return{t:10,v:{Name:{t:8,v:String(r.name||r.Name||"minecraft:stone")},Count:{t:1,v:Number(r.count||r.Count||1)},Damage:{t:2,v:Number(r.damage||r.Damage||0)},WasPickedUp:{t:1,v:0},Slot:{t:1,v:Number((l=(s=r.slot)!=null?s:r.Slot)!=null?l:0)}}}});i("Inventory",{t:9,et:10,v:o})}return Be({root:{type:10,name:"",value:a}},!0)}function $s(e,n,t,a,i){let r=me(e,0,!0).root.value,s=r.Inventory;if(!s||s.t!==9)throw new Error("\u73A9\u5BB6\u6570\u636E\u91CC\u6CA1\u6709\u80CC\u5305");let l=s.v[n];if(!l||l.t!==10)throw new Error("\u80CC\u5305\u69FD\u4F4D "+n+" \u4E0D\u662F\u7269\u54C1");let c=l.v.tag;if(!c||c.t!==10)throw new Error("\u8FD9\u672C\u4E66\u6CA1\u6709 NBT tag");let m={t:9,et:8,v:t.map(u=>({t:8,v:String(u)}))};return c.v.pages=m,a!=null&&a!==""&&(c.v.title={t:8,v:String(a)}),i!=null&&i!==""&&(c.v.author={t:8,v:String(i)}),Be({root:{type:10,name:"",value:r}},!0)}function zs(e,n){let a=me(e,0,!0).root.value,i=a.Inventory;if(!i||i.t!==9)throw new Error("\u73A9\u5BB6\u6570\u636E\u91CC\u6CA1\u6709\u80CC\u5305");let o=i.v,r=o.map(s=>s.v.Slot?Number(s.v.Slot.v):0);for(let[s,l]of Object.entries(n)){let c=Number(s),m=Number(l);if(!o[c]||!Number.isFinite(m)||m<0)continue;let u=r[c];if(m===u)continue;let p=r.findIndex((d,b)=>b!==c&&d===m);p>=0&&(r[p]=u),r[c]=m}return o.forEach((s,l)=>{s.v.Slot?s.v.Slot.v=r[l]:s.v.Slot={t:1,v:r[l]}}),Be({root:{type:10,name:"",value:a}},!0)}function pa(e,n,t,a){let i=e.filter(s=>/\.log$/i.test(s.name)).sort((s,l)=>s.name.localeCompare(l.name));if(!i.length)throw new Error("\u8FD9\u4E2A\u5B58\u6863\u6CA1\u6709 .log \u6587\u4EF6\uFF0C\u65E0\u6CD5\u5B89\u5168\u8FFD\u52A0\u5199\u5165");let o=i[i.length-1],r=td(a,[{key:n,value:t}]);return o.data=nd(o.data,[r]),{logName:o.name,bytes:o.data}}function Mi(e){let n=Ee(me(e,0,!0)),t=Array.isArray(n.Inventory)?n.Inventory:[];return{pos:n.Pos?n.Pos.map(a=>Number(a)):null,health:n.Health!==void 0?Number(n.Health):null,inventory:t.map(a=>{var i,o,r;return{name:String(a.Name||""),count:Number((i=a.Count)!=null?i:1),slot:Number((o=a.Slot)!=null?o:0),damage:Number((r=a.Damage)!=null?r:0)}}),raw:n}}var C=e=>document.getElementById(e),g={archive:null,name:"",kind:"",selected:null,level:null,structure:null,stats:null},As=()=>new Promise(e=>setTimeout(e,30));function A(e){let n=C("log");n.textContent+=e+`
`,n.scrollTop=n.scrollHeight}function ue(e){return e==null?"-":Number(e).toLocaleString("zh-CN")}function ha(e){return et(e)}function ad(e){return Ar(e)}function O(e){let n=C("banner");n.textContent="\u26A0 "+e,n.style.display="block"}function Ai(){C("banner").style.display="none"}function ga(e){return e.arrayBuffer?e.arrayBuffer().then(n=>new Uint8Array(n)):new Promise((n,t)=>{let a=new FileReader;a.onload=()=>n(new Uint8Array(a.result)),a.onerror=()=>t(a.error||new Error("\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25")),a.readAsArrayBuffer(e)})}function id(e){let n="";for(let a=0;a<e.length;a+=32768)n+=String.fromCharCode.apply(null,e.subarray(a,a+32768));return btoa(n)}function he(e){return e.split("/").pop()}function nn(e){let n=he(e),t=n.lastIndexOf(".");return t<0?"":n.slice(t)}function Ke(e,n){return new Promise(t=>{var u;let a=C("modal"),i=C("modalBody");i.innerHTML="";let o=document.createElement("h3");o.textContent=e,i.appendChild(o);let r={};for(let p of n){let d=document.createElement("label");d.textContent=p.label,i.appendChild(d);let b=document.createElement("input");b.value=(u=p.value)!=null?u:"",b.placeholder=p.placeholder||"",p.type&&(b.type=p.type),i.appendChild(b),r[p.key]=b}let s=document.createElement("div");s.className="modalbtns";let l=document.createElement("button");l.textContent="\u786E\u5B9A";let c=document.createElement("button");c.textContent="\u53D6\u6D88",c.className="ghost",s.appendChild(l),s.appendChild(c),i.appendChild(s),a.style.display="flex";let m=p=>{a.style.display="none",t(p)};l.onclick=()=>{let p={};for(let d in r)p[d]=r[d].value;m(p)},c.onclick=()=>m(null),setTimeout(()=>{let p=Object.values(r)[0];p&&p.focus()},50)})}async function zi(e){Ai(),g.name=e.name,g.selected=null,g.level=null,g.structure=null,g.stats=null,C("fileName").textContent=e.name+"\uFF08"+(e.size/1048576).toFixed(2)+" MB\uFF09",A("\u6253\u5F00\uFF1A"+e.name);try{let n=JSON.parse(localStorage.getItem("mcbeRecent")||"[]").filter(t=>t.name!==e.name);n.unshift({name:e.name,at:Date.now()}),localStorage.setItem("mcbeRecent",JSON.stringify(n.slice(0,20)))}catch(n){}try{let n=await ga(e),t=Gt(e.name,n);if(g.kind=t,C("typeBadge").textContent={zip:"\u538B\u7F29\u5305\uFF08.mcpack/.mcaddon/.mcworld\uFF09",brarchive:".brarchive",mcstructure:".mcstructure",nbt:"NBT \u6570\u636E",unknown:"\u672A\u77E5\u7C7B\u578B"}[t]||t,t==="mcstructure"){let a=function(i){let o=Bn(i.type,i.x*31+i.z*17),r=Math.max(4,Math.floor(560/o.size)),s=Xt(i.type,i.x*31+i.z*17);C("modalBody").innerHTML="<h3>"+ne(i.zh)+`\uFF08\u63A8\u6D4B\u5916\u5F62\uFF09</h3>
        <p class="muted">\u5750\u6807 `+i.x+", "+i.z+"\u3000\u4F30\u7B97 y\u2248"+i.y+"\u3000\u7FA4\u7CFB "+ne(i.biome)+`</p>
        <canvas id="structCv" width="`+o.size*r+'" height="'+o.size*r+`" style="width:100%;max-width:560px;image-rendering:pixelated;border-radius:8px"></canvas>
        <p class="muted">\u5916\u5F62\u6309\u7ED3\u6784\u7C7B\u578B\u89C4\u5219\u7A0B\u5E8F\u751F\u6210\uFF08\u542B\u7834\u635F/\u671D\u5411\u968F\u673A\uFF09\uFF0C\u7528\u4E8E\u770B\u5E03\u5C40\uFF0C\u4E0D\u7B49\u4E8E\u771F\u5B9E\u6A21\u677F\u3002\u5B9D\u7BB1\u53C2\u8003\uFF1A`+s.map(m=>et(m.name)+"\xD7"+m.count).join("\u3001")+`</p>
        <div class="modalbtns"><button id="stClose" class="ghost">\u5173\u95ED</button></div>`,C("modal").style.display="flex";let l=document.getElementById("structCv"),c=l.getContext("2d");c.fillStyle="#0b0f15",c.fillRect(0,0,l.width,l.height);for(let m of o.blocks)c.fillStyle=tt(m.block),c.fillRect(m.x*r,m.z*r,r,r);document.getElementById("stClose").onclick=()=>{C("modal").style.display="none"}};g.structure=ti(n),C("workspace").style.display="none",C("structureView").style.display="block",tn();return}if(t==="brarchive"||t==="zip"){g.archive=Oe.fromBytes(e.name,n),g.texIndex=null,g.texCache=new Map,g.texPending=new Set,g.texPacks=[],g.texLogged=!1,An(t,""),g.archiveKind==="world"&&A("\u63D0\u793A\uFF1A\u4E16\u754C\u5B58\u6863\u53EF\u7EDF\u8BA1 / \u89C2\u770B\u5730\u5F62 / \u6539\u73A9\u5BB6\u6570\u636E\uFF1B\u5185\u5D4C\u6A21\u7EC4\u7684 json\u3001js\u3001.mcstructure \u90FD\u80FD\u76F4\u63A5\u6539\u3002");return}throw new Error("\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B\uFF1A"+e.name)}catch(n){console.error(n),O(n.message||String(n)),A("\u6253\u5F00\u5931\u8D25\uFF1A"+(n.message||n))}}async function od(e){Ai();let n=[],t="brarchive";for(let a of e){let i=await ga(a);if(Gt(a.name,i)==="brarchive"){let o=ta(i);for(let r of o.entries)n.push({path:r.name,data:r.data})}else if(Gt(a.name,i)==="zip"){let o=be(i);for(let r of o.entries)r.name.endsWith("/")||n.push({path:r.name,data:o.read(r)})}else n.push({path:a.name,data:i})}if(!n.length)return O("\u8FD9\u4E9B\u6587\u4EF6\u91CC\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u6761\u76EE");g.name=e.length+" \u4E2A\u6587\u4EF6\uFF08\u5408\u5E76\u6253\u5F00\uFF09",C("fileName").textContent=e.length+" \u4E2A\u6587\u4EF6\uFF08\u5408\u5E76\u6253\u5F00\uFF09",g.selected=null,g.level=null,g.structure=null,g.stats=null,g.statsDirty=!0,g.archive=new Oe(t,n),g.texIndex=null,g.texCache=new Map,g.texPending=new Set,g.texPacks=[],g.texLogged=!1,An(t,e.length+" \u4E2A\u6587\u4EF6\u5408\u5E76")}function An(e,n){let t=rd(g.archive);g.archiveKind=t.kind,g.structurePath=null,g.expanded=new Set,g.texIndex=null;let a=si(g.archive);a&&A("\u5DF2\u4ECE\u5305\u5185\u8BED\u8A00\u6587\u4EF6\u5EFA\u7ACB\u4E2D\u6587\u540D\u7D22\u5F15\uFF1A"+a+" \u6761"),C("structureView").style.display="none",C("workspace").style.display="block",sd(t.kind),Li(),Li();let i={world:"\u4E16\u754C\u5B58\u6863\uFF08\u542B LevelDB \u4E0E\u5185\u5D4C\u9644\u52A0\u5305\uFF09",pack:"\u9644\u52A0\u5305\uFF08\u53EF\u7F16\u8F91\u6587\u4EF6\uFF09",other:"\u666E\u901A\u5F52\u6863\uFF08\u5408\u5E76 "+(n||"")+"\uFF09"}[t.kind];C("typeBadge").textContent=i,pe();let o=js();o&&jt(o),A("\u5DF2\u8F7D\u5165\uFF1A"+g.archive.files.length+" \u4E2A\u6587\u4EF6\uFF0C\u8BC6\u522B\u4E3A "+i)}function rd(e){let n=e.paths(),t=n.some(i=>i==="level.dat")||n.some(i=>/^db\/(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/i.test(i))||n.some(i=>i==="CURRENT"),a=n.some(i=>/manifest\.json$/i.test(i))||n.some(i=>/^behavior_packs\//.test(i))||n.some(i=>/^resource_packs\//.test(i));return t?{kind:"world",hasPack:a}:a?{kind:"pack",hasPack:!0}:{kind:"other",hasPack:!1}}function sd(e){let n=["btnStats","btnMap","btnPlayer"],t=["btnRename","btnDelete","btnNewFile","btnNewFolder"];for(let a of n)C(a).style.display=e==="world"?"":"none";for(let a of t)C(a).style.display=e==="pack"?"":"none";C("btnExport").textContent=e==="world"?"\u5BFC\u51FA\u5B58\u6863":"\u5BFC\u51FA / \u53E6\u5B58"}function js(){if(!g.archive)return null;let e=g.archive.paths();return e.find(n=>n==="manifest.json")||e.find(n=>/behavior_packs|resource_packs/.test(n)&&n.endsWith("manifest.json"))||e.find(n=>n==="level.dat")||e[0]}function pe(){let e=C("tree");if(e.innerHTML="",g.expanded||(g.expanded=new Set),g.filterQ){let o=g.filterQ.toLowerCase(),r=g.archive.files.filter(l=>l.path.toLowerCase().includes(o));r.slice(0,400).forEach(l=>{let c=document.createElement("div");c.className="node file",c.textContent=l.path+"  "+it(l.data.length),c.onclick=()=>jt(l.path),C("tree").appendChild(c)});let s=document.createElement("div");s.className="node muted",s.textContent="\u641C\u7D22\u201C"+g.filterQ+"\u201D\uFF1A"+r.length+" \u4E2A\u7ED3\u679C\uFF08\u6700\u591A\u663E\u793A 400\uFF09",C("tree").appendChild(s);return}let n=g.archive.tree(),t=[],a=document.createDocumentFragment();for(let o of n){o.depth===0?t[0]=o.path:(t.length=o.depth,t[o.depth]=o.path);let r=o.depth?t[o.depth-1]:null;if(o.depth&&!g.expanded.has(r))continue;let s=document.createElement("div");s.className="node "+o.type+(g.selected===o.path?" active":""),s.style.paddingLeft=8+o.depth*14+"px";let l=o.type==="dir"&&g.expanded.has(o.path);s.textContent=(o.type==="dir"?l?"\u{1F4C2} ":"\u{1F4C1} ":"\u{1F4C4} ")+o.name+(o.type==="file"?"  "+it(o.size):""),s.onclick=()=>{if(o.type==="dir"){g.expanded.has(o.path)?g.expanded.delete(o.path):g.expanded.add(o.path),g.selected=o.path,pe(),Ps(o.path);return}jt(o.path)},a.appendChild(s)}e.appendChild(a);let i=C("tree");e.scrollTop===0&&(i.scrollTop=0)}function it(e){return e<1024?e+" B":(e/1024).toFixed(1)+" KB"}function jt(e){if(/\.brarchive$/i.test(e)&&g.archive.get(e))return ld(e);g.selected=e,document.querySelectorAll("#tree .node").forEach(n=>n.classList.remove("active")),pe(),g.archive.get(e)?fd(e):Ps(e)}function ld(e){try{let n=g.archive.getBytes(e),t=Oe.fromBytes(e,n);g.parent=g.parent||{archive:g.archive,name:g.name,selected:g.selected},g.archive=t,g.name=he(e),g.selected=null,A("\u8FDB\u5165\u5185\u5D4C\u5F52\u6863\uFF1A"+e+"\uFF08"+t.files.length+" \u4E2A\u6761\u76EE\uFF09"),pe();let a=js();if(a&&jt(a),!document.getElementById("btnUp")){let i=document.createElement("button");i.id="btnUp",i.textContent="\u8FD4\u56DE\u4E0A\u7EA7\u5305",i.className="ghost",i.onclick=cd,C("workspace").querySelector(".toolbar").appendChild(i)}document.getElementById("btnUp").style.display=""}catch(n){O(n.message)}}function cd(){g.parent&&(g.archive=g.parent.archive,g.name=g.parent.name,g.selected=g.parent.selected,g.parent=null,C("btnUp").style.display="none",pe(),A("\u5DF2\u8FD4\u56DE\u4E0A\u7EA7\u5305"))}function Ps(e){let n=C("editor");n.innerHTML="";let t=e+"/",a=g.archive.files.filter(l=>l.path.startsWith(t)),i=a.reduce((l,c)=>l+c.data.length,0),o=document.createElement("div");o.className="edhead",o.innerHTML=`<div><b>\u{1F4C1} ${ne(e)}</b><span class="muted">\u3000${a.length} \u4E2A\u6587\u4EF6\uFF0C\u5171 ${it(i)}</span></div>`,n.appendChild(o);let r=document.createElement("p");r.className="muted",r.textContent="\u8FD9\u662F\u6587\u4EF6\u5939\u3002\u53EF\u4EE5\u7528\u4E0A\u65B9\u201C\u91CD\u547D\u540D\u201D\u6539\u6587\u4EF6\u5939\u540D\uFF08\u4F1A\u8FDE\u540C\u5185\u90E8\u6240\u6709\u6587\u4EF6\u4E00\u8D77\u6539\u8DEF\u5F84\uFF09\uFF0C\u4E5F\u53EF\u4EE5\u201C\u5220\u9664\u201D\u6574\u4E2A\u6587\u4EF6\u5939\u3002",n.appendChild(r);let s=document.createElement("pre");s.className="list",s.textContent=a.slice(0,200).map(l=>l.path.slice(t.length)).join(`
`),n.appendChild(s)}function md(e){return/(^|\/)db\/(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/i.test(e)}function Ts(e,n){return e[n]|e[n+1]<<8|e[n+2]<<16|e[n+3]<<24}function _a(e){let n=e.keyBytes||new Uint8Array(0),t=e.key;if(t==="~local_player")return"\u73A9\u5BB6\u6570\u636E ~local_player";let a=Ts(n,0),i=Ts(n,4);if(n.length===10&&n[8]===47){let r=n[9]>127?n[9]-256:n[9];return"\u5B50\u533A\u5757 ("+a+","+i+") y="+r}if(n.length===9&&n[8]===43)return"\u533A\u5757 ("+a+","+i+")";if(n.length===9&&n[8]===49)return"\u65B9\u5757\u5B9E\u4F53\u7D22\u5F15 ("+a+","+i+")";if(n.length===9&&n[8]===119)return"\u5B9E\u4F53\u7D22\u5F15 ("+a+","+i+")";if(n.length===9)return"\u533A\u5757\u9644\u5C5E 0x"+n[8].toString(16)+" ("+a+","+i+")";if(/^[\x20-\x7e]+$/.test(t)&&t.length<60)return t;let o="";for(let r=0;r<Math.min(n.length,16);r++)o+=n[r].toString(16).padStart(2,"0")+" ";return"\u4E8C\u8FDB\u5236\u952E "+o.trim()}function dd(e){if(!e||!e.length)return"\uFF08\u7A7A\u503C\uFF09";if(e[0]===10||e[0]===8||e[0]===9||e[0]===7)try{let t=me(e,0,!0),a=JSON.stringify(Ee(t),null,1);if(a)return a.length>1600?a.slice(0,1600)+" \u2026":a}catch(t){}let n="";for(let t=0;t<Math.min(e.length,64);t++)n+=e[t].toString(16).padStart(2,"0")+(t%16===15?`
`:" ");return n.trim()+(e.length>64?`
\u2026 \u5171 `+e.length+" \u5B57\u8282":"")}async function ud(e){A("\u6B63\u5728\u8BFB\u53D6 LevelDB\uFF08"+e+"\uFF09\u2026");let n=await ut();if(!n.length)return O("\u6CA1\u6709\u627E\u5230 LevelDB \u6587\u4EF6");try{let l=function(u){let p=Bn(u.type,u.x*31+u.z*17),d=Math.max(4,Math.floor(560/p.size)),b=Xt(u.type,u.x*31+u.z*17);C("modalBody").innerHTML="<h3>"+ne(u.zh)+`\uFF08\u63A8\u6D4B\u5916\u5F62\uFF09</h3>
        <p class="muted">\u5750\u6807 `+u.x+", "+u.z+"\u3000\u4F30\u7B97 y\u2248"+u.y+"\u3000\u7FA4\u7CFB "+ne(u.biome)+`</p>
        <canvas id="structCv" width="`+p.size*d+'" height="'+p.size*d+`" style="width:100%;max-width:560px;image-rendering:pixelated;border-radius:8px"></canvas>
        <p class="muted">\u5916\u5F62\u6309\u7ED3\u6784\u7C7B\u578B\u89C4\u5219\u7A0B\u5E8F\u751F\u6210\uFF08\u542B\u7834\u635F/\u671D\u5411\u968F\u673A\uFF09\uFF0C\u7528\u4E8E\u770B\u5E03\u5C40\uFF0C\u4E0D\u7B49\u4E8E\u771F\u5B9E\u6A21\u677F\u3002\u5B9D\u7BB1\u53C2\u8003\uFF1A`+b.map(h=>et(h.name)+"\xD7"+h.count).join("\u3001")+`</p>
        <div class="modalbtns"><button id="stClose" class="ghost">\u5173\u95ED</button></div>`,C("modal").style.display="flex";let _=document.getElementById("structCv"),f=_.getContext("2d");f.fillStyle="#0b0f15",f.fillRect(0,0,_.width,_.height);for(let h of p.blocks)f.fillStyle=tt(h.block),f.fillRect(h.x*d,h.z*d,d,d);document.getElementById("stClose").onclick=()=>{C("modal").style.display="none"}},t=g.db||await window.MCBE.readLevelDb(n,{});g.db=t;let a=[],i=new Set,o=0,r=0,s=0;for(let[u,p]of t){let d=p.keyBytes||new Uint8Array(0),b=d.length===10&&d[8]===47;b?o++:d.length===9&&d[8]===43?i.add(d[0]+","+d[1]+","+d[2]+","+d[3]+"|"+d[4]+","+d[5]+","+d[6]+","+d[7]):s++,u==="~local_player"&&r++,a.push({key:u,keyBytes:d,value:p.value,isSub:b,tag:p.tag})}g.dbRows=a,C("workspace").style.display="none",C("structureView").style.display="block",C("structureView").innerHTML=`
      <div class="edbar"><button id="dbBack" class="ghost">\u8FD4\u56DE\u6587\u4EF6\u5217\u8868</button><span class="muted">${ne(e)}</span></div>
      <h3>LevelDB \u67E5\u770B\u5668</h3>
      <p class="muted">\u5171 ${ue(a.length)} \u4E2A\u952E\u3000\u533A\u5757 ${ue(i.size)}\u3000\u5B50\u533A\u5757 ${ue(o)}\u3000\u5176\u4ED6 ${ue(s)}\u3000\u73A9\u5BB6 ${ue(r)}</p>
      <input id="dbSearch" class="" placeholder="\u641C\u7D22\u952E\u540D / \u5750\u6807\uFF0C\u4F8B\u5982 local_player \u6216 80,-100" style="width:100%;background:#0d1219;border:1px solid #232c3a;border-radius:9px;color:#dfe4ee;padding:10px;font-size:13px;margin:6px 0 10px">
      <div id="dbList" class="dblist"></div>
      <div id="dbDetail" class="dbdetail muted">\u70B9\u4E0A\u9762\u4EFB\u610F\u4E00\u6761\u67E5\u770B\u5185\u5BB9</div>`;let c=document.getElementById("dbBack");c.onclick=()=>{C("structureView").style.display="none",C("workspace").style.display="block"};let m=u=>{let p=document.getElementById("dbList"),d=u?a.filter(b=>_a(b).includes(u)||b.key.includes(u)):a.slice(0,300);p.innerHTML=d.slice(0,300).map((b,_)=>`<div class="dbrow" data-i="${a.indexOf(b)}"><b>${ne(_a(b))}</b><span class="muted">\u3000${it(b.value?b.value.length:0)}</span></div>`).join("")||'<p class="muted">\u6CA1\u6709\u5339\u914D\u7684\u952E</p>',p.querySelectorAll(".dbrow").forEach(b=>{b.onclick=()=>pd(a[+b.dataset.i])})};document.getElementById("dbSearch").oninput=u=>m(u.target.value.trim()),m(""),A("\u5DF2\u8F7D\u5165 "+ue(a.length)+" \u4E2A\u952E\uFF08\u5217\u8868\u6700\u591A\u663E\u793A 300 \u6761\uFF0C\u53EF\u7528\u641C\u7D22\uFF09")}catch(t){O("LevelDB \u8BFB\u53D6\u5931\u8D25\uFF1A"+t.message)}}function pd(e){let n=document.getElementById("dbDetail"),t=ne(dd(e.value));n.className="dbdetail",n.innerHTML=`<div class="edhead"><b>${ne(_a(e))}</b><span class="muted">${it(e.value.length)}</span></div>
    <pre class="dbpre">${t}</pre>
    <div class="edbar"><button id="dbExport">\u5BFC\u51FA\u8FD9\u4E2A\u503C</button></div>`,document.getElementById("dbExport").onclick=()=>{let a="db_"+_a(e).replace(/[^0-9A-Za-z\u4e00-\u9fa5]+/g,"_").slice(0,40)+".bin";Ce(a,e.value)}}function fd(e){let n=C("editor");n.innerHTML="";let t=g.archive.getBytes(e),a=document.createElement("div");if(a.className="edhead",a.innerHTML=`<div><b>${ne(e)}</b><span class="muted">\u3000${it(t.length)}</span></div>`,n.appendChild(a),/^\.?mcstructure$/.test(nn(e).toLowerCase()))try{let o=function(r){let s=Bn(r.type,r.x*31+r.z*17),l=Math.max(4,Math.floor(560/s.size)),c=Xt(r.type,r.x*31+r.z*17);C("modalBody").innerHTML="<h3>"+ne(r.zh)+`\uFF08\u63A8\u6D4B\u5916\u5F62\uFF09</h3>
        <p class="muted">\u5750\u6807 `+r.x+", "+r.z+"\u3000\u4F30\u7B97 y\u2248"+r.y+"\u3000\u7FA4\u7CFB "+ne(r.biome)+`</p>
        <canvas id="structCv" width="`+s.size*l+'" height="'+s.size*l+`" style="width:100%;max-width:560px;image-rendering:pixelated;border-radius:8px"></canvas>
        <p class="muted">\u5916\u5F62\u6309\u7ED3\u6784\u7C7B\u578B\u89C4\u5219\u7A0B\u5E8F\u751F\u6210\uFF08\u542B\u7834\u635F/\u671D\u5411\u968F\u673A\uFF09\uFF0C\u7528\u4E8E\u770B\u5E03\u5C40\uFF0C\u4E0D\u7B49\u4E8E\u771F\u5B9E\u6A21\u677F\u3002\u5B9D\u7BB1\u53C2\u8003\uFF1A`+c.map(p=>et(p.name)+"\xD7"+p.count).join("\u3001")+`</p>
        <div class="modalbtns"><button id="stClose" class="ghost">\u5173\u95ED</button></div>`,C("modal").style.display="flex";let m=document.getElementById("structCv"),u=m.getContext("2d");u.fillStyle="#0b0f15",u.fillRect(0,0,m.width,m.height);for(let p of s.blocks)u.fillStyle=tt(p.block),u.fillRect(p.x*l,p.z*l,l,l);document.getElementById("stClose").onclick=()=>{C("modal").style.display="none"}},i=ti(t);g.structure=i,g.structurePath=e,C("workspace").style.display="none",C("structureView").style.display="block",tn(),A("\u5DF2\u6253\u5F00\u7ED3\u6784\uFF1A"+e+"\uFF08"+i.size.join("\xD7")+"\uFF09");return}catch(i){A("\u7ED3\u6784\u89E3\u6790\u5931\u8D25\uFF1A"+i.message)}if(md(e)&&g.archiveKind==="world"){ud(e);return}if(/\.nbt$/i.test(e)){Us(e);return}if(he(e).toLowerCase()==="level.dat")try{let i=Qa(t);g.level={nbt:i.nbt,original:t,fields:mr(i.plain)},n.appendChild(hd());return}catch(i){A("level.dat \u89E3\u6790\u5931\u8D25\uFF1A"+i.message)}if(na(e,t)){let i=g.archive.getText(e),o=600*1024,r=i.length>o;r&&A("\u6587\u4EF6\u8F83\u5927\uFF08"+it(t.length)+"\uFF09\uFF0C\u53EA\u8F7D\u5165\u524D 600KB \u9884\u89C8\uFF0C\u907F\u514D\u5361\u987F");let s=$d(e,r?i.slice(0,o):i,r),l=s.ta;n.appendChild(s.wrap);let c=document.createElement("div");c.className="edbar";let m=document.createElement("button");m.textContent="\u4FDD\u5B58\u4FEE\u6539";let u=document.createElement("button");u.textContent="\u4E0B\u8F7D\u6B64\u6587\u4EF6",u.className="ghost",m.onclick=()=>{if(r&&l.value===i.slice(0,o))return O("\u8FD9\u662F\u622A\u65AD\u9884\u89C8\uFF0C\u672A\u6539\u52A8\u5185\u5BB9\uFF0C\u4E0D\u4FDD\u5B58\u4EE5\u514D\u622A\u6389\u540E\u534A\u90E8\u5206");g.archive.setBytes(e,new TextEncoder().encode(l.value)),g.statsDirty=!0;let p=a.querySelector(".muted");p&&(p.textContent="\u3000"+it(new TextEncoder().encode(l.value).length)),A("\u5DF2\u4FDD\u5B58\uFF1A"+e+"\uFF08\u8BB0\u5F97\u70B9\u53F3\u4E0A\u89D2\u201C\u5BFC\u51FA/\u53E6\u5B58\u201D\u751F\u6210\u65B0\u5305\uFF09"),pe()},u.onclick=()=>fa(e),c.appendChild(m),c.appendChild(u),n.appendChild(c)}else if(/^(\.png|\.jpe?g|\.gif|\.webp|\.bmp)$/i.test(nn(e))){let i=document.createElement("div");i.className="imgview";let o=document.createElement("img");o.className="pixelimg",o.style.maxHeight="320px";let r=document.createElement("p");r.className="muted",r.textContent="\u8BFB\u53D6\u56FE\u7247\u2026",o.onload=()=>{r.textContent="\u5C3A\u5BF8 "+o.naturalWidth+"\xD7"+o.naturalHeight+"\u3000\u683C\u5F0F "+nn(e).slice(1).toUpperCase()+"\u3000\u5927\u5C0F "+it(t.length)+"\u3000\u70B9\u201C\u653E\u5927\u201D\u770B\u50CF\u7D20\u7EC6\u8282"},o.onerror=()=>{r.textContent="\u8FD9\u5F20\u56FE\u6D4F\u89C8\u5668\u65E0\u6CD5\u76F4\u63A5\u6E32\u67D3\uFF08\u53EF\u80FD\u662F\u635F\u574F\u6587\u4EF6\u6216\u4E0D\u652F\u6301\u7684\u5B50\u683C\u5F0F\uFF09\uFF0C\u53EF\u4E0B\u8F7D\u540E\u7528\u5176\u5B83\u5DE5\u5177\u6253\u5F00"},o.src=Is(e,t),i.appendChild(o),i.appendChild(r),n.appendChild(i);let s=document.createElement("div");s.className="edbar";let l=1,c=document.createElement("button");c.textContent="\u653E\u5927 \xD72",c.className="ghost",c.onclick=()=>{l=l>=8?1:l*2,o.style.width=o.naturalWidth*l+"px",o.style.maxWidth="none",c.textContent=l===1?"\u653E\u5927 \xD72":"\u8FD8\u539F \xD71".replace("\xD71","\xD71\uFF08\u5F53\u524D \xD7"+l+"\uFF09")};let m=document.createElement("button");m.textContent="\u4E0B\u8F7D\u6B64\u6587\u4EF6",m.onclick=()=>fa(e);let u=document.createElement("button");u.textContent="\u7528\u672C\u5730\u6587\u4EF6\u66FF\u6362",u.className="ghost",u.onclick=()=>$i(e),s.appendChild(c),s.appendChild(m),s.appendChild(u),n.appendChild(s);let p=document.createElement("p");p.className="muted",p.textContent="\u8FD9\u662F\u53EA\u8BFB\u9884\u89C8\uFF1A\u6539\u56FE\u8BF7\u5148\u4E0B\u8F7D\uFF0C\u6216\u70B9\u201C\u7528\u672C\u5730\u6587\u4EF6\u66FF\u6362\u201D\u5BFC\u5165\u540C\u540D\u6587\u4EF6\uFF0C\u518D\u5BFC\u51FA\u65B0\u5305\u3002",n.appendChild(p)}else if(/.(png|jpg|jpeg|gif|webp|bmp)$/i.test(e)){let i=document.createElement("img");i.src=Is(e,g.archive.getBytes(e)),i.style.maxWidth="100%",i.style.borderRadius="8px",n.appendChild(i);let o=document.createElement("p");o.className="muted",o.textContent="\u56FE\u7247\u53EA\u8BFB\u9884\u89C8\uFF0C\u53EF\u7528\u201C\u7528\u672C\u5730\u6587\u4EF6\u66FF\u6362\u201D\u6362\u56FE\u540E\u518D\u5BFC\u51FA\u3002",n.appendChild(o);let r=document.createElement("div");r.className="edbar";let s=document.createElement("button");s.textContent="\u4E0B\u8F7D\u6B64\u6587\u4EF6",s.onclick=()=>fa(e);let l=document.createElement("button");l.textContent="\u7528\u672C\u5730\u6587\u4EF6\u66FF\u6362",l.className="ghost",l.onclick=()=>$i(e),r.appendChild(s),r.appendChild(l),n.appendChild(r)}else{let i=document.createElement("p");i.className="muted",i.textContent="\u4E8C\u8FDB\u5236\u6587\u4EF6\uFF0C\u65E0\u6CD5\u76F4\u63A5\u7F16\u8F91\u3002\u53EF\u4EE5\u4E0B\u8F7D\u51FA\u6765\u7528\u5176\u5B83\u5DE5\u5177\u5904\u7406\uFF0C\u6216\u7528\u201C\u5220\u9664\u201D\u540E\u91CD\u65B0\u5BFC\u5165\u540C\u540D\u6587\u4EF6\u3002",n.appendChild(i);let o=document.createElement("div");o.className="edbar";let r=document.createElement("button");r.textContent="\u4E0B\u8F7D\u6B64\u6587\u4EF6",r.onclick=()=>fa(e);let s=document.createElement("button");s.textContent="\u7528\u672C\u5730\u6587\u4EF6\u66FF\u6362",s.className="ghost",s.onclick=()=>$i(e),o.appendChild(r),o.appendChild(s),n.appendChild(o)}}function Is(e,n){let t={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",bmp:"image/bmp"}[nn(e).slice(1).toLowerCase()]||"application/octet-stream",a="",i=32768;for(let o=0;o<n.length;o+=i)a+=String.fromCharCode.apply(null,n.subarray(o,o+i));return"data:"+t+";base64,"+btoa(a)}function ne(e){return String(e).replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function hd(){let e=g.level.fields,n=document.createElement("div");return n.className="form",n.innerHTML=`
    <h3>\u5B58\u6863\u8BBE\u7F6E\uFF08level.dat\uFF09</h3>
    <label>\u4E16\u754C\u540D\u79F0</label><input id="lvName" value="${ne(e.levelName)}">
    <label>\u6E38\u620F\u6A21\u5F0F</label>
    <select id="lvMode">
      <option value="0">\u751F\u5B58</option><option value="1">\u521B\u9020</option>
      <option value="2">\u5192\u9669</option><option value="6">\u65C1\u89C2</option>
    </select>
    <label>\u96BE\u5EA6</label>
    <select id="lvDiff">
      <option value="0">\u548C\u5E73</option><option value="1">\u7B80\u5355</option>
      <option value="2">\u666E\u901A</option><option value="3">\u56F0\u96BE</option>
    </select>
    <div class="row2">
      <div><label>\u786C\u6838\u6A21\u5F0F</label><input type="checkbox" id="lvHard" ${e.hardcore?"checked":""}></div>
      <div><label>\u5141\u8BB8\u4F5C\u5F0A</label><input type="checkbox" id="lvCheat" ${e.cheats?"checked":""}></div>
      <div><label>\u4FDD\u7559\u7269\u54C1</label><input type="checkbox" id="lvKeep" ${e.keepInventory?"checked":""}></div>
    </div>
    <label>\u51FA\u751F\u70B9 X / Y / Z</label>
    <div class="row3">
      <input id="lvSx" type="number" value="${e.spawnX}">
      <input id="lvSy" type="number" value="${e.spawnY}">
      <input id="lvSz" type="number" value="${e.spawnZ}">
    </div>
    <label>\u4E16\u754C\u65F6\u95F4\uFF08tick\uFF09</label><input id="lvTime" type="number" value="${e.time}">
    <label>\u6E38\u620F\u5185\u5929\u6570\uFF081 \u5929 = 24000 tick\uFF09</label><input id="lvDays" type="number" value="${Math.floor(e.time/24e3)}">
    <div class="edbar"><button id="lvFullNbt" class="ghost">\u5B8C\u6574 NBT \u7F16\u8F91\uFF08\u5929\u6570 / \u672A\u7761\u89C9\u8BA1\u6570 / \u5168\u90E8\u5B57\u6BB5\uFF09</button>${g.archive.get("level.dat.bak")?'<button id="lvRestore" class="ghost">\u8FD8\u539F level.dat \u5907\u4EFD</button>':""}</div>
    <label>\u79CD\u5B50\uFF08\u6539\u5B8C\u4E0D\u4F1A\u91CD\u5EFA\u5730\u5F62\uFF0C\u53EA\u6539\u5143\u6570\u636E\uFF09</label><input id="lvSeed" value="${ne(e.seed)}">
    <div class="edbar"><button id="lvSave">\u4FDD\u5B58\u5230\u5B58\u6863</button></div>
    <p class="muted">\u4FDD\u5B58\u540E\u4F1A\u5199\u56DE\u538B\u7F29\u5305\u5185\u7684 level.dat\uFF1B\u70B9\u201C\u5BFC\u51FA/\u53E6\u5B58\u201D\u624D\u4F1A\u751F\u6210\u65B0\u7684 .mcworld / .mctemplate\u3002</p>`,setTimeout(()=>{if(!n.querySelector("#lvMode"))return;document.getElementById("lvMode").value=String(e.gameType),document.getElementById("lvDiff").value=String(e.difficulty),document.getElementById("lvFullNbt").onclick=()=>Us("level.dat");let t=document.getElementById("lvRestore");t&&(t.onclick=()=>{g.archive.setBytes("level.dat",g.archive.getBytes("level.dat.bak")),g.statsDirty=!0,A("\u5DF2\u4ECE level.dat.bak \u8FD8\u539F"),jt("level.dat")}),document.getElementById("lvSave").onclick=()=>{let a={levelName:document.getElementById("lvName").value,gameType:Number(document.getElementById("lvMode").value),difficulty:Number(document.getElementById("lvDiff").value),hardcore:document.getElementById("lvHard").checked,cheats:document.getElementById("lvCheat").checked,keepInventory:document.getElementById("lvKeep").checked,spawnX:Number(document.getElementById("lvSx").value),spawnY:Number(document.getElementById("lvSy").value),spawnZ:Number(document.getElementById("lvSz").value),time:(()=>{let i=Number(document.getElementById("lvTime").value)||0,o=Number(document.getElementById("lvDays").value);return Number.isFinite(o)&&o!==Math.floor(i/24e3)?o*24e3+i%24e3:i})(),seed:document.getElementById("lvSeed").value};try{g.archive.get("level.dat.bak")||g.archive.setBytes("level.dat.bak",g.level.original);let i=dr(g.level.nbt,a),o=ei(g.level.original,i);g.archive.setBytes("level.dat",o),g.statsDirty=!0,A("\u5DF2\u66F4\u65B0 level.dat\uFF08\u539F\u6587\u4EF6\u5DF2\u5B58\u4E3A level.dat.bak\uFF09"),pe()}catch(i){O(i.message)}}},0),n}var Ds={1:"Byte",2:"Short",3:"Int",4:"Long",5:"Float",6:"Double",7:"ByteArray",8:"String",9:"List",10:"Compound",11:"IntArray",12:"LongArray"};function _d(e){try{return{res:me(e,0,!0),little:!0}}catch(n){return{res:me(e,0,!1),little:!1}}}function Us(e){let n;try{n=g.archive.getBytes(e)}catch(o){return O(o.message)}let t;try{he(e).toLowerCase()==="level.dat"?t={res:Kt(n,!0),little:!0}:t=_d(n)}catch(o){return O("NBT \u89E3\u6790\u5931\u8D25\uFF1A"+o.message)}g.nbtEdit={res:t.res,little:t.little,path:e,original:n},C("workspace").style.display="none",C("structureView").style.display="block",C("structureView").innerHTML=`
    <div class="edbar"><button id="nbtBack" class="ghost">\u8FD4\u56DE\u6587\u4EF6\u5217\u8868</button><span class="muted">${ne(e)}</span></div>
    <h3>NBT \u7F16\u8F91\u5668</h3>
    <p class="muted">\u6839\u6807\u7B7E\uFF1ACompound\uFF08${Object.keys(t.res.root.value||{}).length} \u4E2A\u952E\uFF09\u3000\u5B57\u8282\u5E8F\uFF1A${t.little?"\u5C0F\u7AEF":"\u5927\u7AEF"}\u3000\u6539\u5B8C\u70B9\u4FDD\u5B58\u5199\u56DE\u6587\u4EF6\u3002</p>
    <div id="nbtRoot" class="nbtree"></div>
    <h3>\u65B0\u589E\u6807\u7B7E</h3>
    <div class="form">
      <input id="nbtNewName" placeholder="\u952E\u540D\uFF0C\u4F8B\u5982 Time">
      <div class="row2"><select id="nbtNewType">${Object.entries(Ds).filter(([o])=>+o<=8).map(([o,r])=>`<option value="${o}">${r}</option>`).join("")}</select>
      <input id="nbtNewVal" placeholder="\u503C\uFF0C\u4F8B\u5982 24000"></div>
      <div class="edbar"><button id="nbtAdd">\u6DFB\u52A0</button></div>
    </div>
    <div class="edbar"><button id="nbtSave">\u4FDD\u5B58\u5E76\u5199\u56DE</button><button id="nbtExport" class="ghost">\u5BFC\u51FA .nbt</button><button id="nbtExportJson" class="ghost">\u5BFC\u51FA JSON</button></div>`;let a=document.getElementById("nbtRoot"),i=()=>{a.innerHTML="";for(let[o,r]of Object.entries(g.nbtEdit.res.root.value||{}))a.appendChild(Ti(o,r,()=>{delete g.nbtEdit.res.root.value[o],i()}))};g.nbtRedraw=i,i(),document.getElementById("nbtBack").onclick=()=>{C("structureView").style.display="none",C("workspace").style.display="block"},document.getElementById("nbtAdd").onclick=()=>{let o=document.getElementById("nbtNewName").value.trim(),r=Number(document.getElementById("nbtNewType").value),s=document.getElementById("nbtNewVal").value;if(!o)return O("\u952E\u540D\u4E0D\u80FD\u4E3A\u7A7A");g.nbtEdit.res.root.value[o]={t:r,v:Fs(r,s)},i(),A("\u5DF2\u6DFB\u52A0\u6807\u7B7E "+o)},document.getElementById("nbtSave").onclick=()=>{try{let o=e==="level.dat"?ei(g.nbtEdit.original,g.nbtEdit.res):Be(g.nbtEdit.res,g.nbtEdit.little);g.archive.setBytes(e,o),A("\u5DF2\u5199\u56DE\uFF1A"+e+"\uFF08"+o.length+" \u5B57\u8282\uFF09")}catch(o){O("\u4FDD\u5B58\u5931\u8D25\uFF1A"+o.message)}},document.getElementById("nbtExportJson").onclick=async()=>{let o=JSON.stringify(Ee(g.nbtEdit.res),null,2);await Ce(he(e)+".json",new TextEncoder().encode(o))},document.getElementById("nbtExport").onclick=async()=>{await Ce(he(e)==="level.dat"?"level.nbt":he(e),Be(g.nbtEdit.res,g.nbtEdit.little))},A("\u5DF2\u6253\u5F00 NBT\uFF1A"+e)}function Fs(e,n){if(e===8)return String(n);let t=Number(n);if(!Number.isFinite(t))throw new Error("\u4E0D\u662F\u5408\u6CD5\u6570\u5B57\uFF1A"+n);return e===1?t<<24>>24:e===2?t<<16>>16:e===3?t|0:t}function Ti(e,n,t){var o;let a=document.createElement("div");a.className="nbtr";let i=document.createElement("div");if(i.className="nbtk",i.innerHTML=`<b>${ne(e)}</b><span class="muted">${Ds[n.t]||"?"}</span><button class="nbtdel ghost">\u5220</button>`,i.querySelector(".nbtdel").onclick=r=>{r.stopPropagation(),t&&t()},a.appendChild(i),n.t===10){let r=document.createElement("div");r.className="nbtkids";for(let[s,l]of Object.entries(n.v||{}))r.appendChild(Ti(s,l,()=>{delete n.v[s],a.remove()}));a.appendChild(r)}else if(n.t===9){let r=document.createElement("div");r.className="nbtkids",(n.v||[]).forEach((s,l)=>r.appendChild(Ti("["+l+"]",s,()=>{n.v.splice(l,1),g.nbtRedraw&&g.nbtRedraw()}))),a.appendChild(r)}else if(n.t===7||n.t===11||n.t===12){let r=document.createElement("input");r.className="nbtv",r.value=Array.from(n.v||[]).join(","),r.onchange=()=>{let s=r.value.split(",").map(l=>Number(l.trim())).filter(l=>Number.isFinite(l));n.v=n.t===7?new Uint8Array(s):s,A("\u5DF2\u4FEE\u6539 "+e)},a.appendChild(r)}else{let r=document.createElement("input");r.className="nbtv",r.type=n.t===8?"text":"number",r.value=String((o=n.v)!=null?o:""),r.onchange=()=>{try{n.v=Fs(n.t,r.value),A("\u5DF2\u4FEE\u6539 "+e+" = "+n.v)}catch(s){O(s.message)}},a.appendChild(r)}return a}function ji(e){let n=String(e).replace(/^\uFEFF/,"");return n=n.replace(/\/\*[\s\S]*?\*\//g,""),n=n.replace(/^\s*\/\/.*$/gm,""),n=n.replace(/,\s*([}\]])/g,"$1"),JSON.parse(n)}function Rs(){if(g.texIndex)return g.texIndex;let e=new Map,n=(t,a)=>{try{let i=t.paths(),o=i.filter(r=>r.toLowerCase().endsWith(".png"));for(let r of i)if(/terrain_texture\.json$/i.test(r))try{let s=ji(t.getText(r)),c=r.slice(0,r.lastIndexOf("/")).replace(/\/textures$/,"");for(let[m,u]of Object.entries(s.texture_data||{})){let p=Array.isArray(u.textures)?u.textures[0]:u.textures;if(p&&typeof p=="object"&&(p=p.path||p.texture),typeof p!="string")continue;let d=p.replace(/^textures\//,"").replace(/\.png$/,""),b=(c+"/textures/"+d+".png").toLowerCase(),_=o.find(f=>f.toLowerCase()===b)||o.find(f=>f.toLowerCase().endsWith("/textures/"+d.toLowerCase()+".png"));if(_)for(let f of[m,"minecraft:"+m])!a&&e.has(f)||e.set(f,{src:t,path:_})}A("\u6750\u8D28\u6E05\u5355 "+r+"\uFF1A"+Object.keys(s.texture_data||{}).length+" \u6761")}catch(s){A("\u6750\u8D28\u6E05\u5355\u89E3\u6790\u5931\u8D25 "+r+"\uFF1A"+s.message)}}catch(i){}};g.archive&&n(g.archive,!1);for(let t of g.texPacks||[])n(t,!1);return g.texIndex=e,e}function Ls(e){if(!e)return null;let n=Rs(),t=n.get(e)||n.get("minecraft:"+e);if(!t)return null;let a=(t.src===g.archive?"":"ext:")+t.path;if(g.texCache&&g.texCache.has(a))return g.texCache.get(a);if(g.texCache||(g.texCache=new Map),g.texPending||(g.texPending=new Set),g.texPending.has(a))return null;g.texPending.add(a);try{let i=t.src.getBytes(t.path),o=URL.createObjectURL(new Blob([i],{type:"image/png"})),r=new Image;r.onload=()=>{g.texCache.set(a,r),g.texPending.delete(a),g.stEdit&&g.stEdit.redraw&&g.stEdit.redraw()},r.onerror=()=>{g.texPending.delete(a)},r.src=o}catch(i){g.texPending.delete(a)}return null}function Ns(e){if(!e)return null;let n=0;for(let t=0;t<e.length;t++)n=(n*31+e.charCodeAt(t))%360;return"hsl("+n+",48%,48%)"}function tn(){let e=g.structure,n=ur(e),[t,a,i]=e.size,o=Rs().size;g.texLogged||(g.texLogged=!0,A("\u5DF2\u5EFA\u7ACB\u65B9\u5757\u8D34\u56FE\u7D22\u5F15\uFF1A"+o+" \u6761\uFF08\u6765\u81EA\u8D44\u6E90\u5305 terrain_texture.json\uFF09")),g.stEdit||(g.stEdit={y:Math.floor(a/2),block:""}),g.stEdit.y>=a&&(g.stEdit.y=a-1);let r=g.stEdit,s=[...new Set(e.palette.map(f=>f.name))].filter(Boolean);C("structureView").innerHTML=`
    <div class="edbar"><button id="stBack" class="ghost">\u8FD4\u56DE\u6587\u4EF6\u5217\u8868</button><span class="muted">${g.structurePath?ne(g.structurePath):"\u72EC\u7ACB\u7ED3\u6784\u6587\u4EF6"}</span></div>
    <div class="cards">
      <div class="card"><span>\u5C3A\u5BF8 X\xD7Y\xD7Z</span><b>${n.size}</b></div>
      <div class="card"><span>\u65B9\u5757\u6570</span><b>${ue(n.blocks)}</b></div>
      <div class="card"><span>\u8C03\u8272\u677F</span><b>${n.paletteTypes}</b></div>
      <div class="card"><span>\u5B9E\u4F53</span><b>${n.entities}</b></div>
    </div>

    <h3>\u5207\u7247\u7F16\u8F91\u5668</h3>
    <div class="edbar"><button id="stPrevY" class="ghost">\u25C0 \u4E0B\u4E00\u5C42</button><span class="muted">Y = <b id="stYLabel">${r.y}</b> / ${a-1}</span><button id="stNextY" class="ghost">\u4E0A\u4E00\u5C42 \u25B6</button></div>
    <div class="mapwrap" style="text-align:center"><canvas id="stSlice" style="width:100%;max-width:360px;image-rendering:pixelated"></canvas></div>
    <div class="edbar"><button id="stTexLoad" class="ghost">\u5BFC\u5165\u6750\u8D28\u5305\uFF08\u539F\u7248/\u6A21\u7EC4 .mcpack/.zip\uFF09</button><span class="muted" id="stTexInfo">\u8D34\u56FE ${o} \u6761${"\u3000\u7F3A\u8D34\u56FE "+s.filter(h=>!Ls(h)).length+"/"+s.length}</span><input type="file" id="stTexFile" multiple accept=".mcpack,.zip,.mcaddon" style="display:none"></div>
    <p class="muted" id="stPick">\u70B9\u683C\u5B50\u9009\u4E2D\u5750\u6807\uFF1B\u5148\u9009\u4E0B\u9762\u8C03\u8272\u677F\u91CC\u7684\u65B9\u5757\uFF0C\u518D\u70B9\u683C\u5B50\u5C31\u4F1A\u653E\u7F6E\u3002</p>

    <label>\u8C03\u8272\u677F\uFF08\u70B9\u9009\u8981\u653E\u7F6E\u7684\u65B9\u5757\uFF09</label>
    <input id="stSearch" placeholder="\u641C\u7D22\u65B9\u5757\u540D\uFF0C\u4F8B\u5982 stone / \u77F3\u5934">
    <div id="stPalette" class="chips">${s.map(f=>`<span class="chip" data-name="${ne(f)}"><span class="dot" style="background:${Ns(f)||"#333"}"></span>${ne(ha(f))}<i>${ue(e.counts.get(f)||0)}</i></span>`).join("")}<span class="chip" data-name="" data-clear="1">\u7A7A / \u5220\u9664</span></div>

    <h3>\u6309\u5750\u6807\u4FEE\u6539</h3>
    <div class="form">
      <div class="row3"><input id="stX" type="number" placeholder="X"><input id="stY" type="number" placeholder="Y"><input id="stZ" type="number" placeholder="Z"></div>
      <label>\u65B9\u5757 ID\uFF08\u7559\u7A7A = \u5220\u9664\u8BE5\u683C\uFF09</label><input id="stBlock" placeholder="minecraft:glass">
      <div class="edbar"><button id="stSet">\u5199\u5165\u65B9\u5757</button></div>
    </div>

    <h3>\u6279\u91CF\u66FF\u6362 / \u5BFC\u51FA</h3>
    <div class="form">
      <label>\u628A\u54EA\u79CD\u65B9\u5757\u6362\u6210\u54EA\u79CD\uFF08\u53EA\u6539\u8C03\u8272\u677F\uFF09</label>
      <div class="row3"><input id="stFrom" placeholder="\u539F ID"><input id="stTo" placeholder="\u65B0 ID"><button id="stReplace">\u66FF\u6362</button></div>
      <div class="edbar"><button id="stSave" class="ghost">\u5BFC\u51FA\u7ED3\u6784</button>${g.structurePath?'<button id="stWriteBack">\u4FDD\u5B58\u56DE\u5F53\u524D\u5305</button>':""}</div>
    </div>`;let l=document.getElementById("stSlice"),c=()=>{let f=Math.max(2,Math.floor(360/Math.max(t,i,1)));l.width=t*f,l.height=i*f;let h=l.getContext("2d");h.fillStyle="#0b0f15",h.fillRect(0,0,l.width,l.height);let y=e.indices[0]||[],v=t*i>4e5?Math.ceil(Math.sqrt(t*i/4e5)):1;for(let w=0;w<t;w+=v)for(let M=0;M<i;M+=v){let $=y[(w*i+M)*a+r.y];if($<0||$===void 0)continue;let B=e.palette[$],z=B&&B.name?Ls(B.name):null;if(z&&z.complete&&z.naturalWidth)h.drawImage(z,w*f,M*f,f,f);else{let S=Ns(B&&B.name);if(!S)continue;h.fillStyle=S,h.fillRect(w*f,M*f,f,f)}}},m=()=>{document.getElementById("stYLabel").textContent=r.y};r.redraw=c,c();let u=document.getElementById("stTexLoad"),p=document.getElementById("stTexFile");u&&(u.onclick=()=>p.click()),p&&(p.onchange=async()=>{let f=[...p.files];if(f.length){A("\u6B63\u5728\u8BFB\u53D6\u6750\u8D28\u5305\uFF1A"+f.length+" \u4E2A");for(let h of f)try{let y=await ga(h);Gt(h.name,y)==="zip"&&g.texPacks.push(Oe.fromBytes(h.name,y))}catch(y){A("\u6750\u8D28\u5305\u8BFB\u53D6\u5931\u8D25\uFF1A"+h.name+"\uFF08"+y.message+"\uFF09")}g.texIndex=null,g.texCache=new Map,g.texPending=new Set,g.texLogged=!1,tn(),A("\u6750\u8D28\u5305\u5DF2\u52A0\u8F7D\uFF1A"+g.texPacks.length+" \u4E2A")}}),document.getElementById("stBack").onclick=()=>{C("structureView").style.display="none",g.structurePath=null,C("workspace").style.display="block"},document.getElementById("stPrevY").onclick=()=>{r.y=Math.max(0,r.y-1),m(),c()},document.getElementById("stNextY").onclick=()=>{r.y=Math.min(a-1,r.y+1),m(),c()};let d=document.getElementById("stPalette"),b=()=>d.querySelectorAll(".chip").forEach(f=>f.classList.toggle("on",(f.dataset.name||"")===r.block&&!f.dataset.clear));b(),d.querySelectorAll(".chip").forEach(f=>{f.onclick=()=>{r.block=f.dataset.clear?"":f.dataset.name,document.getElementById("stBlock").value=r.block,b()}}),document.getElementById("stSearch").oninput=f=>{let h=f.target.value.trim().toLowerCase();d.querySelectorAll(".chip").forEach(y=>{let v=y.dataset.name||"";y.style.display=!h||v.toLowerCase().includes(h)||ha(v).includes(h)?"":"none"})},l.onclick=f=>{let h=l.getBoundingClientRect(),y=h.width||l.width||1,v=h.height||l.height||1,w=Math.min(t-1,Math.max(0,Math.floor((f.clientX-h.left)/y*t))),M=Math.min(i-1,Math.max(0,Math.floor((f.clientY-h.top)/v*i))),$=(w*i+M)*a+r.y,B=(e.indices[0]||[])[$],z=B>=0&&e.palette[B]?e.palette[B].name:"\u7A7A\u6C14";if(document.getElementById("stX").value=w,document.getElementById("stY").value=r.y,document.getElementById("stZ").value=M,document.getElementById("stPick").textContent=`\u9009\u4E2D (${w}, ${r.y}, ${M})\uFF1A${ha(z)}\uFF08${z}\uFF09`+(r.block?"\u3000\u2192 \u518D\u70B9\u4E00\u6B21\u5373\u653E\u7F6E":""),r.block)try{ii(e,w,r.y,M,r.block),A("\u5DF2\u653E\u7F6E "+r.block+` @ ${w},${r.y},${M}`),g.stEdit.keepY=!0,tn()}catch(S){O(S.message)}};let _=document.getElementById("stWriteBack");_&&(_.onclick=()=>{g.structurePath&&(g.archive.setBytes(g.structurePath,ai(e)),A("\u5DF2\u5199\u56DE\uFF1A"+g.structurePath+"\uFF08\u8BB0\u5F97\u5BFC\u51FA\uFF09"))}),document.getElementById("stSet").onclick=()=>{let f=Number(document.getElementById("stX").value||0),h=Number(document.getElementById("stY").value||0),y=Number(document.getElementById("stZ").value||0),v=document.getElementById("stBlock").value.trim();try{v?ii(e,f,h,y,v):fr(e,f,h,y),A((v?"\u5DF2\u5199\u5165 "+v:"\u5DF2\u6E05\u9664\u65B9\u5757")+` @ ${f},${h},${y}`),r.y=Math.min(a-1,Math.max(0,h)),tn()}catch(w){O(w.message)}},document.getElementById("stReplace").onclick=()=>{let f=document.getElementById("stFrom").value.trim(),h=document.getElementById("stTo").value.trim();if(!f||!h)return O("\u4E24\u4E2A\u65B9\u5757 ID \u90FD\u8981\u586B");let y=pr(e,f,h);A("\u5DF2\u66FF\u6362 "+y+" \u4E2A\u8C03\u8272\u677F\u6761\u76EE"),tn()},document.getElementById("stSave").onclick=async()=>{let f=await Ke("\u5BFC\u51FA\u7ED3\u6784\u6587\u4EF6",[{key:"name",label:"\u6587\u4EF6\u540D",value:g.name.replace(/\.[^.]+$/,"")+"_edit.mcstructure"}]);!f||!f.name||(C("structureView").style.display="block",await Ce(f.name,ai(e)))}}async function bd(){if(!g.selected)return O("\u5148\u5728\u5217\u8868\u91CC\u9009\u4E00\u4E2A\u6587\u4EF6\u6216\u6587\u4EF6\u5939");let e=!g.archive.get(g.selected),n=g.selected,t=await Ke(e?"\u91CD\u547D\u540D\u6587\u4EF6\u5939":"\u91CD\u547D\u540D\u6587\u4EF6\uFF08\u53EF\u6539\u540E\u7F00\uFF09",[{key:"name",label:"\u65B0\u540D\u79F0",value:he(n)}]);if(!t||!t.name)return;let a=t.name.replace(/\//g,"").trim();if(!a)return;let i=n.includes("/")?n.slice(0,n.lastIndexOf("/")):"",o=i?i+"/"+a:a;if(g.archive.paths().includes(o))return O("\u540C\u540D\u6587\u4EF6\u5DF2\u5B58\u5728");g.archive.rename(n,o,e),g.selected=null,pe(),A("\u5DF2\u91CD\u547D\u540D\uFF1A"+n+" \u2192 "+o)}async function gd(){if(!g.selected)return O("\u5148\u9009\u4E00\u4E2A\u6587\u4EF6\u6216\u6587\u4EF6\u5939");let e=g.selected,n=!g.archive.get(e),t=await Ke("\u5220\u9664\u786E\u8BA4",[{key:"ok",label:"\u8F93\u5165 DELETE \u786E\u8BA4\u5220\u9664 "+e}]);!t||t.ok!=="DELETE"||(g.archive.remove(e),g.selected=null,C("editor").innerHTML="",pe(),A("\u5DF2\u5220\u9664\uFF1A"+e))}async function yd(){let e=await Ke("\u65B0\u5EFA\u6587\u4EF6",[{key:"path",label:"\u8DEF\u5F84\uFF08\u53EF\u542B\u6587\u4EF6\u5939\uFF09",placeholder:"scripts/new.js"}]);if(!e||!e.path)return;let n=e.path.trim().replace(/^\/+/,"");g.archive.setBytes(n,new TextEncoder().encode("")),pe(),jt(n),A("\u5DF2\u65B0\u5EFA\uFF1A"+n)}async function vd(){let e=await Ke("\u65B0\u5EFA\u6587\u4EF6\u5939",[{key:"path",label:"\u6587\u4EF6\u5939\u8DEF\u5F84",placeholder:"scripts/utils"}]);if(!e||!e.path)return;let n=e.path.trim().replace(/^\/+/,"").replace(/\/+$/,"");g.archive.setBytes(n+"/.keep",new Uint8Array(0)),pe(),A("\u5DF2\u65B0\u5EFA\u6587\u4EF6\u5939\uFF1A"+n)}async function $i(e){let n=document.createElement("input");n.type="file",n.onchange=async()=>{let t=n.files[0];if(!t)return;let a=await ga(t);g.archive.setBytes(e,a),A("\u5DF2\u66FF\u6362\uFF1A"+e),pe(),jt(e)},n.click()}function fa(e){let n=g.archive.getBytes(e);Ce(he(e),n)}async function Ce(e,n,t){let a=t||id(n);if(window.AndroidBridge&&window.AndroidBridge.saveBinary){let r=window.AndroidBridge.saveBinary(e,a);String(r).startsWith("ERR")?O("\u4FDD\u5B58\u5931\u8D25\uFF1A"+r):A("\u5DF2\u4FDD\u5B58\u5230\u5E94\u7528\u5B58\u50A8\uFF1A"+r);return}let i=new Blob([n],{type:"application/octet-stream"}),o=document.createElement("a");o.href=URL.createObjectURL(i),o.download=e,o.click(),A("\u5DF2\u5BFC\u51FA\uFF1A"+e)}async function wd(){if(!g.archive)return O("\u8FD8\u6CA1\u6709\u6253\u5F00\u538B\u7F29\u5305");let e=g.archive.paths(),n=e.some(l=>/manifest\.json$/i.test(l))&&!e.includes("level.dat"),t=g.name?nn(g.name)||".mcpack":n?".mcaddon":".mcpack",i=(g.name?he(g.name).replace(/\.[^.]+$/,""):"MCBE\u9644\u52A0\u5305")+"_new"+t,o=await Ke("\u5BFC\u51FA / \u53E6\u5B58\u4E3A\uFF08\u53EF\u6539\u540E\u7F00\uFF09",[{key:"name",label:"\u6587\u4EF6\u540D\uFF08\u542B\u540E\u7F00\uFF09",value:i}]);if(!o||!o.name)return;let r=o.name.trim();A("\u6B63\u5728\u6253\u5305\uFF1A"+r+"\uFF08"+g.archive.files.length+" \u4E2A\u6587\u4EF6\uFF09"),await As();let s=g.archive.toBytes();await Ce(r,s),A("\u6253\u5305\u5B8C\u6210\uFF0C\u5927\u5C0F "+s.length+" \u5B57\u8282")}async function kd(){if(!g.archive)return O("\u5148\u6253\u5F00 .mcworld / .mctemplate");if(g.stats&&!g.statsDirty){Ii(g.stats),A("\u7528\u7F13\u5B58\u7684\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5185\u5BB9\u6709\u6539\u52A8\u4F1A\u81EA\u52A8\u91CD\u7B97\uFF09");return}let n=g.archive.paths().filter(t=>/(^|\/)(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/.test(t));if(!n.length)return O("\u8FD9\u4E2A\u5305\u91CC\u6CA1\u6709 LevelDB \u6570\u636E\u5E93\uFF08\u53EF\u80FD\u53EA\u662F\u9644\u52A0\u5305\uFF09");A("\u5F00\u59CB\u7EDF\u8BA1\uFF1A"+n.length+" \u4E2A LevelDB \u6587\u4EF6\u2026");try{let t=n.map(s=>{let l=g.archive.getBytes(s);return{name:he(s),arrayBuffer:async()=>l}}),{readLevelDb:a}=window.MCBE,i=await a(t,{});A("\u8BFB\u53D6 "+i.size+" \u6761\u952E\u503C");let o=g.archive.get("level.dat")?g.archive.getBytes("level.dat"):null,r={file:g.name,size:0};await Qn(i,r,o),g.stats=r,g.statsDirty=!1,Ii(r)}catch(t){console.error(t),O(t.message)}}function Ii(e){var i,o,r,s,l;let n=e.level||{},t=(i=["\u751F\u5B58","\u521B\u9020","\u5192\u9669","\u65C1\u89C2"][n.gameType])!=null?i:n.gameType,a=(o=["\u548C\u5E73","\u7B80\u5355","\u666E\u901A","\u56F0\u96BE"][n.difficulty])!=null?o:n.difficulty;C("editor").innerHTML=`
    <h3>\u4E16\u754C\u7EDF\u8BA1</h3>
    <div class="cards">
      <div class="card"><span>\u4E16\u754C\u540D\u79F0</span><b>${(r=n.levelName)!=null?r:"-"}</b></div>
      <div class="card"><span>\u79CD\u5B50</span><b>${(s=n.seed)!=null?s:"-"}</b></div>
      <div class="card"><span>\u6A21\u5F0F</span><b>${t!=null?t:"-"} / ${a!=null?a:"-"}${n.hardcore?"\uFF08\u786C\u6838\uFF09":""}</b></div>
      <div class="card"><span>\u51FA\u751F\u70B9</span><b>${(l=n.spawn)!=null?l:"-"}</b></div>
    </div>
    <table><tbody>
      <tr><td>LevelDB \u952E\u6570</td><td>${ue(e.keys)}</td></tr>
      <tr><td>\u533A\u5757\u6570</td><td>${ue(e.chunks)}</td></tr>
      <tr><td>\u5B50\u533A\u5757\u6570</td><td>${ue(e.subchunks)}</td></tr>
      <tr><td>\u4E3B\u5C42\u65B9\u5757\u6570</td><td>${ue(e.blocks)}</td></tr>
      <tr><td>\u65B9\u5757\u79CD\u7C7B</td><td>${ue(e.blockTypes)}</td></tr>
      <tr><td>\u5B9E\u4F53</td><td>${ue(e.entities)}</td></tr>
      <tr><td>\u65B9\u5757\u5B9E\u4F53</td><td>${ue(e.blockEntities)}</td></tr>
    </tbody></table>
    <h3>\u65B9\u5757\u6392\u884C</h3>
    <table><tbody>${(e.blockList||[]).slice(0,40).map(c=>`<tr><td>${ha(c.name)}</td><td>${ue(c.count)}</td></tr>`).join("")}</tbody></table>
    <h3>\u5B9E\u4F53</h3>
    <table><tbody>${Object.entries(e.entitiesByType||{}).map(([c,m])=>`<tr><td>${ad(c)}</td><td>${ue(m)}</td></tr>`).join("")}</tbody></table>`}async function xd(){if(!g.archive)return O("\u5148\u6253\u5F00\u4E00\u4E2A .mcpack / .mcaddon / .mcworld");Ai();let e=g.archive.files.length;A("\u5F00\u59CB\u6C49\u5316\u2026"),await As();let n=Sr(g.archive),t=0;for(let a of g.archive.paths())/\.json$/i.test(a)&&/(^|\/)ui\//.test(a)&&(t+=Er(g.archive,a));for(let a of n)a.status==="no-lang"?A(`\xB7 ${a.pack}\uFF1A\u6CA1\u6709 texts/*.lang\uFF0C\u8DF3\u8FC7`):a.status==="already-zh"?A(`\xB7 ${a.pack}\uFF1A${a.where} \u91CC\u5DF2\u6709\u4E2D\u6587\uFF0C\u6309\u89C4\u5219\u4E0D\u91CD\u590D\u6C49\u5316`):A(`\xB7 ${a.pack}\uFF1A\u5DF2\u751F\u6210 ${a.file}\uFF0C\u7FFB\u8BD1 ${a.translated} \u6761`);t&&A(`\xB7 UI \u6587\u672C\uFF1A\u6539\u5199\u4E86 ${t} \u5904`),!n.length&&!t&&A("\u6CA1\u6709\u627E\u5230\u53EF\u6C49\u5316\u7684\u8BED\u8A00\u6587\u4EF6"),si(g.archive),A(`\u5B8C\u6210\u3002\u6587\u4EF6\u6570 ${e} \u2192 ${g.archive.files.length}\uFF0C\u8BB0\u5F97\u70B9\u201C\u5BFC\u51FA/\u53E6\u5B58\u201D\u3002`),pe()}function Sd(){let e=C("modal"),n=C("modalBody");n.innerHTML=`<h3>\u8BD1\u540D\u4FEE\u6B63</h3>
    <p class="muted">\u6BCF\u884C\u4E00\u6761\uFF0C\u683C\u5F0F <b>\u65B9\u5757id=\u4E2D\u6587</b>\uFF08\u53EF\u4EE5\u4E0D\u5199 minecraft:\uFF09\u3002\u4F8B\u5982 stone=\u77F3\u5757\u3002\u53EA\u4FDD\u5B58\u5728\u672C\u673A\uFF0C\u4E0D\u4F1A\u5185\u7F6E\u4EFB\u4F55\u56FA\u5B9A\u8BD1\u6587\u3002</p>
    <textarea id="fixText" class="code" style="height:30vh">${ne(Tr())}</textarea>
    <div class="modalbtns"><button id="fixSave">\u4FDD\u5B58\u5E76\u751F\u6548</button><button id="fixClear" class="ghost">\u6E05\u7A7A</button><button id="fixQuit" class="ghost">\u5173\u95ED</button></div>`,e.style.display="flex";let t=()=>{e.style.display="none"};document.getElementById("fixQuit").onclick=t,document.getElementById("fixClear").onclick=()=>{document.getElementById("fixText").value=""},document.getElementById("fixSave").onclick=()=>{let a=Ir(document.getElementById("fixText").value);t(),A("\u8BD1\u540D\u4FEE\u6B63\u5DF2\u4FDD\u5B58\uFF1A"+a+" \u6761\uFF08\u70B9\u4E16\u754C\u7EDF\u8BA1/\u4E16\u754C\u89C2\u770B\u5237\u65B0\u5373\u53EF\u770B\u5230\uFF09"),g.stats&&Ii(g.stats)}}async function ut(){return g.archive.paths().filter(n=>/(^|\/)(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/.test(n)).map(n=>{let t=g.archive.getBytes(n);return{path:n,name:he(n),arrayBuffer:async()=>t,data:t}})}async function Ed(){if(!g.archive)return O("\u5148\u6253\u5F00 .mcworld / .mctemplate");let e=await ut();if(!e.length)return O("\u8FD9\u4E2A\u5305\u91CC\u6CA1\u6709 LevelDB\uFF08\u9644\u52A0\u5305\u4E0D\u80FD\u770B\u5730\u56FE\uFF09");let{readLevelDb:n}=window.MCBE;try{let d=function(f){return f.chunkSet?f.chunkSet.size:f.chunks},b=function(f){let h=Bn(f.type,f.x*31+f.z*17),y=Math.max(4,Math.floor(560/h.size)),v=Xt(f.type,f.x*31+f.z*17);C("modalBody").innerHTML="<h3>"+ne(f.zh)+`\uFF08\u63A8\u6D4B\u5916\u5F62\uFF09</h3>
        <p class="muted">\u5750\u6807 `+f.x+", "+f.z+"\u3000\u4F30\u7B97 y\u2248"+f.y+"\u3000\u7FA4\u7CFB "+ne(f.biome)+`</p>
        <canvas id="structCv" width="`+h.size*y+'" height="'+h.size*y+`" style="width:100%;max-width:560px;image-rendering:pixelated;border-radius:8px"></canvas>
        <p class="muted">\u5916\u5F62\u6309\u7ED3\u6784\u7C7B\u578B\u89C4\u5219\u7A0B\u5E8F\u751F\u6210\uFF08\u542B\u7834\u635F/\u671D\u5411\u968F\u673A\uFF09\uFF0C\u7528\u4E8E\u770B\u5E03\u5C40\uFF0C\u4E0D\u7B49\u4E8E\u771F\u5B9E\u6A21\u677F\u3002\u5B9D\u7BB1\u53C2\u8003\uFF1A`+v.map($=>et($.name)+"\xD7"+$.count).join("\u3001")+`</p>
        <div class="modalbtns"><button id="stClose" class="ghost">\u5173\u95ED</button></div>`,C("modal").style.display="flex";let w=document.getElementById("structCv"),M=w.getContext("2d");M.fillStyle="#0b0f15",M.fillRect(0,0,w.width,w.height);for(let $ of h.blocks)M.fillStyle=tt($.block),M.fillRect($.x*y,$.z*y,y,y);document.getElementById("stClose").onclick=()=>{C("modal").style.display="none"}},t=g.db||await n(e,{});g.db=t;let a=0;try{let f=g.archive.getBytes("level.dat");if(f){let h=Qa(f);a=Number(h.plain.RandomSeed||0)}}catch(f){a=0}g.mapSeed=a;let i="surface",o=60,r=!0,s=512,l=!0,c=!0,m=1;g.mapCache||(g.mapCache={}),A("\u6B63\u5728\u626B\u63CF\u4E16\u754C\u2026\uFF08\u79CD\u5B50 "+a+"\uFF09");let u=async()=>{let f=i==="surface"?"surface":"y"+o,h=g.mapCache[f];h||(A(i==="surface"?"\u626B\u63CF\u5730\u8868\u2026":"\u626B\u63CF Y="+o+" \u8FD9\u4E00\u5C42\u2026"),h=await sa(t,i==="surface"?{}:{y:o,onProgress:v=>{v%128===0&&A("\u5DF2\u626B\u63CF "+v+" \u4E2A\u5B50\u533A\u5757")}}),g.mapCache[f]=h);let y=St(xe({},h),{cols:new Map(h.cols),chunkSet:h.chunkSet});return r&&Xr(y,{seed:a,y:i==="underground"?o:null,margin:s,caves:l}),y},p=async()=>{let f=await u();if(!f.cols.size)return O("\u6CA1\u6709\u89E3\u6790\u5230\u4EFB\u4F55\u65B9\u5757\u5217\uFF08\u53EF\u80FD\u662F\u7A7A\u5B58\u6863\u6216\u65B0\u683C\u5F0F\uFF09");g.surface=f;let h=f.maxX-f.minX+1,y=f.maxZ-f.minZ+1,v=h>1100?1:h>700?2:3,w=document.getElementById("mapCanvas");if(Kr(w,f,v),c){let B=Yr(f,{seed:a,margin:0});g.structures=B;let z=w.getContext("2d");for(let S of B){let T=(S.x-f.minX)*v,L=(S.z-f.minZ)*v;T<0||L<0||T>w.width||L>w.height||(z.fillStyle=S.color,z.fillRect(T-2,L-2,5,5),z.strokeStyle="#0b0f15",z.lineWidth=1,z.strokeRect(T-2.5,L-2.5,6,6))}A("\u7ED3\u6784\u63A8\u6D4B\uFF1A"+B.length+" \u5904\uFF08\u6309\u7FA4\u7CFB\u4E0E\u79CD\u5B50\u7F51\u683C\u653E\u7F6E\uFF0C\u975E\u771F\u5B9E\u7ED3\u6784\uFF09")}let M=(document.getElementById("mapWrap")&&document.getElementById("mapWrap").clientWidth||340)-6;g.zoomSet||(m=Math.max(.15,Math.min(1,M/w.width)));let $=()=>{w.style.width=Math.round(w.width*m)+"px",w.style.height=Math.round(w.height*m)+"px"};$(),g.applyZoom=$,w.onclick=B=>{if(g.mapDragged){g.mapDragged=!1;return}let z=w.getBoundingClientRect(),S=Math.floor((B.clientX-z.left)/z.width*w.width/v),T=Math.floor((B.clientY-z.top)/z.height*w.height/v),L=f.minX+S,D=f.minZ+T,U=(g.structures||[]).find(H=>Math.abs(H.x-L)<=8&&Math.abs(H.z-D)<=8);if(U){b(U);let H=Xt(U.type,U.x*31+U.z*17);document.getElementById("mapInfo").textContent=`${U.zh}\uFF08\u63A8\u6D4B\uFF09 \u5750\u6807 ${U.x}, ${U.z}\u3000y\u2248${U.y}\u3000\u7FA4\u7CFB ${U.biome}\u3000\u5B9D\u7BB1\u53C2\u8003\uFF1A`+H.map(X=>et(X.name)+"\xD7"+X.count).join("\u3001")}else document.getElementById("mapInfo").textContent=Gr(f,f.minX+S,f.minZ+T)},document.getElementById("mapMeta").textContent=(i==="surface"?"\u5730\u8868":"\u5730\u4E0B Y="+o)+(f.simStep>1?"\uFF08\u6A21\u62DF\u91C7\u6837\u6B65\u957F "+f.simStep+"\uFF09":"")+"\u3000\u771F\u5B9E\u533A\u5757 "+ue(d(f))+" \u4E2A\u3000\u8303\u56F4 X "+f.minX+"~"+f.maxX+"\uFF0CZ "+f.minZ+"~"+f.maxZ+(f.simulated?"\u3000\u6A21\u62DF\u8865\u5145 "+ue(f.simulated)+" \u5217":"")};C("workspace").style.display="none",C("structureView").style.display="block",C("structureView").innerHTML=`<h3>\u4E16\u754C\u89C2\u770B</h3>
      <div class="row2">
        <div><label>\u89C6\u56FE</label><select id="mapMode">
          <option value="surface">\u5730\u8868\uFF08\u6700\u9AD8\u65B9\u5757\uFF09</option>
          <option value="underground">\u5730\u4E0B\uFF08\u6307\u5B9A\u9AD8\u5EA6\uFF09</option>
        </select></div>
        <div><label>\u5730\u4E0B\u9AD8\u5EA6 Y</label><input id="mapY" type="number" min="-64" max="120" value="60"></div>
      </div>
      <label class="chk"><input type="checkbox" id="mapSim" checked> \u6A21\u62DF\u672A\u63A2\u7D22\u533A\u57DF\uFF08\u6309\u79CD\u5B50\u63A8\u7B97\uFF0C\u975E\u771F\u5B9E\u6570\u636E\uFF09</label>
      <label class="chk"><input type="checkbox" id="mapStruct" checked> \u663E\u793A\u7ED3\u6784\u63A8\u6D4B\u6807\u8BB0\uFF08\u6751\u5E84/\u4F20\u9001\u95E8\u9057\u5740/\u8425\u5730/\u6C89\u8239\u2026\uFF09</label>
      <div class="row2"><div><label>\u6A21\u62DF\u8303\u56F4\uFF08\u5411\u5916\u6269\u5C55\u7684\u65B9\u5757\u6570\uFF09</label>
        <select id="mapMargin"><option value="128">128 \u683C</option><option value="512" selected>512 \u683C</option><option value="1024">1024 \u683C</option><option value="2048">2048 \u683C\uFF08\u6162\uFF09</option></select></div></div>
      <label class="chk"><input type="checkbox" id="mapCaves" checked> \u5730\u4E0B\uFF1A\u63A8\u6D4B\u6D1E\u7A74\u7A7A\u8154\u4E0E\u751F\u7269\u7FA4\u7CFB\uFF08\u5B9E\u9A8C\uFF0C\u975E\u5B98\u65B9\u751F\u6210\uFF09</label>
      <p class="muted" style="font-size:11.5px">\u63A8\u6D4B\u7FA4\u7CFB\u7528\u6DE1\u8272\u53E0\u52A0\uFF1A\u7EFF=\u7E41\u8302\u6D1E\u7A74\uFF0C\u9EC4=\u786B\u78FA\u6D1E\u7A74\uFF0C\u7070=\u6EF4\u6C34\u77F3\u6D1E\u7A74\uFF1B\u9ED1\u8272=\u63A8\u6D4B\u6D1E\u7A74\u7A7A\u8154\u3002</p>
      <div class="edbar"><button id="mapPaint" class="primary">\u91CD\u65B0\u751F\u6210</button><button id="mapZoomIn" class="ghost">\u653E\u5927</button><button id="mapZoomOut" class="ghost">\u7F29\u5C0F</button><button id="mapFit" class="ghost">\u9002\u5E94\u5BBD\u5EA6</button><button id="mapPng" class="ghost">\u5BFC\u51FA PNG</button><button id="mapStructList" class="ghost">\u7ED3\u6784\u5217\u8868</button><button id="mapBack" class="ghost">\u8FD4\u56DE\u6587\u4EF6\u5217\u8868</button></div>
      <p id="mapMeta" class="muted">\u51C6\u5907\u4E2D\u2026</p>
      <div class="mapwrap" id="mapWrap"><canvas id="mapCanvas"></canvas></div>
      <p id="mapInfo" class="fname">\u70B9\u5730\u56FE\u4E0A\u4EFB\u610F\u4F4D\u7F6E\u67E5\u770B\u8BE5\u5217\u4FE1\u606F\uFF1B\u534A\u900F\u660E\u533A\u57DF\u662F\u6A21\u62DF\u5730\u5F62</p>
      <p class="muted">\u771F\u5B9E\u533A\u57DF\u6765\u81EA\u5B58\u6863\u91CC\u7684\u5B50\u533A\u5757\u6570\u636E\uFF1B\u6CA1\u8D70\u8FC7\u7684\u533A\u57DF\u6309\u79CD\u5B50+\u591A\u566A\u58F0\u63A8\u6D4B\u9AD8\u5EA6\u3001\u6D1E\u7A74\u548C\u5730\u4E0B\u7FA4\u7CFB\uFF0C\u53EA\u80FD\u770B\u4E2A\u5927\u6982\uFF0C\u4E0D\u7B49\u4E8E\u6E38\u620F\u771F\u5B9E\u5730\u5F62\u3002</p>
      <div class="legend">
        <span><i style="background:#141a22"></i>\u6D1E\u7A74\u7A7A\u8154</span>
        <span><i style="background:#5b7d3a"></i>\u7E41\u8302\u6D1E\u7A74</span>
        <span><i style="background:#8a6a52"></i>\u6EF4\u6C34\u77F3\u6D1E\u7A74</span>
        <span><i style="background:#123c3a"></i>\u6DF1\u6697\u4E4B\u57DF</span>
        <span><i style="background:#c9c04a"></i>\u786B\u78FA\u6D1E\u7A74\uFF08\u6A21\u7EC4\u5411\uFF09</span>
        <span><i style="background:#d94b1e"></i>\u5CA9\u6D46</span>
      </div>`;let _=()=>{i=document.getElementById("mapMode").value,o=Number(document.getElementById("mapY").value||60),r=document.getElementById("mapSim").checked,s=Number(document.getElementById("mapMargin").value||512),l=document.getElementById("mapCaves").checked};document.getElementById("mapMode").onchange=()=>{_(),p()},document.getElementById("mapY").onchange=()=>{_(),p()},document.getElementById("mapSim").onchange=()=>{_(),p()},document.getElementById("mapMargin").onchange=()=>{_(),p()},document.getElementById("mapStruct").onchange=()=>{_(),p()},document.getElementById("mapZoomIn").onclick=()=>{g.zoomSet=!0,m=Math.min(5,m*1.4),g.applyZoom&&g.applyZoom()},document.getElementById("mapZoomOut").onclick=()=>{g.zoomSet=!0,m=Math.max(.25,m/1.4),g.applyZoom&&g.applyZoom()},document.getElementById("mapFit").onclick=()=>{let f=document.getElementById("mapCanvas"),h=document.getElementById("mapWrap")?document.getElementById("mapWrap").clientWidth:360;g.zoomSet=!0,m=Math.max(.15,(h-6)/f.width),g.applyZoom&&g.applyZoom()};{let f=document.getElementById("mapWrap");if(f){let h=null;f.addEventListener("pointerdown",y=>{h={x:y.clientX,y:y.clientY,l:f.scrollLeft,t:f.scrollTop}}),f.addEventListener("pointermove",y=>{h&&(f.scrollLeft=h.l-(y.clientX-h.x),f.scrollTop=h.t-(y.clientY-h.y))}),f.addEventListener("pointerup",y=>{h&&(Math.abs(y.clientX-h.x)>6||Math.abs(y.clientY-h.y)>6)&&(g.mapDragged=!0),h=null}),f.addEventListener("pointercancel",()=>{h=null})}}document.getElementById("mapStructList").onclick=()=>{let f=g.structures||[];if(!f.length)return O("\u5148\u52FE\u9009\u201C\u663E\u793A\u7ED3\u6784\u63A8\u6D4B\u6807\u8BB0\u201D\u518D\u91CD\u65B0\u751F\u6210");let h=f.slice(0,80).map(y=>`<div class="slotrow"><span class="slotname">${ne(y.zh)}</span><span class="muted">${y.x}, ${y.z}</span></div>`).join("");C("modalBody").innerHTML=`<h3>\u7ED3\u6784\u63A8\u6D4B\uFF08${f.length} \u5904\uFF09</h3><p class="muted">\u6309\u7FA4\u7CFB\u4E0E\u79CD\u5B50\u54C8\u5E0C\u653E\u7F6E\uFF0C\u53EA\u7ED9\u5927\u81F4\u4F4D\u7F6E\uFF1B\u5B9D\u7BB1\u5185\u5BB9\u6309\u6C60\u5B50\u968F\u673A\uFF0C\u975E\u771F\u5B9E\u5BB9\u5668\u6570\u636E\u3002</p><div class="slotlist">${h}</div><div class="modalbtns"><button id="stClose" class="ghost">\u5173\u95ED</button></div>`,C("modal").style.display="flex",document.getElementById("stClose").onclick=()=>{C("modal").style.display="none"},C("modalBody").querySelectorAll(".slotrow").forEach((y,v)=>{y.onclick=()=>b(f[v])})},document.getElementById("mapCaves").onchange=()=>{_(),p()},document.getElementById("mapPaint").onclick=()=>{_(),p()},document.getElementById("mapBack").onclick=()=>{C("structureView").style.display="none",C("workspace").style.display="block"},document.getElementById("mapPng").onclick=async()=>{let h=document.getElementById("mapCanvas").toDataURL("image/png").split(",")[1];await Ce("\u4E16\u754C\u89C2\u770B_"+(i==="surface"?"\u5730\u8868":"Y"+o)+".png",new Uint8Array(0),h),A("\u5DF2\u5BFC\u51FA\u5730\u56FE PNG")},await p(),A("\u4E16\u754C\u89C2\u770B\u5B8C\u6210")}catch(t){console.error(t),O(t.message)}}async function Bd(){var e;if(!g.archive)return O("\u5148\u6253\u5F00 .mcworld / .mctemplate");try{let n=await ut(),{readLevelDb:t}=window.MCBE,a=g.db||await t(n,{});g.db=a;let i=a.get("~local_player");if(!i)return O("\u8FD9\u4E2A\u5B58\u6863\u6CA1\u6709\u5355\u673A\u73A9\u5BB6\u6570\u636E\uFF08\u53EF\u80FD\u9700\u8981\u5148\u8FDB\u5165\u8FC7\u4E00\u6B21\u4E16\u754C\uFF09");let o=Mi(i.value);g.player=o,C("workspace").style.display="block",C("structureView").style.display="none",C("editor").innerHTML=`<div class="edhead"><div><b>\u73A9\u5BB6\u6570\u636E</b><span class="muted">\u3000\u952E ~local_player</span></div></div>
      <div class="form">
        <label>\u5750\u6807 X / Y / Z</label>
        <div class="row3"><input id="pX" type="number" step="0.01" value="${o.pos?o.pos[0].toFixed(2):0}"><input id="pY" type="number" step="0.01" value="${o.pos?o.pos[1].toFixed(2):0}"><input id="pZ" type="number" step="0.01" value="${o.pos?o.pos[2].toFixed(2):0}"></div>
        <label>\u751F\u547D\u503C\uFF08\u7559\u7A7A\u4E0D\u6539\uFF09</label><input id="pHp" type="number" step="0.5" placeholder="${(e=o.health)!=null?e:""}">
        <label>\u80CC\u5305\uFF08JSON \u6570\u7EC4\uFF0C\u6BCF\u9879 name / count / slot\uFF09</label>
        <textarea id="pInv" class="code" style="height:160px">${ne(JSON.stringify(o.inventory,null,1))}</textarea>
        <div class="edbar"><button id="pSave">\u5199\u5165\u5B58\u6863</button></div>
        <p class="muted">\u5199\u5165\u65B9\u5F0F\uFF1A\u5411 LevelDB \u65E5\u5FD7\u8FFD\u52A0\u4E00\u6761 WriteBatch \u8BB0\u5F55\uFF08\u4E0D\u6539\u539F\u6587\u4EF6\uFF0C\u5BFC\u51FA\u65B0\u5305\u540E\u751F\u6548\uFF09\u3002</p>
      </div>`,document.getElementById("pSave").onclick=async()=>{try{let r=[Number(document.getElementById("pX").value),Number(document.getElementById("pY").value),Number(document.getElementById("pZ").value)],s=document.getElementById("pHp").value,l=JSON.parse(document.getElementById("pInv").value||"[]"),c={pos:r,inventory:l};s&&(c.health=Number(s));let m=Ms(i.value,c),u=await ut(),p=await vn(u,{});await p.init({});let d=p.lastSequence+1,b=g.archive.files.filter(h=>/(^|\/)(MANIFEST-[0-9]+|[0-9]+\.(ldb|log))$/.test(h.path)).map(h=>({name:he(h.path),data:h.data})),_=pa(b,"~local_player",m,d),f=g.archive.paths().find(h=>he(h)===_.logName)||"db/"+_.logName;g.archive.setBytes(f,_.bytes),g.db=null,g.statsDirty=!0,A(`\u5DF2\u5199\u5165\uFF1A${_.logName}\uFF08\u5E8F\u5217\u53F7 ${d}\uFF09\uFF0C\u5BFC\u51FA\u540E\u751F\u6548`)}catch(r){console.error(r),O(r.message)}},A(`\u73A9\u5BB6\u5750\u6807 ${o.pos?o.pos.map(r=>r.toFixed(2)).join(", "):"-"}\uFF0C\u80CC\u5305 ${o.inventory.length} \u9879`)}catch(n){console.error(n),O(n.message)}}async function Cd(){if(!g.archive)return O("\u5148\u6253\u5F00 .mcworld / .mctemplate");try{let e=await ut(),n=g.db||await window.MCBE.readLevelDb(e,{});g.db=n;let t=n.get("~local_player");if(!t)return O("\u8FD9\u4E2A\u5B58\u6863\u6CA1\u6709\u5355\u673A\u73A9\u5BB6\u6570\u636E");let a=Ee(me(t.value,0,!0)),i=Array.isArray(a.Inventory)?a.Inventory:[];if(!i.length)return O("\u73A9\u5BB6\u80CC\u5305\u662F\u7A7A\u7684");C("workspace").style.display="block",C("structureView").style.display="none",C("editor").innerHTML=`<div class="edhead"><div><b>\u80CC\u5305\u69FD\u4F4D\u8C03\u6574</b><span class="muted">\u3000${i.length} \u9879\uFF08\u4E0D\u6539\u7269\u54C1\u672C\u8EAB NBT\uFF09</span></div></div>
      <p class="muted">0\u201335 \u662F\u4E3B\u80CC\u5305\uFF0C36\u201339 \u662F\u5FEB\u6377\u680F\uFF08\u90E8\u5206\u7248\u672C\u76D4\u7532/\u526F\u624B\u53E6\u6709\u69FD\u4F4D\uFF09\u3002\u6539\u6210\u5DF2\u88AB\u5360\u7528\u7684\u69FD\u4F4D\u4F1A\u81EA\u52A8\u4EA4\u6362\uFF0C\u4E0D\u4F1A\u4E22\u7269\u54C1\u3002</p>
      <div class="slotlist">${i.map((o,r)=>{var s,l,c;return`
        <div class="slotrow">
          <span class="slotname">${ne(et(String(o.Name||""))||String(o.Name||""))}</span>
          <span class="muted">\xD7${Number((s=o.Count)!=null?s:1)}</span>
          <input class="slotinput" data-i="${r}" type="number" min="0" max="255" value="${Number((l=o.Slot)!=null?l:0)}">
          <span class="muted">\u539F\u69FD ${Number((c=o.Slot)!=null?c:0)}</span>
        </div>`}).join("")}</div>
      <div class="edbar"><button id="slotSave" class="primary">\u5199\u5165\u69FD\u4F4D</button></div>
      <p class="muted">\u5199\u5165\u65B9\u5F0F\uFF1A\u91CD\u7F16\u7801\u73A9\u5BB6 NBT \u540E\u8FFD\u52A0 WriteBatch \u5230 db \u65E5\u5FD7\uFF1B\u5BFC\u51FA\u65B0\u5305\u540E\u751F\u6548\uFF0C\u5EFA\u8BAE\u5148\u5907\u4EFD\u3002</p>`,document.getElementById("slotSave").onclick=async()=>{try{let o={},r=0;if(document.querySelectorAll(".slotinput").forEach(d=>{var h;let b=Number(d.dataset.i),_=Number((h=i[b].Slot)!=null?h:0),f=Number(d.value);Number.isFinite(f)&&f!==_&&(o[b]=f,r++)}),!r)return A("\u69FD\u4F4D\u6CA1\u6709\u6539\u52A8");let s=zs(t.value,o),l=await ut(),c=await vn(l,{});await c.init({});let m=g.archive.files.filter(d=>/(^|\/)(MANIFEST-[0-9]+|[0-9]+\.(ldb|log))$/.test(d.path)).map(d=>({name:he(d.path),data:d.data})),u=pa(m,"~local_player",s,c.lastSequence+1),p=g.archive.paths().find(d=>he(d)===u.logName)||"db/"+u.logName;g.archive.setBytes(p,u.bytes),g.db=null,g.statsDirty=!0,A("\u69FD\u4F4D\u5DF2\u5199\u5165 "+r+" \u9879\uFF0C\u65E5\u5FD7 "+u.logName)}catch(o){console.error(o),O("\u5199\u5165\u5931\u8D25\uFF1A"+o.message)}},A("\u80CC\u5305\u5171 "+i.length+" \u9879\uFF0C\u53EF\u8C03\u6574\u69FD\u4F4D")}catch(e){console.error(e),O(e.message)}}async function Md(){if(!g.archive)return O("\u5148\u6253\u5F00 .mcworld / .mctemplate");try{let e=await ut(),n=g.db||await window.MCBE.readLevelDb(e,{});g.db=n;let t=n.get("~local_player");if(!t)return O("\u8FD9\u4E2A\u5B58\u6863\u6CA1\u6709\u5355\u673A\u73A9\u5BB6\u6570\u636E\uFF0C\u4E66\u7C4D\u90FD\u5728\u73A9\u5BB6\u80CC\u5305\u91CC\uFF0C\u5148\u8FDB\u5165\u4E00\u6B21\u4E16\u754C\u518D\u8BD5");let o=me(t.value,0,!0).root.value.Inventory;if(!o||o.t!==9)return O("\u73A9\u5BB6\u6570\u636E\u91CC\u6CA1\u6709\u80CC\u5305");let r=[];if(o.v.forEach((s,l)=>{if(!s||s.t!==10)return;let c=s.v.Name;if(!(c?String(c.v):"").includes("written_book"))return;let u=s.v.tag&&s.v.tag.t===10?s.v.tag.v:null,p=u&&u.pages,d=p&&p.t===9?p.v.map(b=>String(b.v)):[];r.push({idx:l,count:s.v.Count?Number(s.v.Count.v):1,title:u&&u.title?String(u.title.v):"",author:u&&u.author?String(u.author.v):"",pages:d})}),!r.length)return O("\u73A9\u5BB6\u80CC\u5305\u91CC\u6CA1\u6709\u6210\u4E66\uFF08written_book\uFF09\uFF1B\u6210\u4E66\u7B7E\u8FC7\u540D\u540E\u624D\u4F1A\u5B58\u8FD9\u79CD\u683C\u5F0F");C("workspace").style.display="block",C("structureView").style.display="none",C("editor").innerHTML=`<div class="edhead"><div><b>\u4E66\u5185\u5BB9\u7F16\u8F91</b><span class="muted">\u3000\u5171 ${r.length} \u672C\uFF08\u53EA\u8BFB\u73A9\u5BB6\u80CC\u5305\uFF09</span></div></div>
      ${r.map((s,l)=>`<div class="bookcard">
        <p class="muted">\u69FD\u4F4D ${s.idx}\u3000\u6570\u91CF ${s.count}</p>
        <div class="row2"><input id="bkTitle${l}" placeholder="\u4E66\u540D" value="${ne(s.title)}"><input id="bkAuthor${l}" placeholder="\u4F5C\u8005" value="${ne(s.author)}"></div>
        <label>\u9875\u9762\u6587\u5B57\uFF08\u7528\u5355\u72EC\u4E00\u884C \`\`\` \u5206\u9875\uFF09</label>
        <textarea id="bkPages${l}" class="code" style="height:180px">${ne(s.pages.join("\n```\n"))}</textarea>
        <div class="edbar"><button class="bkSave" data-bi="${l}">\u5199\u56DE\u8FD9\u672C\u4E66</button></div>
      </div>`).join("")}
      <p class="muted">\u5199\u5165\u65B9\u5F0F\uFF1A\u628A\u6574\u4E2A\u73A9\u5BB6 NBT \u91CD\u65B0\u7F16\u7801\u540E\u8FFD\u52A0 WriteBatch \u5230 db \u65E5\u5FD7\uFF0C\u5BFC\u51FA\u65B0\u5305\u540E\u751F\u6548\uFF1B\u6539\u524D\u5EFA\u8BAE\u5148\u5BFC\u51FA\u5907\u4EFD\u3002</p>`,document.querySelectorAll(".bkSave").forEach(s=>{s.onclick=async()=>{let l=Number(s.dataset.bi),c=r[l],m=document.getElementById("bkPages"+l).value.split("\n```\n"),u=document.getElementById("bkTitle"+l).value.trim(),p=document.getElementById("bkAuthor"+l).value.trim();try{let d=$s(t.value,c.idx,m,u,p),b=await ut(),_=await vn(b,{});await _.init({});let f=g.archive.files.filter(v=>/(^|\/)(MANIFEST-[0-9]+|[0-9]+\.(ldb|log))$/.test(v.path)).map(v=>({name:he(v.path),data:v.data})),h=pa(f,"~local_player",d,_.lastSequence+1),y=g.archive.paths().find(v=>he(v)===h.logName)||"db/"+h.logName;g.archive.setBytes(y,h.bytes),g.db=null,g.statsDirty=!0,A("\u4E66\u5DF2\u5199\u56DE\uFF1A\u69FD\u4F4D "+c.idx+"\uFF0C"+m.length+" \u9875\uFF0C\u65E5\u5FD7 "+h.logName)}catch(d){console.error(d),O("\u5199\u5165\u5931\u8D25\uFF1A"+d.message)}}}),A("\u627E\u5230\u6210\u4E66 "+r.length+" \u672C\uFF1A"+r.map(s=>(s.title||"\u65E0\u9898")+"\uFF08"+s.pages.length+" \u9875\uFF09").join("\u3001"))}catch(e){console.error(e),O(e.message)}}function $d(e,n,t){let a=document.createElement("div");a.className="codeedit";let i=hr(e),o=document.createElement("div");o.className="codegutter";let r=document.createElement("div");r.className="codelineband";let s=document.createElement("pre");s.className="codehi";let l=document.createElement("textarea");l.className="code",l.spellcheck=!1,l.wrap="off",l.value=n;let c=document.createElement("div");c.className="codestatus";let m=19.4,u=()=>{let _=l.value.split(`
`).length,f="";for(let h=1;h<=_;h++)f+='<span class="lnum">'+h+"</span>";o.innerHTML=f},p=()=>{let _=l.selectionStart||0,f=l.value.slice(0,_),h=f.split(`
`).length,y=_-f.lastIndexOf(`
`);return{pos:_,line:h,col:y}},d=()=>{s.scrollTop=l.scrollTop,s.scrollLeft=l.scrollLeft,o.style.transform="translateY("+-l.scrollTop+"px)";let{line:_,col:f}=p(),h=l.value.split(`
`).length;c.textContent="\u884C "+_+" / "+h+"\u3000\u5217 "+f+"\u3000\xB7\u3000"+(i==="plain"?"\u7EAF\u6587\u672C":i.toUpperCase());let y=10+(_-1)*m-l.scrollTop;r.style.top=y+"px",r.style.height=m+"px";let v=o.children;for(let M=0;M<v.length;M++)v[M].classList.toggle("active",M+1===_);let w=v[_-1];w&&w.scrollIntoView({block:"nearest"})},b=()=>{try{let _=l.value;_.length>120*1024?s.textContent=_+`
`:s.innerHTML=_r(_,i)+`
`}catch(_){try{s.textContent=l.value+`
`}catch(f){}}m=parseFloat(getComputedStyle(l).lineHeight)||19.4,u(),d()};a.appendChild(o),a.appendChild(r),a.appendChild(s),a.appendChild(l),a.appendChild(c);try{b()}catch(_){s.textContent=n}return l.oninput=b,l.onscroll=d,l.onclick=d,l.onkeyup=d,l.onselect=d,l.onfocus=d,{wrap:a,ta:l,paint:b}}function Li(){let e=!g.archive,n=C("newPackRow");n&&(n.style.display=e?"flex":"none")}var q=null;function zd(){if(!q)return;let e=q.pattern.value==="item"?"item":q.entity.value?"entity":q.pattern.value;try{let n=yt(e==="item"?"item":q.entity.value?"entity":q.pattern.value,Number(q.size.value),q.c1.value,q.c2.value,q.entity.value);q.preview.src=Ur(n)}catch(n){}}function Os(){let e=C("modalBody");e.innerHTML=`
    <h3>\u9644\u52A0\u5305\u5236\u4F5C\u5668</h3>
    <p class="muted">\u79BB\u7EBF\u751F\u6210\u884C\u4E3A\u5305 + \u8D44\u6E90\u5305\uFF0C\u8D34\u56FE\u73B0\u573A\u7ED8\u5236\uFF0C\u5BFC\u51FA\u7684 .mcaddon \u53EF\u76F4\u63A5\u7528 Minecraft \u6253\u5F00\u3002</p>
    <div class="form">
      <div class="row2"><input id="mkName" placeholder="\u5305\u540D" value="\u6211\u7684\u9644\u52A0\u5305"><input id="mkNs" placeholder="\u547D\u540D\u7A7A\u95F4" value="demo"></div>
      <div class="row2">
        <select id="mkMode"><option value="addon">\u53CC\u5305 .mcaddon</option><option value="resource">\u4EC5\u8D44\u6E90\u5305</option><option value="behavior">\u4EC5\u884C\u4E3A\u5305</option></select>
        <select id="mkSize"><option value="16">16\xD716</option><option value="32">32\xD732</option><option value="64">64\xD764</option></select>
      </div>
      <div class="row2">
        <select id="mkPattern"><option value="stone">\u77F3\u8D28\u566A\u70B9</option><option value="wood">\u6728\u7EB9</option><option value="metal">\u91D1\u5C5E</option><option value="crystal">\u6C34\u6676</option><option value="wool">\u7F8A\u6BDB</option></select>
        <select id="mkEntity"><option value="">\u4E0D\u751F\u6210\u5B9E\u4F53\u8D34\u56FE</option>${Dr.map(t=>`<option value="${t}">${t}</option>`).join("")}</select>
      </div>
      <div class="row2"><input id="mkC1" type="color" value="#7a7f8c"><input id="mkC2" type="color" value="#4a505c"></div>
      <div class="row2">
        <label class="chk"><input type="checkbox" id="mkBlock" checked> \u751F\u6210\u65B9\u5757</label>
        <label class="chk"><input type="checkbox" id="mkItem" checked> \u751F\u6210\u7269\u54C1</label>
      </div>
      <div class="row2">
        <label class="chk"><input type="checkbox" id="mkOnlineUuid" checked> \u5728\u7EBF UUID</label>
        <label class="chk"><input type="checkbox" id="mkOnlineTex"> \u5728\u7EBF\u8D34\u56FE\uFF08\u516C\u5171\u63A5\u53E3\uFF0C\u9ED8\u8BA4\u5173\uFF09</label>
      </div>
      <input id="mkPrompt" placeholder="\u5728\u7EBF\u8D34\u56FE\u63D0\u793A\u8BCD\uFF08\u82F1\u6587\u6548\u679C\u66F4\u597D\uFF0C\u53EF\u7A7A\uFF09">
      <div class="row2">
        <select id="mkLang"><option value="js">JavaScript\uFF08\u6E38\u620F\u53EF\u6267\u884C\uFF09</option><option value="ts">TypeScript\uFF08\u6E90\u7801\u6A21\u677F\uFF09</option><option value="json">JSON\uFF08\u4EC5\u6570\u636E\uFF09</option><option value="py">Python\uFF08\u6E38\u620F\u4E0D\u6267\u884C\uFF0C\u4EC5\u53C2\u8003\uFF09</option><option value="none">\u4E0D\u751F\u6210\u811A\u672C</option></select>
        <select id="mkTpl"><option value="scoreboard">\u8BA1\u5206\u677F</option><option value="particle">\u7C92\u5B50</option><option value="welcome">\u8FDB\u670D\u63D0\u793A</option></select>
      </div>
      <div class="mapwrap" style="text-align:center;background:#0d1219"><img id="mkPrev" style="width:96px;height:96px;image-rendering:pixelated"><div class="muted" id="mkPrevInfo"></div></div>
      <input id="mkBlockName" placeholder="\u65B9\u5757\u4E2D\u6587\u540D\uFF08\u9ED8\u8BA4 \u81EA\u5B9A\u4E49\u65B9\u5757\uFF09" value="\u81EA\u5B9A\u4E49\u65B9\u5757">
      <input id="mkItemName" placeholder="\u7269\u54C1\u4E2D\u6587\u540D\uFF08\u9ED8\u8BA4 \u81EA\u5B9A\u4E49\u7269\u54C1\uFF09" value="\u81EA\u5B9A\u4E49\u7269\u54C1">
      <div class="edbar"><button id="mkBuild">\u751F\u6210\u5E76\u6253\u5F00</button><button id="mkPng" class="ghost">\u53EA\u4FDD\u5B58\u8FD9\u5F20\u8D34\u56FE</button></div>
    </div>
    <div class="modalbtns"><button id="mkClose" class="ghost">\u5173\u95ED</button></div>`,C("modal").style.display="flex",q={name:document.getElementById("mkName"),ns:document.getElementById("mkNs"),mode:document.getElementById("mkMode"),size:document.getElementById("mkSize"),pattern:document.getElementById("mkPattern"),entity:document.getElementById("mkEntity"),c1:document.getElementById("mkC1"),c2:document.getElementById("mkC2"),block:document.getElementById("mkBlock"),item:document.getElementById("mkItem"),lang:document.getElementById("mkLang"),tpl:document.getElementById("mkTpl"),preview:document.getElementById("mkPrev"),info:document.getElementById("mkPrevInfo")};let n=()=>{zd();let t=q.entity.value?"\u5B9E\u4F53 "+q.entity.value:q.pattern.options[q.pattern.selectedIndex].text;q.info.textContent=t+"\u3000"+q.size.value+"\xD7"+q.size.value};["mkName","mkNs","mkMode","mkSize","mkPattern","mkEntity","mkC1","mkC2","mkBlock","mkItem","mkLang","mkTpl"].forEach(t=>{let a=document.getElementById(t);a&&(a.addEventListener("change",n),a.addEventListener("input",n))}),n(),document.getElementById("mkClose").onclick=()=>{C("modal").style.display="none"},document.getElementById("mkPng").onclick=async()=>{let t=q.entity.value?"entity":q.pattern.value==="item"?"item":q.pattern.value,a=yt(t,Number(q.size.value),q.c1.value,q.c2.value,q.entity.value);await Ce((q.entity.value||q.pattern.value||"texture")+".png",a)},document.getElementById("mkBuild").onclick=async()=>{let t=document.getElementById("mkBuild");t.disabled=!0,t.textContent="\u751F\u6210\u4E2D\u2026";try{let a={name:q.name.value.trim()||"\u6211\u7684\u9644\u52A0\u5305",namespace:(q.ns.value.trim()||"demo").replace(/[^a-z0-9_]/gi,"_").toLowerCase(),mode:q.mode.value,size:Number(q.size.value),pattern:q.pattern.value,color1:q.c1.value,color2:q.c2.value,block:q.block.checked,item:q.item.checked,entity:q.entity.value,scriptLang:q.lang.value,scriptTpl:q.tpl.value,blockName:document.getElementById("mkBlockName").value.trim(),itemName:document.getElementById("mkItemName").value.trim()},i=document.getElementById("mkOnlineUuid").checked,o=document.getElementById("mkOnlineTex").checked,r=document.getElementById("mkPrompt").value.trim()||a.name+" "+a.pattern+" minecraft texture";if(i){let l=[];for(let c=0;c<5;c++){let m=null;try{m=await gr()}catch(u){}l.push(m||br())}a.uuids=l,A("UUID\uFF1A\u5DF2\u5411\u5728\u7EBF\u751F\u6210\u5668\u8BF7\u6C42\uFF0C\u5931\u8D25\u9879\u7528\u672C\u5730 v4 \u515C\u5E95")}if(o&&(a.block||a.item||a.entity)){let l=a.size,c={},m=0,u=0,p=async(d,b)=>{let _=await vr(d,l,b);return _.source==="api"?m++:u++,_.data};try{c.block=await p(r+" block","block")}catch(d){u++}try{c.item=await p(r+" item icon","item")}catch(d){u++}if(a.entity)try{c.entity=await p(r+" "+a.entity+" skin","entity")}catch(d){u++}a.tex=c,A("\u8D34\u56FE\uFF1A\u5728\u7EBF\u63A5\u53E3 "+m+" \u5F20\uFF0C\u672C\u5730\u50CF\u7D20\u56FE "+u+" \u5F20")}let s=Fr(a);g.archive=new Oe("zip",s.entries),g.texIndex=null,g.texCache=new Map,g.texPending=new Set,g.texPacks=[],g.statsDirty=!0,C("modal").style.display="none",An("",""),A("\u751F\u6210\u5B8C\u6210\uFF1A"+s.entries.length+" \u4E2A\u6587\u4EF6\uFF0C\u547D\u540D\u7A7A\u95F4 "+a.namespace),s.log.forEach(l=>A("\xB7 "+l)),A("\u70B9\u53F3\u4E0A\u89D2\u201C\u5BFC\u51FA / \u53E6\u5B58\u201D\u4FDD\u5B58\u4E3A .mcaddon \u5373\u53EF\u5B89\u88C5")}catch(a){O("\u751F\u6210\u5931\u8D25\uFF1A"+a.message)}t.disabled=!1,t.textContent="\u751F\u6210\u5E76\u6253\u5F00"}}function Td(e){let n=e>>>0;return()=>{n=n+1831565813>>>0;let t=n;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Hs(e){let n=e.replace("#","");return[parseInt(n.slice(0,2),16),parseInt(n.slice(2,4),16),parseInt(n.slice(4,6),16)]}function ba(e){let n=e.toDataURL("image/png").split(",")[1],t=atob(n),a=new Uint8Array(t.length);for(let i=0;i<t.length;i++)a[i]=t.charCodeAt(i);return a}function Ni(e,n,t,a){e.width=n,e.height=n;let i=e.getContext("2d"),o=i.createImageData(n,n),[r,s,l]=Hs(a||"#8a8a8a"),c=Td(t.length*977+n*31+r),m=(p,d,b,_,f,h)=>{let y=(d*n+p)*4;o.data[y]=b,o.data[y+1]=_,o.data[y+2]=f,o.data[y+3]=h===void 0?255:h},u=p=>Math.max(0,Math.min(255,Math.round(p)));for(let p=0;p<n;p++)for(let d=0;d<n;d++){let b=r,_=s,f=l;if(t==="\u77F3\u5934"||t==="\u77F3\u7816"){let h=(c()-.5)*46;b+=h,_+=h,f+=h,t==="\u77F3\u7816"&&(d%Math.max(4,n/4)===0||p%Math.max(4,n/4)===0)&&(b-=40,_-=40,f-=40)}else if(t==="\u6CE5\u571F"){let h=(c()-.5)*38;b+=h,_+=h*.8,f+=h*.7}else if(t==="\u8349\u65B9\u5757")if(p<n*.28)b=86+c()*40,_=150+c()*50,f=70+c()*30;else{let h=(c()-.5)*34;b+=h,_+=h*.8,f+=h*.7}else if(t==="\u6728\u5934"){let h=Math.sin(d/n*Math.PI*6+c()*.5)*18;b+=h,_+=h*.7,f+=h*.4}else if(t==="\u6728\u677F"){let h=p%Math.max(4,n/4)===0,y=(c()-.5)*20;b+=y-(h?30:0),_+=y-(h?22:0),f+=y-(h?15:0)}else if(t==="\u6811\u53F6")c()<.18?(b*=.6,_*=.75,f*=.6):(b+=20,_+=30,f+=10);else if(t==="\u91D1\u5C5E"){let h=p/n*60;b+=h,_+=h,f+=h,(d===0||p===0)&&(b+=30,_+=30,f+=30)}else if(t==="\u7F8A\u6BDB"){let h=(c()-.5)*16;b+=h,_+=h,f+=h}else if(t==="\u7816\u5757"){let h=Math.max(8,n/4),y=Math.max(4,n/8),w=Math.floor(p/y)%2*(h/2);if(p%y===0||(d+w)%h===0)b=150,_=150,f=150;else{let $=(c()-.5)*26;b+=$,_+=$,f+=$}}else if(t==="\u6C99\u5B50"){let h=(c()-.5)*30;b+=h,_+=h*.9,f+=h*.6}else if(t==="\u6C34"){let h=Math.sin(d/n*Math.PI*4+Math.cos(p/n*Math.PI*3))*26;b+=h*.3,_+=h*.6,f+=h}else if(t==="\u73BB\u7483")d===0||p===0||d===n-1||p===n-1?(b=220,_=235,f=245):(b=200,_=225,f=240,o.data);else if(t==="\u53D1\u5149"){let h=Math.sqrt(Math.pow(d-n/2,2)+Math.pow(p-n/2,2))/(n/2);b*=1-h*.4+.6,_*=1-h*.4+.6,f*=1-h*.4+.6}else{let h=(c()-.5)*12;b+=h,_+=h,f+=h}m(d,p,u(b),u(_),u(f),t==="\u73BB\u7483"&&!(d===0||p===0||d===n-1||p===n-1)?210:255)}return i.putImageData(o,0,0),e}function Id(e,n,t){e.width=n,e.height=n;let a=e.getContext("2d"),[i,o,r]=Hs(t||"#6aa84f"),s=n/16,l=(c,m,u,p,d)=>{a.fillStyle=d,a.fillRect(c*s,m*s,u*s,p*s)};return a.clearRect(0,0,n,n),l(5,2,6,5,`rgb(${i},${o},${r})`),l(6,4,1,1,"#111"),l(9,4,1,1,"#111"),l(7,5.6,2,.8,"#3a2b2b"),l(5.5,7,5,4,`rgb(${Math.max(0,i-25)},${Math.max(0,o-20)},${Math.max(0,r-25)})`),l(4,7.4,1.2,3,`rgb(${i},${o},${r})`),l(10.8,7.4,1.2,3,`rgb(${i},${o},${r})`),l(5.8,11,1.6,3,`rgb(${Math.max(0,i-40)},${Math.max(0,o-35)},${Math.max(0,r-35)})`),l(8.6,11,1.6,3,`rgb(${Math.max(0,i-40)},${Math.max(0,o-35)},${Math.max(0,r-35)})`),e}async function Ld(){let e=["https://www.uuidgenerator.net/api/version4","https://api.uuid4.org/v4","https://uuidgen.org/api/v4"];for(let a of e)try{let i=await fetch(a,{method:"GET"});if(!i.ok)continue;let r=(await i.text()).trim().match(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i);if(r)return{uuid:r[0].toLowerCase(),online:!0}}catch(i){}if(crypto&&crypto.randomUUID)return{uuid:crypto.randomUUID(),online:!1};let n="",t="0123456789abcdef";for(let a=0;a<36;a++)n+=a===8||a===13||a===18||a===23?"-":a===14?"4":t[Math.floor(Math.random()*16)];return{uuid:n,online:!1}}function Ws(){let e=C("modalBody");e.innerHTML=`<h3>\u9644\u52A0\u5305\u751F\u6210\u5668</h3>
    <label>\u5305\u540D\u79F0</label><input id="crName" value="\u6211\u7684\u9644\u52A0\u5305">
    <label>\u63CF\u8FF0</label><input id="crDesc" value="\u7531 MCBE \u5DE5\u5177\u7BB1\u751F\u6210">
    <label>\u5305\u7C7B\u578B</label><select id="crType"><option value="both">\u884C\u4E3A\u5305 + \u8D44\u6E90\u5305</option><option value="bp">\u4EC5\u884C\u4E3A\u5305</option><option value="rp">\u4EC5\u8D44\u6E90\u5305</option></select>
    <label>\u811A\u672C\u8BED\u8A00</label><select id="crLang"><option value="js">JavaScript\uFF08\u6E38\u620F\u539F\u751F ScriptAPI\uFF09</option><option value="ts">TypeScript</option><option value="py">Python\uFF08\u914D\u5957\u5DE5\u5177\u811A\u672C\uFF09</option><option value="lua">Lua\uFF08\u914D\u5957\u5DE5\u5177\u811A\u672C\uFF09</option><option value="mcfunction">mcfunction</option></select>
    <label>\u4E3B\u9898\u8272</label><input id="crColor" type="color" value="#3b82f6">
    <div class="edbar"><button id="crGo">\u751F\u6210\u5E76\u6253\u5F00</button><button id="crGoExport">\u751F\u6210\u5E76\u5BFC\u51FA .mcaddon</button><button id="crCancel" class="ghost">\u53D6\u6D88</button></div>
    <p class="muted">UUID \u4F18\u5148\u8C03\u7528\u5728\u7EBF\u63A5\u53E3\uFF0C\u7F51\u7EDC\u4E0D\u901A\u65F6\u81EA\u52A8\u7528\u672C\u673A\u968F\u673A v4\uFF0C\u751F\u6210\u7ED3\u679C\u4E0D\u53D7\u5F71\u54CD\u3002</p>`,C("modal").style.display="flex",document.getElementById("crCancel").onclick=()=>{C("modal").style.display="none"};let n=async()=>{let t=document.getElementById("crName").value.trim()||"\u6211\u7684\u9644\u52A0\u5305",a=document.getElementById("crDesc").value.trim(),i=document.getElementById("crType").value,o=document.getElementById("crLang").value,r=document.getElementById("crColor").value,s=(t.replace(/[^A-Za-z0-9_\u4e00-\u9fa5]+/g,"_").slice(0,20)||"pack")+"_"+Math.random().toString(36).slice(2,6);A("\u751F\u6210\u9644\u52A0\u5305\uFF1A"+t+"\uFF08"+o+"\uFF09");let l=[];for(let f=0;f<5;f++)l.push(await Ld());A("UUID\uFF1A"+l.map(f=>f.uuid.slice(0,8)+"\u2026").join(" / ")+(l[0].online?"\uFF08\u5728\u7EBF\u63A5\u53E3\uFF09":"\uFF08\u79BB\u7EBF\u968F\u673A\uFF09"));let c=[],m="behavior_packs/"+s,u="resource_packs/"+s,p={bp:[],rp:[]},d=document.createElement("canvas");Ni(d,64,"\u53D1\u5149",r);let b=ba(d),_={js:"scripts/main.js",ts:"scripts/main.ts",py:"tools/generate.py",lua:"tools/generate.lua",mcfunction:"functions/main.mcfunction"}[o];if(i!=="rp"){let f={format_version:2,header:{name:t,description:a,uuid:l[0].uuid,version:[1,0,0],min_engine_version:[1,21,0]},modules:[]};o==="js"||o==="ts"?(f.modules.push({type:"data",uuid:l[1].uuid,version:[1,0,0]}),f.modules.push({type:"script",language:"javascript",entry:"scripts/main.js",uuid:l[2].uuid,version:[1,0,0]}),f.dependencies=[{module_name:"@minecraft/server",version:"1.17.0"}]):f.modules.push({type:"data",uuid:l[1].uuid,version:[1,0,0]}),p.bp.push({path:m+"/manifest.json",data:new TextEncoder().encode(JSON.stringify(f,null,2))}),p.bp.push({path:m+"/pack_icon.png",data:b}),p.bp.push({path:m+"/texts/zh_CN.lang",data:new TextEncoder().encode("pack.name="+t+`
pack.description=`+a+`
`)}),p.bp.push({path:m+"/texts/en_US.lang",data:new TextEncoder().encode("pack.name="+t+`
pack.description=`+a+`
`)}),o==="js"?p.bp.push({path:m+"/scripts/main.js",data:new TextEncoder().encode(`import { world, system } from '@minecraft/server';

// \u81EA\u52A8\u751F\u6210\uFF1A\u73A9\u5BB6\u8FDB\u670D\u6B22\u8FCE + \u6BCF\u79D2\u62A5\u65F6
world.afterEvents.playerSpawn.subscribe((ev) => {
  if (!ev.initialSpawn) return;
  ev.player.sendMessage('\xA7a\u6B22\u8FCE\u6765\u5230\u670D\u52A1\u5668\uFF01');
});

let ticks = 0;
system.runInterval(() => {
  ticks++;
  if (ticks % 20 !== 0) return;
  const players = world.getAllPlayers();
  for (const p of players) p.onScreenDisplay.setActionBar('\xA7e\u5728\u7EBF ' + players.length + ' \u4EBA');
}, 1);
`)}):o==="ts"?(p.bp.push({path:m+"/scripts/main.js",data:new TextEncoder().encode(`import { world } from '@minecraft/server';
world.afterEvents.playerSpawn.subscribe((ev) => { if (ev.initialSpawn) ev.player.sendMessage('\u4F60\u597D'); });
`)}),p.bp.push({path:m+"/scripts/main.ts",data:new TextEncoder().encode(`import { world, PlayerSpawnAfterEvent } from '@minecraft/server';
world.afterEvents.playerSpawn.subscribe((ev: PlayerSpawnAfterEvent): void => { if (ev.initialSpawn) ev.player.sendMessage('\u4F60\u597D'); });
`)})):o==="py"?p.bp.push({path:m+"/tools/generate.py",data:new TextEncoder().encode(`# \u914D\u5957\u5DE5\u5177\u811A\u672C\uFF08\u6E38\u620F\u4E0D\u6267\u884C Python\uFF0C\u4EC5\u7528\u4E8E\u6279\u91CF\u751F\u6210/\u68C0\u67E5\uFF09
import json, pathlib
root = pathlib.Path(__file__).resolve().parents[1]
print('\u5305\u76EE\u5F55:', root)
# \u793A\u4F8B\uFF1A\u5217\u51FA\u6240\u6709 JSON
for p in root.rglob('*.json'):
    print(p)
`)}):o==="lua"?p.bp.push({path:m+"/tools/generate.lua",data:new TextEncoder().encode(`-- \u914D\u5957\u5DE5\u5177\u811A\u672C\uFF08\u6E38\u620F\u4E0D\u6267\u884C Lua\uFF09
local root = (...):match('(.-)[^/]+$') or './'
print('\u5305\u76EE\u5F55: ' .. root)
`)}):p.bp.push({path:m+"/functions/main.mcfunction",data:new TextEncoder().encode(`# \u81EA\u52A8\u751F\u6210
say \u6B22\u8FCE\u6765\u5230\u670D\u52A1\u5668
time set day
`)})}if(i!=="bp"){let f={format_version:2,header:{name:t,description:a,uuid:l[i==="rp"?0:3].uuid,version:[1,0,0],min_engine_version:[1,21,0]},modules:[{type:"resources",uuid:l[i==="rp"?1:4].uuid,version:[1,0,0]}]};p.rp.push({path:u+"/manifest.json",data:new TextEncoder().encode(JSON.stringify(f,null,2))}),p.rp.push({path:u+"/pack_icon.png",data:b}),p.rp.push({path:u+"/texts/zh_CN.lang",data:new TextEncoder().encode("pack.name="+t+`
pack.description=`+a+`
`)});let h=document.createElement("canvas");Ni(h,32,"\u77F3\u5934","#8a8a8a"),p.rp.push({path:u+"/textures/blocks/"+s+"_stone.png",data:ba(h)})}return c.push(...p.bp,...p.rp),g.archive=new Oe("zip",c),g.texIndex=null,g.texCache=new Map,g.texPending=new Set,g.texPacks=[],g.name=s+".mcaddon",C("fileName").textContent=t+"\uFF08"+s+".mcaddon\uFF09",An("",""),A("\u5DF2\u751F\u6210 "+c.length+" \u4E2A\u6587\u4EF6\uFF0C\u53EF\u76F4\u63A5\u7F16\u8F91\u6216\u5BFC\u51FA .mcaddon"),s};document.getElementById("crGo").onclick=async()=>{try{await n(),C("modal").style.display="none"}catch(t){O("\u751F\u6210\u5931\u8D25\uFF1A"+t.message)}},document.getElementById("crGoExport").onclick=async()=>{try{let t=await n();C("modal").style.display="none",await Ce(t+".mcaddon",g.archive.toBytes())}catch(t){O("\u751F\u6210\u5931\u8D25\uFF1A"+t.message)}}}function Zs(){let e=C("modalBody");e.innerHTML=`<h3>\u8D34\u56FE\u751F\u6210\u5668</h3>
    <label>\u5C3A\u5BF8</label><select id="txSize"><option>16</option><option selected>32</option><option>64</option><option>128</option></select>
    <label>\u7C7B\u578B</label><select id="txKind"><option value="block">\u65B9\u5757\u8D34\u56FE</option><option value="item">\u7269\u54C1\u56FE\u6807</option><option value="entity">\u5B9E\u4F53\u7ACB\u7ED8\uFF08\u975E\u5B98\u65B9 UV\uFF09</option></select>
    <label>\u98CE\u683C</label><select id="txStyle"><option>\u77F3\u5934</option><option>\u77F3\u7816</option><option>\u6CE5\u571F</option><option>\u8349\u65B9\u5757</option><option>\u6728\u5934</option><option>\u6728\u677F</option><option>\u6811\u53F6</option><option>\u91D1\u5C5E</option><option>\u7F8A\u6BDB</option><option>\u7816\u5757</option><option>\u6C99\u5B50</option><option>\u6C34</option><option>\u73BB\u7483</option><option>\u53D1\u5149</option></select>
    <label>\u4E3B\u8272</label><input id="txColor" type="color" value="#7d7d7d">
    <canvas id="txPreview" style="width:100%;max-width:220px;image-rendering:pixelated;border-radius:8px;border:1px solid #26313a;margin:8px auto;display:block"></canvas>
    <label>\u5199\u5165\u5305\u5185\u8DEF\u5F84\uFF08\u53EF\u9009\uFF09</label><input id="txPath" placeholder="resource_packs/xxx/textures/blocks/a.png">
    <div class="edbar"><button id="txExport">\u5BFC\u51FA PNG</button><button id="txWrite">\u5199\u5165\u5F53\u524D\u5305</button><button id="txClose" class="ghost">\u5173\u95ED</button></div>`,C("modal").style.display="flex";let n=document.getElementById("txPreview"),t=()=>{let a=Number(document.getElementById("txSize").value),i=document.getElementById("txKind").value,o=document.getElementById("txStyle").value,r=document.getElementById("txColor").value;i==="entity"?Id(n,a,r):Ni(n,a,o,r)};["txSize","txKind","txStyle","txColor"].forEach(a=>document.getElementById(a).onchange=t),t(),document.getElementById("txClose").onclick=()=>{C("modal").style.display="none"},document.getElementById("txExport").onclick=async()=>{await Ce("texture_"+document.getElementById("txSize").value+"_"+Date.now()+".png",ba(n))},document.getElementById("txWrite").onclick=()=>{if(!g.archive)return O("\u5148\u6253\u5F00\u4E00\u4E2A\u5305\u6216\u751F\u6210\u4E00\u4E2A\u5305");let a=document.getElementById("txPath").value.trim();if(!a)return O("\u586B\u4E00\u4E2A\u5305\u5185\u8DEF\u5F84");g.archive.setBytes(a,ba(n)),pe(),A("\u5DF2\u5199\u5165 "+a+"\uFF08\u5BFC\u51FA\u540E\u751F\u6548\uFF09")}}function Nd(){if(!g.archive)return[];let e=[];for(let n of g.archive.files)if(/\.(js|mjs)$/i.test(n.path)&&/(^|\/)scripts\//.test(n.path)&&!(n.data.length>200*1024))try{e.push({path:n.path,code:new TextDecoder().decode(n.data)})}catch(t){}return e.slice(0,40)}function Ad(){let e=C("modalBody"),n=[["\u641C\u7D22\u6587\u4EF6","\u6309\u6587\u4EF6\u540D/\u8DEF\u5F84\u8FC7\u6EE4\u6587\u4EF6\u6811",Vs],["\u641C\u7D22\u5185\u5BB9","\u5728\u6587\u672C\u6587\u4EF6\u91CC\u641C\u5173\u952E\u5B57\uFF08\u6700\u591A 60 \u6761\uFF09",Js],["\u590D\u5236\u6587\u4EF6/\u6587\u4EF6\u5939","\u5305\u5185\u590D\u5236\u5230\u65B0\u8DEF\u5F84",jd],["\u6279\u91CF\u5BFC\u51FA","\u6309\u6269\u5C55\u540D\u6311\u6587\u4EF6\u6253\u5305\u6210 zip",Pd],["\u5B8C\u6574\u6027\u68C0\u67E5","manifest / UUID / \u8DEF\u5F84 / PNG / \u8D34\u56FE\u5F15\u7528",Dd],["\u4E00\u952E\u6253\u5305","\u81EA\u52A8\u5224\u65AD .mcpack / .mcaddon / .mcworld",Ud],["\u5185\u5D4C\u5305\u6D4F\u89C8","\u5217\u51FA\u5305\u5185 .mcpack/.mcaddon/.zip/.brarchive",Fd],["JSON \u6279\u91CF\u7F8E\u5316","\u6240\u6709 JSON \u7EDF\u4E00\u4E24\u7A7A\u683C\u7F29\u8FDB",Rd],["\u5168\u5C40\u6587\u672C\u66FF\u6362","\u8DE8\u6587\u4EF6\u66FF\u6362\u5E76\u7EDF\u8BA1\u6B21\u6570",Od],["\u5BFC\u51FA\u5168\u90E8\u7ED3\u6784","\u628A\u5305\u91CC\u6240\u6709 .mcstructure \u6253\u6210 zip",Hd],["\u7ED3\u6784\u8F6C mcfunction","\u5F53\u524D\u7ED3\u6784\u8F93\u51FA setblock \u6307\u4EE4",Wd],["\u73A9\u5BB6\u5217\u8868","\u5217\u51FA\u6570\u636E\u5E93\u91CC\u7684\u73A9\u5BB6\u952E\u4E0E\u5750\u6807",Zd],["\u4E66\u5185\u5BB9\u7F16\u8F91","\u8BFB\u53D6\u73A9\u5BB6\u80CC\u5305\u91CC\u7684\u6210\u4E66\uFF0C\u6539\u9875\u9762/\u4E66\u540D/\u4F5C\u8005",Md],["\u80CC\u5305\u69FD\u4F4D\u8C03\u6574","\u6539\u7269\u54C1\u5728\u80CC\u5305\u91CC\u7684\u69FD\u4F4D\uFF0C\u81EA\u52A8\u4EA4\u6362\u4E0D\u4E22\u7269\u54C1",Cd],["\u65B0\u5EFA\u9644\u52A0\u5305\uFF08\u5236\u4F5C\u5668\uFF09","\u4ECE\u96F6\u751F\u6210\u884C\u4E3A\u5305 + \u8D44\u6E90\u5305",Os],["\u521B\u4F5C\u5DE5\u574A","\u6309\u6A21\u677F\u5F80\u5F53\u524D\u5305\u5199\u5185\u5BB9",Ks],["\u9644\u52A0\u5305\u751F\u6210\u5668","\u81EA\u52A8\u751F\u6210 manifest / \u811A\u672C / \u8D34\u56FE / \u8BED\u8A00\u6587\u4EF6",Ws],["\u8D34\u56FE\u751F\u6210\u5668","16/32/64/128 \u65B9\u5757\u3001\u7269\u54C1\u3001\u5B9E\u4F53\u7ACB\u7ED8",Zs],["\u8BED\u6CD5\u6A21\u677F\u5E93","JSON / JS / TS / Python \u4EE3\u7801\u7247\u6BB5",Pi],["\u76AE\u80A4\u5236\u4F5C\u5668","64\xD764 \u624B\u52A8\u50CF\u7D20\u7ED8\u5236 / \u4EE3\u7801\u751F\u6210 / \u5BFC\u51FA PNG",()=>mi("skin")],["\u62AB\u98CE\u5236\u4F5C\u5668","64\xD732 \u62AB\u98CE\u7ED8\u5236 / \u4EE3\u7801\u751F\u6210 / \u5BFC\u51FA PNG",()=>mi("cape")],["Java \u5B58\u6863","\u8BFB .zip/.mca/.nbt\uFF0C\u7EDF\u8BA1\u3001\u5730\u56FE\u3001\u73A9\u5BB6\u3001level.dat",as],["Java \u6A21\u7EC4\u5236\u4F5C\u5668","\u751F\u6210 Fabric / Forge / NeoForge \u5DE5\u7A0B\uFF08\u6E90\u7801+\u6784\u5EFA\u811A\u672C\uFF09",is],["\u5B58\u6863\u8F6C\u6362","\u57FA\u5CA9\u7248 \u21C4 Java \u53CC\u65B9\u5411\u5730\u5F62\u8F6C\u6362\uFF0C\u4E0D\u9700\u8981 mod",ss],["\u6A21\u7EC4\u8F6C\u6362","\u57FA\u5CA9\u9644\u52A0\u5305 \u21C4 Java \u6A21\u7EC4\u5DE5\u7A0B\uFF0C\u8D34\u56FE/\u7269\u54C1/\u65B9\u5757/\u914D\u65B9",ms],["\u5DE5\u5177\u4E2D\u5FC3","20 \u4E2A\u79BB\u7EBF\u5C0F\u5DE5\u5177\uFF1AUUID/\u6E05\u5355/\u8D34\u56FE/\u7ED3\u6784/\u62A5\u544A",_s],["\u5E94\u7528\u5B58\u50A8","\u5B89\u5353\u4E13\u7528\u76EE\u5F55 Android/data/com.doubao.mctoolbox",Ci],["\u811A\u672C\u6A21\u62DF\u5668","\u672C\u5730\u6A21\u62DF @minecraft/server \u4E8B\u4EF6\u3001tick \u4E0E\u5E38\u7528 API",()=>Es(Nd)]];e.innerHTML='<h3>\u66F4\u591A\u5DE5\u5177</h3><p class="muted">\u5168\u90E8\u79BB\u7EBF\u6267\u884C\uFF0C\u4E0D\u6539\u539F\u6587\u4EF6\uFF0C\u5BFC\u51FA\u540E\u624D\u4F1A\u751F\u6210\u65B0\u5305\u3002</p>'+n.map(([t,a],i)=>`<button class="toolitem" data-i="${i}"><b>${t}</b><span>${a}</span></button>`).join("")+'<div class="modalbtns"><button id="toolsClose" class="ghost">\u5173\u95ED</button></div>',C("modal").style.display="flex",document.getElementById("toolsClose").onclick=()=>{C("modal").style.display="none"},e.querySelectorAll(".toolitem").forEach(t=>{t.onclick=()=>{C("modal").style.display="none",n[+t.dataset.i][2]()}})}async function Vs(){let e=await Ke("\u641C\u7D22\u6587\u4EF6",[{key:"q",label:"\u6587\u4EF6\u540D\u6216\u8DEF\u5F84\u5305\u542B",placeholder:"\u4F8B\u5982 textures \u6216 stone"}]);if(!e||!e.q.trim()){g.filterQ=null,pe();return}g.filterQ=e.q.trim(),pe()}async function Js(){let e=await Ke("\u641C\u7D22\u5185\u5BB9",[{key:"q",label:"\u8981\u67E5\u627E\u7684\u6587\u672C",placeholder:"\u4F8B\u5982 diamond"}]);if(!e||!e.q)return;let n=e.q,t=[];for(let a of g.archive.files){if(t.length>=60)break;if(a.data.length>1024*1024||!na(a.path,a.data))continue;let i=new TextDecoder("utf-8").decode(a.data),o=i.indexOf(n);if(o>=0){let r=i.slice(0,o).split(`
`).length;t.push(a.path+":"+r+"\u3000"+i.slice(Math.max(0,o-30),o+n.length+30).replace(/\n/g," "))}}O(t.length?"":"\u6CA1\u6709\u627E\u5230\u5305\u542B\u8BE5\u6587\u672C\u7684\u6587\u4EF6"),A("\u5185\u5BB9\u641C\u7D22\u201C"+n+"\u201D\uFF1A"+t.length+" \u4E2A\u6587\u4EF6"),t.forEach(a=>A("\xB7 "+a)),C("modalBody").innerHTML='<h3>\u641C\u7D22\u7ED3\u679C</h3><pre class="dbpre">'+ne(t.join(`
`)||"\u65E0\u7ED3\u679C")+'</pre><div class="modalbtns"><button id="toolsClose2" class="ghost">\u5173\u95ED</button></div>',C("modal").style.display="flex",document.getElementById("toolsClose2").onclick=()=>{C("modal").style.display="none"}}async function jd(){if(!g.selected)return O("\u5148\u5728\u6587\u4EF6\u6811\u91CC\u9009\u4E00\u4E2A\u6587\u4EF6\u6216\u6587\u4EF6\u5939");let e=g.selected,n=!g.archive.get(e),t=await Ke("\u590D\u5236",[{key:"to",label:"\u76EE\u6807\u8DEF\u5F84",value:e+(n?"_copy":"_copy"+nn(e))}]);if(!t||!t.to.trim())return;let a=t.to.trim();if(n){let i=e+"/",o=g.archive.files.filter(r=>r.path.startsWith(i));o.forEach(r=>g.archive.setBytes(a+"/"+r.path.slice(i.length),r.data)),A("\u5DF2\u590D\u5236\u6587\u4EF6\u5939 "+e+" \u2192 "+a+"\uFF08"+o.length+" \u4E2A\u6587\u4EF6\uFF09")}else g.archive.setBytes(a,g.archive.getBytes(e)),A("\u5DF2\u590D\u5236 "+e+" \u2192 "+a);pe()}async function Pd(){let e=await Ke("\u6279\u91CF\u5BFC\u51FA",[{key:"ext",label:"\u6269\u5C55\u540D\uFF08\u7A7A=\u5168\u90E8\u5E26\u540E\u7F00\u7684\u6587\u4EF6\uFF09",placeholder:".json"}]);if(!e)return;let n=e.ext.trim().toLowerCase(),t=g.archive.files.filter(i=>!n||i.path.toLowerCase().endsWith(n));if(!t.length)return O("\u6CA1\u6709\u5339\u914D\u7684\u6587\u4EF6");let a=new Oe("zip",t.map(i=>({path:i.path,data:i.data}))).toBytes();await Ce("\u6279\u91CF\u5BFC\u51FA_"+(n.replace(".","")||"all")+".zip",a),A("\u5DF2\u6253\u5305\u5BFC\u51FA "+t.length+" \u4E2A\u6587\u4EF6")}async function Dd(){let e=[],n=g.archive.paths(),t=new Map;for(let i of n){i.includes("\\")&&e.push("\u53CD\u659C\u6760\u8DEF\u5F84\uFF1A"+i),(i.startsWith("/")||i.includes("../"))&&e.push("\u975E\u6CD5\u8DEF\u5F84\uFF1A"+i);let o=i.toLowerCase();t.has(o)?e.push("\u5927\u5C0F\u5199\u91CD\u590D\uFF1A"+i+" \u2194 "+t.get(o)):t.set(o,i)}let a=new Map;for(let i of n.filter(o=>/manifest\.json$/i.test(o)))try{let o=JSON.parse(g.archive.getText(i)),r=o.header||{};for(let s of["uuid","name","version","description"])r[s]||e.push(i+" \u7F3A header."+s);r.uuid&&(a.has(r.uuid)?e.push("UUID \u91CD\u590D\uFF1A"+i+" \u2194 "+a.get(r.uuid)):a.set(r.uuid,i)),(o.dependencies||[]).forEach(s=>{s.uuid||e.push(i+" \u4F9D\u8D56\u9879\u7F3A uuid")})}catch(o){e.push(i+" JSON \u89E3\u6790\u5931\u8D25\uFF1A"+o.message)}for(let i of n.filter(o=>/\.png$/i.test(o))){let o=g.archive.getBytes(i);(o.length<8||o[0]!==137||o[1]!==80)&&e.push("PNG \u5934\u635F\u574F\uFF1A"+i)}for(let i of n.filter(o=>/terrain_texture\.json$/i.test(o)))try{let o=ji(g.archive.getText(i)),r=i.slice(0,i.lastIndexOf("/")).replace(/\/textures$/,"");for(let[s,l]of Object.entries(o.texture_data||{})){let c=Array.isArray(l.textures)?l.textures[0]:l.textures;if(c&&typeof c=="object"&&(c=c.path||c.texture),typeof c!="string")continue;let m=(r+"/textures/"+c.replace(/^textures\//,"")+".png").toLowerCase();n.some(u=>u.toLowerCase()===m)||e.push("\u8D34\u56FE\u7F3A\u5931\uFF1A"+s+" \u2192 "+m)}}catch(o){e.push(i+" \u6750\u8D28\u6E05\u5355\u89E3\u6790\u5931\u8D25\uFF1A"+o.message)}for(let i of g.archive.files)i.data.length===0&&e.push("\u7A7A\u6587\u4EF6\uFF1A"+i.path);C("modalBody").innerHTML='<h3>\u5B8C\u6574\u6027\u68C0\u67E5</h3><p class="muted">\u6587\u4EF6 '+n.length+" \u4E2A\uFF0C\u95EE\u9898 "+e.length+' \u6761</p><pre class="dbpre">'+ne(e.slice(0,200).join(`
`)||"\u6CA1\u6709\u53D1\u73B0\u95EE\u9898")+'</pre><div class="modalbtns"><button id="toolsClose3" class="ghost">\u5173\u95ED</button></div>',C("modal").style.display="flex",document.getElementById("toolsClose3").onclick=()=>{C("modal").style.display="none"},A("\u5B8C\u6574\u6027\u68C0\u67E5\uFF1A"+e.length+" \u4E2A\u95EE\u9898")}async function Ud(){let e=g.archive.paths(),n=e.some(r=>/^behavior_packs\//.test(r))||e.some(r=>r.includes("behavior_pack")),t=e.some(r=>/^resource_packs\//.test(r))||e.some(r=>r.includes("resource_pack")),i=e.includes("level.dat")?".mcworld":n&&t?".mcaddon":".mcpack",o=(g.name||"pack").replace(/\.(mcpack|mcaddon|mcworld|mctemplate|zip|brarchive)$/i,"");await Ce(o+"_repack"+i,g.archive.toBytes()),A("\u5DF2\u6309\u5185\u5BB9\u6253\u5305\u4E3A "+i)}async function Fd(){let e=g.archive.files.filter(n=>/\.(mcpack|mcaddon|mcworld|mctemplate|zip|brarchive)$/i.test(n.path));if(!e.length)return O("\u5305\u91CC\u6CA1\u6709\u5185\u5D4C\u7684\u5305\u6587\u4EF6");C("modalBody").innerHTML="<h3>\u5185\u5D4C\u5305</h3>"+e.map((n,t)=>'<button class="toolitem" data-i="'+t+'"><b>'+ne(n.path)+"</b><span>"+it(n.data.length)+"</span></button>").join("")+'<div class="modalbtns"><button id="toolsClose4" class="ghost">\u5173\u95ED</button></div>',C("modal").style.display="flex",document.getElementById("toolsClose4").onclick=()=>{C("modal").style.display="none"},C("modalBody").querySelectorAll(".toolitem").forEach(n=>{n.onclick=()=>{C("modal").style.display="none";try{g.archive=Oe.fromBytes(e[+n.dataset.i].path,e[+n.dataset.i].data),g.texIndex=null,g.texCache=new Map,g.texPending=new Set,g.texPacks=[],An("",""),A("\u5DF2\u6253\u5F00\u5185\u5D4C\u5305\uFF1A"+e[+n.dataset.i].path)}catch(t){O(t.message)}}})}async function Rd(){let e=0,n=0;for(let t of g.archive.files.filter(a=>/\.json$/i.test(a.path)&&a.data.length<2*1024*1024))try{t.data=new TextEncoder().encode(JSON.stringify(ji(new TextDecoder("utf-8").decode(t.data)),null,2)),e++}catch(a){n++}g.statsDirty=!0,pe(),A("JSON \u7F8E\u5316\uFF1A"+e+" \u4E2A\u6210\u529F\uFF0C"+n+" \u4E2A\u8DF3\u8FC7")}async function Od(){let e=await Ke("\u5168\u5C40\u6587\u672C\u66FF\u6362",[{key:"from",label:"\u67E5\u627E"},{key:"to",label:"\u66FF\u6362\u4E3A"},{key:"ext",label:"\u9650\u5B9A\u6269\u5C55\u540D\uFF08\u53EF\u7A7A\uFF09",value:".json"}]);if(!e||!e.from)return;let n=e.ext.trim().toLowerCase(),t=0,a=0;for(let i of g.archive.files){if(n&&!i.path.toLowerCase().endsWith(n)||i.data.length>2*1024*1024||!na(i.path,i.data))continue;let o=new TextDecoder("utf-8").decode(i.data);if(!o.includes(e.from))continue;let r=o.split(e.from);a+=r.length-1,t++,i.data=new TextEncoder().encode(r.join(e.to))}g.statsDirty=!0,pe(),A("\u66FF\u6362\u5B8C\u6210\uFF1A"+t+" \u4E2A\u6587\u4EF6\uFF0C\u5171 "+a+" \u5904")}async function Hd(){let e=g.archive.files.filter(t=>/\.mcstructure$/i.test(t.path));if(!e.length)return O("\u5305\u91CC\u6CA1\u6709 .mcstructure");let n=new Oe("zip",e.map(t=>({path:t.path,data:t.data}))).toBytes();await Ce("structures_"+e.length+".zip",n),A("\u5DF2\u5BFC\u51FA "+e.length+" \u4E2A\u7ED3\u6784\u6587\u4EF6")}async function Wd(){if(!g.structure)return O("\u5148\u5728\u6587\u4EF6\u6811\u91CC\u6253\u5F00\u4E00\u4E2A .mcstructure");let e=g.structure,[n,t,a]=e.size,i=["# \u7531 MCBE \u5DE5\u5177\u7BB1\u6309\u7ED3\u6784\u751F\u6210","# \u5C3A\u5BF8 "+n+"\xD7"+t+"\xD7"+a];for(let o=0;o<n;o++)for(let r=0;r<t;r++)for(let s=0;s<a&&!(i.length>12e4);s++){let l=(e.indices[0]||[])[(o*a+s)*t+r];if(l<0||l===void 0)continue;let c=e.palette[l];c&&i.push("setblock "+o+" "+r+" "+s+" "+c.name)}await Ce((g.name||"structure").replace(/\.[^.]+$/,"")+".mcfunction",new TextEncoder().encode(i.join(`
`))),A("\u5DF2\u751F\u6210 mcfunction\uFF1A"+i.length+" \u884C")}async function Zd(){g.db||(g.db=await window.MCBE.readLevelDb(await ut(),{}));let e=[];for(let[n,t]of g.db){if(!n.includes("player")&&n[0]!=="~")continue;let a="-";try{let i=Mi(t.value);i.pos&&(a=i.pos.map(o=>o.toFixed(1)).join(", "))}catch(i){}e.push(n+"\u3000\u5750\u6807 "+a)}C("modalBody").innerHTML='<h3>\u73A9\u5BB6\u6570\u636E</h3><pre class="dbpre">'+ne(e.join(`
`)||"\u6CA1\u6709\u627E\u5230\u73A9\u5BB6\u952E")+'</pre><div class="modalbtns"><button id="toolsClose5" class="ghost">\u5173\u95ED</button></div>',C("modal").style.display="flex",document.getElementById("toolsClose5").onclick=()=>{C("modal").style.display="none"}}async function Pi(){let e=Rr;C("modalBody").innerHTML='<h3>\u8BED\u6CD5\u6A21\u677F\u5E93</h3><p class="muted">JSON / JS \u662F\u57FA\u5CA9\u7248\u80FD\u6267\u884C\u7684\uFF1BTS \u9700\u81EA\u884C\u7F16\u8BD1\uFF1BPython \u6E38\u620F\u4E0D\u6267\u884C\uFF0C\u4EC5\u4F5C\u53C2\u8003\u3002</p>'+e.map((n,t)=>`<button class="toolitem" data-i="${t}"><b>[${n.lang}] ${n.title}</b><span>\u70B9\u51FB\u67E5\u770B\u4EE3\u7801</span></button>`).join("")+'<div class="modalbtns"><button id="snClose" class="ghost">\u5173\u95ED</button></div>',C("modal").style.display="flex",document.getElementById("snClose").onclick=()=>{C("modal").style.display="none"},C("modalBody").querySelectorAll(".toolitem").forEach(n=>{n.onclick=()=>{let t=e[+n.dataset.i];C("modalBody").innerHTML="<h3>"+t.title+"\uFF08"+t.lang+'\uFF09</h3><pre class="dbpre">'+ne(t.code)+'</pre><div class="modalbtns"><button id="snSave">\u4FDD\u5B58\u4E3A\u6587\u4EF6</button><button id="snBack" class="ghost">\u8FD4\u56DE\u5217\u8868</button></div>',document.getElementById("snBack").onclick=Pi,document.getElementById("snSave").onclick=async()=>{let a={JSON:".json",JS:".js",TS:".ts",PY:".py"}[t.lang]||".txt";await Ce("\u6A21\u677F_"+t.title.replace(/[^0-9A-Za-z\u4e00-\u9fa5]+/g,"_")+a,new TextEncoder().encode(t.code))}}})}function Ks(){C("modalBody").innerHTML=`<h3>\u9644\u52A0\u5305\u5236\u4F5C\u5668</h3><p class="muted">\u8D34\u56FE\u3001\u811A\u672C\u3001\u6E05\u5355\u3001\u8BED\u8A00\u6587\u4EF6\u4E00\u6B21\u751F\u6210\uFF0C\u5BFC\u51FA\u5373 .mcaddon\u3002</p>
    <button class="toolitem" id="stPack"><b>\u65B0\u5EFA\u9644\u52A0\u5305</b><span>\u884C\u4E3A\u5305/\u8D44\u6E90\u5305\u3001manifest\u3001UUID\u3001\u811A\u672C\u9AA8\u67B6\u3001\u5305\u56FE\u6807</span></button>
    <button class="toolitem" id="stTex"><b>\u8D34\u56FE\u751F\u6210\u5668</b><span>16/32/64/128\uFF0C\u65B9\u5757/\u7269\u54C1/\u5B9E\u4F53\u7ACB\u7ED8</span></button>
    <button class="toolitem" id="stSnip"><b>\u8BED\u6CD5\u6A21\u677F\u5E93</b><span>JSON / JS / TS / Python / Lua / mcfunction \u7247\u6BB5</span></button>
    <div class="modalbtns"><button id="stClose" class="ghost">\u5173\u95ED</button></div>`,C("modal").style.display="flex",document.getElementById("stClose").onclick=()=>{C("modal").style.display="none"},C("modalBody").querySelectorAll(".slotrow").forEach((e,n)=>{e.onclick=()=>showStructurePreview(marks[n])}),document.getElementById("stPack").onclick=Ws,document.getElementById("stTex").onclick=Zs,document.getElementById("stSnip").onclick=Pi}function Vd(){us(),fs(),ks(),Ss(e=>zi(e)),C("btnAppStore").addEventListener("click",Ci),window.onerror=(e,n,t,a,i)=>{try{window.AndroidBridge&&window.AndroidBridge.appendLog&&window.AndroidBridge.appendLog("JS_ERROR "+e+" @"+n+":"+t+":"+a+(i&&i.stack?`
`+i.stack:""))}catch(o){}O("\u811A\u672C\u9519\u8BEF\uFF1A"+e)},window.addEventListener("unhandledrejection",e=>{try{window.AndroidBridge&&window.AndroidBridge.appendLog&&window.AndroidBridge.appendLog("UNHANDLED "+(e.reason&&(e.reason.stack||e.reason.message)||e.reason))}catch(n){}}),C("btnLocalize").addEventListener("click",xd),C("btnNameFix").addEventListener("click",Sd),C("btnTools").addEventListener("click",Ad),window.addEventListener("mcShortcut",e=>{e.detail==="search"?Vs():e.detail==="contentSearch"&&Js()}),C("btnMaker").addEventListener("click",Os),C("btnCreator").addEventListener("click",Ks),Li(),C("btnMap").addEventListener("click",Ed),C("btnPlayer").addEventListener("click",Bd),C("fileInput").addEventListener("change",async()=>{let e=C("fileInput"),n=[...e.files];if(e.value="",!!n.length){if(n.length===1)return zi(n[0]);await od(n)}}),C("pickBtn").onclick=()=>C("fileInput").click(),C("btnRename").onclick=bd,C("btnDelete").onclick=gd,C("btnNewFile").onclick=yd,C("btnNewFolder").onclick=vd,C("btnExport").onclick=wd,C("btnStats").onclick=kd,C("modal").addEventListener("click",e=>{e.target.id==="modal"&&(C("modal").style.display="none")}),A("\u5C31\u7EEA\uFF1A\u9009\u62E9 .mcpack / .mcaddon / .mcworld / .mctemplate / .brarchive / .mcstructure\u3002")}Vd();window.__openFile=zi;window.__state=g;var ya=[["zh_CN","\u7B80\u4F53\u4E2D\u6587"],["zh_TW","\u7E41\u9AD4\u4E2D\u6587"],["en_US","English (US)"],["en_GB","English (UK)"],["ja_JP","\u65E5\u672C\u8A9E"],["ko_KR","\uD55C\uAD6D\uC5B4"],["fr_FR","Fran\xE7ais"],["de_DE","Deutsch"],["es_ES","Espa\xF1ol (Espa\xF1a)"],["es_MX","Espa\xF1ol (M\xE9xico)"],["pt_BR","Portugu\xEAs (Brasil)"],["pt_PT","Portugu\xEAs (Portugal)"],["ru_RU","\u0420\u0443\u0441\u0441\u043A\u0438\u0439"],["it_IT","Italiano"],["pl_PL","Polski"],["tr_TR","T\xFCrk\xE7e"],["nl_NL","Nederlands"],["sv_SE","Svenska"],["da_DK","Dansk"],["nb_NO","Norsk bokm\xE5l"],["fi_FI","Suomi"],["cs_CZ","\u010Ce\u0161tina"],["hu_HU","Magyar"],["ro_RO","Rom\xE2n\u0103"],["bg_BG","\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438"],["el_GR","\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC"],["uk_UA","\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"],["id_ID","Bahasa Indonesia"],["vi_VN","Ti\u1EBFng Vi\u1EC7t"],["th_TH","\u0E44\u0E17\u0E22"],["ar_SA","\u0627\u0644\u0639\u0631\u0628\u064A\u0629"],["he_IL","\u05E2\u05D1\u05E8\u05D9\u05EA"],["hi_IN","\u0939\u093F\u0928\u094D\u0926\u0940"]],qs=["\u9009\u62E9\u6587\u4EF6","\u5BFC\u51FA\u5B58\u6863","\u4E16\u754C\u7EDF\u8BA1","\u4E00\u952E\u6C49\u5316","\u8BD1\u540D\u4FEE\u6B63","\u66F4\u591A\u5DE5\u5177","\u5236\u4F5C\u5668","\u521B\u4F5C\u5DE5\u574A","\u4E16\u754C\u89C2\u770B","\u73A9\u5BB6\u6570\u636E","\u8FD4\u56DE\u6587\u4EF6\u5217\u8868","\u91CD\u65B0\u751F\u6210","\u7ED3\u6784\u5217\u8868","\u653E\u5927","\u7F29\u5C0F","\u9002\u5E94\u5BBD\u5EA6","\u786E\u5B9A","\u53D6\u6D88","\u4FDD\u5B58","\u5220\u9664","\u641C\u7D22","\u5173\u95ED","MC\u5DE5\u5177\u7BB1"],Di={zh_TW:["\u9078\u64C7\u6A94\u6848","\u532F\u51FA\u5B58\u6A94","\u4E16\u754C\u7D71\u8A08","\u4E00\u9375\u4E2D\u6587\u5316","\u8B6F\u540D\u4FEE\u6B63","\u66F4\u591A\u5DE5\u5177","\u88FD\u4F5C\u5668","\u5275\u4F5C\u5DE5\u574A","\u4E16\u754C\u89C0\u770B","\u73A9\u5BB6\u8CC7\u6599","\u8FD4\u56DE\u6A94\u6848\u6E05\u55AE","\u91CD\u65B0\u7522\u751F","\u7D50\u69CB\u6E05\u55AE","\u653E\u5927","\u7E2E\u5C0F","\u9069\u61C9\u5BEC\u5EA6","\u78BA\u5B9A","\u53D6\u6D88","\u5132\u5B58","\u522A\u9664","\u641C\u5C0B","\u95DC\u9589","MC\u5DE5\u5177\u7BB1"],en_US:["Choose file","Export world","World stats","One-click translate","Fix names","More tools","Maker","Creation studio","World map","Player data","Back to files","Regenerate","Structure list","Zoom in","Zoom out","Fit width","OK","Cancel","Save","Delete","Search","Close","MC Toolbox"],en_GB:["Choose file","Export world","World statistics","One-click translation","Fix names","More tools","Maker","Creation studio","World map","Player data","Back to files","Regenerate","Structure list","Zoom in","Zoom out","Fit width","OK","Cancel","Save","Delete","Search","Close","MC Toolbox"],ja_JP:["\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E","\u30EF\u30FC\u30EB\u30C9\u3092\u66F8\u304D\u51FA\u3059","\u30EF\u30FC\u30EB\u30C9\u7D71\u8A08","\u30EF\u30F3\u30AF\u30EA\u30C3\u30AF\u7FFB\u8A33","\u8A33\u540D\u4FEE\u6B63","\u305D\u306E\u4ED6\u306E\u30C4\u30FC\u30EB","\u30E1\u30FC\u30AB\u30FC","\u30AF\u30EA\u30A8\u30A4\u30C8\u5DE5\u623F","\u30EF\u30FC\u30EB\u30C9\u8868\u793A","\u30D7\u30EC\u30A4\u30E4\u30FC\u30C7\u30FC\u30BF","\u30D5\u30A1\u30A4\u30EB\u4E00\u89A7\u3078\u623B\u308B","\u518D\u751F\u6210","\u69CB\u9020\u7269\u4E00\u89A7","\u62E1\u5927","\u7E2E\u5C0F","\u5E45\u306B\u5408\u308F\u305B\u308B","OK","\u30AD\u30E3\u30F3\u30BB\u30EB","\u4FDD\u5B58","\u524A\u9664","\u691C\u7D22","\u9589\u3058\u308B","MCBE \u30C4\u30FC\u30EB\u30DC\u30C3\u30AF\u30B9"],ko_KR:["\uD30C\uC77C \uC120\uD0DD","\uC6D4\uB4DC \uB0B4\uBCF4\uB0B4\uAE30","\uC6D4\uB4DC \uD1B5\uACC4","\uC6D0\uD074\uB9AD \uBC88\uC5ED","\uC774\uB984 \uC218\uC815","\uB354 \uB9CE\uC740 \uB3C4\uAD6C","\uC81C\uC791\uAE30","\uCC3D\uC791 \uACF5\uBC29","\uC6D4\uB4DC \uBCF4\uAE30","\uD50C\uB808\uC774\uC5B4 \uB370\uC774\uD130","\uD30C\uC77C \uBAA9\uB85D\uC73C\uB85C","\uB2E4\uC2DC \uC0DD\uC131","\uAD6C\uC870\uBB3C \uBAA9\uB85D","\uD655\uB300","\uCD95\uC18C","\uB108\uBE44\uC5D0 \uB9DE\uCD94\uAE30","\uD655\uC778","\uCDE8\uC18C","\uC800\uC7A5","\uC0AD\uC81C","\uAC80\uC0C9","\uB2EB\uAE30","MCBE \uB3C4\uAD6C\uC0C1\uC790"],fr_FR:["Choisir un fichier","Exporter le monde","Statistiques du monde","Traduction en un clic","Corriger les noms","Plus d\u2019outils","Cr\xE9ateur","Atelier de cr\xE9ation","Carte du monde","Donn\xE9es du joueur","Retour aux fichiers","R\xE9g\xE9n\xE9rer","Liste des structures","Zoom avant","Zoom arri\xE8re","Ajuster \xE0 la largeur","OK","Annuler","Enregistrer","Supprimer","Rechercher","Fermer","Bo\xEEte \xE0 outils MCBE"],de_DE:["Datei ausw\xE4hlen","Welt exportieren","Weltstatistik","Ein-Klick-\xDCbersetzung","Namenskorrektur","Mehr Tools","Ersteller","Kreativwerkstatt","Weltkarte","Spielerdaten","Zur\xFCck zur Dateiliste","Neu erzeugen","Strukturliste","Vergr\xF6\xDFern","Verkleinern","An Breite anpassen","OK","Abbrechen","Speichern","L\xF6schen","Suchen","Schlie\xDFen","MCBE Werkzeugkasten"],es_ES:["Elegir archivo","Exportar mundo","Estad\xEDsticas del mundo","Traducci\xF3n en un clic","Correcci\xF3n de nombres","M\xE1s herramientas","Creador","Taller de creaci\xF3n","Vista del mundo","Datos del jugador","Volver a archivos","Regenerar","Lista de estructuras","Acercar","Alejar","Ajustar al ancho","Aceptar","Cancelar","Guardar","Eliminar","Buscar","Cerrar","Caja de herramientas MCBE"],es_MX:["Elegir archivo","Exportar mundo","Estad\xEDsticas del mundo","Traducci\xF3n en un clic","Correcci\xF3n de nombres","M\xE1s herramientas","Creador","Taller de creaci\xF3n","Vista del mundo","Datos del jugador","Volver a archivos","Regenerar","Lista de estructuras","Acercar","Alejar","Ajustar al ancho","Aceptar","Cancelar","Guardar","Eliminar","Buscar","Cerrar","Caja de herramientas MCBE"],pt_BR:["Escolher arquivo","Exportar mundo","Estat\xEDsticas do mundo","Tradu\xE7\xE3o em um clique","Corre\xE7\xE3o de nomes","Mais ferramentas","Criador","Oficina de cria\xE7\xE3o","Visualizar mundo","Dados do jogador","Voltar aos arquivos","Gerar novamente","Lista de estruturas","Ampliar","Reduzir","Ajustar \xE0 largura","OK","Cancelar","Salvar","Excluir","Pesquisar","Fechar","Caixa de ferramentas MCBE"],pt_PT:["Escolher ficheiro","Exportar mundo","Estat\xEDsticas do mundo","Tradu\xE7\xE3o num clique","Corre\xE7\xE3o de nomes","Mais ferramentas","Criador","Oficina de cria\xE7\xE3o","Ver mundo","Dados do jogador","Voltar aos ficheiros","Gerar novamente","Lista de estruturas","Ampliar","Reduzir","Ajustar \xE0 largura","OK","Cancelar","Guardar","Eliminar","Pesquisar","Fechar","Caixa de ferramentas MCBE"],ru_RU:["\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B","\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u043C\u0438\u0440\u0430","\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043C\u0438\u0440\u0430","\u041F\u0435\u0440\u0435\u0432\u043E\u0434 \u0432 \u043E\u0434\u0438\u043D \u043A\u043B\u0438\u043A","\u0418\u0441\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0439","\u0411\u043E\u043B\u044C\u0448\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432","\u0421\u043E\u0437\u0434\u0430\u0442\u0435\u043B\u044C","\u0422\u0432\u043E\u0440\u0447\u0435\u0441\u043A\u0430\u044F \u043C\u0430\u0441\u0442\u0435\u0440\u0441\u043A\u0430\u044F","\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043C\u0438\u0440\u0430","\u0414\u0430\u043D\u043D\u044B\u0435 \u0438\u0433\u0440\u043E\u043A\u0430","\u041D\u0430\u0437\u0430\u0434 \u043A \u0444\u0430\u0439\u043B\u0430\u043C","\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C","\u0421\u043F\u0438\u0441\u043E\u043A \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440","\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C","\u0423\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C","\u041F\u043E \u0448\u0438\u0440\u0438\u043D\u0435","\u041E\u041A","\u041E\u0442\u043C\u0435\u043D\u0430","\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C","\u0423\u0434\u0430\u043B\u0438\u0442\u044C","\u041F\u043E\u0438\u0441\u043A","\u0417\u0430\u043A\u0440\u044B\u0442\u044C","\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B MCBE"],it_IT:["Scegli file","Esporta mondo","Statistiche mondo","Traduzione in un clic","Correggi nomi","Altri strumenti","Creatore","Officina creativa","Visualizza mondo","Dati giocatore","Torna ai file","Rigenera","Elenco strutture","Ingrandisci","Riduci","Adatta alla larghezza","OK","Annulla","Salva","Elimina","Cerca","Chiudi","Cassetta strumenti MCBE"],pl_PL:["Wybierz plik","Eksportuj \u015Bwiat","Statystyki \u015Bwiata","T\u0142umaczenie jednym klikni\u0119ciem","Popraw nazwy","Wi\u0119cej narz\u0119dzi","Kreator","Warsztat kreatywny","Widok \u015Bwiata","Dane gracza","Powr\xF3t do plik\xF3w","Wygeneruj ponownie","Lista struktur","Powi\u0119ksz","Pomniejsz","Dopasuj szeroko\u015B\u0107","OK","Anuluj","Zapisz","Usu\u0144","Szukaj","Zamknij","Skrzynka narz\u0119dzi MCBE"],tr_TR:["Dosya se\xE7","D\xFCnyay\u0131 d\u0131\u015Fa aktar","D\xFCnya istatistikleri","Tek t\u0131kla \xE7eviri","Ad d\xFCzeltme","Daha fazla ara\xE7","Olu\u015Fturucu","Yarat\u0131m at\xF6lyesi","D\xFCnya g\xF6r\xFCn\xFCm\xFC","Oyuncu verileri","Dosyalara d\xF6n","Yeniden olu\u015Ftur","Yap\u0131 listesi","B\xFCy\xFCt","K\xFC\xE7\xFClt","Geni\u015Fli\u011Fe s\u0131\u011Fd\u0131r","Tamam","\u0130ptal","Kaydet","Sil","Ara","Kapat","MCBE Ara\xE7 Kutusu"],nl_NL:["Bestand kiezen","Wereld exporteren","Wereldstatistieken","Eenklik vertaling","Naamcorrectie","Meer hulpmiddelen","Maker","Creatiewerkplaats","Wereldweergave","Spelergegevens","Terug naar bestanden","Opnieuw genereren","Structuurlijst","Inzoomen","Uitzoomen","Pas aan breedte","OK","Annuleren","Opslaan","Verwijderen","Zoeken","Sluiten","MCBE Gereedschapskist"],sv_SE:["V\xE4lj fil","Exportera v\xE4rld","V\xE4rldsstatistik","Ett klicks \xF6vers\xE4ttning","Namnkorrigering","Fler verktyg","Skapare","Kreativ verkstad","V\xE4rlds\xF6versikt","Spelardata","Tillbaka till filer","Generera igen","Strukturlista","Zooma in","Zooma ut","Anpassa bredd","OK","Avbryt","Spara","Radera","S\xF6k","St\xE4ng","MCBE Verktygsl\xE5da"],da_DK:["V\xE6lg fil","Eksport\xE9r verden","Verdensstatistik","Overs\xE6ttelse med \xE9t klik","Navnerettelse","Flere v\xE6rkt\xF8jer","Skaber","Kreativt v\xE6rksted","Verdensvisning","Spillerdata","Tilbage til filer","Gener\xE9r igen","Strukturliste","Zoom ind","Zoom ud","Tilpas bredde","OK","Annuller","Gem","Slet","S\xF8g","Luk","MCBE V\xE6rkt\xF8jskasse"],nb_NO:["Velg fil","Eksporter verden","Verdensstatistikk","Ett klikks oversettelse","Navnekorreksjon","Flere verkt\xF8y","Skaper","Kreativt verksted","Verdensvisning","Spillerdata","Tilbake til filer","Generer p\xE5 nytt","Strukturliste","Zoom inn","Zoom ut","Tilpass bredde","OK","Avbryt","Lagre","Slett","S\xF8k","Lukk","MCBE Verkt\xF8ykasse"],fi_FI:["Valitse tiedosto","Vie maailma","Maailman tilastot","Yhden napsautuksen k\xE4\xE4nn\xF6s","Nimien korjaus","Lis\xE4\xE4 ty\xF6kaluja","Tekij\xE4","Luomisty\xF6paja","Maailman\xE4kym\xE4","Pelaajatiedot","Takaisin tiedostoihin","Luo uudelleen","Rakenneluettelo","L\xE4henn\xE4","Loitonna","Sovita leveyteen","OK","Peruuta","Tallenna","Poista","Hae","Sulje","MCBE Ty\xF6kalupakki"],cs_CZ:["Vybrat soubor","Exportovat sv\u011Bt","Statistiky sv\u011Bta","P\u0159eklad jedn\xEDm kliknut\xEDm","Oprava n\xE1zv\u016F","V\xEDce n\xE1stroj\u016F","Tv\u016Frce","Kreativn\xED d\xEDlna","Zobrazen\xED sv\u011Bta","Data hr\xE1\u010De","Zp\u011Bt k soubor\u016Fm","Znovu vytvo\u0159it","Seznam struktur","P\u0159ibl\xED\u017Eit","Odd\xE1lit","P\u0159izp\u016Fsobit \u0161\xED\u0159ce","OK","Zru\u0161it","Ulo\u017Eit","Smazat","Hledat","Zav\u0159\xEDt","N\xE1stroje MCBE"],hu_HU:["F\xE1jl kiv\xE1laszt\xE1sa","Vil\xE1g export\xE1l\xE1sa","Vil\xE1gstatisztika","Egykattint\xE1sos ford\xEDt\xE1s","Nevek jav\xEDt\xE1sa","Tov\xE1bbi eszk\xF6z\xF6k","K\xE9sz\xEDt\u0151","Kreat\xEDv m\u0171hely","Vil\xE1gn\xE9zet","J\xE1t\xE9kos adatai","Vissza a f\xE1jlokhoz","\xDAjragener\xE1l\xE1s","Szerkezetlista","Nagy\xEDt\xE1s","Kicsiny\xEDt\xE9s","Sz\xE9less\xE9ghez igaz\xEDt\xE1s","OK","M\xE9gse","Ment\xE9s","T\xF6rl\xE9s","Keres\xE9s","Bez\xE1r\xE1s","MCBE Eszk\xF6zt\xE1r"],ro_RO:["Alege fi\u0219ier","Export\u0103 lumea","Statistici lume","Traducere cu un clic","Corectare nume","Mai multe unelte","Creator","Atelier creativ","Vizualizare lume","Date juc\u0103tor","\xCEnapoi la fi\u0219iere","Regenereaz\u0103","List\u0103 structuri","M\u0103rire","Mic\u0219orare","Potrive\u0219te l\u0103\u021Bimea","OK","Anuleaz\u0103","Salveaz\u0103","\u0218terge","Caut\u0103","\xCEnchide","Trusa de unelte MCBE"],bg_BG:["\u0418\u0437\u0431\u043E\u0440 \u043D\u0430 \u0444\u0430\u0439\u043B","\u0415\u043A\u0441\u043F\u043E\u0440\u0442 \u043D\u0430 \u0441\u0432\u044F\u0442","\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043D\u0430 \u0441\u0432\u044F\u0442\u0430","\u041F\u0440\u0435\u0432\u043E\u0434 \u0441 \u0435\u0434\u043D\u043E \u043A\u043B\u0438\u043A\u0432\u0430\u043D\u0435","\u041A\u043E\u0440\u0435\u043A\u0446\u0438\u044F \u043D\u0430 \u0438\u043C\u0435\u043D\u0430","\u041E\u0449\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0438","\u0421\u044A\u0437\u0434\u0430\u0442\u0435\u043B","\u0422\u0432\u043E\u0440\u0447\u0435\u0441\u043A\u0430 \u0440\u0430\u0431\u043E\u0442\u0438\u043B\u043D\u0438\u0446\u0430","\u0418\u0437\u0433\u043B\u0435\u0434 \u043D\u0430 \u0441\u0432\u044F\u0442\u0430","\u0414\u0430\u043D\u043D\u0438 \u0437\u0430 \u0438\u0433\u0440\u0430\u0447\u0430","\u041D\u0430\u0437\u0430\u0434 \u043A\u044A\u043C \u0444\u0430\u0439\u043B\u043E\u0432\u0435\u0442\u0435","\u0413\u0435\u043D\u0435\u0440\u0438\u0440\u0430\u043D\u0435 \u043E\u0442\u043D\u043E\u0432\u043E","\u0421\u043F\u0438\u0441\u044A\u043A \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438","\u0423\u0432\u0435\u043B\u0438\u0447\u0438","\u041D\u0430\u043C\u0430\u043B\u0438","\u041F\u043E \u0448\u0438\u0440\u0438\u043D\u0430","OK","\u041E\u0442\u043A\u0430\u0437","\u0417\u0430\u043F\u0430\u0437\u0438","\u0418\u0437\u0442\u0440\u0438\u0439","\u0422\u044A\u0440\u0441\u0435\u043D\u0435","\u0417\u0430\u0442\u0432\u043E\u0440\u0438","\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0438 MCBE"],el_GR:["\u0395\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5","\u0395\u03BE\u03B1\u03B3\u03C9\u03B3\u03AE \u03BA\u03CC\u03C3\u03BC\u03BF\u03C5","\u03A3\u03C4\u03B1\u03C4\u03B9\u03C3\u03C4\u03B9\u03BA\u03AC \u03BA\u03CC\u03C3\u03BC\u03BF\u03C5","\u039C\u03B5\u03C4\u03AC\u03C6\u03C1\u03B1\u03C3\u03B7 \u03BC\u03B5 \u03AD\u03BD\u03B1 \u03BA\u03BB\u03B9\u03BA","\u0394\u03B9\u03CC\u03C1\u03B8\u03C9\u03C3\u03B7 \u03BF\u03BD\u03BF\u03BC\u03AC\u03C4\u03C9\u03BD","\u03A0\u03B5\u03C1\u03B9\u03C3\u03C3\u03CC\u03C4\u03B5\u03C1\u03B1 \u03B5\u03C1\u03B3\u03B1\u03BB\u03B5\u03AF\u03B1","\u0394\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03CC\u03C2","\u0395\u03C1\u03B3\u03B1\u03C3\u03C4\u03AE\u03C1\u03B9\u03BF \u03B4\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03AF\u03B1\u03C2","\u03A0\u03C1\u03BF\u03B2\u03BF\u03BB\u03AE \u03BA\u03CC\u03C3\u03BC\u03BF\u03C5","\u0394\u03B5\u03B4\u03BF\u03BC\u03AD\u03BD\u03B1 \u03C0\u03B1\u03AF\u03BA\u03C4\u03B7","\u0395\u03C0\u03B9\u03C3\u03C4\u03C1\u03BF\u03C6\u03AE \u03C3\u03C4\u03B1 \u03B1\u03C1\u03C7\u03B5\u03AF\u03B1","\u0391\u03BD\u03B1\u03B4\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03AF\u03B1","\u039B\u03AF\u03C3\u03C4\u03B1 \u03B4\u03BF\u03BC\u03CE\u03BD","\u039C\u03B5\u03B3\u03AD\u03B8\u03C5\u03BD\u03C3\u03B7","\u03A3\u03BC\u03AF\u03BA\u03C1\u03C5\u03BD\u03C3\u03B7","\u03A0\u03C1\u03BF\u03C3\u03B1\u03C1\u03BC\u03BF\u03B3\u03AE \u03C0\u03BB\u03AC\u03C4\u03BF\u03C5\u03C2","OK","\u0391\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7","\u0391\u03C0\u03BF\u03B8\u03AE\u03BA\u03B5\u03C5\u03C3\u03B7","\u0394\u03B9\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE","\u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7","\u039A\u03BB\u03B5\u03AF\u03C3\u03B9\u03BC\u03BF","\u0395\u03C1\u03B3\u03B1\u03BB\u03B5\u03B9\u03BF\u03B8\u03AE\u03BA\u03B7 MCBE"],uk_UA:["\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u0444\u0430\u0439\u043B","\u0415\u043A\u0441\u043F\u043E\u0440\u0442 \u0441\u0432\u0456\u0442\u0443","\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u0441\u0432\u0456\u0442\u0443","\u041F\u0435\u0440\u0435\u043A\u043B\u0430\u0434 \u043E\u0434\u043D\u0438\u043C \u043A\u043B\u0456\u043A\u043E\u043C","\u0412\u0438\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044F \u043D\u0430\u0437\u0432","\u0411\u0456\u043B\u044C\u0448\u0435 \u0456\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0456\u0432","\u0421\u0442\u0432\u043E\u0440\u044E\u0432\u0430\u0447","\u0422\u0432\u043E\u0440\u0447\u0430 \u043C\u0430\u0439\u0441\u0442\u0435\u0440\u043D\u044F","\u041E\u0433\u043B\u044F\u0434 \u0441\u0432\u0456\u0442\u0443","\u0414\u0430\u043D\u0456 \u0433\u0440\u0430\u0432\u0446\u044F","\u041D\u0430\u0437\u0430\u0434 \u0434\u043E \u0444\u0430\u0439\u043B\u0456\u0432","\u041E\u043D\u043E\u0432\u0438\u0442\u0438","\u0421\u043F\u0438\u0441\u043E\u043A \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440","\u0417\u0431\u0456\u043B\u044C\u0448\u0438\u0442\u0438","\u0417\u043C\u0435\u043D\u0448\u0438\u0442\u0438","\u0417\u0430 \u0448\u0438\u0440\u0438\u043D\u043E\u044E","OK","\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438","\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438","\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438","\u041F\u043E\u0448\u0443\u043A","\u0417\u0430\u043A\u0440\u0438\u0442\u0438","\u0406\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0438 MCBE"],id_ID:["Pilih berkas","Ekspor dunia","Statistik dunia","Terjemahan sekali klik","Koreksi nama","Alat lainnya","Pembuat","Studio kreasi","Tampilan dunia","Data pemain","Kembali ke berkas","Buat ulang","Daftar struktur","Perbesar","Perkecil","Sesuaikan lebar","OK","Batal","Simpan","Hapus","Cari","Tutup","Kotak alat MCBE"],vi_VN:["Ch\u1ECDn t\u1EC7p","Xu\u1EA5t th\u1EBF gi\u1EDBi","Th\u1ED1ng k\xEA th\u1EBF gi\u1EDBi","D\u1ECBch m\u1ED9t ch\u1EA1m","S\u1EEDa t\xEAn","Th\xEAm c\xF4ng c\u1EE5","Tr\xECnh t\u1EA1o","X\u01B0\u1EDFng s\xE1ng t\u1EA1o","Xem th\u1EBF gi\u1EDBi","D\u1EEF li\u1EC7u ng\u01B0\u1EDDi ch\u01A1i","Quay l\u1EA1i t\u1EC7p","T\u1EA1o l\u1EA1i","Danh s\xE1ch c\u1EA5u tr\xFAc","Ph\xF3ng to","Thu nh\u1ECF","V\u1EEBa chi\u1EC1u r\u1ED9ng","OK","H\u1EE7y","L\u01B0u","X\xF3a","T\xECm ki\u1EBFm","\u0110\xF3ng","H\u1ED9p c\xF4ng c\u1EE5 MCBE"],th_TH:["\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E1F\u0E25\u0E4C","\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01\u0E42\u0E25\u0E01","\u0E2A\u0E16\u0E34\u0E15\u0E34\u0E42\u0E25\u0E01","\u0E41\u0E1B\u0E25\u0E14\u0E49\u0E27\u0E22\u0E04\u0E25\u0E34\u0E01\u0E40\u0E14\u0E35\u0E22\u0E27","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E0A\u0E37\u0E48\u0E2D","\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E21\u0E37\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21","\u0E15\u0E31\u0E27\u0E2A\u0E23\u0E49\u0E32\u0E07","\u0E2B\u0E49\u0E2D\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E23\u0E23\u0E04\u0E4C","\u0E21\u0E38\u0E21\u0E21\u0E2D\u0E07\u0E42\u0E25\u0E01","\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E40\u0E25\u0E48\u0E19","\u0E01\u0E25\u0E31\u0E1A\u0E44\u0E1B\u0E17\u0E35\u0E48\u0E44\u0E1F\u0E25\u0E4C","\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E43\u0E2B\u0E21\u0E48","\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07","\u0E02\u0E22\u0E32\u0E22","\u0E22\u0E48\u0E2D","\u0E1E\u0E2D\u0E14\u0E35\u0E04\u0E27\u0E32\u0E21\u0E01\u0E27\u0E49\u0E32\u0E07","\u0E15\u0E01\u0E25\u0E07","\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01","\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01","\u0E25\u0E1A","\u0E04\u0E49\u0E19\u0E2B\u0E32","\u0E1B\u0E34\u0E14","\u0E01\u0E25\u0E48\u0E2D\u0E07\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E21\u0E37\u0E2D MCBE"],ar_SA:["\u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641","\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0639\u0627\u0644\u0645","\u0625\u062D\u0635\u0627\u0621\u0627\u062A \u0627\u0644\u0639\u0627\u0644\u0645","\u062A\u0631\u062C\u0645\u0629 \u0628\u0646\u0642\u0631\u0629 \u0648\u0627\u062D\u062F\u0629","\u062A\u0635\u062D\u064A\u062D \u0627\u0644\u0623\u0633\u0645\u0627\u0621","\u0645\u0632\u064A\u062F \u0645\u0646 \u0627\u0644\u0623\u062F\u0648\u0627\u062A","\u0627\u0644\u0645\u0646\u0634\u0626","\u0648\u0631\u0634\u0629 \u0627\u0644\u0625\u0628\u062F\u0627\u0639","\u0639\u0631\u0636 \u0627\u0644\u0639\u0627\u0644\u0645","\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0644\u0627\u0639\u0628","\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0644\u0641\u0627\u062A","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0648\u0644\u064A\u062F","\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0647\u064A\u0627\u0643\u0644","\u062A\u0643\u0628\u064A\u0631","\u062A\u0635\u063A\u064A\u0631","\u0645\u0644\u0627\u0621\u0645\u0629 \u0627\u0644\u0639\u0631\u0636","\u0645\u0648\u0627\u0641\u0642","\u0625\u0644\u063A\u0627\u0621","\u062D\u0641\u0638","\u062D\u0630\u0641","\u0628\u062D\u062B","\u0625\u063A\u0644\u0627\u0642","\u0635\u0646\u062F\u0648\u0642 \u0623\u062F\u0648\u0627\u062A MCBE"],he_IL:["\u05D1\u05D7\u05E8 \u05E7\u05D5\u05D1\u05E5","\u05D9\u05D9\u05E6\u05D0 \u05E2\u05D5\u05DC\u05DD","\u05E0\u05EA\u05D5\u05E0\u05D9 \u05E2\u05D5\u05DC\u05DD","\u05EA\u05E8\u05D2\u05D5\u05DD \u05D1\u05DC\u05D7\u05D9\u05E6\u05D4","\u05EA\u05D9\u05E7\u05D5\u05DF \u05E9\u05DE\u05D5\u05EA","\u05E2\u05D5\u05D3 \u05DB\u05DC\u05D9\u05DD","\u05D9\u05D5\u05E6\u05E8","\u05E1\u05D3\u05E0\u05EA \u05D9\u05E6\u05D9\u05E8\u05D4","\u05EA\u05E6\u05D5\u05D2\u05EA \u05E2\u05D5\u05DC\u05DD","\u05E0\u05EA\u05D5\u05E0\u05D9 \u05E9\u05D7\u05E7\u05DF","\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E7\u05D1\u05E6\u05D9\u05DD","\u05E6\u05D5\u05E8 \u05DE\u05D7\u05D3\u05E9","\u05E8\u05E9\u05D9\u05DE\u05EA \u05DE\u05D1\u05E0\u05D9\u05DD","\u05D4\u05D2\u05D3\u05DC","\u05D4\u05E7\u05D8\u05DF","\u05D4\u05EA\u05D0\u05DD \u05DC\u05E8\u05D5\u05D7\u05D1","\u05D0\u05D9\u05E9\u05D5\u05E8","\u05D1\u05D9\u05D8\u05D5\u05DC","\u05E9\u05DE\u05D5\u05E8","\u05DE\u05D7\u05E7","\u05D7\u05E4\u05E9","\u05E1\u05D2\u05D5\u05E8","\u05D0\u05E8\u05D2\u05D6 \u05DB\u05DC\u05D9\u05DD MCBE"],hi_IN:["\u092B\u093C\u093E\u0907\u0932 \u091A\u0941\u0928\u0947\u0902","\u0935\u093F\u0936\u094D\u0935 \u0928\u093F\u0930\u094D\u092F\u093E\u0924 \u0915\u0930\u0947\u0902","\u0935\u093F\u0936\u094D\u0935 \u0906\u0902\u0915\u0921\u093C\u0947","\u090F\u0915 \u0915\u094D\u0932\u093F\u0915 \u0905\u0928\u0941\u0935\u093E\u0926","\u0928\u093E\u092E \u0938\u0941\u0927\u093E\u0930","\u0914\u0930 \u0909\u092A\u0915\u0930\u0923","\u0928\u093F\u0930\u094D\u092E\u093E\u0924\u093E","\u0930\u091A\u0928\u093E \u0938\u094D\u091F\u0942\u0921\u093F\u092F\u094B","\u0935\u093F\u0936\u094D\u0935 \u0926\u0943\u0936\u094D\u092F","\u0916\u093F\u0932\u093E\u0921\u093C\u0940 \u0921\u0947\u091F\u093E","\u092B\u093C\u093E\u0907\u0932\u094B\u0902 \u092A\u0930 \u0935\u093E\u092A\u0938","\u092B\u093F\u0930 \u0938\u0947 \u092C\u0928\u093E\u090F\u0902","\u0938\u0902\u0930\u091A\u0928\u093E \u0938\u0942\u091A\u0940","\u092C\u0921\u093C\u093E \u0915\u0930\u0947\u0902","\u091B\u094B\u091F\u093E \u0915\u0930\u0947\u0902","\u091A\u094C\u0921\u093C\u093E\u0908 \u092E\u0947\u0902 \u092B\u093C\u093F\u091F","\u0920\u0940\u0915","\u0930\u0926\u094D\u0926","\u0938\u0939\u0947\u091C\u0947\u0902","\u0939\u091F\u093E\u090F\u0902","\u0916\u094B\u091C\u0947\u0902","\u092C\u0902\u0926 \u0915\u0930\u0947\u0902","MCBE \u091F\u0942\u0932\u092C\u0949\u0915\u094D\u0938"]};function Xs(){let e="";try{if(typeof navigator!="undefined"&&navigator.language&&(e=navigator.language),typeof location!="undefined"&&location.search){let s=new URLSearchParams(location.search).get("syslocale");s&&(e=s)}}catch(s){}if(!e)return"zh_CN";let n=e.replace("-","_"),t=ya.map(s=>s[0]);if(t.includes(n))return n;let a=n.split("_")[0].toLowerCase(),o={zh:n.toLowerCase().includes("tw")||n.toLowerCase().includes("hk")?"zh_TW":"zh_CN",en:"en_US",es:"es_ES",pt:"pt_BR",nb:"nb_NO",no:"nb_NO"}[a];return o||t.find(s=>s.split("_")[0].toLowerCase()===a)||"en_US"}var Pt=!0,Ue="zh_CN";try{if(typeof localStorage!="undefined"){let e=localStorage.getItem("mcbeLang");e&&e!=="auto"&&(Pt=!1,Ue=e)}}catch(e){}Pt&&(Ue=Xs());var Ui=new Map;for(let e of Object.keys(Di))Di[e].forEach((n,t)=>{n&&!Ui.has(n)&&Ui.set(n,qs[t])});function Jd(){let e=Di[Ue];if(!e)return null;let n=new Map;return qs.forEach((t,a)=>n.set(t,e[a])),n}function Gs(e){if(e==="auto"){Pt=!0,Ue=Xs();try{localStorage.setItem("mcbeLang","auto")}catch(n){}}else{Pt=!1,Ue=e;try{localStorage.setItem("mcbeLang",e)}catch(n){}}if(typeof document!="undefined"){document.documentElement.lang=Ue.replace("_","-"),Fi(document.body);let n=document.getElementById("langSel");if(n){let t=n.options[0];t&&(t.textContent=(Ue.startsWith("zh")?"\u8DDF\u968F\u7CFB\u7EDF":"System")+"\uFF08"+ya.find(a=>a[0]===Ue)[1]+"\uFF09"),n.value=Pt?"auto":Ue}}}function Fi(e){let n=Jd();if(!n||Ue==="zh_CN"||!e)return;let t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,null),a=[];for(;t.nextNode();){let i=t.currentNode,o=i.nodeValue.trim();if(!o)continue;let r=n.has(o)?o:Ui.get(o);r&&n.has(r)&&a.push([i,i.nodeValue.replace(o,n.get(r))])}for(let[i,o]of a)i.nodeValue=o}function Ys(){if(typeof document=="undefined")return;Fi(document.body),new MutationObserver(()=>Fi(document.body)).observe(document.body,{childList:!0,subtree:!0,characterData:!1});let n=document.getElementById("langSel");n&&(n.innerHTML='<option value="auto">'+(Ue.startsWith("zh")?"\u8DDF\u968F\u7CFB\u7EDF":"System")+"\uFF08"+ya.find(t=>t[0]===Ue)[1]+"\uFF09</option>"+ya.map(([t,a])=>`<option value="${t}">${a}</option>`).join(""),n.value=Pt?"auto":Ue,n.onchange=()=>Gs(n.value),typeof navigator!="undefined"&&navigator.languages&&(navigator.languages,window.addEventListener&&window.addEventListener("languagechange",()=>{Pt&&Gs("auto")})))}var Kd=[["auto","\u8DDF\u968F\u7CFB\u7EDF"],["light","\u767D\u5929"],["dark","\u9ED1\u591C"],["time","\u6309\u73B0\u5B9E\u65F6\u95F4"],["eye","\u62A4\u773C"]],ot="auto",jn=null,va=null;function Gd(){if(ot==="light")return"light";if(ot==="dark")return"dark";if(ot==="eye")return"eye";if(ot==="time"){let e=new Date().getHours();return e>=7&&e<19?"light":"dark"}try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}catch(e){return"dark"}}function Pn(){if(typeof document=="undefined")return;document.documentElement.dataset.theme=Gd();let e=document.getElementById("themeSel");e&&(e.value=ot)}function qd(e){ot=e;try{typeof localStorage!="undefined"&&localStorage.setItem("mcbeTheme",e)}catch(n){}Pn()}function Qs(){if(typeof document=="undefined")return;try{typeof localStorage!="undefined"&&(ot=localStorage.getItem("mcbeTheme")||"auto")}catch(n){}Pn();try{jn=window.matchMedia("(prefers-color-scheme: dark)");let n=()=>{ot==="auto"&&Pn()};jn.addEventListener?jn.addEventListener("change",n):jn.addListener&&jn.addListener(n)}catch(n){}va=setInterval(()=>{ot==="time"&&Pn()},6e4),va&&va.unref&&va.unref();let e=document.getElementById("themeSel");e&&(e.innerHTML=Kd.map(([n,t])=>`<option value="${n}">${t}</option>`).join(""),e.value=ot,e.onchange=()=>qd(e.value),Pn())}try{let e=typeof localStorage!="undefined"&&localStorage.getItem("mcbeAccent");e&&document.documentElement.style.setProperty("--accent",e)}catch(e){}window.MCBE={readLevelDb:Xn,analyzeWorld:Qn,zh:rr};Ys();Qs();})();
