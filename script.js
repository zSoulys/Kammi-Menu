const menu = document.getElementById('menu');
const contentBody = document.getElementById('content-body');
const currentCategoryLabel = document.getElementById('current-category');

const categoryNames = {
    jogador: 'Jogador',
    visual: 'Visual',
    aim: 'Aim',
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

const aimToggles = {
    trainingOverlay: false,
    showFov: false,
    targetMarker: false,
    visibleCheck: false,
    excludeDeads: true,
    trainingNpcs: false,
    showFovCircle: true,
    showMarkers: true,
    showLines: false
};

const aimSettings = {
    trainingFov: 50,
    smoothingPreview: 10,
    circleThickness: 2,
    circleAlpha: 120,
    fovColor: '#00c8ff'
};

let aimSub = 'training'; // training | visual

function nuiPost(eventName, data) {
    var payload = JSON.stringify(data || {});
    try {
        fetch('https://' + GetParentResourceName() + '/' + eventName, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: payload
        }).catch(function () {});
    } catch (e) {}
    window.__kammiLastAction = Object.assign({ type: eventName }, data || {});
}

function GetParentResourceName() {
    try {
        if (typeof window.GetParentResourceName === 'function') {
            return window.GetParentResourceName();
        }
    } catch (e) {}
    return 'kammi_menu';
}


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
            nuiPost('espToggle', { option: opt, enabled: espToggles[opt] });
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
            nuiPost('espSetting', { option: 'distance', value: espDistance });
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


function renderSubnav(category) {
    var subnav = document.getElementById('subnav');
    if (!subnav) return;
    if (category === 'aim') {
        subnav.classList.remove('is-hidden');
        subnav.innerHTML = `
            <button type="button" class="subnav-btn ${aimSub === 'training' ? 'active' : ''}" data-sub="training">Training</button>
            <button type="button" class="subnav-btn ${aimSub === 'visual' ? 'active' : ''}" data-sub="visual">Visual</button>
        `;
        subnav.querySelectorAll('.subnav-btn').forEach(function (btn) {
            btn.addEventListener('mousedown', function (e) {
                e.stopPropagation();
                aimSub = btn.getAttribute('data-sub');
                loadCategory('aim');
            });
        });
    } else {
        subnav.classList.add('is-hidden');
        subnav.innerHTML = '';
    }
}

function checkMarkHtml() {
    return '<span class="check-mark" aria-hidden="true"><svg viewBox="0 0 12 12" width="10" height="10"><path fill="currentColor" d="M4.5 9.2L1.6 6.3l1.1-1.1 1.8 1.8 4.2-4.2 1.1 1.1z"/></svg></span>';
}

function renderAim() {
    if (aimSub === 'visual') {
        return `
        <div class="category-grid compact">
            <div class="panel">
                <div class="panel-title">Aim Visual</div>
                <div class="panel-body">
                    <div class="toggle-row" data-aimtoggle="showFovCircle"><span>Exibir círculo FOV</span><div class="toggle-check ${aimToggles.showFovCircle ? 'active' : ''}" id="toggle-showFovCircle">${checkMarkHtml()}</div></div>
                    <div class="toggle-row" data-aimtoggle="showMarkers"><span>Marcadores de treino</span><div class="toggle-check ${aimToggles.showMarkers ? 'active' : ''}" id="toggle-showMarkers">${checkMarkHtml()}</div></div>
                    <div class="toggle-row" data-aimtoggle="showLines"><span>Linhas / indicadores</span><div class="toggle-check ${aimToggles.showLines ? 'active' : ''}" id="toggle-showLines">${checkMarkHtml()}</div></div>
                    <div class="sub-label">Cor do círculo</div>
                    <div class="color-row">
                        <input type="color" id="aim-fov-color" class="color-input" value="${aimSettings.fovColor}" />
                        <span class="color-label">FOV Color</span>
                    </div>
                    <div class="sub-label">Transparência</div>
                    <div class="esp-slider-wrap">
                        <input type="range" id="aim-alpha-slider" class="esp-slider" min="20" max="255" value="${aimSettings.circleAlpha}" step="1" />
                        <div class="esp-slider-value-row">
                            <span class="esp-slider-label">20</span>
                            <span class="esp-slider-value" id="aim-alpha-val">${aimSettings.circleAlpha}</span>
                            <span class="esp-slider-label">255</span>
                        </div>
                    </div>
                    <div class="action-btn primary" id="aim-reset-btn"><span>Restaurar padrões</span></div>
                </div>
            </div>
        </div>`;
    }
    // Training
    var pctFov = ((aimSettings.trainingFov - 1) / 299 * 100).toFixed(2);
    var pctSmooth = (aimSettings.smoothingPreview / 50 * 100).toFixed(2);
    return `
        <div class="category-grid compact">
            <div class="panel">
                <div class="panel-title">Training</div>
                <div class="panel-body">
                    <div class="toggle-row" data-aimtoggle="trainingOverlay"><span>Enable Training Overlay</span><div class="toggle-check ${aimToggles.trainingOverlay ? 'active' : ''}" id="toggle-trainingOverlay">${checkMarkHtml()}</div></div>
                    <div class="toggle-row" data-aimtoggle="showFov"><span>Show Fov</span><div class="toggle-check ${aimToggles.showFov ? 'active' : ''}" id="toggle-showFov">${checkMarkHtml()}</div></div>
                    <div class="toggle-row" data-aimtoggle="targetMarker"><span>Target Marker</span><div class="toggle-check ${aimToggles.targetMarker ? 'active' : ''}" id="toggle-targetMarker">${checkMarkHtml()}</div></div>
                    <div class="toggle-row" data-aimtoggle="visibleCheck"><span>Visible Check (treino)</span><div class="toggle-check ${aimToggles.visibleCheck ? 'active' : ''}" id="toggle-visibleCheck">${checkMarkHtml()}</div></div>
                    <div class="toggle-row" data-aimtoggle="excludeDeads"><span>Exclude Deads</span><div class="toggle-check ${aimToggles.excludeDeads ? 'active' : ''}" id="toggle-excludeDeads">${checkMarkHtml()}</div></div>
                    <div class="toggle-row" data-aimtoggle="trainingNpcs"><span>Training NPCs</span><div class="toggle-check ${aimToggles.trainingNpcs ? 'active' : ''}" id="toggle-trainingNpcs">${checkMarkHtml()}</div></div>
                    <div class="sub-label">Fov Color</div>
                    <div class="color-row">
                        <input type="color" id="aim-fov-color" class="color-input" value="${aimSettings.fovColor}" />
                        <span class="color-label">Cor do FOV</span>
                    </div>
                    <div class="sub-label">Training Fov</div>
                    <div class="esp-slider-wrap">
                        <input type="range" id="aim-fov-slider" class="esp-slider" min="1" max="300" value="${aimSettings.trainingFov}" step="1" style="--slider-pct:${pctFov}%" />
                        <div class="esp-slider-value-row">
                            <span class="esp-slider-label">1</span>
                            <span class="esp-slider-value" id="aim-fov-val">${aimSettings.trainingFov}</span>
                            <span class="esp-slider-label">300</span>
                        </div>
                    </div>
                    <div class="sub-label">Smoothing Preview (só visual)</div>
                    <div class="esp-slider-wrap">
                        <input type="range" id="aim-smooth-slider" class="esp-slider" min="0" max="50" value="${aimSettings.smoothingPreview}" step="1" style="--slider-pct:${pctSmooth}%" />
                        <div class="esp-slider-value-row">
                            <span class="esp-slider-label">0</span>
                            <span class="esp-slider-value" id="aim-smooth-val">${aimSettings.smoothingPreview}</span>
                            <span class="esp-slider-label">50</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

function bindAimControls() {
    contentBody.querySelectorAll('[data-aimtoggle]').forEach(function (row) {
        row.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            var opt = row.getAttribute('data-aimtoggle');
            aimToggles[opt] = !aimToggles[opt];
            var el = document.getElementById('toggle-' + opt);
            if (el) el.classList.toggle('active', aimToggles[opt]);
            nuiPost('aimToggle', { option: opt, enabled: aimToggles[opt] });
        });
    });
    var color = document.getElementById('aim-fov-color');
    if (color) {
        color.value = aimSettings.fovColor;
        color.addEventListener('input', function () {
            aimSettings.fovColor = color.value;
            var r = parseInt(color.value.slice(1, 3), 16);
            var g = parseInt(color.value.slice(3, 5), 16);
            var b = parseInt(color.value.slice(5, 7), 16);
            nuiPost('aimSetting', { option: 'fovColor', value: { r: r, g: g, b: b } });
        });
        color.addEventListener('mousedown', function (e) { e.stopPropagation(); });
    }
    function bindSlider(id, valId, key, min, max, eventOpt) {
        var s = document.getElementById(id);
        var v = document.getElementById(valId);
        if (!s) return;
        s.value = String(aimSettings[key]);
        syncSliderTrack(s);
        if (v) v.textContent = String(aimSettings[key]);
        s.addEventListener('input', function () {
            var n = parseInt(s.value, 10);
            aimSettings[key] = n;
            if (v) v.textContent = String(n);
            syncSliderTrack(s);
            nuiPost('aimSetting', { option: eventOpt || key, value: n });
        });
        s.addEventListener('mousedown', function (e) { e.stopPropagation(); });
    }
    bindSlider('aim-fov-slider', 'aim-fov-val', 'trainingFov', 1, 300, 'trainingFov');
    bindSlider('aim-smooth-slider', 'aim-smooth-val', 'smoothingPreview', 0, 50, 'smoothingPreview');
    bindSlider('aim-alpha-slider', 'aim-alpha-val', 'circleAlpha', 20, 255, 'circleAlpha');
    var reset = document.getElementById('aim-reset-btn');
    if (reset) {
        reset.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            aimSettings.trainingFov = 50;
            aimSettings.smoothingPreview = 10;
            aimSettings.circleAlpha = 120;
            aimSettings.fovColor = '#00c8ff';
            aimToggles.showFov = true;
            aimToggles.showFovCircle = true;
            nuiPost('aimReset', {});
            loadCategory('aim');
        });
    }
}


function loadCategory(category) {
    if (currentCategoryLabel) {
        currentCategoryLabel.textContent = '';
        currentCategoryLabel.classList.add('is-hidden');
    }
    renderSubnav(category);

    if (category === 'armas') {
        contentBody.innerHTML = renderArmas();
        bindWeaponButtons();
    } else if (category === 'visual') {
        contentBody.innerHTML = renderVisual();
        bindEspControls();
    } else if (category === 'aim') {
        contentBody.innerHTML = renderAim();
        bindAimControls();
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
