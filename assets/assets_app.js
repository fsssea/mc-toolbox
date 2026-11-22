(()=>{var rl=Object.defineProperty;var Ri=e=>{throw TypeError(e)};var ol=(e,n,t)=>n in e?rl(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var A=(e,n,t)=>ol(e,typeof n!="symbol"?n+"":n,t),ga=(e,n,t)=>n.has(e)||Ri("Cannot "+t);var J=(e,n,t)=>(ga(e,n,"read from private field"),t?t.call(e):n.get(e)),He=(e,n,t)=>n.has(e)?Ri("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(e):n.set(e,t),lt=(e,n,t,a)=>(ga(e,n,"write to private field"),a?a.call(e,t):n.set(e,t),t),W=(e,n,t)=>(ga(e,n,"access private method"),t);var Fi=4,Oi=0,Hi=1,sl=2;function Ut(e){let n=e.length;for(;--n>=0;)e[n]=0}var ll=0,Cr=1,cl=2,Mr=29,Ua=256,Ir=286,jt=30,Ra=19,zr=573,nn=15,ya=16,ml=7,Fa=256,$r=16,Tr=17,Nr=18,$a=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),Un=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),dl=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),Lr=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ul=512,tt=new Array(288*2);Ut(tt);var an=new Array(jt*2);Ut(an);var on=new Array(ul);Ut(on);var sn=new Array(256);Ut(sn);var Oa=new Array(Mr);Ut(Oa);var Rn=new Array(jt);Ut(Rn);var va=class{constructor(e,n,t,a,i){this.static_tree=e,this.extra_bits=n,this.extra_base=t,this.elems=a,this.max_length=i,this.has_stree=e&&e.length}},Ar,jr,Pr,wa=class{constructor(e,n){this.dyn_tree=e,this.max_code=0,this.stat_desc=n}},Dr=e=>e<256?on[e]:on[256+(e>>>7)],ln=(e,n)=>{e.pending_buf[e.pending++]=n&255,e.pending_buf[e.pending++]=n>>>8&255},ke=(e,n,t)=>{e.bi_valid>ya-t?(e.bi_buf|=n<<e.bi_valid&65535,ln(e,e.bi_buf),e.bi_buf=n>>ya-e.bi_valid,e.bi_valid+=t-ya):(e.bi_buf|=n<<e.bi_valid&65535,e.bi_valid+=t)},We=(e,n,t)=>{ke(e,t[n*2],t[n*2+1])},Ur=(e,n)=>{let t=0;do t|=e&1,e>>>=1,t<<=1;while(--n>0);return t>>>1},pl=e=>{e.bi_valid===16?(ln(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):e.bi_valid>=8&&(e.pending_buf[e.pending++]=e.bi_buf&255,e.bi_buf>>=8,e.bi_valid-=8)},fl=(e,n)=>{let t=n.dyn_tree,a=n.max_code,i=n.stat_desc.static_tree,r=n.stat_desc.has_stree,o=n.stat_desc.extra_bits,s=n.stat_desc.extra_base,c=n.stat_desc.max_length,l,m,d,p,u,b,g=0;for(p=0;p<=nn;p++)e.bl_count[p]=0;for(t[e.heap[e.heap_max]*2+1]=0,l=e.heap_max+1;l<zr;l++)m=e.heap[l],p=t[t[m*2+1]*2+1]+1,p>c&&(p=c,g++),t[m*2+1]=p,!(m>a)&&(e.bl_count[p]++,u=0,m>=s&&(u=o[m-s]),b=t[m*2],e.opt_len+=b*(p+u),r&&(e.static_len+=b*(i[m*2+1]+u)));if(g!==0){do{for(p=c-1;e.bl_count[p]===0;)p--;e.bl_count[p]--,e.bl_count[p+1]+=2,e.bl_count[c]--,g-=2}while(g>0);for(p=c;p!==0;p--)for(m=e.bl_count[p];m!==0;)d=e.heap[--l],!(d>a)&&(t[d*2+1]!==p&&(e.opt_len+=(p-t[d*2+1])*t[d*2],t[d*2+1]=p),m--)}},Rr=(e,n,t)=>{let a=new Array(16),i=0,r,o;for(r=1;r<=nn;r++)i=i+t[r-1]<<1,a[r]=i;for(o=0;o<=n;o++){let s=e[o*2+1];s!==0&&(e[o*2]=Ur(a[s]++,s))}},hl=()=>{let e,n,t,a,i,r=new Array(16);for(t=0,a=0;a<Mr-1;a++)for(Oa[a]=t,e=0;e<1<<$a[a];e++)sn[t++]=a;for(sn[t-1]=a,i=0,a=0;a<16;a++)for(Rn[a]=i,e=0;e<1<<Un[a];e++)on[i++]=a;for(i>>=7;a<jt;a++)for(Rn[a]=i<<7,e=0;e<1<<Un[a]-7;e++)on[256+i++]=a;for(n=0;n<=nn;n++)r[n]=0;for(e=0;e<=143;)tt[e*2+1]=8,e++,r[8]++;for(;e<=255;)tt[e*2+1]=9,e++,r[9]++;for(;e<=279;)tt[e*2+1]=7,e++,r[7]++;for(;e<=287;)tt[e*2+1]=8,e++,r[8]++;for(Rr(tt,287,r),e=0;e<jt;e++)an[e*2+1]=5,an[e*2]=Ur(e,5);Ar=new va(tt,$a,257,Ir,nn),jr=new va(an,Un,0,jt,nn),Pr=new va(new Array(0),dl,0,Ra,ml)},Fr=e=>{let n;for(n=0;n<Ir;n++)e.dyn_ltree[n*2]=0;for(n=0;n<jt;n++)e.dyn_dtree[n*2]=0;for(n=0;n<Ra;n++)e.bl_tree[n*2]=0;e.dyn_ltree[Fa*2]=1,e.opt_len=e.static_len=0,e.sym_next=e.matches=0},Or=e=>{e.bi_valid>8?ln(e,e.bi_buf):e.bi_valid>0&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0},Zi=(e,n,t,a)=>{let i=n*2,r=t*2;return e[i]<e[r]||e[i]===e[r]&&a[n]<=a[t]},ka=(e,n,t)=>{let a=e.heap[t],i=t<<1;for(;i<=e.heap_len&&(i<e.heap_len&&Zi(n,e.heap[i+1],e.heap[i],e.depth)&&i++,!Zi(n,a,e.heap[i],e.depth));)e.heap[t]=e.heap[i],t=i,i<<=1;e.heap[t]=a},Wi=(e,n,t)=>{let a,i,r=0,o,s;if(e.sym_next!==0)do a=e.pending_buf[e.sym_buf+r++]&255,a+=(e.pending_buf[e.sym_buf+r++]&255)<<8,i=e.pending_buf[e.sym_buf+r++],a===0?We(e,i,n):(o=sn[i],We(e,o+Ua+1,n),s=$a[o],s!==0&&(i-=Oa[o],ke(e,i,s)),a--,o=Dr(a),We(e,o,t),s=Un[o],s!==0&&(a-=Rn[o],ke(e,a,s)));while(r<e.sym_next);We(e,Fa,n)},Ta=(e,n)=>{let t=n.dyn_tree,a=n.stat_desc.static_tree,i=n.stat_desc.has_stree,r=n.stat_desc.elems,o,s,c=-1,l;for(e.heap_len=0,e.heap_max=zr,o=0;o<r;o++)t[o*2]!==0?(e.heap[++e.heap_len]=c=o,e.depth[o]=0):t[o*2+1]=0;for(;e.heap_len<2;)l=e.heap[++e.heap_len]=c<2?++c:0,t[l*2]=1,e.depth[l]=0,e.opt_len--,i&&(e.static_len-=a[l*2+1]);for(n.max_code=c,o=e.heap_len>>1;o>=1;o--)ka(e,t,o);l=r;do o=e.heap[1],e.heap[1]=e.heap[e.heap_len--],ka(e,t,1),s=e.heap[1],e.heap[--e.heap_max]=o,e.heap[--e.heap_max]=s,t[l*2]=t[o*2]+t[s*2],e.depth[l]=(e.depth[o]>=e.depth[s]?e.depth[o]:e.depth[s])+1,t[o*2+1]=t[s*2+1]=l,e.heap[1]=l++,ka(e,t,1);while(e.heap_len>=2);e.heap[--e.heap_max]=e.heap[1],fl(e,n),Rr(t,c,e.bl_count)},Vi=(e,n,t)=>{let a,i=-1,r,o=n[1],s=0,c=7,l=4;for(o===0&&(c=138,l=3),n[(t+1)*2+1]=65535,a=0;a<=t;a++)r=o,o=n[(a+1)*2+1],!(++s<c&&r===o)&&(s<l?e.bl_tree[r*2]+=s:r!==0?(r!==i&&e.bl_tree[r*2]++,e.bl_tree[$r*2]++):s<=10?e.bl_tree[Tr*2]++:e.bl_tree[Nr*2]++,s=0,i=r,o===0?(c=138,l=3):r===o?(c=6,l=3):(c=7,l=4))},Ji=(e,n,t)=>{let a,i=-1,r,o=n[1],s=0,c=7,l=4;for(o===0&&(c=138,l=3),a=0;a<=t;a++)if(r=o,o=n[(a+1)*2+1],!(++s<c&&r===o)){if(s<l)do We(e,r,e.bl_tree);while(--s!==0);else r!==0?(r!==i&&(We(e,r,e.bl_tree),s--),We(e,$r,e.bl_tree),ke(e,s-3,2)):s<=10?(We(e,Tr,e.bl_tree),ke(e,s-3,3)):(We(e,Nr,e.bl_tree),ke(e,s-11,7));s=0,i=r,o===0?(c=138,l=3):r===o?(c=6,l=3):(c=7,l=4)}},_l=e=>{let n;for(Vi(e,e.dyn_ltree,e.l_desc.max_code),Vi(e,e.dyn_dtree,e.d_desc.max_code),Ta(e,e.bl_desc),n=Ra-1;n>=3&&e.bl_tree[Lr[n]*2+1]===0;n--);return e.opt_len+=3*(n+1)+5+5+4,n},bl=(e,n,t,a)=>{let i;for(ke(e,n-257,5),ke(e,t-1,5),ke(e,a-4,4),i=0;i<a;i++)ke(e,e.bl_tree[Lr[i]*2+1],3);Ji(e,e.dyn_ltree,n-1),Ji(e,e.dyn_dtree,t-1)},gl=e=>{let n=4093624447,t;for(t=0;t<=31;t++,n>>>=1)if(n&1&&e.dyn_ltree[t*2]!==0)return Oi;if(e.dyn_ltree[18]!==0||e.dyn_ltree[20]!==0||e.dyn_ltree[26]!==0)return Hi;for(t=32;t<Ua;t++)if(e.dyn_ltree[t*2]!==0)return Hi;return Oi},Ki=!1,yl=e=>{Ki||(hl(),Ki=!0),e.l_desc=new wa(e.dyn_ltree,Ar),e.d_desc=new wa(e.dyn_dtree,jr),e.bl_desc=new wa(e.bl_tree,Pr),e.bi_buf=0,e.bi_valid=0,Fr(e)},Fn=(e,n,t,a)=>{ke(e,(ll<<1)+(a?1:0),3),Or(e),ln(e,t),ln(e,~t),t&&e.pending_buf.set(e.window.subarray(n,n+t),e.pending),e.pending+=t},vl=e=>{ke(e,Cr<<1,3),We(e,Fa,tt),pl(e)},wl=(e,n,t,a)=>{let i,r,o=0;e.level>0?(e.strm.data_type===sl&&(e.strm.data_type=gl(e)),Ta(e,e.l_desc),Ta(e,e.d_desc),o=_l(e),i=e.opt_len+3+7>>>3,r=e.static_len+3+7>>>3,(r<=i||e.strategy===Fi)&&(i=r)):i=r=t+5,t+4<=i&&n!==-1?Fn(e,n,t,a):e.strategy===Fi||r===i?(ke(e,(Cr<<1)+(a?1:0),3),Wi(e,tt,an)):(ke(e,(cl<<1)+(a?1:0),3),bl(e,e.l_desc.max_code+1,e.d_desc.max_code+1,o+1),Wi(e,e.dyn_ltree,e.dyn_dtree)),Fr(e),a&&Or(e)},mt=(e,n,t)=>(e.pending_buf[e.sym_buf+e.sym_next++]=n,e.pending_buf[e.sym_buf+e.sym_next++]=n>>8,e.pending_buf[e.sym_buf+e.sym_next++]=t,n===0?e.dyn_ltree[t*2]++:(e.matches++,n--,e.dyn_ltree[(sn[t]+Ua+1)*2]++,e.dyn_dtree[Dr(n)*2]++),e.sym_next===e.sym_end),cn=(e,n,t,a)=>{let i=e&65535|0,r=e>>>16&65535|0,o=0;for(;t!==0;){o=t>2e3?2e3:t,t-=o;do i=i+n[a++]|0,r=r+i|0;while(--o);i%=65521,r%=65521}return i|r<<16|0},kl=()=>{let e=new Uint32Array(2048),n;for(let t=0;t<256;t++){n=t;for(let a=0;a<8;a++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n}for(let t=0;t<256;t++){n=e[t];for(let a=256;a<256*8;a+=256)n=e[n&255]^n>>>8,e[a+t]=n}return e},xl=kl(),ce=(e,n,t,a)=>{let i=xl,r=a+t,o=a;e^=-1;for(let s=r-7;o<s;o+=8)e^=n[o]|n[o+1]<<8|n[o+2]<<16|n[o+3]<<24,e=i[1792+(e&255)]^i[1536+(e>>>8&255)]^i[1280+(e>>>16&255)]^i[1024+(e>>>24)]^i[768+n[o+4]]^i[512+n[o+5]]^i[256+n[o+6]]^i[n[o+7]];for(;o<r;o++)e=e>>>8^i[(e^n[o])&255];return e^-1},St={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};var Sl=9;var El=573,ee=3,wt=258,Ve=262,Bl=32,Pt=42,Ha=57,Na=69,La=73,Aa=91,ja=103,kt=113,en=666,ye=1,Rt=2,Et=3,Ft=4,Cl=3,xt=(e,n)=>(e.msg=St[n],n),Gi=e=>e*2-(e>4?9:0),ct=e=>{let n=e.length;for(;--n>=0;)e[n]=0},Ml=e=>{let n,t,a,i=e.w_size;n=e.hash_size,a=n;do t=e.head[--a],e.head[a]=t>=i?t-i:0;while(--n);n=i,a=n;do t=e.prev[--a],e.prev[a]=t>=i?t-i:0;while(--n)},Za=(e,n,t)=>(n<<e.hash_shift^t)&e.hash_mask,Bt=(e,n)=>{let t;if(e.legacy_hash)t=e.ins_h=Za(e,e.ins_h,e.window[n+ee-1]);else{let i=e.window,r=i[n]|i[n+1]<<8|i[n+2]<<16|i[n+3]<<24;t=e.ins_h=Math.imul(r,66521)+66521>>>16&e.hash_mask}let a=e.prev[n&e.w_mask]=e.head[t];return e.head[t]=n,a},Ie=e=>{let n=e.state,t=n.pending;t>e.avail_out&&(t=e.avail_out),t!==0&&(e.output.set(n.pending_buf.subarray(n.pending_out,n.pending_out+t),e.next_out),e.next_out+=t,n.pending_out+=t,e.total_out+=t,e.avail_out-=t,n.pending-=t,n.pending===0&&(n.pending_out=0))},ze=(e,n)=>{wl(e,e.block_start>=0?e.block_start:-1,e.strstart-e.block_start,n),e.block_start=e.strstart,Ie(e.strm)},Q=(e,n)=>{e.pending_buf[e.pending++]=n},Qt=(e,n)=>{e.pending_buf[e.pending++]=n>>>8&255,e.pending_buf[e.pending++]=n&255},Pa=(e,n,t,a)=>{let i=e.avail_in;return i>a&&(i=a),i===0?0:(e.avail_in-=i,n.set(e.input.subarray(e.next_in,e.next_in+i),t),e.state.wrap===1?e.adler=cn(e.adler,n,i,t):e.state.wrap===2&&(e.adler=ce(e.adler,n,i,t)),e.next_in+=i,e.total_in+=i,i)},Hr=(e,n)=>{let t=e.max_chain_length,a=e.strstart,i,r,o=e.prev_length,s=e.nice_match,c=e.strstart>e.w_size-Ve?e.strstart-(e.w_size-Ve):0,l=e.window,m=e.w_mask,d=e.prev,p=e.strstart+wt,u=l[a+o-1],b=l[a+o];e.prev_length>=e.good_match&&(t>>=2),s>e.lookahead&&(s=e.lookahead);do if(i=n,!(l[i+o]!==b||l[i+o-1]!==u||l[i]!==l[a]||l[++i]!==l[a+1])){a+=2,i++;do;while(l[++a]===l[++i]&&l[++a]===l[++i]&&l[++a]===l[++i]&&l[++a]===l[++i]&&l[++a]===l[++i]&&l[++a]===l[++i]&&l[++a]===l[++i]&&l[++a]===l[++i]&&a<p);if(r=wt-(p-a),a=p-wt,r>o){if(e.match_start=n,o=r,r>=s)break;u=l[a+o-1],b=l[a+o]}}while((n=d[n&m])>c&&--t!==0);return o<=e.lookahead?o:e.lookahead},Dt=e=>{let n=e.w_size,t,a,i;do{if(a=e.window_size-e.lookahead-e.strstart,e.strstart>=n+(n-Ve)&&(e.window.set(e.window.subarray(n,n+n-a),0),e.match_start-=n,e.strstart-=n,e.block_start-=n,e.insert>e.strstart&&(e.insert=e.strstart),Ml(e),a+=n),e.strm.avail_in===0)break;if(t=Pa(e.strm,e.window,e.strstart+e.lookahead,a),e.lookahead+=t,e.legacy_hash){if(e.lookahead+e.insert>=ee)for(i=e.strstart-e.insert,e.ins_h=e.window[i],e.ins_h=Za(e,e.ins_h,e.window[i+1]);e.insert&&(Bt(e,i),i++,e.insert--,!(e.lookahead+e.insert<ee)););}else if(e.lookahead+e.insert>ee)for(i=e.strstart-e.insert;e.insert&&(Bt(e,i),i++,e.insert--,!(e.lookahead+e.insert<=ee)););}while(e.lookahead<Ve&&e.strm.avail_in!==0)},Zr=(e,n)=>{let t=e.pending_buf_size-5>e.w_size?e.w_size:e.pending_buf_size-5,a,i,r,o=0,s=e.strm.avail_in;do{if(a=65535,r=e.bi_valid+42>>3,e.strm.avail_out<r||(r=e.strm.avail_out-r,i=e.strstart-e.block_start,a>i+e.strm.avail_in&&(a=i+e.strm.avail_in),a>r&&(a=r),a<t&&(a===0&&n!==4||n===0||a!==i+e.strm.avail_in)))break;o=n===4&&a===i+e.strm.avail_in?1:0,Fn(e,0,0,o),e.pending_buf[e.pending-4]=a,e.pending_buf[e.pending-3]=a>>8,e.pending_buf[e.pending-2]=~a,e.pending_buf[e.pending-1]=~a>>8,Ie(e.strm),i&&(i>a&&(i=a),e.strm.output.set(e.window.subarray(e.block_start,e.block_start+i),e.strm.next_out),e.strm.next_out+=i,e.strm.avail_out-=i,e.strm.total_out+=i,e.block_start+=i,a-=i),a&&(Pa(e.strm,e.strm.output,e.strm.next_out,a),e.strm.next_out+=a,e.strm.avail_out-=a,e.strm.total_out+=a)}while(o===0);return s-=e.strm.avail_in,s&&(s>=e.w_size?(e.matches=2,e.window.set(e.strm.input.subarray(e.strm.next_in-e.w_size,e.strm.next_in),0),e.strstart=e.w_size,e.insert=e.strstart):(e.window_size-e.strstart<=s&&(e.strstart-=e.w_size,e.window.set(e.window.subarray(e.w_size,e.w_size+e.strstart),0),e.matches<2&&e.matches++,e.insert>e.strstart&&(e.insert=e.strstart)),e.window.set(e.strm.input.subarray(e.strm.next_in-s,e.strm.next_in),e.strstart),e.strstart+=s,e.insert+=s>e.w_size-e.insert?e.w_size-e.insert:s),e.block_start=e.strstart),e.high_water<e.strstart&&(e.high_water=e.strstart),o?Ft:n!==0&&n!==4&&e.strm.avail_in===0&&e.strstart===e.block_start?Rt:(r=e.window_size-e.strstart,e.strm.avail_in>r&&e.block_start>=e.w_size&&(e.block_start-=e.w_size,e.strstart-=e.w_size,e.window.set(e.window.subarray(e.w_size,e.w_size+e.strstart),0),e.matches<2&&e.matches++,r+=e.w_size,e.insert>e.strstart&&(e.insert=e.strstart)),r>e.strm.avail_in&&(r=e.strm.avail_in),r&&(Pa(e.strm,e.window,e.strstart,r),e.strstart+=r,e.insert+=r>e.w_size-e.insert?e.w_size-e.insert:r),e.high_water<e.strstart&&(e.high_water=e.strstart),r=e.bi_valid+42>>3,r=e.pending_buf_size-r>65535?65535:e.pending_buf_size-r,t=r>e.w_size?e.w_size:r,i=e.strstart-e.block_start,(i>=t||(i||n===4)&&n!==0&&e.strm.avail_in===0&&i<=r)&&(a=i>r?r:i,o=n===4&&e.strm.avail_in===0&&a===i?1:0,Fn(e,e.block_start,a,o),e.block_start+=a,Ie(e.strm)),o?Et:ye)},xa=(e,n)=>{let t,a;for(;;){if(e.lookahead<Ve){if(Dt(e),e.lookahead<Ve&&n===0)return ye;if(e.lookahead===0)break}if(t=0,e.lookahead>=ee&&(t=Bt(e,e.strstart)),t!==0&&e.strstart-t<=e.w_size-Ve&&(e.match_length=Hr(e,t)),e.match_length>=ee)if(a=mt(e,e.strstart-e.match_start,e.match_length-ee),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=ee){e.match_length--;do e.strstart++,t=Bt(e,e.strstart);while(--e.match_length!==0);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.legacy_hash&&(e.ins_h=e.window[e.strstart],e.ins_h=Za(e,e.ins_h,e.window[e.strstart+1]));else a=mt(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(a&&(ze(e,!1),e.strm.avail_out===0))return ye}return e.insert=e.strstart<ee-1?e.strstart:ee-1,n===4?(ze(e,!0),e.strm.avail_out===0?Et:Ft):e.sym_next&&(ze(e,!1),e.strm.avail_out===0)?ye:Rt},At=(e,n)=>{let t,a,i;for(;;){if(e.lookahead<Ve){if(Dt(e),e.lookahead<Ve&&n===0)return ye;if(e.lookahead===0)break}if(t=0,e.lookahead>=ee&&(t=Bt(e,e.strstart)),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=ee-1,t!==0&&e.prev_length<e.max_lazy_match&&e.strstart-t<=e.w_size-Ve&&(e.match_length=Hr(e,t),e.match_length<=5&&(e.strategy===1||e.match_length===ee&&e.strstart-e.match_start>4096)&&(e.match_length=ee-1)),e.prev_length>=ee&&e.match_length<=e.prev_length){i=e.strstart+e.lookahead-ee,a=mt(e,e.strstart-1-e.prev_match,e.prev_length-ee),e.lookahead-=e.prev_length-1,e.prev_length-=2;do++e.strstart<=i&&(t=Bt(e,e.strstart));while(--e.prev_length!==0);if(e.match_available=0,e.match_length=ee-1,e.strstart++,a&&(ze(e,!1),e.strm.avail_out===0))return ye}else if(e.match_available){if(a=mt(e,0,e.window[e.strstart-1]),a&&ze(e,!1),e.strstart++,e.lookahead--,e.strm.avail_out===0)return ye}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(a=mt(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<ee-1?e.strstart:ee-1,n===4?(ze(e,!0),e.strm.avail_out===0?Et:Ft):e.sym_next&&(ze(e,!1),e.strm.avail_out===0)?ye:Rt},Il=(e,n)=>{let t,a,i,r,o=e.window;for(;;){if(e.lookahead<=wt){if(Dt(e),e.lookahead<=wt&&n===0)return ye;if(e.lookahead===0)break}if(e.match_length=0,e.lookahead>=ee&&e.strstart>0&&(i=e.strstart-1,a=o[i],a===o[++i]&&a===o[++i]&&a===o[++i])){r=e.strstart+wt;do;while(a===o[++i]&&a===o[++i]&&a===o[++i]&&a===o[++i]&&a===o[++i]&&a===o[++i]&&a===o[++i]&&a===o[++i]&&i<r);e.match_length=wt-(r-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=ee?(t=mt(e,1,e.match_length-ee),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(t=mt(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),t&&(ze(e,!1),e.strm.avail_out===0))return ye}return e.insert=0,n===4?(ze(e,!0),e.strm.avail_out===0?Et:Ft):e.sym_next&&(ze(e,!1),e.strm.avail_out===0)?ye:Rt},zl=(e,n)=>{let t;for(;;){if(e.lookahead===0&&(Dt(e),e.lookahead===0)){if(n===0)return ye;break}if(e.match_length=0,t=mt(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,t&&(ze(e,!1),e.strm.avail_out===0))return ye}return e.insert=0,n===4?(ze(e,!0),e.strm.avail_out===0?Et:Ft):e.sym_next&&(ze(e,!1),e.strm.avail_out===0)?ye:Rt},Ze=class{constructor(e,n,t,a,i){this.good_length=e,this.max_lazy=n,this.nice_length=t,this.max_chain=a,this.func=i}},tn=[new Ze(0,0,0,0,Zr),new Ze(4,4,8,4,xa),new Ze(4,5,16,8,xa),new Ze(4,6,32,32,xa),new Ze(4,4,16,16,At),new Ze(8,16,32,32,At),new Ze(8,16,128,128,At),new Ze(8,32,128,256,At),new Ze(32,128,258,1024,At),new Ze(32,258,258,4096,At)],$l=e=>{e.window_size=2*e.w_size,ct(e.head),e.max_lazy_match=tn[e.level].max_lazy,e.good_match=tn[e.level].good_length,e.nice_match=tn[e.level].nice_length,e.max_chain_length=tn[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=ee-1,e.match_available=0,e.ins_h=0},Tl=class{constructor(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=8,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.legacy_hash=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(El*2),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),ct(this.dyn_ltree),ct(this.dyn_dtree),ct(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),ct(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),ct(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}},Hn=e=>{if(!e)return 1;let n=e.state;return!n||n.strm!==e||n.status!==Pt&&n.status!==Ha&&n.status!==Na&&n.status!==La&&n.status!==Aa&&n.status!==ja&&n.status!==kt&&n.status!==en?1:0},Nl=e=>{if(Hn(e))return xt(e,-2);e.total_in=e.total_out=0,e.data_type=2;let n=e.state;return n.pending=0,n.pending_out=0,n.wrap<0&&(n.wrap=-n.wrap),n.status=n.wrap===2?Ha:n.wrap?Pt:kt,e.adler=n.wrap===2?0:1,n.last_flush=-2,yl(n),0},Ll=e=>{let n=Nl(e);return n===0&&$l(e.state),n};var Al=(e,n,t,a,i,r,o)=>{if(!e)return-2;let s=1;if(n===-1&&(n=6),a<0?(s=0,a=-a):a>15&&(s=2,a-=16),i<1||i>Sl||t!==8||a<8||a>15||n<0||n>9||r<0||r>4||a===8&&s!==1)return xt(e,-2);a===8&&(a=9);let c=new Tl;return e.state=c,c.strm=e,c.status=Pt,c.wrap=s,c.gzhead=null,c.w_bits=a,c.w_size=1<<c.w_bits,c.w_mask=c.w_size-1,c.legacy_hash=o?1:0,c.hash_bits=i+7,!c.legacy_hash&&c.hash_bits<15&&(c.hash_bits=15),c.hash_size=1<<c.hash_bits,c.hash_mask=c.hash_size-1,c.hash_shift=~~((c.hash_bits+ee-1)/ee),c.window=new Uint8Array(c.w_size*2),c.head=new Uint16Array(c.hash_size),c.prev=new Uint16Array(c.w_size),c.lit_bufsize=1<<i+6,c.pending_buf_size=c.lit_bufsize*4,c.pending_buf=new Uint8Array(c.pending_buf_size),c.sym_buf=c.lit_bufsize,c.sym_end=(c.lit_bufsize-1)*3,c.level=n,c.strategy=r,c.method=t,Ll(e)};var jl=(e,n)=>{if(Hn(e)||n>5||n<0)return e?xt(e,-2):-2;let t=e.state;if(!e.output||e.avail_in!==0&&!e.input||t.status===en&&n!==4)return xt(e,e.avail_out===0?-5:-2);let a=t.last_flush;if(t.last_flush=n,t.pending!==0){if(Ie(e),e.avail_out===0)return t.last_flush=-1,0}else if(e.avail_in===0&&Gi(n)<=Gi(a)&&n!==4)return xt(e,-5);if(t.status===en&&e.avail_in!==0)return xt(e,-5);if(t.status===Pt&&t.wrap===0&&(t.status=kt),t.status===Pt){let i=8+(t.w_bits-8<<4)<<8,r=-1;if(t.strategy>=2||t.level<2?r=0:t.level<6?r=1:t.level===6?r=2:r=3,i|=r<<6,t.strstart!==0&&(i|=Bl),i+=31-i%31,Qt(t,i),t.strstart!==0&&(Qt(t,e.adler>>>16),Qt(t,e.adler&65535)),e.adler=1,t.status=kt,Ie(e),t.pending!==0)return t.last_flush=-1,0}if(t.status===Ha){if(e.adler=0,Q(t,31),Q(t,139),Q(t,8),t.gzhead)Q(t,(t.gzhead.text?1:0)+(t.gzhead.hcrc?2:0)+(t.gzhead.extra?4:0)+(t.gzhead.name?8:0)+(t.gzhead.comment?16:0)),Q(t,t.gzhead.time&255),Q(t,t.gzhead.time>>8&255),Q(t,t.gzhead.time>>16&255),Q(t,t.gzhead.time>>24&255),Q(t,t.level===9?2:t.strategy>=2||t.level<2?4:0),Q(t,t.gzhead.os&255),t.gzhead.extra&&t.gzhead.extra.length&&(Q(t,t.gzhead.extra.length&255),Q(t,t.gzhead.extra.length>>8&255)),t.gzhead.hcrc&&(e.adler=ce(e.adler,t.pending_buf,t.pending,0)),t.gzindex=0,t.status=Na;else if(Q(t,0),Q(t,0),Q(t,0),Q(t,0),Q(t,0),Q(t,t.level===9?2:t.strategy>=2||t.level<2?4:0),Q(t,Cl),t.status=kt,Ie(e),t.pending!==0)return t.last_flush=-1,0}if(t.status===Na){if(t.gzhead.extra){let i=t.pending,r=(t.gzhead.extra.length&65535)-t.gzindex;for(;t.pending+r>t.pending_buf_size;){let s=t.pending_buf_size-t.pending;if(t.pending_buf.set(t.gzhead.extra.subarray(t.gzindex,t.gzindex+s),t.pending),t.pending=t.pending_buf_size,t.gzhead.hcrc&&t.pending>i&&(e.adler=ce(e.adler,t.pending_buf,t.pending-i,i)),t.gzindex+=s,Ie(e),t.pending!==0)return t.last_flush=-1,0;i=0,r-=s}let o=new Uint8Array(t.gzhead.extra);t.pending_buf.set(o.subarray(t.gzindex,t.gzindex+r),t.pending),t.pending+=r,t.gzhead.hcrc&&t.pending>i&&(e.adler=ce(e.adler,t.pending_buf,t.pending-i,i)),t.gzindex=0}t.status=La}if(t.status===La){if(t.gzhead.name){let i=t.pending,r;do{if(t.pending===t.pending_buf_size){if(t.gzhead.hcrc&&t.pending>i&&(e.adler=ce(e.adler,t.pending_buf,t.pending-i,i)),Ie(e),t.pending!==0)return t.last_flush=-1,0;i=0}t.gzindex<t.gzhead.name.length?r=t.gzhead.name.charCodeAt(t.gzindex++)&255:r=0,Q(t,r)}while(r!==0);t.gzhead.hcrc&&t.pending>i&&(e.adler=ce(e.adler,t.pending_buf,t.pending-i,i)),t.gzindex=0}t.status=Aa}if(t.status===Aa){if(t.gzhead.comment){let i=t.pending,r;do{if(t.pending===t.pending_buf_size){if(t.gzhead.hcrc&&t.pending>i&&(e.adler=ce(e.adler,t.pending_buf,t.pending-i,i)),Ie(e),t.pending!==0)return t.last_flush=-1,0;i=0}t.gzindex<t.gzhead.comment.length?r=t.gzhead.comment.charCodeAt(t.gzindex++)&255:r=0,Q(t,r)}while(r!==0);t.gzhead.hcrc&&t.pending>i&&(e.adler=ce(e.adler,t.pending_buf,t.pending-i,i))}t.status=ja}if(t.status===ja){if(t.gzhead.hcrc){if(t.pending+2>t.pending_buf_size&&(Ie(e),t.pending!==0))return t.last_flush=-1,0;Q(t,e.adler&255),Q(t,e.adler>>8&255),e.adler=0}if(t.status=kt,Ie(e),t.pending!==0)return t.last_flush=-1,0}if(e.avail_in!==0||t.lookahead!==0||n!==0&&t.status!==en){let i=t.level===0?Zr(t,n):t.strategy===2?zl(t,n):t.strategy===3?Il(t,n):tn[t.level].func(t,n);if((i===Et||i===Ft)&&(t.status=en),i===ye||i===Et)return e.avail_out===0&&(t.last_flush=-1),0;if(i===Rt&&(n===1?vl(t):n!==5&&(Fn(t,0,0,!1),n===3&&(ct(t.head),t.lookahead===0&&(t.strstart=0,t.block_start=0,t.insert=0))),Ie(e),e.avail_out===0))return t.last_flush=-1,0}return n!==4?0:t.wrap<=0?1:(t.wrap===2?(Q(t,e.adler&255),Q(t,e.adler>>8&255),Q(t,e.adler>>16&255),Q(t,e.adler>>24&255),Q(t,e.total_in&255),Q(t,e.total_in>>8&255),Q(t,e.total_in>>16&255),Q(t,e.total_in>>24&255)):(Qt(t,e.adler>>>16),Qt(t,e.adler&65535)),Ie(e),t.wrap>0&&(t.wrap=-t.wrap),t.pending!==0?0:1)},Pl=e=>{if(Hn(e))return-2;let n=e.state.status;return e.state=null,n===kt?xt(e,-3):0},Dl=(e,n)=>{let t=n.length;if(Hn(e))return-2;let a=e.state,i=a.wrap;if(i===2||i===1&&a.status!==Pt||a.lookahead)return-2;if(i===1&&(e.adler=cn(e.adler,n,t,0)),a.wrap=0,t>=a.w_size){i===0&&(ct(a.head),a.strstart=0,a.block_start=0,a.insert=0);let c=new Uint8Array(a.w_size);c.set(n.subarray(t-a.w_size,t),0),n=c,t=a.w_size}let r=e.avail_in,o=e.next_in,s=e.input;for(e.avail_in=t,e.next_in=0,e.input=n,Dt(a);a.lookahead>=ee;){let c=a.strstart,l=a.lookahead-(ee-1);do Bt(a,c),c++;while(--l);a.strstart=c,a.lookahead=ee-1,Dt(a)}return a.strstart+=a.lookahead,a.block_start=a.strstart,a.insert=a.lookahead,a.lookahead=0,a.match_length=a.prev_length=ee-1,a.match_available=0,e.next_in=o,e.input=s,e.avail_in=r,a.wrap=i,0},An=16209,Ul=16191;function Rl(e,n){let t,a,i,r,o,s,c,l,m,d,p,u,b,g,f,_,y,w,v,I,B,S,C,k,z=e.state;t=e.next_in,C=e.input,a=t+(e.avail_in-5),i=e.next_out,k=e.output,r=i-(n-e.avail_out),o=i+(e.avail_out-257),s=z.dmax,c=z.wsize,l=z.whave,m=z.wnext,d=z.window,p=z.hold,u=z.bits,b=z.lencode,g=z.distcode,f=(1<<z.lenbits)-1,_=(1<<z.distbits)-1;e:do{u<15&&(p+=C[t++]<<u,u+=8,p+=C[t++]<<u,u+=8),y=b[p&f];t:for(;;){if(w=y>>>24,p>>>=w,u-=w,w=y>>>16&255,w===0)k[i++]=y&65535;else if(w&16){v=y&65535,w&=15,w&&(u<w&&(p+=C[t++]<<u,u+=8),v+=p&(1<<w)-1,p>>>=w,u-=w),u<15&&(p+=C[t++]<<u,u+=8,p+=C[t++]<<u,u+=8),y=g[p&_];n:for(;;){if(w=y>>>24,p>>>=w,u-=w,w=y>>>16&255,w&16){if(I=y&65535,w&=15,u<w&&(p+=C[t++]<<u,u+=8,u<w&&(p+=C[t++]<<u,u+=8)),I+=p&(1<<w)-1,I>s){e.msg="invalid distance too far back",z.mode=An;break e}if(p>>>=w,u-=w,w=i-r,I>w){if(w=I-w,w>l&&z.sane){e.msg="invalid distance too far back",z.mode=An;break e}if(B=0,S=d,m===0){if(B+=c-w,w<v){v-=w;do k[i++]=d[B++];while(--w);B=i-I,S=k}}else if(m<w){if(B+=c+m-w,w-=m,w<v){v-=w;do k[i++]=d[B++];while(--w);if(B=0,m<v){w=m,v-=w;do k[i++]=d[B++];while(--w);B=i-I,S=k}}}else if(B+=m-w,w<v){v-=w;do k[i++]=d[B++];while(--w);B=i-I,S=k}for(;v>2;)k[i++]=S[B++],k[i++]=S[B++],k[i++]=S[B++],v-=3;v&&(k[i++]=S[B++],v>1&&(k[i++]=S[B++]))}else{B=i-I;do k[i++]=k[B++],k[i++]=k[B++],k[i++]=k[B++],v-=3;while(v>2);v&&(k[i++]=k[B++],v>1&&(k[i++]=k[B++]))}}else if((w&64)===0){y=g[(y&65535)+(p&(1<<w)-1)];continue n}else{e.msg="invalid distance code",z.mode=An;break e}break}}else if((w&64)===0){y=b[(y&65535)+(p&(1<<w)-1)];continue t}else if(w&32){z.mode=Ul;break e}else{e.msg="invalid literal/length code",z.mode=An;break e}break}}while(t<a&&i<o);v=u>>3,t-=v,u-=v<<3,p&=(1<<u)-1,e.next_in=t,e.next_out=i,e.avail_in=t<a?5+(a-t):5-(t-a),e.avail_out=i<o?257+(o-i):257-(i-o),z.hold=p,z.bits=u}var jn=15,qi=852,Xi=592,Yi=0,Sa=1,Qi=2,Fl=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),Ol=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,199,75]),Hl=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),Zl=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]),rn=(e,n,t,a,i,r,o,s)=>{let c=s.bits,l=0,m=0,d=0,p=0,u=0,b=0,g=0,f=0,_=0,y=0,w,v,I,B,S,C=null,k,z=new Uint16Array(16),$=new Uint16Array(16),j=null,M,D,R;for(l=0;l<=jn;l++)z[l]=0;for(m=0;m<a;m++)z[n[t+m]]++;for(u=c,p=jn;p>=1&&z[p]===0;p--);if(u>p&&(u=p),p===0)return i[r++]=20971520,i[r++]=20971520,s.bits=1,0;for(d=1;d<p&&z[d]===0;d++);for(u<d&&(u=d),f=1,l=1;l<=jn;l++)if(f<<=1,f-=z[l],f<0)return-1;if(f>0&&(e===Yi||p!==1))return-1;for($[1]=0,l=1;l<jn;l++)$[l+1]=$[l]+z[l];for(m=0;m<a;m++)n[t+m]!==0&&(o[$[n[t+m]]++]=m);if(e===Yi?(C=j=o,k=20):e===Sa?(C=Fl,j=Ol,k=257):(C=Hl,j=Zl,k=0),y=0,m=0,l=d,S=r,b=u,g=0,I=-1,_=1<<u,B=_-1,e===Sa&&_>qi||e===Qi&&_>Xi)return 1;for(;;){M=l-g,o[m]+1<k?(D=0,R=o[m]):o[m]>=k?(D=j[o[m]-k],R=C[o[m]-k]):(D=96,R=0),w=1<<l-g,v=1<<b,d=v;do v-=w,i[S+(y>>g)+v]=M<<24|D<<16|R|0;while(v!==0);for(w=1<<l-1;y&w;)w>>=1;if(w!==0?(y&=w-1,y+=w):y=0,m++,--z[l]===0){if(l===p)break;l=n[t+o[m]]}if(l>u&&(y&B)!==I){for(g===0&&(g=u),S+=d,b=l-g,f=1<<b;b+g<p&&(f-=z[b+g],!(f<=0));)b++,f<<=1;if(_+=1<<b,e===Sa&&_>qi||e===Qi&&_>Xi)return 1;I=y&B,i[I]=u<<24|b<<16|S-r|0}}return y!==0&&(i[S+y]=l-g<<24|4194304),s.bits=u,0},Wl=0,Wr=1,Vr=2,Zn=16180,er=16181,tr=16182,nr=16183,ar=16184,ir=16185,rr=16186,or=16187,sr=16188,lr=16189,On=16190,et=16191,Ea=16192,cr=16193,Ba=16194,mr=16195,dr=16196,ur=16197,pr=16198,Pn=16199,Dn=16200,fr=16201,hr=16202,_r=16203,br=16204,gr=16205,Ca=16206,yr=16207,vr=16208,ie=16209,Da=16210,Jr=16211,Vl=852,Jl=592;var wr=e=>(e>>>24&255)+(e>>>8&65280)+((e&65280)<<8)+((e&255)<<24),Kl=class{constructor(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}},Ot=e=>{if(!e)return 1;let n=e.state;return!n||n.strm!==e||n.mode<Zn||n.mode>Jr?1:0},Gl=e=>{if(Ot(e))return-2;let n=e.state;return e.total_in=e.total_out=n.total=0,e.msg="",n.wrap&&(e.adler=n.wrap&1),n.mode=Zn,n.last=0,n.havedict=0,n.flags=-1,n.dmax=32768,n.head=null,n.hold=0,n.bits=0,n.lencode=n.lendyn=new Int32Array(Vl),n.distcode=n.distdyn=new Int32Array(Jl),n.sane=1,n.back=-1,0},Kr=e=>{if(Ot(e))return-2;let n=e.state;return n.wsize=0,n.whave=0,n.wnext=0,Gl(e)},ql=(e,n)=>{let t;if(Ot(e))return-2;let a=e.state;return n<0?(t=0,n=-n):(t=(n>>4)+5,n<48&&(n&=15)),n&&(n<8||n>15)?-2:(a.window!==null&&a.wbits!==n&&(a.window=null),a.wrap=t,a.wbits=n,Kr(e))},Xl=(e,n)=>{if(!e)return-2;let t=new Kl;e.state=t,t.strm=e,t.window=null,t.mode=Zn;let a=ql(e,n);return a!==0&&(e.state=null),a};var kr=!0,Ma,Ia,Yl=e=>{if(kr){Ma=new Int32Array(512),Ia=new Int32Array(32);let n=0;for(;n<144;)e.lens[n++]=8;for(;n<256;)e.lens[n++]=9;for(;n<280;)e.lens[n++]=7;for(;n<288;)e.lens[n++]=8;for(rn(Wr,e.lens,0,288,Ma,0,e.work,{bits:9}),n=0;n<32;)e.lens[n++]=5;rn(Vr,e.lens,0,32,Ia,0,e.work,{bits:5}),kr=!1}e.lencode=Ma,e.lenbits=9,e.distcode=Ia,e.distbits=5},Gr=(e,n,t,a)=>{let i,r=e.state;return r.window===null&&(r.window=new Uint8Array(1<<r.wbits)),r.wsize===0&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0),a>=r.wsize?(r.window.set(n.subarray(t-r.wsize,t),0),r.wnext=0,r.whave=r.wsize):(i=r.wsize-r.wnext,i>a&&(i=a),r.window.set(n.subarray(t-a,t-a+i),r.wnext),a-=i,a?(r.window.set(n.subarray(t-a,t),0),r.wnext=a,r.whave=r.wsize):(r.wnext+=i,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=i))),0},za=(e,n)=>{let t,a,i,r,o,s,c,l,m,d,p,u,b,g,f=0,_,y,w,v,I,B,S,C,k=new Uint8Array(4),z,$,j=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(Ot(e)||!e.output||!e.input&&e.avail_in!==0)return-2;t=e.state,t.mode===et&&(t.mode=Ea),o=e.next_out,i=e.output,c=e.avail_out,r=e.next_in,a=e.input,s=e.avail_in,l=t.hold,m=t.bits,d=s,p=c,C=0;e:for(;;)switch(t.mode){case Zn:if(t.wrap===0){t.mode=Ea;break}for(;m<16;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}if(t.wrap&2&&l===35615){t.wbits===0&&(t.wbits=15),t.check=0,k[0]=l&255,k[1]=l>>>8&255,t.check=ce(t.check,k,2,0),l=0,m=0,t.mode=er;break}if(t.head&&(t.head.done=!1),!(t.wrap&1)||(((l&255)<<8)+(l>>8))%31){e.msg="incorrect header check",t.mode=ie;break}if((l&15)!==8){e.msg="unknown compression method",t.mode=ie;break}if(l>>>=4,m-=4,S=(l&15)+8,t.wbits===0&&(t.wbits=S),S>15||S>t.wbits){e.msg="invalid window size",t.mode=ie;break}t.dmax=1<<t.wbits,t.flags=0,e.adler=t.check=1,t.mode=l&512?lr:et,l=0,m=0;break;case er:for(;m<16;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}if(t.flags=l,(t.flags&255)!==8){e.msg="unknown compression method",t.mode=ie;break}if(t.flags&57344){e.msg="unknown header flags set",t.mode=ie;break}t.head&&(t.head.text=l>>8&1),t.flags&512&&t.wrap&4&&(k[0]=l&255,k[1]=l>>>8&255,t.check=ce(t.check,k,2,0)),l=0,m=0,t.mode=tr;case tr:for(;m<32;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}t.head&&(t.head.time=l>>>0),t.flags&512&&t.wrap&4&&(k[0]=l&255,k[1]=l>>>8&255,k[2]=l>>>16&255,k[3]=l>>>24&255,t.check=ce(t.check,k,4,0)),l=0,m=0,t.mode=nr;case nr:for(;m<16;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}t.head&&(t.head.xflags=l&255,t.head.os=l>>8),t.flags&512&&t.wrap&4&&(k[0]=l&255,k[1]=l>>>8&255,t.check=ce(t.check,k,2,0)),l=0,m=0,t.mode=ar;case ar:if(t.flags&1024){for(;m<16;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}t.length=l,t.head&&(t.head.extra_len=l),t.flags&512&&t.wrap&4&&(k[0]=l&255,k[1]=l>>>8&255,t.check=ce(t.check,k,2,0)),l=0,m=0}else t.head&&(t.head.extra=null);t.mode=ir;case ir:if(t.flags&1024&&(u=t.length,u>s&&(u=s),u&&(t.head&&(S=t.head.extra_len-t.length,t.head.extra||(t.head.extra=new Uint8Array(t.head.extra_len)),t.head.extra.set(a.subarray(r,r+u),S)),t.flags&512&&t.wrap&4&&(t.check=ce(t.check,a,u,r)),s-=u,r+=u,t.length-=u),t.length))break e;t.length=0,t.mode=rr;case rr:if(t.flags&2048){if(s===0)break e;u=0;do S=a[r+u++],t.head&&S&&t.length<65536&&(t.head.name+=String.fromCharCode(S),t.length++);while(S&&u<s);if(t.flags&512&&t.wrap&4&&(t.check=ce(t.check,a,u,r)),s-=u,r+=u,S)break e}else t.head&&(t.head.name=null);t.length=0,t.mode=or;case or:if(t.flags&4096){if(s===0)break e;u=0;do S=a[r+u++],t.head&&S&&t.length<65536&&(t.head.comment+=String.fromCharCode(S),t.length++);while(S&&u<s);if(t.flags&512&&t.wrap&4&&(t.check=ce(t.check,a,u,r)),s-=u,r+=u,S)break e}else t.head&&(t.head.comment=null);t.mode=sr;case sr:if(t.flags&512){for(;m<16;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}if(t.wrap&4&&l!==(t.check&65535)){e.msg="header crc mismatch",t.mode=ie;break}l=0,m=0}t.head&&(t.head.hcrc=t.flags>>9&1,t.head.done=!0),e.adler=t.check=0,t.mode=et;break;case lr:for(;m<32;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}e.adler=t.check=wr(l),l=0,m=0,t.mode=On;case On:if(t.havedict===0)return e.next_out=o,e.avail_out=c,e.next_in=r,e.avail_in=s,t.hold=l,t.bits=m,2;e.adler=t.check=1,t.mode=et;case et:if(n===5||n===6)break e;case Ea:if(t.last){l>>>=m&7,m-=m&7,t.mode=Ca;break}for(;m<3;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}switch(t.last=l&1,l>>>=1,m-=1,l&3){case 0:t.mode=cr;break;case 1:if(Yl(t),t.mode=Pn,n===6){l>>>=2,m-=2;break e}break;case 2:t.mode=dr;break;case 3:e.msg="invalid block type",t.mode=ie}l>>>=2,m-=2;break;case cr:for(l>>>=m&7,m-=m&7;m<32;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}if((l&65535)!==(l>>>16^65535)){e.msg="invalid stored block lengths",t.mode=ie;break}if(t.length=l&65535,l=0,m=0,t.mode=Ba,n===6)break e;case Ba:t.mode=mr;case mr:if(u=t.length,u){if(u>s&&(u=s),u>c&&(u=c),u===0)break e;i.set(a.subarray(r,r+u),o),s-=u,r+=u,c-=u,o+=u,t.length-=u;break}t.mode=et;break;case dr:for(;m<14;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}if(t.nlen=(l&31)+257,l>>>=5,m-=5,t.ndist=(l&31)+1,l>>>=5,m-=5,t.ncode=(l&15)+4,l>>>=4,m-=4,t.nlen>286||t.ndist>30){e.msg="too many length or distance symbols",t.mode=ie;break}t.have=0,t.mode=ur;case ur:for(;t.have<t.ncode;){for(;m<3;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}t.lens[j[t.have++]]=l&7,l>>>=3,m-=3}for(;t.have<19;)t.lens[j[t.have++]]=0;if(t.lencode=t.lendyn,t.lenbits=7,z={bits:t.lenbits},C=rn(Wl,t.lens,0,19,t.lencode,0,t.work,z),t.lenbits=z.bits,C){e.msg="invalid code lengths set",t.mode=ie;break}t.have=0,t.mode=pr;case pr:for(;t.have<t.nlen+t.ndist;){for(;f=t.lencode[l&(1<<t.lenbits)-1],_=f>>>24,y=f>>>16&255,w=f&65535,!(_<=m);){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}if(w<16)l>>>=_,m-=_,t.lens[t.have++]=w;else{if(w===16){for($=_+2;m<$;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}if(l>>>=_,m-=_,t.have===0){e.msg="invalid bit length repeat",t.mode=ie;break}S=t.lens[t.have-1],u=3+(l&3),l>>>=2,m-=2}else if(w===17){for($=_+3;m<$;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}l>>>=_,m-=_,S=0,u=3+(l&7),l>>>=3,m-=3}else{for($=_+7;m<$;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}l>>>=_,m-=_,S=0,u=11+(l&127),l>>>=7,m-=7}if(t.have+u>t.nlen+t.ndist){e.msg="invalid bit length repeat",t.mode=ie;break}for(;u--;)t.lens[t.have++]=S}}if(t.mode===ie)break;if(t.lens[256]===0){e.msg="invalid code -- missing end-of-block",t.mode=ie;break}if(t.lenbits=9,z={bits:t.lenbits},C=rn(Wr,t.lens,0,t.nlen,t.lencode,0,t.work,z),t.lenbits=z.bits,C){e.msg="invalid literal/lengths set",t.mode=ie;break}if(t.distbits=6,t.distcode=t.distdyn,z={bits:t.distbits},C=rn(Vr,t.lens,t.nlen,t.ndist,t.distcode,0,t.work,z),t.distbits=z.bits,C){e.msg="invalid distances set",t.mode=ie;break}if(t.mode=Pn,n===6)break e;case Pn:t.mode=Dn;case Dn:if(s>=6&&c>=258){e.next_out=o,e.avail_out=c,e.next_in=r,e.avail_in=s,t.hold=l,t.bits=m,Rl(e,p),o=e.next_out,i=e.output,c=e.avail_out,r=e.next_in,a=e.input,s=e.avail_in,l=t.hold,m=t.bits,t.mode===et&&(t.back=-1);break}for(t.back=0;f=t.lencode[l&(1<<t.lenbits)-1],_=f>>>24,y=f>>>16&255,w=f&65535,!(_<=m);){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}if(y&&(y&240)===0){for(v=_,I=y,B=w;f=t.lencode[B+((l&(1<<v+I)-1)>>v)],_=f>>>24,y=f>>>16&255,w=f&65535,!(v+_<=m);){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}l>>>=v,m-=v,t.back+=v}if(l>>>=_,m-=_,t.back+=_,t.length=w,y===0){t.mode=gr;break}if(y&32){t.back=-1,t.mode=et;break}if(y&64){e.msg="invalid literal/length code",t.mode=ie;break}t.extra=y&15,t.mode=fr;case fr:if(t.extra){for($=t.extra;m<$;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}t.length+=l&(1<<t.extra)-1,l>>>=t.extra,m-=t.extra,t.back+=t.extra}t.was=t.length,t.mode=hr;case hr:for(;f=t.distcode[l&(1<<t.distbits)-1],_=f>>>24,y=f>>>16&255,w=f&65535,!(_<=m);){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}if((y&240)===0){for(v=_,I=y,B=w;f=t.distcode[B+((l&(1<<v+I)-1)>>v)],_=f>>>24,y=f>>>16&255,w=f&65535,!(v+_<=m);){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}l>>>=v,m-=v,t.back+=v}if(l>>>=_,m-=_,t.back+=_,y&64){e.msg="invalid distance code",t.mode=ie;break}t.offset=w,t.extra=y&15,t.mode=_r;case _r:if(t.extra){for($=t.extra;m<$;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}t.offset+=l&(1<<t.extra)-1,l>>>=t.extra,m-=t.extra,t.back+=t.extra}if(t.offset>t.dmax){e.msg="invalid distance too far back",t.mode=ie;break}t.mode=br;case br:if(c===0)break e;if(u=p-c,t.offset>u){if(u=t.offset-u,u>t.whave&&t.sane){e.msg="invalid distance too far back",t.mode=ie;break}u>t.wnext?(u-=t.wnext,b=t.wsize-u):b=t.wnext-u,u>t.length&&(u=t.length),g=t.window}else g=i,b=o-t.offset,u=t.length;u>c&&(u=c),c-=u,t.length-=u;do i[o++]=g[b++];while(--u);t.length===0&&(t.mode=Dn);break;case gr:if(c===0)break e;i[o++]=t.length,c--,t.mode=Dn;break;case Ca:if(t.wrap){for(;m<32;){if(s===0)break e;s--,l|=a[r++]<<m,m+=8}if(p-=c,e.total_out+=p,t.total+=p,t.wrap&4&&p&&(e.adler=t.check=t.flags?ce(t.check,i,p,o-p):cn(t.check,i,p,o-p)),p=c,t.wrap&4&&(t.flags?l:wr(l))!==t.check){e.msg="incorrect data check",t.mode=ie;break}l=0,m=0}t.mode=yr;case yr:if(t.wrap&&t.flags){for(;m<32;){if(s===0)break e;s--,l+=a[r++]<<m,m+=8}if(t.wrap&4&&l!==(t.total&4294967295)){e.msg="incorrect length check",t.mode=ie;break}l=0,m=0}t.mode=vr;case vr:C=1;break e;case ie:C=-3;break e;case Da:return-4;case Jr:default:return-2}return e.next_out=o,e.avail_out=c,e.next_in=r,e.avail_in=s,t.hold=l,t.bits=m,(t.wsize||p!==e.avail_out&&t.mode<ie&&(t.mode<Ca||n!==4))&&Gr(e,e.output,e.next_out,p-e.avail_out)?(t.mode=Da,-4):(d-=e.avail_in,p-=e.avail_out,e.total_in+=d,e.total_out+=p,t.total+=p,t.wrap&4&&p&&(e.adler=t.check=t.flags?ce(t.check,i,p,e.next_out-p):cn(t.check,i,p,e.next_out-p)),e.data_type=t.bits+(t.last?64:0)+(t.mode===et?128:0)+(t.mode===Pn||t.mode===Ba?256:0),(d===0&&p===0||n===4)&&C===0&&(C=-5),C)},xr=e=>{if(Ot(e))return-2;let n=e.state;return n.window&&(n.window=null),e.state=null,0};var Sr=(e,n)=>{let t=n.length,a,i,r;return Ot(e)||(a=e.state,a.wrap!==0&&a.mode!==On)?-2:a.mode===On&&(i=1,i=cn(i,n,t,0),i!==a.check)?-3:(r=Gr(e,n,t,t),r?(a.mode=Da,-4):(a.havedict=1,0))},qr=class{constructor(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}};var Xr=e=>{let n=new Uint8Array(e.reduce((a,i)=>a+i.length,0)),t=0;for(let a of e)n.set(a,t),t+=a.length;return n},Er=Object.prototype.toString,Ql={level:-1,chunkSize:16384,windowBits:15,memLevel:8,strategy:0,raw:!1,gzip:!1,legacyHash:!1,dictionary:new Uint8Array(0)},ec=class{constructor(e={}){A(this,"options");A(this,"err");A(this,"msg");A(this,"ended");A(this,"started");A(this,"chunks");A(this,"strm");A(this,"result");this.options=Object.assign({},Ql,e);let n=this.options;n.raw&&n.windowBits>0?n.windowBits=-n.windowBits:n.gzip&&n.windowBits>0&&n.windowBits<16&&(n.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.started=!1,this.chunks=[],this.result=new Uint8Array(0),this.strm=new qr,this.strm.avail_out=0;let t=Al(this.strm,n.level,8,n.windowBits,n.memLevel,n.strategy,n.legacyHash);if(t!==0)throw new Error(St[t]);Er.call(n.dictionary)==="[object ArrayBuffer]"&&(n.dictionary=new Uint8Array(n.dictionary));let a=n.dictionary;if(a.length){if(n.gzip)throw new Error("dictionary is not supported with gzip");if(t=Dl(this.strm,a),t!==0)throw new Error(St[t])}}push(e,n=!1){let t=this.strm,a=this.options.chunkSize,i,r;if(this.ended)return!1;for(typeof n=="number"?r=n:r=n===!0?4:0,typeof e=="string"?t.input=new TextEncoder().encode(e):Er.call(e)==="[object ArrayBuffer]"?t.input=new Uint8Array(e):t.input=e,t.next_in=0,t.avail_in=t.input.length,this.started||(this.started=!0,this.onStart(t));;){if(t.avail_out===0&&(t.output=new Uint8Array(a),t.next_out=0,t.avail_out=a),(r===2||r===3)&&t.avail_out<=6){this.onData(t.output.subarray(0,t.next_out)),t.avail_out=0;continue}if(i=jl(t,r),i===-2)break;if(i===1){t.next_out>0&&this.onData(t.output.subarray(0,t.next_out)),i=Pl(this.strm);break}if(t.avail_out===0){this.onData(t.output);continue}if(r>0&&t.next_out>0){this.onData(t.output.subarray(0,t.next_out)),t.avail_out=0;continue}if(t.avail_in===0)return!0}return this.err=i,this.msg=t.msg||St[i],this.ended=!0,this.onEnd(i),i===0}onStart(e){}onData(e){this.chunks.push(e)}onEnd(e){e===0&&(this.result=Xr(this.chunks)),this.chunks=[]}};function Wn(e,n={}){let t=new ec(n);if(t.push(e,!0),t.err)throw new Error(t.msg);return t.result}function Yr(e,n={}){return Wn(e,Object.assign({},n,{raw:!0}))}function mn(e,n={}){return Wn(e,Object.assign({},n,{gzip:!0}))}var Br=Object.prototype.toString,tc={chunkSize:1024*64,windowBits:15,raw:!1,dictionary:new Uint8Array(0)},nc=class{constructor(e={}){A(this,"options");A(this,"err");A(this,"msg");A(this,"ended");A(this,"started");A(this,"chunks");A(this,"strm");A(this,"result");this.options=Object.assign({},tc,e);let n=this.options;n.raw&&n.windowBits>=0&&n.windowBits<16&&(n.windowBits=-n.windowBits,n.windowBits===0&&(n.windowBits=-15)),n.windowBits>=0&&n.windowBits<16&&!e.windowBits&&(n.windowBits+=32),n.windowBits>15&&n.windowBits<48&&(n.windowBits&15)===0&&(n.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.started=!1,this.chunks=[],this.result=new Uint8Array(0),this.strm=new qr,this.strm.avail_out=0;let t=Xl(this.strm,n.windowBits);if(t!==0)throw new Error(St[t]);Br.call(n.dictionary)==="[object ArrayBuffer]"&&(n.dictionary=new Uint8Array(n.dictionary));let a=n.dictionary;if(n.raw&&a.length&&(t=Sr(this.strm,a),t!==0))throw new Error(St[t])}push(e,n=!1){let t=this.strm,a=this.options.chunkSize,i,r,o;if(this.ended)return this.err===0;for(typeof n=="number"?r=n:r=n===!0?4:0,Br.call(e)==="[object ArrayBuffer]"?t.input=new Uint8Array(e):t.input=e,t.next_in=0,t.avail_in=t.input.length,this.started||(this.started=!0,this.onStart(t));;){if(t.avail_out===0&&(t.output=new Uint8Array(a),t.next_out=0,t.avail_out=a),i=za(t,r),i===2){let s=this.options.dictionary;s.length&&(i=Sr(t,s),i===0?i=za(t,r):i===-3&&(i=2))}for(;t.avail_in>0&&i===1&&t.state.wrap&2&&t.state.flags!==0&&t.input[t.next_in]!==0;)Kr(t),i=za(t,r);if(i===-2||i===-3||i===2||i===-4)break;if(o=t.avail_out,t.next_out&&(t.avail_out===0||i===1||r>0)&&(this.onData(t.output.length===t.next_out?t.output:t.output.subarray(0,t.next_out)),t.avail_out=0,t.next_out=0),!((i===0||i===-5)&&o===0)){if(i===1){i=xr(this.strm);break}if(t.avail_in===0){if(r===4){i=xr(this.strm),i===0&&(i=-5);break}return!0}}}return this.err=i,this.msg=t.msg||St[i],this.ended=!0,this.onEnd(i),i===0}onStart(e){}onData(e){this.chunks.push(e)}onEnd(e){e===0&&(this.result=Xr(this.chunks)),this.chunks=[]}};function xe(e,n={}){let t=new nc(n);if(t.push(e,!0),t.err)throw new Error(t.msg);let a=t.result;return n.toText?new TextDecoder().decode(a):a}function Qr(e,n={}){return xe(e,{...n,raw:!0})}var Vn=void 0;var De=class{static getUnsignedInteger(n,t,a,i,r){let o;return r?o=(i&255)<<24|(a&255)<<16|(t&255)<<8|n&255:o=(n&255)<<24|(t&255)<<16|(a&255)<<8|i&255,o>>>0}static getUnsignedShort(n,t,a){return a?(t&255)<<8|n&255:(n&255)<<8|t&255}static getSignedInteger(n,t,a,i,r){let o;return r?o=(i&255)<<24|(a&255)<<16|(t&255)<<8|n&255:o=(n&255)<<24|(t&255)<<16|(a&255)<<8|i&255,o|0}};var Ht=class{constructor(){A(this,"ldbFileIndexes",[]);A(this,"logFileIndexes",[]);A(this,"filesByIndex",new Map);A(this,"deletedFileNumbers",new Set)}get totalFiles(){return this.ldbFileIndexes.length+this.logFileIndexes.length}initFromManifest(n,t,a,i,r,o,s){if(this.deletedFileNumbers.clear(),s)for(let c of s)this.deletedFileNumbers.add(c);this.ldbFileIndexes=[],this.filesByIndex.clear();for(let c of n)try{let l=parseInt(c.name);if(this.deletedFileNumbers.has(l))continue;let m=0,d,p;if(a&&i){for(let b=0;b<i.length;b++)if(i[b]===l){m=a[b],r&&(d=r[b]),o&&(p=o[b]);break}}let u={fileInfo:{index:l,file:c,isDeleted:!1,level:m},smallestKey:d,largestKey:p,isLoaded:!1,priority:1e3-m};this.ldbFileIndexes.push(u),this.filesByIndex.set(l,u)}catch{}this.ldbFileIndexes.sort((c,l)=>c.fileInfo.level===l.fileInfo.level?c.fileInfo.index-l.fileInfo.index:l.fileInfo.level-c.fileInfo.level),this.logFileIndexes=[];for(let c of t)this.logFileIndexes.push({file:c,name:c.name,isLoaded:!1});this.logFileIndexes.sort((c,l)=>c.name.localeCompare(l.name))}findPotentialFilesForKey(n){let t=[];for(let a of this.logFileIndexes)t.push(a);for(let a of this.ldbFileIndexes)a.smallestKey!==void 0&&a.largestKey!==void 0?n>=a.smallestKey&&n<=a.largestKey&&t.push(a):t.push(a);return t}};var ic=new Set(["__proto__","prototype","[[Prototype]]","this","delete","constructor","hasOwnProperty","isPrototypeOf","__defineGetter__","__defineSetter__","__lookupGetter__","__lookupSetter__"]),fe=class e{static isUsableAsObjectKey(n){return n==null?!1:!ic.has(n)}static readStringASCII(n,t,a){let i="",r=0;t=t||0;let o=!1;typeof a>"u"&&(o=!0,a=n.byteLength-n.byteOffset);let s;for(let c=0;c<a&&(s=n.getUint8(c+t),!(s===0&&o));c++)i+=String.fromCharCode(s),r++;return{str:i,byteLength:r+(o?1:0)}}static getAsciiString(n,t,a){return e.readStringASCII(n,t,a).str}static getAsciiStringFromUint8Array(n){let t="";for(let a=0;a<n.length;a++)t+=String.fromCharCode(n[a]);return t}};var X=class{constructor(n,t){A(this,"fileBytes");A(this,"startIndex");A(this,"byteLength",0);A(this,"value",0);this.fileBytes=n,this.startIndex=t;let a=0;for(;this.fileBytes[this.startIndex+a]>=128&&this.startIndex+a<n.length;)a++;for(this.byteLength=a+1,this.value=this.fileBytes[this.startIndex+a];a>0;)this.value*=128,this.value+=this.fileBytes[this.startIndex+a-1]-128,a--}};var dt=class{constructor(){A(this,"fileBytes");A(this,"startIndex");A(this,"unsharedKeyBytes");A(this,"keyDelta");A(this,"value");A(this,"sharedKey");A(this,"sharedByteLength");A(this,"length");A(this,"previousKey");A(this,"keyCached");A(this,"fullBytesCached")}get unsharedKey(){if(this.unsharedKeyBytes===void 0)return;let n=new DataView(this.unsharedKeyBytes.buffer,this.unsharedKeyBytes.byteOffset,this.unsharedKeyBytes.byteLength);return fe.getAsciiString(n,0,n.byteLength)}get key(){if(this.keyCached)return this.keyCached;let n=this.previousKey,t="";n!==void 0&&(t=n.key.substring(0,this.sharedByteLength));let a=this.unsharedKey;return a!==void 0&&(t+=a),this.keyCached=t,t}get keyBytes(){if(!this.unsharedKeyBytes)return;if(this.fullBytesCached)return this.fullBytesCached;if(this.sharedByteLength===void 0||this.sharedByteLength===0)return this.unsharedKeyBytes;if(this.previousKey===void 0)throw new Error("Unexpected shared key without a previous");let n=this.previousKey.keyBytes;if(n===void 0)throw new Error("Unexpected shared key without previous bytes");let t=new Uint8Array(this.sharedByteLength+this.unsharedKeyBytes.length),a=this.sharedByteLength;for(let i=0;i<a;i++)t[i]=n[i];for(let i=0;i<this.unsharedKeyBytes.length;i++)t[i+a]=this.unsharedKeyBytes[i];return this.fullBytesCached=t,t}clearAllData(){this.value=void 0,this.fileBytes=void 0,this.unsharedKeyBytes=void 0,this.fullBytesCached=void 0,this.previousKey=void 0}loadFromLdb(n,t,a){this.startIndex=t;let i=0,r=new X(n,t);this.sharedByteLength=r.value,i+=r.byteLength,this.sharedByteLength>0&&(this.previousKey=a);let o=new X(n,t+i);i+=o.byteLength;let s=new X(n,t+i);i+=s.byteLength,this.unsharedKeyBytes=n.slice(t+i,t+i+o.value-8),i+=o.value,this.value=n.slice(t+i,t+i+s.value),i+=s.value,this.length=i}};var ue,ut,Ct,Je,pt,pn,fn,F,dn,te,hn,Wa,eo,Va,un=class un{constructor(n,t,a,i,r){He(this,F);A(this,"logger");A(this,"ldbFiles");A(this,"logFiles");A(this,"manifestFiles");A(this,"keys",new Map);A(this,"isInErrorState");A(this,"errorMessages");A(this,"comparator");A(this,"logNumber");A(this,"previousLogNumber");A(this,"nextFileNumber");A(this,"lastSequence");A(this,"compactPointerLevels");A(this,"compactPointerStrings");A(this,"deletedFileLevel");A(this,"deletedFileNumber");A(this,"newFileLevel");A(this,"newFileNumber");A(this,"newFileSize");A(this,"newFileSmallest");A(this,"newFileLargest");A(this,"context");He(this,ue);He(this,ut,!1);He(this,Ct,5e4);He(this,Je,[]);He(this,pt,new Set);He(this,pn,!1);He(this,hn,new Map);this.ldbFiles=n,this.logFiles=t,this.manifestFiles=a,this.context=i,this.logger=r??{log:o=>console.log(`[LevelDb] ${o}`),verbose:o=>console.debug(`[LevelDb] ${o}`),error:o=>console.error(`[LevelDb] ${o}`),assert:console.assert}}get isLazyMode(){return J(this,ut)}get index(){return J(this,ue)}get keysInMemoryCount(){return this.keys.size}async init(n){this.keys=new Map,this.isInErrorState=!1,this.errorMessages=void 0;let t=n?.unloadFilesAfterParse??!1;for(let o=0;o<this.manifestFiles.length;o++){let s=this.manifestFiles[o].content;s instanceof Uint8Array&&s.length>0&&(this.parseManifestContent(s,this.manifestFiles[o].storageRelativePath),this.logger.log?.("Loaded map manifest file '"+this.manifestFiles[o].fullPath+"'.")),t&&this.manifestFiles[o].unload()}let a=[];for(let o=0;o<this.ldbFiles.length;o++){let s=this.ldbFiles[o];try{let c=parseInt(s.name);if(!this.deletedFileNumber||!this.deletedFileNumber.includes(c)){let l=0;if(this.newFileLevel&&this.newFileNumber&&(this.logger.assert?.(this.newFileLevel.length===this.newFileNumber.length),this.newFileLevel.length===this.newFileNumber.length))for(let m=0;m<this.newFileNumber.length;m++)this.newFileNumber[m]===c&&(l=this.newFileLevel[m]);a.push({index:c,file:s,isDeleted:!1,level:l})}}catch(c){W(this,F,te).call(this,`Error including LDB file: ${s.fullPath} Error: ${c}`)}}let i=a.sort((o,s)=>o.level===s.level?o.index-s.index:s.level-o.level);for(let o=0;o<i.length;o++){let s=i[o].file,c=s.content;if(c instanceof Uint8Array&&c.length>0){let l=this.parseLdbContent(c,s.storageRelativePath);this.logger.log?.("Loaded map record file '"+s.fullPath+"'. Records: "+l)}t&&s.unload(),o%J(un,fn)===0&&o>0&&await new Promise(l=>setTimeout(l,0))}let r=this.logFiles.sort((o,s)=>o.name.localeCompare(s.name));for(let o=0;o<r.length;o++){let s=r[o].content;if(s instanceof Uint8Array&&s.length>0){let c=this.parseLogContent(s,r[o].storageRelativePath);this.logger.log?.("Loaded map latest-updates file '"+r[o].fullPath+"'. Records: "+c)}t&&r[o].unload(),o%J(un,fn)===0&&o>0&&await new Promise(c=>setTimeout(c,0))}}async initLazy(n){this.keys=new Map,this.isInErrorState=!1,this.errorMessages=void 0,lt(this,ut,!0),lt(this,Ct,n?.maxKeysInMemory??5e4),lt(this,Je,[]),lt(this,pt,new Set);for(let t=0;t<this.manifestFiles.length;t++){let a=this.manifestFiles[t].content;a instanceof Uint8Array&&a.length>0&&this.parseManifestContent(a,this.manifestFiles[t].storageRelativePath),this.manifestFiles[t].unload()}lt(this,ue,new Ht),J(this,ue).initFromManifest(this.ldbFiles,this.logFiles,this.newFileLevel,this.newFileNumber,this.newFileSmallest,this.newFileLargest,this.deletedFileNumber),lt(this,pn,!0)}async loadAllFiles(n){if(!J(this,pn)||!J(this,ue))throw new Error("LevelDb must be initialized before loading files");let t=n?.unloadFilesAfterParse??!0,a=10,i=0,r=J(this,ue).totalFiles;for(let o=0;o<J(this,ue).ldbFileIndexes.length;o++){let s=J(this,ue).ldbFileIndexes[o],c=s.fileInfo.file,l=c.content;l instanceof Uint8Array&&l.length>0&&this.parseLdbContent(l,c.storageRelativePath),s.isLoaded=!0,t&&c.unload(),i++,n?.progressCallback&&i%5===0&&n.progressCallback("Summarizing all world files",i,r),o%a===0&&o>0&&await new Promise(m=>setTimeout(m,0))}for(let o=0;o<J(this,ue).logFileIndexes.length;o++){let s=J(this,ue).logFileIndexes[o],c=s.file,l=c.content;l instanceof Uint8Array&&l.length>0&&this.parseLogContent(l,c.storageRelativePath),s.isLoaded=!0,t&&c.unload(),i++,n?.progressCallback&&n.progressCallback("Loading LOG files",i,r),o%a===0&&o>0&&await new Promise(m=>setTimeout(m,0))}return this.keys.size}async loadFile(n){let t="name"in n,a=t?n.file:n.fileInfo.file,i=a.content,r=0;return i instanceof Uint8Array&&i.length>0&&(t?r=this.parseLogContent(i,a.storageRelativePath)||0:r=this.parseLdbContent(i,a.storageRelativePath)||0),n.isLoaded=!0,a.unload(),r}async parseIncrementalFile(n){let t=[],a=new Set;n.isContentLoaded&&n.unload();let i=n.content;if(!(i instanceof Uint8Array)||i.length===0)return t;let r=n.name.toLowerCase().endsWith(".log"),o=n.storageRelativePath||n.fullPath,s=J(this,hn).get(o)||0,c=i.length;if(r&&c<=s)return n.unload(),t;let l=new Map;for(let[m,d]of this.keys)l.set(m,d);if(r){this.parseLogContent(i,n.storageRelativePath),J(this,hn).set(o,c);for(let[m,d]of this.keys)!d||typeof d=="boolean"||l.get(m)===d||W(this,F,Wa).call(this,m,a,t)}else{this.parseLdbContent(i,n.storageRelativePath);for(let[m,d]of this.keys)!d||l.get(m)===d||W(this,F,Wa).call(this,m,a,t)}return n.unload(),r&&!this.logFiles.includes(n)?this.logFiles.push(n):!r&&!this.ldbFiles.includes(n)&&this.ldbFiles.push(n),t}async getKey(n){if(this.keys.has(n))return W(this,F,Va).call(this,n),this.keys.get(n);if(!J(this,ut)||!J(this,ue))return;let t=J(this,ue).findPotentialFilesForKey(n);for(let a of t)if(!a.isLoaded&&(await this.loadFile(a),this.keys.has(n)))return W(this,F,Va).call(this,n),this.keys.get(n)}clearLoadedKeys(){for(let[,n]of this.keys)n&&typeof n!="boolean"&&n.clearAllData();if(this.keys.clear(),lt(this,Je,[]),J(this,pt).clear(),J(this,ue)){for(let n of J(this,ue).ldbFileIndexes)n.isLoaded=!1;for(let n of J(this,ue).logFileIndexes)n.isLoaded=!1}}parseLdbContent(n,t,a){let i=0;if(n.length<=8||n[n.length-8]!==87||n[n.length-7]!==251||n[n.length-6]!==128||n[n.length-5]!==139||n[n.length-4]!==36||n[n.length-3]!==117||n[n.length-2]!==71||n[n.length-1]!==219){W(this,F,te).call(this,"Unexpected bytes in LDB file. File seems unreadable.",t);return}let r=n.length-48,o=new X(n,r);r+=o.byteLength;let s=new X(n,r);r+=s.byteLength;let c=new X(n,r);r+=c.byteLength;let l=new X(n,r);if(c.value<=0||c.value+l.value>=n.length)return W(this,F,te).call(this,"LDB content index offset not within bounds.",t),!1;if(o.value<=0||o.value+s.value>=n.length)return W(this,F,te).call(this,"LDB meta index offset not within bounds.",t),!1;let m=n.subarray(c.value,c.value+l.value),d;if(d=W(this,F,dn).call(this,m,!0),d||(d=W(this,F,dn).call(this,m,!1)),d||(d=m),d){let p={};if(!this.parseIndexBytes(d,0,d.length,p,t))return!1;for(let u in p){let b=p[u];if(b&&b.value){let g=b.value,f=0,_=new X(g,f);f+=_.byteLength;let y=new X(g,f);if(f+=y.byteLength,_.value<0||_.value+y.value>=n.length){W(this,F,te).call(this,"Block offset does not appear correct",t);return}if(f!==g.length){W(this,F,te).call(this,"Index byte index is not correct",t);return}let w=n.subarray(_.value,_.value+y.value),v;v=W(this,F,dn).call(this,w,!0),v||(v=W(this,F,dn).call(this,w,!1)),v||(v=w),i+=this.parseLdbBlockBytes(v,0,v.length,t,a)}else W(this,F,te).call(this,"Could not find index key.",t)}}return i===0&&W(this,F,te).call(this,"No keys found in LDB.",t),i}parseIndexBytes(n,t,a,i,r){let o=t,s,l=De.getUnsignedInteger(n[a-4],n[a-3],n[a-2],n[a-1],!0)*4+4;for(;o<t+a-l;){let m=new dt;m.loadFromLdb(n,o,s);let d=m.key;if(s=m,fe.isUsableAsObjectKey(d)&&(i[d]=m),m.length===void 0)return W(this,F,te).call(this,"Unexpected parse of level key value "+d,r),!1;o+=m.length}return!0}parseLdbBlockBytes(n,t,a,i,r){let o=t,s=0,c,m=De.getUnsignedInteger(n[a-4],n[a-3],n[a-2],n[a-1],!0)*4+4;if(m>t+a)return W(this,F,te).call(this,"Unexpected size received for LDB bytes. File could be corrupt.",i),0;for(;o<t+a-m;){let d=new dt;d.loadFromLdb(n,o,c);let p=d.key;if(c=d,fe.isUsableAsObjectKey(p))if(r){let u=d.keyBytes;u&&r.visitor({ordinal:r.ordinal++,key:p,keyBytes:u,value:r.options.includeValues?d.value:void 0,sourceKind:r.sourceKind,sourcePath:r.sourcePath})}else this.keys.set(p,d);if(d.length===void 0||d.length<0)throw new Error(W(this,F,te).call(this,"Unexpected parse of key "+p,i));s++,o+=d.length}return s}parseLogContent(n,t,a){let i=0,r,o=0;for(;i<n.length-6;){let s=De.getUnsignedShort(n[i+4],n[i+5],!0),c=n[i+6];if(i+=7,c===1)o+=this.addValueFromLog(n,i,s,t,a);else if(c===2)r=new Uint8Array(n.buffer,i,s);else if(c===3||c===4)if(r!==void 0){let m=new Uint8Array(n.buffer,i,s),d=new Uint8Array(r.byteLength+m.byteLength);d.set(r),d.set(m,r.byteLength),r=d,c===4&&(o+=this.addValueFromLog(r,0,r.length,t,a))}else{W(this,F,te).call(this,"Unexpected middle to a set of bytes found within LevelDB content. File seems unreadable.",t);return}else{W(this,F,te).call(this,"Unexpected type for log file. File seems unreadable.",t);return}i+=s;let l=32768-i%32768;for(;l<=6&&l>0;)l--,n[i]!==0&&W(this,F,te).call(this,"Unexpectedly found a padding trailer with data",t),i++}return o<=0&&W(this,F,te).call(this,"Did not find any keys in log file",t),o}addValueFromLog(n,t,a,i,r){let o=t;t+=12;let s=0;for(;t<=o+a-5;){let c=n[t];t++;let l=new X(n,t);t+=l.byteLength;let m=new Uint8Array(l.value);for(let d=0;d<l.value;d++)m[d]=n[t+d];if(t+=l.value,t>n.length&&W(this,F,te).call(this,"Unexpected log file length issue.",i),t<=n.length){let d=fe.getAsciiStringFromUint8Array(m);if(d===void 0&&W(this,F,te).call(this,"Unexpected empty key in a log file. File could be unreadable.",i),s++,c){t>=n.length&&W(this,F,te).call(this,"Unexpectedly leftover content in a log file. File could be unreadable.",i);let p=new X(n,t);if(t+=p.byteLength,p.value+t<=n.buffer.byteLength){let u=t;if(t+=p.value,fe.isUsableAsObjectKey(d))if(r){let b;r.options.includeValues&&(b=n.slice(u,u+p.value)),r.visitor({ordinal:r.ordinal++,key:d,keyBytes:m,value:r.options.includeValues?b:void 0,sourceKind:r.sourceKind,sourcePath:r.sourcePath})}else{let b=n.slice(u,u+p.value),g=new dt;g.sharedKey="",g.keyDelta=d,g.unsharedKeyBytes=m,g.value=b,this.keys.set(d,g)}}}else fe.isUsableAsObjectKey(d)&&(r?r.options.includeDeleted&&r.visitor({ordinal:r.ordinal++,key:d,keyBytes:m,isDeleted:!0,sourceKind:r.sourceKind,sourcePath:r.sourcePath}):this.keys.set(d,!1))}}return s}parseManifestContent(n,t){let a=0,i;for(this.comparator=void 0,this.logNumber=void 0,this.nextFileNumber=void 0,this.lastSequence=void 0,this.compactPointerLevels=void 0,this.compactPointerStrings=void 0,this.deletedFileLevel=void 0,this.deletedFileNumber=void 0,this.newFileLevel=void 0,this.newFileNumber=void 0,this.newFileSize=void 0,this.newFileSmallest=void 0,this.newFileLargest=void 0;a<n.length-6;){let r=De.getUnsignedShort(n[a+4],n[a+5],!0),o=n[a+6];if(a+=7,o===1)this.addValueFromManifest(n,a,r);else if(o===2)i=new Uint8Array(n.buffer,a,r);else if(o===3||o===4)if(i!==void 0){let c=new Uint8Array(n.buffer,a,r),l=new Uint8Array(i.byteLength+c.byteLength);l.set(i),l.set(c,i.byteLength),i=l,o===4&&this.addValueFromManifest(i,0,i.length)}else{W(this,F,te).call(this,"Unexpected middle to a set of bytes found within a manifest file. File could be unreadable.",t);return}else{W(this,F,te).call(this,"Unexpected type for manifest file. File could be unreadable.",t);return}a+=r;let s=32768-a%32768;for(;s<=6&&s>0;)s--,n[a]!==0&&W(this,F,te).call(this,"Unexpectedly found a padding trailer with data in a manifest file.",t),a++}}addValueFromManifest(n,t,a,i){let r=t;for(;t<r+a;){let o=new X(n,t);switch(t+=o.byteLength,o.value){case 1:let s=new X(n,t);t+=s.byteLength;let c=new Uint8Array(s.value);for(let k=0;k<s.value;k++)c[k]=n[t+k];t+=s.value,t>n.length&&W(this,F,te).call(this,"Unexpected manifest file length issue.",i),this.comparator=fe.getAsciiStringFromUint8Array(c),this.comparator===void 0&&W(this,F,te).call(this,"Unexpected comparator.",i);break;case 2:let l=new X(n,t);t+=l.byteLength,this.logNumber=l.value;break;case 3:let m=new X(n,t);t+=m.byteLength,this.nextFileNumber=m.value;break;case 4:let d=new X(n,t);t+=d.byteLength,this.lastSequence=d.value;break;case 5:this.compactPointerLevels===void 0&&(this.compactPointerLevels=[]),this.compactPointerStrings===void 0&&(this.compactPointerStrings=[]);let p=new X(n,t);t+=p.byteLength,this.compactPointerLevels.push(p.value);let u=new X(n,t);t+=u.byteLength;let b=new Uint8Array(u.value);for(let k=0;k<u.value;k++)b[k]=n[t+k];t+=u.value,t>n.length&&W(this,F,te).call(this,"Unexpected manifest file length issue at compact pointer.",i),this.compactPointerStrings.push(fe.getAsciiStringFromUint8Array(b)),this.compactPointerStrings[this.compactPointerStrings.length-1]===void 0&&W(this,F,te).call(this,"Unexpected compact pointer string.",i);break;case 6:this.deletedFileLevel===void 0&&(this.deletedFileLevel=[]),this.deletedFileNumber===void 0&&(this.deletedFileNumber=[]);let g=new X(n,t);t+=g.byteLength,this.deletedFileLevel.push(g.value);let f=new X(n,t);t+=f.byteLength,this.deletedFileNumber.push(f.value);break;case 7:this.newFileLargest===void 0&&(this.newFileLargest=[]),this.newFileLevel===void 0&&(this.newFileLevel=[]),this.newFileNumber===void 0&&(this.newFileNumber=[]),this.newFileSmallest===void 0&&(this.newFileSmallest=[]),this.newFileSize===void 0&&(this.newFileSize=[]);let _=new X(n,t);t+=_.byteLength,this.newFileLevel.push(_.value);let y=new X(n,t);t+=y.byteLength,this.newFileNumber.push(y.value);let w=new X(n,t);t+=w.byteLength,this.newFileSize.push(w.value);let v=new X(n,t);t+=v.byteLength;let I=new Uint8Array(v.value);for(let k=0;k<v.value;k++)I[k]=n[t+k];t+=v.value,t>n.length&&W(this,F,te).call(this,"Unexpected manifest file length issue at new file smallest.",i),this.newFileSmallest.push(fe.getAsciiStringFromUint8Array(I)),this.newFileSmallest[this.newFileSmallest.length-1]===void 0&&W(this,F,te).call(this,"Unexpected file smallest tag string.",i);let B=new X(n,t);t+=B.byteLength;let S=new Uint8Array(B.value);for(let k=0;k<B.value;k++)S[k]=n[t+k];t+=B.value,t>n.length&&W(this,F,te).call(this,"Unexpected manifest file length issue at new file largest.",i),this.newFileLargest.push(fe.getAsciiStringFromUint8Array(S)),this.newFileLargest[this.newFileLargest.length-1]===void 0&&W(this,F,te).call(this,"Unexpected file largest tag string.",i);break;case 9:let C=new X(n,t);t+=C.byteLength,this.previousLogNumber=C.value;break;default:W(this,F,te).call(this,"Unexpected manifest item: "+o.value,i)}}}};ue=new WeakMap,ut=new WeakMap,Ct=new WeakMap,Je=new WeakMap,pt=new WeakMap,pn=new WeakMap,fn=new WeakMap,F=new WeakSet,dn=function(n,t){if(Vn)try{let a=t?Vn.inflateRawSync(n):Vn.inflateSync(n);return new Uint8Array(a.buffer,a.byteOffset,a.byteLength)}catch{}try{return xe(n,{raw:t})}catch{return}},te=function(n,t){this.isInErrorState=!0,this.errorMessages===void 0&&(this.errorMessages=[]);let a;return t?a=this.context?this.context+"-"+t:t:a=this.context,this.logger.error?.(n+(a?" "+a:"")),this.errorMessages.push({message:n,context:a}),n},hn=new WeakMap,Wa=function(n,t,a){if(n.length<9||n.length>14||n.startsWith("AutonomousEntities")||n.startsWith("schedulerWT")||n.startsWith("Overworld")||n.startsWith("BiomeData")||n.startsWith("digp")||n.startsWith("actorprefix")||n.startsWith("player")||n.startsWith("portals"))return!1;let i=n.length>=13,r=De.getSignedInteger(n.charCodeAt(0),n.charCodeAt(1),n.charCodeAt(2),n.charCodeAt(3),!0),o=De.getSignedInteger(n.charCodeAt(4),n.charCodeAt(5),n.charCodeAt(6),n.charCodeAt(7),!0),s=0;if(i&&(s=De.getSignedInteger(n.charCodeAt(8),n.charCodeAt(9),n.charCodeAt(10),n.charCodeAt(11),!0),s<0||s>2))return!1;let c=`${s}_${r}_${o}`;return t.has(c)?!1:(t.add(c),a.push({x:r,z:o,dimension:s}),!0)},eo=function(){if(!J(this,ut)||this.keys.size<=J(this,Ct))return;let n=this.keys.size-Math.floor(J(this,Ct)*.8);for(let t=0;t<n&&J(this,Je).length>0;t++){let a=J(this,Je).shift();if(a&&J(this,pt).has(a)){let i=this.keys.get(a);i&&typeof i!="boolean"&&i.clearAllData(),this.keys.delete(a),J(this,pt).delete(a)}}},Va=function(n){if(!J(this,ut))return;let t=J(this,Je).indexOf(n);t>=0&&J(this,Je).splice(t,1),J(this,Je).push(n),J(this,pt).add(n),this.keys.size>J(this,Ct)&&W(this,F,eo).call(this)},He(un,fn,10);var Zt=un;function rc(e){return e.startsWith("MANIFEST")||e.endsWith(".ldb")||e.endsWith(".log")}async function Jn(e,n){let t=await _n(e,n);return await t.init({unloadFilesAfterParse:!0}),new Map(Array.from(t.keys.entries()).filter(([,i])=>i))}async function _n(e,n){let t=await Promise.all(e.filter(o=>rc(o.name)).map(async o=>({content:new Uint8Array(await o.arrayBuffer()),name:o.name,storageRelativePath:o.name,fullPath:o.name,isContentLoaded:!0,unload(){this.content=null,this.isContentLoaded=!1}}))),a=[],i=[],r=[];return t.forEach(o=>{o.name.startsWith("MANIFEST")?r.push(o):o.name.endsWith(".ldb")?i.push(o):o.name.endsWith(".log")&&a.push(o)}),new Zt(i,a,r,"LlamaStructureReader",n)}function re(e,n=0,t=!0){let a=n,i=new DataView(e.buffer,e.byteOffset,e.byteLength),r=()=>{let g=i.getUint16(a,t);return a+=2,g},o=()=>{let g=i.getInt32(a,t);return a+=4,g},s=()=>{let g=i.getFloat32(a,t);return a+=4,g},c=()=>{let g=i.getFloat64(a,t);return a+=8,g},l=()=>{let g=i.getBigInt64(a,t);return a+=8,g},m=()=>{let g=r(),f=new TextDecoder("utf-8",{fatal:!1}).decode(e.subarray(a,a+g));return a+=g,f};function d(g){switch(g){case 1:return{t:g,v:i.getInt8(a++)};case 2:{let f=i.getInt16(a,t);return a+=2,{t:g,v:f}}case 3:return{t:g,v:o()};case 4:return{t:g,v:l()};case 5:return{t:g,v:s()};case 6:return{t:g,v:c()};case 7:{let f=o(),_=e.subarray(a,a+f);return a+=f,{t:g,v:Array.from(_)}}case 8:return{t:g,v:m()};case 9:{let f=i.getUint8(a++),_=o(),y=[];for(let w=0;w<_;w++)y.push(d(f));return{t:9,et:f,v:y}}case 10:{let f={};for(;;){let _=i.getUint8(a++);if(_===0)break;let y=m();f[y]=d(_)}return{t:10,v:f}}case 11:{let f=o(),_=[];for(let y=0;y<f;y++)_.push(o());return{t:g,v:_}}case 12:{let f=o(),_=[];for(let y=0;y<f;y++)_.push(Number(l()));return{t:g,v:_}}default:throw new Error("\u672A\u77E5 NBT \u7C7B\u578B "+g+" @"+(a-1))}}let p=i.getUint8(a++),u=m(),b=d(p);return{root:{type:p,name:u,value:b.v},end:a,consumed:a-n}}function Ja(e){if(e===void 0)return;let n=e.v!==void 0?e.v:e;switch(e.t){case 4:return Number(n);case 7:return n;case 9:return n.map(t=>t&&t.t!==void 0?Ja(t):t);case 10:{let t={};for(let a in n)t[a]=Ja(n[a]);return t}default:return n}}function ve(e){return Ja({t:e.root.type,v:e.root.value})}function Wt(e,n=!0){let t=null;for(let a of[0,8])try{let i=re(e,a,n);if(i.root.type===10&&(t=i,a===8))return i}catch{}if(t)return t;throw new Error("\u65E0\u6CD5\u89E3\u6790 NBT")}var oc=new TextEncoder;function he(e,n=!0){let t=[],a=4096,i=new Uint8Array(a),r=0,o=g=>{if(r+g<=a)return;for(;r+g>a;)a*=2;let f=new Uint8Array(a);f.set(i.subarray(0,r)),i=f},s=g=>{o(1),i[r++]=g&255},c=g=>{o(2),new DataView(i.buffer).setInt16(r,g,n),r+=2},l=g=>{o(4),new DataView(i.buffer).setInt32(r,g,n),r+=4},m=g=>{o(8),new DataView(i.buffer).setBigInt64(r,BigInt(g),n),r+=8},d=g=>{o(4),new DataView(i.buffer).setFloat32(r,g,n),r+=4},p=g=>{o(8),new DataView(i.buffer).setFloat64(r,g,n),r+=8},u=g=>{let f=oc.encode(String(g));c(f.length),o(f.length),i.set(f,r),r+=f.length};function b(g){let{t:f,v:_}=g;switch(f){case 1:s(_);break;case 2:c(_);break;case 3:l(_);break;case 4:m(_);break;case 5:d(_);break;case 6:p(_);break;case 7:{let y=_ instanceof Uint8Array?_:Uint8Array.from(_);l(y.length),o(y.length),i.set(y,r),r+=y.length;break}case 8:u(_);break;case 9:{s(g.et),l(_.length);for(let y of _)b(y);break}case 10:{for(let y in _){let w=_[y];s(w.t),u(y),b(w)}s(0);break}case 11:{l(_.length);for(let y of _)l(y);break}case 12:{l(_.length);for(let y of _)m(y);break}default:throw new Error("\u65E0\u6CD5\u5E8F\u5217\u5316 NBT \u7C7B\u578B "+f)}}return s(e.root.type),u(e.root.name||""),b({t:e.root.type,v:e.root.value}),i.subarray(0,r)}function to(e,n){let t=he(n,!0),a=new Uint8Array(8+t.length);return a.set(e.subarray(0,4),0),new DataView(a.buffer).setUint32(4,t.length,!0),a.set(t,8),a}function Kn(e,n=2){let t=new DataView(e.buffer,e.byteOffset,e.byteLength),a=t.getUint8(0),i=t.getUint8(1),r=2,o=0;a>=9&&(o=t.getInt8(2),r=3);let s=[];for(let c=0;c<i&&!(r>=e.length);c++){let l=t.getUint8(r++),m=l>>1;if((l&1)!==0){s.push({bits:m,palette:[],indices:null,skipped:!0});continue}if(m===0){s.push({bits:0,palette:[],indices:null,solid:!0});continue}let u=32-(m===3||m===5||m===6?n:0),b=Math.ceil(4096*m/u),g=new Uint32Array(b);for(let v=0;v<b;v++)g[v]=t.getUint32(r+v*4,!0);r+=b*4;let f=t.getInt32(r,!0);r+=4;let _=[];for(let v=0;v<f;v++){let I=re(e,r,!0),B=I.root.value;_.push({name:B.name?String(B.name.v):"unknown",states:B.states&&B.states.v?B.states.v:{}}),r=I.end}let y=(1<<m)-1,w=new Uint16Array(4096);for(let v=0;v<4096;v++){let I=v*m,B=I/u|0,S=I-B*u,C=g[B]>>>S&y;S+m>u&&B+1<b&&(C=(g[B]>>>S|g[B+1]<<u-S)&y),w[v]=C}s.push({bits:m,palette:_,indices:w})}return{version:a,layerCount:i,yIndex:o,layers:s,bytesRead:r}}var sc=47,lc=49,cc=43,mc=44;function dc(e){return e.keyBytes||new Uint8Array}async function Gn(e,n,t){let a=[],i=new Map,r=new Map,o=new Map,s=0,c=0,l=0,m=[],d=[],p=null,u=null,b=[];for(let[y,w]of e){let v=dc(w);if(a.push(y),y.startsWith("actorprefix")){try{let I=ve(re(w.value,0,!0));m.push({type:String(I.identifier||I.Identifier||"unknown"),pos:I.Pos||null,raw:I})}catch(I){m.push({type:"unknown",error:I.message})}continue}if(y==="~local_player"){try{p=ve(re(w.value,0,!0))}catch(I){p={error:I.message}}continue}if(v.length>=9){let I=new DataView(v.buffer,v.byteOffset,v.byteLength).getInt32(0,!0),B=new DataView(v.buffer,v.byteOffset,v.byteLength).getInt32(4,!0),S=v[8],C=I+","+B;if(S===sc&&v.length===10){let k=v[9]>127?v[9]-256:v[9],z=Kn(w.value,2);s++,z.layers.forEach(($,j)=>{if(!(!$.palette||$.palette.length===0)){if($.solid){$.palette=[{name:"minecraft:unknown"}];return}if($.indices)for(let M=0;M<4096;M++){let D=$.palette[$.indices[M]];D&&(j===0?(c++,r.set(D.name,(r.get(D.name)||0)+1)):(l++,o.set(D.name,(o.get(D.name)||0)+1)))}}}),i.set(C,(i.get(C)||0)+1)}else if(S===lc)try{let k=ve(re(w.value,0,!0));d.push({id:String(k.id||"unknown"),pos:[k.x,k.y,k.z]})}catch{d.push({id:"unknown"})}else S!==cc&&S!==mc&&S!==54&&S!==63&&S!==64&&S!==65&&S===119&&b.push(C)}}if(t)try{u=ve(Wt(t,!0))}catch(y){u={error:y.message}}let g=[...r.entries()].map(([y,w])=>({name:y,count:w})).sort((y,w)=>w.count-y.count),f={};for(let y of m)f[y.type]=(f[y.type]||0)+1;let _={};for(let y of d)_[y.id]=(_[y.id]||0)+1;return n.keys=a.length,n.chunks=i.size,n.subchunks=s,n.blocks=c,n.blockTypes=g.length,n.blockList=g,n.extraLayer=[...o.entries()].map(([y,w])=>({name:y,count:w})).sort((y,w)=>w.count-y.count),n.extraLayerBlocks=l,n.entities=m.length,n.entitiesByType=f,n.entityList=m.slice(0,400).map(y=>({type:y.type,pos:y.pos?y.pos.map(w=>Math.round(w)):null})),n.blockEntities=d.length,n.blockEntityList=d.slice(0,2e3),n.blockEntitiesByType=_,n.player=pc(p),n.level=uc(u),n.levelRaw=u,n}function uc(e){if(!e)return null;let n=e.flatWorldLayers||null;return{levelName:e.LevelName,version:e.InventoryVersion||e.lastOpenedWithVersion,gameType:e.GameType,difficulty:e.Difficulty,hardcore:e.IsHardcore,seed:e.RandomSeed,spawn:e.SpawnX+", "+e.SpawnY+", "+e.SpawnZ,time:e.Time,currentTick:e.currentTick,cheats:e.cheatsEnabled,keepInventory:e.keepInventory,commandsEnabled:e.commandsEnabled,generator:e.Generator,storageVersion:e.StorageVersion,limited:e.limitedWorldWidth?e.limitedWorldWidth+"\xD7"+e.limitedWorldDepth:null,flatPreset:n?(()=>{try{return JSON.parse(n)?.biome_id!==void 0?"\u81EA\u5B9A\u4E49":"\u6709"}catch{return"\u6709"}})():null,achievements:e.hasBeenLoadedInCreative}}function pc(e){if(!e)return null;let n=[],t=e.Inventory&&Array.isArray(e.Inventory)?e.Inventory:[];for(let a of t)a&&a.Name&&n.push({name:a.Name,count:a.Count,slot:a.Slot});return{pos:e.Pos?e.Pos.map(a=>Math.round(a*100)/100):null,dimension:e.DimensionId,gameType:e.PlayerGameMode,xp:e.XPLevel,health:e.Health,inventory:n}}var no={"minecraft:air":"\u7A7A\u6C14","minecraft:stone":"\u77F3\u5934","minecraft:deepslate":"\u6DF1\u677F\u5CA9","minecraft:water":"\u6C34","minecraft:lava":"\u5CA9\u6D46","minecraft:bedrock":"\u57FA\u5CA9","minecraft:dirt":"\u6CE5\u571F","minecraft:grass_block":"\u8349\u65B9\u5757","minecraft:sand":"\u6C99\u5B50","minecraft:gravel":"\u7802\u783E","minecraft:tuff":"\u51DD\u7070\u5CA9","minecraft:sulfur":"\u786B\u78FA","minecraft:cinnabar":"\u6731\u7802","minecraft:granite":"\u82B1\u5C97\u5CA9","minecraft:diorite":"\u95EA\u957F\u5CA9","minecraft:andesite":"\u5B89\u5C71\u5CA9","minecraft:iron_ore":"\u94C1\u77FF\u77F3","minecraft:coal_ore":"\u7164\u77FF\u77F3","minecraft:copper_ore":"\u94DC\u77FF\u77F3","minecraft:gold_ore":"\u91D1\u77FF\u77F3","minecraft:diamond_ore":"\u94BB\u77F3\u77FF\u77F3","minecraft:redstone_ore":"\u7EA2\u77F3\u77FF\u77F3","minecraft:lapis_ore":"\u9752\u91D1\u77F3\u77FF\u77F3","minecraft:emerald_ore":"\u7EFF\u5B9D\u77F3\u77FF\u77F3","minecraft:deepslate_iron_ore":"\u6DF1\u5C42\u94C1\u77FF\u77F3","minecraft:deepslate_coal_ore":"\u6DF1\u5C42\u7164\u77FF\u77F3","minecraft:deepslate_copper_ore":"\u6DF1\u5C42\u94DC\u77FF\u77F3","minecraft:deepslate_gold_ore":"\u6DF1\u5C42\u91D1\u77FF\u77F3","minecraft:deepslate_diamond_ore":"\u6DF1\u5C42\u94BB\u77F3\u77FF\u77F3","minecraft:deepslate_redstone_ore":"\u6DF1\u5C42\u7EA2\u77F3\u77FF\u77F3","minecraft:deepslate_lapis_ore":"\u6DF1\u5C42\u9752\u91D1\u77F3\u77FF\u77F3","minecraft:deepslate_emerald_ore":"\u6DF1\u5C42\u7EFF\u5B9D\u77F3\u77FF\u77F3","minecraft:chest":"\u7BB1\u5B50","minecraft:mob_spawner":"\u5237\u602A\u7B3C","minecraft:trial_spawner":"\u8BD5\u70BC\u5237\u602A\u7B3C","minecraft:vault":"\u5B9D\u5E93","minecraft:dispenser":"\u53D1\u5C04\u5668","minecraft:barrel":"\u6728\u6876","minecraft:hopper":"\u6F0F\u6597","minecraft:bed":"\u5E8A","minecraft:amethyst_block":"\u7D2B\u6C34\u6676\u5757","minecraft:obsidian":"\u9ED1\u66DC\u77F3","minecraft:glow_lichen":"\u53D1\u5149\u5730\u8863","minecraft:budding_amethyst":"\u7D2B\u6C34\u6676\u6BCD\u5CA9","minecraft:sulfur_spike":"\u786B\u78FA\u5C16\u9525","minecraft:potent_sulfur":"\u6D53\u7F29\u786B\u78FA","minecraft:crafting_table":"\u5DE5\u4F5C\u53F0","minecraft:torch":"\u706B\u628A","minecraft:acacia_planks":"\u91D1\u5408\u6B22\u6728\u677F","minecraft:acacia_log":"\u91D1\u5408\u6B22\u539F\u6728","minecraft:acacia_stairs":"\u91D1\u5408\u6B22\u697C\u68AF","minecraft:acacia_slab":"\u91D1\u5408\u6B22\u53F0\u9636","minecraft:acacia_fence":"\u91D1\u5408\u6B22\u6805\u680F","minecraft:wheat":"\u5C0F\u9EA6","minecraft:carrots":"\u80E1\u841D\u535C","minecraft:potatoes":"\u9A6C\u94C3\u85AF","minecraft:beetroot":"\u751C\u83DC","minecraft:melon_stem":"\u897F\u74DC\u830E","minecraft:short_grass":"\u77EE\u8349","minecraft:tall_grass":"\u9AD8\u8349","minecraft:oak_leaves":"\u6A61\u6728\u6811\u53F6","minecraft:acacia_leaves":"\u91D1\u5408\u6B22\u6811\u53F6","minecraft:raw_iron_block":"\u7C97\u94C1\u5757","minecraft:decorated_pot":"\u9970\u7EB9\u9676\u7F50"};function se(e){let n=new DataView(e.buffer,e.byteOffset,e.byteLength),t=e.length,a=-1;for(let u=t-22;u>=Math.max(0,t-65558);u--)if(n.getUint32(u,!0)===101010256){a=u;break}if(a<0)throw new Error("\u4E0D\u662F\u6709\u6548\u7684 ZIP\uFF08\u627E\u4E0D\u5230\u4E2D\u592E\u76EE\u5F55\uFF09");let i=n.getUint16(a+10,!0),r=n.getUint32(a+16,!0),o=[],s=r,c=new TextDecoder("utf-8"),l="\xC7\xFC\xE9\xE2\xE4\xE0\xE5\xE7\xEA\xEB\xE8\xEF\xEE\xEC\xC4\xC5\xC9\xE6\xC6\xF4\xF6\xF2\xFB\xF9\xFF\xD6\xDC\xA2\xA3\xA5\u20A7\u0192\xE1\xED\xF3\xFA\xF1\xD1\xAA\xBA\xBF\u2310\xAC\xBD\xBC\xA1\xAB\xBB\u2591\u2592\u2593\u2502\u2524\u2561\u2562\u2556\u2555\u2563\u2551\u2557\u255D\u255C\u255B\u2510\u2514\u2534\u252C\u251C\u2500\u253C\u255E\u255F\u255A\u2554\u2569\u2566\u2560\u2550\u256C\u2567\u2568\u2564\u2565\u2559\u2558\u2552\u2553\u256B\u256A\u2518\u250C\u2588\u2584\u258C\u2590\u2580\u03B1\xDF\u0393\u03C0\u03A3\u03C3\xB5\u03C4\u03A6\u0398\u03A9\u03B4\u221E\u03C6\u03B5\u2229\u2261\xB1\u2265\u2264\u2320\u2321\xF7\u2248\xB0\u2219\xB7\u221A\u207F\xB2\u25A0\xA0";function m(u,b){if(b&2048)return c.decode(u);let g="";for(let f of u)g+=f<128?String.fromCharCode(f):l[f-128]||"?";return g}for(let u=0;u<i&&!(s+46>t||n.getUint32(s,!0)!==33639248);u++){let b=n.getUint16(s+8,!0),g=n.getUint16(s+10,!0),f=n.getUint32(s+20,!0),_=n.getUint32(s+24,!0),y=n.getUint16(s+28,!0),w=n.getUint16(s+30,!0),v=n.getUint16(s+32,!0),I=n.getUint32(s+42,!0),B=e.subarray(s+46,s+46+y);o.push({name:m(B,b),method:g,csize:f,usize:_,localOffset:I,flags:b}),s+=46+y+w+v}function d(u){if(n.getUint32(u.localOffset,!0)!==67324752)throw new Error("ZIP \u672C\u5730\u5934\u635F\u574F\uFF1A"+u.name);let b=n.getUint16(u.localOffset+26,!0),g=n.getUint16(u.localOffset+28,!0),f=u.localOffset+30+b+g,_=f+(u.csize||u.usize);return e.subarray(f,_)}function p(u){let b=d(u);if(u.method===0)return b;if(u.method===8)return Qr(b);throw new Error("\u4E0D\u652F\u6301\u7684\u538B\u7F29\u65B9\u5F0F "+u.method)}return{entries:o,names:o.map(u=>u.name),find:u=>o.find(b=>b.name===u),findEndsWith:u=>o.find(b=>b.name.endsWith(u)),read:p,levelDbFiles(){let u=/(^|\/)(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/,b=[];for(let g of o){let f=g.name.split("/").pop();if(!u.test(g.name)||!f)continue;let _=p(g);b.push({name:f,arrayBuffer:async()=>_})}return b}}}var fc=(()=>{let e=new Uint32Array(256);for(let n=0;n<256;n++){let t=n;for(let a=0;a<8;a++)t=t&1?3988292384^t>>>1:t>>>1;e[n]=t>>>0}return e})();function hc(e){let n=4294967295;for(let t=0;t<e.length;t++)n=fc[(n^e[t])&255]^n>>>8;return(n^4294967295)>>>0}function Se(e,{deflate:n=!0}={}){if(!Array.isArray(e))throw new Error("buildZip \u9700\u8981 [{name,data}] \u6570\u7EC4");if(e.length>65535)throw new Error("ZIP \u6761\u76EE\u8D85\u8FC7 65535\uFF0C\u6682\u4E0D\u652F\u6301");let t=[],a=0,i=[],r=new TextEncoder;for(let p of e){let u=p.data instanceof Uint8Array?p.data:new Uint8Array(p.data),b=r.encode(p.name||p.path),g=hc(u),f=u;if(n&&u.length>64)try{f=_c(u),f.length>=u.length&&(f=u)}catch{f=u}if(a>4294967294)throw new Error("ZIP \u8D85\u8FC7 4GB");let _=f===u?0:8,y=new Uint8Array(30+b.length),w=new DataView(y.buffer);w.setUint32(0,67324752,!0),w.setUint16(4,20,!0),w.setUint16(6,2048,!0),w.setUint16(8,_,!0),w.setUint16(10,0,!0),w.setUint16(12,33,!0),w.setUint32(14,g,!0),w.setUint32(18,f.length,!0),w.setUint32(22,u.length,!0),w.setUint16(26,b.length,!0),w.setUint16(28,0,!0),y.set(b,30),t.push(y,f),i.push({nameBytes:b,crc:g,compLen:f.length,size:u.length,method:_,offset:a}),a+=y.length+f.length}let o=a;for(let p of i){let u=new Uint8Array(46+p.nameBytes.length),b=new DataView(u.buffer);b.setUint32(0,33639248,!0),b.setUint16(4,20,!0),b.setUint16(6,20,!0),b.setUint16(8,2048,!0),b.setUint16(10,p.method,!0),b.setUint16(12,0,!0),b.setUint16(14,33,!0),b.setUint32(16,p.crc,!0),b.setUint32(20,p.compLen,!0),b.setUint32(24,p.size,!0),b.setUint16(28,p.nameBytes.length,!0),b.setUint32(42,p.offset,!0),u.set(p.nameBytes,46),t.push(u),a+=u.length}let s=new Uint8Array(22),c=new DataView(s.buffer);c.setUint32(0,101010256,!0),c.setUint16(8,i.length,!0),c.setUint16(10,i.length,!0),c.setUint32(12,a-o,!0),c.setUint32(16,o,!0),t.push(s);let l=t.reduce((p,u)=>p+u.length,0),m=new Uint8Array(l),d=0;for(let p of t)m.set(p,d),d+=p.length;return m}function _c(e){try{let n=Yr(e);return n.length<e.length?n:e}catch{return e}}var io=[125,39,37,177,160,82,112,38],qn=256,ao=247;function Ka(e){if(e.length<16)return!1;for(let n=0;n<8;n++)if(e[n]!==io[n])return!1;return!0}function Xn(e){if(!Ka(e))throw new Error("\u4E0D\u662F\u6709\u6548\u7684 .brarchive \u6587\u4EF6");let n=new DataView(e.buffer,e.byteOffset,e.byteLength),t=n.getUint32(8,!0),a=n.getUint32(12,!0);if(t>2e5)throw new Error("\u6761\u76EE\u6570\u5F02\u5E38\uFF1A"+t);let i=16,r=i+t*qn,o=[],s=new TextDecoder("utf-8");for(let c=0;c<t;c++){let l=i+c*qn,m=e[l],d=s.decode(e.subarray(l+1,l+1+m)),p=n.getUint32(l+248,!0),u=n.getUint32(l+252,!0);o.push({name:d,offset:p,length:u,data:e.subarray(r+p,r+p+u)})}return{version:a,entries:o}}function ro(e){let n=e.length,t=16+n*qn,a=0;for(let c of e)a+=c.data.length;let i=new Uint8Array(t+a),r=new DataView(i.buffer);for(let c=0;c<8;c++)i[c]=io[c];r.setUint32(8,n,!0),r.setUint32(12,1,!0);let o=new TextEncoder,s=0;for(let c=0;c<n;c++){let l=e[c],m=16+c*qn,d=o.encode(l.name||l.path);d.length>ao&&(d=d.subarray(0,ao)),i[m]=d.length,i.set(d,m+1),r.setUint32(m+248,s,!0),r.setUint32(m+252,l.data.length,!0),i.set(l.data,t+s),s+=l.data.length}return i}var bc=/\.(mcpack|mcaddon|mcworld|mctemplate|zip|mcskin|mceditpack)$/i;function Vt(e,n){return Ka(n)||/\.brarchive$/i.test(e)?"brarchive":n.length>4&&n[0]===80&&n[1]===75||bc.test(e)?"zip":/\.mcstructure$/i.test(e)?"mcstructure":/\.(dat|ldb|log|sst|nbt)$/i.test(e)?"nbt":"unknown"}var $e=class e{constructor(n,t){this.kind=n,this.files=t.map(a=>({path:bn(a.path||a.name),data:a.data}))}static fromBytes(n,t){let a=Vt(n,t);if(a==="brarchive"){let i=Xn(t);return new e("brarchive",i.entries.map(r=>({path:r.name,data:r.data})))}if(a==="zip"){let i=se(t);return new e("zip",i.entries.filter(r=>!r.name.endsWith("/")).map(r=>({path:r.name,data:i.read(r)})))}throw new Error("\u8FD9\u4E2A\u6587\u4EF6\u4E0D\u662F\u538B\u7F29\u5305\u683C\u5F0F\uFF08.mcpack/.mcaddon/.mcworld/.brarchive\uFF09")}paths(){return this.files.map(n=>n.path)}get(n){return this.files.find(t=>t.path===n)}getBytes(n){let t=this.get(n);if(!t)throw new Error("\u6587\u4EF6\u4E0D\u5B58\u5728\uFF1A"+n);return t.data}getText(n){return new TextDecoder("utf-8").decode(this.getBytes(n))}setBytes(n,t){n=bn(n);let a=this.get(n);a?a.data=t:this.files.push({path:n,data:t})}remove(n){n=bn(n);let t=n+"/";this.files=this.files.filter(a=>a.path!==n&&!a.path.startsWith(t))}rename(n,t,a){if(n=bn(n),t=bn(t),a){let i=n+"/";for(let r of this.files)r.path.startsWith(i)&&(r.path=t+"/"+r.path.slice(i.length))}else{let i=this.get(n);i&&(i.path=t,i.data=i.data)}}tree(){let n=[],t=new Set;for(let a of this.files){let i=a.path.split("/");for(let r=1;r<i.length;r++){let o=i.slice(0,r).join("/");t.has(o)||(t.add(o),n.push({type:"dir",path:o,name:i[r-1],depth:r-1}))}n.push({type:"file",path:a.path,name:i[i.length-1],depth:i.length-1,size:a.data.length})}return n}toBytes(){return this.kind==="brarchive"?ro(this.files):Se(this.files)}};function bn(e){return String(e).replace(/\\/g,"/").replace(/^\/+/,"")}var gc=/\.(json|js|ts|mjs|cjs|mcfunction|txt|md|xml|html|css|lang|material|vertex|fragment|glsl|yaml|yml|toml|ini|cfg|properties|bat|sh|py|ni)$/i;function Yn(e,n){if(gc.test(e))return!0;if(n&&n.length>2*1024*1024)return!1;let t=Math.min(n.length,4096);for(let a=0;a<t;a++)if(n[a]===0)return!1;try{new TextDecoder("utf-8",{fatal:!0}).decode(n.subarray(0,Math.min(n.length,65536)))}catch{return!1}return!0}function Ga(e){let n=Wt(e),t=ve(n);return{nbt:n,plain:t}}function oo(e){return{levelName:e.LevelName??"",gameType:e.GameType??0,difficulty:e.Difficulty??2,hardcore:!!e.hardcore,cheats:!!e.commandsEnabled,keepInventory:!!e.keepInventory,spawnX:e.SpawnX??0,spawnY:e.SpawnY??0,spawnZ:e.SpawnZ??0,time:Number(e.Time??0),seed:String(e.RandomSeed??"0")}}function so(e,n){let t=e.root.value,a=(i,r,o)=>{t[i]={t:r,v:o}};if("levelName"in n&&a("LevelName",8,String(n.levelName)),"gameType"in n&&a("GameType",3,Number(n.gameType)),"difficulty"in n&&a("Difficulty",3,Number(n.difficulty)),"hardcore"in n&&a("hardcore",1,n.hardcore?1:0),"cheats"in n&&a("commandsEnabled",1,n.cheats?1:0),"keepInventory"in n&&a("keepInventory",1,n.keepInventory?1:0),"spawnX"in n&&a("SpawnX",3,Number(n.spawnX)),"spawnY"in n&&a("SpawnY",3,Number(n.spawnY)),"spawnZ"in n&&a("SpawnZ",3,Number(n.spawnZ)),"time"in n&&a("Time",4,BigInt(Math.round(Number(n.time)))),"seed"in n)try{a("RandomSeed",4,BigInt(String(n.seed).trim()))}catch{throw new Error("\u79CD\u5B50\u5FC5\u987B\u662F\u6574\u6570")}return e}function qa(e,n){return to(e,n)}function gn(e){let n=re(e,0,!0);if(n.root.type!==10)throw new Error("\u7ED3\u6784\u6587\u4EF6\u6839\u6807\u7B7E\u4E0D\u662F Compound");let t=ve(n),a=t.size||t.Size||[0,0,0],i=t.structure||{},o=(i.palette&&i.palette.default||{}).block_palette||[],s=i.block_indices||[],c=i.entities||[],l=new Map,m=0,d=s[0]||[];for(let p of d){if(p<0)continue;let u=o[p];if(!u){m++;continue}l.set(u.name,(l.get(u.name)||0)+1)}return{nbt:n,size:a,palette:o,indices:s,entities:c,counts:l,bad:m,formatVersion:t.format_version??null,blockCount:d.filter(p=>p>=0).length,plain:t,rawBytes:e,rawDirty:!1}}function lo(e){let n=[...e.counts.entries()].sort((t,a)=>a[1]-t[1]);return{size:`${e.size[0]} \xD7 ${e.size[1]} \xD7 ${e.size[2]}`,formatVersion:e.formatVersion,paletteTypes:e.palette.length,blocks:e.blockCount,layers:e.indices.length,entities:e.entities.length,top:n.slice(0,100)}}function Xa(e){let n=new Map,t=e.indices[0]||[];for(let a of t){if(a<0)continue;let i=e.palette[a];i&&n.set(i.name,(n.get(i.name)||0)+1)}return n}function co(e,n,t){let a=0;for(let r of e.palette)r.name===n&&(r.name=t,a++);let i=e.nbt.root.value.structure.v.palette.v.default.v.block_palette.v;for(let r of i){let o=r.v&&r.v.name;o&&o.v===n&&(o.v=t)}return e.counts=Xa(e),e.rawDirty=!1,a}function nt(e){return e.rawDirty&&e.rawBytes?e.rawBytes:he(e.nbt,!0)}function Ya(e,n,t,a,i){let[r,o,s]=e.size;if(n<0||t<0||a<0||n>=r||t>=o||a>=s)throw new Error(`\u5750\u6807\u8D85\u51FA\u8303\u56F4\uFF1A\u5C3A\u5BF8 ${r}\xD7${o}\xD7${s}`);let c=e.palette.findIndex(p=>p.name===i&&JSON.stringify(p.states||{})==="{}");if(c<0){e.palette.push({name:i,states:{},version:1}),c=e.palette.length-1,e.nbt.root.value.structure.v.palette.v.default.v.block_palette.v.push({t:10,v:{name:{t:8,v:i},states:{t:10,v:{}},version:{t:3,v:1}}});let u=e.nbt.root.value.structure.v.palette.v.default.v.block_palette;u.t=9,u.et=10}let l=e.indices[0]||[],m=(n*s+a)*o+t;e.indices[0]||(e.indices[0]=new Array(r*o*s).fill(-1)),e.indices[0][m]=c;let d=e.nbt.root.value.structure.v.block_indices.v[0];return d&&(d.v[m]=c),e.counts=Xa(e),e.rawDirty=!1,m}function mo(e,n,t,a){let[i,r,o]=e.size,s=(n*o+a)*r+t;e.indices[0][s]=-1;let c=e.nbt.root.value.structure.v.block_indices.v[0];return c&&(c.v[s]=-1),e.counts=Xa(e),e.rawDirty=!1,s}function uo(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function po(e){let n=String(e).toLowerCase().match(/\.([a-z0-9]+)$/),t=n?n[1]:"";return t==="json"||t==="mcmeta"?"json":t==="js"||t==="mjs"||t==="ts"||t==="cjs"?"js":t==="py"?"py":t==="lua"?"lua":t==="mcfunction"?"mcfunction":t==="xml"||t==="html"||t==="svg"?"xml":t==="css"?"css":t==="lang"||t==="properties"||t==="ini"?"ini":"plain"}var tp=String.raw,yc={json:[[/\/\/[^\n]*|\/\*[\s\S]*?\*\//y,"com"],[/"(\\.|[^"\\])*"(?=\s*:)/y,"key"],[/"(\\.|[^"\\])*"/y,"str"],[/\b(true|false|null)\b/y,"kw"],[/-?\d+(\.\d+)?(e[+-]?\d+)?/iy,"num"]],js:[[/\/\/[^\n]*|\/\*[\s\S]*?\*\//y,"com"],[/`(\\.|[^`\\])*`|"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/y,"str"],[/\b(import|from|export|const|let|var|function|return|if|else|for|while|class|new|await|async|typeof|of|in)\b/y,"kw"],[/\b(true|false|null|undefined)\b/y,"kw"],[/-?\d+(\.\d+)?/y,"num"]],py:[[/#[^\n]*/y,"com"],[/"""[\s\S]*?"""|'''[\s\S]*?'''|"(\\.|[^"])*"|'(\\.|[^'])*'/y,"str"],[/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|True|False|None|print|lambda|with|as)\b/y,"kw"],[/-?\d+(\.\d+)?/y,"num"]],lua:[[/--[^\n]*/y,"com"],[/"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/y,"str"],[/\b(local|function|end|if|then|else|elseif|for|while|return|print|nil|true|false|pairs|ipairs)\b/y,"kw"],[/-?\d+(\.\d+)?/y,"num"]],mcfunction:[[/#[^\n]*/y,"com"],[/^[a-z_]+/my,"kw"],[/~?-?\d+(\.\d+)?/y,"num"],[/@[apesr]/y,"key"],[/"[^"\n]*"/y,"str"]],xml:[[/<!--[\s\S]*?-->/y,"com"],[/<\/?[A-Za-z0-9:_-]+/y,"key"],[/[A-Za-z0-9:_-]+(?==)/y,"kw"],[/"[^"\n]*"/y,"str"]],css:[[/\/\*[\s\S]*?\*\//y,"com"],[/[.#]?[A-Za-z0-9_-]+(?=\s*\{)/y,"key"],[/\b[a-z-]+(?=\s*:)/y,"kw"],[/"[^"\n]*"|'[^'\n]*'/y,"str"],[/-?\d+(\.\d+)?(px|em|rem|%|vh|vw)?/y,"num"]],ini:[[/^[#;][^\n]*/my,"com"],[/^[^=\n]+(?==)/my,"key"],[/=[^\n]*/y,"str"]],plain:[]};function fo(e,n){let t=yc[n]||[],a="",i=0,r=o=>{a+=uo(e.slice(i,i+o)),i+=o};for(;i<e.length;){let o=!1;for(let[s,c]of t){s.lastIndex=i;let l=s.exec(e);if(l&&l.index===i){a+='<span class="hl-'+c+'">'+uo(l[0])+"</span>",i+=l[0].length,o=!0;break}}o||r(1)}return a}var ho={Stone:"\u77F3\u5934",Granite:"\u82B1\u5C97\u5CA9",Diorite:"\u95EA\u957F\u5CA9",Andesite:"\u5B89\u5C71\u5CA9",Deepslate:"\u6DF1\u677F\u5CA9",Cobblestone:"\u5706\u77F3",Dirt:"\u6CE5\u571F","Grass Block":"\u8349\u65B9\u5757",Grass:"\u8349\u65B9\u5757",Sand:"\u6C99\u5B50",Sandstone:"\u7802\u5CA9",Gravel:"\u7802\u783E",Clay:"\u9ECF\u571F",Bedrock:"\u57FA\u5CA9",Obsidian:"\u9ED1\u66DC\u77F3",Water:"\u6C34",Lava:"\u7194\u5CA9",Ice:"\u51B0","Packed Ice":"\u6D6E\u51B0",Snow:"\u96EA","Snow Layer":"\u96EA\u5C42","Coal Ore":"\u7164\u77FF\u77F3","Iron Ore":"\u94C1\u77FF\u77F3","Copper Ore":"\u94DC\u77FF\u77F3","Gold Ore":"\u91D1\u77FF\u77F3","Diamond Ore":"\u94BB\u77F3\u77FF\u77F3","Emerald Ore":"\u7EFF\u5B9D\u77F3\u77FF\u77F3","Redstone Ore":"\u7EA2\u77F3\u77FF\u77F3","Lapis Lazuli Ore":"\u9752\u91D1\u77F3\u77FF\u77F3","Nether Quartz Ore":"\u4E0B\u754C\u77F3\u82F1\u77FF\u77F3","Deepslate Iron Ore":"\u6DF1\u5C42\u94C1\u77FF\u77F3","Deepslate Gold Ore":"\u6DF1\u5C42\u91D1\u77FF\u77F3","Deepslate Diamond Ore":"\u6DF1\u5C42\u94BB\u77F3\u77FF\u77F3","Deepslate Coal Ore":"\u6DF1\u5C42\u7164\u77FF\u77F3","Deepslate Copper Ore":"\u6DF1\u5C42\u94DC\u77FF\u77F3","Deepslate Emerald Ore":"\u6DF1\u5C42\u7EFF\u5B9D\u77F3\u77FF\u77F3","Deepslate Redstone Ore":"\u6DF1\u5C42\u7EA2\u77F3\u77FF\u77F3",Tuff:"\u51DD\u7070\u5CA9",Calcite:"\u65B9\u89E3\u77F3",Sulfur:"\u786B\u78FA",Cinnabar:"\u6731\u7802",Basalt:"\u7384\u6B66\u5CA9",Blackstone:"\u9ED1\u77F3","Soul Sand":"\u7075\u9B42\u6C99","Soul Soil":"\u7075\u9B42\u571F","Magma Block":"\u5CA9\u6D46\u5757",Netherrack:"\u4E0B\u754C\u5CA9",Glowstone:"\u8367\u77F3","End Stone":"\u672B\u5730\u77F3","Purpur Block":"\u7D2B\u73C0\u5757","Oak Planks":"\u6A61\u6728\u6728\u677F","Spruce Planks":"\u4E91\u6749\u6728\u677F","Birch Planks":"\u767D\u6866\u6728\u677F","Jungle Planks":"\u4E1B\u6797\u6728\u677F","Acacia Planks":"\u91D1\u5408\u6B22\u6728\u677F","Dark Oak Planks":"\u6DF1\u8272\u6A61\u6728\u6728\u677F","Mangrove Planks":"\u7EA2\u6811\u6728\u677F","Cherry Planks":"\u6A31\u82B1\u6728\u677F","Crimson Planks":"\u7EEF\u7EA2\u6728\u677F","Warped Planks":"\u8BE1\u5F02\u6728\u677F","Oak Log":"\u6A61\u6728\u539F\u6728","Spruce Log":"\u4E91\u6749\u539F\u6728","Birch Log":"\u767D\u6866\u539F\u6728","Oak Leaves":"\u6A61\u6811\u6811\u53F6","Spruce Leaves":"\u4E91\u6749\u6811\u53F6","Birch Leaves":"\u767D\u6866\u6811\u53F6",Glass:"\u73BB\u7483","Glass Pane":"\u73BB\u7483\u677F","Stained Glass":"\u67D3\u8272\u73BB\u7483",Wool:"\u7F8A\u6BDB",Bricks:"\u7816\u5757","Stone Bricks":"\u77F3\u7816","Mossy Stone Bricks":"\u82D4\u77F3\u7816","Mud Bricks":"\u6CE5\u7816","Quartz Block":"\u77F3\u82F1\u5757","Smooth Quartz":"\u5E73\u6ED1\u77F3\u82F1","Chiseled Quartz":"\u96D5\u7EB9\u77F3\u82F1",Prismarine:"\u6D77\u6676\u77F3","Prismarine Bricks":"\u6D77\u6676\u77F3\u7816","Dark Prismarine":"\u6697\u6D77\u6676\u77F3","Sea Lantern":"\u6D77\u6676\u706F",Sponge:"\u6D77\u7EF5","Wet Sponge":"\u6E7F\u6D77\u7EF5","Coral Block":"\u73CA\u745A\u5757",Bookshelf:"\u4E66\u67B6","Crafting Table":"\u5DE5\u4F5C\u53F0",Furnace:"\u7194\u7089","Blast Furnace":"\u9AD8\u7089",Smoker:"\u70DF\u718F\u7089",Anvil:"\u94C1\u7827","Enchanting Table":"\u9644\u9B54\u53F0","Brewing Stand":"\u917F\u9020\u53F0",Cauldron:"\u70BC\u836F\u9505",Chest:"\u7BB1\u5B50",Barrel:"\u6728\u6876","Ender Chest":"\u672B\u5F71\u7BB1","Trapped Chest":"\u9677\u9631\u7BB1","Shulker Box":"\u6F5C\u5F71\u76D2",Hopper:"\u6F0F\u6597",Dispenser:"\u53D1\u5C04\u5668",Dropper:"\u6295\u63B7\u5668",Piston:"\u6D3B\u585E","Sticky Piston":"\u9ECF\u6027\u6D3B\u585E",Observer:"\u4FA6\u6D4B\u5668","Note Block":"\u97F3\u7B26\u76D2",Jukebox:"\u5531\u7247\u673A",Lever:"\u62C9\u6746",Button:"\u6309\u94AE","Pressure Plate":"\u538B\u529B\u677F","Redstone Torch":"\u7EA2\u77F3\u706B\u628A","Redstone Lamp":"\u7EA2\u77F3\u706F","Redstone Repeater":"\u7EA2\u77F3\u4E2D\u7EE7\u5668","Redstone Comparator":"\u7EA2\u77F3\u6BD4\u8F83\u5668",Rail:"\u94C1\u8F68","Powered Rail":"\u52A8\u529B\u94C1\u8F68","Detector Rail":"\u63A2\u6D4B\u94C1\u8F68","Activator Rail":"\u6FC0\u6D3B\u94C1\u8F68",Minecart:"\u77FF\u8F66",Torch:"\u706B\u628A",Lantern:"\u706F\u7B3C","Soul Lantern":"\u7075\u9B42\u706F\u7B3C",Campfire:"\u8425\u706B","Soul Campfire":"\u7075\u9B42\u8425\u706B",Candle:"\u8721\u70DB",Ladder:"\u68AF\u5B50",Scaffolding:"\u811A\u624B\u67B6",Door:"\u95E8",Trapdoor:"\u6D3B\u677F\u95E8",Fence:"\u6805\u680F","Fence Gate":"\u6805\u680F\u95E8",Bed:"\u5E8A",Carpet:"\u5730\u6BEF",Banner:"\u65D7\u5E1C",Sign:"\u544A\u793A\u724C","Flower Pot":"\u82B1\u76C6","Mob Spawner":"\u5237\u602A\u7B3C",Spawner:"\u5237\u602A\u7B3C","Trial Spawner":"\u8BD5\u70BC\u5237\u602A\u7B3C",Vault:"\u5B9D\u5E93","Decorated Pot":"\u9970\u7EB9\u9676\u7F50","Brushable Block":"\u53EF\u7591\u65B9\u5757","Potent Sulfur Block":"\u6D53\u7F29\u786B\u78FA\u5757",Beacon:"\u4FE1\u6807",Conduit:"\u6F6E\u6D8C\u6838\u5FC3",Bell:"\u949F",Composter:"\u5806\u80A5\u6876",Stonecutter:"\u5207\u77F3\u673A",Grindstone:"\u7802\u8F6E",Loom:"\u7EC7\u5E03\u673A","Cartography Table":"\u5236\u56FE\u53F0","Fletching Table":"\u5236\u7BAD\u53F0","Smithing Table":"\u953B\u9020\u53F0",Lectern:"\u8BB2\u53F0","Honey Block":"\u8702\u871C\u5757","Slime Block":"\u9ECF\u6DB2\u5757","Honeycomb Block":"\u871C\u813E\u5757","Nether Portal":"\u4E0B\u754C\u4F20\u9001\u95E8","End Portal":"\u672B\u5730\u4F20\u9001\u95E8","End Portal Frame":"\u672B\u5730\u4F20\u9001\u95E8\u6846\u67B6","Chorus Flower":"\u7D2B\u9882\u82B1","Chorus Plant":"\u7D2B\u9882\u690D\u682A",Bamboo:"\u7AF9\u5B50","Sugar Cane":"\u7518\u8517",Cactus:"\u4ED9\u4EBA\u638C",Pumpkin:"\u5357\u74DC",Melon:"\u897F\u74DC","Hay Block":"\u5E72\u8349\u5757","Dirt Path":"\u571F\u5F84",Farmland:"\u8015\u5730",Podzol:"\u7070\u5316\u571F",Mycelium:"\u83CC\u4E1D\u4F53","Red Sand":"\u7EA2\u6C99","Red Sandstone":"\u7EA2\u7802\u5CA9",Mud:"\u6CE5\u5DF4","Moss Block":"\u82D4\u85D3\u5757","Mushroom Stem":"\u8611\u83C7\u67C4","Brown Mushroom Block":"\u68D5\u8272\u8611\u83C7\u5757","Red Mushroom Block":"\u7EA2\u8272\u8611\u83C7\u5757",Cobweb:"\u8718\u86DB\u7F51",Fire:"\u706B",Air:"\u7A7A\u6C14",Unknown:"\u672A\u77E5",Book:"\u4E66","Book and Quill":"\u4E66\u4E0E\u7B14","Written Book":"\u6210\u4E66",Paper:"\u7EB8",Map:"\u5730\u56FE",Compass:"\u6307\u5357\u9488",Clock:"\u65F6\u949F","Recovery Compass":"\u8FFD\u6EAF\u6307\u5357\u9488","Echo Shard":"\u56DE\u54CD\u788E\u7247",Stick:"\u6728\u68CD",Bowl:"\u7897",Bucket:"\u6876","Water Bucket":"\u6C34\u6876","Lava Bucket":"\u7194\u5CA9\u6876","Milk Bucket":"\u5976\u6876","Powder Snow Bucket":"\u7EC6\u96EA\u6876",Bundle:"\u6536\u7EB3\u888B",Shears:"\u526A\u5200","Flint and Steel":"\u6253\u706B\u77F3","Fishing Rod":"\u9493\u9C7C\u7AFF","Carrot on a Stick":"\u80E1\u841D\u535C\u9493\u7AFF","Warped Fungus on a Stick":"\u8BE1\u5F02\u83CC\u9493\u7AFF",Lead:"\u62F4\u7EF3","Name Tag":"\u547D\u540D\u724C",Saddle:"\u978D",Elytra:"\u9798\u7FC5","Totem of Undying":"\u4E0D\u6B7B\u56FE\u817E","End Crystal":"\u672B\u5730\u6C34\u6676",Snowball:"\u96EA\u7403",Egg:"\u86CB","Ender Pearl":"\u672B\u5F71\u73CD\u73E0","Eye of Ender":"\u672B\u5F71\u4E4B\u773C","Blaze Rod":"\u70C8\u7130\u68D2","Blaze Powder":"\u70C8\u7130\u7C89","Ghast Tear":"\u6076\u9B42\u4E4B\u6CEA","Nether Star":"\u4E0B\u754C\u4E4B\u661F","Netherite Ingot":"\u4E0B\u754C\u5408\u91D1\u952D","Netherite Scrap":"\u4E0B\u754C\u5408\u91D1\u788E\u7247","Iron Ingot":"\u94C1\u952D","Gold Ingot":"\u91D1\u952D","Copper Ingot":"\u94DC\u952D",Coal:"\u7164\u70AD",Charcoal:"\u6728\u70AD",Diamond:"\u94BB\u77F3",Emerald:"\u7EFF\u5B9D\u77F3","Lapis Lazuli":"\u9752\u91D1\u77F3",Redstone:"\u7EA2\u77F3",Quartz:"\u77F3\u82F1","Amethyst Shard":"\u7D2B\u6C34\u6676\u788E\u7247","Echo Shard ":"\u56DE\u54CD\u788E\u7247",Netherite:"\u4E0B\u754C\u5408\u91D1",Bread:"\u9762\u5305",Apple:"\u82F9\u679C","Golden Apple":"\u91D1\u82F9\u679C","Enchanted Golden Apple":"\u9644\u9B54\u91D1\u82F9\u679C",Carrot:"\u80E1\u841D\u535C","Golden Carrot":"\u91D1\u80E1\u841D\u535C",Potato:"\u9A6C\u94C3\u85AF","Baked Potato":"\u70E4\u9A6C\u94C3\u85AF",Beetroot:"\u751C\u83DC\u6839",Wheat:"\u5C0F\u9EA6","Wheat Seeds":"\u5C0F\u9EA6\u79CD\u5B50","Beetroot Seeds":"\u751C\u83DC\u79CD\u5B50","Melon Seeds":"\u897F\u74DC\u79CD\u5B50","Pumpkin Seeds":"\u5357\u74DC\u79CD\u5B50",Sugar:"\u7CD6","Cocoa Beans":"\u53EF\u53EF\u8C46",Potion:"\u836F\u6C34","Splash Potion":"\u55B7\u6E85\u836F\u6C34","Lingering Potion":"\u6EDE\u7559\u836F\u6C34",Arrow:"\u7BAD","Spectral Arrow":"\u5149\u7075\u7BAD","Tipped Arrow":"\u836F\u7BAD",Bow:"\u5F13",Crossbow:"\u5F29",Trident:"\u4E09\u53C9\u621F",Shield:"\u76FE\u724C","Wooden Sword":"\u6728\u5251","Stone Sword":"\u77F3\u5251","Iron Sword":"\u94C1\u5251","Golden Sword":"\u91D1\u5251","Diamond Sword":"\u94BB\u77F3\u5251","Netherite Sword":"\u4E0B\u754C\u5408\u91D1\u5251","Wooden Pickaxe":"\u6728\u9550","Stone Pickaxe":"\u77F3\u9550","Iron Pickaxe":"\u94C1\u9550","Golden Pickaxe":"\u91D1\u9550","Diamond Pickaxe":"\u94BB\u77F3\u9550","Netherite Pickaxe":"\u4E0B\u754C\u5408\u91D1\u9550","Wooden Axe":"\u6728\u65A7","Stone Axe":"\u77F3\u65A7","Iron Axe":"\u94C1\u65A7","Golden Axe":"\u91D1\u65A7","Diamond Axe":"\u94BB\u77F3\u65A7","Wooden Shovel":"\u6728\u9539","Stone Shovel":"\u77F3\u9539","Iron Shovel":"\u94C1\u9539","Diamond Shovel":"\u94BB\u77F3\u9539","Wooden Hoe":"\u6728\u9504","Stone Hoe":"\u77F3\u9504","Iron Hoe":"\u94C1\u9504","Diamond Hoe":"\u94BB\u77F3\u9504","Armor Stand":"\u76D4\u7532\u67B6","Leather Cap":"\u76AE\u9769\u5E3D\u5B50","Leather Tunic":"\u76AE\u9769\u5916\u5957","Leather Pants":"\u76AE\u9769\u88E4\u5B50","Leather Boots":"\u76AE\u9769\u9774\u5B50","Iron Helmet":"\u94C1\u5934\u76D4","Iron Chestplate":"\u94C1\u80F8\u7532","Iron Leggings":"\u94C1\u62A4\u817F","Iron Boots":"\u94C1\u9774\u5B50","Diamond Helmet":"\u94BB\u77F3\u5934\u76D4","Diamond Chestplate":"\u94BB\u77F3\u80F8\u7532","Diamond Leggings":"\u94BB\u77F3\u62A4\u817F","Diamond Boots":"\u94BB\u77F3\u9774\u5B50","Netherite Helmet":"\u4E0B\u754C\u5408\u91D1\u5934\u76D4","Netherite Chestplate":"\u4E0B\u754C\u5408\u91D1\u80F8\u7532",Villager:"\u6751\u6C11","Villager V2":"\u6751\u6C11","Wandering Trader":"\u6D41\u6D6A\u5546\u4EBA","Iron Golem":"\u94C1\u5080\u5121","Snow Golem":"\u96EA\u5080\u5121",Cat:"\u732B",Ocelot:"\u8C79\u732B",Wolf:"\u72FC",Pig:"\u732A",Cow:"\u725B",Sheep:"\u7F8A",Chicken:"\u9E21",Rabbit:"\u5154\u5B50",Horse:"\u9A6C",Donkey:"\u9A74",Mule:"\u9AA1",Llama:"\u7F8A\u9A7C",Camel:"\u9A86\u9A7C",Fox:"\u72D0\u72F8",Panda:"\u718A\u732B",Bee:"\u871C\u8702",Parrot:"\u9E66\u9E49",Bat:"\u8759\u8760",Squid:"\u9C7F\u9C7C","Glow Squid":"\u53D1\u5149\u9C7F\u9C7C",Dolphin:"\u6D77\u8C5A",Turtle:"\u6D77\u9F9F",Axolotl:"\u7F8E\u897F\u8788",Cod:"\u9CD5\u9C7C",Salmon:"\u9C91\u9C7C","Tropical Fish":"\u70ED\u5E26\u9C7C",Pufferfish:"\u6CB3\u8C5A",Zombie:"\u50F5\u5C38","Zombie Villager":"\u50F5\u5C38\u6751\u6C11",Husk:"\u5C38\u58F3",Drowned:"\u6EBA\u5C38",Skeleton:"\u9AB7\u9AC5",Stray:"\u6D41\u6D6A\u8005",Bogged:"\u6CBC\u9AB8","Wither Skeleton":"\u51CB\u7075\u9AB7\u9AC5",Creeper:"\u82E6\u529B\u6015",Spider:"\u8718\u86DB","Cave Spider":"\u6D1E\u7A74\u8718\u86DB",Silverfish:"\u8839\u866B",Enderman:"\u672B\u5F71\u4EBA",Slime:"\u53F2\u83B1\u59C6","Magma Cube":"\u5CA9\u6D46\u602A",Blaze:"\u70C8\u7130\u4EBA",Ghast:"\u6076\u9B42",Witch:"\u5973\u5DEB",Pillager:"\u63A0\u593A\u8005",Vindicator:"\u536B\u9053\u58EB",Evoker:"\u5524\u9B54\u8005",Illusioner:"\u5E7B\u672F\u5E08",Ravager:"\u52AB\u63A0\u517D",Warden:"\u76D1\u5B88\u8005",Wither:"\u51CB\u7075","Ender Dragon":"\u672B\u5F71\u9F99",Guardian:"\u5B88\u536B\u8005","Elder Guardian":"\u8FDC\u53E4\u5B88\u536B\u8005",Shulker:"\u6F5C\u5F71\u8D1D",Phantom:"\u5E7B\u7FFC",Vex:"\u607C\u9B3C",Allay:"\u60A6\u7075",Frog:"\u9752\u86D9",Tadpole:"\u874C\u86AA",Goat:"\u5C71\u7F8A",Strider:"\u70BD\u8DB3\u517D",Hoglin:"\u75A3\u732A\u517D",Zoglin:"\u50F5\u5C38\u75A3\u732A\u517D",Piglin:"\u732A\u7075","Piglin Brute":"\u732A\u7075\u86EE\u5175","Zombified Piglin":"\u50F5\u5C38\u732A\u7075",Breeze:"\u65CB\u98CE\u4EBA","Armor Stand":"\u76D4\u7532\u67B6",Item:"\u7269\u54C1",Player:"\u73A9\u5BB6","Experience Orb":"\u7ECF\u9A8C\u7403",Health:"\u751F\u547D",Hunger:"\u9965\u997F",Armor:"\u62A4\u7532",Experience:"\u7ECF\u9A8C",Level:"\u7B49\u7EA7",Inventory:"\u80CC\u5305",Hotbar:"\u5FEB\u6377\u680F",Settings:"\u8BBE\u7F6E",Options:"\u9009\u9879",Video:"\u89C6\u9891",Audio:"\u58F0\u97F3",Controls:"\u63A7\u5236",Keyboard:"\u952E\u76D8",Mouse:"\u9F20\u6807",Controller:"\u63A7\u5236\u5668",Touch:"\u89E6\u5C4F",Graphics:"\u56FE\u5F62","Render Distance":"\u6E32\u67D3\u8DDD\u79BB",Brightness:"\u4EAE\u5EA6",Music:"\u97F3\u4E50",Sound:"\u97F3\u6548",Volume:"\u97F3\u91CF",Language:"\u8BED\u8A00",General:"\u901A\u7528",Multiplayer:"\u591A\u4EBA\u6E38\u620F",Singleplayer:"\u5355\u4EBA\u6E38\u620F",World:"\u4E16\u754C",Seed:"\u79CD\u5B50",Creative:"\u521B\u9020",Survival:"\u751F\u5B58",Adventure:"\u5192\u9669",Spectator:"\u65C1\u89C2",Peaceful:"\u548C\u5E73",Easy:"\u7B80\u5355",Normal:"\u666E\u901A",Difficult:"\u56F0\u96BE",Hard:"\u56F0\u96BE",Cheats:"\u4F5C\u5F0A","Allow Cheats":"\u5141\u8BB8\u4F5C\u5F0A","Game Mode":"\u6E38\u620F\u6A21\u5F0F",Difficulty:"\u96BE\u5EA6",Spawn:"\u51FA\u751F\u70B9",Coordinates:"\u5750\u6807",Biome:"\u751F\u7269\u7FA4\u7CFB",Dimension:"\u7EF4\u5EA6",Overworld:"\u4E3B\u4E16\u754C",Nether:"\u4E0B\u754C","The End":"\u672B\u5730",Day:"\u767D\u5929",Night:"\u591C\u665A",Weather:"\u5929\u6C14",Time:"\u65F6\u95F4",Structure:"\u7ED3\u6784",Block:"\u65B9\u5757",Item:"\u7269\u54C1",Entity:"\u5B9E\u4F53",Recipe:"\u914D\u65B9",Crafting:"\u5408\u6210",Furnace:"\u7194\u7089",Chest:"\u7BB1\u5B50",Close:"\u5173\u95ED",Open:"\u6253\u5F00",Cancel:"\u53D6\u6D88",Confirm:"\u786E\u8BA4",Done:"\u5B8C\u6210",Back:"\u8FD4\u56DE",Next:"\u4E0B\u4E00\u4E2A",Previous:"\u4E0A\u4E00\u4E2A",Reset:"\u91CD\u7F6E",Apply:"\u5E94\u7528",Save:"\u4FDD\u5B58",Load:"\u52A0\u8F7D",Delete:"\u5220\u9664",Create:"\u521B\u5EFA",Edit:"\u7F16\u8F91",Name:"\u540D\u79F0",Description:"\u63CF\u8FF0",Version:"\u7248\u672C",Author:"\u4F5C\u8005",Enabled:"\u5DF2\u542F\u7528",Disabled:"\u5DF2\u7981\u7528",On:"\u5F00",Off:"\u5173","Enabled ":"\u5DF2\u542F\u7528","Resource Pack":"\u8D44\u6E90\u5305","Behavior Pack":"\u884C\u4E3A\u5305","Add-On":"\u9644\u52A0\u5305","Texture Pack":"\u6750\u8D28\u5305",Shader:"\u7740\u8272\u5668",Pack:"\u5305",Manifest:"\u6E05\u5355",Module:"\u6A21\u5757",Dependency:"\u4F9D\u8D56",Script:"\u811A\u672C",Function:"\u51FD\u6570",Event:"\u4E8B\u4EF6",Command:"\u547D\u4EE4",Tag:"\u6807\u7B7E",Loading:"\u52A0\u8F7D\u4E2D","Please wait":"\u8BF7\u7A0D\u5019","Not enough space":"\u7A7A\u95F4\u4E0D\u8DB3","This pack has been disabled":"\u8BE5\u8D44\u6E90\u5305\u5DF2\u88AB\u7981\u7528",Import:"\u5BFC\u5165",Export:"\u5BFC\u51FA",Share:"\u5206\u4EAB",Download:"\u4E0B\u8F7D",Upload:"\u4E0A\u4F20",Select:"\u9009\u62E9",Search:"\u641C\u7D22",Hello:"\u4F60\u597D",Warning:"\u8B66\u544A",Error:"\u9519\u8BEF",Success:"\u6210\u529F",Info:"\u4FE1\u606F",Village:"\u6751\u5E84","Trial Chamber":"\u8BD5\u70BC\u5BC6\u5BA4","Ancient City":"\u8FDC\u53E4\u57CE\u5E02",Stronghold:"\u8981\u585E",Mineshaft:"\u5E9F\u5F03\u77FF\u4E95",Dungeon:"\u5730\u7262","Desert Temple":"\u6C99\u6F20\u795E\u6BBF","Jungle Temple":"\u4E1B\u6797\u795E\u5E99","Witch Hut":"\u5973\u5DEB\u5C0F\u5C4B","Ocean Monument":"\u6D77\u5E95\u795E\u6BBF","Woodland Mansion":"\u6797\u5730\u5E9C\u90B8","Pillager Outpost":"\u63A0\u593A\u8005\u524D\u54E8\u7AD9","Ruined Portal":"\u5E9F\u5F03\u4F20\u9001\u95E8",Shipwreck:"\u6C89\u8239","Buried Treasure":"\u57CB\u85CF\u7684\u5B9D\u85CF","Ocean Ruin":"\u6D77\u5E95\u5E9F\u589F",Igloo:"\u96EA\u5C4B",the:"\u7684",of:"\u7684",and:"\u548C",with:"\u5E26\u6709",for:"\u7528\u4E8E",in:"\u5728",on:"\u5728",a:"",an:"",is:"\u662F",are:"\u662F",you:"\u4F60",your:"\u4F60\u7684",has:"\u62E5\u6709",empty:"\u7A7A\u7684",full:"\u6EE1\u7684",new:"\u65B0\u7684",old:"\u65E7\u7684",custom:"\u81EA\u5B9A\u4E49",default:"\u9ED8\u8BA4",none:"\u65E0",all:"\u5168\u90E8",any:"\u4EFB\u4F55",more:"\u66F4\u591A",less:"\u66F4\u5C11",up:"\u4E0A",down:"\u4E0B",left:"\u5DE6",right:"\u53F3",fast:"\u5FEB\u901F",slow:"\u7F13\u6162",click:"\u70B9\u51FB",tap:"\u70B9\u51FB",hold:"\u957F\u6309",toggle:"\u5207\u6362",enable:"\u542F\u7528",disable:"\u7981\u7528",increase:"\u589E\u52A0",decrease:"\u51CF\u5C11",minimum:"\u6700\u5C0F",maximum:"\u6700\u5927",speed:"\u901F\u5EA6",distance:"\u8DDD\u79BB",fov:"\u89C6\u91CE",gamma:"\u4EAE\u5EA6",split:"\u62C6\u5206",hide:"\u9690\u85CF",show:"\u663E\u793A",hud:"\u754C\u9762",chat:"\u804A\u5929",text:"\u6587\u672C",screen:"\u754C\u9762",button:"\u6309\u94AE",slider:"\u6ED1\u5757",title:"\u6807\u9898",subtitle:"\u526F\u6807\u9898",message:"\u6D88\u606F",warning:"\u8B66\u544A",item:"\u7269\u54C1",block:"\u65B9\u5757",level:"\u7B49\u7EA7",mode:"\u6A21\u5F0F",range:"\u8303\u56F4",size:"\u5927\u5C0F",min:"\u6700\u5C0F",max:"\u6700\u5927",low:"\u4F4E",high:"\u9AD8",medium:"\u4E2D",normal:"\u666E\u901A",auto:"\u81EA\u52A8",manual:"\u624B\u52A8",fixed:"\u56FA\u5B9A",random:"\u968F\u673A",randomly:"\u968F\u673A\u5730",true:"\u662F",false:"\u5426",yes:"\u662F",no:"\u5426",ok:"\u786E\u5B9A",close:"\u5173\u95ED",free:"\u81EA\u7531",locked:"\u9501\u5B9A",visible:"\u53EF\u89C1",hidden:"\u9690\u85CF",active:"\u6FC0\u6D3B",powered:"\u5DF2\u6FC0\u6D3B",power:"\u80FD\u91CF",energy:"\u80FD\u91CF",durability:"\u8010\u4E45",damage:"\u4F24\u5BB3",attack:"\u653B\u51FB",defense:"\u9632\u5FA1",protection:"\u4FDD\u62A4",resistance:"\u6297\u6027","speed ":"\u901F\u5EA6",strength:"\u529B\u91CF",jump:"\u8DF3\u8DC3",boost:"\u63D0\u5347",effect:"\u6548\u679C",potion:"\u836F\u6C34",spell:"\u6CD5\u672F",magic:"\u9B54\u6CD5",fire:"\u706B",ice:"\u51B0",water:"\u6C34",lava:"\u7194\u5CA9",air:"\u7A7A\u6C14",earth:"\u5927\u5730",stone:"\u77F3\u5934",wood:"\u6728\u5934",metal:"\u91D1\u5C5E",gold:"\u91D1",iron:"\u94C1",diamond:"\u94BB\u77F3",emerald:"\u7EFF\u5B9D\u77F3",copper:"\u94DC",coal:"\u7164",redstone:"\u7EA2\u77F3",quartz:"\u77F3\u82F1",glass:"\u73BB\u7483",wool:"\u7F8A\u6BDB",sand:"\u6C99\u5B50",dirt:"\u6CE5\u571F",grass:"\u8349",leaves:"\u6811\u53F6",log:"\u539F\u6728",planks:"\u6728\u677F",stairs:"\u697C\u68AF",slab:"\u53F0\u9636",wall:"\u5899",fence:"\u6805\u680F",door:"\u95E8",trapdoor:"\u6D3B\u677F\u95E8",chest:"\u7BB1\u5B50",barrel:"\u6728\u6876",furnace:"\u7194\u7089",torch:"\u706B\u628A",lamp:"\u706F",lantern:"\u706F\u7B3C",carpet:"\u5730\u6BEF",banner:"\u65D7\u5E1C",sign:"\u544A\u793A\u724C",bed:"\u5E8A",campfire:"\u8425\u706B",crafting:"\u5408\u6210",table:"\u53F0",anvil:"\u94C1\u7827",enchant:"\u9644\u9B54",enchantment:"\u9644\u9B54",trading:"\u4EA4\u6613",trade:"\u4EA4\u6613","emerald ":"\u7EFF\u5B9D\u77F3",villager:"\u6751\u6C11",zombie:"\u50F5\u5C38",skeleton:"\u9AB7\u9AC5",creeper:"\u82E6\u529B\u6015",spider:"\u8718\u86DB",enderman:"\u672B\u5F71\u4EBA",pig:"\u732A",cow:"\u725B",sheep:"\u7F8A",chicken:"\u9E21",cat:"\u732B",wolf:"\u72FC",horse:"\u9A6C",rabbit:"\u5154\u5B50",fish:"\u9C7C",bee:"\u871C\u8702",panda:"\u718A\u732B",fox:"\u72D0\u72F8",turtle:"\u6D77\u9F9F","world ":"\u4E16\u754C","world.":"\u4E16\u754C\u3002",player:"\u73A9\u5BB6",server:"\u670D\u52A1\u5668",client:"\u5BA2\u6237\u7AEF",single:"\u5355\u4EBA",multi:"\u591A\u4EBA","mode ":"\u6A21\u5F0F",survival:"\u751F\u5B58",creative:"\u521B\u9020",adventure:"\u5192\u9669",peaceful:"\u548C\u5E73",easy:"\u7B80\u5355",hard:"\u56F0\u96BE","normal ":"\u666E\u901A"};var vc=/[\u4e00-\u9fff]/;function Qa(e){return vc.test(e||"")}function bo(e){let n=String(e).replace(/^\uFEFF/,"").split(/\r?\n/),t=[],a=new TextDecoder;for(let i of n){let r=i,o=r.trim();if(!o||o.startsWith("#")){t.push({raw:r,key:null});continue}let s=r.indexOf("=");if(s<0){t.push({raw:r,key:null});continue}t.push({raw:r,key:r.slice(0,s).trim(),value:r.slice(s+1),eq:s})}return t}function wc(e){return e.map(n=>n.raw).join(`
`)}function go(e,n=ho){if(!e||Qa(e))return e;let t=n[e]||n[e.trim()];if(t)return kc(e,t);let a=e,i=Object.keys(n).sort((s,c)=>c.length-s.length);for(let s of i){if(s.length<3)continue;let c=new RegExp("\\b"+s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","gi");a=a.replace(c,n[s])}let r=e.match(/[A-Za-z]{3,}/g)||[],o=0;return a=e.replace(/\b([A-Za-z]{3,})\b/g,s=>{let c=n[s]||n[s.toLowerCase()];return c?(o++,c):s}),r.length>=2&&o/r.length<.6||r.length===1&&o===0?e:a}function kc(e,n){return n}function xc(e,n){for(let t of n){let a=e.getText(t);for(let i of bo(a))if(i.key&&Qa(i.value))return{file:t,key:i.key}}return null}function Sc(e,n){let t=e.paths(),a=t.filter(m=>(n?m.startsWith(n+"/"):!0)&&/(^|\/)texts\/[^/]+\.lang$/i.test(m));if(!a.length)return{status:"no-lang",translated:0,created:!1};let i=xc(e,a);if(i)return{status:"already-zh",where:i.file,translated:0};let r=a.find(m=>/en_US\.lang$/i.test(m))||a[0],o=e.getText(r),s=bo(o),c=0;for(let m of s){if(!m.key||!m.value)continue;let d=go(m.value);d!==m.value&&(m.raw=m.key+"="+d,c++)}let l=r.replace(/[^/]+\.lang$/,"zh_CN.lang");return e.setBytes(l,new TextEncoder().encode(wc(s))),{status:"localized",translated:c,created:!t.includes(l),file:l}}function _o(e){let n=[],t=new Set;for(let a of e.paths()){let i=a.match(/^(behavior_packs|resource_packs)\/([^/]+)\//);i&&t.add(i[1]+"/"+i[2])}t.size||t.add("");for(let a of t)n.push({pack:a||"(\u6839\u76EE\u5F55\u5305)",...Sc(e,a)});return n}function yo(e){let n=_o(e);for(let t of e.files)if(/\.(mcpack|mcaddon)$/i.test(t.path)&&!(!t.data||t.data.length<22))try{let a=se(t.data),i=new $e("zip",a.entries.filter(c=>!c.name.endsWith("/")).map(c=>({path:c.name,data:a.read(c)}))),r=_o(i),o=[];for(let c of i.paths())if(/\.json$/i.test(c)&&/(^|\/)ui\//.test(c)){let l=ei(i,c);l&&o.push(`${c} (${l} \u5904)`)}if(!r.some(c=>c.status==="localized")&&!o.length){if(r.length)for(let c of r)n.push({...c,pack:`${t.path} :: ${c.pack}`,nested:!0});else n.push({pack:t.path,status:"no-lang",nested:!0});continue}t.data=i.toBytes();for(let c of r)n.push({...c,pack:`${t.path} :: ${c.pack}`,nested:!0});o.length&&n.push({pack:`${t.path} :: UI`,status:"localized",translated:o.length,file:o.join("\u3001"),nested:!0})}catch(a){n.push({pack:t.path,status:"error",nested:!0,note:a.message})}return n}function ei(e,n){let t=e.getText(n),a;try{a=JSON.parse(t)}catch{return 0}let i=0,r=o=>{if(Array.isArray(o)){o.forEach(r);return}if(!(!o||typeof o!="object"))for(let s of Object.keys(o)){let c=o[s];if(typeof c=="string"&&/^(text|label|title|content|message|tooltip|button_text)$/i.test(s)&&!Qa(c)){let l=go(c);l!==c&&(o[s]=l,i++)}else r(c)}};return r(a),i&&e.setBytes(n,new TextEncoder().encode(JSON.stringify(a,null,2))),i}var vo=`entity.agent.name=\u4EE3\u7406\u673A\u5668\u4EBA
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
item.zombified_piglin_spawn_egg.name=\u50F5\u5C38\u732A\u7075\u5237\u602A\u86CB`;var wo=[["\u786B\u9EC4","\u786B\u78FA"],["\u98CE\u5316\u94DC","\u9508\u8680\u94DC"],["\u70C8\u6027\u786B\u78FA","\u6D53\u7F29\u786B\u78FA"]],ti={sulfur_spike:"\u786B\u78FA\u5C16\u9525",sulfur_spike_base:"\u786B\u78FA\u5C16\u9525\u57FA\u5EA7"};var Ec=/[\u4e00-\u9fa5]/,at={block:new Map,item:new Map,entity:new Map},yn=null,ko={},Bc={grass_path:"dirt_path",lit_furnace:"furnace",flowing_water:"water",flowing_lava:"lava",grass:"short_grass",villager_v2:"villager",zombie_villager_v2:"zombie_villager",wither_skeleton:"wither_skeleton",snow_golem:"snow_golem"};function xo(e,n){let t=0;for(let a of e.split(/\r?\n/)){let i=a.trim();if(!i||i.startsWith("#")||i.startsWith("//"))continue;let r=i.indexOf("=");if(r<0)continue;let o=i.slice(0,r).trim(),s=i.slice(r+1).trim();if(!o||!s||!Ec.test(s))continue;let c=o.match(/^(tile|block|item|entity)\.(.+)$/i);if(!c)continue;let l=c[2].replace(/\.(name|description)$/i,""),m=c[1].toLowerCase()==="entity"?n.entity:c[1].toLowerCase()==="item"?n.item:n.block;!l.includes(".")&&!m.has(l)?(m.set(l,s),t++):l.includes(".")&&!m.has(l)&&m.set(l,s)}return t}function ni(e){if(at.block.clear(),at.item.clear(),at.entity.clear(),!e)return 0;let n=e.paths().filter(t=>/(^|\/)texts\/zh[^/]*\.lang$/i.test(t));for(let t of n)try{xo(e.getText(t),at)}catch{}return at.block.size+at.item.size+at.entity.size}function Cc(){return yn||(yn={block:new Map,item:new Map,entity:new Map},xo(vo,yn),yn)}var vn=new Map,Mt="";function So(){vn.clear();try{Mt=localStorage.getItem("mcbe_name_fix")||""}catch{Mt=Mt||""}for(let e of Mt.split(/\r?\n/)){let n=e.indexOf("=");if(n<=0)continue;let t=e.slice(0,n).trim().replace(/^minecraft:/i,"").toLowerCase(),a=e.slice(n+1).trim();t&&a&&vn.set(t,a)}}function Eo(){return Mt}function Bo(e){Mt=e||"";try{localStorage.setItem("mcbe_name_fix",Mt)}catch{}return So(),vn.size}So();function Qn(e){return String(e).replace(/^minecraft:/i,"").toLowerCase()}function Co(e,n){let t=Qn(e);if(vn.has(t))return vn.get(t);let a=Bc[t],i=a?[t,a]:[t];for(let o of i)if(at[n].has(o))return at[n].get(o);let r=Cc();for(let o of i){if(r[n].has(o))return r[n].get(o);if(r.item.has(o))return r.item.get(o);if(ko[o])return ko[o]}return null}function Mo(e,n){if(!e)return e;let t=Qn(n);if(ti[t])return ti[t];let a=e;for(let[i,r]of wo)a=a.split(i).join(r);return a}function Ke(e){return Mo(Co(e,"block"),e)||Qn(e).replace(/_/g," ")}function Io(e){return Mo(Co(e,"entity"),e)||Qn(e).replace(/_/g," ")}var Z={name:"\u6211\u7684\u9644\u52A0\u5305",namespace:"demo",author:"",version:[1,0,0],texture:{size:16,c1:"#c62828",c2:"#ff8a80"},block:{enabled:!0,id:"ruby_block",zh:"\u7EA2\u5B9D\u77F3\u65B9\u5757",en:"Ruby Block",pattern:"stone",hardness:1.5},item:{enabled:!0,id:"ruby",zh:"\u7EA2\u5B9D\u77F3",en:"Ruby",maxStack:64},entity:{enabled:!1,id:"ruby_mob",zh:"\u7EA2\u5B9D\u77F3\u751F\u7269",en:"Ruby Mob",base:"quadruped",health:10,speed:.25},script:{enabled:!1,template:"welcome"}},ai=/^[a-z][a-z0-9_]{0,31}$/,Mc=/^[a-z][a-z0-9_]{1,15}$/,zo=/^#[0-9a-f]{6}$/i;function wn(){let e=globalThis.crypto;if(e&&e.randomUUID)return e.randomUUID();let n=new Uint8Array(16);if(e&&e.getRandomValues)e.getRandomValues(n);else for(let a=0;a<16;a++)n[a]=Math.floor(Math.random()*256);n[6]=n[6]&15|64,n[8]=n[8]&63|128;let t=[...n].map(a=>a.toString(16).padStart(2,"0")).join("");return t.slice(0,8)+"-"+t.slice(8,12)+"-"+t.slice(12,16)+"-"+t.slice(16,20)+"-"+t.slice(20)}function $o(e){let n=[],t=[],a=String(e.name||"").trim(),i=String(e.namespace||"").trim().toLowerCase();a?a.length>48&&n.push({field:"name",message:"\u5305\u540D\u4E0D\u8981\u8D85\u8FC7 48 \u4E2A\u5B57\u7B26"}):n.push({field:"name",message:"\u5305\u540D\u4E0D\u80FD\u4E3A\u7A7A"}),Mc.test(i)||n.push({field:"namespace",message:"\u547D\u540D\u7A7A\u95F4\u53EA\u80FD\u7528\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u4E0B\u5212\u7EBF\uFF0C2\u201316 \u4F4D\uFF0C\u4E14\u4EE5\u5B57\u6BCD\u5F00\u5934"}),i==="minecraft"&&n.push({field:"namespace",message:"\u547D\u540D\u7A7A\u95F4\u4E0D\u80FD\u662F minecraft"}),(!zo.test(e.texture?.c1||"")||!zo.test(e.texture?.c2||""))&&n.push({field:"texture",message:"\u4E3B\u8272\u548C\u526F\u8272\u5FC5\u987B\u662F #RRGGBB"}),[16,32,64].includes(Number(e.texture?.size))||n.push({field:"texture",message:"\u8D34\u56FE\u5C3A\u5BF8\u53EA\u80FD\u662F 16 / 32 / 64"});let r=[];if(e.block?.enabled){ai.test(String(e.block.id||""))?r.push(i+":"+e.block.id):n.push({field:"block.id",message:"\u65B9\u5757 ID \u53EA\u80FD\u7528\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u4E0B\u5212\u7EBF\uFF0C\u4E14\u4EE5\u5B57\u6BCD\u5F00\u5934"}),String(e.block.zh||"").trim()||n.push({field:"block.zh",message:"\u65B9\u5757\u4E2D\u6587\u540D\u4E0D\u80FD\u4E3A\u7A7A"});let s=Number(e.block.hardness);(!Number.isFinite(s)||s<.1||s>30)&&n.push({field:"block.hardness",message:"\u6316\u6398\u65F6\u95F4\u9700\u5728 0.1\u201330 \u79D2\u4E4B\u95F4"})}if(e.item?.enabled){ai.test(String(e.item.id||""))?r.push(i+":"+e.item.id):n.push({field:"item.id",message:"\u7269\u54C1 ID \u53EA\u80FD\u7528\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u4E0B\u5212\u7EBF\uFF0C\u4E14\u4EE5\u5B57\u6BCD\u5F00\u5934"}),String(e.item.zh||"").trim()||n.push({field:"item.zh",message:"\u7269\u54C1\u4E2D\u6587\u540D\u4E0D\u80FD\u4E3A\u7A7A"});let s=Number(e.item.maxStack);(!Number.isInteger(s)||s<1||s>64)&&n.push({field:"item.maxStack",message:"\u5806\u53E0\u6570\u91CF\u9700\u4E3A 1\u201364 \u7684\u6574\u6570"})}if(e.entity?.enabled){ai.test(String(e.entity.id||""))?r.push(i+":"+e.entity.id):n.push({field:"entity.id",message:"\u5B9E\u4F53 ID \u89C4\u5219\u540C\u65B9\u5757"}),String(e.entity.zh||"").trim()||n.push({field:"entity.zh",message:"\u5B9E\u4F53\u4E2D\u6587\u540D\u4E0D\u80FD\u4E3A\u7A7A"});let s=Number(e.entity.health);(!Number.isFinite(s)||s<1||s>200)&&n.push({field:"entity.health",message:"\u751F\u547D\u503C\u9700\u5728 1\u2013200 \u4E4B\u95F4"})}let o=r.filter((s,c)=>r.indexOf(s)!==c);return o.length&&n.push({field:"id",message:"\u65B9\u5757\u3001\u7269\u54C1\u3001\u5B9E\u4F53\u4E0D\u80FD\u4F7F\u7528\u540C\u4E00\u4E2A ID\uFF1A"+[...new Set(o)].join("\u3001")}),!e.block?.enabled&&!e.item?.enabled&&!e.entity?.enabled&&!e.script?.enabled&&n.push({field:"content",message:"\u81F3\u5C11\u52FE\u9009\u65B9\u5757\u3001\u7269\u54C1\u3001\u5B9E\u4F53\u6216\u811A\u672C\u4E2D\u7684\u4E00\u9879"}),e.script?.enabled&&!["welcome","scoreboard","particle"].includes(e.script.template)&&n.push({field:"script",message:"\u672A\u77E5\u7684\u811A\u672C\u6A21\u677F"}),e.entity?.enabled&&e.entity.base==="humanoid"&&e.script?.enabled&&t.push({field:"entity",message:"\u4EBA\u5F62\u5B9E\u4F53\u4F1A\u4F7F\u7528\u73A9\u5BB6\u6A21\u578B\u548C 64\xD764 \u8D34\u56FE\uFF0C\u8FDB\u6E38\u620F\u540E\u5EFA\u8BAE\u518D\u8C03\u6574\u5916\u89C2"}),{errors:n,warnings:t}}function ri(e,n,t){let a=document.createElement("canvas");a.width=e,a.height=n;let i=a.getContext("2d");i.clearRect(0,0,e,n),t(i,e,n);let r=a.toDataURL("image/png"),o=r.slice(r.indexOf(",")+1),s=atob(o),c=new Uint8Array(s.length);for(let l=0;l<s.length;l++)c[l]=s.charCodeAt(l);return c}function Ee(e,n){let t=String(e||"#888888").replace("#","");return"rgba("+parseInt(t.slice(0,2),16)+","+parseInt(t.slice(2,4),16)+","+parseInt(t.slice(4,6),16)+","+(n??1)+")"}function me(e,n){let t=String(e||"#888888").replace("#","");return"rgb("+[0,2,4].map(i=>Math.max(0,Math.min(255,Math.round(parseInt(t.slice(i,i+2),16)*n)))).join(",")+")"}function ii(e,n,t,a,i,r,o=7){let s=o,c=()=>(s=s*16807%2147483647,s/2147483647),l=Math.max(1,Math.floor(n/16));for(let m=0;m<t;m+=l)for(let d=0;d<n;d+=l)e.fillStyle=c()<(r??.35)?Ee(i,1):Ee(a,1),e.fillRect(d,m,l,l)}function Ic(e,n,t,a,i,r){if(e.fillStyle=Ee(i),e.fillRect(0,0,n,t),a==="wood"){e.fillStyle=Ee(r);for(let o=0;o<n;o+=Math.max(2,Math.floor(n/8)))e.fillRect(o,0,Math.max(1,Math.floor(n/32)),t);e.fillRect(0,Math.floor(t/2),n,Math.max(1,Math.floor(t/16)))}else if(a==="metal")e.fillStyle=Ee(r),e.fillRect(0,0,n,Math.max(1,Math.floor(t/8))),e.fillRect(0,t-Math.max(1,Math.floor(t/8)),n,Math.max(1,Math.floor(t/8))),e.fillStyle="rgba(255,255,255,.18)",e.fillRect(Math.floor(n/8),0,Math.max(1,Math.floor(n/8)),t);else if(a==="crystal"){e.fillStyle=Ee(i),e.fillRect(0,0,n,t);let o=n/4;for(let s=0;s<4;s++)e.fillStyle=Ee(r,.55),e.beginPath(),e.moveTo(n/2,0),e.lineTo(n-o,t/2),e.lineTo(n/2,t),e.lineTo(o,t/2),e.closePath(),e.fill();e.fillStyle="rgba(255,255,255,.22)",e.fillRect(Math.floor(n/2),0,Math.max(1,Math.floor(n/16)),Math.max(1,Math.floor(t/2)))}else if(a==="wool"){ii(e,n,t,i,r,.5),e.fillStyle="rgba(0,0,0,.12)";for(let o=0;o<n;o+=4)e.fillRect(o,o*3%t,2,2)}else if(a==="leaves"){ii(e,n,t,i,r,.72),e.fillStyle="rgba(0,0,0,.18)";for(let o=0;o<n;o+=Math.max(2,Math.floor(n/8)))e.fillRect(o,o*5%t,Math.max(1,Math.floor(n/16)),Math.max(1,Math.floor(n/16)))}else ii(e,n,t,i,r,.4);e.strokeStyle=Ee(r,.85),e.lineWidth=1,e.strokeRect(.5,.5,n-1,t-1)}function zc(e,n,t,a,i){e.clearRect(0,0,n,t);let r=n/16,o=[[7,1],[8,1],[9,1],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[6,9],[7,9],[8,9],[9,9],[7,11],[8,11]];for(let[s,c]of o)e.fillStyle=(s+c)%3===0?Ee(i):Ee(a),e.fillRect(s*r,c*r,r,r);e.fillStyle="rgba(255,255,255,.5)",e.fillRect(6*r,3*r,r,r),e.fillRect(5*r,5*r,r,r),e.fillStyle="rgba(0,0,0,.25)",e.fillRect(8*r,9*r,r,r),e.fillRect(7*r,11*r,r,r)}function $c(e,n,t,a,i,r){if(e.clearRect(0,0,n,t),a==="humanoid"){let o=n/64,s=(c,l,m,d,p)=>{e.fillStyle=Ee(p),e.fillRect(c*o,l*o,m*o,d*o)};s(0,0,32,16,i),s(8,8,8,8,me(i,1.05)),s(10,10,2,2,"#ffffff"),s(14,10,2,2,"#ffffff"),s(11,11,1,1,"#111111"),s(15,11,1,1,"#111111"),s(16,16,24,16,me(i,.92)),s(40,16,16,16,Ee(r)),s(0,16,16,16,me(r,.92)),s(16,32,24,16,me(i,1.02)),s(40,32,16,16,me(r,.88)),s(0,32,16,16,me(r,.84))}else{let o=n/64,s=(c,l,m,d,p)=>{e.fillStyle=Ee(p),e.fillRect(c*o,l*o,m*o,d*o)};s(0,0,64,16,me(i,1.02)),s(0,0,16,16,me(i,1.08)),s(4,6,2,2,"#111"),s(10,6,2,2,"#111"),s(16,16,16,16,Ee(r)),s(32,16,16,16,me(r,.9)),s(48,16,16,16,me(r,.82)),s(0,16,64,16,me(i,.92))}}function Tc(e,n,t,a){return ri(e,e,i=>{i.fillStyle="#10141c",i.fillRect(0,0,e,e);let r=e/16,o=(s,c,l,m,d)=>{i.fillStyle=d,i.fillRect(s*r,c*r,l*r,m*r)};for(let s=0;s<16;s++)for(let c=0;c<16;c++)s<3?o(c,s,1,1,me(n,1.15+(c+s)%2*.08)):s<5?o(c,s,1,1,me(n,1)):o(c,s,1,1,me(n,.78+(c+s)%2*.06));o(3,4,10,1,me(t,1.1)),o(3,5,10,4,me(n,.92)),o(3,9,10,2,me(n,.72)),i.strokeStyle=me(t,1.2),i.lineWidth=Math.max(1,e/64),i.strokeRect(2.5*r,3.5*r,11*r,9*r)})}function To(e,n,t,a=64){let[i,r]=e==="humanoid"?[64,64]:[64,32];return ri(i,r,o=>$c(o,i,r,e,n,t))}function ea(e,n,t,a,i){let r=Number(n)||16;return e==="entity"?To(i==="humanoid"?"humanoid":"quadruped",t,a,r):ri(r,r,o=>{e==="item"?zc(o,r,r,t,a):Ic(o,r,r,e,t,a)})}function No(e){let n="";for(let t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return"data:image/png;base64,"+btoa(n)}function Nc(e,n){let t=`// \u7531 MC\u5DE5\u5177\u7BB1\u9644\u52A0\u5305\u5236\u4F5C\u5668\u751F\u6210
import { world, system } from "@minecraft/server";

`;return e==="particle"?t+`system.runInterval(() => {
  for (const p of world.getAllPlayers()) {
    p.dimension.spawnParticle("minecraft:campfire_tick_particle", {
      x: p.location.x, y: p.location.y + 0.2, z: p.location.z
    });
  }
}, 20);
`:e==="scoreboard"?t+`world.afterEvents.playerSpawn.subscribe(({ player }) => {
  try {
    world.scoreboard.addObjective("points", "\u79EF\u5206");
    const obj = world.scoreboard.getObjective("points");
    obj.setScore(player, (obj.getScore(player) || 0) + 1);
    player.sendMessage("\xA7a\u5F53\u524D\u79EF\u5206\uFF1A" + obj.getScore(player));
  } catch (e) { console.warn(e); }
});
`:t+`world.afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {
  if (!initialSpawn) return;
  player.sendMessage("\xA7b\u6B22\u8FCE\u6765\u5230 ${n} \u7684\u4E16\u754C");
});
`}function Lo(e){let n=String(e.namespace||"demo").trim().toLowerCase(),t=String(e.name||"\u6211\u7684\u9644\u52A0\u5305").trim(),a=String(e.author||"").trim()||"MC\u5DE5\u5177\u7BB1",i=Array.isArray(e.version)?e.version:[1,0,0],r=e.texture||{},o=r.c1||"#c62828",s=r.c2||"#ff8a80",c=Number(r.size)||16,l=`behavior_packs/${n}_bp`,m=`resource_packs/${n}_rp`,d=[],p=(M,D)=>{let R=new TextEncoder().encode(D),ne=d.findIndex(je=>je.path===M);ne>=0?d[ne].data=R:d.push({path:M,data:R})},u=(M,D)=>{let R=d.findIndex(ne=>ne.path===M);if(R>=0){let ne=new TextDecoder().decode(d[R].data);d[R].data=new TextEncoder().encode(ne+(ne.endsWith(`
`)||!ne?"":`
`)+D)}else d.push({path:M,data:new TextEncoder().encode(D)})},b=(M,D)=>{let R=d.findIndex(ne=>ne.path===M);R>=0?d[R].data=D:d.push({path:M,data:D})},g=(M,D)=>p(M,JSON.stringify(D,null,2)),f=wn(),_=wn(),y=wn(),w=wn(),v=wn(),I=[1,21,0],B={format_version:2,header:{name:t+" \u884C\u4E3A\u5305",description:t+" \u884C\u4E3A\u5305",uuid:f,version:i,min_engine_version:I},modules:[{type:"data",uuid:y,version:i}],metadata:{authors:[a],generated_with:{mcbe_toolbox:["6.3.0"]}}};e.script?.enabled&&(B.modules.push({type:"script",language:"javascript",uuid:v,entry:"scripts/main.js",version:i}),B.dependencies=[{module_name:"@minecraft/server",version:"1.11.0"}]);let S={format_version:2,header:{name:t+" \u8D44\u6E90\u5305",description:t+" \u8D44\u6E90\u5305",uuid:_,version:i,min_engine_version:I},modules:[{type:"resources",uuid:w,version:i}],dependencies:[{uuid:f,version:i}],metadata:{authors:[a],generated_with:{mcbe_toolbox:["6.3.0"]}}},C=Tc(128,o,s,e.block?.pattern||"stone");b(`${l}/pack_icon.png`,C),b(`${m}/pack_icon.png`,C),g(`${l}/manifest.json`,B),g(`${m}/manifest.json`,S);let k={zh:[],en:[]};k.zh.push("pack.name="+t+" \u884C\u4E3A\u5305","pack.description="+t+" \u884C\u4E3A\u5305"),k.en.push("pack.name="+t+" BP","pack.description="+t+" behavior pack");let z=e.block?.enabled?`${n}_${e.block.id}`:"";if(e.block?.enabled){let M=e.block;b(`${m}/textures/blocks/${z}.png`,ea(M.pattern,c,o,s)),g(`${m}/textures/terrain_texture.json`,{resource_pack_name:t,texture_name:"atlas.terrain",padding:8,num_mip_levels:4,texture_data:{[z]:{textures:[`textures/blocks/${z}`]}}}),g(`${m}/blocks.json`,{format_version:[1,1,0],[`${n}:${M.id}`]:{textures:z,sound:"stone"}}),g(`${l}/blocks/${M.id}.json`,{format_version:"1.21.0","minecraft:block":{description:{identifier:`${n}:${M.id}`,menu_category:{category:"construction"}},components:{"minecraft:material_instances":{"*":{texture:z,render_method:"opaque"}},"minecraft:destructible_by_mining":{seconds_to_destroy:Number(M.hardness)||1.5},"minecraft:destructible_by_explosion":{explosion_resistance:3},"minecraft:light_dampening":15,"minecraft:map_color":o}}}),k.zh.push(`tile.${n}:${M.id}.name=${M.zh||"\u81EA\u5B9A\u4E49\u65B9\u5757"}`),k.en.push(`tile.${n}:${M.id}.name=${M.en||"Custom Block"}`)}let $=e.item?.enabled?`${n}_${e.item.id}`:"";if(e.item?.enabled){let M=e.item;b(`${m}/textures/items/${$}.png`,ea("item",c,o,s)),g(`${m}/textures/item_texture.json`,{resource_pack_name:t,texture_name:"atlas.items",texture_data:{[$]:{textures:[`textures/items/${$}`]}}}),g(`${l}/items/${M.id}.json`,{format_version:"1.21.0","minecraft:item":{description:{identifier:`${n}:${M.id}`,menu_category:{category:"items"}},components:{"minecraft:icon":{texture:$},"minecraft:max_stack_size":Number(M.maxStack)||64}}}),k.zh.push(`item.${n}:${M.id}.name=${M.zh||"\u81EA\u5B9A\u4E49\u7269\u54C1"}`),k.en.push(`item.${n}:${M.id}.name=${M.en||"Custom Item"}`)}if(e.entity?.enabled){let M=e.entity,D=M.base==="humanoid"?"humanoid":"quadruped",R=Math.max(1,Number(M.health)||10);b(`${m}/textures/entity/${n}_${M.id}/${n}_${M.id}.png`,To(D,o,s)),g(`${l}/entities/${M.id}.json`,{format_version:"1.21.0","minecraft:entity":{description:{identifier:`${n}:${M.id}`,is_spawnable:!0,is_summonable:!0},components:{"minecraft:type_family":{family:["custom","mob"]},"minecraft:health":{value:R,max:R},"minecraft:movement":{value:Number(M.speed)||.25},"minecraft:navigation.walk":{can_path_over_water:!0},"minecraft:movement.basic":{},"minecraft:jump.static":{},"minecraft:physics":{},"minecraft:collision_box":M.base==="humanoid"?{width:.6,height:1.8}:{width:.9,height:.9},"minecraft:behavior.random_stroll":{priority:6,speed_multiplier:1},"minecraft:behavior.look_at_player":{priority:7,look_distance:6},"minecraft:behavior.random_look_around":{priority:8}}}}),g(`${m}/entity/${n}_${M.id}.json`,{format_version:"1.10.0","minecraft:client_entity":{description:{identifier:`${n}:${M.id}`,materials:{default:"entity_alphatest"},textures:{default:`textures/entity/${n}_${M.id}/${n}_${M.id}`},geometry:{default:D==="humanoid"?"geometry.humanoid.custom":"geometry.pig"},render_controllers:[D==="humanoid"?"controller.render.humanoid":"controller.render.pig"],spawn_egg:{base_color:o,overlay_color:s}}}}),k.zh.push(`entity.${n}:${M.id}.name=${M.zh||"\u81EA\u5B9A\u4E49\u751F\u7269"}`),k.en.push(`entity.${n}:${M.id}.name=${M.en||"Custom Mob"}`)}e.script?.enabled&&p(`${l}/scripts/main.js`,Nc(e.script.template,n)),p(`${l}/texts/zh_CN.lang`,k.zh.join(`
`)+`
`),p(`${l}/texts/en_US.lang`,k.en.join(`
`)+`
`),p(`${m}/texts/zh_CN.lang`,k.zh.join(`
`)+`
`),p(`${m}/texts/en_US.lang`,k.en.join(`
`)+`
`),p(`${l}/README.md`,`# ${t}

\u7531 MC\u5DE5\u5177\u7BB1\u9644\u52A0\u5305\u5236\u4F5C\u5668\uFF08\u91CD\u7F6E\u7248\uFF09\u751F\u6210\u3002

- \u547D\u540D\u7A7A\u95F4\uFF1A${n}
- \u811A\u672C\uFF1A${e.script?.enabled?e.script.template:"\u65E0"}
- \u5B89\u88C5\uFF1A\u7528 Minecraft \u6253\u5F00 .mcaddon \u5373\u53EF\u5BFC\u5165\u3002
`);let j={files:d.length,dirB:l,dirR:m,uuids:e.script?.enabled?5:4};return{entries:d,dirB:l,dirR:m,stats:j}}var Ao=[{lang:"JSON",title:"\u65B9\u5757\u5B9A\u4E49\uFF08\u6700\u5C0F\u53EF\u8FD0\u884C\uFF09",code:`{
  "format_version": "1.21.0",
  "minecraft:block": {
    "description": { "identifier": "demo:my_block" },
    "components": {
      "minecraft:material_instances": { "*": { "texture": "my_block", "render_method": "opaque" } }
    }
  }
}`},{lang:"JS",title:"\u8FDB\u670D\u6B22\u8FCE",code:`import { world } from "@minecraft/server";
world.afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {
  if (initialSpawn) player.sendMessage("\xA7a\u6B22\u8FCE\uFF01");
});`},{lang:"JS",title:"\u5B9A\u65F6\u7C92\u5B50",code:`import { world, system } from "@minecraft/server";
system.runInterval(() => {
  for (const p of world.getAllPlayers()) p.dimension.spawnParticle("minecraft:campfire_tick_particle", p.location);
}, 20);`}];var Be=e=>String(e??"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]);function jo(e){let{$:n}=e,t=n("modalBody");t.classList.add("makerbox"),t.innerHTML=`
    <div class="mkhead">
      <div>
        <h3>\u9644\u52A0\u5305\u5236\u4F5C\u5668 <span class="mkbadge">\u91CD\u7F6E\u7248</span></h3>
        <p class="muted">\u672C\u5730\u751F\u6210 \xB7 \u4E0D\u8054\u7F51 \xB7 UUID \u548C\u8D34\u56FE\u5168\u90E8\u73B0\u573A\u751F\u6210</p>
      </div>
      <button id="mkClose" class="ghost mkclose" aria-label="\u5173\u95ED" title="\u5173\u95ED">\u2715</button>
    </div>
    <div class="mkbody">
      <section class="mksec">
        <div class="mksec-h"><span class="mkno">01</span><div><h4>\u57FA\u7840\u4FE1\u606F</h4><p class="muted">\u5305\u540D\u4F1A\u663E\u793A\u5728\u6E38\u620F\u8D44\u6E90\u5305\u5217\u8868\u91CC\u3002</p></div></div>
        <div class="mkgrid">
          <label>\u5305\u540D<input id="mkName" maxlength="48" value="${Be(Z.name)}"></label>
          <label>\u547D\u540D\u7A7A\u95F4<input id="mkNs" maxlength="16" value="${Be(Z.namespace)}" spellcheck="false"></label>
          <label>\u4F5C\u8005\uFF08\u53EF\u9009\uFF09<input id="mkAuthor" maxlength="32" value="" placeholder="\u4F60\u7684\u540D\u5B57"></label>
        </div>
      </section>

      <section class="mksec">
        <div class="mksec-h"><span class="mkno">02</span><div><h4>\u5305\u5185\u5BB9</h4><p class="muted">\u52FE\u9009\u4EC0\u4E48\u5C31\u751F\u6210\u4EC0\u4E48\uFF0C\u4E0D\u518D\u585E\u56FA\u5B9A\u6A21\u677F\u3002</p></div></div>
        <div class="mktoggles">
          <label class="mktoggle"><input type="checkbox" id="mkBlockOn" checked><span>\u65B9\u5757</span></label>
          <label class="mktoggle"><input type="checkbox" id="mkItemOn" checked><span>\u7269\u54C1</span></label>
          <label class="mktoggle"><input type="checkbox" id="mkEntityOn"><span>\u751F\u7269</span></label>
        </div>

        <div id="mkBlockFields" class="mkfields">
          <div class="mkfield-title">\u65B9\u5757\u8BBE\u7F6E</div>
          <div class="mkgrid">
            <label>\u65B9\u5757 ID<input id="mkBlockId" value="${Be(Z.block.id)}" spellcheck="false"></label>
            <label>\u4E2D\u6587\u540D<input id="mkBlockZh" value="${Be(Z.block.zh)}"></label>
            <label>\u82F1\u6587\u540D<input id="mkBlockEn" value="${Be(Z.block.en)}"></label>
            <label>\u6316\u6398\u65F6\u95F4\uFF08\u79D2\uFF09<input id="mkBlockHardness" type="number" min="0.1" max="30" step="0.1" value="${Z.block.hardness}"></label>
            <label>\u8D34\u56FE\u98CE\u683C<select id="mkPattern">
              <option value="stone">\u77F3\u8D28\u566A\u70B9</option><option value="wood">\u6728\u7EB9</option><option value="metal">\u91D1\u5C5E</option>
              <option value="crystal">\u6C34\u6676</option><option value="wool">\u7F8A\u6BDB</option><option value="leaves">\u6811\u53F6</option>
            </select></label>
          </div>
        </div>

        <div id="mkItemFields" class="mkfields">
          <div class="mkfield-title">\u7269\u54C1\u8BBE\u7F6E</div>
          <div class="mkgrid">
            <label>\u7269\u54C1 ID<input id="mkItemId" value="${Be(Z.item.id)}" spellcheck="false"></label>
            <label>\u4E2D\u6587\u540D<input id="mkItemZh" value="${Be(Z.item.zh)}"></label>
            <label>\u82F1\u6587\u540D<input id="mkItemEn" value="${Be(Z.item.en)}"></label>
            <label>\u6700\u5927\u5806\u53E0<input id="mkItemStack" type="number" min="1" max="64" step="1" value="${Z.item.maxStack}"></label>
          </div>
        </div>

        <div id="mkEntityFields" class="mkfields off">
          <div class="mkfield-title">\u751F\u7269\u8BBE\u7F6E</div>
          <div class="mkgrid">
            <label>\u751F\u7269 ID<input id="mkEntityId" value="${Be(Z.entity.id)}" spellcheck="false"></label>
            <label>\u4E2D\u6587\u540D<input id="mkEntityZh" value="${Be(Z.entity.zh)}"></label>
            <label>\u82F1\u6587\u540D<input id="mkEntityEn" value="${Be(Z.entity.en)}"></label>
            <label>\u6A21\u578B<select id="mkEntityBase"><option value="quadruped">\u56DB\u8DB3\uFF08\u732A\u6A21\u578B\uFF09</option><option value="humanoid">\u4EBA\u5F62\uFF08\u73A9\u5BB6\u6A21\u578B\uFF09</option></select></label>
            <label>\u751F\u547D\u503C<input id="mkEntityHealth" type="number" min="1" max="200" step="1" value="${Z.entity.health}"></label>
          </div>
        </div>
      </section>

      <section class="mksec">
        <div class="mksec-h"><span class="mkno">03</span><div><h4>\u8D34\u56FE</h4><p class="muted">\u65B9\u5757\u3001\u7269\u54C1\u3001\u751F\u7269\u5171\u7528\u4E00\u5957\u4E3B\u8272\uFF0C\u751F\u6210\u540E\u4ECD\u53EF\u5728\u8D44\u6E90\u5305\u7F16\u8F91\u5668\u91CC\u66FF\u6362\u3002</p></div></div>
        <div class="mkart">
          <div class="mkpreview">
            <img id="mkPrev" alt="\u8D34\u56FE\u9884\u89C8">
            <div class="muted" id="mkPrevInfo"></div>
          </div>
          <div class="mkgrid mkartfields">
            <label>\u4E3B\u8272<input id="mkC1" type="color" value="${Z.texture.c1}"></label>
            <label>\u526F\u8272<input id="mkC2" type="color" value="${Z.texture.c2}"></label>
            <label>\u5C3A\u5BF8<select id="mkSize"><option value="16">16\xD716</option><option value="32">32\xD732</option><option value="64">64\xD764</option></select></label>
          </div>
        </div>
      </section>

      <section class="mksec">
        <div class="mksec-h"><span class="mkno">04</span><div><h4>\u811A\u672C</h4><p class="muted">\u53EA\u751F\u6210\u6E38\u620F\u80FD\u6267\u884C\u7684 JavaScript\uFF0C\u4E0D\u518D\u63D0\u4F9B Python / TypeScript \u5047\u9009\u9879\u3002</p></div></div>
        <div class="mkfields">
          <label class="mktoggle mkcheck"><input type="checkbox" id="mkScriptOn"><span>\u751F\u6210\u811A\u672C</span></label>
          <div class="mkgrid">
            <label>\u6A21\u677F<select id="mkScriptTpl">
              <option value="welcome">\u8FDB\u670D\u6B22\u8FCE</option><option value="scoreboard">\u8BA1\u5206\u677F\u52A0\u5206</option><option value="particle">\u73A9\u5BB6\u811A\u4E0B\u7C92\u5B50</option>
            </select></label>
          </div>
        </div>
      </section>

      <section class="mksec mkresult">
        <div class="mksec-h"><span class="mkno">05</span><div><h4>\u751F\u6210\u68C0\u67E5</h4><p class="muted">\u9519\u8BEF\u4F1A\u76F4\u63A5\u62E6\u4E0B\uFF0C\u4E0D\u751F\u6210\u574F\u5305\u3002</p></div></div>
        <div id="mkSummary" class="mksum"></div>
        <div id="mkErrors" class="mkerrors"></div>
        <div id="mkWarnings" class="mkwarn"></div>
      </section>
    </div>
    <div class="mkfoot">
      <button id="mkBuild">\u751F\u6210\u5E76\u6253\u5F00</button>
      <button id="mkReset" class="ghost">\u6062\u590D\u9ED8\u8BA4</button>
    </div>`,n("modal").style.display="flex";let a=m=>document.getElementById(m),i=m=>(a(m)?.value||"").trim(),r=m=>!!a(m)?.checked;function o(){return{name:i("mkName"),namespace:i("mkNs").toLowerCase(),author:i("mkAuthor"),version:[1,0,0],texture:{size:Number(i("mkSize"))||16,c1:i("mkC1"),c2:i("mkC2")},block:{enabled:r("mkBlockOn"),id:i("mkBlockId"),zh:i("mkBlockZh"),en:i("mkBlockEn"),pattern:i("mkPattern"),hardness:Number(i("mkBlockHardness"))},item:{enabled:r("mkItemOn"),id:i("mkItemId"),zh:i("mkItemZh"),en:i("mkItemEn"),maxStack:Number(i("mkItemStack"))},entity:{enabled:r("mkEntityOn"),id:i("mkEntityId"),zh:i("mkEntityZh"),en:i("mkEntityEn"),base:i("mkEntityBase"),health:Number(i("mkEntityHealth")),speed:.25},script:{enabled:r("mkScriptOn"),template:i("mkScriptTpl")}}}function s(){let m=o();a("mkBlockFields").classList.toggle("off",!m.block.enabled),a("mkItemFields").classList.toggle("off",!m.item.enabled),a("mkEntityFields").classList.toggle("off",!m.entity.enabled),a("mkEntityFields").classList.toggle("humanoid",m.entity.base==="humanoid");let{errors:d,warnings:p}=$o(m),u=null;try{u=Lo(m)}catch(f){d.push({field:"build",message:f.message})}let b=m.entity.enabled?"entity":m.block.enabled?m.block.pattern:m.item.enabled?"item":m.block.pattern;try{let f=ea(b,m.texture.size,m.texture.c1,m.texture.c2,m.entity.base);a("mkPrev").src=No(f)}catch{a("mkPrev").removeAttribute("src")}let g=[m.block.enabled?"\u65B9\u5757 "+m.block.id:"",m.item.enabled?"\u7269\u54C1 "+m.item.id:"",m.entity.enabled?"\u751F\u7269 "+m.entity.id:"",m.script.enabled?"\u811A\u672C":""].filter(Boolean);if(a("mkPrevInfo").textContent=g.length?g.join(" \xB7 "):"\u5C1A\u672A\u52FE\u9009\u5185\u5BB9",u){let f=u.entries.map(y=>y.path),_=f.slice(0,10);a("mkSummary").innerHTML=`<div class="mksum-top"><b>${u.entries.length} \u4E2A\u6587\u4EF6</b><span>\u884C\u4E3A\u5305 + \u8D44\u6E90\u5305</span></div><div class="mkpaths">${_.map(y=>`<code>${Be(y)}</code>`).join("")}${f.length>_.length?`<code>+ ${f.length-_.length} \u4E2A\u6587\u4EF6</code>`:""}</div>`}else a("mkSummary").innerHTML='<span class="muted">\u586B\u5199\u5185\u5BB9\u540E\u663E\u793A\u751F\u6210\u6E05\u5355\u3002</span>';return a("mkErrors").innerHTML=d.length?`<div class="mkerr-h">\u9700\u8981\u4FEE\u6B63 ${d.length} \u9879</div>`+d.map(f=>`<p>${Be(f.message)}</p>`).join(""):'<div class="mkok">\u68C0\u67E5\u901A\u8FC7\uFF0C\u53EF\u4EE5\u751F\u6210</div>',a("mkWarnings").innerHTML=p.map(f=>`<p>\u63D0\u793A\uFF1A${Be(f.message)}</p>`).join(""),a("mkBuild").disabled=d.length>0,{cfg:m,errors:d,project:u}}["mkName","mkNs","mkAuthor","mkBlockOn","mkItemOn","mkEntityOn","mkBlockId","mkBlockZh","mkBlockEn","mkBlockHardness","mkPattern","mkItemId","mkItemZh","mkItemEn","mkItemStack","mkEntityId","mkEntityZh","mkEntityEn","mkEntityBase","mkEntityHealth","mkC1","mkC2","mkSize","mkScriptOn","mkScriptTpl"].forEach(m=>{let d=a(m);d&&(d.addEventListener("input",s),d.addEventListener("change",s))});function l(){n("modal").style.display="none",t.classList.remove("makerbox")}a("mkClose").onclick=l,a("mkReset").onclick=()=>{a("mkName").value=Z.name,a("mkNs").value=Z.namespace,a("mkAuthor").value="",a("mkBlockOn").checked=Z.block.enabled,a("mkItemOn").checked=Z.item.enabled,a("mkEntityOn").checked=Z.entity.enabled,a("mkBlockId").value=Z.block.id,a("mkBlockZh").value=Z.block.zh,a("mkBlockEn").value=Z.block.en,a("mkBlockHardness").value=Z.block.hardness,a("mkPattern").value=Z.block.pattern,a("mkItemId").value=Z.item.id,a("mkItemZh").value=Z.item.zh,a("mkItemEn").value=Z.item.en,a("mkItemStack").value=Z.item.maxStack,a("mkEntityId").value=Z.entity.id,a("mkEntityZh").value=Z.entity.zh,a("mkEntityEn").value=Z.entity.en,a("mkEntityBase").value=Z.entity.base,a("mkEntityHealth").value=Z.entity.health,a("mkC1").value=Z.texture.c1,a("mkC2").value=Z.texture.c2,a("mkSize").value=String(Z.texture.size),a("mkScriptOn").checked=Z.script.enabled,a("mkScriptTpl").value=Z.script.template,s()},a("mkBuild").onclick=()=>{let m=s();if(m.errors.length)return;let d=m.project,p=m.cfg;e.state.archive=new e.Archive("zip",d.entries);let u=(p.name||"\u6211\u7684\u9644\u52A0\u5305").replace(/[\\/:*?"<>|\s]+/g,"-").slice(0,48);e.state.name=u+".mcaddon",e.state.texIndex=null,e.state.texCache=new Map,e.state.texPending=new Set,e.state.texPacks=[],e.state.statsDirty=!0,l(),e.setupArchive("",""),e.log("\u751F\u6210\u5B8C\u6210\uFF1A"+d.entries.length+" \u4E2A\u6587\u4EF6\uFF0C\u547D\u540D\u7A7A\u95F4 "+p.namespace),e.log("\xB7 \u884C\u4E3A\u5305\uFF1A"+d.dirB),e.log("\xB7 \u8D44\u6E90\u5305\uFF1A"+d.dirR),e.log("\xB7 UUID\uFF1A"+d.stats.uuids+" \u4E2A\uFF0C\u5168\u90E8\u672C\u5730\u751F\u6210"),e.log("\u70B9\u53F3\u4E0A\u89D2\u201C\u5BFC\u51FA / \u53E6\u5B58\u201D\u4FDD\u5B58\u4E3A .mcaddon \u5373\u53EF\u5B89\u88C5")},s()}var Po=[{name:"\u5934",x:0,y:0,w:32,h:16},{name:"\u8EAB\u4F53",x:16,y:16,w:24,h:16},{name:"\u53F3\u81C2",x:40,y:16,w:16,h:16},{name:"\u5DE6\u81C2",x:32,y:48,w:16,h:16},{name:"\u53F3\u817F",x:0,y:16,w:16,h:16},{name:"\u5DE6\u817F",x:16,y:48,w:16,h:16}],Lc=["#000000","#ffffff","#7f7f7f","#c0c0c0","#8b5a2b","#a0642a","#d9a066","#3b5b2f","#5a8c3a","#7fbf4a","#2b4a8b","#3d6fd1","#7aa7ff","#8b1f2f","#c0392b","#e67e22","#f1c40f","#16a085","#8e44ad","#ecf0f1"];function Y(e){return document.getElementById(e)}function Do(e,n){let t=document.createElement("canvas");return t.width=e,t.height=n,t}function oi(e){let n=e==="cape",t=64,a=n?32:64,i=new Uint8ClampedArray(t*a*4),r="#7fbf4a",o="brush",s=!1,c=n?10:8,l=[],m=!1,d=Do(t,a),p=d.getContext("2d"),u=p.createImageData(t,a),b=()=>{for(let E=0;E<i.length;E+=4)u.data[E]=i[E],u.data[E+1]=i[E+1],u.data[E+2]=i[E+2],u.data[E+3]=i[E+3];p.putImageData(u,0,0)},g=()=>{l.push(i.slice()),l.length>24&&l.shift()},f=(E,L,U,V)=>{if(E<0||L<0||E>=t||L>=a)return;let[Me,H,q]=y(U),Qe=V??255,Pe=(L*t+E)*4;i[Pe]=Me,i[Pe+1]=H,i[Pe+2]=q,i[Pe+3]=Qe},_=(E,L)=>{let U=(L*t+E)*4;return[i[U],i[U+1],i[U+2],i[U+3]]};function y(E){let L=E.replace("#",""),U=L.length===3?L.split("").map(V=>V+V).join(""):L;return[parseInt(U.slice(0,2),16)||0,parseInt(U.slice(2,4),16)||0,parseInt(U.slice(4,6),16)||0]}let w=(E,L)=>{if(o==="eraser")f(E,L,"#000000",0),s&&f(t-1-E,L,"#000000",0);else if(o==="picker"){let U=_(E,L);if(U[3]>0){r=v(U[0],U[1],U[2]);let V=Y("skColor");V&&(V.value=r)}}else f(E,L,r,255),s&&f(t-1-E,L,r,255);b(),C()};function v(E,L,U){return"#"+[E,L,U].map(V=>V.toString(16).padStart(2,"0")).join("")}function I(E,L,U){let V=_(E,L),[Me,H,q]=y(U);if(V[0]===Me&&V[1]===H&&V[2]===q&&V[3]===255)return;let Qe=[[E,L]],Pe=new Uint8Array(t*a);for(;Qe.length;){let[pe,ge]=Qe.pop();if(pe<0||ge<0||pe>=t||ge>=a)continue;let Ui=ge*t+pe;if(Pe[Ui])continue;let Ln=_(pe,ge);Ln[0]===V[0]&&Ln[1]===V[1]&&Ln[2]===V[2]&&Ln[3]===V[3]&&(Pe[Ui]=1,f(pe,ge,U,255),Qe.push([pe+1,ge],[pe-1,ge],[pe,ge+1],[pe,ge-1]))}b(),C()}function B(){let E=d.getContext("2d");if(E.save(),E.strokeStyle="rgba(120,180,255,.55)",E.lineWidth=1,n)E.strokeStyle="rgba(255,255,255,.5)",E.strokeRect(.5,.5,10,16),E.strokeRect(11.5,.5,10,16),E.fillStyle="rgba(10,20,35,.6)",E.font="4px sans-serif",E.fillText("\u6B63\u9762",1,5),E.fillText("\u80CC\u9762",12,5);else for(let L of Po)E.strokeRect(L.x+.5,L.y+.5,L.w-1,L.h-1),E.fillStyle="rgba(10,20,35,.6)",E.font="4px sans-serif",E.fillText(L.name,L.x+1,L.y+5);E.restore()}function S(){b(),B(),C()}function C(){let E=Y("skPreview");if(!E)return;let L=E.getContext("2d");if(L.clearRect(0,0,E.width,E.height),L.fillStyle="rgba(255,255,255,0.04)",L.fillRect(0,0,E.width,E.height),n){L.imageSmoothingEnabled=!1,L.drawImage(d,0,0,10,16,20,10,120,192);return}L.imageSmoothingEnabled=!1,L.drawImage(d,8,8,8,8,54,10,52,52),L.drawImage(d,20,20,8,12,54,66,52,78),L.drawImage(d,44,20,4,12,18,66,26,78),L.drawImage(d,36,52,4,12,110,66,26,78),L.drawImage(d,4,20,4,12,42,148,26,78),L.drawImage(d,20,52,4,12,86,148,26,78)}function k(){return{W:t,H:a,set:(E,L,U)=>f(E,L,U,255),get:(E,L)=>_(E,L),fill:E=>{for(let L=0;L<a;L++)for(let U=0;U<t;U++)f(U,L,E,255)},rect:(E,L,U,V,Me)=>{for(let H=L;H<L+V;H++)for(let q=E;q<E+U;q++)f(q,H,Me,255)},line:(E,L,U,V,Me)=>{let H=Math.abs(U-E),q=Math.abs(V-L),Qe=E<U?1:-1,Pe=L<V?1:-1,pe=H-q;for(;f(E,L,Me,255),!(E===U&&L===V);){let ge=2*pe;ge>-q&&(pe-=q,E+=Qe),ge<H&&(pe+=H,L+=Pe)}},clear:()=>{i.fill(0)},noise:E=>{for(let L=0;L<a;L++)for(let U=0;U<t;U++)f(U,L,E[Math.floor(Math.random()*E.length)],255)},rand:E=>Math.floor(Math.random()*E),done:()=>{b(),B(),C()}}}let z={stripes:`// \u659C\u6761\u7EB9
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
api.done();`};function $(){g(),i.fill(0);let E="#d9a066",L="#3a2a1a",U="#3d6fd1",V="#2b3b5b",Me="#2b2b2b";for(let H=0;H<32;H++)for(let q=0;q<32;q++)H<8?f(q,H,L,255):H<16&&f(q,H,H<11?L:E,255);for(let H=16;H<32;H++)for(let q=16;q<40;q++)f(q,H,U,255);for(let H=16;H<32;H++)for(let q=40;q<56;q++)f(q,H,U,255);for(let H=16;H<32;H++)for(let q=0;q<16;q++)f(q,H,V,255);f(8,8,"#000000",255),f(12,8,"#000000",255),b(),B(),C()}let j=Y("modalBody");j.innerHTML=`
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
      <input type="color" id="skColor" value="${r}" title="\u989C\u8272">
    </div>
    <div class="skpalette">${Lc.map(E=>`<button class="skc" data-c="${E}" style="background:${E}"></button>`).join("")}</div>
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
    <select id="skSnippet" class="skselect">${Object.keys(z).map(E=>`<option value="${E}">${{stripes:"\u659C\u6761\u7EB9",camo:"\u8FF7\u5F69",gradient:"\u6E10\u53D8",checker:"\u68CB\u76D8\u683C",star:"\u62AB\u98CE\u661F\u7A7A"}[E]}</option>`).join("")}</select>
    <textarea id="skCode" class="code" style="height:22vh" spellcheck="false"></textarea>
    <div class="skbar"><button id="skRun" class="primary">\u8FD0\u884C\u4EE3\u7801</button><button id="skClose" class="ghost">\u5173\u95ED</button></div>
    <p id="skMsg" class="muted"></p>
  `,Y("modal").style.display="flex";let M=document.querySelector(".modalbox");M&&(M.style.maxWidth="760px",M.style.width="96vw",M.style.maxHeight="92vh");let D=Y("skCanvas");D.width=t,D.height=a;let R=D.getContext("2d");function ne(){if(R.clearRect(0,0,t,a),R.imageSmoothingEnabled=!1,R.drawImage(d,0,0),n)R.save(),R.strokeStyle="rgba(255,255,255,.45)",R.strokeRect(.5,.5,10,16),R.strokeRect(11.5,.5,10,16),R.restore();else{R.save(),R.strokeStyle="rgba(120,180,255,.55)",R.lineWidth=1;for(let E of Po)R.strokeRect(E.x+.5,E.y+.5,E.w-1,E.h-1),R.fillStyle="rgba(10,20,35,.55)",R.font="3px sans-serif",R.fillText(E.name,E.x+1,E.y+4);R.restore()}}function je(E){c=Math.max(4,Math.min(20,E)),D.style.width=t*c+"px",D.style.height=a*c+"px"}je(c),ne(),C();let yt=E=>{let L=D.getBoundingClientRect();return[Math.floor((E.clientX-L.left)/L.width*t),Math.floor((E.clientY-L.top)/L.height*a)]};D.addEventListener("pointerdown",E=>{E.preventDefault(),g(),m=!0;let[L,U]=yt(E);o==="fill"?I(L,U,r):w(L,U),ne()}),D.addEventListener("pointermove",E=>{if(!m)return;let[L,U]=yt(E);o!=="fill"&&o!=="picker"&&w(L,U)});let st=()=>{m=!1};D.addEventListener("pointerup",st),D.addEventListener("pointerleave",st),D.addEventListener("pointercancel",st);let vt=(E,L)=>{o=E,["skBrush","skErase","skFill","skPick"].forEach(U=>{let V=Y(U);V&&(V.className=U===L?"primary":"ghost")})};Y("skBrush").onclick=()=>vt("brush","skBrush"),Y("skErase").onclick=()=>vt("eraser","skErase"),Y("skFill").onclick=()=>vt("fill","skFill"),Y("skPick").onclick=()=>vt("picker","skPick"),Y("skMirror").onclick=()=>{s=!s,Y("skMirror").textContent=s?"\u955C\u50CF\u5F00":"\u955C\u50CF\u5173"},Y("skUndo").onclick=()=>{let E=l.pop();E&&(i.set(E),b(),ne(),C())},Y("skClear").onclick=()=>{g(),i.fill(0),b(),ne(),C()},Y("skColor").oninput=E=>{r=E.target.value},j.querySelectorAll(".skc").forEach(E=>{E.onclick=()=>{r=E.dataset.c,Y("skColor").value=r}}),Y("skZoomIn").onclick=()=>je(c+2),Y("skZoomOut").onclick=()=>je(c-2),Y("skTemplate").onclick=()=>{$(),ne()},Y("skSnippet").onchange=()=>{Y("skCode").value=z[Y("skSnippet").value]},Y("skSnippet").onchange(),Y("skRun").onclick=()=>{g();try{new Function("api",Y("skCode").value)(k()),Y("skMsg").textContent="\u5DF2\u751F\u6210\uFF0C\u53EF\u7EE7\u7EED\u7528\u753B\u7B14\u4FEE\u6539",ne(),C()}catch(E){Y("skMsg").textContent="\u4EE3\u7801\u51FA\u9519\uFF1A"+E.message}},Y("skExport").onclick=()=>{let E=Do(t,a),L=E.getContext("2d"),U=L.createImageData(t,a);U.data.set(i),L.putImageData(U,0,0);let V=n?"cape_64x32.png":"skin_64x64.png",Me=E.toDataURL("image/png");if(window.AndroidBridge&&window.AndroidBridge.saveBinary){let q=window.AndroidBridge.saveBinary(V,Me.split(",")[1]);Y("skMsg").textContent=String(q)==="ok"?"\u5DF2\u4FDD\u5B58\u5230 \u4E0B\u8F7D/MCBE\u89E3\u6790/"+V:"\u4FDD\u5B58\u5931\u8D25\uFF1A"+q;return}let H=document.createElement("a");H.download=V,H.href=Me,document.body.appendChild(H),H.click(),H.remove(),Y("skMsg").textContent="\u5DF2\u5BFC\u51FA "+V},Y("skClose").onclick=()=>{M&&(M.style.maxWidth="",M.style.width="",M.style.maxHeight=""),Y("modal").style.display="none"}}var Ac=47,Jt={"minecraft:air":null,"minecraft:water":"#2d6bb3","minecraft:lava":"#d94b1e","minecraft:grass_block":"#63a64b","minecraft:grass":"#63a64b","minecraft:dirt":"#8a6642","minecraft:stone":"#8a8a8a","minecraft:deepslate":"#4a4a50","minecraft:sand":"#ded29a","minecraft:sandstone":"#d9c98a","minecraft:gravel":"#9c9188","minecraft:ice":"#a8d8f0","minecraft:snow":"#f2f7fb","minecraft:bedrock":"#2a2a2a","minecraft:oak_planks":"#b08a4e","minecraft:oak_log":"#6b5328","minecraft:oak_leaves":"#3f7a33","minecraft:acacia_planks":"#ad5d32","minecraft:tuff":"#6d6b63","minecraft:sulfur":"#d6cf5a","minecraft:cinnabar":"#b3443f","minecraft:clay":"#a3a8b4","minecraft:moss_block":"#5b7d3a","minecraft:podzol":"#6b4f26","minecraft:mycelium":"#8b7b8b","minecraft:red_sand":"#c2661f","minecraft:snow_layer":"#eef4f8","sim:lush_cave":"#3f8a4a","sim:sulfur_cave":"#c9b52e","sim:dripstone_cave":"#a89a86"};async function aa(e,n={}){let t=new Set,a=new Map,i=0;for(let[d,p]of e){let u=p.keyBytes||new Uint8Array;if(u.length!==10)continue;let b=new DataView(u.buffer,u.byteOffset,u.byteLength),g=b.getInt32(0,!0),f=b.getInt32(4,!0);if(u[8]!==Ac)continue;let y=u[9]<<24>>24,w;try{w=Kn(p.value,2)}catch{continue}let v=w.layers[0];if(!(!v||!v.indices||v.solid)){t.add(g+","+f),i++;for(let I=0;I<16;I++)for(let B=0;B<16;B++){if(n.y!==void 0&&n.y!==null){let S=Math.floor(n.y);if(S<y*16||S>y*16+15)continue;let k=S-y*16+16*(B+16*I),z=v.palette[v.indices[k]];if(!z||/^minecraft:(air|void_air|structure_void)$/.test(z.name))continue;let $=g*16+I,j=f*16+B;a.set($+","+j,{y:S,block:z.name});continue}for(let S=15;S>=0;S--){let C=S+16*(B+16*I),k=v.palette[v.indices[C]];if(!k||/^minecraft:(air|cave_air|void_air|structure_void)$/.test(k.name))continue;let z=g*16+I,$=f*16+B,j=y*16+S,M=z+","+$,D=a.get(M);!D||j>D.y?a.set(M,{y:j,block:k.name,subs:1}):D.subs=(D.subs||1)+1;break}}n.onProgress&&i%32===0&&n.onProgress(i)}}let r=1/0,o=-1/0,s=1/0,c=-1/0;for(let[d]of a){let[p,u]=d.split(",").map(Number);p<r&&(r=p),p>o&&(o=p),u<s&&(s=u),u>c&&(c=u)}if(!a.size)return{cols:a,chunks:0,chunkSet:t,minX:0,maxX:0,minZ:0,maxZ:0,yRange:[0,0]};let l=1/0,m=-1/0;for(let d of a.values())d.y<l&&(l=d.y),d.y>m&&(m=d.y);return{cols:a,chunks:t.size,chunkSet:t,minX:r,maxX:o,minZ:s,maxZ:c,yRange:[l,m]}}function jc(e,n,t){if(Jt[e]!==void 0&&Jt[e])return Jt[e];if(!e)return"#1b1f26";let a=0;for(let s=0;s<e.length;s++)a=a*31+e.charCodeAt(s)&65535;let i=a%360,o=32+(t&&t[1]>t[0]?(n-t[0])/(t[1]-t[0]):.5)*28;return`hsl(${i},38%,${o.toFixed(0)}%)`}function Ho(e,n,t=2){let{cols:a,minX:i,maxX:r,minZ:o,maxZ:s,yRange:c}=n,l=(r-i+1)*t,m=(s-o+1)*t;if(l>8192||m>8192)return;e.width=Math.max(1,l),e.height=Math.max(1,m);let d=e.getContext("2d");d.fillStyle="#14181e",d.fillRect(0,0,e.width,e.height);for(let[p,u]of a){let[b,g]=p.split(",").map(Number),f=jc(u.block,u.y,c);if(!f)continue;if(u.biome&&Jt[u.biome]){d.globalAlpha=.18,d.fillStyle=Jt[u.biome];let y=u.sim&&n.simStep||1;d.fillRect((b-i)*t,(g-o)*t,t*y,t*y)}d.globalAlpha=u.sim?.72:1,d.fillStyle=f;let _=u.sim&&n.simStep||1;d.fillRect((b-i)*t,(g-o)*t,t*_,t*_)}return d.globalAlpha=1,{width:e.width,height:e.height,origin:[i,o],scale:t}}function Zo(e,n,t){let a=e.cols.get(n+","+t);if(!a)return`(${n}, ${t})\uFF1A\u672A\u4FDD\u5B58\u7684\u533A\u5757`;let i=a.sim?"\u3000\u3010\u6A21\u62DF\u63A8\u6D4B\uFF0C\u975E\u771F\u5B9E\u6570\u636E\u3011":"",r="";if(a.sim)try{r="\u3000\u7FA4\u7CFB\u63A8\u6D4B\uFF1A"+mi(n,t,e.seed||0).zh}catch{}if(a.block==="minecraft:cave_air")return`(${n}, ${t})  \u6D1E\u7A74\u7A7A\u8154\uFF08\u63A8\u6D4B\uFF09  y=${a.y}${i}${r}`;let o=a.biome==="sim:lush_cave"?"\u3000\u63A8\u6D4B\u751F\u7269\u7FA4\u7CFB\uFF1A\u7E41\u8302\u6D1E\u7A74":a.biome==="sim:sulfur_cave"?"\u3000\u63A8\u6D4B\u751F\u7269\u7FA4\u7CFB\uFF1A\u786B\u78FA\u6D1E\u7A74":a.biome==="sim:dripstone_cave"?"\u3000\u63A8\u6D4B\u751F\u7269\u7FA4\u7CFB\uFF1A\u6EF4\u6C34\u77F3\u6D1E\u7A74":"",s=a.block.startsWith("sim:")?a.block==="sim:lush_cave"?"\u7E41\u8302\u6D1E\u7A74\uFF08\u63A8\u6D4B\uFF09":a.block==="sim:sulfur_cave"?"\u786B\u78FA\u6D1E\u7A74\uFF08\u63A8\u6D4B\uFF09":"\u6EF4\u6C34\u77F3\u6D1E\u7A74\uFF08\u63A8\u6D4B\uFF09":`${Ke(a.block)}\uFF08${a.block}\uFF09`;return`(${n}, ${t})  \u65B9\u5757\uFF1A${s}  y=${a.y}${o}${i}`}function Pc(e){let n=e>>>0;return()=>{n=n+2654435769>>>0;let t=n;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Dc(e){let n=Pc(e||1),t=new Uint8Array(512),a=[...Array(256).keys()];for(let i=255;i>0;i--){let r=Math.floor(n()*(i+1)),o=a[i];a[i]=a[r],a[r]=o}for(let i=0;i<512;i++)t[i]=a[i&255];return t}function ta(e,n,t){switch(e&7){case 0:return n+t;case 1:return-n+t;case 2:return n-t;case 3:return-n-t;case 4:return n;case 5:return-n;case 6:return t;default:return-t}}function kn(e){return e*e*e*(e*(e*6-15)+10)}function Uc(e,n,t){let a=Math.floor(n)&255,i=Math.floor(t)&255,r=n-Math.floor(n),o=t-Math.floor(t),s=kn(r),c=kn(o),l=e[e[a]+i],m=e[e[a]+i+1],d=e[e[a+1]+i],p=e[e[a+1]+i+1],u=ta(l,r,o)*(1-s)+ta(d,r-1,o)*s,b=ta(m,r,o-1)*(1-s)+ta(p,r-1,o-1)*s;return(u*(1-c)+b*c)*.7}function Te(e,n,t,a,i=4){let r=0,o=1,s=1/a,c=0;for(let l=0;l<i;l++)r+=Uc(e,n*s,t*s)*o,c+=o,o*=.5,s*=2;return r/c}function ci(e,n,t){let a=ft(t),i=Te(a,e,n,320,5),r=Te(a,e+1e3,n-1e3,180,4),o=1-Math.abs(Te(a,e-700,n+700,90,3))*1.4,s=Te(a,e+500,n+500,22,3),c=64+i*34+s*6;return i>.18&&(c+=(i-.18)*46+Math.max(0,o-.55)*34*(.4+r*.6)),i<-.2&&(c-=(-.2-i)*70),Math.round(Math.max(-64,Math.min(150,c)))}var si={seed:null,perm:null};function ft(e){return si.seed!==e&&(si={seed:e,perm:Dc(e||1)}),si.perm}function Rc(e,n,t){let a=Te(ft(t),e+2e3,n+2e3,260,3),i=Te(ft(t),e-2e3,n-2e3,260,3);return{temp:a,humid:i}}function _e(e,n,t){let a=2166136261^t;return a^=e*374761393,a=Math.imul(a,16777619),a^=n*668265263,a=Math.imul(a,16777619),a^=a>>>13,(a>>>0)/4294967295}function Fc(e,n,t,a){switch(e&15){case 0:return n+t;case 1:return-n+t;case 2:return n-t;case 3:return-n-t;case 4:return n+a;case 5:return-n+a;case 6:return n-a;case 7:return-n-a;case 8:return t+a;case 9:return-t+a;case 10:return t-a;case 11:return-t-a;case 12:return n+t;case 13:return-n+t;case 14:return-t+a;default:return-t-a}}function li(e,n,t,a){let i=Math.floor(n)&255,r=Math.floor(t)&255,o=Math.floor(a)&255,s=n-Math.floor(n),c=t-Math.floor(t),l=a-Math.floor(a),m=kn(s),d=kn(c),p=kn(l),u=e[i]+r,b=e[u]+o,g=e[u+1]+o,f=e[i+1]+r,_=e[f]+o,y=e[f+1]+o,w=(z,$,j,M)=>Fc(e[z&511],$,j,M),v=w(b,s,c,l)*(1-m)+w(_,s-1,c,l)*m,I=w(g,s,c-1,l)*(1-m)+w(y,s-1,c-1,l)*m,B=w(b+1,s,c,l-1)*(1-m)+w(_+1,s-1,c,l-1)*m,S=w(g+1,s,c-1,l-1)*(1-m)+w(y+1,s-1,c-1,l-1)*m,C=v*(1-d)+I*d,k=B*(1-d)+S*d;return(C*(1-p)+k*p)*.7}function na(e,n,t,a,i,r=2){let o=0,s=1,c=1/i,l=0;for(let m=0;m<r;m++)o+=li(e,n*c,t*c,a*c)*s,l+=s,s*=.5,c*=2;return o/l}var Uo=[{id:"plains",zh:"\u5E73\u539F",temp:.05,humid:0,cont:.1,ero:.05,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:oak_leaves"},{id:"forest",zh:"\u68EE\u6797",temp:.05,humid:.18,cont:.1,ero:.05,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:oak_leaves"},{id:"birch_forest",zh:"\u767D\u6866\u68EE\u6797",temp:-.02,humid:.14,cont:.1,ero:.02,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:oak_leaves"},{id:"dark_forest",zh:"\u9ED1\u68EE\u6797",temp:.04,humid:.3,cont:.1,ero:.02,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:oak_leaves"},{id:"cherry_grove",zh:"\u6A31\u82B1\u6811\u6797",temp:.16,humid:.16,cont:.22,ero:.1,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:cherry_leaves"},{id:"pale_garden",zh:"\u82CD\u767D\u4E4B\u56ED",temp:-.05,humid:.24,cont:.12,ero:0,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:pale_oak_leaves"},{id:"jungle",zh:"\u4E1B\u6797",temp:.35,humid:.45,cont:.12,ero:.05,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:oak_leaves"},{id:"swamp",zh:"\u6CBC\u6CFD",temp:.14,humid:.4,cont:.02,ero:0,top:"minecraft:grass_block",sub:"minecraft:mud",accent:"minecraft:oak_leaves"},{id:"mangrove_swamp",zh:"\u7EA2\u6811\u6797\u6CBC\u6CFD",temp:.32,humid:.42,cont:.02,ero:0,top:"minecraft:mud",sub:"minecraft:mud",accent:"minecraft:mangrove_roots"},{id:"desert",zh:"\u6C99\u6F20",temp:.45,humid:-.35,cont:.16,ero:.1,top:"minecraft:sand",sub:"minecraft:sandstone",accent:"minecraft:sand"},{id:"badlands",zh:"\u6076\u5730",temp:.45,humid:-.4,cont:.3,ero:.4,top:"minecraft:red_sand",sub:"minecraft:terracotta",accent:"minecraft:orange_terracotta"},{id:"savanna",zh:"\u70ED\u5E26\u8349\u539F",temp:.35,humid:-.05,cont:.2,ero:.12,top:"minecraft:grass_block",sub:"minecraft:coarse_dirt",accent:"minecraft:oak_leaves"},{id:"taiga",zh:"\u9488\u53F6\u6797",temp:-.15,humid:.25,cont:.16,ero:.1,top:"minecraft:grass_block",sub:"minecraft:podzol",accent:"minecraft:oak_leaves"},{id:"snowy_taiga",zh:"\u96EA\u9488\u53F6\u6797",temp:-.4,humid:.25,cont:.16,ero:.1,top:"minecraft:snowy_grass_block",sub:"minecraft:dirt",accent:"minecraft:snow"},{id:"snowy_plains",zh:"\u96EA\u539F",temp:-.45,humid:0,cont:.1,ero:.02,top:"minecraft:snowy_grass_block",sub:"minecraft:dirt",accent:"minecraft:snow_layer"},{id:"ice_spikes",zh:"\u51B0\u523A\u5E73\u539F",temp:-.5,humid:.05,cont:.2,ero:.35,top:"minecraft:snow_layer",sub:"minecraft:packed_mud",accent:"minecraft:ice"},{id:"mushroom_fields",zh:"\u8611\u83C7\u5C9B",temp:.1,humid:.35,cont:.35,ero:-.1,top:"minecraft:mycelium",sub:"minecraft:dirt",accent:"minecraft:mycelium"},{id:"meadow",zh:"\u8349\u7538",temp:0,humid:.05,cont:.38,ero:-.2,top:"minecraft:grass_block",sub:"minecraft:dirt",accent:"minecraft:grass_block"},{id:"windswept_hills",zh:"\u98CE\u88AD\u4E18\u9675",temp:-.05,humid:.02,cont:.4,ero:.35,top:"minecraft:grass_block",sub:"minecraft:stone",accent:"minecraft:stone"},{id:"stony_peaks",zh:"\u88F8\u5CA9\u5C71\u5CF0",temp:-.1,humid:-.1,cont:.55,ero:.55,top:"minecraft:stone",sub:"minecraft:stone",accent:"minecraft:snow_layer"},{id:"beach",zh:"\u6C99\u6EE9",temp:.2,humid:0,cont:.18,ero:0,top:"minecraft:sand",sub:"minecraft:sandstone",accent:"minecraft:sand"},{id:"warm_ocean",zh:"\u6696\u6C34\u6D77\u6D0B",temp:.4,humid:.1,cont:-.45,ero:.05,top:"minecraft:water",sub:"minecraft:sand",accent:"minecraft:sand"},{id:"ocean",zh:"\u6D77\u6D0B",temp:.1,humid:.1,cont:-.3,ero:.05,top:"minecraft:water",sub:"minecraft:gravel",accent:"minecraft:gravel"},{id:"frozen_ocean",zh:"\u51BB\u6D0B",temp:-.45,humid:.1,cont:-.35,ero:.05,top:"minecraft:ice",sub:"minecraft:gravel",accent:"minecraft:ice"}];function mi(e,n,t){let a=ft(t),i=Te(a,e+2e3,n+2e3,260,3)+Te(a,e-400,n+400,90,2)*.25,r=Te(a,e-2e3,n-2e3,260,3)+Te(a,e+400,n-400,90,2)*.25,o=Te(a,e,n,320,5),s=Te(a,e+1e3,n-1e3,180,4),c=Uo[0],l=1e9;for(let m of Uo){let d=(i-m.temp)**2*2.2+(r-m.humid)**2*1.8+(o-m.cont)**2*2.6+(s-m.ero)**2*1.2;d<l&&(l=d,c=m)}return c}function Wo(e,n,t,a){let i=ft(a),r=Te(i,e+3e3,t+3e3,150,3)+na(i,e,n*2,t,220,2)*.35;return n<-24&&r<-.12?"deep_dark":r>.22?"lush":r>.02?"dripstone":r>-.06&&n<16?"sulfur":"stone"}function Oc(e,n,t,a){let i=na(e,n,t*1.6,a,56,2),r=Math.abs(na(e,n+800,t*1.8,a-800,28,2)),o=Math.abs(na(e,n-900,t*1.5,a+900,42,2));return i>.66||r<.02||o<.014&&t<30}var Ro={lush:["minecraft:moss_block","minecraft:clay","minecraft:azalea_leaves","minecraft:moss_carpet"],dripstone:["minecraft:dripstone_block","minecraft:stone","minecraft:calcite"],deep_dark:["minecraft:sculk","minecraft:deepslate","minecraft:sculk_catalyst"],sulfur:["minecraft:sulfur_block","minecraft:stone","minecraft:sulfur"],stone:["minecraft:stone","minecraft:stone","minecraft:deepslate","minecraft:tuff"]};function Fo(e,n,t,a,i,r){let o=i===void 0?ci(e,n,a):i;if(t>o)return null;let{temp:s,humid:c}=Rc(e,n,a);if(r&&r.caves&&t<o-2){let d=ft(a),p=li(d,e/46,t/28,n/46),u=li(d,e/19+300,t/14-200,n/19+700);if(Math.abs(p)<.1&&Math.abs(u)<.16)return null}let l=mi(e,n,a);if(t===o)return o>126?"minecraft:snow_layer":o>108?l.accent==="minecraft:snow_layer"?"minecraft:snow_layer":"minecraft:stone":l.top==="minecraft:water"?o<=61?"minecraft:water":"minecraft:sand":o<=62?"minecraft:sand":l.top;if(t>o-3)return o<=62?"minecraft:sand":l.sub;if(o-t>6){let d=ft(a);if(t<-54)return"minecraft:lava";if(Oc(d,e,t,n))return"minecraft:cave_air";let p=Wo(e,t,n,a),u=Ro[p]||Ro.stone,b=Math.floor(_e(e+t*7,n-t*3,a+11)*u.length);return u[Math.min(u.length-1,b)]}return t<0?"minecraft:deepslate":"minecraft:stone"}function Vo(e,n={}){let t=Number(n.seed||0),a=n.margin??512,i=n.y!==void 0&&n.y!==null?Math.floor(n.y):null,r=e.chunkSet||new Set,o=e.minX-a,s=e.maxX+a,c=e.minZ-a,l=e.maxZ+a,m=s-o+1,d=l-c+1,p=n.step||(m*d>14e5?2:1),u=0,b=ft(t);for(let g=o;g<=s;g+=p)for(let f=c;f<=l;f+=p){if(r.has(Math.floor(g/16)+","+Math.floor(f/16))||e.cols.has(g+","+f))continue;let _=ci(g,f,t),y,w,v=null;i===null?(w=_,y=Fo(g,f,_,t,_)):(w=i,y=Fo(g,f,i,t,_,{caves:n.caves}),v=n.caves?Wo(g,i,f,t):null,y||(v?(y=v,w=i):w=null)),y&&(e.cols.set(g+","+f,{y:w,block:y,sim:!0,biome:v}),u++)}return e.minX=o,e.maxX=s,e.minZ=c,e.maxZ=l,e.simulated=u,e.simStep=p,e.seed=t,e}var Hc=[{id:"village_plains",zh:"\u6751\u5E84\uFF08\u5E73\u539F\uFF09",biomes:["plains","meadow","forest"],spacing:34,chance:.35,color:"#e0b34a"},{id:"village_desert",zh:"\u6751\u5E84\uFF08\u6C99\u6F20\uFF09",biomes:["desert"],spacing:34,chance:.4,color:"#e0b34a"},{id:"village_savanna",zh:"\u6751\u5E84\uFF08\u70ED\u5E26\u8349\u539F\uFF09",biomes:["savanna"],spacing:34,chance:.4,color:"#e0b34a"},{id:"village_taiga",zh:"\u6751\u5E84\uFF08\u9488\u53F6\u6797\uFF09",biomes:["taiga","snowy_taiga"],spacing:34,chance:.4,color:"#e0b34a"},{id:"village_snowy",zh:"\u6751\u5E84\uFF08\u96EA\u539F\uFF09",biomes:["snowy_plains"],spacing:34,chance:.35,color:"#e0b34a"},{id:"pillager_outpost",zh:"\u63A0\u593A\u8005\u524D\u54E8\u7AD9",biomes:["plains","desert","savanna","taiga"],spacing:40,chance:.25,color:"#c0504d"},{id:"ruined_portal",zh:"\u4E0B\u754C\u4F20\u9001\u95E8\u9057\u5740",biomes:["plains","forest","desert","savanna","taiga","snowy_plains","beach","swamp"],spacing:24,chance:.3,color:"#9b59b6"},{id:"ruined_portal_nether",zh:"\u4E0B\u754C\u4F20\u9001\u95E8\u9057\u5740\uFF08\u4E0B\u754C\u578B\uFF09",biomes:["ocean","warm_ocean"],spacing:24,chance:.2,color:"#8e44ad"},{id:"abandoned_camp",zh:"\u5E9F\u5F03\u8425\u5730",biomes:["forest","taiga","plains","savanna"],spacing:30,chance:.22,color:"#7f8c8d"},{id:"shipwreck",zh:"\u6C89\u8239",biomes:["ocean","warm_ocean","frozen_ocean","beach"],spacing:22,chance:.35,color:"#5d8aa8"},{id:"buried_treasure",zh:"\u57CB\u85CF\u7684\u5B9D\u85CF",biomes:["beach"],spacing:18,chance:.45,color:"#d4af37"},{id:"ocean_monument",zh:"\u6D77\u5E95\u795E\u6BBF",biomes:["ocean","frozen_ocean"],spacing:60,chance:.3,color:"#2e86c1"},{id:"woodland_mansion",zh:"\u6797\u5730\u5E9C\u90B8",biomes:["dark_forest"],spacing:80,chance:.3,color:"#6c3483"},{id:"desert_temple",zh:"\u6C99\u6F20\u795E\u6BBF",biomes:["desert"],spacing:40,chance:.3,color:"#d68910"},{id:"jungle_temple",zh:"\u4E1B\u6797\u795E\u5E99",biomes:["jungle"],spacing:40,chance:.3,color:"#229954"},{id:"witch_hut",zh:"\u5973\u5DEB\u5C0F\u5C4B",biomes:["swamp"],spacing:36,chance:.35,color:"#7d3c98"}],Oo={village:[["minecraft:bread",1,4,6],["minecraft:emerald",1,2,4],["minecraft:iron_ingot",1,3,3],["minecraft:oak_planks",4,12,4],["minecraft:apple",1,3,3],["minecraft:torch",1,4,3],["minecraft:iron_pickaxe",1,1,1],["minecraft:diamond",1,1,.5]],outpost:[["minecraft:crossbow",1,1,2],["minecraft:arrow",4,12,4],["minecraft:iron_ingot",1,3,3],["minecraft:dark_oak_log",3,8,3],["minecraft:emerald",1,3,1]],portal:[["minecraft:gold_ingot",1,4,4],["minecraft:golden_apple",1,1,.6],["minecraft:flint_and_steel",1,1,1],["minecraft:obsidian",1,4,4],["minecraft:gold_block",1,2,1],["minecraft:fire_charge",1,3,1]],camp:[["minecraft:campfire",1,1,2],["minecraft:leather",2,5,3],["minecraft:iron_ingot",1,2,2],["minecraft:bread",1,4,3],["minecraft:arrow",3,9,2],["minecraft:emerald",1,2,1]],shipwreck:[["minecraft:iron_ingot",2,6,4],["minecraft:emerald",1,3,2],["minecraft:gold_ingot",1,3,2],["minecraft:map",1,1,1],["minecraft:oak_planks",4,10,3],["minecraft:paper",2,6,2]],buried:[["minecraft:heart_of_the_sea",1,1,.5],["minecraft:gold_ingot",1,4,2],["minecraft:emerald",2,5,2],["minecraft:tnt",1,2,1]],monument:[["minecraft:gold_block",1,3,2],["minecraft:emerald",1,4,2],["minecraft:prismarine_shard",2,6,3],["minecraft:sponge",1,2,1]],mansion:[["minecraft:iron_ingot",2,6,2],["minecraft:diamond",1,2,1],["minecraft:emerald",1,4,2],["minecraft:gold_ingot",1,3,2]],temple:[["minecraft:gold_ingot",2,5,2],["minecraft:diamond",1,2,1],["minecraft:iron_ingot",2,5,2],["minecraft:emerald",1,3,1]],jungle:[["minecraft:diamond",1,2,1],["minecraft:emerald",1,3,1],["minecraft:gold_ingot",2,5,2],["minecraft:bamboo",2,8,2]],witch:[["minecraft:glass_bottle",1,3,2],["minecraft:redstone",1,4,3],["minecraft:glowstone_dust",1,4,3],["minecraft:spider_eye",1,3,2]]};function Jo(e,n={}){let t=Number(n.seed||0),a=n.margin??512,i=e.minX-a,r=e.maxX+a,o=e.minZ-a,s=e.maxZ+a,c=32,l=[];for(let m=Math.floor(i/c)*c;m<=r;m+=c)for(let d=Math.floor(o/c)*c;d<=s;d+=c){let p=_e(Math.floor(m/c),Math.floor(d/c),t+12345),u=m+Math.floor(_e(m,d,t+7)*c),b=d+Math.floor(_e(m,d,t+19)*c),g=mi(u,b,t),f=Hc.filter(I=>I.biomes.includes(g.id));if(!f.length)continue;let _=_e(m+11,d-13,t+41)*f.length,y=f[Math.min(f.length-1,Math.floor(_))];if(_e(m+3,d-5,t+31)>y.chance)continue;let v=ci(u,b,t);l.push({x:u,z:b,y:v,type:y.id,zh:y.zh,color:y.color,biome:g.zh})}return l}function Kt(e,n){let t=e.startsWith("village")?"village":e.startsWith("ruined_portal")?"portal":e==="pillager_outpost"?"outpost":e==="abandoned_camp"?"camp":e==="shipwreck"?"shipwreck":e==="buried_treasure"?"buried":e==="ocean_monument"?"monument":e==="woodland_mansion"?"mansion":e==="desert_temple"||e==="jungle_temple"?"temple":e==="witch_hut"?"witch":"village",a=Oo[t]||Oo.village,i=3+Math.floor(_e(n,t.length,5)*5),r=[];for(let o=0;o<i;o++){let s=_e(o+1,n,t.length+9),c=0,l=a[0];for(let d of a)if(c+=d[3],s*a.reduce((p,u)=>p+u[3],0)<c){l=d;break}let m=l[1]+Math.floor(_e(o,n+3,11)*(l[2]-l[1]+1));r.push({name:l[0],count:m})}return r}var Zc={village:{size:27,ground:"minecraft:grass_block",path:"minecraft:dirt_path",wall:"minecraft:oak_planks",roof:"minecraft:oak_log",floor:"minecraft:cobblestone",light:"minecraft:torch"},desert_village:{size:27,ground:"minecraft:sand",path:"minecraft:sandstone",wall:"minecraft:sandstone",roof:"minecraft:smooth_sandstone",floor:"minecraft:sandstone",light:"minecraft:torch"},outpost:{size:17,ground:"minecraft:grass_block",wall:"minecraft:dark_oak_planks",roof:"minecraft:dark_oak_log",floor:"minecraft:cobblestone",light:"minecraft:torch"},portal:{size:15,ground:"minecraft:netherrack",frame:"minecraft:obsidian",broken:"minecraft:crying_obsidian",light:"minecraft:fire"},camp:{size:15,ground:"minecraft:grass_block",tent:"minecraft:white_wool",log:"minecraft:oak_log",fire:"minecraft:campfire"},shipwreck:{size:21,hull:"minecraft:oak_planks",deck:"minecraft:spruce_planks",mast:"minecraft:oak_log"},temple:{size:21,ground:"minecraft:sandstone",wall:"minecraft:sandstone",accent:"minecraft:orange_terracotta",gold:"minecraft:gold_block"},jungle_temple:{size:21,ground:"minecraft:mossy_cobblestone",wall:"minecraft:cobblestone",accent:"minecraft:chiseled_stone_bricks"},monument:{size:25,ground:"minecraft:prismarine",wall:"minecraft:prismarine_bricks",accent:"minecraft:sea_lantern"},mansion:{size:31,ground:"minecraft:grass_block",wall:"minecraft:dark_oak_planks",roof:"minecraft:dark_oak_log",floor:"minecraft:cobblestone"},witch_hut:{size:13,ground:"minecraft:grass_block",wall:"minecraft:spruce_planks",roof:"minecraft:dark_oak_log"}};function xn(e,n){let t=e.startsWith("village")?e.includes("desert")?"desert_village":"village":e.startsWith("ruined_portal")?"portal":e==="pillager_outpost"?"outpost":e==="abandoned_camp"?"camp":e==="shipwreck"?"shipwreck":e==="desert_temple"?"temple":e==="jungle_temple"?"jungle_temple":e==="ocean_monument"?"monument":e==="woodland_mansion"?"mansion":e==="witch_hut"?"witch_hut":"camp",a=Zc[t],i=a.size,r=Math.floor(i/2),o=new Map,s=(m,d,p)=>{m>=0&&d>=0&&m<i&&d<i&&o.set(m+","+d,p)},c=m=>_e(m*7+1,m*13+3,n+99);for(let m=0;m<i;m++)for(let d=0;d<i;d++)s(m,d,a.ground||a.hull||a.wall);if(t==="village"||t==="desert_village"){for(let d=0;d<i;d++)s(d,r,a.path),s(r,d,a.path);let m=3+Math.floor(c(1)*4);for(let d=0;d<m;d++){let p=3+Math.floor(_e(d,2,n+5)*(i-8)),u=3+Math.floor(_e(d,3,n+6)*(i-8)),b=5+Math.floor(_e(d,4,n+7)*3),g=5+Math.floor(_e(d,5,n+8)*3);for(let f=p;f<p+b;f++)for(let _=u;_<u+g;_++)s(f,_,a.wall);for(let f=p;f<p+b;f++)s(f,u,a.roof);s(p+Math.floor(b/2),u+g-1,a.light)}for(let d=r-1;d<=r+1;d++)for(let p=r-1;p<=r+1;p++)s(d,p,a.floor)}else if(t==="portal"){for(let[m,d]of[[5,5],[5,10],[10,5],[10,10]])s(m,d,a.frame);for(let m=6;m<=9;m++)s(m,6,a.broken),s(m,9,a.broken);s(6,7,a.frame),s(7,7,a.light),s(8,8,a.frame)}else if(t==="camp"){for(let m=0;m<i;m++)s(m,r,"minecraft:dirt_path");s(r,r,a.fire);for(let m=0;m<3;m++){let d=2+Math.floor(_e(m,1,n+3)*(i-6)),p=2+Math.floor(_e(m,2,n+4)*(i-6));for(let u=d;u<d+4;u++)for(let b=p;b<p+3;b++)s(u,b,a.tent)}s(2,2,a.log),s(i-3,i-3,a.log)}else if(t==="shipwreck"){for(let m=4;m<i-4;m++)s(m,4,a.hull),s(m,i-5,a.hull);for(let m=4;m<i-4;m++)s(4,m,a.hull),s(i-5,m,a.hull);for(let m=6;m<i-6;m++)for(let d=6;d<i-6;d++)s(m,d,a.deck);s(r,r,a.mast)}else if(t==="temple"){for(let m=1;m<i-1;m++)for(let d=1;d<i-1;d++)s(m,d,a.wall);for(let m=2;m<i-2;m+=3)s(m,2,a.accent),s(2,m,a.accent),s(m,i-3,a.accent),s(i-3,m,a.accent);s(r,r,a.gold)}else if(t==="outpost"||t==="mansion"||t==="witch_hut"){for(let m=2;m<i-2;m++)for(let d=2;d<i-2;d++)s(m,d,a.wall);for(let m=2;m<i-2;m++)s(m,2,a.roof);s(r,r,a.light)}else if(t==="monument"){for(let m=2;m<i-2;m++)for(let d=2;d<i-2;d++)s(m,d,a.wall);for(let m=3;m<i-3;m+=4)s(m,r,a.accent)}else if(t==="jungle_temple"){for(let m=1;m<i-1;m++)for(let d=1;d<i-1;d++)s(m,d,a.wall);for(let m=2;m<i-2;m+=2)s(m,2,a.accent)}let l=[];for(let[m,d]of o){let[p,u]=m.split(",").map(Number);l.push({x:p,z:u,block:d})}return{size:i,blocks:l,kind:t}}function Ge(e){return Jt[e]||"#6b7280"}function ia(e,n,t=0){let{size:a,palette:i,blocks:r}=n;if(!e||!a||!r||!r.length)return;let[o,s,c]=a,l=Math.cos(t*Math.PI/2),m=Math.sin(t*Math.PI/2),d=5,p=3,u=r.map(S=>{let C=S.pos[0],k=S.pos[1],z=S.pos[2],$=Math.round(C*l+z*m),j=Math.round(-C*m+z*l);return{x:$,y:k,z:j,id:S.state}}),b=1/0,g=-1/0,f=1/0,_=-1/0;for(let S of u)b=Math.min(b,S.x),g=Math.max(g,S.x),f=Math.min(f,S.z),_=Math.max(_,S.z);let y=(g-b+_-f+2)*d+40,w=(g-b+_-f+2)*p+s*p+40;e.width=Math.min(1200,Math.max(320,y)),e.height=Math.min(900,Math.max(260,w));let v=e.getContext("2d");v.fillStyle="#0b0f15",v.fillRect(0,0,e.width,e.height);let I=14+(g-b+1)*d,B=20+s*p;u.sort((S,C)=>S.x+S.z+S.y*.01-(C.x+C.z+C.y*.01));for(let S of u){let C=(S.x-b+(S.z-f))*d/2+(g-b+1)*0,k=(S.x-S.z)*d+e.width/2,z=B-S.y*p+(S.x+S.z)*p/2-(b+f)*0,$=i[S.id]||"minecraft:stone",j=Ge($);v.fillStyle=Ko(j,.86),v.beginPath(),v.moveTo(k,z),v.lineTo(k+d,z+p/2),v.lineTo(k,z+p),v.lineTo(k-d,z+p/2),v.closePath(),v.fill(),v.fillStyle=j,v.beginPath(),v.moveTo(k-d,z+p/2),v.lineTo(k-d,z+p*1.5),v.lineTo(k,z+p*2),v.lineTo(k,z+p),v.closePath(),v.fill(),v.fillStyle=Ko(j,1.14),v.beginPath(),v.moveTo(k+d,z+p/2),v.lineTo(k+d,z+p*1.5),v.lineTo(k,z+p*2),v.lineTo(k,z+p),v.closePath(),v.fill()}}function Ko(e,n){let t=e.replace("#",""),a=parseInt(t.length===3?t.split("").map(s=>s+s).join(""):t,16),i=a>>16&255,r=a>>8&255,o=a&255;return i=Math.max(0,Math.min(255,Math.round(i*n))),r=Math.max(0,Math.min(255,Math.round(r*n))),o=Math.max(0,Math.min(255,Math.round(o*n))),"#"+((1<<24)+(i<<16)+(r<<8)+o).toString(16).slice(1)}function Go(e,n=12){return e.slice(0,n).map(t=>`<span class="legenditem"><i style="background:${Ge(t)}"></i>${t.replace("minecraft:","")}</span>`).join("")}function Ne(e){let n=new DataView(e.buffer,e.byteOffset,e.byteLength),t=new TextDecoder("utf-8",{fatal:!1}),a=0,i=()=>{let c=n.getUint16(a);if(a+=2,a+c>e.length)throw new Error("NBT \u5B57\u7B26\u4E32\u8D8A\u754C");let l=t.decode(e.subarray(a,a+c));return a+=c,l};function r(c){switch(c){case 1:{let l=n.getInt8(a);return a+=1,l}case 2:{let l=n.getInt16(a);return a+=2,l}case 3:{let l=n.getInt32(a);return a+=4,l}case 4:{let l=n.getBigInt64(a);a+=8;let m=Number(l);return Number.isSafeInteger(m)?m:l}case 5:{let l=n.getFloat32(a);return a+=4,l}case 6:{let l=n.getFloat64(a);return a+=8,l}case 7:{let l=n.getInt32(a);a+=4;let m=e.subarray(a,a+l);return a+=l,m}case 8:return i();case 9:{let l=n.getInt8(a);a+=1;let m=n.getInt32(a);a+=4;let d=[];for(let p=0;p<m;p++)d.push(r(l));return{listType:l,items:d}}case 10:{let l={};for(;;){let m=n.getInt8(a);if(a+=1,m===0)break;let d=i();l[d]={type:m,value:r(m)}}return l}case 11:{let l=n.getInt32(a);a+=4;let m=new Int32Array(l);for(let d=0;d<l;d++)m[d]=n.getInt32(a),a+=4;return m}case 12:{let l=n.getInt32(a);a+=4;let m=[];for(let d=0;d<l;d++)m.push(n.getBigInt64(a)),a+=8;return m}default:throw new Error("\u672A\u77E5 NBT \u7C7B\u578B "+c)}}let o=n.getInt8(a);if(a+=1,o!==10)throw new Error("NBT \u6839\u8282\u70B9\u4E0D\u662F Compound");let s=i();return{rootType:o,rootName:s,data:r(10)}}function Sn(e){let n=new TextEncoder,t=[],a=0,i=l=>{t.push(l),a+=l.length},r=l=>{let m=n.encode(l);if(m.length>65535)throw new Error("NBT \u5B57\u7B26\u4E32\u8D85\u8FC7 65535 \u5B57\u8282");let d=new Uint8Array(2);new DataView(d.buffer).setUint16(0,m.length),i(d),i(m)},o=(l,m)=>{let d=new Uint8Array(l===1?1:l===2?2:l===3?4:l===4?8:l===5?4:l===6?8:0),p=new DataView(d.buffer);if(l===1?p.setInt8(0,m):l===2?p.setInt16(0,m):l===3?p.setInt32(0,m):l===4?p.setBigInt64(0,typeof m=="bigint"?m:BigInt(Math.trunc(m))):l===5?p.setFloat32(0,m):l===6&&p.setFloat64(0,m),l<=6){i(d);return}if(l===7){let u=m instanceof Uint8Array?m:new Uint8Array(m),b=new Uint8Array(4+u.length);new DataView(b.buffer).setInt32(0,u.length),b.set(u,4),i(b);return}if(l===8){r(m);return}if(l===9){let u=m.listType,b=m.items,g=new Uint8Array(5);g[0]=u,new DataView(g.buffer).setInt32(1,b.length),i(g);for(let f of b)o(u,f);return}if(l===10){for(let u of Object.keys(m)){let b=m[u].type,g=m[u].value;i(new Uint8Array([b])),r(u),o(b,g)}i(new Uint8Array([0]));return}if(l===11){let u=new Uint8Array(4+m.length*4);new DataView(u.buffer).setInt32(0,m.length);for(let b=0;b<m.length;b++)new DataView(u.buffer).setInt32(4+b*4,m[b]);i(u);return}if(l===12){let u=new Uint8Array(4+m.length*8);new DataView(u.buffer).setInt32(0,m.length);for(let b=0;b<m.length;b++)new DataView(u.buffer).setBigInt64(4+b*8,typeof m[b]=="bigint"?m[b]:BigInt(Math.trunc(m[b])));i(u);return}};i(new Uint8Array([10])),r(e.rootName||""),o(10,e.data);let s=new Uint8Array(a),c=0;for(let l of t)s.set(l,c),c+=l.length;return s}function K(e,n,t){let a=e&&e[n];return a?a.value:t}function It(e){let n=se(e),t=n.entries.find(c=>c.name==="level.dat"||c.name.endsWith("/level.dat"));if(!t)throw new Error("ZIP \u91CC\u6CA1\u6709 level.dat\uFF0C\u53EF\u80FD\u4E0D\u662F Java \u5B58\u6863");let a=Ne(xe(n.read(t))),i=a.data.Data?a.data.Data.value:a.data,r=n.entries.filter(c=>/(^|\/)region\/r\.-?\d+\.-?\d+\.mca$/.test(c.name)),o=n.entries.filter(c=>/(^|\/)playerdata\/[0-9a-f-]+\.dat$/.test(c.name)),s={name:K(i,"LevelName",""),version:K(i,"Version",null)?K(K(i,"Version",{}),"Name",""):"",seed:K(i,"WorldGenSettings",null)?K(K(i,"WorldGenSettings",{}),"seed",0):K(i,"RandomSeed",0),spawn:[K(i,"SpawnX",0),K(i,"SpawnY",0),K(i,"SpawnZ",0)],time:K(i,"Time",0),dayTime:K(i,"DayTime",0),gameType:K(i,"GameType",0),difficulty:K(i,"Difficulty",0),hardcore:K(i,"hardcore",0),allowCommands:K(i,"allowCommands",0),lastPlayed:K(i,"LastPlayed",0),regions:r.length,players:o.length,data:i,level:a,zip:n};return s.days=Math.floor(s.dayTime/24e3),s}function ht(e,n){let t=e.entries.filter(l=>/(^|\/)region\/r\.-?\d+\.-?\d+\.mca$/.test(l.name)),a=new Map,i=1/0,r=-1/0,o=1/0,s=-1/0,c=0;for(let l of t){let m;try{m=e.read(l)}catch{continue}if(!m||m.length<8192)continue;let d=new DataView(m.buffer,m.byteOffset,m.byteLength);for(let p=0;p<1024;p++){let u=(d.getUint32(p*4)>>>8)*4096;if(!u||u+8>m.length)continue;let b=d.getUint32(u);if(b<5||u+4+b>m.length)continue;let g=d.getUint8(u+4),f=m.subarray(u+5,u+4+b);try{f=g===1?xe(f):g===2?xe(f):f}catch{continue}let _;try{_=Ne(f)}catch{continue}c++;let y=_.data,w=K(y,"Level",null)?K(y,"Level",{}):y,v=K(w,"xPos",0),I=K(w,"zPos",0),B=K(w,"Sections",null)||K(w,"sections",null);if(!B)continue;let S=B.items;for(let C of S){let k=K(C,"Y",0),z=K(C,"block_states",null),$=K(C,"Palette",null)||z&&K(z,"palette",null);if(!$)continue;let j=$.items.map(je=>K(je,"Name","minecraft:air")),M=Math.max(4,Math.ceil(Math.log2(Math.max(2,j.length)))),D=K(C,"BlockStates",null)||z&&K(z,"data",null);if(!D)continue;let R=Math.floor(64/M),ne=(1n<<BigInt(M))-1n;for(let je=0;je<16;je++)for(let yt=0;yt<16;yt++)for(let st=0;st<16;st++){let vt=je*256+yt*16+st,E=Math.floor(vt/R),L=BigInt(vt%R*M),U=D[E],V=typeof U=="bigint"?U:BigInt(Math.trunc(U||0)),Me=Number(V>>L&ne),H=j[Me]||"minecraft:air";if(H.endsWith(":air")||H.includes("cave_air")||H.includes("void_air"))continue;let q=v*16+st,Qe=I*16+yt,Pe=k*16+je,pe=q+","+Qe,ge=a.get(pe);(!ge||Pe>ge.y)&&a.set(pe,{block:H,y:Pe})}}for(let C of[v,v]);i=Math.min(i,v*16),r=Math.max(r,v*16+15),o=Math.min(o,I*16),s=Math.max(s,I*16+15)}n&&n(c)}return{cols:a,minX:i,maxX:r,minZ:o,maxZ:s,chunkSet:new Set,chunks:c,simulated:0}}function O(e){return document.getElementById(e)}function Gt(e){return String(e).replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function Yo(){let e=O("modalBody");e.innerHTML=`<h3>Java \u7248\u5B58\u6863</h3>
    <p class="muted">\u652F\u6301 Java \u5B58\u6863 .zip\uFF08\u542B level.dat + region\uFF09\u3001\u5355\u6587\u4EF6 .mca\u3001.dat\u3001.nbt \u7ED3\u6784\u3002</p>
    <input type="file" id="jvFile" accept=".zip,.mca,.dat,.nbt,*/*" style="margin:6px 0">
    <div id="jvOut" class="muted"></div>
    <div class="modalbtns"><button id="jvClose" class="ghost">\u5173\u95ED</button></div>`,O("modal").style.display="flex";let n=document.querySelector(".modalbox");n&&(n.style.maxWidth="760px",n.style.width="96vw"),O("jvClose").onclick=()=>{n&&(n.style.maxWidth="",n.style.width=""),O("modal").style.display="none"},O("jvFile").onchange=async t=>{let a=t.target.files[0];if(!a)return;let i=O("jvOut");i.innerHTML="\u8BFB\u53D6\u4E2D\u2026";try{let r=new Uint8Array(await a.arrayBuffer());if(/\.nbt$/i.test(a.name))return Wc(r,i);if(/\.mca$/i.test(a.name)){if(r.length<8192)throw new Error("\u4E0D\u662F\u6709\u6548\u7684 .mca\uFF08\u4E0D\u8DB3 8KB \u5934\u90E8\uFF09");let c=ht({entries:[{name:"region/r.0.0.mca"}],read:()=>r},null);i.innerHTML=`<p>\u533A\u5757 ${c.chunks} \u4E2A\uFF0C\u8303\u56F4 X ${c.minX}~${c.maxX}\uFF0CZ ${c.minZ}~${c.maxZ}</p>
          <div class="mapwrap" style="max-height:56vh"><canvas id="jvCanvas"></canvas></div>`,qo(c);return}if(/\.dat$/i.test(a.name)){let c;try{c=Ne(xe(r))}catch{c=Ne(r)}i.innerHTML=`<p class="skbar"><button id="jvTree" class="primary">\u6811\u72B6\u7F16\u8F91</button></p>
          <pre class="code" style="height:40vh;overflow:auto">${Gt(JSON.stringify(ra(c.data),null,2).slice(0,2e4))}</pre>`,O("jvTree").onclick=()=>Xo(c,l=>{let m=mn(Sn(l)),d="\u4FEE\u6539\u540E\u7684.dat";if(window.AndroidBridge&&window.AndroidBridge.saveBinary)di(d,m);else{let p=document.createElement("a");p.href=URL.createObjectURL(new Blob([m])),p.download=d,p.click()}});return}let o=It(r),s=ht(o.zip,null);i.innerHTML=`<div class="grid2">
        <div class="card"><span>\u4E16\u754C\u540D</span><b>${Gt(o.name||"\u672A\u547D\u540D")}</b></div>
        <div class="card"><span>\u7248\u672C</span><b>${Gt(o.version||"\u672A\u77E5")}</b></div>
        <div class="card"><span>\u79CD\u5B50</span><b>${o.seed}</b></div>
        <div class="card"><span>\u51FA\u751F\u70B9</span><b>${o.spawn.join(", ")}</b></div>
        <div class="card"><span>\u6E38\u620F\u5929\u6570</span><b>${o.days}</b></div>
        <div class="card"><span>\u5B58\u6863\u533A\u5757</span><b>${o.regions} \u4E2A region</b></div>
        <div class="card"><span>\u73A9\u5BB6\u6570\u636E</span><b>${o.players} \u4E2A</b></div>
        <div class="card"><span>\u65B9\u5757\u5217</span><b>${s.cols.size}</b></div>
      </div>
      <p class="muted">\u533A\u57DF\u8303\u56F4 X ${s.minX}~${s.maxX}\uFF0CZ ${s.minZ}~${s.maxZ}</p>
      <div class="form2">
        <label>\u4E16\u754C\u540D<input id="jvName" value="${Gt(o.name)}"></label>
        <label>\u79CD\u5B50<input id="jvSeed" value="${o.seed}"></label>
        <label>\u6E38\u620F\u5929\u6570<input id="jvDay" value="${o.days}"></label>
        <label>\u6A21\u5F0F<input id="jvMode" value="${o.gameType}"></label>
        <label>\u51FA\u751F X<input id="jvSx" value="${o.spawn[0]}"></label>
        <label>\u51FA\u751F Y<input id="jvSy" value="${o.spawn[1]}"></label>
        <label>\u51FA\u751F Z<input id="jvSz" value="${o.spawn[2]}"></label>
      </div>
      <div class="skbar"><button id="jvMap" class="primary">\u6E32\u67D3\u5730\u56FE</button><button id="jvPlayers" class="ghost">\u73A9\u5BB6\u5217\u8868</button><button id="jvTree" class="ghost">NBT \u6811\u7F16\u8F91</button><button id="jvSave" class="ghost">\u4FDD\u5B58\u4FEE\u6539\uFF08\u5BFC\u51FA ZIP\uFF09</button></div>
      <div class="mapwrap" style="max-height:46vh"><canvas id="jvCanvas"></canvas></div>`,O("jvMap").onclick=()=>qo(s),O("jvPlayers").onclick=()=>{let c=o.zip.entries.filter(l=>/playerdata\/[0-9a-f-]+\.dat$/.test(l.name));i.insertAdjacentHTML("beforeend",`<p class="muted">${c.length} \u4E2A\u73A9\u5BB6\u6570\u636E\uFF1A${c.map(l=>l.name.split("/").pop()).join("\u3001")||"\u65E0"}</p>`)},O("jvTree").onclick=()=>Xo(o.level,c=>{o.level=c,i.insertAdjacentHTML("beforeend",'<p class="muted">\u5DF2\u4FEE\u6539\u5230\u5185\u5B58\uFF0C\u70B9\u201C\u4FDD\u5B58\u4FEE\u6539\u201D\u5BFC\u51FA ZIP \u751F\u6548</p>')}),O("jvSave").onclick=()=>{let c=o.level.data.Data.value,l=(f,_,y)=>{c[f]?c[f].value=y:c[f]={type:_,value:y}},m=(f,_)=>{let y=Number(O(f).value);return Number.isFinite(y)?y:_};l("LevelName",8,O("jvName").value),c.WorldGenSettings?c.WorldGenSettings.value.seed.value=m("jvSeed",o.seed):l("RandomSeed",4,m("jvSeed",o.seed)),l("DayTime",4,m("jvDay",o.days)*24e3),l("GameType",3,m("jvMode",o.gameType)),l("SpawnX",3,m("jvSx",o.spawn[0])),l("SpawnY",3,m("jvSy",o.spawn[1])),l("SpawnZ",3,m("jvSz",o.spawn[2]));let d=mn(Sn(o.level)),p=o.zip.entries.find(f=>f.name==="level.dat"||f.name.endsWith("/level.dat")).name,u=o.zip.entries.map(f=>({name:f.name,data:f.name===p?d:o.zip.read(f)})),b=Se(u),g="\u4FEE\u6539\u540E\u7684\u5B58\u6863.zip";if(window.AndroidBridge&&window.AndroidBridge.saveBinary)di(g,b);else{let f=document.createElement("a");f.href=URL.createObjectURL(new Blob([b])),f.download=g,f.click()}i.insertAdjacentHTML("beforeend",'<p class="muted">\u5DF2\u5BFC\u51FA\u4FEE\u6539\u540E\u7684\u5B8C\u6574\u5B58\u6863 ZIP\uFF08level.dat \u5DF2\u66FF\u6362\uFF09</p>')}}catch(r){i.innerHTML='<p class="banner" style="display:block">'+Gt(r.message)+"</p>"}}}function qo(e){let n=O("jvCanvas");if(!n||!e.cols.size)return;let t=e.maxX-e.minX+1,a=e.maxZ-e.minZ+1,i=t>1400?1:t>800?2:3;if(t*i>4096||a*i>4096)return;n.width=t*i,n.height=a*i;let r=n.getContext("2d");r.fillStyle="#0b0f15",r.fillRect(0,0,n.width,n.height);for(let[o,s]of e.cols){let[c,l]=o.split(",").map(Number);r.fillStyle=Ge(s.block),r.fillRect((c-e.minX)*i,(l-e.minZ)*i,i,i)}n.style.width=Math.min(n.width,720)+"px",n.style.imageRendering="pixelated"}function ra(e){if(!e||typeof e!="object")return e;if(typeof e=="bigint")return e.toString();if(e instanceof Uint8Array)return"<bytes "+e.length+">";if(Array.isArray(e))return e.map(ra);if("type"in e&&"value"in e)return ra(e.value);let n={};for(let t of Object.keys(e))n[t]=ra(e[t]);return n}function di(e,n){let t="";for(let i=0;i<n.length;i+=32768)t+=String.fromCharCode.apply(null,n.subarray(i,i+32768));window.AndroidBridge.saveBinary(e,btoa(t))}function Wc(e,n){try{let t;try{t=Ne(xe(e))}catch{t=Ne(e)}let a=t.data,i=a.size?a.size.value:null,r=a.palette?a.palette.value.items.map(m=>K(m,"Name","?")):[],s=(a.blocks?a.blocks.value.items:[]).map(m=>({pos:K(m,"pos",[0,0,0]),state:K(m,"state",0)})),c=0;n.innerHTML=`<p>\u7ED3\u6784\u5927\u5C0F\uFF1A${i?i.join(" \xD7 ")+" \u65B9\u5757":"\u672A\u77E5"}\uFF0C\u65B9\u5757 ${s.length} \u4E2A\uFF0C\u72B6\u6001 ${r.length} \u79CD</p>
      <div class="skbar"><button id="st3dL" class="ghost">\u5DE6\u8F6C</button><button id="st3dR" class="ghost">\u53F3\u8F6C</button><button id="st3dTop" class="ghost">\u4FEF\u89C6</button></div>
      <div class="mapwrap" style="max-height:52vh"><canvas id="st3dCanvas"></canvas></div>
      <div class="legend">${Go(r)}</div>
      <p class="muted">\u6309\u9AD8\u5EA6\u5806\u53E0\u6E32\u67D3\uFF0C\u53EF\u5DE6\u53F3\u65CB\u8F6C 90\xB0\uFF1B\u65B9\u5757\u989C\u8272\u53D6\u81EA\u8C03\u8272\u677F\u540D\u79F0\u3002</p>`;let l=()=>ia(O("st3dCanvas"),{size:i,palette:r,blocks:s},c);l(),O("st3dL").onclick=()=>{c=(c+3)%4,l()},O("st3dR").onclick=()=>{c=(c+1)%4,l()},O("st3dTop").onclick=()=>{c=0,l()}}catch(t){n.innerHTML='<p class="banner" style="display:block">'+Gt(t.message)+"</p>"}}var Vc={fabric:{name:"Fabric",build:"fabric-loom"},forge:{name:"Forge",build:"forgegradle"},neoforge:{name:"NeoForge",build:"neoForge"}};function Jc(e){return e.replace(/\./g,"/")}function Qo(){let e=O("modalBody");e.innerHTML=`<h3>Java \u6A21\u7EC4\u5236\u4F5C\u5668</h3>
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
    <p id="jmMsg" class="muted"></p>`,O("modal").style.display="flex";let n=document.querySelector(".modalbox");n&&(n.style.maxWidth="640px",n.style.width="96vw"),O("jmClose").onclick=()=>{n&&(n.style.maxWidth="",n.style.width=""),O("modal").style.display="none"},O("jmGen").onclick=()=>{let t=O("jmName").value.trim()||"MyMod",a=(O("jmId").value.trim()||"mymod").replace(/[^a-z0-9_]/gi,""),i=O("jmPkg").value.trim()||"com.example."+a,r=O("jmLoader").value,o=O("jmMc").value.trim()||"1.21.1",s=O("jmItem").checked,c=O("jmBlock").checked,l=O("jmFood").checked,m=O("jmRecipe").checked,d={};if(r==="fabric")d["build.gradle"]=`plugins { id 'fabric-loom' version '1.7-SNAPSHOT' }
version = '1.0.0'
group = '${i}'
repositories { mavenCentral() }
dependencies { minecraft "com.mojang:minecraft:${o}" mappings "net.fabricmc:yarn:${o}+build.1:v2" modImplementation "net.fabricmc:fabric-loader:0.15.11" modImplementation "net.fabricmc.fabric-api:fabric-api:0.100.0" }
`,d["settings.gradle"]=`pluginManagement { repositories { maven { url 'https://maven.fabricmc.net/' } gradlePluginPortal() } }
`,d["src/main/resources/fabric.mod.json"]=JSON.stringify({schemaVersion:1,id:a,name:t,version:"1.0.0",entrypoints:{main:[i+".MyMod"]},depends:{minecraft:o,"fabric-loader":">=0.15"},description:t},null,2);else{let f=r==="neoforge";d["build.gradle"]=f?`plugins { id 'net.neoforged.gradle.userdev' version '7.0.+' }
version='1.0.0'
group='${i}'
minecraft { version = '${o}' }
dependencies { implementation 'net.neoforged:neoforge:21.1.0' }
`:`buildscript { repositories { maven { url 'https://maven.minecraftforge.net' } } dependencies { classpath 'net.minecraftforge.gradle:ForgeGradle:6.0.+' } }
apply plugin: 'net.minecraftforge.gradle'
minecraft { mappings channel: 'official', version: '${o}' }
dependencies { minecraft 'net.minecraftforge:forge:${o}-47.2.0' }
`;let _=`modLoader="javafml"
loaderVersion="[1,) "license="${a}"
[[mods]]
modId="${a}"
version="1.0.0"
displayName="${t}"
`;d[f?"src/main/resources/META-INF/neoforge.mods.toml":"src/main/resources/META-INF/mods.toml"]=_}let p="src/main/java/"+Jc(i);d[p+"/MyMod.java"]=`package ${i};

import net.minecraft.resources.ResourceLocation;

public class MyMod {
    public static final String MODID = "${a}";
    public static ResourceLocation id(String path) { return ResourceLocation.fromNamespaceAndPath(MODID, path); }
}
`,s&&(d[p+"/ModItems.java"]=`package ${i};

import net.minecraft.world.item.Item;
import net.minecraft.world.item.Rarity;

public final class ModItems {
    public static final Item SAMPLE = new Item(new Item.Properties().stacksTo(64).rarity(Rarity.COMMON));
}
`,d["src/main/resources/assets/"+a+"/lang/en_us.json"]=JSON.stringify({["item."+a+".sample"]:"Sample Item"},null,2),d["src/main/resources/assets/"+a+"/models/item/sample.json"]=JSON.stringify({parent:"item/generated",textures:{layer0:a+":item/sample"}},null,2)),c&&(d[p+"/ModBlocks.java"]=`package ${i};

import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.state.BlockBehaviour;

public final class ModBlocks {
    public static final Block SAMPLE_BLOCK = new Block(BlockBehaviour.Properties.of().strength(2.0f));
}
`),m&&(d["src/main/resources/data/"+a+"/recipe/sample.json"]=JSON.stringify({type:"minecraft:crafting_shapeless",ingredients:[{item:"minecraft:dirt"}],result:{id:a+":sample",count:1}},null,2)),d["README.md"]=`# ${t}

- modid: ${a}
- \u52A0\u8F7D\u5668: ${Vc[r].name}
- MC \u7248\u672C: ${o}

\u6784\u5EFA\uFF1A\u5B89\u88C5 JDK 17+ \u540E\u6267\u884C \`./gradlew build\`\uFF0C\u4EA7\u7269\u5728 \`build/libs\`\u3002
\u672C\u5DE5\u7A0B\u7531 MCBE\u5DE5\u5177\u7BB1 \u751F\u6210\uFF0C\u672A\u5728\u6B64\u73AF\u5883\u7F16\u8BD1\u3002
`;let u={};for(let[f,_]of Object.entries(d))u[f]=new TextEncoder().encode(_);let b=Se(Object.entries(u).map(([f,_])=>({name:f,data:_}))),g=a+"-project.zip";if(window.AndroidBridge&&window.AndroidBridge.saveBinary)di(g,b),O("jmMsg").textContent="\u5DF2\u4FDD\u5B58\u5230 \u4E0B\u8F7D/MCBE\u89E3\u6790/"+g;else{let f=document.createElement("a");f.href=URL.createObjectURL(new Blob([b])),f.download=g,f.click(),O("jmMsg").textContent="\u5DF2\u5BFC\u51FA "+g}}}var Kc={1:"byte",2:"short",3:"int",4:"long",5:"float",6:"double",8:"string"};function Xo(e,n){let t=O("modalBody"),a=document.createElement("div");a.className="nbtroot",t.innerHTML='<h3>NBT \u6811\u7F16\u8F91</h3><p class="muted">\u6539\u503C\u3001\u52A0\u952E\u3001\u5220\u952E\uFF1B\u6570\u7EC4\u53EA\u8BFB\u3002\u4FDD\u5B58\u540E\u5199\u56DE\u6587\u4EF6\u3002</p><div id="nbtHost"></div><div class="skbar"><button id="nbtSave" class="primary">\u4FDD\u5B58</button><button id="nbtClose" class="ghost">\u5173\u95ED</button></div><p id="nbtMsg" class="muted"></p>',r(e.data,0),O("modal").style.display="flex";let i=document.querySelector(".modalbox");i&&(i.style.maxWidth="760px",i.style.width="96vw");function r(c,l){for(let m of Object.keys(c))o(c,m,l)}function o(c,l,m){let d=c[l],p=document.createElement("div");p.className="nbtrow",p.style.marginLeft=m*12+"px";let u=document.createElement("code");if(u.textContent=l,p.appendChild(u),d.type===10){let g=document.createElement("button");g.className="nbtdel",g.textContent="\u5220",g.onclick=()=>{delete c[l],p.remove()},p.appendChild(g),O("nbtHost").appendChild(p),r(d.value,m+1);let f=document.createElement("div");f.className="nbtadd",f.style.marginLeft=(m+1)*12+"px";let _=document.createElement("input");_.placeholder="\u65B0\u952E\u540D";let y=document.createElement("select");for(let[I,B]of Object.entries(Kc))y.innerHTML+=`<option value="${I}">${B}</option>`;let w=document.createElement("input");w.placeholder="\u503C";let v=document.createElement("button");v.textContent="\uFF0B",v.onclick=()=>{let I=_.value.trim();if(!I)return;let B=Number(y.value),S=w.value;B===8?S=String(S):S=Number(S)||0,d.value[I]={type:B,value:S},p.remove(),f.remove(),r(d.value,m+1),s(c,l,m)},f.append(_,y,w,v),O("nbtHost").appendChild(f);return}if(d.type===9){p.appendChild(document.createTextNode(` [list ${d.value.items.length}]`)),O("nbtHost").appendChild(p);return}if(d.type>=7&&d.type<=12){p.appendChild(document.createTextNode(` [${d.value.length??d.value.items?.length??0}]`)),O("nbtHost").appendChild(p);return}let b=document.createElement("input");if(b.value=d.value,b.onchange=()=>{d.value=d.type===8?b.value:Number(b.value)||0},p.appendChild(b),c!==e.data){let g=document.createElement("button");g.className="nbtdel",g.textContent="\u5220",g.onclick=()=>{delete c[l],p.remove()},p.appendChild(g)}O("nbtHost").appendChild(p)}function s(c,l,m){let d=c[l];r(d.value,m+1)}O("nbtClose").onclick=()=>{O("modal").style.display="none"},O("nbtSave").onclick=()=>{n(e),O("nbtMsg").textContent="\u5DF2\u4FDD\u5B58"}}var Gc=(()=>{let e=new Uint32Array(256);for(let n=0;n<256;n++){let t=n;for(let a=0;a<8;a++)t=t&1?2197175160^t>>>1:t>>>1;e[n]=t>>>0}return e})();function qc(e){let n=4294967295;for(let t=0;t<e.length;t++)n=Gc[(n^e[t])&255]^n>>>8;return(n^4294967295)>>>0}function Xc(e){return((e>>>15|e<<17)>>>0)+2726488792>>>0}function Ue(e){let n=[];for(e=Number(e);e>=128;)n.push(e&127|128),e=Math.floor(e/128);return n.push(e),Uint8Array.from(n)}var oa=e=>{let n=0;for(let i of e)n+=i.length;let t=new Uint8Array(n),a=0;for(let i of e)t.set(i,a),a+=i.length;return t};function es(e){let a=[],i=0;for(let r of e){let o=0;for(;o<r.length;){let s=32768-i;s<7&&(a.push(new Uint8Array(s)),i=0,s=32768);let c=Math.min(s-7,r.length-o),l=o===0&&c===r.length?1:o===0?2:o+c===r.length?4:3,m=r.subarray(o,o+c),d=Xc(qc(oa([Uint8Array.from([l]),m]))),p=new Uint8Array(7),u=new DataView(p.buffer);u.setUint32(0,d,!0),u.setUint16(4,c,!0),u.setUint8(6,l),a.push(p,m),o+=c,i+=7+c}}return oa(a)}function Yc(e,n){let t=[new Uint8Array(8),new Uint8Array(4)];new DataView(t[0].buffer).setUint32(0,n>>>0,!0),n>=2**32&&new DataView(t[0].buffer).setUint32(4,Math.floor(n/2**32),!0),new DataView(t[1].buffer).setUint32(0,e.length,!0);let a=[t[0],t[1]];for(let i of e){let r=typeof i.key=="string"?new TextEncoder().encode(i.key):i.key,o=typeof i.value=="string"?new TextEncoder().encode(i.value):i.value;a.push(Uint8Array.from([1]),Ue(r.length),r,Ue(o.length),o)}return oa(a)}function Qc(e,n,t,a){let i=[],r=new TextEncoder().encode(e);return i.push(Ue(1),Ue(r.length),r),i.push(Ue(2),Ue(n)),i.push(Ue(9),Ue(0)),i.push(Ue(3),Ue(t)),i.push(Ue(4),Ue(a)),oa(i)}function ui(e,{comparator:n="leveldb.BytewiseComparator",chunk:t=2e3}={}){if(!e.length)throw new Error("\u6CA1\u6709\u53EF\u5199\u5165\u7684\u952E\u503C");let a=[],i=0;for(let l=0;l<e.length;l+=t){let m=e.slice(l,l+t);i+=m.length,a.push(Yc(m,i))}let r=2,o=3,s="MANIFEST-000001",c=String(r).padStart(6,"0")+".log";return{[s]:es([Qc(n,r,o,i)]),[c]:es(a),CURRENT:new TextEncoder().encode(s+`
`),logName:c}}var em=/(^|\/)(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/;function tm(e){return e.paths().filter(n=>em.test(n))}async function ts(e){let n=tm(e);if(!n.length)throw new Error("\u8FD9\u4E2A\u5305\u91CC\u6CA1\u6709 LevelDB \u6570\u636E\u5E93");let t=n.map(i=>{let r=e.getBytes(i);return{name:i.split("/").pop(),arrayBuffer:async()=>r}});return{db:await Jn(t,{}),paths:n}}var pi={"minecraft:grass_block":"minecraft:grass_block","minecraft:grass_path":"minecraft:dirt_path","minecraft:stone":"minecraft:stone","minecraft:cobblestone":"minecraft:cobblestone","minecraft:dirt":"minecraft:dirt","minecraft:sand":"minecraft:sand","minecraft:sandstone":"minecraft:sandstone","minecraft:gravel":"minecraft:gravel","minecraft:water":"minecraft:water","minecraft:flowing_water":"minecraft:water","minecraft:lava":"minecraft:lava","minecraft:flowing_lava":"minecraft:lava","minecraft:bedrock":"minecraft:bedrock","minecraft:snow":"minecraft:snow_block","minecraft:snow_layer":"minecraft:snow","minecraft:ice":"minecraft:ice","minecraft:packed_ice":"minecraft:packed_ice","minecraft:clay":"minecraft:clay","minecraft:log":"minecraft:oak_log","minecraft:log2":"minecraft:birch_log","minecraft:leaves":"minecraft:oak_leaves","minecraft:leaves2":"minecraft:birch_leaves","minecraft:planks":"minecraft:oak_planks","minecraft:stonebrick":"minecraft:stone_bricks","minecraft:stone_stairs":"minecraft:stone_brick_stairs","minecraft:wooden_slab":"minecraft:oak_slab","minecraft:double_wooden_slab":"minecraft:oak_planks","minecraft:tallgrass":"minecraft:short_grass","minecraft:short_grass":"minecraft:short_grass","minecraft:yellow_flower":"minecraft:dandelion","minecraft:red_flower":"minecraft:poppy","minecraft:mob_spawner":"minecraft:spawner","minecraft:monster_egg":"minecraft:infested_stone","minecraft:quartz_block":"minecraft:quartz_block","minecraft:hardened_clay":"minecraft:terracotta","minecraft:stained_hardened_clay":"minecraft:white_terracotta","minecraft:iron_ore":"minecraft:iron_ore","minecraft:gold_ore":"minecraft:gold_ore","minecraft:diamond_ore":"minecraft:diamond_ore","minecraft:redstone_ore":"minecraft:redstone_ore","minecraft:lit_redstone_ore":"minecraft:redstone_ore","minecraft:emerald_ore":"minecraft:emerald_ore","minecraft:coal_ore":"minecraft:coal_ore","minecraft:lapis_ore":"minecraft:lapis_ore","minecraft:copper_ore":"minecraft:copper_ore","minecraft:deepslate":"minecraft:deepslate","minecraft:tuff":"minecraft:tuff","minecraft:dripstone_block":"minecraft:dripstone_block","minecraft:moss_block":"minecraft:moss_block","minecraft:netherrack":"minecraft:netherrack","minecraft:soul_sand":"minecraft:soul_sand","minecraft:magma":"minecraft:magma_block","minecraft:glowstone":"minecraft:glowstone","minecraft:end_stone":"minecraft:end_stone","minecraft:obsidian":"minecraft:obsidian","minecraft:mycelium":"minecraft:mycelium","minecraft:podzol":"minecraft:podzol","minecraft:red_sand":"minecraft:red_sand","minecraft:red_sandstone":"minecraft:red_sandstone"},nm=(()=>{let e={};for(let[n,t]of Object.entries(pi))e[t]||(e[t]=n);return e})();function am(e,n){let t=String(e||"");return n[t]||n[t.replace("minecraft:","minecraft:")]||t}function im(e){return{paths:()=>e.entries.map(n=>n.name),getBytes:n=>{let t=e.entries.find(a=>a.name===n);if(!t)throw new Error("\u7F3A\u5C11 "+n);return e.read(t)}}}function rm(e,n,t,a=12){let i=new Map,r=1/0,o=-1/0;for(let s=0;s<16;s++)for(let c=0;c<16;c++){let l=e.get(n*16+s+","+(t*16+c));if(!l)continue;r=Math.min(r,l.y),o=Math.max(o,l.y);let m=Math.max(-64,l.y-a);for(let d=m;d<=l.y;d++){let p=d+"|"+s+"|"+c;i.set(p,d===l.y?l.block:d<l.y-3?"minecraft:stone":"minecraft:dirt")}}return{yy:i,minY:Math.max(-64,r-a),maxY:o}}function om(e,n,t){let a=new Map,i=[];for(let[o,s]of t){let[c,l,m]=o.split("|").map(Number),d=Math.floor(c/16);a.has(d)||(a.set(d,[]),i.push(d)),a.get(d).push({y:c,x:l,z:m,name:s})}if(!i.length)return null;let r=i.sort((o,s)=>o-s).map(o=>{let s=a.get(o),c=["minecraft:air"],l={};for(let b of s)b.name in l||(l[b.name]=c.length,c.push(b.name));let m=Math.max(4,Math.ceil(Math.log2(Math.max(2,c.length)))),d=Math.floor(64/m),p=new Array(Math.ceil(4096/d)).fill(0n),u=(BigInt(1)<<BigInt(m))-1n;for(let b of s){let g=(b.y-o*16)*256+b.z*16+b.x,f=Math.floor(g/d),_=BigInt(g%d*m),y=BigInt(l[b.name]);p[f]=p[f]&~(u<<_)|y<<_}return{Y:{type:1,value:o},Palette:{type:9,value:{listType:10,items:c.map(b=>({Name:{type:8,value:b}}))}},BlockStates:{type:12,value:p}}});return{rootType:10,rootName:"",data:{DataVersion:{type:3,value:2586},Level:{type:10,value:{xPos:{type:3,value:e},zPos:{type:3,value:n},Status:{type:8,value:"full"},LastUpdate:{type:4,value:0},Sections:{type:9,value:{listType:10,items:r}}}}}}}function sm(e){let n=new Map;for(let[i,r]of e){let[o,s]=i.split(",").map(Number),c=Math.floor(o/16),l=Math.floor(s/16);n.has(c+","+l)||n.set(c+","+l,new Set),n.get(c+","+l).add(i)}let t={},a=new Map;for(let[i]of n){let[r,o]=i.split(",").map(Number),s=Math.floor(r/32),c=Math.floor(o/32),l=s+","+c;a.has(l)||a.set(l,[]);let m=rm(e,r,o);if(!m.yy.size)continue;let d=om(r,o,m.yy);d&&a.get(l).push({cx:r,cz:o,nbt:d})}for(let[i,r]of a)t[`region/r.${i.replace(",",".")}.mca`]=lm(r);return t}function lm(e){let n=new Uint8Array(8192),t=new DataView(n.buffer),a=[],i=2;for(let s of e){let c=Sn(s.nbt),l=Wn(c),m=new Uint8Array(5+l.length);new DataView(m.buffer).setUint32(0,l.length+1),m[4]=2,m.set(l,5);let d=Math.ceil(m.length/4096),p=(s.cx&31)+(s.cz&31)*32;t.setUint32(p*4,(i<<8|d&255)>>>0),t.setUint32(4096+p*4,Math.floor(Date.now()/1e3));let u=new Uint8Array(d*4096);u.set(m,0),a.push({sector:i,data:u}),i+=d}let r=8192;for(let s of a)r=Math.max(r,s.sector*4096+s.data.length);let o=new Uint8Array(r);o.set(n,0);for(let s of a)o.set(s.data,s.sector*4096);return o}function cm(e){let n={},t=(a,i,r)=>{n[a]={type:i,value:r}};return t("LevelName",8,e.name||"\u8F6C\u6362\u4E16\u754C"),t("Version",10,{Name:{type:8,value:"1.16.5"},Id:{type:3,value:2586},Snapshot:{type:1,value:0}}),t("SpawnX",3,e.spawn[0]),t("SpawnY",3,e.spawn[1]),t("SpawnZ",3,e.spawn[2]),t("Time",4,0),t("DayTime",4,0),t("GameType",3,1),t("Difficulty",1,2),t("hardcore",1,0),t("allowCommands",1,1),t("WorldGenSettings",10,{seed:{type:4,value:e.seed||0},generate_features:{type:1,value:0},bonus_chest:{type:1,value:0}}),mn(Sn({rootType:10,rootName:"",data:{Data:{type:10,value:n}}}))}async function mm(e,n=()=>{}){let t=se(e),a=im(t);n("\u8BFB\u53D6\u57FA\u5CA9\u7248 LevelDB\u2026");let{db:i}=await ts(a);n("\u89E3\u6790\u533A\u5757\u5730\u5F62\u2026");let r=await aa(i,{});if(!r.cols.size)throw new Error("\u6CA1\u6709\u89E3\u6790\u5230\u4EFB\u4F55\u533A\u5757\uFF0C\u65E0\u6CD5\u8F6C\u6362");n(`\u89E3\u6790\u5230 ${r.chunks} \u4E2A\u533A\u5757 / ${r.cols.size} \u5217\uFF0C\u5F00\u59CB\u751F\u6210 Java \u533A\u5757\u2026`);let o={},s=sm(r.cols);for(let[p,u]of Object.entries(s))o[p]=u;let c=Math.round((r.minX+r.maxX)/2),l=Math.round((r.minZ+r.maxZ)/2),m=64,d=r.cols.get(c+","+l);return d&&(m=d.y+1),o["level.dat"]=cm({name:"\u4ECE\u57FA\u5CA9\u7248\u8F6C\u6362",spawn:[c,m,l]}),o["levelname.txt"]=new TextEncoder().encode("\u4ECE\u57FA\u5CA9\u7248\u8F6C\u6362"),n("\u6253\u5305 Java \u5B58\u6863 ZIP\u2026"),Se(Object.entries(o).map(([p,u])=>({name:p,data:u})))}function dm(e,n){let t=e.length<=16?4:e.length<=256?8:16,a=Math.floor(32/t)*8/8,i=Math.floor(32/t),r=Math.ceil(4096/i),o=new Uint32Array(r),s=(1<<t)-1;for(let u=0;u<4096;u++){let b=Math.floor(u/i),g=u%i*t;o[b]|=(n[u]&s)<<g}let c=new TextEncoder,l=[];for(let u of e){let b=he({root:{type:10,name:"",value:{name:{t:8,v:u},states:{t:10,v:{}},version:{t:3,v:17959425}}}},!0);l.push(b)}let m=new Uint8Array(10+r*4+4+l.reduce((u,b)=>u+b.length,0)),d=0;m[d++]=8,m[d++]=1,m[d++]=t<<1|0,new Uint8Array(m.buffer).set(new Uint8Array(o.buffer),d),d+=r*4,new DataView(m.buffer).setInt32(d,e.length,!0),d+=4;for(let u of l)m.set(u,d),d+=u.length;return m}function um(e){let n={LevelName:{t:8,v:e.name},GameType:{t:3,v:1},Difficulty:{t:3,v:2},SpawnX:{t:3,v:e.spawn[0]},SpawnY:{t:3,v:e.spawn[1]},SpawnZ:{t:3,v:e.spawn[2]},Time:{t:4,v:0n},LastPlayed:{t:4,v:BigInt(Date.now())},StorageVersion:{t:3,v:10},generator:{t:3,v:0},Inventory:{t:9,et:10,v:[]}},t=he({root:{type:10,name:"",value:n}},!0),a=new Uint8Array(8+t.length),i=new DataView(a.buffer);return i.setInt32(0,10,!0),i.setInt32(4,t.length,!0),a.set(t,8),a}function pm(e,n=()=>{}){let t=It(e);n("\u89E3\u6790 Java \u533A\u5757\u2026");let a=ht(t.zip,null);if(!a.cols.size)throw new Error("Java \u5B58\u6863\u91CC\u6CA1\u6709\u89E3\u6790\u5230\u533A\u5757");n(`\u89E3\u6790\u5230 ${a.chunks} \u4E2A\u533A\u5757 / ${a.cols.size} \u5217\uFF0C\u751F\u6210\u57FA\u5CA9\u7248\u5B50\u533A\u5757\u2026`);let i=[],r=new Map;for(let[u,b]of a.cols){let[g,f]=u.split(",").map(Number),_=Math.floor(g/16),y=Math.floor(f/16),w=_+","+y;r.has(w)||r.set(w,{cx:_,cz:y,cols:new Map,maxY:64});let v=r.get(w);v.cols.set((g%16+16)%16+","+(f%16+16)%16,b),b.y>v.maxY&&(v.maxY=b.y)}let o=0;for(let{cx:u,cz:b,cols:g,maxY:f}of r.values()){let _=new Map;for(let y=0;y<16;y++)for(let w=0;w<16;w++){let v=g.get(y+","+w),I=v?v.y:f,B=v?am(v.block,nm):"minecraft:stone",S=Math.max(-64,Math.min(319,I)-12);for(let C=S;C<=I;C++){let k=Math.floor(C/16);_.has(k)||_.set(k,[]),_.get(k).push({i:(C%16+16)%16+16*(w+16*y),name:C===I?B:"minecraft:stone"})}}for(let[y,w]of _){let v=["minecraft:air"],I={"minecraft:air":0},B=new Uint16Array(4096);for(let z of w)z.name in I||(I[z.name]=v.length,v.push(z.name)),B[z.i]=I[z.name];let S=dm(v,B),C=new Uint8Array(10),k=new DataView(C.buffer);k.setInt32(0,u,!0),k.setInt32(4,b,!0),C[8]=47,C[9]=y&255,i.push({key:C,value:S}),o++}}let s=ui(i),c={};for(let[u,b]of Object.entries(s))/^(CURRENT|MANIFEST-[0-9]+|[0-9]+\.log)$/.test(u)&&(c["db/"+u]=b);let l=Math.round((a.minX+a.maxX)/2),m=Math.round((a.minZ+a.maxZ)/2),d=64,p=a.cols.get(l+","+m);return p&&(d=p.y+1),c["level.dat"]=um({name:t.name||"\u4ECEJava\u8F6C\u6362",spawn:[l,d,m]}),c["levelname.txt"]=new TextEncoder().encode(t.name||"\u4ECEJava\u8F6C\u6362"),n(`\u5199\u5165 ${o} \u4E2A\u5B50\u533A\u5757`),Se(Object.entries(c).map(([u,b])=>({name:u,data:b})))}function _t(e){return document.getElementById(e)}function ns(){let e=_t("modalBody");e.innerHTML=`<h3>\u5B58\u6863\u8F6C\u6362</h3>
    <p class="muted">\u53CC\u65B9\u5411\u5730\u5F62\u5C42\u8F6C\u6362\uFF0C\u4E0D\u9700\u8981\u5B89\u88C5\u4EFB\u4F55\u6A21\u7EC4/\u7B2C\u4E09\u65B9\u8F6C\u6362\u5668\u3002\u5B9E\u4F53\u3001\u5BB9\u5668\u3001\u7EA2\u77F3\u72B6\u6001\u4E0D\u8FC1\u79FB\u3002</p>
    <div class="skbar">
      <button id="cvB2J" class="primary">\u57FA\u5CA9\u7248 \u2192 Java</button>
      <button id="cvJ2B" class="primary">Java \u2192 \u57FA\u5CA9\u7248</button>
      <button id="cvClose" class="ghost">\u5173\u95ED</button>
    </div>
    <p class="muted">\u57FA\u5CA9\u7248\uFF1A.mcworld / .mctemplate\uFF1BJava\uFF1A.zip</p>
    <input type="file" id="cvFile" style="display:none">
    <div id="cvLog" class="logbox" style="max-height:34vh;overflow:auto"></div>`,_t("modal").style.display="flex";let n=document.querySelector(".modalbox");n&&(n.style.maxWidth="700px",n.style.width="96vw"),_t("cvClose").onclick=()=>{n&&(n.style.maxWidth="",n.style.width=""),_t("modal").style.display="none"};let t=o=>{let s=_t("cvLog");s&&(s.textContent+=o+`
`),s.scrollTop=s.scrollHeight},a="",i=o=>new Promise((s,c)=>{let l=_t("cvFile");l.value="",l.accept=o==="b2j"?".mcworld,.mctemplate,.zip":".zip",l.onchange=()=>{let m=l.files[0];if(!m)return c(new Error("\u672A\u9009\u62E9\u6587\u4EF6"));m.arrayBuffer().then(d=>s(new Uint8Array(d))).catch(c)},l.click()}),r=(o,s)=>{if(window.AndroidBridge&&window.AndroidBridge.saveBinary){let c="";for(let l=0;l<s.length;l++)c+=String.fromCharCode(s[l]);window.AndroidBridge.saveBinary(o,btoa(c))}else{let c=document.createElement("a");c.href=URL.createObjectURL(new Blob([s])),c.download=o,c.click()}};_t("cvB2J").onclick=async()=>{try{let o=await i("b2j");t("\u5F00\u59CB\uFF1A\u57FA\u5CA9\u7248 \u2192 Java");let s=await mm(o,t);r("\u8F6C\u6362-Java\u7248.zip",s),t("\u5B8C\u6210\uFF1A\u5DF2\u5BFC\u51FA \u8F6C\u6362-Java\u7248.zip")}catch(o){t("\u5931\u8D25\uFF1A"+o.message)}},_t("cvJ2B").onclick=async()=>{try{let o=await i("j2b");t("\u5F00\u59CB\uFF1AJava \u2192 \u57FA\u5CA9\u7248");let s=pm(o,t);r("\u8F6C\u6362-\u57FA\u5CA9\u7248.mcworld",s),t("\u5B8C\u6210\uFF1A\u5DF2\u5BFC\u51FA \u8F6C\u6362-\u57FA\u5CA9\u7248.mcworld")}catch(o){t("\u5931\u8D25\uFF1A"+o.message)}}}function bt(e){return document.getElementById(e)}function Oe(e){return new TextEncoder().encode(e)}var Ce=e=>JSON.stringify(e,null,2);function zt(e,n){try{return JSON.parse(new TextDecoder().decode(e.read(n)))}catch{return null}}function hi(e){return e.split("/").pop()}function qt(e){return hi(e).replace(/\.(json|png|lang|mcmeta)$/i,"")}function fm(e){let n={};for(let t of e.split(/\r?\n/)){let a=t.match(/^([^=#]+)=(.*)$/);a&&(n[a[1].trim()]=a[2])}return n}function hm(e){let n=e.entries.filter(s=>/manifest\.json$/.test(s.name)).map(s=>zt(e,s)).filter(Boolean),t={};for(let s of e.entries)if(/texts\/([a-zA-Z_]+)\.lang$/.test(s.name)||/\.lang$/.test(s.name)){let c=qt(s.name);t[c]=fm(new TextDecoder().decode(e.read(s)))}let a=[];for(let s of e.entries){if(!/\/items\/.*\.json$/.test(s.name)||s.name.includes("/textures/"))continue;let c=zt(e,s),l=c&&c["minecraft:item"];if(!l)continue;let m=l.description||{},d=m.identifier;if(!d)continue;let p=l.components||{},u=p["minecraft:icon"];u&&typeof u=="object"&&(u=Array.isArray(u.textures)?u.textures[0]:u.texture||u.textures||""),a.push({id:d,file:s.name,icon:String(u||d.split(":")[1]),comps:p,menu:m.menu_category||""})}let i=[];for(let s of e.entries){if(!/\/blocks\/.*\.json$/.test(s.name))continue;let c=zt(e,s),l=c&&c["minecraft:block"];if(!l)continue;let m=(l.description||{}).identifier;if(!m)continue;let d=l.components||{},p="",u=d["minecraft:material_instances"];if(u){let b=u["*"]||Object.values(u)[0];b&&(p=b.texture||"")}i.push({id:m,file:s.name,comps:d,tex:p||m.split(":")[1]})}let r=[];for(let s of e.entries){if(!/recipes\/.*\.json$/.test(s.name))continue;let c=zt(e,s);if(!c)continue;let l=Object.keys(c).find(m=>m.startsWith("minecraft:recipe_"));l&&r.push({type:l,data:c[l],file:s.name})}let o=e.entries.filter(s=>/\.png$/.test(s.name)).map(s=>({name:s.name,data:e.read(s)}));return{manifests:n,texts:t,items:a,blocks:i,recipes:r,pngs:o}}function as(e,n){let t=String(n||"").toLowerCase();return e.find(i=>hi(i.name).toLowerCase()===t+".png")||e.find(i=>hi(i.name).toLowerCase().includes(t.split(":").pop()))||e.find(i=>/items\/|blocks\//.test(i.name))||null}function _m(e,n){let t=n.includes(":")?n.split(":")[1]:n;for(let a of Object.keys(e)){let i=e[a];for(let r of[`item.${n}`,`item.${n}.name`,`item.${t}`,`item.${t}.name`,`tile.${t}.name`])if(i[r])return i[r]}return t.replace(/_/g," ").replace(/\b\w/g,a=>a.toUpperCase())}function bm(e,n){let t=e.data||{},a=r=>typeof r=="string"?r:r&&(r.item||r.name)||"",i=r=>{let o=a(r);return{item:o.includes(":")?o:"minecraft:"+o}};if(e.type==="minecraft:recipe_shaped"){let r=(t.pattern||[]).map(s=>s.map(c=>c===" "?" ":c)),o={};for(let[s,c]of Object.entries(t.key||{}))o[s]=i(c);return{type:"minecraft:crafting_shaped",pattern:r,key:o,result:fi(t.result,n)}}return e.type==="minecraft:recipe_shapeless"?{type:"minecraft:crafting_shapeless",ingredients:(t.ingredients||[]).map(i),result:fi(t.result,n)}:e.type==="minecraft:recipe_furnace"?{type:"minecraft:smelting",ingredient:i(t.input),result:fi(t.result,n),cookingtime:200,experience:.1}:null}function fi(e,n){Array.isArray(e)&&(e=e[0]||{});let t=e.item||e.name||"";return t.includes(":")||(t="minecraft:"+t),{item:t,count:e.count||1}}function is(e,n,t,a){let i=s=>s.replace(/[^a-zA-Z0-9_]/g,"_").replace(/_+/g,"_").replace(/^_|_$/g,"")||"Entry",r=new Set,o=[];if(o.push(`package ${e};

import net.minecraft.resources.ResourceLocation;

public final class ${n.replace(/[^a-zA-Z0-9]/g,"")}Mod {
    public static final String MODID = "${n}";
    public static ResourceLocation id(String path) { return ResourceLocation.fromNamespaceAndPath(MODID, path); }
}
`),t.length){let s=t.map(c=>{let l=i(c.id.split(":")[1]);for(;r.has(l);)l+="_";return r.add(l),`    // ${c.id}
    public static final net.minecraft.world.item.Item ${l.toUpperCase()} = new net.minecraft.world.item.Item(new net.minecraft.world.item.Item.Properties());`});o.push(`package ${e};

public final class ModItems {
${s.join(`
`)}
}
`)}if(a.length){let s=a.map(c=>{let l=i(c.id.split(":")[1]);for(;r.has(l);)l+="_";return r.add(l),`    // ${c.id}
    public static final net.minecraft.world.level.block.Block ${l.toUpperCase()} = new net.minecraft.world.level.block.Block(net.minecraft.world.level.block.state.BlockBehaviour.Properties.of());`});o.push(`package ${e};

public final class ModBlocks {
${s.join(`
`)}
}
`)}return o.join(`
`)}function gm(e,n,t,a="1.21.1"){return{"build.gradle":`plugins { id 'fabric-loom' version '1.7-SNAPSHOT' }
version = '1.0.0'
group = '${t}'
repositories { mavenCentral() }
dependencies { minecraft "com.mojang:minecraft:${a}" mappings "net.fabricmc:yarn:${a}+build.1:v2" modImplementation "net.fabricmc:fabric-loader:0.15.11" modImplementation "net.fabricmc.fabric-api:fabric-api:0.100.0" }
`,"settings.gradle":`pluginManagement { repositories { maven { url 'https://maven.fabricmc.net/' } gradlePluginPortal() } }
`,"src/main/resources/fabric.mod.json":Ce({schemaVersion:1,id:n,name:e,version:"1.0.0",entrypoints:{main:[t+".MyMod"]},depends:{minecraft:a,"fabric-loader":">=0.15"},description:"\u7531\u57FA\u5CA9\u7248\u9644\u52A0\u5305\u8F6C\u6362"}),"README.md":`# ${e}

\u7531 MC\u5DE5\u5177\u7BB1 \u4ECE\u57FA\u5CA9\u7248\u9644\u52A0\u5305\u9759\u6001\u8F6C\u6362\u751F\u6210\u3002

\u5DF2\u8F6C\u6362\uFF1A\u7269\u54C1/\u65B9\u5757\u6CE8\u518C\u5360\u4F4D\u7C7B\u3001\u8D34\u56FE\u3001\u8BED\u8A00\u3001\u7269\u54C1\u6A21\u578B\u3001\u5408\u6210\u914D\u65B9\u3002
\u672A\u8F6C\u6362\uFF1A\u884C\u4E3A\u5305\u811A\u672C(JS)\u3001\u5B9E\u4F53 AI\u3001\u65B9\u5757\u81EA\u5B9A\u4E49\u7EC4\u4EF6\u903B\u8F91\u3001\u4E8B\u4EF6\u3001UI\u3002
`}}function ym(e,n=()=>{}){let t=se(e);n("\u8BFB\u53D6\u9644\u52A0\u5305\u2026");let a=hm(t);if(!a.items.length&&!a.blocks.length)throw new Error("\u6CA1\u6709\u627E\u5230\u53EF\u8F6C\u6362\u7684\u7269\u54C1/\u65B9\u5757 JSON");let o=((a.manifests[0]||{}).header||{}).name||"ConvertedAddon",s=String(o).toLowerCase().replace(/[^a-z0-9_]/g,"_").slice(0,24)||"converted",c="com.example."+s,l=gm(o,s,c),m="src/main/java/"+c.replace(/\./g,"/");l[m+"/MyMod.java"]=`package ${c};

import net.minecraft.resources.ResourceLocation;

public class MyMod {
    public static final String MODID = "${s}";
    public static ResourceLocation id(String path) { return ResourceLocation.fromNamespaceAndPath(MODID, path); }
}
`,l[m+"/ModItems.java"]=is(c,s,a.items,[]).split(`

`).slice(1).join(`

`)||"",a.blocks.length&&(l[m+"/ModBlocks.java"]=is(c,s,[],a.blocks).split(`

`).slice(1).join(`

`)||"");let d={};for(let u of a.items){let b=_m(a.texts,u.id);d.en_us=d.en_us||{},d.en_us["item."+s+"."+u.id.split(":")[1]]=b;let g=as(a.pngs,u.icon),f=u.id.split(":")[1];g&&(l[`src/main/resources/assets/${s}/textures/item/${f}.png`]=g.data),l[`src/main/resources/assets/${s}/models/item/${u.id.split(":")[1]}.json`]=Ce({parent:"item/generated",textures:{layer0:`${s}:item/${u.id.split(":")[1]}`}})}for(let u of a.blocks){let b=as(a.pngs,u.tex),g=u.id.split(":")[1];b&&(l[`src/main/resources/assets/${s}/textures/block/${g}.png`]=b.data),l[`src/main/resources/assets/${s}/blockstates/${u.id.split(":")[1]}.json`]=Ce({variants:{"":{model:`${s}:block/${u.id.split(":")[1]}`}}}),l[`src/main/resources/assets/${s}/models/block/${u.id.split(":")[1]}.json`]=Ce({parent:"block/cube_all",textures:{all:`${s}:block/${u.id.split(":")[1]}`}}),d.en_us["block."+s+"."+u.id.split(":")[1]]=u.id.split(":")[1].replace(/_/g," ")}for(let[u,b]of Object.entries(d))l[`src/main/resources/assets/${s}/lang/${u}.json`]=Ce(b);let p=0;return a.recipes.forEach((u,b)=>{let g=bm(u,s);g&&(l[`src/main/resources/data/${s}/recipe/converted_${b+1}.json`]=Ce(g),p++)}),l[m+"/MyMod.java"]=l[m+"/MyMod.java"].replace("// register",""),n(`\u7269\u54C1 ${a.items.length}\uFF0C\u65B9\u5757 ${a.blocks.length}\uFF0C\u914D\u65B9 ${p}\uFF0C\u8D34\u56FE ${a.pngs.length}`),Se(Object.entries(l).filter(([,u])=>u!==void 0&&u!=="").map(([u,b])=>({name:u,data:typeof b=="string"?Oe(b):b})))}function vm(e,n=()=>{}){let t=se(e);n("\u8BFB\u53D6 Java \u6A21\u7EC4\u2026");let a="",i="",r="1.0.0",o=t.entries.find($=>$.name.endsWith("fabric.mod.json"));if(o){let $=zt(t,o)||{};a=$.id||"",i=$.name||a,r=String($.version||"1.0.0")}if(!a){let $=t.entries.find(j=>/mods\.toml$|neoforge\.mods\.toml$/.test(j.name));if($){let j=new TextDecoder().decode(t.read($)),M=j.match(/modId\s*=\s*"([^"]+)"/),D=j.match(/displayName\s*=\s*"([^"]+)"/);M&&(a=M[1]),D&&(i=D[1])}}let s=t.entries.find($=>/META-INF\/MANIFEST\.MF$/.test($.name));a||(a=qt(t.entries[0].name)||"converted");let c=a||"converted",l=t.entries.filter($=>/assets\/.*\/textures\/(item|block|blocks|items)\/[^/]+\.png$/.test($.name)),m=l.filter($=>/textures\/(item|items)\//.test($.name)),d=l.filter($=>/textures\/(block|blocks)\//.test($.name)),p=t.entries.filter($=>/assets\/.*\/lang\/(en_us|zh_cn)\.json$/.test($.name)),u=t.entries.filter($=>/data\/.*\/recipe(s)?\/[^/]+\.json$/.test($.name)),b=t.entries.filter($=>/assets\/.*\/models\/item\/[^/]+\.json$/.test($.name));if(n(`\u8D34\u56FE ${l.length}\uFF08\u7269\u54C1 ${m.length} / \u65B9\u5757 ${d.length}\uFF09\uFF0C\u8BED\u8A00 ${p.length}\uFF0C\u914D\u65B9 ${u.length}`),!m.length&&!d.length)throw new Error("\u6A21\u7EC4\u91CC\u6CA1\u6709\u53EF\u63D0\u53D6\u7684\u8D34\u56FE\uFF0C\u65E0\u6CD5\u751F\u6210\u9644\u52A0\u5305");let g=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,$=>{let j=Math.random()*16|0;return($==="x"?j:j&3|8).toString(16)}),f=g(),_=g(),y={format_version:2,header:{name:`${i} BP`,description:"\u7531 Java \u6A21\u7EC4\u8F6C\u6362",uuid:f,version:[1,0,0],min_engine_version:[1,20,10]},modules:[{type:"data",uuid:g(),version:[1,0,0]}]},w={format_version:2,header:{name:`${i} RP`,description:"\u7531 Java \u6A21\u7EC4\u8F6C\u6362",uuid:_,version:[1,0,0],min_engine_version:[1,20,10]},modules:[{type:"resources",uuid:g(),version:[1,0,0]}],dependencies:[{uuid:f,version:[1,0,0]}]},v={"behavior_pack/manifest.json":Oe(Ce(y)),"resource_pack/manifest.json":Oe(Ce(w))},I={resource_pack_name:i,texture_name:"atlas.items",texture_data:{}};for(let $ of m){let j=qt($.name),M=j,D=2;for(;I.texture_data[M];)M=j+"_"+D++;v[`resource_pack/textures/items/${M}.png`]=t.read($),I.texture_data[M]={textures:`textures/items/${M}`},v[`behavior_pack/items/${M}.json`]=Oe(Ce({format_version:"1.20.10","minecraft:item":{description:{identifier:`${c}:${M}`,menu_category:{category:"items",group:"itemGroup.name.item"}},components:{"minecraft:icon":{texture:M},"minecraft:max_stack_size":64}}}))}v["resource_pack/textures/item_texture.json"]=Oe(Ce(I));let B={resource_pack_name:i,texture_name:"atlas.terrain",padding:8,num_mip_levels:4,texture_data:{}},S={format_version:[1,1,0]};for(let $ of d){let j=qt($.name);v[`resource_pack/textures/blocks/${j}.png`]=t.read($),B.texture_data[j]={textures:`textures/blocks/${j}`},S[j]={textures:j,sound:"stone"},v[`behavior_pack/blocks/${j}.json`]=Oe(Ce({format_version:"1.20.10","minecraft:block":{description:{identifier:`${c}:${j}`},components:{"minecraft:material_instances":{"*":{texture:j,render_method:"opaque"}},"minecraft:destructible_by_mining":{seconds_to_destroy:1},"minecraft:geometry":"minecraft:geometry.full_block"}}}))}d.length&&(v["resource_pack/textures/terrain_texture.json"]=Oe(Ce(B)),v["resource_pack/blocks.json"]=Oe(Ce(S)));let C={},k=new Set;for(let $ of p){let j=zt(t,$)||{};for(let[M,D]of Object.entries(j)){let R=M;if(M.startsWith("item.")){let ne=M.slice(5);R=`item.${ne.includes(":")?ne:c+":"+ne}`}else if(M.startsWith("block.")){let ne=M.slice(6);R=`tile.${ne.includes(":")?ne:c+":"+ne}.name`}k.has(R)||(k.add(R),C[R]=D)}}if(!Object.keys(C).length)for(let $ of m)C[`item.${c}:${qt($.name)}`]=qt($.name).replace(/_/g," ");v["resource_pack/texts/en_US.lang"]=Oe(Object.entries(C).map(([$,j])=>`${$}=${j}`).join(`
`)),v["resource_pack/texts/zh_CN.lang"]=v["resource_pack/texts/en_US.lang"];let z=0;for(let $ of u){let j=zt(t,$);if(!j)continue;let M=wm(j,c,z+1);M&&(v[`behavior_pack/recipes/converted_${z}.json`]=Oe(Ce(M)),z++)}return n(`\u751F\u6210\u7269\u54C1 ${m.length}\u3001\u65B9\u5757 ${d.length}\u3001\u914D\u65B9 ${z}`),v["README.md"]=Oe(`# ${i} \u2192 \u57FA\u5CA9\u7248\u9644\u52A0\u5305

\u5DF2\u8F6C\u6362\uFF1A\u7269\u54C1/\u65B9\u5757\u8D34\u56FE\u3001\u7269\u54C1/\u65B9\u5757\u6CE8\u518C JSON\u3001\u8D34\u56FE\u56FE\u96C6\u3001\u8BED\u8A00\u3001\u5408\u6210\u914D\u65B9\u3002
\u672A\u8F6C\u6362\uFF1AJava \u4EE3\u7801\u903B\u8F91\u3001\u5B9E\u4F53 AI\u3001\u4E8B\u4EF6\u3001GUI\u3001\u81EA\u5B9A\u4E49\u6A21\u578B\u51E0\u4F55\u3002
`),Se(Object.entries(v).map(([$,j])=>({name:$,data:j})))}function wm(e,n,t=1){let a=i=>String(i||"").replace("minecraft:","");return e.type==="minecraft:crafting_shaped"?{format_version:"1.20.10","minecraft:recipe_shaped":{description:{identifier:`${n}:converted_${t}`},tags:["crafting_table"],pattern:e.pattern,key:Object.fromEntries(Object.entries(e.key||{}).map(([i,r])=>[i,{item:a(r.item)}])),result:{item:a(e.result.item),count:e.result.count||1}}}:e.type==="minecraft:crafting_shapeless"?{format_version:"1.20.10","minecraft:recipe_shapeless":{description:{identifier:`${n}:converted_${t}`},tags:["crafting_table"],ingredients:(e.ingredients||[]).map(i=>({item:a(i.item)})),result:{item:a(e.result.item),count:e.result.count||1}}}:e.type==="minecraft:smelting"?{format_version:"1.20.10","minecraft:recipe_furnace":{description:{identifier:`${n}:converted_${t}`},tags:["furnace"],input:a(e.ingredient.item),output:a(e.result.item)}}:null}function rs(){let e=bt("modalBody");e.innerHTML=`<h3>\u6A21\u7EC4 / \u9644\u52A0\u5305\u8F6C\u6362</h3>
    <p class="muted">\u9759\u6001\u8F6C\u6362\u8D44\u6E90\u4E0E\u6570\u636E\uFF1A\u8D34\u56FE\u3001\u7269\u54C1/\u65B9\u5757\u5B9A\u4E49\u3001\u8BED\u8A00\u3001\u914D\u65B9\u3002\u4E0D\u7FFB\u8BD1\u4EE3\u7801\u903B\u8F91\u3002</p>
    <div class="skbar"><button id="mcAddon2J" class="primary">\u57FA\u5CA9\u9644\u52A0\u5305 \u2192 Java \u6A21\u7EC4\u5DE5\u7A0B</button>
      <button id="mcJ2Addon" class="primary">Java \u6A21\u7EC4 \u2192 \u57FA\u5CA9\u9644\u52A0\u5305</button>
      <button id="mcClose" class="ghost">\u5173\u95ED</button></div>
    <input type="file" id="mcFile" style="display:none">
    <div id="mcLog" class="logbox" style="max-height:36vh;overflow:auto"></div>`,bt("modal").style.display="flex";let n=document.querySelector(".modalbox");n&&(n.style.maxWidth="720px",n.style.width="96vw"),bt("mcClose").onclick=()=>{n&&(n.style.maxWidth="",n.style.width=""),bt("modal").style.display="none"};let t=r=>{let o=bt("mcLog");o&&(o.textContent+=r+`
`,o.scrollTop=o.scrollHeight)},a=r=>new Promise((o,s)=>{let c=bt("mcFile");c.value="",c.accept=r,c.onchange=()=>{let l=c.files[0];if(!l)return s(new Error("\u672A\u9009\u62E9\u6587\u4EF6"));l.arrayBuffer().then(m=>o(new Uint8Array(m))).catch(s)},c.click()}),i=(r,o)=>{if(window.AndroidBridge&&window.AndroidBridge.saveBinary){let s="";for(let c=0;c<o.length;c++)s+=String.fromCharCode(o[c]);window.AndroidBridge.saveBinary(r,btoa(s))}else{let s=document.createElement("a");s.href=URL.createObjectURL(new Blob([o])),s.download=r,s.click()}};bt("mcAddon2J").onclick=async()=>{try{let r=await a(".mcaddon,.mcpack,.zip");t("\u5F00\u59CB\uFF1A\u9644\u52A0\u5305 \u2192 Java \u6A21\u7EC4\u5DE5\u7A0B");let o=ym(r,t);i("\u8F6C\u6362-Java\u6A21\u7EC4\u5DE5\u7A0B.zip",o),t("\u5B8C\u6210")}catch(r){t("\u5931\u8D25\uFF1A"+r.message)}},bt("mcJ2Addon").onclick=async()=>{try{let r=await a(".jar,.zip");t("\u5F00\u59CB\uFF1AJava \u6A21\u7EC4 \u2192 \u57FA\u5CA9\u9644\u52A0\u5305");let o=vm(r,t);i("\u8F6C\u6362-\u57FA\u5CA9\u9644\u52A0\u5305.mcaddon",o),t("\u5B8C\u6210")}catch(r){t("\u5931\u8D25\uFF1A"+r.message)}}}var bi=e=>document.getElementById(e);function _i(){return window.innerWidth>=900||window.matchMedia&&window.matchMedia("(min-width: 900px)").matches}function os(e){document.body.classList.toggle("bigscreen",!!e)}function En(e){document.body.classList.toggle("immersive",!!e);try{window.AndroidBridge&&window.AndroidBridge.setFullscreen&&window.AndroidBridge.setFullscreen(!!e)}catch{}if(e)try{document.documentElement.requestFullscreen&&!window.AndroidBridge&&document.documentElement.requestFullscreen()}catch{}else try{document.fullscreenElement&&document.exitFullscreen&&document.exitFullscreen()}catch{}try{localStorage.setItem("mcbeImmersive",e?"1":"0")}catch{}let t=bi("btnFull");t&&(t.textContent=e?"\u9000\u51FA\u5168\u5C4F":"\u5168\u5C4F");let a=bi("fsExit");a&&(a.style.display=e?"block":"none")}function ss(){let e=_i();try{let o=localStorage.getItem("mcbeBig");o!==null&&(e=o==="1"?!0:_i()&&o!=="0")}catch{}os(e);let n=0,t=()=>{cancelAnimationFrame(n),n=requestAnimationFrame(()=>{os(_i())})};window.addEventListener("resize",t),window.addEventListener("orientationchange",()=>setTimeout(t,300));let a=!1;try{a=localStorage.getItem("mcbeImmersive")==="1"}catch{}a&&En(!0);let i=bi("btnFull");i&&i.addEventListener("click",()=>{a=!document.body.classList.contains("immersive"),En(a)});let r=document.querySelector("header h1");r&&r.addEventListener("dblclick",()=>En(!document.body.classList.contains("immersive")))}var it=e=>document.getElementById(e),km=/Electron/i.test(navigator.userAgent||""),xm=e=>{if(!e)return!1;let n=e.tagName;return n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||e.isContentEditable},Re=e=>{let n=it(e);return!n||n.disabled||getComputedStyle(n).display==="none"?!1:(n.click(),!0)},yi=()=>{let e=it("modal");return e&&getComputedStyle(e).display!=="none"?(e.style.display="none",!0):!1},gi=()=>En(!document.body.classList.contains("immersive")),vi=()=>["mapBack","nbtBack","dbBack","stBack"].some(e=>Re(e)),Sm=()=>{let e=it("editor");if(!e)return!1;let n=[...e.querySelectorAll("button")].find(t=>t.textContent.includes("\u4FDD\u5B58\u4FEE\u6539")||t.textContent==="\u4FDD\u5B58");return n?(n.click(),!0):!1},Bn=[{keys:"Ctrl+S",label:"\u5BFC\u51FA / \u53E6\u5B58",run:()=>Re("btnExport")},{keys:"Ctrl+O",label:"\u6253\u5F00\u6587\u4EF6",run:()=>Re("pickBtn")},{keys:"Ctrl+F",label:"\u641C\u7D22\u6587\u4EF6",run:()=>window.dispatchEvent(new CustomEvent("mcShortcut",{detail:"search"}))},{keys:"Ctrl+Shift+F",label:"\u641C\u7D22\u6587\u4EF6\u5185\u5BB9",run:()=>window.dispatchEvent(new CustomEvent("mcShortcut",{detail:"contentSearch"}))},{keys:"Ctrl+T",label:"\u66F4\u591A\u5DE5\u5177",run:()=>Re("btnTools")},{keys:"Ctrl+M",label:"\u4E16\u754C\u89C2\u770B",run:()=>Re("btnMap")},{keys:"Ctrl+P",label:"\u73A9\u5BB6\u6570\u636E",run:()=>Re("btnPlayer")},{keys:"Ctrl+L",label:"\u4E00\u952E\u6C49\u5316",run:()=>Re("btnLocalize")},{keys:"Ctrl+N",label:"\u65B0\u5EFA\u6587\u4EF6",run:()=>Re("btnNewFile")},{keys:"Ctrl+Shift+D",label:"\u4E16\u754C\u7EDF\u8BA1",run:()=>Re("btnStats")},{keys:"Ctrl+Shift+R",label:"\u91CD\u547D\u540D",run:()=>Re("btnRename")},{keys:"Ctrl+Enter",label:"\u4FDD\u5B58\u5F53\u524D\u7F16\u8F91",run:Sm},{keys:"F11",label:"\u5168\u5C4F / \u9000\u51FA\u5168\u5C4F",run:gi},{keys:"Alt+Enter",label:"\u5168\u5C4F / \u9000\u51FA\u5168\u5C4F",run:gi},{keys:"F1",label:"\u5FEB\u6377\u952E\u5E2E\u52A9",run:()=>ls()},{keys:"Shift+/",label:"\u5FEB\u6377\u952E\u5E2E\u52A9",run:()=>ls()},{keys:"Esc",label:"\u5173\u95ED\u5F39\u7A97 / \u9000\u51FA\u5168\u5C4F",run:()=>{!yi()&&document.body.classList.contains("immersive")&&gi()}},{keys:"Alt+Left",label:"\u8FD4\u56DE\u6587\u4EF6\u5217\u8868",run:vi},{keys:"\u9F20\u6807\u4FA7\u952E",label:"\u5173\u95ED\u5F39\u7A97 / \u8FD4\u56DE",run:()=>{yi()||vi()}}];function Em(e){let n=[];(e.ctrlKey||e.metaKey)&&n.push("Ctrl"),e.altKey&&n.push("Alt"),e.shiftKey&&n.push("Shift");let t=e.key;return t===" "&&(t="Space"),t==="/"&&(t="/"),t==="?"&&(t="?"),t==="Enter"&&(t="Enter"),t==="Escape"&&(t="Esc"),t.length===1&&(t=t.toUpperCase()),n.push(t),n.join("+")}function Bm(e){let n=Em(e);return Bn.find(t=>t.keys===n)||(n==="Shift+?"?Bn.find(t=>t.keys==="Shift+/"):null)}function ls(){let e=it("modalBody");e&&(e.innerHTML=`<h3>\u5FEB\u6377\u952E\uFF08\u5916\u63A5\u952E\u76D8 / Windows\uFF09</h3>
    <p class="muted">\u63A5\u4E0A\u84DD\u7259\u6216 USB \u952E\u76D8\u3001\u9F20\u6807\u540E\u76F4\u63A5\u53EF\u7528\uFF1BWindows \u7AEF\u540C\u4E00\u5957\u5FEB\u6377\u952E\u3002</p>
    <div class="legend">${Bn.map(n=>`<div class="nbtrow"><code>${n.keys}</code><span>${n.label}</span></div>`).join("")}</div>
    <p class="muted">\u8F93\u5165\u6846\u5185\u53EA\u6709 Esc\u3001F1\u3001F11 \u4F1A\u751F\u6548\uFF0C\u907F\u514D\u6253\u65AD\u6253\u5B57\u3002\u9F20\u6807\uFF1A\u5DE6\u952E\u9009\u62E9\u6587\u4EF6\uFF0C\u53F3\u952E\u6587\u4EF6\u53EF\u91CD\u547D\u540D / \u5220\u9664\u3002</p>
    <div class="skbar"><button id="scClose" class="ghost">\u5173\u95ED</button></div>`,it("modal").style.display="flex",it("scClose").onclick=()=>{it("modal").style.display="none"})}function Xt(){let e=it("ctxMenu");e&&e.remove()}function Cm(e,n,t){Xt();let a=document.createElement("div");a.id="ctxMenu",a.className="ctxmenu",a.style.left=Math.min(e,window.innerWidth-170)+"px",a.style.top=Math.min(n,window.innerHeight-100)+"px",a.innerHTML='<button data-a="rename">\u91CD\u547D\u540D</button><button data-a="delete" class="danger">\u5220\u9664</button>',document.body.appendChild(a),a.querySelector("[data-a=rename]").onclick=()=>{Xt(),t.click(),setTimeout(()=>Re("btnRename"),0)},a.querySelector("[data-a=delete]").onclick=()=>{Xt(),t.click(),setTimeout(()=>Re("btnDelete"),0)},setTimeout(()=>document.addEventListener("pointerdown",Xt,{once:!0}),0)}function cs(){window.addEventListener("keydown",n=>{if(n.defaultPrevented)return;let t=xm(n.target),a=Bm(n);a&&(km&&(a.keys==="F11"||a.keys==="Alt+Enter")||t&&!/^(F1|F11|Alt\+Enter|Shift\+\/|Shift\+\?)$/.test(a.keys)||a.keys==="Esc"&&t||(n.preventDefault(),n.stopPropagation(),a.run()))},!0);let e=it("tree");e&&e.addEventListener("contextmenu",n=>{let t=n.target.closest&&n.target.closest(".node.file");t&&(n.preventDefault(),Cm(n.clientX,n.clientY,t))}),window.addEventListener("mouseup",n=>{(n.button===3||n.button===4)&&(yi()||vi(),n.preventDefault())}),window.addEventListener("auxclick",n=>{(n.button===3||n.button===4)&&n.preventDefault()}),window.addEventListener("blur",Xt),window.addEventListener("resize",Xt)}var T=e=>document.getElementById(e),$t=e=>new TextEncoder().encode(e),wi=e=>new TextDecoder().decode(e),sa=e=>JSON.stringify(e,null,2);function oe(e,n,t){let a=T("modalBody");a.innerHTML=`<h3>${e}</h3>${n}<div class="skbar"><button id="tbClose" class="ghost">\u5173\u95ED</button></div>`,T("modal").style.display="flex";let i=document.querySelector(".modalbox");i&&(i.style.maxWidth="760px",i.style.width="96vw");let r=()=>{i&&(i.style.maxWidth="",i.style.width=""),T("modal").style.display="none"};return T("tbClose").onclick=r,t&&t(r),r}function qe(e,n){if(window.AndroidBridge&&window.AndroidBridge.saveBinary){let t="";for(let i=0;i<n.length;i+=32768)t+=String.fromCharCode.apply(null,n.subarray(i,i+32768));window.AndroidBridge.saveBinary(e,btoa(t))}else{let t=document.createElement("a");t.href=URL.createObjectURL(new Blob([n])),t.download=e,t.click()}}function be(e){return new Promise((n,t)=>{let a=document.createElement("input");a.type="file",a.accept=e,a.multiple=!0,a.onchange=async()=>{let i=[...a.files];if(!i.length)return t(new Error("\u672A\u9009\u62E9\u6587\u4EF6"));let r=[];for(let o of i)r.push({name:o.name,bytes:new Uint8Array(await o.arrayBuffer())});n(r)},a.click()})}function Cn(){return typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{let n=Math.random()*16|0;return(e==="x"?n:n&3|8).toString(16)})}function Mm(){oe("UUID \u751F\u6210\u5668",`<div class="skbar"><button id="uNew" class="primary">\u751F\u6210</button><input id="uVal" style="flex:1;min-width:200px" value="${Cn()}"></div>
    <p class="muted">\u79BB\u7EBF\u751F\u6210 v4 UUID\uFF0C\u7528\u4E8E manifest \u7684 header/module/dependency\u3002</p><div id="uList" class="code" style="padding:8px;max-height:30vh;overflow:auto"></div>`,()=>{let e=()=>{T("uList").textContent=[...(T("uList").textContent||"").split(`
`),T("uVal").value].filter(Boolean).join(`
`)};T("uNew").onclick=()=>{T("uVal").value=Cn()},e(),T("uVal").onclick=()=>{T("uVal").select()}})}function Im(){oe("manifest \u751F\u6210\u5668",`<div class="form2">
    <label>\u5305\u540D<input id="mName" value="My Addon"></label>
    <label>\u7C7B\u578B<select id="mType"><option value="both">\u884C\u4E3A+\u8D44\u6E90</option><option value="data">\u4EC5\u884C\u4E3A</option><option value="resources">\u4EC5\u8D44\u6E90</option></select></label>
    <label>\u7248\u672C<input id="mVer" value="1.0.0"></label>
    <label>\u6700\u4F4E\u5F15\u64CE<input id="mMin" value="1.20.10"></label>
    <label>BP UUID<input id="mBp" value="${Cn()}"></label>
    <label>RP UUID<input id="mRp" value="${Cn()}"></label>
  </div><div class="skbar"><button id="mGen" class="primary">\u751F\u6210 ZIP</button></div><div id="mMsg" class="muted"></div>`,()=>{T("mGen").onclick=()=>{let e=T("mType").value,n=T("mVer").value.split(".").map(Number),t=T("mMin").value.split(".").map(Number),a={},i=(r,o,s)=>({format_version:2,header:{name:s,description:"",uuid:o,version:n,min_engine_version:t},modules:[{type:r,uuid:Cn(),version:n}]});e!=="resources"&&(a["behavior_pack/manifest.json"]=$t(sa(i("data",T("mBp").value,T("mName").value+" BP")))),e!=="data"&&(a["resource_pack/manifest.json"]=$t(sa(i("resources",T("mRp").value,T("mName").value+" RP")))),qe("manifest.zip",Se(Object.entries(a).map(([r,o])=>({name:r,data:o})))),T("mMsg").textContent="\u5DF2\u5BFC\u51FA manifest.zip"}})}function zm(){let e=Object.entries(pi).map(([n,t])=>({b:n,j:t}));oe("\u65B9\u5757\u540D\u79F0\u5BF9\u7167",`<input id="lkQ" placeholder="\u8F93\u5165 BE \u6216 JE \u540D\u79F0\uFF0C\u5982 stone / \u8349" style="width:100%">
    <div id="lkOut" class="code" style="margin-top:8px;padding:8px;max-height:46vh;overflow:auto"></div>`,()=>{let n=()=>{let t=T("lkQ").value.trim().toLowerCase(),a=e.filter(i=>!t||i.b.includes(t)||i.j.includes(t));T("lkOut").innerHTML=a.slice(0,300).map(i=>`<div class="nbtrow"><code>${i.b}</code><span>\u2192</span><code>${i.j}</code></div>`).join("")||'<p class="muted">\u6CA1\u6709\u5339\u914D\u9879</p>'};T("lkQ").oninput=n,n()})}function $m(){oe("\u8BED\u8A00\u6587\u4EF6\u5BF9\u6BD4\u8865\u952E",`<p class="muted">\u9009\u62E9\u57FA\u51C6\u8BED\u8A00\u4E0E\u76EE\u6807\u8BED\u8A00\uFF08.json \u6216 .lang\uFF09\uFF0C\u8F93\u51FA\u7F3A\u5931\u952E\u6E05\u5355\u548C\u8865\u5168\u540E\u7684\u76EE\u6807\u6587\u4EF6\u3002</p>
    <div class="skbar"><button id="lgBase" class="ghost">\u9009\u57FA\u51C6</button><button id="lgTarget" class="ghost">\u9009\u76EE\u6807</button><button id="lgRun" class="primary">\u5BF9\u6BD4</button></div>
    <div id="lgOut"></div>`,()=>{let e=null,n=null,t=(a,i)=>{let r=wi(i);if(a.endsWith(".json"))try{return JSON.parse(r)}catch{return{}}let o={};for(let s of r.split(/\r?\n/)){let c=s.match(/^([^=]+)=(.*)$/);c&&(o[c[1].trim()]=c[2])}return o};T("lgBase").onclick=async()=>{let a=await be(".json,.lang");e={name:a[0].name,data:t(a[0].name,a[0].bytes)},T("lgOut").textContent="\u57FA\u51C6\uFF1A"+e.name},T("lgTarget").onclick=async()=>{let a=await be(".json,.lang");n={name:a[0].name,data:t(a[0].name,a[0].bytes)},T("lgOut").textContent="\u76EE\u6807\uFF1A"+n.name},T("lgRun").onclick=()=>{if(!e||!n)return T("lgOut").textContent="\u5148\u9009\u4E24\u4E2A\u6587\u4EF6";let a=Object.keys(e.data).filter(r=>!(r in n.data)),i=Object.keys(n.data).filter(r=>!(r in e.data));T("lgOut").innerHTML=`<p>\u7F3A\u5931 ${a.length} \u6761\uFF0C\u591A\u4F59 ${i.length} \u6761</p><pre class="code" style="max-height:32vh;overflow:auto">${a.join(`
`)}</pre>
        <div class="skbar"><button id="lgSave" class="primary">\u5BFC\u51FA\u8865\u5168\u6587\u4EF6</button></div>`,T("lgSave").onclick=()=>{let r={...n.data};for(let c of a)r[c]=e.data[c];let o=n.name.endsWith(".json")?"merged.json":"merged.lang",s=o.endsWith(".json")?sa(r):Object.entries(r).map(([c,l])=>`${c}=${l}`).join(`
`);qe(o,$t(s))}}})}function Tm(){oe("\u8D34\u56FE\u5C3A\u5BF8\u68C0\u67E5",`<p class="muted">\u6279\u91CF\u9009 PNG\uFF0C\u8BFB IHDR \u68C0\u67E5\u5C3A\u5BF8/\u4F4D\u6DF1/\u989C\u8272\u7C7B\u578B\uFF0C\u6807\u51FA\u975E 2 \u7684\u5E42\u4E0E\u8D85\u5927\u56FE\u3002</p>
    <div class="skbar"><button id="pcPick" class="primary">\u9009\u62E9 PNG</button></div><div id="pcOut" class="code" style="max-height:46vh;overflow:auto;padding:8px"></div>`,()=>{T("pcPick").onclick=async()=>{let n=(await be(".png")).map(t=>{let a=t.bytes,i=0,r=0,o=0,s=0;if(a.length>=29&&a[0]===137&&a[1]===80){let l=new DataView(a.buffer,a.byteOffset,a.byteLength);i=l.getUint32(16),r=l.getUint32(20),o=a[24],s=a[25]}let c=l=>l>0&&(l&l-1)===0;return{name:t.name,w:i,h:r,depth:o,ct:s,bad:!c(i)||!c(r)||i>1024||r>1024}});T("pcOut").innerHTML=n.map(t=>`<div class="nbtrow"><code>${t.name}</code><span>${t.w}\xD7${t.h} ${t.depth}bit ct=${t.ct}</span><b style="color:${t.bad?"#ff8a8a":"#7ddc9a"}">${t.bad?"\u5F02\u5E38":"\u6B63\u5E38"}</b></div>`).join("")}})}function Nm(){oe("\u56FE\u7247\u8F6C PNG",`<div class="form2"><label>\u76EE\u6807\u8FB9\u957F\uFF08\u50CF\u7D20\uFF09<input id="icSize" type="number" value="64"></label>
    <label>\u7F29\u653E\u7B97\u6CD5<select id="icSmooth"><option value="false">\u6700\u8FD1\u90BB\uFF08\u50CF\u7D20\u753B\uFF09</option><option value="true">\u5E73\u6ED1</option></select></label></div>
    <div class="skbar"><button id="icPick" class="primary">\u9009\u62E9\u56FE\u7247</button></div><div id="icOut" class="muted"></div>`,()=>{T("icPick").onclick=async()=>{let e=await be("image/*"),n=Math.max(1,Math.min(2048,Number(T("icSize").value)||64));for(let t of e){let a=await createImageBitmap(new Blob([t.bytes])),i=document.createElement("canvas");i.width=n,i.height=n;let r=i.getContext("2d");r.imageSmoothingEnabled=T("icSmooth").value==="true",r.drawImage(a,0,0,n,n);let o=await new Promise(s=>i.toBlob(s,"image/png"));qe(t.name.replace(/\.\w+$/,"")+"_"+n+".png",new Uint8Array(await o.arrayBuffer()))}T("icOut").textContent=`\u5DF2\u8F6C\u6362 ${e.length} \u5F20`}})}function Lm(){oe("\u5305\u5185\u6587\u672C\u6279\u91CF\u66FF\u6362",`<p class="muted">\u5BF9 .json/.js/.lang/.txt/.mcfunction \u7B49\u6587\u672C\u6587\u4EF6\u505A\u6279\u91CF\u66FF\u6362\uFF0C\u8F93\u51FA\u65B0 ZIP\u3002</p>
    <div class="form2"><label>\u67E5\u627E<input id="rpFind"></label><label>\u66FF\u6362\u4E3A<input id="rpRep"></label></div>
    <div class="skbar"><button id="rpPick" class="primary">\u9009\u62E9 ZIP \u5E76\u6267\u884C</button></div><div id="rpOut" class="muted"></div>`,()=>{T("rpPick").onclick=async()=>{let e=T("rpFind").value,n=T("rpRep").value;if(!e)return T("rpOut").textContent="\u8BF7\u8F93\u5165\u67E5\u627E\u5185\u5BB9";let[t]=await be(".zip,.mcpack,.mcaddon,.mcworld,.mctemplate,.jar"),a=se(t.bytes),i=0,r=a.entries.map(o=>{let s=a.read(o);if(/\.(json|js|lang|txt|mcfunction|md|yml|yaml|toml|properties)$/i.test(o.name)){let c=wi(s);c.includes(e)&&(i+=c.split(e).length-1,s=$t(c.split(e).join(n)))}return{name:o.name,data:s}});qe(t.name.replace(/\.\w+$/,"")+"_\u66FF\u6362.zip",Se(r)),T("rpOut").textContent=`\u66FF\u6362 ${i} \u5904\uFF0C\u5DF2\u5BFC\u51FA`}})}function Am(){oe("\u5341\u516D\u8FDB\u5236\u67E5\u770B",`<div class="skbar"><button id="hxPick" class="primary">\u9009\u62E9\u6587\u4EF6</button><label>\u504F\u79FB<input id="hxOff" type="number" value="0" style="width:110px"></label><button id="hxGo" class="ghost">\u8DF3\u8F6C</button></div>
    <pre id="hxOut" class="code" style="max-height:48vh;overflow:auto;padding:8px"></pre>`,()=>{let e=null,n=()=>{if(!e)return;let t=Math.max(0,Math.min(e.length-1,Number(T("hxOff").value)||0)),a=[];for(let i=t;i<Math.min(e.length,t+512);i+=16){let r=e.subarray(i,i+16),o=[...r].map(c=>c.toString(16).padStart(2,"0")).join(" "),s=[...r].map(c=>c>=32&&c<127?String.fromCharCode(c):".").join("");a.push(`${i.toString(16).padStart(8,"0")}  ${o.padEnd(48)}  ${s}`)}T("hxOut").textContent=a.join(`
`)};T("hxPick").onclick=async()=>{let[t]=await be("*/*");e=t.bytes,T("hxOut").textContent=`${t.name}  ${e.length} \u5B57\u8282`,T("hxOff").value=0,n()},T("hxGo").onclick=n})}function jm(){oe("\u7ED3\u6784\u8F6C .mcstructure",`<p class="muted">Java .nbt \u7ED3\u6784 \u2192 \u57FA\u5CA9\u7248 .mcstructure\uFF08\u65E0\u538B\u7F29 LE NBT\uFF09\uFF0C\u53EF\u5728\u7ED3\u6784\u65B9\u5757\u91CC\u5BFC\u5165\u3002</p>
    <div class="skbar"><button id="msPick" class="primary">\u9009\u62E9 .nbt</button></div><div id="msOut" class="muted"></div>`,()=>{T("msPick").onclick=async()=>{let[e]=await be(".nbt"),n;try{n=Ne(xe(e.bytes))}catch{n=Ne(e.bytes)}let t=n.data,a=t.size?t.size.value:[1,1,1],i=t.palette?t.palette.value.items.map(g=>({Name:g.Name.value,Properties:g.Properties?g.Properties.value:{}})):[],r=t.blocks?t.blocks.value.items.map(g=>({pos:g.pos.value,state:g.state.value})):[],[o,s,c]=a,l=o*s*c,m=new Int32Array(l).fill(-1);for(let g of r){let[f,_,y]=g.pos;m[f+y*o+_*o*c]=g.state}let d=i.map(g=>({name:g.Name,states:Object.fromEntries(Object.entries(g.Properties).map(([f,_])=>[f,_.value??_])),version:17959425})),p=[];for(let g=0;g<l;g++)p.push(m[g]<0?0:m[g]+1);let u={format_version:{t:3,v:1},size:{t:9,et:3,v:a.map(g=>({t:3,v:g}))},structure:{t:10,v:{block_indices:{t:9,et:9,v:[{t:9,et:3,v:p.map(g=>({t:3,v:g}))},{t:9,et:3,v:new Array(l).fill({t:3,v:-1})}]},palette:{t:10,v:{default:{t:10,v:{block_palette:{t:9,et:10,v:d.map(g=>({t:10,v:{name:{t:8,v:g.name},states:{t:10,v:{}},version:{t:3,v:g.version}}}))},block_position_data:{t:10,v:{}}}}}}}}},b=he({root:{type:10,name:"",value:u}},!0);qe(e.name.replace(/\.nbt$/,".mcstructure"),b),T("msOut").textContent=`\u5DF2\u8F6C\u6362 ${r.length} \u65B9\u5757\uFF0C\u5C3A\u5BF8 ${a.join("\xD7")}`}})}function Pm(){oe("Region \u533A\u5757\u88C1\u526A",`<p class="muted">\u53EA\u4FDD\u7559\u6307\u5B9A X/Z \u8303\u56F4\u5185\u7684\u533A\u5757\uFF0C\u8F93\u51FA\u65B0\u7684 .mca\u3002</p>
    <div class="form2"><label>\u6700\u5C0F X<input id="rcX0" type="number" value="0"></label><label>\u6700\u5927 X<input id="rcX1" type="number" value="511"></label>
    <label>\u6700\u5C0F Z<input id="rcZ0" type="number" value="0"></label><label>\u6700\u5927 Z<input id="rcZ1" type="number" value="511"></label></div>
    <div class="skbar"><button id="rcPick" class="primary">\u9009\u62E9 .mca \u5E76\u88C1\u526A</button></div><div id="rcOut" class="muted"></div>`,()=>{T("rcPick").onclick=async()=>{let[e]=await be(".mca"),n=e.bytes,t=new DataView(n.buffer,n.byteOffset,n.byteLength),a=new Uint8Array(8192),i=new DataView(a.buffer),r=[],o=2,s=Number(T("rcX0").value),c=Number(T("rcX1").value),l=Number(T("rcZ0").value),m=Number(T("rcZ1").value);for(let u=0;u<1024;u++){let b=(t.getUint32(u*4)>>>8)*4096;if(!b||b+5>n.length)continue;let g=t.getUint32(b);if(g<5||b+4+g>n.length)continue;let f=u%32,_=Math.floor(u/32);if(f<s||f>c||_<l||_>m)continue;let y=n.subarray(b+5,b+4+g),w=Math.ceil((y.length+5)/4096);if(w>255)continue;let v=new Uint8Array(w*4096);new DataView(v.buffer).setUint32(0,y.length+1),v[4]=n[b+4],v.set(y,5),i.setUint32(u*4,(o<<8|w)>>>0),i.setUint32(4096+u*4,t.getUint32(4096+u*4)),r.push({sector:o,data:v}),o+=w}let d=8192;for(let u of r)d=Math.max(d,u.sector*4096+u.data.length);let p=new Uint8Array(d);p.set(a);for(let u of r)p.set(u.data,u.sector*4096);qe(e.name.replace(/\.mca$/,"_\u88C1\u526A.mca"),p),T("rcOut").textContent=`\u4FDD\u7559 ${r.length} \u4E2A\u533A\u5757`}})}function Dm(){oe("Java \u5B58\u6863\u62A5\u544A",`<p class="muted">\u8BFB Java \u5B58\u6863 ZIP\uFF0C\u751F\u6210 Markdown \u62A5\u544A\uFF08\u79CD\u5B50/\u51FA\u751F\u70B9/\u5929\u6570/\u533A\u5757/\u5730\u8868\u65B9\u5757\u76F4\u65B9\u56FE\uFF09\u3002</p>
    <div class="skbar"><button id="jrPick" class="primary">\u9009\u62E9 ZIP</button></div><div id="jrOut" class="muted"></div>`,()=>{T("jrPick").onclick=async()=>{let[e]=await be(".zip"),n=It(e.bytes),t=ht(n.zip,null),a={};for(let[,o]of t.cols)a[o.block]=(a[o.block]||0)+1;let i=Object.entries(a).sort((o,s)=>s[1]-o[1]).slice(0,20),r=`# Java \u5B58\u6863\u62A5\u544A\uFF1A${n.name||"\u672A\u547D\u540D"}

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
${i.map(([o,s])=>`| ${o} | ${s} |`).join(`
`)}
`;qe("java-\u5B58\u6863\u62A5\u544A.md",$t(r)),T("jrOut").textContent="\u5DF2\u5BFC\u51FA java-\u5B58\u6863\u62A5\u544A.md"}})}function Um(){let e=[];try{e=JSON.parse(localStorage.getItem("mcbeRecent")||"[]")}catch{e=[]}oe("\u6700\u8FD1\u6253\u5F00",`<p class="muted">\u8BB0\u5F55\u6700\u8FD1\u6253\u5F00\u7684\u6587\u4EF6\u540D\uFF08\u4E0D\u4FDD\u5B58\u6587\u4EF6\u5185\u5BB9\uFF09\u3002</p><div id="rcList" class="code" style="padding:8px;max-height:44vh;overflow:auto">${e.map(n=>`<div>${n.name} \xB7 ${new Date(n.at).toLocaleString()}</div>`).join("")||'<p class="muted">\u6682\u65E0\u8BB0\u5F55</p>'}</div>
    <div class="skbar"><button id="rcClear" class="ghost">\u6E05\u7A7A\u8BB0\u5F55</button></div>`,()=>{T("rcClear").onclick=()=>{localStorage.removeItem("mcbeRecent"),T("rcList").textContent="\u5DF2\u6E05\u7A7A"}})}function Rm(){let e=Bn.map(n=>[n.keys,n.label]).concat([["\u53F3\u952E\u6587\u4EF6","\u91CD\u547D\u540D / \u5220\u9664"],["\u6EDA\u8F6E / \u53CC\u6307","\u5730\u56FE\u7F29\u653E 0.25~5\xD7"],["\u957F\u6309\u65E5\u5FD7","\u9009\u4E2D\u590D\u5236"]]);oe("\u5FEB\u6377\u952E\u4E0E\u624B\u52BF",`<div class="legend">${e.map(([n,t])=>`<div class="nbtrow"><code>${n}</code><span>${t}</span></div>`).join("")}</div>
    <p class="muted">\u5916\u63A5\u952E\u76D8\u3001\u84DD\u7259\u952E\u9F20\u4E0E Windows \u7248\u5171\u7528\u540C\u4E00\u5957\uFF1B\u8F93\u5165\u6846\u5185\u53EA\u54CD\u5E94 Ctrl+S / Esc \u7B49\u5B89\u5168\u7EC4\u5408\u3002</p>`,()=>{})}function Fm(){oe("\u9644\u52A0\u5305\u4F9D\u8D56\u8BCA\u65AD",`<p class="muted">\u68C0\u67E5 manifest \u7684 UUID\u3001\u7248\u672C\u3001modules\u3001dependencies \u662F\u5426\u81EA\u6D3D\u3002</p>
    <div class="skbar"><button id="adPick" class="primary">\u9009\u62E9\u9644\u52A0\u5305</button></div><div id="adOut"></div>`,()=>{T("adPick").onclick=async()=>{let[e]=await be(".mcaddon,.mcpack,.zip"),n=se(e.bytes),t=n.entries.filter(r=>/manifest\.json$/.test(r.name)).map(r=>({name:r.name,j:JSON.parse(wi(n.read(r)))}));if(!t.length)return T("adOut").textContent="\u6CA1\u6709 manifest.json";let a=new Set(t.map(r=>r.j.header&&r.j.header.uuid)),i=t.map(r=>{let o=r.j.header||{},s=r.j.modules||[],c=[];o.uuid||c.push("\u7F3A header.uuid"),Array.isArray(o.version)||c.push("\u7248\u672C\u683C\u5F0F"),s.length||c.push("\u65E0 modules");let l=r.j.dependencies||[];for(let m of l)a.has(m.uuid)||c.push("\u4F9D\u8D56\u4E0D\u5B58\u5728 "+m.uuid);return`<div class="nbtrow"><code>${r.name}</code><b style="color:${c.length?"#ff8a8a":"#7ddc9a"}">${c.length?c.join("\uFF1B"):"\u901A\u8FC7"}</b></div>`});T("adOut").innerHTML=i.join("")}})}function Om(){oe("\u5305\u5185\u5BB9\u5BF9\u6BD4",`<p class="muted">\u6BD4\u4E24\u4E2A ZIP \u7684\u6587\u4EF6\u6E05\u5355\u548C\u5927\u5C0F\uFF0C\u5217\u51FA\u65B0\u589E/\u5220\u9664/\u5927\u5C0F\u53D8\u5316\u3002</p>
    <div class="skbar"><button id="dfA" class="ghost">\u5305 A</button><button id="dfB" class="ghost">\u5305 B</button><button id="dfRun" class="primary">\u5BF9\u6BD4</button></div>
    <div id="dfOut" style="max-height:46vh;overflow:auto"></div>`,()=>{let e=null,n=null;T("dfA").onclick=async()=>{let[t]=await be(".zip,.mcpack,.mcaddon,.jar,.mcworld,.mctemplate");e={name:t.name,z:se(t.bytes)},T("dfOut").textContent="A="+t.name},T("dfB").onclick=async()=>{let[t]=await be(".zip,.mcpack,.mcaddon,.jar,.mcworld,.mctemplate");n={name:t.name,z:se(t.bytes)},T("dfOut").textContent="B="+t.name},T("dfRun").onclick=()=>{if(!e||!n)return;let t=new Map(e.z.entries.map(s=>[s.name,s.usize])),a=new Map(n.z.entries.map(s=>[s.name,s.usize])),i=[...a.keys()].filter(s=>!t.has(s)),r=[...t.keys()].filter(s=>!a.has(s)),o=[...t.keys()].filter(s=>a.has(s)&&t.get(s)!==a.get(s));T("dfOut").innerHTML=`<p>\u65B0\u589E ${i.length}\uFF0C\u5220\u9664 ${r.length}\uFF0C\u5927\u5C0F\u53D8\u5316 ${o.length}</p>
        <pre class="code" style="max-height:30vh;overflow:auto">${["+ "+i.join(`
+ `),"- "+r.join(`
- `)].join(`
`).slice(0,8e3)}</pre>`}})}function Hm(){oe("\u5B58\u6863\u5065\u5EB7\u68C0\u67E5",`<p class="muted">\u68C0\u67E5\u57FA\u5CA9\u7248/Java \u5B58\u6863\u7684\u5173\u952E\u6587\u4EF6\u4E0E\u7ED3\u6784\u5B8C\u6574\u6027\u3002</p>
    <div class="skbar"><button id="hlPick" class="primary">\u9009\u62E9\u5B58\u6863</button></div><div id="hlOut"></div>`,()=>{T("hlPick").onclick=async()=>{let[e]=await be(".zip,.mcworld,.mctemplate"),t=se(e.bytes).entries.map(o=>o.name),a=t.some(o=>/level\.dat$/.test(o))&&t.some(o=>/region\/.*\.mca$/.test(o)),i=t.some(o=>/db\/CURRENT$/.test(o)),r=[];if(a){let o=It(e.bytes);r.push(["level.dat",o.name],["region \u6570",o.regions],["\u533A\u5757",ht(o.zip,null).chunks])}else i?(r.push(["level.dat",t.some(o=>/level\.dat$/.test(o))?"\u5B58\u5728":"\u7F3A\u5931"]),r.push(["db/CURRENT","\u5B58\u5728"]),r.push(["db \u6587\u4EF6\u6570",t.filter(o=>/db\/[^/]+$/.test(o)).length])):r.push(["\u8BC6\u522B","\u672A\u77E5\u683C\u5F0F"]);T("hlOut").innerHTML=r.map(([o,s])=>`<div class="nbtrow"><code>${o}</code><span>${s}</span></div>`).join("")}})}function Zm(){let e=localStorage.getItem("mcbeAccent")||"#2f7df6";oe("\u81EA\u5B9A\u4E49\u5F3A\u8C03\u8272",`<div class="skbar"><input type="color" id="acColor" value="${e}"><button id="acReset" class="ghost">\u6062\u590D\u9ED8\u8BA4</button></div>
    <p class="muted">\u5F71\u54CD\u4E3B\u6309\u94AE\u3001\u9009\u4E2D\u6001\u7B49\u5F3A\u8C03\u5143\u7D20\u3002</p>`,()=>{let n=t=>{document.documentElement.style.setProperty("--accent",t),localStorage.setItem("mcbeAccent",t)};T("acColor").oninput=()=>n(T("acColor").value),T("acColor").onchange=()=>n(T("acColor").value),T("acReset").onclick=()=>{localStorage.removeItem("mcbeAccent"),document.documentElement.style.removeProperty("--accent")},n(e)})}function Wm(){oe("\u5730\u8868\u65B9\u5757\u76F4\u65B9\u56FE",`<p class="muted">\u4ECE Java \u5B58\u6863\u7EDF\u8BA1\u5730\u8868\u65B9\u5757\u5217\u6570\uFF0C\u5BFC\u51FA CSV\u3002</p>
    <div class="skbar"><button id="hsPick" class="primary">\u9009\u62E9 ZIP</button></div><div id="hsOut" class="muted"></div>`,()=>{T("hsPick").onclick=async()=>{let[e]=await be(".zip"),n=It(e.bytes),t=ht(n.zip,null),a={};for(let[,r]of t.cols)a[r.block]=(a[r.block]||0)+1;let i=Object.entries(a).sort((r,o)=>o[1]-r[1]);qe("\u5730\u8868\u65B9\u5757.csv",$t(`\u65B9\u5757,\u5217\u6570
`+i.map(([r,o])=>`${r},${o}`).join(`
`))),T("hsOut").textContent=`\u5171 ${i.length} \u79CD\u65B9\u5757\uFF0C\u5DF2\u5BFC\u51FA`}})}function Vm(){oe("\u7ED3\u6784 3D \u5BFC\u51FA PNG",`<p class="muted">\u8BFB Java .nbt \u7ED3\u6784\uFF0C\u6E32\u67D3 3D \u56FE\u5E76\u5BFC\u51FA PNG\u3002</p>
    <div class="skbar"><button id="spPick" class="primary">\u9009\u62E9 .nbt</button></div><div id="spOut" class="muted"></div>`,()=>{T("spPick").onclick=async()=>{let[e]=await be(".nbt"),n;try{n=Ne(xe(e.bytes))}catch{n=Ne(e.bytes)}let t=n.data,a=t.size?t.size.value:[1,1,1],i=t.palette?t.palette.value.items.map(c=>c.Name.value):[],r=t.blocks?t.blocks.value.items.map(c=>({pos:c.pos.value,state:c.state.value})):[],o=document.createElement("canvas");ia(o,{size:a,palette:i,blocks:r},0);let s=await new Promise(c=>o.toBlob(c,"image/png"));qe(e.name.replace(/\.nbt$/,"_3d.png"),new Uint8Array(await s.arrayBuffer())),T("spOut").textContent="\u5DF2\u5BFC\u51FA PNG"}})}function Jm(){oe("NBT \u8F6C JSON",`<p class="muted">\u8BFB Java .dat/.nbt\uFF08gzip \u6216\u672A\u538B\u7F29\uFF09\uFF0C\u5BFC\u51FA\u53EF\u8BFB JSON\u3002</p>
    <div class="skbar"><button id="njPick" class="primary">\u9009\u62E9\u6587\u4EF6</button></div><div id="njOut" class="muted"></div>`,()=>{T("njPick").onclick=async()=>{let[e]=await be(".dat,.nbt,.schematic"),n;try{n=Ne(xe(e.bytes))}catch{n=Ne(e.bytes)}let t=a=>{if(a==null)return a;if(typeof a=="bigint")return a.toString();if(a instanceof Uint8Array)return"<bytes "+a.length+">";if(Array.isArray(a))return a.map(t);if(typeof a=="object"){let i={};for(let r of Object.keys(a))i[r]=t(a[r]);return i}return a};qe(e.name.replace(/\.\w+$/,"")+".json",$t(sa(t(n.data)))),T("njOut").textContent="\u5DF2\u5BFC\u51FA JSON"}})}var ms=[["UUID \u751F\u6210\u5668","\u79BB\u7EBF\u751F\u6210 v4 UUID",Mm],["manifest \u751F\u6210\u5668","BP/RP \u53CC\u6E05\u5355 + UUID",Im],["\u65B9\u5757\u540D\u79F0\u5BF9\u7167","BE \u21C4 JE \u540D\u79F0\u67E5\u8BE2",zm],["\u8BED\u8A00\u8865\u952E","\u5BF9\u6BD4\u4E0E\u5408\u5E76 lang/json",$m],["\u8D34\u56FE\u5C3A\u5BF8\u68C0\u67E5","\u6279\u91CF PNG \u5C3A\u5BF8/\u4F4D\u6DF1",Tm],["\u56FE\u7247\u8F6C PNG","\u7F29\u653E + \u8F6C\u4E3A PNG",Nm],["\u6587\u672C\u6279\u91CF\u66FF\u6362","\u5305\u5185 json/js/lang \u66FF\u6362",Lm],["\u5341\u516D\u8FDB\u5236\u67E5\u770B","\u53EA\u8BFB\u5341\u516D\u8FDB\u5236\u6D4F\u89C8",Am],["\u7ED3\u6784\u8F6C mcstructure","Java .nbt \u2192 \u57FA\u5CA9\u7ED3\u6784",jm],["Region \u88C1\u526A","\u6309 X/Z \u8303\u56F4\u88C1\u526A .mca",Pm],["Java \u5B58\u6863\u62A5\u544A","\u5BFC\u51FA Markdown \u62A5\u544A",Dm],["\u6700\u8FD1\u6253\u5F00","\u6700\u8FD1\u6587\u4EF6\u540D\u8BB0\u5F55",Um],["\u5FEB\u6377\u952E\u4E0E\u624B\u52BF","\u64CD\u4F5C\u8BF4\u660E",Rm],["\u9644\u52A0\u5305\u8BCA\u65AD","manifest \u4F9D\u8D56\u68C0\u67E5",Fm],["\u5305\u5185\u5BB9\u5BF9\u6BD4","\u4E24\u4E2A ZIP \u5DEE\u5F02",Om],["\u5B58\u6863\u5065\u5EB7\u68C0\u67E5","\u5173\u952E\u6587\u4EF6\u5B8C\u6574\u6027",Hm],["\u81EA\u5B9A\u4E49\u5F3A\u8C03\u8272","\u4E3B\u9898\u4E3B\u8272",Zm],["\u65B9\u5757\u76F4\u65B9\u56FE","\u5BFC\u51FA CSV",Wm],["\u7ED3\u6784 3D \u5BFC\u51FA","\u6E32\u67D3 PNG",Vm],["NBT \u8F6C JSON","\u5BFC\u51FA\u53EF\u8BFB JSON",Jm]];function ds(){let e=T("modalBody");e.innerHTML=`<h3>\u5DE5\u5177\u4E2D\u5FC3</h3><p class="muted">20 \u4E2A\u79BB\u7EBF\u5DE5\u5177\uFF0C\u5168\u90E8\u672C\u5730\u8FD0\u884C\u3002</p>
    <div class="toolgrid">${ms.map(([t,a],i)=>`<button class="toolcard" data-i="${i}"><b>${t}</b><span>${a}</span></button>`).join("")}</div>
    <div class="skbar"><button id="tbClose" class="ghost">\u5173\u95ED</button></div>`,T("modal").style.display="flex";let n=document.querySelector(".modalbox");n&&(n.style.maxWidth="760px",n.style.width="96vw"),T("tbClose").onclick=()=>{n&&(n.style.maxWidth="",n.style.width=""),T("modal").style.display="none"},e.querySelectorAll(".toolcard").forEach(t=>{t.onclick=()=>ms[Number(t.dataset.i)][2]()})}var hs="mcbeSfx",Mn=null,rt=!0;try{rt=localStorage.getItem(hs)!=="0"}catch{}function _s(){if(!rt)return null;let e=window.AudioContext||window.webkitAudioContext;if(!e)return null;if(!Mn)try{Mn=new e}catch{return null}if(Mn.state==="suspended")try{Mn.resume()}catch{}return Mn}function Fe(e,n,t,a,i){let r=_s();if(!r)return;let o=r.currentTime,s=r.createOscillator(),c=r.createGain();s.type=t||"triangle",s.frequency.setValueAtTime(e,o),i&&s.frequency.exponentialRampToValueAtTime(i,o+n),c.gain.setValueAtTime(1e-4,o),c.gain.exponentialRampToValueAtTime(a||.18,o+.008),c.gain.exponentialRampToValueAtTime(1e-4,o+n),s.connect(c),c.connect(r.destination),s.start(o),s.stop(o+n+.02)}function us(e,n){let t=_s();if(!t)return;let a=Math.floor(t.sampleRate*e),i=t.createBuffer(1,a,t.sampleRate),r=i.getChannelData(0);for(let c=0;c<a;c++)r[c]=(Math.random()*2-1)*(1-c/a)**2;let o=t.createBufferSource();o.buffer=i;let s=t.createGain();s.gain.value=n||.05,o.connect(s),s.connect(t.destination),o.start()}function la(e){if(rt)switch(e){case"primary":Fe(760,.055,"square",.1),Fe(1140,.045,"triangle",.07),us(.035,.025);break;case"soft":Fe(520,.05,"sine",.1);break;case"open":Fe(420,.07,"triangle",.12,760);break;case"close":Fe(680,.07,"triangle",.1,340);break;case"toggle":Fe(560,.06,"square",.08,980);break;case"success":Fe(660,.05,"triangle",.1),setTimeout(()=>Fe(880,.05,"triangle",.1),55),setTimeout(()=>Fe(1320,.07,"triangle",.09),110);break;case"warn":Fe(300,.09,"sawtooth",.1,200);break;case"error":Fe(220,.12,"sawtooth",.12,150);break;default:Fe(900,.035,"square",.07),us(.025,.03)}}function ps(e){return e?e.id==="btnExport"||e.id==="btnLocalize"||e.id==="btnTools"?"success":e.id==="btnFull"||e.id==="btnSfx"?"toggle":/Close$|^tbClose|^keyClose|^scClose/.test(e.id||"")?"close":e.classList&&e.classList.contains("danger")?"warn":e.classList&&e.classList.contains("primary")?"primary":e.classList&&e.classList.contains("ghost")?"soft":e.classList&&(e.classList.contains("toolcard")||e.classList.contains("toolitem"))?"open":e.classList&&e.classList.contains("slotrow")?"soft":e.classList&&e.classList.contains("node")?e.classList.contains("dir")?"open":"click":e.tagName==="SELECT"?"soft":"click":"click"}function fs(e){let n=e.target;return!n||!n.closest?null:n.closest("button, .node, .toolcard, .toolitem, .slotrow, select, canvas")}function bs(){let e=document.getElementById("btnSfx"),n=()=>{e&&(e.textContent=rt?"\u97F3\u6548\u5F00":"\u97F3\u6548\u5173",e.classList.toggle("mutedbtn",!rt))};n(),e&&e.addEventListener("click",()=>{rt=!rt;try{localStorage.setItem(hs,rt?"1":"0")}catch{}n(),rt&&la("success")}),document.addEventListener("pointerdown",t=>{let a=fs(t);a&&la(a.tagName==="CANVAS"?"soft":ps(a))},!0),document.addEventListener("click",t=>{if(t.detail!==0)return;let a=fs(t);a&&la(ps(a))},!0),document.addEventListener("change",t=>{t.target&&t.target.tagName==="SELECT"&&la("soft")},!0)}var In=32768,zn=7,$n=null;function Km(){if($n)return $n;$n=new Int32Array(256);for(let e=0;e<256;e++){let n=e;for(let t=0;t<8;t++)n=n&1?2197175160^n>>>1:n>>>1;$n[e]=n}return $n}function Gm(e){let n=Km(),t=4294967295;for(let a=0;a<e.length;a++)t=n[(t^e[a])&255]^t>>>8;return(t^4294967295)>>>0}function qm(e){return(e>>>15|e<<17)+2726488792>>>0}function gs(e){let n=[];for(;e>=128;)n.push(e&127|128),e>>>=7;return n.push(e&127),n}function Xm(e,n){let t=[],a=r=>{let o=new Uint8Array(8);new DataView(o.buffer).setBigUint64(0,BigInt(r),!0),t.push(...o)},i=r=>{let o=new Uint8Array(4);new DataView(o.buffer).setUint32(0,r,!0),t.push(...o)};a(e),i(n.length);for(let r of n){t.push(1);let o=ys(r.key),s=ys(r.value);t.push(...gs(o.length),...o,...gs(s.length),...s)}return new Uint8Array(t)}function ys(e){return e instanceof Uint8Array?e:e instanceof ArrayBuffer?new Uint8Array(e):ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new TextEncoder().encode(String(e))}function Ym(e,n){let t=Array.from(e),a=r=>{for(;t.length<r;)t.push(0)},i=(r,o)=>{let s=In-t.length%In;if(s<zn+1)for(let m=0;m<s;m++)t.push(0);let c=new Uint8Array(zn+r.length),l=new DataView(c.buffer);l.setUint32(0,qm(Gm(r)),!0),l.setUint32(4,r.length,!0),c[6]=o,c.set(r,zn);for(let m=0;m<c.length;m++)t.push(c[m])};for(let r of n){let o=0,s=!0;for(;o<r.length;){let c=In-t.length%In;if(c<zn+1){for(let u=0;u<c;u++)t.push(0);c=In}let l=c-zn,m=Math.min(l,r.length-o),d=o+m===r.length,p=s&&d?1:s?2:d?4:3;i(r.subarray(o,o+m),p),o+=m,s=!1}}return new Uint8Array(t)}function vs(e,n){let a=re(e,0,!0).root.value,i=(r,o)=>{a[r]=o};if(n.pos){let[r,o,s]=n.pos,c=a.Pos,l=c&&c.t===9&&c.et===6?6:5;i("Pos",{t:9,et:l,v:[r,o,s].map(m=>({t:l,v:Number(m)}))})}if(n.health!==void 0){let r=a.Health,o=r&&(r.t===2||r.t===5)?r.t:5;i("Health",{t:o,v:Number(n.health)})}if(n.inventory){let r=n.inventory.map(o=>({t:10,v:{Name:{t:8,v:String(o.name||o.Name||"minecraft:stone")},Count:{t:1,v:Number(o.count||o.Count||1)},Damage:{t:2,v:Number(o.damage||o.Damage||0)},WasPickedUp:{t:1,v:0},Slot:{t:1,v:Number(o.slot??o.Slot??0)}}}));i("Inventory",{t:9,et:10,v:r})}return he({root:{type:10,name:"",value:a}},!0)}function ws(e,n,t,a,i){let o=re(e,0,!0).root.value,s=o.Inventory;if(!s||s.t!==9)throw new Error("\u73A9\u5BB6\u6570\u636E\u91CC\u6CA1\u6709\u80CC\u5305");let c=s.v[n];if(!c||c.t!==10)throw new Error("\u80CC\u5305\u69FD\u4F4D "+n+" \u4E0D\u662F\u7269\u54C1");let l=c.v.tag;if(!l||l.t!==10)throw new Error("\u8FD9\u672C\u4E66\u6CA1\u6709 NBT tag");let m={t:9,et:8,v:t.map(d=>({t:8,v:String(d)}))};return l.v.pages=m,a!=null&&a!==""&&(l.v.title={t:8,v:String(a)}),i!=null&&i!==""&&(l.v.author={t:8,v:String(i)}),he({root:{type:10,name:"",value:o}},!0)}function ks(e,n){let a=re(e,0,!0).root.value,i=a.Inventory;if(!i||i.t!==9)throw new Error("\u73A9\u5BB6\u6570\u636E\u91CC\u6CA1\u6709\u80CC\u5305");let r=i.v,o=r.map(s=>s.v.Slot?Number(s.v.Slot.v):0);for(let[s,c]of Object.entries(n)){let l=Number(s),m=Number(c);if(!r[l]||!Number.isFinite(m)||m<0)continue;let d=o[l];if(m===d)continue;let p=o.findIndex((u,b)=>b!==l&&u===m);p>=0&&(o[p]=d),o[l]=m}return r.forEach((s,c)=>{s.v.Slot?s.v.Slot.v=o[c]:s.v.Slot={t:1,v:o[c]}}),he({root:{type:10,name:"",value:a}},!0)}function ca(e,n,t,a){let i=e.filter(s=>/\.log$/i.test(s.name)).sort((s,c)=>s.name.localeCompare(c.name));if(!i.length)throw new Error("\u8FD9\u4E2A\u5B58\u6863\u6CA1\u6709 .log \u6587\u4EF6\uFF0C\u65E0\u6CD5\u5B89\u5168\u8FFD\u52A0\u5199\u5165");let r=i[i.length-1],o=Xm(a,[{key:n,value:t}]);return r.data=Ym(r.data,[o]),{logName:r.name,bytes:r.data}}function ki(e){let n=ve(re(e,0,!0)),t=Array.isArray(n.Inventory)?n.Inventory:[];return{pos:n.Pos?n.Pos.map(a=>Number(a)):null,health:n.Health!==void 0?Number(n.Health):null,inventory:t.map(a=>({name:String(a.Name||""),count:Number(a.Count??1),slot:Number(a.Slot??0),damage:Number(a.Damage??0)})),raw:n}}var ma={0:"End",1:"Byte",2:"Short",3:"Int",4:"Long",5:"Float",6:"Double",7:"ByteArray",8:"String",9:"List",10:"Compound",11:"IntArray",12:"LongArray"},Qm=Object.fromEntries(Object.entries(ma).map(([e,n])=>[n,Number(e)]));function ed(e){let n=Number(e);return Number.isNaN(n)?"NaN":n===1/0?"Infinity":n===-1/0?"-Infinity":n}function td(e,n){if(e==="NaN")return NaN;if(e==="Infinity")return 1/0;if(e==="-Infinity")return-1/0;let t=Number(e);if(!Number.isFinite(t))throw new Error(n+" \u4E0D\u662F\u6709\u6548\u6570\u5B57\uFF1A"+e);return t}function xs(e){let n=Qm[e];if(n===void 0)throw new Error("\u672A\u77E5 NBT \u7C7B\u578B\uFF1A"+e);return n}function xi(e){if(!e||typeof e.t!="number")throw new Error("NBT \u8282\u70B9\u7F3A\u5C11\u7C7B\u578B");let n=ma[e.t];if(!n)throw new Error("\u672A\u77E5 NBT \u7C7B\u578B\u7F16\u53F7\uFF1A"+e.t);if(e.t===10){let t={};for(let[a,i]of Object.entries(e.v||{}))t[a]=xi(i);return{type:n,value:t}}if(e.t===9){let t=ma[e.et]||ma[e.v&&e.v[0]&&e.v[0].t||0]||"End";return{type:n,element:t,value:(e.v||[]).map(xi)}}return e.t===7?{type:n,value:Array.from(e.v||[])}:e.t===11?{type:n,value:Array.from(e.v||[]).map(Number)}:e.t===12?{type:n,value:Array.from(e.v||[]).map(t=>String(t))}:e.t===4?{type:n,value:String(e.v)}:e.t===5||e.t===6?{type:n,value:ed(e.v)}:e.t===8?{type:n,value:String(e.v??"")}:{type:n,value:Number(e.v)}}function Si(e,n="value"){if(!e||typeof e!="object")throw new Error(n+" \u5FC5\u987B\u662F\u5BF9\u8C61");let t=xs(e.type),a=e.value;if(t===10){if(!a||typeof a!="object"||Array.isArray(a))throw new Error(n+" \u7684 Compound value \u5FC5\u987B\u662F\u5BF9\u8C61");let i={};for(let[r,o]of Object.entries(a))i[r]=Si(o,n+"."+r);return{t:10,v:i}}if(t===9){if(!Array.isArray(a))throw new Error(n+" \u7684 List value \u5FC5\u987B\u662F\u6570\u7EC4");return{t:9,et:xs(e.element||"End"),v:a.map((r,o)=>Si(r,n+"["+o+"]"))}}if(t===7){if(!Array.isArray(a))throw new Error(n+" \u7684 ByteArray value \u5FC5\u987B\u662F\u6570\u7EC4");return{t:7,v:a.map((i,r)=>{let o=Number(i);if(!Number.isInteger(o)||o<0||o>255)throw new Error(n+"["+r+"] \u5FC5\u987B\u662F 0~255 \u7684\u6574\u6570");return o})}}if(t===11){if(!Array.isArray(a))throw new Error(n+" \u7684 IntArray value \u5FC5\u987B\u662F\u6570\u7EC4");return{t:11,v:a.map((i,r)=>{let o=Number(i);if(!Number.isInteger(o)||o<-2147483648||o>2147483647)throw new Error(n+"["+r+"] \u5FC5\u987B\u662F 32 \u4F4D\u6574\u6570");return o})}}if(t===12){if(!Array.isArray(a))throw new Error(n+" \u7684 LongArray value \u5FC5\u987B\u662F\u6570\u7EC4");return{t:12,v:a.map((i,r)=>{try{return BigInt(String(i))}catch{throw new Error(n+"["+r+"] \u5FC5\u987B\u662F 64 \u4F4D\u6574\u6570")}})}}if(t===1){let i=Number(a);if(!Number.isInteger(i)||i<-128||i>127)throw new Error(n+" \u5FC5\u987B\u662F -128~127 \u7684 Byte");return{t:1,v:i}}if(t===2){let i=Number(a);if(!Number.isInteger(i)||i<-32768||i>32767)throw new Error(n+" \u5FC5\u987B\u662F -32768~32767 \u7684 Short");return{t:2,v:i}}if(t===3){let i=Number(a);if(!Number.isInteger(i)||i<-2147483648||i>2147483647)throw new Error(n+" \u5FC5\u987B\u662F 32 \u4F4D Int");return{t:3,v:i}}if(t===4)try{return{t:4,v:BigInt(String(a))}}catch{throw new Error(n+" \u5FC5\u987B\u662F 64 \u4F4D Long")}if(t===5||t===6){let i=td(a,n);return{t,v:i}}if(t===8){if(typeof a!="string")throw new Error(n+" \u5FC5\u987B\u662F\u5B57\u7B26\u4E32");return{t:8,v:a}}throw new Error(n+" \u7684\u7C7B\u578B "+e.type+" \u4E0D\u80FD\u76F4\u63A5\u5199\u5165")}function Ss(e){if(!e||!e.root)throw new Error("NBT \u7F3A\u5C11\u6839\u8282\u70B9");let n={t:e.root.type,v:e.root.value},t=xi(n),a={type:t.type,name:e.root.name||"",value:t.value};return t.element&&(a.element=t.element),JSON.stringify({root:a},null,2)+`
`}function Es(e){let n;try{n=JSON.parse(e)}catch(i){throw new Error("\u82F1\u6587\u4EE3\u7801\u4E0D\u662F\u6709\u6548 JSON\uFF1A"+i.message)}if(!n||!n.root)throw new Error("\u82F1\u6587\u4EE3\u7801\u7F3A\u5C11 root");let t=n.root,a=Si({type:t.type,value:t.value,element:t.element},"root");if(a.t!==10)throw new Error("root.type \u5FC5\u987B\u662F Compound");return{root:{type:a.t,name:String(t.name||""),value:a.v}}}function Bs(e){let n=[];for(let t=0;t<e.length;t+=16){let a=[];for(let i=0;i<16&&t+i<e.length;i++)a.push(e[t+i].toString(2).padStart(8,"0"));n.push(a.join(" "))}return n.join(`
`)}function Cs(e){let n=String(e).replace(/0b/gi,"").replace(/[^01]/g,"");if(!n.length||n.length%8!==0)throw new Error("\u4E8C\u8FDB\u5236\u5FC5\u987B\u662F\u6BCF\u5B57\u8282 8 \u4F4D\uFF0C\u4E14\u603B\u4F4D\u6570\u80FD\u88AB 8 \u6574\u9664");let t=[];for(let a=0;a<n.length;a+=8)t.push(parseInt(n.slice(a,a+8),2));return t}function Ms(e){let n=[];for(let t=0;t<e.length;t+=16)n.push(Array.from(e.subarray(t,t+16)).join(" "));return n.join(`
`)}function Is(e){let n=String(e).match(/-?\d+/g)||[];if(!n.length)throw new Error("\u5341\u8FDB\u5236\u89C6\u56FE\u6CA1\u6709\u6570\u5B57");return n.map((t,a)=>{let i=Number(t);if(!Number.isInteger(i)||i<0||i>255)throw new Error("\u7B2C "+(a+1)+" \u4E2A\u503C\u4E0D\u662F 0~255\uFF1A"+t);return i})}function zs(e){let n=[];for(let t=0;t<e.length;t+=16)n.push(Array.from(e.subarray(t,t+16)).map(a=>a.toString(16).padStart(2,"0")).join(" "));return n.join(`
`)}function $s(e){let n=String(e).replace(/0x/gi,"").replace(/\s+/g,"");if(!n.length||!/^[0-9a-fA-F]+$/.test(n)||n.length%2!==0)throw new Error("\u5341\u516D\u8FDB\u5236\u5FC5\u987B\u662F\u5076\u6570\u4F4D\uFF0C\u53EA\u80FD\u5305\u542B 0-9 / a-f");let t=[];for(let a=0;a<n.length;a+=2)t.push(parseInt(n.slice(a,a+2),16));return t}var x=e=>document.getElementById(e),h={archive:null,name:"",kind:"",selected:null,level:null,structure:null,stats:null},Ps=()=>new Promise(e=>setTimeout(e,30));function N(e){let n=x("log");n.textContent+=e+`
`,n.scrollTop=n.scrollHeight}function ae(e){return e==null?"-":Number(e).toLocaleString("zh-CN")}function ua(e){return Ke(e)}function nd(e){return Io(e)}function P(e){let n=x("banner");n.textContent="\u26A0 "+e,n.style.display="block"}function zi(){x("banner").style.display="none"}function fa(e){return e.arrayBuffer?e.arrayBuffer().then(n=>new Uint8Array(n)):new Promise((n,t)=>{let a=new FileReader;a.onload=()=>n(new Uint8Array(a.result)),a.onerror=()=>t(a.error||new Error("\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25")),a.readAsArrayBuffer(e)})}function ad(e){let n="";for(let a=0;a<e.length;a+=32768)n+=String.fromCharCode.apply(null,e.subarray(a,a+32768));return btoa(n)}function de(e){return e.split("/").pop()}function Yt(e){let n=de(e),t=n.lastIndexOf(".");return t<0?"":n.slice(t)}function Le(e,n){return new Promise(t=>{let a=x("modal"),i=x("modalBody");i.innerHTML="";let r=document.createElement("h3");r.textContent=e,i.appendChild(r);let o={};for(let d of n){let p=document.createElement("label");p.textContent=d.label,i.appendChild(p);let u=document.createElement("input");u.value=d.value??"",u.placeholder=d.placeholder||"",d.type&&(u.type=d.type),i.appendChild(u),o[d.key]=u}let s=document.createElement("div");s.className="modalbtns";let c=document.createElement("button");c.textContent="\u786E\u5B9A";let l=document.createElement("button");l.textContent="\u53D6\u6D88",l.className="ghost",s.appendChild(c),s.appendChild(l),i.appendChild(s),a.style.display="flex";let m=d=>{a.style.display="none",t(d)};c.onclick=()=>{let d={};for(let p in o)d[p]=o[p].value;m(d)},l.onclick=()=>m(null),setTimeout(()=>{let d=Object.values(o)[0];d&&d.focus()},50)})}async function Ds(e){zi(),h.name=e.name,h.selected=null,h.level=null,h.structure=null,h.stats=null,x("fileName").textContent=e.name+"\uFF08"+(e.size/1048576).toFixed(2)+" MB\uFF09",N("\u6253\u5F00\uFF1A"+e.name);try{let n=JSON.parse(localStorage.getItem("mcbeRecent")||"[]").filter(t=>t.name!==e.name);n.unshift({name:e.name,at:Date.now()}),localStorage.setItem("mcbeRecent",JSON.stringify(n.slice(0,20)))}catch{}try{let n=await fa(e),t=Vt(e.name,n);if(h.kind=t,x("typeBadge").textContent={zip:"\u538B\u7F29\u5305\uFF08.mcpack/.mcaddon/.mcworld\uFF09",brarchive:".brarchive",mcstructure:".mcstructure",nbt:"NBT \u6570\u636E",unknown:"\u672A\u77E5\u7C7B\u578B"}[t]||t,t==="mcstructure"){let a=function(i){let r=xn(i.type,i.x*31+i.z*17),o=Math.max(4,Math.floor(560/r.size)),s=Kt(i.type,i.x*31+i.z*17);x("modalBody").innerHTML="<h3>"+G(i.zh)+`\uFF08\u63A8\u6D4B\u5916\u5F62\uFF09</h3>
        <p class="muted">\u5750\u6807 `+i.x+", "+i.z+"\u3000\u4F30\u7B97 y\u2248"+i.y+"\u3000\u7FA4\u7CFB "+G(i.biome)+`</p>
        <canvas id="structCv" width="`+r.size*o+'" height="'+r.size*o+`" style="width:100%;max-width:560px;image-rendering:pixelated;border-radius:8px"></canvas>
        <p class="muted">\u5916\u5F62\u6309\u7ED3\u6784\u7C7B\u578B\u89C4\u5219\u7A0B\u5E8F\u751F\u6210\uFF08\u542B\u7834\u635F/\u671D\u5411\u968F\u673A\uFF09\uFF0C\u7528\u4E8E\u770B\u5E03\u5C40\uFF0C\u4E0D\u7B49\u4E8E\u771F\u5B9E\u6A21\u677F\u3002\u5B9D\u7BB1\u53C2\u8003\uFF1A`+s.map(m=>Ke(m.name)+"\xD7"+m.count).join("\u3001")+`</p>
        <div class="modalbtns"><button id="stClose" class="ghost">\u5173\u95ED</button></div>`,x("modal").style.display="flex";let c=document.getElementById("structCv"),l=c.getContext("2d");l.fillStyle="#0b0f15",l.fillRect(0,0,c.width,c.height);for(let m of r.blocks)l.fillStyle=Ge(m.block),l.fillRect(m.x*o,m.z*o,o,o);document.getElementById("stClose").onclick=()=>{x("modal").style.display="none"}};h.structure=gn(n),x("workspace").style.display="none",x("structureView").style.display="block",Tt();return}if(t==="brarchive"||t==="zip"){h.archive=$e.fromBytes(e.name,n),h.texIndex=null,h.texCache=new Map,h.texPending=new Set,h.texPacks=[],h.texLogged=!1,ha(t,""),h.archiveKind==="world"&&N("\u63D0\u793A\uFF1A\u4E16\u754C\u5B58\u6863\u53EF\u7EDF\u8BA1 / \u89C2\u770B\u5730\u5F62 / \u6539\u73A9\u5BB6\u6570\u636E\uFF1B\u5185\u5D4C\u6A21\u7EC4\u7684 json\u3001js\u3001.mcstructure \u90FD\u80FD\u76F4\u63A5\u6539\u3002");return}throw new Error("\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B\uFF1A"+e.name)}catch(n){console.error(n),P(n.message||String(n)),N("\u6253\u5F00\u5931\u8D25\uFF1A"+(n.message||n))}}async function id(e){zi();let n=[],t="brarchive";for(let a of e){let i=await fa(a);if(Vt(a.name,i)==="brarchive"){let r=Xn(i);for(let o of r.entries)n.push({path:o.name,data:o.data})}else if(Vt(a.name,i)==="zip"){let r=se(i);for(let o of r.entries)o.name.endsWith("/")||n.push({path:o.name,data:r.read(o)})}else n.push({path:a.name,data:i})}if(!n.length)return P("\u8FD9\u4E9B\u6587\u4EF6\u91CC\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u6761\u76EE");h.name=e.length+" \u4E2A\u6587\u4EF6\uFF08\u5408\u5E76\u6253\u5F00\uFF09",x("fileName").textContent=e.length+" \u4E2A\u6587\u4EF6\uFF08\u5408\u5E76\u6253\u5F00\uFF09",h.selected=null,h.level=null,h.structure=null,h.stats=null,h.statsDirty=!0,h.archive=new $e(t,n),h.texIndex=null,h.texCache=new Map,h.texPending=new Set,h.texPacks=[],h.texLogged=!1,ha(t,e.length+" \u4E2A\u6587\u4EF6\u5408\u5E76")}function ha(e,n){let t=rd(h.archive);h.archiveKind=t.kind,h.structurePath=null,h.expanded=new Set,h.texIndex=null;let a=ni(h.archive);a&&N("\u5DF2\u4ECE\u5305\u5185\u8BED\u8A00\u6587\u4EF6\u5EFA\u7ACB\u4E2D\u6587\u540D\u7D22\u5F15\uFF1A"+a+" \u6761"),x("structureView").style.display="none",x("workspace").style.display="block",od(t.kind),Ii(),Ii();let i={world:"\u4E16\u754C\u5B58\u6863\uFF08\u542B LevelDB \u4E0E\u5185\u5D4C\u9644\u52A0\u5305\uFF09",pack:"\u9644\u52A0\u5305\uFF08\u53EF\u7F16\u8F91\u6587\u4EF6\uFF09",other:"\u666E\u901A\u5F52\u6863\uFF08\u5408\u5E76 "+(n||"")+"\uFF09"}[t.kind];x("typeBadge").textContent=i,le();let r=Us();r&&Nt(r),N("\u5DF2\u8F7D\u5165\uFF1A"+h.archive.files.length+" \u4E2A\u6587\u4EF6\uFF0C\u8BC6\u522B\u4E3A "+i)}function rd(e){let n=e.paths(),t=n.some(i=>i==="level.dat")||n.some(i=>/^db\/(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/i.test(i))||n.some(i=>i==="CURRENT"),a=n.some(i=>/manifest\.json$/i.test(i))||n.some(i=>/^behavior_packs\//.test(i))||n.some(i=>/^resource_packs\//.test(i));return t?{kind:"world",hasPack:a}:a?{kind:"pack",hasPack:!0}:{kind:"other",hasPack:!1}}function od(e){let n=["btnStats","btnMap","btnPlayer"],t=["btnRename","btnDelete","btnNewFile","btnNewFolder"];for(let a of n)x(a).style.display=e==="world"?"":"none";for(let a of t)x(a).style.display=e==="pack"?"":"none";x("btnExport").textContent=e==="world"?"\u5BFC\u51FA\u5B58\u6863":"\u5BFC\u51FA / \u53E6\u5B58"}function Us(){if(!h.archive)return null;let e=h.archive.paths();return e.find(n=>n==="manifest.json")||e.find(n=>/behavior_packs|resource_packs/.test(n)&&n.endsWith("manifest.json"))||e.find(n=>n==="level.dat")||e[0]}function le(){let e=x("tree");if(e.innerHTML="",h.expanded||(h.expanded=new Set),h.filterQ){let i=h.filterQ.toLowerCase(),r=h.archive.files.filter(s=>s.path.toLowerCase().includes(i));r.slice(0,400).forEach(s=>{let c=document.createElement("div");c.className="node file",c.textContent=s.path+"  "+Xe(s.data.length),c.onclick=()=>Nt(s.path),x("tree").appendChild(c)});let o=document.createElement("div");o.className="node muted",o.textContent="\u641C\u7D22\u201C"+h.filterQ+"\u201D\uFF1A"+r.length+" \u4E2A\u7ED3\u679C\uFF08\u6700\u591A\u663E\u793A 400\uFF09",x("tree").appendChild(o);return}let n=h.archive.tree(),t=document.createDocumentFragment();for(let i of n){let r=i.depth?i.path.slice(0,i.path.lastIndexOf("/")):null;if(i.depth&&!h.expanded.has(r))continue;let o=document.createElement("div");o.className="node "+i.type+(h.selected===i.path?" active":""),o.style.paddingLeft=8+i.depth*14+"px";let s=i.type==="dir"&&h.expanded.has(i.path);o.textContent=(i.type==="dir"?s?"\u{1F4C2} ":"\u{1F4C1} ":"\u{1F4C4} ")+i.name+(i.type==="file"?"  "+Xe(i.size):""),o.onclick=()=>{if(i.type==="dir"){h.expanded.has(i.path)?h.expanded.delete(i.path):h.expanded.add(i.path),h.selected=i.path,le(),Rs(i.path);return}Nt(i.path)},t.appendChild(o)}e.appendChild(t);let a=x("tree");e.scrollTop===0&&(a.scrollTop=0)}function Xe(e){return e<1024?e+" B":(e/1024).toFixed(1)+" KB"}function Nt(e){if(/\.brarchive$/i.test(e)&&h.archive.get(e))return sd(e);h.selected=e,document.querySelectorAll("#tree .node").forEach(n=>n.classList.remove("active")),le(),h.archive.get(e)?pd(e):Rs(e)}function sd(e){try{let n=h.archive.getBytes(e),t=$e.fromBytes(e,n);h.parent=h.parent||{archive:h.archive,name:h.name,selected:h.selected},h.archive=t,h.name=de(e),h.selected=null,N("\u8FDB\u5165\u5185\u5D4C\u5F52\u6863\uFF1A"+e+"\uFF08"+t.files.length+" \u4E2A\u6761\u76EE\uFF09"),le();let a=Us();if(a&&Nt(a),!document.getElementById("btnUp")){let i=document.createElement("button");i.id="btnUp",i.textContent="\u8FD4\u56DE\u4E0A\u7EA7\u5305",i.className="ghost",i.onclick=ld,x("workspace").querySelector(".toolbar").appendChild(i)}document.getElementById("btnUp").style.display=""}catch(n){P(n.message)}}function ld(){h.parent&&(h.archive=h.parent.archive,h.name=h.parent.name,h.selected=h.parent.selected,h.parent=null,x("btnUp").style.display="none",le(),N("\u5DF2\u8FD4\u56DE\u4E0A\u7EA7\u5305"))}function Rs(e){let n=x("editor");n.innerHTML="";let t=e+"/",a=h.archive.files.filter(c=>c.path.startsWith(t)),i=a.reduce((c,l)=>c+l.data.length,0),r=document.createElement("div");r.className="edhead",r.innerHTML=`<div><b>\u{1F4C1} ${G(e)}</b><span class="muted">\u3000${a.length} \u4E2A\u6587\u4EF6\uFF0C\u5171 ${Xe(i)}</span></div>`,n.appendChild(r);let o=document.createElement("p");o.className="muted",o.textContent="\u8FD9\u662F\u6587\u4EF6\u5939\u3002\u53EF\u4EE5\u7528\u4E0A\u65B9\u201C\u91CD\u547D\u540D\u201D\u6539\u6587\u4EF6\u5939\u540D\uFF08\u4F1A\u8FDE\u540C\u5185\u90E8\u6240\u6709\u6587\u4EF6\u4E00\u8D77\u6539\u8DEF\u5F84\uFF09\uFF0C\u4E5F\u53EF\u4EE5\u201C\u5220\u9664\u201D\u6574\u4E2A\u6587\u4EF6\u5939\u3002",n.appendChild(o);let s=document.createElement("pre");s.className="list",s.textContent=a.slice(0,200).map(c=>c.path.slice(t.length)).join(`
`),n.appendChild(s)}function cd(e){return/(^|\/)db\/(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/i.test(e)}function Ts(e,n){return e[n]|e[n+1]<<8|e[n+2]<<16|e[n+3]<<24}function pa(e){let n=e.keyBytes||new Uint8Array(0),t=e.key;if(t==="~local_player")return"\u73A9\u5BB6\u6570\u636E ~local_player";let a=Ts(n,0),i=Ts(n,4);if(n.length===10&&n[8]===47){let o=n[9]>127?n[9]-256:n[9];return"\u5B50\u533A\u5757 ("+a+","+i+") y="+o}if(n.length===9&&n[8]===43)return"\u533A\u5757 ("+a+","+i+")";if(n.length===9&&n[8]===49)return"\u65B9\u5757\u5B9E\u4F53\u7D22\u5F15 ("+a+","+i+")";if(n.length===9&&n[8]===119)return"\u5B9E\u4F53\u7D22\u5F15 ("+a+","+i+")";if(n.length===9)return"\u533A\u5757\u9644\u5C5E 0x"+n[8].toString(16)+" ("+a+","+i+")";if(/^[\x20-\x7e]+$/.test(t)&&t.length<60)return t;let r="";for(let o=0;o<Math.min(n.length,16);o++)r+=n[o].toString(16).padStart(2,"0")+" ";return"\u4E8C\u8FDB\u5236\u952E "+r.trim()}function md(e){if(!e||!e.length)return"\uFF08\u7A7A\u503C\uFF09";if(e[0]===10||e[0]===8||e[0]===9||e[0]===7)try{let t=re(e,0,!0),a=JSON.stringify(ve(t),null,1);if(a)return a.length>1600?a.slice(0,1600)+" \u2026":a}catch{}let n="";for(let t=0;t<Math.min(e.length,64);t++)n+=e[t].toString(16).padStart(2,"0")+(t%16===15?`
`:" ");return n.trim()+(e.length>64?`
\u2026 \u5171 `+e.length+" \u5B57\u8282":"")}async function dd(e){N("\u6B63\u5728\u8BFB\u53D6 LevelDB\uFF08"+e+"\uFF09\u2026");let n=await ot();if(!n.length)return P("\u6CA1\u6709\u627E\u5230 LevelDB \u6587\u4EF6");try{let c=function(d){let p=xn(d.type,d.x*31+d.z*17),u=Math.max(4,Math.floor(560/p.size)),b=Kt(d.type,d.x*31+d.z*17);x("modalBody").innerHTML="<h3>"+G(d.zh)+`\uFF08\u63A8\u6D4B\u5916\u5F62\uFF09</h3>
        <p class="muted">\u5750\u6807 `+d.x+", "+d.z+"\u3000\u4F30\u7B97 y\u2248"+d.y+"\u3000\u7FA4\u7CFB "+G(d.biome)+`</p>
        <canvas id="structCv" width="`+p.size*u+'" height="'+p.size*u+`" style="width:100%;max-width:560px;image-rendering:pixelated;border-radius:8px"></canvas>
        <p class="muted">\u5916\u5F62\u6309\u7ED3\u6784\u7C7B\u578B\u89C4\u5219\u7A0B\u5E8F\u751F\u6210\uFF08\u542B\u7834\u635F/\u671D\u5411\u968F\u673A\uFF09\uFF0C\u7528\u4E8E\u770B\u5E03\u5C40\uFF0C\u4E0D\u7B49\u4E8E\u771F\u5B9E\u6A21\u677F\u3002\u5B9D\u7BB1\u53C2\u8003\uFF1A`+b.map(_=>Ke(_.name)+"\xD7"+_.count).join("\u3001")+`</p>
        <div class="modalbtns"><button id="stClose" class="ghost">\u5173\u95ED</button></div>`,x("modal").style.display="flex";let g=document.getElementById("structCv"),f=g.getContext("2d");f.fillStyle="#0b0f15",f.fillRect(0,0,g.width,g.height);for(let _ of p.blocks)f.fillStyle=Ge(_.block),f.fillRect(_.x*u,_.z*u,u,u);document.getElementById("stClose").onclick=()=>{x("modal").style.display="none"}},t=h.db||await window.MCBE.readLevelDb(n,{});h.db=t;let a=[],i=new Set,r=0,o=0,s=0;for(let[d,p]of t){let u=p.keyBytes||new Uint8Array(0),b=u.length===10&&u[8]===47;b?r++:u.length===9&&u[8]===43?i.add(u[0]+","+u[1]+","+u[2]+","+u[3]+"|"+u[4]+","+u[5]+","+u[6]+","+u[7]):s++,d==="~local_player"&&o++,a.push({key:d,keyBytes:u,value:p.value,isSub:b,tag:p.tag})}h.dbRows=a,x("workspace").style.display="none",x("structureView").style.display="block",x("structureView").innerHTML=`
      <div class="edbar"><button id="dbBack" class="ghost">\u8FD4\u56DE\u6587\u4EF6\u5217\u8868</button><span class="muted">${G(e)}</span></div>
      <h3>LevelDB \u67E5\u770B\u5668</h3>
      <p class="muted">\u5171 ${ae(a.length)} \u4E2A\u952E\u3000\u533A\u5757 ${ae(i.size)}\u3000\u5B50\u533A\u5757 ${ae(r)}\u3000\u5176\u4ED6 ${ae(s)}\u3000\u73A9\u5BB6 ${ae(o)}</p>
      <input id="dbSearch" class="" placeholder="\u641C\u7D22\u952E\u540D / \u5750\u6807\uFF0C\u4F8B\u5982 local_player \u6216 80,-100" style="width:100%;background:#0d1219;border:1px solid #232c3a;border-radius:9px;color:#dfe4ee;padding:10px;font-size:13px;margin:6px 0 10px">
      <div id="dbList" class="dblist"></div>
      <div id="dbDetail" class="dbdetail muted">\u70B9\u4E0A\u9762\u4EFB\u610F\u4E00\u6761\u67E5\u770B\u5185\u5BB9</div>`;let l=document.getElementById("dbBack");l.onclick=()=>{x("structureView").style.display="none",x("workspace").style.display="block"};let m=d=>{let p=document.getElementById("dbList"),u=d?a.filter(b=>pa(b).includes(d)||b.key.includes(d)):a.slice(0,300);p.innerHTML=u.slice(0,300).map((b,g)=>`<div class="dbrow" data-i="${a.indexOf(b)}"><b>${G(pa(b))}</b><span class="muted">\u3000${Xe(b.value?b.value.length:0)}</span></div>`).join("")||'<p class="muted">\u6CA1\u6709\u5339\u914D\u7684\u952E</p>',p.querySelectorAll(".dbrow").forEach(b=>{b.onclick=()=>ud(a[+b.dataset.i])})};document.getElementById("dbSearch").oninput=d=>m(d.target.value.trim()),m(""),N("\u5DF2\u8F7D\u5165 "+ae(a.length)+" \u4E2A\u952E\uFF08\u5217\u8868\u6700\u591A\u663E\u793A 300 \u6761\uFF0C\u53EF\u7528\u641C\u7D22\uFF09")}catch(t){P("LevelDB \u8BFB\u53D6\u5931\u8D25\uFF1A"+t.message)}}function ud(e){let n=document.getElementById("dbDetail"),t=G(md(e.value));n.className="dbdetail",n.innerHTML=`<div class="edhead"><b>${G(pa(e))}</b><span class="muted">${Xe(e.value.length)}</span></div>
    <pre class="dbpre">${t}</pre>
    <div class="edbar"><button id="dbExport">\u5BFC\u51FA\u8FD9\u4E2A\u503C</button></div>`,document.getElementById("dbExport").onclick=()=>{let a="db_"+pa(e).replace(/[^0-9A-Za-z\u4e00-\u9fa5]+/g,"_").slice(0,40)+".bin";we(a,e.value)}}function pd(e){let n=x("editor");n.innerHTML="";let t=h.archive.getBytes(e),a=document.createElement("div");if(a.className="edhead",a.innerHTML=`<div><b>${G(e)}</b><span class="muted">\u3000${Xe(t.length)}</span></div>`,n.appendChild(a),/^\.?mcstructure$/.test(Yt(e).toLowerCase()))try{let r=function(o){let s=xn(o.type,o.x*31+o.z*17),c=Math.max(4,Math.floor(560/s.size)),l=Kt(o.type,o.x*31+o.z*17);x("modalBody").innerHTML="<h3>"+G(o.zh)+`\uFF08\u63A8\u6D4B\u5916\u5F62\uFF09</h3>
        <p class="muted">\u5750\u6807 `+o.x+", "+o.z+"\u3000\u4F30\u7B97 y\u2248"+o.y+"\u3000\u7FA4\u7CFB "+G(o.biome)+`</p>
        <canvas id="structCv" width="`+s.size*c+'" height="'+s.size*c+`" style="width:100%;max-width:560px;image-rendering:pixelated;border-radius:8px"></canvas>
        <p class="muted">\u5916\u5F62\u6309\u7ED3\u6784\u7C7B\u578B\u89C4\u5219\u7A0B\u5E8F\u751F\u6210\uFF08\u542B\u7834\u635F/\u671D\u5411\u968F\u673A\uFF09\uFF0C\u7528\u4E8E\u770B\u5E03\u5C40\uFF0C\u4E0D\u7B49\u4E8E\u771F\u5B9E\u6A21\u677F\u3002\u5B9D\u7BB1\u53C2\u8003\uFF1A`+l.map(p=>Ke(p.name)+"\xD7"+p.count).join("\u3001")+`</p>
        <div class="modalbtns"><button id="stClose" class="ghost">\u5173\u95ED</button></div>`,x("modal").style.display="flex";let m=document.getElementById("structCv"),d=m.getContext("2d");d.fillStyle="#0b0f15",d.fillRect(0,0,m.width,m.height);for(let p of s.blocks)d.fillStyle=Ge(p.block),d.fillRect(p.x*c,p.z*c,c,c);document.getElementById("stClose").onclick=()=>{x("modal").style.display="none"}},i=gn(t);h.structure=i,h.structurePath=e,x("workspace").style.display="none",x("structureView").style.display="block",Tt(),N("\u5DF2\u6253\u5F00\u7ED3\u6784\uFF1A"+e+"\uFF08"+i.size.join("\xD7")+"\uFF09");return}catch(i){N("\u7ED3\u6784\u89E3\u6790\u5931\u8D25\uFF1A"+i.message)}if(cd(e)&&h.archiveKind==="world"){dd(e);return}if(/\.nbt$/i.test(e)){Os(e);return}if(de(e).toLowerCase()==="level.dat")try{let i=Ga(t);h.level={nbt:i.nbt,original:t,fields:oo(i.plain)},n.appendChild(fd());return}catch(i){N("level.dat \u89E3\u6790\u5931\u8D25\uFF1A"+i.message)}if(Yn(e,t)){let i=h.archive.getText(e),r=600*1024,o=i.length>r;o&&N("\u6587\u4EF6\u8F83\u5927\uFF08"+Xe(t.length)+"\uFF09\uFF0C\u53EA\u8F7D\u5165\u524D 600KB \u9884\u89C8\uFF0C\u907F\u514D\u5361\u987F");let s=Ks(e,o?i.slice(0,r):i,o),c=s.ta;n.appendChild(s.wrap);let l=document.createElement("div");l.className="edbar";let m=document.createElement("button");m.textContent="\u4FDD\u5B58\u4FEE\u6539";let d=document.createElement("button");d.textContent="\u4E0B\u8F7D\u6B64\u6587\u4EF6",d.className="ghost",m.onclick=()=>{if(o&&c.value===i.slice(0,r))return P("\u8FD9\u662F\u622A\u65AD\u9884\u89C8\uFF0C\u672A\u6539\u52A8\u5185\u5BB9\uFF0C\u4E0D\u4FDD\u5B58\u4EE5\u514D\u622A\u6389\u540E\u534A\u90E8\u5206");h.archive.setBytes(e,new TextEncoder().encode(c.value)),h.statsDirty=!0;let p=a.querySelector(".muted");p&&(p.textContent="\u3000"+Xe(new TextEncoder().encode(c.value).length)),N("\u5DF2\u4FDD\u5B58\uFF1A"+e+"\uFF08\u8BB0\u5F97\u70B9\u53F3\u4E0A\u89D2\u201C\u5BFC\u51FA/\u53E6\u5B58\u201D\u751F\u6210\u65B0\u5305\uFF09"),le()},d.onclick=()=>da(e),l.appendChild(m),l.appendChild(d),n.appendChild(l)}else if(/^(\.png|\.jpe?g|\.gif|\.webp|\.bmp)$/i.test(Yt(e))){let i=document.createElement("div");i.className="imgview";let r=document.createElement("img");r.className="pixelimg",r.style.maxHeight="320px";let o=document.createElement("p");o.className="muted",o.textContent="\u8BFB\u53D6\u56FE\u7247\u2026",r.onload=()=>{o.textContent="\u5C3A\u5BF8 "+r.naturalWidth+"\xD7"+r.naturalHeight+"\u3000\u683C\u5F0F "+Yt(e).slice(1).toUpperCase()+"\u3000\u5927\u5C0F "+Xe(t.length)+"\u3000\u70B9\u201C\u653E\u5927\u201D\u770B\u50CF\u7D20\u7EC6\u8282"},r.onerror=()=>{o.textContent="\u8FD9\u5F20\u56FE\u6D4F\u89C8\u5668\u65E0\u6CD5\u76F4\u63A5\u6E32\u67D3\uFF08\u53EF\u80FD\u662F\u635F\u574F\u6587\u4EF6\u6216\u4E0D\u652F\u6301\u7684\u5B50\u683C\u5F0F\uFF09\uFF0C\u53EF\u4E0B\u8F7D\u540E\u7528\u5176\u5B83\u5DE5\u5177\u6253\u5F00"},r.src=Ns(e,t),i.appendChild(r),i.appendChild(o),n.appendChild(i);let s=document.createElement("div");s.className="edbar";let c=1,l=document.createElement("button");l.textContent="\u653E\u5927 \xD72",l.className="ghost",l.onclick=()=>{c=c>=8?1:c*2,r.style.width=r.naturalWidth*c+"px",r.style.maxWidth="none",l.textContent=c===1?"\u653E\u5927 \xD72":"\u8FD8\u539F \xD71".replace("\xD71","\xD71\uFF08\u5F53\u524D \xD7"+c+"\uFF09")};let m=document.createElement("button");m.textContent="\u4E0B\u8F7D\u6B64\u6587\u4EF6",m.onclick=()=>da(e);let d=document.createElement("button");d.textContent="\u7528\u672C\u5730\u6587\u4EF6\u66FF\u6362",d.className="ghost",d.onclick=()=>Ei(e),s.appendChild(l),s.appendChild(m),s.appendChild(d),n.appendChild(s);let p=document.createElement("p");p.className="muted",p.textContent="\u8FD9\u662F\u53EA\u8BFB\u9884\u89C8\uFF1A\u6539\u56FE\u8BF7\u5148\u4E0B\u8F7D\uFF0C\u6216\u70B9\u201C\u7528\u672C\u5730\u6587\u4EF6\u66FF\u6362\u201D\u5BFC\u5165\u540C\u540D\u6587\u4EF6\uFF0C\u518D\u5BFC\u51FA\u65B0\u5305\u3002",n.appendChild(p)}else if(/.(png|jpg|jpeg|gif|webp|bmp)$/i.test(e)){let i=document.createElement("img");i.src=Ns(e,h.archive.getBytes(e)),i.style.maxWidth="100%",i.style.borderRadius="8px",n.appendChild(i);let r=document.createElement("p");r.className="muted",r.textContent="\u56FE\u7247\u53EA\u8BFB\u9884\u89C8\uFF0C\u53EF\u7528\u201C\u7528\u672C\u5730\u6587\u4EF6\u66FF\u6362\u201D\u6362\u56FE\u540E\u518D\u5BFC\u51FA\u3002",n.appendChild(r);let o=document.createElement("div");o.className="edbar";let s=document.createElement("button");s.textContent="\u4E0B\u8F7D\u6B64\u6587\u4EF6",s.onclick=()=>da(e);let c=document.createElement("button");c.textContent="\u7528\u672C\u5730\u6587\u4EF6\u66FF\u6362",c.className="ghost",c.onclick=()=>Ei(e),o.appendChild(s),o.appendChild(c),n.appendChild(o)}else{let i=document.createElement("p");i.className="muted",i.textContent="\u4E8C\u8FDB\u5236\u6587\u4EF6\uFF0C\u65E0\u6CD5\u76F4\u63A5\u7F16\u8F91\u3002\u53EF\u4EE5\u4E0B\u8F7D\u51FA\u6765\u7528\u5176\u5B83\u5DE5\u5177\u5904\u7406\uFF0C\u6216\u7528\u201C\u5220\u9664\u201D\u540E\u91CD\u65B0\u5BFC\u5165\u540C\u540D\u6587\u4EF6\u3002",n.appendChild(i);let r=document.createElement("div");r.className="edbar";let o=document.createElement("button");o.textContent="\u4E0B\u8F7D\u6B64\u6587\u4EF6",o.onclick=()=>da(e);let s=document.createElement("button");s.textContent="\u7528\u672C\u5730\u6587\u4EF6\u66FF\u6362",s.className="ghost",s.onclick=()=>Ei(e),r.appendChild(o),r.appendChild(s),n.appendChild(r)}}function Ns(e,n){let t={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",bmp:"image/bmp"}[Yt(e).slice(1).toLowerCase()]||"application/octet-stream",a="",i=32768;for(let r=0;r<n.length;r+=i)a+=String.fromCharCode.apply(null,n.subarray(r,r+i));return"data:"+t+";base64,"+btoa(a)}function G(e){return String(e).replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}function fd(){let e=h.level.fields,n=document.createElement("div");return n.className="form",n.innerHTML=`
    <h3>\u5B58\u6863\u8BBE\u7F6E\uFF08level.dat\uFF09</h3>
    <label>\u4E16\u754C\u540D\u79F0</label><input id="lvName" value="${G(e.levelName)}">
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
    <div class="edbar"><button id="lvFullNbt" class="ghost">\u5B8C\u6574 NBT \u7F16\u8F91\uFF08\u5929\u6570 / \u672A\u7761\u89C9\u8BA1\u6570 / \u5168\u90E8\u5B57\u6BB5\uFF09</button>${h.archive.get("level.dat.bak")?'<button id="lvRestore" class="ghost">\u8FD8\u539F level.dat \u5907\u4EFD</button>':""}</div>
    <label>\u79CD\u5B50\uFF08\u6539\u5B8C\u4E0D\u4F1A\u91CD\u5EFA\u5730\u5F62\uFF0C\u53EA\u6539\u5143\u6570\u636E\uFF09</label><input id="lvSeed" value="${G(e.seed)}">
    <div class="edbar"><button id="lvSave">\u4FDD\u5B58\u5230\u5B58\u6863</button></div>
    <p class="muted">\u4FDD\u5B58\u540E\u4F1A\u5199\u56DE\u538B\u7F29\u5305\u5185\u7684 level.dat\uFF1B\u70B9\u201C\u5BFC\u51FA/\u53E6\u5B58\u201D\u624D\u4F1A\u751F\u6210\u65B0\u7684 .mcworld / .mctemplate\u3002</p>`,setTimeout(()=>{if(!n.querySelector("#lvMode"))return;document.getElementById("lvMode").value=String(e.gameType),document.getElementById("lvDiff").value=String(e.difficulty),document.getElementById("lvFullNbt").onclick=()=>Os("level.dat");let t=document.getElementById("lvRestore");t&&(t.onclick=()=>{h.archive.setBytes("level.dat",h.archive.getBytes("level.dat.bak")),h.statsDirty=!0,N("\u5DF2\u4ECE level.dat.bak \u8FD8\u539F"),Nt("level.dat")}),document.getElementById("lvSave").onclick=()=>{let a={levelName:document.getElementById("lvName").value,gameType:Number(document.getElementById("lvMode").value),difficulty:Number(document.getElementById("lvDiff").value),hardcore:document.getElementById("lvHard").checked,cheats:document.getElementById("lvCheat").checked,keepInventory:document.getElementById("lvKeep").checked,spawnX:Number(document.getElementById("lvSx").value),spawnY:Number(document.getElementById("lvSy").value),spawnZ:Number(document.getElementById("lvSz").value),time:(()=>{let i=Number(document.getElementById("lvTime").value)||0,r=Number(document.getElementById("lvDays").value);return Number.isFinite(r)&&r!==Math.floor(i/24e3)?r*24e3+i%24e3:i})(),seed:document.getElementById("lvSeed").value};try{h.archive.get("level.dat.bak")||h.archive.setBytes("level.dat.bak",h.level.original);let i=so(h.level.nbt,a),r=qa(h.level.original,i);h.archive.setBytes("level.dat",r),h.statsDirty=!0,N("\u5DF2\u66F4\u65B0 level.dat\uFF08\u539F\u6587\u4EF6\u5DF2\u5B58\u4E3A level.dat.bak\uFF09"),le()}catch(i){P(i.message)}}},0),n}var Fs={1:"Byte",2:"Short",3:"Int",4:"Long",5:"Float",6:"Double",7:"ByteArray",8:"String",9:"List",10:"Compound",11:"IntArray",12:"LongArray"};function hd(e){try{return{res:re(e,0,!0),little:!0}}catch{return{res:re(e,0,!1),little:!1}}}function Os(e){let n;try{n=h.archive.getBytes(e)}catch(r){return P(r.message)}let t;try{de(e).toLowerCase()==="level.dat"?t={res:Wt(n,!0),little:!0}:t=hd(n)}catch(r){return P("NBT \u89E3\u6790\u5931\u8D25\uFF1A"+r.message)}h.nbtEdit={res:t.res,little:t.little,path:e,original:n},x("workspace").style.display="none",x("structureView").style.display="block",x("structureView").innerHTML=`
    <div class="edbar"><button id="nbtBack" class="ghost">\u8FD4\u56DE\u6587\u4EF6\u5217\u8868</button><span class="muted">${G(e)}</span></div>
    <h3>NBT \u7F16\u8F91\u5668</h3>
    <p class="muted">\u6839\u6807\u7B7E\uFF1ACompound\uFF08${Object.keys(t.res.root.value||{}).length} \u4E2A\u952E\uFF09\u3000\u5B57\u8282\u5E8F\uFF1A${t.little?"\u5C0F\u7AEF":"\u5927\u7AEF"}\u3000\u6539\u5B8C\u70B9\u4FDD\u5B58\u5199\u56DE\u6587\u4EF6\u3002</p>
    <div id="nbtRoot" class="nbtree"></div>
    <h3>\u65B0\u589E\u6807\u7B7E</h3>
    <div class="form">
      <input id="nbtNewName" placeholder="\u952E\u540D\uFF0C\u4F8B\u5982 Time">
      <div class="row2"><select id="nbtNewType">${Object.entries(Fs).filter(([r])=>+r<=8).map(([r,o])=>`<option value="${r}">${o}</option>`).join("")}</select>
      <input id="nbtNewVal" placeholder="\u503C\uFF0C\u4F8B\u5982 24000"></div>
      <div class="edbar"><button id="nbtAdd">\u6DFB\u52A0</button></div>
    </div>
    <div class="edbar"><button id="nbtSave">\u4FDD\u5B58\u5E76\u5199\u56DE</button><button id="nbtExport" class="ghost">\u5BFC\u51FA .nbt</button><button id="nbtExportJson" class="ghost">\u5BFC\u51FA JSON</button></div>`;let a=document.getElementById("nbtRoot"),i=()=>{a.innerHTML="";for(let[r,o]of Object.entries(h.nbtEdit.res.root.value||{}))a.appendChild(Bi(r,o,()=>{delete h.nbtEdit.res.root.value[r],i()}))};h.nbtRedraw=i,i(),document.getElementById("nbtBack").onclick=()=>{x("structureView").style.display="none",x("workspace").style.display="block"},document.getElementById("nbtAdd").onclick=()=>{let r=document.getElementById("nbtNewName").value.trim(),o=Number(document.getElementById("nbtNewType").value),s=document.getElementById("nbtNewVal").value;if(!r)return P("\u952E\u540D\u4E0D\u80FD\u4E3A\u7A7A");h.nbtEdit.res.root.value[r]={t:o,v:Hs(o,s)},i(),N("\u5DF2\u6DFB\u52A0\u6807\u7B7E "+r)},document.getElementById("nbtSave").onclick=()=>{try{let r=e==="level.dat"?qa(h.nbtEdit.original,h.nbtEdit.res):he(h.nbtEdit.res,h.nbtEdit.little);h.archive.setBytes(e,r),N("\u5DF2\u5199\u56DE\uFF1A"+e+"\uFF08"+r.length+" \u5B57\u8282\uFF09")}catch(r){P("\u4FDD\u5B58\u5931\u8D25\uFF1A"+r.message)}},document.getElementById("nbtExportJson").onclick=async()=>{let r=JSON.stringify(ve(h.nbtEdit.res),null,2);await we(de(e)+".json",new TextEncoder().encode(r))},document.getElementById("nbtExport").onclick=async()=>{await we(de(e)==="level.dat"?"level.nbt":de(e),he(h.nbtEdit.res,h.nbtEdit.little))},N("\u5DF2\u6253\u5F00 NBT\uFF1A"+e)}function Hs(e,n){if(e===8)return String(n);let t=Number(n);if(!Number.isFinite(t))throw new Error("\u4E0D\u662F\u5408\u6CD5\u6570\u5B57\uFF1A"+n);return e===1?t<<24>>24:e===2?t<<16>>16:e===3?t|0:t}function Bi(e,n,t){let a=document.createElement("div");a.className="nbtr";let i=document.createElement("div");if(i.className="nbtk",i.innerHTML=`<b>${G(e)}</b><span class="muted">${Fs[n.t]||"?"}</span><button class="nbtdel ghost">\u5220</button>`,i.querySelector(".nbtdel").onclick=r=>{r.stopPropagation(),t&&t()},a.appendChild(i),n.t===10){let r=document.createElement("div");r.className="nbtkids";for(let[o,s]of Object.entries(n.v||{}))r.appendChild(Bi(o,s,()=>{delete n.v[o],a.remove()}));a.appendChild(r)}else if(n.t===9){let r=document.createElement("div");r.className="nbtkids",(n.v||[]).forEach((o,s)=>r.appendChild(Bi("["+s+"]",o,()=>{n.v.splice(s,1),h.nbtRedraw&&h.nbtRedraw()}))),a.appendChild(r)}else if(n.t===7||n.t===11||n.t===12){let r=document.createElement("input");r.className="nbtv",r.value=Array.from(n.v||[]).join(","),r.onchange=()=>{let o=r.value.split(",").map(s=>Number(s.trim())).filter(s=>Number.isFinite(s));n.v=n.t===7?new Uint8Array(o):o,N("\u5DF2\u4FEE\u6539 "+e)},a.appendChild(r)}else{let r=document.createElement("input");r.className="nbtv",r.type=n.t===8?"text":"number",r.value=String(n.v??""),r.onchange=()=>{try{n.v=Hs(n.t,r.value),N("\u5DF2\u4FEE\u6539 "+e+" = "+n.v)}catch(o){P(o.message)}},a.appendChild(r)}return a}function $i(e){let n=String(e).replace(/^\uFEFF/,"");return n=n.replace(/\/\*[\s\S]*?\*\//g,""),n=n.replace(/^\s*\/\/.*$/gm,""),n=n.replace(/,\s*([}\]])/g,"$1"),JSON.parse(n)}function Zs(){if(h.texIndex)return h.texIndex;let e=new Map,n=(t,a)=>{try{let i=t.paths(),r=i.filter(o=>o.toLowerCase().endsWith(".png"));for(let o of i)if(/terrain_texture\.json$/i.test(o))try{let s=$i(t.getText(o)),l=o.slice(0,o.lastIndexOf("/")).replace(/\/textures$/,"");for(let[m,d]of Object.entries(s.texture_data||{})){let p=Array.isArray(d.textures)?d.textures[0]:d.textures;if(p&&typeof p=="object"&&(p=p.path||p.texture),typeof p!="string")continue;let u=p.replace(/^textures\//,"").replace(/\.png$/,""),b=(l+"/textures/"+u+".png").toLowerCase(),g=r.find(f=>f.toLowerCase()===b)||r.find(f=>f.toLowerCase().endsWith("/textures/"+u.toLowerCase()+".png"));if(g)for(let f of[m,"minecraft:"+m])!a&&e.has(f)||e.set(f,{src:t,path:g})}N("\u6750\u8D28\u6E05\u5355 "+o+"\uFF1A"+Object.keys(s.texture_data||{}).length+" \u6761")}catch(s){N("\u6750\u8D28\u6E05\u5355\u89E3\u6790\u5931\u8D25 "+o+"\uFF1A"+s.message)}}catch{}};h.archive&&n(h.archive,!1);for(let t of h.texPacks||[])n(t,!1);return h.texIndex=e,e}function Ls(e){if(!e)return null;let n=Zs(),t=n.get(e)||n.get("minecraft:"+e);if(!t)return null;let a=(t.src===h.archive?"":"ext:")+t.path;if(h.texCache&&h.texCache.has(a))return h.texCache.get(a);if(h.texCache||(h.texCache=new Map),h.texPending||(h.texPending=new Set),h.texPending.has(a))return null;h.texPending.add(a);try{let i=t.src.getBytes(t.path),r=URL.createObjectURL(new Blob([i],{type:"image/png"})),o=new Image;o.onload=()=>{h.texCache.set(a,o),h.texPending.delete(a),h.stEdit&&h.stEdit.redraw&&h.stEdit.redraw()},o.onerror=()=>{h.texPending.delete(a)},o.src=r}catch{h.texPending.delete(a)}return null}function As(e){if(!e)return null;let n=0;for(let t=0;t<e.length;t++)n=(n*31+e.charCodeAt(t))%360;return"hsl("+n+",48%,48%)"}var gt=4096,_d={visual:"\u5207\u7247",binary:"\u4E8C\u8FDB\u5236",decimal:"\u5341\u8FDB\u5236",hex:"\u5341\u516D\u8FDB\u5236",code:"\u82F1\u6587\u4EE3\u7801"};function Ti(e){return`<div class="edbar stmodebar">${["visual","binary","decimal","hex","code"].map(t=>`<button data-stmode="${t}" class="${t===e?"primary":"ghost"}">${_d[t]}</button>`).join("")}<span class="muted">\u540C\u4E00\u4EFD .mcstructure\uFF0C\u5207\u6362\u89C6\u56FE\u4E0D\u4F1A\u4E22\u6570\u636E</span></div>`}function Ni(){document.querySelectorAll("#structureView [data-stmode]").forEach(e=>{e.onclick=()=>{let n=e.dataset.stmode;n==="visual"?Tt():n==="code"?Js():Ci(n,0)}})}function Ws(){return`<button id="stModeBack" class="ghost">\u8FD4\u56DE\u6587\u4EF6\u5217\u8868</button><span class="muted">${h.structurePath?G(h.structurePath):h.name||"\u72EC\u7ACB\u7ED3\u6784\u6587\u4EF6"}</span>`}function Vs(){let e=document.getElementById("stModeBack");e&&(e.onclick=()=>{x("structureView").style.display="none",h.archive&&(x("workspace").style.display="block")})}function Ci(e,n=0){let t=h.structure;if(!t)return P("\u8FD8\u6CA1\u6709\u6253\u5F00 .mcstructure");e=["binary","decimal","hex"].includes(e)?e:"decimal";let a=nt(t),i=a.length,r=i?Math.floor((i-1)/gt)*gt:0,o=Math.max(0,Math.min(r,Math.floor(n/gt)*gt)),s=Math.min(i,o+gt),c=a.subarray(o,s),l=e==="binary"?Bs(c):e==="decimal"?Ms(c):zs(c),m=e==="binary"?"\u4F4D\uFF08\u6BCF\u5B57\u8282 8 \u4F4D\uFF09":e==="decimal"?"\u5341\u8FDB\u5236\u5B57\u8282\uFF080~255\uFF09":"\u5341\u516D\u8FDB\u5236\u5B57\u8282\uFF08\u4E24\u4F4D\u4E00\u7EC4\uFF09";x("structureView").innerHTML=`
    <div class="edbar">${Ws()}</div>
    ${Ti(e)}
    <div class="cards">
      <div class="card"><span>\u6587\u4EF6\u5927\u5C0F</span><b>${ae(i)} B</b></div>
      <div class="card"><span>\u5F53\u524D\u9875</span><b>${ae(o)} \u2013 ${ae(s-1)}</b></div>
      <div class="card"><span>\u9875\u5927\u5C0F</span><b>${ae(gt)} B</b></div>
      <div class="card"><span>\u89C6\u56FE</span><b>${m}</b></div>
    </div>
    <p class="muted">\u53EA\u663E\u793A\u5F53\u524D\u9875\uFF1B\u5199\u5165\u53EA\u6539\u8FD9\u4E00\u9875\uFF0C\u4E0D\u4F1A\u52A8\u5176\u5B83\u5B57\u8282\u3002\u5341\u516D\u8FDB\u5236\u53EF\u5199 <code>0a ff</code>\uFF0C\u5341\u8FDB\u5236\u5199 <code>10 255</code>\uFF0C\u4E8C\u8FDB\u5236\u5199 <code>00001010 11111111</code>\u3002</p>
    <textarea id="stRawText" class="code" spellcheck="false" style="height:46vh"></textarea>
    <div class="edbar">
      <button id="stPrevPage" class="ghost" ${o<=0?"disabled":""}>\u25C0 \u4E0A\u4E00\u9875</button>
      <button id="stNextPage" class="ghost" ${s>=i?"disabled":""}>\u4E0B\u4E00\u9875 \u25B6</button>
      <label class="muted">\u8DF3\u8F6C\u504F\u79FB <input id="stPageJump" type="number" min="0" max="${Math.max(0,i-1)}" value="${o}" style="width:120px"></label>
      <button id="stGoPage" class="ghost">\u8DF3\u8F6C</button>
      <button id="stApplyRaw">\u5199\u5165\u672C\u9875</button>
    </div>
    <div class="edbar">
      ${h.structurePath?'<button id="stRawWriteBack" class="primary">\u4FDD\u5B58\u56DE\u5F53\u524D\u5305</button>':""}
      <button id="stRawExport" class="ghost">\u5BFC\u51FA\u7ED3\u6784</button>
      <span id="stRawMsg" class="muted"></span>
    </div>`,Ni(),Vs();let d=document.getElementById("stRawText");d.value=l;let p=!1;d.oninput=()=>{p=!0;let _=document.getElementById("stRawMsg");_&&(_.textContent="\u672C\u9875\u6709\u672A\u5199\u5165\u7684\u4FEE\u6539")};let u=_=>{p&&!confirm("\u672C\u9875\u6709\u672A\u5199\u5165\u7684\u4FEE\u6539\uFF0C\u7FFB\u9875\u4F1A\u4E22\u5F03\uFF0C\u786E\u5B9A\u7EE7\u7EED\uFF1F")||Ci(e,_)},b=document.getElementById("stPrevPage"),g=document.getElementById("stNextPage");b&&(b.onclick=()=>u(o-gt)),g&&(g.onclick=()=>u(o+gt)),document.getElementById("stGoPage").onclick=()=>{let _=Number(document.getElementById("stPageJump").value||0);u(_)},document.getElementById("stApplyRaw").onclick=()=>{try{let _=e==="binary"?Cs(d.value):e==="decimal"?Is(d.value):$s(d.value);if(_.length!==s-o)throw new Error(`\u672C\u9875\u5E94\u4E3A ${s-o} \u5B57\u8282\uFF0C\u5F53\u524D\u89E3\u6790\u51FA ${_.length} \u5B57\u8282`);let y=new Uint8Array(a);y.set(_,o);let w=gn(y);w.rawDirty=!0,h.structure=w,h.stEdit=null,N(`\u5DF2\u5199\u5165 ${e} \u89C6\u56FE\uFF1Aoffset ${o}~${s-1}\uFF08${_.length} B\uFF09`),Ci(e,o);let v=document.getElementById("stRawMsg");v&&(v.textContent=`\u5DF2\u5199\u5165\u672C\u9875\uFF1A${_.length} B`)}catch(_){let y=document.getElementById("stRawMsg");y&&(y.textContent="\u5199\u5165\u5931\u8D25\uFF1A"+_.message),P("\u7ED3\u6784\u5B57\u8282\u5199\u5165\u5931\u8D25\uFF1A"+_.message)}};let f=document.getElementById("stRawWriteBack");f&&(f.onclick=()=>{h.archive.setBytes(h.structurePath,nt(h.structure)),N("\u5DF2\u5199\u56DE\uFF1A"+h.structurePath+"\uFF08\u8BB0\u5F97\u5BFC\u51FA / \u53E6\u5B58\uFF09"),document.getElementById("stRawMsg").textContent="\u5DF2\u5199\u56DE\u5F53\u524D\u5305"}),document.getElementById("stRawExport").onclick=async()=>{let _=await Le("\u5BFC\u51FA\u7ED3\u6784\u6587\u4EF6",[{key:"name",label:"\u6587\u4EF6\u540D",value:(h.name||"structure").replace(/\.[^.]+$/,"")+"_edit.mcstructure"}]);!_||!_.name||(x("structureView").style.display="block",await we(_.name,nt(h.structure)))}}function Js(){let e=h.structure;if(!e)return P("\u8FD8\u6CA1\u6709\u6253\u5F00 .mcstructure");let n=e.rawDirty&&e.rawBytes?re(e.rawBytes,0,!0):e.nbt,t;try{t=Ss(n)}catch(r){return P("\u82F1\u6587\u4EE3\u7801\u751F\u6210\u5931\u8D25\uFF1A"+r.message)}x("structureView").innerHTML=`
    <div class="edbar">${Ws()}</div>
    ${Ti("code")}
    <div class="cards">
      <div class="card"><span>\u4EE3\u7801\u957F\u5EA6</span><b>${ae(t.length)} \u5B57\u7B26</b></div>
      <div class="card"><span>\u6839\u7C7B\u578B</span><b>Compound</b></div>
      <div class="card"><span>\u6587\u4EF6\u5927\u5C0F</span><b>${ae(e.rawDirty?e.rawBytes.length:nt(e).length)} B</b></div>
      <div class="card"><span>\u683C\u5F0F</span><b>English typed JSON</b></div>
    </div>
    <p class="muted">\u5168\u82F1\u6587\u7C7B\u578B\u540D\u4E0E\u952E\u540D\uFF1B<code>Long</code> \u7528\u5B57\u7B26\u4E32\u4FDD\u5B58\uFF0C<code>Float/Double</code> \u652F\u6301 <code>NaN / Infinity</code>\u3002\u6539\u5B8C\u70B9\u201C\u5199\u5165\u4EE3\u7801\u201D\uFF0C\u4F1A\u81EA\u52A8\u7F16\u7801\u56DE .mcstructure \u5E76\u91CD\u65B0\u89E3\u6790\u3002</p>
    <div id="stCodeWrap"></div>
    <div class="edbar">
      <button id="stApplyCode">\u5199\u5165\u4EE3\u7801</button>
      ${h.structurePath?'<button id="stCodeWriteBack" class="primary">\u4FDD\u5B58\u56DE\u5F53\u524D\u5305</button>':""}
      <button id="stCodeExport" class="ghost">\u5BFC\u51FA\u7ED3\u6784</button>
      <span id="stCodeMsg" class="muted"></span>
    </div>`,Ni(),Vs();let a=Ks("structure.json",t,!1);document.getElementById("stCodeWrap").appendChild(a.wrap),a.ta.style.minHeight="52vh",a.ta.oninput=()=>{a.paint(),document.getElementById("stCodeMsg").textContent="\u4EE3\u7801\u6709\u672A\u5199\u5165\u7684\u4FEE\u6539"},document.getElementById("stApplyCode").onclick=()=>{try{let r=Es(a.ta.value),o=he(r,!0),s=gn(o);s.rawDirty=!1,h.structure=s,h.stEdit=null,N("\u5DF2\u5199\u5165\u82F1\u6587\u4EE3\u7801\uFF1A"+o.length+" B"),Js();let c=document.getElementById("stCodeMsg");c&&(c.textContent="\u5DF2\u5199\u5165\u4EE3\u7801\uFF1A"+o.length+" B")}catch(r){document.getElementById("stCodeMsg").textContent="\u5199\u5165\u5931\u8D25\uFF1A"+r.message,P("\u82F1\u6587\u4EE3\u7801\u5199\u5165\u5931\u8D25\uFF1A"+r.message)}};let i=document.getElementById("stCodeWriteBack");i&&(i.onclick=()=>{h.archive.setBytes(h.structurePath,nt(h.structure)),N("\u5DF2\u5199\u56DE\uFF1A"+h.structurePath+"\uFF08\u8BB0\u5F97\u5BFC\u51FA / \u53E6\u5B58\uFF09"),document.getElementById("stCodeMsg").textContent="\u5DF2\u5199\u56DE\u5F53\u524D\u5305"}),document.getElementById("stCodeExport").onclick=async()=>{let r=await Le("\u5BFC\u51FA\u7ED3\u6784\u6587\u4EF6",[{key:"name",label:"\u6587\u4EF6\u540D",value:(h.name||"structure").replace(/\.[^.]+$/,"")+"_edit.mcstructure"}]);!r||!r.name||(x("structureView").style.display="block",await we(r.name,nt(h.structure)))}}function Tt(){let e=h.structure,n=lo(e),[t,a,i]=e.size,r=Zs().size;h.texLogged||(h.texLogged=!0,N("\u5DF2\u5EFA\u7ACB\u65B9\u5757\u8D34\u56FE\u7D22\u5F15\uFF1A"+r+" \u6761\uFF08\u6765\u81EA\u8D44\u6E90\u5305 terrain_texture.json\uFF09")),h.stEdit||(h.stEdit={y:Math.floor(a/2),block:""}),h.stEdit.y>=a&&(h.stEdit.y=a-1);let o=h.stEdit,s=[...new Set(e.palette.map(f=>f.name))].filter(Boolean);x("structureView").innerHTML=`
    <div class="edbar"><button id="stBack" class="ghost">\u8FD4\u56DE\u6587\u4EF6\u5217\u8868</button><span class="muted">${h.structurePath?G(h.structurePath):"\u72EC\u7ACB\u7ED3\u6784\u6587\u4EF6"}</span></div>
    ${Ti("visual")}
    <div class="cards">
      <div class="card"><span>\u5C3A\u5BF8 X\xD7Y\xD7Z</span><b>${n.size}</b></div>
      <div class="card"><span>\u65B9\u5757\u6570</span><b>${ae(n.blocks)}</b></div>
      <div class="card"><span>\u8C03\u8272\u677F</span><b>${n.paletteTypes}</b></div>
      <div class="card"><span>\u5B9E\u4F53</span><b>${n.entities}</b></div>
    </div>

    <h3>\u5207\u7247\u7F16\u8F91\u5668</h3>
    <div class="edbar"><button id="stPrevY" class="ghost">\u25C0 \u4E0B\u4E00\u5C42</button><span class="muted">Y = <b id="stYLabel">${o.y}</b> / ${a-1}</span><button id="stNextY" class="ghost">\u4E0A\u4E00\u5C42 \u25B6</button></div>
    <div class="mapwrap" style="text-align:center"><canvas id="stSlice" style="width:100%;max-width:360px;image-rendering:pixelated"></canvas></div>
    <div class="edbar"><button id="stTexLoad" class="ghost">\u5BFC\u5165\u6750\u8D28\u5305\uFF08\u539F\u7248/\u6A21\u7EC4 .mcpack/.zip\uFF09</button><span class="muted" id="stTexInfo">\u8D34\u56FE ${r} \u6761${"\u3000\u7F3A\u8D34\u56FE "+s.filter(_=>!Ls(_)).length+"/"+s.length}</span><input type="file" id="stTexFile" multiple accept=".mcpack,.zip,.mcaddon" style="display:none"></div>
    <p class="muted" id="stPick">\u70B9\u683C\u5B50\u9009\u4E2D\u5750\u6807\uFF1B\u5148\u9009\u4E0B\u9762\u8C03\u8272\u677F\u91CC\u7684\u65B9\u5757\uFF0C\u518D\u70B9\u683C\u5B50\u5C31\u4F1A\u653E\u7F6E\u3002</p>

    <label>\u8C03\u8272\u677F\uFF08\u70B9\u9009\u8981\u653E\u7F6E\u7684\u65B9\u5757\uFF09</label>
    <input id="stSearch" placeholder="\u641C\u7D22\u65B9\u5757\u540D\uFF0C\u4F8B\u5982 stone / \u77F3\u5934">
    <div id="stPalette" class="chips">${s.map(f=>`<span class="chip" data-name="${G(f)}"><span class="dot" style="background:${As(f)||"#333"}"></span>${G(ua(f))}<i>${ae(e.counts.get(f)||0)}</i></span>`).join("")}<span class="chip" data-name="" data-clear="1">\u7A7A / \u5220\u9664</span></div>

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
      <div class="edbar"><button id="stSave" class="ghost">\u5BFC\u51FA\u7ED3\u6784</button>${h.structurePath?'<button id="stWriteBack">\u4FDD\u5B58\u56DE\u5F53\u524D\u5305</button>':""}</div>
    </div>`;let c=document.getElementById("stSlice"),l=()=>{let f=Math.max(2,Math.floor(360/Math.max(t,i,1)));c.width=t*f,c.height=i*f;let _=c.getContext("2d");_.fillStyle="#0b0f15",_.fillRect(0,0,c.width,c.height);let y=e.indices[0]||[],w=t*i>4e5?Math.ceil(Math.sqrt(t*i/4e5)):1;for(let v=0;v<t;v+=w)for(let I=0;I<i;I+=w){let B=y[(v*i+I)*a+o.y];if(B<0||B===void 0)continue;let S=e.palette[B],C=S&&S.name?Ls(S.name):null;if(C&&C.complete&&C.naturalWidth)_.drawImage(C,v*f,I*f,f,f);else{let k=As(S&&S.name);if(!k)continue;_.fillStyle=k,_.fillRect(v*f,I*f,f,f)}}},m=()=>{document.getElementById("stYLabel").textContent=o.y};o.redraw=l,l();let d=document.getElementById("stTexLoad"),p=document.getElementById("stTexFile");d&&(d.onclick=()=>p.click()),p&&(p.onchange=async()=>{let f=[...p.files];if(f.length){N("\u6B63\u5728\u8BFB\u53D6\u6750\u8D28\u5305\uFF1A"+f.length+" \u4E2A");for(let _ of f)try{let y=await fa(_);Vt(_.name,y)==="zip"&&h.texPacks.push($e.fromBytes(_.name,y))}catch(y){N("\u6750\u8D28\u5305\u8BFB\u53D6\u5931\u8D25\uFF1A"+_.name+"\uFF08"+y.message+"\uFF09")}h.texIndex=null,h.texCache=new Map,h.texPending=new Set,h.texLogged=!1,Tt(),N("\u6750\u8D28\u5305\u5DF2\u52A0\u8F7D\uFF1A"+h.texPacks.length+" \u4E2A")}}),document.getElementById("stBack").onclick=()=>{x("structureView").style.display="none",h.structurePath=null,x("workspace").style.display="block"},document.getElementById("stPrevY").onclick=()=>{o.y=Math.max(0,o.y-1),m(),l()},document.getElementById("stNextY").onclick=()=>{o.y=Math.min(a-1,o.y+1),m(),l()};let u=document.getElementById("stPalette"),b=()=>u.querySelectorAll(".chip").forEach(f=>f.classList.toggle("on",(f.dataset.name||"")===o.block&&!f.dataset.clear));b(),u.querySelectorAll(".chip").forEach(f=>{f.onclick=()=>{o.block=f.dataset.clear?"":f.dataset.name,document.getElementById("stBlock").value=o.block,b()}}),document.getElementById("stSearch").oninput=f=>{let _=f.target.value.trim().toLowerCase();u.querySelectorAll(".chip").forEach(y=>{let w=y.dataset.name||"";y.style.display=!_||w.toLowerCase().includes(_)||ua(w).includes(_)?"":"none"})},c.onclick=f=>{let _=c.getBoundingClientRect(),y=_.width||c.width||1,w=_.height||c.height||1,v=Math.min(t-1,Math.max(0,Math.floor((f.clientX-_.left)/y*t))),I=Math.min(i-1,Math.max(0,Math.floor((f.clientY-_.top)/w*i))),B=(v*i+I)*a+o.y,S=(e.indices[0]||[])[B],C=S>=0&&e.palette[S]?e.palette[S].name:"\u7A7A\u6C14";if(document.getElementById("stX").value=v,document.getElementById("stY").value=o.y,document.getElementById("stZ").value=I,document.getElementById("stPick").textContent=`\u9009\u4E2D (${v}, ${o.y}, ${I})\uFF1A${ua(C)}\uFF08${C}\uFF09`+(o.block?"\u3000\u2192 \u518D\u70B9\u4E00\u6B21\u5373\u653E\u7F6E":""),o.block)try{Ya(e,v,o.y,I,o.block),N("\u5DF2\u653E\u7F6E "+o.block+` @ ${v},${o.y},${I}`),h.stEdit.keepY=!0,Tt()}catch(k){P(k.message)}};let g=document.getElementById("stWriteBack");g&&(g.onclick=()=>{h.structurePath&&(h.archive.setBytes(h.structurePath,nt(e)),N("\u5DF2\u5199\u56DE\uFF1A"+h.structurePath+"\uFF08\u8BB0\u5F97\u5BFC\u51FA\uFF09"))}),document.getElementById("stSet").onclick=()=>{let f=Number(document.getElementById("stX").value||0),_=Number(document.getElementById("stY").value||0),y=Number(document.getElementById("stZ").value||0),w=document.getElementById("stBlock").value.trim();try{w?Ya(e,f,_,y,w):mo(e,f,_,y),N((w?"\u5DF2\u5199\u5165 "+w:"\u5DF2\u6E05\u9664\u65B9\u5757")+` @ ${f},${_},${y}`),o.y=Math.min(a-1,Math.max(0,_)),Tt()}catch(v){P(v.message)}},document.getElementById("stReplace").onclick=()=>{let f=document.getElementById("stFrom").value.trim(),_=document.getElementById("stTo").value.trim();if(!f||!_)return P("\u4E24\u4E2A\u65B9\u5757 ID \u90FD\u8981\u586B");let y=co(e,f,_);N("\u5DF2\u66FF\u6362 "+y+" \u4E2A\u8C03\u8272\u677F\u6761\u76EE"),Tt()},document.getElementById("stSave").onclick=async()=>{let f=await Le("\u5BFC\u51FA\u7ED3\u6784\u6587\u4EF6",[{key:"name",label:"\u6587\u4EF6\u540D",value:h.name.replace(/\.[^.]+$/,"")+"_edit.mcstructure"}]);!f||!f.name||(x("structureView").style.display="block",await we(f.name,nt(e)))},Ni()}async function bd(){if(!h.selected)return P("\u5148\u5728\u5217\u8868\u91CC\u9009\u4E00\u4E2A\u6587\u4EF6\u6216\u6587\u4EF6\u5939");let e=!h.archive.get(h.selected),n=h.selected,t=await Le(e?"\u91CD\u547D\u540D\u6587\u4EF6\u5939":"\u91CD\u547D\u540D\u6587\u4EF6\uFF08\u53EF\u6539\u540E\u7F00\uFF09",[{key:"name",label:"\u65B0\u540D\u79F0",value:de(n)}]);if(!t||!t.name)return;let a=t.name.replace(/\//g,"").trim();if(!a)return;let i=n.includes("/")?n.slice(0,n.lastIndexOf("/")):"",r=i?i+"/"+a:a;if(h.archive.paths().includes(r))return P("\u540C\u540D\u6587\u4EF6\u5DF2\u5B58\u5728");h.archive.rename(n,r,e),h.selected=null,le(),N("\u5DF2\u91CD\u547D\u540D\uFF1A"+n+" \u2192 "+r)}async function gd(){if(!h.selected)return P("\u5148\u9009\u4E00\u4E2A\u6587\u4EF6\u6216\u6587\u4EF6\u5939");let e=h.selected,n=!h.archive.get(e),t=await Le("\u5220\u9664\u786E\u8BA4",[{key:"ok",label:"\u8F93\u5165 DELETE \u786E\u8BA4\u5220\u9664 "+e}]);!t||t.ok!=="DELETE"||(h.archive.remove(e),h.selected=null,x("editor").innerHTML="",le(),N("\u5DF2\u5220\u9664\uFF1A"+e))}async function yd(){let e=await Le("\u65B0\u5EFA\u6587\u4EF6",[{key:"path",label:"\u8DEF\u5F84\uFF08\u53EF\u542B\u6587\u4EF6\u5939\uFF09",placeholder:"scripts/new.js"}]);if(!e||!e.path)return;let n=e.path.trim().replace(/^\/+/,"");h.archive.setBytes(n,new TextEncoder().encode("")),le(),Nt(n),N("\u5DF2\u65B0\u5EFA\uFF1A"+n)}async function vd(){let e=await Le("\u65B0\u5EFA\u6587\u4EF6\u5939",[{key:"path",label:"\u6587\u4EF6\u5939\u8DEF\u5F84",placeholder:"scripts/utils"}]);if(!e||!e.path)return;let n=e.path.trim().replace(/^\/+/,"").replace(/\/+$/,"");h.archive.setBytes(n+"/.keep",new Uint8Array(0)),le(),N("\u5DF2\u65B0\u5EFA\u6587\u4EF6\u5939\uFF1A"+n)}async function Ei(e){let n=document.createElement("input");n.type="file",n.onchange=async()=>{let t=n.files[0];if(!t)return;let a=await fa(t);h.archive.setBytes(e,a),N("\u5DF2\u66FF\u6362\uFF1A"+e),le(),Nt(e)},n.click()}function da(e){let n=h.archive.getBytes(e);we(de(e),n)}async function we(e,n,t){let a=t||ad(n);if(window.AndroidBridge&&window.AndroidBridge.saveBinary){let o=window.AndroidBridge.saveBinary(e,a);String(o).startsWith("ERR")?P("\u4FDD\u5B58\u5931\u8D25\uFF1A"+o):N("\u5DF2\u4FDD\u5B58\u5230 \u4E0B\u8F7D/MCBE\u89E3\u6790/"+e);return}let i=new Blob([n],{type:"application/octet-stream"}),r=document.createElement("a");r.href=URL.createObjectURL(i),r.download=e,r.click(),N("\u5DF2\u5BFC\u51FA\uFF1A"+e)}async function wd(){if(!h.archive)return P("\u8FD8\u6CA1\u6709\u6253\u5F00\u538B\u7F29\u5305");let e=h.archive.paths(),n=e.some(c=>/manifest\.json$/i.test(c))&&!e.includes("level.dat"),t=h.name?Yt(h.name)||".mcpack":n?".mcaddon":".mcpack",i=(h.name?de(h.name).replace(/\.[^.]+$/,""):"MCBE\u9644\u52A0\u5305")+"_new"+t,r=await Le("\u5BFC\u51FA / \u53E6\u5B58\u4E3A\uFF08\u53EF\u6539\u540E\u7F00\uFF09",[{key:"name",label:"\u6587\u4EF6\u540D\uFF08\u542B\u540E\u7F00\uFF09",value:i}]);if(!r||!r.name)return;let o=r.name.trim();N("\u6B63\u5728\u6253\u5305\uFF1A"+o+"\uFF08"+h.archive.files.length+" \u4E2A\u6587\u4EF6\uFF09"),await Ps();let s=h.archive.toBytes();await we(o,s),N("\u6253\u5305\u5B8C\u6210\uFF0C\u5927\u5C0F "+s.length+" \u5B57\u8282")}async function kd(){if(!h.archive)return P("\u5148\u6253\u5F00 .mcworld / .mctemplate");if(h.stats&&!h.statsDirty){Mi(h.stats),N("\u7528\u7F13\u5B58\u7684\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5185\u5BB9\u6709\u6539\u52A8\u4F1A\u81EA\u52A8\u91CD\u7B97\uFF09");return}let n=h.archive.paths().filter(t=>/(^|\/)(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/.test(t));if(!n.length)return P("\u8FD9\u4E2A\u5305\u91CC\u6CA1\u6709 LevelDB \u6570\u636E\u5E93\uFF08\u53EF\u80FD\u53EA\u662F\u9644\u52A0\u5305\uFF09");N("\u5F00\u59CB\u7EDF\u8BA1\uFF1A"+n.length+" \u4E2A LevelDB \u6587\u4EF6\u2026");try{let t=n.map(s=>{let c=h.archive.getBytes(s);return{name:de(s),arrayBuffer:async()=>c}}),{readLevelDb:a}=window.MCBE,i=await a(t,{});N("\u8BFB\u53D6 "+i.size+" \u6761\u952E\u503C");let r=h.archive.get("level.dat")?h.archive.getBytes("level.dat"):null,o={file:h.name,size:0};await Gn(i,o,r),h.stats=o,h.statsDirty=!1,Mi(o)}catch(t){console.error(t),P(t.message)}}function Mi(e){let n=e.level||{},t=["\u751F\u5B58","\u521B\u9020","\u5192\u9669","\u65C1\u89C2"][n.gameType]??n.gameType,a=["\u548C\u5E73","\u7B80\u5355","\u666E\u901A","\u56F0\u96BE"][n.difficulty]??n.difficulty;x("editor").innerHTML=`
    <h3>\u4E16\u754C\u7EDF\u8BA1</h3>
    <div class="cards">
      <div class="card"><span>\u4E16\u754C\u540D\u79F0</span><b>${n.levelName??"-"}</b></div>
      <div class="card"><span>\u79CD\u5B50</span><b>${n.seed??"-"}</b></div>
      <div class="card"><span>\u6A21\u5F0F</span><b>${t??"-"} / ${a??"-"}${n.hardcore?"\uFF08\u786C\u6838\uFF09":""}</b></div>
      <div class="card"><span>\u51FA\u751F\u70B9</span><b>${n.spawn??"-"}</b></div>
    </div>
    <table><tbody>
      <tr><td>LevelDB \u952E\u6570</td><td>${ae(e.keys)}</td></tr>
      <tr><td>\u533A\u5757\u6570</td><td>${ae(e.chunks)}</td></tr>
      <tr><td>\u5B50\u533A\u5757\u6570</td><td>${ae(e.subchunks)}</td></tr>
      <tr><td>\u4E3B\u5C42\u65B9\u5757\u6570</td><td>${ae(e.blocks)}</td></tr>
      <tr><td>\u65B9\u5757\u79CD\u7C7B</td><td>${ae(e.blockTypes)}</td></tr>
      <tr><td>\u5B9E\u4F53</td><td>${ae(e.entities)}</td></tr>
      <tr><td>\u65B9\u5757\u5B9E\u4F53</td><td>${ae(e.blockEntities)}</td></tr>
    </tbody></table>
    <h3>\u65B9\u5757\u6392\u884C</h3>
    <table><tbody>${(e.blockList||[]).slice(0,40).map(i=>`<tr><td>${ua(i.name)}</td><td>${ae(i.count)}</td></tr>`).join("")}</tbody></table>
    <h3>\u5B9E\u4F53</h3>
    <table><tbody>${Object.entries(e.entitiesByType||{}).map(([i,r])=>`<tr><td>${nd(i)}</td><td>${ae(r)}</td></tr>`).join("")}</tbody></table>`}async function xd(){if(!h.archive)return P("\u5148\u6253\u5F00\u4E00\u4E2A .mcpack / .mcaddon / .mcworld");zi();let e=h.archive.files.length;N("\u5F00\u59CB\u6C49\u5316\u2026"),await Ps();let n=yo(h.archive),t=0;for(let a of h.archive.paths())/\.json$/i.test(a)&&/(^|\/)ui\//.test(a)&&(t+=ei(h.archive,a));for(let a of n)a.status==="no-lang"?N(`\xB7 ${a.pack}\uFF1A\u6CA1\u6709 texts/*.lang\uFF0C\u8DF3\u8FC7`):a.status==="error"?N(`\xB7 ${a.pack}\uFF1A\u5B50\u5305\u89E3\u6790\u5931\u8D25\uFF08${a.note||"\u672A\u77E5\u9519\u8BEF"}\uFF09`):a.status==="already-zh"?N(`\xB7 ${a.pack}\uFF1A${a.where} \u91CC\u5DF2\u6709\u4E2D\u6587\uFF0C\u6309\u89C4\u5219\u4E0D\u91CD\u590D\u6C49\u5316`):N(`\xB7 ${a.pack}\uFF1A\u5DF2\u751F\u6210 ${a.file}\uFF0C\u7FFB\u8BD1 ${a.translated} \u6761`);t&&N(`\xB7 UI \u6587\u672C\uFF1A\u6539\u5199\u4E86 ${t} \u5904`),!n.length&&!t&&N("\u6CA1\u6709\u627E\u5230\u53EF\u6C49\u5316\u7684\u8BED\u8A00\u6587\u4EF6"),ni(h.archive),N(`\u5B8C\u6210\u3002\u6587\u4EF6\u6570 ${e} \u2192 ${h.archive.files.length}\uFF0C\u8BB0\u5F97\u70B9\u201C\u5BFC\u51FA/\u53E6\u5B58\u201D\u3002`),le()}function Sd(){let e=x("modal"),n=x("modalBody");n.innerHTML=`<h3>\u8BD1\u540D\u4FEE\u6B63</h3>
    <p class="muted">\u6BCF\u884C\u4E00\u6761\uFF0C\u683C\u5F0F <b>\u65B9\u5757id=\u4E2D\u6587</b>\uFF08\u53EF\u4EE5\u4E0D\u5199 minecraft:\uFF09\u3002\u4F8B\u5982 stone=\u77F3\u5757\u3002\u53EA\u4FDD\u5B58\u5728\u672C\u673A\uFF0C\u4E0D\u4F1A\u5185\u7F6E\u4EFB\u4F55\u56FA\u5B9A\u8BD1\u6587\u3002</p>
    <textarea id="fixText" class="code" style="height:30vh">${G(Eo())}</textarea>
    <div class="modalbtns"><button id="fixSave">\u4FDD\u5B58\u5E76\u751F\u6548</button><button id="fixClear" class="ghost">\u6E05\u7A7A</button><button id="fixQuit" class="ghost">\u5173\u95ED</button></div>`,e.style.display="flex";let t=()=>{e.style.display="none"};document.getElementById("fixQuit").onclick=t,document.getElementById("fixClear").onclick=()=>{document.getElementById("fixText").value=""},document.getElementById("fixSave").onclick=()=>{let a=Bo(document.getElementById("fixText").value);t(),N("\u8BD1\u540D\u4FEE\u6B63\u5DF2\u4FDD\u5B58\uFF1A"+a+" \u6761\uFF08\u70B9\u4E16\u754C\u7EDF\u8BA1/\u4E16\u754C\u89C2\u770B\u5237\u65B0\u5373\u53EF\u770B\u5230\uFF09"),h.stats&&Mi(h.stats)}}async function ot(){return h.archive.paths().filter(n=>/(^|\/)(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/.test(n)).map(n=>{let t=h.archive.getBytes(n);return{path:n,name:de(n),arrayBuffer:async()=>t,data:t}})}async function Ed(){if(!h.archive)return P("\u5148\u6253\u5F00 .mcworld / .mctemplate");let e=await ot();if(!e.length)return P("\u8FD9\u4E2A\u5305\u91CC\u6CA1\u6709 LevelDB\uFF08\u9644\u52A0\u5305\u4E0D\u80FD\u770B\u5730\u56FE\uFF09");let{readLevelDb:n}=window.MCBE;try{let u=function(f){return f.chunkSet?f.chunkSet.size:f.chunks},b=function(f){let _=xn(f.type,f.x*31+f.z*17),y=Math.max(4,Math.floor(560/_.size)),w=Kt(f.type,f.x*31+f.z*17);x("modalBody").innerHTML="<h3>"+G(f.zh)+`\uFF08\u63A8\u6D4B\u5916\u5F62\uFF09</h3>
        <p class="muted">\u5750\u6807 `+f.x+", "+f.z+"\u3000\u4F30\u7B97 y\u2248"+f.y+"\u3000\u7FA4\u7CFB "+G(f.biome)+`</p>
        <canvas id="structCv" width="`+_.size*y+'" height="'+_.size*y+`" style="width:100%;max-width:560px;image-rendering:pixelated;border-radius:8px"></canvas>
        <p class="muted">\u5916\u5F62\u6309\u7ED3\u6784\u7C7B\u578B\u89C4\u5219\u7A0B\u5E8F\u751F\u6210\uFF08\u542B\u7834\u635F/\u671D\u5411\u968F\u673A\uFF09\uFF0C\u7528\u4E8E\u770B\u5E03\u5C40\uFF0C\u4E0D\u7B49\u4E8E\u771F\u5B9E\u6A21\u677F\u3002\u5B9D\u7BB1\u53C2\u8003\uFF1A`+w.map(B=>Ke(B.name)+"\xD7"+B.count).join("\u3001")+`</p>
        <div class="modalbtns"><button id="stClose" class="ghost">\u5173\u95ED</button></div>`,x("modal").style.display="flex";let v=document.getElementById("structCv"),I=v.getContext("2d");I.fillStyle="#0b0f15",I.fillRect(0,0,v.width,v.height);for(let B of _.blocks)I.fillStyle=Ge(B.block),I.fillRect(B.x*y,B.z*y,y,y);document.getElementById("stClose").onclick=()=>{x("modal").style.display="none"}},t=h.db||await n(e,{});h.db=t;let a=0;try{let f=h.archive.getBytes("level.dat");if(f){let _=Ga(f);a=Number(_.plain.RandomSeed||0)}}catch{a=0}h.mapSeed=a;let i="surface",r=60,o=!0,s=512,c=!0,l=!0,m=1;h.mapCache||(h.mapCache={}),N("\u6B63\u5728\u626B\u63CF\u4E16\u754C\u2026\uFF08\u79CD\u5B50 "+a+"\uFF09");let d=async()=>{let f=i==="surface"?"surface":"y"+r,_=h.mapCache[f];_||(N(i==="surface"?"\u626B\u63CF\u5730\u8868\u2026":"\u626B\u63CF Y="+r+" \u8FD9\u4E00\u5C42\u2026"),_=await aa(t,i==="surface"?{}:{y:r,onProgress:w=>{w%128===0&&N("\u5DF2\u626B\u63CF "+w+" \u4E2A\u5B50\u533A\u5757")}}),h.mapCache[f]=_);let y={..._,cols:new Map(_.cols),chunkSet:_.chunkSet};return o&&Vo(y,{seed:a,y:i==="underground"?r:null,margin:s,caves:c}),y},p=async()=>{let f=await d();if(!f.cols.size)return P("\u6CA1\u6709\u89E3\u6790\u5230\u4EFB\u4F55\u65B9\u5757\u5217\uFF08\u53EF\u80FD\u662F\u7A7A\u5B58\u6863\u6216\u65B0\u683C\u5F0F\uFF09");h.surface=f;let _=f.maxX-f.minX+1,y=f.maxZ-f.minZ+1,w=_>1100?1:_>700?2:3,v=document.getElementById("mapCanvas");if(Ho(v,f,w),l){let S=Jo(f,{seed:a,margin:0});h.structures=S;let C=v.getContext("2d");for(let k of S){let z=(k.x-f.minX)*w,$=(k.z-f.minZ)*w;z<0||$<0||z>v.width||$>v.height||(C.fillStyle=k.color,C.fillRect(z-2,$-2,5,5),C.strokeStyle="#0b0f15",C.lineWidth=1,C.strokeRect(z-2.5,$-2.5,6,6))}N("\u7ED3\u6784\u63A8\u6D4B\uFF1A"+S.length+" \u5904\uFF08\u6309\u7FA4\u7CFB\u4E0E\u79CD\u5B50\u7F51\u683C\u653E\u7F6E\uFF0C\u975E\u771F\u5B9E\u7ED3\u6784\uFF09")}let I=(document.getElementById("mapWrap")&&document.getElementById("mapWrap").clientWidth||340)-6;h.zoomSet||(m=Math.max(.15,Math.min(1,I/v.width)));let B=()=>{v.style.width=Math.round(v.width*m)+"px",v.style.height=Math.round(v.height*m)+"px"};B(),h.applyZoom=B,v.onclick=S=>{if(h.mapDragged){h.mapDragged=!1;return}let C=v.getBoundingClientRect(),k=Math.floor((S.clientX-C.left)/C.width*v.width/w),z=Math.floor((S.clientY-C.top)/C.height*v.height/w),$=f.minX+k,j=f.minZ+z,M=(h.structures||[]).find(D=>Math.abs(D.x-$)<=8&&Math.abs(D.z-j)<=8);if(M){b(M);let D=Kt(M.type,M.x*31+M.z*17);document.getElementById("mapInfo").textContent=`${M.zh}\uFF08\u63A8\u6D4B\uFF09 \u5750\u6807 ${M.x}, ${M.z}\u3000y\u2248${M.y}\u3000\u7FA4\u7CFB ${M.biome}\u3000\u5B9D\u7BB1\u53C2\u8003\uFF1A`+D.map(R=>Ke(R.name)+"\xD7"+R.count).join("\u3001")}else document.getElementById("mapInfo").textContent=Zo(f,f.minX+k,f.minZ+z)},document.getElementById("mapMeta").textContent=(i==="surface"?"\u5730\u8868":"\u5730\u4E0B Y="+r)+(f.simStep>1?"\uFF08\u6A21\u62DF\u91C7\u6837\u6B65\u957F "+f.simStep+"\uFF09":"")+"\u3000\u771F\u5B9E\u533A\u5757 "+ae(u(f))+" \u4E2A\u3000\u8303\u56F4 X "+f.minX+"~"+f.maxX+"\uFF0CZ "+f.minZ+"~"+f.maxZ+(f.simulated?"\u3000\u6A21\u62DF\u8865\u5145 "+ae(f.simulated)+" \u5217":"")};x("workspace").style.display="none",x("structureView").style.display="block",x("structureView").innerHTML=`<h3>\u4E16\u754C\u89C2\u770B</h3>
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
      </div>`;let g=()=>{i=document.getElementById("mapMode").value,r=Number(document.getElementById("mapY").value||60),o=document.getElementById("mapSim").checked,s=Number(document.getElementById("mapMargin").value||512),c=document.getElementById("mapCaves").checked};document.getElementById("mapMode").onchange=()=>{g(),p()},document.getElementById("mapY").onchange=()=>{g(),p()},document.getElementById("mapSim").onchange=()=>{g(),p()},document.getElementById("mapMargin").onchange=()=>{g(),p()},document.getElementById("mapStruct").onchange=()=>{g(),p()},document.getElementById("mapZoomIn").onclick=()=>{h.zoomSet=!0,m=Math.min(5,m*1.4),h.applyZoom&&h.applyZoom()},document.getElementById("mapZoomOut").onclick=()=>{h.zoomSet=!0,m=Math.max(.25,m/1.4),h.applyZoom&&h.applyZoom()},document.getElementById("mapFit").onclick=()=>{let f=document.getElementById("mapCanvas"),_=document.getElementById("mapWrap")?document.getElementById("mapWrap").clientWidth:360;h.zoomSet=!0,m=Math.max(.15,(_-6)/f.width),h.applyZoom&&h.applyZoom()};{let f=document.getElementById("mapWrap");if(f){let _=null;f.addEventListener("pointerdown",y=>{_={x:y.clientX,y:y.clientY,l:f.scrollLeft,t:f.scrollTop}}),f.addEventListener("pointermove",y=>{_&&(f.scrollLeft=_.l-(y.clientX-_.x),f.scrollTop=_.t-(y.clientY-_.y))}),f.addEventListener("pointerup",y=>{_&&(Math.abs(y.clientX-_.x)>6||Math.abs(y.clientY-_.y)>6)&&(h.mapDragged=!0),_=null}),f.addEventListener("pointercancel",()=>{_=null})}}document.getElementById("mapStructList").onclick=()=>{let f=h.structures||[];if(!f.length)return P("\u5148\u52FE\u9009\u201C\u663E\u793A\u7ED3\u6784\u63A8\u6D4B\u6807\u8BB0\u201D\u518D\u91CD\u65B0\u751F\u6210");let _=f.slice(0,80).map(y=>`<div class="slotrow"><span class="slotname">${G(y.zh)}</span><span class="muted">${y.x}, ${y.z}</span></div>`).join("");x("modalBody").innerHTML=`<h3>\u7ED3\u6784\u63A8\u6D4B\uFF08${f.length} \u5904\uFF09</h3><p class="muted">\u6309\u7FA4\u7CFB\u4E0E\u79CD\u5B50\u54C8\u5E0C\u653E\u7F6E\uFF0C\u53EA\u7ED9\u5927\u81F4\u4F4D\u7F6E\uFF1B\u5B9D\u7BB1\u5185\u5BB9\u6309\u6C60\u5B50\u968F\u673A\uFF0C\u975E\u771F\u5B9E\u5BB9\u5668\u6570\u636E\u3002</p><div class="slotlist">${_}</div><div class="modalbtns"><button id="stClose" class="ghost">\u5173\u95ED</button></div>`,x("modal").style.display="flex",document.getElementById("stClose").onclick=()=>{x("modal").style.display="none"},x("modalBody").querySelectorAll(".slotrow").forEach((y,w)=>{y.onclick=()=>b(f[w])})},document.getElementById("mapCaves").onchange=()=>{g(),p()},document.getElementById("mapPaint").onclick=()=>{g(),p()},document.getElementById("mapBack").onclick=()=>{x("structureView").style.display="none",x("workspace").style.display="block"},document.getElementById("mapPng").onclick=async()=>{let _=document.getElementById("mapCanvas").toDataURL("image/png").split(",")[1];await we("\u4E16\u754C\u89C2\u770B_"+(i==="surface"?"\u5730\u8868":"Y"+r)+".png",new Uint8Array(0),_),N("\u5DF2\u5BFC\u51FA\u5730\u56FE PNG")},await p(),N("\u4E16\u754C\u89C2\u770B\u5B8C\u6210")}catch(t){console.error(t),P(t.message)}}async function Bd(){if(!h.archive)return P("\u5148\u6253\u5F00 .mcworld / .mctemplate");try{let e=await ot(),{readLevelDb:n}=window.MCBE,t=h.db||await n(e,{});h.db=t;let a=t.get("~local_player");if(!a)return P("\u8FD9\u4E2A\u5B58\u6863\u6CA1\u6709\u5355\u673A\u73A9\u5BB6\u6570\u636E\uFF08\u53EF\u80FD\u9700\u8981\u5148\u8FDB\u5165\u8FC7\u4E00\u6B21\u4E16\u754C\uFF09");let i=ki(a.value);h.player=i,x("workspace").style.display="block",x("structureView").style.display="none",x("editor").innerHTML=`<div class="edhead"><div><b>\u73A9\u5BB6\u6570\u636E</b><span class="muted">\u3000\u952E ~local_player</span></div></div>
      <div class="form">
        <label>\u5750\u6807 X / Y / Z</label>
        <div class="row3"><input id="pX" type="number" step="0.01" value="${i.pos?i.pos[0].toFixed(2):0}"><input id="pY" type="number" step="0.01" value="${i.pos?i.pos[1].toFixed(2):0}"><input id="pZ" type="number" step="0.01" value="${i.pos?i.pos[2].toFixed(2):0}"></div>
        <label>\u751F\u547D\u503C\uFF08\u7559\u7A7A\u4E0D\u6539\uFF09</label><input id="pHp" type="number" step="0.5" placeholder="${i.health??""}">
        <label>\u80CC\u5305\uFF08JSON \u6570\u7EC4\uFF0C\u6BCF\u9879 name / count / slot\uFF09</label>
        <textarea id="pInv" class="code" style="height:160px">${G(JSON.stringify(i.inventory,null,1))}</textarea>
        <div class="edbar"><button id="pSave">\u5199\u5165\u5B58\u6863</button></div>
        <p class="muted">\u5199\u5165\u65B9\u5F0F\uFF1A\u5411 LevelDB \u65E5\u5FD7\u8FFD\u52A0\u4E00\u6761 WriteBatch \u8BB0\u5F55\uFF08\u4E0D\u6539\u539F\u6587\u4EF6\uFF0C\u5BFC\u51FA\u65B0\u5305\u540E\u751F\u6548\uFF09\u3002</p>
      </div>`,document.getElementById("pSave").onclick=async()=>{try{let r=[Number(document.getElementById("pX").value),Number(document.getElementById("pY").value),Number(document.getElementById("pZ").value)],o=document.getElementById("pHp").value,s=JSON.parse(document.getElementById("pInv").value||"[]"),c={pos:r,inventory:s};o&&(c.health=Number(o));let l=vs(a.value,c),m=await ot(),d=await _n(m,{});await d.init({});let p=d.lastSequence+1,u=h.archive.files.filter(f=>/(^|\/)(MANIFEST-[0-9]+|[0-9]+\.(ldb|log))$/.test(f.path)).map(f=>({name:de(f.path),data:f.data})),b=ca(u,"~local_player",l,p),g=h.archive.paths().find(f=>de(f)===b.logName)||"db/"+b.logName;h.archive.setBytes(g,b.bytes),h.db=null,h.statsDirty=!0,N(`\u5DF2\u5199\u5165\uFF1A${b.logName}\uFF08\u5E8F\u5217\u53F7 ${p}\uFF09\uFF0C\u5BFC\u51FA\u540E\u751F\u6548`)}catch(r){console.error(r),P(r.message)}},N(`\u73A9\u5BB6\u5750\u6807 ${i.pos?i.pos.map(r=>r.toFixed(2)).join(", "):"-"}\uFF0C\u80CC\u5305 ${i.inventory.length} \u9879`)}catch(e){console.error(e),P(e.message)}}async function Cd(){if(!h.archive)return P("\u5148\u6253\u5F00 .mcworld / .mctemplate");try{let e=await ot(),n=h.db||await window.MCBE.readLevelDb(e,{});h.db=n;let t=n.get("~local_player");if(!t)return P("\u8FD9\u4E2A\u5B58\u6863\u6CA1\u6709\u5355\u673A\u73A9\u5BB6\u6570\u636E");let a=ve(re(t.value,0,!0)),i=Array.isArray(a.Inventory)?a.Inventory:[];if(!i.length)return P("\u73A9\u5BB6\u80CC\u5305\u662F\u7A7A\u7684");x("workspace").style.display="block",x("structureView").style.display="none",x("editor").innerHTML=`<div class="edhead"><div><b>\u80CC\u5305\u69FD\u4F4D\u8C03\u6574</b><span class="muted">\u3000${i.length} \u9879\uFF08\u4E0D\u6539\u7269\u54C1\u672C\u8EAB NBT\uFF09</span></div></div>
      <p class="muted">0\u201335 \u662F\u4E3B\u80CC\u5305\uFF0C36\u201339 \u662F\u5FEB\u6377\u680F\uFF08\u90E8\u5206\u7248\u672C\u76D4\u7532/\u526F\u624B\u53E6\u6709\u69FD\u4F4D\uFF09\u3002\u6539\u6210\u5DF2\u88AB\u5360\u7528\u7684\u69FD\u4F4D\u4F1A\u81EA\u52A8\u4EA4\u6362\uFF0C\u4E0D\u4F1A\u4E22\u7269\u54C1\u3002</p>
      <div class="slotlist">${i.map((r,o)=>`
        <div class="slotrow">
          <span class="slotname">${G(Ke(String(r.Name||""))||String(r.Name||""))}</span>
          <span class="muted">\xD7${Number(r.Count??1)}</span>
          <input class="slotinput" data-i="${o}" type="number" min="0" max="255" value="${Number(r.Slot??0)}">
          <span class="muted">\u539F\u69FD ${Number(r.Slot??0)}</span>
        </div>`).join("")}</div>
      <div class="edbar"><button id="slotSave" class="primary">\u5199\u5165\u69FD\u4F4D</button></div>
      <p class="muted">\u5199\u5165\u65B9\u5F0F\uFF1A\u91CD\u7F16\u7801\u73A9\u5BB6 NBT \u540E\u8FFD\u52A0 WriteBatch \u5230 db \u65E5\u5FD7\uFF1B\u5BFC\u51FA\u65B0\u5305\u540E\u751F\u6548\uFF0C\u5EFA\u8BAE\u5148\u5907\u4EFD\u3002</p>`,document.getElementById("slotSave").onclick=async()=>{try{let r={},o=0;if(document.querySelectorAll(".slotinput").forEach(u=>{let b=Number(u.dataset.i),g=Number(i[b].Slot??0),f=Number(u.value);Number.isFinite(f)&&f!==g&&(r[b]=f,o++)}),!o)return N("\u69FD\u4F4D\u6CA1\u6709\u6539\u52A8");let s=ks(t.value,r),c=await ot(),l=await _n(c,{});await l.init({});let m=h.archive.files.filter(u=>/(^|\/)(MANIFEST-[0-9]+|[0-9]+\.(ldb|log))$/.test(u.path)).map(u=>({name:de(u.path),data:u.data})),d=ca(m,"~local_player",s,l.lastSequence+1),p=h.archive.paths().find(u=>de(u)===d.logName)||"db/"+d.logName;h.archive.setBytes(p,d.bytes),h.db=null,h.statsDirty=!0,N("\u69FD\u4F4D\u5DF2\u5199\u5165 "+o+" \u9879\uFF0C\u65E5\u5FD7 "+d.logName)}catch(r){console.error(r),P("\u5199\u5165\u5931\u8D25\uFF1A"+r.message)}},N("\u80CC\u5305\u5171 "+i.length+" \u9879\uFF0C\u53EF\u8C03\u6574\u69FD\u4F4D")}catch(e){console.error(e),P(e.message)}}async function Md(){if(!h.archive)return P("\u5148\u6253\u5F00 .mcworld / .mctemplate");try{let e=await ot(),n=h.db||await window.MCBE.readLevelDb(e,{});h.db=n;let t=n.get("~local_player");if(!t)return P("\u8FD9\u4E2A\u5B58\u6863\u6CA1\u6709\u5355\u673A\u73A9\u5BB6\u6570\u636E\uFF0C\u4E66\u7C4D\u90FD\u5728\u73A9\u5BB6\u80CC\u5305\u91CC\uFF0C\u5148\u8FDB\u5165\u4E00\u6B21\u4E16\u754C\u518D\u8BD5");let r=re(t.value,0,!0).root.value.Inventory;if(!r||r.t!==9)return P("\u73A9\u5BB6\u6570\u636E\u91CC\u6CA1\u6709\u80CC\u5305");let o=[];if(r.v.forEach((s,c)=>{if(!s||s.t!==10)return;let l=s.v.Name;if(!(l?String(l.v):"").includes("written_book"))return;let d=s.v.tag&&s.v.tag.t===10?s.v.tag.v:null,p=d&&d.pages,u=p&&p.t===9?p.v.map(b=>String(b.v)):[];o.push({idx:c,count:s.v.Count?Number(s.v.Count.v):1,title:d&&d.title?String(d.title.v):"",author:d&&d.author?String(d.author.v):"",pages:u})}),!o.length)return P("\u73A9\u5BB6\u80CC\u5305\u91CC\u6CA1\u6709\u6210\u4E66\uFF08written_book\uFF09\uFF1B\u6210\u4E66\u7B7E\u8FC7\u540D\u540E\u624D\u4F1A\u5B58\u8FD9\u79CD\u683C\u5F0F");x("workspace").style.display="block",x("structureView").style.display="none",x("editor").innerHTML=`<div class="edhead"><div><b>\u4E66\u5185\u5BB9\u7F16\u8F91</b><span class="muted">\u3000\u5171 ${o.length} \u672C\uFF08\u53EA\u8BFB\u73A9\u5BB6\u80CC\u5305\uFF09</span></div></div>
      ${o.map((s,c)=>`<div class="bookcard">
        <p class="muted">\u69FD\u4F4D ${s.idx}\u3000\u6570\u91CF ${s.count}</p>
        <div class="row2"><input id="bkTitle${c}" placeholder="\u4E66\u540D" value="${G(s.title)}"><input id="bkAuthor${c}" placeholder="\u4F5C\u8005" value="${G(s.author)}"></div>
        <label>\u9875\u9762\u6587\u5B57\uFF08\u7528\u5355\u72EC\u4E00\u884C \`\`\` \u5206\u9875\uFF09</label>
        <textarea id="bkPages${c}" class="code" style="height:180px">${G(s.pages.join("\n```\n"))}</textarea>
        <div class="edbar"><button class="bkSave" data-bi="${c}">\u5199\u56DE\u8FD9\u672C\u4E66</button></div>
      </div>`).join("")}
      <p class="muted">\u5199\u5165\u65B9\u5F0F\uFF1A\u628A\u6574\u4E2A\u73A9\u5BB6 NBT \u91CD\u65B0\u7F16\u7801\u540E\u8FFD\u52A0 WriteBatch \u5230 db \u65E5\u5FD7\uFF0C\u5BFC\u51FA\u65B0\u5305\u540E\u751F\u6548\uFF1B\u6539\u524D\u5EFA\u8BAE\u5148\u5BFC\u51FA\u5907\u4EFD\u3002</p>`,document.querySelectorAll(".bkSave").forEach(s=>{s.onclick=async()=>{let c=Number(s.dataset.bi),l=o[c],m=document.getElementById("bkPages"+c).value.split("\n```\n"),d=document.getElementById("bkTitle"+c).value.trim(),p=document.getElementById("bkAuthor"+c).value.trim();try{let u=ws(t.value,l.idx,m,d,p),b=await ot(),g=await _n(b,{});await g.init({});let f=h.archive.files.filter(w=>/(^|\/)(MANIFEST-[0-9]+|[0-9]+\.(ldb|log))$/.test(w.path)).map(w=>({name:de(w.path),data:w.data})),_=ca(f,"~local_player",u,g.lastSequence+1),y=h.archive.paths().find(w=>de(w)===_.logName)||"db/"+_.logName;h.archive.setBytes(y,_.bytes),h.db=null,h.statsDirty=!0,N("\u4E66\u5DF2\u5199\u56DE\uFF1A\u69FD\u4F4D "+l.idx+"\uFF0C"+m.length+" \u9875\uFF0C\u65E5\u5FD7 "+_.logName)}catch(u){console.error(u),P("\u5199\u5165\u5931\u8D25\uFF1A"+u.message)}}}),N("\u627E\u5230\u6210\u4E66 "+o.length+" \u672C\uFF1A"+o.map(s=>(s.title||"\u65E0\u9898")+"\uFF08"+s.pages.length+" \u9875\uFF09").join("\u3001"))}catch(e){console.error(e),P(e.message)}}function Ks(e,n,t){let a=document.createElement("div");a.className="codeedit";let i=po(e),r=document.createElement("pre");r.className="codehi";let o=document.createElement("textarea");o.className="code",o.spellcheck=!1,o.value=n;let s=()=>{r.innerHTML=fo(o.value,i)+`
`};return s(),o.oninput=s,o.onscroll=()=>{r.scrollTop=o.scrollTop,r.scrollLeft=o.scrollLeft},a.appendChild(r),a.appendChild(o),{wrap:a,ta:o,paint:s}}function Ii(){let e=!h.archive,n=x("newPackRow");n&&(n.style.display=e?"flex":"none")}function Li(){jo({state:h,Archive:$e,setupArchive:ha,log:N,$:x})}function Id(e){let n=e>>>0;return()=>{n=n+1831565813>>>0;let t=n;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Gs(e){let n=e.replace("#","");return[parseInt(n.slice(0,2),16),parseInt(n.slice(2,4),16),parseInt(n.slice(4,6),16)]}function js(e){let n=e.toDataURL("image/png").split(",")[1],t=atob(n),a=new Uint8Array(t.length);for(let i=0;i<t.length;i++)a[i]=t.charCodeAt(i);return a}function zd(e,n,t,a){e.width=n,e.height=n;let i=e.getContext("2d"),r=i.createImageData(n,n),[o,s,c]=Gs(a||"#8a8a8a"),l=Id(t.length*977+n*31+o),m=(p,u,b,g,f,_)=>{let y=(u*n+p)*4;r.data[y]=b,r.data[y+1]=g,r.data[y+2]=f,r.data[y+3]=_===void 0?255:_},d=p=>Math.max(0,Math.min(255,Math.round(p)));for(let p=0;p<n;p++)for(let u=0;u<n;u++){let b=o,g=s,f=c;if(t==="\u77F3\u5934"||t==="\u77F3\u7816"){let _=(l()-.5)*46;b+=_,g+=_,f+=_,t==="\u77F3\u7816"&&(u%Math.max(4,n/4)===0||p%Math.max(4,n/4)===0)&&(b-=40,g-=40,f-=40)}else if(t==="\u6CE5\u571F"){let _=(l()-.5)*38;b+=_,g+=_*.8,f+=_*.7}else if(t==="\u8349\u65B9\u5757")if(p<n*.28)b=86+l()*40,g=150+l()*50,f=70+l()*30;else{let _=(l()-.5)*34;b+=_,g+=_*.8,f+=_*.7}else if(t==="\u6728\u5934"){let _=Math.sin(u/n*Math.PI*6+l()*.5)*18;b+=_,g+=_*.7,f+=_*.4}else if(t==="\u6728\u677F"){let _=p%Math.max(4,n/4)===0,y=(l()-.5)*20;b+=y-(_?30:0),g+=y-(_?22:0),f+=y-(_?15:0)}else if(t==="\u6811\u53F6")l()<.18?(b*=.6,g*=.75,f*=.6):(b+=20,g+=30,f+=10);else if(t==="\u91D1\u5C5E"){let _=p/n*60;b+=_,g+=_,f+=_,(u===0||p===0)&&(b+=30,g+=30,f+=30)}else if(t==="\u7F8A\u6BDB"){let _=(l()-.5)*16;b+=_,g+=_,f+=_}else if(t==="\u7816\u5757"){let _=Math.max(8,n/4),y=Math.max(4,n/8),v=Math.floor(p/y)%2*(_/2);if(p%y===0||(u+v)%_===0)b=150,g=150,f=150;else{let B=(l()-.5)*26;b+=B,g+=B,f+=B}}else if(t==="\u6C99\u5B50"){let _=(l()-.5)*30;b+=_,g+=_*.9,f+=_*.6}else if(t==="\u6C34"){let _=Math.sin(u/n*Math.PI*4+Math.cos(p/n*Math.PI*3))*26;b+=_*.3,g+=_*.6,f+=_}else if(t==="\u73BB\u7483")u===0||p===0||u===n-1||p===n-1?(b=220,g=235,f=245):(b=200,g=225,f=240,r.data);else if(t==="\u53D1\u5149"){let _=Math.sqrt(Math.pow(u-n/2,2)+Math.pow(p-n/2,2))/(n/2);b*=1-_*.4+.6,g*=1-_*.4+.6,f*=1-_*.4+.6}else{let _=(l()-.5)*12;b+=_,g+=_,f+=_}m(u,p,d(b),d(g),d(f),t==="\u73BB\u7483"&&!(u===0||p===0||u===n-1||p===n-1)?210:255)}return i.putImageData(r,0,0),e}function $d(e,n,t){e.width=n,e.height=n;let a=e.getContext("2d"),[i,r,o]=Gs(t||"#6aa84f"),s=n/16,c=(l,m,d,p,u)=>{a.fillStyle=u,a.fillRect(l*s,m*s,d*s,p*s)};return a.clearRect(0,0,n,n),c(5,2,6,5,`rgb(${i},${r},${o})`),c(6,4,1,1,"#111"),c(9,4,1,1,"#111"),c(7,5.6,2,.8,"#3a2b2b"),c(5.5,7,5,4,`rgb(${Math.max(0,i-25)},${Math.max(0,r-20)},${Math.max(0,o-25)})`),c(4,7.4,1.2,3,`rgb(${i},${r},${o})`),c(10.8,7.4,1.2,3,`rgb(${i},${r},${o})`),c(5.8,11,1.6,3,`rgb(${Math.max(0,i-40)},${Math.max(0,r-35)},${Math.max(0,o-35)})`),c(8.6,11,1.6,3,`rgb(${Math.max(0,i-40)},${Math.max(0,r-35)},${Math.max(0,o-35)})`),e}function qs(){let e=x("modalBody");e.innerHTML=`<h3>\u8D34\u56FE\u751F\u6210\u5668</h3>
    <label>\u5C3A\u5BF8</label><select id="txSize"><option>16</option><option selected>32</option><option>64</option><option>128</option></select>
    <label>\u7C7B\u578B</label><select id="txKind"><option value="block">\u65B9\u5757\u8D34\u56FE</option><option value="item">\u7269\u54C1\u56FE\u6807</option><option value="entity">\u5B9E\u4F53\u7ACB\u7ED8\uFF08\u975E\u5B98\u65B9 UV\uFF09</option></select>
    <label>\u98CE\u683C</label><select id="txStyle"><option>\u77F3\u5934</option><option>\u77F3\u7816</option><option>\u6CE5\u571F</option><option>\u8349\u65B9\u5757</option><option>\u6728\u5934</option><option>\u6728\u677F</option><option>\u6811\u53F6</option><option>\u91D1\u5C5E</option><option>\u7F8A\u6BDB</option><option>\u7816\u5757</option><option>\u6C99\u5B50</option><option>\u6C34</option><option>\u73BB\u7483</option><option>\u53D1\u5149</option></select>
    <label>\u4E3B\u8272</label><input id="txColor" type="color" value="#7d7d7d">
    <canvas id="txPreview" style="width:100%;max-width:220px;image-rendering:pixelated;border-radius:8px;border:1px solid #26313a;margin:8px auto;display:block"></canvas>
    <label>\u5199\u5165\u5305\u5185\u8DEF\u5F84\uFF08\u53EF\u9009\uFF09</label><input id="txPath" placeholder="resource_packs/xxx/textures/blocks/a.png">
    <div class="edbar"><button id="txExport">\u5BFC\u51FA PNG</button><button id="txWrite">\u5199\u5165\u5F53\u524D\u5305</button><button id="txClose" class="ghost">\u5173\u95ED</button></div>`,x("modal").style.display="flex";let n=document.getElementById("txPreview"),t=()=>{let a=Number(document.getElementById("txSize").value),i=document.getElementById("txKind").value,r=document.getElementById("txStyle").value,o=document.getElementById("txColor").value;i==="entity"?$d(n,a,o):zd(n,a,r,o)};["txSize","txKind","txStyle","txColor"].forEach(a=>document.getElementById(a).onchange=t),t(),document.getElementById("txClose").onclick=()=>{x("modal").style.display="none"},document.getElementById("txExport").onclick=async()=>{await we("texture_"+document.getElementById("txSize").value+"_"+Date.now()+".png",js(n))},document.getElementById("txWrite").onclick=()=>{if(!h.archive)return P("\u5148\u6253\u5F00\u4E00\u4E2A\u5305\u6216\u751F\u6210\u4E00\u4E2A\u5305");let a=document.getElementById("txPath").value.trim();if(!a)return P("\u586B\u4E00\u4E2A\u5305\u5185\u8DEF\u5F84");h.archive.setBytes(a,js(n)),le(),N("\u5DF2\u5199\u5165 "+a+"\uFF08\u5BFC\u51FA\u540E\u751F\u6548\uFF09")}}function Td(){let e=x("modalBody"),n=[["\u641C\u7D22\u6587\u4EF6","\u6309\u6587\u4EF6\u540D/\u8DEF\u5F84\u8FC7\u6EE4\u6587\u4EF6\u6811",Xs],["\u641C\u7D22\u5185\u5BB9","\u5728\u6587\u672C\u6587\u4EF6\u91CC\u641C\u5173\u952E\u5B57\uFF08\u6700\u591A 60 \u6761\uFF09",Ys],["\u590D\u5236\u6587\u4EF6/\u6587\u4EF6\u5939","\u5305\u5185\u590D\u5236\u5230\u65B0\u8DEF\u5F84",Nd],["\u6279\u91CF\u5BFC\u51FA","\u6309\u6269\u5C55\u540D\u6311\u6587\u4EF6\u6253\u5305\u6210 zip",Ld],["\u5B8C\u6574\u6027\u68C0\u67E5","manifest / UUID / \u8DEF\u5F84 / PNG / \u8D34\u56FE\u5F15\u7528",Ad],["\u4E00\u952E\u6253\u5305","\u81EA\u52A8\u5224\u65AD .mcpack / .mcaddon / .mcworld",jd],["\u5185\u5D4C\u5305\u6D4F\u89C8","\u5217\u51FA\u5305\u5185 .mcpack/.mcaddon/.zip/.brarchive",Pd],["JSON \u6279\u91CF\u7F8E\u5316","\u6240\u6709 JSON \u7EDF\u4E00\u4E24\u7A7A\u683C\u7F29\u8FDB",Dd],["\u5168\u5C40\u6587\u672C\u66FF\u6362","\u8DE8\u6587\u4EF6\u66FF\u6362\u5E76\u7EDF\u8BA1\u6B21\u6570",Ud],["\u5BFC\u51FA\u5168\u90E8\u7ED3\u6784","\u628A\u5305\u91CC\u6240\u6709 .mcstructure \u6253\u6210 zip",Rd],["\u7ED3\u6784\u8F6C mcfunction","\u5F53\u524D\u7ED3\u6784\u8F93\u51FA setblock \u6307\u4EE4",Fd],["\u73A9\u5BB6\u5217\u8868","\u5217\u51FA\u6570\u636E\u5E93\u91CC\u7684\u73A9\u5BB6\u952E\u4E0E\u5750\u6807",Od],["\u4E66\u5185\u5BB9\u7F16\u8F91","\u8BFB\u53D6\u73A9\u5BB6\u80CC\u5305\u91CC\u7684\u6210\u4E66\uFF0C\u6539\u9875\u9762/\u4E66\u540D/\u4F5C\u8005",Md],["\u80CC\u5305\u69FD\u4F4D\u8C03\u6574","\u6539\u7269\u54C1\u5728\u80CC\u5305\u91CC\u7684\u69FD\u4F4D\uFF0C\u81EA\u52A8\u4EA4\u6362\u4E0D\u4E22\u7269\u54C1",Cd],["\u65B0\u5EFA\u9644\u52A0\u5305\uFF08\u5236\u4F5C\u5668\uFF09","\u4ECE\u96F6\u751F\u6210\u884C\u4E3A\u5305 + \u8D44\u6E90\u5305",Li],["\u521B\u4F5C\u5DE5\u574A","\u8D34\u56FE\u751F\u6210 / \u8BED\u6CD5\u6A21\u677F / \u4EE3\u7801\u7247\u6BB5",Qs],["\u8D34\u56FE\u751F\u6210\u5668","16/32/64/128 \u65B9\u5757\u3001\u7269\u54C1\u3001\u5B9E\u4F53\u7ACB\u7ED8",qs],["\u8BED\u6CD5\u6A21\u677F\u5E93","JSON / JS / TS / Python \u4EE3\u7801\u7247\u6BB5",Ai],["\u76AE\u80A4\u5236\u4F5C\u5668","64\xD764 \u624B\u52A8\u50CF\u7D20\u7ED8\u5236 / \u4EE3\u7801\u751F\u6210 / \u5BFC\u51FA PNG",()=>oi("skin")],["\u62AB\u98CE\u5236\u4F5C\u5668","64\xD732 \u62AB\u98CE\u7ED8\u5236 / \u4EE3\u7801\u751F\u6210 / \u5BFC\u51FA PNG",()=>oi("cape")],["Java \u5B58\u6863","\u8BFB .zip/.mca/.nbt\uFF0C\u7EDF\u8BA1\u3001\u5730\u56FE\u3001\u73A9\u5BB6\u3001level.dat",Yo],["Java \u6A21\u7EC4\u5236\u4F5C\u5668","\u751F\u6210 Fabric / Forge / NeoForge \u5DE5\u7A0B\uFF08\u6E90\u7801+\u6784\u5EFA\u811A\u672C\uFF09",Qo],["\u5B58\u6863\u8F6C\u6362","\u57FA\u5CA9\u7248 \u21C4 Java \u53CC\u65B9\u5411\u5730\u5F62\u8F6C\u6362\uFF0C\u4E0D\u9700\u8981 mod",ns],["\u6A21\u7EC4\u8F6C\u6362","\u57FA\u5CA9\u9644\u52A0\u5305 \u21C4 Java \u6A21\u7EC4\u5DE5\u7A0B\uFF0C\u8D34\u56FE/\u7269\u54C1/\u65B9\u5757/\u914D\u65B9",rs],["\u5DE5\u5177\u4E2D\u5FC3","20 \u4E2A\u79BB\u7EBF\u5C0F\u5DE5\u5177\uFF1AUUID/\u6E05\u5355/\u8D34\u56FE/\u7ED3\u6784/\u62A5\u544A",ds]];e.innerHTML='<h3>\u66F4\u591A\u5DE5\u5177</h3><p class="muted">\u5168\u90E8\u79BB\u7EBF\u6267\u884C\uFF0C\u4E0D\u6539\u539F\u6587\u4EF6\uFF0C\u5BFC\u51FA\u540E\u624D\u4F1A\u751F\u6210\u65B0\u5305\u3002</p>'+n.map(([t,a],i)=>`<button class="toolitem" data-i="${i}"><b>${t}</b><span>${a}</span></button>`).join("")+'<div class="modalbtns"><button id="toolsClose" class="ghost">\u5173\u95ED</button></div>',x("modal").style.display="flex",document.getElementById("toolsClose").onclick=()=>{x("modal").style.display="none"},e.querySelectorAll(".toolitem").forEach(t=>{t.onclick=()=>{x("modal").style.display="none",n[+t.dataset.i][2]()}})}async function Xs(){let e=await Le("\u641C\u7D22\u6587\u4EF6",[{key:"q",label:"\u6587\u4EF6\u540D\u6216\u8DEF\u5F84\u5305\u542B",placeholder:"\u4F8B\u5982 textures \u6216 stone"}]);if(!e||!e.q.trim()){h.filterQ=null,le();return}h.filterQ=e.q.trim(),le()}async function Ys(){let e=await Le("\u641C\u7D22\u5185\u5BB9",[{key:"q",label:"\u8981\u67E5\u627E\u7684\u6587\u672C",placeholder:"\u4F8B\u5982 diamond"}]);if(!e||!e.q)return;let n=e.q,t=[];for(let a of h.archive.files){if(t.length>=60)break;if(a.data.length>1024*1024||!Yn(a.path,a.data))continue;let i=new TextDecoder("utf-8").decode(a.data),r=i.indexOf(n);if(r>=0){let o=i.slice(0,r).split(`
`).length;t.push(a.path+":"+o+"\u3000"+i.slice(Math.max(0,r-30),r+n.length+30).replace(/\n/g," "))}}P(t.length?"":"\u6CA1\u6709\u627E\u5230\u5305\u542B\u8BE5\u6587\u672C\u7684\u6587\u4EF6"),N("\u5185\u5BB9\u641C\u7D22\u201C"+n+"\u201D\uFF1A"+t.length+" \u4E2A\u6587\u4EF6"),t.forEach(a=>N("\xB7 "+a)),x("modalBody").innerHTML='<h3>\u641C\u7D22\u7ED3\u679C</h3><pre class="dbpre">'+G(t.join(`
`)||"\u65E0\u7ED3\u679C")+'</pre><div class="modalbtns"><button id="toolsClose2" class="ghost">\u5173\u95ED</button></div>',x("modal").style.display="flex",document.getElementById("toolsClose2").onclick=()=>{x("modal").style.display="none"}}async function Nd(){if(!h.selected)return P("\u5148\u5728\u6587\u4EF6\u6811\u91CC\u9009\u4E00\u4E2A\u6587\u4EF6\u6216\u6587\u4EF6\u5939");let e=h.selected,n=!h.archive.get(e),t=await Le("\u590D\u5236",[{key:"to",label:"\u76EE\u6807\u8DEF\u5F84",value:e+(n?"_copy":"_copy"+Yt(e))}]);if(!t||!t.to.trim())return;let a=t.to.trim();if(n){let i=e+"/",r=h.archive.files.filter(o=>o.path.startsWith(i));r.forEach(o=>h.archive.setBytes(a+"/"+o.path.slice(i.length),o.data)),N("\u5DF2\u590D\u5236\u6587\u4EF6\u5939 "+e+" \u2192 "+a+"\uFF08"+r.length+" \u4E2A\u6587\u4EF6\uFF09")}else h.archive.setBytes(a,h.archive.getBytes(e)),N("\u5DF2\u590D\u5236 "+e+" \u2192 "+a);le()}async function Ld(){let e=await Le("\u6279\u91CF\u5BFC\u51FA",[{key:"ext",label:"\u6269\u5C55\u540D\uFF08\u7A7A=\u5168\u90E8\u5E26\u540E\u7F00\u7684\u6587\u4EF6\uFF09",placeholder:".json"}]);if(!e)return;let n=e.ext.trim().toLowerCase(),t=h.archive.files.filter(i=>!n||i.path.toLowerCase().endsWith(n));if(!t.length)return P("\u6CA1\u6709\u5339\u914D\u7684\u6587\u4EF6");let a=new $e("zip",t.map(i=>({path:i.path,data:i.data}))).toBytes();await we("\u6279\u91CF\u5BFC\u51FA_"+(n.replace(".","")||"all")+".zip",a),N("\u5DF2\u6253\u5305\u5BFC\u51FA "+t.length+" \u4E2A\u6587\u4EF6")}async function Ad(){let e=[],n=h.archive.paths(),t=new Map;for(let i of n){i.includes("\\")&&e.push("\u53CD\u659C\u6760\u8DEF\u5F84\uFF1A"+i),(i.startsWith("/")||i.includes("../"))&&e.push("\u975E\u6CD5\u8DEF\u5F84\uFF1A"+i);let r=i.toLowerCase();t.has(r)?e.push("\u5927\u5C0F\u5199\u91CD\u590D\uFF1A"+i+" \u2194 "+t.get(r)):t.set(r,i)}let a=new Map;for(let i of n.filter(r=>/manifest\.json$/i.test(r)))try{let r=JSON.parse(h.archive.getText(i)),o=r.header||{};for(let s of["uuid","name","version","description"])o[s]||e.push(i+" \u7F3A header."+s);o.uuid&&(a.has(o.uuid)?e.push("UUID \u91CD\u590D\uFF1A"+i+" \u2194 "+a.get(o.uuid)):a.set(o.uuid,i)),(r.dependencies||[]).forEach(s=>{s.uuid||e.push(i+" \u4F9D\u8D56\u9879\u7F3A uuid")})}catch(r){e.push(i+" JSON \u89E3\u6790\u5931\u8D25\uFF1A"+r.message)}for(let i of n.filter(r=>/\.png$/i.test(r))){let r=h.archive.getBytes(i);(r.length<8||r[0]!==137||r[1]!==80)&&e.push("PNG \u5934\u635F\u574F\uFF1A"+i)}for(let i of n.filter(r=>/terrain_texture\.json$/i.test(r)))try{let r=$i(h.archive.getText(i)),o=i.slice(0,i.lastIndexOf("/")).replace(/\/textures$/,"");for(let[s,c]of Object.entries(r.texture_data||{})){let l=Array.isArray(c.textures)?c.textures[0]:c.textures;if(l&&typeof l=="object"&&(l=l.path||l.texture),typeof l!="string")continue;let m=(o+"/textures/"+l.replace(/^textures\//,"")+".png").toLowerCase();n.some(d=>d.toLowerCase()===m)||e.push("\u8D34\u56FE\u7F3A\u5931\uFF1A"+s+" \u2192 "+m)}}catch(r){e.push(i+" \u6750\u8D28\u6E05\u5355\u89E3\u6790\u5931\u8D25\uFF1A"+r.message)}for(let i of h.archive.files)i.data.length===0&&e.push("\u7A7A\u6587\u4EF6\uFF1A"+i.path);x("modalBody").innerHTML='<h3>\u5B8C\u6574\u6027\u68C0\u67E5</h3><p class="muted">\u6587\u4EF6 '+n.length+" \u4E2A\uFF0C\u95EE\u9898 "+e.length+' \u6761</p><pre class="dbpre">'+G(e.slice(0,200).join(`
`)||"\u6CA1\u6709\u53D1\u73B0\u95EE\u9898")+'</pre><div class="modalbtns"><button id="toolsClose3" class="ghost">\u5173\u95ED</button></div>',x("modal").style.display="flex",document.getElementById("toolsClose3").onclick=()=>{x("modal").style.display="none"},N("\u5B8C\u6574\u6027\u68C0\u67E5\uFF1A"+e.length+" \u4E2A\u95EE\u9898")}async function jd(){let e=h.archive.paths(),n=e.some(o=>/^behavior_packs\//.test(o))||e.some(o=>o.includes("behavior_pack")),t=e.some(o=>/^resource_packs\//.test(o))||e.some(o=>o.includes("resource_pack")),i=e.includes("level.dat")?".mcworld":n&&t?".mcaddon":".mcpack",r=(h.name||"pack").replace(/\.(mcpack|mcaddon|mcworld|mctemplate|zip|brarchive)$/i,"");await we(r+"_repack"+i,h.archive.toBytes()),N("\u5DF2\u6309\u5185\u5BB9\u6253\u5305\u4E3A "+i)}async function Pd(){let e=h.archive.files.filter(n=>/\.(mcpack|mcaddon|mcworld|mctemplate|zip|brarchive)$/i.test(n.path));if(!e.length)return P("\u5305\u91CC\u6CA1\u6709\u5185\u5D4C\u7684\u5305\u6587\u4EF6");x("modalBody").innerHTML="<h3>\u5185\u5D4C\u5305</h3>"+e.map((n,t)=>'<button class="toolitem" data-i="'+t+'"><b>'+G(n.path)+"</b><span>"+Xe(n.data.length)+"</span></button>").join("")+'<div class="modalbtns"><button id="toolsClose4" class="ghost">\u5173\u95ED</button></div>',x("modal").style.display="flex",document.getElementById("toolsClose4").onclick=()=>{x("modal").style.display="none"},x("modalBody").querySelectorAll(".toolitem").forEach(n=>{n.onclick=()=>{x("modal").style.display="none";try{h.archive=$e.fromBytes(e[+n.dataset.i].path,e[+n.dataset.i].data),h.texIndex=null,h.texCache=new Map,h.texPending=new Set,h.texPacks=[],ha("",""),N("\u5DF2\u6253\u5F00\u5185\u5D4C\u5305\uFF1A"+e[+n.dataset.i].path)}catch(t){P(t.message)}}})}async function Dd(){let e=0,n=0;for(let t of h.archive.files.filter(a=>/\.json$/i.test(a.path)&&a.data.length<2*1024*1024))try{t.data=new TextEncoder().encode(JSON.stringify($i(new TextDecoder("utf-8").decode(t.data)),null,2)),e++}catch{n++}h.statsDirty=!0,le(),N("JSON \u7F8E\u5316\uFF1A"+e+" \u4E2A\u6210\u529F\uFF0C"+n+" \u4E2A\u8DF3\u8FC7")}async function Ud(){let e=await Le("\u5168\u5C40\u6587\u672C\u66FF\u6362",[{key:"from",label:"\u67E5\u627E"},{key:"to",label:"\u66FF\u6362\u4E3A"},{key:"ext",label:"\u9650\u5B9A\u6269\u5C55\u540D\uFF08\u53EF\u7A7A\uFF09",value:".json"}]);if(!e||!e.from)return;let n=e.ext.trim().toLowerCase(),t=0,a=0;for(let i of h.archive.files){if(n&&!i.path.toLowerCase().endsWith(n)||i.data.length>2*1024*1024||!Yn(i.path,i.data))continue;let r=new TextDecoder("utf-8").decode(i.data);if(!r.includes(e.from))continue;let o=r.split(e.from);a+=o.length-1,t++,i.data=new TextEncoder().encode(o.join(e.to))}h.statsDirty=!0,le(),N("\u66FF\u6362\u5B8C\u6210\uFF1A"+t+" \u4E2A\u6587\u4EF6\uFF0C\u5171 "+a+" \u5904")}async function Rd(){let e=h.archive.files.filter(t=>/\.mcstructure$/i.test(t.path));if(!e.length)return P("\u5305\u91CC\u6CA1\u6709 .mcstructure");let n=new $e("zip",e.map(t=>({path:t.path,data:t.data}))).toBytes();await we("structures_"+e.length+".zip",n),N("\u5DF2\u5BFC\u51FA "+e.length+" \u4E2A\u7ED3\u6784\u6587\u4EF6")}async function Fd(){if(!h.structure)return P("\u5148\u5728\u6587\u4EF6\u6811\u91CC\u6253\u5F00\u4E00\u4E2A .mcstructure");let e=h.structure,[n,t,a]=e.size,i=["# \u7531 MCBE \u5DE5\u5177\u7BB1\u6309\u7ED3\u6784\u751F\u6210","# \u5C3A\u5BF8 "+n+"\xD7"+t+"\xD7"+a];for(let r=0;r<n;r++)for(let o=0;o<t;o++)for(let s=0;s<a&&!(i.length>12e4);s++){let c=(e.indices[0]||[])[(r*a+s)*t+o];if(c<0||c===void 0)continue;let l=e.palette[c];l&&i.push("setblock "+r+" "+o+" "+s+" "+l.name)}await we((h.name||"structure").replace(/\.[^.]+$/,"")+".mcfunction",new TextEncoder().encode(i.join(`
`))),N("\u5DF2\u751F\u6210 mcfunction\uFF1A"+i.length+" \u884C")}async function Od(){h.db||(h.db=await window.MCBE.readLevelDb(await ot(),{}));let e=[];for(let[n,t]of h.db){if(!n.includes("player")&&n[0]!=="~")continue;let a="-";try{let i=ki(t.value);i.pos&&(a=i.pos.map(r=>r.toFixed(1)).join(", "))}catch{}e.push(n+"\u3000\u5750\u6807 "+a)}x("modalBody").innerHTML='<h3>\u73A9\u5BB6\u6570\u636E</h3><pre class="dbpre">'+G(e.join(`
`)||"\u6CA1\u6709\u627E\u5230\u73A9\u5BB6\u952E")+'</pre><div class="modalbtns"><button id="toolsClose5" class="ghost">\u5173\u95ED</button></div>',x("modal").style.display="flex",document.getElementById("toolsClose5").onclick=()=>{x("modal").style.display="none"}}async function Ai(){let e=Ao;x("modalBody").innerHTML='<h3>\u8BED\u6CD5\u6A21\u677F\u5E93</h3><p class="muted">JSON / JS \u662F\u57FA\u5CA9\u7248\u80FD\u6267\u884C\u7684\uFF1BTS \u9700\u81EA\u884C\u7F16\u8BD1\uFF1BPython \u6E38\u620F\u4E0D\u6267\u884C\uFF0C\u4EC5\u4F5C\u53C2\u8003\u3002</p>'+e.map((n,t)=>`<button class="toolitem" data-i="${t}"><b>[${n.lang}] ${n.title}</b><span>\u70B9\u51FB\u67E5\u770B\u4EE3\u7801</span></button>`).join("")+'<div class="modalbtns"><button id="snClose" class="ghost">\u5173\u95ED</button></div>',x("modal").style.display="flex",document.getElementById("snClose").onclick=()=>{x("modal").style.display="none"},x("modalBody").querySelectorAll(".toolitem").forEach(n=>{n.onclick=()=>{let t=e[+n.dataset.i];x("modalBody").innerHTML="<h3>"+t.title+"\uFF08"+t.lang+'\uFF09</h3><pre class="dbpre">'+G(t.code)+'</pre><div class="modalbtns"><button id="snSave">\u4FDD\u5B58\u4E3A\u6587\u4EF6</button><button id="snBack" class="ghost">\u8FD4\u56DE\u5217\u8868</button></div>',document.getElementById("snBack").onclick=Ai,document.getElementById("snSave").onclick=async()=>{let a={JSON:".json",JS:".js",TS:".ts",PY:".py"}[t.lang]||".txt";await we("\u6A21\u677F_"+t.title.replace(/[^0-9A-Za-z\u4e00-\u9fa5]+/g,"_")+a,new TextEncoder().encode(t.code))}}})}function Qs(){x("modalBody").innerHTML=`<h3>\u521B\u4F5C\u5DE5\u574A</h3><p class="muted">\u4ECE\u6A21\u677F\u5F80\u5F53\u524D\u5305\u5199\u5185\u5BB9\uFF1B\u65B0\u5EFA\u5B8C\u6574\u9644\u52A0\u5305\u8BF7\u7528\u201C\u9644\u52A0\u5305\u5236\u4F5C\u5668\uFF08\u91CD\u7F6E\u7248\uFF09\u201D\u3002</p>
    <button class="toolitem" id="stPack"><b>\u65B0\u5EFA\u9644\u52A0\u5305\uFF08\u91CD\u7F6E\u7248\uFF09</b><span>\u65B9\u5757/\u7269\u54C1/\u751F\u7269/\u811A\u672C\u5B8C\u6574\u751F\u6210\uFF0C\u81EA\u52A8\u5199 manifest \u4E0E\u8BED\u8A00\u6587\u4EF6</span></button>
    <button class="toolitem" id="stTex"><b>\u8D34\u56FE\u751F\u6210\u5668</b><span>16/32/64/128\uFF0C\u65B9\u5757/\u7269\u54C1/\u5B9E\u4F53\u7ACB\u7ED8</span></button>
    <button class="toolitem" id="stSnip"><b>\u8BED\u6CD5\u6A21\u677F\u5E93</b><span>JSON / JS / TS / Python / Lua / mcfunction \u7247\u6BB5</span></button>
    <div class="modalbtns"><button id="stClose" class="ghost">\u5173\u95ED</button></div>`,x("modal").style.display="flex",document.getElementById("stClose").onclick=()=>{x("modal").style.display="none"},x("modalBody").querySelectorAll(".slotrow").forEach((e,n)=>{e.onclick=()=>showStructurePreview(marks[n])}),document.getElementById("stPack").onclick=Li,document.getElementById("stTex").onclick=qs,document.getElementById("stSnip").onclick=Ai}function Hd(){ss(),cs(),bs(),window.onerror=e=>P("\u811A\u672C\u9519\u8BEF\uFF1A"+e),x("btnLocalize").addEventListener("click",xd),x("btnNameFix").addEventListener("click",Sd),x("btnTools").addEventListener("click",Td),window.addEventListener("mcShortcut",e=>{e.detail==="search"?Xs():e.detail==="contentSearch"&&Ys()}),x("btnMaker").addEventListener("click",Li),x("btnCreator").addEventListener("click",Qs),Ii(),x("btnMap").addEventListener("click",Ed),x("btnPlayer").addEventListener("click",Bd),x("fileInput").addEventListener("change",async()=>{let e=x("fileInput"),n=[...e.files];if(e.value="",!!n.length){if(n.length===1)return Ds(n[0]);await id(n)}}),x("pickBtn").onclick=()=>x("fileInput").click(),x("btnRename").onclick=bd,x("btnDelete").onclick=gd,x("btnNewFile").onclick=yd,x("btnNewFolder").onclick=vd,x("btnExport").onclick=wd,x("btnStats").onclick=kd,x("modal").addEventListener("click",e=>{e.target.id==="modal"&&(x("modal").style.display="none")}),N("\u5C31\u7EEA\uFF1A\u9009\u62E9 .mcpack / .mcaddon / .mcworld / .mctemplate / .brarchive / .mcstructure\u3002")}Hd();window.__openFile=Ds;window.__state=h;var _a=[["zh_CN","\u7B80\u4F53\u4E2D\u6587"],["zh_TW","\u7E41\u9AD4\u4E2D\u6587"],["en_US","English (US)"],["en_GB","English (UK)"],["ja_JP","\u65E5\u672C\u8A9E"],["ko_KR","\uD55C\uAD6D\uC5B4"],["fr_FR","Fran\xE7ais"],["de_DE","Deutsch"],["es_ES","Espa\xF1ol (Espa\xF1a)"],["es_MX","Espa\xF1ol (M\xE9xico)"],["pt_BR","Portugu\xEAs (Brasil)"],["pt_PT","Portugu\xEAs (Portugal)"],["ru_RU","\u0420\u0443\u0441\u0441\u043A\u0438\u0439"],["it_IT","Italiano"],["pl_PL","Polski"],["tr_TR","T\xFCrk\xE7e"],["nl_NL","Nederlands"],["sv_SE","Svenska"],["da_DK","Dansk"],["nb_NO","Norsk bokm\xE5l"],["fi_FI","Suomi"],["cs_CZ","\u010Ce\u0161tina"],["hu_HU","Magyar"],["ro_RO","Rom\xE2n\u0103"],["bg_BG","\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438"],["el_GR","\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC"],["uk_UA","\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"],["id_ID","Bahasa Indonesia"],["vi_VN","Ti\u1EBFng Vi\u1EC7t"],["th_TH","\u0E44\u0E17\u0E22"],["ar_SA","\u0627\u0644\u0639\u0631\u0628\u064A\u0629"],["he_IL","\u05E2\u05D1\u05E8\u05D9\u05EA"],["hi_IN","\u0939\u093F\u0928\u094D\u0926\u0940"]],tl=["\u9009\u62E9\u6587\u4EF6","\u5BFC\u51FA\u5B58\u6863","\u4E16\u754C\u7EDF\u8BA1","\u4E00\u952E\u6C49\u5316","\u8BD1\u540D\u4FEE\u6B63","\u66F4\u591A\u5DE5\u5177","\u5236\u4F5C\u5668","\u521B\u4F5C\u5DE5\u574A","\u4E16\u754C\u89C2\u770B","\u73A9\u5BB6\u6570\u636E","\u8FD4\u56DE\u6587\u4EF6\u5217\u8868","\u91CD\u65B0\u751F\u6210","\u7ED3\u6784\u5217\u8868","\u653E\u5927","\u7F29\u5C0F","\u9002\u5E94\u5BBD\u5EA6","\u786E\u5B9A","\u53D6\u6D88","\u4FDD\u5B58","\u5220\u9664","\u641C\u7D22","\u5173\u95ED","MC\u5DE5\u5177\u7BB1"],ji={zh_TW:["\u9078\u64C7\u6A94\u6848","\u532F\u51FA\u5B58\u6A94","\u4E16\u754C\u7D71\u8A08","\u4E00\u9375\u4E2D\u6587\u5316","\u8B6F\u540D\u4FEE\u6B63","\u66F4\u591A\u5DE5\u5177","\u88FD\u4F5C\u5668","\u5275\u4F5C\u5DE5\u574A","\u4E16\u754C\u89C0\u770B","\u73A9\u5BB6\u8CC7\u6599","\u8FD4\u56DE\u6A94\u6848\u6E05\u55AE","\u91CD\u65B0\u7522\u751F","\u7D50\u69CB\u6E05\u55AE","\u653E\u5927","\u7E2E\u5C0F","\u9069\u61C9\u5BEC\u5EA6","\u78BA\u5B9A","\u53D6\u6D88","\u5132\u5B58","\u522A\u9664","\u641C\u5C0B","\u95DC\u9589","MC\u5DE5\u5177\u7BB1"],en_US:["Choose file","Export world","World stats","One-click translate","Fix names","More tools","Maker","Creation studio","World map","Player data","Back to files","Regenerate","Structure list","Zoom in","Zoom out","Fit width","OK","Cancel","Save","Delete","Search","Close","MC Toolbox"],en_GB:["Choose file","Export world","World statistics","One-click translation","Fix names","More tools","Maker","Creation studio","World map","Player data","Back to files","Regenerate","Structure list","Zoom in","Zoom out","Fit width","OK","Cancel","Save","Delete","Search","Close","MC Toolbox"],ja_JP:["\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E","\u30EF\u30FC\u30EB\u30C9\u3092\u66F8\u304D\u51FA\u3059","\u30EF\u30FC\u30EB\u30C9\u7D71\u8A08","\u30EF\u30F3\u30AF\u30EA\u30C3\u30AF\u7FFB\u8A33","\u8A33\u540D\u4FEE\u6B63","\u305D\u306E\u4ED6\u306E\u30C4\u30FC\u30EB","\u30E1\u30FC\u30AB\u30FC","\u30AF\u30EA\u30A8\u30A4\u30C8\u5DE5\u623F","\u30EF\u30FC\u30EB\u30C9\u8868\u793A","\u30D7\u30EC\u30A4\u30E4\u30FC\u30C7\u30FC\u30BF","\u30D5\u30A1\u30A4\u30EB\u4E00\u89A7\u3078\u623B\u308B","\u518D\u751F\u6210","\u69CB\u9020\u7269\u4E00\u89A7","\u62E1\u5927","\u7E2E\u5C0F","\u5E45\u306B\u5408\u308F\u305B\u308B","OK","\u30AD\u30E3\u30F3\u30BB\u30EB","\u4FDD\u5B58","\u524A\u9664","\u691C\u7D22","\u9589\u3058\u308B","MCBE \u30C4\u30FC\u30EB\u30DC\u30C3\u30AF\u30B9"],ko_KR:["\uD30C\uC77C \uC120\uD0DD","\uC6D4\uB4DC \uB0B4\uBCF4\uB0B4\uAE30","\uC6D4\uB4DC \uD1B5\uACC4","\uC6D0\uD074\uB9AD \uBC88\uC5ED","\uC774\uB984 \uC218\uC815","\uB354 \uB9CE\uC740 \uB3C4\uAD6C","\uC81C\uC791\uAE30","\uCC3D\uC791 \uACF5\uBC29","\uC6D4\uB4DC \uBCF4\uAE30","\uD50C\uB808\uC774\uC5B4 \uB370\uC774\uD130","\uD30C\uC77C \uBAA9\uB85D\uC73C\uB85C","\uB2E4\uC2DC \uC0DD\uC131","\uAD6C\uC870\uBB3C \uBAA9\uB85D","\uD655\uB300","\uCD95\uC18C","\uB108\uBE44\uC5D0 \uB9DE\uCD94\uAE30","\uD655\uC778","\uCDE8\uC18C","\uC800\uC7A5","\uC0AD\uC81C","\uAC80\uC0C9","\uB2EB\uAE30","MCBE \uB3C4\uAD6C\uC0C1\uC790"],fr_FR:["Choisir un fichier","Exporter le monde","Statistiques du monde","Traduction en un clic","Corriger les noms","Plus d\u2019outils","Cr\xE9ateur","Atelier de cr\xE9ation","Carte du monde","Donn\xE9es du joueur","Retour aux fichiers","R\xE9g\xE9n\xE9rer","Liste des structures","Zoom avant","Zoom arri\xE8re","Ajuster \xE0 la largeur","OK","Annuler","Enregistrer","Supprimer","Rechercher","Fermer","Bo\xEEte \xE0 outils MCBE"],de_DE:["Datei ausw\xE4hlen","Welt exportieren","Weltstatistik","Ein-Klick-\xDCbersetzung","Namenskorrektur","Mehr Tools","Ersteller","Kreativwerkstatt","Weltkarte","Spielerdaten","Zur\xFCck zur Dateiliste","Neu erzeugen","Strukturliste","Vergr\xF6\xDFern","Verkleinern","An Breite anpassen","OK","Abbrechen","Speichern","L\xF6schen","Suchen","Schlie\xDFen","MCBE Werkzeugkasten"],es_ES:["Elegir archivo","Exportar mundo","Estad\xEDsticas del mundo","Traducci\xF3n en un clic","Correcci\xF3n de nombres","M\xE1s herramientas","Creador","Taller de creaci\xF3n","Vista del mundo","Datos del jugador","Volver a archivos","Regenerar","Lista de estructuras","Acercar","Alejar","Ajustar al ancho","Aceptar","Cancelar","Guardar","Eliminar","Buscar","Cerrar","Caja de herramientas MCBE"],es_MX:["Elegir archivo","Exportar mundo","Estad\xEDsticas del mundo","Traducci\xF3n en un clic","Correcci\xF3n de nombres","M\xE1s herramientas","Creador","Taller de creaci\xF3n","Vista del mundo","Datos del jugador","Volver a archivos","Regenerar","Lista de estructuras","Acercar","Alejar","Ajustar al ancho","Aceptar","Cancelar","Guardar","Eliminar","Buscar","Cerrar","Caja de herramientas MCBE"],pt_BR:["Escolher arquivo","Exportar mundo","Estat\xEDsticas do mundo","Tradu\xE7\xE3o em um clique","Corre\xE7\xE3o de nomes","Mais ferramentas","Criador","Oficina de cria\xE7\xE3o","Visualizar mundo","Dados do jogador","Voltar aos arquivos","Gerar novamente","Lista de estruturas","Ampliar","Reduzir","Ajustar \xE0 largura","OK","Cancelar","Salvar","Excluir","Pesquisar","Fechar","Caixa de ferramentas MCBE"],pt_PT:["Escolher ficheiro","Exportar mundo","Estat\xEDsticas do mundo","Tradu\xE7\xE3o num clique","Corre\xE7\xE3o de nomes","Mais ferramentas","Criador","Oficina de cria\xE7\xE3o","Ver mundo","Dados do jogador","Voltar aos ficheiros","Gerar novamente","Lista de estruturas","Ampliar","Reduzir","Ajustar \xE0 largura","OK","Cancelar","Guardar","Eliminar","Pesquisar","Fechar","Caixa de ferramentas MCBE"],ru_RU:["\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B","\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u043C\u0438\u0440\u0430","\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043C\u0438\u0440\u0430","\u041F\u0435\u0440\u0435\u0432\u043E\u0434 \u0432 \u043E\u0434\u0438\u043D \u043A\u043B\u0438\u043A","\u0418\u0441\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0439","\u0411\u043E\u043B\u044C\u0448\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432","\u0421\u043E\u0437\u0434\u0430\u0442\u0435\u043B\u044C","\u0422\u0432\u043E\u0440\u0447\u0435\u0441\u043A\u0430\u044F \u043C\u0430\u0441\u0442\u0435\u0440\u0441\u043A\u0430\u044F","\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043C\u0438\u0440\u0430","\u0414\u0430\u043D\u043D\u044B\u0435 \u0438\u0433\u0440\u043E\u043A\u0430","\u041D\u0430\u0437\u0430\u0434 \u043A \u0444\u0430\u0439\u043B\u0430\u043C","\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C","\u0421\u043F\u0438\u0441\u043E\u043A \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440","\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C","\u0423\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C","\u041F\u043E \u0448\u0438\u0440\u0438\u043D\u0435","\u041E\u041A","\u041E\u0442\u043C\u0435\u043D\u0430","\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C","\u0423\u0434\u0430\u043B\u0438\u0442\u044C","\u041F\u043E\u0438\u0441\u043A","\u0417\u0430\u043A\u0440\u044B\u0442\u044C","\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B MCBE"],it_IT:["Scegli file","Esporta mondo","Statistiche mondo","Traduzione in un clic","Correggi nomi","Altri strumenti","Creatore","Officina creativa","Visualizza mondo","Dati giocatore","Torna ai file","Rigenera","Elenco strutture","Ingrandisci","Riduci","Adatta alla larghezza","OK","Annulla","Salva","Elimina","Cerca","Chiudi","Cassetta strumenti MCBE"],pl_PL:["Wybierz plik","Eksportuj \u015Bwiat","Statystyki \u015Bwiata","T\u0142umaczenie jednym klikni\u0119ciem","Popraw nazwy","Wi\u0119cej narz\u0119dzi","Kreator","Warsztat kreatywny","Widok \u015Bwiata","Dane gracza","Powr\xF3t do plik\xF3w","Wygeneruj ponownie","Lista struktur","Powi\u0119ksz","Pomniejsz","Dopasuj szeroko\u015B\u0107","OK","Anuluj","Zapisz","Usu\u0144","Szukaj","Zamknij","Skrzynka narz\u0119dzi MCBE"],tr_TR:["Dosya se\xE7","D\xFCnyay\u0131 d\u0131\u015Fa aktar","D\xFCnya istatistikleri","Tek t\u0131kla \xE7eviri","Ad d\xFCzeltme","Daha fazla ara\xE7","Olu\u015Fturucu","Yarat\u0131m at\xF6lyesi","D\xFCnya g\xF6r\xFCn\xFCm\xFC","Oyuncu verileri","Dosyalara d\xF6n","Yeniden olu\u015Ftur","Yap\u0131 listesi","B\xFCy\xFCt","K\xFC\xE7\xFClt","Geni\u015Fli\u011Fe s\u0131\u011Fd\u0131r","Tamam","\u0130ptal","Kaydet","Sil","Ara","Kapat","MCBE Ara\xE7 Kutusu"],nl_NL:["Bestand kiezen","Wereld exporteren","Wereldstatistieken","Eenklik vertaling","Naamcorrectie","Meer hulpmiddelen","Maker","Creatiewerkplaats","Wereldweergave","Spelergegevens","Terug naar bestanden","Opnieuw genereren","Structuurlijst","Inzoomen","Uitzoomen","Pas aan breedte","OK","Annuleren","Opslaan","Verwijderen","Zoeken","Sluiten","MCBE Gereedschapskist"],sv_SE:["V\xE4lj fil","Exportera v\xE4rld","V\xE4rldsstatistik","Ett klicks \xF6vers\xE4ttning","Namnkorrigering","Fler verktyg","Skapare","Kreativ verkstad","V\xE4rlds\xF6versikt","Spelardata","Tillbaka till filer","Generera igen","Strukturlista","Zooma in","Zooma ut","Anpassa bredd","OK","Avbryt","Spara","Radera","S\xF6k","St\xE4ng","MCBE Verktygsl\xE5da"],da_DK:["V\xE6lg fil","Eksport\xE9r verden","Verdensstatistik","Overs\xE6ttelse med \xE9t klik","Navnerettelse","Flere v\xE6rkt\xF8jer","Skaber","Kreativt v\xE6rksted","Verdensvisning","Spillerdata","Tilbage til filer","Gener\xE9r igen","Strukturliste","Zoom ind","Zoom ud","Tilpas bredde","OK","Annuller","Gem","Slet","S\xF8g","Luk","MCBE V\xE6rkt\xF8jskasse"],nb_NO:["Velg fil","Eksporter verden","Verdensstatistikk","Ett klikks oversettelse","Navnekorreksjon","Flere verkt\xF8y","Skaper","Kreativt verksted","Verdensvisning","Spillerdata","Tilbake til filer","Generer p\xE5 nytt","Strukturliste","Zoom inn","Zoom ut","Tilpass bredde","OK","Avbryt","Lagre","Slett","S\xF8k","Lukk","MCBE Verkt\xF8ykasse"],fi_FI:["Valitse tiedosto","Vie maailma","Maailman tilastot","Yhden napsautuksen k\xE4\xE4nn\xF6s","Nimien korjaus","Lis\xE4\xE4 ty\xF6kaluja","Tekij\xE4","Luomisty\xF6paja","Maailman\xE4kym\xE4","Pelaajatiedot","Takaisin tiedostoihin","Luo uudelleen","Rakenneluettelo","L\xE4henn\xE4","Loitonna","Sovita leveyteen","OK","Peruuta","Tallenna","Poista","Hae","Sulje","MCBE Ty\xF6kalupakki"],cs_CZ:["Vybrat soubor","Exportovat sv\u011Bt","Statistiky sv\u011Bta","P\u0159eklad jedn\xEDm kliknut\xEDm","Oprava n\xE1zv\u016F","V\xEDce n\xE1stroj\u016F","Tv\u016Frce","Kreativn\xED d\xEDlna","Zobrazen\xED sv\u011Bta","Data hr\xE1\u010De","Zp\u011Bt k soubor\u016Fm","Znovu vytvo\u0159it","Seznam struktur","P\u0159ibl\xED\u017Eit","Odd\xE1lit","P\u0159izp\u016Fsobit \u0161\xED\u0159ce","OK","Zru\u0161it","Ulo\u017Eit","Smazat","Hledat","Zav\u0159\xEDt","N\xE1stroje MCBE"],hu_HU:["F\xE1jl kiv\xE1laszt\xE1sa","Vil\xE1g export\xE1l\xE1sa","Vil\xE1gstatisztika","Egykattint\xE1sos ford\xEDt\xE1s","Nevek jav\xEDt\xE1sa","Tov\xE1bbi eszk\xF6z\xF6k","K\xE9sz\xEDt\u0151","Kreat\xEDv m\u0171hely","Vil\xE1gn\xE9zet","J\xE1t\xE9kos adatai","Vissza a f\xE1jlokhoz","\xDAjragener\xE1l\xE1s","Szerkezetlista","Nagy\xEDt\xE1s","Kicsiny\xEDt\xE9s","Sz\xE9less\xE9ghez igaz\xEDt\xE1s","OK","M\xE9gse","Ment\xE9s","T\xF6rl\xE9s","Keres\xE9s","Bez\xE1r\xE1s","MCBE Eszk\xF6zt\xE1r"],ro_RO:["Alege fi\u0219ier","Export\u0103 lumea","Statistici lume","Traducere cu un clic","Corectare nume","Mai multe unelte","Creator","Atelier creativ","Vizualizare lume","Date juc\u0103tor","\xCEnapoi la fi\u0219iere","Regenereaz\u0103","List\u0103 structuri","M\u0103rire","Mic\u0219orare","Potrive\u0219te l\u0103\u021Bimea","OK","Anuleaz\u0103","Salveaz\u0103","\u0218terge","Caut\u0103","\xCEnchide","Trusa de unelte MCBE"],bg_BG:["\u0418\u0437\u0431\u043E\u0440 \u043D\u0430 \u0444\u0430\u0439\u043B","\u0415\u043A\u0441\u043F\u043E\u0440\u0442 \u043D\u0430 \u0441\u0432\u044F\u0442","\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043D\u0430 \u0441\u0432\u044F\u0442\u0430","\u041F\u0440\u0435\u0432\u043E\u0434 \u0441 \u0435\u0434\u043D\u043E \u043A\u043B\u0438\u043A\u0432\u0430\u043D\u0435","\u041A\u043E\u0440\u0435\u043A\u0446\u0438\u044F \u043D\u0430 \u0438\u043C\u0435\u043D\u0430","\u041E\u0449\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0438","\u0421\u044A\u0437\u0434\u0430\u0442\u0435\u043B","\u0422\u0432\u043E\u0440\u0447\u0435\u0441\u043A\u0430 \u0440\u0430\u0431\u043E\u0442\u0438\u043B\u043D\u0438\u0446\u0430","\u0418\u0437\u0433\u043B\u0435\u0434 \u043D\u0430 \u0441\u0432\u044F\u0442\u0430","\u0414\u0430\u043D\u043D\u0438 \u0437\u0430 \u0438\u0433\u0440\u0430\u0447\u0430","\u041D\u0430\u0437\u0430\u0434 \u043A\u044A\u043C \u0444\u0430\u0439\u043B\u043E\u0432\u0435\u0442\u0435","\u0413\u0435\u043D\u0435\u0440\u0438\u0440\u0430\u043D\u0435 \u043E\u0442\u043D\u043E\u0432\u043E","\u0421\u043F\u0438\u0441\u044A\u043A \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438","\u0423\u0432\u0435\u043B\u0438\u0447\u0438","\u041D\u0430\u043C\u0430\u043B\u0438","\u041F\u043E \u0448\u0438\u0440\u0438\u043D\u0430","OK","\u041E\u0442\u043A\u0430\u0437","\u0417\u0430\u043F\u0430\u0437\u0438","\u0418\u0437\u0442\u0440\u0438\u0439","\u0422\u044A\u0440\u0441\u0435\u043D\u0435","\u0417\u0430\u0442\u0432\u043E\u0440\u0438","\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0438 MCBE"],el_GR:["\u0395\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5","\u0395\u03BE\u03B1\u03B3\u03C9\u03B3\u03AE \u03BA\u03CC\u03C3\u03BC\u03BF\u03C5","\u03A3\u03C4\u03B1\u03C4\u03B9\u03C3\u03C4\u03B9\u03BA\u03AC \u03BA\u03CC\u03C3\u03BC\u03BF\u03C5","\u039C\u03B5\u03C4\u03AC\u03C6\u03C1\u03B1\u03C3\u03B7 \u03BC\u03B5 \u03AD\u03BD\u03B1 \u03BA\u03BB\u03B9\u03BA","\u0394\u03B9\u03CC\u03C1\u03B8\u03C9\u03C3\u03B7 \u03BF\u03BD\u03BF\u03BC\u03AC\u03C4\u03C9\u03BD","\u03A0\u03B5\u03C1\u03B9\u03C3\u03C3\u03CC\u03C4\u03B5\u03C1\u03B1 \u03B5\u03C1\u03B3\u03B1\u03BB\u03B5\u03AF\u03B1","\u0394\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03CC\u03C2","\u0395\u03C1\u03B3\u03B1\u03C3\u03C4\u03AE\u03C1\u03B9\u03BF \u03B4\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03AF\u03B1\u03C2","\u03A0\u03C1\u03BF\u03B2\u03BF\u03BB\u03AE \u03BA\u03CC\u03C3\u03BC\u03BF\u03C5","\u0394\u03B5\u03B4\u03BF\u03BC\u03AD\u03BD\u03B1 \u03C0\u03B1\u03AF\u03BA\u03C4\u03B7","\u0395\u03C0\u03B9\u03C3\u03C4\u03C1\u03BF\u03C6\u03AE \u03C3\u03C4\u03B1 \u03B1\u03C1\u03C7\u03B5\u03AF\u03B1","\u0391\u03BD\u03B1\u03B4\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03AF\u03B1","\u039B\u03AF\u03C3\u03C4\u03B1 \u03B4\u03BF\u03BC\u03CE\u03BD","\u039C\u03B5\u03B3\u03AD\u03B8\u03C5\u03BD\u03C3\u03B7","\u03A3\u03BC\u03AF\u03BA\u03C1\u03C5\u03BD\u03C3\u03B7","\u03A0\u03C1\u03BF\u03C3\u03B1\u03C1\u03BC\u03BF\u03B3\u03AE \u03C0\u03BB\u03AC\u03C4\u03BF\u03C5\u03C2","OK","\u0391\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7","\u0391\u03C0\u03BF\u03B8\u03AE\u03BA\u03B5\u03C5\u03C3\u03B7","\u0394\u03B9\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE","\u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7","\u039A\u03BB\u03B5\u03AF\u03C3\u03B9\u03BC\u03BF","\u0395\u03C1\u03B3\u03B1\u03BB\u03B5\u03B9\u03BF\u03B8\u03AE\u03BA\u03B7 MCBE"],uk_UA:["\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u0444\u0430\u0439\u043B","\u0415\u043A\u0441\u043F\u043E\u0440\u0442 \u0441\u0432\u0456\u0442\u0443","\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u0441\u0432\u0456\u0442\u0443","\u041F\u0435\u0440\u0435\u043A\u043B\u0430\u0434 \u043E\u0434\u043D\u0438\u043C \u043A\u043B\u0456\u043A\u043E\u043C","\u0412\u0438\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044F \u043D\u0430\u0437\u0432","\u0411\u0456\u043B\u044C\u0448\u0435 \u0456\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0456\u0432","\u0421\u0442\u0432\u043E\u0440\u044E\u0432\u0430\u0447","\u0422\u0432\u043E\u0440\u0447\u0430 \u043C\u0430\u0439\u0441\u0442\u0435\u0440\u043D\u044F","\u041E\u0433\u043B\u044F\u0434 \u0441\u0432\u0456\u0442\u0443","\u0414\u0430\u043D\u0456 \u0433\u0440\u0430\u0432\u0446\u044F","\u041D\u0430\u0437\u0430\u0434 \u0434\u043E \u0444\u0430\u0439\u043B\u0456\u0432","\u041E\u043D\u043E\u0432\u0438\u0442\u0438","\u0421\u043F\u0438\u0441\u043E\u043A \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440","\u0417\u0431\u0456\u043B\u044C\u0448\u0438\u0442\u0438","\u0417\u043C\u0435\u043D\u0448\u0438\u0442\u0438","\u0417\u0430 \u0448\u0438\u0440\u0438\u043D\u043E\u044E","OK","\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438","\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438","\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438","\u041F\u043E\u0448\u0443\u043A","\u0417\u0430\u043A\u0440\u0438\u0442\u0438","\u0406\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0438 MCBE"],id_ID:["Pilih berkas","Ekspor dunia","Statistik dunia","Terjemahan sekali klik","Koreksi nama","Alat lainnya","Pembuat","Studio kreasi","Tampilan dunia","Data pemain","Kembali ke berkas","Buat ulang","Daftar struktur","Perbesar","Perkecil","Sesuaikan lebar","OK","Batal","Simpan","Hapus","Cari","Tutup","Kotak alat MCBE"],vi_VN:["Ch\u1ECDn t\u1EC7p","Xu\u1EA5t th\u1EBF gi\u1EDBi","Th\u1ED1ng k\xEA th\u1EBF gi\u1EDBi","D\u1ECBch m\u1ED9t ch\u1EA1m","S\u1EEDa t\xEAn","Th\xEAm c\xF4ng c\u1EE5","Tr\xECnh t\u1EA1o","X\u01B0\u1EDFng s\xE1ng t\u1EA1o","Xem th\u1EBF gi\u1EDBi","D\u1EEF li\u1EC7u ng\u01B0\u1EDDi ch\u01A1i","Quay l\u1EA1i t\u1EC7p","T\u1EA1o l\u1EA1i","Danh s\xE1ch c\u1EA5u tr\xFAc","Ph\xF3ng to","Thu nh\u1ECF","V\u1EEBa chi\u1EC1u r\u1ED9ng","OK","H\u1EE7y","L\u01B0u","X\xF3a","T\xECm ki\u1EBFm","\u0110\xF3ng","H\u1ED9p c\xF4ng c\u1EE5 MCBE"],th_TH:["\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E1F\u0E25\u0E4C","\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01\u0E42\u0E25\u0E01","\u0E2A\u0E16\u0E34\u0E15\u0E34\u0E42\u0E25\u0E01","\u0E41\u0E1B\u0E25\u0E14\u0E49\u0E27\u0E22\u0E04\u0E25\u0E34\u0E01\u0E40\u0E14\u0E35\u0E22\u0E27","\u0E41\u0E01\u0E49\u0E44\u0E02\u0E0A\u0E37\u0E48\u0E2D","\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E21\u0E37\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21","\u0E15\u0E31\u0E27\u0E2A\u0E23\u0E49\u0E32\u0E07","\u0E2B\u0E49\u0E2D\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E23\u0E23\u0E04\u0E4C","\u0E21\u0E38\u0E21\u0E21\u0E2D\u0E07\u0E42\u0E25\u0E01","\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E40\u0E25\u0E48\u0E19","\u0E01\u0E25\u0E31\u0E1A\u0E44\u0E1B\u0E17\u0E35\u0E48\u0E44\u0E1F\u0E25\u0E4C","\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E43\u0E2B\u0E21\u0E48","\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07","\u0E02\u0E22\u0E32\u0E22","\u0E22\u0E48\u0E2D","\u0E1E\u0E2D\u0E14\u0E35\u0E04\u0E27\u0E32\u0E21\u0E01\u0E27\u0E49\u0E32\u0E07","\u0E15\u0E01\u0E25\u0E07","\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01","\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01","\u0E25\u0E1A","\u0E04\u0E49\u0E19\u0E2B\u0E32","\u0E1B\u0E34\u0E14","\u0E01\u0E25\u0E48\u0E2D\u0E07\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E21\u0E37\u0E2D MCBE"],ar_SA:["\u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641","\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0639\u0627\u0644\u0645","\u0625\u062D\u0635\u0627\u0621\u0627\u062A \u0627\u0644\u0639\u0627\u0644\u0645","\u062A\u0631\u062C\u0645\u0629 \u0628\u0646\u0642\u0631\u0629 \u0648\u0627\u062D\u062F\u0629","\u062A\u0635\u062D\u064A\u062D \u0627\u0644\u0623\u0633\u0645\u0627\u0621","\u0645\u0632\u064A\u062F \u0645\u0646 \u0627\u0644\u0623\u062F\u0648\u0627\u062A","\u0627\u0644\u0645\u0646\u0634\u0626","\u0648\u0631\u0634\u0629 \u0627\u0644\u0625\u0628\u062F\u0627\u0639","\u0639\u0631\u0636 \u0627\u0644\u0639\u0627\u0644\u0645","\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0644\u0627\u0639\u0628","\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0644\u0641\u0627\u062A","\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0648\u0644\u064A\u062F","\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0647\u064A\u0627\u0643\u0644","\u062A\u0643\u0628\u064A\u0631","\u062A\u0635\u063A\u064A\u0631","\u0645\u0644\u0627\u0621\u0645\u0629 \u0627\u0644\u0639\u0631\u0636","\u0645\u0648\u0627\u0641\u0642","\u0625\u0644\u063A\u0627\u0621","\u062D\u0641\u0638","\u062D\u0630\u0641","\u0628\u062D\u062B","\u0625\u063A\u0644\u0627\u0642","\u0635\u0646\u062F\u0648\u0642 \u0623\u062F\u0648\u0627\u062A MCBE"],he_IL:["\u05D1\u05D7\u05E8 \u05E7\u05D5\u05D1\u05E5","\u05D9\u05D9\u05E6\u05D0 \u05E2\u05D5\u05DC\u05DD","\u05E0\u05EA\u05D5\u05E0\u05D9 \u05E2\u05D5\u05DC\u05DD","\u05EA\u05E8\u05D2\u05D5\u05DD \u05D1\u05DC\u05D7\u05D9\u05E6\u05D4","\u05EA\u05D9\u05E7\u05D5\u05DF \u05E9\u05DE\u05D5\u05EA","\u05E2\u05D5\u05D3 \u05DB\u05DC\u05D9\u05DD","\u05D9\u05D5\u05E6\u05E8","\u05E1\u05D3\u05E0\u05EA \u05D9\u05E6\u05D9\u05E8\u05D4","\u05EA\u05E6\u05D5\u05D2\u05EA \u05E2\u05D5\u05DC\u05DD","\u05E0\u05EA\u05D5\u05E0\u05D9 \u05E9\u05D7\u05E7\u05DF","\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E7\u05D1\u05E6\u05D9\u05DD","\u05E6\u05D5\u05E8 \u05DE\u05D7\u05D3\u05E9","\u05E8\u05E9\u05D9\u05DE\u05EA \u05DE\u05D1\u05E0\u05D9\u05DD","\u05D4\u05D2\u05D3\u05DC","\u05D4\u05E7\u05D8\u05DF","\u05D4\u05EA\u05D0\u05DD \u05DC\u05E8\u05D5\u05D7\u05D1","\u05D0\u05D9\u05E9\u05D5\u05E8","\u05D1\u05D9\u05D8\u05D5\u05DC","\u05E9\u05DE\u05D5\u05E8","\u05DE\u05D7\u05E7","\u05D7\u05E4\u05E9","\u05E1\u05D2\u05D5\u05E8","\u05D0\u05E8\u05D2\u05D6 \u05DB\u05DC\u05D9\u05DD MCBE"],hi_IN:["\u092B\u093C\u093E\u0907\u0932 \u091A\u0941\u0928\u0947\u0902","\u0935\u093F\u0936\u094D\u0935 \u0928\u093F\u0930\u094D\u092F\u093E\u0924 \u0915\u0930\u0947\u0902","\u0935\u093F\u0936\u094D\u0935 \u0906\u0902\u0915\u0921\u093C\u0947","\u090F\u0915 \u0915\u094D\u0932\u093F\u0915 \u0905\u0928\u0941\u0935\u093E\u0926","\u0928\u093E\u092E \u0938\u0941\u0927\u093E\u0930","\u0914\u0930 \u0909\u092A\u0915\u0930\u0923","\u0928\u093F\u0930\u094D\u092E\u093E\u0924\u093E","\u0930\u091A\u0928\u093E \u0938\u094D\u091F\u0942\u0921\u093F\u092F\u094B","\u0935\u093F\u0936\u094D\u0935 \u0926\u0943\u0936\u094D\u092F","\u0916\u093F\u0932\u093E\u0921\u093C\u0940 \u0921\u0947\u091F\u093E","\u092B\u093C\u093E\u0907\u0932\u094B\u0902 \u092A\u0930 \u0935\u093E\u092A\u0938","\u092B\u093F\u0930 \u0938\u0947 \u092C\u0928\u093E\u090F\u0902","\u0938\u0902\u0930\u091A\u0928\u093E \u0938\u0942\u091A\u0940","\u092C\u0921\u093C\u093E \u0915\u0930\u0947\u0902","\u091B\u094B\u091F\u093E \u0915\u0930\u0947\u0902","\u091A\u094C\u0921\u093C\u093E\u0908 \u092E\u0947\u0902 \u092B\u093C\u093F\u091F","\u0920\u0940\u0915","\u0930\u0926\u094D\u0926","\u0938\u0939\u0947\u091C\u0947\u0902","\u0939\u091F\u093E\u090F\u0902","\u0916\u094B\u091C\u0947\u0902","\u092C\u0902\u0926 \u0915\u0930\u0947\u0902","MCBE \u091F\u0942\u0932\u092C\u0949\u0915\u094D\u0938"]};function nl(){let e="";try{if(typeof navigator<"u"&&navigator.language&&(e=navigator.language),typeof location<"u"&&location.search){let s=new URLSearchParams(location.search).get("syslocale");s&&(e=s)}}catch{}if(!e)return"zh_CN";let n=e.replace("-","_"),t=_a.map(s=>s[0]);if(t.includes(n))return n;let a=n.split("_")[0].toLowerCase(),r={zh:n.toLowerCase().includes("tw")||n.toLowerCase().includes("hk")?"zh_TW":"zh_CN",en:"en_US",es:"es_ES",pt:"pt_BR",nb:"nb_NO",no:"nb_NO"}[a];return r||t.find(s=>s.split("_")[0].toLowerCase()===a)||"en_US"}var Lt=!0,Ae="zh_CN";try{if(typeof localStorage<"u"){let e=localStorage.getItem("mcbeLang");e&&e!=="auto"&&(Lt=!1,Ae=e)}}catch{}Lt&&(Ae=nl());var Pi=new Map;for(let e of Object.keys(ji))ji[e].forEach((n,t)=>{n&&!Pi.has(n)&&Pi.set(n,tl[t])});function Zd(){let e=ji[Ae];if(!e)return null;let n=new Map;return tl.forEach((t,a)=>n.set(t,e[a])),n}function el(e){if(e==="auto"){Lt=!0,Ae=nl();try{localStorage.setItem("mcbeLang","auto")}catch{}}else{Lt=!1,Ae=e;try{localStorage.setItem("mcbeLang",e)}catch{}}if(typeof document<"u"){document.documentElement.lang=Ae.replace("_","-"),Di(document.body);let n=document.getElementById("langSel");if(n){let t=n.options[0];t&&(t.textContent=(Ae.startsWith("zh")?"\u8DDF\u968F\u7CFB\u7EDF":"System")+"\uFF08"+_a.find(a=>a[0]===Ae)[1]+"\uFF09"),n.value=Lt?"auto":Ae}}}function Di(e){let n=Zd();if(!n||Ae==="zh_CN"||!e)return;let t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,null),a=[];for(;t.nextNode();){let i=t.currentNode,r=i.nodeValue.trim();if(!r)continue;let o=n.has(r)?r:Pi.get(r);o&&n.has(o)&&a.push([i,i.nodeValue.replace(r,n.get(o))])}for(let[i,r]of a)i.nodeValue=r}function al(){if(typeof document>"u")return;Di(document.body),new MutationObserver(()=>Di(document.body)).observe(document.body,{childList:!0,subtree:!0,characterData:!1});let n=document.getElementById("langSel");n&&(n.innerHTML='<option value="auto">'+(Ae.startsWith("zh")?"\u8DDF\u968F\u7CFB\u7EDF":"System")+"\uFF08"+_a.find(t=>t[0]===Ae)[1]+"\uFF09</option>"+_a.map(([t,a])=>`<option value="${t}">${a}</option>`).join(""),n.value=Lt?"auto":Ae,n.onchange=()=>el(n.value),typeof navigator<"u"&&navigator.languages&&(navigator.languages,window.addEventListener&&window.addEventListener("languagechange",()=>{Lt&&el("auto")})))}var Wd=[["auto","\u8DDF\u968F\u7CFB\u7EDF"],["light","\u767D\u5929"],["dark","\u9ED1\u591C"],["time","\u6309\u73B0\u5B9E\u65F6\u95F4"],["eye","\u62A4\u773C"]],Ye="auto",Tn=null,ba=null;function Vd(){if(Ye==="light")return"light";if(Ye==="dark")return"dark";if(Ye==="eye")return"eye";if(Ye==="time"){let e=new Date().getHours();return e>=7&&e<19?"light":"dark"}try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}catch{return"dark"}}function Nn(){if(typeof document>"u")return;document.documentElement.dataset.theme=Vd();let e=document.getElementById("themeSel");e&&(e.value=Ye)}function Jd(e){Ye=e;try{typeof localStorage<"u"&&localStorage.setItem("mcbeTheme",e)}catch{}Nn()}function il(){if(typeof document>"u")return;try{typeof localStorage<"u"&&(Ye=localStorage.getItem("mcbeTheme")||"auto")}catch{}Nn();try{Tn=window.matchMedia("(prefers-color-scheme: dark)");let n=()=>{Ye==="auto"&&Nn()};Tn.addEventListener?Tn.addEventListener("change",n):Tn.addListener&&Tn.addListener(n)}catch{}ba=setInterval(()=>{Ye==="time"&&Nn()},6e4),ba&&ba.unref&&ba.unref();let e=document.getElementById("themeSel");e&&(e.innerHTML=Wd.map(([n,t])=>`<option value="${n}">${t}</option>`).join(""),e.value=Ye,e.onchange=()=>Jd(e.value),Nn())}try{let e=typeof localStorage<"u"&&localStorage.getItem("mcbeAccent");e&&document.documentElement.style.setProperty("--accent",e)}catch{}window.MCBE={readLevelDb:Jn,analyzeWorld:Gn,zh:no};al();il();})();
