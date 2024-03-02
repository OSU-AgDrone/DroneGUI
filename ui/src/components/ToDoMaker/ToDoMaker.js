import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ToDoMaker.css';
import { useRef } from 'react';

const ToDoMaker = ({ addTodo, maps}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputMap, setInputMap] = useState('');
  const [inputRating, setInputRating] = useState(0);
  const { t } = useTranslation();
  const inputMapRef = useRef(null);

  useEffect(() => {
    inputMapRef.current.focus();
    inputMapRef.current.select();
    inputMapRef.current.setAttribute('autocomplete', 'off');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(inputMap.trim(), inputValue.trim(), inputDate.trim(), inputRating);
    setInputMap('');
    setInputValue('');
    setInputDate('');
    setInputRating(0);
    document.documentElement.removeAttribute('unsavedChanges');
  };

    const handleInputChange = (input) => {
        if(input.length > 0){
            document.documentElement.setAttribute('unsavedChanges', true);
        } else {
            document.documentElement.removeAttribute('unsavedChanges');
        }
    };

  return (
    <>
      <form onSubmit={handleSubmit}>
      <input
          id="modal-container"
          ref={inputMapRef}
          tabIndex={1}
          list="fields"
          placeholder={t('enter_map')}
          onChange={(e) => {
            setInputMap(e.target.value);
            handleInputChange(e.target.value);
          }}
          value={inputMap}
          required
          autoFocus
        />
        <datalist id="fields">
          {maps.map((item, index) => (
            <option key={item.id}>{item.map}</option>
          ))}
        </datalist>
        <br />
        <input
          id="description"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            handleInputChange(e.target.value);
          }}
          placeholder={t('enter_task')}
          required
        />
        <br />
        <br />
        <label>{t('date_to_complete')} </label>
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="date"
            placeholder={t('date_format')}
            onChange={(e) => {
              setInputDate(e.target.value);
              handleInputChange(e.target.value);
            }}
            value={inputDate}
            required
          />
          <br />
          <label style={{ paddingLeft: '2.5rem', fontSize: 'small' }}>
            ({t('date_format')})
          </label>
        </div>
        <div>
          <label>{t('rating')} </label>
          <br />
          <input
            type="range"
            id="vol"
            name="vol"
            min="0"
            max="5"
            onChange={(e) => {
              setInputRating(e.target.value);
            }}
            value={inputRating}
          />
          <input
            type="text"
            value={inputRating}
            onChange={(e) => {
              setInputRating(e.target.value);
            }}
            style={{ width: '1rem', marginLeft: '1rem' }}
          />
          <br />
          <label style={{ paddingLeft: '1rem', fontSize: 'small' }}>
            {t('rating_desc')}
          </label>
        </div>
        <br />
        <button className="regularButton" type="submit">
          {t('save')}
        </button>
      </form>
    </>
  );
};

export default ToDoMaker;
