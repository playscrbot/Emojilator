import { useEffect, useState } from 'react';

function VaultDoor({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDoor = () => {
    setIsOpen(true);
    onOpen?.(); // Notify parent when door is opened
  };

  return (
    <div className={`vault-door ${isOpen ? 'open' : ''}`} onClick={openDoor}>
      <div className="door-handle">🔐</div>
      {!isOpen && <p className="click-hint">Click to open the Vault</p>}
    </div>
  );
}

function VaultTerminal() {
  const [code, setCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const handleInput = (e) => {
    setCode(e.target.value);
  };

  const checkCode = () => {
    if (code === '🧠🔓') {
      setUnlocked(true);
    }
  };

  return (
    <div className="vault-terminal">
      <h3>🧪 Terminal Access</h3>
      <input
        className="vault-passcode-input"
        value={code}
        onChange={handleInput}
        placeholder="Enter secret emoji combo"
      />
      <button onClick={checkCode}>UNLOCK</button>
      <p className="code-hint">Hint: Unlock Your Brain</p>
      
      {unlocked ? (
        <div className="vault-reveal">
          <p>✅ Access Granted</p>
          <h2>🧘 Open Vault, Think Nothing 😋</h2>
          <p>Now you would see your brain has reached true peace 😮‍💨</p>
          <p>Mission complete 🚀</p>
        </div>
      ) : (
        code.length > 0 && <p className="error-msg">❌ Access Denied</p>
      )}
    </div>
  );
}

export default function SecretVault() {
  const [cutsceneDone, setCutsceneDone] = useState(false);
  const [doorOpened, setDoorOpened] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCutsceneDone(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  if (!cutsceneDone) {
    return (
      <div className="vault-cutscene">
        <p>🔓 Decrypting access key...</p>
        <p>🔄 Syncing emoji records...</p>
        <p>🚪 Unlocking Vault...</p>
      </div>
    );
  }

  return (
    <div className="secret-vault-room">
      <VaultDoor onOpen={() => setDoorOpened(true)} />
      {doorOpened && (
        <div className="vault-inner">
          <h1>🔐 The Secret Emoji Vault</h1>
          <VaultTerminal />
        </div>
      )}
    </div>
  );
}