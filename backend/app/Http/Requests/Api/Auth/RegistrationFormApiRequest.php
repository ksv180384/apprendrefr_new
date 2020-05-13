<?php

namespace App\Http\Requests\Api\Auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;


class RegistrationFormApiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email|unique:users',
            'login' => 'required|min:3',
            'password' => 'required|confirmed|min:6',
            'sex' => 'exists:sex,id',
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
            'email.required' => 'email обязательно для запонения.',
            'email.unique' => 'Пользователь с таким email уже существует.',
            'email.email' => 'Вы ввели некорректный email.',
            'login.required' => 'Имя/login обязательно для запонения.',
            'login.min' => 'Имя/login должно быть нге короче 3-х символов.',
            'password.required' => 'Пароль обязателен для запонения.',
            'password.min' => 'Пароль должен быть не короче 6 символов.',
            'password.confirmed' => 'Неверно подтвержден пароль.',
        ];
    }

    /**
     * Handle a failed validation attempt.
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
