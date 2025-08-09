let f=!1,u=[];function v(){return new Promise(e=>{if(f){e();return}console.log("Initializing Google Ad Manager...");const a=document.createElement("script");a.src="https://securepubads.g.doubleclick.net/tag/js/gpt.js",a.crossOrigin="anonymous",a.async=!0,a.onload=()=>{window.googletag=window.googletag||{cmd:[]},window.googletag.cmd.push(()=>{window.googletag.pubads().enableSingleRequest(),window.googletag.pubads().collapseEmptyDivs(),window.googletag.pubads().setCentering(!0),window.googletag.enableServices(),f=!0,u.forEach(t=>t()),u=[],e()})},document.head.appendChild(a)})}function h(e,a,t,n={}){const i=()=>{window.googletag.cmd.push(()=>{console.log("Defining ad slot:",{adUnitPath:e,sizeConfig:a,divId:t});const d=document.getElementById(t);if(!d){console.error("Ad element not found:",t);return}const p=a.some(o=>Array.isArray(o)&&o.length===2&&Array.isArray(o[0])&&o[0].length===2&&Array.isArray(o[1])&&(Array.isArray(o[1][0])||o[1].length===2));let r;if(p){if(console.log("Using size mapping for:",t),r=window.googletag.defineSlot(e,[],t)?.addService(window.googletag.pubads()),r){const o=window.googletag.sizeMapping();a.forEach(m=>{if(Array.isArray(m)&&m.length===2){const[w,l]=m;let c;Array.isArray(l)&&Array.isArray(l[0])?c=l:Array.isArray(l)&&l.length===2&&typeof l[0]=="number"?c=[l]:c=l,console.log("Adding size mapping:",w,"->",c),o.addSize(w,c)}});const s=o.build();console.log("Built size mapping:",s),r.defineSizeMapping(s)}}else console.log("Using regular sizes for:",t),r=window.googletag.defineSlot(e,a,t)?.addService(window.googletag.pubads());r?(Object.entries(n).forEach(([o,s])=>{r.setTargeting(o,s)}),console.log("Displaying ad:",t),window.googletag.display(t),setTimeout(()=>{const o=d.innerHTML;console.log("Ad content after display:",t,o.length>0?"Has content":"Empty");const s=d.querySelector(".ad-placeholder-fallback");s&&(d.querySelector('div[id*="google_ads_iframe"]')||d.querySelector('iframe[src*="doubleclick"]')||o.includes("google"))&&(s.style.display="none"),o.length===0&&console.warn("Ad slot appears empty, this might indicate an issue with ad serving")},3e3)):console.error("Failed to create ad slot for:",t)})};f?i():u.push(i)}function A(){window.location.pathname.split("/").filter(Boolean);const a={},t=document.querySelector('meta[name="article-id"]');if(t){const n=t.getAttribute("content");n&&(a.article=n)}return a}function b(){return new Promise(e=>{if(typeof window.__tcfapi!="function"){console.log("No CMP detected, proceeding with ads"),e(!0);return}window.__tcfapi("getTCData",2,(a,t)=>{if(t&&a){const n=a.purpose?.consents?.[3]||a.purpose?.consents?.[4];console.log("Consent status via CMP:",n?"granted":"denied"),console.log("TCF Data:",{purposes:a.purpose?.consents,eventStatus:a.eventStatus}),e(!!n)}else console.log("Unable to get consent data from CMP, assuming no consent"),e(!1)})})}let x=!1,y={};async function z(){if(x){console.log("Ads already initialized, skipping...");return}console.log("Loading ads..."),await v(),y=A(),document.querySelectorAll(".gam-ad-slot").forEach(a=>{const t=a.getAttribute("data-ad-unit-path"),n=JSON.parse(a.getAttribute("data-ad-sizes")||"[]"),i=a.id;if(t&&n.length>0)if(a.closest('[data-ad-lazy="true"]')){const p=new IntersectionObserver(r=>{r.forEach(o=>{o.isIntersecting&&(h(t,n,i,y),p.unobserve(o.target))})},{threshold:.1});p.observe(a)}else h(t,n,i,y)}),x=!0,console.log("Ads initialized successfully")}function g(e){console.log("Consent status changed:",e?"granted":"denied");const a=document.querySelectorAll(".ad-container");e?(a.forEach(t=>{t.style.display=""}),z().catch(t=>{console.error("Failed to load ads after consent granted:",t)}),P()):(console.log("No consent for ads, hiding ad slots"),a.forEach(t=>{t.style.display="none"}),k())}function k(){let e=document.getElementById("consent-paywall");if(e){e.style.display="flex";return}e=document.createElement("div"),e.id="consent-paywall",e.innerHTML=`
      <div class="paywall-overlay">
        <div class="paywall-content">
          <div class="paywall-icon">🔒</div>
          <h3 class="paywall-title">Content blocked</h3>
          <p class="paywall-message">
            This content is supported by ads. Please enable advertising consent to continue reading our free content.
          </p>
          <div class="paywall-actions">
            <button class="paywall-btn paywall-btn-primary" onclick="window.__tcfapi && window.__tcfapi('displayConsentUi', 2, () => {})">
              Manage ad Preferences
            </button>
            <button class="paywall-btn paywall-btn-secondary" onclick="showPaymentModal()">
              Pay $9.99/month - Ad Free
            </button>
          </div>
          <p class="paywall-note">
            We respect your privacy. You can review and modify your consent preferences at any time.
          </p>
        </div>
      </div>
    `;const a=document.createElement("style");a.textContent=`
      #consent-paywall {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        animation: paywallFadeIn 0.4s ease-out;
      }
      
      @keyframes paywallFadeIn {
        from { 
          opacity: 0; 
          backdrop-filter: blur(0px);
        }
        to { 
          opacity: 1; 
          backdrop-filter: blur(10px);
        }
      }
      
      .paywall-overlay {
        max-width: 480px;
        width: 90%;
        margin: auto;
        background: #ffffff;
        border-radius: 20px;
        padding: 2.5rem;
        box-shadow: 
          0 25px 50px rgba(0, 0, 0, 0.25),
          0 10px 25px rgba(0, 0, 0, 0.15);
        text-align: center;
        animation: paywallSlideUp 0.4s ease-out;
        position: relative;
      }
      
      @keyframes paywallSlideUp {
        from { 
          transform: translateY(30px) scale(0.95); 
          opacity: 0; 
        }
        to { 
          transform: translateY(0) scale(1); 
          opacity: 1; 
        }
      }
      
      .paywall-icon {
        font-size: 3.5rem;
        margin-bottom: 1.5rem;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }
      
      .paywall-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 1rem;
        line-height: 1.3;
      }
      
      .paywall-message {
        color: #4a5568;
        line-height: 1.7;
        margin-bottom: 2.5rem;
        font-size: 1.1rem;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .paywall-actions {
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .paywall-btn {
        padding: 1rem 2rem;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1rem;
        min-width: 200px;
        text-transform: none;
        letter-spacing: 0.025em;
      }
      
      .paywall-btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      }
      
      .paywall-btn-primary:hover {
        background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }
      
      .paywall-btn-primary:active {
        transform: translateY(0);
        box-shadow: 0 3px 10px rgba(102, 126, 234, 0.4);
      }
      
      .paywall-btn-secondary {
        background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(72, 187, 120, 0.4);
      }
      
      .paywall-btn-secondary:hover {
        background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(72, 187, 120, 0.6);
      }
      
      .paywall-btn-secondary:active {
        transform: translateY(0);
        box-shadow: 0 3px 10px rgba(72, 187, 120, 0.4);
      }
      
      .paywall-note {
        font-size: 0.9rem;
        color: #718096;
        margin: 0;
        line-height: 1.5;
      }
      
      @media (max-width: 768px) {
        .paywall-overlay {
          margin: 1rem;
          padding: 2rem 1.5rem;
          max-width: none;
          width: calc(100% - 2rem);
          border-radius: 16px;
        }
        
        .paywall-title {
          font-size: 1.5rem;
        }
        
        .paywall-message {
          font-size: 1rem;
          margin-bottom: 2rem;
        }
        
        .paywall-btn {
          width: 100%;
          max-width: 280px;
          padding: 0.875rem 1.5rem;
        }
        
        .paywall-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
      }
      
      @media (max-width: 480px) {
        .paywall-overlay {
          margin: 0.5rem;
          padding: 1.5rem 1rem;
          width: calc(100% - 1rem);
        }
        
        .paywall-title {
          font-size: 1.3rem;
        }
        
        .paywall-message {
          font-size: 0.95rem;
        }
      }
      
      /* Payment Modal Styles */
      #payment-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10001;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(15px);
        animation: modalFadeIn 0.3s ease-out;
      }
      
      @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .payment-modal-content {
        max-width: 450px;
        width: 90%;
        background: #ffffff;
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 
          0 25px 50px rgba(0, 0, 0, 0.3),
          0 10px 25px rgba(0, 0, 0, 0.2);
        text-align: center;
        animation: modalSlideUp 0.3s ease-out;
        position: relative;
      }
      
      @keyframes modalSlideUp {
        from { 
          transform: translateY(30px) scale(0.95); 
          opacity: 0; 
        }
        to { 
          transform: translateY(0) scale(1); 
          opacity: 1; 
        }
      }
      
      .payment-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
        padding: 0.5rem;
        border-radius: 50%;
        transition: all 0.2s ease;
      }
      
      .payment-modal-close:hover {
        background: #f5f5f5;
        color: #333;
      }
      
      .payment-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 1rem;
      }
      
      .payment-price {
        font-size: 2rem;
        font-weight: 800;
        color: #48bb78;
        margin-bottom: 0.5rem;
      }
      
      .payment-period {
        color: #666;
        margin-bottom: 2rem;
        font-size: 0.9rem;
      }
      
      .payment-methods {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
      }
      
      .payment-method {
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        padding: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        background: white;
      }
      
      .payment-method:hover {
        border-color: #48bb78;
        background: #f0fff4;
      }
      
      .payment-method.selected {
        border-color: #48bb78;
        background: #f0fff4;
        box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
      }
      
      .payment-method-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
      }
      
      .payment-method-icon {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
      }
      
      .paypal-icon {
        background: #0070ba;
        color: white;
      }
      
      .payment-method-name {
        font-weight: 600;
        color: #1a1a1a;
      }
      
      .payment-method-desc {
        font-size: 0.85rem;
        color: #666;
        margin: 0;
      }
      
      .payment-continue {
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(72, 187, 120, 0.4);
      }
      
      .payment-continue:hover {
        background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(72, 187, 120, 0.6);
      }
      
      .payment-continue:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: 0 4px 15px rgba(72, 187, 120, 0.2);
      }
      
      @media (max-width: 768px) {
        .paywall-actions {
          gap: 0.75rem;
        }
        
        .payment-modal-content {
          margin: 1rem;
          padding: 1.5rem;
          max-width: none;
          width: calc(100% - 2rem);
        }
        
        .payment-title {
          font-size: 1.3rem;
        }
        
        .payment-price {
          font-size: 1.75rem;
        }
      }
    `,document.head.appendChild(a),document.body.appendChild(e)}function P(){const e=document.getElementById("consent-paywall");e&&(e.style.display="none")}function C(){let e=document.getElementById("payment-modal");if(e){e.style.display="flex";return}e=document.createElement("div"),e.id="payment-modal",e.innerHTML=`
      <div class="payment-modal-content">
        <button class="payment-modal-close" onclick="hidePaymentModal()">×</button>
        <h3 class="payment-title">Choose Your Plan</h3>
        <div class="payment-price">$9.99</div>
        <div class="payment-period">per month</div>
        
        <div class="payment-methods">
          <div class="payment-method" onclick="selectPaymentMethod(this, 'paypal')">
            <div class="payment-method-header">
              <div class="payment-method-icon paypal-icon">💳</div>
              <div class="payment-method-name">PayPal</div>
            </div>
            <p class="payment-method-desc">Secure payment with PayPal</p>
          </div>
        </div>
        
        <button class="payment-continue" id="payment-continue-btn" disabled onclick="processPayment()">
          Continue with Payment
        </button>
      </div>
    `,document.body.appendChild(e),e.style.display="flex"}function S(){const e=document.getElementById("payment-modal");e&&(e.style.display="none")}function E(e,a){document.querySelectorAll(".payment-method").forEach(n=>n.classList.remove("selected")),e.classList.add("selected");const t=document.getElementById("payment-continue-btn");t&&(t.disabled=!1)}function M(){const e=document.getElementById("payment-continue-btn");e&&(e.textContent="Processing...",e.disabled=!0),setTimeout(()=>{throw e&&(e.textContent="Continue with Payment",e.disabled=!1),new Error("Payment processing failed: Unexpected server error (Code: PAY_ERR_500). Please try again later or contact support.")},2e3)}window.showPaymentModal=C;window.hidePaymentModal=S;window.selectPaymentMethod=E;window.processPayment=M;document.addEventListener("DOMContentLoaded",async()=>{try{const e=await b();typeof window.__tcfapi=="function"?g(e):g(!0),typeof window.__tcfapi=="function"?(window.__tcfapi("addEventListener",2,(t,n)=>{n&&t&&t.eventStatus==="useractioncomplete"&&(console.log("TCF: Consent action completed, checking new status..."),b().then(i=>{g(i)}))}),console.log("TCF event listener added for consent changes")):console.log("No TCF API available for consent monitoring"),document.addEventListener("consentStatusChanged",t=>{console.log("AdPlaceholder: Received consent status change event",t.detail);const n=t.detail.hasConsent;g(n)});const a=new IntersectionObserver(t=>{t.forEach(n=>{if(n.isIntersecting){const i=n.target.getAttribute("data-ad-id");i&&console.log(`GAM Ad impression: ${i}`)}})},{threshold:.5});document.querySelectorAll(".ad-container").forEach(t=>{a.observe(t)})}catch(e){console.error("Failed to initialize GAM ads:",e)}});
