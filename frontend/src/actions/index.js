const wordsLoaded = (newWords) => {
    return {
        type: 'WORDS_LOADED',
        payload: newWords,
    }
};

const userAuth = (newUser) => {
    return {
        type: 'USER_AUTH',
        payload: newUser,
    }
};

const modalData = (newModalData) => {
    return {
        type: 'MODAL_DATA',
        payload: newModalData,
    }
};

const pageData = (newPageData) => {
    return {
        type: 'PAGE_DATA',
        payload: newPageData,
    }
};

const loadPage = (newLoadPage) => {
    return {
        type: 'LOAD_PAGE',
        payload: newLoadPage,
    }
};

const showModal = (newShowModal) => {
    return {
        type: 'SHOW_MODAL',
        payload: newShowModal,
    }
};

const title = (newTitle) => {
    return {
        type: 'TITLE',
        payload: newTitle,
    }
};

const description = (newDescription) => {
    return {
        type: 'DESCRIPTION',
        payload: newDescription,
    }
};

const keywords = (newKeywords) => {
    return {
        type: 'KEYWORDS',
        payload: newKeywords,
    }
};

const h1 = (newH1) => {
    return {
        type: 'H1',
        payload: newH1,
    }
};

const footer = (newFooter) => {
    return {
        type: 'FOOTER',
        payload: newFooter,
    }
};

const modalRegistration = (newModalRegistration) => {
    return {
        type: 'MODAL_REGISTRATION',
        payload: newModalRegistration,
    }
};

const modalLostPassword = (newModalLostPassword) => {
    return {
        type: 'MODAL_LOST_PASSWORD',
        payload: newModalLostPassword,
    }
};

export {
    wordsLoaded,
    userAuth,
    modalData,
    pageData,
    loadPage,
    showModal,
    title,
    description,
    keywords,
    h1,
    footer,
    modalRegistration,
    modalLostPassword
};
