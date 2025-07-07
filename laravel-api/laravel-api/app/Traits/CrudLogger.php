<?php

namespace App\Traits;

use Illuminate\Support\Facades\Http;

trait CrudLogger
{
    protected function logToCrudCrud($action, $model, $id)
    {
        Http::post('https://crudcrud.com/api/log', [
            'action' => $action,
            'model' => $model,
            'user_id' => $id,
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}