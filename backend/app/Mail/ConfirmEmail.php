<?php

namespace App\Mail;

use App\Models\User\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ConfirmEmail extends Mailable
{
    use Queueable, SerializesModels;

    protected $user;
    /**
     * Create a new message instance.
     *
     * @param Registered $event
     * @return void
     */
    public function __construct(Registered $event)
    {
        dd($event);
        //
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('support@apprendrefr.ru')
                    ->subject('Подтверждение регистрации')
                    ->markdown('emails.confirm_email', [
                                                                'user' => $this->user
                                                            ]);
    }
}
