<?php

use Illuminate\Support\Facades\Route;

Route::get('/', [\App\Http\Controllers\MainController::class, 'index'])->name('index');
Route::post('/', [\App\Http\Controllers\MainController::class, 'create'])->name('create');
Route::get('/c/{key}', [\App\Http\Controllers\MainController::class, 'askToConfirm'])->name('askToConfirm');
Route::post('/c/{key}', [\App\Http\Controllers\MainController::class, 'reveal'])->name('reveal');
