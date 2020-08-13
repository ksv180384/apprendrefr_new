import React from 'react';

const WordPreview = (props) => {

    const { show, translation, transcription } = props;

    let class_show = '';
    if(show){
        class_show = ' show-preview';
    }

    return(
        <div className={ 'WordPreview' + class_show }>
            { translation } => { transcription }
        </div>
    )
};

export default WordPreview;