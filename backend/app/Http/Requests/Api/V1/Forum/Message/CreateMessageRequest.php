<?php

namespace App\Http\Requests\Api\V1\Forum\Message;

use Illuminate\Foundation\Http\FormRequest;

class CreateMessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'message' => ['required|min:2'],
            'topic_id' => ['required|exists:forum_topics,id'],
            'user_id' => ['required|exists:users,id'],
            'status_id' => ['required|exists:forum_message_status,id']
        ];
    }
}
