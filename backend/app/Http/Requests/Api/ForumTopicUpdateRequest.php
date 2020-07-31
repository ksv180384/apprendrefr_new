<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class ForumTopicUpdateRequest extends BaseRequest
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
            'title' => 'required|min:2',
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
            'title.required' => 'Минимальная длинна названия темы форума 2 символа.',
            'title.min' => 'Минимальная длинна названия темы форума 2 символа.',
        ];
    }

    /**
     * Обработка данных запроса перед валидацией
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function getValidatorInstance()
    {

        $data = $this->all();

        if (!empty($data['title'])){
            $data['title'] = $this->removeScript($this->closeTags($data['title']));
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
