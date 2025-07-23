<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use Illuminate\Http\Request;

class TareaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Tarea::query();

        if ($request->has('usuario_id')) {
            $query->where('usuario_id', $request->usuario_id);
        }

        return response()->json($query->orderBy('created_at', 'desc')->get());
    }

    /**
     * crear una nueva tarea
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'usuario_id' => 'required|integer',
            'usuario_nombre' => 'required|string|max:255',
        ]);
        
        $tarea = Tarea::create([
            'titulo' => $validated['titulo'],
            'descripcion' => $validated['descripcion'] ?? null,
            'usuario_id' => $validated['usuario_id'],
            'usuario_nombre' => $validated['usuario_nombre'],
            'completada' => false,
            'comentario' => null,
        ]);

        return response()->json($tarea, 201);
    }

    /**

    /**
     * Actualizar tarea
     */
    public function update(Request $request, $id)
    {
        $tarea = Tarea::findOrFail($id);

        $validated = $request->validate([
            'titulo' => 'sometimes|string|max:255',
            'descripcion' => 'sometimes|nullable|string',
            'completada' => 'sometimes|boolean',
            'comentario' => 'sometimes|nullable|string',
        ]);

        $tarea->fill($validated);
        $tarea->save();

        return response()->json($tarea);
    }

    /**
    borrar tarea
    */
    public function destroy($id)
    {
        $tarea = Tarea::findORFail($id);
        $tarea->delete();

        return response()->json(['message' => 'Tarea eleminada correctamente']);
    }
}
