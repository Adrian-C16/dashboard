<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{
  public function index() {
    return Admin::all();
  }

  public function store (Request $request) {
    $user = Admin::create($request->all());
    return response() -> json($user, 201);
  }

  public function update (Request $request, $id) {
    $user = Admin::findorFail($id);
    $user->update($request->all());
    return response()->json($user, 200);
  }

  public function destroy($id) {
    Admin::destroy($id);
    return response()->json(null, 204);
  }
}
