<?php

namespace App\Http\Controllers;

use App\Models\Course;
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

        $course = Course::find($course_id);

        if ($course->type === 'premium') {
            if ($course->price === 0) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'price cannot be 0'
                ], 422);
            }

            $order = postOrder([
                'user' => $user['data'],
                'course' => $course->toArray()
            ]);

            if ($order['status'] === 'error') {
                return response()->json([
                    'status' => 'error',
                    'message' => $order['message']
                ], $order['http_code']);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'my course has been created successfully',
                'data' => $order['data']
            ]);
        } else {
            $myCourse = MyCourse::create($data);

            return response()->json([
                'status' => 'success',
                'message' => 'my course has been created successfully',
                'data' => $myCourse
            ], 201);
        }
    }

    public function createPremiumAccess(Request $request)
    {
        $data = $request->all();
        $myCourse = MyCourse::create($data);

        return response()->json([
            'status' => 'success',
            'data' => $myCourse
        ]);
    }
}
