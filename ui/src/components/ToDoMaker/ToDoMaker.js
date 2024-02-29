import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ToDoMaker.css';

const ToDoMaker = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputMap, setInputMap] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(inputMap.trim(), inputValue.trim(), inputDate.trim());
    setInputMap('');
    setInputValue('');
    setInputDate('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputMap}
          onChange={(e) => setInputMap(e.target.value)}
          placeholder={t("enter_map")}
        />
        <br />
        <input
          id='description'
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t("enter_task")}
        />
        <br />
        <label>{t("date_to_complete")} </label>
        <input
          type="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
        />
        <button className='regularButton' type="submit">{t("save")}</button>
      </form>
    </div>
  );
};

export default ToDoMaker;
