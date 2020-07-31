<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class ForumMessageUpdateRequest extends BaseRequest
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
            'message' => 'required|min:2',
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
            'message.required' => 'Минмалиная длинна сообщения 2 символа.',
            'message.min' => 'Минмалиная длинна сообщения 2 символа.',
        ];
    }

    /**
     * Обработка данных запроса перед валидацией
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function getValidatorInstance()
    {

        $data = $this->all();

        if (!empty($data['message'])){
            $data['message'] = $this->removeScript($this->closeTags($data['message']));
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
