<?php

namespace App\Logging\Telegram;

use App\Services\Telegram\TelegramBotApi;
use Carbon\Carbon;
use Monolog\Handler\AbstractProcessingHandler;
use Monolog\Level;
use Monolog\Logger;
use Monolog\LogRecord;

class TelegramLogger extends AbstractProcessingHandler
{
    private $chatId;

    private $token;

    public function __construct($config)
    {
        $level = Logger::toMonologLevel($config['level']);
        parent::__construct($level);

        $this->chatId = $config['chat_id'];
        $this->token = $config['token'];
    }

    protected function write(LogRecord $record): void
    {
        $message = Carbon::parse($record->datetime)->format('d.m.Y H:i:s') . ' '  . $record->message;
        TelegramBotApi::sendMessage($this->token, $this->chatId, $message);
    }
}