<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(Request $request) 
    {
        $todos = $request->user()->todos()->latest()->get();
        return response()->json($todos);
    }

    public function store(Request $request) 
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
        ]);

        $todo = $request->user()->todos()->create([
            'title' => $data['title'],
        ]);

        return response()->json($todo,201);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::where('user_id', $request->user()->id)->FindorFail($id);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'status' => 'in:pending,in_progress,done',
        ]);

        $todo->update($data);

        return response()->json($todo);
    }

    public function destroy(Request $request, $id)
    {
        $todo = Todo::where('user_id', $request->user()->id)->FindorFail($id);
        $todo->delete();

        return response()->json([
            'message' => 'Todo deleted'
        ]);
    }


}
