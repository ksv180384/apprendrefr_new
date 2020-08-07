<?php
/**
 * Created by PhpStorm.
 * User: Sergey
 * Date: 28.07.2020
 * Time: 14:22
 */

namespace App\Http\Requests\Api;


use Illuminate\Foundation\Http\FormRequest;

class BaseRequest extends FormRequest
{
    public function __construct(array $query = [], array $request = [], array $attributes = [], array $cookies = [], array $files = [], array $server = [], $content = null)
    {
        parent::__construct($query, $request, $attributes, $cookies, $files, $server, $content);
    }


    // Удаляем тег скрипт из строки
    protected function removeScript($text){
        $text = trim($text);
        $text = str_replace('<script', '&lang;script;', $text);
        $text = str_replace('</script', '&lang;/script;', $text);
        $text = str_replace('<style', '&lang;style', $text);
        $text = str_replace('</style', '&lang;/style', $text);

        // Удаляем пустые теги
        $pattern = "/<.[^>]*>(\s+|()|(&nbsp;)*|\s+(&nbsp;)*|(&nbsp;)*\s+|\s+(&nbsp;)*\s+)<\/.[^>]*>/i";
        $text = preg_replace($pattern,'',$text);
        return $text;
    }

    protected function closeTags($html){

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