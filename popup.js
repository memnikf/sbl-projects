// Kontakt popup — smooth fade/scale-in modal, matches the original "Kontakt Us" lightbox.
(function () {
  var css = ''
    + '.kpop{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;visibility:hidden;opacity:0;transition:opacity .4s ease,visibility .4s ease}'
    + '.kpop.open{visibility:visible;opacity:1}'
    + '.kpop-ov{position:absolute;inset:0;background:rgba(0,0,0,.55)}'
    + '.kpop-box{position:relative;background:#fff;width:min(540px,92vw);max-height:92vh;overflow:auto;padding:56px 56px 46px;'
    + 'transform:translateY(-28px) scale(.97);opacity:0;transition:transform .45s cubic-bezier(.22,.61,.36,1),opacity .45s ease}'
    + '.kpop.open .kpop-box{transform:none;opacity:1}'
    + '.kpop-x{position:absolute;top:16px;right:22px;background:none;border:0;font-size:30px;line-height:1;color:#000;cursor:pointer;opacity:.6;transition:opacity .2s}'
    + '.kpop-x:hover{opacity:1}'
    + '.kpop-title{font-family:"Fira Sans",Arial,sans-serif;font-size:34px;font-weight:700;text-align:center;margin-bottom:34px;color:#000}'
    + '.kpf{position:relative;margin-bottom:30px}'
    + '.kpf input,.kpf textarea{width:100%;border:0;border-bottom:1px solid #c9c9c9;background:none;padding:6px 0;font-family:"Fira Sans",Arial,sans-serif;font-size:16px;color:#000;resize:vertical}'
    + '.kpf input:focus,.kpf textarea:focus{outline:none;border-bottom-color:#db1200}'
    + '.kpf label{position:absolute;left:0;top:6px;color:#9a9a9a;font-size:16px;pointer-events:none;transition:.2s ease}'
    + '.kpf input:focus+label,.kpf input:not(:placeholder-shown)+label,.kpf textarea:focus+label,.kpf textarea:not(:placeholder-shown)+label{top:-14px;font-size:12px;color:#db1200}'
    + '.kpop-send{width:100%;background:#db1200;color:#fff;border:0;padding:18px;font-family:"Fira Sans",Arial,sans-serif;font-weight:700;font-size:16px;cursor:pointer;transition:background .3s}'
    + '.kpop-send:hover{background:#eb1800}'
    + '.kpop-ok{margin-top:16px;text-align:center;color:#2ea44f;font-weight:600}'
    + '@media(max-width:600px){.kpop-box{padding:44px 22px 30px}.kpop-title{font-size:26px;margin-bottom:26px}}';

  var html = ''
    + '<div class="kpop-ov" data-close></div>'
    + '<div class="kpop-box">'
    + '<button class="kpop-x" data-close aria-label="Schließen">&times;</button>'
    + '<h2 class="kpop-title">Kontakt Us</h2>'
    + '<form class="kpop-form">'
    + '<div class="kpf"><input type="text" id="kp-comp" required placeholder=" " /><label for="kp-comp">Unternehmen</label></div>'
    + '<div class="kpf"><textarea id="kp-msg" rows="3" required placeholder=" "></textarea><label for="kp-msg">Ihr Anliegen</label></div>'
    + '<div class="kpf"><input type="email" id="kp-mail" required placeholder=" " /><label for="kp-mail">E-mail</label></div>'
    + '<button type="submit" class="kpop-send">Nachricht senden</button>'
    + '<p class="kpop-ok" hidden>Daten erfolgreich gesendet</p>'
    + '</form></div>';

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var pop = document.createElement('div');
    pop.className = 'kpop';
    pop.setAttribute('aria-hidden', 'true');
    pop.innerHTML = html;
    document.body.appendChild(pop);

    function open(e) { if (e) e.preventDefault(); pop.classList.add('open'); pop.setAttribute('aria-hidden', 'false'); }
    function close() { pop.classList.remove('open'); pop.setAttribute('aria-hidden', 'true'); }

    // Any "Contact Us" trigger opens the popup.
    var triggers = document.querySelectorAll('.contact-us, .svc-contact, a[href="#kontaktus"], a[href="#popup:kontaktus"], [data-kontakt]');
    triggers.forEach(function (t) { t.addEventListener('click', open); });

    pop.querySelectorAll('[data-close]').forEach(function (el) { el.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    pop.querySelector('.kpop-form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (!this.checkValidity()) { this.reportValidity(); return; }
      var ok = pop.querySelector('.kpop-ok');
      ok.hidden = false;
      this.reset();
      setTimeout(function () { ok.hidden = true; close(); }, 1600);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
