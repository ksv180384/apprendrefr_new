<?php
namespace App\Repositories;

use App\Models\Player\PlayerArtistsSong;
use App\Models\Player\PlayerSongs as Model;

/**
 * Хранилище запросов к таблице proverbs
 * Class SongRepository
 * @package App\Repositories
 */
class SongRepository extends CoreRepository
{

    /**
     * Отдает управляемый класс
     * @return string
     */
    public function getModelClass()
    {
        return Model::class;
    }

    /**
     * Получает песню
     * int $id - идентификатор записи
     * @return mixed
     */
    public function getById(int $id){
        $song = $this->startConditions()
            ->select([
                'player_songs.id',
                'player_songs.artist_name',
                'player_songs.title',
                'player_songs.text_fr',
                'player_songs.text_ru',
                'player_songs.text_transcription',
                'player_songs.user_id',
                'player_songs.created_at',
                'player_songs.updated_at',
                'users.login',
            ])
            ->leftJoin('users', 'player_songs.user_id', '=', 'users.id')
            ->where('player_songs.hidden', '=', 0)
            ->where('player_songs.id', '=', $id)
            ->first();

        return $song;
    }

    /**
     * Получает список всх активных песен
     * @param bool $all - получать все, включая скрытые
     * @return mixed
     */
    public function getSongsList(bool $all = false){
        $select = [
            'id',
            'artist_id',
            'artist_name',
            'title',
        ];

        if($all){
            $songsList = $this->startConditions()
                ->select($select)
                ->get();
        }else{
            $songsList = $this->startConditions()
                ->select($select)
                ->where('hidden', '=', 0)
                ->orderBy('artist_name', 'ASC')
                ->orderBy('title', 'ASC')
                ->get();
        }

        return $songsList;
    }

    /**
     * Получает трек по названию и исполнителю
     * @param string $artist - исполнитель
     * @param string $title - название трека
     * @return mixed
     */
    public function searchByArtistAndTitle(string $artist, string $title){
        $song = $this->startConditions()
            ->select([
                'player_songs.artist_id',
                'player_songs.artist_name',
                'player_songs.title',
                'player_songs.text_fr',
                'player_songs.text_ru',
                'player_songs.text_transcription',
                'player_songs.user_id',
                'player_songs.created_at',
                'player_songs.updated_at',
                'users.login',
            ])
            ->leftJoin('users', 'player_songs.user_id', '=', 'users.id')
            ->where('player_songs.hidden', '=', 0)
            ->where('player_songs.artist_name', '=', $artist)
            ->where('player_songs.title', '=', $title)
            ->first();

        return $song;
    }

    /**
     * @param $search_text - название песни или артиста
     * @return mixed
     */
    public function search($search_text){
        $song_list = $this->startConditions()
            ->select([
                'player_songs.id',
                'player_songs.artist_id',
                'player_songs.artist_name',
                'player_songs.title',
            ])
            ->leftJoin('users', 'player_songs.user_id', '=', 'users.id')
            ->where('player_songs.hidden', '=', 0)
            ->where(function ($query) use ($search_text) {
                return $query->where('player_songs.artist_name', 'LIKE', '%' . $search_text . '%')
                    ->orWhere('player_songs.title', 'LIKE', '%' . $search_text . '%');
            })
            ->limit(10)
            ->get();
        return $song_list;
    }

    /**
     * Поиск по тексту
     * @param $search_text - название песни или артиста
     * @return mixed
     */
    public function searchText($search_text){
        $song_list = $this->startConditions()
            ->select([
                'text_fr',
                'text_ru',
                'text_transcription',
            ])
            ->where('hidden', '=', 0)
            ->where('text_fr', 'LIKE', '%' . $search_text . '%')
            ->get();

        foreach ($song_list as $k => $song){
            $song_list[$k]->text_fr = $this->formatText($song->text_fr);
            $song_list[$k]->text_ru = $this->formatText($song->text_ru);
            $song_list[$k]->text_transcription = $this->formatText($song->text_transcription);
        }

        return $song_list;
    }

    public function getArtists(){
        $artists = PlayerArtistsSong::select(['id', 'name'])->orderBy('name', 'ASC')->get();

        return $artists;
    }

    // Форматируем текст песни
    public function formatText($text){
        $arr_res = array();
        $res = '';
        $text = explode("\n", $text);
        for($i = 0; count($text) > $i; $i++){
            preg_match_all('#\[.*?\]#i', $text[$i], $out);
            for($j = 0; count($out[0]) > $j; $j++){
                $time = $this->timeSec($out[0][$j]);
                $arr_res[$time] = preg_replace('#\[.*?\]#iu', "", $text[$i]);
            }
        }
        ksort($arr_res);

        foreach($arr_res as $val){
            $res .= $val."\n";
        }
        return $res;
    }

    // Переводим время в секунды
    private function timeSec($time){
        $res = null;

        $time = preg_replace("#\[|\]#iu", "", $time);
        $time = explode(":", $time);
        if($time[0] > 0){
            $res = ((int)$time[0]*60)+$time[1];
        }else{
            $res = $time[1];
        }

        return (string)$res;
    }
}