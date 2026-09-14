/**
 * Kammi UI Demo — protótipo standalone
 * Sem FiveM, sem servidor, sem memória/processo do jogo.
 * Dados e ações são apenas simulados na interface.
 */
(function () {
    'use strict';

    const menu = document.getElementById('menu');
    const contentBody = document.getElementById('content-body');
    const currentCategoryLabel = document.getElementById('current-category');
    const subnav = document.getElementById('subnav');
    const notifRoot = document.getElementById('demo-notif-root');

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

    // Estado persistente (só em memória da página)
    const state = {
        esp: {
            enableEsp: false,
            espNames: true,
            espHead: true,
            espSkeleton: false,
            espArmorbar: true,
            espLines: false,
            espCornerBox: true,
            distance: 150
        },
        weapons: {
            infiniteAmmo: false,
            infiniteAmmoClip: false,
            noReload: false
        },
        // Apenas UI demo — não controla mira/jogo
        aimbot: {
            enabled: false,
            showFov: true,
            fov: 50,
            smooth: 10,
            visibleCheck: false,
            excludeDeads: true
        },
        silent: {
            enabled: false,
            previewOnly: true,
            fov: 40,
            marker: true
        },
        aimSub: 'aimbot',
        mockPlayers: [
            { name: 'Demo_Player_01', dist: 42, hp: 88, armor: 50 },
            { name: 'Demo_Player_02', dist: 120, hp: 100, armor: 0 },
            { name: 'NPC_Treino_A', dist: 18, hp: 70, armor: 25 },
            { name: 'NPC_Treino_B', dist: 65, hp: 40, armor: 0 }
        ]
    };

    function checkMark() {
        return '<span class="check-mark" aria-hidden="true"><svg viewBox="0 0 12 12" width="10" height="10"><path fill="currentColor" d="M4.5 9.2L1.6 6.3l1.1-1.1 1.8 1.8 4.2-4.2 1.1 1.1z"/></svg></span>';
    }

    function notify(msg, kind) {
        if (!notifRoot) return;
        const el = document.createElement('div');
        el.className = 'demo-notif';
        el.textContent = msg;
        notifRoot.appendChild(el);
        requestAnimationFrame(function () { el.classList.add('show'); });
        setTimeout(function () {
            el.classList.remove('show');
            setTimeout(function () { el.remove(); }, 280);
        }, 2800);
        console.log('[Kammi Demo]', kind || 'info', msg);
    }

    function syncSlider(slider) {
        if (!slider) return;
        const min = parseFloat(slider.min) || 0;
        const max = parseFloat(slider.max) || 100;
        const val = parseFloat(slider.value) || min;
        let pct = ((val - min) / (max - min)) * 100;
        if (pct < 0) pct = 0;
        if (pct > 100) pct = 100;
        slider.style.setProperty('--slider-pct', pct.toFixed(2) + '%');
    }

    function renderEmpty(msg) {
        return '<div class="empty-state"><p>' + (msg || 'Nenhuma função nesta categoria ainda.') + '</p></div>';
    }

    function renderVisual() {
        const e = state.esp;
        const pct = (((e.distance - 1) / 2999) * 100).toFixed(2);
        return `
        <div class="category-grid compact">
            <div class="panel">
                <div class="panel-title">ESP (simulado)</div>
                <div class="panel-body">
                    <p class="demo-hint">Somente interface — não lê o jogo nem outros jogadores.</p>
                    ${toggleRow('esp', 'enableEsp', 'Enable ESP', e.enableEsp)}
                    ${toggleRow('esp', 'espNames', 'ESP Names', e.espNames)}
                    ${toggleRow('esp', 'espHead', 'ESP Head', e.espHead)}
                    ${toggleRow('esp', 'espSkeleton', 'ESP Skeleton', e.espSkeleton)}
                    ${toggleRow('esp', 'espArmorbar', 'ESP Armorbar', e.espArmorbar)}
                    ${toggleRow('esp', 'espLines', 'ESP Lines', e.espLines)}
                    ${toggleRow('esp', 'espCornerBox', 'ESP Corner Box', e.espCornerBox)}
                </div>
            </div>
            <div class="panel">
                <div class="panel-title">ESP Settings</div>
                <div class="panel-body">
                    <div class="sub-label">Distance</div>
                    <div class="esp-slider-wrap">
                        <input type="range" class="esp-slider" id="esp-distance-slider" min="1" max="3000" step="1" value="${e.distance}" style="--slider-pct:${pct}%"/>
                        <div class="esp-slider-value-row">
                            <span class="esp-slider-label">1</span>
                            <span class="esp-slider-value" id="esp-distance-val">${e.distance}</span>
                            <span class="esp-slider-label">3000</span>
                        </div>
                    </div>
                    <div class="sub-label">Preview (dados fictícios)</div>
                    <div class="mock-list">${state.mockPlayers.map(function (p) {
                        return '<div class="mock-row"><span>' + p.name + '</span><span>' + p.dist + 'm · HP ' + p.hp + '</span></div>';
                    }).join('')}</div>
                </div>
            </div>
        </div>`;
    }

    function toggleRow(group, key, label, on) {
        return '<div class="toggle-row" data-group="' + group + '" data-key="' + key + '"><span>' + label + '</span><div class="toggle-check' + (on ? ' active' : '') + '" id="toggle-' + key + '">' + checkMark() + '</div></div>';
    }

    function renderAim() {
        if (state.aimSub === 'silent') {
            const s = state.silent;
            const pct = ((s.fov - 1) / 299 * 100).toFixed(2);
            return `
            <div class="category-grid compact">
                <div class="panel">
                    <div class="panel-title">Silent <span class="demo-tag">UI demo</span></div>
                    <div class="panel-body">
                        <p class="demo-hint">Demonstração visual apenas. Nenhuma ação de mira ou disparo.</p>
                        ${toggleRow('silent', 'enabled', 'Enable (demo)', s.enabled)}
                        ${toggleRow('silent', 'previewOnly', 'Preview only', s.previewOnly)}
                        ${toggleRow('silent', 'marker', 'Target marker (demo)', s.marker)}
                        <div class="sub-label">FOV preview</div>
                        <div class="esp-slider-wrap">
                            <input type="range" class="esp-slider" data-aim-slider="silent.fov" min="1" max="300" value="${s.fov}" style="--slider-pct:${pct}%"/>
                            <div class="esp-slider-value-row">
                                <span class="esp-slider-label">1</span>
                                <span class="esp-slider-value" data-val="silent.fov">${s.fov}</span>
                                <span class="esp-slider-label">300</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }
        // aimbot tab — UI only
        const a = state.aimbot;
        const pctF = ((a.fov - 1) / 299 * 100).toFixed(2);
        const pctS = (a.smooth / 50 * 100).toFixed(2);
        return `
        <div class="category-grid compact">
            <div class="panel">
                <div class="panel-title">Aimbot <span class="demo-tag">UI demo</span></div>
                <div class="panel-body">
                    <p class="demo-hint">Controles fictícios para testar layout. Não alteram o jogo.</p>
                    ${toggleRow('aimbot', 'enabled', 'Enable (demo)', a.enabled)}
                    ${toggleRow('aimbot', 'showFov', 'Show FOV', a.showFov)}
                    ${toggleRow('aimbot', 'visibleCheck', 'Visible check (demo)', a.visibleCheck)}
                    ${toggleRow('aimbot', 'excludeDeads', 'Exclude deads (demo)', a.excludeDeads)}
                    <div class="sub-label">Training FOV</div>
                    <div class="esp-slider-wrap">
                        <input type="range" class="esp-slider" data-aim-slider="aimbot.fov" min="1" max="300" value="${a.fov}" style="--slider-pct:${pctF}%"/>
                        <div class="esp-slider-value-row">
                            <span class="esp-slider-label">1</span>
                            <span class="esp-slider-value" data-val="aimbot.fov">${a.fov}</span>
                            <span class="esp-slider-label">300</span>
                        </div>
                    </div>
                    <div class="sub-label">Smoothing preview</div>
                    <div class="esp-slider-wrap">
                        <input type="range" class="esp-slider" data-aim-slider="aimbot.smooth" min="0" max="50" value="${a.smooth}" style="--slider-pct:${pctS}%"/>
                        <div class="esp-slider-value-row">
                            <span class="esp-slider-label">0</span>
                            <span class="esp-slider-value" data-val="aimbot.smooth">${a.smooth}</span>
                            <span class="esp-slider-label">50</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    function renderArmas() {
        const w = state.weapons;
        return `
        <div class="category-grid compact">
            <div class="panel">
                <div class="panel-title">Armas (demo)</div>
                <div class="panel-body">
                    <p class="demo-hint">Botões apenas registram ação simulada no console.</p>
                    <div class="action-btn primary" data-demo-action="giveAll"><span>Dar Todas as Armas</span></div>
                    <div class="action-btn danger" data-demo-action="removeAll"><span>Remover Todas</span></div>
                    ${toggleRow('weapons', 'infiniteAmmo', 'Munição Infinita', w.infiniteAmmo)}
                    ${toggleRow('weapons', 'noReload', 'Sem Recarregar', w.noReload)}
                    ${toggleRow('weapons', 'infiniteAmmoClip', 'Clip Infinito', w.infiniteAmmoClip)}
                </div>
            </div>
        </div>`;
    }

    function renderPlayers() {
        return `
        <div class="category-grid compact">
            <div class="panel" style="grid-column:1/-1">
                <div class="panel-title">Players (lista fictícia)</div>
                <div class="panel-body">
                    <div class="mock-list">${state.mockPlayers.map(function (p, i) {
                        return '<div class="mock-row"><span>' + (i + 1) + '. ' + p.name + '</span><span>' + p.dist + 'm</span></div>';
                    }).join('')}</div>
                </div>
            </div>
        </div>`;
    }

    function renderSubnav(category) {
        if (!subnav) return;
        if (category !== 'aim') {
            subnav.classList.add('is-hidden');
            subnav.innerHTML = '';
            return;
        }
        subnav.classList.remove('is-hidden');
        subnav.innerHTML = '';
        [
            { id: 'aimbot', label: 'Aimbot' },
            { id: 'silent', label: 'Silent' }
        ].forEach(function (tab) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'subnav-btn' + (state.aimSub === tab.id ? ' active' : '');
            btn.textContent = tab.label;
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                state.aimSub = tab.id;
                loadCategory('aim');
            });
            subnav.appendChild(btn);
        });
    }

    function bindContent() {
        contentBody.querySelectorAll('.toggle-row').forEach(function (row) {
            row.addEventListener('click', function (e) {
                e.stopPropagation();
                const group = row.getAttribute('data-group');
                const key = row.getAttribute('data-key');
                if (!group || !key || !state[group]) return;
                state[group][key] = !state[group][key];
                const el = document.getElementById('toggle-' + key);
                if (el) el.classList.toggle('active', state[group][key]);
                notify(key + ': ' + (state[group][key] ? 'ON' : 'OFF'));
            });
        });

        contentBody.querySelectorAll('.esp-slider').forEach(function (s) {
            syncSlider(s);
            s.addEventListener('input', function () {
                syncSlider(s);
                if (s.id === 'esp-distance-slider') {
                    state.esp.distance = parseInt(s.value, 10);
                    const v = document.getElementById('esp-distance-val');
                    if (v) v.textContent = String(state.esp.distance);
                    return;
                }
                const path = s.getAttribute('data-aim-slider');
                if (path) {
                    const parts = path.split('.');
                    state[parts[0]][parts[1]] = parseInt(s.value, 10);
                    const valEl = contentBody.querySelector('[data-val="' + path + '"]');
                    if (valEl) valEl.textContent = s.value;
                }
            });
        });

        contentBody.querySelectorAll('[data-demo-action]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                notify('Ação simulada: ' + btn.getAttribute('data-demo-action'));
            });
        });
    }

    function loadCategory(category) {
        if (currentCategoryLabel) {
            currentCategoryLabel.textContent = '';
            currentCategoryLabel.classList.add('is-hidden');
        }
        renderSubnav(category);

        if (category === 'visual') contentBody.innerHTML = renderVisual();
        else if (category === 'aim') contentBody.innerHTML = renderAim();
        else if (category === 'armas') contentBody.innerHTML = renderArmas();
        else if (category === 'players') contentBody.innerHTML = renderPlayers();
        else contentBody.innerHTML = renderEmpty('Protótipo UI — categoria “' + (categoryNames[category] || category) + '”.');

        bindContent();
    }

    function bindNav() {
        const nav = document.querySelector('.sidebar-nav');
        if (!nav) return;
        nav.addEventListener('click', function (e) {
            const item = e.target.closest('.nav-item');
            if (!item) return;
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(function (i) { i.classList.remove('active'); });
            item.classList.add('active');
            loadCategory(item.getAttribute('data-category'));
        });
    }

    // Drag demo
    (function enableDrag() {
        const header = document.getElementById('title-bar');
        if (!header || !menu) return;
        let dragging = false, ox = 0, oy = 0;
        header.addEventListener('mousedown', function (e) {
            if (e.target.closest('.subnav-btn')) return;
            dragging = true;
            const rect = menu.getBoundingClientRect();
            ox = e.clientX - rect.left;
            oy = e.clientY - rect.top;
            menu.style.transform = 'none';
            menu.style.left = rect.left + 'px';
            menu.style.top = rect.top + 'px';
        });
        window.addEventListener('mousemove', function (e) {
            if (!dragging) return;
            menu.style.left = (e.clientX - ox) + 'px';
            menu.style.top = (e.clientY - oy) + 'px';
        });
        window.addEventListener('mouseup', function () { dragging = false; });
    })();

    document.getElementById('demo-toggle-menu') && document.getElementById('demo-toggle-menu').addEventListener('click', function () {
        menu.classList.toggle('hidden');
        menu.style.display = menu.classList.contains('hidden') ? 'none' : 'flex';
    });
    document.getElementById('demo-notify') && document.getElementById('demo-notify').addEventListener('click', function () {
        notify('Notificação de demonstração');
    });

    // Keyboard: Insert simula abrir/fechar
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Insert') {
            e.preventDefault();
            menu.classList.toggle('hidden');
            menu.style.display = menu.classList.contains('hidden') ? 'none' : 'flex';
        }
    });

    bindNav();
    loadCategory('visual');
    menu.style.display = 'flex';
    notify('Demo local pronta — sem FiveM');
})();
