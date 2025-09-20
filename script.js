// HTML要素の取得
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const questText = document.getElementById('quest-text');
const choiceButtonsContainer = document.getElementById('choice-buttons');
const background = document.getElementById('background');
const characterSpriteContainer = document.getElementById('character-sprite-container'); // 追加
const resultTitle = document.getElementById('result-title');
const chairImage = document.getElementById('chair-image');
const chairName = document.getElementById('chair-name');
const chairDescription = document.getElementById('chair-description');
const purchaseLink = document.getElementById('purchase-link');
const bgm = document.getElementById('bgm');
const sfxSelect = document.getElementById('sfx-select'); // 効果音要素を追加
const heroSceneSprite = document.getElementById('hero-sprite');
const chairSceneSprite = document.getElementById('chair-sprite');
const arContainer = document.getElementById('ar-container');
const chairArViewer = document.getElementById('chair-ar-viewer');
const arDescription = document.getElementById('ar-description');
const startCharacter = document.querySelector('.sprite.start-character');

// 椅子データ
const chairs = {
    'gaming': {
        name: 'ほしぞらゲーミングチェア',
        description: 'ライトのきらめきで島の夜時間もワクワク。姿勢を支えながら配信やゲームを楽しめるよ。',
        image: 'https://m.media-amazon.com/images/I/71M+03gKpfL._AC_SX679_.jpg',
        purchase: 'https://www.amazon.co.jp/s?k=%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0%E3%83%81%E3%82%A7%E3%82%A2',
        ar: {
            src: 'https://modelviewer.dev/shared-assets/models/Chair.glb',
            iosSrc: 'https://modelviewer.dev/shared-assets/models/Chair.usdz',
            alt: 'ゲーミングチェアの3Dモデル',
            hint: 'カラフルなライトで島の夜を彩ってみよう。'
        }
    },
    'ergonomic': {
        name: 'しまカフェ・エルゴチェア',
        description: '背中にフィットして姿勢を整えてくれる頼れる存在。長時間の作業でも島時間が心地よく過ごせるよ。',
        image: 'https://m.media-amazon.com/images/I/81qQcMFBkDL._AC_SY879_.jpg',
        purchase: 'https://www.amazon.co.jp/s?k=%E3%82%A8%E3%83%AB%E3%82%B4%E3%83%8E%E3%83%9F%E3%82%AF%E3%82%B9%E3%83%81%E3%82%A7%E3%82%A2',
        ar: {
            src: 'https://modelviewer.dev/shared-assets/models/Chair.glb',
            iosSrc: 'https://modelviewer.dev/shared-assets/models/Chair.usdz',
            alt: 'エルゴノミクスチェアの3Dモデル',
            hint: 'デスク周りに合わせて角度をチェックしてみてね。'
        }
    },
    'lounge': {
        name: 'おひるねアームチェア',
        description: 'ふかふかクッションで、読みかけの本も島の風もたっぷり楽しめるくつろぎチェア。',
        image: 'https://m.media-amazon.com/images/I/71bB+3PYmpL._AC_SY300_SX300_.jpg',
        purchase: 'https://www.amazon.co.jp/s?k=%E3%82%A2%E3%83%BC%E3%83%A0%E3%83%81%E3%82%A7%E3%82%A2',
        ar: {
            src: 'https://modelviewer.dev/shared-assets/models/Chair.glb',
            iosSrc: 'https://modelviewer.dev/shared-assets/models/Chair.usdz',
            alt: 'アームチェアの3Dモデル',
            hint: 'お気に入りの音楽を流しながら配置してみよう。'
        }
    },
    'dining': {
        name: 'みんなでダイニングチェア',
        description: 'テーブルを囲む時間がもっと楽しくなる、扱いやすくてしっかり者のチェア。',
        image: 'https://m.media-amazon.com/images/I/71RiXfIs-aL.__AC_SX300_SY300_QL70_ML2_.jpg',
        purchase: 'https://www.amazon.co.jp/s?k=%E3%83%80%E3%82%A4%E3%83%8B%E3%83%B3%E3%82%B0%E3%83%81%E3%82%A7%E3%82%A2',
        ar: {
            src: 'https://modelviewer.dev/shared-assets/models/Chair.glb',
            iosSrc: 'https://modelviewer.dev/shared-assets/models/Chair.usdz',
            alt: 'ダイニングチェアの3Dモデル',
            hint: 'テーブルの高さに合わせてぐるっと見回してみてね。'
        }
    },
    'wood': {
        name: 'もりのウッドチェア',
        description: '木の香りとやさしい手ざわりで、島暮らしをほっと落ち着かせてくれるチェア。',
        image: 'https://m.media-amazon.com/images/I/71ZVvvXAx0L.__AC_SX300_SY300_QL70_ML2_.jpg',
        purchase: 'https://www.amazon.co.jp/s?k=%E6%9C%A8%E8%A3%BD%E3%83%81%E3%82%A7%E3%82%A2',
        ar: {
            src: 'https://modelviewer.dev/shared-assets/models/Chair.glb',
            iosSrc: 'https://modelviewer.dev/shared-assets/models/Chair.usdz',
            alt: '木製チェアの3Dモデル',
            hint: '木目の雰囲気をじっくり確認して島の空気になじませよう。'
        }
    }
};

const islandBackgrounds = {
    plaza: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NDAiIGhlaWdodD0iNjQwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InNreSIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNiZGU4ZmYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZGY2ZWMiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JvdW5kIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzllZGJiNyIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzZiYmQ4YSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI3NreSkiLz48cmVjdCB5PSIzNjAiIHdpZHRoPSI2NDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2dyb3VuZCkiLz48cGF0aCBkPSJNMCAzNjAgUTE2MCAzMjAgMzIwIDM2MCBUNjQwIDM2MCBWNDAwIEgwIFoiIGZpbGw9IiNmN2Q5YTciIG9wYWNpdHk9IjAuNiIvPjxnIG9wYWNpdHk9IjAuNSI+PGNpcmNsZSBjeD0iMTIwIiBjeT0iNDQwIiByPSI5MCIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjIyMCIgY3k9IjQzMCIgcj0iNzAiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI1MjAiIGN5PSI0NTAiIHI9IjEyMCIgZmlsbD0iI2ZmZiIvPjwvZz48ZyBvcGFjaXR5PSIwLjgiPjxwYXRoIGQ9Ik0zNDAgMzYwIGw0MCAtNjAgNDAgNjAgeiIgZmlsbD0iIzllZGJiNyIvPjxwYXRoIGQ9Ik00MjAgMzYwIGwzNSAtNTAgMzUgNTAgeiIgZmlsbD0iIzhhY2U5ZSIvPjxwYXRoIGQ9Ik00ODAgMzYwIGwzMCAtNDUgMzAgNDUgeiIgZmlsbD0iIzdlYzU5MCIvPjwvZz48Y2lyY2xlIGN4PSI4MCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IiNmZmY3YzIiIG9wYWNpdHk9IjAuNyIvPjwvc3ZnPg==',
    workshop: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NDAiIGhlaWdodD0iNjQwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9IndhbGwiIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZjdmMWU5Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZjFlNGQwIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImZsb29yIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2Y5ZDdhYSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2Q5YTM2YSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iNDIwIiBmaWxsPSJ1cmwoI3dhbGwpIi8+PHJlY3QgeT0iNDIwIiB3aWR0aD0iNjQwIiBoZWlnaHQ9IjIyMCIgZmlsbD0idXJsKCNmbG9vcikiLz48ZyBvcGFjaXR5PSIwLjMiPjxyZWN0IHg9IjQwIiB5PSIxMjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTYwIiByeD0iMTIiIGZpbGw9IiM4OGM5ZmYiLz48cmVjdCB4PSIyMDAiIHk9IjEwMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxODAiIHJ4PSIxNCIgZmlsbD0iI2ZmY2Y4NSIvPjxyZWN0IHg9IjQwMCIgeT0iMTQwIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE1MCIgcng9IjEyIiBmaWxsPSIjYTBkOGIzIi8+PC9nPjxnIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNDIwIGw4MCAtMjAgODAgMjAgODAgLTIwIDgwIDIwIDgwIC0yMCA4MCAyMCA4MCAtMjAgODAgMjAgVjY0MCBIMCBaIiBmaWxsPSIjYzI4NzU1Ii8+PC9nPjxjaXJjbGUgY3g9IjUwMCIgY3k9IjkwIiByPSI0MCIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjUyMCIgY3k9IjgwIiByPSIyMCIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+',
    coast: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NDAiIGhlaWdodD0iNjQwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InNreTIiIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZDRmMGZmIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZmOWU2Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InNlYSIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM3ZGQ4ZmYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMzZmI0ZTUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ic2FuZCIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmU3YjgiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmNGM5ODYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgZmlsbD0idXJsKCNza3kyKSIvPjxyZWN0IHk9IjIyMCIgd2lkdGg9IjY0MCIgaGVpZ2h0PSIxODAiIGZpbGw9InVybCgjc2VhKSIvPjxwYXRoIGQ9Ik0wIDM2MCBRMTYwIDMyMCAzMjAgMzQwIFQ2NDAgMzIwIFY0MjAgSDAgWiIgZmlsbD0iI2ZmZTdiOCIvPjxyZWN0IHk9IjM2MCIgd2lkdGg9IjY0MCIgaGVpZ2h0PSIyODAiIGZpbGw9InVybCgjc2FuZCkiLz48ZyBvcGFjaXR5PSIwLjYiPjxjaXJjbGUgY3g9IjE0MCIgY3k9IjQyMCIgcj0iNDAiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIxOTAiIGN5PSI0MTAiIHI9IjI4IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNDUwIiBjeT0iMjMwIiByPSI1MCIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjQ4MCIgY3k9IjIxMCIgcj0iNDAiIGZpbGw9IiNmZmYiLz48L2c+PGcgb3BhY2l0eT0iMC41Ij48cGF0aCBkPSJNNjAgMzYwIGwzMCA0MCA0MCAtNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNNTIwIDM3MCBsMzQgMzQgMzQgLTM0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9nPjwvc3ZnPg=='
};

// クエストデータに 'character' プロパティを追加
const quests = {
    'start': {
        text: 'たぬきち：今日はどんなイスを探してるだなも？\n使いたい場面を教えてほしいだなも。',
        choices: [
            { text: 'おしごとやゲームがはかどるイス', next: 'purpose-work' },
            { text: 'のんびりリラックスできるイス', next: 'purpose-relax' },
            { text: 'みんなでごはんを楽しむイス', next: 'purpose-dining' }
        ],
        bg: islandBackgrounds.plaza,
        character: 'tanuki'
    },
    'purpose-work': {
        text: 'しずえ：ふむふむ。お部屋はどんな雰囲気にしたいですか？',
        choices: [
            { text: '静かに集中できる落ち着いたスペース', next: 'work-focus' },
            { text: '色もりだくさんの楽しいコーナー', next: 'work-playful' }
        ],
        bg: islandBackgrounds.workshop,
        character: 'dog'
    },
    'work-focus': {
        text: 'ブーケ：姿勢が保てるとお仕事がはかどるよ！何を重視する？',
        choices: [
            { text: '背中までしっかり支えてほしい', next: 'result-ergonomic' },
            { text: 'クッション性もあってゲームにも使いたい', next: 'result-gaming' }
        ],
        bg: islandBackgrounds.workshop,
        character: 'cat'
    },
    'work-playful': {
        text: 'たぬきち：ポップなコーナーなら、どう座りたいだなも？',
        choices: [
            { text: 'リクライニングしてゆったり作業したい', next: 'result-ergonomic' },
            { text: 'ライトアップでテンションを上げたい', next: 'result-gaming' }
        ],
        bg: islandBackgrounds.plaza,
        character: 'tanuki'
    },
    'purpose-relax': {
        text: 'しずえ：リラックスするなら、どこでくつろぎたいですか？',
        choices: [
            { text: '木の香りを感じるナチュラルコーナー', next: 'relax-natural' },
            { text: 'ふかふかクッションのまどろみ空間', next: 'relax-cozy' }
        ],
        bg: islandBackgrounds.coast,
        character: 'dog'
    },
    'relax-natural': {
        text: 'たぬきち：木のイスは島の空気によく合うだなも〜。どんな雰囲気がいい？',
        choices: [
            { text: '素朴な木目でお部屋になじませたい', next: 'result-wood' },
            { text: '木枠とクッションのバランスがいいと安心', next: 'result-lounge' }
        ],
        bg: islandBackgrounds.plaza,
        character: 'tanuki'
    },
    'relax-cozy': {
        text: 'ブーケ：ふかふかだとウトウトしちゃいそう！どんな座り心地が好き？',
        choices: [
            { text: '包みこまれるソファタイプがいい', next: 'result-lounge' },
            { text: '木のフレームで安定感もほしい', next: 'result-wood' }
        ],
        bg: islandBackgrounds.coast,
        character: 'cat'
    },
    'purpose-dining': {
        text: 'たぬきち：みんなで食べるなら、どんな集まりか教えてだなも。',
        choices: [
            { text: '家族や仲良しとほっこりごはん', next: 'dining-family' },
            { text: 'おもてなしのテーブルを華やかにしたい', next: 'dining-party' }
        ],
        bg: islandBackgrounds.plaza,
        character: 'tanuki'
    },
    'dining-family': {
        text: 'しずえ：日々使うなら座りごこちや扱いやすさが大切ですね！',
        choices: [
            { text: 'お手入れしやすい頼れるイス', next: 'result-dining' },
            { text: '木のぬくもりを感じたい', next: 'result-wood' }
        ],
        bg: islandBackgrounds.workshop,
        character: 'dog'
    },
    'dining-party': {
        text: 'ブーケ：パーティーなら見た目も大事！どっちにときめく？',
        choices: [
            { text: 'スッと背すじがのびる上品なイス', next: 'result-dining' },
            { text: '木目が映えるナチュラルなイス', next: 'result-wood' }
        ],
        bg: islandBackgrounds.coast,
        character: 'cat'
    },
    'result-gaming': { result: 'gaming' },
    'result-ergonomic': { result: 'ergonomic' },
    'result-lounge': { result: 'lounge' },
    'result-dining': { result: 'dining' },
    'result-wood': { result: 'wood' }
};

let currentQuest = 'start';
let typingInterval; // タイピングアニメーションのsetIntervalを保持するための変数
let bgmInitialized = false;
let textAudioContext = null;
let lastTextSoundTime = 0;
let textToneIndex = 0;
const textToneFrequencies = [880, 988, 1046];

function tryPlayBgm() {
    if (!bgm || bgmInitialized) {
        return;
    }

    bgm.volume = 0.5;

    const playPromise = bgm.play();
    if (playPromise && typeof playPromise.then === 'function') {
        playPromise.then(() => {
            bgmInitialized = true;
            removeBgmInteractionListeners();
        }).catch(() => {
            console.log('ユーザーの操作がないためBGMが再生できませんでした。');
        });
    } else {
        bgmInitialized = true;
        removeBgmInteractionListeners();
    }
}

const bgmInteractionEvents = ['click', 'touchstart', 'keydown'];

function handleBgmInteraction() {
    tryPlayBgm();
    initTextAudio();
}

function removeBgmInteractionListeners() {
    bgmInteractionEvents.forEach(event => {
        document.removeEventListener(event, handleBgmInteraction);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    tryPlayBgm();
    initTextAudio();
    bgmInteractionEvents.forEach(event => {
        document.addEventListener(event, handleBgmInteraction, { once: false });
    });
});

// ゲーム開始
function startGame() {
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    tryPlayBgm();
    initTextAudio();
    loadQuest(currentQuest);
}

// クエストを読み込んで表示
function loadQuest(questId) {
    initTextAudio();
    const quest = quests[questId];
    currentQuest = questId;

    if (quest.result) {
        showResult(quest.result);
        return;
    }

    animateHeroAndChair();

    // 古いタイピングアニメーションをクリア
    if (typingInterval) {
        clearInterval(typingInterval);
    }
    
    // 効果音を再生
    playSfxSelect();

    // 背景画像の設定
    background.style.backgroundImage = `url('${quest.bg}')`;

    // キャラクターの表示
    characterSpriteContainer.innerHTML = ''; // 古いキャラクターを削除
    if (quest.character) {
        const characterSprite = document.createElement('div');
        characterSprite.className = `sprite ${quest.character} walking`; // walkingクラスを追加
        characterSpriteContainer.appendChild(characterSprite);
    }

    // テキスト表示（タイピングアニメーション）
    const text = quest.text;
    questText.textContent = '';
    let i = 0;
    textToneIndex = 0;
    typingInterval = setInterval(() => {
        if (i < text.length) {
            const char = text.charAt(i);
            questText.textContent += char;
            if (char.trim()) {
                playTextSound();
            }
            i++;
        } else {
            clearInterval(typingInterval);
            questText.innerHTML += '<span class="blink-dot">_</span>';
        }
    }, 50);

    // 選択肢の表示
    choiceButtonsContainer.innerHTML = '';
    if (quest.choices) {
        quest.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.onclick = () => loadQuest(choice.next);
            choiceButtonsContainer.appendChild(button);
        });
    }
}

function animateHeroAndChair() {
    if (!heroSceneSprite || !chairSceneSprite) {
        return;
    }

    heroSceneSprite.classList.remove('animate');
    chairSceneSprite.classList.remove('animate');

    // Reflow to restart the animation
    void heroSceneSprite.offsetWidth;

    heroSceneSprite.classList.add('animate');
    chairSceneSprite.classList.add('animate');
}

// 結果画面の表示
function showResult(chairId) {
    gameScreen.classList.remove('active');
    resultScreen.classList.add('active');
    const chair = chairs[chairId];
    resultTitle.textContent = `ぴったりのイスが見つかったよ！`;
    chairImage.src = chair.image;
    chairName.textContent = `【なまえ】 ${chair.name}`;
    chairDescription.textContent = `【ポイント】 ${chair.description}`;
    purchaseLink.href = chair.purchase;

    purchaseLink.style.display = 'block';

    updateArExperience(chair);

    // キャラクターを非表示
    characterSpriteContainer.innerHTML = '';
}

// ゲームを最初からやり直す
function restartGame() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    currentQuest = 'start';
    // タイピングアニメーションをクリア
    if (typingInterval) {
        clearInterval(typingInterval);
    }
    textToneIndex = 0;
    resetArExperience();
    // スタート画面のキャラクター表示をリセット
    if (startCharacter) {
        startCharacter.style.display = 'block';
    }
}

// 効果音の再生
function playSfxSelect() {
    if (!sfxSelect) {
        return;
    }

    sfxSelect.currentTime = 0; // 再生位置を先頭に戻す
    const playPromise = sfxSelect.play();
    if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
            // ユーザー操作がない場合などに備えてエラーは握りつぶす
        });
    }
}

function initTextAudio() {
    if (textAudioContext && textAudioContext.state === 'suspended') {
        textAudioContext.resume().catch(() => {
            // 再開できない場合は静かに失敗させる
        });
        return;
    }

    if (!textAudioContext) {
        const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
        if (typeof AudioContextConstructor !== 'function') {
            return;
        }
        textAudioContext = new AudioContextConstructor();
        if (textAudioContext.state === 'suspended') {
            textAudioContext.resume().catch(() => {
                // 初期化時に自動再生がブロックされても問題なし
            });
        }
    }
}

function playTextSound() {
    if (!textAudioContext || textAudioContext.state !== 'running') {
        return;
    }

    const now = textAudioContext.currentTime;
    if (now - lastTextSoundTime < 0.05) {
        return;
    }
    lastTextSoundTime = now;

    const oscillator = textAudioContext.createOscillator();
    const gainNode = textAudioContext.createGain();

    const frequency = textToneFrequencies[textToneIndex % textToneFrequencies.length];
    textToneIndex++;

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(frequency, now);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.18, now + 0.008);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(textAudioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.12);
}

function updateArExperience(chair) {
    if (!arContainer || !chairArViewer) {
        return;
    }

    if (!chair || !chair.ar || !chair.ar.src) {
        resetArExperience();
        return;
    }

    chairArViewer.src = chair.ar.src;
    chairArViewer.alt = chair.ar.alt || `${chair.name}の3Dモデル`;
    chairArViewer.setAttribute('poster', chair.image || '');

    if (chair.ar.iosSrc) {
        chairArViewer.setAttribute('ios-src', chair.ar.iosSrc);
    } else {
        chairArViewer.removeAttribute('ios-src');
    }

    if (arDescription) {
        arDescription.textContent = chair.ar.hint || 'お気に入りの場所でAR体験してみてね。';
    }

    arContainer.style.display = 'flex';
}

function resetArExperience() {
    if (!arContainer || !chairArViewer) {
        return;
    }

    arContainer.style.display = 'none';
    chairArViewer.removeAttribute('src');
    chairArViewer.removeAttribute('poster');
    chairArViewer.removeAttribute('ios-src');

    if (arDescription) {
        arDescription.textContent = 'スマートフォンを動かして、島のお部屋にイスを置いてみよう。';
    }
}
