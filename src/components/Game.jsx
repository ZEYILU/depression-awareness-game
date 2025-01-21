import React, { useState, useEffect } from "react";
import zhData from "../locales/zh.json";
import enData from "../locales/en.json";

const Game = () => {
  const [currentScene, setCurrentScene] = useState("start");
  const [language, setLanguage] = useState("zh"); // 默认语言为中文
  const [storyData, setStoryData] = useState(zhData); // 默认加载中文语言数据
  const [unlockedKnowledge, setUnlockedKnowledge] = useState([]); // 已解锁的知识点

  // 切换语言时加载对应语言的数据
  const switchLanguage = (lang) => {
    setLanguage(lang);
    setStoryData(lang === "zh" ? zhData : enData);
  };

  const handleChoice = (nextScene) => {
    setCurrentScene(nextScene);
  };

  const restartGame = () => {
    setCurrentScene("start");
    setUnlockedKnowledge([]); // 清空解锁的知识点
  };

  const scene = storyData[currentScene];

  // 在到达结局场景时解锁教育知识点
  useEffect(() => {
    if (!scene.choices && scene.education && !unlockedKnowledge.includes(scene.education)) {
      setUnlockedKnowledge((prev) => [...prev, scene.education]);
    }
  }, [scene, unlockedKnowledge]);

  return (
    <div className="game-container">
      {/* 语言切换器 */}
      <div className="language-switcher">
        <button onClick={() => switchLanguage("zh")}>中文</button>
        <button onClick={() => switchLanguage("en")}>English</button>
      </div>

      {/* 当前场景文本 */}
      <p>{scene.text}</p>

      <div className="choices">
        {scene.choices ? (
          scene.choices.map((choice, index) => (
            <button key={index} onClick={() => handleChoice(choice.next)}>
              {choice.text}
            </button>
          ))
        ) : (
          <div>
            {/* 结局场景显示教育信息和重新开始按钮 */}
            <p className="education-point">{scene.education}</p>
            <button onClick={restartGame}>
              {language === "zh" ? "重新开始游戏" : "Restart Game"}
            </button>
          </div>
        )}
      </div>

      {/* 已解锁的知识点 */}
      {unlockedKnowledge.length > 0 && (
        <div className="knowledge-summary">
          <h2>{language === "zh" ? "已解锁的知识点" : "Unlocked Knowledge"}</h2>
          <ul>
            {unlockedKnowledge.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Game;
