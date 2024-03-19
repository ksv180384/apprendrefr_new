<?php

namespace App\Http\DTOs\Forum\Message;

use App\DTOs\Forum\Message\NewMessageDTO;
use App\Http\Requests\Api\V1\Forum\Message\CreateMessageRequest;
use App\Models\Forum\ForumTopic;
use App\Models\Forum\ForumMessageStatus;
use App\Models\User\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class NewMessageDTOTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     * @return void
     */
    public function instance_created_from_form_request(): void
    {
        $forumTopic = ForumTopic::inRandomOrder()->first();
        $user = User::inRandomOrder()->first();
        $forumMessageStatus = ForumMessageStatus::inRandomOrder()->first();

        $dto = NewMessageDTO::fromRequest(new CreateMessageRequest([
            'message' => 'Test message',
            'topic_id' => $forumTopic->id,
            'user_id' => $user->id,
            'status_id' => $forumMessageStatus->id,
        ]));

        $this->assertInstanceOf(NewMessageDTO::class, $dto);
    }
}