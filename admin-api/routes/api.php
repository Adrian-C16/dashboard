<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

Route::apiResource('usuarios', AdminController::class);
Route::apiResource('tareas', AdminController::class);
