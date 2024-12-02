import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const FontSizeSelector = () => {
    const [t, i18n] = useTranslation();
    const [num, setNum] = useState(0);
    const [fontSize, setFontSize] = useState(() => {
        return localStorage.getItem('fontSize') || 16;
    });
    const [example, setExample] = useState(fontSize || 16);

    const handleFontSizeChange = (newSize) => {
        if (newSize < 8 || newSize > 60 || newSize == null) {
            showToast();
            return;
        }
        setFontSize(newSize);
        localStorage.setItem('fontSize', newSize);
        document.body.style.fontSize = newSize + 'px';
        // selector doesn't get set with body.style.fontSize, do it explicitly
        document.getElementById('fontSizeSelector').style.fontSize = newSize + 'px';
    };

    useEffect(() => {
        const buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.fontSize = fontSize + 'px';
            buttons[i].setAttribute('data-font-size', fontSize);
        }
        document.getElementById('fontSizeSelector').style.fontSize = fontSize + 'px';
        document.getElementById('fontSizeSelector').value = fontSize;
        return () => {
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].style.fontSize = buttons[i].getAttribute('data-font-size') + 'px';
            }
        };
    }, [fontSize]);

    const showToast = () => {
        var message = t('toastWarnFont')
        toast.warn(message, {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            fontSize: 20,
            theme: 'light',
        });
    };

    const handleFontSizeChangeExample = (newSize) => {
        if (newSize < 8 || newSize > 60 || newSize == null || newSize == '') {
            setNum(newSize);
            if (newSize > 60) {
                setExample(60);
            }
            return;
        }
        setExample(newSize);
        setNum(newSize);
    };

    return (
        <div>
            <h2>{t('fontSize')}:</h2>
            <p style={{ fontSize: `${example}px` }}>
                {t('example')}: {example}px
            </p>
            <form>
                <select 
                id="fontSizeSelector"
                type="number"
                onChange={(e) => handleFontSizeChangeExample(e.target.value)}
                required>
                    <option value="12">12px</option>
                    <option value="14">14px</option>
                    <option value="16">16px</option>
                    <option value="18">18px</option>
                    <option value="20">20px</option>
                    <option value="24">24px</option>
                    <option value="28">28px</option>
                    <option value="32">32px</option>
                    <option value="36">36px</option>
                    <option value="40">40px</option>
                    <option value="44">44px</option>
                    <option value="48">48px</option>
                    <option value="52">52px</option>
                    <option value="60">60px</option>
                </select>

                <button type="button" className="regularButton" onClick={() => handleFontSizeChange(num)}>
                    {t('changeFontSize')}
                </button>
                <button className="regularButton" onClick={() => { handleFontSizeChange(16); handleFontSizeChangeExample(16) }}>
                    {t('reset')}
                </button>
            </form>
        </div>
    );
};

export default FontSizeSelector;