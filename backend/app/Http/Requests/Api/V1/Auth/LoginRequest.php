<?php

namespace App\Http\Requests\Api\V1\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required'],
            'password' => ['required'],
            'remember' => ['required'],
        ];
    }

    public function getCredentials()
    {

        $email = $this->get('email');
        $password = md5($this->get('password'));

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return [
                'login' => $email,
                'password' => $password
            ];
        }

        return [
            'email' => $email,
            'password' => $password
        ];
    }
}
