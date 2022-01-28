<?php

namespace App\Http\Controllers;

use App\Models\MyCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MyCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $myCourses = MyCourse::query()->with('Course');
        $user_id = $request->user_id;

        $myCourses->when($user_id, function ($query) use ($user_id) {
            return $query->where("user_id", $user_id);
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Get all my course successfully',
            'data' => $myCourses->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'course_id' => 'required|integer|exists:courses,id',
            'user_id' => 'required|integer',
        ];

        $data = $request->all();

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors(),
            ], 422);
        }

        $course_id = $request->course_id;
        $user_id = $request->user_id;
        $user = getUser($user_id);

        if ($user['status'] === 'error') {
            return response()->json([
                'status' => $user['status'],
                'message' => $user['message']
            ], $user['http_code']);
        }

        $isExistMyCourse = MyCourse::whereCourseId($course_id)->whereUserId($user_id)->exists();
        if ($isExistMyCourse) {
            return response()->json([
                'status' => 'error',
                'message' => 'user already take this course',
            ], 409);
        }

        $myCourse = MyCourse::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'my course has been created successfully',
            'data' => $myCourse
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
