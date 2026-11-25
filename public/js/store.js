/* Zenmart front-end demo store. Cart and demo account data are saved in this browser. */
const ZM_PRODUCTS = [
  {id:'watch',name:'Apple Watch SE GPS 40mm Space Grey',price:32.99,image:'../public/images/products/apple_watch.png',category:'Smart Home',brand:'Apple',rating:4.8,reviews:3014,oldPrice:45},
  {id:'phone',name:'Smartphone 11 64GB Midnight',price:339.99,image:'../public/images/products/phone.png',category:'Cell Phones',brand:'Sony',rating:4.7,reviews:1943,oldPrice:399},
  {id:'robot',name:'iRobot Roomba i3+ EVO Wi-Fi Connected Robot Vacuum',price:399,image:'../public/images/products/iRobot.png',category:'Smart Home',brand:'iRobot',rating:4.6,reviews:1178,oldPrice:499},
  {id:'dyson',name:'Dyson V7 Complete Cordless Stick Vacuum',price:128.99,image:'../public/images/products/dyson.png',category:'Smart Home',brand:'Dyson',rating:4.5,reviews:2423,oldPrice:179},
  {id:'headphone',name:'Wireless Bluetooth Headphones',price:49.99,image:'../public/images/products/headphone.png',category:'Headphones',brand:'Sony',rating:4.7,reviews:2180,oldPrice:69.99},
  {id:'tv',name:'Samsung Crystal UHD Smart TV',price:499,image:'../public/images/products/samsung_tv.png',category:'TV & Home Theater',brand:'Samsung',rating:4.8,reviews:864,oldPrice:599},
  {id:'acer',name:'Acer Aspire 5 Laptop - Silver',price:529,image:'../public/images/products/acer_silver.png',category:'Computers',brand:'Acer',rating:4.5,reviews:842,oldPrice:599},
  {id:'asus',name:'ASUS VivoBook 15 Laptop',price:649,image:'../public/images/products/asus_laptop.png',category:'Computers',brand:'ASUS',rating:4.6,reviews:736,oldPrice:729},
  {id:'macbook',name:'Apple MacBook Pro 16-inch',price:1899,image:'../public/images/products/macbook_16.png',category:'Computers',brand:'Apple',rating:4.9,reviews:1204,oldPrice:2099},
  {id:'nitro',name:'Acer Nitro Gaming Laptop',price:999,image:'../public/images/products/nitro_laptop.png',category:'Computers',brand:'Acer',rating:4.7,reviews:513,oldPrice:1149},
  {id:'sony-laptop',name:'Sony VAIO Notebook',price:799,image:'../public/images/products/sony_notebook.png',category:'Computers',brand:'Sony',rating:4.4,reviews:427,oldPrice:899},
  {id:'sony-notebook',name:'Sony Notebook Series Laptop',price:749,image:'../public/images/products/sony_laptop.png',category:'Computers',brand:'Sony',rating:4.5,reviews:382,oldPrice:829},
  {id:'acer-laptop',name:'Acer Everyday Notebook',price:579,image:'../public/images/products/acer_laptop.png',category:'Computers',brand:'Acer',rating:4.4,reviews:298,oldPrice:649},
  {id:'rolex-laptop',name:'Premium Performance Laptop',price:899,image:'../public/images/products/rolex_laptop.png',category:'Computers',brand:'Zenmart',rating:4.3,reviews:218,oldPrice:999},
  {id:'bluetooth',name:'Bluetooth Portable Headphones',price:39.99,image:'../public/images/products/bluetooth_headphones.png',category:'Headphones',brand:'Sony',rating:4.4,reviews:982,oldPrice:54.99},
  {id:'on-ear',name:'On-Ear Wireless Headphones',price:59.99,image:'../public/images/products/on-ear.png',category:'Headphones',brand:'Sony',rating:4.6,reviews:675,oldPrice:79.99},
  {id:'fitness-headphone',name:'Sport Wireless Headphones',price:44.99,image:'../public/images/products/fitness_headphone.png',category:'Headphones',brand:'Zenmart',rating:4.3,reviews:389,oldPrice:59.99},
  {id:'camera',name:'Canon Digital Camera',price:449,image:'../public/images/products/canon_camera.png',category:'Cameras',brand:'Canon',rating:4.7,reviews:507,oldPrice:519},
  {id:'playstation',name:'Sony PlayStation Console',price:499,image:'../public/images/products/sony_playstation.png',category:'Video Games',brand:'Sony',rating:4.9,reviews:1860,oldPrice:549},
  {id:'lg-oled',name:'LG OLED Television',price:1099,image:'../public/images/products/LG-OLED.png',category:'TV & Home Theater',brand:'LG',rating:4.9,reviews:692,oldPrice:1299},
  {id:'lg-uhd',name:'LG UHD Television',price:599,image:'../public/images/products/LG-UHD.png',category:'TV & Home Theater',brand:'LG',rating:4.6,reviews:429,oldPrice:699},
  {id:'sony-tv',name:'Sony Bravia Smart TV',price:899,image:'../public/images/products/SONY-TV.png',category:'TV & Home Theater',brand:'Sony',rating:4.8,reviews:531,oldPrice:999},
  {id:'tcl-tv',name:'TCL Smart Television',price:399,image:'../public/images/products/tcl.png',category:'TV & Home Theater',brand:'TCL',rating:4.5,reviews:306,oldPrice:469},
  {id:'smartphone',name:'Modern Smartphone',price:279,image:'../public/images/products/phone.png',category:'Cell Phones',brand:'Zenmart',rating:4.4,reviews:764,oldPrice:329},
  {id:'smart-watch',name:'Smart Fitness Watch',price:89.99,image:'../public/images/products/watch.png',category:'Smart Home',brand:'Zenmart',rating:4.5,reviews:613,oldPrice:119}
];

function zmCart(){try{return JSON.parse(localStorage.getItem('zenmart-cart')||'[]')}catch(e){return []}}
function zmSave(cart){localStorage.setItem('zenmart-cart',JSON.stringify(cart));zmUpdateHeader()}
function zmProduct(id){return ZM_PRODUCTS.find(p=>p.id===id)}
function zmMoney(value){return '$'+Number(value||0).toFixed(2)}
function zmCartCount(){return zmCart().reduce((sum,item)=>sum+(Number(item.qty)||0),0)}
function zmUpdateHeader(){
  const count=zmCartCount();
  document.querySelectorAll('.basket_count,[data-cart-count]').forEach(el=>el.textContent=count);
  document.querySelectorAll('[data-cart-total]').forEach(el=>{const total=zmCart().reduce((sum,item)=>{const p=zmProduct(item.id);return sum+(p?p.price*item.qty:0)},0);el.textContent=zmMoney(total)});
}
function zmToast(message){
  let toast=document.querySelector('.zm-toast');
  if(!toast){toast=document.createElement('div');toast.className='zm-toast';document.body.appendChild(toast)}
  toast.textContent=message;toast.classList.add('show');
  clearTimeout(window.zmToastTimer);window.zmToastTimer=setTimeout(()=>toast.classList.remove('show'),2300);
}
function zmAdd(id,qty=1){
  const product=zmProduct(id);if(!product){zmToast('Mahsulot topilmadi');return}
  const cart=zmCart();const item=cart.find(x=>x.id===id);
  if(item)item.qty+=Number(qty)||1;else cart.push({id,qty:Math.max(1,Number(qty)||1)});
  zmSave(cart);zmToast('Mahsulot savatchaga qo‘shildi');
}
function zmProducts(){return ZM_PRODUCTS}
function zmRemove(id){zmSave(zmCart().filter(item=>item.id!==id));zmRenderCart()}
function zmQty(id,value){const cart=zmCart();const item=cart.find(x=>x.id===id);if(item)item.qty=Math.max(1,Math.min(99,Number(value)||1));zmSave(cart);zmRenderCart()}
function zmRenderCart(){
  const el=document.querySelector('#cart-items');if(!el)return;
  const cart=zmCart().filter(item=>zmProduct(item.id));
  if(!cart.length){el.innerHTML='<div class="empty"><h2>Savatchangiz hozircha bo‘sh</h2><p>Xaridni boshlash uchun katalogdan mahsulot tanlang.</p><a class="btn" href="../product/allpr.html">Xarid qilish</a></div>';document.querySelector('#cart-summary')?.classList.add('hidden');zmUpdateHeader();return}
  let total=0;
  el.innerHTML=cart.map(item=>{const p=zmProduct(item.id);const row=p.price*item.qty;total+=row;return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><b>${p.name}</b><p class="muted">${zmMoney(p.price)} · ${p.category}</p></div><input class="qty" aria-label="Miqdor" type="number" min="1" max="99" value="${item.qty}" onchange="zmQty('${p.id}',this.value)"><button class="btn light remove" type="button" onclick="zmRemove('${p.id}')">O‘chirish</button></div>`}).join('');
  document.querySelector('#subtotal').textContent=zmMoney(total);document.querySelector('#total').textContent=zmMoney(total);document.querySelector('#cart-summary')?.classList.remove('hidden');zmUpdateHeader();
}
function zmCheckout(event){
  event.preventDefault();const cart=zmCart();if(!cart.length){zmToast('Savatcha bo‘sh');location.href='cart.html';return}
  const form=event.currentTarget;const formData=new FormData(form);const customer=Object.fromEntries(formData.entries());
  const order={items:cart,customer,total:cart.reduce((sum,item)=>{const p=zmProduct(item.id);return sum+(p?p.price*item.qty:0)},0),date:new Date().toISOString(),number:'ZM'+Date.now().toString().slice(-7)};
  localStorage.setItem('zenmart-last-order',JSON.stringify(order));zmSave([]);location.href='resived.html';
}
function zmRenderProductGrid(){
  const grid=document.querySelector('#products-grid');if(!grid)return;
  const search=(document.querySelector('#product-search')?.value||'').trim().toLowerCase();
  const category=document.querySelector('#category-filter')?.value||'all';
  const brand=document.querySelector('#brand-filter')?.value||'all';
  const sort=document.querySelector('#sort-products')?.value||'featured';
  const perPage=12;let page=Number(document.querySelector('#current-page')?.value||1);
  let products=ZM_PRODUCTS.filter(p=>{
    const matchSearch=(p.name+' '+p.brand+' '+p.category).toLowerCase().includes(search);
    return matchSearch&&(category==='all'||p.category===category)&&(brand==='all'||p.brand===brand);
  });
  if(sort==='price-low')products.sort((a,b)=>a.price-b.price);
  if(sort==='price-high')products.sort((a,b)=>b.price-a.price);
  if(sort==='rating')products.sort((a,b)=>b.rating-a.rating);
  if(sort==='name')products.sort((a,b)=>a.name.localeCompare(b.name));
  const pages=Math.max(1,Math.ceil(products.length/perPage));page=Math.min(page,pages);
  const pageInput=document.querySelector('#current-page');if(pageInput)pageInput.value=page;
  const visible=products.slice((page-1)*perPage,page*perPage);
  grid.innerHTML=visible.map(p=>`<article class="catalog-card"><a class="catalog-card-link" href="chosenproduct.html?id=${encodeURIComponent(p.id)}"><div class="catalog-image"><img src="${p.image}" alt="${p.name}" loading="lazy"></div><div class="catalog-meta"><span>${p.brand}</span><span class="catalog-category">${p.category}</span></div><h3>${p.name}</h3><div class="catalog-rating"><span>★★★★★</span><small>${p.rating.toFixed(1)} · ${p.reviews.toLocaleString('en-US')} ta sharh</small></div><div class="catalog-price"><strong>${zmMoney(p.price)}</strong><del>${p.oldPrice?zmMoney(p.oldPrice):''}</del></div></a><button class="btn gold add-cart-btn" type="button" onclick="zmAdd('${p.id}')">Savatchaga qo‘shish</button></article>`).join('')||'<div class="empty grid-empty"><h3>Mahsulot topilmadi</h3><p>Qidiruv yoki filtrlarni o‘zgartirib ko‘ring.</p></div>';
  const count=document.querySelector('#results-count');if(count)count.textContent=`${products.length} ta mahsulot topildi`;
  const pagination=document.querySelector('#pagination');if(pagination){pagination.innerHTML=Array.from({length:pages},(_,i)=>`<button type="button" class="page-num ${i+1===page?'active':''}" data-page="${i+1}">${i+1}</button>`).join('');pagination.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{pageInput.value=btn.dataset.page;zmRenderProductGrid();document.querySelector('#catalog')?.scrollIntoView({behavior:'smooth'})}))}
  const prev=document.querySelector('#page-prev'),next=document.querySelector('#page-next');if(prev)prev.disabled=page<=1;if(next)next.disabled=page>=pages;
}
function zmInitProductGrid(){
  if(!document.querySelector('#products-grid'))return;
  ['#product-search','#category-filter','#brand-filter','#sort-products'].forEach(selector=>document.querySelector(selector)?.addEventListener(selector==='#product-search'?'input':'change',()=>{document.querySelector('#current-page').value=1;zmRenderProductGrid()}));
  document.querySelector('#page-prev')?.addEventListener('click',()=>{const el=document.querySelector('#current-page');el.value=Math.max(1,Number(el.value)-1);zmRenderProductGrid()});
  document.querySelector('#page-next')?.addEventListener('click',()=>{const el=document.querySelector('#current-page');el.value=Number(el.value)+1;zmRenderProductGrid()});
  const params=new URLSearchParams(location.search);const q=params.get('q');if(q)document.querySelector('#product-search').value=q;
  zmRenderProductGrid();
}
function zmInitDetail(){
  const root=document.querySelector('[data-product-detail]');if(!root)return;
  const id=new URLSearchParams(location.search).get('id')||'headphone';const p=zmProduct(id)||ZM_PRODUCTS[0];
  document.querySelector('#detail-img').src=p.image;document.querySelector('#detail-img').alt=p.name;
  document.querySelector('#detail-name').textContent=p.name;document.querySelector('#detail-price').textContent=zmMoney(p.price);
  document.querySelector('#detail-category').textContent=p.category;document.querySelector('#detail-brand').textContent=p.brand;
  document.querySelector('#detail-rating').textContent=`★★★★★  ${p.rating.toFixed(1)} (${p.reviews.toLocaleString('en-US')} ta sharh)`;
  document.querySelector('#detail-add').addEventListener('click',()=>zmAdd(p.id));
}
function zmInitCommon(){
  zmUpdateHeader();
  document.querySelectorAll('form.search').forEach(form=>form.addEventListener('submit',event=>{const input=form.querySelector('input[name="q"],input');if(input&&!input.name)input.name='q'}));
  document.querySelectorAll('.product_box .hover_box button[data-product-id]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();zmAdd(button.dataset.productId)}));
  const homeSearch=document.querySelector('.navbar_frame .nav_search_frame');
  if(homeSearch){
    const input=homeSearch.querySelector('input');
    const runSearch=()=>{const query=(input?.value||'').trim();location.href='./product/allpr.html'+(query?'?q='+encodeURIComponent(query):'')};
    homeSearch.querySelector('.search_icon_box')?.addEventListener('click',runSearch);
    input?.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();runSearch()}});
  }
}
document.addEventListener('DOMContentLoaded',()=>{zmInitCommon();zmInitProductGrid();zmInitDetail();zmRenderCart()});
