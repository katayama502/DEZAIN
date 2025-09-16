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

// 椅子データ (変更なし)
const chairs = {
    'gaming': {
        name: '伝説のゲーミングチェア',
        description: '長時間の戦いに耐える、まさに勇者のための椅子。背中を支える独立したランバーサポートは、まるで回復魔法のようだ。',
        image: 'https://m.media-amazon.com/images/I/71M+03gKpfL._AC_SX679_.jpg',
        purchase: 'https://www.amazon.co.jp/s?k=%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0%E3%83%81%E3%82%A7%E3%82%A2'
    },
    'ergonomic': {
        name: '賢者のエルゴノミクスチェア',
        description: '体を優しく包み込み、集中力を極限まで高める。研究や創造を求める賢者にふさわしい逸品だ。',
        image: 'https://m.media-amazon.com/images/I/81qQcMFBkDL._AC_SY879_.jpg',
        purchase: 'https://www.amazon.co.jp/s?k=%E3%82%A8%E3%83%AB%E3%82%B4%E3%83%8E%E3%83%9F%E3%82%AF%E3%82%B9%E3%83%81%E3%82%A7%E3%82%A2'
    },
    'lounge': {
        name: '癒やしのアームチェア',
        description: '冒険で疲れた体を癒やす、休息のための椅子。柔らかい座面とアームレストが、深い眠りへと誘う。',
        image: 'https://m.media-amazon.com/images/I/71bB+3PYmpL._AC_SY300_SX300_.jpg',
        purchase: 'https://www.amazon.co.jp/s?k=%E3%82%A2%E3%83%BC%E3%83%A0%E3%83%81%E3%82%A7%E3%82%A2'
    },
    'dining': {
        name: '食卓の王者の椅子',
        description: '家族や仲間と食事を囲む、楽しい時間を彩る椅子。耐久性に優れ、おもてなしの心を感じさせる。',
        image: 'https://m.media-amazon.com/images/I/71RiXfIs-aL.__AC_SX300_SY300_QL70_ML2_.jpg',
        purchase: 'https://www.amazon.co.jp/s?k=%E3%83%80%E3%82%A4%E3%83%8B%E3%83%B3%E3%82%B0%E3%83%81%E3%82%A7%E3%82%A2'
    },
    'wood': {
        name: '森の精霊のウッドチェア',
        description: '自然の温もりを感じる、木製の椅子。シンプルながらも、使うほどに味わいが深まる。',
        image: 'https://m.media-amazon.com/images/I/71ZVvvXAx0L.__AC_SX300_SY300_QL70_ML2_.jpg',
        purchase: 'https://www.amazon.co.jp/s?k=%E6%9C%A8%E8%A3%BD%E3%83%81%E3%82%A7%E3%82%A2'
    }
};

// クエストデータに 'character' プロパティを追加
const quests = {
    'start': {
        text: '勇者よ！まずは、どのような椅子を探しているか教えてくれ！',
        choices: [
            { text: '魔法使いの呪文のように長時間、座るための椅子（作業用）', next: 'purpose-work' },
            { text: '休息と回復のために、ゆったりと体を預ける椅子（リラックス用）', next: 'purpose-relax' },
            { text: '食事の時間を楽しむための、みんなで囲める椅子（ダイニング用）', next: 'purpose-dining' }
        ],
        bg: 'https://img2.lancers.jp/portfolio/308690/1677623/d6c7e9c6e1bac39c0faa7f83822c17599a79b427c6d7c4dfd258409db1bd7e5d/15613329_1000_0.png',
        character: 'king' // 王様を表示
    },
    'purpose-work': {
        text: 'ふむ、作業用の椅子か。どのくらいのゴールドを費やせるかの？',
        choices: [
            { text: '10,000ゴールド未満（安価）', next: 'result-gaming' },
            { text: '10,000〜50,000ゴールド（中間）', next: 'result-ergonomic' },
            { text: '50,000ゴールド以上（高価）', next: 'result-ergonomic' }
        ],
        bg: 'https://sdesignlabo.com/blog/wp-content/uploads/2022/08/ai-8bit-pixelart_02.jpg', // 商人の背景
        character: 'merchant' // 商人を表示
    },
    'purpose-relax': {
        text: 'リラックス用の椅子か。どのような素材が良いかの？',
        choices: [
            { text: '木のぬくもりを感じる素材', next: 'result-wood' },
            { text: '布の柔らかさを求める素材', next: 'result-lounge' }
        ],
        bg: 'https://pbs.twimg.com/media/DV0yLVyVQAU2G6c.jpg',
        character: 'wizard' // 魔法使いを表示
    },
    'purpose-dining': {
        text: '食事用の椅子か。どんなタイプが良いかの？',
        choices: [
            { text: 'シンプルで丈夫な椅子', next: 'result-dining' },
            { text: '背もたれが高く、ゆったり座れる椅子', next: 'result-wood' }
        ],
        bg: 'https://t4.ftcdn.net/jpg/01/43/74/71/360_F_143747111_shWPZFZARFvYVWKpgX2r7e4tK8LVtuJb.jpg',
        character: 'king' // 王様を表示
    },
    'result-gaming': { result: 'gaming' },
    'result-ergonomic': { result: 'ergonomic' },
    'result-lounge': { result: 'lounge' },
    'result-dining': { result: 'dining' },
    'result-wood': { result: 'wood' }
};

let currentQuest = 'start';
let typingInterval; // タイピングアニメーションのsetIntervalを保持するための変数

// 音楽の自動再生
document.addEventListener('DOMContentLoaded', () => {
    bgm.volume = 0.5;
    bgm.play().catch(e => {
        console.log("ユーザーの操作がないためBGMが自動再生できませんでした。");
    });
});

// ゲーム開始
function startGame() {
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    loadQuest(currentQuest);
}

// クエストを読み込んで表示
function loadQuest(questId) {
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
    typingInterval = setInterval(() => {
        if (i < text.length) {
            questText.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            questText.innerHTML += '<span class="blink-dot">_</span>';
        }
    }, 50);

    // 選択肢の表示
    choiceButtonsContainer.innerHTML = '';
    quest.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.text;
        button.onclick = () => loadQuest(choice.next);
        choiceButtonsContainer.appendChild(button);
    });
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
    resultTitle.textContent = `伝説の椅子を発見！`;
    chairImage.src = chair.image;
    chairName.textContent = `【名前】 ${chair.name}`;
    chairDescription.textContent = `【特徴】 ${chair.description}`;
    purchaseLink.href = chair.purchase;
    
    purchaseLink.style.display = 'block';
    
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
    // スタート画面の王様表示をリセット
    document.querySelector('.sprite.king.start-king').style.display = 'block';
}

// 効果音の再生
function playSfxSelect() {
    sfxSelect.currentTime = 0; // 再生位置を先頭に戻す
    sfxSelect.play();
}