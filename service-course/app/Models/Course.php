<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $table = 'courses';
    protected $fillable = [
        'name', 'certificate', 'thumbnail', 'type', 'status', 'price', 'level', 'description', 'mentor_id'
    ];
    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s'
    ];

    public function Mentor()
    {
        return $this->belongsTo(Mentor::class);
    }

    public function Chapters()
    {
        return $this->hasMany(Chapter::class)->orderBy('id', 'ASC');
    }

    public function Images()
    {
        return $this->hasMany(ImageCourse::class)->orderBy('id', 'DESC');
    }

    public function Reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function MyCourses()
    {
        return $this->hasMany(MyCourse::class);
    }
}
