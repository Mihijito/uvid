import React, { useState, useRef } from 'react';

type InputFormProps = {
  onInputEntry: Function,
  inputPlaceHolder: string,
}

const InputForm: React.FC<InputFormProps> = ({ onInputEntry, inputPlaceHolder }: InputFormProps) => {
  const joinButton = useRef<HTMLDivElement>(null);
  const roomIdInput = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  const requestRoomJoin = () => {
    if (inputValue) onInputEntry(inputValue);
  };

  return (
    <div>
      <div
        ref={roomIdInput}>
        <input
          className="text-black text-center"
          type="text"
          placeholder={inputPlaceHolder}
          onChange={(e) => setInputValue(e.target.value)} />
      </div>
      <div
        ref={joinButton}>
        <button
          onClick={() => requestRoomJoin()}>
          Join room
        </button>
      </div>
    </div>
  );
};

export default InputForm;