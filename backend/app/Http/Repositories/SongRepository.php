<?php
namespace App\Repositories;

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
     * Получает заданное количество случайных слов
     * int $id - идентификатор записи
     * @return mixed
     */
    public function getById(int $id){
        $song = $this->startConditions()
            ->select([
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
}