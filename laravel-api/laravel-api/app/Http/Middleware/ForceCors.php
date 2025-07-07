<?php
public function handle($request, Closure $next)
{
    $response = $next($request);

    $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
    $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization');

    return $response;
}