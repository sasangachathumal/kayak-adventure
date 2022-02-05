<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $user_id
 * @property string $content
 * @property string $trip_date
 * @property int $type
 * @property string $image_url_1
 * @property string $image_url_2
 * @property string $image_url_3
 * @property string $image_url_4
 * @property string $image_url_5
 * @property string $video_url
 * @property string $created_at
 * @property string $updated_at
 * @property User $user
 */
class Post extends Model
{
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['user_id', 'image_url', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
