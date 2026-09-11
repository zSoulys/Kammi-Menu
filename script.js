const menu = document.getElementById('menu');
const contentBody = document.getElementById('content-body');
const currentCategoryLabel = document.getElementById('current-category');

const categoryNames = {
    'jogador-local': 'Jogador Local',
    'jogador': 'Jogador',
    'armas': 'Armas',
    'online': 'Online',
    'veiculos': 'Veículos',
    'players': 'Players',
    'outros': 'Outros',
    'cloud': 'Cloud',
    'tools': 'Tools',
    'statebags': 'Statebags',
    'exploits': 'Exploits',
    'configs': 'Configs'
};

// Estado dos toggles de armas
const weaponToggles = {
    infiniteAmmo: false,
    noReload: false,
    infiniteAmmoClip: false
};

// ========== RENDERIZADORES DE CATEGORIA ==========

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
            <!-- COLUNA ESQUERDA: DAR ARMAS -->
            <div class="panel">
                <div class="panel-title">
                    <i class="fa-solid fa-gun"></i>
                    Dar Arma
                </div>
                <div class="panel-body">
                    <div class="sub-label">Ações Rápidas</div>
                    <div class="action-btn primary" onclick="weaponAction('giveAll')">
                        <span>Dar Todas as Armas</span>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <div class="action-btn danger" onclick="weaponAction('removeAll')">
                        <span>Remover Todas as Armas</span>
                        <i class="fa-solid fa-trash"></i>
                    </div>

                    <div class="sub-label">Pistolas</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_PISTOL')">Pistola</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_COMBATPISTOL')">Combat Pistol</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_APPISTOL')">AP Pistol</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_PISTOL50')">Pistol .50</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_HEAVYPISTOL')">Heavy Pistol</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_VINTAGEPISTOL')">Vintage Pistol</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_SNSPISTOL')">SNS Pistol</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_REVOLVER')">Revolver</div>

                    <div class="sub-label">SMGs</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_MICROSMG')">Micro SMG</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_SMG')">SMG</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_ASSAULTSMG')">Assault SMG</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_COMBATPDW')">Combat PDW</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_MACHINEPISTOL')">Machine Pistol</div>

                    <div class="sub-label">Rifles</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_ASSAULTRIFLE')">Assault Rifle</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_CARBINERIFLE')">Carbine Rifle</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_ADVANCEDRIFLE')">Advanced Rifle</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_SPECIALCARBINE')">Special Carbine</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_BULLPUPRIFLE')">Bullpup Rifle</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_COMPACTRIFLE')">Compact Rifle</div>

                    <div class="sub-label">Shotguns</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_PUMPSHOTGUN')">Pump Shotgun</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_SAWNOFFSHOTGUN')">Sawed-Off</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_ASSAULTSHOTGUN')">Assault Shotgun</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_BULLPUPSHOTGUN')">Bullpup Shotgun</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_HEAVYSHOTGUN')">Heavy Shotgun</div>

                    <div class="sub-label">Snipers</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_SNIPERRIFLE')">Sniper Rifle</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_HEAVYSNIPER')">Heavy Sniper</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_MARKSMANRIFLE')">Marksman Rifle</div>

                    <div class="sub-label">Pesadas</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_RPG')">RPG</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_GRENADELAUNCHER')">Grenade Launcher</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_MINIGUN')">Minigun</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_RAILGUN')">Railgun</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_HOMINGLAUNCHER')">Homing Launcher</div>

                    <div class="sub-label">Corpo a Corpo</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_KNIFE')">Faca</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_BAT')">Taco de Baseball</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_MACHETE')">Machete</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_SWITCHBLADE')">Canivete</div>
                    <div class="action-btn" onclick="weaponAction('give', 'WEAPON_KNUCKLE')">Soco Inglês</div>
                </div>
            </div>

            <!-- COLUNA DIREITA: MODIFICADORES -->
            <div class="panel">
                <div class="panel-title">
                    <i class="fa-solid fa-sliders"></i>
                    Modificadores
                </div>
                <div class="panel-body">
                    <div class="toggle-row" onclick="toggleWeaponOption('infiniteAmmo')">
                        <span>Munição Infinita</span>
                        <div class="toggle-check ${weaponToggles.infiniteAmmo ? 'active' : ''}" id="toggle-infiniteAmmo"></div>
                    </div>
                    <div class="toggle-row" onclick="toggleWeaponOption('infiniteAmmoClip')">
                        <span>Clip Infinito</span>
                        <div class="toggle-check ${weaponToggles.infiniteAmmoClip ? 'active' : ''}" id="toggle-infiniteAmmoClip"></div>
                    </div>
                    <div class="toggle-row" onclick="toggleWeaponOption('noReload')">
                        <span>Sem Recarregar</span>
                        <div class="toggle-check ${weaponToggles.noReload ? 'active' : ''}" id="toggle-noReload"></div>
                    </div>

                    <div class="sub-label">Extras</div>
                    <div class="action-btn" onclick="weaponAction('refillAmmo')">
                        <span>Recarregar Munição Atual</span>
                        <i class="fa-solid fa-rotate"></i>
                    </div>
                    <div class="action-btn" onclick="weaponAction('giveMaxAmmo')">
                        <span>Munição Máxima em Todas</span>
                        <i class="fa-solid fa-boxes-stacked"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ========== AÇÕES ==========

function weaponAction(action, weapon) {
    fetch(`https://${GetParentResourceName()}/weaponAction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, weapon })
    }).catch(() => {});
}

function toggleWeaponOption(option) {
    weaponToggles[option] = !weaponToggles[option];

    const el = document.getElementById(`toggle-${option}`);
    if (el) {
        el.classList.toggle('active', weaponToggles[option]);
    }

    fetch(`https://${GetParentResourceName()}/weaponToggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ option, enabled: weaponToggles[option] })
    }).catch(() => {});
}

// ========== NAVEGAÇÃO ==========

function loadCategory(category) {
    currentCategoryLabel.textContent = categoryNames[category] || category;

    if (category === 'armas') {
        contentBody.innerHTML = renderArmas();
    } else {
        contentBody.innerHTML = renderEmpty();
    }
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        loadCategory(item.dataset.category);
    });
});

// ========== NUI MESSAGES ==========

window.addEventListener('message', (event) => {
    const data = event.data;
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

// No DUI o menu já começa visível
menu.style.display = 'flex';


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        menu.classList.add('hidden');
        fetch(`https://${GetParentResourceName()}/close`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        }).catch(() => {});
    }
});

function GetParentResourceName() {
    try {
        return window.GetParentResourceName();
    } catch (e) {
        return 'shark_menu';
    }
}
