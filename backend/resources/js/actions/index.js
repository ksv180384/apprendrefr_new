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

export {
    wordsLoaded,
    userAuth,
    modalData,
    pageData,
    loadPage
};
