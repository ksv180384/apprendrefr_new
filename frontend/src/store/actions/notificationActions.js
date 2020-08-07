import { store as storeNotification } from 'react-notifications-component';

export const errorNotification = (message) => {
    /*let error_text = '';
    if(Array.isArray(message)){
        for(let k in message){
            if(k === 'UserToken'){
                continue;
            }
            if(Array.isArray(message[k])){
                error_text = message[k][0];
                console.log('hhh');
            }else{
                console.log('3333');
                error_text = message[k];
            }
            break;
        }
    }else{
        console.log('4444');
        error_text = message;
    }*/
    message = arrayToMessage(message);
    storeNotification.addNotification({
        title: 'Ошибка',
        message: message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 10000,
            showIcon: true,
            onScreen: true
        }
    });
};

export const warningNotification = (message) => {
    message = arrayToMessage(message);
    storeNotification.addNotification({
        title: 'Внимание',
        message: message,
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 10000,
            showIcon: true,
            onScreen: true
        }
    });
};

export const successNotification = (message) => {
    message = arrayToMessage(message);
    storeNotification.addNotification({
        title: 'Уведомление',
        message: message,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 10000,
            showIcon: true,
            onScreen: true
        }
    });
};

const arrayToMessage = (arr) => {
    if(!Array.isArray(arr) && !(arr instanceof Object)){
        return arr;
    }
    let result = '';
    for (let k in arr){
        if(k === 'UserToken'){
            continue;
        }
        if(Array.isArray(arr[k]) || arr[k] instanceof Object){
            for (let key in arr[k]){
                result += arr[k][key] + "\n";
            }
        }else{
            result += arr[k] + "\n";
        }
    }
    return result;
};