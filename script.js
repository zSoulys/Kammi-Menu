const menu = document.getElementById('menu');
const contentBody = document.getElementById('content-body');
const currentCategoryLabel = document.getElementById('current-category');

const categoryNames = {
    jogador: 'Jogador',
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

function renderEmpty() {
    return `
        <div class="empty-state">
            <i class="fa-solid fa-folder-open"></i>
            <p>Nenhuma função nesta categoria ainda.</p>
        </div>
    `;
}

function renderArmas() {
    return `
        <div class="category-grid">
            <div class="panel">
                <div class="panel-title"><i class="fa-solid fa-gun"></i> Dar Arma</div>
                <div class="panel-body">
                    <div class="sub-label">Ações Rápidas</div>
                    <div class="action-btn primary" data-waction="giveAll"><span>Dar Todas as Armas</span><i class="fa-solid fa-plus"></i></div>
                    <div class="action-btn danger" data-waction="removeAll"><span>Remover Todas as Armas</span><i class="fa-solid fa-trash"></i></div>
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
                <div class="panel-title"><i class="fa-solid fa-sliders"></i> Modificadores</div>
                <div class="panel-body">
                    <div class="toggle-row" data-wtoggle="infiniteAmmo"><span>Munição Infinita</span><div class="toggle-check" id="toggle-infiniteAmmo"></div></div>
                    <div class="toggle-row" data-wtoggle="infiniteAmmoClip"><span>Clip Infinito</span><div class="toggle-check" id="toggle-infiniteAmmoClip"></div></div>
                    <div class="toggle-row" data-wtoggle="noReload"><span>Sem Recarregar</span><div class="toggle-check" id="toggle-noReload"></div></div>
                    <div class="sub-label">Extras</div>
                    <div class="action-btn" data-waction="refillAmmo"><span>Recarregar Munição Atual</span><i class="fa-solid fa-rotate"></i></div>
                    <div class="action-btn" data-waction="giveMaxAmmo"><span>Munição Máxima em Todas</span><i class="fa-solid fa-boxes-stacked"></i></div>
                </div>
            </div>
        </div>
    `;
}

function loadCategory(category) {
    currentCategoryLabel.textContent = categoryNames[category] || category;
    if (category === 'armas') {
        contentBody.innerHTML = renderArmas();
        bindWeaponButtons();
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
