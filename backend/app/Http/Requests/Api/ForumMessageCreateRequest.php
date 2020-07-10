<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class ForumMessageCreateRequest extends FormRequest
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
            'topic' => 'required|exists:forum_topics,id',
            'message' => 'min:2',
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
            'topic.required' => 'Не задана тема сообщения.',
            'topic.exists' => 'Заданной темы сообщения не существует.',
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

    // Удаляем тег скрипт из строки
    private static function removeScript($text){
        $text = trim($text);
        $text = str_replace('<script', '&lang;script;', $text);
        $text = str_replace('</script', '&lang;/script;', $text);
        $text = str_replace('<style', '&lang;style', $text);
        $text = str_replace('</style', '&lang;/style', $text);
        return $text;
    }

    private function closeTags($html){

        $ignored_tags = array('br', 'hr', 'img');

        # ищем открывающиеся теги
        preg_match_all("#<([a-z]+)( .*)?(?!/)>#iU",$html,$resultOpenTags);
        preg_match_all("#</([a-z]+)( .*)?(?!/)>#iU",$html,$resultCloseTags);
        $openedtags = $resultOpenTags[1];
        $closedtags = $resultCloseTags[1];
        $needCloseTags = array_diff($openedtags, $closedtags);
        foreach ($needCloseTags as $item){
            if(in_array($item, $ignored_tags)) {
                continue;
            }
            $html .= "</".$item.">";
        }
        return $html;
    }
}
