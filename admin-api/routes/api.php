<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TareaController;

Route::apiResource('usuarios', AdminController::class);
Route::apiResource('tareas', TareaController::class);
