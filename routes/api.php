<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AngularController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("getEmployees", [AngularController::class, "getEmployees"]);

Route::get("getDepartments", [AngularController::class, "getDepartments"]);

Route::post('addEmployee', [AngularController::class, 'addEmployee']);

Route::delete('deleteEmployee/{id}', [AngularController::class, 'deleteEmployee']);

Route::get('editEmployee/{id}', [AngularController::class, 'editEmployee']);

Route::post('updateEmployee', [AngularController::class, 'updateEmployee']);
