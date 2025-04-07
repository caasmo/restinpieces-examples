import{c as n}from"./chunk-NTKSLLJF.js";var o=class{constructor(){this.rp=new n({baseURL:"http://localhost:8080"}),this.form=document.getElementById("passwordLoginForm"),this.errorDiv=document.getElementById("error"),this.providerList=document.getElementById("list"),this.initEventListeners(),this.loadProviders()}initEventListeners(){this.form.addEventListener("submit",e=>{e.preventDefault(),this.handleLogin()})}loadProviders(){this.rp.listOauth2Providers().then(e=>{var r;if(this.providerList.innerHTML="",!((r=e==null?void 0:e.data)!=null&&r.providers)){this.providerList.innerHTML="<li>No OAuth2 providers.</li>";return}e.data.providers.forEach(i=>{let s=document.createElement("li"),t=document.createElement("a");t.textContent=`Login with ${i.displayName}`,t.href=i.authURL,t.addEventListener("click",()=>{this.rp.store.provider.save(i)}),s.appendChild(t),this.providerList.appendChild(s)}),e.data.providers.length===0&&(this.providerList.innerHTML="<li>No OAuth2 providers.</li>")}).catch(e=>{console.error("Error loading providers:",e),this.providerList.innerHTML="<li>Error loading providers</li>"})}showMessage(e,r=!1){this.errorDiv.textContent=e,this.errorDiv.className=r?"message error":"message success"}createSuccessUI(e){let r=document.createElement("div");r.className="user-info",r.innerHTML=`
      <h3>Login Successful!</h3>
      <pre>${JSON.stringify(e,null,2)}</pre>
    `;let i=document.createElement("div");i.className="button-container";let s=document.createElement("button");s.textContent="Go to Dashboard",s.onclick=()=>window.location.href="/dashboard.html",i.appendChild(s),this.errorDiv.textContent="",this.errorDiv.appendChild(r),this.errorDiv.appendChild(i)}async handleLogin(){var i,s;let e=document.getElementById("email").value,r=document.getElementById("password").value;this.showMessage("Logging in...");try{let t=await this.rp.authWithPassword({identity:e,password:r});if((i=t==null?void 0:t.data)!=null&&i.access_token)this.rp.store.auth.save(t.data),this.createSuccessUI(t.data.record);else throw new Error("Invalid login response: missing access token")}catch(t){console.error("Login failed:",t),this.showMessage(((s=t.response)==null?void 0:s.message)||t.message,!0)}}};document.addEventListener("DOMContentLoaded",()=>new o);
