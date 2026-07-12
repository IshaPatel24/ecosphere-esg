// EcoSphere ESG Management System - Client Logic

// 1. DEFAULT DATA INITIALIZATION
const DEFAULT_STATE = {
    settings: {
        weight_environmental: 40,
        weight_social: 30,
        weight_governance: 30,
        evidence_required: true,
        badge_auto_award: true,
        auto_emission_calc: true
    },
    employee: {
        name: "Yogesh Modi",
        xp: 380,
        points: 440,
        badge_ids: [1] // Green Starter is unlocked by default
    },
    leaderboard: [
        { name: "Yogesh Modi", dept: "Operations", xp: 380, avatar: "YM" },
        { name: "Isha Patel", dept: "Human Resources", xp: 420, avatar: "IP" },
        { name: "Siddharth Sen", dept: "IT", xp: 290, avatar: "SS" },
        { name: "Ananya Rao", dept: "Operations", xp: 150, avatar: "AR" },
        { name: "Rohan Varma", dept: "IT", xp: 80, avatar: "RV" }
    ],
    emissionFactors: [
        { id: "ef_diesel", name: "Diesel Fuel (2.68 kg CO2e/liter)", factor: 2.68, unit: "liters", type: "fleet" },
        { id: "ef_electricity", name: "Grid Electricity (0.42 kg CO2e/kWh)", factor: 0.42, unit: "kWh", type: "other" },
        { id: "ef_air_travel", name: "Domestic Air Travel (0.15 kg CO2e/km)", factor: 0.15, unit: "km", type: "expense" }
    ],
    transactions: [
        { id: "CT/2026/0001", date: "2026-07-01", department_id: "dept_operations", source_type: "fleet", factor_name: "Diesel Fuel", qty: 250, emission: 670, state: "confirmed" },
        { id: "CT/2026/0002", date: "2026-07-04", department_id: "dept_it", source_type: "other", factor_name: "Grid Electricity", qty: 800, emission: 336, state: "confirmed" },
        { id: "CT/2026/0003", date: "2026-07-08", department_id: "dept_hr", source_type: "expense", factor_name: "Domestic Air Travel", qty: 1200, emission: 180, state: "confirmed" },
        { id: "CT/2026/0004", date: "2026-07-11", department_id: "dept_operations", source_type: "manual", factor_name: "Diesel Fuel", qty: 100, emission: 268, state: "draft" }
    ],
    goals: [
        { id: 1, name: "Reduce Operations Emissions 2026", department_id: "dept_operations", target_value: 5000, current_value: 938, start_date: "2026-01-01", end_date: "2026-12-31", status: "active" },
        { id: 2, name: "Corporate-wide Carbon Cap", department_id: "", target_value: 12000, current_value: 1186, start_date: "2026-01-01", end_date: "2026-12-31", status: "active" }
    ],
    activities: [
        { id: 1, name: "Community Beach Cleanup", category: "Environmental Cleanup", points: 20, status: "completed" },
        { id: 2, name: "High School Career Mentorship", category: "Education & Mentorship", points: 30, status: "ongoing" },
        { id: 3, name: "Office E-Waste Collection Drive", category: "Waste Reduction", points: 15, status: "planned" }
    ],
    participations: [
        { id: 1, employee_name: "Isha Patel", activity_name: "Community Beach Cleanup", date: "2026-07-09", proof: "beach_cleanup_proof.jpg", points: 20, status: "approved" },
        { id: 2, employee_name: "Siddharth Sen", activity_name: "Community Beach Cleanup", date: "2026-07-09", proof: "proof_sid_photo.png", points: 20, status: "pending" },
        { id: 3, employee_name: "Ananya Rao", activity_name: "High School Career Mentorship", date: "2026-07-10", proof: "mentorship_log.pdf", points: 30, status: "pending" }
    ],
    policies: [
        { id: 1, name: "Corporate Code of Conduct v2.4", category: "Governance", effective_date: "2026-01-01", ack_rate: 80, acknowledged: true },
        { id: 2, name: "Data Privacy & HIPAA Guidelines", category: "Governance", effective_date: "2026-03-15", ack_rate: 60, acknowledged: false },
        { id: 3, name: "Supplier Green Procurement Policy", category: "Environmental", effective_date: "2026-06-01", ack_rate: 40, acknowledged: false }
    ],
    audits: [
        { id: 1, name: "Q2 Safety & Compliance Audit", department: "Operations", auditor: "Ananya Rao", date: "2026-06-15", issues_count: 2, status: "completed" },
        { id: 2, name: "IT Data Privacy Review", department: "IT", auditor: "Siddharth Sen", date: "2026-07-20", issues_count: 0, status: "planned" }
    ],
    issues: [
        { id: 1, name: "Improper disposal of battery packs in Warehouse", severity: "high", owner: "Yogesh Modi", due_date: "2026-07-10", status: "open" },
        { id: 2, name: "Fire extinguisher inspection tag expired", severity: "medium", owner: "Ananya Rao", due_date: "2026-07-25", status: "in_progress" },
        { id: 3, name: "Weak password policy compliance issue", severity: "medium", owner: "Siddharth Sen", due_date: "2026-08-01", status: "open" }
    ],
    challenges: [
        { id: 1, title: "No-AC Friday", category: "Energy Saving", xp: 80, difficulty: "medium", deadline: "2026-08-31", evidence_required: true, status: "active", progress: 0, user_participation: "none" },
        { id: 2, title: "Commute via Cycle or Walk", category: "Carbon Reduction", xp: 120, difficulty: "hard", deadline: "2026-07-15", evidence_required: true, status: "active", progress: 75, user_participation: "approved" },
        { id: 3, title: "Switch to Dark Mode Challenge", category: "Energy Saving", xp: 30, difficulty: "easy", deadline: "2026-07-20", evidence_required: false, status: "active", progress: 0, user_participation: "none" }
    ],
    rewards: [
        { id: 1, name: "Reusable Eco Bottle", description: "Stainless steel water bottle.", points: 100, stock: 48, icon: "🧴" },
        { id: 2, name: "Extra Day Off", description: "Redeem for one extra day of paid leave.", points: 1000, stock: 10, icon: "🌴" },
        { id: 3, name: "Organic Cotton Hoodie", description: "Soft Eco-friendly corporate hoodie.", points: 300, stock: 15, icon: "🧥" }
    ],
    badges: [
        { id: 1, name: "Green Starter", description: "Earned 50 XP in gamification.", type: "xp_threshold", val: 50, icon: "🌱" },
        { id: 2, name: "Sustainability Champion", description: "Earned 500 XP in gamification.", type: "xp_threshold", val: 500, icon: "🏆" },
        { id: 3, name: "CSR Hero", description: "Completed 5 CSR activities.", type: "csr_completed", val: 5, icon: "🤝" }
    ]
};

// State Container
let state = {};

// Load State from LocalStorage or Fallback
function loadState() {
    const saved = localStorage.getItem('ecosphere_state');
    if (saved) {
        try {
            state = JSON.parse(saved);
        } catch (e) {
            state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        }
    } else {
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
}

// Save State to LocalStorage
function saveState() {
    localStorage.setItem('ecosphere_state', JSON.stringify(state));
}

// 2. MAIN COMPUTATION LOGIC
function computeScores() {
    // 2.1 Environmental Score
    // Formula: normalizes confirmed carbon transactions emissions (Lower emissions -> higher environmental score)
    const confirmedEmissions = state.transactions
        .filter(t => t.state === 'confirmed')
        .reduce((sum, t) => sum + t.emission, 0);
    // Simple normalization: starting from 100, subtract emissions scaled down
    const envScore = Math.max(0.0, Math.min(100.0, 100.0 - (confirmedEmissions / 25.0)));
    
    // 2.2 Social Score
    // Formula: based on approved employee participations in CSR
    const approvedCSRCount = state.participations
        .filter(p => p.status === 'approved')
        .length;
    const socialScore = Math.min(100.0, approvedCSRCount * 25.0); // 4 approvals = 100

    // 2.3 Governance Score
    // Formula: based on number of open compliance issues (each open issue deducts 15 points)
    const today = new Date();
    const openIssues = state.issues.filter(issue => {
        const isOverdue = new Date(issue.due_date) < today && (issue.status === 'open' || issue.status === 'in_progress');
        return (issue.status === 'open' || issue.status === 'in_progress');
    }).length;
    const govScore = Math.max(0.0, 100.0 - (openIssues * 15.0));

    // 2.4 Overall Weighted ESG Score
    const envW = state.settings.weight_environmental;
    const socW = state.settings.weight_social;
    const govW = state.settings.weight_governance;
    const totalW = envW + socW + govW || 1.0;
    
    const overallScore = Math.round(((envScore * envW) + (socialScore * socW) + (govScore * govW)) / totalW);

    return {
        environmental: Math.round(envScore),
        social: Math.round(socialScore),
        governance: Math.round(govScore),
        overall: overallScore
    };
}

// Update UI Gauges
function updateGauges() {
    const scores = computeScores();
    
    // UI Values
    document.getElementById('gauge-overall-val').innerText = scores.overall;
    document.getElementById('gauge-env-val').innerText = scores.environmental;
    document.getElementById('gauge-social-val').innerText = scores.social;
    document.getElementById('gauge-gov-val').innerText = scores.governance;

    // SVG Gauges Offset logic
    // circumference = 2 * PI * r = 2 * 3.14159 * 60 = 376.99
    const circumference = 377;
    setGaugeOffset('gauge-overall-fill', scores.overall, circumference);
    setGaugeOffset('gauge-env-fill', scores.environmental, circumference);
    setGaugeOffset('gauge-social-fill', scores.social, circumference);
    setGaugeOffset('gauge-gov-fill', scores.governance, circumference);
}

function setGaugeOffset(elementId, score, circumference) {
    const element = document.getElementById(elementId);
    if (element) {
        const offset = circumference - (score / 100) * circumference;
        element.style.strokeDasharray = `${circumference} ${circumference}`;
        element.style.strokeDashoffset = offset;
    }
}

// 3. TAB NAVIGATION
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            
            // Switch navigation active state
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // Switch page visibility
            const pages = document.querySelectorAll('.tab-page');
            pages.forEach(p => p.classList.remove('active'));
            document.getElementById(`page-${targetTab}`).classList.add('active');

            // Update page header title
            const headerTitle = targetTab.charAt(0).toUpperCase() + targetTab.slice(1);
            document.getElementById('page-header-title').innerText = headerTitle === 'Dashboard' ? 'ESG Overview' : `${headerTitle} Management`;
            
            // Render specific components for that tab
            renderTabContent(targetTab);
        });
    });
}

function renderTabContent(tabName) {
    if (tabName === 'dashboard') {
        renderDashboardCharts();
    } else if (tabName === 'environmental') {
        renderEnvironmentalTab();
    } else if (tabName === 'social') {
        renderSocialTab();
    } else if (tabName === 'governance') {
        renderGovernanceTab();
    } else if (tabName === 'gamification') {
        renderGamificationTab();
    }
}

// 4. TOAST NOTIFICATIONS
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconClass = 'fa-check-circle';
    if (type === 'danger') iconClass = 'fa-exclamation-circle';
    else if (type === 'warning') iconClass = 'fa-exclamation-triangle';
    else if (type === 'info') iconClass = 'fa-info-circle';

    toast.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    
    // trigger animation
    setTimeout(() => toast.classList.add('active'), 50);
    
    // remove toast
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// 5. DASHBOARD CHARTS RENDERING
function renderDashboardCharts() {
    // 5.1 Department Scores Chart representation
    // Let's compute department scores
    const depts = ["Operations", "IT", "HR"];
    const emissionsByDept = { Operations: 0, IT: 0, HR: 0 };
    state.transactions.filter(t => t.state === 'confirmed').forEach(t => {
        const deptKey = t.department_id === 'dept_operations' ? 'Operations' : (t.department_id === 'dept_it' ? 'IT' : 'HR');
        emissionsByDept[deptKey] += t.emission;
    });

    const chartDepts = document.getElementById('department-scores-chart');
    chartDepts.innerHTML = depts.map(dept => {
        // Higher emissions -> lower bar height/score representing efficiency
        const emissions = emissionsByDept[dept];
        const height = Math.max(10, Math.min(100, Math.round(100 - (emissions / 15))));
        const color = dept === 'Operations' ? 'var(--accent-green)' : (dept === 'IT' ? 'var(--accent-blue)' : 'var(--accent-purple)');
        return `
            <div class="bar-wrapper">
                <div class="bar-column" style="height: ${height}%; background-color: ${color};" title="Efficiency Score: ${height}%"></div>
                <div class="bar-label">${dept}</div>
            </div>
        `;
    }).join('');

    // 5.2 Source breakdown chart
    const sources = { Fleet: 0, Expense: 0, Purchase: 0, Manual: 0 };
    state.transactions.filter(t => t.state === 'confirmed').forEach(t => {
        const srcKey = t.source_type.charAt(0).toUpperCase() + t.source_type.slice(1);
        if (sources[srcKey] !== undefined) {
            sources[srcKey] += t.emission;
        } else {
            sources.Manual += t.emission;
        }
    });

    const chartSources = document.getElementById('emissions-sources-chart');
    const maxVal = Math.max(...Object.values(sources), 1);
    chartSources.innerHTML = Object.keys(sources).map(src => {
        const value = sources[src];
        const percent = Math.max(10, Math.round((value / maxVal) * 100));
        return `
            <div class="bar-wrapper">
                <div style="font-size:11px; font-weight:700; color:var(--text-primary);">${value}</div>
                <div class="bar-column" style="height: ${percent}%; background: var(--env-grad);" title="${value} kg CO2e"></div>
                <div class="bar-label">${src}</div>
            </div>
        `;
    }).join('');
}

// 6. ENVIRONMENTAL MODULE
function renderEnvironmentalTab() {
    // 6.1 Populate Factor Select Dropdown
    const selectFactor = document.getElementById('tx-factor');
    selectFactor.innerHTML = state.emissionFactors.map(ef => `
        <option value="${ef.id}">${ef.name}</option>
    `).join('');

    // 6.2 Render Goals
    const today = new Date();
    // Compute current values for goals dynamically
    state.goals.forEach(goal => {
        const transactionsInGoal = state.transactions.filter(t => {
            const tDate = new Date(t.date);
            const inDateRange = tDate >= new Date(goal.start_date) && tDate <= new Date(goal.end_date);
            const matchesDept = !goal.department_id || t.department_id === goal.department_id;
            return t.state === 'confirmed' && inDateRange && matchesDept;
        });
        goal.current_value = Math.round(transactionsInGoal.reduce((sum, t) => sum + t.emission, 0));
        goal.progress = Math.min(100, Math.round((goal.current_value / goal.target_value) * 100));
        
        // Auto-update status if deadline passed
        if (goal.status === 'active' && today > new Date(goal.end_date)) {
            goal.status = goal.current_value <= goal.target_value ? 'achieved' : 'missed';
        }
    });

    const goalsBody = document.getElementById('table-goals-body');
    goalsBody.innerHTML = state.goals.map(goal => {
        const deptName = goal.department_id === 'dept_operations' ? 'Operations' : (goal.department_id === 'dept_it' ? 'IT' : (goal.department_id === 'dept_hr' ? 'HR' : 'Global'));
        
        let statusBadge = '';
        if (goal.status === 'active') statusBadge = `<span class="badge badge-info">Active</span>`;
        else if (goal.status === 'achieved') statusBadge = `<span class="badge badge-success">Achieved</span>`;
        else if (goal.status === 'missed') statusBadge = `<span class="badge badge-danger">Missed</span>`;
        else statusBadge = `<span class="badge badge-warning">Draft</span>`;

        return `
            <tr>
                <td style="font-weight:600;">${goal.name}</td>
                <td>${deptName}</td>
                <td>${goal.target_value} kg</td>
                <td>${goal.current_value} kg</td>
                <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <progress value="${goal.progress}" max="100" style="width:70px; accent-color:var(--accent-green);"></progress>
                        <span>${goal.progress}%</span>
                    </div>
                </td>
                <td>${statusBadge}</td>
            </tr>
        `;
    }).join('');

    // 6.3 Render Transactions
    const txBody = document.getElementById('table-transactions-body');
    txBody.innerHTML = state.transactions.map(t => {
        const deptName = t.department_id === 'dept_operations' ? 'Operations' : (t.department_id === 'dept_it' ? 'IT' : 'HR');
        const stateBadge = t.state === 'confirmed' 
            ? `<span class="badge badge-success">Confirmed</span>` 
            : `<span class="badge badge-warning">Draft</span>`;
        
        const confirmBtn = t.state === 'draft'
            ? `<button class="btn-action-small btn-success btn-confirm-tx" data-id="${t.id}">Confirm</button>`
            : '';

        return `
            <tr>
                <td style="font-family:monospace; font-weight:600;">${t.id}</td>
                <td>${t.date}</td>
                <td>${deptName}</td>
                <td style="text-transform:capitalize;">${t.source_type}</td>
                <td>${t.factor_name}</td>
                <td>${t.qty}</td>
                <td style="font-weight:700; color:var(--accent-green);">${t.emission}</td>
                <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                        ${stateBadge} ${confirmBtn}
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    // Attach Transaction Confirm Listeners
    document.querySelectorAll('.btn-confirm-tx').forEach(btn => {
        btn.addEventListener('click', () => {
            const txId = btn.getAttribute('data-id');
            const tx = state.transactions.find(t => t.id === txId);
            if (tx) {
                tx.state = 'confirmed';
                saveState();
                updateGauges();
                renderEnvironmentalTab();
                showToast(`Carbon Transaction ${txId} confirmed successfully!`, 'success');
            }
        });
    });
}

// Handle Add Transaction Submit
document.getElementById('form-carbon-transaction').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const dept = document.getElementById('tx-dept').value;
    const source = document.getElementById('tx-source').value;
    const factorId = document.getElementById('tx-factor').value;
    const qty = parseFloat(document.getElementById('tx-quantity').value);
    
    const factorObj = state.emissionFactors.find(ef => ef.id === factorId);
    const emission = Math.round(qty * factorObj.factor);

    // Sequence Generator CT/2026/XXXX
    const num = String(state.transactions.length + 1).padStart(4, '0');
    const newId = `CT/2026/${num}`;
    
    // If auto_emission_calc is enabled, set status straight to confirmed, else draft
    const isAuto = state.settings.auto_emission_calc;
    const newState = isAuto ? 'confirmed' : 'draft';

    const newTx = {
        id: newId,
        date: new Date().toISOString().split('T')[0],
        department_id: dept,
        source_type: source,
        factor_name: factorObj.name.split(' (')[0],
        qty: qty,
        emission: emission,
        state: newState
    };

    state.transactions.unshift(newTx);
    saveState();
    updateGauges();
    renderEnvironmentalTab();
    showToast(`Carbon Transaction ${newId} logged as ${newState}!`, 'success');

    // Reset Form
    document.getElementById('tx-quantity').value = "1.0";
});

// 7. SOCIAL CSR MODULE
function renderSocialTab() {
    // 7.1 Render Active campaigns
    const campaignsList = document.getElementById('csr-activities-list');
    campaignsList.innerHTML = state.activities.map(act => {
        const stateBadge = act.status === 'completed'
            ? `<span class="badge badge-success">Completed</span>`
            : (act.status === 'ongoing' ? `<span class="badge badge-info">Ongoing</span>` : `<span class="badge badge-warning">Planned</span>`);
        
        return `
            <div class="card" style="padding:16px;">
                <div class="flex-between" style="margin-bottom:8px;">
                    <span style="font-weight:700; font-family:var(--font-heading);">${act.name}</span>
                    ${stateBadge}
                </div>
                <div style="font-size:12px; color:var(--text-secondary); margin-bottom:8px;">Category: ${act.category}</div>
                <div class="flex-between">
                    <span style="font-size:11px; color:var(--text-muted);">Organized by ESG Office</span>
                    <span style="font-weight:700; color:var(--accent-amber); font-size:12px;">+${act.points} XP/Points</span>
                </div>
            </div>
        `;
    }).join('');

    // 7.2 Render Employee approvals queue
    const partBody = document.getElementById('table-participation-body');
    partBody.innerHTML = state.participations.map(p => {
        const statusBadge = p.status === 'approved'
            ? `<span class="badge badge-success">Approved</span>`
            : (p.status === 'rejected' ? `<span class="badge badge-danger">Rejected</span>` : `<span class="badge badge-warning">Pending</span>`);
        
        let actionButtons = '';
        if (p.status === 'pending') {
            actionButtons = `
                <div style="display:flex; gap:8px;">
                    <button class="btn-action-small btn-success btn-approve-csr" data-id="${p.id}"><i class="fa-solid fa-check"></i></button>
                    <button class="btn-action-small btn-danger btn-reject-csr" data-id="${p.id}"><i class="fa-solid fa-xmark"></i></button>
                </div>
            `;
        }

        return `
            <tr>
                <td style="font-weight:600;">${p.employee_name}</td>
                <td>${p.activity_name}</td>
                <td>${p.date}</td>
                <td>
                    <span style="font-family:monospace; color:var(--accent-blue); cursor:pointer;" onclick="alert('Viewing Proof File: ${p.proof}')">
                        <i class="fa-solid fa-file-image"></i> ${p.proof}
                    </span>
                </td>
                <td style="font-weight:700; color:var(--accent-amber);">+${p.points}</td>
                <td>${statusBadge}</td>
                <td>${actionButtons}</td>
            </tr>
        `;
    }).join('');

    // CSR Approval Click Handlers
    document.querySelectorAll('.btn-approve-csr').forEach(btn => {
        btn.addEventListener('click', () => {
            const partId = parseInt(btn.getAttribute('data-id'));
            approveCSR(partId);
        });
    });

    document.querySelectorAll('.btn-reject-csr').forEach(btn => {
        btn.addEventListener('click', () => {
            const partId = parseInt(btn.getAttribute('data-id'));
            rejectCSR(partId);
        });
    });
}

function approveCSR(id) {
    const part = state.participations.find(p => p.id === id);
    if (!part || part.status !== 'pending') return;

    // Check evidence required
    const evidenceSetting = state.settings.evidence_required;
    if (evidenceSetting && !part.proof) {
        showToast("Cannot approve: Attached proof document is missing!", "danger");
        return;
    }

    part.status = 'approved';
    part.points_earned = part.points;

    // If current employee is approved, add points/XP
    if (part.employee_name === state.employee.name) {
        state.employee.points += part.points;
        state.employee.xp += part.points;
        document.getElementById('user-points-display').innerText = state.employee.points;
        checkBadgeAward();
    }
    
    // Update matching user in leaderboard
    const leadUser = state.leaderboard.find(u => u.name === part.employee_name);
    if (leadUser) {
        leadUser.xp += part.points;
    }

    saveState();
    updateGauges();
    renderSocialTab();
    showToast(`CSR Participation approved! +${part.points} points awarded.`, 'success');
}

function rejectCSR(id) {
    const part = state.participations.find(p => p.id === id);
    if (!part || part.status !== 'pending') return;

    part.status = 'rejected';
    part.points_earned = 0;

    saveState();
    updateGauges();
    renderSocialTab();
    showToast(`CSR Participation rejected!`, 'info');
}

// 8. GOVERNANCE MODULE
function renderGovernanceTab() {
    // 8.1 Render policies list
    const policiesList = document.getElementById('policies-list');
    policiesList.innerHTML = state.policies.map(p => {
        const ackBtn = !p.acknowledged
            ? `<button class="btn-action-small btn-success btn-ack-policy" data-id="${p.id}" style="margin-top:10px;">Acknowledge Policy</button>`
            : `<span class="badge badge-success" style="margin-top:10px;"><i class="fa-solid fa-circle-check"></i> Acknowledged</span>`;

        return `
            <div class="card" style="padding:16px;">
                <div class="flex-between" style="margin-bottom:6px;">
                    <span style="font-weight:700; font-family:var(--font-heading);">${p.name}</span>
                    <span class="badge badge-info">${p.category}</span>
                </div>
                <div style="font-size:12px; color:var(--text-secondary); margin-bottom:6px;">Effective: ${p.effective_date}</div>
                <div style="font-size:11px; color:var(--text-muted); margin-bottom:6px;">Acknowledgement Rate: ${p.ack_rate}%</div>
                <div class="flex-between">
                    <progress value="${p.ack_rate}" max="100" style="width:120px; accent-color:var(--accent-purple);"></progress>
                    ${ackBtn}
                </div>
            </div>
        `;
    }).join('');

    // Acknowledge Policy click handler
    document.querySelectorAll('.btn-ack-policy').forEach(btn => {
        btn.addEventListener('click', () => {
            const pId = parseInt(btn.getAttribute('data-id'));
            const policy = state.policies.find(p => p.id === pId);
            if (policy) {
                policy.acknowledged = true;
                policy.ack_rate = Math.min(100, policy.ack_rate + 10);
                saveState();
                updateGauges();
                renderGovernanceTab();
                showToast(`Policy '${policy.name}' acknowledged! Code alignment updated.`, 'success');
            }
        });
    });

    // 8.2 Render Audits
    const auditBody = document.getElementById('table-audits-body');
    auditBody.innerHTML = state.audits.map(a => {
        const statusBadge = a.status === 'completed'
            ? `<span class="badge badge-success">Completed</span>`
            : `<span class="badge badge-info">Planned</span>`;

        return `
            <tr>
                <td style="font-weight:600;">${a.name}</td>
                <td>${a.department}</td>
                <td>${a.auditor}</td>
                <td>${a.date}</td>
                <td style="font-weight:700; color:${a.issues_count > 0 ? 'var(--accent-red)' : 'var(--text-secondary)'};">${a.issues_count}</td>
                <td>${statusBadge}</td>
            </tr>
        `;
    }).join('');

    // 8.3 Render Compliance Issues
    const issueBody = document.getElementById('table-issues-body');
    const today = new Date();
    
    // Sort issues by status (open/in_progress first, then resolved)
    const sortedIssues = [...state.issues].sort((a,b) => {
        if (a.status === 'resolved' && b.status !== 'resolved') return 1;
        if (a.status !== 'resolved' && b.status === 'resolved') return -1;
        return 0;
    });

    issueBody.innerHTML = sortedIssues.map(issue => {
        const isOverdue = new Date(issue.due_date) < today && issue.status !== 'resolved';
        
        let severityBadge = '';
        if (issue.severity === 'high' || issue.severity === 'critical') severityBadge = `<span class="badge badge-danger">${issue.severity}</span>`;
        else severityBadge = `<span class="badge badge-warning">${issue.severity}</span>`;

        let statusBadge = '';
        if (issue.status === 'open') statusBadge = `<span class="badge badge-danger">Open</span>`;
        else if (issue.status === 'in_progress') statusBadge = `<span class="badge badge-warning">In Progress</span>`;
        else statusBadge = `<span class="badge badge-success">Resolved</span>`;

        const overdueBadge = isOverdue
            ? `<span class="badge badge-danger" style="animation: pulse 2s infinite;"><i class="fa-solid fa-clock"></i> OVERDUE</span>`
            : `<span class="badge badge-success">On Track</span>`;

        const resolveBtn = issue.status !== 'resolved'
            ? `<button class="btn-action-small btn-success btn-resolve-issue" data-id="${issue.id}">Resolve</button>`
            : '';

        return `
            <tr style="${isOverdue ? 'background: rgba(239, 68, 68, 0.03);' : ''}">
                <td style="font-weight:600;">${issue.name}</td>
                <td>${severityBadge}</td>
                <td>${issue.owner}</td>
                <td>${issue.due_date}</td>
                <td>${overdueBadge}</td>
                <td>${statusBadge}</td>
                <td>${resolveBtn}</td>
            </tr>
        `;
    }).join('');

    // Resolve Issue Handler
    document.querySelectorAll('.btn-resolve-issue').forEach(btn => {
        btn.addEventListener('click', () => {
            const issueId = parseInt(btn.getAttribute('data-id'));
            const issue = state.issues.find(i => i.id === issueId);
            if (issue) {
                issue.status = 'resolved';
                saveState();
                updateGauges();
                renderGovernanceTab();
                showToast(`Compliance issue ${issueId} resolved. ESG Governance score increased!`, 'success');
            }
        });
    });
}

// 9. GAMIFICATION MODULE
function renderGamificationTab() {
    // 9.1 Render Challenges
    const challengeBody = document.getElementById('table-challenges-body');
    challengeBody.innerHTML = state.challenges.map(c => {
        const userStatus = c.user_participation;
        
        let statusBadge = '';
        let actButton = '';
        
        if (userStatus === 'none') {
            statusBadge = `<span class="badge badge-muted">Not Joined</span>`;
            actButton = `<button class="btn-action-small btn-confirm-tx btn-join-challenge" data-id="${c.id}" style="background:var(--primary-grad); color:#fff;">Join</button>`;
        } else if (userStatus === 'pending') {
            statusBadge = `<span class="badge badge-warning">Pending Review</span>`;
            actButton = `<span style="font-size:11px; color:var(--text-muted);"><i class="fa-solid fa-hourglass-start"></i> Waiting Approval</span>`;
        } else if (userStatus === 'approved') {
            statusBadge = `<span class="badge badge-success">Completed</span>`;
            actButton = `<span style="color:var(--accent-green); font-weight:700;"><i class="fa-solid fa-circle-check"></i> Earned +${c.xp} XP</span>`;
        }

        return `
            <tr>
                <td style="font-weight:600;">${c.title}</td>
                <td>${c.category}</td>
                <td style="font-weight:700; color:var(--accent-blue);">+${c.xp} XP</td>
                <td style="text-transform:capitalize;">${c.difficulty}</td>
                <td>${c.deadline}</td>
                <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <progress value="${c.user_participation === 'approved' ? 100 : c.progress}" max="100" style="width:70px; accent-color:var(--accent-blue);"></progress>
                        <span>${c.user_participation === 'approved' ? 100 : c.progress}%</span>
                    </div>
                </td>
                <td>${actButton}</td>
            </tr>
        `;
    }).join('');

    // Join/Submit Challenge handlers
    document.querySelectorAll('.btn-join-challenge').forEach(btn => {
        btn.addEventListener('click', () => {
            const chId = parseInt(btn.getAttribute('data-id'));
            const challenge = state.challenges.find(c => c.id === chId);
            if (challenge) {
                // If evidence is required, pop open upload modal
                if (challenge.evidence_required || state.settings.evidence_required) {
                    openUploadModal('challenge', chId, `Upload Proof for: ${challenge.title}`);
                } else {
                    // Straight approve if no evidence needed
                    challenge.user_participation = 'approved';
                    state.employee.xp += challenge.xp;
                    state.employee.points += challenge.xp;
                    updateLeaderboardUser(challenge.xp);
                    saveState();
                    updateGauges();
                    renderGamificationTab();
                    showToast(`Challenge completed! +${challenge.xp} XP/Points awarded.`, 'success');
                }
            }
        });
    });

    // 9.2 Render Leaderboard
    // Sort leaderboard by XP
    state.leaderboard.sort((a,b) => b.xp - a.xp);
    const leaderboardContainer = document.getElementById('leaderboard-container');
    leaderboardContainer.innerHTML = state.leaderboard.map((u, idx) => {
        const rank = idx + 1;
        const activeClass = u.name === state.employee.name ? 'style="border-color: rgba(79, 70, 229, 0.4); background: rgba(79, 70, 229, 0.05);"' : '';
        return `
            <div class="leaderboard-row" ${activeClass}>
                <div class="rank rank-${rank}">${rank}</div>
                <div class="user-avatar" style="width:32px; height:32px; font-size:12px; margin-right:12px;">${u.avatar}</div>
                <div class="emp-name-dept">
                    <div class="emp-name">${u.name}</div>
                    <div class="emp-dept">${u.dept}</div>
                </div>
                <div class="xp-label">${u.xp} XP</div>
            </div>
        `;
    }).join('');

    // 9.3 Render Badges
    const badgesContainer = document.getElementById('badges-container');
    badgesContainer.innerHTML = state.badges.map(badge => {
        const unlocked = state.employee.badge_ids.includes(badge.id);
        const grayscale = unlocked ? '' : 'style="filter: grayscale(1); opacity: 0.35;"';
        const unlockClass = unlocked ? '' : '<span style="font-size:10px; font-weight:700; color:var(--text-muted);">LOCKED</span>';
        
        return `
            <div class="badge-card" ${grayscale}>
                <div class="badge-icon-wrap" style="${!unlocked ? 'background:rgba(255,255,255,0.05); box-shadow:none;' : ''}">
                    ${badge.icon}
                </div>
                <div class="badge-title">${badge.name}</div>
                <div class="badge-desc">${badge.description}</div>
                ${unlockClass}
            </div>
        `;
    }).join('');

    // 9.4 Render Rewards Catalog
    const rewardsContainer = document.getElementById('rewards-container');
    rewardsContainer.innerHTML = state.rewards.map(reward => {
        const disableBtn = state.employee.points < reward.points || reward.stock <= 0 ? 'disabled' : '';
        return `
            <div class="reward-card">
                <div class="reward-img-holder">${reward.icon}</div>
                <div class="reward-details">
                    <div>
                        <div class="reward-name">${reward.name}</div>
                        <div class="reward-desc">${reward.description}</div>
                    </div>
                    <div class="reward-cost-action">
                        <div>
                            <span class="reward-cost">${reward.points} Pts</span>
                            <span class="reward-stock" style="margin-left:8px;">(${reward.stock} left)</span>
                        </div>
                        <button class="btn-redeem" ${disableBtn} data-id="${reward.id}">Redeem</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Reward Redemption Click Handler
    document.querySelectorAll('.btn-redeem').forEach(btn => {
        btn.addEventListener('click', () => {
            const rewardId = parseInt(btn.getAttribute('data-id'));
            redeemReward(rewardId);
        });
    });
}

function redeemReward(id) {
    const reward = state.rewards.find(r => r.id === id);
    if (!reward || reward.stock <= 0) return;
    
    if (state.employee.points < reward.points) {
        showToast("Insufficient redeemable points!", "danger");
        return;
    }

    // Deduct points & stock
    state.employee.points -= reward.points;
    reward.stock -= 1;
    
    // Update displays
    document.getElementById('user-points-display').innerText = state.employee.points;
    
    saveState();
    renderGamificationTab();
    showToast(`Redeemed ${reward.name}! Order generated successfully.`, 'success');
}

function updateLeaderboardUser(xpAdded) {
    state.employee.xp += xpAdded;
    const me = state.leaderboard.find(u => u.name === state.employee.name);
    if (me) me.xp = state.employee.xp;
}

// 10. BADGE AUTO-AWARD CHECKS
function checkBadgeAward() {
    if (!state.settings.badge_auto_award) return;
    
    // Count CSR Approved
    const userCSRApproved = state.participations.filter(
        p => p.employee_name === state.employee.name && p.status === 'approved'
    ).length;

    state.badges.forEach(badge => {
        // Skip if already unlocked
        if (state.employee.badge_ids.includes(badge.id)) return;

        let unlock = false;
        if (badge.type === 'xp_threshold' && state.employee.xp >= badge.val) {
            unlock = true;
        } else if (badge.type === 'csr_completed' && userCSRApproved >= badge.val) {
            unlock = true;
        }

        if (unlock) {
            state.employee.badge_ids.push(badge.id);
            showToast(`🎖️ Badge unlocked: "${badge.name}"!`, 'info');
        }
    });
}

// 11. UPLOAD PROOF MODAL SIMULATION
function openUploadModal(type, targetId, titleText) {
    const modal = document.getElementById('upload-modal');
    document.getElementById('upload-modal-title').innerText = titleText;
    document.getElementById('upload-target-type').value = type;
    document.getElementById('upload-target-id').value = targetId;
    modal.classList.add('active');
}

document.getElementById('upload-modal-close').addEventListener('click', closeUploadModal);
document.getElementById('upload-cancel').addEventListener('click', closeUploadModal);

function closeUploadModal() {
    document.getElementById('upload-modal').classList.remove('active');
    document.getElementById('form-upload-proof').reset();
}

document.getElementById('form-upload-proof').addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.getElementById('upload-target-type').value;
    const targetId = parseInt(document.getElementById('upload-target-id').value);
    const fileFakePath = document.getElementById('proof-file').value.split('\\').pop();

    if (type === 'challenge') {
        const challenge = state.challenges.find(c => c.id === targetId);
        if (challenge) {
            challenge.user_participation = 'pending';
            challenge.progress = 100;
            
            // Push a participation request to approvals queue representing current employee
            state.participations.unshift({
                id: state.participations.length + 1,
                employee_name: state.employee.name,
                activity_name: `Challenge: ${challenge.title}`,
                date: new Date().toISOString().split('T')[0],
                proof: fileFakePath,
                points: challenge.xp,
                status: 'pending'
            });
            
            saveState();
            closeUploadModal();
            renderGamificationTab();
            showToast(`Proof submitted. Awaiting ESG Manager review!`, 'info');
        }
    }
});

// 12. CONFIGURATION & WEIGHTS SETTINGS MODAL
const settingsModal = document.getElementById('settings-modal');
const btnOpenSettings = document.getElementById('btn-open-settings');
const settingsClose = document.getElementById('settings-modal-close');
const settingsCancel = document.getElementById('settings-cancel');
const settingsSave = document.getElementById('settings-save');

btnOpenSettings.addEventListener('click', () => {
    // Populate settings ranges and boxes
    document.getElementById('weight-env').value = state.settings.weight_environmental;
    document.getElementById('weight-env-val').innerText = `${state.settings.weight_environmental}%`;
    document.getElementById('weight-social').value = state.settings.weight_social;
    document.getElementById('weight-social-val').innerText = `${state.settings.weight_social}%`;
    document.getElementById('weight-gov').value = state.settings.weight_governance;
    document.getElementById('weight-gov-val').innerText = `${state.settings.weight_governance}%`;

    document.getElementById('toggle-evidence').checked = state.settings.evidence_required;
    document.getElementById('toggle-badges').checked = state.settings.badge_auto_award;
    document.getElementById('toggle-auto-calc').checked = state.settings.auto_emission_calc;

    document.getElementById('weight-error-msg').style.display = 'none';
    settingsModal.classList.add('active');
});

function closeSettingsModal() {
    settingsModal.classList.remove('active');
}
settingsClose.addEventListener('click', closeSettingsModal);
settingsCancel.addEventListener('click', closeSettingsModal);

// Dynamic slider displays
document.getElementById('weight-env').addEventListener('input', (e) => {
    document.getElementById('weight-env-val').innerText = `${e.target.value}%`;
});
document.getElementById('weight-social').addEventListener('input', (e) => {
    document.getElementById('weight-social-val').innerText = `${e.target.value}%`;
});
document.getElementById('weight-gov').addEventListener('input', (e) => {
    document.getElementById('weight-gov-val').innerText = `${e.target.value}%`;
});

settingsSave.addEventListener('click', () => {
    const envW = parseInt(document.getElementById('weight-env').value);
    const socW = parseInt(document.getElementById('weight-social').value);
    const govW = parseInt(document.getElementById('weight-gov').value);

    if (envW + socW + govW !== 100) {
        document.getElementById('weight-error-msg').style.display = 'block';
        return;
    }

    state.settings.weight_environmental = envW;
    state.settings.weight_social = socW;
    state.settings.weight_governance = govW;

    state.settings.evidence_required = document.getElementById('toggle-evidence').checked;
    state.settings.badge_auto_award = document.getElementById('toggle-badges').checked;
    state.settings.auto_emission_calc = document.getElementById('toggle-auto-calc').checked;

    saveState();
    updateGauges();
    closeSettingsModal();
    showToast("System configurations saved & score weights recalculated!", "success");
    
    // Refresh active tab layout if on dashboard
    const activeNav = document.querySelector('.nav-item.active');
    if (activeNav) {
        renderTabContent(activeNav.getAttribute('data-tab'));
    }
});

// 13. APP RUNTIME BOOTSTRAP
function init() {
    loadState();
    
    // Set user header details
    document.getElementById('user-points-display').innerText = state.employee.points;
    document.getElementById('current-user-avatar').innerText = state.employee.name.split(' ').map(n => n[0]).join('');
    document.getElementById('current-user-name').innerText = state.employee.name;

    initNavigation();
    updateGauges();
    
    // Load initial dashboard charts
    renderDashboardCharts();
}

window.onload = init;
