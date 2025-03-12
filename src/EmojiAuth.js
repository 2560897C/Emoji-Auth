import React, { useState, useEffect } from 'react';

const emojis = ['😀', '😂', '😍', '🤔', '🙄', '😎', '😢', '😭', '😡', '🤯', '🥳', '😇', '😱', '🤖', '👻', '🎃', '💀', '👽', '🤡', '👀'];

const EmojiAuth = () => {
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState('');
  const [shuffledEmojis, setShuffledEmojis] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [savedPassword, setSavedPassword] = useState(null);
  const [isSettingPassword, setIsSettingPassword] = useState(false);

  useEffect(() => {
    shuffleEmojis();
  }, []);

  const shuffleEmojis = () => {
    const shuffled = [...emojis].sort(() => Math.random() - 0.5);
    setShuffledEmojis(shuffled);
  };

  const handleSelect = (emoji) => {
    if (selected.length < 4 && !locked) {
      setSelected([...selected, emoji]);
    }
  };

  const handleClear = () => {
    setSelected([]);
    setMessage('');
  };

  const handleSubmit = () => {
    if (isSettingPassword) {
      setSavedPassword(selected);
      setMessage('✅ Password saved! Try logging in now.');
      setIsSettingPassword(false);
      setSelected([]);
    } else if (savedPassword && JSON.stringify(selected) === JSON.stringify(savedPassword)) {
      setMessage('✅ Authentication successful!');
      setTimeout(() => {
        setMessage('');
        setSelected([]); // Clear the selection on success
      }, 1000);
    } else {
      setMessage('❌ Incorrect code. Try again.');
      setAttempts(attempts + 1);
      if (attempts + 1 >= 3) {
        setLocked(true);
        setMessage('🔒 Too many attempts! Locked out for 10 seconds.');
        setTimeout(() => {
          setLocked(false);
          setAttempts(0);
          setMessage('');
        }, 10000);
      }
      setSelected([]);
    }
    shuffleEmojis();
  };

  const handleSetPassword = () => {
    setSelected([]);
    setMessage('Set your new password.');
    setIsSettingPassword(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ padding: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2>EmojiAuth</h2>

        {/* Progress Bar */}
        <div style={{ height: '10px', width: '100%', backgroundColor: '#eee', borderRadius: '5px', marginBottom: '15px' }}>
          <div
            style={{
              height: '100%',
              width: `${(selected.length / 4) * 100}%`,
              backgroundColor: '#4caf50',
              borderRadius: '5px',
              transition: 'width 0.2s ease',
            }}
          ></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 50px)', gap: '10px', justifyContent: 'center' }}>
          {shuffledEmojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleSelect(emoji)}
              style={{
                fontSize: '24px',
                padding: '10px',
                cursor: locked ? 'not-allowed' : 'pointer',
                backgroundColor: selected.includes(emoji) ? '#d1e7fd' : '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
                transition: 'background-color 0.2s',
              }}
              disabled={locked}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '20px' }}>
          <h4>Selected Code:</h4>
          <div>{selected.map((emoji, index) => <span key={index} style={{ fontSize: '24px' }}>{emoji}</span>)}</div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button onClick={handleSubmit} style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }} disabled={locked}>Submit</button>
          <button onClick={handleClear} style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }} disabled={locked}>Clear</button>
          <button onClick={handleSetPassword} style={{ padding: '10px 20px', fontSize: '16px' }} disabled={locked}>Set New Password</button>
        </div>

        {message && <p style={{ marginTop: '20px', fontSize: '18px' }}>{message}</p>}
      </div>
    </div>
  );
};

export default EmojiAuth;
