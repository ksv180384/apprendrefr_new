<?php

namespace App\Http\Requests\JsonData\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterFormRequest extends FormRequest
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
            'email' => 'required|email',
            'login' => 'required|min:3',
            'password' => 'required|confirmed|min:6',
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
            'email.email:3' => 'Вы ввели некорректный email.',
            'login.required' => 'Имя/login обязательно для запонения.',
            'login.min' => 'Имя/login должно быть нге короче 3-х символов.',
            'password.required' => 'Пароль обязателен для запонения.',
            'password.min:6' => 'Пароль должен быть не короче 6 символов.',
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
    /*
    protected function failedValidation(\Validator $validator)
    {
        $errors = (new ValidationException($validator))->errors();

        throw new HttpResponseException(
            response()->json(['errors' => $errors], JsonResponse::HTTP_UNPROCESSABLE_ENTITY)
        );
    }
    */
}
