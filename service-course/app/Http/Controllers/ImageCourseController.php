<?php

namespace App\Http\Controllers;

use App\Models\ImageCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImageCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            'image' => 'required|url',
            'course_id' => 'required|integer|exists:courses,id'
        ];

        $data = $request->all();

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors(),
            ], 422);
        }

        $imageCourse = ImageCourse::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'image has been uploaded successfully',
            'data' => $imageCourse
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
        $imageCourse = ImageCourse::find($id);
        if (!$imageCourse) {
            return response()->json([
                'status' => 'error',
                'message' => 'image course not found'
            ], 404);
        }

        $imageCourse->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'image course deleted successfully',
        ]);
    }
}
