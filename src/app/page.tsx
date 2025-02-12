"use client";

import { useState } from "react";

// Dil çevirileri
const translations = {
  tr: {
    title: "Monty Hall Problemi",
    stats: {
      title: "Oyun İstatistikleri",
      totalGames: "Toplam Oyun",
      winRate: "Kazanma Oranı",
      switchWinRate: "Değiştirince Kazanma",
      stayWinRate: "Değiştirmeden Kazanma",
    },
    game: {
      chooseDoor: "Bir Kapı Seçin",
      canChange: "Seçiminizi Değiştirebilirsiniz",
      gameOver: "Oyun Bitti",
      door: "Kapı",
      goatRevealed: ". kapıda keçi var. Seçiminizi değiştirmek ister misiniz?",
      win: "Tebrikler! Arabayı kazandınız! 🎉",
      lose: "Maalesef, bir keçi kazandınız! 🐐",
      playAgain: "Tekrar Oyna",
    },
    simulation: {
      title: "Simülasyon",
      count: "Simülasyon Sayısı",
      strategy: "Strateji",
      strategies: {
        random: "Rastgele",
        switch: "Her Zaman Değiştir",
        stay: "Asla Değiştirme",
      },
      running: "Simülasyon Çalışıyor...",
      start: "Simülasyonu Başlat",
      results: "Simülasyon Sonuçları",
      totalGames: "Toplam Oyun",
      winRate: "Kazanma Oranı",
    },
    explanation: {
      title: "Monty Hall Problemi Nedir?",
      button: "Problemi Anla",
      close: "Kapat",
      paragraphs: [
        "Monty Hall problemi, olasılık teorisinde sıkça tartışılan ilginç bir paradokstur. İsmi, 'Let's Make a Deal' adlı TV şovunun sunucusu Monty Hall'dan gelmektedir.",
        "Problemin kuralları şöyledir:",
        "1. Önünüzde üç kapalı kapı var",
        "2. Kapıların birinin arkasında bir araba, diğer ikisinin arkasında birer keçi var",
        "3. Siz bir kapı seçiyorsunuz",
        "4. Sunucu (Monty Hall), kalan kapılardan birini açıyor ve arkasında keçi olduğunu gösteriyor",
        "5. Sunucu size seçiminizi değiştirme şansı veriyor",
        "Neden Kapı Değiştirmek Avantajlı?",
        "İlk seçiminizde 1/3 olasılıkla doğru kapıyı (arabayı) seçtiniz. Bu durumda kapı değiştirmek size kaybettirir. Ancak 2/3 olasılıkla yanlış kapıyı (keçiyi) seçtiniz. Sunucu diğer yanlış kapıyı açtığında, kalan kapı kesinlikle arabayı içeren kapı olacaktır.",
        "Örnek Senaryo:",
        "• Diyelim ki 1 numaralı kapıyı seçtiniz",
        "• Araba 2 numaralı kapının arkasında olsun",
        "• Sunucu 3 numaralı kapıyı açıp keçiyi gösterir",
        "• Eğer kapınızı değiştirirseniz, 2 numaralı kapıyı seçecek ve arabayı kazanacaksınız",
        "Bu yüzden:",
        "• Kapıyı değiştirirseniz: 2/3 olasılıkla kazanırsınız",
        "• İlk seçimde kalırsanız: 1/3 olasılıkla kazanırsınız",
      ],
    },
  },
  en: {
    title: "Monty Hall Problem",
    stats: {
      title: "Game Statistics",
      totalGames: "Total Games",
      winRate: "Win Rate",
      switchWinRate: "Switch Win Rate",
      stayWinRate: "Stay Win Rate",
    },
    game: {
      chooseDoor: "Choose a Door",
      canChange: "You Can Change Your Choice",
      gameOver: "Game Over",
      door: "Door",
      goatRevealed: " has a goat. Would you like to change your choice?",
      win: "Congratulations! You won the car! 🎉",
      lose: "Sorry, you got a goat! 🐐",
      playAgain: "Play Again",
    },
    simulation: {
      title: "Simulation",
      count: "Simulation Count",
      strategy: "Strategy",
      strategies: {
        random: "Random",
        switch: "Always Switch",
        stay: "Never Switch",
      },
      running: "Simulation Running...",
      start: "Start Simulation",
      results: "Simulation Results",
      totalGames: "Total Games",
      winRate: "Win Rate",
    },
    explanation: {
      title: "What is the Monty Hall Problem?",
      button: "Understand the Problem",
      close: "Close",
      paragraphs: [
        "The Monty Hall problem is a fascinating paradox in probability theory. It's named after Monty Hall, the host of the TV show 'Let's Make a Deal'.",
        "The rules are as follows:",
        "1. There are three closed doors in front of you",
        "2. Behind one door is a car, behind the other two are goats",
        "3. You choose a door",
        "4. The host (Monty Hall) opens one of the remaining doors, showing a goat",
        "5. The host gives you a chance to switch your choice",
        "Why is Switching Advantageous?",
        "When you make your initial choice, you have a 1/3 probability of choosing the car. In this case, switching would make you lose. However, you have a 2/3 probability of choosing a goat. When the host opens the other goat door, the remaining door will definitely contain the car.",
        "Example Scenario:",
        "• Let's say you choose door 1",
        "• The car is behind door 2",
        "• The host opens door 3, showing a goat",
        "• If you switch, you'll choose door 2 and win the car",
        "Therefore:",
        "• If you switch: You have a 2/3 chance of winning",
        "• If you stay: You have a 1/3 chance of winning",
      ],
    },
  },
};

interface GameStats {
  totalGames: number;
  wins: number;
  switchedDoor: number;
  switchedAndWon: number;
  stayedAndWon: number;
}

interface SimulationResult {
  gamesPlayed: number;
  wins: number;
  strategy: "switch" | "stay" | "random";
}

export default function Home() {
  const [language, setLanguage] = useState<"tr" | "en">("tr");
  const t = translations[language]; // Aktif dil çevirileri

  const [gameState, setGameState] = useState<"initial" | "doorSelected" | "revealed" | "finished">("initial");
  const [doors, setDoors] = useState<Array<"goat" | "car" | null>>([null, null, null]);
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [revealedDoor, setRevealedDoor] = useState<number | null>(null);
  const [result, setResult] = useState<"win" | "lose" | null>(null);
  const [stats, setStats] = useState<GameStats>({
    totalGames: 0,
    wins: 0,
    switchedDoor: 0,
    switchedAndWon: 0,
    stayedAndWon: 0,
  });

  // Simülasyon state'leri
  const [simulationCount, setSimulationCount] = useState<number>(100);
  const [simulationStrategy, setSimulationStrategy] = useState<"switch" | "stay" | "random">("random");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  // Simülasyon animasyonu için state'ler
  const [simulationDoors, setSimulationDoors] = useState<Array<"goat" | "car" | null>>([null, null, null]);
  const [simulationSelected, setSimulationSelected] = useState<number | null>(null);
  const [simulationRevealed, setSimulationRevealed] = useState<number | null>(null);

  const [showExplanation, setShowExplanation] = useState(false);

  const initializeGame = () => {
    const newDoors: Array<"goat" | "car"> = ["goat", "goat", "goat"];
    const carPosition = Math.floor(Math.random() * 3);
    newDoors[carPosition] = "car";
    setDoors(newDoors);
    setGameState("initial");
    setSelectedDoor(null);
    setRevealedDoor(null);
    setResult(null);
  };

  const selectDoor = (doorIndex: number) => {
    if (gameState !== "initial") return;
    setSelectedDoor(doorIndex);
    setGameState("doorSelected");

    // Gösterilecek kapıyı seç (keçi olan ve seçilmemiş kapılardan biri)
    const goatDoors = doors
      .map((door, index) => ({ door, index }))
      .filter(({ door, index }) => door === "goat" && index !== doorIndex);
    const revealDoorIndex = goatDoors[Math.floor(Math.random() * goatDoors.length)].index;
    setRevealedDoor(revealDoorIndex);
  };

  const finishGame = (finalDoorIndex: number) => {
    if (gameState !== "doorSelected") return;
    
    const isWin = doors[finalDoorIndex] === "car";
    const didSwitch = finalDoorIndex !== selectedDoor;
    
    setResult(isWin ? "win" : "lose");
    setGameState("finished");
    
    setStats(prev => ({
      totalGames: prev.totalGames + 1,
      wins: prev.wins + (isWin ? 1 : 0),
      switchedDoor: prev.switchedDoor + (didSwitch ? 1 : 0),
      switchedAndWon: prev.switchedAndWon + (didSwitch && isWin ? 1 : 0),
      stayedAndWon: prev.stayedAndWon + (!didSwitch && isWin ? 1 : 0),
    }));
  };

  const resetStats = () => {
    setStats({
      totalGames: 0,
      wins: 0,
      switchedDoor: 0,
      switchedAndWon: 0,
      stayedAndWon: 0,
    });
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    setSimulationResult(null);
    
    let wins = 0;
    const totalGames = simulationCount;
    const ANIMATION_SPEED = 50; // milisaniye
    const ANIMATION_INTERVAL = Math.max(Math.floor(totalGames / 20), 1); // Her kaç oyunda bir animasyon gösterileceği
    
    for (let i = 0; i < totalGames; i++) {
      // Kapıları hazırla
      const simDoors: Array<"goat" | "car"> = ["goat", "goat", "goat"];
      const carPosition = Math.floor(Math.random() * 3);
      simDoors[carPosition] = "car";
      
      // İlk seçimi yap
      const firstChoice = Math.floor(Math.random() * 3);
      
      // Sunucunun açacağı kapıyı belirle
      const availableGoatDoors = simDoors
        .map((door, index) => ({ door, index }))
        .filter(({ door, index }) => door === "goat" && index !== firstChoice);
      const revealedDoorIndex = availableGoatDoors[Math.floor(Math.random() * availableGoatDoors.length)].index;
      
      // Stratejiyi uygula
      let finalChoice = firstChoice;
      if (simulationStrategy === "switch") {
        finalChoice = [0, 1, 2].find(i => i !== firstChoice && i !== revealedDoorIndex) ?? firstChoice;
      } else if (simulationStrategy === "random") {
        const shouldSwitch = Math.random() < 0.5;
        if (shouldSwitch) {
          finalChoice = [0, 1, 2].find(i => i !== firstChoice && i !== revealedDoorIndex) ?? firstChoice;
        }
      }
      
      // Sonucu kontrol et
      if (simDoors[finalChoice] === "car") wins++;

      // Sadece belirli aralıklarla animasyon göster
      if (i % ANIMATION_INTERVAL === 0) {
        setSimulationDoors(simDoors);
        setSimulationSelected(firstChoice);
        await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEED));
        
        setSimulationRevealed(revealedDoorIndex);
        await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEED));
        
        setSimulationSelected(finalChoice);
        await new Promise(resolve => setTimeout(resolve, ANIMATION_SPEED));
      }
    }
    
    // Simülasyon bitince temizle
    setSimulationDoors([null, null, null]);
    setSimulationSelected(null);
    setSimulationRevealed(null);
    
    setSimulationResult({
      gamesPlayed: totalGames,
      wins,
      strategy: simulationStrategy
    });
    
    setIsSimulating(false);
  };

  // Oyunu başlat
  if (doors.every(door => door === null)) {
    initializeGame();
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Dil Seçimi */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={() => setShowExplanation(true)}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {t.explanation.button}
        </button>
        <button
          onClick={() => setLanguage(lang => lang === "tr" ? "en" : "tr")}
          className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          {language === "tr" ? "English" : "Türkçe"}
        </button>
      </div>

      {/* Açıklama Modalı */}
      {showExplanation && (
        <div className="fixed top-16 right-4 z-50">
          <div className="bg-white rounded-lg w-[400px] shadow-xl border border-gray-200">
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold">{t.explanation.title}</h2>
                <button
                  onClick={() => setShowExplanation(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {t.explanation.close}
                </button>
              </div>
              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                {t.explanation.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-sm text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold text-center">{t.title}</h1>
      
      {/* İstatistikler */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">{t.stats.title}</h2>
          <button
            onClick={resetStats}
            title={language === "tr" ? "İstatistikleri Sıfırla" : "Reset Statistics"}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors rounded-full hover:bg-gray-100"
          >
            ↺
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="font-bold text-2xl text-blue-600">{stats.totalGames}</div>
            <div className="text-sm text-gray-600">{t.stats.totalGames}</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="font-bold text-2xl text-green-600">
              {stats.totalGames > 0 ? Math.round((stats.wins / stats.totalGames) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600">{t.stats.winRate}</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="font-bold text-2xl text-purple-600">
              {stats.switchedDoor > 0 ? Math.round((stats.switchedAndWon / stats.switchedDoor) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600">{t.stats.switchWinRate}</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="font-bold text-2xl text-orange-600">
              {stats.totalGames - stats.switchedDoor > 0 
                ? Math.round((stats.stayedAndWon / (stats.totalGames - stats.switchedDoor)) * 100) 
                : 0}%
            </div>
            <div className="text-sm text-gray-600">{t.stats.stayWinRate}</div>
          </div>
        </div>
      </div>
      
      {/* Kapılar */}
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          {gameState === "initial" 
            ? t.game.chooseDoor
            : gameState === "doorSelected" 
              ? t.game.canChange
              : t.game.gameOver}
        </h2>
        <div className="flex justify-center space-x-4">
          {(isSimulating ? simulationDoors : doors).map((door, index) => (
            <button
              key={index}
              onClick={() => gameState === "initial" ? selectDoor(index) : finishGame(index)}
              disabled={isSimulating || gameState === "finished" || index === revealedDoor}
              className={`
                w-32 h-48 border-4 rounded-lg transition-all
                ${(isSimulating ? simulationSelected : selectedDoor) === index ? "border-blue-500" : "border-gray-400"}
                ${(isSimulating ? simulationRevealed : revealedDoor) === index ? "opacity-50" : "hover:border-blue-300"}
                ${(isSimulating || gameState === "finished") ? "cursor-default" : "cursor-pointer"}
                disabled:cursor-not-allowed
                ${isSimulating ? "transition-all duration-200" : ""}
              `}
            >
              <div className="text-2xl font-bold">
                {(isSimulating && (simulationRevealed === index || simulationSelected === index)) || 
                 (!isSimulating && (gameState === "finished" || revealedDoor === index))
                  ? (isSimulating ? simulationDoors : doors)[index] === "car" ? "🚗" : "🐐"
                  : `${t.game.door} ${index + 1}`}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="text-center space-y-4">
        {gameState === "doorSelected" && (
          <p className="text-lg">
            {revealedDoor !== null && `${t.game.door} ${revealedDoor + 1}${t.game.goatRevealed}`}
          </p>
        )}
        
        {gameState === "finished" && (
          <div>
            <p className="text-xl font-bold mb-4">
              {result === "win" ? t.game.win : t.game.lose}
            </p>
            <button
              onClick={initializeGame}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              {t.game.playAgain}
            </button>
          </div>
        )}
      </div>

      {/* Simülasyon Bölümü */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">{t.simulation.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.simulation.count}
            </label>
            <input
              type="number"
              min="1"
              max="10000"
              value={simulationCount}
              onChange={(e) => setSimulationCount(Math.min(10000, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full px-3 py-2 border rounded-md"
              disabled={isSimulating}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.simulation.strategy}
            </label>
            <select
              value={simulationStrategy}
              onChange={(e) => setSimulationStrategy(e.target.value as "switch" | "stay" | "random")}
              className="w-full px-3 py-2 border rounded-md"
              disabled={isSimulating}
            >
              <option value="random">{t.simulation.strategies.random}</option>
              <option value="switch">{t.simulation.strategies.switch}</option>
              <option value="stay">{t.simulation.strategies.stay}</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className={`w-full py-2 rounded-md text-white transition-colors ${
            isSimulating 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isSimulating ? t.simulation.running : t.simulation.start}
        </button>

        {simulationResult && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">{t.simulation.results}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">{t.simulation.totalGames}</div>
                <div className="font-bold text-xl">{simulationResult.gamesPlayed}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">{t.simulation.winRate}</div>
                <div className="font-bold text-xl text-green-600">
                  {Math.round((simulationResult.wins / simulationResult.gamesPlayed) * 100)}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
