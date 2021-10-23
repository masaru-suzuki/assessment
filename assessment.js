'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultArea = document.querySelector('.result-area');
const tweetArea = document.querySelector('.tweet-area');
const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
const assessment = (userName) => {
  //TODO: 診断処理を実装する
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode += userName.charCodeAt(i);
  }

  // 文字コードの番号の合計を割って答えの番号を決定する
  const index = sumOfCharCode % answers.length;
  const result = answers[index].replaceAll('{userName}', userName);

  //TODO: {userName}を名前に置き換える
  // console.log(result.replaceAll("{userName}", userName));
  return result;
};

// test
const test = (userName) => {
  console.assert(
    assessment(userName) === assessment(userName),
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
};
test('masaru');
// assessment("masar");

/**
 * 診断するボタンを押した時の処理
 */
assessmentButton.addEventListener('click', () => {
  const userName = userNameInput.value;
  // 名前がからのときは処理を終了
  if (!userName) return;

  //一度入力したらinputを空にする
  resultArea.innerText = '';
  tweetArea.innerText = '';

  //TODO: 診断結果表示エリアの作成
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultArea.appendChild(header);
  const para = document.createElement('p');
  para.innerText = assessment(userName);
  header.appendChild(para);

  //TODO: tweetエリアの作成
  const anchor = document.createElement('a');
  const hrefValue = `https://twitter.com/intent/tweet?button_hashtag=${encodeURIComponent(
    'あなたのいいところ'
  )}&ref_src=twsrc%5Etfw`;
  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('data-text', assessment(userName));
  anchor.innerText = 'Tweet #あなたのいいところ';
  anchor.className = 'twitter-hashtag-button';
  tweetArea.appendChild(anchor);
  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetArea.appendChild(script);
});
/**
 * enterを押したときに
 */
userNameInput.onkeydown = (e) => {
  e.key === 'Enter' && assessmentButton.click();
};
