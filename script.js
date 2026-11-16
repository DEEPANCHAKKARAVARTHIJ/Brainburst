const games = [
  {id:"sudoku",title:"Mind Sudoku",category:"numbers",kind:"NUMBER LOGIC",short:"A familiar 9×9 challenge with guided hints, daily play, and room to focus.",description:"Classic Sudoku with six difficulty levels, pencil notes, daily challenges, and step-by-step logical hints. The local project includes original puzzle pools and save/resume.",details:["9×9 grids","Daily challenges","Logical hints"],image:"./assets/mind-sudoku.png",alt:"Mind Sudoku puzzle board with notes and hints",art:"art-sudoku",portrait:true},
  {id:"huegate",title:"HueGate",category:"color",kind:"COLOR & SPACE",short:"Slide bright shapes toward their exits in a playful block escape prototype.",description:"A colorful block escape prototype. Move shaped pieces through the board, plan around collisions, and find each color's way out.",details:["Block escape","Color puzzles","Prototype"],image:"./assets/huegate.png",alt:"HueGate colorful block escape game artwork",art:"art-huegate"},
  {id:"sumloria",title:"Sumloria",category:"numbers",kind:"NUMBER LOGIC",short:"Circle the right numbers until every row, column, and region adds up.",description:"A number-selection puzzle built around intersecting sums. Circle and erase numbers until row, column, and colored region targets all agree.",details:["Number sums","Daily challenge","Offline puzzles"],image:"./assets/sumloria.png",alt:"Sumloria number puzzle app icon",art:"art-sumloria",icon:true},
  {id:"colorsort",title:"Color Sort Puzzle",category:"color",kind:"COLOR & PATTERNS",short:"Pour, organize, and clear vivid tubes one satisfying layer at a time.",description:"A color-sorting puzzle with layered tubes, undo and restart, level progression, and additional puzzle modes.",details:["Sorting","Level progression","Colorful worlds"],image:"./assets/color-sort.png",alt:"Color Sort Puzzle app icon",art:"art-colorsort",icon:true},
  {id:"tenmatch",title:"Ten Match Puzzle",category:"numbers",kind:"NUMBER MATCHING",short:"Pair equal digits or numbers that make ten to clear the board.",description:"Match equal numbers or pairs that add to ten. Clear rows, use hints, and revisit a date on the daily calendar.",details:["Pair matching","Daily calendar","Offline progress"],image:"./assets/ten-match.png",alt:"Ten Match number-pair puzzle artwork",art:"art-tenmatch"},
  {id:"drop",title:"Drop Number 2048",category:"numbers",kind:"ARCADE NUMBERS",short:"Aim, drop, and merge matching blocks into bigger numbers and new combos.",description:"An endless five-lane number puzzle. Aim a block, merge neighboring values, build combos, and climb toward the next milestone.",details:["Shoot & merge","Combo chains","Endless play"],image:"./assets/drop-number.png",alt:"Drop Number 2048 five-lane merging puzzle board",art:"art-drop",portrait:true},
  {id:"colorpath",title:"ColorPath",category:"color",kind:"COLOR CONNECTIONS",short:"Draw routes between matching colors without letting the paths cross.",description:"Connect matching colored endpoints across a grid. Paths cannot overlap; the project explores daily puzzles and different board sizes.",details:["Connect colors","Grid puzzles","In development"],symbol:"●",art:"pattern-path"},
  {id:"cluecraft",title:"ClueCraft",category:"words",kind:"DEDUCTION",short:"Connect the clues in an offline logic mystery with story chapters.",description:"An offline logic-grid mystery project with themed chapters, deduction marks, daily puzzles, and hints. The project is a release candidate, with launch work still ahead.",details:["Logic grids","Story chapters","Daily challenge"],symbol:"?",art:"pattern-clues"},
  {id:"crossword",title:"Crossword Rival",category:"words",kind:"WORDS & STRATEGY",short:"Place letters, finish words, and take turns against a local bot.",description:"A crossword-versus-bot proof of concept. Place letters from a rack, complete word squares, and take turns against a local opponent.",details:["Word squares","Local bot","Proof of concept"],symbol:"W",art:"pattern-words"}
];
const featured = {id:"arrow",title:"Arrow Way",category:"words",kind:"LOGIC & DIRECTION",description:"Trace a board of directional arrows and reveal silhouette shapes. The local Android project includes generated puzzles, daily challenges, hints, undo, and level progression.",details:["Silhouette puzzles","Daily challenges","Hints & undo"],image:"./assets/arrow-way.jpg",alt:"Arrow Way gameplay showing a balloon made of directional arrows",portrait:true};
const grid = document.querySelector("#game-grid");
grid.innerHTML = games.map((game,index) => {
  const pattern = game.id === "colorpath" ? "<i></i><i></i><i></i><i></i>"
    : game.id === "cluecraft" ? "<i>?</i><i>✓</i><i>×</i><i>!</i>"
    : "<i>W</i><i>O</i><i>R</i><i>D</i>";
  const image = game.image
    ? '<img src="' + game.image + '" alt="' + game.alt + '" loading="lazy">'
    : pattern;
  return '<article class="game-card" data-category="' + game.category + '"><button type="button" data-game="' + game.id + '" aria-label="Explore ' + game.title + '"><span class="card-art ' + game.art + (game.icon ? ' art-icon' : '') + '">' + image + '</span><span class="card-meta"><span>' + game.kind + '</span><span>' + String(index+1).padStart(2,"0") + ' / 09</span></span><span class="card-title">' + game.title + '<span aria-hidden="true">↗</span></span><span class="card-desc">' + game.short + '</span></button></article>';
}).join("");
const filters = [...document.querySelectorAll(".filter")];
filters.forEach(button => button.addEventListener("click", () => {
  const selected = button.dataset.filter;
  filters.forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll(".game-card").forEach(item => {
    item.hidden = selected !== "all" && item.dataset.category !== selected;
  });
}));
const dialog = document.querySelector("#game-dialog");
document.querySelectorAll("[data-game]").forEach(button => button.addEventListener("click", () => {
  const game = [featured,...games].find(item => item.id === button.dataset.game);
  if (!game) return;
  document.querySelector("#dialog-kicker").textContent = game.kind;
  document.querySelector("#dialog-title").textContent = game.title;
  document.querySelector("#dialog-description").textContent = game.description;
  document.querySelector("#dialog-details").replaceChildren(...game.details.map(label => {
    const element = document.createElement("span");
    element.textContent = label;
    return element;
  }));
  const art = document.querySelector("#dialog-art");
  art.replaceChildren();
  art.style.background = game.category === "color" ? "#d9f1f0" : game.category === "words" ? "#f6edcf" : "#e8e3f2";
  if (game.image) {
    const img = document.createElement("img");
    img.src = game.image;
    img.alt = game.alt;
    if (game.portrait) img.className = "portrait";
    art.append(img);
  } else {
    const symbol = document.createElement("span");
    symbol.className = "dialog-symbol";
    symbol.textContent = game.symbol;
    art.append(symbol);
  }
  dialog.showModal();
}));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  mobileNav.hidden = isOpen;
});
mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
}));
document.querySelector("#year").textContent = new Date().getFullYear();
