function formatarInput(input) {
    let valor = input.value.replace(/\D/g, "")
    input.value = Number(valor).toLocaleString("pt-BR")
}

document.querySelector(".input-min").addEventListener("input", function() {
    formatarInput(this)
})

document.querySelector(".input-max").addEventListener("input", function() {
    formatarInput(this)
})

function generateNumber(){
    
    const min = Math.ceil(document.querySelector(".input-min").value.replace(/\./g, "").replace(",", "."));
    const max = Math.floor(document.querySelector(".input-max").value.replace(/\./g, "").replace(",", "."));

    const result = Math.floor(Math.random() * (max - min + 1)) + min;

    document.querySelector(".input-result").value = result.toLocaleString("pt-BR");
}

// ─── Dados animados ───────────────────────────────────────────────────────────
const pipPositions = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
};

function renderDie(el, value) {
    el.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const pip = document.createElement("div");
        pip.className = "pip" + (pipPositions[value].includes(i) ? "" : " pip-hidden");
        el.appendChild(pip);
    }
}

function rollDice() {
    const dice = document.querySelectorAll(".die");
    const DURATION = 650;
    const INTERVAL = 60;
    let elapsed = 0;

    dice.forEach(d => {
        d.classList.remove("die-rolling");
        void d.offsetWidth;
        d.classList.add("die-rolling");
    });

    const ticker = setInterval(() => {
        elapsed += INTERVAL;
        dice.forEach(d => renderDie(d, Math.floor(Math.random() * 6) + 1));
        if (elapsed >= DURATION) {
            clearInterval(ticker);
            dice.forEach(d => {
                d.classList.remove("die-rolling");
                renderDie(d, Math.floor(Math.random() * 6) + 1);
            });
        }
    }, INTERVAL);
}

document.querySelector("button").addEventListener("click", rollDice);

document.querySelectorAll(".die").forEach(d => renderDie(d, Math.floor(Math.random() * 6) + 1));
