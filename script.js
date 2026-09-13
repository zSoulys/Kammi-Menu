const menu = document.getElementById('menu');
const contentBody = document.getElementById('content-body');
const currentCategoryLabel = document.getElementById('current-category');

const categoryNames = {
    jogador: 'Jogador',
    visual: 'Visual',
    armas: 'Armas',
    veiculos: 'Veículos',
    players: 'Players',
    cloud: 'Cloud',
    tools: 'Tools',
    statebags: 'Statebags',
    exploits: 'Exploits',
    configs: 'Configs'
};

const weaponToggles = {
    infiniteAmmo: false,
    noReload: false,
    infiniteAmmoClip: false
};

const espToggles = {
    enableEsp: false,
    espNames: false,
    espHead: false,
    espSkeleton: false,
    espArmorbar: false,
    espLines: false,
    espCornerBox: false
};

let espDistance = 500;

function renderEmpty() {
    return `
        <div class="empty-state">
            <p>Nenhuma função nesta categoria ainda.</p>
        </div>
    `;
}

function renderJogador() {
    return renderEmpty();
}

function renderVisual() {
    var pct = ((espDistance - 1) / (3000 - 1) * 100).toFixed(2);
    return `
        <div class="category-grid compact">
            <div class="panel">
                <div class="panel-title">ESP</div>
                <div class="panel-body">
                    <div class="toggle-row" data-esptoggle="enableEsp"><span>Enable ESP</span><div class="toggle-check ${espToggles.enableEsp ? 'active' : ''}" id="toggle-enableEsp"><span class="check-mark" aria-hidden="true"><svg viewBox="0 0 12 12" width="10" height="10"><path fill="currentColor" d="M4.5 9.2L1.6 6.3l1.1-1.1 1.8 1.8 4.2-4.2 1.1 1.1z"/></svg></span></div></div>
                    <div class="toggle-row" data-esptoggle="espNames"><span>ESP Names</span><div class="toggle-check ${espToggles.espNames ? 'active' : ''}" id="toggle-espNames"><span class="check-mark" aria-hidden="true"><svg viewBox="0 0 12 12" width="10" height="10"><path fill="currentColor" d="M4.5 9.2L1.6 6.3l1.1-1.1 1.8 1.8 4.2-4.2 1.1 1.1z"/></svg></span></div></div>
                    <div class="toggle-row" data-esptoggle="espHead"><span>ESP Head</span><div class="toggle-check ${espToggles.espHead ? 'active' : ''}" id="toggle-espHead"><span class="check-mark" aria-hidden="true"><svg viewBox="0 0 12 12" width="10" height="10"><path fill="currentColor" d="M4.5 9.2L1.6 6.3l1.1-1.1 1.8 1.8 4.2-4.2 1.1 1.1z"/></svg></span></div></div>
                    <div class="toggle-row" data-esptoggle="espSkeleton"><span>ESP Skeleton</span><div class="toggle-check ${espToggles.espSkeleton ? 'active' : ''}" id="toggle-espSkeleton"><span class="check-mark" aria-hidden="true"><svg viewBox="0 0 12 12" width="10" height="10"><path fill="currentColor" d="M4.5 9.2L1.6 6.3l1.1-1.1 1.8 1.8 4.2-4.2 1.1 1.1z"/></svg></span></div></div>
                    <div class="toggle-row" data-esptoggle="espArmorbar"><span>ESP Armorbar</span><div class="toggle-check ${espToggles.espArmorbar ? 'active' : ''}" id="toggle-espArmorbar"><span class="check-mark" aria-hidden="true"><svg viewBox="0 0 12 12" width="10" height="10"><path fill="currentColor" d="M4.5 9.2L1.6 6.3l1.1-1.1 1.8 1.8 4.2-4.2 1.1 1.1z"/></svg></span></div></div>
                    <div class="toggle-row" data-esptoggle="espLines"><span>ESP Lines</span><div class="toggle-check ${espToggles.espLines ? 'active' : ''}" id="toggle-espLines"><span class="check-mark" aria-hidden="true"><svg viewBox="0 0 12 12" width="10" height="10"><path fill="currentColor" d="M4.5 9.2L1.6 6.3l1.1-1.1 1.8 1.8 4.2-4.2 1.1 1.1z"/></svg></span></div></div>
                    <div class="toggle-row" data-esptoggle="espCornerBox"><span>ESP Corner Box</span><div class="toggle-check ${espToggles.espCornerBox ? 'active' : ''}" id="toggle-espCornerBox"><span class="check-mark" aria-hidden="true"><svg viewBox="0 0 12 12" width="10" height="10"><path fill="currentColor" d="M4.5 9.2L1.6 6.3l1.1-1.1 1.8 1.8 4.2-4.2 1.1 1.1z"/></svg></span></div></div>
                </div>
            </div>
            <div class="panel">
                <div class="panel-title">ESP Settings</div>
                <div class="panel-body">
                    <div class="sub-label">Distance</div>
                    <div class="esp-slider-wrap">
                        <div class="esp-slider-row">
                            <input
                                type="range"
                                id="esp-distance-slider"
                                class="esp-slider"
                                min="1"
                                max="3000"
                                value="${espDistance}"
                                step="1"
                                style="--slider-pct: ${pct}%"
                            />
                        </div>
                        <div class="esp-slider-value-row">
                            <span class="esp-slider-label">1</span>
                            <span class="esp-slider-value" id="esp-distance-val">${espDistance}</span>
                            <span class="esp-slider-label">3000</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function syncSliderTrack(slider) {
    if (!slider) return;
    var min = parseFloat(slider.min) || 0;
    var max = parseFloat(slider.max) || 100;
    var val = parseFloat(slider.value) || min;
    var pct = ((val - min) / (max - min) * 100);
    if (pct < 0) pct = 0;
    if (pct > 100) pct = 100;
    slider.style.setProperty('--slider-pct', pct.toFixed(2) + '%');
}

function bindEspControls() {
    contentBody.querySelectorAll('[data-esptoggle]').forEach(function (row) {
        row.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            var opt = row.getAttribute('data-esptoggle');
            espToggles[opt] = !espToggles[opt];
            var el = document.getElementById('toggle-' + opt);
            if (el) el.classList.toggle('active', espToggles[opt]);
            window.__kammiLastAction = {
                type: 'espToggle',
                option: opt,
                enabled: espToggles[opt]
            };
        });
    });

    var slider = document.getElementById('esp-distance-slider');
    var valDisplay = document.getElementById('esp-distance-val');
    if (slider) {
        // garantir valor e track alinhados ao estado global
        slider.value = String(espDistance);
        syncSliderTrack(slider);
        if (valDisplay) valDisplay.textContent = String(espDistance);

        slider.addEventListener('input', function () {
            espDistance = parseInt(slider.value, 10) || 1;
            if (valDisplay) valDisplay.textContent = String(espDistance);
            syncSliderTrack(slider);
            window.__kammiLastAction = {
                type: 'espSetting',
                option: 'distance',
                value: espDistance
            };
        });
        slider.addEventListener('mousedown', function (e) { e.stopPropagation(); });
        slider.addEventListener('click', function (e) { e.stopPropagation(); });
        // reflow: corrige thumb vs track no WebKit
        requestAnimationFrame(function () {
            syncSliderTrack(slider);
        });
    }
}

function renderArmas() {
    return `
        <div class="category-grid">
            <div class="panel">
                <div class="panel-title">Dar Arma</div>
                <div class="panel-body">
                    <div class="sub-label">Ações Rápidas</div>
                    <div class="action-btn primary" data-waction="giveAll"><span>Dar Todas as Armas</span></div>
                    <div class="action-btn danger" data-waction="removeAll"><span>Remover Todas as Armas</span></div>
                    <div class="sub-label">Pistolas</div>
                    <div class="action-btn" data-waction="give" data-weapon="WEAPON_PISTOL">Pistola</div>
                    <div class="action-btn" data-waction="give" data-weapon="WEAPON_COMBATPISTOL">Combat Pistol</div>
                    <div class="action-btn" data-waction="give" data-weapon="WEAPON_APPISTOL">AP Pistol</div>
                    <div class="action-btn" data-waction="give" data-weapon="WEAPON_PISTOL50">Pistol .50</div>
                    <div class="action-btn" data-waction="give" data-weapon="WEAPON_HEAVYPISTOL">Heavy Pistol</div>
                    <div class="sub-label">SMGs</div>
                    <div class="action-btn" data-waction="give" data-weapon="WEAPON_MICROSMG">Micro SMG</div>
                    <div class="action-btn" data-waction="give" data-weapon="WEAPON_SMG">SMG</div>
                    <div class="action-btn" data-waction="give" data-weapon="WEAPON_ASSAULTSMG">Assault SMG</div>
                    <div class="sub-label">Rifles</div>
                    <div class="action-btn" data-waction="give" data-weapon="WEAPON_ASSAULTRIFLE">Assault Rifle</div>
                    <div class="action-btn" data-waction="give" data-weapon="WEAPON_CARBINERIFLE">Carbine Rifle</div>
                    <div class="action-btn" data-waction="give" data-weapon="WEAPON_SPECIALCARBINE">Special Carbine</div>
                    <div class="sub-label">Pesadas</div>
                    <div class="action-btn" data-waction="give" data-weapon="WEAPON_RPG">RPG</div>
                    <div class="action-btn" data-waction="give" data-weapon="WEAPON_MINIGUN">Minigun</div>
                </div>
            </div>
            <div class="panel">
                <div class="panel-title">Modificadores</div>
                <div class="panel-body">
                    <div class="toggle-row" data-wtoggle="infiniteAmmo"><span>Munição Infinita</span><div class="toggle-check ${weaponToggles.infiniteAmmo ? 'active' : ''}" id="toggle-infiniteAmmo"><span class="check-mark" aria-hidden="true"><svg viewBox="0 0 12 12" width="10" height="10"><path fill="currentColor" d="M4.5 9.2L1.6 6.3l1.1-1.1 1.8 1.8 4.2-4.2 1.1 1.1z"/></svg></span></div></div>
                    <div class="toggle-row" data-wtoggle="infiniteAmmoClip"><span>Clip Infinito</span><div class="toggle-check ${weaponToggles.infiniteAmmoClip ? 'active' : ''}" id="toggle-infiniteAmmoClip"><span class="check-mark" aria-hidden="true"><svg viewBox="0 0 12 12" width="10" height="10"><path fill="currentColor" d="M4.5 9.2L1.6 6.3l1.1-1.1 1.8 1.8 4.2-4.2 1.1 1.1z"/></svg></span></div></div>
                    <div class="toggle-row" data-wtoggle="noReload"><span>Sem Recarregar</span><div class="toggle-check ${weaponToggles.noReload ? 'active' : ''}" id="toggle-noReload"><span class="check-mark" aria-hidden="true"><svg viewBox="0 0 12 12" width="10" height="10"><path fill="currentColor" d="M4.5 9.2L1.6 6.3l1.1-1.1 1.8 1.8 4.2-4.2 1.1 1.1z"/></svg></span></div></div>
                    <div class="sub-label">Extras</div>
                    <div class="action-btn" data-waction="refillAmmo"><span>Recarregar Munição Atual</span></div>
                    <div class="action-btn" data-waction="giveMaxAmmo"><span>Munição Máxima em Todas</span></div>
                </div>
            </div>
        </div>
    `;
}

function loadCategory(category) {
    // título principal oculto (espaço reservado) — não exibir nome duplicado
    if (currentCategoryLabel) {
        currentCategoryLabel.textContent = '';
        currentCategoryLabel.classList.add('is-hidden');
    }

    if (category === 'armas') {
        contentBody.innerHTML = renderArmas();
        bindWeaponButtons();
    } else if (category === 'visual') {
        contentBody.innerHTML = renderVisual();
        bindEspControls();
    } else if (category === 'jogador') {
        contentBody.innerHTML = renderJogador();
    } else {
        contentBody.innerHTML = renderEmpty();
    }
}

function bindWeaponButtons() {
    contentBody.querySelectorAll('[data-waction]').forEach(function (btn) {
        btn.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            window.__kammiLastAction = {
                type: 'weapon',
                action: btn.getAttribute('data-waction'),
                weapon: btn.getAttribute('data-weapon') || null
            };
        });
    });
    contentBody.querySelectorAll('[data-wtoggle]').forEach(function (row) {
        row.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            var opt = row.getAttribute('data-wtoggle');
            weaponToggles[opt] = !weaponToggles[opt];
            var el = document.getElementById('toggle-' + opt);
            if (el) el.classList.toggle('active', weaponToggles[opt]);
            window.__kammiLastAction = {
                type: 'weaponToggle',
                option: opt,
                enabled: weaponToggles[opt]
            };
        });
    });
}

function bindCategoryClicks() {
    var nav = document.querySelector('.sidebar-nav');
    if (!nav) return;

    function onSelect(e) {
        var item = e.target.closest('.nav-item');
        if (!item) return;
        e.preventDefault();
        e.stopPropagation();
        document.querySelectorAll('.nav-item').forEach(function (i) {
            i.classList.remove('active');
        });
        item.classList.add('active');
        loadCategory(item.getAttribute('data-category'));
    }

    nav.addEventListener('click', onSelect);
    nav.addEventListener('mousedown', onSelect);
}

bindCategoryClicks();

window.addEventListener('message', function (event) {
    var data = event.data;
    if (!data || !data.action) return;
    if (data.action === 'open') {
        menu.classList.remove('hidden');
        menu.style.display = 'flex';
    }
    if (data.action === 'close') {
        menu.classList.add('hidden');
        menu.style.display = 'none';
    }
});

menu.style.display = 'flex';

// Live slider track fill (global)
document.addEventListener('input', function(e) {
    if (e.target && e.target.classList && e.target.classList.contains('esp-slider')) {
        syncSliderTrack(e.target);
    }
});
