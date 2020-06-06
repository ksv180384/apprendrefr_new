<?php

namespace App\Http\Requests\Api\User;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return \Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
            'avatarImg' => 'nullable|file|mimes:jpeg,gif,png|max:7168',
            // only_user - уникальное поле и приандлежит текущему пользователю
            'email' => 'nullable|email|only_user',
            'sex' => 'nullable|exists:sex,id',
            'birthday' => 'nullable|date',
            'info' => 'max:600',
            'signature' => 'max:300',
            'residence' => 'max:100',
            'day_birthday' => 'boolean',
            'yar_birthday' => 'boolean',
            'email_view' => 'exists:user_configs_view,id',
            'info_view' => 'exists:user_configs_view,id',
            'residence_view' => 'exists:user_configs_view,id',
            'sex_view' => 'exists:user_configs_view,id',
            'facebook_view' => 'exists:user_configs_view,id',
            'odnoklassniki_view' => 'exists:user_configs_view,id',
            'twitter_view' => 'exists:user_configs_view,id',
            'vk_view' => 'exists:user_configs_view,id',
            'youtube_view' => 'exists:user_configs_view,id',
            'instagram_view' => 'exists:user_configs_view,id',
            'skype_view' => 'exists:user_configs_view,id',
            'telegram_view' => 'exists:user_configs_view,id',
            'whatsapp_view' => 'exists:user_configs_view,id',
            'viber_view' => 'exists:user_configs_view,id',
            'facebook' => 'max:100',
            'odnoklassniki' => 'max:100',
            'twitter' => 'max:100',
            'vk' => 'max:100',
            'youtube' => 'max:100',
            'instagram' => 'max:100',
            'skype' => 'max:100',
            'telegram' => 'max:100',
            'whatsapp' => 'max:100',
            'viber' => 'max:100',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'avatarImg.file' => 'Аватар должен быть файлом формата jpeg,gif,png.',
            'avatarImg.max' => 'Аватар превышает максимально допустимый размер файла.',
            'avatarImg.mimes' => 'Аватар должен быть файлом формата jpeg,gif,png.',
            'avatarImg.unique' => 'Пользователь с таким email уже существует.',
            'email.only_user' => 'Пользователь с таким email уже существует.',
            'email.email' => 'Вы ввели некорректный email.',
            'sex.exists' => 'Неверно задан пол.',
            'birthday.date' => 'Неверная дата рождения',
            'info.max' => 'Поле "о себе" должно содержать не более 600 символов.',
            'signature.max' => 'Поле "подпись" должно содержать не более 300 символов.',
            'residence.max' => 'Поле "город" должно содержать не более 300 символов.',
            'day_birthday.boolean' => 'Поле "показывать день и месяц рождения" неверно.',
            'yar_birthday.boolean' => 'Поле "показывать год рождения (возраст)" неверно.',
            'email_view.exists' => 'Неверно задано отображение поля email',
            'info_view.exists' => 'Неверно задано отображение поля О себе',
            'residence_view.exists' => 'Неверно задано отображение поля Место жительства',
            'sex_view.exists' => 'Неверно задано отображение поля Пол',
            'facebook_view.exists' => 'Неверно задано отображение поля Facebook',
            'odnoklassniki_view.exists' => 'Неверно задано отображение поля ',
            'twitter_view.exists' => 'Неверно задано отображение поля Odnoklassniki',
            'vk_view.exists' => 'Неверно задано отображение поля Вконтакте',
            'youtube_view.exists' => 'Неверно задано отображение поля Youtube',
            'instagram_view.exists' => 'Неверно задано отображение поля Instagram',
            'skype_view.exists' => 'Неверно задано отображение поля Skype',
            'telegram_view.exists' => 'Неверно задано отображение поля Telegram',
            'whatsapp_view.exists' => 'Неверно задано отображение поля Whatsapp',
            'viber_view.exists' => 'Неверно задано отображение поля Viber',
            'facebook.max' => 'Поле Facebook максимально допустимое количество символов 100',
            'odnoklassniki.max' => 'Поле Odnoklassniki максимально допустимое количество символов 100',
            'twitter.max' => 'Поле Twitter максимально допустимое количество символов 100',
            'vk.max' => 'Поле Vk максимально допустимое количество символов 100',
            'youtube.max' => 'Поле Youtube максимально допустимое количество символов 100',
            'instagram.max' => 'Поле Instagram максимально допустимое количество символов 100',
            'skype.max' => 'Поле Skype максимально допустимое количество символов 100',
            'telegram.max' => 'Поле Telegram максимально допустимое количество символов 100',
            'whatsapp.max' => 'Поле Whatsapp максимально допустимое количество символов 100',
            'viber.max' => 'Поле Viber максимально допустимое количество символов 100',
        ];
    }

    /**
     * Обработка данных запроса перед валидацией
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function getValidatorInstance()
    {

        $data = $this->all();

        if (!empty($data['day_birthday'])){
            $data['day_birthday'] = $data['day_birthday'] === 'on' ? 1 : 0;
        }
        if (!empty($data['yar_birthday'])){
            $data['yar_birthday'] = $data['yar_birthday'] === 'on' ? 1 : 0;
        }

        // Меняем формат даты
        if (!empty($data['birthday'])){
            $data['birthday'] = Carbon::parse($data['birthday'])->format('Y-m-d H:i:s');
        }

        $this->getInputSource()->replace($data);

        return parent::getValidatorInstance();
    }

    /**
     * Если данные не прошли валидацию, возвращаем Json ответ
     *
     *
     * @param  \Illuminate\Contracts\Validation\Validator $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            new JsonResponse($validator->errors(), 422)
        );
    }
}
