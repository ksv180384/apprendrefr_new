// Парсим полученый текст песни заносим данные в массив и вставляем его в нужные поля
class GoLyrics {
    constructor(data){
        this.fr = '';
        this.ru = '';
        this.tr = '';
        this.times = [];
        this.times_position_text = [];
        this.arr_text_song = [];
        if(typeof data !== 'undefined' && typeof data.text_fr !== 'undefined'){
            this.parseText(data);
            this.initTimesPositionText();
        }
    }

    getFr(){
        return this.fr;
    }

    getRu(){
        return this.ru;
    }

    getTr(){
        return this.tr;
    }

    getTimes(){
        return this.times;
    }

    getTimesPositionText(){
         return this.times_position_text;
    }

    // Формируем массив. Ключ - позиция блока (пиксели) Значение - время в которое должна быть эта позиция
    initTimesPositionText(){

        const line_height = 28;
        let pixel_time = [];
        let t = 0;
        for(let i = 0; this.times.length > i; i++){
            if(this.times[i+1]){
                let ecart_time = this.times[i+1] - this.times[i];
                //Время строки делим на размер строки, получаем время каждого пиксела
                let ecart_pixel_time = ecart_time/line_height;
                let pixel_time_temporaire = [];
                for(let j = 0; parseInt(line_height, 10) > j; j++){
                    t += ecart_pixel_time;
                    if(j !== 0 && (j%(line_height-1)) === 0){
                        pixel_time_temporaire[j] = this.times[i+1];
                        t = parseFloat(this.times[i+1]);
                    }else{
                        pixel_time_temporaire[j] = t;
                    }
                }
                pixel_time = pixel_time.concat(pixel_time_temporaire);
            }
        }

        this.times_position_text = pixel_time;
    }

    parseText(data){
        // Получаем текст и разбиваем его на массив построчно
        const fr_text_arr = this.getArr(data.text_fr);

        const ru_text_arr = this.getArr(data.text_ru);
        const tr_text_arr = this.getArr(data.text_transcription);


        let fr_text = '';
        let ru_text = '';
        let tr_text = '';
        for(let i = 0; fr_text_arr.length > i; i++){
            fr_text += '<span>' + fr_text_arr[i].s + '</span>';
            ru_text += '<span>' + ru_text_arr[i].s + '</span>';
            tr_text += '<span>' + tr_text_arr[i].s + '</span>';

            this.times[i] = parseFloat(fr_text_arr[i].t);
            this.arr_text_song[i] = fr_text_arr[i].s;
        }

        this.fr = fr_text;
        this.ru = ru_text;
        this.tr = tr_text;
    };

    // получаем массив текста построчно
    getArr(text){

        let new_array = [];
        const res = text.split("\n");

        for(let i = 0; res.length > i; i++){
            if(res[i]){
                let time_str = res[i].match(/\[.*?\]/ig);
                let str = res[i].replace(/\[.*?\]/ig, "");
                if(time_str){
                    if(time_str.length > 1){
                        for(let k = 0; time_str.length > k; k++){
                            new_array[time_str[k]] = str;
                        }
                    }else{
                        new_array[time_str] = str;
                    }
                }
            }
        }
        new_array = this.sortArr(new_array);
        if(parseInt(new_array[0].t, 10) !== 0){
            new_array.unshift({t:0, s:""});
        }
        return new_array;
    };

    //  Сортирует массив по ключам и удаляет скобки
    sortArr(arr){
        let new_arr = [];
        for(let time in arr){
            let time_new = time.replace(/\[|\]/ig, "");
            time_new = this.timeSec(time_new);
            if(typeof time_new !== "undefined" || time_new === "NaN"){
                new_arr[time_new] = arr[time];
            }
        }
        new_arr = this.ksort(new_arr);
        return new_arr;
    }

    // Переводим время в секунды (формат - недели:дни:часы:минуты:сеунды = секунды)
    timeSec(time){
        const time_sec = [1, 60, 60*60, 60*60*24, 60*60*24*7];
        const arr_time = time.split(":");

        const time_sec_length = time_sec.length;
        const arr_time_length = arr_time.length;

        if(time_sec_length < arr_time_length){

            return false;
        }

        let t = 0;
        for(let i = arr_time_length-1, j = 0; i >= 0; i--, j++){
            let r = parseFloat(arr_time[i])*parseFloat(time_sec[j]);
            if(!isNaN(r)){
                t += r;
            }
        }
        t = t.toFixed(2);
        return t;
    }

    // сортируем массив по ключам
    ksort(arr){
        let arr_keys = [];
        let arr_res = [];

        let i = 0;
        for(let key in arr){
            if(key){
                arr_keys[i] = key;
                i++;
            }
        }
        arr_keys = arr_keys.sort(this.compareNumeric);
        for(let k = 0; arr_keys.length > k; k++){
            arr_res[k] = {t:[arr_keys[k]], s:arr[arr_keys[k]]};
        }
        return arr_res;
    }

    // Для функции sort(), чтоб сортировала как числа
    compareNumeric(a, b){
        a = parseFloat(a);
        b = parseFloat(b);
        if (a > b) return 1;
        if (a < b) return -1;
    }
}

export default GoLyrics;
