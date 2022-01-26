<?php

use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MentorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/mentors', [MentorController::class, 'index']);
Route::get('/mentors/{id}', [MentorController::class, 'show']);
Route::post('/mentors', [MentorController::class, 'store']);
Route::put('/mentors/{id}', [MentorController::class, 'update']);
Route::delete('/mentors/{id}', [MentorController::class, 'destroy']);

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::post('/courses', [CourseController::class, 'store']);
Route::put('/courses/{id}', [CourseController::class, 'update']);
Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

Route::get('/chapters', [ChapterController::class, 'index']);
Route::get('/chapters/{id}', [ChapterController::class, 'show']);
Route::post('/chapters', [ChapterController::class, 'store']);
Route::put('/chapters/{id}', [ChapterController::class, 'update']);
Route::delete('/chapters/{id}', [ChapterController::class, 'destroy']);