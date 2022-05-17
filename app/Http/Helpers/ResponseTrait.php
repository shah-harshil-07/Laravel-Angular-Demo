<?php

namespace App\Http\Helpers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

trait ResponseTrait
{
    public function validationError($validator, $messageCode = 'VALIDATION_ERROR', $statusCode = 200) : JsonResponse
    {
        $response = [
            'meta' => [
                'status' => false,
                'status_code' => $statusCode,
                'message_code' => $messageCode,
                'message' => trans("$messageCode"),
            ],
            'errors' => $validator->errors()
        ];
        return response()->json($response, $statusCode);
    }

    public function success($data = [], $messageCode = 'SUCCESS', $statusCode = 200) : JsonResponse
    {
        $response = [
            'meta' => [
                'status' => true,
                'status_code' => $statusCode,
                'message_code' => $messageCode,
                'message' => trans("message.$messageCode"),
            ],
            'data' => $data
        ];
        return response()->json($response, $statusCode);
    }

    public function error($messageCode = 'ERROR', $statusCode = 200, $data = []) : JsonResponse
    {
        $response = [
            'meta' => [
                'status' => false,
                'status_code' => $statusCode,
                'message_code' => $messageCode,
                'message' => trans("error.$messageCode"),
            ],
            'data' => $data
        ];
        return response()->json($response, $statusCode);
    }
}