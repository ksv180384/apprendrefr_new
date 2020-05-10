const initialState = {
    title: '',
    description: '',
    keywords: '',
    h1: '',
    footer: {},
    load: true,
    api_path: 'http://apprendrefr-new2.local',
    show_modal: false,
    modal_registration: false,
    modal_lost_password: false,
    modal_data: {},
    page_data: { words: [], proverb: [], user: [], auth: false, statistics: [], users_online: [] },
};

// Обновляет состояние объекта
const updateData = (state, newDate)=> {
    let newState = {};
    Object.keys(state).map(key => {
        if(key === 'page_data' || key === 'modal_data'){
            newState[key] = updateData(state[key], newDate);
        }else{
            newState[key] = state[key];
            if(typeof newDate !== "undefined" && typeof newDate[key] !== "undefined"){
                newState[key] = newDate[key];
            }

        }
    });

    return newState;
};

const reducer = (state  = initialState, action) => {
    let newState = updateData(state, action.payload);
    switch (action.type){
        case 'USER_AUTH':
            return newState;
        case 'MODAL_DATA':
            return newState;
        case 'LOAD_PAGE':
            return newState;
        case 'PAGE_DATA':
            return newState;
        case 'SHOW_MODAL':
            return newState;
        case 'TITLE':
            return newState;
        case 'DESCRIPTION':
            return newState;
        case 'KEYWORDS':
            return newState;
        case 'H1':
            return newState;
        case 'FOOTER':
            return newState;
        case 'MODAL_REGISTRATION':
            return newState;
        case 'MODAL_LOST_PASSWORD':
            return newState;
        default:
            return state;
    }
};

export default reducer;