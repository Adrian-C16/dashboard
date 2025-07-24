<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\AuthAdminController;

Route::apiResource('usuarios', AdminController::class);
Route::apiResource('tareas', TareaController::class);
Route::post('/admin/login', [AuthAdminController::class, 'login']);
Route::middleware('auth:sanctum')->post('/admin/logout', [AuthAdminController::class, 'logout']);

