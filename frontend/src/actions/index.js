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

export {
    wordsLoaded,
    userAuth,
    modalData,
    pageData,
    loadPage,
    showModal
};
