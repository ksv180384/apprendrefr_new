


export const speak = (word) => {
        const speech = new SpeechSynthesisUtterance();

        speech.lang = 'fr-FR';
        speech.rate = .8;
        speech.pitch = 1;
        speech.volume = 1;
        speech.text = word;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    };

export const checkSpeak = () => {
        const voices = window.speechSynthesis.getVoices();
        let lang = false;

        for(let key in voices){
            if(voices[key].lang === 'fr-FR'){
                lang = true;
            }
        }

        if(!lang){
            alert('Ваш браузер не поддерживает Французкий язык. Используйте Chrome.')
        }
        return lang;
    };
